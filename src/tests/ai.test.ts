import { describe, it, expect } from "vitest";
import { ai } from "../ai";

describe("ai should", () => {
  it("have generateText method", () => {
    expect(ai.generateText).toBeDefined();
  });

  it("have generateObject method", () => {
    expect(ai.generateObject).toBeDefined();
  });

  it("has gpt_4o_mini model", () => {
    expect(ai.models.gpt_4o_mini).toBeDefined();
  });
});
