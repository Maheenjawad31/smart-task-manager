"use client";

import { useState } from "react";

const tabs = [
  {
    id: "profile",
    label: "Profile",
    content: "Profile information goes here.",
  },
  {
    id: "settings",
    label: "Settings",
    content: "Settings information goes here.",
  },
  {
    id: "account",
    label: "Account",
    content: "Account information goes here.",
  },
];

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("profile");

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
      return;
    }

    let newIndex = index;

    if (event.key === "ArrowRight") {
      newIndex = (index + 1) % tabs.length;
    }

    if (event.key === "ArrowLeft") {
      newIndex = (index - 1 + tabs.length) % tabs.length;
    }

    setActiveTab(tabs[newIndex].id);

    const button = document.getElementById(
      `tab-${tabs[newIndex].id}`
    );

    button?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Example tabs"
        className="flex gap-4 border-b"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(event) =>
              handleKeyDown(event, index)
            }
            className="px-4 py-2 text-gray-900"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab) =>
        activeTab === tab.id ? (
          <div
            key={tab.id}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            className="mt-4 rounded bg-white p-4 text-gray-900"
          >
            {tab.content}
          </div>
        ) : null
      )}
    </div>
  );
}