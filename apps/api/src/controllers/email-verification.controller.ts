import { Request, Response, NextFunction } from 'express';
import { prisma } from '@repo/database';
import crypto from 'crypto';
import { logger } from '../index';
import { sendVerificationEmailAction } from '../utils/mailer';

export async function sendVerificationEmail(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, error: { message: 'Unauthorized' } });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ success: false, error: { message: 'User not found' } });
    }

    if (user.emailVerified) {
      return res.json({
        success: true,
        data: { message: 'Email đã được xác thực.' },
      });
    }

    const token = crypto.randomBytes(64).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await prisma.emailVerificationToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      },
    });

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const verifyLink = `${frontendUrl}/verify-email?token=${token}`;

    sendVerificationEmailAction(user.email, verifyLink).catch(err => {
      logger.error('Failed to send verification email', err);
    });

    res.json({
      success: true,
      data: { message: 'Email xác thực đã được gửi.' },
    });
  } catch (error) {
    next(error);
  }
}

export async function verifyEmail(req: Request, res: Response, next: NextFunction) {
  try {
    const token = (req.query.token as string) || (req.body.token as string);

    if (!token) {
      return res.status(400).json({ success: false, error: { message: 'Token is required' } });
    }

    const verificationToken = await prisma.emailVerificationToken.findFirst({
      where: {
        token,
        usedAt: null,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!verificationToken) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_TOKEN', message: 'Link xác thực không hợp lệ hoặc đã hết hạn.' },
      });
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: verificationToken.userId },
        data: { emailVerified: new Date() },
      }),
      prisma.emailVerificationToken.update({
        where: { id: verificationToken.id },
        data: { usedAt: new Date() },
      }),
    ]);

    res.json({
      success: true,
      data: { message: 'Xác thực email thành công.' },
    });
  } catch (error) {
    next(error);
  }
}
