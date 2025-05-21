/**
 * GENERADOR DE MAPA DE IMÁGENES
 * 
 * Este script recorre automáticamente la carpeta de imágenes y genera
 * el archivo imageMap.js con todas las imágenes encontradas.
 * 
 * USO:
 * 1. Coloca este archivo en la misma carpeta que tu proyecto
 * 2. Abre una terminal y navega hasta esta carpeta
 * 3. Ejecuta: node generarMapa.js
 * 4. El script generará/actualizará el archivo imageMap.js
 */

const fs = require('fs');
const path = require('path');

// Configuración
const CONFIG = {
  // Carpeta que contiene todas las imágenes (relativa a este script)
  carpetaImagenes: './galeria',
  
  // Archivo de salida donde se guardará el mapa
  archivoSalida: './imageMap.js',
  
  // Extensiones de archivo de imagen a incluir
  extensionesPermitidas: ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'],
  
  // Tamaño máximo de archivo en bytes (por defecto 1MB)
  tamanoMaximo: 1024 * 1024
};

// Array para almacenar todas las imágenes encontradas
const imagenes = [];

// Contador de imágenes procesadas
let contadorImagenes = 0;
let contadorIgnoradas = 0;

// Función principal
async function generarMapaImagenes() {
  console.log('Iniciando generación de mapa de imágenes...');
  console.log(`Buscando en: ${CONFIG.carpetaImagenes}`);
  
  // Verificar si la carpeta existe
  if (!fs.existsSync(CONFIG.carpetaImagenes)) {
    console.error(`Error: La carpeta ${CONFIG.carpetaImagenes} no existe.`);
    console.log('Creando carpeta de ejemplo...');
    crearCarpetaEjemplo();
    return;
  }
  
  // Recorrer recursivamente la carpeta de imágenes
  await recorrerCarpeta(CONFIG.carpetaImagenes);
  
  // Generar el archivo JavaScript
  generarArchivoJS();
  
  console.log('\nResumen:');
  console.log(`- Total de imágenes procesadas: ${contadorImagenes}`);
  console.log(`- Imágenes ignoradas (tamaño excedido): ${contadorIgnoradas}`);
  console.log(`- Total de imágenes en el mapa: ${imagenes.length}`);
  console.log(`\nMapa de imágenes guardado en: ${CONFIG.archivoSalida}`);
}

// Función recursiva para recorrer carpetas
async function recorrerCarpeta(carpeta) {
  const archivos = fs.readdirSync(carpeta);
  
  for (const archivo of archivos) {
    const rutaCompleta = path.join(carpeta, archivo);
    const stats = fs.statSync(rutaCompleta);
    
    // Si es un directorio, recursión
    if (stats.isDirectory()) {
      await recorrerCarpeta(rutaCompleta);
      continue;
    }
    
    // Verificar si es un archivo de imagen válido
    const extension = path.extname(archivo).toLowerCase();
    if (!CONFIG.extensionesPermitidas.includes(extension)) {
      continue;
    }
    
    contadorImagenes++;
    
    // Verificar tamaño del archivo
    if (stats.size > CONFIG.tamanoMaximo) {
      console.log(`Ignorando ${rutaCompleta} (excede tamaño máximo)`);
      contadorIgnoradas++;
      continue;
    }
    
    // Procesar archivo de imagen
    procesarImagen(rutaCompleta, carpeta);
    
    // Mostrar progreso
    if (contadorImagenes % 100 === 0) {
      console.log(`Procesadas ${contadorImagenes} imágenes...`);
    }
  }
}

// Procesar archivo de imagen
function procesarImagen(rutaCompleta, carpetaBase) {
  // Convertir ruta a formato web (con slashes)
  let rutaWeb = rutaCompleta.replace(/\\/g, '/');
  
  // Eliminar './' del principio si existe
  if (rutaWeb.startsWith('./')) {
    rutaWeb = rutaWeb.substring(2);
  }
  
  // Extraer categoría basada en la estructura de carpetas
  const rutaRelativa = path.relative(CONFIG.carpetaImagenes, rutaCompleta);
  let categoria = path.dirname(rutaRelativa);
  
  // Si la imagen está directamente en la carpeta raíz, usar 'general'
  if (categoria === '.') {
    categoria = 'general';
  }
  
  // Crear ID único para la imagen
  const id = `img_${imagenes.length + 1}`;
  
  // Añadir al array de imágenes
  imagenes.push({
    id: id,
    src: rutaWeb,
    category: categoria
  });
}

// Generar el archivo JavaScript
function generarArchivoJS() {
  // Encabezado del archivo
  let contenido = `/**
 * ARCHIVO DE MAPA DE IMÁGENES (GENERADO AUTOMÁTICAMENTE)
 * 
 * Generado el: ${new Date().toLocaleString()}
 * Total de imágenes: ${imagenes.length}
 * 
 * NO MODIFICAR MANUALMENTE - Use generarMapa.js para actualizar
 */

// Mapa global de imágenes que será utilizado por el script principal
window.imageMap = [\n`;

  // Añadir cada imagen al mapa
  imagenes.forEach((imagen, index) => {
    contenido += `  { 
    id: '${imagen.id}',
    src: '${imagen.src}',
    category: '${imagen.category}'
  }`;
    
    // Añadir coma si no es el último elemento
    if (index < imagenes.length - 1) {
      contenido += ',\n';
    } else {
      contenido += '\n';
    }
  });

  // Cerrar el array y añadir funciones adicionales
  contenido += `];

// Función para obtener categorías disponibles
window.getCategories = function() {
  const categories = new Set();
  window.imageMap.forEach(img => {
    if (img.category) {
      categories.add(img.category);
    }
  });
  return Array.from(categories);
};

// Mensaje de consola para confirmar carga
console.log('[ImageMap] Cargado con éxito: ' + window.imageMap.length + ' imágenes disponibles');`;

  // Escribir el archivo
  fs.writeFileSync(CONFIG.archivoSalida, contenido);
}

// Función para crear una carpeta de ejemplo si no existe
function crearCarpetaEjemplo() {
  fs.mkdirSync('./galeria/mates', { recursive: true });
  fs.mkdirSync('./galeria/computadoras', { recursive: true });
  fs.mkdirSync('./galeria/personajes', { recursive: true });
  
  console.log('Se han creado carpetas de ejemplo en ./galeria/');
  console.log('Por favor, añade tus imágenes y vuelve a ejecutar este script.');
}

// Ejecutar la función principal
generarMapaImagenes();