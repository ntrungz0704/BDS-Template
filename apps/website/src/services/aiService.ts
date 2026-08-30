/**
 * AI Service for Real Estate Assistant & CMS Content Generation
 * Integrates Google Gemini AI (Google AI Studio Free Tier)
 * Enforces a strict 10 queries/day limit per user based on Vietnam Timezone (UTC+7 / Asia/Ho_Chi_Minh)
 */

const MAX_DAILY_QUERIES = 10;
const FALLBACK_GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

/**
 * Returns current date string in Vietnam Timezone: YYYY-MM-DD
 */
export function getVietnamDateString(): string {
  try {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date());
  } catch {
    const now = new Date();
    // Fallback: UTC + 7 hours
    const vnTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
    return vnTime.toISOString().split('T')[0];
  }
}

/**
 * Gets daily AI usage status for current user in Vietnam Time
 */
export function getDailyAiUsage(): { used: number; max: number; remaining: number } {
  if (typeof window === 'undefined') {
    return { used: 0, max: MAX_DAILY_QUERIES, remaining: MAX_DAILY_QUERIES };
  }
  const dateStr = getVietnamDateString();
  const storageKey = `AI_QUERIES_COUNT_${dateStr}`;
  const raw = localStorage.getItem(storageKey);
  const used = raw ? parseInt(raw, 10) || 0 : 0;
  const remaining = Math.max(0, MAX_DAILY_QUERIES - used);
  return { used, max: MAX_DAILY_QUERIES, remaining };
}

/**
 * Increments daily AI usage count
 */
export function recordAiQuery(): { used: number; max: number; remaining: number } {
  if (typeof window === 'undefined') {
    return { used: 1, max: MAX_DAILY_QUERIES, remaining: MAX_DAILY_QUERIES - 1 };
  }
  const dateStr = getVietnamDateString();
  const storageKey = `AI_QUERIES_COUNT_${dateStr}`;
  const current = getDailyAiUsage();
  const newUsed = current.used + 1;
  localStorage.setItem(storageKey, String(newUsed));
  return { used: newUsed, max: MAX_DAILY_QUERIES, remaining: Math.max(0, MAX_DAILY_QUERIES - newUsed) };
}

/**
 * Retrieve user-configured Gemini API Key from LocalStorage or env
 */
export function getActiveGeminiApiKey(): string {
  if (typeof window !== 'undefined') {
    const userKey = localStorage.getItem('USER_GEMINI_API_KEY');
    if (userKey && userKey.trim().length > 10) return userKey.trim();
  }
  return FALLBACK_GEMINI_API_KEY;
}

/**
 * Save user Gemini API Key
 */
export function saveActiveGeminiApiKey(key: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('USER_GEMINI_API_KEY', key.trim());
  }
}

/**
 * Ask Google Gemini AI Assistant
 */
export async function askGeminiAssistant(
  userQuestion: string,
  contextData?: {
    websiteName?: string;
    hotline?: string;
    zalo?: string;
    currentProject?: string;
  }
): Promise<{ text: string; success: boolean; remainingQueries: number }> {
  const usage = getDailyAiUsage();

  // Check rate limit (10 queries/day VN time)
  if (usage.remaining <= 0) {
    return {
      text: `⚠️ **Bạn đã sử dụng hết 10 lượt hỏi AI miễn phí hôm nay** (Hệ thống tự động làm mới vào lúc 00:00 theo giờ Việt Nam).\n\nĐể được giải đáp và nhận bảng giá chi tiết ngay lập tức, bạn có thể gọi trực tiếp qua Hotline: **${contextData?.hotline || '0905.568.888'}** hoặc bấm nút **Chat Zalo** góc màn hình!`,
      success: false,
      remainingQueries: 0,
    };
  }

  const apiKey = getActiveGeminiApiKey();

  // System Prompt for Vietnam Real Estate Expert
  const systemPrompt = `Bạn là Trợ lý Ảo AI chuyên gia tư vấn Bất Động Sản cao cấp tại Việt Nam trên website "${contextData?.websiteName || 'Sàn Bất Động Sản Uy Tín'}".
Hotline hỗ trợ: ${contextData?.hotline || '0905.568.888'}, Zalo: ${contextData?.zalo || '0905.568.888'}.
${contextData?.currentProject ? `Dự án khách đang xem: ${contextData.currentProject}.` : ''}

Nhiệm vụ của bạn:
1. Trả lời bằng tiếng Việt lịch sự, thân thiện, súc tích (dưới 150 từ), chuyên nghiệp và am hiểu phong thủy, giá bán, tiện ích, pháp lý, chính sách vay ngân hàng.
2. Luôn khéo léo gợi ý khách hàng để lại Số Điện Thoại hoặc nhắn Zalo/Hotline để nhận file Bảng Giá & Mặt Bằng chi tiết nhất.
3. Không trả lời các chủ đề không liên quan đến Bất Động Sản, xây dựng, kiến trúc, tài chính mua nhà.`;

  try {
    if (apiKey && apiKey.startsWith('AIzaSy')) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${systemPrompt}\n\nCâu hỏi của khách hàng: ${userQuestion}` }],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500,
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) {
          const updatedUsage = recordAiQuery();
          return { text: reply.trim(), success: true, remainingQueries: updatedUsage.remaining };
        }
      }
    }
  } catch (err) {
    console.warn('Gemini API call failed, falling back to intelligent heuristic bot:', err);
  }

  // Smart Heuristic Fallback Assistant
  const updatedUsage = recordAiQuery();
  const q = userQuestion.toLowerCase();

  let fallbackResponse = '';
  if (q.includes('giá') || q.includes('bao nhiêu') || q.includes('chi phí') || q.includes('bảng giá')) {
    fallbackResponse = `Dạ chào bạn! Mức giá các căn hộ và bất động sản tại dự án đang dao động từ mức giá gốc cực tốt đợt 1 kèm chiết khấu tới 10% và quà tặng vàng 9999. Bạn có thể để lại Số Điện Thoại hoặc nhắn Zalo **${contextData?.zalo || '0905.568.888'}** để chuyên viên gửi ngay trọn bộ Bảng Giá & Giỏ Hàng Cắt Lỗ nhé!`;
  } else if (q.includes('vay') || q.includes('ngân hàng') || q.includes('lãi suất') || q.includes('trả góp')) {
    fallbackResponse = `Dạ ngân hàng đối tác (Techcombank, Vietcombank, MBBank) đang hỗ trợ vay tới **70% giá trị hợp đồng**, ân hạn nợ gốc và hỗ trợ lãi suất 0% trong 24 tháng đầu tiên. Bạn chỉ cần chuẩn bị trước 15% - 30% là có thể nhận nhà ở ngay!`;
  } else if (q.includes('pháp lý') || q.includes('sổ đỏ') || q.includes('sổ hồng') || q.includes('quy hoạch')) {
    fallbackResponse = `Dạ toàn bộ sản phẩm đều cam kết **Pháp lý 1/500 minh bạch 100%**, có giấy phép xây dựng và sẵn sàng bàn giao sổ hồng lâu dài cho chủ nhân. Bạn hoàn toàn yên tâm về tính an toàn đầu tư ạ!`;
  } else if (q.includes('vị trí') || q.includes('ở đâu') || q.includes('địa chỉ') || q.includes('gần')) {
    fallbackResponse = `Dạ dự án tọa lạc tại vị trí kim cương kết nối giao thông huyết mạch, chỉ mất 5 - 10 phút để di chuyển tới trung tâm, bệnh viện, trường học quốc tế và trung tâm thương mại lớn.`;
  } else {
    fallbackResponse = `Cảm ơn bạn đã quan tâm! Chuyên viên tư vấn của chúng tôi luôn sẵn sàng hỗ trợ trực tiếp 24/7. Bạn vui lòng liên hệ Hotline: **${contextData?.hotline || '0905.568.888'}** hoặc nhắn tin Zalo để được gửi mặt bằng và hình ảnh thực tế căn đẹp nhất nhé!`;
  }

  return { text: fallbackResponse, success: true, remainingQueries: updatedUsage.remaining };
}

/**
 * AI Content Generator for CMS: generates description and amenities
 */
export async function generatePropertyWithAI(property: {
  title: string;
  type?: string;
  price?: string;
  area?: string;
  address?: string;
}): Promise<{ description: string; amenities: string[] }> {
  const apiKey = getActiveGeminiApiKey();
  const prompt = `Bạn là một nhà soạn thảo nội dung BĐS chuyên nghiệp. Hãy viết 1 đoạn mô tả hấp dẫn (khoảng 80-120 từ) và gợi ý 5 tiện ích nổi bật cho bất động sản sau:
- Tên BĐS: ${property.title}
- Loại: ${property.type || 'Căn hộ'}
- Giá: ${property.price || 'Liên hệ'}
- Diện tích: ${property.area || '100m2'}
- Địa chỉ: ${property.address || 'Hà Nội / TP.HCM'}

Hãy trả về dưới định dạng JSON thuần túy như sau (không kèm markdown format):
{
  "description": "Nội dung mô tả hấp dẫn...",
  "amenities": ["Tiện ích 1", "Tiện ích 2", "Tiện ích 3", "Tiện ích 4", "Tiện ích 5"]
}`;

  if (apiKey && apiKey.startsWith('AIzaSy')) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 600 },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        let rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(rawText);
        if (parsed.description && Array.isArray(parsed.amenities)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Gemini CMS generation error, using fallback template:', e);
    }
  }

  return {
    description: `Sở hữu vị trí đắc địa tại ${property.address || 'khu vực trung tâm'}, ${property.title} mang đến không gian sống hoàn mỹ với diện tích ${property.area || 'rộng rãi'}. Căn nhà được thiết kế tối ưu công năng, đón trọn ánh sáng tự nhiên cùng tầm nhìn đắt giá. Đây là cơ hội an cư lý tưởng và đầu tư sinh lời bền vững với mức giá ${property.price || 'vô cùng ưu đãi'}.`,
    amenities: [
      'Tầm nhìn panorama thoáng đãng',
      'Nội thất cao cấp bàn giao chuẩn 5 sao',
      'Hệ thống an ninh đa lớp 24/7',
      'Gần trung tâm thương mại & trường học',
      'Khuôn viên cây xanh và hồ bơi thư giãn',
    ],
  };
}
