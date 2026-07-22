const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../apps/website/src/components/templates/PersonalAgentTemplate.tsx');
const content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');

const lineNums = [699, 768];
lineNums.forEach(n => {
  console.log(`Line ${n}: ${lines[n-1]}`);
});
