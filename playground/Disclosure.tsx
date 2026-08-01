"use client";

import { useState } from "react";

export default function Disclosure() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-lg border bg-white p-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="disclosure-content"
        className="flex w-full items-center justify-between text-left text-lg font-semibold text-gray-900"
      >
        More Information

        <span>
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {isOpen && (
        <div
          id="disclosure-content"
          className="mt-4 text-gray-600"
        >
          This content is revealed when the disclosure button
          is activated.
        </div>
      )}
    </div>
  );
}