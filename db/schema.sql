DROP DATABASE IF EXISTS department_db;
CREATE DATABASE department_db;

USE department_db;


CREATE TABLE department (
id: INT PRIMARY KEY NOT NULL,
first_name: VARCHAR(30) NOT NULL,
FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE role (
id: INT PRIMARY KEY NOT NULL,
title: VARCHAR(30) NOT NULL,
salary: DECIMAL(7,2),
department_id: INT
FOREIGN KEY (department_id) 
REFERENCES department(id) 
ON DELETE cascade
);

CREATE TABLE employee (
id: INT PRIMARY KEY NOT NULL,
first_name: VARCHAR(30) NOT NULL,
last_name: VARCHAR(30) NOT NULL,
role_id: INT NOT NULL,
manager_id: INT NOT NULL,
FOREIGN KEY (manager_id) 
REFERENCES employee(id) 
ON DELETE cascade
); 