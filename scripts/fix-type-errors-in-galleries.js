const fs = require('fs');
const path = require('path');

// 1. Fix template-packaging.service.ts
const pkgServicePath = path.join(process.cwd(), 'apps/api/src/services/template-packaging.service.ts');
if (fs.existsSync(pkgServicePath)) {
  let pkgCode = fs.readFileSync(pkgServicePath, 'utf-8');
  pkgCode = pkgCode.replace('tenantProjects.map(p => {', 'tenantProjects.map((p: any) => {');
  fs.writeFileSync(pkgServicePath, pkgCode, 'utf-8');
  console.log('Fixed template-packaging.service.ts type');
}

// 2. Fix targetItem typing across all templates in marketplace and website
const dirs = [
  path.join(process.cwd(), 'apps/marketplace/src/components/demo/templates'),
  path.join(process.cwd(), 'apps/website/src/components/templates')
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

  files.forEach(file => {
    const filePath = path.join(dir, file);
    let code = fs.readFileSync(filePath, 'utf-8');
    let modified = false;

    if (code.includes('targetItem?.images') || code.includes('targetItem?.gallery')) {
      code = code.replace(/const rawGallery = targetItem\?\.gallery \|\| targetItem\?\.images \|\| \[\];/g, 'const rawGallery = (targetItem as any)?.gallery || (targetItem as any)?.images || [];');
      code = code.replace(/targetItem\?\.image \|\| targetItem\?\.thumbnail/g, '(targetItem as any)?.image || (targetItem as any)?.thumbnail');
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(filePath, code, 'utf-8');
      console.log(`Fixed types in ${file} (${path.basename(dir)})`);
    }
  });
});

console.log('All gallery types fixed successfully!');
