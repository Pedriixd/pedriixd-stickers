import { useEffect, useRef, useState } from 'react';
import { Sticker, StickerSize } from '../lib/types';
import { getStickerPixelSize } from '../lib/utils';

interface StickerCanvasProps {
  stickers: Sticker[];
  stickerCount: number;
  maxStickers: number;
  onStickerMove: (id: string, x: number, y: number) => void;
  onClearCanvas: () => void;
}

export default function StickerCanvas({ 
  stickers, 
  stickerCount, 
  maxStickers, 
  onStickerMove, 
  onClearCanvas 
}: StickerCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [activeStickerRef, setActiveStickerRef] = useState<{id: string, initialX: number, initialY: number} | null>(null);
  
  // Setup drag and drop functionality
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (activeStickerRef && canvasRef.current) {
        const canvasRect = canvasRef.current.getBoundingClientRect();
        
        // Calculate new position relative to canvas
        const newX = e.clientX - canvasRect.left - activeStickerRef.initialX;
        const newY = e.clientY - canvasRect.top - activeStickerRef.initialY;
        
        // Update sticker position
        onStickerMove(activeStickerRef.id, newX, newY);
      }
    };
    
    const handleMouseUp = () => {
      setActiveStickerRef(null);
    };
    
    if (activeStickerRef) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [activeStickerRef, onStickerMove]);
  
  // Handle mouse down on a sticker
  const handleStickerMouseDown = (e: React.MouseEvent, sticker: Sticker) => {
    const target = e.currentTarget as HTMLDivElement;
    const rect = target.getBoundingClientRect();
    
    // Calculate initial click position relative to the sticker
    const initialX = e.clientX - rect.left;
    const initialY = e.clientY - rect.top;
    
    setActiveStickerRef({
      id: sticker.id,
      initialX,
      initialY
    });
  };
  
  return (
    <div className="w-full">
      <div 
        id="canvas-container" 
        ref={canvasRef}
        className="bg-white bg-pattern border-2 border-dashed border-gray-300 rounded-lg w-full h-96 relative overflow-hidden"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23f0f0f0\' fill-opacity=\'0.5\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")'
        }}
      >
        {stickers.map(sticker => (
          <div
            key={sticker.id}
            className={`sticker absolute cursor-move select-none shadow-md rounded transition-shadow ${
              activeStickerRef?.id === sticker.id ? 'opacity-80 z-10' : ''
            }`}
            style={{
              left: `${sticker.x}px`,
              top: `${sticker.y}px`,
              width: `${getStickerPixelSize(sticker.size)}px`,
              height: `${getStickerPixelSize(sticker.size)}px`,
            }}
            onMouseDown={(e) => handleStickerMouseDown(e, sticker)}
          >
            <img
              src={sticker.src}
              alt="Sticker"
              className="w-full h-full object-cover rounded"
              draggable="false"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4 text-sm">
        <p id="sticker-count">Stickers: <span>{stickerCount}</span> / <span id="max-stickers">{maxStickers}</span></p>
        <button 
          id="clear-canvas" 
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300 ease-in-out"
          onClick={onClearCanvas}
        >
          Limpiar
        </button>
      </div>
    </div>
  );
}
