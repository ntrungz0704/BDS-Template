import { Request, Response, NextFunction } from 'express';
import { prisma } from '@repo/database';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { logger } from '../index';
import { sendPasswordResetEmail } from '../utils/mailer';

const requestResetSchema = z.object({
  email: z.string().email('Định dạng email không hợp lệ.'),
});

const resetPasswordSchema = z.object({
  token: z.string().length(64, 'Token không hợp lệ.'),
  newPassword: z.string()
    .min(10, 'Mật khẩu tối thiểu phải có 10 ký tự.')
    .regex(/[a-z]/, 'Mật khẩu phải có chữ thường.')
    .regex(/[A-Z]/, 'Mật khẩu phải có chữ hoa.')
    .regex(/[0-9]/, 'Mật khẩu phải có chữ số.'),
});

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: resetPasswordSchema.shape.newPassword,
});

function hashResetToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

async function writePasswordAudit(
  req: Request,
  action: string,
  entityId: string,
  userId?: string,
): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        userId: userId || null,
        action,
        entityType: 'User',
        entityId,
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
      },
    });
  } catch (error) {
    logger.warn(`[PasswordAudit] Unable to record ${action}: ${(error as Error).message}`);
  }
}

export async function requestPasswordReset(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = requestResetSchema.parse(req.body);
    const normalizedEmail = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (user?.isActive && !user.deletedAt && user.status === 'ACTIVE') {
      const token = crypto.randomBytes(32).toString('hex');
      const tokenHash = hashResetToken(token);
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      await prisma.$transaction([
        prisma.passwordResetToken.updateMany({
          where: { userId: user.id, usedAt: null },
          data: { usedAt: new Date() },
        }),
        prisma.passwordResetToken.create({
          data: { userId: user.id, token: tokenHash, expiresAt },
        }),
      ]);

      await writePasswordAudit(req, 'PASSWORD_RESET_REQUESTED', user.id, user.id);

      const frontendUrl = process.env.FRONTEND_URL;
      if (!frontendUrl) {
        throw new Error('FRONTEND_URL is not configured');
      }
      const resetLink = `${frontendUrl}/reset-password?token=${token}`;
      
      // Async send email
      sendPasswordResetEmail(user.email, resetLink).catch(err => {
        logger.error('Failed to send password reset email', err);
      });
    }

    // Always return success
    res.json({
      success: true,
      data: {
        message: 'Nếu email tồn tại, bạn sẽ nhận được link đặt lại mật khẩu.',
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Dữ liệu không hợp lệ.', details: error.errors } });
    }
    next(error);
  }
}

export async function resetPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const { token, newPassword } = resetPasswordSchema.parse(req.body);
    const tokenHash = hashResetToken(token);

    const resetToken = await prisma.passwordResetToken.findFirst({
      where: {
        token: tokenHash,
        usedAt: null,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!resetToken) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: 'Link đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.',
        },
      });
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    const consumed = await prisma.$transaction(async (tx: any) => {
      const claim = await tx.passwordResetToken.updateMany({
        where: { id: resetToken.id, usedAt: null, expiresAt: { gt: new Date() } },
        data: { usedAt: new Date() },
      });
      if (claim.count !== 1) {
        return false;
      }

      await tx.user.update({
        where: { id: resetToken.userId },
        data: { passwordHash },
      });
      await tx.refreshToken.updateMany({
        where: { userId: resetToken.userId, revokedAt: null },
        data: { revokedAt: new Date() },
      });
      await tx.passwordResetToken.updateMany({
        where: { userId: resetToken.userId, usedAt: null },
        data: { usedAt: new Date() },
      });
      return true;
    });

    if (!consumed) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_TOKEN', message: 'Link đặt lại mật khẩu đã được sử dụng.' },
      });
    }

    await writePasswordAudit(req, 'PASSWORD_RESET_COMPLETED', resetToken.userId, resetToken.userId);

    res.json({
      success: true,
      data: {
        message: 'Đặt lại mật khẩu thành công.',
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Dữ liệu không hợp lệ.', details: error.errors } });
    }
    next(error);
  }
}

export async function changePassword(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Yêu cầu đăng nhập.' } });
    }

    const { currentPassword, newPassword } = changePasswordSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { id: userId, deletedAt: null } });
    if (!user || !user.isActive || user.status !== 'ACTIVE') {
      return res.status(401).json({ success: false, error: { code: 'ACCOUNT_INACTIVE', message: 'Tài khoản không hoạt động.' } });
    }

    const currentPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!currentPasswordValid) {
      await writePasswordAudit(req, 'PASSWORD_CHANGE_FAILED', user.id, user.id);
      return res.status(400).json({ success: false, error: { code: 'INVALID_CURRENT_PASSWORD', message: 'Mật khẩu hiện tại không đúng.' } });
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);
    await prisma.$transaction([
      prisma.user.update({ where: { id: user.id }, data: { passwordHash } }),
      prisma.refreshToken.updateMany({
        where: { userId: user.id, revokedAt: null },
        data: { revokedAt: new Date() },
      }),
    ]);

    await writePasswordAudit(req, 'PASSWORD_CHANGED', user.id, user.id);
    return res.json({ success: true, data: { message: 'Đổi mật khẩu thành công. Vui lòng đăng nhập lại.' } });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Dữ liệu không hợp lệ.', details: error.errors } });
    }
    next(error);
  }
}

