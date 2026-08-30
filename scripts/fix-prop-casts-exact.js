const fs = require('fs');
const path = require('path');

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

    // Find the item variable
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

    // Replace ANY <PropertyImageGallery ... /> with the clean standard call
    const cleanGalleryTag = `<PropertyImageGallery images={(${itemVar} as any)?.gallery || (${itemVar} as any)?.images} image={(${itemVar} as any)?.image || (${itemVar} as any)?.thumbnail} badge1={(${itemVar} as any)?.type || (${itemVar} as any)?.badge} badge2={(${itemVar} as any)?.direction || (${itemVar} as any)?.zone} themeColor="${themeColor}" />`;

    code = code.replace(/<PropertyImageGallery[\s\S]*?\/>/g, cleanGalleryTag);

    fs.writeFileSync(filePath, code, 'utf-8');
  });
});

console.log('Fixed exact PropertyImageGallery tags in all files!');
