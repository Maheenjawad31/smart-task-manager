import { Task } from "@/types/task";

interface StatsProps {
  tasks: Task[];
}

export default function Stats({ tasks }: StatsProps) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white rounded-xl shadow-md p-6 text-center">
        <h3 className="text-gray-500 text-sm font-medium">Total Tasks</h3>
        <p className="text-4xl font-bold text-blue-600 mt-2">{total}</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 text-center">
        <h3 className="text-gray-500 text-sm font-medium">Completed</h3>
        <p className="text-4xl font-bold text-green-600 mt-2">{completed}</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 text-center">
        <h3 className="text-gray-500 text-sm font-medium">Pending</h3>
        <p className="text-4xl font-bold text-orange-500 mt-2">{pending}</p>
      </div>
    </div>
  );
}