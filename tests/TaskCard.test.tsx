import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskCard from "../app/components/TaskCard";

describe("TaskCard", () => {
  const task = {
    id: 1,
    title: "Finish FE-09",
    priority: "High",
    completed: false,
  };

  it("renders task information", () => {
    render(
      <TaskCard
        task={task}
        onDelete={vi.fn()}
        onToggle={vi.fn()}
        onEdit={vi.fn()}
      />
    );

    expect(screen.getByText("Finish FE-09")).toBeInTheDocument();
    expect(screen.getByText("High")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /delete/i })
    ).toBeInTheDocument();
  });

  it("calls delete handler when Delete is clicked", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();

    render(
      <TaskCard
        task={task}
        onDelete={onDelete}
        onToggle={vi.fn()}
        onEdit={vi.fn()}
      />
    );

    await user.click(
      screen.getByRole("button", { name: /delete/i })
    );

    expect(onDelete).toHaveBeenCalledWith(1);
  });
});