INSERT INTO department(department_name)
VALUES("Engineering"), ("Sales"), ("Finance"), ("Legal"), ("Marketing");

INSERT INTO role(title, salary, department_id)
VALUES("Engineer", 85000, 1), ("Senior Engineer", 125000, 1), ("CFO", 350000, 3), ("Chief Counsel", 300000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Joe', 'Shmoe', 1, 2), ('Sally', 'Smith', 1, null), ('Jose', 'Martinez', 1, 2), ('Ariana', 'Lugo', 2, 2), ('Gabriel', 'Gonzalez', 4, null);
