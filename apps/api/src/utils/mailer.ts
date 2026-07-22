import nodemailer from 'nodemailer';
import { logger } from '../index';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER || 'your-email@gmail.com',
    pass: process.env.SMTP_PASS || 'your-app-password',
  },
});

export async function sendWelcomeEmail(to: string, fullName: string, subdomain: string, tempPassword: string) {
  const platformDomain = process.env.PLATFORM_DOMAIN || 'platformbds.vn';
  const websiteUrl = `https://${subdomain}.${platformDomain}`;
  const cmsUrl = `https://${subdomain}-cms.${platformDomain}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
      <h2 style="color: #4f46e5; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Chúc mừng bạn đã tạo Website thành công! 🎉</h2>
      <p>Xin chào <strong>${fullName}</strong>,</p>
      <p>Thanh toán của bạn đã được xác nhận thành công. Hệ thống đã khởi tạo xong website bất động sản dành riêng cho bạn:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; font-weight: bold; color: #4a5568; width: 180px;">Địa chỉ Website:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7;"><a href="${websiteUrl}" style="color: #4f46e5; text-decoration: none; font-weight: bold;">${websiteUrl}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; font-weight: bold; color: #4a5568;">Trang quản trị (CMS):</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7;"><a href="${cmsUrl}" style="color: #4f46e5; text-decoration: none; font-weight: bold;">${cmsUrl}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; font-weight: bold; color: #4a5568;">Tài khoản đăng nhập:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; font-family: monospace;">${to}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; font-weight: bold; color: #4a5568;">Mật khẩu tạm thời:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #edf2f7; font-family: monospace; font-size: 14px; font-weight: bold; background-color: #f7fafc; padding: 4px 8px; border-radius: 4px;">${tempPassword}</td>
        </tr>
      </table>
      
      <div style="background-color: #ebf8ff; border-left: 4px solid #3182ce; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
        <p style="margin: 0; font-size: 13px; color: #2b6cb0; font-weight: bold;">Lưu ý quan trọng:</p>
        <p style="margin: 5px 0 0 0; font-size: 12px; color: #2c5282;">Vui lòng đăng nhập vào trang CMS và thay đổi mật khẩu ngay lập tức để bảo mật thông tin tài khoản của bạn.</p>
      </div>
      
      <p style="font-size: 13px; color: #718096; text-align: center; border-top: 1px solid #edf2f7; padding-top: 15px; margin-top: 30px;">
        © 2026 PlatformBDS Enterprise. All rights reserved.
      </p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"PlatformBDS" <no-reply@platformbds.vn>',
      to,
      subject: 'Khởi tạo Website thành công - PlatformBDS',
      html,
    });
    logger.info(`Đã gửi email chào mừng tới ${to}`);
  } catch (error) {
    logger.error(`Lỗi gửi email chào mừng tới ${to}:`, error);
  }
}
