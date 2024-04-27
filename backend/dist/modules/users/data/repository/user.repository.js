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
const user_datasource_1 = __importDefault(require("../datasource/user.datasource"));
class UserRepository {
    constructor() {
        this.databaseDataSource = new user_datasource_1.default();
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.databaseDataSource.getAllUsers();
        });
    }
    getRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.databaseDataSource.getRoles();
        });
    }
    getCurrentUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.databaseDataSource.getCurrentUser(userId);
        });
    }
    createUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.databaseDataSource.createUser(newUser);
        });
    }
    updateUser(userId, updatedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.databaseDataSource.updateUser(userId, updatedUser);
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.databaseDataSource.deleteUser(userId);
        });
    }
}
exports.default = UserRepository;
