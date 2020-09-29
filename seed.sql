INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Finance");
INSERT INTO department (name) VALUES ("Legal");
INSERT INTO department (name) VALUES ("Engineering");

INSERT INTO role (title, salary, department_id) VALUES ("Sales Lead", 70000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Finance Lead", 50000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Legal Lead", 90000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Lead Developer", 750000, 4);
  
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("John", "Doe", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Foo", "Bar", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Anto", "Dee", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Yoo", "Yee", 4, null);