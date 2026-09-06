# PRODUCTION DEPLOYMENT CHECKLIST

## 1. Infrastructure Preparation
- [ ] Provision Cloud SQL (PostgreSQL) instance.
- [ ] Configure `SQL_HOST`, `SQL_USER`, `SQL_PASSWORD`, `SQL_DB_NAME`.
- [ ] Ensure Redis or equivalent queue service is provisioned (if Background Jobs enabled).

## 2. Security & Secrets
- [ ] Rotate and securely inject `GEMINI_API_KEY` (and other provider keys).
- [ ] Verify no secrets are committed to source control or exposed in frontend bundles.
- [ ] Configure CORS for production domain.
- [ ] Set `NODE_ENV=production`.

## 3. Database Migration
- [ ] Run Drizzle schema migrations to initialize production tables.
- [ ] Verify `pgvector` extension is enabled (if using).
- [ ] Seed initial administrative roles/users.

## 4. Authentication Integration
- [ ] Configure Identity Provider (e.g., Google OAuth / Firebase Auth).
- [ ] Set redirect URIs to match production domain.
- [ ] Verify JWT validation middleware is active on all `/api/*` routes.

## 5. Domain & SEO
- [ ] Bind custom domain (e.g., `spectre.swastikllc.in`).
- [ ] Verify SSL/TLS certificates are active.
- [ ] Submit XML sitemap to search engines.
- [ ] Test OpenGraph tags using social sharing debuggers.

## 6. Build & Launch
- [ ] Execute `npm run build`.
- [ ] Verify container image builds successfully.
- [ ] Deploy container to Cloud Run / target environment.
- [ ] Monitor logs for 15 minutes post-deployment to catch startup panics.
