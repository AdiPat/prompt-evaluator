import { describe, it, expect } from "vitest";
import { EvaluationEngine } from "../evaluation-engine";

describe("evaluation engine", () => {
  describe("evaluatePrompt should", () => {
    it("should return response of valid format", () => {
      const evaluationEngine = new EvaluationEngine();
      const prompt = "What is the meaning of life?";
      const evaluationResult = evaluationEngine.evaluatePrompt({
        prompt,
      });
      expect(evaluationResult).toEqual({
        prompt,
        score: expect.any(Number),
        feedback: expect.any(String),
      });
    });
  });
});
