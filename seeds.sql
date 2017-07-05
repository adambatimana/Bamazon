DROP TABLE IF EXISTS products;

CREATE TABLE products (
	item_id INTEGER AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(50) NULL,
	department_name VARCHAR(50) NULL,
	price DECIMAL(10,2)	NULL,
	stock_quantities INTEGER (10),
	PRIMARY KEY (item_id)

);


SELECT * FROM products;


INSERT INTO products (item_id, product_name, department_name, price, stock_quantities) VALUE (1, "Yeezy Adidas V2 350", "SHOE", 220, 2);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantities) VALUE (2, "Yeezy Adidas 750", "SHOE", 350, 1);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantities) VALUE (3, "KITH box logo tee", "CLOTHING", 80, 4);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantities) VALUE (4, "SUPREME box logo tee", "CLOTHING", 300, 2);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantities) VALUE (5, "BAPE shark hoodie", "CLOTHING", 500, 3);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantities) VALUE (6, "Jordan 11 Space Jam", "SHOE", 180, 1);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantities) VALUE (7, "Adidas UB Black/White", "SHOE", 200, 4);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantities) VALUE (8, "Adidas NMD Glitch", "SHOE", 130, 6);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantities) VALUE (9, "BAPE sweat shorts", "Clothing", 110, 5);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantities) VALUE (10, "Yeezy Adidas V2 350 zebra", "SHOE", 600, 2);
