interface FilterTabsProps {
  filter: "all" | "active" | "completed";
  setFilter: (
    value: "all" | "active" | "completed"
  ) => void;
}

export default function FilterTabs({
  filter,
  setFilter,
}: FilterTabsProps) {

  const buttonClass = (
    value: "all" | "active" | "completed"
  ) =>
    `rounded-lg px-4 py-2 font-medium transition ${
      filter === value
        ? "bg-blue-600 text-white"
        : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 dark:border-slate-700 dark:bg-slate-900 dark:text-gray-300 dark:hover:bg-slate-800"
    }`;


  return (
    <div className="mb-6 flex gap-3">

      <button
        onClick={() => setFilter("all")}
        className={buttonClass("all")}
      >
        All
      </button>


      <button
        onClick={() => setFilter("active")}
        className={buttonClass("active")}
      >
        Active
      </button>


      <button
        onClick={() => setFilter("completed")}
        className={buttonClass("completed")}
      >
        Completed
      </button>


    </div>
  );
}