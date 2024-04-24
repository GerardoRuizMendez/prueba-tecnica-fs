# Crud de usuarios + inicio de sesión

## Instalación

Para ejecutar el proyecto deberas ejecutar el archivo setup (setup.sh en linux o setup.cmd en windows)

Linux:

```
./setup.sh
```

Windows:

```
./setup.cmd
```

(O solo dar doble click en el archivo setup correspondiente)

## Variables de entorno

Debemos generar un archivo .env con las siguientes variables en el frontend (ruta: /frontend/.env) y en en el backend (ruta: /backend/.env).

Dentro de env.example se explica mejor lo que debe tener cada variable

Para iniciar los servidores, debemos ejecutar los comandos

```
npm run dev --prefix backend
```

y

```
npm run dev --prefix backend
```

en diferentes ventanas.

Esto creará un servidor local donde utilizar el sistema. Unicamente se debe acceder al navegador desde el enlace

```
http://localhost:5173
```
