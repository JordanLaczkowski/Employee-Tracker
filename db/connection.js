const mysql = require("mysql12");

const connection = mysql.createConnection({
  host: "localhost",
  //Your username
  user: "root",
  //Your password
  password: "",
  database: "employees",
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;