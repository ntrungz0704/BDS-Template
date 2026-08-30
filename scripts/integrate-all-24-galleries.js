const fs = require('fs');
const path = require('path');

const dirs = [
  { path: path.join(process.cwd(), 'apps/marketplace/src/components/demo/templates'), importPath: '../PropertyImageGallery' },
  { path: path.join(process.cwd(), 'apps/website/src/components/templates'), importPath: './PropertyImageGallery' }
];

dirs.forEach(({ path: dir, importPath }) => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') && f.startsWith('BDS'));

  files.forEach(file => {
    const filePath = path.join(dir, file);
    let code = fs.readFileSync(filePath, 'utf-8');

    // 1. Add import if not present
    if (!code.includes('PropertyImageGallery')) {
      code = `import { PropertyImageGallery } from '${importPath}';\n` + code;
    }

    // Determine target item var for this template
    let itemVar = 'selectedProperty';
    let themeColor = 'blue';

    if (file === 'BDS03Template.tsx') themeColor = 'amber';
    if (file === 'BDS04Template.tsx') { itemVar = 'selectedUnit'; themeColor = 'gold'; }
    if (file === 'BDS06Template.tsx') themeColor = 'amber';
    if (file === 'BDS07Template.tsx') themeColor = 'emerald';
    if (['BDS09Template.tsx', 'BDS12Template.tsx', 'BDS17Template.tsx', 'BDS19Template.tsx', 'BDS20Template.tsx', 'BDS22Template.tsx'].includes(file)) {
      itemVar = 'selectedUnit';
    }
    if (['BDS18Template.tsx', 'BDS23Template.tsx', 'BDS24Template.tsx'].includes(file)) {
      itemVar = 'selectedProject';
    }

    // Find and replace inline gallery block
    const galleryBlockRegex = /<div className="space-y-3">\s*\{\(\(\) => \{[\s\S]*?\}\)\(\)\}\s*<\/div>/g;
    const replacementJSX = `<PropertyImageGallery images={(${itemVar} as any)?.gallery || (${itemVar} as any)?.images} image={(${itemVar} as any)?.image || (${itemVar} as any)?.thumbnail} badge1={(${itemVar} as any)?.type || (${itemVar} as any)?.badge} badge2={(${itemVar} as any)?.direction || (${itemVar} as any)?.zone} themeColor="${themeColor}" />`;

    if (galleryBlockRegex.test(code)) {
      code = code.replace(galleryBlockRegex, replacementJSX);
      console.log(`Integrated PropertyImageGallery in ${file} (${path.basename(dir)})`);
    }

    // Also check BDS01-BDS07 custom blocks
    const bds01CustomRegex = /\{\(\(\) => \{\s*const galleryList = \(\(selectedProperty as any\)\?\.gallery[\s\S]*?\}\)\(\)\}/g;
    if (bds01CustomRegex.test(code)) {
      code = code.replace(bds01CustomRegex, `<PropertyImageGallery images={(selectedProperty as any)?.gallery} image={selectedProperty.image} badge1={selectedProperty.type} badge2={selectedProperty.direction} themeColor="blue" />`);
      console.log(`Integrated PropertyImageGallery for BDS01 in ${file} (${path.basename(dir)})`);
    }

    fs.writeFileSync(filePath, code, 'utf-8');
  });
});

console.log('Finished integrating PropertyImageGallery into all 24 templates!');
