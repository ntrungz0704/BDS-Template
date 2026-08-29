import { Prisma } from '../generated/client/index.js';
import { AsyncLocalStorage } from 'async_hooks';

// AsyncLocalStorage to hold tenantId context across asynchronous calls
export const tenantStorage = new AsyncLocalStorage<string>();

/**
 * Prisma Extension for Multi-Tenant Isolation
 * Automatically filters all read, update, delete operations by tenantId if active in context.
 */
export const tenantIsolationExtension = Prisma.defineExtension((client) => {
  return client.$extends({
    query: {
      $allModels: {
        async $allOperations({ model, operation, args, query }) {
          const tenantId = tenantStorage.getStore();
          
          // If no tenant context is set (e.g. background job, system admin), skip isolation
          if (!tenantId) {
            return query(args);
          }

          // Only models with a direct tenantId column belong here. Relation-only
          // children must be scoped by their controller through a tenant-owned
          // parent record.
          const tenantModels = [
            'Order', 'Subscription', 'Project', 'Post', 'Category', 'Tag',
            'Banner', 'Menu', 'CompanyInfo', 'SeoConfig', 'Media',
            'ContactFormSubmission', 'AuditLog',
            'TenantThemeSettings', 'TenantPage', 'TenantSection', 'MediaFolder',
            'MediaAsset', 'MediaRecycleBin', 'Lead', 'LeadNote', 'LeadActivity',
            'TenantApiKey', 'TenantWebhook', 'ContentVersion',
            'TenantDomainSettings', 'TenantMembership',
          ];

          if (tenantModels.includes(model)) {
            // 1. Mutate query read operations (findUnique, findMany, findFirst, count, aggregate, etc.)
            if (
              operation === 'findFirst' || 
              operation === 'findMany' || 
              operation === 'count' || 
              operation === 'aggregate' || 
              operation === 'groupBy'
            ) {
              args.where = {
                ...args.where,
                tenantId,
              };
            }

            if (operation === 'findUnique' || operation === 'findUniqueOrThrow') {
              // Prisma supports extra non-unique predicates in WhereUniqueInput.
              // Keeping the original operation also preserves throw semantics.
              args.where = {
                ...args.where,
                tenantId,
              };
            }

            // 2. Mutate write operations.
            if (operation === 'create') {
              (args as any).data = {
                ...(args as any).data,
                tenantId,
              };
            }

            if (operation === 'createMany' || operation === 'createManyAndReturn') {
              const data = (args as any).data;
              (args as any).data = Array.isArray(data)
                ? data.map((item) => ({ ...item, tenantId }))
                : { ...data, tenantId };
            }

            if (operation === 'upsert') {
              args.where = { ...args.where, tenantId };
              (args as any).create = { ...(args as any).create, tenantId };
            }

            if (
              operation === 'update' || 
              operation === 'updateMany' || 
              operation === 'delete' || 
              operation === 'deleteMany'
            ) {
              args.where = {
                ...args.where,
                tenantId,
              };
            }
          }

          return query(args);
        },
      },
    },
  });
});
