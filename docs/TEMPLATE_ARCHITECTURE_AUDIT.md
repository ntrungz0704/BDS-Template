# TEMPLATE ARCHITECTURE AUDIT & 100+ SCALABILITY — PLATFORMBDS V2

**Date:** 2026-08-23  
**Auditor:** Principal Software Architect  
**Objective:** Tối ưu hóa kiến trúc Template Engine để mở rộng không giới hạn lên 100+ templates BĐS.

---

## 1. Hiện Trạng & Điểm Nghẽn Cũ (Bottleneck Analysis)

* **Hiện trạng cũ:**
  * Toàn bộ 16 template được render qua một lệnh `switch (slug)` trong file `TenantRenderer.tsx`.
  * Nếu tăng lên 100+ template, file `TenantRenderer.tsx` sẽ phình to thành hàng nghìn dòng mã, khó bảo trì, dễ xung đột khi nhiều lập trình viên cùng làm việc.
* **Giải pháp kiến trúc mới (Modular Template Registry Pattern):**
  * Chuyển sang mô hình **Registry Map** kết hợp **Dynamic Code Splitting**:
  ```text
  apps/website/src/
  ├── components/
  │   └── TenantRenderer.tsx       -> Gọi TemplateRegistry.getRenderer(slug)
  └── templates/
      ├── registry.ts              -> Bản đồ đăng ký tập trung cho 100+ templates
      └── modules/                 -> Các module template độc lập
          ├── luxury-gold/
          ├── modern-villa/
          └── ... (Template #100)
  ```

---

## 2. Thiết Kế Template Registry Chuẩn Hóa

```typescript
export interface TemplateModule {
  id: string;
  slug: string;
  name: string;
  version: string;
  category: string;
  component: React.ComponentType<TemplateProps>;
  defaultTheme?: Record<string, string>;
  defaultSections?: string[];
}

export class WebsiteTemplateRegistry {
  private static registry = new Map<string, TemplateModule>();

  public static register(module: TemplateModule) {
    this.registry.set(module.slug.toLowerCase(), module);
  }

  public static get(slug: string): TemplateModule {
    return this.registry.get(slug.toLowerCase()) || this.registry.get('luxury-gold')!;
  }

  public static list(): TemplateModule[] {
    return Array.from(this.registry.values());
  }
}
```

* **Khi thêm Template thứ 101:**
  * Chỉ cần tạo thư mục module mới và gọi `WebsiteTemplateRegistry.register(template101)`.
  * Không cần chỉnh sửa code lõi của Website Engine hay các template khác.

---

## 3. Tận Dụng Shared UI Components (`packages/ui`)

Để tránh lặp lại code HTML/CSS giữa 100+ templates, các thành phần dùng chung được đóng gói vào `packages/ui`:

| Shared Component | Chức năng dùng chung |
| :--- | :--- |
| **`ProjectCard`** | Hiển thị thẻ dự án BĐS (Ảnh, giá, diện tích, phòng ngủ, vị trí, nhãn trạng thái). |
| **`ProjectGrid`** | Lưới hiển thị danh sách dự án với bộ lọc responsive. |
| **`BlogCard` & `BlogGrid`** | Thẻ tin tức, danh mục, ngày đăng, trích dẫn bài viết. |
| **`ContactForm`** | Form liên hệ với xác thực SĐT, Email, thông báo trạng thái gửi. |
| **`LeadForm`** | Form pop-up thu thập thông tin khách hàng tiềm năng nhận bảng giá & mặt bằng. |
| **`HeroSection`** | Khối Banner Hero linh hoạt tiêu đề, nút gọi hotline, nút chat Zalo. |
| **`AboutSection`** | Khối giới thiệu công ty/sàn giao dịch kèm bộ đếm số liệu ấn tượng. |
| **`GalleryGrid`** | Thư viện hình ảnh thực tế chất lượng cao. |

---

## 4. Tách Biệt Tuyệt Đối: Content vs Template Presentation

* **Mã nguồn Template (Presentation Layer):**
  * Chỉ chứa cấu trúc HTML, styling CSS, và nhận Props: `{ company, theme, projects, posts, initialPage }`.
  * Tuyệt đối không hardcode tên công ty, số điện thoại hay dự án cụ thể.
* **Dữ liệu Khách hàng (Content Layer):**
  * Được lưu độc lập trong cơ sở dữ liệu của từng `Tenant`.
  * Một Template Master duy nhất có thể phục vụ cho hàng nghìn Customer Website Instances khác nhau.

---

## 5. Quản Lý Phiên Bản (Template Versioning)

* Khi Super Admin phát hành phiên bản mới của một template (VD: `luxury-gold v2.0.0`):
  * Khách hàng cũ đang dùng `v1.0.0` vẫn tiếp tục hoạt động ổn định và không bị gãy giao diện.
  * Khách hàng mới được gán mặc định phiên bản mới nhất.
  * Super Admin có thể tùy chọn nâng cấp phiên bản cho từng khách hàng cụ thể khi cần.
