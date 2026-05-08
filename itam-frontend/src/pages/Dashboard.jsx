import { useState } from "react";
import Assets from "./Assets";
import Employees from "./Employees";
import Assignments from "./Assignments";

function Dashboard() {
  const [page, setPage] = useState("dashboard");

  if (page === "assets") return <Assets />;
  if (page === "employees") return <Employees />;
  if (page === "assignments") return <Assignments />;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <button onClick={() => setPage("assets")}>Assets</button>
      <button onClick={() => setPage("employees")}>Employees</button>
      <button onClick={() => setPage("assignments")}>Assignments</button>

      <h3 style={{ marginTop: "20px" }}>Overview</h3>
      <p>Total Assets: 0</p>
      <p>Total Employees: 0</p>
    </div>
  );
}

export default Dashboard;