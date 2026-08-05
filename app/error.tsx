"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-950">
      <div className="max-w-md rounded-xl bg-white p-8 shadow dark:bg-slate-900">
        <h1 className="text-2xl font-bold text-red-600">
          Something went wrong
        </h1>

        <p className="mt-3 text-gray-600 dark:text-gray-300">
          An unexpected error occurred while loading this page.
        </p>

        <button
          onClick={() => reset()}
          className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}