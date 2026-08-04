"use client";

import { useState, useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AIPlannerPage() {
  const [input, setInput] = useState("");
  const [lastMessage, setLastMessage] = useState("");
  const [autoScroll, setAutoScroll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
    onError(error) {
      console.error(error);
      setErrorMessage(
        "Something went wrong while contacting the AI. Please try again."
      );
    },
  });

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!input.trim() || status !== "ready") return;

    setErrorMessage("");
    setLastMessage(input);

    await sendMessage({
      text: input,
    });

    setInput("");
  }

  async function retryMessage() {
    if (!lastMessage || status !== "ready") return;

    setErrorMessage("");

    await sendMessage({
      text: lastMessage,
    });
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

    const distance =
      container.scrollHeight -
      container.scrollTop -
      container.clientHeight;

    setAutoScroll(distance < 100);
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-3xl font-bold">
          AI Planner
        </h1>

        <div className="mt-8 rounded-lg bg-white p-6 shadow">
          <div
            ref={messagesContainerRef}
            onScroll={handleScroll}
            className="max-h-[500px] space-y-4 overflow-y-auto"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 rounded-lg p-4 ${
                  message.role === "user"
                    ? "bg-blue-100"
                    : "bg-gray-100"
                }`}
              >
                <div className="text-2xl">
                  {message.role === "user" ? "👤" : "🤖"}
                </div>

                <div className="flex-1">
                  <strong>
                    {message.role === "user" ? "You" : "AI"}
                  </strong>

                  {message.parts.map((part, index) => {
                    if (part.type !== "text") return null;

                    return (
                      <div
                        key={index}
                        className="prose prose-sm mt-2 max-w-none"
                      >
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            code({ children, className }) {
                              return className ? (
                                <pre className="my-3 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-white">
                                  <code>{children}</code>
                                </pre>
                              ) : (
                                <code className="rounded bg-slate-200 px-1 py-0.5 text-sm">
                                  {children}
                                </code>
                              );
                            },
                          }}
                        >
                          {part.text}
                        </ReactMarkdown>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {status === "submitted" && (
              <div className="flex gap-3 rounded-lg bg-gray-100 p-4">
                <div className="text-2xl">🤖</div>

                <div>
                  <strong>AI</strong>

                  <div className="mt-2 flex items-center gap-2 text-gray-500">
                    <span>Thinking</span>
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {!autoScroll && (
            <button
              onClick={() => {
                bottomRef.current?.scrollIntoView({
                  behavior: "smooth",
                });
                setAutoScroll(true);
              }}
              className="mt-3 rounded-full bg-blue-600 px-4 py-2 text-sm text-white"
            >
              Jump to latest ↓
            </button>
          )}

          {errorMessage && (
            <div className="mt-4 rounded bg-red-100 p-3 text-red-700">
              {errorMessage}

              <button
                onClick={retryMessage}
                className="ml-3 rounded bg-red-600 px-3 py-1 text-white"
              >
                Retry
              </button>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-6 flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={status !== "ready"}
              className="flex-1 rounded border p-3"
              placeholder="Ask AI..."
            />

            <button
              disabled={status !== "ready"}
              className="rounded bg-blue-600 px-4 text-white disabled:opacity-50"
            >
              Send
            </button>

            {status === "streaming" && (
              <button
                type="button"
                onClick={stop}
                className="rounded bg-red-600 px-4 text-white"
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