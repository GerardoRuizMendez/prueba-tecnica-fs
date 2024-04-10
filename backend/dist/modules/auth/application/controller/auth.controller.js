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
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_repository_1 = require("../../data/repository/auth.repository");
const token_1 = require("../../../../core/token/token");
class AuthController {
    constructor() {
        this.authRepository = new auth_repository_1.AuthRepository();
        this.token = new token_1.authToken();
    }
    logIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const match = {
                email: email,
                password: password,
            };
            try {
                const user = yield this.authRepository.sigIn(match);
                if (user == null) {
                    res.status(401).json({ message: "Invalid credentials" });
                    return;
                }
                const validatePassword = yield bcrypt_1.default.compare(password, user.contrasena);
                if (!validatePassword) {
                    res.status(401).json({ message: "Invalid credentials" });
                    return;
                }
                const accessToken = this.token.makeAccessToken(user.id, user.correo);
                res.status(200).json({ accessToken });
            }
            catch (error) {
                res.status(500).json({ error: "Error de servidor" });
            }
        });
    }
}
exports.default = AuthController;
