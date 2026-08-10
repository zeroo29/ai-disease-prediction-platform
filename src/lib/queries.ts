import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
export async function getActiveUser(userId: number) { const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1); return user?.isActive ? user : null; }
