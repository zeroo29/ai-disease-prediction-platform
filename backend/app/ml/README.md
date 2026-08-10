# Runtime ML integration contract

The deployed Next.js API currently calls `src/lib/ml.ts`, a clearly identified non-clinical demo adapter. When the trained notebook pipeline is available:

1. Export one fitted sklearn `Pipeline` containing preprocessing and estimator as `alzheimer_pipeline.joblib`. Do not fit preprocessing at request time.
2. Copy its generated metadata/checksum beside the artifact.
3. Implement a small Python inference service here that loads the artifact once at startup, exposes schema/health/predict/explain methods, and rejects unordered or extra features.
4. Configure the Next.js prediction route to call that internal service via a server-only URL.
5. Keep the existing Zod validation, prediction version/checksum persistence, and user authorization boundaries.
6. Disable `DEMO_MODE` only after model-card, held-out evaluation, license, and artifact checksum review.

Never deserialize untrusted model files. The notebook itself should remain exploratory; production preprocessing must live in a tested module and be serialized in the fitted pipeline.
