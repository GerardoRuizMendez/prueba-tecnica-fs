import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { fakerES_MX as faker } from "@faker-js/faker";
import pkg from "pg";
const { Pool } = pkg;

dotenv.config();

async function seed() {
  const pool = new Pool({
    connectionString: `${process.env.DATABASE_URL}`,
  });

  await pool.query(`CREATE DATABASE ${process.env.DB_NAME}`);
  await pool.end();

  const poolDB = new Pool({
    connectionString: `${process.env.DATABASE_URL}/${process.env.DB_NAME}`,
  });

  await poolDB.query(`
        CREATE TABLE IF NOT EXISTS Rol (
            id SERIAL PRIMARY KEY,
            Nombre VARCHAR(100) NOT NULL,
            Descripcion VARCHAR(255) NOT NULL
        )`);

  await poolDB.query(`CREATE TABLE IF NOT EXISTS Usuario (
            id SERIAL PRIMARY KEY,
            Nombre VARCHAR(100) NOT NULL,
            Apellido_Paterno VARCHAR(100) NOT NULL,
            Apellido_Materno VARCHAR(100) NOT NULL,
            Correo VARCHAR(255) UNIQUE NOT NULL,
            Numero_Telefonico VARCHAR(20) NOT NULL,
            Contrasena VARCHAR(255) NOT NULL,
            Fecha_Nacimiento DATE NOT NULL,
            Rol_id INT NOT NULL,
            FOREIGN KEY (Rol_id) REFERENCES Rol(id)
        )
    `);

  await poolDB.query(`
    INSERT INTO Rol (Nombre, Descripcion) VALUES 
    ('Administrador', 'Rol con permisos de administrador'),
    ('Encargado', 'Rol con permisos de encargado'),
    ('Solo_Lectura', 'Rol con permisos solo de lectura')
  `);

  for (let i = 1; i <= 19; i++) {
    const fullName = faker.person.fullName().split(" ");
    const nombre = fullName[0];
    const apellidoPaterno = fullName[1];
    const apellidoMaterno = fullName[2];
    const correo = `${fullName[0]}${i}@example.com`.toLocaleLowerCase();
    const numeroTelefonico = `951${Math.floor(
      100000000 + Math.random() * 900000000
    )}`;
    const contrasena = bcrypt.hashSync("contra123", 10);
    const fechaNacimiento = "1990-01-01";
    const rolId = Math.floor(Math.random() * 3) + 1;

    await poolDB.query(
      `
      INSERT INTO Usuario (Nombre, Apellido_Paterno, Apellido_Materno, Correo, Numero_Telefonico, Contrasena, Fecha_Nacimiento, Rol_id) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        correo,
        numeroTelefonico,
        contrasena,
        fechaNacimiento,
        rolId,
      ]
    );
  }

  await poolDB.query(
    `
    INSERT INTO Usuario (Nombre, Apellido_Paterno, Apellido_Materno, Correo, Numero_Telefonico, Contrasena, Fecha_Nacimiento, Rol_id) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [
      "Pedro",
      "Páramo",
      "Buendía",
      "pedro@ejemplo.com",
      "9513790941",
      bcrypt.hashSync("contra123", 10),
      "1990-01-01",
      1,
    ]
  );

  console.log("Usuario administrador: pedro@ejemplo.com Contraseña: contra123");

  await poolDB.end();
}

seed();
