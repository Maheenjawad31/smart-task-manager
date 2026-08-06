"use client";

import AnimatedButton from "@/app/components/AnimatedButton";

export default function ButtonDemoPage() {
  return (
    <main className="min-h-screen bg-slate-100 dark:bg-slate-950 p-10">
      <div className="mx-auto max-w-3xl space-y-10">

        <h1 className="text-4xl font-bold">
          Buttons with a Brain
        </h1>

        <p className="text-gray-600 dark:text-gray-300">
          FE-AA1 Motion & State Micro-interactions Demo
        </p>

        <div className="space-y-6 rounded-xl bg-white dark:bg-slate-900 p-8 shadow">

          <div>
            <h2 className="mb-3 text-xl font-semibold">
              Success Button
            </h2>

            <AnimatedButton
              label="Send Message"
            />
          </div>

          <div>
            <h2 className="mb-3 text-xl font-semibold">
              Error Button
            </h2>

            <AnimatedButton
              label="Generate AI Plan"
              simulateError
            />
          </div>

          <div>
            <h2 className="mb-3 text-xl font-semibold">
              Disabled Button
            </h2>

            <AnimatedButton
              label="Disabled"
              disabled
            />
          </div>

        </div>

        <div className="rounded-xl bg-white dark:bg-slate-900 p-6 shadow">
          <h2 className="mb-3 text-xl font-semibold">
            Motion Design Notes
          </h2>

          <p className="text-gray-700 dark:text-gray-300">
            Hover and tap use small scale transforms (1.05 and 0.95)
            because they are GPU-friendly and feel responsive without
            causing layout shifts. Loading transitions smoothly into
            success or error. Error uses a brief shake animation to
            communicate failure, while success displays a confirmation
            state before returning to idle.
          </p>
        </div>

      </div>
    </main>
  );
}