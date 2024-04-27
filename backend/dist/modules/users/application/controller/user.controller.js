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
const user_repository_1 = __importDefault(require("../../data/repository/user.repository"));
class UserController {
    constructor() {
        this.UserRepository = new user_repository_1.default();
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.UserRepository.getAllUsers();
                res.status(200).json(users);
            }
            catch (error) {
                console.error("Error al obtener usuarios:", error);
                res.status(500).json({ message: "Error interno del servidor " + error });
            }
        });
    }
    getRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.UserRepository.getRoles();
                res.status(200).json(users);
            }
            catch (error) {
                console.error("Error al obtener roles:", error);
                res.status(500).json({ message: "Error interno del servidor " + error });
            }
        });
    }
    getCurrentUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.userId);
                const user = yield this.UserRepository.getCurrentUser(userId);
                if (user) {
                    res.status(200).json(user);
                    return;
                }
                res.status(404).json({ message: "Usuario no encontrado" });
            }
            catch (error) {
                console.error("Error al obtener usuario por ID:", error);
                res.status(500).json({ message: "Error interno del servidor" });
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.UserRepository.createUser(req.body);
                if (result) {
                    res.status(201).json({ mesagge: "Usuario creado correctamente" });
                    return;
                }
                res.status(400).json({ mesagge: "Error en la creación del usuario" });
            }
            catch (error) {
                console.error("Error al crear usuario:", error);
                res.status(500).json({ message: "Error interno del servidor" });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.id);
                const result = yield this.UserRepository.updateUser(userId, req.body);
                if (result) {
                    res.status(200).json(result);
                    return;
                }
                res.status(400).json({ message: "Usuario no existente" });
            }
            catch (error) {
                console.error("Error al actualizar usuario:", error);
                res.status(500).json({ message: "Error interno del servidor" });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.id);
                const result = yield this.UserRepository.deleteUser(userId);
                if (result) {
                    res.status(200).json({ message: "Usuario eliminado correctamente" });
                    return;
                }
                res.status(404).json({ message: "Usuario no encontrado" });
            }
            catch (error) {
                console.error("Error al eliminar usuario:", error);
                res.status(500).json({ message: "Error interno del servidor" });
            }
        });
    }
}
exports.default = UserController;
