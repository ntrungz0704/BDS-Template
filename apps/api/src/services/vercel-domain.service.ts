import { logger } from '../index';

export class VercelDomainService {
  private apiToken: string;
  private projectId: string;
  private teamId?: string;

  constructor() {
    this.apiToken = process.env.VERCEL_API_TOKEN || '';
    this.projectId = process.env.VERCEL_PROJECT_ID || process.env.VERCEL_WEBSITE_PROJECT_ID || 'bds-template-website';
    this.teamId = process.env.VERCEL_TEAM_ID;
  }

  /**
   * Tự động đăng ký subdomain hoặc custom domain vào Vercel project qua Vercel REST API
   * Hoàn toàn tự động khi Admin duyệt đơn hàng, không cần thao tác tay trên Vercel.
   */
  public async addDomainToVercel(domainName: string): Promise<{ success: boolean; error?: string }> {
    if (!this.apiToken) {
      logger.info(`[Vercel Domain] Không có VERCEL_API_TOKEN, bỏ qua bước auto-add domain "${domainName}"`);
      return { success: true };
    }

    try {
      const url = `https://api.vercel.com/v10/projects/${this.projectId}/domains${
        this.teamId ? `?teamId=${this.teamId}` : ''
      }`;

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: domainName }),
      });

      const data = await res.json() as any;

      if (!res.ok) {
        const errorMsg = data?.error?.message || res.statusText;
        if (data?.error?.code === 'domain_already_in_use' || errorMsg?.includes('already')) {
          logger.info(`[Vercel Domain] Domain "${domainName}" đã tồn tại sẵn trong Vercel.`);
          return { success: true };
        }
        logger.warn(`[Vercel Domain] ⚠️ Lỗi khi tự động thêm domain "${domainName}" vào Vercel: ${errorMsg}`);
        return { success: false, error: errorMsg };
      }

      logger.info(`[Vercel Domain] ✅ Đã tự động thêm domain "${domainName}" vào Vercel Project thành công!`);
      return { success: true };
    } catch (err: any) {
      logger.warn(`[Vercel Domain] ⚠️ Exception khi thêm domain "${domainName}" vào Vercel: ${err.message}`);
      return { success: false, error: err.message };
    }
  }

  /**
   * Tự động xóa domain khỏi Vercel project khi website bị xóa
   */
  public async removeDomainFromVercel(domainName: string): Promise<{ success: boolean; error?: string }> {
    if (!this.apiToken) {
      return { success: true };
    }

    try {
      const url = `https://api.vercel.com/v9/projects/${this.projectId}/domains/${domainName}${
        this.teamId ? `?teamId=${this.teamId}` : ''
      }`;

      const res = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
        },
      });

      if (!res.ok) {
        const data = await res.json() as any;
        logger.warn(`[Vercel Domain] ⚠️ Lỗi khi xóa domain "${domainName}" khỏi Vercel: ${data?.error?.message}`);
        return { success: false, error: data?.error?.message };
      }

      logger.info(`[Vercel Domain] 🗑️ Đã xóa domain "${domainName}" khỏi Vercel Project`);
      return { success: true };
    } catch (err: any) {
      logger.warn(`[Vercel Domain] ⚠️ Lỗi khi xóa domain "${domainName}" khỏi Vercel: ${err.message}`);
      return { success: false, error: err.message };
    }
  }
}

export const vercelDomainService = new VercelDomainService();
