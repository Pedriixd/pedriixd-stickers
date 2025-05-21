export type StickerSize = '5' | '7';
export type PlanchaSize = 'small' | 'medium' | 'large';

export interface SizeCardProps {
  id: string;
  title: string;
  description: string;
  maxStickers5cm: number;
  maxStickers7cm: number;
  price: number;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export interface StickerData {
  id: string;
  src: string;
  category: string;
}

export interface Sticker {
  id: string;
  src: string;
  size: StickerSize;
  x: number;
  y: number;
}

export interface SizeData {
  id: PlanchaSize;
  title: string;
  description: string;
  dimensions: string;
  maxStickers5cm: number;
  maxStickers7cm: number;
  price: number;
  isPopular?: boolean;
}
