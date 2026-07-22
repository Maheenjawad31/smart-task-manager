interface FilterTabsProps {
    filter: "all" | "active" | "completed";
    setFilter: (value: "all" | "active" | "completed") => void;
  }
  
  export default function FilterTabs({
    filter,
    setFilter,
  }: FilterTabsProps) {
    const buttonClass = (value: string) =>
      `px-4 py-2 rounded-lg font-medium ${
        filter === value
          ? "bg-blue-600 text-white"
          : "bg-white text-gray-700 border"
      }`;
  
    return (
      <div className="flex gap-3 mb-6">
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