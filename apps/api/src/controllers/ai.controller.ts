import { Request, Response } from 'express';
import { logger } from '../index';

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

function getClientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  return req.socket.remoteAddress || '127.0.0.1';
}

export class AiController {
  public static async chat(req: Request, res: Response): Promise<void> {
    try {
      const { question, contextData, userApiKey } = req.body;

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

      if (!isCustomKey && currentCount >= MAX_IP_DAILY_QUERIES) {
        res.status(429).json({
          success: false,
          error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: 'Địa chỉ IP của bạn (' + clientIp + ') đã sử dụng hết ' + MAX_IP_DAILY_QUERIES + ' lượt hỏi AI miễn phí hôm nay.',
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
      const websiteName = contextData?.websiteName || 'Sàn Giao Dịch Bất Động Sản';
      const hotline = contextData?.hotline || '0905.568.888';
      const zalo = contextData?.zalo || hotline;

      const systemPrompt = 'Bạn là Trợ lý Ảo AI chuyên gia tư vấn Bất Động Sản cho website "' + websiteName + '".\n' +
        'Quy tắc:\n1. Trả lời bằng tiếng Việt lịch sự, nhiệt tình, chuẩn xác theo pháp lý & phong thủy BĐS.\n' +
        '2. Ngắn gọn, súc tích (dưới 150 từ).\n' +
        '3. Kết thúc bằng lời mời nhắn Zalo ' + zalo + ' hoặc gọi Hotline ' + hotline + ' để nhận bảng giá chi tiết.';

      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + activeApiKey,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: systemPrompt + '\n\nKhách hàng hỏi: "' + question + '"' }],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 600,
            },
          }),
        }
      );

      if (response.ok) {
        const data: any = await response.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        res.status(200).json({
          success: true,
          data: {
            reply: reply ? reply.trim() : 'Dạ em có thể hỗ trợ gì thêm cho anh/chị về dự án này không ạ?',
            remaining,
            max: MAX_IP_DAILY_QUERIES,
            used: isCustomKey ? 0 : currentCount + 1,
          },
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: {
          reply: 'Dạ chào bạn! Để nhận thông tin chi tiết và bảng giá dự án mới nhất, bạn vui lòng gọi Hotline ' + hotline + ' hoặc nhắn tin Zalo ' + zalo + ' để được chuyên viên tư vấn gửi bảng hàng VIP nhé!',
          remaining,
          max: MAX_IP_DAILY_QUERIES,
          used: isCustomKey ? 0 : currentCount + 1,
        },
      });
    } catch (error: any) {
      logger.error('[AiController.chat] Gemini Error: ' + error.message);
      res.status(200).json({
        success: true,
        data: {
          reply: 'Dạ cảm ơn bạn đã quan tâm! Hiện tại hệ thống đang kết nối với chuyên viên tư vấn. Bạn vui lòng gọi Hotline 0905.568.888 hoặc nhắn Zalo để được hỗ trợ báo giá ngay nhé!',
          remaining: 5,
          max: MAX_IP_DAILY_QUERIES,
        },
      });
    }
  }

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
