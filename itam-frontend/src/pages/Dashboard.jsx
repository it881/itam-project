import { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import Assets from "./Assets";
import Employees from "./Employees";
import Assignments from "./Assignments";
import Maintenance from "./Maintenance";

function Dashboard() {

  const [page, setPage] =
    useState("dashboard");

  const [assets, setAssets] =
    useState([]);

  const [employees, setEmployees] =
    useState([]);

  const [assignments, setAssignments] =
    useState([]);

  const [maintenance, setMaintenance] =
    useState([]);

  // FETCH DATA
  const fetchData = async () => {

    try {

      const assetsRes = await fetch(
        "https://itam-backend-jgzp.onrender.com/api/assets"
      );

      const employeesRes = await fetch(
        "https://itam-backend-jgzp.onrender.com/api/employees"
      );

      const assignmentsRes = await fetch(
        "https://itam-backend-jgzp.onrender.com/api/assignments"
      );

      const maintenanceRes = await fetch(
        "https://itam-backend-jgzp.onrender.com/api/maintenance"
      );

      const assetsData =
        await assetsRes.json();

      const employeesData =
        await employeesRes.json();

      const assignmentsData =
        await assignmentsRes.json();

      const maintenanceData =
        await maintenanceRes.json();

      setAssets(assetsData);
      setEmployees(employeesData);
      setAssignments(assignmentsData);
      setMaintenance(maintenanceData);

    } catch (error) {

      console.error(error);

    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // PAGE NAVIGATION

  if (page === "assets") {
    return <Assets />;
  }

  if (page === "employees") {
    return <Employees />;
  }

  if (page === "assignments") {
    return <Assignments />;
  }

  if (page === "maintenance") {
    return <Maintenance />;
  }

  // PIE CHART DATA

  const assetTypeData = [];

  const typeCount = {};

  assets.forEach((asset) => {

    if (typeCount[asset.type]) {

      typeCount[asset.type]++;

    } else {

      typeCount[asset.type] = 1;
    }
  });

  for (let key in typeCount) {

    assetTypeData.push({
      name: key,
      value: typeCount[key],
    });
  }

  // BAR CHART DATA

  const maintenanceDataChart = [];

  const statusCount = {};

  maintenance.forEach((item) => {

    if (statusCount[item.status]) {

      statusCount[item.status]++;

    } else {

      statusCount[item.status] = 1;
    }
  });

  for (let key in statusCount) {

    maintenanceDataChart.push({
      name: key,
      value: statusCount[key],
    });
  }

  return (

    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}

      <div className="w-72 bg-slate-900 text-white p-6 shadow-2xl">

        {/* COMPANY BRAND */}

        <div className="mb-10 text-center">

          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
            alt="Company"
            className="rounded-2xl mb-4 h-36 w-full object-cover"
          />

          <h1 className="text-3xl font-bold text-blue-400">
            Promea Therapeutics
          </h1>

          <p className="text-gray-400 mt-2 text-sm">
            IT Asset Management Portal
          </p>

        </div>

        {/* NAVIGATION */}

        <div className="space-y-3">

          <button
            className="block w-full text-left p-4 rounded-xl bg-slate-800 hover:bg-blue-600 transition duration-300"
            onClick={() =>
              setPage("dashboard")
            }
          >
            📊 Dashboard
          </button>

          <button
            className="block w-full text-left p-4 rounded-xl bg-slate-800 hover:bg-blue-600 transition duration-300"
            onClick={() =>
              setPage("assets")
            }
          >
            💻 Assets
          </button>

          <button
            className="block w-full text-left p-4 rounded-xl bg-slate-800 hover:bg-blue-600 transition duration-300"
            onClick={() =>
              setPage("employees")
            }
          >
            👨‍💼 Employees
          </button>

          <button
            className="block w-full text-left p-4 rounded-xl bg-slate-800 hover:bg-blue-600 transition duration-300"
            onClick={() =>
              setPage("assignments")
            }
          >
            🔄 Assignments
          </button>

          <button
            className="block w-full text-left p-4 rounded-xl bg-slate-800 hover:bg-blue-600 transition duration-300"
            onClick={() =>
              setPage("maintenance")
            }
          >
            🛠 Maintenance
          </button>

        </div>

      </div>

      {/* MAIN CONTENT */}

      <div className="flex-1 p-8 overflow-auto">

        {/* TOP BAR */}

        <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center mb-8">

          <div>

            <h1 className="text-4xl font-bold text-gray-800">
              Dashboard Analytics
            </h1>

            <p className="text-gray-500 mt-2">
              Welcome to Promea Therapeutics IT Portal
            </p>

          </div>

          <div className="flex items-center gap-4">

            <div className="text-right">

              <h2 className="font-bold">
                Admin User
              </h2>

              <p className="text-gray-500 text-sm">
                IT Department
              </p>

            </div>

            <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
              A
            </div>

          </div>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-4 gap-6 mb-10">

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-2xl hover:-translate-y-1 transition duration-300">

            <h2 className="text-gray-500">
              Total Assets
            </h2>

            <p className="text-5xl font-bold mt-4 text-blue-600">
              {assets.length}
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-2xl hover:-translate-y-1 transition duration-300">

            <h2 className="text-gray-500">
              Employees
            </h2>

            <p className="text-5xl font-bold mt-4 text-green-600">
              {employees.length}
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-2xl hover:-translate-y-1 transition duration-300">

            <h2 className="text-gray-500">
              Assignments
            </h2>

            <p className="text-5xl font-bold mt-4 text-orange-500">
              {assignments.length}
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-2xl hover:-translate-y-1 transition duration-300">

            <h2 className="text-gray-500">
              Maintenance
            </h2>

            <p className="text-5xl font-bold mt-4 text-red-500">
              {maintenance.length}
            </p>

          </div>

        </div>

        {/* CHARTS */}

        <div className="grid grid-cols-2 gap-8 mb-10">

          {/* PIE CHART */}

          <div className="bg-white p-6 rounded-2xl shadow">

            <h2 className="text-2xl font-semibold mb-6">
              Asset Types
            </h2>

            <ResponsiveContainer
              width="100%"
              height={320}
            >

              <PieChart>

                <Pie
                  data={assetTypeData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  label
                >

                  {assetTypeData.map(
                    (entry, index) => (
                      <Cell key={index} />
                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

          {/* BAR CHART */}

          <div className="bg-white p-6 rounded-2xl shadow">

            <h2 className="text-2xl font-semibold mb-6">
              Maintenance Status
            </h2>

            <ResponsiveContainer
              width="100%"
              height={320}
            >

              <BarChart
                data={maintenanceDataChart}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="value" />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* RECENT ACTIVITY */}

        <div className="bg-white p-8 rounded-2xl shadow">

          <h2 className="text-2xl font-bold mb-6">
            Recent Activities
          </h2>

          <div className="space-y-4">

            <div className="bg-gray-100 p-4 rounded-xl hover:bg-gray-200 transition">
              💻 Laptop assigned to employee
            </div>

            <div className="bg-gray-100 p-4 rounded-xl hover:bg-gray-200 transition">
              🛠 Printer maintenance completed
            </div>

            <div className="bg-gray-100 p-4 rounded-xl hover:bg-gray-200 transition">
              🖥 New desktop added to inventory
            </div>

            <div className="bg-gray-100 p-4 rounded-xl hover:bg-gray-200 transition">
              🔄 Asset reassigned to IT department
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;