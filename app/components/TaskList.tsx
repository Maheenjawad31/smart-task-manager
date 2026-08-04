import { Task } from "@/types/task";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onEdit: (task: Task) => void;
}

export default function TaskList({
  tasks,
  onDelete,
  onToggle,
  onEdit,
}: TaskListProps) {

  if (tasks.length === 0) {
    return (
      <div className="rounded-xl bg-white p-10 text-center shadow-md dark:bg-slate-900">

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          No tasks yet
        </h2>

        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Add your first task to start managing your productivity.
        </p>

      </div>
    );
  }


  return (
    <div className="space-y-4">

      {tasks.map((task) => (

        <TaskCard
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
        />

      ))}

    </div>
  );
}