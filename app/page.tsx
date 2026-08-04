
import Link from "next/link";

const dashboardCards = [
  {
    title: "Tasks",
    description: "Manage your daily tasks and stay organized.",
    href: "/tasks",
  },
  {
    title: "Analytics",
    description: "Track your productivity and task completion.",
    href: "/analytics",
  },
  {
    title: "AI Planner",
    description: "Plan your work with AI-powered suggestions.",
    href: "/ai-planner",
  },
  {
    title: "Settings",
    description: "Manage your application preferences.",
    href: "/settings",
  },
  {
    title: "Health",
    description: "Check the application health status.",
    href: "/playground/health",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-10">

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>

        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
          Welcome to Smart Task Manager. Choose a section below to get started.
        </p>


        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {dashboardCards.map((card) => (

            <Link
              key={card.href}
              href={card.href}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >

              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {card.title}
              </h2>

              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {card.description}
              </p>

            </Link>

          ))}

        </div>

      </div>
    </main>
  );
}