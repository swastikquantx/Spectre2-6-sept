# Production Runbook

## Deployment
1. Verify CI/CD pipeline tests pass.
2. Deploy database migrations.
3. Roll out application container image.
4. Monitor system health `/api/admin/stats`.

## Rollback
- Revert container image to previous tag.
- If schema rollback needed, restore from PITR.
