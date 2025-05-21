import { useEffect, useState } from 'react';
import { StickerSize } from '../lib/types';
import StickerItem from './StickerItem';
import { stickers } from '../lib/stickerData';

interface StickerSelectorProps {
  selectedSize: StickerSize;
  onStickerSizeChange: (size: StickerSize) => void;
  onStickerSelect: (src: string) => void;
  onStickerUpload: (file: File) => void;
}

export default function StickerSelector({ 
  selectedSize, 
  onStickerSizeChange,
  onStickerSelect,
  onStickerUpload
}: StickerSelectorProps) {
  const [customStickers, setCustomStickers] = useState<string[]>([]);
  
  // Load custom stickers from localStorage on component mount
  useEffect(() => {
    const savedStickers = localStorage.getItem('customStickers');
    if (savedStickers) {
      setCustomStickers(JSON.parse(savedStickers));
    }
  }, []);
  
  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onStickerUpload(files[0]);
      
      // Reset input value to allow uploading the same file again
      e.target.value = '';
    }
  };

  return (
    <div className="w-full lg:w-1/3 bg-white p-4 rounded-lg shadow-custom">
      <h4 className="font-poppins font-medium text-lg mb-4">Selecciona stickers</h4>
      
      <div className="flex justify-between mb-4">
        <button 
          id="btn-sticker-5cm" 
          className={`btn-sticker-size px-3 py-1 rounded text-sm ${
            selectedSize === '5' ? 'bg-primary text-white' : 'bg-neutral-light text-neutral-dark'
          }`}
          onClick={() => onStickerSizeChange('5')}
          data-size="5"
        >
          5 cm
        </button>
        <button 
          id="btn-sticker-7cm" 
          className={`btn-sticker-size px-3 py-1 rounded text-sm ${
            selectedSize === '7' ? 'bg-primary text-white' : 'bg-neutral-light text-neutral-dark'
          }`}
          onClick={() => onStickerSizeChange('7')}
          data-size="7"
        >
          7 cm
        </button>
      </div>
      
      <div 
        id="sticker-selector" 
        className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto pr-2 mb-4"
      >
        {/* Default stickers */}
        {stickers.map((sticker) => (
          <StickerItem 
            key={sticker.id}
            src={sticker.src}
            onClick={() => onStickerSelect(sticker.src)}
          />
        ))}
        
        {/* Custom stickers */}
        {customStickers.map((src, index) => (
          <StickerItem 
            key={`custom-${index}`}
            src={src}
            onClick={() => onStickerSelect(src)}
          />
        ))}
      </div>
      
      <div className="mt-4">
        <label htmlFor="upload-sticker" className="block text-sm font-medium mb-2">Sube tu imagen</label>
        <input 
          type="file" 
          id="upload-sticker" 
          accept="image/*" 
          className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-primary file:text-white hover:file:bg-primary-dark"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
