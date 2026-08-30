import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { prisma } from '@repo/database';
import { logger } from '../index';
import { SingleTenantExporterService } from './single-tenant-exporter.service';

export class ExportJobService {
  private static exportsDir = path.resolve(process.cwd(), 'uploads/exports');

  private static ensureDirExists() {
    if (!fs.existsSync(this.exportsDir)) {
      fs.mkdirSync(this.exportsDir, { recursive: true });
    }
  }

  /**
   * Yêu cầu đóng gói mã nguồn Single-Tenant cho đơn hàng Mua Đứt
   */
  public static async requestExport(orderNumber: string, currentUser: { userId?: string; email?: string; role?: string }) {
    const cleanOrdNo = orderNumber.trim();

    // 1. Tìm đơn hàng
    const order = await prisma.order.findFirst({
      where: {
        orderNumber: cleanOrdNo,
      },
      include: {
        template: true,
      },
    });

    if (!order) {
      throw new Error('Không tìm thấy thông tin đơn hàng này trong hệ thống.');
    }

    // 2. Phân quyền kiểm tra chủ sở hữu đơn hàng
    if (currentUser.role !== 'SUPER_ADMIN') {
      const isOwner = (currentUser.userId && order.userId === currentUser.userId) || 
                      (currentUser.email && order.email === currentUser.email);
      if (!isOwner) {
        throw new Error('Bạn không có quyền truy cập đơn hàng này.');
      }
    }

    // 3. RÀNG BUỘC NGHIỆP VỤ: Chỉ áp dụng cho đơn Mua Đứt ('BUY')
    if (order.type === 'RENT') {
      throw new Error('Gói Thuê Cloud SaaS chỉ hỗ trợ quản trị trực tiếp trên CMS, không bao gồm quyền tải mã nguồn độc lập.');
    }

    // 4. Chỉ cho phép khi đơn hàng đã hoàn tất duyệt (COMPLETED)
    if (order.status !== 'COMPLETED') {
      throw new Error('Đơn hàng chưa hoàn tất thanh toán hoặc chưa được Admin phê duyệt.');
    }

    // 5. Kiểm tra xem đã có ExportJob nào đang chạy hoặc sẵn sàng còn hạn không
    const existingJob = await prisma.exportJob.findFirst({
      where: {
        orderId: order.id,
      },
      orderBy: { createdAt: 'desc' },
    });

    const now = new Date();

    if (existingJob) {
      // Nếu job đang xử lý
      if (existingJob.status === 'PROCESSING' || existingJob.status === 'PENDING') {
        return {
          jobId: existingJob.id,
          status: existingJob.status,
          message: 'Hệ thống đang trong quá trình đóng gói mã nguồn, vui lòng chờ trong giây lát...',
          expiresAt: existingJob.expiresAt,
          downloadUrl: existingJob.downloadUrl,
        };
      }

      // Nếu job đã READY và còn hạn (trong 7 ngày) và file vẫn tồn tại trên đĩa
      if (existingJob.status === 'READY' && existingJob.expiresAt && existingJob.expiresAt > now && existingJob.filePath && fs.existsSync(existingJob.filePath)) {
        return {
          jobId: existingJob.id,
          status: existingJob.status,
          message: 'Mã nguồn đã sẵn sàng tải về.',
          downloadToken: existingJob.downloadToken,
          downloadUrl: existingJob.downloadUrl,
          fileName: existingJob.fileName,
          fileSizeBytes: existingJob.fileSizeBytes ? existingJob.fileSizeBytes.toString() : '0',
          expiresAt: existingJob.expiresAt,
        };
      }
    }

    // 6. Tạo ExportJob mới
    const newJob = await prisma.exportJob.create({
      data: {
        orderId: order.id,
        orderNumber: order.orderNumber,
        tenantId: order.tenantId,
        userId: order.userId || currentUser.userId,
        status: 'PENDING',
      },
    });

    // 7. Kích hoạt Background Worker đóng gói bất đồng bộ (không block request)
    this.processJobAsync(newJob.id, order).catch((err) => {
      logger.error(`[ExportJobService] Lỗi khi xử lý background job ${newJob.id}: ${err.message}`);
    });

    return {
      jobId: newJob.id,
      status: 'PENDING',
      message: 'Đã tiếp nhận yêu cầu đóng gói mã nguồn. Quá trình xử lý sẽ hoàn tất trong 15-30 giây...',
    };
  }

  /**
   * Background Task xử lý đóng gói file ZIP
   */
  private static async processJobAsync(jobId: string, order: any) {
    try {
      this.ensureDirExists();

      await prisma.exportJob.update({
        where: { id: jobId },
        data: { status: 'PROCESSING' },
      });

      logger.info(`[ExportJobService] Bắt đầu chạy tiến trình đóng gói Single-Tenant cho Job ${jobId}`);

      const templateSlug = order.template?.slug || order.templateId || 'bds-01';

      const exportResult = await SingleTenantExporterService.generateSingleTenantZip({
        orderId: order.id,
        orderNumber: order.orderNumber,
        templateSlug,
        customerName: order.fullName,
        customerPhone: order.phone,
        customerEmail: order.email,
        tenantId: order.tenantId || undefined,
      });

      const uniquePrefix = crypto.randomBytes(6).toString('hex');
      const safeFileName = `SOURCE-ORD-${order.orderNumber}-${uniquePrefix}.zip`;
      const fullFilePath = path.join(this.exportsDir, safeFileName);

      // Lưu file ZIP lên disk storage an toàn
      fs.writeFileSync(fullFilePath, exportResult.buffer);

      // Tạo Signed Token và hạn dùng 7 ngày
      const downloadToken = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 ngày
      const downloadUrl = `/api/marketplace/exports/download/${downloadToken}`;

      await prisma.exportJob.update({
        where: { id: jobId },
        data: {
          status: 'READY',
          downloadToken,
          downloadUrl,
          filePath: fullFilePath,
          fileName: exportResult.fileName,
          fileSizeBytes: exportResult.fileSizeBytes,
          expiresAt,
        },
      });

      logger.info(`[ExportJobService] Job ${jobId} hoàn thành xuất sắc! File đã sẵn sàng: ${safeFileName} (Hạn: ${expiresAt.toISOString()})`);
    } catch (err: any) {
      logger.error(`[ExportJobService] Thất bại khi đóng gói Job ${jobId}: ${err.message}`);
      await prisma.exportJob.update({
        where: { id: jobId },
        data: {
          status: 'FAILED',
          errorMessage: err.message || 'Lỗi không xác định khi đóng gói mã nguồn.',
        },
      });
    }
  }

  /**
   * Lấy trạng thái hiện tại của ExportJob theo orderNumber
   */
  public static async getExportStatus(orderNumber: string, currentUser: { userId?: string; email?: string; role?: string }) {
    const cleanOrdNo = orderNumber.trim();
    const order = await prisma.order.findFirst({
      where: { orderNumber: cleanOrdNo },
    });

    if (!order) {
      throw new Error('Không tìm thấy đơn hàng.');
    }

    if (currentUser.role !== 'SUPER_ADMIN') {
      const isOwner = (currentUser.userId && order.userId === currentUser.userId) || 
                      (currentUser.email && order.email === currentUser.email);
      if (!isOwner) {
        throw new Error('Bạn không có quyền truy cập thông tin này.');
      }
    }

    const job = await prisma.exportJob.findFirst({
      where: { orderId: order.id },
      orderBy: { createdAt: 'desc' },
    });

    if (!job) {
      return {
        orderNumber: order.orderNumber,
        orderType: order.type,
        orderStatus: order.status,
        hasExportJob: false,
        status: 'NONE',
      };
    }

    // Kiểm tra hết hạn
    const now = new Date();
    if (job.status === 'READY' && job.expiresAt && job.expiresAt < now) {
      return {
        orderNumber: order.orderNumber,
        orderType: order.type,
        orderStatus: order.status,
        hasExportJob: true,
        status: 'EXPIRED',
        message: 'Link tải mã nguồn đã hết hạn 7 ngày. Bạn có thể yêu cầu đóng gói lại bất kỳ lúc nào.',
      };
    }

    return {
      orderNumber: order.orderNumber,
      orderType: order.type,
      orderStatus: order.status,
      hasExportJob: true,
      jobId: job.id,
      status: job.status,
      downloadToken: job.status === 'READY' ? job.downloadToken : undefined,
      downloadUrl: job.status === 'READY' ? job.downloadUrl : undefined,
      fileName: job.fileName,
      fileSizeBytes: job.fileSizeBytes ? job.fileSizeBytes.toString() : undefined,
      expiresAt: job.expiresAt,
      errorMessage: job.errorMessage,
      createdAt: job.createdAt,
    };
  }

  /**
   * Tải file ZIP qua Signed Token an toàn
   */
  public static async getDownloadFileByToken(token: string) {
    if (!token || token.length < 16) {
      throw new Error('Token tải mã nguồn không hợp lệ.');
    }

    const job = await prisma.exportJob.findUnique({
      where: { downloadToken: token },
    });

    if (!job) {
      throw new Error('Liên kết tải mã nguồn không tồn tại hoặc đã bị xóa.');
    }

    if (job.status !== 'READY' || !job.filePath) {
      throw new Error('Gói mã nguồn chưa sẵn sàng để tải về.');
    }

    const now = new Date();
    if (job.expiresAt && job.expiresAt < now) {
      throw new Error('Liên kết tải mã nguồn đã hết hạn (chỉ có hiệu lực trong 7 ngày). Vui lòng yêu cầu đóng gói lại trong Dashboard.');
    }

    if (!fs.existsSync(job.filePath)) {
      throw new Error('Tệp mã nguồn trên máy chủ đã được dọn dẹp. Vui lòng tạo yêu cầu đóng gói mới.');
    }

    return {
      filePath: job.filePath,
      fileName: job.fileName || `SOURCE-${job.orderNumber}.zip`,
    };
  }
}
