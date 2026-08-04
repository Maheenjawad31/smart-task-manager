"use client";

import { useState, useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AIPlannerPage() {
  const [input, setInput] = useState("");

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const [autoScroll, setAutoScroll] = useState(true);

  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!input.trim() || status !== "ready") return;

    await sendMessage({
      text: input,
    });

    setInput("");
  }

  useEffect(() => {
    if (autoScroll) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages, status, autoScroll]);

  function handleScroll() {
    const container = messagesContainerRef.current;

    if (!container) return;

    const distanceFromBottom =
      container.scrollHeight -
      container.scrollTop -
      container.clientHeight;

    setAutoScroll(distanceFromBottom < 100);
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900">
          AI Planner
        </h1>

        <p className="mt-2 text-gray-600">
          Plan your work with AI-powered suggestions.
        </p>

        <div className="mt-8 rounded-lg bg-white p-6 shadow">
          <div
            ref={messagesContainerRef}
            onScroll={handleScroll}
            className="min-h-[300px] max-h-[500px] space-y-4 overflow-y-auto"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`rounded-lg p-4 ${
                  message.role === "user"
                    ? "bg-blue-100 text-right"
                    : "bg-gray-100"
                }`}
              >
                <strong className="block">
                  {message.role === "user"
                    ? "You"
                    : "AI"}
                </strong>

                {message.parts.map((part, index) => {
  if (part.type !== "text") return null;

  return (
    <div
      key={index}
      className="prose prose-sm max-w-none mt-2"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
      >
        {part.text}
      </ReactMarkdown>
    </div>
  );
})}
              </div>
            ))}

            {status === "submitted" && (
              <div className="rounded-lg bg-gray-100 p-4">
                <strong className="block">
                  AI
                </strong>

                <div className="mt-2 flex items-center gap-2">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></span>
                  <span
                    className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                    style={{
                      animationDelay: "0.15s",
                    }}
                  ></span>
                  <span
                    className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                    style={{
                      animationDelay: "0.3s",
                    }}
                  ></span>

                  <span className="ml-2 text-gray-500">
                    Thinking...
                  </span>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {!autoScroll && (
            <div className="mt-3 flex justify-center">
              <button
                onClick={() => {
                  bottomRef.current?.scrollIntoView({
                    behavior: "smooth",
                  });

                  setAutoScroll(true);
                }}
                className="rounded-full bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
              >
                Jump to latest ↓
              </button>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-6 flex gap-2"
          >
            <input
              value={input}
              disabled={status !== "ready"}
              onChange={(e) =>
                setInput(e.target.value)
              }
              placeholder="Ask the AI to help plan your tasks..."
              className="flex-1 rounded border p-3 disabled:bg-gray-100 disabled:text-gray-500"
            />

            <button
              type="submit"
              disabled={status !== "ready"}
              className="rounded bg-blue-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send
            </button>

            {status === "streaming" && (
              <button
                type="button"
                onClick={stop}
                className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Stop
              </button>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}