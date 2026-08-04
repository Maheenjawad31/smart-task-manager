import { Task } from "@/types/task";

interface TaskCardProps {
  task: Task;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onEdit: (task: Task) => void;
}

export default function TaskCard({
  task,
  onDelete,
  onToggle,
  onEdit,
}: TaskCardProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900">


      <div>

        <h3
          className={`text-lg font-semibold ${
            task.completed
              ? "text-gray-400 line-through"
              : "text-gray-900 dark:text-white"
          }`}
        >
          {task.title}
        </h3>


        <span
          className={`mt-3 inline-block rounded-full px-3 py-1 text-sm font-medium ${
            task.priority === "High"
              ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
              : task.priority === "Medium"
              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
              : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
          }`}
        >
          {task.priority}
        </span>

      </div>



      <div className="flex gap-3">


        <button
          onClick={() => onToggle(task.id)}
          className="rounded-lg bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
        >
          ✓
        </button>


        <button
          onClick={() => onEdit(task)}
          className="rounded-lg bg-yellow-500 px-4 py-2 text-white transition hover:bg-yellow-600"
        >
          Edit
        </button>


        <button
          onClick={() => onDelete(task.id)}
          className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
        >
          Delete
        </button>


      </div>


    </div>
  );
}
