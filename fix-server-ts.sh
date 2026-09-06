sed -i 's/"CODE_GENERATION"/"ARCHITECTURE"/g' server.ts
sed -i 's/const PORT = process.env.PORT || 3000;/const PORT = Number(process.env.PORT) || 3000;/g' server.ts
