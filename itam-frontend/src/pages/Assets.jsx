import { useEffect, useState, useRef } from "react";

function Assets() {
  const [assets, setAssets] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] =
    useState(null);

  const fileInputRef = useRef();

  // FETCH ASSETS
  const fetchAssets = async () => {
    try {

      const res = await fetch(
        "https://itam-backend-jgzp.onrender.com/api/assets"
      );

      const data = await res.json();

      setAssets(data);

    } catch (error) {

      console.error(error);

    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  // ADD OR UPDATE ASSET
  const handleSaveAsset = async () => {

    if (!name || !type) {
      alert("Fill all fields");
      return;
    }

    try {

      // UPDATE
      if (editingId) {

        await fetch(
          `https://itam-backend-jgzp.onrender.com/api/assets/${editingId}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              name,
              type,
            }),
          }
        );

        alert("Asset updated");

        setEditingId(null);

      } else {

        // CREATE
        await fetch(
          "https://itam-backend-jgzp.onrender.com/api/assets",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              name,
              type,
            }),
          }
        );

        alert("Asset added");
      }

      setName("");
      setType("");

      fetchAssets();

    } catch (error) {

      console.error(error);

      alert("Something went wrong");
    }
  };

  // DELETE ASSET
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this asset?"
    );

    if (!confirmDelete) return;

    try {

      await fetch(
        `https://itam-backend-jgzp.onrender.com/api/assets/${id}`,
        {
          method: "DELETE",
        }
      );

      alert("Asset deleted");

      fetchAssets();

    } catch (error) {

      console.error(error);

    }
  };

  // EDIT ASSET
  const handleEdit = (asset) => {

    setName(asset.name);
    setType(asset.type);

    setEditingId(asset.id);
  };

  // EXPORT EXCEL
  const handleExport = () => {

    window.open(
      "https://itam-backend-jgzp.onrender.com/api/export-assets"
    );
  };

  // IMPORT EXCEL
  const handleImport = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    try {

      const formData = new FormData();

      formData.append("file", file);

      await fetch(
        "https://itam-backend-jgzp.onrender.com/api/import-assets",
        {
          method: "POST",
          body: formData,
        }
      );

      alert(
        "Assets imported successfully"
      );

      fetchAssets();

    } catch (error) {

      console.error(error);

      alert("Import failed");
    }
  };

  // SEARCH FILTER
  const filteredAssets = assets.filter(
    (asset) =>
      asset.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold text-gray-800">
            Asset Management
          </h1>

        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8">

          <h2 className="text-2xl font-semibold mb-4">
            {editingId
              ? "Update Asset"
              : "Add New Asset"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Asset Name */}
            <input
              type="text"
              placeholder="Enter Asset Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Asset Type */}
            <input
              type="text"
              placeholder="Enter Asset Type"
              value={type}
              onChange={(e) =>
                setType(e.target.value)
              }
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveAsset}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {editingId
              ? "Update Asset"
              : "Add Asset"}
          </button>

        </div>

        {/* Search */}
        <div className="mb-6">

          <input
            type="text"
            placeholder="Search assets..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Import Export Buttons */}
        <div className="flex gap-4 mb-6">

          {/* Export */}
          <button
            onClick={handleExport}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Export Excel
          </button>

          {/* Import */}
          <div>

            <input
              type="file"
              accept=".xlsx,.xls"
              ref={fileInputRef}
              onChange={handleImport}
              className="hidden"
            />

            <button
              onClick={() =>
                fileInputRef.current.click()
              }
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Import Excel
            </button>

          </div>

        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">

          <table className="w-full">

            {/* Table Head */}
            <thead className="bg-gray-200">

              <tr>

                <th className="text-left p-4">
                  ID
                </th>

                <th className="text-left p-4">
                  Asset Name
                </th>

                <th className="text-left p-4">
                  Asset Type
                </th>

                <th className="text-left p-4">
                  Actions
                </th>

              </tr>

            </thead>

            {/* Table Body */}
            <tbody>

              {filteredAssets.length > 0 ? (

                filteredAssets.map((asset) => (

                  <tr
                    key={asset.id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="p-4">
                      {asset.id}
                    </td>

                    <td className="p-4">
                      {asset.name}
                    </td>

                    <td className="p-4">
                      {asset.type}
                    </td>

                    <td className="p-4">

                      {/* Edit */}
                      <button
                        onClick={() =>
                          handleEdit(asset)
                        }
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() =>
                          handleDelete(asset.id)
                        }
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                ))

              ) : (

                <tr>

                  <td
                    colSpan="4"
                    className="text-center p-6 text-gray-500"
                  >
                    No assets found
                  </td>

                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Assets;