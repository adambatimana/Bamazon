
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

  connection.query("SELECT * FROM products", function(err,res){
    if (err) throw err;
          // PRINT ALL ITEMS
           for (var i = 0; i < res.length; i++) {
             console.log(
               "ITEM #" + res[i].item_id,
               "PRODUCT: " + res[i].product_name,
               "PRICE: $" + res[i].price
             );
           }
  })
});

// function start() {
//   inquirer
//     .prompt(
//       {
//       name: "idNo",
//       type: "input",
//       message: "Please insert ID number of product you would like to buy"
//     },
//     {
//       name: "noOfItem",
//       type: "input",
//       message: "How many would you like to buy?"
//     }
//   )//end prompt
//     .then(function(answer) {
//         if (answer.idNo == "item" && answer.noOfItem > quantity of item ) {
//
//         }
//
//
//
//
//       // // based on their answer, user, marketing manager or ?
//       // if (answer.idNo.toUpperCase() === "POST") {
//       //   //function of user
//       // }
//       // else {
//       //   //function of user
//       //
//       // }
//     });
// }
