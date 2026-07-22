const path = require('path');
const fs = require('fs');

const envPath = path.resolve(__dirname, '../.env');
console.log('__dirname:', __dirname);
console.log('Resolved path:', envPath);
console.log('File exists:', fs.existsSync(envPath));
