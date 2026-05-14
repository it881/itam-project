import {
  useEffect,
  useState,
  useRef,
} from "react";

function Assets() {

  const [assets, setAssets] =
    useState([]);

  const [name, setName] =
    useState("");

  const [type, setType] =
    useState("");

  const [brand, setBrand] =
    useState("");

  const [serialNumber, setSerialNumber] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [purchaseDate, setPurchaseDate] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  const fileInputRef =
    useRef();

  const API =
    "https://itam-backend-jgzp.onrender.com";

  // FETCH ASSETS

  const fetchAssets = async () => {

    const res = await fetch(
      `${API}/api/assets`
    );

    const data =
      await res.json();

    setAssets(data);
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  // SAVE ASSET

  const handleSaveAsset =
    async () => {

      if (
        !name ||
        !type ||
        !brand ||
        !serialNumber ||
        !status
      ) {
        alert(
          "Please fill all fields"
        );

        return;
      }

      const payload = {
        name,
        type,
        brand,
        serialNumber,
        status,
        purchaseDate,
        location,
      };

      // UPDATE

      if (editingId) {

        await fetch(
          `${API}/api/assets/${editingId}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(
                payload
              ),
          }
        );

        setEditingId(null);

      } else {

        // CREATE

        await fetch(
          `${API}/api/assets`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(
                payload
              ),
          }
        );
      }

      // CLEAR FORM

      resetForm();

      fetchAssets();
    };

  // RESET FORM

  const resetForm = () => {

    setName("");
    setType("");
    setBrand("");
    setSerialNumber("");
    setStatus("");
    setPurchaseDate("");
    setLocation("");
    setEditingId(null);
  };

  // DELETE

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this asset?"
        );

      if (!confirmDelete)
        return;

      await fetch(
        `${API}/api/assets/${id}`,
        {
          method: "DELETE",
        }
      );

      fetchAssets();
    };

  // EDIT

  const handleEdit = (
    asset
  ) => {

    setName(
      asset.name || ""
    );

    setType(
      asset.type || ""
    );

    setBrand(
      asset.brand || ""
    );

    setSerialNumber(
      asset.serialNumber || ""
    );

    setStatus(
      asset.status || ""
    );

    setPurchaseDate(
      asset.purchaseDate || ""
    );

    setLocation(
      asset.location || ""
    );

    setEditingId(
      asset.id
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // EXPORT EXCEL

  const handleExport =
    () => {

      window.open(
        `${API}/api/export-assets`
      );
    };

  // IMPORT EXCEL

  const handleImport =
    async (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      await fetch(
        `${API}/api/import-assets`,
        {
          method: "POST",
          body: formData,
        }
      );

      alert(
        "Assets Imported Successfully"
      );

      fetchAssets();
    };

  // SEARCH FILTER

  const filteredAssets =
    assets.filter((asset) =>
      asset.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (

    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-100
        via-blue-50
        to-slate-200
        p-8
      "
    >

      {/* HEADER */}

      <div
        className="
          flex
          justify-between
          items-center
          mb-8
        "
      >

        <div>

          <h1
            className="
              text-5xl
              font-extrabold
              text-slate-800
            "
          >
            Promea Therapeutics
          </h1>

          <p
            className="
              text-gray-600
              mt-2
              text-lg
            "
          >
            Enterprise Asset
            Management System
          </p>

        </div>

        <button
          onClick={() =>
            window.location.reload()
          }
          className="
            bg-slate-800
            hover:bg-slate-900
            text-white
            px-6
            py-3
            rounded-2xl
            shadow-lg
            transition
          "
        >
          ← Dashboard
        </button>

      </div>

      {/* FORM */}

      <div
        className="
          bg-white/90
          backdrop-blur-lg
          rounded-3xl
          shadow-2xl
          border
          border-gray-200
          p-10
          mb-10
        "
      >

        <div
          className="
            flex
            justify-between
            items-center
            mb-8
          "
        >

          <div>

            <h2
              className="
                text-4xl
                font-bold
                text-slate-800
              "
            >
              Asset Management
            </h2>

            <p
              className="
                text-gray-500
                mt-2
              "
            >
              Manage company assets
              professionally
            </p>

          </div>

          <div
            className="
              bg-blue-100
              text-blue-700
              px-6
              py-3
              rounded-2xl
              font-semibold
            "
          >
            Total Assets:
            {" "}
            {assets.length}
          </div>

        </div>

        {/* FORM GRID */}

        <div
          className="
            grid
            grid-cols-3
            gap-5
          "
        >

          <input
            type="text"
            placeholder="Asset Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            className="
              border
              border-gray-300
              bg-gray-50
              p-4
              rounded-2xl
              focus:ring-2
              focus:ring-blue-500
              outline-none
            "
          />

          <input
            type="text"
            placeholder="Asset Type"
            value={type}
            onChange={(e) =>
              setType(
                e.target.value
              )
            }
            className="
              border
              border-gray-300
              bg-gray-50
              p-4
              rounded-2xl
              focus:ring-2
              focus:ring-blue-500
              outline-none
            "
          />

          <input
            type="text"
            placeholder="Brand"
            value={brand}
            onChange={(e) =>
              setBrand(
                e.target.value
              )
            }
            className="
              border
              border-gray-300
              bg-gray-50
              p-4
              rounded-2xl
              focus:ring-2
              focus:ring-blue-500
              outline-none
            "
          />

          <input
            type="text"
            placeholder="Serial Number"
            value={serialNumber}
            onChange={(e) =>
              setSerialNumber(
                e.target.value
              )
            }
            className="
              border
              border-gray-300
              bg-gray-50
              p-4
              rounded-2xl
              focus:ring-2
              focus:ring-blue-500
              outline-none
            "
          />

          <input
            type="date"
            value={purchaseDate}
            onChange={(e) =>
              setPurchaseDate(
                e.target.value
              )
            }
            className="
              border
              border-gray-300
              bg-gray-50
              p-4
              rounded-2xl
              focus:ring-2
              focus:ring-blue-500
              outline-none
            "
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) =>
              setLocation(
                e.target.value
              )
            }
            className="
              border
              border-gray-300
              bg-gray-50
              p-4
              rounded-2xl
              focus:ring-2
              focus:ring-blue-500
              outline-none
            "
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value
              )
            }
            className="
              border
              border-gray-300
              bg-gray-50
              p-4
              rounded-2xl
              focus:ring-2
              focus:ring-blue-500
              outline-none
            "
          >

            <option value="">
              Select Status
            </option>

            <option value="Available">
              Available
            </option>

            <option value="Assigned">
              Assigned
            </option>

            <option value="Maintenance">
              Maintenance
            </option>

          </select>

        </div>

        {/* BUTTONS */}

        <div
          className="
            flex
            flex-wrap
            gap-4
            mt-8
          "
        >

          <button
            onClick={
              handleSaveAsset
            }
            className="
              bg-gradient-to-r
              from-blue-600
              to-blue-800
              text-white
              px-10
              py-4
              rounded-2xl
              shadow-xl
              hover:scale-105
              transition
              font-semibold
            "
          >
            {editingId
              ? "✏ Update Asset"
              : "➕ Add Asset"}
          </button>

          <button
            onClick={resetForm}
            className="
              bg-gray-200
              hover:bg-gray-300
              text-slate-700
              px-8
              py-4
              rounded-2xl
              transition
              font-semibold
            "
          >
            Reset
          </button>

          <button
            onClick={
              handleExport
            }
            className="
              bg-gradient-to-r
              from-green-500
              to-green-700
              text-white
              px-8
              py-4
              rounded-2xl
              shadow-lg
              hover:scale-105
              transition
              font-semibold
            "
          >
            📥 Export Excel
          </button>

          {/* IMPORT */}

          <input
            type="file"
            accept=".xlsx,.xls"
            ref={fileInputRef}
            onChange={
              handleImport
            }
            className="hidden"
          />

          <button
            onClick={() =>
              fileInputRef.current.click()
            }
            className="
              bg-gradient-to-r
              from-purple-500
              to-purple-700
              text-white
              px-8
              py-4
              rounded-2xl
              shadow-lg
              hover:scale-105
              transition
              font-semibold
            "
          >
            📤 Import Excel
          </button>

        </div>

      </div>

      {/* SEARCH */}

      <div className="mb-6">

        <input
          type="text"
          placeholder="🔍 Search Assets..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="
            w-full
            border
            border-gray-300
            p-5
            rounded-2xl
            shadow-lg
            focus:ring-2
            focus:ring-blue-500
            outline-none
          "
        />

      </div>

      {/* TABLE */}

      <div
        className="
          bg-white
          rounded-3xl
          shadow-2xl
          overflow-hidden
        "
      >

        <table className="w-full">

          <thead
            className="
              bg-gradient-to-r
              from-slate-900
              to-slate-700
              text-white
            "
          >

            <tr>

              <th className="p-5 text-left">
                ID
              </th>

              <th className="p-5 text-left">
                Asset
              </th>

              <th className="p-5 text-left">
                Type
              </th>

              <th className="p-5 text-left">
                Brand
              </th>

              <th className="p-5 text-left">
                Serial
              </th>

              <th className="p-5 text-left">
                Purchase Date
              </th>

              <th className="p-5 text-left">
                Location
              </th>

              <th className="p-5 text-left">
                Status
              </th>

              <th className="p-5 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredAssets.map(
              (asset) => (

                <tr
                  key={asset.id}
                  className="
                    border-t
                    hover:bg-blue-50
                    transition
                  "
                >

                  <td className="p-5">
                    {asset.id}
                  </td>

                  <td className="p-5 font-semibold">
                    {asset.name}
                  </td>

                  <td className="p-5">
                    {asset.type}
                  </td>

                  <td className="p-5">
                    {asset.brand}
                  </td>

                  <td className="p-5">
                    {asset.serialNumber}
                  </td>

                  <td className="p-5">
                    {asset.purchaseDate}
                  </td>

                  <td className="p-5">
                    {asset.location}
                  </td>

                  <td className="p-5">

                    <span
                      className={`
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        font-semibold

                        ${
                          asset.status ===
                          "Available"
                            ? "bg-green-100 text-green-700"
                            : asset.status ===
                              "Assigned"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                        }
                      `}
                    >
                      {asset.status}
                    </span>

                  </td>

                  <td
                    className="
                      p-5
                      flex
                      gap-3
                    "
                  >

                    <button
                      onClick={() =>
                        handleEdit(
                          asset
                        )
                      }
                      className="
                        bg-gradient-to-r
                        from-yellow-400
                        to-yellow-600
                        text-white
                        px-5
                        py-2
                        rounded-xl
                        hover:scale-105
                        transition
                      "
                    >
                      ✏ Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          asset.id
                        )
                      }
                      className="
                        bg-gradient-to-r
                        from-red-500
                        to-red-700
                        text-white
                        px-5
                        py-2
                        rounded-xl
                        hover:scale-105
                        transition
                      "
                    >
                      🗑 Delete
                    </button>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Assets;