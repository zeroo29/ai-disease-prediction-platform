import { ZodError } from "zod";
export const ok = (data: unknown, message = "Request completed successfully") => Response.json({ success: true, data, message });
export const fail = (code: string, message: string, status = 400, details?: unknown) => Response.json({ success: false, error: { code, message, ...(details ? { details } : {}) } }, { status });
export function validationError(error: ZodError) { return fail("INVALID_INPUT", "The supplied input is invalid.", 422, error.issues.map(i => ({ field: i.path.join("."), message: i.message }))); }
