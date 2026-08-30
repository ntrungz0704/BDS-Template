import { Request, Response } from 'express';
import { prisma, logger } from '../index';

const SERVER_GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
const MAX_IP_DAILY_QUERIES = 10;

interface IpUsage {
  count: number;
  dateStr: string;
}

const ipUsageStore = new Map<string, IpUsage>();

function getVietnamDateStr(): string {
  try {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date());
  } catch {
    const now = new Date();
    const vn = new Date(now.getTime() + 7 * 60 * 60 * 1000);
    return vn.toISOString().split('T')[0];
  }
}

function getVietnamFullTimeStr(): string {
  try {
    const now = new Date();
    const timeFormatter = new Intl.DateTimeFormat('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const dateFormatter = new Intl.DateTimeFormat('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    return `${timeFormatter.format(now)} ${dateFormatter.format(now)}`;
  } catch {
    const now = new Date();
    return now.toISOString();
  }
}

function getClientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  return req.socket.remoteAddress || '127.0.0.1';
}

function cleanHumanText(text: string): string {
  if (!text) return '';
  return text
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/#{1,6}\s*/g, '')
    .replace(/\\n/g, '\n')
    .trim();
}

export class AiController {
  /**
   * POST /api/ai/chat
   * Chat tư vấn BĐS 24/7 với RAG dữ liệu Tenant thực tế và lưu lịch sử chi tiết giờ:phút:giây
   */
  public static async chat(req: Request, res: Response): Promise<void> {
    try {
      const { question, contextData, userApiKey, guestSessionId, tenantId } = req.body;
      const user = (req as any).user;
      const userId = user?.id || null;

      if (!question || typeof question !== 'string') {
        res.status(400).json({
          success: false,
          error: { message: 'Vui lòng cung cấp câu hỏi.' },
        });
        return;
      }

      const clientIp = getClientIp(req);
      const today = getVietnamDateStr();
      const usage = ipUsageStore.get(clientIp);

      let currentCount = 0;
      if (usage && usage.dateStr === today) {
        currentCount = usage.count;
      }

      const isCustomKey = Boolean(userApiKey && userApiKey.trim().length > 15);

      // Kiểm tra giới hạn 10 lượt/ngày theo IP nếu không dùng key cá nhân
      if (!isCustomKey && currentCount >= MAX_IP_DAILY_QUERIES) {
        res.status(429).json({
          success: false,
          error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: `Địa chỉ IP của bạn (${clientIp}) đã sử dụng hết ${MAX_IP_DAILY_QUERIES} lượt hỏi AI miễn phí hôm nay.`,
          },
          data: {
            remaining: 0,
            max: MAX_IP_DAILY_QUERIES,
            used: currentCount,
            resetTime: '00:00 (Asia/Ho_Chi_Minh)',
          },
        });
        return;
      }

      const activeApiKey = isCustomKey ? userApiKey.trim() : SERVER_GEMINI_API_KEY;

      if (!isCustomKey) {
        ipUsageStore.set(clientIp, {
          count: currentCount + 1,
          dateStr: today,
        });
      }

      const remaining = isCustomKey ? 999999 : Math.max(0, MAX_IP_DAILY_QUERIES - (currentCount + 1));
      const currentTimeStr = getVietnamFullTimeStr();

      // 1. Tìm hoặc tạo Chat Session
      let session: any = null;
      if (userId) {
        session = await prisma.aiChatSession.findFirst({
          where: { userId, ...(tenantId ? { tenantId } : {}) },
          orderBy: { updatedAt: 'desc' },
        });
      } else if (guestSessionId) {
        session = await prisma.aiChatSession.findFirst({
          where: { guestSessionId, ...(tenantId ? { tenantId } : {}) },
          orderBy: { updatedAt: 'desc' },
        });
      }

      if (!session) {
        session = await prisma.aiChatSession.create({
          data: {
            userId: userId || undefined,
            guestSessionId: !userId ? (guestSessionId || `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`) : undefined,
            tenantId: tenantId || undefined,
            ipAddress: clientIp,
            title: question.slice(0, 50) + (question.length > 50 ? '...' : ''),
          },
        });
      } else {
        await prisma.aiChatSession.update({
          where: { id: session.id },
          data: { updatedAt: new Date(), ipAddress: clientIp },
        });
      }

      // Lưu câu hỏi của người dùng vào DB kèm timestamp giây
      await prisma.aiChatMessage.create({
        data: {
          sessionId: session.id,
          role: 'user',
          content: question.trim(),
          timeStr: currentTimeStr,
        },
      });

      // 2. Tải dữ liệu thực tế từ Tenant DB nếu có tenantId (RAG Tầng 1 & Tầng 2)
      let dynamicProjects: any[] = contextData?.projects || [];
      let compInfo: any = contextData || {};

      if (tenantId) {
        try {
          const dbProjects = await prisma.project.findMany({
            where: { tenantId, deletedAt: null },
            take: 20,
            select: { id: true, title: true, type: true, price: true, area: true, address: true, featured: true, description: true },
          });
          if (dbProjects.length > 0) dynamicProjects = dbProjects;

          const dbComp = await prisma.companyInfo.findUnique({ where: { tenantId } });
          if (dbComp) compInfo = { ...compInfo, ...dbComp };
        } catch (e) {
          logger.warn('[AiController] Không thể nạp data RAG tenant: ' + e);
        }
      }

      const rawWebName = compInfo?.companyName || compInfo?.websiteName || 'Sàn Giao Dịch Bất Động Sản';
      const cleanWebName = rawWebName
        .replace(/^LP\s*#?\d+\s*-\s*/i, '')
        .replace(/^Template\s*#?\d+\s*-\s*/i, '')
        .replace(/\s*Launch Funnel/i, '')
        .trim();

      const hotline = compInfo?.hotline || compInfo?.phone || '0905.568.888';
      const zalo = compInfo?.zalo || hotline;

      // Xây dựng danh sách dự án cho RAG
      const projectsSummary = dynamicProjects.map((p, i) => {
        return `${i + 1}. ${p.title} | Loại: ${p.type || 'Căn hộ'} | Giá: ${p.price || 'Liên hệ'} | Diện tích: ${p.area || 'Thỏa thuận'} | Vị trí: ${p.address || 'Trung tâm'}`;
      }).join('\n');

      const systemPrompt = `Bạn là chuyên viên tư vấn Bất Động Sản chuyên nghiệp, nhiệt tình của "${cleanWebName}".

DỮ LIỆU BẤT ĐỘNG SẢN THỰC TẾ TRÊN WEBSITE (ĐƯỢC CẬP NHẬT TỪ CMS):
===================================================================
${projectsSummary || 'Hiện tại đang cập nhật thêm các dự án mới.'}
Hotline: ${hotline} | Zalo: ${zalo}
===================================================================

QUY TẮC TRẢ LỜI BẮT BUỘC (PHONG CÁCH NHẮN TIN TỰ NHIÊN NHƯ NGƯỜI THẬT):
1. Xưng hô tự nhiên: xưng "Em", gọi "Anh/Chị" hoặc "Bạn". Giọng điệu ân cần, lịch sự, mến khách như đang nhắn tin Zalo / Messenger.
2. TUYỆT ĐỐI KHÔNG SỬ DỤNG KÝ TỰ MARKDOWN: KHÔNG dùng dấu sao ** in đậm, KHÔNG dùng dấu * gạch đầu dòng, KHÔNG dùng dấu thăng #. Hãy dùng câu văn gãy gọn, dấu chấm phẩy rõ ràng và biểu tượng cảm xúc lịch sự (như Dạ, Vâng ạ, 😊).
3. NẾU CÓ DỰ ÁN PHÙ HỢP: Giới thiệu chính xác tên căn, giá bán, vị trí, điểm nổi bật.
4. NẾU KHÔNG CÓ DỮ LIỆU CỤ THỂ: Tuyệt đối KHÔNG tự đoán hay bịa giá/pháp lý. Hãy thông báo lịch sự và mời khách nhắn Zalo ${zalo} hoặc gọi Hotline ${hotline} để nhận bảng giá chính xác nhất.
5. Độ dài vừa phải (khoảng 80 - 120 từ).
6. Kết thúc bằng lời mời lịch sự kết nối qua Zalo ${zalo} hoặc để lại SĐT để nhận mặt bằng chi tiết.`;

      let aiReply = '';

      if (activeApiKey) {
        const candidateModels = ['gemini-2.5-flash', 'gemini-flash-latest', 'gemini-2.5-flash-lite'];
        for (const modelName of candidateModels) {
          try {
            const response = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${activeApiKey}`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  contents: [
                    {
                      role: 'user',
                      parts: [{ text: `${systemPrompt}\n\nKhách hàng hỏi: "${question}"` }],
                    },
                  ],
                  generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 2048,
                    thinkingConfig: { thinkingBudget: 0 },
                  },
                }),
              }
            );

            if (response.ok) {
              const data: any = await response.json();
              aiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
              if (aiReply) break;
            }
          } catch (e: any) {
            logger.warn(`[AiController] Gemini fetch error with ${modelName}: ` + e.message);
          }
        }
      }

      if (!aiReply) {
        aiReply = `Dạ em chào anh/chị ạ! Cảm ơn anh/chị đã quan tâm đến bất động sản tại ${cleanWebName}. Để nhận thông tin chi tiết và bảng giá dự án mới nhất, anh/chị vui lòng gọi Hotline ${hotline} hoặc nhắn tin Zalo ${zalo} để chuyên viên bên em gửi bảng hàng VIP ngay nhé!`;
      }

      aiReply = cleanHumanText(aiReply);

      const replyTimeStr = getVietnamFullTimeStr();

      // Lưu câu trả lời của AI vào DB
      await prisma.aiChatMessage.create({
        data: {
          sessionId: session.id,
          role: 'assistant',
          content: aiReply,
          timeStr: replyTimeStr,
        },
      });

      res.status(200).json({
        success: true,
        data: {
          reply: aiReply.trim(),
          timeStr: replyTimeStr,
          sessionId: session.id,
          guestSessionId: session.guestSessionId,
          remaining,
          max: MAX_IP_DAILY_QUERIES,
          used: isCustomKey ? 0 : currentCount + 1,
        },
      });
    } catch (error: any) {
      logger.error('[AiController.chat] Error: ' + error.message);
      res.status(500).json({
        success: false,
        error: { message: 'Không thể xử lý tin nhắn AI lúc này.' },
      });
    }
  }

  /**
   * POST /api/ai/sync-guest-history
   * Khi khách đăng ký hoặc đăng nhập, chuyển toàn bộ lịch sử chat từ guestSessionId sang userId
   */
  public static async syncGuestHistory(req: Request, res: Response): Promise<void> {
    try {
      const { guestSessionId } = req.body;
      const user = (req as any).user;
      const userId = user?.id || req.body.userId;

      if (!guestSessionId || !userId) {
        res.status(400).json({
          success: false,
          error: { message: 'Thiếu guestSessionId hoặc userId.' },
        });
        return;
      }

      // Cập nhật tất cả session có guestSessionId thành userId
      const result = await prisma.aiChatSession.updateMany({
        where: { guestSessionId },
        data: {
          userId,
          guestSessionId: null,
          updatedAt: new Date(),
        },
      });

      logger.info(`[AiController.syncGuestHistory] Đã chuyển ${result.count} phiên chat từ khách sang User ${userId}`);

      res.status(200).json({
        success: true,
        data: {
          migratedSessions: result.count,
          message: 'Đã đồng bộ toàn bộ lịch sử chat vào tài khoản của bạn thành công!',
        },
      });
    } catch (error: any) {
      logger.error('[AiController.syncGuestHistory] Error: ' + error.message);
      res.status(500).json({
        success: false,
        error: { message: 'Lỗi khi đồng bộ lịch sử chat.' },
      });
    }
  }

  /**
   * GET /api/ai/history
   * Lấy danh sách cuộc trò chuyện và tin nhắn kèm mốc thời gian chi tiết
   */
  public static async getHistory(req: Request, res: Response): Promise<void> {
    try {
      const user = (req as any).user;
      const userId = user?.id || (req.query.userId as string);
      const guestSessionId = req.query.guestSessionId as string;

      if (!userId && !guestSessionId) {
        res.status(200).json({ success: true, data: { sessions: [] } });
        return;
      }

      const sessions = await prisma.aiChatSession.findMany({
        where: userId ? { userId } : { guestSessionId },
        orderBy: { updatedAt: 'desc' },
        take: 20,
        include: {
          messages: {
            orderBy: { createdAt: 'asc' },
          },
        },
      });

      res.status(200).json({
        success: true,
        data: {
          sessions,
        },
      });
    } catch (error: any) {
      logger.error('[AiController.getHistory] Error: ' + error.message);
      res.status(500).json({
        success: false,
        error: { message: 'Không thể lấy lịch sử chat.' },
      });
    }
  }

  /**
   * GET /api/ai/usage
   * Kiểm tra số lượt còn lại của IP
   */
  public static async getUsage(req: Request, res: Response): Promise<void> {
    const clientIp = getClientIp(req);
    const today = getVietnamDateStr();
    const usage = ipUsageStore.get(clientIp);
    const used = usage && usage.dateStr === today ? usage.count : 0;
    const remaining = Math.max(0, MAX_IP_DAILY_QUERIES - used);

    res.status(200).json({
      success: true,
      data: {
        ip: clientIp,
        used,
        max: MAX_IP_DAILY_QUERIES,
        remaining,
        resetAt: '00:00 Asia/Ho_Chi_Minh',
      },
    });
  }
}
