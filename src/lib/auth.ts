import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE = "medpredict_session";
const secret = () => new TextEncoder().encode(process.env.JWT_SECRET || "development-only-change-me");
export type Session = { userId: number; email: string; role: string; name: string };

export async function signSession(data: Session, duration = "7d") {
  return new SignJWT(data).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime(duration).sign(secret());
}
export async function verifySession(token: string): Promise<Session | null> {
  try { const { payload } = await jwtVerify(token, secret()); return payload as unknown as Session; } catch { return null; }
}
export async function currentSession() {
  const token = (await cookies()).get(COOKIE)?.value;
  return token ? verifySession(token) : null;
}
export async function setSession(data: Session) {
  const token = await signSession(data);
  (await cookies()).set(COOKIE, token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 7 });
}
export async function clearSession() { (await cookies()).delete(COOKIE); }
export function unauthorized(message = "Authentication required") { return Response.json({ success: false, error: { code: "UNAUTHORIZED", message } }, { status: 401 }); }
export function forbidden() { return Response.json({ success: false, error: { code: "FORBIDDEN", message: "You do not have permission to perform this action." } }, { status: 403 }); }
