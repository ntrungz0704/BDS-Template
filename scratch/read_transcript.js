const fs = require('fs');
const readline = require('readline');
const logPath = 'C:\\Users\\ntrun\\.gemini\\antigravity\\brain\\9774b350-2005-45c6-baaf-7cef6ce9b4c1\\.system_generated\\logs\\transcript.jsonl';

async function main() {
  const fileStream = fs.createReadStream(logPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let count = 0;
  for await (const line of rl) {
    if (line.includes('run_command')) {
      console.log(`Line ${count}:`, line.substring(0, 300));
      count++;
      if (count > 20) break;
    }
  }
}

main();
