sed -i 's/import Users from ".\/pages\/admin\/Users";/import Users from ".\/pages\/admin\/Users";\nimport Profile from ".\/pages\/app\/Settings\/Profile";/g' src/App.tsx
sed -i 's/<Route path="command" element={<CommandCenter \/>} \/>/<Route path="command" element={<CommandCenter \/>} \/>\n                <Route path="settings\/profile" element={<Profile \/>} \/>/g' src/App.tsx
