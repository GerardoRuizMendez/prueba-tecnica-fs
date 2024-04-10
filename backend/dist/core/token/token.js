"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class authToken {
    makeAccessToken(id, email) {
        const AccessToken = jsonwebtoken_1.default.sign({ id, email }, process.env.SECRET || "placeholderToken", { expiresIn: 60 * 60 });
        return AccessToken;
    }
    decodedAccessToken(token) {
        const decodedToken = jsonwebtoken_1.default.decode(token);
        return decodedToken._id;
    }
    verifyAccessToken(token) {
        try {
            jsonwebtoken_1.default.verify(token, process.env.SECRET || "placeholderToken");
            return true;
        }
        catch (_a) {
            return false;
        }
    }
}
exports.authToken = authToken;
