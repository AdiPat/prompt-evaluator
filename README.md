# Prompt Evaluator 🚀🤖  
*Your AI module for evaluating prompts like a pro!*  

---

## ✨ Introduction  

Welcome to **Prompt Evaluator**! 🎉 Ever wondered, *"How good are my prompts really?"* 🤔 Let **Prompt Evaluator** be your guide! It's a fun, easy-to-use TypeScript library that employs **LLM as a Judge** to evaluate your prompts, test your ideas, and improve the quality of your AI outputs.  

Whether you're building ChatGPT plugins, AI-powered tools, or even working on that next viral bot 🤖, **Prompt Evaluator** is here to save you from the horrors of guesswork.  

---

## 🤔 What’s “LLM as a Judge”?  

Think of it this way: Large Language Models (LLMs) aren't just for generating text — they’re *excellent critics*. 🧐 They can assess the quality, relevance, and creativity of outputs based on specific metrics (like coherence, tone, or humor).  

For example:  
- Asking an LLM to score *"How funny is this joke?"*.  
- Testing which prompt gives the best explanation of *quantum mechanics for a 5-year-old*.  
- Evaluating how polite your chatbot sounds.  

Instead of endlessly tweaking, let the **Prompt Evaluator** do the hard work of objectively scoring and comparing your prompts! 💡  

---

## 🧠 Background  

Inspired by the challenges of prompt engineering highlighted in the [SwirlAI article](https://swirlai.com/):  

1️⃣ **Non-determinism** 🎲  
   - Outputs from LLMs can vary wildly! The same prompt can give wildly different results. That’s why judging multiple samples is *key*!  

2️⃣ **Difficulty with Evaluation** 📉  
   - Measuring *goodness* or *effectiveness* of a prompt is hard. Prompt Evaluator lets LLMs themselves handle the scoring and feedback.  

3️⃣ **Human Effort & Bias** 🧑‍⚖️  
   - Manual scoring is inconsistent and time-consuming. Automate your evaluations with **Prompt Evaluator** for consistent results.  

4️⃣ **Iterative Improvement** ♻️  
   - Use evaluations to refine your prompts systematically. Watch your scores soar!  

---

## 🛠️ Setup  

### Install the Library  
First, install **Prompt Evaluator**:  
```bash  
npm install prompt-evaluator  
```

---

## 🚀 Usage  

### 1. Import the Library  
```typescript  
import { evaluatePrompt, comparePrompts, batchEvaluate } from 'prompt-evaluator';  
```  

### 2. Evaluate a Single Prompt  
Get a score for a specific prompt:  
```typescript  
const task = "Explain quantum mechanics to a 5-year-old";  
const prompt = "What is quantum mechanics?";  

evaluatePrompt({ task, prompt }).then((result) => {  
  console.log(result);  
  // Example Output: { score: 8.7, feedback: 'Simpler language would help.' }  
});  
```  

### 3. Compare Two Prompts  
See which prompt performs better:  
```typescript  
const prompt1 = "Tell me a joke";  
const prompt2 = "Say something funny";  

comparePrompts({ task, prompts: [prompt1, prompt2] }).then((result) => {  
  console.log(result);  
  // Example Output: { winner: '0', scores: [8.3, 7.1] }  
});  
```  

### 4. Batch Evaluate Multiple Prompts  
Run multiple tasks with multiple prompts:  
```typescript  
const batch = [  
  { task: "Write a funny joke", prompts: ["Tell me a joke", "Say something funny"] },  
  { task: "Explain gravity", prompts: ["What is gravity?", "Explain gravity simply."] },  
];  

batchEvaluate(batch).then((results) => {  
  console.log(results);  
  /* Example Output:  
  [  
    { task: "Write a funny joke", scores: [8.3, 7.8] },  
    { task: "Explain gravity", scores: [9.2, 8.9] },  
  ]  
  */  
});  
```  

---

## 🤝 Contribution  

We ❤️ contributors! Want to help make **Prompt Evaluator** better? Here’s how you can contribute:  

1. **Report Bugs** 🐛  
   - Found an issue? Open an [issue](https://github.com/yourusername/prompt-evaluator/issues)!  

2. **Suggest Features** 💡  
   - Got a brilliant idea? Let us know!  

3. **Write Tests** ✅  
   - Help improve the robustness of the library by adding more tests.  

4. **Spread the Word** 📣  
   - Share **Prompt Evaluator** with your friends, colleagues, or that one prompt-obsessed team member!  

---

## 🌟 Star Us!  

If you like **Prompt Evaluator**, don’t forget to give us a ⭐ on GitHub! Your support keeps us motivated to build even cooler tools. 😄  

Happy Prompting! 🎉  

