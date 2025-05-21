import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { StickerSize, Sticker } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Generate a unique ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

// Calculate pixel size based on sticker size (5cm or 7cm)
export function getStickerPixelSize(size: StickerSize): number {
  return size === '5' ? 70 : 98; // 5cm = 70px, 7cm = 98px
}

// Get random position within container bounds
export function getRandomPosition(containerWidth: number, containerHeight: number, stickerSize: number): { x: number; y: number } {
  const maxX = containerWidth - stickerSize;
  const maxY = containerHeight - stickerSize;
  return {
    x: Math.max(0, Math.floor(Math.random() * maxX)),
    y: Math.max(0, Math.floor(Math.random() * maxY))
  };
}

// Store stickers in local storage
export function saveStickersToLocalStorage(stickers: Sticker[]): void {
  localStorage.setItem('pedriixdStickers', JSON.stringify(stickers));
}

// Load stickers from local storage
export function loadStickersFromLocalStorage(): Sticker[] {
  const stickers = localStorage.getItem('pedriixdStickers');
  return stickers ? JSON.parse(stickers) : [];
}

// Get WhatsApp share URL
export function getWhatsAppShareUrl(message: string): string {
  return `https://wa.me/543755298440?text=${encodeURIComponent(message)}`;
}

// Convert data URL to Blob
export function dataURLtoBlob(dataurl: string): Blob {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new Blob([u8arr], { type: mime });
}

// Download file helper
export function downloadFile(url: string, filename: string): void {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
