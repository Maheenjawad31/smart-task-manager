"use client";

import { useState } from "react";

interface TaskFormProps {
  onAddTask: (
    title: string,
    priority: "High" | "Medium" | "Low"
  ) => void;
}

export default function TaskForm({
  onAddTask,
}: TaskFormProps) {
  const [title, setTitle] = useState("");

  const [priority, setPriority] = useState<
    "High" | "Medium" | "Low"
  >("Medium");


  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a task.");
      return;
    }

    onAddTask(title, priority);

    setTitle("");
    setPriority("Medium");
  };


  return (
    <div className="mb-8 rounded-xl bg-white p-6 shadow-md dark:bg-slate-900">

      <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        Add New Task
      </h2>


      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <div>

          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Task Title
          </label>


          <input
            type="text"
            placeholder="Enter your task..."
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-400"
          />

        </div>



        <div>

          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Priority
          </label>


          <select
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target.value as
                  | "High"
                  | "Medium"
                  | "Low"
              )
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
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

        </div>



        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Add Task
        </button>


      </form>

    </div>
  );
}