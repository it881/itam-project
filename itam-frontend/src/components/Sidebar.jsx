function Sidebar({ setPage }) {
  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white p-6">

      <h1 className="text-2xl font-bold mb-10">
        ITAM System
      </h1>

      <div className="space-y-4">

        <button
          onClick={() => setPage("dashboard")}
          className="w-full text-left p-3 rounded-lg hover:bg-slate-700"
        >
          Dashboard
        </button>

        <button
          onClick={() => setPage("assets")}
          className="w-full text-left p-3 rounded-lg hover:bg-slate-700"
        >
          Assets
        </button>

        <button
          onClick={() => setPage("employees")}
          className="w-full text-left p-3 rounded-lg hover:bg-slate-700"
        >
          Employees
        </button>

        <button
          onClick={() => setPage("assignments")}
          className="w-full text-left p-3 rounded-lg hover:bg-slate-700"
        >
          Assignments
        </button>

        <button
          onClick={() => setPage("maintenance")}
          className="w-full text-left p-3 rounded-lg hover:bg-slate-700"
        >
          Maintenance
        </button>

      </div>

    </div>
  );
}

export default Sidebar;