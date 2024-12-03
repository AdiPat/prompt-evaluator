import { z } from "zod";

export const simplePromptEvalSchema = z.object({
  prompt: z.string(),
  score: z.number().min(0).max(1),
  feedback: z.string(),
});

export const simplePromptEvalSchemaWithOutput = simplePromptEvalSchema.extend({
  output: z.string(),
});

export interface EvaluatePromptInput {
  prompt: string;
  output?: string;
}

export interface EvaluationResult {
  prompt: string;
  score: number;
  feedback: string;
  output?: string;
}
