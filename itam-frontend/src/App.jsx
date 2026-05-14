import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Assets from "./pages/Assets";

function App() {

  const [page, setPage] = useState(
    "dashboard"
  );

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar setPage={setPage} />

      <div className="flex-1 p-8">

        <Navbar />

        {page === "dashboard" && (
          <Dashboard />
        )}

        {page === "assets" && (
          <Assets />
        )}

      </div>

    </div>
  );
}

export default App;