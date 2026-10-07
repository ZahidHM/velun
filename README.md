# Velun

Sitio de Velun: Software, Gaming e historia y equipo.

## Ejecutar localmente

Requiere Node.js y npm.

```bash
npm ci
npm run build
npx serve dist
```

Abre la dirección indicada por el servidor. La página de equipo está en `/equipo/`.

## Estructura

- `src/app.jsx`: aplicación React y animaciones con Framer Motion.
- `dist/style.css`: estilos adaptables a escritorio y móvil.
- `dist/assets/`: imágenes, frames y archivos ZIP de las animaciones.
- `dist/equipo/index.html`: página de historia y equipo.
- `scripts/`: exportación de frames.
- `build.mjs`: compilación con esbuild.

La carpeta `dist` contiene el sitio listo para alojarlo en un servidor estático.

## Sitio

https://velun-worlds.zahidlol321.chatgpt.site
