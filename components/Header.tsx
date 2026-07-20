export default function Header() {
    return (
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Smart Task Manager
            </h1>
            <p className="text-gray-600 mt-1">
              Stay organized and boost your productivity.
            </p>
          </div>
  
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg transition">
            + Add Task
          </button>
        </div>
      </header>
    );
  }