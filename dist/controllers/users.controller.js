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
exports.authenticateUser = exports.deleteUser = exports.getAllUsers = exports.getUser = exports.updateUser = exports.create = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const userModel = new user_model_1.default();
//----------------------- create user function ---------------------------------------------- //
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel.createUser(req.body);
        res.json({
            status: 'success',
            data: Object.assign({}, user),
            message: 'User is created successfully!'
        });
    }
    catch (error) {
        next(error);
    }
});
exports.create = create;
//----------------------- update user function ---------------------------------------------- //
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel.updateUser(req.params.id, req.body);
        res.json({
            status: 'success',
            data: user,
            message: 'User updated successfully',
        });
    }
    catch (err) {
        next(err);
    }
});
exports.updateUser = updateUser;
//----------------------- get user function ------------------------------------------------- //
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel.getUser(req.params.id);
        res.json({
            status: 'success',
            data: user,
            message: 'User retrieved successfully',
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getUser = getUser;
//----------------------- get all users function -------------------------------------------- //
const getAllUsers = (_, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel.getAllUsers();
        res.json({
            status: 'success',
            data: users,
            message: 'Users retrieved successfully',
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllUsers = getAllUsers;
//----------------------- delete user function ---------------------------------------------- //
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel.deleteUser(req.params.id);
        res.json({
            status: 'success',
            data: user,
            message: 'User deleted successfully',
        });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteUser = deleteUser;
//----------------------- authenticate user function ---------------------------------------- //
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel.authenticateUser(email, password);
        const token = jsonwebtoken_1.default.sign({ user }, config_1.default.jwtToken);
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'the username and password do not match please try again',
            });
        }
        return res.json({
            status: 'success',
            data: Object.assign(Object.assign({}, user), { token }),
            message: 'user authenticated successfully',
        });
    }
    catch (err) {
        return next(err);
    }
});
exports.authenticateUser = authenticateUser;
