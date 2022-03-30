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
const supertest_1 = __importDefault(require("supertest"));
const database_1 = __importDefault(require("../../database"));
const orders_model_1 = __importDefault(require("../../models/orders.model"));
const index_1 = __importDefault(require("../../index"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const products_model_1 = __importDefault(require("../../models/products.model"));
const userModel = new user_model_1.default();
const productModel = new products_model_1.default;
const orderModel = new orders_model_1.default();
const request = (0, supertest_1.default)(index_1.default);
describe('User API Endpoints', () => {
    let token, order, users_id, product_id, order_id;
    //   const order = {
    //     users_id:  "2",
    //     order_status:"active"
    //   } as order
    const user = {
        email: 'test65@test.com',
        user_name: 'test2User',
        first_name: 'Test',
        last_name: 'User',
        password: 'test123',
    };
    const product = {
        name: "product 1",
        price: 12
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield userModel.createUser(user);
        user.id = createdUser.id;
        const createdProduct = yield productModel.createProduct(product);
        product.id = createdProduct.id;
        order = {
            users_id: `${user.id}`,
            order_status: "active",
            products: [
                { products_id: `${product.id}`,
                    product_quantity: 6
                }
            ]
        };
        const createdOrder = yield orderModel.createOrder(order);
        order.order_id = createdOrder.order_id;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // clean db
        const connection = yield database_1.default.connect();
        const sql = 'DELETE FROM orders;';
        yield connection.query(sql);
        connection.release();
    }));
    describe('Test Authenticate methods', () => {
        it('should be able to authenticate to get token', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .post('/api/v1/users/authenticate')
                .set('Content-type', 'application/json')
                .send({
                email: 'test65@test.com',
                password: 'test123',
            });
            expect(res.status).toBe(200);
            console.log(res.body);
            const { email, token: userToken } = res.body.data;
            expect(email).toBe('test65@test.com');
            token = userToken;
        }));
        describe('Test CRUD API methods', () => {
            it('should create new order', () => __awaiter(void 0, void 0, void 0, function* () {
                const res = yield request
                    .post('/api/v1/orders')
                    // .set('Content-type', 'application/json')
                    // .set('Authorization', `Bearer ${token}`)
                    .send({
                    users_id: `${user.id}`,
                    order_status: "active",
                    products: [
                        { products_id: `${product.id}`, product_quantity: 6 }
                    ]
                });
                expect(res.status).toBe(200);
                const { products, users_id, order_status } = res.body.data;
                expect(products[0].products_id).toBe(`${product.id}`);
                expect(users_id).toBe(`${user.id}`);
                expect(products[0].product_quantity).toEqual(6);
                expect(order_status).toBe('active');
            }));
            it('should get list of orders', () => __awaiter(void 0, void 0, void 0, function* () {
                const res = yield request
                    .get('/api/v1/orders/')
                    .set('Content-type', 'application/json')
                    .set('Authorization', `Bearer ${token}`);
                expect(res.status).toBe(200);
                expect(res.body.data.length).toBe(2);
            }));
            it('should get order based on order ID', () => __awaiter(void 0, void 0, void 0, function* () {
                const res = yield request
                    .get(`/api/v1/orders/${order.order_id}`)
                    .set('Content-type', 'application/json')
                    .set('Authorization', `Bearer ${token}`);
                expect(res.status).toBe(200);
                expect(res.body.data.users_id).toBe(`${order.users_id}`);
                expect(res.body.data.order_status).toBe('active');
            }));
        });
    });
});
