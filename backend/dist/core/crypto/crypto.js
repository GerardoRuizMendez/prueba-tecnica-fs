"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cryptoStrategy = void 0;
const crypto = __importStar(require("crypto"));
class cryptoStrategy {
    constructor() { }
    encrypt(target) {
        const secret = process.env.CRYPTO_TOKEN || "placeholderCrypto";
        const salt = Buffer.from(process.env.SECRET_SALT_TOKEN || "^G#z1K]@m<5*yYTk", "utf8");
        const key = crypto.pbkdf2Sync(secret, salt, 100000, 32, "sha256");
        const algorithm = "aes-256-cbc";
        const iv = Buffer.from(process.env.SECRET_SALT_TOKEN || "^G#z1K]@m<5*yYTk", "utf8");
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        let encrypted = cipher.update(target, "utf8", "hex");
        encrypted += cipher.final("hex");
        return encrypted;
    }
    decrypt(target) {
        try {
            const secret = process.env.SECRET_TOKEN || "placeholderCrypto";
            const salt = process.env.SECRET_SALT_TOKEN || "^G#z1K]@m<5*yYTk";
            const key = crypto.pbkdf2Sync(secret, salt, 100000, 32, "sha256");
            const algorithm = "aes-256-cbc";
            const iv = Buffer.from(process.env.SECRET_SALT_TOKEN || "^G#z1K]@m<5*yYTk", "utf8");
            const decipher = crypto.createDecipheriv(algorithm, key, iv);
            let decrypted = decipher.update(target, "hex", "utf8");
            decrypted += decipher.final("utf8");
            return decrypted;
        }
        catch (error) {
            console.error("Error during decryption:", error);
            throw error;
        }
    }
}
exports.cryptoStrategy = cryptoStrategy;
