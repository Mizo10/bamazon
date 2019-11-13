alter user 'root'@'localhost' identified WITH mysql_native_password BY 'All@hisda1';

DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT(30),
  stock_quantity INT (100),
  PRIMARY KEY (id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chips", "Food", 2, 20),("Cereal", "Food", 3, 30),
("candies", "Food", 1, 40),("Soda", "Drinks", 1, 40 ),("Juice", "Drinks", 2, 45)
,("Water", "Drinks", 1, 35),("Shampoo", "Hygiene", 3, 40),("conditioner", "Hygiene", 3, 30),
("Body Wash", "Hygiene", 3, 90),("Deoderant", "Hygiene", 2, 80);

