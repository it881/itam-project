const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const multer = require("multer");
const XLSX = require("xlsx");
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//
// CREATE UPLOADS FOLDER
//

if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

//
// FILE UPLOAD
//

const upload = multer({
  dest: "uploads/",
});

//
// DATABASE
//

const db = new sqlite3.Database(
  "./database.db",
  (err) => {

    if (err) {
      console.log(err.message);
    } else {
      console.log(
        "Connected to SQLite database"
      );
    }
  }
);

//
// CREATE TABLE
//

db.run(`
  CREATE TABLE IF NOT EXISTS assets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    assetId TEXT,
    employeeId TEXT,
    employeeName TEXT,
    name TEXT,
    type TEXT,
    brand TEXT,
    serialNumber TEXT,
    status TEXT,
    purchaseDate TEXT,
    location TEXT
  )
`);

//
// ADD MISSING COLUMNS
//

const addColumn = (
  columnName,
  type = "TEXT"
) => {

  db.run(
    `
    ALTER TABLE assets
    ADD COLUMN ${columnName} ${type}
    `,
    (err) => {

      if (
        err &&
        !err.message.includes(
          "duplicate column name"
        )
      ) {

        console.log(err.message);
      }
    }
  );
};

addColumn("assetId");
addColumn("employeeId");
addColumn("employeeName");
addColumn("brand");
addColumn("serialNumber");
addColumn("status");
addColumn("purchaseDate");
addColumn("location");

//
// LOGIN API
//

app.post("/api/login", (req, res) => {

  const { username, password } =
    req.body;

  if (
    username === "admin" &&
    password === "admin123"
  ) {

    res.json({
      success: true,
      message: "Login successful",
    });

  } else {

    res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }
});

//
// GET ASSETS
//

app.get("/api/assets", (req, res) => {

  db.all(
    `
    SELECT *
    FROM assets
    ORDER BY id DESC
    `,
    [],
    (err, rows) => {

      if (err) {

        return res.status(500).json({
          error: err.message,
        });
      }

      res.json(rows);
    }
  );
});

//
// ADD ASSET
//

app.post("/api/assets", (req, res) => {

  const {
    assetId,
    employeeId,
    employeeName,
    name,
    type,
    brand,
    serialNumber,
    status,
    purchaseDate,
    location,
  } = req.body;

  db.run(
    `
    INSERT INTO assets
    (
      assetId,
      employeeId,
      employeeName,
      name,
      type,
      brand,
      serialNumber,
      status,
      purchaseDate,
      location
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      assetId,
      employeeId,
      employeeName,
      name,
      type,
      brand,
      serialNumber,
      status,
      purchaseDate,
      location,
    ],

    function (err) {

      if (err) {

        return res.status(500).json({
          error: err.message,
        });
      }

      res.json({
        message:
          "Asset added successfully",
      });
    }
  );
});

//
// UPDATE ASSET
//

app.put("/api/assets/:id", (req, res) => {

  const { id } = req.params;

  const {
    assetId,
    employeeId,
    employeeName,
    name,
    type,
    brand,
    serialNumber,
    status,
    purchaseDate,
    location,
  } = req.body;

  db.run(
    `
    UPDATE assets
    SET
      assetId = ?,
      employeeId = ?,
      employeeName = ?,
      name = ?,
      type = ?,
      brand = ?,
      serialNumber = ?,
      status = ?,
      purchaseDate = ?,
      location = ?
    WHERE id = ?
    `,
    [
      assetId,
      employeeId,
      employeeName,
      name,
      type,
      brand,
      serialNumber,
      status,
      purchaseDate,
      location,
      id,
    ],

    function (err) {

      if (err) {

        return res.status(500).json({
          error: err.message,
        });
      }

      res.json({
        message:
          "Asset updated successfully",
      });
    }
  );
});

//
// DELETE ASSET
//

app.delete("/api/assets/:id", (req, res) => {

  const { id } = req.params;

  db.run(
    `
    DELETE FROM assets
    WHERE id = ?
    `,
    [id],

    function (err) {

      if (err) {

        return res.status(500).json({
          error: err.message,
        });
      }

      res.json({
        message:
          "Asset deleted successfully",
      });
    }
  );
});

//
// EXPORT EXCEL
//

app.get(
  "/api/export-assets",
  (req, res) => {

    db.all(
      "SELECT * FROM assets",
      [],
      (err, rows) => {

        if (err) {

          return res.status(500).json({
            error: err.message,
          });
        }

        const worksheet =
          XLSX.utils.json_to_sheet(
            rows
          );

        const workbook =
          XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
          workbook,
          worksheet,
          "Assets"
        );

        const filePath =
          "./uploads/assets.xlsx";

        XLSX.writeFile(
          workbook,
          filePath
        );

        res.download(filePath);
      }
    );
  }
);

//
// IMPORT EXCEL
//

app.post(
  "/api/import-assets",
  upload.single("file"),
  (req, res) => {

    try {

      const workbook =
        XLSX.readFile(
          req.file.path
        );

      const sheetName =
        workbook.SheetNames[0];

      const worksheet =
        workbook.Sheets[sheetName];

      const data =
        XLSX.utils.sheet_to_json(
          worksheet
        );

      data.forEach((item) => {

        db.run(
          `
          INSERT INTO assets
          (
            assetId,
            employeeId,
            employeeName,
            name,
            type,
            brand,
            serialNumber,
            status,
            purchaseDate,
            location
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `,
          [
            item.assetId || "",
            item.employeeId || "",
            item.employeeName || "",
            item.name || "",
            item.type || "",
            item.brand || "",
            item.serialNumber || "",
            item.status || "",
            item.purchaseDate || "",
            item.location || "",
          ]
        );
      });

      res.json({
        message:
          "Assets imported successfully",
      });

    } catch (error) {

      res.status(500).json({
        error: error.message,
      });
    }
  }
);

//
// SERVER
//

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );
});