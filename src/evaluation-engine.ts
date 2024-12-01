import { ai } from "./ai";
import { simplePromptEvalSchema } from "./models";

export class EvaluationEngine {
  async evaluatePrompt({ prompt }: { prompt: string }) {
    const { object: evaluationResult } = await ai.generateObject({
      model: ai.models.gpt_4o_mini,
      system:
        "You are an LLM-judge. Given a prompt, provide a score on 'how good' the prompt is. The score should be between 0 and 1.",
      prompt: `Prompt: ${prompt}`,
      schema: simplePromptEvalSchema,
    });

    return {
      prompt,
      score: evaluationResult.score,
      feedback: evaluationResult.feedback,
    };
  }
}
