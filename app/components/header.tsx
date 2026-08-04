"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/tasks", label: "Tasks" },
  { href: "/analytics", label: "Analytics" },
  { href: "/ai-planner", label: "AI Planner" },
  { href: "/settings", label: "Settings" },
  { href: "/playground/health", label: "Health" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Smart Task Manager
          </h1>

          <p className="mt-1 text-gray-600 dark:text-gray-400">
            AI-powered productivity for modern workflows.
          </p>
        </div>


        <nav>
          <ul className="flex flex-wrap gap-4 text-sm font-medium">

            {navLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`transition ${
                      active
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}

          </ul>
        </nav>

      </div>
    </header>
  );
}