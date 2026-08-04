export default async function HealthPage() {
  let apiStatus = "Healthy";
  let data = null;

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1",
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("API failed");
    }

    data = await response.json();

  } catch {
    apiStatus = "Failed";
  }


  return (
    <main className="min-h-screen bg-slate-100 dark:bg-slate-950">

      <div className="mx-auto max-w-6xl px-6 py-10">


        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Health Dashboard
        </h1>


        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Monitor Smart Task Manager services and system status.
        </p>



        <div className="mt-8 grid gap-6 md:grid-cols-3">


          <StatusCard
            title="Application"
            status="Running"
          />


          <StatusCard
            title="API Connection"
            status={apiStatus}
          />


          <StatusCard
            title="AI Planner"
            status="Available"
          />


        </div>




        <div className="mt-8 rounded-xl bg-white p-6 shadow dark:bg-slate-900">


          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            API Response Test
          </h2>



          {data ? (

            <pre className="mt-4 overflow-x-auto rounded-lg bg-gray-100 p-4 text-sm text-gray-800 dark:bg-slate-800 dark:text-gray-200">
              {JSON.stringify(data, null, 2)}
            </pre>

          ) : (

            <div className="mt-4 rounded-lg bg-red-100 p-4 text-red-700 dark:bg-red-950 dark:text-red-300">
              API connection failed.
            </div>

          )}


        </div>



      </div>

    </main>
  );
}




function StatusCard({
  title,
  status,
}: {
  title: string;
  status: string;
}) {

  const healthy =
    status === "Running" ||
    status === "Healthy" ||
    status === "Available";


  return (

    <div className="rounded-xl bg-white p-6 shadow dark:bg-slate-900">

      <p className="text-gray-600 dark:text-gray-400">
        {title}
      </p>


      <div className="mt-3 flex items-center gap-3">

        <span
          className={`h-3 w-3 rounded-full ${
            healthy
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        />


        <p className="text-xl font-bold text-gray-900 dark:text-white">
          {status}
        </p>

      </div>


    </div>

  );
}