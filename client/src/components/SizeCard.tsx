import { SizeCardProps } from '../lib/types';

export default function SizeCard({ 
  id, 
  title, 
  description, 
  maxStickers5cm, 
  maxStickers7cm, 
  price, 
  isSelected, 
  onSelect 
}: SizeCardProps) {
  return (
    <div 
      id={id}
      onClick={() => onSelect(id)}
      className={`bg-white p-6 rounded-lg shadow-custom hover:shadow-custom-hover hover:-translate-y-1 transition duration-300 ease-in-out cursor-pointer border-2 ${
        isSelected ? 'border-primary' : 'border-transparent'
      }`}
      data-max-stickers-5cm={maxStickers5cm}
      data-max-stickers-7cm={maxStickers7cm}
      data-price={price}
    >
      <h4 className="font-poppins font-semibold text-lg text-primary mb-2">{title}</h4>
      <p className="mb-3">{description}</p>
      <ul className="list-inside mb-4 text-sm">
        <li>Máx. {maxStickers5cm} stickers de 5 cm</li>
        <li>Máx. {maxStickers7cm} stickers de 7 cm</li>
      </ul>
      <p className="font-semibold text-lg text-primary">${price}</p>
    </div>
  );
}
