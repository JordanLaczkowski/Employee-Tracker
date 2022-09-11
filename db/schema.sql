DROP DATABASE IF EXISTS department_db;
CREATE DATABASE department_db;

USE department_db;


CREATE TABLE department (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL(10,2),
department_id INT,
FOREIGN KEY (department_id) 
REFERENCES department(id) 
ON DELETE cascade
);

CREATE TABLE employee (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
FOREIGN KEY (role_id) REFERENCES roles(id) 
ON DELETE cascade,
manager_id INT,
FOREIGN KEY (manager_id) 
REFERENCES employee(id) 
ON DELETE cascade
); 