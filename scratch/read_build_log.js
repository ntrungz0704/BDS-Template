const fs = require('fs');
const path = require('path');
const logPath = path.join(__dirname, 'build_all.log');
if (fs.existsSync(logPath)) {
  const content = fs.readFileSync(logPath, 'utf16le');
  const lines = content.split('\n');
  console.log(`Total lines: ${lines.length}`);
  console.log('--- BUILD ERRORS ---');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.includes('Error:') || line.includes('error') || line.includes('Error') || line.includes('Warning') || line.includes('warning') || line.includes('Failed to compile')) {
      console.log(`Line ${i+1}: ${lines[i]}`);
    }
  }
  console.log('--- LAST 40 LINES ---');
  for (let i = Math.max(0, lines.length - 40); i < lines.length; i++) {
    console.log(lines[i]);
  }
} else {
  console.log('Log file not found');
}
