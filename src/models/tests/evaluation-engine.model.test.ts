import { describe, it, expect } from "vitest";
import { simplePromptEvalSchema } from "../evaluation-engine.model";

describe("evaluation engine model should", () => {
  it("have simplePromptEvalSchema", () => {
    expect(simplePromptEvalSchema).toBeDefined();
  });

  it("should allow scores between 0 and 1 and string feedback", () => {
    const simplePromptResponse = {
      prompt: "What is the meaning of life?",
      score: 0.5,
      feedback: "Not implemented",
    };

    const result = simplePromptEvalSchema.safeParse(simplePromptResponse);
    expect(result.success).toBe(true);
  });

  it("should not allow scores below 0", () => {
    const simplePromptResponse = {
      prompt: "What is the meaning of life?",
      score: -0.5,
      feedback: "Not implemented",
    };

    const result = simplePromptEvalSchema.safeParse(simplePromptResponse);
    expect(result.success).toBe(false);
  });

  it("should not allow scores above 1", () => {
    const simplePromptResponse = {
      prompt: "What is the meaning of life?",
      score: 1.5,
      feedback: "Not implemented",
    };

    const result = simplePromptEvalSchema.safeParse(simplePromptResponse);
    expect(result.success).toBe(false);
  });
});
