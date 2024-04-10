# Crud de usuarios + inicio de sesión

## Ejecución
Para ejecutar el proyecto deberas abrir una terminal en cada una de las subcarpetas (frontend y backend)

### Backend
Para el backend, debemos instalar las dependencias que usaremos en el proyecto
```
npm install
```
Debemos generar un archivo .env con las siguientes variables:
```
DATABASE_URL=
DB_NAME=
SECRET=
```

Dentro de env.example se explica mejor lo que debe tener cada variable

Despues, ejecutamos usamos el archivo seed para generar los diferentes usuarios
```
node ./seed.mjs
```
Este archivo nos generará 20 usuarios para ver en la plataforma.
El usuario administrador por defecto tendrá las siguientes credenciales:
Correo: *pedro@ejemplo.com*
Contraseña: *contra123*

Haremos un build para generar los archivos
```
npm run build
```
y despues inicamos el servidor
```
npm run serve
```


### Frontend
Al igual que con el backend, en esta carpeta deberas instalar las dependencias con el comando
```
npm install
```
Para despues crear el archivo .env con sus respectivas variables basandonos en el archivo .env.example
```
VITE_URL_BASE=
```

Y en este caso unicamente tenemos que iniciar el servidor con
```
npm run dev
```
Esto creará un servidor local donde utilizar el sistema. Unicamente se debe acceder al navegador desde el enlace
```
http://localhost:5173
```
