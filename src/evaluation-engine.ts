export class EvaluationEngine {
  evaluatePrompt({ prompt }: { prompt: string }) {
    return {
      prompt,
      score: 0,
      feedback: "Not implemented",
    };
  }
}
