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

    // Remove duplicates if interface already had gallery
    // If there is `gallery?: string[];\n  images?: string[];` followed later by `gallery: string[];` or `gallery?: string[];`
    // Let's remove duplicate gallery / images declarations in interfaces
    const lines = code.split('\n');
    let insideInterface = false;
    let seenGallery = false;
    let seenImages = false;
    const newLines = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.includes('interface ') && line.includes('{')) {
        insideInterface = true;
        seenGallery = false;
        seenImages = false;
        newLines.push(line);
        continue;
      }
      if (insideInterface && line.includes('}')) {
        insideInterface = false;
        newLines.push(line);
        continue;
      }
      if (insideInterface) {
        const trimmed = line.trim();
        if (trimmed.startsWith('gallery:') || trimmed.startsWith('gallery?:')) {
          if (seenGallery) {
            continue; // skip duplicate
          }
          seenGallery = true;
          newLines.push('  gallery?: string[];');
          continue;
        }
        if (trimmed.startsWith('images:') || trimmed.startsWith('images?:')) {
          if (seenImages) {
            continue; // skip duplicate
          }
          seenImages = true;
          newLines.push('  images?: string[];');
          continue;
        }
      }
      newLines.push(line);
    }

    fs.writeFileSync(filePath, newLines.join('\n'), 'utf-8');
  });
});

console.log('Cleaned up duplicate interface identifiers!');
