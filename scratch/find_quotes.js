const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../apps/website/src/components/templates/LuxuryTemplate.tsx');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const checkLines = [1124, 1384, 1584];

checkLines.forEach(lineNum => {
  const index = lineNum - 1;
  if (lines[index]) {
    console.log(`Line ${lineNum}: ${lines[index]}`);
  } else {
    console.log(`Line ${lineNum} not found`);
  }
});
