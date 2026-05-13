const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./itam.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Database connected");

    // Assets table
    db.run(`
      CREATE TABLE IF NOT EXISTS assets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        type TEXT
      )
    `);

    // Employees table
    db.run(`
      CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
      )
    `);

    // Assignments table
    db.run(`
      CREATE TABLE IF NOT EXISTS assignments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        asset TEXT,
        employee TEXT
      )
    `);
  }
});

module.exports = db;
// Users table
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT
  )
`);
db.get(
  "SELECT * FROM users WHERE username = ?",
  ["admin"],
  (err, row) => {
    if (!row) {
      db.run(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        ["admin", "admin"]
      );

      console.log("Default admin user created");
    }
  }
);
// Maintenance table
db.run(`
  CREATE TABLE IF NOT EXISTS maintenance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    asset TEXT,
    issue TEXT,
    status TEXT
  )
`);

// Audit logs table
db.run(`
  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    department TEXT,
    designation TEXT
  )
`);