"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const config_1 = __importDefault(require("./config"));
const database_1 = __importDefault(require("./database"));
const routes_1 = __importDefault(require("./routes"));
console.log(config_1.default);
const app = (0, express_1.default)();
const port = config_1.default.port || 3000;
//------------------  Middlewares ------------------//
app.use(express_1.default.json());
app.use((0, morgan_1.default)('common'));
app.use((0, helmet_1.default)());
//------------------ Database ---------------------//
database_1.default.connect().then(client => {
    return client.query('SELECT NOW()').then((res) => {
        client.release();
        console.log(res.rows);
    }).catch((err) => {
        client.release();
        console.log(err.stack);
    });
});
//------------------ Routes ---------------------//
app.use('/api/v1', routes_1.default);
app.get('/', (req, res) => {
    res.send('<h1>Welcome to our app</h1>');
});
app.use(error_middleware_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = app;
