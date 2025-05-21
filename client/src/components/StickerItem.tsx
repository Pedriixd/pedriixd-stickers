interface StickerItemProps {
  src: string;
  onClick: () => void;
}

export default function StickerItem({ src, onClick }: StickerItemProps) {
  return (
    <div 
      className="sticker-item bg-white p-2 rounded shadow-sm hover:bg-primary-light/10 transition duration-300 ease-in-out cursor-pointer"
      onClick={onClick}
    >
      <img 
        src={src} 
        alt="Sticker" 
        className="w-full h-20 object-cover rounded"
        loading="lazy"
      />
    </div>
  );
}
