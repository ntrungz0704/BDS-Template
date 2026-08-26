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
  token: z.string().min(1, 'Token không hợp lệ.'),
  newPassword: z.string().min(6, 'Mật khẩu tối thiểu phải từ 6 ký tự trở lên.'),
});

export async function requestPasswordReset(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = requestResetSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      const token = crypto.randomBytes(64).toString('hex');
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      await prisma.passwordResetToken.create({
        data: {
          userId: user.id,
          token,
          expiresAt,
        },
      });

      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
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

    const resetToken = await prisma.passwordResetToken.findFirst({
      where: {
        token,
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

    await prisma.$transaction([
      prisma.user.update({
        where: { id: resetToken.userId },
        data: { passwordHash },
      }),
      prisma.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { usedAt: new Date() },
      }),
      prisma.refreshToken.updateMany({
        where: { userId: resetToken.userId },
        data: { revokedAt: new Date() },
      }),
    ]);

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

const directResetSchema = z.object({
  email: z.string().email('Định dạng email không hợp lệ.'),
  phone: z.string().min(8, 'Số điện thoại không hợp lệ.'),
  newPassword: z.string().min(6, 'Mật khẩu mới tối thiểu 6 ký tự.'),
});

export async function directResetPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, phone, newPassword } = directResetSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'Không tìm thấy tài khoản với email này trong hệ thống.',
        },
      });
    }

    // Standardize phone strings for comparison (remove spaces/dashes)
    const userPhoneClean = (user.phone || '').replace(/\D/g, '');
    const inputPhoneClean = phone.replace(/\D/g, '');

    if (!userPhoneClean || userPhoneClean !== inputPhoneClean) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'PHONE_MISMATCH',
          message: 'Số điện thoại xác thực không khớp với thông tin đã đăng ký trên tài khoản này.',
        },
      });
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { passwordHash },
      }),
      prisma.refreshToken.updateMany({
        where: { userId: user.id },
        data: { revokedAt: new Date() },
      }),
    ]);

    try {
      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: 'PASSWORD_RESET_DIRECT_VERIFIED',
          entityType: 'User',
          entityId: user.id,
          ipAddress: req.ip,
          userAgent: req.headers['user-agent'],
        },
      });
    } catch (_) {}

    res.json({
      success: true,
      data: {
        message: 'Đặt lại mật khẩu thành công. Quý khách có thể đăng nhập ngay bằng mật khẩu mới.',
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Dữ liệu không hợp lệ.', details: error.errors } });
    }
    next(error);
  }
}
