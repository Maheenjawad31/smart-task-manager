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
  const { messages }: { messages: UIMessage[] } =
    await req.json();

  const result = streamText({
    model: openrouter(AI_CONFIG.model),
    system: AI_CONFIG.systemPrompt,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}