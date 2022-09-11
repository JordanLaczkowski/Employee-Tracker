//took out express, not using that!
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
const prompt = require("select-prompt");

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

//first screen, introduction
async function start() {
  await prompt(
    "Welcome to the main menu. Please select one of the below choices:",
    openingOptions
  ).on("submit", (option) => {
    return optionSelected(option);
  });
}

//view all employees
function optionSelected(option) {
  if (option == "View all Employees") {
    const sql = `SELECT * FROM employee JOIN roles ON employee.role_id = roles.id`;

    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
        return;
      }

      console.table(rows);
      start();
    });
  }

  if (option == "Add Employee") {
  }
  if (option == "Update Employee Role") {
    console.log("update employee selected");
  }

  //view all roles
  if (option == "View all Roles") {
    const sql = `SELECT * FROM roles`;

    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
        return;
      }

      console.table(rows);
      start();
    });
  }
  //add role
  if (option == "Add Role") {
    post("/api/role", ({ body }, res) => {
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
  //view all departments
  if (option == "View all Departments") {
    const sql = `SELECT id, first_name FROM department`;

    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
        return;
      }

      console.table(rows);
      start();
    });
  }

  if (option == "Quit") {
    return;
  }
}

start();

module.exports = "server.js";
