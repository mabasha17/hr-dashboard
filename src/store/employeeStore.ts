import { create } from "zustand";

interface ApiUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  department: string;
  performance: number;
}

interface EmployeeStore {
  employees: Employee[];
  filteredEmployees: Employee[];
  bookmarks: number[];
  error: string | null;
  loading: boolean;
  fetchEmployees: () => Promise<void>;
  toggleBookmark: (id: number) => void;
  isBookmarked: (id: number) => boolean;
  setFilteredEmployees: (employees: Employee[]) => void;
  promoteEmployee: (id: number) => void;
  clearError: () => void;
}

const departments = [
  "Engineering",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
  "Operations",
];

export const useEmployeeStore = create<EmployeeStore>((set, get) => ({
  employees: [],
  filteredEmployees: [],
  bookmarks: [],
  error: null,
  loading: false,

  fetchEmployees: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("https://dummyjson.com/users?limit=20");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      const employees = data.users.map((user: ApiUser) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        age: user.age,
        department: departments[Math.floor(Math.random() * departments.length)],
        performance: Math.floor(Math.random() * 5) + 1,
      }));

      set({ employees, filteredEmployees: employees, loading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch employees",
        loading: false,
      });
    }
  },

  toggleBookmark: (id: number) => {
    const { bookmarks } = get();
    const newBookmarks = bookmarks.includes(id)
      ? bookmarks.filter((bookmarkId) => bookmarkId !== id)
      : [...bookmarks, id];
    set({ bookmarks: newBookmarks });
  },

  isBookmarked: (id: number) => {
    return get().bookmarks.includes(id);
  },

  setFilteredEmployees: (employees: Employee[]) => {
    set({ filteredEmployees: employees });
  },

  promoteEmployee: (id: number) => {
    const { employees, filteredEmployees } = get();
    const updatedEmployees = employees.map((employee) =>
      employee.id === id
        ? { ...employee, performance: Math.min(employee.performance + 1, 5) }
        : employee
    );
    const updatedFilteredEmployees = filteredEmployees.map((employee) =>
      employee.id === id
        ? { ...employee, performance: Math.min(employee.performance + 1, 5) }
        : employee
    );
    set({
      employees: updatedEmployees,
      filteredEmployees: updatedFilteredEmployees,
    });
  },

  clearError: () => set({ error: null }),
}));
