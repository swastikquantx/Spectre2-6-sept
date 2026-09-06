# Security Architecture

## Overview
Spectre V2 is designed with a defense-in-depth approach.

## Layers
1. **Network**: Only port 3000 exposed via reverse proxy.
2. **Application**: Validation, CORS, rate limiting.
3. **Data**: Encryption at rest and in transit.
4. **AI/Agents**: Bounded contexts, prompt injection defense, policy-driven tool execution.
