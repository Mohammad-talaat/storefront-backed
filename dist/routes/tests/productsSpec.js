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
const index_1 = __importDefault(require("../../index"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const products_model_1 = __importDefault(require("../../models/products.model"));
const productModel = new products_model_1.default();
const userModel = new user_model_1.default();
const request = (0, supertest_1.default)(index_1.default);
let token = '';
describe('### Products API Endpoints', () => {
    const product = {
        name: "product 1",
        price: 12
    };
    const user = {
        email: 'test@test.com',
        user_name: 'testUser',
        first_name: 'Test',
        last_name: 'User',
        password: 'test123',
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield userModel.createUser(user);
        user.id = createdUser.id;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // clean db
        const connection = yield database_1.default.connect();
        const sql = 'DELETE FROM users;';
        yield connection.query(sql);
        connection.release();
    }));
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const createdProduct = yield productModel.createProduct(product);
        product.id = createdProduct.id;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // clean db
        const connection = yield database_1.default.connect();
        const sql = 'DELETE FROM products;';
        yield connection.query(sql);
        connection.release();
    }));
    describe('### Test Authenticate methods', () => {
        it('should be able to authenticate to get token', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .post('/api/v1/users/authenticate')
                .set('Content-type', 'application/json')
                .send({
                email: "test@test.com",
                password: 'test123',
            });
            expect(res.status).toBe(200);
            console.log(res.body);
            const { email, token: userToken } = res.body.data;
            expect(email).toBe('test@test.com');
            token = userToken;
        }));
    });
});
