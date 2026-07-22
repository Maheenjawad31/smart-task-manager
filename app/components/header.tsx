export default function Header() {
  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900">
            Smart Task Manager
          </h1>

          <p className="mt-2 text-gray-600 text-lg">
            Organize your daily work with React, Next.js & TypeScript.
          </p>
        </div>

      
      </div>
    </header>
  );
}