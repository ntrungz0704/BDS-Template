const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, '../apps/marketplace/src/components/demo/templates');
const files = fs.readdirSync(templatesDir).filter(f => f.endsWith('.tsx') && f !== 'index.ts' && !f.includes('Skeleton') && !f.includes('Footer'));

console.log(`Found ${files.length} templates in marketplace to verify for full CMS & Interactive capability.`);

for (const file of files) {
  const filePath = path.join(templatesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  // 1. Check company support
  const hasCompany = content.includes('company?') || content.includes('company.');
  // 2. Check dynamic projects
  const hasProjects = content.includes('projects');
  // 3. Check UniversalTemplateFooter
  const hasFooter = content.includes('UniversalTemplateFooter');

  console.log(`- Template: ${file} | hasCompany: ${hasCompany} | hasProjects: ${hasProjects} | hasFooter: ${hasFooter}`);
}

console.log('Finished template CMS capability inspection!');
