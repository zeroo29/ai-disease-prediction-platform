# Database

Drizzle schema lives at `src/db/schema.ts`. Tables include users, predictions, models, model versions, and audit logs. Passwords are bcrypt hashes. Prediction inputs/explanations use JSONB and each prediction stores user ownership, model name, version, checksum, output, probability, and timestamp. Foreign-key cascades remove a user's predictions when the user is deleted. Apply development schema changes with `npx drizzle-kit push`.
