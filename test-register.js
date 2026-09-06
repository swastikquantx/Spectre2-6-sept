async function run() {
  const fetch = (await import('node-fetch')).default; // Use dynamic import if node-fetch is needed, but native fetch should work
  const baseUrl = 'http://localhost:3000';
  const r = Math.random().toString(36).substring(7);
  const data = {
    name: "Test User", email: `test${r}@example.com`, password: "password123",
    mobile: "1234567890", whatsapp: "1234567890", city: "NY", state: "NY", country: "USA", company: "Test Co", designation: "CEO"
  };
  
  const res = await globalThis.fetch(`${baseUrl}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  console.log(res.status);
  console.log(await res.text());
}
run();
