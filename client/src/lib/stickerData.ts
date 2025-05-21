import { StickerData, SizeData } from "./types";

// Size configurations with limits and prices
export const sizeOptions: SizeData[] = [
  {
    id: 'small',
    title: '12x16cm',
    description: 'Tamaño pequeño',
    dimensions: '12x16cm',
    maxStickers5cm: 5,
    maxStickers7cm: 3,
    price: 1000
  },
  {
    id: 'medium',
    title: '14x21cm',
    description: 'Tamaño mediano',
    dimensions: '14x21cm',
    maxStickers5cm: 9,
    maxStickers7cm: 6,
    price: 1500,
    isPopular: true
  },
  {
    id: 'large',
    title: '21x27cm',
    description: 'Tamaño grande',
    dimensions: '21x27cm',
    maxStickers5cm: 19,
    maxStickers7cm: 12,
    price: 3000
  }
];

// Sticker gallery data with categories
export const stickers: StickerData[] = [
  // Anime stickers
  {
    id: 'anime1',
    src: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
    category: 'anime'
  },
  {
    id: 'anime2',
    src: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
    category: 'anime'
  },
  {
    id: 'anime3',
    src: 'https://i.pinimg.com/originals/95/5e/7d/955e7d139a599d651e1b89577bab7812.jpg',
    category: 'anime'
  },
  {
    id: 'anime4',
    src: 'https://i.pinimg.com/originals/95/be/63/95be635808396706c83862a7795a689b.jpg',
    category: 'anime'
  },
  {
    id: 'anime5',
    src: 'https://i.pinimg.com/originals/d8/3e/c6/d83ec6d27d767dc242dd43b28c06b4e4.jpg',
    category: 'anime'
  },
  {
    id: 'anime6',
    src: 'https://i.pinimg.com/originals/f0/61/15/f061150b2d3536d5edec236abfa465e7.jpg',
    category: 'anime'
  },
  
  // Tech stickers
  {
    id: 'tech1',
    src: 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
    category: 'computadoras'
  },
  {
    id: 'tech2',
    src: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
    category: 'computadoras'
  },
  {
    id: 'tech3',
    src: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
    category: 'computadoras'
  },
  {
    id: 'tech4',
    src: 'https://images.unsplash.com/photo-1555532538-dcdbd01d373d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
    category: 'computadoras'
  },
  {
    id: 'tech5',
    src: 'https://i.pinimg.com/originals/97/98/c6/9798c61d606c35e9235d3c77137aee19.jpg',
    category: 'computadoras'
  },
  {
    id: 'tech6',
    src: 'https://i.pinimg.com/originals/ad/1c/19/ad1c19ed47a3b9ce7ad9d67e92636547.jpg',
    category: 'computadoras'
  },
  
  // Mate stickers
  {
    id: 'mate1',
    src: 'https://images.unsplash.com/photo-1627483297886-49710ae1fc22?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
    category: 'mates'
  },
  {
    id: 'mate2',
    src: 'https://pixabay.com/get/g03985bc9a89f6186ca987f8fddf94c328f2a51d41e9cda5f965c45549d7aecf194a8f68865d815d60797c2031ee9b332156e1093eb4a461477d97fca30a369f0_1280.jpg',
    category: 'mates'
  },
  {
    id: 'mate3',
    src: 'https://pixabay.com/get/g7de32dddd79b4481a4a494972db5d76fda7d5fbf774c4debce033d8e2319f83b7b437b67b9d9e731b8d0a6719f544ceb90e3821c33d743c7b15f86549af64dcd_1280.jpg',
    category: 'mates'
  },
  {
    id: 'mate4',
    src: 'https://i.pinimg.com/originals/30/c2/fc/30c2fcafe84e04925b37f9e2c4d996fd.jpg',
    category: 'mates'
  },
  {
    id: 'mate5',
    src: 'https://i.pinimg.com/originals/27/83/a8/2783a8b0bd72e3ffb2e7a1f6c8649dc2.jpg',
    category: 'mates'
  },
  {
    id: 'mate6',
    src: 'https://i.pinimg.com/originals/fe/3d/76/fe3d76af4c545986c314977e59a068c6.jpg',
    category: 'mates'
  },
  
  // Character stickers
  {
    id: 'char1',
    src: 'https://images.unsplash.com/photo-1535241749838-299277b6305f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
    category: 'personajes'
  },
  {
    id: 'char2',
    src: 'https://images.unsplash.com/photo-1608889825271-9696283ab804?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
    category: 'personajes'
  },
  {
    id: 'char3',
    src: 'https://pixabay.com/get/g4d0de0b1dd4c84f27fa6134e89a91ec889d47e1f69051a74f94f5d9c7c5a580a2dfe4583e3fe85a095702f7d2e64e7da1d3de41ecb4a59bc84e44ab9f3b07e72_1280.jpg',
    category: 'personajes'
  },
  {
    id: 'char4',
    src: 'https://pixabay.com/get/g7d45b00626c3bd25f1c2ef3b28145cdb14e2a3bca7c6de4c15e78c2bdf5f9f9b2fb5f96bd731eadbd5842fd0aae4cd3f9fdc3b2b51f3f4f54dafd2c9e65eb5a3_1280.jpg',
    category: 'personajes'
  },
  {
    id: 'char5',
    src: 'https://i.pinimg.com/originals/ef/7b/9f/ef7b9f1d5f7ca3e451e1fcd70f26b7f5.jpg',
    category: 'personajes'
  },
  {
    id: 'char6',
    src: 'https://i.pinimg.com/originals/0f/a0/b2/0fa0b25f12c0e2bd6feee8e7c01d6fc9.jpg',
    category: 'personajes'
  }
];
