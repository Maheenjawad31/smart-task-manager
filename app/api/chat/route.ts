import {
  streamText,
  convertToModelMessages,
  type UIMessage,
} from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { AI_CONFIG } from "@/lib/ai/config";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } =
      await req.json();

    const result = streamText({
      model: openrouter(AI_CONFIG.model),
      system: AI_CONFIG.systemPrompt,
      messages: await convertToModelMessages(messages),
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