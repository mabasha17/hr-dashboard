"use client";

import { useEffect, useState } from "react";
import { useEmployeeStore } from "@/store/employeeStore";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DepartmentStats {
  name: string;
  count: number;
  avgPerformance: number;
}

interface BookmarkTrend {
  date: string;
  count: number;
}

export default function AnalyticsPage() {
  const { employees, fetchEmployees } = useEmployeeStore();
  const [loading, setLoading] = useState(true);
  const [departmentStats, setDepartmentStats] = useState<DepartmentStats[]>([]);
  const [performanceDistribution, setPerformanceDistribution] = useState<
    number[]
  >(Array(5).fill(0));
  const [bookmarkTrends, setBookmarkTrends] = useState<BookmarkTrend[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchEmployees();
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [fetchEmployees]);

  useEffect(() => {
    if (employees.length > 0) {
      // Calculate department statistics
      const deptMap = new Map<
        string,
        { count: number; totalPerformance: number }
      >();
      employees.forEach((employee) => {
        const current = deptMap.get(employee.department) || {
          count: 0,
          totalPerformance: 0,
        };
        deptMap.set(employee.department, {
          count: current.count + 1,
          totalPerformance: current.totalPerformance + employee.performance,
        });
      });

      const stats = Array.from(deptMap.entries()).map(([name, data]) => ({
        name,
        count: data.count,
        avgPerformance: data.totalPerformance / data.count,
      }));

      setDepartmentStats(stats);

      // Calculate performance distribution
      const distribution = Array(5).fill(0);
      employees.forEach((employee) => {
        distribution[employee.performance - 1]++;
      });
      setPerformanceDistribution(distribution);

      // Generate mock bookmark trends data
      const trends: BookmarkTrend[] = [];
      const today = new Date();
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        trends.push({
          date: date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          count: Math.floor(Math.random() * 20) + 5, // Random number between 5 and 25
        });
      }
      setBookmarkTrends(trends);
    }
  }, [employees]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const departmentChartData = {
    labels: departmentStats.map((dept) => dept.name),
    datasets: [
      {
        label: "Average Performance",
        data: departmentStats.map((dept) => dept.avgPerformance),
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 1,
      },
    ],
  };

  const performanceChartData = {
    labels: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
    datasets: [
      {
        label: "Number of Employees",
        data: performanceDistribution,
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 1,
      },
    ],
  };

  const bookmarkTrendData = {
    labels: bookmarkTrends.map((trend) => trend.date),
    datasets: [
      {
        label: "Bookmarked Employees",
        data: bookmarkTrends.map((trend) => trend.count),
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Department Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Department Performance
          </h2>
          <div className="h-[300px]">
            <Bar data={departmentChartData} options={chartOptions} />
          </div>
        </div>

        {/* Performance Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Performance Distribution
          </h2>
          <div className="h-[300px]">
            <Bar data={performanceChartData} options={chartOptions} />
          </div>
        </div>

        {/* Bookmark Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Bookmark Trends (Last 7 Days)
          </h2>
          <div className="h-[300px]">
            <Line data={bookmarkTrendData} options={chartOptions} />
          </div>
        </div>

        {/* Department Statistics Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Department Statistics
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Employees
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Average Performance
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {departmentStats.map((dept) => (
                  <tr key={dept.name}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {dept.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {dept.count}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {dept.avgPerformance.toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
