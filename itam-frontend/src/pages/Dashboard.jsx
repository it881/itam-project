import { useEffect, useState } from "react";
import Assets from "./Assets";
import Employees from "./Employees";
import Assignments from "./Assignments";

function Dashboard() {
  const [page, setPage] = useState("dashboard");

  const [stats, setStats] = useState({
    totalAssets: 0,
    totalEmployees: 0,
    totalAssignments: 0,
  });

  const fetchStats = async () => {
    const res = await fetch(
      "https://https://https://itam-backend-jgzp.onrender.com//api/dashboard-stats"
    );

    const data = await res.json();

    setStats(data);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Page Navigation
  if (page === "assets") {
    return <Assets />;
  }

  if (page === "employees") {
    return <Employees />;
  }

  if (page === "assignments") {
    return <Assignments />;
  }

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-5">

        <h1 className="text-2xl font-bold mb-10">
          ITAM System
        </h1>

        <button
          className="block w-full text-left mb-4 p-3 rounded-lg hover:bg-gray-700"
          onClick={() => setPage("dashboard")}
        >
          Dashboard
        </button>

        <button
          className="block w-full text-left mb-4 p-3 rounded-lg hover:bg-gray-700"
          onClick={() => setPage("assets")}
        >
          Assets
        </button>

        <button
          className="block w-full text-left mb-4 p-3 rounded-lg hover:bg-gray-700"
          onClick={() => setPage("employees")}
        >
          Employees
        </button>

        <button
          className="block w-full text-left mb-4 p-3 rounded-lg hover:bg-gray-700"
          onClick={() => setPage("assignments")}
        >
          Assignments
        </button>

      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8">

        <h1 className="text-3xl font-bold mb-8">
          Dashboard Overview
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold">
              Total Assets
            </h2>

            <p className="text-4xl font-bold mt-4 text-blue-600">
              {stats.totalAssets}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold">
              Employees
            </h2>

            <p className="text-4xl font-bold mt-4 text-green-600">
              {stats.totalEmployees}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold">
              Assignments
            </h2>

            <p className="text-4xl font-bold mt-4 text-purple-600">
              {stats.totalAssignments}
            </p>
          </div>

        </div>

        {/* Welcome Section */}
        <div className="bg-white rounded-2xl shadow p-6 mt-10">

          <h2 className="text-2xl font-bold mb-4">
            Welcome to IT Asset Management System
          </h2>

          <p className="text-gray-600">
            Manage assets, employees, assignments,
            maintenance tracking, and audit logs from one place.
          </p>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;