# MedPredict AI

**AI Disease Risk Prediction & Health Analytics Platform**

> Intelligent health-risk analysis powered by machine learning.

![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Next.js](https://img.shields.io/badge/Next.js-16-black) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791) ![Docker](https://img.shields.io/badge/Docker-ready-2496ED) ![License](https://img.shields.io/badge/license-MIT-green)

MedPredict AI is a portfolio-quality research platform for validated, explainable, versioned health-risk model inference. It provides secure accounts, a real PostgreSQL-backed prediction history, charts, PDF reports, admin governance, and a replaceable ML boundary.

> **Medical disclaimer:** This application is an educational and research-oriented machine-learning system. It is NOT a medical diagnostic tool and must not be used as a substitute for professional medical advice.

## Current status

The end-to-end application works in **DEMO_MODE**. No private/copyrighted dataset or trained notebook artifact is included, and no fabricated metrics are claimed. The Alzheimer’s adapter is deterministic and transparent, designed to be replaced by your fitted pipeline. Only that implemented model appears as available; future disease cards are intentionally absent.

## Features

- Responsive premium landing page, dark/light/system theme
- Registration/login, bcrypt hashing, signed HTTP-only sessions, role-based access
- Strict model schema, range and extra-feature validation
- Versioned inference with checksum, probabilities, category and contributions
- User-isolated history, deletion, details and client-generated PDF report
- Database-derived dashboard charts and meaningful empty/loading/error states
- Admin users, aggregate analytics, health status, model metadata, privacy-minimized prediction audit
- PostgreSQL + Drizzle, Docker, CI, health checks and security headers
- Leakage-safe Python training scaffold and documented model integration contract

## Architecture and stack

React 19 and Next.js 16 App Router provide the UI and REST backend. Tailwind CSS handles styling, Recharts visualization, Zod validation, JOSE session signing, bcrypt password hashing, jsPDF reports, PostgreSQL storage, and Drizzle ORM. The optional offline ML pipeline uses pandas, NumPy, scikit-learn, and joblib. See `docs/architecture.md`.

## Quick start

```bash
git clone <your-repository-url>
cd medpredict-ai
cp .env.example .env
# Set JWT_SECRET and POSTGRES_PASSWORD
docker compose up --build
# In a one-off app shell on first run:
npx drizzle-kit push
```

Open frontend `http://localhost:3000`, API reference `http://localhost:3000/api/docs`, ReDoc-style reference `/api/redoc`, and health endpoint `/api/health`. PostgreSQL is internal to Compose on port 5432.

## Local development

```bash
npm install
cp .env.example .env
npx drizzle-kit push
npm run dev
```

Validation: `npm run lint`, `npx next typegen`, `npm exec tsc -- --noEmit`, and `npm run build`.

### ML training

Obtain and license your dataset; no dataset is redistributed. Follow `ml/data/README.md`, then:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r ml/requirements.txt
python ml/src/train.py --data ml/data/alzheimer.csv --output ml/models
```

The script creates real comparison metrics and a fitted artifact. It performs stratified splitting before fitting preprocessing, cross-validated tuning, and model selection by ROC-AUC, recall, then F1. Read `docs/ml-pipeline.md` and `docs/model-card.md` before integration.

## API, database, and security

The API uses consistent envelopes and correct ownership checks. See `/api/docs`, `docs/api.md`, and `docs/database.md`. Passwords are never stored in plaintext. Inputs are validated server-side; ORM queries are parameterized; admin APIs require role authorization. Set a high-entropy `JWT_SECRET`, use TLS and managed secrets in production, and add edge rate limiting. This project is privacy-conscious but does **not** claim HIPAA or GDPR compliance.

## Admin setup

No credential is committed. Register a user, then promote it locally with an intentional database operation:

```sql
UPDATE users SET role='admin' WHERE email='your-admin@example.com';
```

Log out and back in to refresh role claims. Production role assignment should use a controlled operational procedure and audit review.

## Testing and CI

GitHub Actions validates TypeScript, lint, production build, Python syntax, PostgreSQL schema push, and Docker image construction. Add route/component integration suites as the project evolves; CI must use GitHub Secrets for deployment credentials.

## Deployment

Recommended: managed PostgreSQL + a container service behind TLS/WAF. Use a release job for schema changes, secret manager for credentials, encrypted backups, and privacy-safe monitoring. A future Python inference service should be private and load a checksum-verified artifact once at startup. See `docs/deployment.md`.

## Limitations and ethics

The demo score is not clinically trained, validated, calibrated, or appropriate for screening. Feature contribution is model explanation, not causation. Do not enter real patient data. Before a trained release, document provenance/license, held-out and subgroup evaluation, calibration, known harms, governance, and independent expert review.

## Repository publishing

Create a GitHub repository, keep `.env` ignored, set CI/deployment values in GitHub Secrets, add screenshots from the landing, login, dashboard, analysis, result, history, admin, and API-reference screens, then push logical commits (`feat`, `test`, `ci`, `docs`) as work is performed. Do not rewrite history to manufacture progress.

## Roadmap

- Integrate the owner’s existing notebook pipeline and verified artifacts
- Add server-side report generation and reset-email provider
- Add automated API/component tests and edge-backed rate limiting
- Add additional disease models only when real trained artifacts and model cards exist

## License and author

MIT licensed. Replace this section with your name, portfolio, and contact links before publishing.
