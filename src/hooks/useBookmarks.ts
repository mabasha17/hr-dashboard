import { useCallback, useEffect, useState } from "react";
import { useEmployeeStore } from "@/store/employeeStore";

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  department: string;
  performance: number;
}

export function useBookmarks() {
  const { employees, bookmarks, toggleBookmark } = useEmployeeStore();
  const [bookmarkedEmployees, setBookmarkedEmployees] = useState<Employee[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const filteredEmployees = employees.filter((employee) =>
      bookmarks.includes(employee.id)
    );
    setBookmarkedEmployees(filteredEmployees);
    setIsLoading(false);
  }, [employees, bookmarks]);

  const addBookmark = useCallback(
    (employeeId: number) => {
      toggleBookmark(employeeId);
    },
    [toggleBookmark]
  );

  const removeBookmark = useCallback(
    (employeeId: number) => {
      toggleBookmark(employeeId);
    },
    [toggleBookmark]
  );

  const isBookmarked = useCallback(
    (employeeId: number) => {
      return bookmarks.includes(employeeId);
    },
    [bookmarks]
  );

  return {
    bookmarkedEmployees,
    isLoading,
    addBookmark,
    removeBookmark,
    isBookmarked,
  };
}
