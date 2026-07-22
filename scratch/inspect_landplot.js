const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../apps/website/src/components/templates/LandPlotTemplate.tsx');
const content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');

const lineNums = [822, 985, 1530, 1748];
lineNums.forEach(n => {
  console.log(`Line ${n}: ${lines[n-1]}`);
});
