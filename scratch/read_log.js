const fs = require('fs');
const path = require('path');
const logPath = path.join(__dirname, 'build_website.log');
if (fs.existsSync(logPath)) {
  const content = fs.readFileSync(logPath, 'utf16le');
  const lines = content.split('\n');
  console.log(`Total lines: ${lines.length}`);
  console.log('--- FIRST 15 LINES ---');
  for (let i = 0; i < Math.min(15, lines.length); i++) {
    console.log(lines[i]);
  }
  console.log('--- LAST 15 LINES ---');
  for (let i = Math.max(0, lines.length - 15); i < lines.length; i++) {
    console.log(lines[i]);
  }
} else {
  console.log('Log file not found');
}
