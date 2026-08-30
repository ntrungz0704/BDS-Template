/**
 * Advanced AI Real Estate Engine with Dynamic Knowledge Base (RAG)
 * Automatically adapts to any CMS modifications made by template owners
 * Integrates Google Gemini AI with deep Vietnam Real Estate Domain Knowledge
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

export interface AiProjectItem {
  id?: string | number;
  title: string;
  type?: string;
  price?: string | number;
  area?: string;
  bedrooms?: number;
  bathrooms?: number;
  direction?: string;
  address?: string;
  amenities?: string[];
  description?: string;
}

export interface AiWebsiteContext {
  websiteName?: string;
  slogan?: string;
  hotline?: string;
  zalo?: string;
  email?: string;
  address?: string;
  projects?: AiProjectItem[];
  currentProject?: string;
}

/**
 * Build dynamic CMS knowledge text from the owner's customized data
 */
function buildDynamicCmsKnowledge(context?: AiWebsiteContext): string {
  if (!context) return 'Không có dữ liệu giỏ hàng.';

  const brandInfo = `
THÔNG TIN SÀN BẤT ĐỘNG SẢN:
- Tên thương hiệu: ${context.websiteName || 'Sàn Giao Dịch Bất Động Sản Uy Tín'}
- Slogan: ${context.slogan || 'Nâng Tầm Không Gian Sống'}
- Hotline tư vấn 24/7: ${context.hotline || '0905.568.888'}
- Số Zalo tiếp nhận hồ sơ: ${context.zalo || '0905.568.888'}
- Địa chỉ văn phòng: ${context.address || 'TP. Hồ Chí Minh / Hà Nội'}
`;

  const projects = context.projects || [];
  if (projects.length === 0) {
    return brandInfo + '\n(Chủ sàn chưa đăng bất động sản cụ thể, hãy tư vấn dịch vụ môi giới chung)';
  }

  const projectListStr = projects.map((p, idx) => {
    const amenitiesStr = Array.isArray(p.amenities) && p.amenities.length > 0
      ? `\n    + Tiện ích nổi bật: ${p.amenities.join(', ')}`
      : '';
    const descStr = p.description ? `\n    + Mô tả: ${p.description.slice(0, 200)}...` : '';
    return `  ${idx + 1}. [${p.type || 'BĐS'}] ${p.title}
    + Mức giá: ${typeof p.price === 'number' ? p.price.toLocaleString('vi-VN') + ' đ' : (p.price || 'Liên hệ')}
    + Diện tích: ${p.area || 'Đang cập nhật'} ${p.direction ? `| Hướng: ${p.direction}` : ''}
    + Vị trí / Địa chỉ: ${p.address || 'Trung tâm'}
    ${amenitiesStr}${descStr}`;
  }).join('\n\n');

  return `${brandInfo}

GIỎ HÀNG BẤT ĐỘNG SẢN ĐANG MỞ BÁN / CHO THUÊ TRÊN WEBSITE NÀY:
${projectListStr}`;
}

/**
 * Ask Google Gemini AI Assistant with Dynamic CMS Knowledge & Deep Real Estate Intelligence
 */
export async function askGeminiAssistant(
  userQuestion: string,
  contextData?: AiWebsiteContext
): Promise<{ text: string; success: boolean; remainingQueries: number }> {
  const usage = getDailyAiUsage();

  // Check rate limit (10 queries/day VN time)
  if (usage.remaining <= 0) {
    return {
      text: `⚠️ **Bạn đã sử dụng hết 10 lượt hỏi AI miễn phí hôm nay** (Hệ thống tự động làm mới vào lúc 00:00 theo giờ Việt Nam).\n\nĐể nhận bảng giá, lịch xem nhà và chính sách chiết khấu ngay bây giờ, bạn vui lòng gọi trực tiếp Hotline: **${contextData?.hotline || '0905.568.888'}** hoặc bấm nút **Chat Zalo** góc màn hình nhé!`,
      success: false,
      remainingQueries: 0,
    };
  }

  const apiKey = getActiveGeminiApiKey();
  const cmsKnowledge = buildDynamicCmsKnowledge(contextData);

  // Deep Real Estate System Prompt
  const systemPrompt = `Bạn là Trợ lý Ảo AI cao cấp, chuyên gia tư vấn Bất Động Sản hàng đầu Việt Nam cho website "${contextData?.websiteName || 'Sàn Bất Động Sản'}".

DƯỚI ĐÂY LÀ DỮ LIỆU THỰC TẾ MỚI NHẤT MÀ CHỦ SÀN / SALE ĐÃ CẬP NHẬT TRÊN WEBSITE NÀY:
===================================================================
${cmsKnowledge}
===================================================================

KIẾN THỨC CHUYÊN MÔN BẤT ĐỘNG SẢN VIỆT NAM (BẠN ĐÃ ĐƯỢC HUẤN LUYỆN CHUYÊN SÂU):
1. PHÁP LÝ & LUẬT NHÀ Ở / LUẬT ĐẤT ĐAI MỚI NHẤT:
   - Sổ hồng, Sổ đỏ lâu dài vs Sở hữu 50 năm.
   - Hợp đồng mua bán (HĐMB), Giấy phép xây dựng, Quy hoạch 1/500.
   - Thủ tục sang tên công chứng: Thuế TNCN (2%), Lệ phí trước bạ (0.5%), Phí công chứng.
2. PHONG THỦY BĐS THỰC HÀNH:
   - Đông Tứ Trạch: Hướng Đông, Đông Nam, Nam, Bắc (hợp mệnh Mộc, Hỏa, Thủy).
   - Tây Tứ Trạch: Hướng Tây, Tây Bắc, Tây Nam, Đông Bắc (hợp mệnh Kim, Thổ).
   - Hướng đón gió mát, vượng khí tài lộc, cách hóa giải góc nhọn, đường đâm.
3. TÀI CHÍNH & VAY NGÂN HÀNG:
   - Cách tính trả góp theo dư nợ giảm dần.
   - Gói vay ân hạn nợ gốc 12-24 tháng, lãi suất ưu đãi 0%.
   - Lời khuyên tài chính: Tỷ lệ nợ vay không nên vượt quá 50% tổng thu nhập hàng tháng.
4. KỸ NĂNG TƯ VẤN & BÁN HÀNG:
   - Luôn ưu tiên tra cứu trong GIỎ HÀNG THỰC TẾ ở trên để trả lời chính xác tên căn, giá, diện tích, vị trí và tiện ích của chủ sàn.
   - Nếu khách hỏi loại BĐS hoặc tầm giá có trong giỏ hàng: Giới thiệu ngay căn đó và nêu bật 2-3 điểm mạnh nhất.
   - Luôn trả lời bằng tiếng Việt lịch sự, thông minh, chuyên nghiệp, ngắn gọn (dưới 150 từ).
   - Luôn khéo léo kết thúc bằng lời mời khách nhắn Zalo **${contextData?.zalo || contextData?.hotline || '0905.568.888'}** hoặc để lại SĐT để gửi bảng giá VIP và lịch đón xem nhà thực tế.`;

  try {
    if (apiKey && apiKey.trim().length > 15) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${systemPrompt}\n\nKhách hàng hỏi: "${userQuestion}"` }],
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
        const data = await response.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) {
          const updatedUsage = recordAiQuery();
          return { text: reply.trim(), success: true, remainingQueries: updatedUsage.remaining };
        }
      }
    }
  } catch (err) {
    console.warn('Gemini API call failed, using dynamic local real estate intelligence:', err);
  }

  // Dynamic Heuristic Knowledge Search (Matches actual CMS projects if API offline)
  const updatedUsage = recordAiQuery();
  const q = userQuestion.toLowerCase();
  const projects = contextData?.projects || [];

  // 1. Try to find matching project by name, type or price
  const matchedProject = projects.find(p => 
    q.includes(p.title.toLowerCase()) || 
    (p.type && q.includes(p.type.toLowerCase())) ||
    (p.address && q.includes(p.address.toLowerCase()))
  );

  let responseText = '';

  if (matchedProject) {
    responseText = `Dạ chào bạn! Về **${matchedProject.title}**, đây là sản phẩm ${matchedProject.type || 'cao cấp'} với mức giá **${matchedProject.price || 'vô cùng ưu đãi'}**, diện tích **${matchedProject.area || 'rộng rãi'}** tại ${matchedProject.address || 'vị trí trung tâm'}. Căn này sở hữu các tiện ích nổi bật: ${matchedProject.amenities?.slice(0, 3).join(', ') || 'an ninh 24/7, khuôn viên xanh'}. Bạn có muốn mình gửi trọn bộ mặt bằng và hỗ trợ đặt lịch xem thực tế qua Zalo **${contextData?.zalo || '0905.568.888'}** không ạ?`;
  } else if (q.includes('giá') || q.includes('bao nhiêu') || q.includes('bảng giá') || q.includes('chiết khấu')) {
    const sample = projects[0];
    responseText = `Dạ trên website của chúng tôi hiện có các bất động sản hấp dẫn ${sample ? `như **${sample.title}** giá chỉ từ **${sample.price}**` : ''} kèm chính sách chiết khấu đợt 1 và quà tặng vàng 9999. Bạn vui lòng để lại Số Điện Thoại hoặc nhắn Zalo **${contextData?.zalo || '0905.568.888'}** để nhận bảng giá chi tiết từng căn nhé!`;
  } else if (q.includes('vay') || q.includes('ngân hàng') || q.includes('lãi suất') || q.includes('trả góp')) {
    responseText = `Dạ đối tác ngân hàng (Techcombank, Vietcombank, MBBank) đang hỗ trợ gói vay ưu đãi tới **70% - 80% giá trị BĐS**, ân hạn nợ gốc và hỗ trợ lãi suất 0% trong 24 tháng. Bạn chỉ cần trả trước 15% - 30% là có thể nhận nhà. Bạn muốn tính toán lịch trả nợ cụ thể theo thu nhập gia đình không ạ?`;
  } else if (q.includes('phong thủy') || q.includes('hướng') || q.includes('tuổi') || q.includes('mệnh')) {
    responseText = `Dạ về phong thủy BĐS, người thuộc **Đông Tứ Mệnh** sẽ hợp hướng Đông, Đông Nam, Nam, Bắc; còn **Tây Tứ Mệnh** hợp hướng Tây, Tây Bắc, Tây Nam, Đông Bắc. Chúng tôi có đa dạng các căn với các hướng đón tài lộc vượng khí. Bạn đang tìm căn hướng nào để mình lọc gửi bạn ngay nhé!`;
  } else if (q.includes('pháp lý') || q.includes('sổ đỏ') || q.includes('sổ hồng') || q.includes('quy hoạch')) {
    responseText = `Dạ toàn bộ sản phẩm trên website đều cam kết **Pháp lý 1/500 minh bạch 100%**, có giấy phép xây dựng và sẵn sàng bàn giao sổ hồng lâu dài cho khách hàng. Mọi thủ tục công chứng, sang tên đều được chuyên viên hỗ trợ trọn gói miễn phí!`;
  } else {
    const topProj = projects[0];
    responseText = `Dạ cảm ơn bạn đã ghé thăm **${contextData?.websiteName || 'Sàn Bất Động Sản'}**! Chúng tôi đang phân phối nhiều căn đẹp ${topProj ? `như **${topProj.title}**` : ''}. Bạn có thể liên hệ Hotline **${contextData?.hotline || '0905.568.888'}** hoặc nhắn tin Zalo để được chuyên viên gửi thông tin giỏ hàng độc quyền ngay nhé!`;
  }

  return { text: responseText, success: true, remainingQueries: updatedUsage.remaining };
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

  if (apiKey && apiKey.trim().length > 15) {
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
