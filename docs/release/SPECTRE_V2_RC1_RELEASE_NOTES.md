# SPECTRE V2 RC1 RELEASE NOTES

**Version**: 2.0.0-rc.1
**Date**: September 2026

## Overview
Spectre V2 Release Candidate 1 establishes the core architecture for the autonomous business operating system. It includes the AI core, agent orchestration, project workspace, and the foundation of the public-facing marketing site.

## What's Included
*   **Unified AI Core (`spectreAI.run()`)**: A robust, model-agnostic routing layer that supports Gemini and other providers.
*   **Multi-Agent Orchestrator**: The framework for running bounded, context-aware agents (Planner, Critic, Strategy, etc.) securely without direct provider calls.
*   **Project Workspace**: A dynamic, modular workspace for creating and managing AI projects.
*   **Public SEO Website**: A responsive, SEO-optimized public site with complete routing and a professional footer.
*   **Backend Persistence Foundation**: A mock file-based database architecture that mirrors a true `Service -> Repository -> Database` flow, ready for PostgreSQL migration.

## Known Limitations
*   **AI Factory**: Currently UI-only. The automated software blueprint pipeline is not yet generating code.
*   **Controlled Autonomy**: Tool execution and autonomous webhooks are intentionally deferred.
*   **Vector RAG**: Memory storage exists, but vector embeddings and RAG chunking are pending infrastructure setup.
*   **Authentication & Multi-Tenancy**: Currently bypassed for rapid prototyping. Real Identity Providers and RBAC must be configured before production deployment.

## Next Steps
Following RC1 deployment, engineering efforts will focus on hardening the PostgreSQL database, implementing secure OAuth, and finalizing the AI Factory code generation pipeline.
