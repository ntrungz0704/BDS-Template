const fs = require('fs');
const path = require('path');

const targetDirs = [
  path.join(__dirname, '..', 'apps', 'marketplace', 'src', 'components', 'demo', 'templates'),
  path.join(__dirname, '..', 'apps', 'website', 'src', 'components', 'templates'),
  path.join(__dirname, '..', 'standalone-templates')
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;

  // Replace excessive roundings on cards, containers, buttons, badges
  content = content.replace(/\brounded-3xl\b/g, 'rounded-md');
  content = content.replace(/\brounded-2xl\b/g, 'rounded-sm');
  content = content.replace(/\brounded-xl\b/g, 'rounded-sm');
  content = content.replace(/\brounded-full\b(?!\s*bg-(?:red|emerald|blue|slate|amber|lime|teal|cyan|indigo|orange|yellow|pink|rose|violet|gray)-[0-9]{2,3}\b(?:\s*w-[0-9]+\s*h-[0-9]+|\s*p-[0-9]+))/g, 'rounded-sm');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated border radii in: ${filePath}`);
  }
}

function traverse(dir) {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      traverse(fullPath);
    } else if (item.isFile() && (item.name.endsWith('.tsx') || item.name.endsWith('.html') || item.name.endsWith('.php'))) {
      processFile(fullPath);
    }
  }
}

for (const dir of targetDirs) {
  traverse(dir);
}

console.log('Finished normalizing sharp border radii across all templates!');
