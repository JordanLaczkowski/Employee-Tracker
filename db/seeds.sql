INSERT INTO department (first_name)
VALUES ("Sales Lead"),
       ("Salesperson"),
       ("Lead Engineer"),
       ("Software Engineer"),
       ("Account Manager"),
       ("Accountant"),
       ("Legal Team Lead"),
       ("Lawyer");
    
INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),
       ("Salesperson", 80000, 2),
       ("Lead Engineer", 150000, 3),
       ("Software Engineer", 120000, 4),
       ("Account Manager", 160000, 5),
       ("Accountant", 125000, 6),
       ("Legal Team Lead", 250000, 7),
       ("Lawyer", 190000, 8);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Malone", 1, NULL),
       ("Nikola", "Jokic", 2, 1),
       ("Jamal", "Murray", 3, NULL),
       ("Zeke", "Nnaji", 4, 3),
       ("Aaron", "Gordon", 5, NULL),
       ("Bones", "Hyland", 6, 5),
       ("Jeff", "Green", 7, NULL),
       ("Marcus", "Howard", 8, 7);