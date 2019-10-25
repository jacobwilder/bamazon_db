DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2),
  stock_quantity INT(5),
  PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("soap", "toiletries", 4.5, 500), 
       ("toothpaste", "toiletries", 6, 1000), 
       ("shampoo", "toiletries", 5, 500), 
       ("drone", "technology", 500, 25),
       ("rocky dvd", "entertainment", 10, 500),
       ("beatles cd", "music", 15, 1000),
       ("call of duty", "technology", 60, 5000),
       ("captain crunch", "food", 10, 1000),
       ("fullhouse boxset", "entertainment", 25, 800),
       ("above the moon cd", "music", 15, 1000);

SELECT * FROM products;
