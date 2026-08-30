/**
 * Demo Contact Form Helper
 * Gửi dữ liệu liên hệ từ các mẫu Demo Template về API /api/marketplace/contact
 * Tự động tạo bản ghi Order (Contact) + Notification thông báo cho Super Admin kèm SĐT khách.
 */

export interface DemoContactPayload {
  fullName: string;
  phone: string;
  email?: string;
  selectedTemplate?: string;
  packageInterest?: string;
  message?: string;
}

export async function submitDemoContact(payload: DemoContactPayload): Promise<{ success: boolean; message?: string }> {
  try {
    const API_URL = (process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:5000' : 'https://bds-template-api.onrender.com'));
    const phoneClean = payload.phone.replace(/\s/g, '');
    
    // Validate phone number format
    if (!/^(0|\+84)[0-9]{9,10}$/.test(phoneClean)) {
      return { success: false, message: 'Số điện thoại phải bắt đầu bằng 0 hoặc +84, từ 10-11 số.' };
    }

    const res = await fetch(`${API_URL}/api/marketplace/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: payload.fullName.trim(),
        phone: phoneClean,
        email: payload.email?.trim() || '',
        selectedTemplate: payload.selectedTemplate || 'demo-template',
        packageInterest: payload.packageInterest || 'Tư vấn mua template',
        message: payload.message?.trim() || 'Khách liên hệ từ trang Demo Template',
      }),
    });

    const data = await res.json();
    if (res.ok && data.success) {
      return { success: true, message: data.data?.message || 'Đã gửi yêu cầu tư vấn thành công!' };
    } else {
      return { success: false, message: data.error?.message || 'Không thể gửi yêu cầu. Vui lòng thử lại.' };
    }
  } catch (err: any) {
    return { success: false, message: 'Lỗi kết nối máy chủ. Vui lòng gọi trực tiếp Hotline.' };
  }
}

export default submitDemoContact;

