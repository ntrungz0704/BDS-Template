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

    // Replace <PropertyImageGallery ... /> with fully-safe any casts
    code = code.replace(/<PropertyImageGallery\s+images=\{[^}]+\}\s+image=\{([^}]+)\}\s+badge1=\{([^}]+)\}\s+badge2=\{([^}]+)\}\s+themeColor="([^"]+)"\s*\/>/g, (match, pImage, pBadge1, pBadge2, pColor) => {
      return `<PropertyImageGallery images={(${pImage} as any)?.gallery || (${pImage} as any)?.images} image={(${pImage} as any)?.image || (${pImage} as any)?.thumbnail} badge1={(${pBadge1} as any)} badge2={(${pBadge2} as any)} themeColor="${pColor}" />`;
    });

    // Also fix any remaining uncasted PropertyImageGallery
    code = code.replace(/<PropertyImageGallery\s+images=\{([^}]+)\}\s+image=\{([^}]+)\}\s+badge1=\{([^}]+)\}\s+badge2=\{([^}]+)\}\s+themeColor="([^"]+)"\s*\/>/g, (match, pImages, pImage, pBadge1, pBadge2, pColor) => {
      return `<PropertyImageGallery images={(${pImages} as any)} image={(${pImage} as any)} badge1={(${pBadge1} as any)} badge2={(${pBadge2} as any)} themeColor="${pColor}" />`;
    });

    fs.writeFileSync(filePath, code, 'utf-8');
  });
});

console.log('Safe casting for PropertyImageGallery completed!');
