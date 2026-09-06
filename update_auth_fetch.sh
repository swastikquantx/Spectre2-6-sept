sed -i "s/const res = await fetch('\/api\/auth\/me');/const res = await fetch('\/api\/auth\/me', { headers: { 'Authorization': \`Bearer \${token}\` } });/g" src/core/AuthContext.tsx
