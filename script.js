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
      
      // Update max stickers
      updateMaxStickers();
      
      // Scroll to canvas
      document.getElementById('canvas-container-wrapper').scrollIntoView({ behavior: 'smooth' });
    });
  });
  
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
    
    // Example stickers - in a real app, these would come from a database
    const stickerImages = [
      'https://cdn.pixabay.com/photo/2021/02/07/19/48/snowboarding-5992271_1280.png',
      'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png',
      'https://cdn.pixabay.com/photo/2013/07/13/09/51/cat-156291_960_720.png',
      'https://cdn.pixabay.com/photo/2016/03/31/19/50/checklist-1295319_960_720.png',
      'https://cdn.pixabay.com/photo/2014/04/03/10/00/cloud-309749_960_720.png',
      'https://cdn.pixabay.com/photo/2017/01/31/15/33/computer-2025130_960_720.png',
      'https://cdn.pixabay.com/photo/2016/06/13/17/30/mail-1454731_960_720.png',
      'https://cdn.pixabay.com/photo/2020/01/21/18/30/wordpress-4783716_960_720.png'
    ];
    
    stickerImages.forEach(imgSrc => {
      createStickerItem(selectorContainer, imgSrc);
    });
  }
  
  function createStickerItem(selectorContainer, imgSrc) {
    const stickerItem = document.createElement('div');
    stickerItem.className = 'sticker-item';
    
    const stickerImg = document.createElement('img');
    stickerImg.src = imgSrc;
    stickerImg.alt = 'Sticker';
    
    stickerItem.appendChild(stickerImg);
    selectorContainer.appendChild(stickerItem);
    
    stickerItem.addEventListener('click', function() {
      if (stickers.length >= maxStickers) {
        alert(`Has alcanzado el límite máximo de ${maxStickers} stickers para esta plancha y tamaño de sticker.`);
        return;
      }
      
      addStickerToCanvas(imgSrc);
    });
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
    
    // Clear existing stickers
    if (category === 'all') {
      galleryContainer.innerHTML = '';
    }
    
    // Example stickers with categories - in a real app, these would come from a database
    const galleryStickers = [
      { src: 'https://cdn.pixabay.com/photo/2021/02/07/19/48/snowboarding-5992271_1280.png', category: 'personajes' },
      { src: 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png', category: 'computadoras' },
      { src: 'https://cdn.pixabay.com/photo/2013/07/13/09/51/cat-156291_960_720.png', category: 'personajes' },
      { src: 'https://cdn.pixabay.com/photo/2016/03/31/19/50/checklist-1295319_960_720.png', category: 'computadoras' },
      { src: 'https://cdn.pixabay.com/photo/2014/04/03/10/00/cloud-309749_960_720.png', category: 'computadoras' },
      { src: 'https://cdn.pixabay.com/photo/2017/01/31/15/33/computer-2025130_960_720.png', category: 'computadoras' },
      { src: 'https://cdn.pixabay.com/photo/2016/06/13/17/30/mail-1454731_960_720.png', category: 'computadoras' },
      { src: 'https://cdn.pixabay.com/photo/2020/01/21/18/30/wordpress-4783716_960_720.png', category: 'computadoras' },
      { src: 'https://cdn.pixabay.com/photo/2014/04/02/10/25/coffee-304113_960_720.png', category: 'mates' },
      { src: 'https://cdn.pixabay.com/photo/2016/03/31/19/14/coffee-1294698_960_720.png', category: 'mates' },
      { src: 'https://cdn.pixabay.com/photo/2017/08/06/12/28/tea-2592247_960_720.png', category: 'mates' },
      { src: 'https://cdn.pixabay.com/photo/2014/12/21/23/34/tea-576260_960_720.png', category: 'mates' }
    ];
    
    // Filter by category if needed
    const filteredStickers = category === 'all' ? 
      galleryStickers : 
      galleryStickers.filter(sticker => sticker.category === category);
    
    // Add stickers to gallery
    filteredStickers.forEach(sticker => {
      addStickerToGallery(sticker.src, sticker.category, category);
    });
  }
  
  function addStickerToGallery(src, title, category) {
    const galleryContainer = document.querySelector('.sticker-gallery');
    
    const stickerItem = document.createElement('div');
    stickerItem.className = 'gallery-sticker-item';
    stickerItem.setAttribute('data-category', category);
    
    const stickerImg = document.createElement('img');
    stickerImg.src = src;
    stickerImg.alt = title;
    
    const stickerFooter = document.createElement('div');
    stickerFooter.className = 'gallery-sticker-item-footer';
    
    const stickerSize = document.createElement('span');
    stickerSize.className = 'sticker-size';
    stickerSize.textContent = selectedStickerSize + 'cm';
    
    const addButton = document.createElement('button');
    addButton.className = 'add-to-canvas';
    addButton.textContent = 'Agregar';
    
    stickerFooter.appendChild(stickerSize);
    stickerFooter.appendChild(addButton);
    
    stickerItem.appendChild(stickerImg);
    stickerItem.appendChild(stickerFooter);
    
    galleryContainer.appendChild(stickerItem);
    
    // Add click event to add to canvas
    addButton.addEventListener('click', function() {
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
  
  // Confirm design
  document.getElementById('confirm-design').addEventListener('click', function() {
    // Get canvas content
    html2canvas(document.getElementById('preview-content')).then(canvas => {
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
      
      // Close modal
      document.getElementById('preview-modal').classList.remove('active');
    });
  });
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