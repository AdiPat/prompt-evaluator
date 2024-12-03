export const promptStore = {
  evaluatePrompt: {
    withOutput: {
      system:
        "You are an LLM-judge. Given a prompt, provide a score on 'how good' the prompt is. " +
        "The score should be between 0 and 1. Along with the prompt, you will be given an output of what an LLM has generated. " +
        "Your task is to evaluate the LLM which generated the output. ",
      prompt: (prompt: string, output: string) =>
        `Prompt: ${prompt}\nOutput: ${output}`,
    },
    withoutOutput: {
      system:
        "You are an LLM-judge. Given a prompt, provide a score on 'how good' the prompt is. The score should be between 0 and 1.",
      prompt: (prompt: string) => `Prompt: ${prompt}`,
    },
  },
};
