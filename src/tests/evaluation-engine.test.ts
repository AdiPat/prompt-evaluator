import { describe, it, expect, beforeEach, vi } from "vitest";
import { EvaluationEngine } from "../evaluation-engine";
import { ai } from "../ai";
import { afterEach } from "node:test";
import {
  simplePromptEvalSchema,
  simplePromptEvalSchemaWithOutput,
} from "../models";

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

    it("should evaluate a prompt if 'output' is provided", async () => {
      const evaluationEngine = new EvaluationEngine();
      const output = "The meaning of life is 42.";
      const questionPrompt = "What is the meaning of life?";
      const prompt = [`Prompt: ${questionPrompt}`, `Output: ${output}`].join(
        "\n"
      );
      const evaluationResult = await evaluationEngine.evaluatePrompt({
        prompt,
        output,
      });
      expect(evaluationResult).toEqual({
        prompt,
        output,
        score: expect.any(Number),
        feedback: expect.any(String),
      });
    });

    it("should call generateObject with correct parameters if 'output' is provided", async () => {
      const generateObjectSpy = vi.spyOn(ai, "generateObject");
      const evaluationEngine = new EvaluationEngine();
      const prompt = "What is the meaning of life?";
      const output = "The meaning of life is 42.";
      await evaluationEngine.evaluatePrompt({
        prompt,
        output,
      });
      expect(generateObjectSpy).toHaveBeenCalledWith({
        model: ai.models.gpt_4o_mini,
        system:
          "You are an LLM-judge. Given a prompt, provide a score on 'how good' the prompt is. The score should be between 0 and 1. Along with the prompt, you will be given an output of what an LLM has generated. Your task is to evaluate the LLM which generated the output. ",
        prompt: [`Prompt: ${prompt}`, `Output: ${output}`].join("\n"),
        schema: simplePromptEvalSchemaWithOutput,
      });
    });
  });

  describe("comparePrompts should", () => {
    it("should be defined", () => {
      const evaluationEngine = new EvaluationEngine();
      expect(evaluationEngine.comparePrompts).toBeDefined();
    });

    it("should return a winner prompt as string", async () => {
      const evaluationEngine = new EvaluationEngine();
      const source = {
        prompt: "What is the meaning of life?",
      };
      const target = {
        prompt: "What is the meaning of life?",
      };
      const winnerPrompt = await evaluationEngine.comparePrompts(
        source,
        target
      );
      expect(winnerPrompt).toEqual(expect.any(String));
    });

    it("should call evaluatePrompt on both 'source' and 'destination' prompts", async () => {
      const evaluatePromptSpy = vi.spyOn(
        EvaluationEngine.prototype,
        "evaluatePrompt"
      );
      const evaluationEngine = new EvaluationEngine();
      const source = {
        prompt: "What is the meaning of life?",
      };
      const target = {
        prompt: "What is the meaning of life?",
      };
      await evaluationEngine.comparePrompts(source, target);
      expect(evaluatePromptSpy).toHaveBeenCalledTimes(2);
      expect(evaluatePromptSpy).nthCalledWith(1, source);
      expect(evaluatePromptSpy).nthCalledWith(2, target);
    });

    it("compared the prompts when both have 'output' provided", async () => {
      const evaluatePromptSpy = vi.spyOn(
        EvaluationEngine.prototype,
        "evaluatePrompt"
      );
      const evaluationEngine = new EvaluationEngine();
      const source = {
        prompt: "What is the meaning of life?",
        output: "The meaning of life is 42.",
      };
      const target = {
        prompt: "What is the meaning of sports?",
        output: "The meaning of life is 60.",
      };
      const winnerPrompt = await evaluationEngine.comparePrompts(
        source,
        target
      );
      expect(winnerPrompt).toEqual(expect.any(String));
      expect(evaluatePromptSpy).toHaveBeenCalledTimes(2);
      expect(evaluatePromptSpy).nthCalledWith(1, source);
      expect(evaluatePromptSpy).nthCalledWith(2, target);
    });
  });
});
