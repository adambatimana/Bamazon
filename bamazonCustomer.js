
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
    // let itemNumber = -1
          // PRINT ALL ITEMS
           for (var i = 0; i < res.length; i++) {
            //  itemNumber++
             console.log(
               "ITEM #" + res[i].item_id + " | ",
               "PRODUCT:" + res[i].product_name + " | ",
               "PRICE: $" + res[i].price + " | "
              //  "ENTER " + itemNumber + " TO PURCHASE"
             );
           }
           //ask questions
           start();
    })//end connection
}//end displayItems

function start() {
  connection.query("SELECT * FROM products", function(err,res){
  inquirer
    .prompt([
      {
      name: "idNo",
      type: "rawlist",
      choices: function() {
				var choiceArray = [];
				for(var i = 0; i < res.length; i++) {
					choiceArray.push(res[i].item_id);
				}
				return choiceArray;
			},
      message: "Please insert the number of the product you would like to buy."
    },
    {
      name: "noOfItem",
      type: "input",
      message: "How many would you like to buy?"
    }
  ])//end prompt
    .then(function(answer) {
        if (err) throw err;
        let choseItem;
        let answerIdnum = answer.idNo
        let answerQuant = parseInt(answer.noOfItem)
        let stockQuant = parseInt(res[parseInt(answer.idNo)].stock_quantities)
        let updateQuant = stockQuant - answerQuant
          // compare item_no to database and if item quantity is available
          if (updateQuant <= 0)
          {
            console.log("Insufficient Quantity!")
            start();
          }
          else {
            updateDatabase(answerIdnum,updateQuant);
          }//end else

          if(res[i].item_id === answer.choice) {
      			chosenItem = res[i];
      		}
    });//end then

function updateDatabase(answerId,quantity){
  connection.query("UPDATE products SET ? WHERE ?",
  [
    {
      stock_quantities: quantity
    },
    {//update to line up itemid with anser id num
      item_id: answerId
    }
  ],
      function(err, res) {
        if (err) throw err;
        console.log("PLEASE PAY BEFORE YOUR ORDER IS SHIPPED.")
        // re-prompt the user if they want to buy more items
        start();
      }
  );//end connection
};//end updateDatabase
})//end connection
}//end start


function databaseQuantityLeft(){
  connection.query("SELECT * FROM products", function(err,res){
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].stock_quantities)
    }
  })
}
