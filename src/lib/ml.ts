import { z } from "zod";

export const MODEL = {
  slug: "alzheimer_risk_demo", name: "Alzheimer’s Risk Research Model", version: "demo-1.0.0",
  checksum: "demo-logistic-interface-v1", algorithm: "Transparent demo logistic scoring adapter", status: "available",
  demo: true,
};
export const featureDefinitions = [
  { key: "age", label: "Age", description: "Age in years", min: 40, max: 100, step: 1 },
  { key: "mmse", label: "MMSE score", description: "Standardized cognitive screening score", min: 0, max: 30, step: 1 },
  { key: "functionalAssessment", label: "Functional assessment", description: "Functional assessment score", min: 0, max: 10, step: 0.1 },
  { key: "adl", label: "Activities of daily living", description: "ADL assessment score", min: 0, max: 10, step: 0.1 },
  { key: "memoryComplaints", label: "Memory complaints", description: "Whether memory complaints were reported", min: 0, max: 1, step: 1 },
] as const;
export const predictionSchema = z.object({
  model: z.literal("alzheimer_risk_demo"),
  features: z.object({ age: z.number().min(40).max(100), mmse: z.number().min(0).max(30), functionalAssessment: z.number().min(0).max(10), adl: z.number().min(0).max(10), memoryComplaints: z.number().int().min(0).max(1) }).strict(),
});
export type Features = z.infer<typeof predictionSchema>["features"];
export function infer(f: Features) {
  const contributions = [
    { feature: "Age", value: f.age, contribution: (f.age - 65) * 0.018 },
    { feature: "MMSE score", value: f.mmse, contribution: (20 - f.mmse) * 0.11 },
    { feature: "Functional assessment", value: f.functionalAssessment, contribution: (5 - f.functionalAssessment) * 0.13 },
    { feature: "Daily living score", value: f.adl, contribution: (5 - f.adl) * 0.12 },
    { feature: "Memory complaints", value: f.memoryComplaints, contribution: f.memoryComplaints ? 0.48 : -0.12 },
  ];
  const logit = -1.5 + contributions.reduce((sum, item) => sum + item.contribution, 0);
  const probability = Math.max(0.02, Math.min(0.98, 1 / (1 + Math.exp(-logit))));
  const prediction = probability < .35 ? "LOW" : probability < .7 ? "MODERATE" : "HIGH";
  return { probability, prediction, explanation: contributions.sort((a,b) => Math.abs(b.contribution) - Math.abs(a.contribution)) };
}
