import { pgTable, unique, serial, varchar, boolean, timestamp, foreignKey, integer, jsonb, index, real } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	fullName: varchar("full_name", { length: 120 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	passwordHash: varchar("password_hash", { length: 255 }).notNull(),
	role: varchar({ length: 20 }).default('user').notNull(),
	isActive: boolean("is_active").default(true).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);

export const auditLogs = pgTable("audit_logs", {
	id: serial().primaryKey().notNull(),
	userId: integer("user_id"),
	action: varchar({ length: 100 }).notNull(),
	entityType: varchar("entity_type", { length: 60 }).notNull(),
	entityId: varchar("entity_id", { length: 80 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "audit_logs_user_id_users_id_fk"
		}).onDelete("set null"),
]);

export const models = pgTable("models", {
	id: serial().primaryKey().notNull(),
	slug: varchar({ length: 80 }).notNull(),
	name: varchar({ length: 160 }).notNull(),
	description: varchar({ length: 500 }).notNull(),
	isActive: boolean("is_active").default(true).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("models_slug_unique").on(table.slug),
]);

export const modelVersions = pgTable("model_versions", {
	id: serial().primaryKey().notNull(),
	modelId: integer("model_id").notNull(),
	version: varchar({ length: 30 }).notNull(),
	checksum: varchar({ length: 128 }).notNull(),
	metadata: jsonb().notNull(),
	isCurrent: boolean("is_current").default(true).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.modelId],
			foreignColumns: [models.id],
			name: "model_versions_model_id_models_id_fk"
		}).onDelete("cascade"),
]);

export const predictions = pgTable("predictions", {
	id: serial().primaryKey().notNull(),
	userId: integer("user_id").notNull(),
	modelName: varchar("model_name", { length: 100 }).notNull(),
	modelVersion: varchar("model_version", { length: 30 }).notNull(),
	modelChecksum: varchar("model_checksum", { length: 128 }).notNull(),
	inputData: jsonb("input_data").notNull(),
	prediction: varchar({ length: 30 }).notNull(),
	probability: real().notNull(),
	explanation: jsonb().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("predictions_created_idx").using("btree", table.createdAt.asc().nullsLast().op("timestamptz_ops")),
	index("predictions_user_idx").using("btree", table.userId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "predictions_user_id_users_id_fk"
		}).onDelete("cascade"),
]);
