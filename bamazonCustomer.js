
//====================================
//          REQUIRED MODULES
//====================================


const inquirer = require('inquirer');
const mysql = require('mysql');


//====================================
//          CONNECT TO MYSQL
//====================================
const connection = mysql.createConnection({
  host: 'localhost',
  port: 8889,
  user: 'root',
  password: 'root',
  database: 'Bamazon'
});

//connect mySql and display connection
connection.connect(function(err) {
  if(err) throw err;

  console.log(`connected as id ${ connection.threadId }`);
  // afterConnection();
});
