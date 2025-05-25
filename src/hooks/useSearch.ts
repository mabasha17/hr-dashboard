import { useCallback, useState, useMemo } from "react";
import { useEmployeeStore } from "@/store/employeeStore";

interface SearchFilters {
  department?: string;
  minPerformance?: number;
  maxPerformance?: number;
  minAge?: number;
  maxAge?: number;
}

export function useSearch() {
  const { employees } = useEmployeeStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({});

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      // Search query filter
      const matchesSearch =
        searchQuery === "" ||
        employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchQuery.toLowerCase());

      // Department filter
      const matchesDepartment =
        !filters.department || employee.department === filters.department;

      // Performance filter
      const matchesPerformance =
        (!filters.minPerformance ||
          employee.performance >= filters.minPerformance) &&
        (!filters.maxPerformance ||
          employee.performance <= filters.maxPerformance);

      // Age filter
      const matchesAge =
        (!filters.minAge || employee.age >= filters.minAge) &&
        (!filters.maxAge || employee.age <= filters.maxAge);

      return (
        matchesSearch && matchesDepartment && matchesPerformance && matchesAge
      );
    });
  }, [employees, searchQuery, filters]);

  const setSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const setFilter = useCallback((newFilters: Partial<SearchFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
    setSearchQuery("");
  }, []);

  const departments = useMemo(() => {
    return Array.from(new Set(employees.map((emp) => emp.department)));
  }, [employees]);

  return {
    searchQuery,
    filters,
    filteredEmployees,
    departments,
    setSearch,
    setFilter,
    clearFilters,
  };
}
