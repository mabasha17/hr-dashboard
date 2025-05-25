"use client";

import { useEffect, useState } from "react";
import { useEmployeeStore } from "@/store/employeeStore";
import LoadingSpinner from "@/components/LoadingSpinner";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import { BriefcaseIcon } from "@heroicons/react/24/outline";

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  department: string;
  performance: number;
}

export default function BookmarksPage() {
  const {
    employees,
    bookmarks,
    fetchEmployees,
    toggleBookmark,
    promoteEmployee,
  } = useEmployeeStore();
  const [loading, setLoading] = useState(true);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        await fetchEmployees();
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, [fetchEmployees]);

  const handlePromote = (employee: Employee) => {
    promoteEmployee(employee.id);
  };

  const handleAssignProject = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowProjectModal(true);
  };

  const handleRemoveBookmark = (employeeId: number) => {
    toggleBookmark(employeeId);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const bookmarkedEmployees = employees.filter((employee) =>
    bookmarks.includes(employee.id)
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <span key={index}>
        {index < rating ? (
          <StarIcon className="h-5 w-5 text-yellow-400" />
        ) : (
          <StarOutlineIcon className="h-5 w-5 text-gray-300" />
        )}
      </span>
    ));
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Bookmarked Employees
      </h1>
      {bookmarkedEmployees.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No bookmarked employees found
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedEmployees.map((employee) => (
            <div
              key={employee.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {employee.firstName} {employee.lastName}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {employee.email}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveBookmark(employee.id)}
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  <BookmarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Department:</span>{" "}
                  {employee.department}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Age:</span> {employee.age} years
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 dark:text-gray-300">
                    Performance:
                  </span>
                  <div className="flex">
                    {renderStars(employee.performance)}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePromote(employee)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  <StarIcon className="h-5 w-5" />
                  Promote
                </button>
                <button
                  onClick={() => handleAssignProject(employee)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  <BriefcaseIcon className="h-5 w-5" />
                  Assign Project
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Project Assignment Modal */}
      {showProjectModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Assign Project to {selectedEmployee.firstName}{" "}
              {selectedEmployee.lastName}
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="projectName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Project Name
                </label>
                <input
                  type="text"
                  id="projectName"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter project name"
                />
              </div>
              <div>
                <label
                  htmlFor="projectDescription"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="projectDescription"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter project description"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowProjectModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle project assignment
                    setShowProjectModal(false);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  Assign
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
