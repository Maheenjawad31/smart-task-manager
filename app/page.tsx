export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-10">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl p-10 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Smart Task Manager
        </h1>

        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
          Organize your daily tasks with a simple and efficient workflow.
          Stay productive, track your progress, and manage everything in one place.
        </p>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-300">
          Get Started
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
            <div className="text-4xl mb-3">📋</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Organize
            </h2>
            <p className="text-gray-700">
              Keep all your daily tasks in one clean and organized place.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
            <div className="text-4xl mb-3">✅</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Track
            </h2>
            <p className="text-gray-700">
              Mark tasks as completed and monitor your progress every day.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
            <div className="text-4xl mb-3">🚀</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Achieve
            </h2>
            <p className="text-gray-700">
              Stay focused, complete your goals, and boost your productivity.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}