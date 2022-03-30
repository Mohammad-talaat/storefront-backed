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
const products_model_1 = __importDefault(require("../products.model"));
const database_1 = __importDefault(require("../../database"));
const productModel = new products_model_1.default();
describe('#### Product Model', () => {
    describe('### Test methods exists', () => {
        it('should have an Get All product method', () => {
            expect(productModel.getAllProducts).toBeDefined();
        });
        it('should have a Get One product method', () => {
            expect(productModel.getProduct).toBeDefined();
        });
        it('should have a Create product method', () => {
            expect(productModel.createProduct).toBeDefined();
        });
    });
    describe('Test Product Model Logic', () => {
        const product = {
            name: "product 1",
            price: 12
        };
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const createdProduct = yield productModel.createProduct(product);
            product.id = createdProduct.id;
        }));
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const connection = yield database_1.default.connect();
            const sql = 'DELETE FROM products;';
            yield connection.query(sql);
            connection.release();
        }));
        it('Create product method should return a New Product', () => __awaiter(void 0, void 0, void 0, function* () {
            const createdProduct = yield productModel.createProduct({
                name: "product 2",
                price: 14
            });
            expect(createdProduct).toEqual({
                id: createdProduct.id,
                name: 'product 2',
                price: 14
            });
        }));
        it('Get all products method should return All available Products in DB', () => __awaiter(void 0, void 0, void 0, function* () {
            const products = yield productModel.getAllProducts();
            expect(products.length).toBe(3); // becauase we created another one in orderSpec
        }));
        it('Get product method should return testProduct when called with ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const returnedProduct = yield productModel.getProduct(product.id);
            expect(returnedProduct.id).toBe(product.id);
            expect(returnedProduct.name).toBe(product.name);
            expect(returnedProduct.price).toBe(product.price);
        }));
    });
});
