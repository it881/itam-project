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

  // CHART DATA

  // Asset Types
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

  // Maintenance Status
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
      <div className="w-64 bg-gray-900 text-white p-6">

        <h1 className="text-3xl font-bold mb-10">
          ITAM System
        </h1>

        <button
          className="block w-full text-left p-3 rounded-lg mb-3 hover:bg-gray-700"
          onClick={() =>
            setPage("dashboard")
          }
        >
          Dashboard
        </button>

        <button
          className="block w-full text-left p-3 rounded-lg mb-3 hover:bg-gray-700"
          onClick={() =>
            setPage("assets")
          }
        >
          Assets
        </button>

        <button
          className="block w-full text-left p-3 rounded-lg mb-3 hover:bg-gray-700"
          onClick={() =>
            setPage("employees")
          }
        >
          Employees
        </button>

        <button
          className="block w-full text-left p-3 rounded-lg mb-3 hover:bg-gray-700"
          onClick={() =>
            setPage("assignments")
          }
        >
          Assignments
        </button>

        <button
          className="block w-full text-left p-3 rounded-lg mb-3 hover:bg-gray-700"
          onClick={() =>
            setPage("maintenance")
          }
        >
          Maintenance
        </button>

      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-8">
          Dashboard Analytics
        </h1>

        {/* STATS CARDS */}
        <div className="grid grid-cols-4 gap-6 mb-10">

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-gray-500">
              Total Assets
            </h2>

            <p className="text-4xl font-bold mt-3">
              {assets.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-gray-500">
              Employees
            </h2>

            <p className="text-4xl font-bold mt-3">
              {employees.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-gray-500">
              Assignments
            </h2>

            <p className="text-4xl font-bold mt-3">
              {assignments.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-gray-500">
              Maintenance
            </h2>

            <p className="text-4xl font-bold mt-3">
              {maintenance.length}
            </p>
          </div>

        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-2 gap-8">

          {/* ASSET TYPES */}
          <div className="bg-white p-6 rounded-2xl shadow">

            <h2 className="text-2xl font-semibold mb-6">
              Asset Types
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <PieChart>

                <Pie
                  data={assetTypeData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >

                  {assetTypeData.map(
                    (entry, index) => (
                      <Cell
                        key={index}
                      />
                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

          {/* MAINTENANCE STATUS */}
          <div className="bg-white p-6 rounded-2xl shadow">

            <h2 className="text-2xl font-semibold mb-6">
              Maintenance Status
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
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

      </div>

    </div>
  );
}

export default Dashboard;