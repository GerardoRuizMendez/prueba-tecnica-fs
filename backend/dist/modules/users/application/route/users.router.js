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
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const auth_middleware_controller_1 = require("../../../auth/application/controller/auth.middleware.controller");
const userRouter = (0, express_1.Router)();
const userController = new user_controller_1.default();
const authMiddlewareController = new auth_middleware_controller_1.AuthMiddlewareController();
userRouter.get("/api/v1/all-users", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    authMiddlewareController.checkToken(req, res, next);
}), (req, res) => {
    userController.getAllUsers(req, res);
});
userRouter.get("/api/v1/get-roles", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    authMiddlewareController.checkToken(req, res, next);
}), (req, res) => {
    userController.getroles(req, res);
});
userRouter.get("/api/v1/get-user/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    authMiddlewareController.checkToken(req, res, next);
}), (req, res) => {
    userController.getUserById(req, res);
});
userRouter.post("/api/v1/create-user", (req, res) => {
    userController.createUser(req, res);
});
userRouter.put("/api/v1/update/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    authMiddlewareController.checkToken(req, res, next);
}), (req, res) => {
    userController.updateUser(req, res);
});
userRouter.delete("/api/v1/delete/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    authMiddlewareController.checkToken(req, res, next);
}), (req, res) => {
    userController.deleteUser(req, res);
});
exports.default = userRouter;
