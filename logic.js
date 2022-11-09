const inquirer = require('inquirer');
const fs = require('fs');
const db = require('./db/connection');
const cTable = require('console.table');
const { rawListeners } = require('process');

function showResults(directory) {
  if (directory === 'View All Employees') {
    allEmployees(directory);
  } else if (directory === 'View All Roles') {
    allRoles(directory);
  } else if (directory === 'View All Departments') {
    allDepartments(directory);
  } else if (directory === 'Add Employee') {
    addEmployee(directory);
  } else if (directory === 'Add Role') {
    addRole(directory);
  } else if (directory === 'Add Department') {
    addDepartment(directory);
  } else if (directory === 'Update Employee Role') {
    updateEmployeeRole(directory);
  }
};

function allEmployees() {
  const sql = `SELECT employees.id AS id,
  employees.first_name AS first_name,
  employees.last_name AS last_name,
  roles.title AS role,
  departments.name AS department
  FROM employees
  LEFT JOIN roles ON employees.role = roles.id
  LEFT JOIN departments ON roles.department = departments.id`;
  db.query(sql, (err, rows) => {
    console.log(err);
    console.table(rows);
    initializeProgram();
  })
};

function allRoles() {
  const sql = `SELECT roles.*, departments.name
  AS department
  FROM roles
  LEFT JOIN departments
  ON roles.department = departments.id`;
  db.query(sql, (err, rows) => {
    console.log(err);
    console.table(rows);
    initializeProgram();
  })
};

function allDepartments() {
  const sql = `SELECT * FROM departments`;
  db.query(sql, (err, rows) => {
    console.log(err);
    console.table(rows);
    initializeProgram();
  })
};

function addEmployee() {
  const sql2 = `SELECT id, title FROM roles`;
  db.query(sql2, (err, rows) => {
    let roles = rows.map(function (row) {
      return { name: row.title, value: row.id }
    })
    const sql2 = `SELECT employees.*, departments.name AS department
  FROM employees
  LEFT JOIN roles ON employees.role = roles.id
  LEFT JOIN departments ON roles.department = departments.id
  `;
    db.query(sql2, (err, rows) => {
      let managers = rows.filter(function (row) {
        if (row.department === 'Management') {
          return true;
        }
      })
      let managersList = managers.map(function (manager) {
        return { name: manager.first_name + ' ' + manager.last_name, value: manager.id }
      })
      inquirer
        .prompt([
          {
            type: 'text',
            name: 'firstName',
            message: 'What is the first name of the new Employee?',
            validate: input => {
              if (input) {
                return true;
              } else {
                console.log('You must enter a first name for them!');
                return false;
              }
            }
          },
          {
            type: 'text',
            name: 'lastName',
            message: 'What is the last name of the new Employee?',
            validate: input => {
              if (input) {
                return true;
              } else {
                console.log('You must enter a last name for them!');
                return false;
              }
            }
          },
          {
            type: 'list',
            name: 'selectRole',
            message: 'What is their role?',
            choices: roles
          },
          {
            type: 'list',
            name: 'selectManager',
            message: 'Who is their manager?',
            choices: managersList
          },
        ])
        .then(({ firstName, lastName, selectRole, selectManager }) => {
          const sql = `INSERT INTO employees (first_name, last_name, role, manager_id)
                       VALUES (?,?,?,?)`;
          const params = [firstName, lastName, selectRole, selectManager];
          db.query(sql, params, (err, result) => {
            console.log('New Employee Added to Database!');
            initializeProgram();
          })
        })
    })
  })
}

function addRole() {
  const sql2 = `SELECT id, name FROM departments`;
  db.query(sql2, (err, rows) => {
    let departments = rows.map(function (row) {
      return { name: row.name, value: row.id }
    })
    inquirer
      .prompt([
        {
          type: 'text',
          name: 'roleName',
          message: 'What is the name of the role?',
          validate: input => {
            if (input) {
              return true;
            } else {
              console.log('You must enter a name for the role!');
              return false;
            }
          }
        },
        {
          type: 'list',
          name: 'salary',
          message: 'Choose a salary this role is offered',
          choices: [35000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 110000, 125000, 150000, 200000, 250000]
        },
        {
          type: 'list',
          name: 'departmentSelection',
          message: 'Which department is this role apart of?',
          choices: departments
        }
      ])
      .then(({ roleName, salary, departmentSelection }) => {
        const sql = `INSERT INTO roles (title, salary, department)
      VALUES (?,?,?)`;
        const params = [roleName, salary, departmentSelection];
        db.query(sql, params, (err, result) => {
          console.log('Role was added to database!');
          initializeProgram();
        })
      })
  })
};

function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'text',
        name: 'departmentName',
        message: 'What is the name of the Department?',
        validate: input => {
          if (input) {
            return true;
          } else {
            console.log('You must enter a name for the role!');
            return false;
          }
        }
      }
    ])
    .then(({ departmentName }) => {
      const sql = `INSERT INTO departments (name)
      VALUES (?)`;
      const params = [departmentName];
      db.query(sql, params, (err, result) => {
        console.log('New Department was added to the database!');
        initializeProgram();
      })
    })
};

function updateEmployeeRole() {
  const sql = `SELECT employees.*, roles.id
  AS role,
  roles.title AS role_title
  FROM employees
  LEFT JOIN roles ON employees.role = roles.id`;

  db.query(sql, (err, rows) => {
    let employeeList = rows.map(function (row) {
      return { name: row.first_name + ' ' + row.last_name, value: row.id }
    })
    const sql2 = `SELECT id, title FROM roles`;
    db.query(sql2, (err, rows) => {
      let roles = rows.map(function (row) {
        return { name: row.title, value: row.id }
      })
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'selectEmployee',
            message: 'Select the employee whose profile you would like to update',
            choices: employeeList
          },
          {
            type: 'list',
            name: 'selectNewRole',
            message: 'Select the new role for this employee',
            choices: roles
          }
        ])
        .then(({ selectEmployee, selectNewRole }) => {
          const sql = `UPDATE employees SET role = ? WHERE id = ?`
          const params = [selectNewRole, selectEmployee];
          db.query(sql, params, (err, result) => {
            console.log('Employee Profile Updated');
            initializeProgram();
          })
        })
    })
  })
};

module.exports = showResults;