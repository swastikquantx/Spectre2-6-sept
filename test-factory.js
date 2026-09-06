import fetch from 'node-fetch'; // wait, native fetch
async function run() {
  const login = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'member@acme.com', password: 'password123' })
    });
  const { token } = await login.json();
  const res = await fetch('http://localhost:3000/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ name: 'Smoke Test Project', description: 'Testing', category: 'SOFTWARE' })
  });
  const proj = await res.json();
  
  const factRes = await fetch(`http://localhost:3000/api/projects/${proj.id}/factory`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  console.log(factRes.status);
  console.log(await factRes.text());
}
run();
