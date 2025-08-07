# Backend - Athena Bank

Este backend es una API REST desarrollada con **Node.js**, **Express** y **MongoDB** (vía Mongoose). Gestiona 
ingreso de horas y visualización de ellas.

## Tecnologías principales

- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **JWT** para autenticación
- **bcryptjs** para hash de contraseñas
- **dotenv** para variables de entorno


## Estructura del proyecto

```
backend/
├── src/
│   ├── models/              # Esquemas de Mongoose (User, Account, Transaction)
│   ├── routes/              # Rutas de la API (auth, accounts, transactions)
│   ├── app.js               # Configuración principal de Express
│   ├── server.js            # Entry point y conexión a MongoDB
├── .env.example             # Variables de entorno de ejemplo
├── package.json             # Dependencias y scripts
└── ...
```

## Variables de entorno
Crea un archivo `.env` en la raíz de `backend/` basado en `.env.example`:

```
MONGO_URI=mongodb://localhost:27017/time-tracker
PORT={port}
MONGO_DB=time-tracker
```

## Scripts disponibles

- `npm install`        – Instala las dependencias
- `npm run dev`        – Inicia el backend en modo desarrollo con nodemon
- `npm start`          – Inicia el backend en modo producción


## Notas
- Asegúrate de que MongoDB esté corriendo localmente.

---
