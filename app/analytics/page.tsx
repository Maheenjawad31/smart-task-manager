"use client";

import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { Task } from "@/types/task";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function AnalyticsPage() {
  const [tasks] = useLocalStorage<Task[]>("tasks", []);

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

  const score =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  const statusData = [
    {
      name: "Completed",
      value: completed,
    },
    {
      name: "Pending",
      value: pending,
    },
  ];

  const priorityData = [
    {
      name: "High",
      value: high,
    },
    {
      name: "Medium",
      value: medium,
    },
    {
      name: "Low",
      value: low,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-10">

        <h1 className="text-3xl font-bold text-gray-900">
          Analytics
        </h1>

        <p className="mt-2 text-gray-600">
          Understand your productivity and task progress.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">

          <Card
            title="Productivity Score"
            value={`${score}%`}
          />

          <Card
            title="Total Tasks"
            value={total}
          />

          <Card
            title="Completed"
            value={completed}
          />

        </div>


        <div className="mt-8 grid gap-6 md:grid-cols-2">

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">
              Task Status
            </h2>

            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                >
                  {statusData.map((_, index) => (
                    <Cell key={index} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>


          <div className="rounded-xl bg-white p-6 shadow">

            <h2 className="mb-4 text-xl font-semibold">
              Priority Breakdown
            </h2>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={priorityData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />

                <Bar
                  dataKey="value"
                />
              </BarChart>
            </ResponsiveContainer>

          </div>

        </div>

      </div>
    </main>
  );
}


function Card({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <p className="text-gray-600">
        {title}
      </p>

      <p className="mt-3 text-3xl font-bold">
        {value}
      </p>

    </div>
  );
}