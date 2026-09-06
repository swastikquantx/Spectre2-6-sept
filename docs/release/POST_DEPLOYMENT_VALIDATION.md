# POST-DEPLOYMENT VALIDATION

## 1. Golden Path Verification
- [ ] **Public Site**: Visit the homepage, verify fast loading and no console errors.
- [ ] **Authentication**: Log in using a test account. Verify successful redirect to Command Center.
- [ ] **Project Creation**: Create a new project. Verify it appears in the Project List and database.
- [ ] **AI Orchestration**: Send a test prompt to the Spectre AI. Verify a response is received within acceptable latency limits.

## 2. Security Checks
- [ ] Attempt to access an `/api/` endpoint without a valid Bearer token (Should return 401).
- [ ] Attempt to access a project belonging to a different tenant ID (Should return 403 or 404).
- [ ] Inspect network requests to ensure API keys are NOT sent to the browser.

## 3. Observability
- [ ] Check structured logs in the logging console.
- [ ] Verify telemetry events (latency, success/fail counts) are registering.
- [ ] Check system health endpoint (`/api/admin/stats` or `/health`).
