// GET Employees
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