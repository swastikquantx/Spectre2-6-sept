# ROLLBACK PLAN

## Trigger Conditions for Rollback
- Critical authentication failure (users cannot log in).
- Severe data corruption or systemic database connection failure.
- P0 security vulnerability discovered in production.
- App-wide white screen / fatal crash loops.

## Rollback Procedure (Containerized Environment)
1. **Identify Previous Stable Revision**: Locate the exact image tag or Cloud Run revision ID of the previous working version.
2. **Route Traffic**: Update the load balancer or service configuration to instantly route 100% of traffic to the previous stable revision.
3. **Database Considerations**:
   - If the deployment included **non-breaking** schema changes (e.g., adding a nullable column), NO database rollback is necessary. The old code will ignore the new column.
   - If the deployment included **breaking** schema changes (e.g., dropping or renaming columns), initiate a Point-In-Time-Recovery (PITR) of the Cloud SQL instance to the timestamp immediately preceding the migration.
4. **Invalidate Caches**: Clear CDN edges and any Redis caches to ensure users receive the rolled-back frontend assets.
5. **Monitor Recovery**: Verify error rates drop to normal baseline.

## Post-Rollback
- Document the root cause in an incident report.
- Create regression tests to prevent recurrence.
