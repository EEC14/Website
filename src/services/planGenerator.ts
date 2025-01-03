import OpenAI from "openai";
import { PlanType } from "../components/planquestionnaire";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const PLAN_PROMPTS = {
  workout: "You are a certified fitness trainer. Generate 5 relevant questions to create a personalized workout plan. Questions should cover fitness level, schedule, equipment access, and any limitations.",
  diet: "You are a certified nutritionist. Generate 5 relevant questions to create a personalized diet plan. Questions should cover dietary preferences, restrictions, current eating habits, and lifestyle.",
  meditation: "You are a meditation instructor. Generate 5 relevant questions to create a personalized meditation plan. Questions should cover experience level, schedule, practice goals, preferred techniques, and any specific challenges."
};

const PLAN_GENERATION_PROMPTS = {
  workout: "You are a certified fitness trainer. Create a detailed workout plan based on the user's goals and answers. Include exercise descriptions, sets, reps, and weekly schedule.",
  diet: "You are a certified nutritionist. Create a detailed meal plan based on the user's goals and answers. Include meal suggestions, portions, and nutritional guidance.You can also include a weekly schedule if you deem it necessary",
  meditation: "You are a meditation instructor. Create a structured meditation plan based on the user's goals and answers. Include technique descriptions, session durations, progression path, and daily practice guidance."
};

export async function generatePlanQuestions(
  type: PlanType,
  goals: string
): Promise<string[]> {
  if (!import.meta.env.VITE_OPENAI_API_KEY) {
    throw new Error("API key is not configured");
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: PLAN_PROMPTS[type] },
        { role: "user", content: `Generate questions for someone with these goals: ${goals}` },
      ],
      model: "chatgpt-4o-latest",
      temperature: 0.7,
      max_tokens: 2500,
    });

    return completion.choices[0]?.message?.content
      ?.split("\n")
      .filter((q) => q.trim())
      .slice(0, 5) || [];
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to generate questions");
  }
}

export async function generatePlan(
  type: PlanType,
  goals: string,
  answers: Record<string, string>
): Promise<string> {
  if (!import.meta.env.VITE_OPENAI_API_KEY) {
    throw new Error("API key is not configured");
  }

  const questionsAndAnswers = Object.entries(answers)
    .map(([q, a]) => `Q: ${q}\nA: ${a}`)
    .join("\n\n");

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: PLAN_GENERATION_PROMPTS[type] },
        {
          role: "user",
          content: `Create a ${type} plan with the following information:\n\nGoals: ${goals}\n\nUser Information:\n${questionsAndAnswers}`,
        },
      ],
      model: "chatgpt-4o-latest",
      temperature: 0.7,
      max_tokens: 2500,
    });

    return completion.choices[0]?.message?.content || "Unable to generate plan";
  } catch (error) {
    console.error("API Error:", error);
    throw new Error(`Failed to generate ${type} plan`);
  }
}