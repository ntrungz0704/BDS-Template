/**
 * Section Content Helper
 * 
 * Giúp template components đọc nội dung section từ pageContent (DB)
 * với fallback về default content khi chưa có dữ liệu trong DB.
 * 
 * Quy tắc:
 * - Layout/cấu trúc: KHÔNG đổi (cố định theo template)
 * - Nội dung (text, images, links): ĐỔI ĐƯỢC qua CMS
 * - Nếu DB chưa có section → dùng default (hardcoded hiện tại)
 */

export interface SectionData {
  id: string;
  sectionKey: string;
  label?: string;
  isVisible: boolean;
  sortOrder: number;
  content: Record<string, any>;
  settings?: Record<string, any>;
  version: number;
}

export interface PageContent {
  id: string;
  slug: string;
  title: string;
  published: boolean;
  sections: SectionData[];
}

/**
 * Trích xuất nội dung section theo key, merge với default content
 * để đảm bảo không thiếu field nào.
 * 
 * @param sections - Mảng sections từ pageContent (DB)
 * @param sectionKey - Key của section cần lấy (vd: "hero", "stats", "about")
 * @param defaultContent - Nội dung mặc định (hardcoded) để fallback
 * @returns Nội dung section đã merge
 */
export function getSectionContent<T extends Record<string, any>>(
  sections: SectionData[] | undefined | null,
  sectionKey: string,
  defaultContent: T
): T {
  if (!sections || sections.length === 0) return defaultContent;

  const section = sections.find((s) => s.sectionKey === sectionKey);
  if (!section || !section.content) return defaultContent;

  // Deep merge: default values filled in where DB content is missing
  return deepMerge(defaultContent, section.content as Partial<T>) as T;
}

/**
 * Lấy settings (visual: padding, bg, animation) của section
 */
export function getSectionSettings(
  sections: SectionData[] | undefined | null,
  sectionKey: string,
  defaultSettings: Record<string, any> = {}
): Record<string, any> {
  if (!sections || sections.length === 0) return defaultSettings;

  const section = sections.find((s) => s.sectionKey === sectionKey);
  if (!section || !section.settings) return defaultSettings;

  return { ...defaultSettings, ...section.settings };
}

/**
 * Kiểm tra section có visible không.
 * Nếu section không tồn tại trong DB → mặc định visible (true).
 */
export function isSectionVisible(
  sections: SectionData[] | undefined | null,
  sectionKey: string
): boolean {
  if (!sections || sections.length === 0) return true;

  const section = sections.find((s) => s.sectionKey === sectionKey);
  if (!section) return true; // Section chưa có trong DB → hiển thị default

  return section.isVisible;
}

/**
 * Lấy danh sách sections đã sắp xếp theo sortOrder
 */
export function getSortedSectionKeys(
  sections: SectionData[] | undefined | null,
  defaultOrder: string[]
): string[] {
  if (!sections || sections.length === 0) return defaultOrder;

  const sorted = [...sections]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((s) => s.sectionKey);

  // Thêm các section default chưa có trong DB
  const allKeys = [...sorted];
  for (const key of defaultOrder) {
    if (!allKeys.includes(key)) {
      allKeys.push(key);
    }
  }

  return allKeys;
}

/**
 * Deep merge hai objects.
 * Arrays: dùng source nếu có (không merge phần tử).
 * Objects: merge đệ quy.
 * Primitives: dùng source nếu khác undefined/null.
 */
function deepMerge<T extends Record<string, any>>(
  target: T,
  source: Partial<T>
): T {
  const result = { ...target };

  for (const key in source) {
    const sourceVal = source[key];
    const targetVal = target[key];

    if (sourceVal === undefined || sourceVal === null) {
      continue; // Giữ giá trị default
    }

    if (Array.isArray(sourceVal)) {
      // Arrays: dùng source array trực tiếp (tenant đã customize)
      (result as any)[key] = sourceVal;
    } else if (
      typeof sourceVal === 'object' &&
      !Array.isArray(sourceVal) &&
      typeof targetVal === 'object' &&
      !Array.isArray(targetVal) &&
      targetVal !== null
    ) {
      // Nested objects: merge đệ quy
      (result as any)[key] = deepMerge(targetVal, sourceVal);
    } else {
      // Primitives: dùng source
      (result as any)[key] = sourceVal;
    }
  }

  return result;
}

export default {
  getSectionContent,
  getSectionSettings,
  isSectionVisible,
  getSortedSectionKeys,
};
