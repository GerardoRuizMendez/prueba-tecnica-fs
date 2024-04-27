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
const pg_1 = require("pg");
const bcrypt_1 = __importDefault(require("bcrypt"));
class DatabaseDataSource {
    constructor() {
        this.pool = new pg_1.Pool({
            connectionString: process.env.DATABASE_URL,
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            try {
                const result = yield client.query("SELECT u.id, u.Nombre ,u.Apellido_Paterno,u.Apellido_Materno,u.Correo,u.Numero_Telefonico,u.Fecha_Nacimiento,r.Nombre AS Rol FROM Usuario u JOIN Rol r ON u.Rol_id = r.id");
                return result.rows;
            }
            catch (error) {
                console.error("Error al crear usuario:", error);
                return [];
            }
            finally {
                client.release();
            }
        });
    }
    getRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            try {
                const result = yield client.query("SELECT * FROM rol");
                return result.rows;
            }
            catch (error) {
                console.error("Error al obtener roles:", error);
                return [];
            }
            finally {
                client.release();
            }
        });
    }
    getCurrentUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            try {
                const result = yield client.query("SELECT u.id, u.Nombre ,u.Apellido_Paterno,u.Apellido_Materno,u.Correo,u.Numero_Telefonico,u.Fecha_Nacimiento,r.Nombre AS Rol FROM Usuario u JOIN Rol r ON u.Rol_id = r.id WHERE u.id = $1", [userId]);
                return result.rows[0] || null;
            }
            finally {
                client.release();
            }
        });
    }
    createUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            try {
                const result = yield client.query("INSERT INTO Usuario (Nombre, Apellido_Paterno, Apellido_Materno, Correo, Numero_Telefonico, Contrasena, Fecha_Nacimiento, Rol_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [
                    newUser.nombre,
                    newUser.apellido_paterno,
                    newUser.apellido_materno,
                    newUser.correo,
                    newUser.numero_telefonico,
                    bcrypt_1.default.hashSync(newUser.contrasena, 10),
                    newUser.fecha_nacimiento,
                    newUser.rol,
                ]);
                if (result.rowCount || 0 > 0)
                    return newUser;
                return null;
            }
            catch (error) {
                return null;
            }
            finally {
                client.release();
            }
        });
    }
    updateUser(userId, updatedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            try {
                const result = yield client.query("UPDATE usuario SET Nombre = $1, Apellido_Paterno = $2, Apellido_Materno = $3, Correo = $4, Numero_Telefonico = $5, Contrasena = $6, Fecha_Nacimiento = $7, Rol_id = $8 WHERE id = $9", [
                    updatedUser.nombre,
                    updatedUser.apellido_paterno,
                    updatedUser.apellido_materno,
                    updatedUser.correo,
                    updatedUser.numero_telefonico,
                    updatedUser.contrasena,
                    updatedUser.fecha_nacimiento,
                    updatedUser.rol,
                    userId,
                ]);
                if (result.rowCount || 0 > 0)
                    return updatedUser;
                else
                    return null;
            }
            finally {
                client.release();
            }
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            try {
                const result = yield client.query("DELETE FROM usuario WHERE id = $1", [
                    userId,
                ]);
                return (result.rowCount || 0) > 0;
            }
            finally {
                client.release();
            }
        });
    }
}
exports.default = DatabaseDataSource;
