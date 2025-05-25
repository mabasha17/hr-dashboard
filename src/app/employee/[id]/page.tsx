"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Tab } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";
import { useEmployeeStore } from "@/store/employeeStore";
import LoadingSpinner from "@/components/LoadingSpinner";

interface EmployeeDetails extends Employee {
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phone: string;
  bio: string;
  performanceHistory: {
    date: string;
    rating: number;
    comment: string;
  }[];
  projects: {
    id: number;
    name: string;
    status: "completed" | "in-progress" | "planned";
    startDate: string;
    endDate?: string;
    description: string;
  }[];
  feedback: {
    id: number;
    date: string;
    from: string;
    role: string;
    comment: string;
    rating: number;
  }[];
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function getPerformanceColor(rating: number) {
  if (rating >= 4)
    return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
  if (rating >= 3)
    return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
  if (rating >= 2)
    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
  return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
}

export default function EmployeeDetails() {
  const params = useParams();
  const { employees } = useEmployeeStore();
  const [employee, setEmployee] = useState<EmployeeDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEmployeeDetails = async () => {
      try {
        const foundEmployee = employees.find(
          (emp) => emp.id === Number(params.id)
        );
        if (foundEmployee) {
          // Mock additional data
          const mockDetails: EmployeeDetails = {
            ...foundEmployee,
            address: {
              street: "123 Main St",
              city: "New York",
              state: "NY",
              zipCode: "10001",
            },
            phone: "+1 (555) 123-4567",
            bio: "Experienced professional with a strong background in software development and team leadership. Passionate about creating efficient solutions and mentoring junior developers.",
            performanceHistory: [
              {
                date: "2024-01",
                rating: 4,
                comment: "Excellent performance in Q1",
              },
              {
                date: "2023-12",
                rating: 5,
                comment: "Outstanding contribution to the project",
              },
              {
                date: "2023-09",
                rating: 4,
                comment: "Great work on the new features",
              },
            ],
            projects: [
              {
                id: 1,
                name: "E-commerce Platform",
                status: "completed",
                startDate: "2023-06",
                endDate: "2023-12",
                description: "Led the development of a new e-commerce platform",
              },
              {
                id: 2,
                name: "Mobile App Redesign",
                status: "in-progress",
                startDate: "2024-01",
                description:
                  "Overseeing the redesign of the company's mobile application",
              },
              {
                id: 3,
                name: "AI Integration",
                status: "planned",
                startDate: "2024-04",
                description:
                  "Planning the integration of AI features into existing products",
              },
            ],
            feedback: [
              {
                id: 1,
                date: "2024-02-15",
                from: "John Smith",
                role: "Project Manager",
                comment: "Excellent leadership skills and technical expertise",
                rating: 5,
              },
              {
                id: 2,
                date: "2024-01-20",
                from: "Sarah Johnson",
                role: "Team Lead",
                comment: "Great communication and problem-solving abilities",
                rating: 4,
              },
            ],
          };
          setEmployee(mockDetails);
        }
      } catch (error) {
        console.error("Error loading employee details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEmployeeDetails();
  }, [params.id, employees]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!employee) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Employee not found</p>
      </div>
    );
  }

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
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {employee.firstName} {employee.lastName}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">{employee.email}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Performance:
              </span>
              <div className="flex">{renderStars(employee.performance)}</div>
              <span
                className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getPerformanceColor(
                  employee.performance
                )}`}
              >
                {employee.performance} Stars
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Contact Information
            </h2>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Phone:</span> {employee.phone}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Address:</span>{" "}
                {`${employee.address.street}, ${employee.address.city}, ${employee.address.state} ${employee.address.zipCode}`}
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Department & Age
            </h2>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Department:</span>{" "}
                {employee.department}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Age:</span> {employee.age} years
              </p>
            </div>
          </div>
        </div>
      </div>

      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow text-blue-700"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            Overview
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow text-blue-700"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            Projects
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow text-blue-700"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            Feedback
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-6">
          <Tab.Panel className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Overview
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Bio
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {employee.bio}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Performance History
                </h4>
                <div className="space-y-4">
                  {employee.performanceHistory.map((record, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-gray-600 dark:text-gray-300">
                            {record.comment}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {record.date}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <div className="flex mr-2">
                            {renderStars(record.rating)}
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getPerformanceColor(
                              record.rating
                            )}`}
                          >
                            {record.rating} Stars
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Projects
            </h3>
            <div className="space-y-6">
              {employee.projects.map((project) => (
                <div
                  key={project.id}
                  className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {project.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {project.startDate} - {project.endDate || "Present"}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">
                        {project.description}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === "completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : project.status === "in-progress"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}
                    >
                      {project.status.charAt(0).toUpperCase() +
                        project.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Tab.Panel>
          <Tab.Panel className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Feedback
            </h3>
            <div className="space-y-6">
              {employee.feedback.map((item) => (
                <div
                  key={item.id}
                  className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-600 dark:text-gray-300">
                        {item.comment}
                      </p>
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.from}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.role} • {item.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex mr-2">
                        {renderStars(item.rating)}
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getPerformanceColor(
                          item.rating
                        )}`}
                      >
                        {item.rating} Stars
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
