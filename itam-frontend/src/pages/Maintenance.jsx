import { useEffect, useState } from "react";

function Maintenance() {
  const [maintenance, setMaintenance] =
    useState([]);

  const [assets, setAssets] = useState([]);

  const [assetName, setAssetName] =
    useState("");

  const [issueDescription, setIssueDescription] =
    useState("");

  const [vendor, setVendor] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [maintenanceDate, setMaintenanceDate] =
    useState("");

  // FETCH MAINTENANCE
  const fetchMaintenance = async () => {
    const res = await fetch(
      "https://itam-backend-jgzp.onrender.com/api/maintenance"
    );

    const data = await res.json();

    setMaintenance(data);
  };

  // FETCH ASSETS
  const fetchAssets = async () => {
    const res = await fetch(
      "https://itam-backend-jgzp.onrender.com/api/assets"
    );

    const data = await res.json();

    setAssets(data);
  };

  useEffect(() => {
    fetchMaintenance();
    fetchAssets();
  }, []);

  // ADD MAINTENANCE
  const handleAddMaintenance = async () => {
    if (
      !assetName ||
      !issueDescription ||
      !vendor ||
      !status ||
      !maintenanceDate
    ) {
      alert("Fill all fields");
      return;
    }

    await fetch(
      "https://itam-backend-jgzp.onrender.com/api/maintenance",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          asset_name: assetName,
          issue_description:
            issueDescription,
          vendor,
          status,
          maintenance_date:
            maintenanceDate,
        }),
      }
    );

    setAssetName("");
    setIssueDescription("");
    setVendor("");
    setStatus("");
    setMaintenanceDate("");

    fetchMaintenance();
  };

  // DELETE
  const handleDelete = async (id) => {
    await fetch(
      `https://itam-backend-jgzp.onrender.com/api/maintenance/${id}`,
      {
        method: "DELETE",
      }
    );

    fetchMaintenance();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Maintenance Tracking
        </h1>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8">

          <div className="grid grid-cols-2 gap-4">

            {/* Asset */}
            <select
              value={assetName}
              onChange={(e) =>
                setAssetName(e.target.value)
              }
              className="border p-3 rounded-lg"
            >
              <option value="">
                Select Asset
              </option>

              {assets.map((asset) => (
                <option
                  key={asset.id}
                  value={asset.name}
                >
                  {asset.name}
                </option>
              ))}
            </select>

            {/* Vendor */}
            <input
              type="text"
              placeholder="Vendor / Service Provider"
              value={vendor}
              onChange={(e) =>
                setVendor(e.target.value)
              }
              className="border p-3 rounded-lg"
            />

            {/* Issue */}
            <textarea
              placeholder="Issue Description"
              value={issueDescription}
              onChange={(e) =>
                setIssueDescription(
                  e.target.value
                )
              }
              className="border p-3 rounded-lg"
            />

            {/* Status */}
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="border p-3 rounded-lg"
            >
              <option value="">
                Select Status
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Completed">
                Completed
              </option>
            </select>

            {/* Date */}
            <input
              type="date"
              value={maintenanceDate}
              onChange={(e) =>
                setMaintenanceDate(
                  e.target.value
                )
              }
              className="border p-3 rounded-lg"
            />

          </div>

          <button
            onClick={handleAddMaintenance}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Add Maintenance Record
          </button>

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
                  Asset
                </th>

                <th className="text-left p-4">
                  Issue
                </th>

                <th className="text-left p-4">
                  Vendor
                </th>

                <th className="text-left p-4">
                  Status
                </th>

                <th className="text-left p-4">
                  Date
                </th>

                <th className="text-left p-4">
                  Actions
                </th>
              </tr>

            </thead>

            <tbody>

              {maintenance.map((item) => (
                <tr
                  key={item.id}
                  className="border-t"
                >
                  <td className="p-4">
                    {item.id}
                  </td>

                  <td className="p-4">
                    {item.asset_name}
                  </td>

                  <td className="p-4">
                    {item.issue_description}
                  </td>

                  <td className="p-4">
                    {item.vendor}
                  </td>

                  <td className="p-4">
                    {item.status}
                  </td>

                  <td className="p-4">
                    {item.maintenance_date}
                  </td>

                  <td className="p-4">

                    <button
                      onClick={() =>
                        handleDelete(item.id)
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

export default Maintenance;