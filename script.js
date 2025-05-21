document.addEventListener('DOMContentLoaded', function() {
  initApp();
});

function initApp() {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Setup navigation
  setupNavigation();
  
  // Setup customization section
  setupCustomization();
  
  // Setup gallery section
  setupGallery();
  
  // Setup preview modal
  setupPreviewModal();
  
  // Load any saved design
  loadSavedDesign();
}

function setupNavigation() {
  // Desktop nav buttons
  document.getElementById('btn-customize').addEventListener('click', function() {
    showSection('customize-section');
  });
  
  document.getElementById('btn-gallery').addEventListener('click', function() {
    showSection('gallery-section');
  });
  
  document.getElementById('btn-pricing').addEventListener('click', function() {
    showSection('pricing-section');
  });
  
  // Mobile menu toggle
  document.getElementById('mobile-menu-btn').addEventListener('click', function() {
    document.getElementById('mobile-menu').classList.toggle('active');
  });
  
  // Mobile menu buttons
  document.getElementById('btn-customize-mobile').addEventListener('click', function() {
    showSection('customize-section');
    document.getElementById('mobile-menu').classList.remove('active');
  });
  
  document.getElementById('btn-gallery-mobile').addEventListener('click', function() {
    showSection('gallery-section');
    document.getElementById('mobile-menu').classList.remove('active');
  });
  
  document.getElementById('btn-pricing-mobile').addEventListener('click', function() {
    showSection('pricing-section');
    document.getElementById('mobile-menu').classList.remove('active');
  });
  
  // Welcome section buttons
  document.getElementById('welcome-customize-btn').addEventListener('click', function() {
    showSection('customize-section');
  });
  
  document.getElementById('welcome-gallery-btn').addEventListener('click', function() {
    showSection('gallery-section');
  });
  
  document.getElementById('welcome-pricing-btn').addEventListener('click', function() {
    showSection('pricing-section');
  });
  
  // Footer links
  document.getElementById('footer-customize-btn').addEventListener('click', function() {
    showSection('customize-section');
  });
  
  document.getElementById('footer-gallery-btn').addEventListener('click', function() {
    showSection('gallery-section');
  });
  
  document.getElementById('footer-pricing-btn').addEventListener('click', function() {
    showSection('pricing-section');
  });
  
  function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
      section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionName).classList.add('active');
    
    // Update active button in navigation
    const navButtons = document.querySelectorAll('.btn-nav');
    navButtons.forEach(button => {
      button.classList.remove('active');
    });
    
    if (sectionName === 'customize-section') {
      document.getElementById('btn-customize').classList.add('active');
    } else if (sectionName === 'gallery-section') {
      document.getElementById('btn-gallery').classList.add('active');
    } else if (sectionName === 'pricing-section') {
      document.getElementById('btn-pricing').classList.add('active');
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
  }
}

function setupCustomization() {
  // Variables to track the customize section state
  let selectedSizeId = '';
  let selectedStickerSize = '5'; // Default to 5cm
  let stickers = [];
  let maxStickers = 0;
  
  // Size selection
  const sizeCards = document.querySelectorAll('.size-card');
  sizeCards.forEach(card => {
    card.addEventListener('click', function() {
      // Remove selected class from all cards
      sizeCards.forEach(c => c.classList.remove('selected'));
      
      // Add selected class to clicked card
      this.classList.add('selected');
      
      // Store selected size
      selectedSizeId = this.id;
      
      // Show canvas container
      document.getElementById('canvas-container-wrapper').classList.remove('hidden');
      document.getElementById('canvas-actions').classList.remove('hidden');
      
      // Update canvas size based on selected size
      updateCanvasSize(selectedSizeId);
      
      // Update max stickers
      updateMaxStickers();
      
      // Scroll to canvas
      document.getElementById('canvas-container-wrapper').scrollIntoView({ behavior: 'smooth' });
    });
  });
  
  // Función para actualizar el tamaño visual del canvas
  function updateCanvasSize(sizeId) {
    const canvasContainer = document.getElementById('canvas-container');
    
    // Remover clases de tamaño previas
    canvasContainer.classList.remove('canvas-size-small', 'canvas-size-medium', 'canvas-size-large');
    
    // Agregar la clase correspondiente al tamaño seleccionado
    switch(sizeId) {
      case 'size-small':
        canvasContainer.classList.add('canvas-size-small');
        break;
      case 'size-medium':
        canvasContainer.classList.add('canvas-size-medium');
        break;
      case 'size-large':
        canvasContainer.classList.add('canvas-size-large');
        break;
    }
    
    // Reposicionar stickers si hay alguno (para que queden dentro del nuevo tamaño)
    if (stickers.length > 0) {
      repositionStickers();
    }
  }
  
  // Función para reposicionar stickers cuando cambia el tamaño del canvas
  function repositionStickers() {
    const canvas = document.getElementById('canvas-container');
    const canvasRect = canvas.getBoundingClientRect();
    const stickerElements = canvas.querySelectorAll('.sticker');
    
    // Para cada sticker, verificar y ajustar su posición
    stickerElements.forEach((stickerEl, index) => {
      const stickerRect = stickerEl.getBoundingClientRect();
      
      // Verificar si el sticker se sale del canvas
      if (parseInt(stickerEl.style.left) + stickerRect.width > canvasRect.width) {
        // Ajustar posición horizontal
        stickerEl.style.left = `${canvasRect.width - stickerRect.width}px`;
        
        // Actualizar posición en array de stickers
        if (index < stickers.length) {
          stickers[index].x = parseInt(stickerEl.style.left);
        }
      }
      
      if (parseInt(stickerEl.style.top) + stickerRect.height > canvasRect.height) {
        // Ajustar posición vertical
        stickerEl.style.top = `${canvasRect.height - stickerRect.height}px`;
        
        // Actualizar posición en array de stickers
        if (index < stickers.length) {
          stickers[index].y = parseInt(stickerEl.style.top);
        }
      }
    });
    
    // Guardar el estado actualizado
    saveDesignState();
  }
  
  // Size selection from pricing section
  const selectSizeButtons = document.querySelectorAll('.select-size-btn');
  selectSizeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const sizeId = this.getAttribute('data-size');
      showSection('customize-section');
      
      // Simulate click on corresponding size card
      document.getElementById(`size-${sizeId}`).click();
    });
  });
  
  // Sticker size toggle
  document.getElementById('btn-sticker-5cm').addEventListener('click', function() {
    document.getElementById('btn-sticker-5cm').classList.add('active');
    document.getElementById('btn-sticker-7cm').classList.remove('active');
    selectedStickerSize = '5';
    updateMaxStickers();
    loadStickers();
  });
  
  document.getElementById('btn-sticker-7cm').addEventListener('click', function() {
    document.getElementById('btn-sticker-7cm').classList.add('active');
    document.getElementById('btn-sticker-5cm').classList.remove('active');
    selectedStickerSize = '7';
    updateMaxStickers();
    loadStickers();
  });
  
  // Load initial stickers
  loadStickers();
  
  // Clear canvas button
  document.getElementById('clear-canvas').addEventListener('click', function() {
    // Remove all stickers from the canvas
    const canvas = document.getElementById('canvas-container');
    while (canvas.firstChild) {
      canvas.removeChild(canvas.firstChild);
    }
    stickers = [];
    document.getElementById('sticker-count').innerHTML = `Stickers: <span>0</span> / <span id="max-stickers">${maxStickers}</span>`;
    saveDesignState();
  });
  
  // Sticker upload
  document.getElementById('upload-sticker').addEventListener('change', handleStickerUpload);
  
  // Preview button
  document.getElementById('btn-preview').addEventListener('click', showPreview);
  
  // Download button
  document.getElementById('btn-download').addEventListener('click', function() {
    html2canvas(document.getElementById('canvas-container')).then(canvas => {
      const link = document.createElement('a');
      link.download = 'pedriixd-stickers.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  });
  
  // WhatsApp share button
  document.getElementById('btn-whatsapp').addEventListener('click', function(e) {
    e.preventDefault();
    
    html2canvas(document.getElementById('canvas-container')).then(canvas => {
      // Get selected size info
      const sizeCard = document.querySelector('.size-card.selected');
      const sizeText = sizeCard ? sizeCard.querySelector('h4').textContent : '';
      const priceText = sizeCard ? sizeCard.querySelector('.size-price').textContent : '';
      
      // Create message text
      const message = `Hola, acá está mi diseño de plancha personalizada.
Tamaño: ${sizeText}
Cantidad de stickers: ${stickers.length}
Precio: ${priceText}`;
      
      // Set WhatsApp link with message
      const whatsappUrl = `https://wa.me/543755298440?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    });
  });
  
  function updateMaxStickers() {
    if (!selectedSizeId) return;
    
    const sizeCard = document.getElementById(selectedSizeId);
    if (selectedStickerSize === '5') {
      maxStickers = parseInt(sizeCard.getAttribute('data-max-stickers-5cm'));
    } else {
      maxStickers = parseInt(sizeCard.getAttribute('data-max-stickers-7cm'));
    }
    
    document.getElementById('sticker-count').innerHTML = `Stickers: <span>${stickers.length}</span> / <span id="max-stickers">${maxStickers}</span>`;
  }
  
  function loadStickers() {
    const selectorContainer = document.getElementById('sticker-selector');
    selectorContainer.innerHTML = '';
    
    // Cargar stickers desde la galería de imágenes
    fetchStickerImages(selectedStickerSize, 20)
      .then(images => {
        if (images.length === 0) {
          // Si no hay imágenes disponibles, mostrar mensaje
          selectorContainer.innerHTML = '<p class="no-stickers">No hay stickers disponibles. Prueba otra categoría.</p>';
          return;
        }
        
        // Mostrar las imágenes en el selector
        images.forEach(image => {
          createStickerItem(selectorContainer, image.src, image.category);
        });
      })
      .catch(error => {
        console.error('Error al cargar stickers:', error);
        selectorContainer.innerHTML = '<p class="no-stickers">Error al cargar stickers. Intenta de nuevo más tarde.</p>';
      });
  }
  
  // Función para obtener las imágenes de los stickers
  async function fetchStickerImages(size, limit = 20, category = null) {
    try {
      // En producción, podríamos usar fetch para obtener las imágenes de una API
      // Pero para la versión estática, simularemos la carga desde el mapa de imágenes
      const allImages = await getImagesFromImageMap();
      
      // Filtrar por categoría si es necesario
      let filteredImages = category && category !== 'all' 
        ? allImages.filter(img => img.category === category)
        : allImages;
        
      // Devolver un subconjunto aleatorio de imágenes
      return shuffleArray(filteredImages).slice(0, limit);
    } catch (error) {
      console.error('Error fetching sticker images:', error);
      return [];
    }
  }
  
  // Función para obtener las imágenes del mapa de imágenes
  async function getImagesFromImageMap() {
    // Esta función simulará la carga de imágenes desde un mapa
    // En una implementación real, esto cargaría desde un archivo JSON o una API
    
    // Intentará cargar imageMap.js si existe
    if (typeof window.imageMap === 'undefined') {
      try {
        // Intentar cargar el mapa de imágenes
        await loadScript('imageMap.js');
        // Esperar un momento para asegurarse de que se cargó
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.warn('No se pudo cargar imageMap.js, usando imágenes de ejemplo', error);
        // Si no podemos cargar el mapa, usar imágenes de ejemplo
        return getExampleImages();
      }
    }
    
    // Si el mapa de imágenes está disponible, usarlo
    if (typeof window.imageMap !== 'undefined' && Array.isArray(window.imageMap)) {
      return window.imageMap;
    }
    
    // Si no hay mapa de imágenes, devolver imágenes de ejemplo
    return getExampleImages();
  }
  
  // Función para cargar un script externo
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  
  // Función para obtener imágenes de ejemplo (fallback)
  function getExampleImages() {
    // Imágenes de ejemplo para usar como respaldo
    const examples = [
      { 
        src: 'https://cdn.pixabay.com/photo/2021/02/07/19/48/snowboarding-5992271_1280.png',
        category: 'personajes'
      },
      { 
        src: 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
        category: 'computadoras'
      },
      { 
        src: 'https://cdn.pixabay.com/photo/2013/07/13/09/51/cat-156291_960_720.png',
        category: 'personajes'
      },
      { 
        src: 'https://cdn.pixabay.com/photo/2016/03/31/19/50/checklist-1295319_960_720.png',
        category: 'computadoras'
      },
      { 
        src: 'https://cdn.pixabay.com/photo/2014/04/03/10/00/cloud-309749_960_720.png',
        category: 'computadoras'
      },
      { 
        src: 'https://cdn.pixabay.com/photo/2017/01/31/15/33/computer-2025130_960_720.png',
        category: 'computadoras'
      },
      { 
        src: 'https://cdn.pixabay.com/photo/2016/06/13/17/30/mail-1454731_960_720.png',
        category: 'computadoras'
      },
      { 
        src: 'https://cdn.pixabay.com/photo/2020/01/21/18/30/wordpress-4783716_960_720.png',
        category: 'computadoras'
      },
      { 
        src: 'https://cdn.pixabay.com/photo/2014/04/02/10/25/coffee-304113_960_720.png',
        category: 'mates'
      },
      { 
        src: 'https://cdn.pixabay.com/photo/2016/03/31/19/14/coffee-1294698_960_720.png',
        category: 'mates'
      },
      { 
        src: 'https://cdn.pixabay.com/photo/2017/08/06/12/28/tea-2592247_960_720.png',
        category: 'mates'
      },
      { 
        src: 'https://cdn.pixabay.com/photo/2014/12/21/23/34/tea-576260_960_720.png',
        category: 'mates'
      }
    ];
    
    return examples;
  }
  
  // Función para mezclar un array (algoritmo Fisher-Yates)
  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }
  
  function createStickerItem(selectorContainer, imgSrc, category = '') {
    const stickerItem = document.createElement('div');
    stickerItem.className = 'sticker-item';
    if (category) {
      stickerItem.setAttribute('data-category', category);
    }
    
    // Contenedor para la imagen (permite mejor control del tamaño y loading)
    const imgContainer = document.createElement('div');
    imgContainer.className = 'sticker-img-container';
    
    // Crear imagen con manejo de errores y carga
    const stickerImg = document.createElement('img');
    stickerImg.src = imgSrc;
    stickerImg.alt = 'Sticker';
    stickerImg.loading = 'lazy'; // Carga lazy para mejor rendimiento
    
    // Mostrar un indicador mientras carga
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'sticker-loading';
    
    // Manejar errores de carga de imagen
    stickerImg.onerror = function() {
      imgContainer.innerHTML = '<div class="sticker-error">⚠️</div>';
      console.warn(`Error al cargar imagen: ${imgSrc}`);
    };
    
    // Eliminar indicador cuando la imagen esté cargada
    stickerImg.onload = function() {
      if (loadingIndicator.parentNode) {
        loadingIndicator.parentNode.removeChild(loadingIndicator);
      }
    };
    
    imgContainer.appendChild(loadingIndicator);
    imgContainer.appendChild(stickerImg);
    stickerItem.appendChild(imgContainer);
    
    // Añadir información de categoría si está disponible
    if (category && category !== 'general') {
      const categoryTag = document.createElement('span');
      categoryTag.className = 'sticker-category-tag';
      categoryTag.textContent = category;
      stickerItem.appendChild(categoryTag);
    }
    
    selectorContainer.appendChild(stickerItem);
    
    stickerItem.addEventListener('click', function() {
      if (stickers.length >= maxStickers) {
        showNotification(`Has alcanzado el límite máximo de ${maxStickers} stickers para esta plancha y tamaño de sticker.`, 'warning');
        return;
      }
      
      addStickerToCanvas(imgSrc);
    });
  }
  
  // Función para mostrar notificaciones en lugar de alerts
  function showNotification(message, type = 'info') {
    // Si ya existe una notificación, eliminarla
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    // Crear nueva notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span>${message}</span>
        <button class="notification-close">&times;</button>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Mostrar la notificación (con animación)
    setTimeout(() => {
      notification.classList.add('notification-active');
    }, 10);
    
    // Configurar cierre de la notificación
    notification.querySelector('.notification-close').addEventListener('click', function() {
      closeNotification(notification);
    });
    
    // Auto-cerrar después de un tiempo
    setTimeout(() => {
      closeNotification(notification);
    }, 5000);
  }
  
  function closeNotification(notification) {
    notification.classList.remove('notification-active');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }
  
  function addStickerToCanvas(imgSrc) {
    const canvas = document.getElementById('canvas-container');
    const canvasRect = canvas.getBoundingClientRect();
    
    // Create sticker element
    const sticker = document.createElement('div');
    sticker.className = 'sticker';
    
    // Set sticker size based on selection
    const stickerSize = selectedStickerSize === '5' ? 100 : 140; // pixels (scale for visual representation)
    sticker.style.width = `${stickerSize}px`;
    sticker.style.height = `${stickerSize}px`;
    
    // Position randomly within canvas, keeping sticker fully visible
    const maxX = canvasRect.width - stickerSize;
    const maxY = canvasRect.height - stickerSize;
    const posX = Math.floor(Math.random() * maxX);
    const posY = Math.floor(Math.random() * maxY);
    
    sticker.style.left = `${posX}px`;
    sticker.style.top = `${posY}px`;
    
    // Add image to sticker
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = 'Sticker';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'contain';
    
    sticker.appendChild(img);
    canvas.appendChild(sticker);
    
    // Add to stickers array
    stickers.push({
      id: Date.now().toString(),
      src: imgSrc,
      size: selectedStickerSize,
      x: posX,
      y: posY
    });
    
    // Update sticker count
    document.getElementById('sticker-count').innerHTML = `Stickers: <span>${stickers.length}</span> / <span id="max-stickers">${maxStickers}</span>`;
    
    // Make sticker draggable
    makeElementDraggable(sticker);
    
    // Save design state
    saveDesignState();
  }
  
  function handleStickerUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
      const imgSrc = e.target.result;
      
      if (stickers.length >= maxStickers) {
        alert(`Has alcanzado el límite máximo de ${maxStickers} stickers para esta plancha y tamaño de sticker.`);
        return;
      }
      
      addStickerToCanvas(imgSrc);
    };
    reader.readAsDataURL(file);
    
    // Reset file input
    event.target.value = '';
  }
  
  function makeElementDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    element.addEventListener('mousedown', dragMouseDown);
    element.addEventListener('touchstart', dragTouchStart, { passive: false });
    
    function dragMouseDown(e) {
      e.preventDefault();
      // Get mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      
      element.classList.add('sticker-dragging');
      
      // Call a function whenever the cursor moves:
      document.addEventListener('mousemove', elementDrag);
      document.addEventListener('mouseup', closeDragElement);
    }
    
    function dragTouchStart(e) {
      e.preventDefault();
      // Get touch position at startup:
      pos3 = e.touches[0].clientX;
      pos4 = e.touches[0].clientY;
      
      element.classList.add('sticker-dragging');
      
      // Call a function whenever the finger moves:
      document.addEventListener('touchmove', elementTouchDrag, { passive: false });
      document.addEventListener('touchend', closeDragElement);
    }
    
    function elementDrag(e) {
      e.preventDefault();
      // Calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      
      // Set the element's new position:
      const newTop = (element.offsetTop - pos2);
      const newLeft = (element.offsetLeft - pos1);
      
      // Keep sticker inside canvas
      const canvas = document.getElementById('canvas-container');
      const maxX = canvas.offsetWidth - element.offsetWidth;
      const maxY = canvas.offsetHeight - element.offsetHeight;
      
      element.style.top = `${Math.max(0, Math.min(maxY, newTop))}px`;
      element.style.left = `${Math.max(0, Math.min(maxX, newLeft))}px`;
      
      // Update sticker position in array
      const stickerId = element.getAttribute('data-id');
      if (stickerId) {
        const stickerIndex = stickers.findIndex(s => s.id === stickerId);
        if (stickerIndex !== -1) {
          stickers[stickerIndex].x = parseInt(element.style.left);
          stickers[stickerIndex].y = parseInt(element.style.top);
        }
      }
    }
    
    function elementTouchDrag(e) {
      e.preventDefault();
      // Calculate the new touch position:
      pos1 = pos3 - e.touches[0].clientX;
      pos2 = pos4 - e.touches[0].clientY;
      pos3 = e.touches[0].clientX;
      pos4 = e.touches[0].clientY;
      
      // Set the element's new position:
      const newTop = (element.offsetTop - pos2);
      const newLeft = (element.offsetLeft - pos1);
      
      // Keep sticker inside canvas
      const canvas = document.getElementById('canvas-container');
      const maxX = canvas.offsetWidth - element.offsetWidth;
      const maxY = canvas.offsetHeight - element.offsetHeight;
      
      element.style.top = `${Math.max(0, Math.min(maxY, newTop))}px`;
      element.style.left = `${Math.max(0, Math.min(maxX, newLeft))}px`;
      
      // Update sticker position in array
      const stickerId = element.getAttribute('data-id');
      if (stickerId) {
        const stickerIndex = stickers.findIndex(s => s.id === stickerId);
        if (stickerIndex !== -1) {
          stickers[stickerIndex].x = parseInt(element.style.left);
          stickers[stickerIndex].y = parseInt(element.style.top);
        }
      }
    }
    
    function closeDragElement() {
      // Stop moving when mouse button / touch is released:
      document.removeEventListener('mousemove', elementDrag);
      document.removeEventListener('mouseup', closeDragElement);
      document.removeEventListener('touchmove', elementTouchDrag);
      document.removeEventListener('touchend', closeDragElement);
      
      element.classList.remove('sticker-dragging');
      
      // Save design state
      saveDesignState();
    }
  }
  
  function showPreview() {
    // Get canvas content
    html2canvas(document.getElementById('canvas-container')).then(canvas => {
      const previewContent = document.getElementById('preview-content');
      previewContent.innerHTML = '';
      previewContent.appendChild(canvas);
      
      // Update preview details
      updatePreviewDetails();
      
      // Show modal
      document.getElementById('preview-modal').classList.add('active');
    });
  }
  
  function updatePreviewDetails() {
    // Get selected size info
    const sizeCard = document.querySelector('.size-card.selected');
    const sizeText = sizeCard ? sizeCard.querySelector('h4').textContent : 'No seleccionado';
    const priceText = sizeCard ? sizeCard.querySelector('.size-price').textContent : '$0';
    
    // Update preview details
    document.querySelector('.preview-size').textContent = `Tamaño de plancha: ${sizeText}`;
    document.querySelector('.preview-stickers').textContent = `Cantidad de stickers: ${stickers.length} (${selectedStickerSize}cm)`;
    document.querySelector('.preview-price').textContent = `Precio: ${priceText}`;
  }
  
  function saveDesignState() {
    // Only save if there's a selected size
    if (!selectedSizeId) return;
    
    const designState = {
      selectedSizeId,
      selectedStickerSize,
      stickers
    };
    
    localStorage.setItem('pedriixd-design', JSON.stringify(designState));
  }
}

function setupGallery() {
  // Variables to track the gallery state
  let currentCategory = 'all';
  let selectedStickerSize = '5'; // Default to 5cm
  
  // Category buttons
  const categoryButtons = document.querySelectorAll('.category-btn');
  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Store selected category
      currentCategory = this.getAttribute('data-category');
      
      // Load stickers for selected category
      loadStickers(currentCategory);
    });
  });
  
  // Load initial stickers
  loadStickers();
  
  // Gallery sticker upload
  document.getElementById('upload-gallery-sticker').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
      const imgSrc = e.target.result;
      
      // Add uploaded sticker to gallery
      addStickerToGallery(imgSrc, 'Usuario', 'all');
    };
    reader.readAsDataURL(file);
    
    // Reset file input
    event.target.value = '';
  });
  
  // Load more button
  document.getElementById('load-more-btn').addEventListener('click', function() {
    // In a real app, this would load more stickers from a database
    // Here we'll just reload the same stickers
    loadStickers(currentCategory);
  });
  
  function loadStickers(category = 'all') {
    const galleryContainer = document.querySelector('.sticker-gallery');
    
    // Mostrar indicador de carga
    galleryContainer.innerHTML = '<div class="loading-indicator"><span>Cargando stickers...</span></div>';
    
    // Cargar stickers desde el mapa de imágenes
    fetchStickerImages(selectedStickerSize, 40, category)
      .then(images => {
        // Limpiar el contenedor antes de añadir nuevos stickers
        galleryContainer.innerHTML = '';
        
        if (images.length === 0) {
          galleryContainer.innerHTML = '<p class="no-stickers">No hay stickers disponibles en esta categoría.</p>';
          return;
        }
        
        // Añadir cada sticker a la galería
        images.forEach(image => {
          addStickerToGallery(image.src, image.category || 'sin categoría', category);
        });
        
        // Mostrar botón "cargar más" solo si hay suficientes imágenes
        document.getElementById('load-more-btn').style.display = images.length >= 20 ? 'block' : 'none';
      })
      .catch(error => {
        console.error('Error al cargar stickers:', error);
        galleryContainer.innerHTML = '<p class="no-stickers">Error al cargar stickers. Intenta de nuevo más tarde.</p>';
      });
  }
  
  function addStickerToGallery(src, title, category) {
    const galleryContainer = document.querySelector('.sticker-gallery');
    
    const stickerItem = document.createElement('div');
    stickerItem.className = 'gallery-sticker-item';
    stickerItem.setAttribute('data-category', category);
    
    // Agregar etiqueta de categoría
    if (category && category !== 'all') {
      const categoryTag = document.createElement('span');
      categoryTag.className = 'gallery-sticker-category';
      categoryTag.textContent = category;
      stickerItem.appendChild(categoryTag);
    }
    
    // Contenedor de imagen para mejor control
    const imgContainer = document.createElement('div');
    imgContainer.className = 'gallery-sticker-item-img';
    
    const stickerImg = document.createElement('img');
    stickerImg.src = src;
    stickerImg.alt = title;
    stickerImg.loading = 'lazy'; // Carga lazy para mejor rendimiento
    
    // Manejar errores de carga de imagen
    stickerImg.onerror = function() {
      imgContainer.innerHTML = '<div class="sticker-error">⚠️</div>';
      console.warn(`Error al cargar imagen: ${src}`);
    };
    
    imgContainer.appendChild(stickerImg);
    stickerItem.appendChild(imgContainer);
    
    const stickerFooter = document.createElement('div');
    stickerFooter.className = 'gallery-sticker-item-footer';
    
    const stickerSize = document.createElement('span');
    stickerSize.className = 'sticker-size';
    stickerSize.textContent = selectedStickerSize + 'cm';
    
    const addButton = document.createElement('button');
    addButton.className = 'add-to-canvas';
    addButton.innerHTML = '<i class="fas fa-plus"></i> Agregar';
    
    stickerFooter.appendChild(stickerSize);
    stickerFooter.appendChild(addButton);
    
    stickerItem.appendChild(stickerFooter);
    
    galleryContainer.appendChild(stickerItem);
    
    // Add click event to add to canvas
    addButton.addEventListener('click', function() {
      addStickerFromGallery(src);
    });
    
    // También permitir hacer clic en la imagen para agregar
    imgContainer.addEventListener('click', function() {
      addStickerFromGallery(src);
    });
  }
  
  function addStickerFromGallery(imgSrc) {
    // Switch to customize section
    showSection('customize-section');
    
    // Check if a size is selected
    const selectedSizeCard = document.querySelector('.size-card.selected');
    if (!selectedSizeCard) {
      // Select medium size by default
      document.getElementById('size-medium').click();
    }
    
    // Set sticker size based on what's selected in gallery
    const stickerSizeBtn = document.getElementById(`btn-sticker-${selectedStickerSize}cm`);
    if (stickerSizeBtn) {
      stickerSizeBtn.click();
    }
    
    // Get canvas
    const canvas = document.getElementById('canvas-container');
    const canvasRect = canvas.getBoundingClientRect();
    
    // Create sticker element
    const sticker = document.createElement('div');
    sticker.className = 'sticker';
    
    // Set sticker size based on selection
    const stickerSize = selectedStickerSize === '5' ? 100 : 140; // pixels (scale for visual representation)
    sticker.style.width = `${stickerSize}px`;
    sticker.style.height = `${stickerSize}px`;
    
    // Position randomly within canvas, keeping sticker fully visible
    const maxX = canvasRect.width - stickerSize;
    const maxY = canvasRect.height - stickerSize;
    const posX = Math.floor(Math.random() * maxX);
    const posY = Math.floor(Math.random() * maxY);
    
    sticker.style.left = `${posX}px`;
    sticker.style.top = `${posY}px`;
    
    // Add image to sticker
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = 'Sticker';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'contain';
    
    sticker.appendChild(img);
    canvas.appendChild(sticker);
    
    // Get stickers array from customization section
    let stickers = [];
    const designState = localStorage.getItem('pedriixd-design');
    if (designState) {
      const parsedState = JSON.parse(designState);
      stickers = parsedState.stickers || [];
    }
    
    // Add to stickers array
    stickers.push({
      id: Date.now().toString(),
      src: imgSrc,
      size: selectedStickerSize,
      x: posX,
      y: posY
    });
    
    // Update sticker count
    const maxStickers = parseInt(selectedSizeCard.getAttribute(`data-max-stickers-${selectedStickerSize}cm`));
    document.getElementById('sticker-count').innerHTML = `Stickers: <span>${stickers.length}</span> / <span id="max-stickers">${maxStickers}</span>`;
    
    // Make sticker draggable
    makeElementDraggable(sticker);
    
    // Save design state
    saveDesignState(stickers);
  }
  
  function makeElementDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    element.addEventListener('mousedown', dragMouseDown);
    element.addEventListener('touchstart', dragTouchStart, { passive: false });
    
    function dragMouseDown(e) {
      e.preventDefault();
      // Get mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      
      element.classList.add('sticker-dragging');
      
      // Call a function whenever the cursor moves:
      document.addEventListener('mousemove', elementDrag);
      document.addEventListener('mouseup', closeDragElement);
    }
    
    function dragTouchStart(e) {
      e.preventDefault();
      // Get touch position at startup:
      pos3 = e.touches[0].clientX;
      pos4 = e.touches[0].clientY;
      
      element.classList.add('sticker-dragging');
      
      // Call a function whenever the finger moves:
      document.addEventListener('touchmove', elementTouchDrag, { passive: false });
      document.addEventListener('touchend', closeDragElement);
    }
    
    function elementDrag(e) {
      e.preventDefault();
      // Calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      
      // Set the element's new position:
      const newTop = (element.offsetTop - pos2);
      const newLeft = (element.offsetLeft - pos1);
      
      // Keep sticker inside canvas
      const canvas = document.getElementById('canvas-container');
      const maxX = canvas.offsetWidth - element.offsetWidth;
      const maxY = canvas.offsetHeight - element.offsetHeight;
      
      element.style.top = `${Math.max(0, Math.min(maxY, newTop))}px`;
      element.style.left = `${Math.max(0, Math.min(maxX, newLeft))}px`;
    }
    
    function elementTouchDrag(e) {
      e.preventDefault();
      // Calculate the new touch position:
      pos1 = pos3 - e.touches[0].clientX;
      pos2 = pos4 - e.touches[0].clientY;
      pos3 = e.touches[0].clientX;
      pos4 = e.touches[0].clientY;
      
      // Set the element's new position:
      const newTop = (element.offsetTop - pos2);
      const newLeft = (element.offsetLeft - pos1);
      
      // Keep sticker inside canvas
      const canvas = document.getElementById('canvas-container');
      const maxX = canvas.offsetWidth - element.offsetWidth;
      const maxY = canvas.offsetHeight - element.offsetHeight;
      
      element.style.top = `${Math.max(0, Math.min(maxY, newTop))}px`;
      element.style.left = `${Math.max(0, Math.min(maxX, newLeft))}px`;
    }
    
    function closeDragElement() {
      // Stop moving when mouse button / touch is released:
      document.removeEventListener('mousemove', elementDrag);
      document.removeEventListener('mouseup', closeDragElement);
      document.removeEventListener('touchmove', elementTouchDrag);
      document.removeEventListener('touchend', closeDragElement);
      
      element.classList.remove('sticker-dragging');
      
      // Save design state
      saveDesignState();
    }
  }
  
  function saveDesignState(stickers) {
    if (!stickers) {
      // Get stickers from localStorage if not provided
      const designState = localStorage.getItem('pedriixd-design');
      if (designState) {
        const parsedState = JSON.parse(designState);
        stickers = parsedState.stickers || [];
      } else {
        stickers = [];
      }
    }
    
    // Get selected size
    const selectedSizeCard = document.querySelector('.size-card.selected');
    if (!selectedSizeCard) return;
    
    const selectedSizeId = selectedSizeCard.id;
    
    const designState = {
      selectedSizeId,
      selectedStickerSize,
      stickers
    };
    
    localStorage.setItem('pedriixd-design', JSON.stringify(designState));
  }
}

function setupPreviewModal() {
  // Close preview modal
  document.getElementById('close-preview').addEventListener('click', function() {
    document.getElementById('preview-modal').classList.remove('active');
  });
  
  // Descargar diseño
  document.getElementById('download-design').addEventListener('click', function() {
    downloadDesign();
  });
  
  // Confirm design y enviar por WhatsApp
  document.getElementById('confirm-design').addEventListener('click', function() {
    // Primero descargamos y luego abrimos WhatsApp
    downloadDesign()
      .then(() => {
        // Get selected size info
        const sizeCard = document.querySelector('.size-card.selected');
        const sizeText = sizeCard ? sizeCard.querySelector('h4').textContent : '';
        const priceText = sizeCard ? sizeCard.querySelector('.size-price').textContent : '';
        
        // Create message text
        const message = `Hola, acá está mi diseño de plancha personalizada.
Tamaño: ${sizeText}
Cantidad de stickers: ${document.querySelectorAll('#canvas-container .sticker').length}
Precio: ${priceText}`;
        
        // Set WhatsApp link with message
        const whatsappUrl = `https://wa.me/543755298440?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
      })
      .catch(error => {
        console.error('Error al procesar la imagen:', error);
        showNotification('Hubo un problema al procesar tu diseño. Intenta de nuevo.', 'error');
      });
  });
  
  // Función para descargar el diseño
  function downloadDesign() {
    return new Promise((resolve, reject) => {
      try {
        // Mostrar notificación de que estamos procesando
        showNotification('Generando imagen...', 'info');
        
        // Get canvas content
        html2canvas(document.getElementById('canvas-container')).then(canvas => {
          try {
            // Convertir el canvas a una URL de datos
            const dataUrl = canvas.toDataURL('image/png');
            
            // Crear un link para descargar
            const link = document.createElement('a');
            link.download = 'pedriixd-stickers.png';
            link.href = dataUrl;
            link.click();
            
            // Mostrar notificación de éxito
            showNotification('¡Imagen descargada correctamente!', 'success');
            
            // Resolver la promesa para continuar con WhatsApp si es necesario
            resolve();
          } catch (error) {
            console.error('Error al descargar:', error);
            reject(error);
          }
        }).catch(error => {
          console.error('Error en html2canvas:', error);
          reject(error);
        });
      } catch (error) {
        console.error('Error general:', error);
        reject(error);
      }
    });
  }
}

function loadSavedDesign() {
  const designState = localStorage.getItem('pedriixd-design');
  if (!designState) return;
  
  try {
    const { selectedSizeId, selectedStickerSize, stickers } = JSON.parse(designState);
    
    // Select saved size
    if (selectedSizeId) {
      const sizeCard = document.getElementById(selectedSizeId);
      if (sizeCard) {
        sizeCard.click();
      }
    }
    
    // Select saved sticker size
    if (selectedStickerSize) {
      const stickerSizeBtn = document.getElementById(`btn-sticker-${selectedStickerSize}cm`);
      if (stickerSizeBtn) {
        stickerSizeBtn.click();
      }
    }
    
    // Load saved stickers
    if (stickers && stickers.length > 0) {
      const canvas = document.getElementById('canvas-container');
      
      stickers.forEach(sticker => {
        // Create sticker element
        const stickerEl = document.createElement('div');
        stickerEl.className = 'sticker';
        
        // Set sticker size based on saved size
        const stickerSize = sticker.size === '5' ? 100 : 140; // pixels (scale for visual representation)
        stickerEl.style.width = `${stickerSize}px`;
        stickerEl.style.height = `${stickerSize}px`;
        
        // Position at saved coordinates
        stickerEl.style.left = `${sticker.x}px`;
        stickerEl.style.top = `${sticker.y}px`;
        
        // Add image to sticker
        const img = document.createElement('img');
        img.src = sticker.src;
        img.alt = 'Sticker';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        
        stickerEl.appendChild(img);
        canvas.appendChild(stickerEl);
        
        // Make sticker draggable
        makeElementDraggable(stickerEl);
      });
      
      // Update sticker count
      const sizeCard = document.getElementById(selectedSizeId);
      const maxStickers = parseInt(sizeCard.getAttribute(`data-max-stickers-${selectedStickerSize}cm`));
      document.getElementById('sticker-count').innerHTML = `Stickers: <span>${stickers.length}</span> / <span id="max-stickers">${maxStickers}</span>`;
    }
  } catch (error) {
    console.error('Error loading saved design:', error);
  }
  
  function makeElementDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    element.addEventListener('mousedown', dragMouseDown);
    element.addEventListener('touchstart', dragTouchStart, { passive: false });
    
    function dragMouseDown(e) {
      e.preventDefault();
      // Get mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      
      element.classList.add('sticker-dragging');
      
      // Call a function whenever the cursor moves:
      document.addEventListener('mousemove', elementDrag);
      document.addEventListener('mouseup', closeDragElement);
    }
    
    function dragTouchStart(e) {
      e.preventDefault();
      // Get touch position at startup:
      pos3 = e.touches[0].clientX;
      pos4 = e.touches[0].clientY;
      
      element.classList.add('sticker-dragging');
      
      // Call a function whenever the finger moves:
      document.addEventListener('touchmove', elementTouchDrag, { passive: false });
      document.addEventListener('touchend', closeDragElement);
    }
    
    function elementDrag(e) {
      e.preventDefault();
      // Calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      
      // Set the element's new position:
      const newTop = (element.offsetTop - pos2);
      const newLeft = (element.offsetLeft - pos1);
      
      // Keep sticker inside canvas
      const canvas = document.getElementById('canvas-container');
      const maxX = canvas.offsetWidth - element.offsetWidth;
      const maxY = canvas.offsetHeight - element.offsetHeight;
      
      element.style.top = `${Math.max(0, Math.min(maxY, newTop))}px`;
      element.style.left = `${Math.max(0, Math.min(maxX, newLeft))}px`;
    }
    
    function elementTouchDrag(e) {
      e.preventDefault();
      // Calculate the new touch position:
      pos1 = pos3 - e.touches[0].clientX;
      pos2 = pos4 - e.touches[0].clientY;
      pos3 = e.touches[0].clientX;
      pos4 = e.touches[0].clientY;
      
      // Set the element's new position:
      const newTop = (element.offsetTop - pos2);
      const newLeft = (element.offsetLeft - pos1);
      
      // Keep sticker inside canvas
      const canvas = document.getElementById('canvas-container');
      const maxX = canvas.offsetWidth - element.offsetWidth;
      const maxY = canvas.offsetHeight - element.offsetHeight;
      
      element.style.top = `${Math.max(0, Math.min(maxY, newTop))}px`;
      element.style.left = `${Math.max(0, Math.min(maxX, newLeft))}px`;
    }
    
    function closeDragElement() {
      // Stop moving when mouse button / touch is released:
      document.removeEventListener('mousemove', elementDrag);
      document.removeEventListener('mouseup', closeDragElement);
      document.removeEventListener('touchmove', elementTouchDrag);
      document.removeEventListener('touchend', closeDragElement);
      
      element.classList.remove('sticker-dragging');
      
      // Save design state
      saveDesignState();
    }
  }
  
  function saveDesignState() {
    // Get all stickers from the canvas
    const stickerElements = document.querySelectorAll('#canvas-container .sticker');
    const stickers = [];
    
    stickerElements.forEach((stickerEl, index) => {
      const img = stickerEl.querySelector('img');
      stickers.push({
        id: `saved-${index}`,
        src: img.src,
        size: stickerEl.style.width === '100px' ? '5' : '7',
        x: parseInt(stickerEl.style.left),
        y: parseInt(stickerEl.style.top)
      });
    });
    
    const designState = {
      selectedSizeId,
      selectedStickerSize,
      stickers
    };
    
    localStorage.setItem('pedriixd-design', JSON.stringify(designState));
  }
}