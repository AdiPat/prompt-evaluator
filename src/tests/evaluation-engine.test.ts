import { describe, it, expect, beforeEach, vi } from "vitest";
import { EvaluationEngine } from "../evaluation-engine";
import { ai } from "../ai";
import { afterEach } from "node:test";
import { simplePromptEvalSchema } from "../models";

describe("evaluation engine", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("evaluatePrompt should", () => {
    it("should return response of valid format", async () => {
      const evaluationEngine = new EvaluationEngine();
      const prompt = "What is the meaning of life?";
      const evaluationResult = await evaluationEngine.evaluatePrompt({
        prompt,
      });
      expect(evaluationResult).toEqual({
        prompt,
        score: expect.any(Number),
        feedback: expect.any(String),
      });
    });

    it("should call generateObject with correct parameters", async () => {
      const generateObjectSpy = vi.spyOn(ai, "generateObject");
      const evaluationEngine = new EvaluationEngine();
      const prompt = "What is the meaning of life?";
      await evaluationEngine.evaluatePrompt({
        prompt,
      });
      expect(generateObjectSpy).toHaveBeenCalledWith({
        model: ai.models.gpt_4o_mini,
        system:
          "You are an LLM-judge. Given a prompt, provide a score on 'how good' the prompt is. The score should be between 0 and 1.",
        prompt: `Prompt: ${prompt}`,
        schema: simplePromptEvalSchema,
      });
    });
  });
});
