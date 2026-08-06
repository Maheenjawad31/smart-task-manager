import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ToolResultCard from "../app/components/ToolResultCard";

describe("ToolResultCard", () => {
  it("renders all task statistics", () => {
    render(
      <ToolResultCard
        totalTasks={10}
        completedTasks={6}
        pendingTasks={4}
        highPriority={2}
        suggestion="Finish high priority tasks first."
      />
    );
    expect(
        screen.getByRole("heading", {
          name: /productivity analysis/i,
        })
      ).toBeInTheDocument();

    expect(screen.getByText("Total Tasks")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(screen.getByText("High Priority")).toBeInTheDocument();

    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("renders the AI suggestion", () => {
    render(
      <ToolResultCard
        totalTasks={5}
        completedTasks={2}
        pendingTasks={3}
        highPriority={1}
        suggestion="Focus on completing pending tasks."
      />
    );

    expect(screen.getByText("AI Suggestion")).toBeInTheDocument();

    expect(
      screen.getByText("Focus on completing pending tasks.")
    ).toBeInTheDocument();
  });
});