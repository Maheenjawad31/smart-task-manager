import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskForm from "../app/components/TaskForm";

describe("TaskForm", () => {
  beforeEach(() => {
    vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  it("shows alert when task title is empty", async () => {
    const user = userEvent.setup();
    const onAddTask = vi.fn();

    render(<TaskForm onAddTask={onAddTask} />);

    await user.click(
      screen.getByRole("button", {
        name: /add task/i,
      })
    );

    expect(window.alert).toHaveBeenCalledWith(
      "Please enter a task."
    );

    expect(onAddTask).not.toHaveBeenCalled();
  });

  it("calls onAddTask with valid data", async () => {
    const user = userEvent.setup();
    const onAddTask = vi.fn();

    render(<TaskForm onAddTask={onAddTask} />);

    await user.type(
      screen.getByPlaceholderText(/enter your task/i),
      "Finish FE-09"
    );

    await user.selectOptions(
      screen.getByRole("combobox"),
      "High"
    );

    await user.click(
      screen.getByRole("button", {
        name: /add task/i,
      })
    );

    expect(onAddTask).toHaveBeenCalledWith(
      "Finish FE-09",
      "High"
    );
  });
});