var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "26Gamers8!",
    database: "bamazon_db"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.table(res);
        console.log("\n\n");
    })
    startPrompt();
  });

  function startPrompt() {
        inquirer.prompt([
          {name: "product",
           message: "What is the ID of the product you are searching for?",
           type: "input"}
      ]).then(function(error, answer) {
            if (error) throw error;
            console.log(answer);

      })
  }