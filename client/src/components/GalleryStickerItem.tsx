interface GalleryStickerItemProps {
  src: string;
  category: string;
  size: string;
  onAddToCanvas: () => void;
}

export default function GalleryStickerItem({ 
  src, 
  category, 
  size, 
  onAddToCanvas 
}: GalleryStickerItemProps) {
  return (
    <div 
      className="bg-white p-2 rounded-lg shadow-custom hover:shadow-custom-hover transition duration-300 ease-in-out"
      data-category={category}
    >
      <img 
        src={src} 
        alt={`${category} sticker`} 
        className="w-full aspect-square object-cover rounded"
        loading="lazy"
      />
      <div className="flex justify-between items-center mt-2">
        <button 
          className="add-to-canvas text-xs bg-primary text-white px-2 py-1 rounded hover:bg-primary-dark transition-colors"
          onClick={onAddToCanvas}
        >
          Añadir
        </button>
        <span className="text-xs text-neutral-dark">{size}cm</span>
      </div>
    </div>
  );
}
