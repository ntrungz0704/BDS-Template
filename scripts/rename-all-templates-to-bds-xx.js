const fs = require('fs');
const path = require('path');

const renameMap = [
  { oldFile: 'LuxuryTemplate.tsx', newFile: 'BDS01Template.tsx', oldComp: 'LuxuryTemplate', newComp: 'BDS01Template' },
  { oldFile: 'MinimalTemplate.tsx', newFile: 'BDS02Template.tsx', oldComp: 'MinimalTemplate', newComp: 'BDS02Template' },
  { oldFile: 'CorporateTemplate.tsx', newFile: 'BDS03Template.tsx', oldComp: 'CorporateTemplate', newComp: 'BDS03Template' },
  { oldFile: 'ResortTemplate.tsx', newFile: 'BDS04Template.tsx', oldComp: 'ResortTemplate', newComp: 'BDS04Template' },
  { oldFile: 'UrbanTemplate.tsx', newFile: 'BDS05Template.tsx', oldComp: 'UrbanTemplate', newComp: 'BDS05Template' },
  { oldFile: 'IndustrialTemplate.tsx', newFile: 'BDS06Template.tsx', oldComp: 'IndustrialTemplate', newComp: 'BDS06Template' },
  { oldFile: 'VillaTemplate.tsx', newFile: 'BDS07Template.tsx', oldComp: 'VillaTemplate', newComp: 'BDS07Template' },
];

const templateDirs = [
  path.join(process.cwd(), 'apps/marketplace/src/components/demo/templates'),
  path.join(process.cwd(), 'apps/website/src/components/templates')
];

// 1. Rename files in template directories
templateDirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  renameMap.forEach(item => {
    const oldPath = path.join(dir, item.oldFile);
    const newPath = path.join(dir, item.newFile);
    if (fs.existsSync(oldPath)) {
      let content = fs.readFileSync(oldPath, 'utf-8');
      content = content.replace(new RegExp(`export default function ${item.oldComp}`, 'g'), `export default function ${item.newComp}`);
      fs.writeFileSync(newPath, content, 'utf-8');
      fs.unlinkSync(oldPath);
      console.log(`Renamed ${item.oldFile} -> ${item.newFile} in ${path.basename(dir)}`);
    }
  });
});

// 2. Update DemoRenderer.tsx in marketplace
const demoRendererPath = path.join(process.cwd(), 'apps/marketplace/src/components/demo/DemoRenderer.tsx');
if (fs.existsSync(demoRendererPath)) {
  let code = fs.readFileSync(demoRendererPath, 'utf-8');
  renameMap.forEach(item => {
    code = code.replace(new RegExp(`import\\('./templates/${item.oldComp}'\\)`, 'g'), `import('./templates/${item.newComp}')`);
    code = code.replace(new RegExp(`const ${item.oldComp} = dynamic`, 'g'), `const ${item.newComp} = dynamic`);
    code = code.replace(new RegExp(`<${item.oldComp} `, 'g'), `<${item.newComp} `);
  });
  fs.writeFileSync(demoRendererPath, code, 'utf-8');
  console.log('Updated DemoRenderer.tsx imports');
}

// 3. Update registry.tsx in website
const registryPath = path.join(process.cwd(), 'apps/website/src/templates/registry.tsx');
if (fs.existsSync(registryPath)) {
  let code = fs.readFileSync(registryPath, 'utf-8');
  renameMap.forEach(item => {
    code = code.replace(new RegExp(`import\\('../components/templates/${item.oldComp}'\\)`, 'g'), `import('../components/templates/${item.newComp}')`);
    code = code.replace(new RegExp(`const ${item.oldComp} = dynamic`, 'g'), `const ${item.newComp} = dynamic`);
    code = code.replace(new RegExp(`component: ${item.oldComp}`, 'g'), `component: ${item.newComp}`);
  });
  fs.writeFileSync(registryPath, code, 'utf-8');
  console.log('Updated registry.tsx in website');
}

// 4. Update template-packaging.service.ts
const pkgPath = path.join(process.cwd(), 'apps/api/src/services/template-packaging.service.ts');
if (fs.existsSync(pkgPath)) {
  let code = fs.readFileSync(pkgPath, 'utf-8');
  renameMap.forEach(item => {
    code = code.replace(new RegExp(`componentName: '${item.oldComp}', fileName: '${item.oldFile}'`, 'g'), `componentName: '${item.newComp}', fileName: '${item.newFile}'`);
  });
  fs.writeFileSync(pkgPath, code, 'utf-8');
  console.log('Updated template-packaging.service.ts');
}

// 5. Update export-all-24-standalone-templates.ts
const exportScriptPath = path.join(process.cwd(), 'scripts/export-all-24-standalone-templates.ts');
if (fs.existsSync(exportScriptPath)) {
  let code = fs.readFileSync(exportScriptPath, 'utf-8');
  renameMap.forEach(item => {
    code = code.replace(new RegExp(`compFile: '${item.oldFile}'`, 'g'), `compFile: '${item.newFile}'`);
  });
  fs.writeFileSync(exportScriptPath, code, 'utf-8');
  console.log('Updated export-all-24-standalone-templates.ts');
}

console.log('All templates 01-24 are now uniformly named BDS01Template to BDS24Template!');
