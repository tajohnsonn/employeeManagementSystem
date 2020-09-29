const addDepartment = name => {
  return connectionQuery("INSERT INTO department (name) VALUES (?)", [name]);
};

const getDepartments = () => {
  return connectionQuery("SELECT * FROM department");
};

const addRole = ({ title, salary, departmentId }) => {
  return connectionQuery(
    "INSERT INTO role (title, salary, department_id) VALUES (?)",
    [[title, salary, departmentId]]
  );
};

const getRoles = () => {
  return connectionQuery("SELECT * FROM role");
};

const addEmployee = ({ firstName, lastName, roleId, managerId }) => {
  return connectionQuery(
    "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)",
    [[firstName, lastName, roleId, managerId]]
  );
};

const getEmployees = () => {
  return connectionQuery("SELECT * FROM employee");
};

module.exports = {
  addDepartment,
  getDepartments,
  addRole,
  getRoles,
  addEmployee,
  getEmployees
};
