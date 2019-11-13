var mysql = require("mysql");
var inquirer = require("inquirer");
var ctable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "All@hisda1",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    showproduct();

});

function showproduct() {
    connection.query("SELECT * FROM products", function (err, res) {
        console.table(res);
        promptProduct();
    })
}

function promptProduct() {
    inquirer.prompt([{
        name: "productID",
        type: "input",
        message: "Please choose a product ID you want to purchase?"
    }, {
        name: "productQuantity",
        type: "input",
        message: "How many units of the product you would like to purchase?"
    }]).then(function (answer) {
        var product = answer.productID;
        var quantity = answer.productQuantity
        var userCost;
        var updateQuantity;
        connection.query("SELECT * FROM products WHERE ?", { id: product }, function (err, res) {
            if (err) throw err;
            if (quantity > res[0].stock_quantity) {
                console.log("Quantity exceeds whats in stock")
            } else {
                userCost = quantity * res[0].price;
                updateQuantity = res[0].stock_quantity - quantity;
                console.log(`
                You have purchased ${quantity} of ${res[0].product_name}
                Your Total is ${userCost}`);
                connection.query("update products set ? where ?", [{stock_quantity: updateQuantity},{id: product}],function (err, res){
                    if (err) throw err;
                    console.log("Inventory updated.") 
                })

            }
            connection.end();
        })
    });
};