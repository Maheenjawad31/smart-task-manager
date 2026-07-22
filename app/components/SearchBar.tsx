interface SearchBarProps {
    search: string;
    setSearch: (value: string) => void;
  }
  
  export default function SearchBar({
    search,
    setSearch,
  }: SearchBarProps) {
    return (
      <div className="mb-8">
        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-xl px-5 py-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    );
  }