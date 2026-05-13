import { useEffect, useState } from "react";

function Assets() {
  const [assets, setAssets] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);

  const fetchAssets = async () => {
    const res = await fetch(
      "https://https://https://itam-backend-jgzp.onrender.com//api/assets"
    );

    const data = await res.json();

    setAssets(data);
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  // Add or Update Asset
  const handleSaveAsset = async () => {
    if (!name || !type) {
      alert("Fill all fields");
      return;
    }

    if (editingId) {
      // UPDATE
      await fetch(
        `https://YOUR-RENDER-URL.onrender.com/api/assets/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            type,
          }),
        }
      );

      setEditingId(null);

    } else {
      // CREATE
      await fetch(
        "https://YOUR-RENDER-URL.onrender.com/api/assets",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            type,
          }),
        }
      );
    }

    setName("");
    setType("");

    fetchAssets();
  };

  // DELETE
  const handleDelete = async (id) => {
    await fetch(
      `https://YOUR-RENDER-URL.onrender.com/api/assets/${id}`,
      {
        method: "DELETE",
      }
    );

    fetchAssets();
  };

  // EDIT
  const handleEdit = (asset) => {
    setName(asset.name);
    setType(asset.type);
    setEditingId(asset.id);
  };

  // SEARCH FILTER
  const filteredAssets = assets.filter((asset) =>
    asset.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Asset Management
        </h1>

        {/* Form */}
        <div className="bg-white p-6 rounded-2xl shadow mb-8">

          <div className="grid grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Asset Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              placeholder="Asset Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border p-3 rounded-lg"
            />

          </div>

          <button
            onClick={handleSaveAsset}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            {editingId ? "Update Asset" : "Add Asset"}
          </button>

        </div>

        {/* Search */}
        <div className="mb-6">

          <input
            type="text"
            placeholder="Search assets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-200">

              <tr>
                <th className="text-left p-4">ID</th>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Type</th>
                <th className="text-left p-4">Actions</th>
              </tr>

            </thead>

            <tbody>

              {filteredAssets.map((asset) => (
                <tr
                  key={asset.id}
                  className="border-t"
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

                    <button
                      onClick={() => handleEdit(asset)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(asset.id)}
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

export default Assets;