/* Replace with your SQL commands */

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE orders(
order_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
users_id uuid REFERENCES users (id) NOT NULL,
order_status VARCHAR(20) NOT NULL
);