const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const multer = require("multer");
const XLSX = require("xlsx");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// FILE UPLOAD
const upload = multer({
  dest: "uploads/",
});

// DATABASE
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
// CREATE TABLES
//

// ASSETS TABLE
db.run(`
  CREATE TABLE IF NOT EXISTS assets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    type TEXT
  )
`);

// EMPLOYEES TABLE
db.run(`
  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    department TEXT,
    designation TEXT
  )
`);

// ASSIGNMENTS TABLE
db.run(`
  CREATE TABLE IF NOT EXISTS assignments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    asset_name TEXT,
    employee_name TEXT,
    assigned_date TEXT
  )
`);

// MAINTENANCE TABLE
db.run(`
  CREATE TABLE IF NOT EXISTS maintenance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    asset_name TEXT,
    issue_description TEXT,
    vendor TEXT,
    status TEXT,
    maintenance_date TEXT
  )
`);

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
// ASSETS APIs
//

// GET ASSETS
app.get("/api/assets", (req, res) => {

  db.all(
    "SELECT * FROM assets",
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

// ADD ASSET
app.post("/api/assets", (req, res) => {

  const { name, type } = req.body;

  db.run(
    `
    INSERT INTO assets
    (
      name,
      type
    )
    VALUES (?, ?)
    `,
    [name, type],

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

// UPDATE ASSET
app.put("/api/assets/:id", (req, res) => {

  const { id } = req.params;

  const { name, type } = req.body;

  db.run(
    `
    UPDATE assets
    SET
      name = ?,
      type = ?
    WHERE id = ?
    `,
    [name, type, id],

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

// DELETE ASSET
app.delete("/api/assets/:id", (req, res) => {

  const { id } = req.params;

  db.run(
    "DELETE FROM assets WHERE id = ?",
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
// EMPLOYEE APIs
//

// GET EMPLOYEES
app.get("/api/employees", (req, res) => {

  db.all(
    "SELECT * FROM employees",
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

// ADD EMPLOYEE
app.post("/api/employees", (req, res) => {

  const {
    name,
    email,
    department,
    designation,
  } = req.body;

  db.run(
    `
    INSERT INTO employees
    (
      name,
      email,
      department,
      designation
    )
    VALUES (?, ?, ?, ?)
    `,
    [
      name,
      email,
      department,
      designation,
    ],

    function (err) {

      if (err) {

        return res.status(500).json({
          error: err.message,
        });
      }

      res.json({
        message:
          "Employee added successfully",
      });
    }
  );
});

// UPDATE EMPLOYEE
app.put("/api/employees/:id", (req, res) => {

  const { id } = req.params;

  const {
    name,
    email,
    department,
    designation,
  } = req.body;

  db.run(
    `
    UPDATE employees
    SET
      name = ?,
      email = ?,
      department = ?,
      designation = ?
    WHERE id = ?
    `,
    [
      name,
      email,
      department,
      designation,
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
          "Employee updated successfully",
      });
    }
  );
});

// DELETE EMPLOYEE
app.delete("/api/employees/:id", (req, res) => {

  const { id } = req.params;

  db.run(
    "DELETE FROM employees WHERE id = ?",
    [id],

    function (err) {

      if (err) {

        return res.status(500).json({
          error: err.message,
        });
      }

      res.json({
        message:
          "Employee deleted successfully",
      });
    }
  );
});

//
// ASSIGNMENT APIs
//

// GET ASSIGNMENTS
app.get("/api/assignments", (req, res) => {

  db.all(
    "SELECT * FROM assignments",
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

// ADD ASSIGNMENT
app.post("/api/assignments", (req, res) => {

  const {
    asset_name,
    employee_name,
    assigned_date,
  } = req.body;

  db.run(
    `
    INSERT INTO assignments
    (
      asset_name,
      employee_name,
      assigned_date
    )
    VALUES (?, ?, ?)
    `,
    [
      asset_name,
      employee_name,
      assigned_date,
    ],

    function (err) {

      if (err) {

        return res.status(500).json({
          error: err.message,
        });
      }

      res.json({
        message:
          "Assignment created",
      });
    }
  );
});

// DELETE ASSIGNMENT
app.delete("/api/assignments/:id", (req, res) => {

  const { id } = req.params;

  db.run(
    "DELETE FROM assignments WHERE id = ?",
    [id],

    function (err) {

      if (err) {

        return res.status(500).json({
          error: err.message,
        });
      }

      res.json({
        message:
          "Assignment deleted",
      });
    }
  );
});

//
// MAINTENANCE APIs
//

// GET MAINTENANCE
app.get("/api/maintenance", (req, res) => {

  db.all(
    "SELECT * FROM maintenance",
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

// ADD MAINTENANCE
app.post("/api/maintenance", (req, res) => {

  const {
    asset_name,
    issue_description,
    vendor,
    status,
    maintenance_date,
  } = req.body;

  db.run(
    `
    INSERT INTO maintenance
    (
      asset_name,
      issue_description,
      vendor,
      status,
      maintenance_date
    )
    VALUES (?, ?, ?, ?, ?)
    `,
    [
      asset_name,
      issue_description,
      vendor,
      status,
      maintenance_date,
    ],

    function (err) {

      if (err) {

        return res.status(500).json({
          error: err.message,
        });
      }

      res.json({
        message:
          "Maintenance record added",
      });
    }
  );
});

// DELETE MAINTENANCE
app.delete("/api/maintenance/:id", (req, res) => {

  const { id } = req.params;

  db.run(
    "DELETE FROM maintenance WHERE id = ?",
    [id],

    function (err) {

      if (err) {

        return res.status(500).json({
          error: err.message,
        });
      }

      res.json({
        message:
          "Maintenance record deleted",
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
            name,
            type
          )
          VALUES (?, ?)
          `,
          [
            item.name,
            item.type,
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
// START SERVER
//

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );
});