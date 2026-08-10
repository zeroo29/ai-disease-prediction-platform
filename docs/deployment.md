# Deployment

## Docker
Copy `.env.example` to `.env`, set a strong JWT secret and database password, then run `docker compose up --build`. Apply the schema from a one-off app container with `npx drizzle-kit push` before first use.

## Cloud
Use a managed PostgreSQL service, container platform (Cloud Run, ECS, Fly.io, or Kubernetes), TLS ingress, and a secret manager. Run schema deployment as a release job. Add edge/WAF rate limiting, centralized error monitoring without health inputs, encrypted backups, restore tests, and retention controls. Host a future Python model service on a private network and verify artifact checksums at startup. The project does not claim regulatory compliance; conduct security/privacy assessments before processing real data.
