# API

Interactive reference screens are available at `/api/docs` and `/api/redoc`. JSON endpoints use `{ success, data, message }`; errors use `{ success: false, error: { code, message, details? } }`.

Authentication: register, login, refresh, current-user, logout, and forgot-password architecture under `/api/auth`. Models: `GET /api/models`. Predictions: create/list under `/api/predictions`, owned detail/delete under `/api/predictions/{id}`, explanation under `/api/predictions/explain`. Administration: aggregate stats, users, models, and privacy-minimized prediction metadata under `/api/admin`. Health: `GET /api/health`.
