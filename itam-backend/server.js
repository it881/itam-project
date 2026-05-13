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