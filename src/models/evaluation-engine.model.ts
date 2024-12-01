import { z } from "zod";

export const simplePromptEvalSchema = z.object({
  prompt: z.string(),
  score: z.number().min(0).max(1),
  feedback: z.string(),
});
