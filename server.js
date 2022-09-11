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
async function optionSelected(option) {
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
    const input = await inquirer.prompt([
      {
        name: "role_name",
        type: "input",
        message: "What is the role name? ",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the role's salary? ",
      },
      {
        name: "department",
        type: "input",
        message: "What is the role's department? ",
      },
    ]);
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES ("${input.role_name}", "${input.salary}", "${input.department}");`;

    db.execute(sql);

    start();
  }

  //add employee
  if (option == "Add Employee") {
    const input = await inquirer.prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the employee's first name? ",
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the employee's last name? ",
      },
      {
        name: "role",
        type: "input",
        message: "What is the new employees role? ",
      },
      {
        name: "manager",
        type: "input",
        message: "Who is the employee's manager (Insert ID)? ",
      },
    ]);
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${input.first_name}", "${input.last_name}", "${input.role}", "${input.manager}");`;

    db.execute(sql);

    start();
  }

  //view all departments
  if (option == "View all Departments") {
    const sql = `SELECT id, department_name FROM department`;

    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
        return;
      }

      console.table(rows);
      start();
    });
  }

  //add department
  if (option == "Add Department") {
    const input = await inquirer.prompt([
      {
        name: "department_name",
        type: "input",
        message: "What is the name of the department? ",
      },
    ]);
    const sql = `INSERT INTO department (department_name) VALUES ("${input.department_name}");`;

    db.execute(sql);

    start();
  }

  //update an employee role
  if (option == "Update Employee Role") {
    await updateEmployee();
  }

  if (option == "Quit") {
    process.exit();
  }
}

function updateEmployee() {
  let updateEmployeeList = `SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, roles.title FROM employee, roles WHERE roles.id = employee.role_id`;
  db.query(updateEmployeeList, (err, data) => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "update_employee",
          message: "Which employee's role would you like to update?",
          choices: data.map((emp) => ({
            name: emp.first_name + " " + emp.last_name,
            value: emp.id,
          })),
        },
        {
          type: "list",
          name: "update_role",
          message: "Which role do you want to assign the seleced employee?",
          choices: [
            { name: "Sales Lead", value: 1 },
            { name: "Salesperson", value: 2 },
            { name: "Lead Engineer", value: 3 },
            { name: "Software Engineer", value: 4 },
            { name: "Account Manager", value: 5 },
            { name: "Accountant", value: 6 },
            { name: "Legal Team Lead", value: 7 },
            { name: "Lawyer", value: 8 },
          ],
        },
      ])
      .then((data) => {
        db.query(
          `UPDATE employee SET role_id = "${data.update_role}" WHERE id = "${data.update_employee}"`,
          (err, result) => {
            start();
          }
        );
      });
  });
}

start();

module.exports = "server.js";
