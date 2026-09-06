const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');
code = code.replace(/import { generateToken, verifyToken, comparePassword } from '.\/src\/backend\/auth';/, "import { generateToken, verifyToken, comparePassword, hashPassword } from './src/backend/auth';");
fs.writeFileSync('server.ts', code);
