import { AddOn } from '../types/hotel';

export const addOns: AddOn[] = [
  {
    id: 'artisan-breakfast',
    name: 'Organic Citrus Garden Breakfast',
    description: 'Fresh pressed Valencia juice, house-baked pastries, avocado tartine, heirloom eggs, and pour-over coffee served at The Citrus Terrace or directly to your room.',
    price: 32,
    basis: 'per person',
    category: 'dining',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'valet-parking',
    name: 'Secure Valet & Covered EV Parking',
    description: 'Unlimited in-and-out privileges with dedicated Tesla and universal Level 2 EV charging stations in our secure gated motor court.',
    price: 38,
    basis: 'per night',
    category: 'convenience',
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'airport-transfer',
    name: 'Private Airport Chauffeur (BUR / LAX)',
    description: 'Direct door-to-door private luxury vehicle transfer between the resort and Hollywood Burbank (BUR) or Los Angeles International (LAX) airport.',
    price: 95,
    basis: 'per stay',
    category: 'convenience',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'early-checkin',
    name: 'Guaranteed 1:00 PM Early Arrival',
    description: 'Ensure your suite or villa is freshly prepared, inspected, and ready by 1:00 PM on arrival day, with luggage staging and chilled refreshments.',
    price: 50,
    basis: 'per stay',
    category: 'convenience',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'late-checkout',
    name: 'Relaxed 2:00 PM Late Departure',
    description: 'Take your time enjoying the morning sun, poolside shade, and a slow packing pace with departure extended to 2:00 PM.',
    price: 50,
    basis: 'per stay',
    category: 'convenience',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'pet-concierge',
    name: 'El Royale Pet Concierge Package',
    description: 'Custom ceramic water bowls, plush orthopedic pet mattress, organic artisanal treats, waste bags, and curated walking map of local Burbank parks.',
    price: 75,
    basis: 'per stay',
    category: 'convenience',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'botanical-spa',
    name: '60-Minute Botanical Citrus Massage',
    description: 'Restorative full-body therapeutic treatment using cold-pressed sweet orange and calming sage oils in the outdoor garden cabana.',
    price: 165,
    basis: 'per person',
    category: 'wellness',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'celebration-package',
    name: 'Chilled Champagne & Citrus Platter',
    description: 'Chilled bottle of grower Champagne on ice, hand-dipped dark chocolate citrus peels, fresh seasonal orchard fruit, and personalized calligraphed card.',
    price: 85,
    basis: 'per stay',
    category: 'celebration',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop'
  }
];
