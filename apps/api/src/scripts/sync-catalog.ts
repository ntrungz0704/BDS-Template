import { prisma } from '@repo/database';
import { syncCatalog } from '../utils/auto-seed';

async function main() {
  const result = await syncCatalog();
  console.log(`Catalog synchronized: ${result.websiteTemplates} BDS templates, ${result.landingPages} landing pages, ${result.retired} legacy rows retired.`);
}

main()
  .catch((error) => {
    console.error('Catalog synchronization failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
