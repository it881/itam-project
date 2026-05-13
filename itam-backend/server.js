// GET Employees
const multer = require("multer");
const XLSX = require("xlsx");
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
const upload = multer({
  dest: "uploads/",
});

// ADD Employee
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
        message: "Employee added successfully",
      });
    }
  );
});

// UPDATE Employee
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
        message: "Employee updated successfully",
      });
    }
  );
});

// DELETE Employee
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
        message: "Employee deleted successfully",
      });
    }
  );
});
// GET Assignments
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

// ADD Assignment
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
        message: "Assignment created",
      });
    }
  );
});

// DELETE Assignment
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
        message: "Assignment deleted",
      });
    }
  );
});
// GET Maintenance Records
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

// ADD Maintenance Record
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

// DELETE Maintenance Record
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
// EXPORT Assets to Excel
app.get("/api/export-assets", (req, res) => {

  db.all(
    "SELECT * FROM assets",
    [],
    (err, rows) => {

      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }

      // Convert JSON → worksheet
      const worksheet =
        XLSX.utils.json_to_sheet(rows);

      // Create workbook
      const workbook =
        XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Assets"
      );

      // Save file
      const filePath =
        "./uploads/assets.xlsx";

      XLSX.writeFile(
        workbook,
        filePath
      );

      // Download file
      res.download(filePath);
    }
  );
});
// IMPORT Assets from Excel
app.post(
  "/api/import-assets",
  upload.single("file"),
  (req, res) => {

    try {

      // Read uploaded file
      const workbook =
        XLSX.readFile(req.file.path);

      const sheetName =
        workbook.SheetNames[0];

      const worksheet =
        workbook.Sheets[sheetName];

      const data =
        XLSX.utils.sheet_to_json(
          worksheet
        );

      // Insert into database
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