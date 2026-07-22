export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'TENANT_OWNER' | 'EDITOR' | 'STAFF' | 'CUSTOMER' | 'GUEST';

export type OrderStatus =
  | 'PENDING'
  | 'PENDING_SUBDOMAIN_CONFLICT'
  | 'AWAITING_MANUAL_REVIEW'
  | 'WAITING_CONFIRM'
  | 'COMPLETED'
  | 'REJECTED';

export type ProjectStatus = 'COMING_SOON' | 'SELLING' | 'SOLD_OUT';

export type ProjectType = 'APARTMENT' | 'VILLA' | 'TOWNHOUSE' | 'LAND' | 'COMMERCIAL' | 'OFFICE';

export interface UserSessionPayload {
  userId: string;
  email: string;
  role: UserRole;
  tenantId: string | null;
}

export interface StandardResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any[];
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}
