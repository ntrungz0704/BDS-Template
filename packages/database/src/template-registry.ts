export interface MigrationRule {
  versionFrom: number;
  versionTo: number;
  transform: (data: any) => any;
}

export interface RegisteredTemplate {
  id: string;
  name: string;
  slug: string;
  pages: string[];
  sections: Array<{ id: string; name: string; type: string; defaultContent: any }>;
  themeVariables: string[];
  defaultConfig: {
    themeConfig: any;
    layoutConfig: any;
    featureFlags: any;
    components: any;
  };
  defaultCompanyInfo?: any;
  defaultProjects?: any[];
  defaultPosts?: any[];
  migrationRules: MigrationRule[];
}

export class TemplateRegistry {
  private static templates: Map<string, RegisteredTemplate> = new Map();

  public static register(template: RegisteredTemplate) {
    this.templates.set(template.id, template);
    this.templates.set(template.slug, template); // support lookup by slug as well
  }

  public static get(idOrSlug: string): RegisteredTemplate | undefined {
    return this.templates.get(idOrSlug);
  }

  public static list(): RegisteredTemplate[] {
    // Unique list to avoid duplicates from id & slug mapping
    const unique = new Set(this.templates.values());
    return Array.from(unique);
  }

  public static migrate(templateId: string, currentVersion: number, targetVersion: number, data: any): any {
    const template = this.get(templateId);
    if (!template) return data;

    let migratedData = JSON.parse(JSON.stringify(data)); // Deep clone
    const rules = template.migrationRules.sort((a, b) => a.versionFrom - b.versionFrom);

    for (const rule of rules) {
      if (rule.versionFrom >= currentVersion && rule.versionTo <= targetVersion) {
        migratedData = rule.transform(migratedData);
      }
    }
    return migratedData;
  }
}

// ── Register default templates ───────────────────────────
TemplateRegistry.register({
  id: "template-1", // Match database seed template id
  name: "Luxury Gold",
  slug: "luxury-gold",
  pages: ["home", "about", "projects", "blog", "contact"],
  sections: [
    { id: "hero", name: "Hero Banner", type: "hero", defaultContent: { title: "Tìm Kiếm Không Gian Sống Mơ Ước", subtitle: "Hơn 10,000+ bất động sản cao cấp đang chờ bạn khám phá." } },
    { id: "stats", name: "Thống kê nổi bật", type: "stats", defaultContent: { title: "Thống kê" } },
    { id: "projects", name: "Dự án nổi bật", type: "projects", defaultContent: { title: "Dự án tiêu biểu" } },
    { id: "contact", name: "Liên hệ", type: "contact", defaultContent: { title: "Đặt lịch tư vấn" } }
  ],
  themeVariables: [
    "primaryColor",
    "secondaryColor",
    "accentColor",
    "backgroundColor",
    "textColor",
    "fontHeading",
    "fontBody",
    "borderRadius",
    "shadow"
  ],
  defaultConfig: {
    themeConfig: {
      primaryColor: '#C5A572',
      secondaryColor: '#1A1A2E',
      accentColor: '#D4AF37',
      backgroundColor: '#070C1E',
      surfaceColor: '#111831',
      textColor: '#FFFFFF',
      textMutedColor: '#9A9AA8',
      borderColor: '#D4AF3766',
      fontHeading: 'Playfair Display',
      fontBody: 'Plus Jakarta Sans',
      borderRadius: '0px',
      shadowStyle: 'hard',
      buttonStyle: 'rounded',
      animationsEnabled: true
    },
    layoutConfig: {
      pages: [
        {
          slug: 'home',
          name: 'Trang chủ',
          sections: [
            { id: 'hero', name: 'Hero Banner', type: 'hero', content: { title: 'DINH THỰ HOÀNG GIA BÊN DÒNG SÔNG NGỌC', subtitle: 'Kiệt tác kiến trúc Ý độc tôn dành cho 18 vị chủ nhân giới tinh hoa, sở hữu bến du thuyền riêng và tầm nhìn bao trọn sông Sài Gòn.' } },
            { id: 'stats', name: 'Thống kê nổi bật', type: 'stats', content: { title: 'Thống kê' } },
            { id: 'projects', name: 'Dự án nổi bật', type: 'projects', content: { title: 'Dự Án Tiêu Biểu' } },
            { id: 'contact', name: 'Liên hệ', type: 'contact', content: { title: 'Đặt Lịch Hẹn Tư Vấn' } }
          ]
        },
        {
          slug: 'about',
          name: 'Giới thiệu',
          sections: [
            { id: 'hero', name: 'Hero Banner', type: 'hero', content: { title: 'Về chúng tôi', subtitle: 'Chúng tôi xây dựng tổ ấm đẳng cấp.' } }
          ]
        }
      ]
    },
    featureFlags: {
      enableCrm: true,
      enableBlog: true,
      enableProjects: true
    },
    components: {}
  },
  defaultCompanyInfo: {
    name: 'Hoàng Gia Land',
    slogan: 'ROYAL RESIDENCE EXCLUSIVE',
    description: 'Kiệt tác kiến trúc Ý độc tôn dành cho 18 vị chủ nhân giới tinh hoa, sở hữu bến du thuyền riêng và tầm nhìn bao trọn sông Sài Gòn.',
    address: 'Bán đảo Thảo Điền - Quận 2, TP. Thủ Đức',
    phone: '0983312219',
    email: 'royal@hoanggialand.platformbds.vn',
    workingHours: '8h00 - 20h00',
    aboutContent: 'Chúng tôi đem lại không gian sống thượng lưu bậc nhất Việt Nam.'
  },
  defaultProjects: [
    {
      title: 'Penthouse Sky Residences',
      slug: 'penthouse-sky-residences',
      description: 'Penthouse thông tầng đẳng cấp bậc nhất Quận 1 với hồ bơi vô cực riêng và tầm nhìn bao quát toàn bộ sông Sài Gòn và trung tâm thành phố.',
      shortDescription: 'Penthouse thông tầng đẳng cấp thượng lưu',
      type: 'APARTMENT',
      status: 'SELLING',
      price: '85 Tỷ VNĐ',
      area: '650m²',
      address: 'Quận 1, TP. Hồ Chí Minh',
      thumbnail: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      published: true
    },
    {
      title: 'Grand Villa Riverside',
      slug: 'grand-villa-riverside',
      description: 'Biệt thự đơn lập hướng sông phong cách Tân cổ điển lịch lãm tại Vinhomes Riverside, mang lại không gian sống thanh bình và biệt lập.',
      shortDescription: 'Biệt thự đơn lập ven sông cực kỳ đẳng cấp',
      type: 'VILLA',
      status: 'SELLING',
      price: '45 Tỷ VNĐ',
      area: '420m²',
      address: 'Long Biên, Hà Nội',
      thumbnail: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800&q=80',
      published: true
    }
  ],
  migrationRules: [
    {
      versionFrom: 10, // v1.0
      versionTo: 11,   // v1.1
      transform: (data: any) => {
        // Ví dụ luật di cư v1.0 -> v1.1: thêm default subtitle cho section stats nếu chưa có
        if (data.layoutConfig?.pages) {
          data.layoutConfig.pages = data.layoutConfig.pages.map((p: any) => {
            p.sections = p.sections.map((s: any) => {
              if (s.type === 'stats' && !s.content.subtitle) {
                s.content.subtitle = "Số liệu thực tế được kiểm chứng";
              }
              return s;
            });
            return p;
          });
        }
        return data;
      }
    },
    {
      versionFrom: 11, // v1.1
      versionTo: 12,   // v1.2
      transform: (data: any) => {
        // Ví dụ luật di cư v1.1 -> v1.2: thêm cấu hình Zalo chat mặc định
        if (data.featureFlags) {
          data.featureFlags.enableZaloChat = true;
        }
        return data;
      }
    }
  ]
});
