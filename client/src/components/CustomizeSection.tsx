import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import SizeCard from './SizeCard';
import StickerCanvas from './StickerCanvas';
import StickerSelector from './StickerSelector';
import PreviewModal from './PreviewModal';
import { Sticker, StickerSize, SizeData, PlanchaSize } from '../lib/types';
import { sizeOptions } from '../lib/stickerData';
import { generateId, getRandomPosition, getStickerPixelSize, downloadFile, dataURLtoBlob, getWhatsAppShareUrl, saveStickersToLocalStorage, loadStickersFromLocalStorage } from '../lib/utils';

export default function CustomizeSection() {
  // State for customization section
  const [selectedSize, setSelectedSize] = useState<PlanchaSize | null>(null);
  const [selectedStickerSize, setSelectedStickerSize] = useState<StickerSize>('5');
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [maxStickers, setMaxStickers] = useState(0);
  const [showCanvas, setShowCanvas] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  
  // References
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Load saved design on component mount
  useEffect(() => {
    const savedSize = localStorage.getItem('selectedSize') as PlanchaSize | null;
    const savedStickerSize = localStorage.getItem('selectedStickerSize') as StickerSize | null;
    const savedStickers = loadStickersFromLocalStorage();
    
    if (savedSize) {
      setSelectedSize(savedSize);
      setShowCanvas(true);
      setShowActions(true);
    }
    
    if (savedStickerSize) {
      setSelectedStickerSize(savedStickerSize);
    }
    
    if (savedStickers.length > 0) {
      setStickers(savedStickers);
    }
  }, []);
  
  // Update max stickers when size or sticker size changes
  useEffect(() => {
    if (!selectedSize) return;
    
    const sizeData = sizeOptions.find(size => size.id === selectedSize);
    if (sizeData) {
      setMaxStickers(selectedStickerSize === '5' ? sizeData.maxStickers5cm : sizeData.maxStickers7cm);
    }
  }, [selectedSize, selectedStickerSize]);
  
  // Save state changes to local storage
  useEffect(() => {
    if (selectedSize) {
      localStorage.setItem('selectedSize', selectedSize);
    }
    
    localStorage.setItem('selectedStickerSize', selectedStickerSize);
    saveStickersToLocalStorage(stickers);
  }, [selectedSize, selectedStickerSize, stickers]);
  
  // Handle size card selection
  const handleSizeSelect = (sizeId: string) => {
    setSelectedSize(sizeId as PlanchaSize);
    setShowCanvas(true);
    setShowActions(true);
  };
  
  // Handle sticker size change
  const handleStickerSizeChange = (size: StickerSize) => {
    setSelectedStickerSize(size);
  };
  
  // Add sticker to canvas
  const handleAddSticker = (src: string) => {
    if (stickers.length >= maxStickers) {
      alert(`Has alcanzado el límite máximo de ${maxStickers} stickers para este tamaño.`);
      return;
    }
    
    if (!canvasRef.current) return;
    
    const canvasWidth = canvasRef.current.clientWidth;
    const canvasHeight = canvasRef.current.clientHeight;
    const stickerSize = getStickerPixelSize(selectedStickerSize);
    const { x, y } = getRandomPosition(canvasWidth, canvasHeight, stickerSize);
    
    const newSticker: Sticker = {
      id: generateId(),
      src,
      size: selectedStickerSize,
      x,
      y
    };
    
    setStickers(prev => [...prev, newSticker]);
  };
  
  // Handle sticker upload
  const handleStickerUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        // Save to custom stickers
        const customStickers = JSON.parse(localStorage.getItem('customStickers') || '[]');
        customStickers.push(result);
        localStorage.setItem('customStickers', JSON.stringify(customStickers));
        
        // Add to canvas
        handleAddSticker(result);
      }
    };
    reader.readAsDataURL(file);
  };
  
  // Update sticker position
  const handleStickerMove = (id: string, x: number, y: number) => {
    setStickers(prev => 
      prev.map(sticker => 
        sticker.id === id
          ? { ...sticker, x, y }
          : sticker
      )
    );
  };
  
  // Clear canvas
  const handleClearCanvas = () => {
    setStickers([]);
  };
  
  // Show preview modal
  const handleShowPreview = () => {
    setPreviewOpen(true);
  };
  
  // Close preview modal
  const handleClosePreview = () => {
    setPreviewOpen(false);
  };
  
  // Confirm design in preview
  const handleConfirmDesign = () => {
    setPreviewOpen(false);
    alert('¡Diseño confirmado! Puedes descargarlo o enviarlo por WhatsApp.');
  };
  
  // Download design
  const handleDownloadDesign = async () => {
    if (!canvasRef.current) return;
    
    try {
      const canvas = await html2canvas(canvasRef.current);
      const imageData = canvas.toDataURL('image/png');
      downloadFile(imageData, 'mi-plancha-stickers.png');
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Hubo un error al generar la imagen. Por favor intenta de nuevo.');
    }
  };
  
  // Send design via WhatsApp
  const handleWhatsAppShare = async () => {
    if (!canvasRef.current) return;
    
    try {
      const canvas = await html2canvas(canvasRef.current);
      const imageData = canvas.toDataURL('image/png');
      localStorage.setItem('stickerSheetImage', imageData);
      
      const message = 'Hola, acá está mi diseño de plancha personalizada.';
      const whatsappUrl = getWhatsAppShareUrl(message);
      window.open(whatsappUrl, '_blank');
    } catch (error) {
      console.error('Error generating image for WhatsApp:', error);
      alert('Hubo un error al preparar la imagen. Por favor intenta de nuevo.');
    }
  };
  
  return (
    <section className="py-8">
      <h2 className="font-poppins font-semibold text-2xl md:text-3xl text-center mb-8">
        Personaliza tu plancha
      </h2>
      
      {/* Size Selection */}
      <div className="mb-10">
        <h3 className="font-poppins font-medium text-xl mb-4">
          1. Selecciona el tamaño de tu plancha
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sizeOptions.map((size: SizeData) => (
            <SizeCard 
              key={size.id}
              id={`size-${size.id}`}
              title={size.title}
              description={size.description}
              maxStickers5cm={size.maxStickers5cm}
              maxStickers7cm={size.maxStickers7cm}
              price={size.price}
              isSelected={selectedSize === size.id}
              onSelect={() => handleSizeSelect(size.id)}
            />
          ))}
        </div>
      </div>
      
      {/* Canvas Container */}
      {showCanvas && (
        <div id="canvas-container-wrapper" className="mb-10">
          <h3 className="font-poppins font-medium text-xl mb-4">
            2. Arrastra stickers a tu plancha
          </h3>
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Canvas */}
            <div className="w-full lg:w-2/3">
              <StickerCanvas
                stickers={stickers}
                stickerCount={stickers.length}
                maxStickers={maxStickers}
                onStickerMove={handleStickerMove}
                onClearCanvas={handleClearCanvas}
              />
            </div>
            
            {/* Sticker Selector */}
            <StickerSelector
              selectedSize={selectedStickerSize}
              onStickerSizeChange={handleStickerSizeChange}
              onStickerSelect={handleAddSticker}
              onStickerUpload={handleStickerUpload}
            />
          </div>
        </div>
      )}
      
      {/* Canvas Actions */}
      {showActions && (
        <div id="canvas-actions" className="text-center">
          <h3 className="font-poppins font-medium text-xl mb-6">
            3. Finaliza tu plancha
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              id="btn-preview" 
              className="bg-primary text-white px-6 py-3 rounded-lg shadow-custom hover:bg-primary-dark transition duration-300 ease-in-out"
              onClick={handleShowPreview}
            >
              <i className="fas fa-eye mr-2"></i> Ver vista previa
            </button>
            
            <button 
              id="btn-download" 
              className="bg-secondary text-neutral-dark px-6 py-3 rounded-lg shadow-custom hover:bg-secondary/80 transition duration-300 ease-in-out"
              onClick={handleDownloadDesign}
            >
              <i className="fas fa-download mr-2"></i> Descargar diseño
            </button>
            
            <button
              id="btn-whatsapp"
              className="bg-[#25D366] text-white px-6 py-3 rounded-lg shadow-custom hover:bg-[#20BA5A] transition duration-300 ease-in-out"
              onClick={handleWhatsAppShare}
            >
              <i className="fab fa-whatsapp mr-2"></i> Enviar por WhatsApp
            </button>
          </div>
        </div>
      )}
      
      {/* Preview Modal */}
      <PreviewModal
        isOpen={previewOpen}
        canvasRef={canvasRef}
        onClose={handleClosePreview}
        onConfirm={handleConfirmDesign}
      />
    </section>
  );
}
