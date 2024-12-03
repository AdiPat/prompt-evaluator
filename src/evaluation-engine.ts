import { ai } from "./ai";
import {
  EvaluatePromptInput,
  EvaluationResult,
  simplePromptEvalSchema,
  simplePromptEvalSchemaWithOutput,
} from "./models";
import { promptStore } from "./prompt-store";

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

  async comparePrompts(
    source: EvaluatePromptInput,
    target: EvaluatePromptInput
  ): Promise<string> {
    const sourceEval = await this.evaluatePrompt(source);
    const targetEval = await this.evaluatePrompt(target);
    const sourceIsBetter = sourceEval.score > targetEval.score;
    return sourceIsBetter ? source.prompt : target.prompt;
  }

  private buildEvaluationParams(input: EvaluatePromptInput) {
    let system = promptStore.evaluatePrompt.withoutOutput.system;
    let fullPrompt = promptStore.evaluatePrompt.withoutOutput.prompt(
      input.prompt
    );
    let schema = simplePromptEvalSchema;

    if (input.output) {
      system = promptStore.evaluatePrompt.withOutput.system;
      fullPrompt = promptStore.evaluatePrompt.withOutput.prompt(
        input.prompt,
        input.output
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
