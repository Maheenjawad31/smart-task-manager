



import {
  streamText,
  convertToModelMessages,
  type UIMessage,
} from "ai";

import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { AI_CONFIG } from "@/lib/ai/config";
import { analyzeTasks } from "@/lib/ai/tools/analyzeTasks";


const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY!,
});


export async function POST(req: Request) {
  try {

    const {
      messages,
      tasks = [],
    }: {
      messages: UIMessage[];

      tasks: {
        title: string;
        completed: boolean;
        priority: "High" | "Medium" | "Low";
      }[];

    } = await req.json();


    const result = streamText({

      model: openrouter(AI_CONFIG.model),


      system: `
${AI_CONFIG.systemPrompt}

You have access to a tool called analyzeTasks.

IMPORTANT:
- When the user asks to analyze tasks, review tasks, prioritize work, or asks what they should do,
you MUST call the analyzeTasks tool.
- Do not ask the user to provide their task list.
- The tool already has access to the user's tasks.
`,


      messages: await convertToModelMessages(messages),


      tools: {

        analyzeTasks: {
          description: analyzeTasks.description,

          inputSchema: analyzeTasks.inputSchema,

          execute: async () => {

            const total = tasks.length;

            const completed = tasks.filter(
              (task) => task.completed
            ).length;

            const pending = total - completed;

            const high = tasks.filter(
              (task) => task.priority === "High"
            ).length;

            const medium = tasks.filter(
              (task) => task.priority === "Medium"
            ).length;

            const low = tasks.filter(
              (task) => task.priority === "Low"
            ).length;


            const productivityScore =
              total === 0
                ? 0
                : Math.round((completed / total) * 100);


            let recommendation = "";

            if (pending === 0 && total > 0) {
              recommendation =
                "Excellent work! All tasks are completed.";
            } else if (high > 0) {
              recommendation =
                "Focus on completing your high-priority tasks first.";
            } else if (pending > completed) {
              recommendation =
                "Try completing a few pending tasks today.";
            } else {
              recommendation =
                "You're making steady progress. Keep it up!";
            }


            return {
              total,
              completed,
              pending,
              high,
              medium,
              low,
              productivityScore,
              recommendation,
            };
          },

        },

      },

    });


    return result.toUIMessageStreamResponse();


  } catch (error) {

    console.error("Chat API Error:", error);


    return new Response(
      JSON.stringify({
        error: "Failed to generate AI response.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

  }
}