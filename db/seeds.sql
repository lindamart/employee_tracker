use employeeTracker_db

INSERT INTO department (name)
VALUES
('Engineering'),
('Finance'),
('Legal'),
('IMT'),
('Human Resources');

SELECT * FROM department;

INSERT INTO roles (title, salary, department_id)
  VALUES 
  ('CEO', 1000000, 12),
  ('Director of HR', 300000, 12),
  ('Director of IMT', 200000, 12),
  ('HR Manager', 300000, 7234),
  ('Engineering Manager', 300000, 8234),
  ('Engineering Assistant', 150000, 8234);

  SELECT * FROM roles;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES
  ('Garcia', 'Jennifer', 1,1),  
  ('Melendez', 'Edward', 2,1),
  ('Jones', 'Alex', 3,1),
  ('Martinez', 'Sylvia',4,1),
  ('Velez', 'Joel', 5, 2),
  ('Phillips' , 'Tony', 6,2),
  ('Pullum', 'Pete', 7,2),
  ('Rivera', 'Lynnette', 8,2),
 

SELECT * FROM employee;