import { Request, Response } from 'express';
import { prisma, tenantStorage } from '@repo/database';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { sendWelcomeEmail } from '../utils/mailer'; // We'll adapt it or make a new one, but let's make a new mailer func or adapt
import nodemailer from 'nodemailer';
import { logger } from '../index';

// Custom invite email
async function sendInviteEmail(to: string, tenantName: string, inviteUrl: string, invitedBy: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER || 'your-email@gmail.com',
      pass: process.env.SMTP_PASS || 'your-app-password',
    },
  });

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
      <h2 style="color: #4f46e5; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Lời mời tham gia quản trị Website 🎉</h2>
      <p>Xin chào,</p>
      <p>Bạn đã được <strong>${invitedBy}</strong> mời tham gia quản trị website <strong>${tenantName}</strong> trên hệ thống PlatformBDS.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${inviteUrl}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Chấp nhận lời mời</a>
      </div>
      <p style="font-size: 13px; color: #718096;">Liên kết này sẽ hết hạn sau 7 ngày.</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"PlatformBDS" <no-reply@platformbds.vn>',
      to,
      subject: `Lời mời tham gia quản trị website ${tenantName}`,
      html,
    });
  } catch (error) {
    logger.error(`Lỗi gửi email mời tới ${to}:`, error);
  }
}

export const inviteMember = async (req: Request, res: Response) => {
  try {
    const tenantId = req.tenantId;
    const { email, role } = req.body;

    if (!tenantId) {
      return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT', message: 'Không tìm thấy tenantId' } });
    }

    if (!['EDITOR', 'STAFF'].includes(role)) {
      return res.status(400).json({ success: false, error: { code: 'INVALID_ROLE', message: 'Quyền không hợp lệ' } });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      const existingMembership = await prisma.tenantMembership.findUnique({
        where: { userId_tenantId: { userId: existingUser.id, tenantId } }
      });
      if (existingMembership && existingMembership.inviteStatus === 'ACTIVE') {
        return res.status(409).json({ success: false, error: { code: 'ALREADY_MEMBER', message: 'Người dùng đã là thành viên' } });
      }
    }

    // Check for pending invite
    const existingInvite = await prisma.tenantMembership.findFirst({
      where: {
        tenantId,
        invitedEmail: email,
        inviteStatus: 'PENDING',
      }
    });

    if (existingInvite) {
      return res.status(409).json({ success: false, error: { code: 'ALREADY_INVITED', message: 'Đã có lời mời đang chờ xử lý cho email này' } });
    }

    const inviteToken = crypto.randomBytes(32).toString('hex');
    const inviteExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
    const inviter = await prisma.user.findUnique({ where: { id: req.user?.userId } });

    const newMembership = await prisma.tenantMembership.create({
      data: {
        tenantId,
        userId: existingUser?.id,
        role,
        inviteStatus: 'PENDING',
        invitedBy: req.user?.userId,
        inviteToken,
        inviteExpiresAt,
        invitedEmail: email,
      }
    });

    const FRONTEND_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001';
    const inviteUrl = `${FRONTEND_URL}/invite/accept?token=${inviteToken}`;

    await sendInviteEmail(email, tenant?.name || 'Website', inviteUrl, inviter?.fullName || 'Quản trị viên');

    res.json({ success: true, data: newMembership });
  } catch (error: any) {
    logger.error('Error inviting member: ' + error.message);
    res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Lỗi máy chủ' } });
  }
};

export const acceptInvite = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ success: false, error: { code: 'MISSING_TOKEN', message: 'Thiếu token' } });

    const membership = await prisma.tenantMembership.findUnique({
      where: { inviteToken: token },
      include: { tenant: true }
    });

    if (!membership || membership.inviteStatus !== 'PENDING') {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Lời mời không tồn tại hoặc đã được xử lý' } });
    }

    if (membership.inviteExpiresAt && membership.inviteExpiresAt < new Date()) {
      await prisma.tenantMembership.update({
        where: { id: membership.id },
        data: { inviteStatus: 'EXPIRED' }
      });
      return res.status(410).json({ success: false, error: { code: 'EXPIRED', message: 'Lời mời đã hết hạn' } });
    }

    const existingUser = await prisma.user.findUnique({ where: { email: membership.invitedEmail! } });

    if (existingUser) {
      await prisma.tenantMembership.update({
        where: { id: membership.id },
        data: {
          userId: existingUser.id,
          inviteStatus: 'ACTIVE',
          inviteToken: null,
          inviteExpiresAt: null,
        }
      });
      return res.json({ success: true, data: { needsRegistration: false } });
    } else {
      return res.json({ 
        success: true, 
        data: { 
          needsRegistration: true, 
          email: membership.invitedEmail, 
          tenantName: membership.tenant.name 
        } 
      });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Lỗi máy chủ' } });
  }
};

export const completeInviteRegistration = async (req: Request, res: Response) => {
  try {
    const { token, fullName, password } = req.body;
    if (!token || !fullName || !password) {
      return res.status(400).json({ success: false, error: { code: 'MISSING_FIELDS', message: 'Vui lòng điền đủ thông tin' } });
    }

    const membership = await prisma.tenantMembership.findUnique({
      where: { inviteToken: token },
    });

    if (!membership || membership.inviteStatus !== 'PENDING') {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Lời mời không hợp lệ' } });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email: membership.invitedEmail!,
        fullName,
        passwordHash: hashedPassword,
        role: membership.role as any || 'STAFF',
      }
    });

    await prisma.tenantMembership.update({
      where: { id: membership.id },
      data: {
        userId: newUser.id,
        inviteStatus: 'ACTIVE',
        inviteToken: null,
        inviteExpiresAt: null,
      }
    });

    res.json({ success: true, data: { message: 'Đăng ký thành công' } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Lỗi máy chủ' } });
  }
};

export const listMembers = async (req: Request, res: Response) => {
  try {
    const tenantId = req.tenantId!;
    const members = await prisma.tenantMembership.findMany({
      where: { tenantId },
      include: {
        user: { select: { id: true, fullName: true, email: true, avatar: true } }
      }
    });
    res.json({ success: true, data: members });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Lỗi máy chủ' } });
  }
};

export const updateMemberRole = async (req: Request, res: Response) => {
  try {
    const tenantId = req.tenantId!;
    const { id } = req.params;
    const { role } = req.body;

    const membership = await prisma.tenantMembership.findFirst({
      where: { id, tenantId }
    });

    if (!membership) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Không tìm thấy thành viên' } });
    if (membership.role === 'TENANT_OWNER') return res.status(400).json({ success: false, error: { code: 'FORBIDDEN', message: 'Không thể thay đổi quyền Chủ sở hữu' } });
    if (membership.userId === req.user?.userId) return res.status(400).json({ success: false, error: { code: 'FORBIDDEN', message: 'Không thể tự đổi quyền' } });

    const updated = await prisma.tenantMembership.update({
      where: { id },
      data: { role }
    });
    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Lỗi máy chủ' } });
  }
};

export const removeMember = async (req: Request, res: Response) => {
  try {
    const tenantId = req.tenantId!;
    const { id } = req.params;

    const membership = await prisma.tenantMembership.findFirst({
      where: { id, tenantId }
    });

    if (!membership) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Không tìm thấy thành viên' } });
    if (membership.role === 'TENANT_OWNER') return res.status(400).json({ success: false, error: { code: 'FORBIDDEN', message: 'Không thể xóa Chủ sở hữu' } });
    if (membership.userId === req.user?.userId) return res.status(400).json({ success: false, error: { code: 'FORBIDDEN', message: 'Không thể tự xóa mình' } });

    await prisma.tenantMembership.delete({ where: { id } });
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Lỗi máy chủ' } });
  }
};

export const resendInvite = async (req: Request, res: Response) => {
  try {
    const tenantId = req.tenantId!;
    const { id } = req.params;

    const membership = await prisma.tenantMembership.findFirst({
      where: { id, tenantId }
    });

    if (!membership || (membership.inviteStatus !== 'PENDING' && membership.inviteStatus !== 'EXPIRED')) {
      return res.status(400).json({ success: false, error: { code: 'INVALID_STATUS', message: 'Chỉ có thể gửi lại lời mời đang chờ hoặc đã hết hạn' } });
    }

    const inviteToken = crypto.randomBytes(32).toString('hex');
    const inviteExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await prisma.tenantMembership.update({
      where: { id },
      data: { inviteToken, inviteExpiresAt, inviteStatus: 'PENDING' }
    });

    const FRONTEND_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001';
    const inviteUrl = `${FRONTEND_URL}/invite/accept?token=${inviteToken}`;
    const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
    const inviter = await prisma.user.findUnique({ where: { id: req.user?.userId } });

    await sendInviteEmail(membership.invitedEmail!, tenant?.name || 'Website', inviteUrl, inviter?.fullName || 'Quản trị viên');

    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: 'Lỗi máy chủ' } });
  }
};

