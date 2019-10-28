var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "26Gamers8!",
    database: "bamazon_db"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    displayTable(connection)
  });


  // DISPLAYS TABLE DATA

  function displayTable(connection) {
    connection.query("SELECT * FROM products;", (err, res) => {
      if (err) throw err;
      console.table(res);
      startPrompt(connection);
    });
  }

  // BEGINS USER PROMPT, LOGS DATA

  function startPrompt(connection) {
    inquirer.prompt(
      [
          {
            name: "product",
            message: "What is the ID of the product you are searching for?",
            type: "input",
            validate: (id) => {
              if (id >= 1 && id <= 10) {
                return true;
              }
                return false;
            }
          },
          {
            name: "quantity",
            message: "How much would you like to buy?",
            type: "input"
          }
      ]
    ).then(function(error, answer) {
      if (error) {console.log("\nERROR FOUND\n" + error)};
     
     // HERE IS THE ERROR FIX THIS A S A P
     
      console.log(answer.product + " " + answer.quantity);
      connection.query("SELECT stock_quantity WHERE ?;",
          [
            {
              item_id: answer.product
            }
          ], (err, res) => {
            if (err) throw err;
            var def = res[0].stock_quantity;
            if (parseInt(def) >= parseInt(answer.quantity)) {
              connection.query("SELECT stock_quantity, price FROM products WHERE ?;",
                  [
                    {
                      item_id: answer.product
                    }
                  ], (err, res) => {
                    if (err) throw err;
                    var def = res[0].stock_quantity;
                    var sum = parseInt(res[0].price * answer.quantity);
                    console.log("You owe $" + sum + "\n");
                    updateData(parseInt(def), answer.quantity, answer.product, connection);
                  });
            } else {
              console.log("We are low on stock!\n");
              displayTable(connection);
            }
        });
    });
  }

  function updateData(def, userQ, userID, connection) {
    var query = connection.query(
        "UPDATE products SET ?;",
        [
            {
              stock_quantity: parseInt(def) - parseInt(userQ)
            },
        ], function(err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " has been updated!\n");
          displayTable(connection);
          startPrompt(connection);
        }
    )

  }