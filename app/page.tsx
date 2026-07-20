import Header from "@/components/Header";
import TaskForm from "@/components/TaskForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Header />

      <div className="max-w-6xl mx-auto px-6 py-10">
  <TaskForm />

  <div className="bg-white rounded-xl shadow-md p-12 text-center">
    <h2 className="text-2xl font-semibold text-gray-800">
      No tasks yet
    </h2>

          <p className="text-gray-600 mt-3">
            Click the "Add Task" button to create your first task.
          </p>
        </div>
      </div>
    </main>
  );
}
          