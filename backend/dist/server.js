"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_router_1 = __importDefault(require("./modules/users/application/route/users.router"));
const auth_router_1 = __importDefault(require("./modules/auth/application/route/auth.router"));
const server = (0, express_1.default)();
server.set("port", 3000);
server.use(express_1.default.json());
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
    if (req.method === "OPTIONS") {
        res.sendStatus(200);
    }
    else {
        next();
    }
});
//Router
server.use(users_router_1.default);
server.use(auth_router_1.default);
exports.default = server;
