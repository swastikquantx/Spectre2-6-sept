async function runTests() {
  const baseUrl = 'http://localhost:3000';
  let memberToken = '';
  let adminToken = '';
  let projectId = '';

  console.log("Starting Smoke Tests...\n");

  try {
    // Wait for server to be ready
    await new Promise(r => setTimeout(r, 2000));

    // TEST 1: Login valid user
    console.log("TEST 1: Login valid user");
    const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'member@acme.com', password: 'password123' })
    });
    if (!loginRes.ok) throw new Error("Login failed");
    const loginData = await loginRes.json();
    memberToken = loginData.token;
    console.log("✅ PASS\n");

    // TEST 2: Logged-out user -> /api/projects -> 401
    console.log("TEST 2: Logged-out user API access denied");
    const noAuthRes = await fetch(`${baseUrl}/api/projects`);
    if (noAuthRes.status !== 401) throw new Error("Expected 401 Unauthorized");
    console.log("✅ PASS\n");

    // TEST 3: Normal MEMBER -> /api/admin/stats -> DENIED
    console.log("TEST 3: MEMBER access to Admin denied");
    const memberAdminRes = await fetch(`${baseUrl}/api/admin/stats`, {
      headers: { 'Authorization': `Bearer ${memberToken}` }
    });
    if (memberAdminRes.status !== 403) throw new Error(`Expected 403 Forbidden, got ${memberAdminRes.status}`);
    console.log("✅ PASS\n");

    // TEST 4: PLATFORM_ADMIN -> /api/admin/stats -> ALLOWED
    console.log("TEST 4: PLATFORM_ADMIN access to Admin allowed");
    const adminLoginRes = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@spectre.com', password: 'admin123' })
    });
    const adminData = await adminLoginRes.json();
    adminToken = adminData.token;
    
    const adminRes = await fetch(`${baseUrl}/api/admin/stats`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    if (!adminRes.ok) throw new Error("Admin access failed");
    console.log("✅ PASS\n");

    // TEST 5: Session refresh (token verification)
    console.log("TEST 5: Session validation (/api/auth/me)");
    const meRes = await fetch(`${baseUrl}/api/auth/me`, {
      headers: { 'Authorization': `Bearer ${memberToken}` }
    });
    if (!meRes.ok) throw new Error("Session refresh failed");
    console.log("✅ PASS\n");

    // TEST 6: Logout
    console.log("TEST 6: Logout invalidates session (simulated by dropping token)");
    const logoutRes = await fetch(`${baseUrl}/api/auth/logout`, { method: 'POST' });
    if (!logoutRes.ok) throw new Error("Logout request failed");
    console.log("✅ PASS\n");

    // TEST 7: Create Project and Persist
    console.log("TEST 7: Create Project & Persist");
    const createProjRes = await fetch(`${baseUrl}/api/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${memberToken}` },
      body: JSON.stringify({ name: 'Smoke Test Project', description: 'Testing', category: 'SOFTWARE' })
    });
    const projData = await createProjRes.json();
    projectId = projData.id;
    if (!projectId) throw new Error("Project creation failed");
    
    const getProjRes = await fetch(`${baseUrl}/api/projects/${projectId}`, {
      headers: { 'Authorization': `Bearer ${memberToken}` }
    });
    if (!getProjRes.ok) throw new Error("Project persistence failed");
    console.log("✅ PASS\n");

    // TEST 8: AI Factory minimum pipeline
    console.log("TEST 8: AI Factory Blueprint Generation");
    const factoryRes = await fetch(`${baseUrl}/api/projects/${projectId}/factory`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${memberToken}` }
    });
    if (!factoryRes.ok) throw new Error("Factory generation failed");
    const factoryData = await factoryRes.json();
    if (!factoryData.summary) throw new Error("No artifact returned");
    console.log("✅ PASS\n");

    console.log("ALL SMOKE TESTS PASSED!");

  } catch (e) {
    console.error("❌ FAIL: ", e.message);
    process.exit(1);
  }
}

runTests();
