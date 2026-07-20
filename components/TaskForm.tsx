export default function TaskForm() {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Add New Task
        </h2>
  
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Title
            </label>
  
            <input
  type="text"
  placeholder="Enter your task..."
  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder:text-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
  
            <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
  
          <button
            type="button"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Add Task
          </button>
        </form>
      </div>
    );
  }