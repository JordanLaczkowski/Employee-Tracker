const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
const prompt = require("select-prompt");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "department_db",
});
async function apiDeps() {
  db.query("SELECT * FROM department", function (err, results) {
    console.log(results);
  });
}

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

openingOptions = [
  //possibly make this case "view all employees -- add employee -- break -- etc"
  { title: "View all Employees", value: "View all Employees" },
  { title: "Add Employee", value: "Add Employee" },
  { title: "Update Employee Role", value: "Update Employee Role" },
  { title: "View all Roles", value: "View all Roles" },
  { title: "Add Role", value: "Add Role" },
  { title: "View all Departments", value: "View all Departments" },
  { title: "Add Department", value: "Add Department" },
  { title: "Quit", value: "Quit" },
];
function start() {
  prompt(
    "Welcome to the main menu. Please select one of the below choices:",
    openingOptions
  ).on("submit", (option) => optionSelected(option));
}

function optionSelected(option) {
  if (option == "View all Employees") {
    app.get("/api/employee", (req, res) => {
      const sql = `SELECT * FROM employee`;

      db.query(sql, (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({
          message: "success",
          data: rows,
        });
      });
    });
  }
  if (option == "Add Employee") {
    app.post("/api/employee", ({ body }, res) => {
      const sql = `INSERT INTO employee (??)
        VALUES (?)`;
      const params = [
        body.id,
        body.first_name,
        body.last_name,
        body.role_id,
        body.manager_id,
      ];

      db.query(sql, params, (err, result) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.json({
          message: "success",
          data: body,
        });
      });
    });
  }
  if (option == "Update Employee Role") {
    console.log("update employee selected");
  }
  if (option == "View all Roles") {
    app.get("/api/roles", (req, res) => {
      const sql = `SELECT * FROM roles`;

      db.query(sql, (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({
          message: "success",
          data: rows,
        });
      });
    });
  }
  if (option == "Add Role") {
    app.post("/api/role", ({ body }, res) => {
      const sql = `INSERT INTO role (??)
          VALUES (?)`;
      const params = [body.id, body.title, body.salary, body.department_id];

      db.query(sql, params, (err, result) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.json({
          message: "success",
          data: body,
        });
      });
    });
  }
  if (option == "View all Departments") {
    app.get("/api/department", (req, res) => {
      const sql = `SELECT * FROM department`;

      db.query(sql, (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({
          message: "success",
          data: rows,
        });
      });
    });
  }
  if (option == "Add Department") {
    app.post("/api/department", ({ body }, res) => {
      const sql = `INSERT INTO department (??)
            VALUES (?)`;
      const params = [body.id, body.first_name];

      db.query(sql, params, (err, result) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.json({
          message: "success",
          data: body,
        });
      });
    });
  }
  if (option == "Quit") {
    return;
  }
}

start();

module.exports = "server.js";

/*
Questions: 
1. How to get database running and how to insert data?
2. What should my sql queries look like?
3. How to update using sql?
*/
