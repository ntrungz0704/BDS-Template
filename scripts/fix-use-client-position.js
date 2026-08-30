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

    // Remove any 'use client'; in the file, then prepend 'use client'; at line 1
    const hasUseClient = code.includes("'use client'") || code.includes('"use client"');
    code = code.replace(/['"]use client['"];?\r?\n?/g, '');

    if (hasUseClient) {
      code = `'use client';\n` + code;
    }

    fs.writeFileSync(filePath, code, 'utf-8');
  });
});

console.log('Fixed use client positions in all files!');
