import { openai } from "@ai-sdk/openai";
import { generateText, generateObject } from "ai";

export const ai = {
  generateText,
  generateObject,
  models: {
    gpt_4o_mini: openai("gpt-4o-mini"),
  },
};
