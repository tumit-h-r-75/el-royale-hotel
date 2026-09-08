import { GalleryPhoto } from '../types/hotel';

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'Main Pavilion at Twilight',
    category: 'Architecture',
    url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1600&auto=format&fit=crop',
    aspect: 'horizontal'
  },
  {
    id: 'gal-2',
    title: 'Limestone Archway and Shade Corridors',
    category: 'Architecture',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop',
    aspect: 'vertical'
  },
  {
    id: 'gal-3',
    title: 'Classic King Washed Belgian Linen Bedding',
    category: 'Rooms & Suites',
    url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1600&auto=format&fit=crop',
    aspect: 'horizontal'
  },
  {
    id: 'gal-4',
    title: 'Studio Suite Kitchenette & Living Salon',
    category: 'Rooms & Suites',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
    aspect: 'horizontal'
  },
  {
    id: 'gal-5',
    title: 'Garden Villa 1 Private Heated Mineral Plunge Pool',
    category: 'Villas & Gardens',
    url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1600&auto=format&fit=crop',
    aspect: 'horizontal'
  },
  {
    id: 'gal-6',
    title: 'Outdoor Copper Soaking Tub at Garden Villa 2',
    category: 'Villas & Gardens',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop',
    aspect: 'vertical'
  },
  {
    id: 'gal-7',
    title: '75-Foot Shaded Resort Lap Pool',
    category: 'Pool & Shade',
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600&auto=format&fit=crop',
    aspect: 'horizontal'
  },
  {
    id: 'gal-8',
    title: 'Sun Loungers beneath Canary Island Palms',
    category: 'Pool & Shade',
    url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1600&auto=format&fit=crop',
    aspect: 'horizontal'
  },
  {
    id: 'gal-9',
    title: 'Al Fresco Table Setting at The Citrus Terrace',
    category: 'Dining',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop',
    aspect: 'horizontal'
  },
  {
    id: 'gal-10',
    title: 'Wood-Fired Small Plates and Natural Wines',
    category: 'Dining',
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1600&auto=format&fit=crop',
    aspect: 'vertical'
  },
  {
    id: 'gal-11',
    title: 'Century-Old Heritage Olive Grove Walking Path',
    category: 'Grounds',
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop',
    aspect: 'horizontal'
  },
  {
    id: 'gal-12',
    title: 'Heirloom Valencia Orange Trees in Afternoon Light',
    category: 'Grounds',
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600&auto=format&fit=crop',
    aspect: 'horizontal'
  }
];

export const GALLERY_CATEGORIES = [
  { id: 'all', label: 'All Photographs' },
  { id: 'Architecture', label: 'Architecture' },
  { id: 'Rooms & Suites', label: 'Rooms & Suites' },
  { id: 'Villas & Gardens', label: 'Villas & Gardens' },
  { id: 'Pool & Shade', label: 'Pool & Cabanas' },
  { id: 'Dining', label: 'Dining & Provisions' },
  { id: 'Grounds', label: 'Citrus Groves & Grounds' }
];
