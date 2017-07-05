
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
           for (var i = 0; i < res.length; i++) {
            //  itemNumber++
             console.log(
               "ITEM #" + res[i].item_id + " | ",
               "PRODUCT:" + res[i].product_name + " | ",
               "PRICE: $" + res[i].price + " | "
             );
           }
           //ask questions
           start();
    })//end connection
}//end displayItems

function start() {
  connection.query("SELECT * FROM products", function(err,res){
    if (err) throw err;
    // console.log(res)
  inquirer
    .prompt([
      {
      name: "idNo",
      type: "rawlist",
      choices: function() {
				let choiceArray = [];
				for(var i = 0; i < res.length; i++) {
					choiceArray.push(res[i].product_name);
				}
				return choiceArray;
			},
      message: "Please select the product you would like to buy."
    },
    {
      name: "noOfItem",
      type: "input",
      message: "How many would you like to buy?"
    }
  ])//end prompt
    .then(function(answer) {
        //disply the product names in the raw list to choose from
        let chosenItem;
            for (var i = 0; i < res.length; i++) {
              if (res[i].product_name === answer.idNo) {
                chosenItem = res[i];
              }
            }
        let answerQuant = parseInt(answer.noOfItem)//number of items wanted
        let stockQuant = parseInt(chosenItem.stock_quantities)//stock quantity
        let productId = parseInt(chosenItem.item_id)//product id number
        let updateQuant = stockQuant - answerQuant//math for updated quantity
        // console.log("THE NUMBER OF ITEMS LEFT: " + stockQuant)
        // console.log("THE PRODUCTS ID IS " + productId)
              // compare item_no to database and if item quantity is available
              if (answerQuant > stockQuant)
                  {
                        console.log("Insufficient Quantity!")
                        start();
                  }
                  else if (answerQuant <= stockQuant){

                        updateDatabase(productId,updateQuant);
                        // console.log("MINUS THE CUST REQUEST: " + updateQuant)

                  }
                  else {
                        console.log("Insufficient Quantity!")
                        start();
                  } //end if statement
    });//end then

function updateDatabase(answerName,quantity){
  connection.query("UPDATE products SET ? WHERE ?",
  [
    { //needs to be a typeOf number???
      stock_quantities: quantity
    },
    { //needs to be a typeOf string??
      item_id: answerName
    }
  ],function(err, res) {
        console.log(res.affectedRows + " PLEASE PAY BEFORE YOUR ORDER IS SHIPPED.")
        // re-prompt the user if they want to buy more items
        start();
    }
  );//end connection
};//end updateDatabase
})//end connection
}//end start


function databaseQuantityLeft(){
  connection.query("SELECT * FROM products", function(err,res){
    if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log(res[i].stock_quantities)
        }
  })
}
