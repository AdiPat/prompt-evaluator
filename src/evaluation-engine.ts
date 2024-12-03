import { ai } from "./ai";
import {
  EvaluatePromptInput,
  EvaluationResult,
  simplePromptEvalSchema,
  simplePromptEvalSchemaWithOutput,
} from "./models";
import { z } from "zod";
import { promptStore } from "./prompt-store";

export class EvaluationEngine {
  async evaluatePrompt(
    evaluationInput: EvaluatePromptInput
  ): Promise<EvaluationResult> {
    const { system, fullPrompt, schema } =
      this.buildEvaluationParams(evaluationInput);

    const { object: evaluationResult } = await ai.generateObject({
      model: ai.models.gpt_4o_mini,
      system,
      prompt: fullPrompt,
      schema,
    });

    return {
      prompt: evaluationInput.prompt,
      output: evaluationInput.output,
      score: evaluationResult.score,
      feedback: evaluationResult.feedback,
    };
  }

  async comparePrompts(
    source: EvaluatePromptInput,
    target: EvaluatePromptInput
  ): Promise<string> {
    const sourceEval = await this.evaluatePrompt(source);
    const targetEval = await this.evaluatePrompt(target);
    const sourceIsBetter = sourceEval.score > targetEval.score;
    return sourceIsBetter ? source.prompt : target.prompt;
  }

  private buildEvaluationParams(evaluationInput: EvaluatePromptInput): {
    system: string;
    fullPrompt: string;
    schema: z.Schema<any>;
  } {
    let system = promptStore.evaluatePrompt.withoutOutput.system;
    let fullPrompt = promptStore.evaluatePrompt.withoutOutput.prompt(
      evaluationInput.prompt
    );
    let schema = simplePromptEvalSchema;

    if (evaluationInput.output) {
      system = promptStore.evaluatePrompt.withOutput.system;
      fullPrompt = promptStore.evaluatePrompt.withOutput.prompt(
        evaluationInput.prompt,
        evaluationInput.output
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
