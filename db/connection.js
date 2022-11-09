const mysql = require('mysql2');

// add password and change database name here
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employeetracker'
  }
);

module.exports = db;