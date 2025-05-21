# PEDRIIXD Stickers - Aplicación Web

Esta es una aplicación web para crear planchas de stickers personalizados.

## Características

- Selección de tamaños de plancha (pequeña, mediana, grande)
- Limitación de stickers según el tamaño seleccionado
- Subida de imágenes personalizadas
- Galería con más de 6000 imágenes organizadas por categorías
- Diseño responsivo para móviles y escritorio
- Exportación y compartición de diseños

## Estructura de archivos

- `index.html` - Archivo principal de la aplicación
- `style.css` - Estilos CSS
- `script.js` - Lógica JavaScript de la aplicación
- `imageMap.js` - Mapa de todas las imágenes disponibles en la galería
- `logo.svg` - Logo de la aplicación
- `generador-web.html` - Herramienta para generar el mapa de imágenes
- `generarMapa.js` - Script de Node.js para generar el mapa de imágenes
- `galeria/` - Carpeta que contiene todas las imágenes organizadas por categorías

## Organización de imágenes

Para agregar tus 6000+ imágenes, organízalas en la siguiente estructura:

```
galeria/
├── mates/
│   ├── mate1.png
│   ├── mate2.png
│   └── ...
├── computadoras/
│   ├── computadora1.png
│   ├── computadora2.png
│   └── ...
├── personajes/
│   ├── personaje1.png
│   ├── personaje2.png
│   └── ...
└── otras_categorias/
    └── ...
```

## Cómo generar el mapa de imágenes

Hay dos formas de generar el mapa de imágenes:

### Método 1: Usando el generador web (recomendado)

1. Abre el archivo `generador-web.html` en tu navegador
2. Arrastra y suelta tus carpetas de imágenes en la zona indicada
3. Haz clic en "Generar Mapa"
4. Descarga el archivo `imageMap.js` generado
5. Coloca este archivo en la misma carpeta que `index.html`

### Método 2: Usando Node.js

1. Coloca el archivo `generarMapa.js` en la carpeta de tu proyecto
2. Abre una terminal en esa carpeta
3. Ejecuta: `node generarMapa.js`
4. El archivo `imageMap.js` se generará automáticamente

## Cómo subir a GitHub y Vercel

1. Sube todos los archivos a un repositorio de GitHub:
   - `index.html`
   - `style.css`
   - `script.js`
   - `imageMap.js`
   - `logo.svg`
   - `vercel.json`
   - Carpeta `galeria/` con todas tus imágenes

2. Inicia sesión en [Vercel](https://vercel.com)
3. Selecciona "Import Project" y elige tu repositorio de GitHub
4. Vercel detectará automáticamente la configuración del archivo `vercel.json`
5. ¡Tu aplicación estará disponible en línea!

## Consideraciones sobre rendimiento

- Todas las imágenes deben ser optimizadas y no exceder 1MB cada una
- El archivo `imageMap.js` puede ser grande con 6000+ imágenes, pero se cargará una sola vez
- La aplicación usa carga perezosa (lazy loading) para las imágenes para mejor rendimiento