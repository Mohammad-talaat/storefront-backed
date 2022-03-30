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
exports.getOrder = exports.getAllOrders = exports.createOrder = void 0;
const orders_model_1 = __importDefault(require("../models/orders.model"));
const orderModel = new orders_model_1.default();
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield orderModel.createOrder(req.body);
        res.json({
            status: 'success',
            data: Object.assign({}, order),
            message: 'order created successfully',
        });
    }
    catch (err) {
        next(err);
    }
});
exports.createOrder = createOrder;
const getAllOrders = (_, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orderModel.getAllOrders();
        res.json({
            status: 'success',
            data: orders,
            message: 'orders retrieved successfully',
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllOrders = getAllOrders;
const getOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield orderModel.getOrder(req.params.id);
        res.json({
            status: 'success',
            data: order,
            message: 'order retrieved successfully',
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getOrder = getOrder;
