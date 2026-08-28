import { Request, Response, NextFunction } from 'express';
import { prisma } from '@repo/database';

export async function getSubmissions(req: Request, res: Response, next: NextFunction) {
  const tenantId = req.tenantId;
  if (!tenantId) return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT_CONTEXT', message: 'Không thể định danh Tenant.' } });

  try {
    const list = await prisma.contactFormSubmission.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
    });

    // Map fields to match Frontend's FormSubmission format
    const data = list.map((item: any) => ({
      id: item.id,
      name: item.fullName,
      email: item.email,
      phone: item.phone,
      message: item.message,
      submittedAt: item.createdAt.toISOString(),
      status: item.isRead ? 'read' : 'unread', // Simple mapping
      source: item.source || 'website',
    }));

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateSubmissionStatus(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const tenantId = req.tenantId;
  const { status } = req.body; // 'read', 'unread', etc.

  try {
    const submission = await prisma.contactFormSubmission.findFirst({
      where: { id, tenantId },
    });

    if (!submission) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy liên hệ.' });
    }

    const updated = await prisma.contactFormSubmission.update({
      where: { id },
      data: {
        isRead: status === 'read' || status === 'lead' || status === 'called',
        readAt: status === 'read' ? new Date() : undefined,
      },
    });

    res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteSubmission(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const tenantId = req.tenantId;

  try {
    const submission = await prisma.contactFormSubmission.findFirst({
      where: { id, tenantId },
    });

    if (!submission) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy liên hệ.' });
    }

    await prisma.contactFormSubmission.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: 'Xóa liên hệ thành công.',
    });
  } catch (error) {
    next(error);
  }
}

