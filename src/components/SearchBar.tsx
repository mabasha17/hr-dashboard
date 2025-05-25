"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEmployeeStore } from "@/store/employeeStore";

export default function SearchBar() {
  const { employees, setFilteredEmployees } = useEmployeeStore();

  const handleSearch = (query: string) => {
    const searchQuery = query.toLowerCase();
    const filtered = employees.filter(
      (employee) =>
        employee.firstName.toLowerCase().includes(searchQuery) ||
        employee.lastName.toLowerCase().includes(searchQuery) ||
        employee.email.toLowerCase().includes(searchQuery) ||
        employee.department.toLowerCase().includes(searchQuery)
    );
    setFilteredEmployees(filtered);
  };

  return (
    <div className="relative flex-1">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-800 dark:border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder="Search employees..."
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}
