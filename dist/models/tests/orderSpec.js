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
const orders_model_1 = __importDefault(require("../orders.model"));
const database_1 = __importDefault(require("../../database"));
const products_model_1 = __importDefault(require("../products.model"));
const user_model_1 = __importDefault(require("../user.model"));
const userModel = new user_model_1.default();
const productModel = new products_model_1.default();
const orderModel = new orders_model_1.default();
describe('#### Order Model', () => {
    describe('Test methods exists', () => {
        it('should have an Get all available orders method', () => {
            expect(orderModel.getAllOrders).toBeDefined();
        });
        it('should have a Get One order method', () => {
            expect(orderModel.getOrder).toBeDefined();
        });
        it('should have a Create order method', () => {
            expect(orderModel.createOrder).toBeDefined();
        });
    });
    describe('### Test Order Model Logic', () => {
        const user = {
            email: 'test2@test.com',
            user_name: 'test2User',
            first_name: 'Test',
            last_name: 'User',
            password: 'test123',
        };
        const product = {
            name: "product 1",
            price: 12
        };
        let order;
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
        }));
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const connection = yield database_1.default.connect();
            const sql = 'DELETE FROM orders;';
            yield connection.query(sql);
            connection.release();
        }));
        it('Create method should return a New order', () => __awaiter(void 0, void 0, void 0, function* () {
            const createdOrder = yield orderModel.createOrder(order);
            expect(createdOrder).toEqual(Object.assign({ order_id: createdOrder.order_id }, order));
        }));
        it('Get all orders method should return All available orders in DB', () => __awaiter(void 0, void 0, void 0, function* () {
            const orders = yield orderModel.getAllOrders();
            expect(orders.length).toBe(1);
        }));
        it('Get order method should return test order when called with order ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const createdOrder2 = yield orderModel.createOrder(order);
            const returnedOrder = yield orderModel.getOrder(order.order_id);
            expect(returnedOrder.order_id).toBe(order.order_id); //passess the test
        }));
    });
});
