/**
 * CMS Section Helper — Trích xuất và điều giải dữ liệu tùy biến từ CMS Trang & Bố Cục
 * Cho phép người dùng Thêm / Xóa / Sửa nội dung trên CMS và phản ánh trực tiếp ra Website.
 */

export interface CmsSectionItem {
  id?: string;
  label?: string;
  name?: string;
  title?: string;
  value?: string;
  number?: string;
  desc?: string;
  description?: string;
  icon?: string;
  iconName?: string;
  badge?: string;
  q?: string;
  a?: string;
  [key: string]: any;
}

export function getCmsSections(pageContent: any) {
  const sections = Array.isArray(pageContent?.sections) ? pageContent.sections : [];
  const findSec = (key: string) =>
    sections.find((s: any) => s.sectionKey === key || s.id === key || s.name?.toLowerCase().includes(key));

  return {
    hero: findSec('hero'),
    stats: findSec('stats'),
    overview: findSec('overview'),
    policies: findSec('policies'),
    amenities: findSec('amenities'),
    about: findSec('about'),
    faq: findSec('faq'),
    contact: findSec('contact'),
    cta: findSec('cta'),
  };
}

/**
 * Lấy danh sách thống kê nhanh (QuickStats / Chỉ số)
 * Ưu tiên:
 * 1. hero.content.quickStats (do người dùng chỉnh sửa trong modal Hero Banner - Ảnh 1)
 * 2. stats.content.items (chỉnh sửa trong Thống Kê Nổi Bật)
 * 3. fallbackStats từ template gốc
 */
export function getCmsQuickStats<T = any>(pageContent: any, fallbackStats: T[] = []): T[] {
  if (!pageContent) return fallbackStats;
  const { hero, stats } = getCmsSections(pageContent);

  const heroStats = hero?.content?.quickStats;
  if (Array.isArray(heroStats) && heroStats.length > 0) {
    return heroStats as T[];
  }

  const statsItems = stats?.content?.items;
  if (Array.isArray(statsItems) && statsItems.length > 0) {
    return statsItems as T[];
  }

  return fallbackStats;
}

/**
 * Lấy dữ liệu Hero Banner
 */
export function getCmsHero(pageContent: any, fallbackHero: Record<string, any> = {}) {
  if (!pageContent) return fallbackHero;
  const { hero } = getCmsSections(pageContent);
  const content = hero?.content || {};

  return {
    badge: content.badge || fallbackHero.badge,
    heading: content.heading || fallbackHero.heading || fallbackHero.title,
    headingAccent: content.headingAccent || fallbackHero.headingAccent,
    subtitle: content.subtitle || fallbackHero.subtitle || fallbackHero.desc,
    ctaText: content.ctaText || fallbackHero.ctaText,
    ctaUrl: content.ctaUrl || fallbackHero.ctaUrl,
    backgroundImage: content.backgroundImage || fallbackHero.backgroundImage || fallbackHero.image,
  };
}

/**
 * Lấy dữ liệu Chính Sách Bán Hàng & Ưu Đãi
 */
export function getCmsPolicies<T = any>(pageContent: any, fallbackPolicies: T[] = []): T[] {
  if (!pageContent) return fallbackPolicies;
  const { policies } = getCmsSections(pageContent);
  const items = policies?.content?.items;
  if (Array.isArray(items) && items.length > 0) {
    return items as T[];
  }
  return fallbackPolicies;
}

/**
 * Lấy dữ liệu Tiện Ích Đặc Quyền
 */
export function getCmsAmenities<T = any>(pageContent: any, fallbackAmenities: T[] = []): T[] {
  if (!pageContent) return fallbackAmenities;
  const { amenities } = getCmsSections(pageContent);
  const items = amenities?.content?.items;
  if (Array.isArray(items) && items.length > 0) {
    return items as T[];
  }
  return fallbackAmenities;
}

/**
 * Lấy dữ liệu Tổng Quan & Loại Hình BĐS
 */
export function getCmsOverview<T = any>(pageContent: any, fallbackOverview: T[] = []): T[] {
  if (!pageContent) return fallbackOverview;
  const { overview } = getCmsSections(pageContent);
  const items = overview?.content?.items;
  if (Array.isArray(items) && items.length > 0) {
    return items as T[];
  }
  return fallbackOverview;
}

/**
 * Lấy dữ liệu Câu Hỏi Thường Gặp (FAQ)
 */
export function getCmsFaq<T = any>(pageContent: any, fallbackFaq: T[] = []): T[] {
  if (!pageContent) return fallbackFaq;
  const { faq } = getCmsSections(pageContent);
  const items = faq?.content?.items;
  if (Array.isArray(items) && items.length > 0) {
    return items as T[];
  }
  return fallbackFaq;
}