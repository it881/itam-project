import { useEffect, useState } from "react";

function Employees() {
  const [employees, setEmployees] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  const fetchEmployees = async () => {
    const res = await fetch(
      "https://itam-backend-jgzp.onrender.com/api/employees"
    );

    const data = await res.json();

    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // ADD or UPDATE
  const handleSaveEmployee = async () => {
    if (
      !name ||
      !email ||
      !department ||
      !designation
    ) {
      alert("Fill all fields");
      return;
    }

    if (editingId) {
      // UPDATE
      await fetch(
        `https://itam-backend-jgzp.onrender.com/api/employees/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            department,
            designation,
          }),
        }
      );

      setEditingId(null);

    } else {
      // CREATE
      await fetch(
        "https://itam-backend-jgzp.onrender.com/api/employees",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            department,
            designation,
          }),
        }
      );
    }

    setName("");
    setEmail("");
    setDepartment("");
    setDesignation("");

    fetchEmployees();
  };

  // DELETE
  const handleDelete = async (id) => {
    await fetch(
      `https://itam-backend-jgzp.onrender.com/api/employees/${id}`,
      {
        method: "DELETE",
      }
    );

    fetchEmployees();
  };

  // EDIT
  const handleEdit = (employee) => {
    setName(employee.name);
    setEmail(employee.email);
    setDepartment(employee.department);
    setDesignation(employee.designation);

    setEditingId(employee.id);
  };

  // SEARCH
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Employee Management
        </h1>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8">

          <div className="grid grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Employee Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="border p-3 rounded-lg"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              placeholder="Department"
              value={department}
              onChange={(e) =>
                setDepartment(e.target.value)
              }
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              placeholder="Designation"
              value={designation}
              onChange={(e) =>
                setDesignation(e.target.value)
              }
              className="border p-3 rounded-lg"
            />

          </div>

          <button
            onClick={handleSaveEmployee}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            {editingId
              ? "Update Employee"
              : "Add Employee"}
          </button>

        </div>

        {/* Search */}
        <div className="mb-6">

          <input
            type="text"
            placeholder="Search employee..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full border p-3 rounded-lg"
          />

        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-200">

              <tr>
                <th className="text-left p-4">
                  ID
                </th>

                <th className="text-left p-4">
                  Name
                </th>

                <th className="text-left p-4">
                  Email
                </th>

                <th className="text-left p-4">
                  Department
                </th>

                <th className="text-left p-4">
                  Designation
                </th>

                <th className="text-left p-4">
                  Actions
                </th>
              </tr>

            </thead>

            <tbody>

              {filteredEmployees.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-t"
                >
                  <td className="p-4">
                    {employee.id}
                  </td>

                  <td className="p-4">
                    {employee.name}
                  </td>

                  <td className="p-4">
                    {employee.email}
                  </td>

                  <td className="p-4">
                    {employee.department}
                  </td>

                  <td className="p-4">
                    {employee.designation}
                  </td>

                  <td className="p-4">

                    <button
                      onClick={() =>
                        handleEdit(employee)
                      }
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(employee.id)
                      }
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}

export default Employees;