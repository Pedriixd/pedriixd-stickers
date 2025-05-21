/**
 * ARCHIVO DE MAPA DE IMÁGENES
 * 
 * Este archivo contiene el mapa de todas las imágenes disponibles en la galería.
 * 
 * INSTRUCCIONES:
 * 1. Cuando agregues nuevas imágenes a las carpetas, ejecuta el generador de mapas (si usas alguno)
 *    o agrega manualmente las entradas a este archivo.
 * 2. Cada imagen debe tener: 
 *    - src: ruta relativa a la imagen
 *    - category: categoría a la que pertenece (mates, computadoras, personajes, etc.)
 *    - id: identificador único (opcional)
 */

// Mapa global de imágenes que será utilizado por el script principal
window.imageMap = [
  // CATEGORÍA: MATES
  // ================
  { 
    id: 'mate1',
    src: 'galeria/mates/mate1.png',
    category: 'mates'
  },
  { 
    id: 'mate2',
    src: 'galeria/mates/mate2.png',
    category: 'mates'
  },
  { 
    id: 'mate3',
    src: 'galeria/mates/mate3.png',
    category: 'mates'
  },
  
  // CATEGORÍA: COMPUTADORAS
  // =======================
  { 
    id: 'comp1',
    src: 'galeria/computadoras/computadora1.png',
    category: 'computadoras'
  },
  { 
    id: 'comp2',
    src: 'galeria/computadoras/computadora2.png',
    category: 'computadoras'
  },
  { 
    id: 'comp3',
    src: 'galeria/computadoras/computadora3.png',
    category: 'computadoras'
  },
  
  // CATEGORÍA: PERSONAJES
  // ====================
  { 
    id: 'pers1',
    src: 'galeria/personajes/personaje1.png',
    category: 'personajes'
  },
  { 
    id: 'pers2',
    src: 'galeria/personajes/personaje2.png',
    category: 'personajes'
  },
  { 
    id: 'pers3',
    src: 'galeria/personajes/personaje3.png',
    category: 'personajes'
  }
  
  // NOTA: Este es un archivo de ejemplo. En la implementación real,
  // aquí habría miles de entradas para todas tus imágenes.
  // Puedes generar este archivo automáticamente con un script que recorra
  // todas tus carpetas de imágenes.
];

// Este script también puede incluir una función para generar categorías dinámicamente
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
console.log(`[ImageMap] Cargado con éxito: ${window.imageMap.length} imágenes disponibles`);