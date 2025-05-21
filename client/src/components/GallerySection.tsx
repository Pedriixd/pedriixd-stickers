import { useState } from 'react';
import { stickers } from '../lib/stickerData';
import GalleryStickerItem from './GalleryStickerItem';

interface GallerySectionProps {
  onAddStickerToCanvas: (src: string, size: string) => void;
}

export default function GallerySection({ onAddStickerToCanvas }: GallerySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('5');
  const [customStickers, setCustomStickers] = useState<string[]>([]);
  
  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  
  // Handle sticker upload
  const handleStickerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const imageDataUrl = event.target?.result as string;
      
      // Add to custom stickers
      setCustomStickers(prev => [...prev, imageDataUrl]);
      
      // Save to localStorage
      const savedStickers = JSON.parse(localStorage.getItem('customStickers') || '[]');
      savedStickers.push(imageDataUrl);
      localStorage.setItem('customStickers', JSON.stringify(savedStickers));
      
      // Show success message
      alert('Tu sticker se ha subido correctamente a la galería');
    };
    
    reader.readAsDataURL(file);
    
    // Reset input
    e.target.value = '';
  };
  
  // Handle "Load more" button click
  const handleLoadMore = () => {
    alert('Función en desarrollo: Próximamente más stickers disponibles!');
  };
  
  // Filtered stickers based on selected category
  const filteredStickers = selectedCategory === 'all'
    ? stickers
    : stickers.filter(sticker => sticker.category === selectedCategory);
  
  return (
    <section className="py-8">
      <h2 className="font-poppins font-semibold text-2xl md:text-3xl text-center mb-8">
        Galería de Stickers
      </h2>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex flex-wrap gap-2">
          <button 
            className={`category-btn px-4 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out ${
              selectedCategory === 'all' ? 'bg-primary text-white' : 'bg-white text-neutral-dark hover:bg-primary hover:text-white'
            }`}
            onClick={() => handleCategoryChange('all')}
            data-category="all"
          >
            Todos
          </button>
          <button 
            className={`category-btn px-4 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out ${
              selectedCategory === 'mates' ? 'bg-primary text-white' : 'bg-white text-neutral-dark hover:bg-primary hover:text-white'
            }`}
            onClick={() => handleCategoryChange('mates')}
            data-category="mates"
          >
            Mates
          </button>
          <button 
            className={`category-btn px-4 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out ${
              selectedCategory === 'computadoras' ? 'bg-primary text-white' : 'bg-white text-neutral-dark hover:bg-primary hover:text-white'
            }`}
            onClick={() => handleCategoryChange('computadoras')}
            data-category="computadoras"
          >
            Computadoras
          </button>
          <button 
            className={`category-btn px-4 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out ${
              selectedCategory === 'personajes' ? 'bg-primary text-white' : 'bg-white text-neutral-dark hover:bg-primary hover:text-white'
            }`}
            onClick={() => handleCategoryChange('personajes')}
            data-category="personajes"
          >
            Personajes
          </button>
          <button 
            className={`category-btn px-4 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out ${
              selectedCategory === 'anime' ? 'bg-primary text-white' : 'bg-white text-neutral-dark hover:bg-primary hover:text-white'
            }`}
            onClick={() => handleCategoryChange('anime')}
            data-category="anime"
          >
            Anime
          </button>
        </div>
        
        <div className="w-full md:w-auto">
          <label htmlFor="upload-gallery-sticker" className="block text-sm font-medium mb-2">Sube tu sticker</label>
          <input 
            type="file" 
            id="upload-gallery-sticker" 
            accept="image/*" 
            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-primary file:text-white hover:file:bg-primary-dark"
            onChange={handleStickerUpload}
          />
        </div>
      </div>
      
      <div className="sticker-gallery grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        {/* Display filtered stickers */}
        {filteredStickers.map(sticker => (
          <GalleryStickerItem 
            key={sticker.id}
            src={sticker.src}
            category={sticker.category}
            size={selectedSize}
            onAddToCanvas={() => onAddStickerToCanvas(sticker.src, selectedSize)}
          />
        ))}
        
        {/* Display custom stickers */}
        {customStickers.map((src, index) => (
          <GalleryStickerItem 
            key={`custom-${index}`}
            src={src}
            category="custom"
            size={selectedSize}
            onAddToCanvas={() => onAddStickerToCanvas(src, selectedSize)}
          />
        ))}
      </div>
      
      <div className="text-center">
        <button 
          id="load-more-btn" 
          className="bg-primary text-white px-6 py-3 rounded-lg shadow-custom hover:bg-primary-dark transition duration-300 ease-in-out"
          onClick={handleLoadMore}
        >
          Cargar más stickers
        </button>
      </div>
    </section>
  );
}
