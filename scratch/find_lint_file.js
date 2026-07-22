const fs = require('fs');
const path = require('path');

function searchDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      searchDir(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      if (lines.length >= 1584) {
        // Check if double quotes or similar unescaped quote symbols are present at line 1124, 1384, or 1584
        console.log(`Checking ${fullPath} (Length: ${lines.length})`);
        const l1124 = lines[1123];
        const l1384 = lines[1383];
        const l1584 = lines[1583];
        if (l1124.includes('"') || l1124.includes("'") || l1124.includes('“')) {
          console.log(`  - 1124: ${l1124}`);
        }
        if (l1384.includes('"') || l1384.includes("'") || l1384.includes('“')) {
          console.log(`  - 1384: ${l1384}`);
        }
        if (l1584.includes('"') || l1584.includes("'") || l1584.includes('“')) {
          console.log(`  - 1584: ${l1584}`);
        }
      }
    }
  }
}

searchDir(path.join(__dirname, '../apps/website/src'));
