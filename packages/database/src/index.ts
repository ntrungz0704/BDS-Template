import { PrismaClient } from '../generated/client/index.js';
import { tenantIsolationExtension } from './tenant-isolation';

declare global {
  var prisma: any;
}

const basePrisma = global.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

export const prisma = basePrisma.$extends(tenantIsolationExtension);

if (process.env.NODE_ENV !== 'production') {
  global.prisma = basePrisma;
}

export * from '../generated/client/index.js';
export * from './tenant-isolation';
export * from './template-registry';

