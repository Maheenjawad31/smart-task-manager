"use client";

type Props = {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  highPriority: number;
  suggestion: string;
};

export default function ToolResultCard({
  totalTasks,
  completedTasks,
  pendingTasks,
  highPriority,
  suggestion,
}: Props) {
  return (
    <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-5 dark:border-slate-700 dark:bg-slate-900">

      <h3 className="mb-4 text-lg font-bold text-blue-700 dark:text-blue-400">
        📊 Productivity Analysis
      </h3>

      <div className="grid grid-cols-2 gap-4">

        <div className="rounded-lg bg-white p-3 shadow dark:bg-slate-800">
          <p className="text-sm text-gray-500">
            Total Tasks
          </p>

          <p className="text-2xl font-bold">
            {totalTasks}
          </p>
        </div>

        <div className="rounded-lg bg-white p-3 shadow dark:bg-slate-800">
          <p className="text-sm text-gray-500">
            Completed
          </p>

          <p className="text-2xl font-bold text-green-600">
            {completedTasks}
          </p>
        </div>

        <div className="rounded-lg bg-white p-3 shadow dark:bg-slate-800">
          <p className="text-sm text-gray-500">
            Pending
          </p>

          <p className="text-2xl font-bold text-orange-600">
            {pendingTasks}
          </p>
        </div>

        <div className="rounded-lg bg-white p-3 shadow dark:bg-slate-800">
          <p className="text-sm text-gray-500">
            High Priority
          </p>

          <p className="text-2xl font-bold text-red-600">
            {highPriority}
          </p>
        </div>

      </div>

      <div className="mt-5 rounded-lg bg-white p-4 dark:bg-slate-800">

        <h4 className="font-semibold">
          AI Suggestion
        </h4>

        <p className="mt-2 text-gray-700 dark:text-gray-300">
          {suggestion}
        </p>

      </div>

    </div>
  );
}