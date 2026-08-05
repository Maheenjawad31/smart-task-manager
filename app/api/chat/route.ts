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

          ...analyzeTasks,


          execute: async () => {

            return analyzeTasks.execute({
              tasks,
            });

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