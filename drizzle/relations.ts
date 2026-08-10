import { relations } from "drizzle-orm/relations";
import { users, auditLogs, models, modelVersions, predictions } from "./schema";

export const auditLogsRelations = relations(auditLogs, ({one}) => ({
	user: one(users, {
		fields: [auditLogs.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	auditLogs: many(auditLogs),
	predictions: many(predictions),
}));

export const modelVersionsRelations = relations(modelVersions, ({one}) => ({
	model: one(models, {
		fields: [modelVersions.modelId],
		references: [models.id]
	}),
}));

export const modelsRelations = relations(models, ({many}) => ({
	modelVersions: many(modelVersions),
}));

export const predictionsRelations = relations(predictions, ({one}) => ({
	user: one(users, {
		fields: [predictions.userId],
		references: [users.id]
	}),
}));