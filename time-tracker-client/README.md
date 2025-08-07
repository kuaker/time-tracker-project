# Frontend - Time Tracker Client

Este frontend es una aplicación web desarrollada con **React**, **TypeScript** y **Vite**. Utiliza las siguientes tecnologías principales:

- **React 19** + **TypeScript**
- **Vite** (build y dev server)
- **Redux Toolkit** para manejo de estado global
- **Material UI (MUI)** para componentes visuales
- **React Router DOM** para ruteo
- **i18next** y **react-i18next** para internacionalización
- **notistack** para notificaciones
- **Axios** para peticiones HTTP

## Estructura del proyecto

```
frontend/
├── public/               # Archivos estáticos
├── src/
│   ├── assets/           # Recursos estáticos (imágenes, etc)
│   ├── components/       # Componentes principales (Dashboard, Login, SignUp, modals, etc)
│   ├── pages/            # Páginas de pantallas
│   ├── services/         # Funciones para interactuar con el backend
│   ├── utils             # Herramientas útiles
│   ├── App.tsx           # Componente principal de rutas
│   ├── main.tsx          # Entry point de la app
│   └── ...
├── index.html            # HTML principal
├── vite.config.ts        # Configuración de Vite
├── package.json          # Dependencias y scripts
└── ...
```

## Scripts disponibles

- `npm install`         – Instala las dependencias del proyecto
- `npm run dev`         – Inicia el servidor de desarrollo en [http://localhost:3000](http://localhost:3000)
- `npm run build`       – Genera el build de producción en `/dist`
- `npm run lint`        – Ejecuta ESLint sobre el código fuente
- `npm run preview`     – Sirve el build de producción localmente

## Configuración y desarrollo

1. **Instalación:**

```bash
npm install
```

2. **Ejecutar en desarrollo:**

```bash
npm run dev
```

3. **Build de producción:**

```bash
npm run build
```

4. **Lint:**

```bash
npm run lint
```

5. **Preview (build local):**

```bash
npm run preview
```
