const cTable = require("console.table");
const mysql = require("mysql");
const inquirer = require("inquirer");
const util = require("util");
const {
  addDepartment,
  getDepartments,
  addRole,
  getRoles,
  addEmployee,
  getEmployees
} = require("./queries");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tayjo0926",
  database: "managementSystem"
});

connection.connect(async err => {
  if (err) {
    console.error("error connecting to database: " + err.stack);
    return;
  }
  console.log("connected to database!");
  const connectionQuery = util.promisify(connection.query).bind(connection);
  global.connectionQuery = connectionQuery;

  //.then.catch
  //async/await
  async function todo() {
    try {
      const todoAnswer = await inquirer.prompt({
        type: "list",
        name: "todo",
        message: "What do you want to do?",
        choices: [
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          new inquirer.Separator(),
          "View all Departments",
          "View all Roles",
          "View all Employees",
          new inquirer.Separator(),
          "Update a Department",
          "Update a Role",
          "Update an Employee"
        ],
        loop: false
      });
      switch (todoAnswer.todo) {
        case "Add a Department":
          const { department } = await inquirer.prompt({
            type: "input",
            name: "department",
            message: "What is the name of the department?"
          });
          addDepartment(department).then(() => {
            todo();
            return console.log("Added a new department", department);
          });
        case "View all Departments":
          const allDepartments = await getDepartments();
          console.table(allDepartments);
          return todo();
        case "Add a Role":
          const { title, salary, departmentId } = await inquirer.prompt([
            {
              type: "input",
              name: "title",
              message: "What is the title of the role?"
            },
            {
              type: "input",
              name: "salary",
              message: "What is the salary for the role?",
              validate: salary =>
                !isNaN(salary) ? true : "Please provide a valid salary(number)"
            },
            {
              type: "list",
              name: "departmentId",
              message: "select a department",
              choices: async () => {
                const departments = await getDepartments();
                return departments.map(d => ({ name: d.name, value: d.id }));
              }
            }
          ]);
          await addRole({ title, salary, departmentId });
          return console.log("Role added!");
        case "View all Roles":
          const allRoles = await getRoles();
          console.table(allRoles);
          return todo();
        case "Add an Employee":
          const {
            firstName,
            lastName,
            roleId,
            managerId
          } = await inquirer.prompt([
            {
              type: "input",
              name: "firstName",
              message: "What is the Employee's first name?"
            },
            {
              type: "input",
              name: "lastName",
              message: "What is the Employee's last name?"
            },
            {
              type: "list",
              name: "roleId",
              message: "select a Role",
              choices: async () => {
                const roles = await getRoles();
                return roles.map(d => ({ name: d.title, value: d.id }));
              }
            },
            {
              type: "list",
              name: "managerId",
              message: "select a Manager",
              choices: async () => {
                const employees = await getEmployees();
                return employees.map(d => ({
                  name: `${d.first_name} ${d.last_name}`,
                  value: d.id
                }));
              }
            }
          ]);
          await addEmployee({ firstName, lastName, roleId, managerId });
          return console.log("Employee added!");
        case "View all Employees":
          const allEmployees = await getEmployees();
          return console.table(allEmployees);
      }
    } catch (err) {
      console.log("an error occuredd==>>>", err);
    }
  }
  todo();
});
