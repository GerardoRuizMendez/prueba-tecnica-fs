import { Pool } from "pg";
import user from "../../domain/model/user";
import bcrypt from "bcrypt";
import rol from "../../domain/model/rol";

export default class DatabaseDataSource {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }

  async getAllUsers(): Promise<user[]> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        "SELECT u.id, u.Nombre ,u.Apellido_Paterno,u.Apellido_Materno,u.Correo,u.Numero_Telefonico,u.Fecha_Nacimiento,r.Nombre AS Rol FROM Usuario u JOIN Rol r ON u.Rol_id = r.id"
      );
      return result.rows;
    } catch (error) {
      console.error("Error al crear usuario:", error);
      return [];
    } finally {
      client.release();
    }
  }

  async getRoles(): Promise<rol[]> {
    const client = await this.pool.connect();
    try {
      const result = await client.query("SELECT * FROM rol");
      return result.rows;
    } catch (error) {
      console.error("Error al obtener roles:", error);
      return [];
    } finally {
      client.release();
    }
  }

  async getCurrentUser(userId: number): Promise<user | null> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        "SELECT u.id, u.Nombre ,u.Apellido_Paterno,u.Apellido_Materno,u.Correo,u.Numero_Telefonico,u.Fecha_Nacimiento,r.Nombre AS Rol FROM Usuario u JOIN Rol r ON u.Rol_id = r.id WHERE u.id = $1",
        [userId]
      );
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  async createUser(newUser: user): Promise<user | null> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        "INSERT INTO Usuario (Nombre, Apellido_Paterno, Apellido_Materno, Correo, Numero_Telefonico, Contrasena, Fecha_Nacimiento, Rol_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        [
          newUser.nombre,
          newUser.apellido_paterno,
          newUser.apellido_materno,
          newUser.correo,
          newUser.numero_telefonico,
          bcrypt.hashSync(newUser.contrasena, 10),
          newUser.fecha_nacimiento,
          newUser.rol,
        ]
      );
      if (result.rowCount || 0 > 0) return newUser;
      return null;
    } catch (error) {
      return null;
    } finally {
      client.release();
    }
  }

  async updateUser(userId: number, updatedUser: user): Promise<user | null> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        "UPDATE usuario SET Nombre = $1, Apellido_Paterno = $2, Apellido_Materno = $3, Correo = $4, Numero_Telefonico = $5, Contrasena = $6, Fecha_Nacimiento = $7, Rol_id = $8 WHERE id = $9",
        [
          updatedUser.nombre,
          updatedUser.apellido_paterno,
          updatedUser.apellido_materno,
          updatedUser.correo,
          updatedUser.numero_telefonico,
          updatedUser.contrasena,
          updatedUser.fecha_nacimiento,
          updatedUser.rol,
          userId,
        ]
      );
      if (result.rowCount || 0 > 0) return updatedUser;
      else return null;
    } finally {
      client.release();
    }
  }

  async deleteUser(userId: number): Promise<boolean> {
    const client = await this.pool.connect();
    try {
      const result = await client.query("DELETE FROM usuario WHERE id = $1", [
        userId,
      ]);
      return (result.rowCount || 0) > 0;
    } finally {
      client.release();
    }
  }
}
