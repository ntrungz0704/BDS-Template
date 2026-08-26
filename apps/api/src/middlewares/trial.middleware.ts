import { Request, Response, NextFunction } from 'express';
import { prisma } from '@repo/database';
import { BUSINESS_CONFIG } from '@repo/config';

/**
 * Middleware: checkTrialOrSubscription
 * 
 * Determines if a tenant has active access to CMS based on:
 * 1. Active subscription (paid) → full access
 * 2. Active trial → access with save quota
 * 3. Expired trial + no subscription → CMS locked
 * 4. Suspended tenant → fully blocked
 * 
 * Sets `req.trialInfo` for downstream controllers to check save quota.
 */

// Extend Express Request to include trial context
declare global {
  namespace Express {
    interface Request {
      trialInfo?: {
        isOnTrial: boolean;
        trialStatus: string | null;
        trialSaveCount: number;
        trialSaveLimit: number;
        trialEndAt: Date | null;
        hasActiveSubscription: boolean;
        isExpiring: boolean; // 24h warning
        remainingSaves: number;
      };
    }
  }
}

export async function checkTrialOrSubscription(req: Request, res: Response, next: NextFunction) {
  const tenantId = req.tenantId;

  // Skip if no tenant context (e.g., public routes without tenant resolution)
  if (!tenantId) {
    return next();
  }

  // Super Admin bypasses all trial/subscription checks
  if (req.user?.role === 'SUPER_ADMIN') {
    return next();
  }

  try {
    // Load tenant with trial fields and subscription in a single query
    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
      select: {
        status: true,
        trialStartAt: true,
        trialEndAt: true,
        trialSaveLimit: true,
        trialSaveCount: true,
        trialStatus: true,
        subscription: {
          select: {
            status: true,
            endDate: true,
          },
        },
      },
    });

    if (!tenant) {
      return next();
    }

    // 1. Check tenant suspension
    if (tenant.status === 'SUSPENDED') {
      return res.status(403).json({
        success: false,
        error: {
          code: 'TENANT_SUSPENDED',
          message: 'Website này đã bị khóa hoặc tạm ngưng hoạt động bởi Quản trị viên.',
        },
      });
    }

    const now = new Date();

    // 2. If tenant status is ACTIVE (purchased, provisioned, or activated by admin), grant full access
    if (tenant.status === 'ACTIVE') {
      req.trialInfo = {
        isOnTrial: false,
        trialStatus: 'ACTIVE',
        trialSaveCount: tenant.trialSaveCount || 0,
        trialSaveLimit: tenant.trialSaveLimit || 999999,
        trialEndAt: null,
        hasActiveSubscription: true,
        isExpiring: false,
        remainingSaves: Infinity,
      };
      return next();
    }

    // 3. Check subscription
    const subscription = tenant.subscription;
    const hasActiveSubscription = subscription
      && subscription.status === 'ACTIVE'
      && new Date(subscription.endDate) > now;

    if (hasActiveSubscription) {
      req.trialInfo = {
        isOnTrial: false,
        trialStatus: tenant.trialStatus,
        trialSaveCount: tenant.trialSaveCount,
        trialSaveLimit: tenant.trialSaveLimit,
        trialEndAt: tenant.trialEndAt,
        hasActiveSubscription: true,
        isExpiring: false,
        remainingSaves: Infinity,
      };
      return next();
    }

    // 4. Check subscription grace period
    if (subscription && subscription.status === 'ACTIVE') {
      const endDate = new Date(subscription.endDate);
      const gracePeriodDays = BUSINESS_CONFIG.SUBSCRIPTION_GRACE_PERIOD_DAYS;
      const gracePeriodEndDate = new Date(endDate.getTime() + gracePeriodDays * 24 * 60 * 60 * 1000);

      if (now <= gracePeriodEndDate) {
        if (req.method === 'GET') {
          req.trialInfo = {
            isOnTrial: false,
            trialStatus: tenant.trialStatus,
            trialSaveCount: tenant.trialSaveCount,
            trialSaveLimit: tenant.trialSaveLimit,
            trialEndAt: tenant.trialEndAt,
            hasActiveSubscription: false,
            isExpiring: true,
            remainingSaves: 0,
          };
          return next();
        }

        return res.status(403).json({
          success: false,
          error: {
            code: 'SUBSCRIPTION_GRACE_PERIOD_RESTRICTED',
            message: 'Website của bạn đã hết hạn gói dịch vụ. Bạn chỉ có thể đọc dữ liệu và gia hạn gói cước.',
          },
        });
      }
    }

    // 5. Check trial
    const trialStatus = tenant.trialStatus;
    const trialEndAt = tenant.trialEndAt;

    if (!trialStatus || !trialEndAt) {
      // Default allow with trial for freshly created tenants
      req.trialInfo = {
        isOnTrial: true,
        trialStatus: 'ACTIVE',
        trialSaveCount: tenant.trialSaveCount || 0,
        trialSaveLimit: tenant.trialSaveLimit || 100,
        trialEndAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        hasActiveSubscription: true,
        isExpiring: false,
        remainingSaves: 100,
      };
      return next();
    }

    // Check if trial has expired by time
    const trialExpired = now > new Date(trialEndAt);

    if (trialExpired || trialStatus === 'EXPIRED' || trialStatus === 'SUSPENDED') {
      // Trial expired — CMS is locked
      // Allow GET requests so customer can still view their data
      if (req.method === 'GET') {
        req.trialInfo = {
          isOnTrial: true,
          trialStatus: 'EXPIRED',
          trialSaveCount: tenant.trialSaveCount,
          trialSaveLimit: tenant.trialSaveLimit,
          trialEndAt: tenant.trialEndAt,
          hasActiveSubscription: false,
          isExpiring: false,
          remainingSaves: 0,
        };
        return next();
      }

      return res.status(403).json({
        success: false,
        error: {
          code: 'TRIAL_EXPIRED',
          message: 'Thời gian dùng thử đã kết thúc. Vui lòng liên hệ Zalo để đăng ký gói sử dụng.',
          data: {
            trialEndAt: tenant.trialEndAt,
            saveCount: tenant.trialSaveCount,
            saveLimit: tenant.trialSaveLimit,
            zaloUrl: BUSINESS_CONFIG.ZALO_CONTACT_URL,
          },
        },
      });
    }

    // Trial is active
    const hoursRemaining = (new Date(trialEndAt).getTime() - now.getTime()) / (1000 * 60 * 60);
    const isExpiring = hoursRemaining <= BUSINESS_CONFIG.TRIAL_WARNING_HOURS;
    const remainingSaves = Math.max(0, tenant.trialSaveLimit - tenant.trialSaveCount);

    req.trialInfo = {
      isOnTrial: true,
      trialStatus: isExpiring ? 'EXPIRING' : 'ACTIVE',
      trialSaveCount: tenant.trialSaveCount,
      trialSaveLimit: tenant.trialSaveLimit,
      trialEndAt: tenant.trialEndAt,
      hasActiveSubscription: false,
      isExpiring,
      remainingSaves,
    };

    next();
  } catch (error) {
    console.error('[Trial Middleware] Error:', error);
    // Fail-open for non-critical errors to avoid blocking legitimate users
    next();
  }
}

/**
 * Middleware: enforceSaveQuota
 * 
 * Checks if the current user has remaining saves during trial.
 * Must be applied AFTER checkTrialOrSubscription.
 * Only blocks write operations (POST, PUT, PATCH, DELETE).
 */
export function enforceSaveQuota(req: Request, res: Response, next: NextFunction) {
  // Only enforce on write operations
  const writeMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];
  if (!writeMethods.includes(req.method)) {
    return next();
  }

  // Super Admin bypass
  if (req.user?.role === 'SUPER_ADMIN') {
    return next();
  }

  const trialInfo = req.trialInfo;

  // If no trial info, skip (might be a non-tenant route)
  if (!trialInfo) {
    return next();
  }

  // If user has active subscription, no save quota applies
  if (trialInfo.hasActiveSubscription) {
    return next();
  }

  // If on trial, check save quota
  if (trialInfo.isOnTrial && trialInfo.remainingSaves <= 0) {
    return res.status(403).json({
      success: false,
      error: {
        code: 'SAVE_QUOTA_EXCEEDED',
        message: `Bạn đã sử dụng hết ${trialInfo.trialSaveLimit} lượt lưu trong thời gian dùng thử.`,
        data: {
          saveCount: trialInfo.trialSaveCount,
          saveLimit: trialInfo.trialSaveLimit,
          zaloUrl: BUSINESS_CONFIG.ZALO_CONTACT_URL,
        },
      },
    });
  }

  next();
}
