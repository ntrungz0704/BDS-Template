import re, json

with open('html/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

props_match = re.search(r'const BDS06_PROPERTIES = (\[.*?\]);', html, re.DOTALL)
if props_match:
    with open('parse.js', 'w', encoding='utf-8') as f:
        f.write('const fs = require("fs");\n')
        f.write('const data = ' + props_match.group(1) + ';\n')
        f.write('fs.writeFileSync("data.json", JSON.stringify(data));\n')
