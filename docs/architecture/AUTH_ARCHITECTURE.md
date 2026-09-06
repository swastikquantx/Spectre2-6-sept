# Authentication Architecture

## Overview
Identity management handles user identity, sessions, and OAuth connectors.

## Implementation (Pending)
- **Primary Auth**: Identity Provider (e.g., Firebase Auth or Auth0).
- **Session**: Secure, HttpOnly cookies with JWTs.
- **Service-to-Service**: Bearer tokens with strict scoping.
