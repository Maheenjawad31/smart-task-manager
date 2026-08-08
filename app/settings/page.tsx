
"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { Task } from "@/types/task";

export default function SettingsPage() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  const [theme, setTheme] = useState("light");
  const [priority, setPriority] = useState("Medium");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setTheme(savedTheme);

      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  function changeTheme(value: string) {
    setTheme(value);

    localStorage.setItem("theme", value);

    if (value === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  function clearTasks() {
    const confirmDelete = confirm(
      "Delete all tasks permanently?"
    );

    if (!confirmDelete) return;

    setTasks([]);
    setMessage("All tasks deleted successfully.");
  }

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>

        <p className="mt-2 text-gray-700 dark:text-gray-300">
          Customize Smart Task Manager preferences.
        </p>

        <div className="mt-8 grid gap-6">
          <Section title="🚀 Application">
            <p className="font-medium text-gray-900 dark:text-white">
              Smart Task Manager
            </p>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              Version 1.0.0
            </p>
          </Section>

          <Section title="🎨 Appearance">
            <label
              htmlFor="theme-select"
              className="text-gray-800 dark:text-gray-200"
            >
              Theme
            </label>

            <select
              id="theme-select"
              value={theme}
              onChange={(e) =>
                changeTheme(e.target.value)
              }
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            >
              <option value="light">
                Light ☀️
              </option>

              <option value="dark">
                Dark 🌙
              </option>
            </select>
          </Section>

          <Section title="📝 Task Preferences">
            <label
              htmlFor="priority-select"
              className="text-gray-800 dark:text-gray-200"
            >
              Default Priority
            </label>

            <select
              id="priority-select"
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value)
              }
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            >
              <option value="High">
                High
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="Low">
                Low
              </option>
            </select>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              New tasks will use this priority.
            </p>
          </Section>

          <Section title="💾 Storage">
            <div className="space-y-2 text-gray-800 dark:text-gray-200">
              <p>
                Total Tasks:
                <span className="ml-2 font-bold">
                  {tasks.length}
                </span>
              </p>

              <p>
                Completed Tasks:
                <span className="ml-2 font-bold">
                  {completedTasks}
                </span>
              </p>
            </div>

            <button
              onClick={clearTasks}
              className="mt-4 rounded-lg bg-red-600 px-5 py-2 text-white transition hover:bg-red-700"
            >
              Clear All Tasks
            </button>

            {message && (
              <p
                className="mt-3 text-green-700 dark:text-green-400"
                role="status"
              >
                {message}
              </p>
            )}
          </Section>

          <Section title="🤖 AI Planner">
            <p className="text-gray-900 dark:text-white">
              Status:
              <span className="ml-2 font-semibold text-green-700 dark:text-green-400">
                Active
              </span>
            </p>

            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Streaming AI assistant enabled.
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl bg-white p-6 shadow dark:bg-slate-900">
      <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>

      {children}
    </section>
  );
}