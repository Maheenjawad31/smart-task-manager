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
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex justify-between items-center">
      <div>
        <h3
          className={`text-lg font-semibold ${
            task.completed
              ? "line-through text-gray-400"
              : "text-gray-900"
          }`}
        >
          {task.title}
        </h3>

        <span
          className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-medium ${
            task.priority === "High"
              ? "bg-red-100 text-red-700"
              : task.priority === "Medium"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {task.priority}
        </span>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => onToggle(task.id)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
        >
          ✓
        </button>

        <button
          onClick={() => onEdit(task)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
