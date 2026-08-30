const fs = require('fs');
const path = require('path');

const dir = './apps/marketplace/src/components/demo/templates';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const hasZalo = content.includes('zalo') || content.includes('Zalo') || content.includes('ZALO');
  const hasPhone = content.includes('tel:') || content.includes('0919');
  const hasSticky = content.includes('fixed bottom') || content.includes('sticky bottom');
  console.log(`${file}: hasZalo=${hasZalo}, hasPhone=${hasPhone}, hasSticky=${hasSticky}`);
}
