const fs = require('fs');
let code = fs.readFileSync('smoke-test.js', 'utf-8');
code = code.replace(/const projData = await createProjRes\.json\(\);/, `const text = await createProjRes.text(); if (!createProjRes.ok) { console.log(text); throw new Error('Failed with status ' + createProjRes.status); } const projData = JSON.parse(text);`);
fs.writeFileSync('smoke-test.js', code);
