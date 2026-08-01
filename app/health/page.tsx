export default async function HealthPage() {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1",
      {
        cache: "no-store",
      }
    );
  
    const data = await response.json();
  
    return (
      <main className="min-h-screen bg-slate-100">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <h1 className="text-3xl font-bold text-gray-900">Health Check</h1>
  
          <p className="mt-2 text-gray-600">
            This page fetches data from the JSONPlaceholder public API.
          </p>
  
          <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              API Response
            </h2>
  
            <pre className="mt-4 overflow-x-auto rounded bg-gray-100 p-4 text-sm text-gray-800">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
      </main>
    );
  }