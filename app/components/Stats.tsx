import { Task } from "@/types/task";

interface StatsProps {
  tasks: Task[];
}

export default function Stats({
  tasks,
}: StatsProps) {

  const total = tasks.length;

  const completed = tasks.filter(
    (task) => task.completed
  ).length;

  const pending = total - completed;


  return (
    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">


      <div className="rounded-xl bg-white p-6 text-center shadow-md dark:bg-slate-900">

        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Total Tasks
        </h3>

        <p className="mt-2 text-4xl font-bold text-blue-600">
          {total}
        </p>

      </div>



      <div className="rounded-xl bg-white p-6 text-center shadow-md dark:bg-slate-900">

        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Completed
        </h3>

        <p className="mt-2 text-4xl font-bold text-green-600">
          {completed}
        </p>

      </div>



      <div className="rounded-xl bg-white p-6 text-center shadow-md dark:bg-slate-900">

        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Pending
        </h3>

        <p className="mt-2 text-4xl font-bold text-orange-500">
          {pending}
        </p>

      </div>


    </div>
  );
}