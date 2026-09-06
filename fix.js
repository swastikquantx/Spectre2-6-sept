const fs = require('fs');
let code = fs.readFileSync('src/pages/app/CommandCenter.tsx', 'utf-8');
code = code.replace(/<\/div>\s*<\/Link>/g, '</Link>');
fs.writeFileSync('src/pages/app/CommandCenter.tsx', code);
