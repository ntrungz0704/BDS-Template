import { Request, Response } from 'express';
import { prisma } from '@repo/database';
import { SYSTEM_CONFIG } from '@repo/config';
import crypto from 'crypto';

export const createDemoSession = async (req: Request, res: Response) => {
  try {
    const { templateId } = req.body;

    if (!templateId) {
      return res.status(400).json({
        success: false,
        error: { code: 'BAD_REQUEST', message: 'templateId là bắt buộc' }
      });
    }

    // Lookup template by ID or slug
    let dbTemplate = await prisma.template.findFirst({
      where: {
        OR: [
          { id: templateId },
          { slug: templateId },
        ],
      },
    });

    // If not found, find or create template safely
    if (!dbTemplate) {
      const normalizedSlug = String(templateId).replace(/^mock-/, '').toLowerCase();
      dbTemplate = await prisma.template.findFirst({
        where: {
          OR: [
            { slug: normalizedSlug },
            { id: `template-${templateId}` },
            { id: `template-${normalizedSlug}` },
          ],
        },
      });

      if (!dbTemplate) {
        try {
          dbTemplate = await prisma.template.create({
            data: {
              id: `template-${templateId}`,
              name: String(templateId).replace(/[-_]/g, ' ').toUpperCase(),
              slug: normalizedSlug || templateId,
              description: `Giao diện mẫu ${templateId}`,
              shortDescription: `Mẫu template ${templateId}`,
              priceBuy: 499000,
              priceRentMonthly: 399000,
              isActive: true,
              sortOrder: 99,
            },
          });
        } catch {
          // If creation fails due to constraint race, get any active template
          dbTemplate = await prisma.template.findFirst();
        }
      }
    }

    if (!dbTemplate) {
      return res.status(404).json({
        success: false,
        error: { code: 'TEMPLATE_NOT_FOUND', message: 'Không tìm thấy mẫu website' }
      });
    }

    // Generate sessionToken
    const sessionToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + SYSTEM_CONFIG.DEMO_SESSION_EXPIRE_DAYS);

    // Create DemoSession
    const demoSession = await prisma.demoSession.create({
      data: {
        sessionToken,
        templateId: dbTemplate.id,
        expiresAt,
      },
    });

    return res.status(201).json({
      success: true,
      data: {
        sessionToken: demoSession.sessionToken,
        expiresAt: demoSession.expiresAt,
      },
    });
  } catch (error: any) {
    console.error('Lỗi khi tạo demo session:', error);
    return res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_SERVER_ERROR', message: error.message || 'Lỗi server' },
    });
  }
};

export const getDemoSession = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;

    const session = await prisma.demoSession.findUnique({
      where: { sessionToken: token },
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Không tìm thấy phiên dùng thử' },
      });
    }

    if (new Date(session.expiresAt) < new Date()) {
      return res.json({
        success: true,
        data: {
          expired: true,
          message: 'Phiên dùng thử đã hết hạn',
        },
      });
    }

    return res.json({
      success: true,
      data: {
        expired: false,
        sessionToken: session.sessionToken,
        templateId: session.templateId,
        saveCount: session.saveCount,
        customData: session.customData,
        expiresAt: session.expiresAt,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_SERVER_ERROR', message: 'Lỗi server' },
    });
  }
};

export const saveDemoCustomization = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { customData } = req.body;

    const session = await prisma.demoSession.findUnique({
      where: { sessionToken: token },
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Không tìm thấy phiên dùng thử' },
      });
    }

    if (new Date(session.expiresAt) < new Date()) {
      return res.status(403).json({
        success: false,
        error: { code: 'EXPIRED', message: 'Phiên dùng thử đã hết hạn' },
      });
    }

    if (session.saveCount >= SYSTEM_CONFIG.DEMO_SESSION_MAX_SAVE) {
      return res.status(403).json({
        success: false,
        error: { code: 'LIMIT_REACHED', message: 'Đã đạt giới hạn lưu. Mua gói để sử dụng không giới hạn' },
      });
    }

    const updatedSession = await prisma.demoSession.update({
      where: { sessionToken: token },
      data: {
        customData: customData ? (customData as any) : undefined,
        saveCount: {
          increment: 1,
        },
      },
    });

    return res.json({
      success: true,
      data: {
        sessionToken: updatedSession.sessionToken,
        saveCount: updatedSession.saveCount,
        customData: updatedSession.customData,
        expiresAt: updatedSession.expiresAt,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_SERVER_ERROR', message: 'Lỗi server' },
    });
  }
};

