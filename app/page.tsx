"use client";

import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

import Header from "@/app/components/header";
import TaskForm from "@/app/components/TaskForm";
import TaskList from "@/app/components/TaskList";
import Stats from "@/app/components/Stats";
import SearchBar from "@/app/components/SearchBar";
import FilterTabs from "@/app/components/FilterTabs";

import { Task } from "@/types/task";

export default function Home() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const addTask = (
    title: string,
    priority: "High" | "Medium" | "Low"
  ) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      priority,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const editTask = (task: Task) => {
    const newTitle = prompt("Edit task", task.title);

    if (!newTitle || !newTitle.trim()) return;

    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id
          ? { ...t, title: newTitle.trim() }
          : t
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all"
        ? true
        : filter === "active"
        ? !task.completed
        : task.completed;

    return matchesSearch && matchesFilter;
  });

  return (
    <main className="min-h-screen bg-slate-100">
      <Header />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <TaskForm onAddTask={addTask} />

        <Stats tasks={tasks} />

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <FilterTabs
          filter={filter}
          setFilter={setFilter}
        />

        <TaskList
          tasks={filteredTasks}
          onDelete={deleteTask}
          onToggle={toggleTask}
          onEdit={editTask}
        />
      </div>
    </main>
  );
}