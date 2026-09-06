# RBAC Model

## Roles
- `PLATFORM_ADMIN`: Global system access.
- `ORG_OWNER`: Full organization control.
- `ORG_ADMIN`: Organization management (users, billing).
- `MEMBER`: Project creation and execution.
- `VIEWER`: Read-only access.

## Enforcement
- Server-side middleware validates claims before request execution.
