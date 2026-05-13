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
      "https://YOUR-RENDER-URL.onrender.com/api/dashboard-stats"
    );

    const data = await res.json();
    setStats(data);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (page === "assets") return <Assets />;
  if (page === "employees") return <Employees />;
  if (page === "assignments") return <Assignments />;

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-5">

        <h1 className="text-2xl font-bold mb-8">
          ITAM System
        </h1>

        <button
          className="block w-full text-left mb-4 hover:text-blue-400"
          onClick={() => setPage("dashboard")}
        >
          Dashboard
        </button>

        <button
          className="block w-full text-left mb-4 hover:text-blue-400"
          onClick={() => setPage("assets")}
        >
          Assets
        </button>

        <button
          className="block w-full text-left mb-4 hover:text-blue-400"
          onClick={() => setPage("employees")}
        >
          Employees
        </button>

        <button
          className="block w-full text-left mb-4 hover:text-blue-400"
          onClick={() => setPage("assignments")}
        >
          Assignments
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100">

        <h1 className="text-3xl font-bold mb-8">
          Dashboard Overview
        </h1>

        <div className="grid grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold">
              Total Assets
            </h2>

            <p className="text-3xl mt-4">
              {stats.totalAssets}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold">
              Employees
            </h2>

            <p className="text-3xl mt-4">
              {stats.totalEmployees}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold">
              Assignments
            </h2>

            <p className="text-3xl mt-4">
              {stats.totalAssignments}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;