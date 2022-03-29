
/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE order_products(
    product_quantity integer NOT NULL ,
    orders_id uuid REFERENCES orders (order_id) ON DELETE CASCADE ON UPDATE CASCADE,
    products_id uuid REFERENCES products (id) ON DELETE CASCADE ON UPDATE CASCADE
);