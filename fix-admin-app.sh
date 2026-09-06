sed -i 's/import AdminDashboard from ".\/pages\/admin\/AdminDashboard";/import AdminDashboard from ".\/pages\/admin\/AdminDashboard";\nimport Users from ".\/pages\/admin\/Users";/g' src/App.tsx
sed -i 's/<Route path="users" element={<div className="p-8 text-slate-400">Users Management Placeholder<\/div>} \/>/<Route path="users" element={<Users \/>} \/>/g' src/App.tsx
