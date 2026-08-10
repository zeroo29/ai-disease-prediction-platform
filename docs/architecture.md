# Architecture

MedPredict AI is deployed as a Next.js App Router application with React server/client components and REST route handlers. PostgreSQL persistence is accessed only server-side through Drizzle ORM. Authentication uses bcrypt hashes and signed HTTP-only cookies. The runtime model adapter is isolated in `src/lib/ml.ts`; a future Python inference service can replace it without changing the browser contract.

Browser → Next.js UI/REST → authorization + validation → model adapter → PostgreSQL.

Trust boundaries: browsers are untrusted; every health feature is validated server-side; every prediction query includes user ownership; admin routes require a role; the admin UI omits raw feature payloads. Production deployment should place TLS/load balancing ahead of the app and use managed secrets, database backups, monitoring, and rate limiting at the edge.
