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

          // Check if model has a tenantId field by inspecting typical models
          // (Can be optimized or statically checked, but Prisma args manipulation is standard)
          const tenantModels = [
            'Project', 'Post', 'Category', 'Tag', 'Banner', 'Menu',
            'CompanyInfo', 'SeoConfig', 'Media', 'ContactFormSubmission',
            'TenantThemeSettings', 'TenantPage', 'TenantSection', 'MediaFolder',
            'MediaAsset', 'MediaRecycleBin',
            // Lead CRM
            'Lead', 'LeadNote', 'LeadActivity',
            // External Integrations
            'TenantApiKey', 'TenantWebhook',
            // Content versioning
            'ContentVersion',
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
              // Convert findUnique to findFirst to enforce multi-column filtering cleanly
              // since findUnique only accepts unique keys or combinations
              const findFirstArgs = {
                ...args,
                where: {
                  ...args.where,
                  tenantId,
                }
              };
              return (client as any)[model].findFirst(findFirstArgs);
            }

            // 2. Mutate write operations (create, update, delete)
            if (operation === 'create') {
              (args as any).data = {
                ...(args as any).data,
                tenantId,
              };
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
