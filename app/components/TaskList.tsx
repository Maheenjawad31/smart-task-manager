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
      <div className="bg-white rounded-xl shadow-md p-10 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          No tasks yet
        </h2>

        <p className="text-gray-600 mt-3">
          Add your first task.
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