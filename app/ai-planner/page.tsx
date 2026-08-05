"use client";

import { useState, useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import {
  DefaultChatTransport,
  lastAssistantMessageIsCompleteWithToolCalls,
} from "ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { Task } from "@/types/task";
import ToolResultCard from "@/app/components/ToolResultCard";


export default function AIPlannerPage() {

  const [input, setInput] = useState("");
  const [lastMessage, setLastMessage] = useState("");
  const [autoScroll, setAutoScroll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [tasks] = useLocalStorage<Task[]>("tasks", []);


  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);



  const {
    messages,
    sendMessage,
    status,
    stop,
  } = useChat({

    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),


    sendAutomaticallyWhen:
      lastAssistantMessageIsCompleteWithToolCalls,


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


    if (!input.trim() || status !== "ready")
      return;


    setErrorMessage("");
    setLastMessage(input);


    await sendMessage(
      {
        text: input,
      },
      {
        body: {
          tasks: tasks || [],
        },
      }
    );


    setInput("");

  }




  async function retryMessage() {

    if (!lastMessage || status !== "ready")
      return;


    setErrorMessage("");


    await sendMessage(
      {
        text: lastMessage,
      },
      {
        body: {
          tasks: tasks || [],
        },
      }
    );

  }




  useEffect(() => {

    if (autoScroll) {

      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });

    }

  }, [messages, status, autoScroll]);





  function handleScroll() {

    const container =
      messagesContainerRef.current;


    if (!container)
      return;


    const distance =
      container.scrollHeight -
      container.scrollTop -
      container.clientHeight;


    setAutoScroll(distance < 100);

  }





  return (

    <main className="min-h-screen bg-slate-100 dark:bg-slate-950">


      <div className="mx-auto max-w-3xl px-6 py-10">


        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          AI Planner
        </h1>


        <p className="mt-2 text-gray-600 dark:text-gray-400">
          AI-powered planning assistant for your tasks.
        </p>




        <div className="mt-8 rounded-lg bg-white p-6 shadow dark:bg-slate-900">


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
                    ? "bg-blue-100 dark:bg-blue-950"
                    : "bg-gray-100 dark:bg-slate-800"
                }`}
              >


                <div className="text-2xl">
                  {message.role === "user"
                    ? "👤"
                    : "🤖"}
                </div>



                <div className="flex-1">


                  <strong className="text-gray-900 dark:text-white">
                    {message.role === "user"
                      ? "You"
                      : "AI"}
                  </strong>




                  {message.parts.map((part, index) => {



                    if (part.type === "text") {

                      return (

                        <div
                          key={index}
                          className="prose prose-sm mt-2 max-w-none dark:prose-invert"
                        >

                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                          >

                            {part.text}

                          </ReactMarkdown>

                        </div>

                      );

                    }





                    if (part.type === "tool-analyzeTasks") {


                      switch (part.state) {


                        case "input-streaming":

                          return (

                            <div
                              key={index}
                              className="mt-3 rounded-xl border border-yellow-300 bg-yellow-50 p-4 text-yellow-800 dark:border-yellow-700 dark:bg-yellow-950 dark:text-yellow-200"
                            >

                              🔍 Analyzing your tasks...

                              <p className="mt-1 text-sm">
                                AI is preparing your productivity report.
                              </p>

                            </div>

                          );



                        case "input-available":

                          return (

                            <div
                              key={index}
                              className="mt-3 rounded-xl border border-blue-300 bg-blue-50 p-4 text-blue-800 dark:border-blue-700 dark:bg-blue-950 dark:text-blue-200"
                            >

                              📥 Task data received. Starting analysis...

                            </div>

                          );



                          case "output-available": {
                            const output = part.output as {
                              total: number;
                              completed: number;
                              pending: number;
                              high: number;
                              medium: number;
                              low: number;
                              productivityScore: number;
                              recommendation: string;
                            };
                          
                            return (
                              <ToolResultCard
                                key={index}
                                totalTasks={output.total}
                                completedTasks={output.completed}
                                pendingTasks={output.pending}
                                highPriority={output.high}
                                suggestion={output.recommendation}
                              />
                            );
                          }





                        case "output-error":

                          return (

                            <div
                              key={index}
                              className="mt-3 rounded-xl border border-red-300 bg-red-50 p-4 text-red-700 dark:border-red-700 dark:bg-red-950 dark:text-red-300"
                            >

                              <p className="font-semibold">
                                ❌ Task analysis failed
                              </p>


                              <p className="mt-1 text-sm">
                                The AI tool could not complete the analysis.
                                Please try again.
                              </p>

                            </div>

                          );



                        default:
                          return null;

                      }

                    }



                    return null;


                  })}



                </div>


              </div>


            ))}






            {status === "submitted" && (

              <div className="flex gap-3 rounded-lg bg-gray-100 p-4 dark:bg-slate-800">


                <div className="text-2xl">
                  🤖
                </div>


                <div>

                  <strong className="text-gray-900 dark:text-white">
                    AI
                  </strong>


                  <div className="mt-2 text-gray-500">
                    Thinking...
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

            <div className="mt-4 rounded bg-red-100 p-3 text-red-700 dark:bg-red-950 dark:text-red-300">


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

              onChange={(e) =>
                setInput(e.target.value)
              }

              disabled={status !== "ready"}

              className="flex-1 rounded border bg-white p-3 text-gray-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"

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