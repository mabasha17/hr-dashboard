"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useEmployeeStore } from "@/store/employeeStore";

const departments = [
  "Engineering",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
  "Operations",
];
const performanceLevels = [1, 2, 3, 4, 5];

export default function FilterDropdown() {
  const { employees, setFilteredEmployees } = useEmployeeStore();

  const handleFilter = (
    type: "department" | "performance",
    value: string | number
  ) => {
    let filtered = [...employees];

    if (type === "department") {
      filtered = filtered.filter((employee) => employee.department === value);
    } else if (type === "performance") {
      filtered = filtered.filter((employee) => employee.performance === value);
    }

    setFilteredEmployees(filtered);
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        <FunnelIcon className="h-5 w-5 mr-2" />
        Filter
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <div className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200">
              Department
            </div>
            {departments.map((department) => (
              <Menu.Item key={department}>
                {({ active }) => (
                  <button
                    onClick={() => handleFilter("department", department)}
                    className={`${
                      active ? "bg-gray-100 dark:bg-gray-700" : ""
                    } block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                  >
                    {department}
                  </button>
                )}
              </Menu.Item>
            ))}

            <div className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200">
              Performance
            </div>
            {performanceLevels.map((level) => (
              <Menu.Item key={level}>
                {({ active }) => (
                  <button
                    onClick={() => handleFilter("performance", level)}
                    className={`${
                      active ? "bg-gray-100 dark:bg-gray-700" : ""
                    } block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                  >
                    {level} Stars
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
