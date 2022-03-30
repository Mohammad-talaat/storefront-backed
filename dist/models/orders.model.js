"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class OrderModel {
    // create an order
    createOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            const { products } = order;
            try {
                const connection = yield database_1.default.connect();
                const query = `INSERT INTO orders (users_id,order_status) 
            values ($1, $2) 
            RETURNING order_id,users_id,order_status`;
                const result = yield connection.query(query, [
                    order.users_id,
                    order.order_status
                ]);
                const orderProductsSql = "INSERT INTO order_products (orders_id, products_id, product_quantity) VALUES($1, $2, $3) RETURNING products_id, product_quantity";
                const orderProducts = [];
                console.log(products);
                for (const product of products) {
                    const { products_id, product_quantity } = product;
                    const { rows } = yield connection.query(orderProductsSql, [result.rows[0].order_id, products_id, product_quantity]);
                    orderProducts.push(rows[0]);
                }
                connection.release();
                return Object.assign(Object.assign({}, result.rows[0]), { products: orderProducts });
            }
            catch (error) {
                throw new Error(`Unable to create order (${order.order_id}): ${error.message}`);
            }
        });
    }
    // show index (getAll products)
    getAllOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = "SELECT * FROM orders";
                const { rows } = yield connection.query(sql);
                const orderProductsSql = "SELECT products_id, product_quantity FROM order_products WHERE orders_id=($1)";
                // const orderProductsSql = "SELECT order_products.products_id, order_products.product_quantity FROM order_products JOIN orders ON order_products.orders_id = ($1);"
                const orders = [];
                for (const order of rows) {
                    const orderProductRows = yield connection.query(orderProductsSql, [order.order_id]);
                    orders.push(Object.assign(Object.assign({}, order), { products: orderProductRows.rows }));
                }
                connection.release();
                return orders;
            }
            catch (error) {
                throw new Error(`Error at retrieving orders ${error.message}`);
            }
        });
    }
    // get specific product
    getOrder(order_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT order_id, users_id,
      order_status FROM orders 
      WHERE order_id= $1 `;
                const connection = yield database_1.default.connect();
                const result = yield connection.query(sql, [order_id]);
                const orderProductsSql = "SELECT products_id, product_quantity FROM order_products WHERE orders_id=($1)";
                const { rows: orderProductRows } = yield connection.query(orderProductsSql, [order_id]);
                connection.release();
                return Object.assign(Object.assign({}, result.rows[0]), { products: orderProductRows });
            }
            catch (error) {
                throw new Error(`Could not find order ${order_id}, ${error.message}`);
            }
        });
    }
}
exports.default = OrderModel;
