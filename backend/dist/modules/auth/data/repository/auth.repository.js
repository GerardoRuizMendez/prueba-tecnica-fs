"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const auth_datasource_1 = __importDefault(require("../datasource/auth.datasource"));
class AuthRepository {
    constructor() {
        this.dataSource = new auth_datasource_1.default();
    }
    sigIn(credentials) {
        return this.dataSource.signIn(credentials);
    }
}
exports.AuthRepository = AuthRepository;
