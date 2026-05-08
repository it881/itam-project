const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
app.post("/api/assets", (req, res) => {
  const { name, type } = req.body;

  db.run(
    "INSERT INTO assets (name, type) VALUES (?, ?)",
    [name, type],
    function (err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.json({ id: this.lastID, name, type });
    }
  );
});
app.get("/api/assets", (req, res) => {
  db.all("SELECT * FROM assets", [], (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json(rows);
  });
});
// Add employee
app.post("/api/employees", (req, res) => {
  const { name } = req.body;

  db.run(
    "INSERT INTO employees (name) VALUES (?)",
    [name],
    function (err) {
      if (err) {
        return res.status(500).send(err.message);
      }

      res.json({
        id: this.lastID,
        name,
      });
    }
  );
});

// Get employees
app.get("/api/employees", (req, res) => {
  db.all("SELECT * FROM employees", [], (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }

    res.json(rows);
  });
});
// Add assignment
app.post("/api/assignments", (req, res) => {
  const { asset, employee } = req.body;

  db.run(
    "INSERT INTO assignments (asset, employee) VALUES (?, ?)",
    [asset, employee],
    function (err) {
      if (err) {
        return res.status(500).send(err.message);
      }

      res.json({
        id: this.lastID,
        asset,
        employee,
      });
    }
  );
});

// Get assignments
app.get("/api/assignments", (req, res) => {
  db.all("SELECT * FROM assignments", [], (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }

    res.json(rows);
  });
});
// Delete asset
app.delete("/api/assets/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM assets WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).send(err.message);
    }

    res.json({
      message: "Asset deleted successfully",
    });
  });
});
// Update asset
app.put("/api/assets/:id", (req, res) => {
  const { id } = req.params;
  const { name, type } = req.body;

  db.run(
    "UPDATE assets SET name = ?, type = ? WHERE id = ?",
    [name, type, id],
    function (err) {
      if (err) {
        return res.status(500).send(err.message);
      }

      res.json({
        message: "Asset updated successfully",
      });
    }
  );
});
// Login API
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, row) => {
      if (err) {
        return res.status(500).send(err.message);
      }

      if (!row) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }

      res.json({
        message: "Login successful",
        user: row,
      });
    }
  );
});