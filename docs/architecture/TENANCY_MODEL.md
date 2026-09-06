# Tenancy Model

## Overview
Multi-tenant architecture ensuring absolute data isolation between organizations.

## Isolation Mechanisms
- **Logical Isolation**: Every database record contains an `organizationId`.
- **Query Scoping**: All repositories enforce `WHERE organization_id = ?`.
- **Cross-Tenant Prevention**: Authorization checks block cross-tenant object access.
