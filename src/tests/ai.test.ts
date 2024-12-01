import { describe, it, expect } from "vitest";
import { ai } from "../ai";

describe("ai should", () => {
  it("have generateText method", () => {
    expect(ai.generateText).toBeDefined();
  });
});
