INSERT INTO department (id, first_name)
VALUES (1, "Sales Lead"),
       (2, "Salesperson"),
       (3, "Lead Engineer"),
       (4, "Software Engineer"),
       (5, "Account Manager"),
       (6, "Accountant"),
       (7, "Legal Team Lead"),
       (8, "Lawyer");
    
INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Sales Lead", 100000, 1),
       (2, "Salesperson", 80000, 2),
       (3, "Lead Engineer", 150000, 3),
       (4, "Software Engineer", 120000, 4),
       (5, "Account Manager", 160000, 5),
       (6, "Accountant", 125000, 6),
       (7, "Legal Team Lead", 250000, 7),
       (8, "Lawyer", 190000, 8);


INSERT INTO role (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Malone", 1, NULL),
       ("Nikola", "Jokic", 2, 1),
       ("Jamal", "Murray" 3, NULL),
       ("Zeke", "Nnaji", 4, 3),
       ("Aaron", "Gordon", 5, NULL),
       ("Bones", "Hyland", 6, 5),
       ("Jeff", "Green", 7, NULL),
       ("Marcus", "Howard", 8, 7);