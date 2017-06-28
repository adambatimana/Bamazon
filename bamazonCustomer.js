
//====================================
//          REQUIRED MODULES
//====================================
const inquirer = require('inquirer');
const mysql = require('mysql');
let updateQuant;
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
  displayItems();
});

function displayItems(){
  connection.query("SELECT * FROM products", function(err,res){

    if (err) throw err;
    let itemNumber = -1
          // PRINT ALL ITEMS
           for (var i = 0; i < res.length; i++) {

             itemNumber++
             console.log(
               "ITEM #" + res[i].item_id + " | ",
               "PRODUCT:" + res[i].product_name + " | ",
               "PRICE: $" + res[i].price + " | ",
               "ENTER " + itemNumber + " TO BUY"
             );
           }
           //ask questions
           start();

    })

}

function start() {
  connection.query("SELECT * FROM products", function(err,res){

  inquirer
    .prompt([
      {
      name: "idNo",
      type: "input",
      message: "Please insert ID number of product you would like to buy"

    },

    {
      name: "noOfItem",
      type: "input",
      message: "How many would you like to buy?"

    }
  ])//end prompt
    .then(function(answer) {
        if (err) throw err;
        let answerIdno = answer.idNo
        let answerQuant = answer.noOfItem
        let stockQuant = res[parseInt(answer.idNo)].stock_quantities
        let updateQuant = stockQuant - answerQuant
          // compare item_no to database and if item quantity is available
          if (answerQuant > stockQuant || stockQuant == 0)
          {
            console.log("Insufficient Quantity!")
          }
          else {
            updateDatabase(answerIdno,updateQuant);
          }//end else
    });//end then



function updateDatabase(answer,quantity){

  connection.query("UPDATE products SET ? WHERE ?",
    {
      stock_quantities: quantity
    },
    {
      item_id: answer
    },
      function(err, res) {
        if (err) throw err;
        console.log("Please pay before your order is sent out")
        // re-prompt the user if they want to buy more items
        start();
      }
  );//end connection
};
})//end connection
}//end start
