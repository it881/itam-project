import { useEffect, useState } from "react";

function Assets() {
  const [assets, setAssets] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const [editingId, setEditingId] = useState(null);

  const fetchAssets = async () => {
    const res = await fetch("https://itam-backend-jgzp.onrender.com//api/assets");
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
      await fetch(`https://itam-backend-jgzp.onrender.com//api/assets/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, type }),
      });

      setEditingId(null);
    } else {
      // CREATE
      await fetch("http://localhost:5000/api/assets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, type }),
      });
    }

    setName("");
    setType("");
    fetchAssets();
  };

  // DELETE
  const handleDelete = async (id) => {
    await fetch(`https://itam-backend-jgzp.onrender.com//api/assets/${id}`, {
      method: "DELETE",
    });

    fetchAssets();
  };

  // EDIT
  const handleEdit = (asset) => {
    setName(asset.name);
    setType(asset.type);
    setEditingId(asset.id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Asset Management</h1>

      <input
        type="text"
        placeholder="Asset Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Asset Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <br /><br />

      <button onClick={handleSaveAsset}>
        {editingId ? "Update Asset" : "Add Asset"}
      </button>

      <h3 style={{ marginTop: "30px" }}>Asset List</h3>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id}>
              <td>{asset.id}</td>
              <td>{asset.name}</td>
              <td>{asset.type}</td>

              <td>
                <button onClick={() => handleEdit(asset)}>
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(asset.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Assets;