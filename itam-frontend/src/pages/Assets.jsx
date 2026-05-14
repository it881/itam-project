import {
  useEffect,
  useState,
  useRef,
} from "react";

function Assets() {

  const [assets, setAssets] =
    useState([]);

  // FORM STATES

  const [assetId, setAssetId] =
    useState("");

  const [employeeId, setEmployeeId] =
    useState("");

  const [employeeName, setEmployeeName] =
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
        !assetId ||
        !employeeId ||
        !employeeName ||
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
        assetId,
        employeeId,
        employeeName,
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

      resetForm();

      fetchAssets();
    };

  // RESET FORM

  const resetForm = () => {

    setAssetId("");
    setEmployeeId("");
    setEmployeeName("");
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

    setAssetId(
      asset.assetId || ""
    );

    setEmployeeId(
      asset.employeeId || ""
    );

    setEmployeeName(
      asset.employeeName || ""
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
    assets.filter((asset) => {

      return (
        asset.assetId
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        asset.employeeName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        asset.type
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );
    });

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
          "
        >
          ← Dashboard
        </button>

      </div>

      {/* FORM */}

      <div
        className="
          bg-white
          rounded-3xl
          shadow-2xl
          p-10
          mb-10
        "
      >

        <h2
          className="
            text-4xl
            font-bold
            mb-8
            text-slate-800
          "
        >
          Asset Management
        </h2>

        {/* INPUTS */}

        <div
          className="
            grid
            grid-cols-3
            gap-5
          "
        >

          <input
            type="text"
            placeholder="Asset ID"
            value={assetId}
            onChange={(e) =>
              setAssetId(
                e.target.value
              )
            }
            className="border p-4 rounded-2xl"
          />

          <input
            type="text"
            placeholder="Employee ID"
            value={employeeId}
            onChange={(e) =>
              setEmployeeId(
                e.target.value
              )
            }
            className="border p-4 rounded-2xl"
          />

          <input
            type="text"
            placeholder="Employee Name"
            value={employeeName}
            onChange={(e) =>
              setEmployeeName(
                e.target.value
              )
            }
            className="border p-4 rounded-2xl"
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
            className="border p-4 rounded-2xl"
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
            className="border p-4 rounded-2xl"
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
            className="border p-4 rounded-2xl"
          />

          <input
            type="date"
            value={purchaseDate}
            onChange={(e) =>
              setPurchaseDate(
                e.target.value
              )
            }
            className="border p-4 rounded-2xl"
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
            className="border p-4 rounded-2xl"
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value
              )
            }
            className="border p-4 rounded-2xl"
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
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-8
              py-4
              rounded-2xl
              shadow-lg
            "
          >
            {editingId
              ? "Update Asset"
              : "Add Asset"}
          </button>

          <button
            onClick={resetForm}
            className="
              bg-gray-300
              hover:bg-gray-400
              px-8
              py-4
              rounded-2xl
            "
          >
            Reset
          </button>

          <button
            onClick={
              handleExport
            }
            className="
              bg-green-600
              hover:bg-green-700
              text-white
              px-8
              py-4
              rounded-2xl
            "
          >
            Export Excel
          </button>

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
              bg-purple-600
              hover:bg-purple-700
              text-white
              px-8
              py-4
              rounded-2xl
            "
          >
            Import Excel
          </button>

        </div>

      </div>

      {/* SEARCH */}

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
          p-5
          rounded-2xl
          shadow-lg
          mb-6
        "
      />

      {/* TABLE */}

      <div
        className="
          bg-white
          rounded-3xl
          shadow-2xl
          overflow-auto
        "
      >

        <table className="w-full">

          <thead
            className="
              bg-slate-800
              text-white
            "
          >

            <tr>

              <th className="p-5 text-left">
                Asset ID
              </th>

              <th className="p-5 text-left">
                Employee ID
              </th>

              <th className="p-5 text-left">
                Employee Name
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
                  "
                >

                  <td className="p-5">
                    {asset.assetId}
                  </td>

                  <td className="p-5">
                    {asset.employeeId}
                  </td>

                  <td className="p-5 font-semibold">
                    {asset.employeeName}
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
                    {asset.status}
                  </td>

                  <td className="p-5 flex gap-3">

                    <button
                      onClick={() =>
                        handleEdit(
                          asset
                        )
                      }
                      className="
                        bg-yellow-500
                        hover:bg-yellow-600
                        text-white
                        px-4
                        py-2
                        rounded-xl
                      "
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          asset.id
                        )
                      }
                      className="
                        bg-red-600
                        hover:bg-red-700
                        text-white
                        px-4
                        py-2
                        rounded-xl
                      "
                    >
                      Delete
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