"use client";

import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";
import { useEmployeeStore } from "@/store/employeeStore";
import Link from "next/link";

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  department: string;
  performance: number;
}

interface EmployeeCardProps {
  employee: Employee;
}

export default function EmployeeCard({ employee }: EmployeeCardProps) {
  const { toggleBookmark, isBookmarked } = useEmployeeStore();

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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {employee.firstName} {employee.lastName}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {employee.email}
          </p>
        </div>
        <button
          onClick={() => toggleBookmark(employee.id)}
          className={`p-2 rounded-full ${
            isBookmarked(employee.id)
              ? "text-yellow-400"
              : "text-gray-400 hover:text-yellow-400"
          }`}
        >
          <StarIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Age: {employee.age}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Department: {employee.department}
        </p>
        <div className="flex items-center gap-1">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Performance:
          </span>
          <div className="flex">{renderStars(employee.performance)}</div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <Link
          href={`/employee/${employee.id}`}
          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md text-center hover:bg-blue-600 transition-colors"
        >
          View
        </Link>
        <button
          onClick={() => {
            /* Implement promote logic */
          }}
          className="flex-1 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Promote
        </button>
      </div>
    </div>
  );
}
