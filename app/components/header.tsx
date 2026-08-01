import Link from "next/link";

const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/tasks", label: "Tasks" },
  { href: "/analytics", label: "Analytics" },
  { href: "/ai-planner", label: "AI Planner" },
  { href: "/settings", label: "Settings" },
  { href: "/health", label: "Health" },
];

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Smart Task Manager
          </h1>

          <p className="mt-1 text-gray-600">
            AI-powered productivity for modern workflows.
          </p>
        </div>

        <nav>
          <ul className="flex flex-wrap gap-4 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-gray-600 transition hover:text-blue-600"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}