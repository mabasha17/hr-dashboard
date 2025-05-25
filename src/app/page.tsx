import EmployeeList from "@/components/EmployeeList";
import SearchBar from "@/components/SearchBar";
import FilterDropdown from "@/components/FilterDropdown";

export default function Home() {
  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "oklch(21% .034 264.665)" }}
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-white">HR Dashboard</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <SearchBar />
          <FilterDropdown />
        </div>

        <EmployeeList />
      </div>
    </main>
  );
}
