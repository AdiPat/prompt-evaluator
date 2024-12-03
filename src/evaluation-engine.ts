import { ai } from "./ai";
import {
  EvaluatePromptInput,
  EvaluationResult,
  simplePromptEvalSchema,
  simplePromptEvalSchemaWithOutput,
} from "./models";

export class EvaluationEngine {
  async evaluatePrompt(input: EvaluatePromptInput): Promise<EvaluationResult> {
    const { system, fullPrompt, schema } = this.buildEvaluationParams(input);

    const { object: evaluationResult } = await ai.generateObject({
      model: ai.models.gpt_4o_mini,
      system,
      prompt: fullPrompt,
      schema,
    });

    return {
      prompt: input.prompt,
      output: input.output,
      score: evaluationResult.score,
      feedback: evaluationResult.feedback,
    };
  }

  private buildEvaluationParams(input: EvaluatePromptInput) {
    let system =
      "You are an LLM-judge. Given a prompt, provide a score on 'how good' the prompt is. The score should be between 0 and 1.";
    let fullPrompt = `Prompt: ${input.prompt}`;
    let schema = simplePromptEvalSchema;

    if (input.output) {
      system =
        "You are an LLM-judge. Given a prompt, provide a score on 'how good' the prompt is. The score should be between 0 and 1. Along with the prompt, you will be given an output of what an LLM has generated. Your task is to evaluate the LLM which generated the output. ";
      fullPrompt = [`Prompt: ${input.prompt}`, `Output: ${input.output}`].join(
        "\n"
      );
      schema = simplePromptEvalSchemaWithOutput;
    }

    return {
      system,
      fullPrompt,
      schema,
    };
  }
}
