export type SellMode = 'byType' | 'byUnit';
export type RoomCategory = 'room' | 'suite' | 'villa';
export type ViewType = 'garden' | 'pool' | 'mountain' | 'courtyard';

export interface Accommodation {
  id: string;
  name: string;
  slug: string;
  sellMode: SellMode;
  category: RoomCategory;
  sleeps: number;
  bedrooms: number;
  bedConfig: string;
  sizeSqft: number;
  view: ViewType;
  floorZone: string;
  amenities: string[];
  features: string[]; // e.g. 'private plunge pool', 'terrace', 'kitchen', 'accessible', 'pet friendly', 'balcony'
  gallery: string[];
  shortDescription: string;
  longDescription: string;
  basePrice: number;
  accessible: boolean;
  mapX?: number; // 0 to 100 percentage
  mapY?: number; // 0 to 100 percentage
  floorPlanImage?: string;
  policies?: {
    maxOccupancy: number;
    extraPersonFee: number;
    petPolicy: string;
    accessibilityNotes: string;
  };
}

export interface RatePlan {
  id: string;
  name: string;
  tagline: string;
  code?: string;
  description?: string;
  cancellationPolicy: string;
  paymentPolicy: string;
  depositPolicy?: string;
  discountMultiplier: number; // 1.0, 0.88, etc.
  priceMultiplier?: number;
  inclusions: string[];
  depositPercent?: number;
  requiresMember?: boolean;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  basis: 'per stay' | 'per night' | 'per person' | string;
  isPerNight?: boolean;
  category: 'dining' | 'wellness' | 'convenience' | 'celebration' | string;
  image: string;
}

export interface Offer {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  validityWindow: string;
  minStay: number;
  inclusions: string[];
  ratePlanId: string;
  applicableUnits: string[];
  description: string;
  terms: string;
  image: string;
}

export interface Attraction {
  id: string;
  name: string;
  slug: string;
  category: 'attractions' | 'studios' | 'dining' | 'nightlife' | 'shopping' | 'nature' | 'transport' | 'airports' | string;
  lat: number;
  lng: number;
  distanceMiles: number;
  distanceKm: number;
  driveTimeMin: number;
  walkTimeMin?: number;
  oneLineDescription: string;
  longDescription: string;
  fullDescription?: string;
  address?: string;
  insiderTip?: string;
  admissionFee?: string;
  image: string;
  openingHours: string;
  practicalInfo?: {
    admission?: string;
    bestTime?: string;
    parking?: string;
  };
  ticketUrl?: string;
}

export interface DiningOutlet {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  hours: string;
  dressCode?: string;
  description: string;
  image: string;
  locationOnGrounds?: string;
  reservationsPolicy?: string;
  sampleMenu?: {
    name: string;
    description: string;
    price: string | number;
    category: string;
  }[];
  menu: {
    category: string;
    items: {
      name: string;
      description: string;
      price: number;
      dietary?: string;
    }[];
  }[];
}

export interface Review {
  id: string;
  quote: string;
  author: string;
  stayDate: string;
  source: string;
  rating: number;
  category: 'villa' | 'grounds' | 'service' | 'dining' | string;
  roomType?: string;
}

export interface FAQItem {
  id: string;
  category: 'Reservations' | 'Property & Grounds' | 'Pets & Access' | 'Dining & Experiences';
  question: string;
  answer: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  category: 'Architecture' | 'Rooms & Suites' | 'Villas & Gardens' | 'Pool & Shade' | 'Dining' | 'Grounds' | string;
  aspect?: string;
  caption?: string;
}

export interface BookingState {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  selectedUnitId?: string;
  selectedRatePlanId?: string;
  selectedAddOns: { addOnId: string; quantity: number }[];
  promoCode?: string;
  guestDetails?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    estimatedArrival: string;
    specialRequests: string;
    marketingConsent: boolean;
  };
}

export interface Reservation {
  reference: string;
  guestName: string;
  email: string;
  phone: string;
  unitId: string;
  unitName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  ratePlanId: string;
  ratePlanName: string;
  source: string;
  status: 'Confirmed' | 'Checked In' | 'Checked Out' | 'Cancelled';
  balance: number;
  totalPaid: number;
  totalCost: number;
  addOns: { name: string; cost: number; quantity: number }[];
  bookedOn: string;
  estimatedArrival: string;
  specialRequests: string;
  notes?: string;
}
