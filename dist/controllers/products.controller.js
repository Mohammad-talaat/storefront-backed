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
exports.getProduct = exports.getAllProducts = exports.createProduct = void 0;
const products_model_1 = __importDefault(require("../models/products.model"));
const productsModel = new products_model_1.default();
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productsModel.createProduct(req.body);
        // console.log(product)
        res.json({
            status: 'success',
            data: Object.assign({}, product),
            message: 'product created successfully',
        });
    }
    catch (err) {
        next(err);
    }
});
exports.createProduct = createProduct;
const getAllProducts = (_, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productsModel.getAllProducts();
        res.json({
            status: 'success',
            data: products,
            message: 'Products retrieved successfully',
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllProducts = getAllProducts;
const getProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productsModel.getProduct(req.params.id);
        res.json({
            status: 'success',
            data: product,
            message: 'product retrieved successfully',
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getProduct = getProduct;
