import fetch from 'node-fetch'; // Oh wait, Node 18+ has native fetch
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
  console.log(res.status);
  console.log(await res.text());
}
run();
