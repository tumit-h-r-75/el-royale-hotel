import { Reservation } from '../types/hotel';

export interface GuestProfile {
  name: string;
  email: string;
  phone: string;
  memberSince: string;
  memberTier: 'Citrus Circle Member';
  preferences: {
    bed: string;
    floor: string;
    dietary: string;
    accessibility: string;
  };
  savedCards: {
    brand: string;
    last4: string;
    exp: string;
  }[];
  marketingConsent: boolean;
}

export const defaultGuestProfile: GuestProfile = {
  name: 'Camilla Moreau',
  email: 'c.moreau@designstudio.la',
  phone: '+1 (323) 555-0194',
  memberSince: 'March 2024',
  memberTier: 'Citrus Circle Member',
  preferences: {
    bed: 'Feather-free organic pillows',
    floor: 'Upper floor or quiet garden corner',
    dietary: 'Gluten-conscious, oat milk',
    accessibility: 'Standard access'
  },
  savedCards: [
    { brand: 'Visa', last4: '4242', exp: '08/27' },
    { brand: 'Amex', last4: '1009', exp: '11/26' }
  ],
  marketingConsent: false
};

export const sampleReservations: Reservation[] = [
  {
    reference: 'TNG-89421',
    guestName: 'Camilla Moreau',
    email: 'c.moreau@designstudio.la',
    phone: '+1 (323) 555-0194',
    unitId: 'villa-3',
    unitName: 'Garden Villa 3',
    checkIn: '2026-09-18',
    checkOut: '2026-09-22',
    nights: 4,
    guests: 2,
    ratePlanId: 'flexible',
    ratePlanName: 'Flexible Rate',
    source: 'Direct Web',
    status: 'Confirmed',
    balance: 3560,
    totalPaid: 0,
    totalCost: 3560,
    addOns: [
      { name: 'Organic Citrus Garden Breakfast', cost: 256, quantity: 2 },
      { name: 'Relaxed 2:00 PM Late Departure', cost: 50, quantity: 1 }
    ],
    bookedOn: '2026-09-01',
    estimatedArrival: '3:30 PM',
    specialRequests: 'Quiet location away from maintenance gate if possible. Celebrating an anniversary.',
    notes: 'Returning guest. VIP welcome card and citrus platter in villa upon arrival.'
  },
  {
    reference: 'TNG-54129',
    guestName: 'Camilla Moreau',
    email: 'c.moreau@designstudio.la',
    phone: '+1 (323) 555-0194',
    unitId: 'room-classic-king',
    unitName: 'Classic King',
    checkIn: '2026-04-12',
    checkOut: '2026-04-15',
    nights: 3,
    guests: 1,
    ratePlanId: 'member-rate',
    ratePlanName: 'Member Rate',
    source: 'Direct Web',
    status: 'Checked Out',
    balance: 0,
    totalPaid: 855,
    totalCost: 855,
    addOns: [],
    bookedOn: '2026-03-20',
    estimatedArrival: '2:00 PM',
    specialRequests: 'Extra pour-over coffee pods.',
    notes: 'Requested top floor courtyard.'
  },
  {
    reference: 'TNG-77402',
    guestName: 'Julian Sterling',
    email: 'jsterling@warnerbros.com',
    phone: '+1 (818) 555-0142',
    unitId: 'villa-1',
    unitName: 'Garden Villa 1',
    checkIn: '2026-09-08',
    checkOut: '2026-09-12',
    nights: 4,
    guests: 2,
    ratePlanId: 'advance-purchase',
    ratePlanName: 'Advance Purchase',
    source: 'Corporate Direct',
    status: 'Checked In',
    balance: 0,
    totalPaid: 2745,
    totalCost: 2745,
    addOns: [
      { name: 'Valet & Covered EV Parking', cost: 152, quantity: 1 }
    ],
    bookedOn: '2026-08-15',
    estimatedArrival: '1:00 PM',
    specialRequests: 'Tesla charging spot needed.',
    notes: 'Executive guest on Warner Bros film production.'
  },
  {
    reference: 'TNG-66219',
    guestName: 'Hannah & Sam Vance',
    email: 'hannah.vance@gmail.com',
    phone: '+1 (415) 555-0812',
    unitId: 'suite-8-penthouse',
    unitName: 'Penthouse Suite 8',
    checkIn: '2026-09-08',
    checkOut: '2026-09-10',
    nights: 2,
    guests: 2,
    ratePlanId: 'flexible',
    ratePlanName: 'Flexible Rate',
    source: 'Direct Web',
    status: 'Checked In',
    balance: 0,
    totalPaid: 2840,
    totalCost: 2840,
    addOns: [
      { name: 'Chilled Champagne & Citrus Platter', cost: 85, quantity: 1 }
    ],
    bookedOn: '2026-08-28',
    estimatedArrival: '3:00 PM',
    specialRequests: 'Rooftop hot tub pre-heated for 6:00 PM sunset.',
    notes: 'Honeymoon stay. Provide complimentary late check-out.'
  },
  {
    reference: 'TNG-90114',
    guestName: 'Dr. Aaron Patel',
    email: 'apatel@ucla.edu',
    phone: '+1 (310) 555-0371',
    unitId: 'room-deluxe-balcony-king',
    unitName: 'Deluxe Balcony King',
    checkIn: '2026-09-08',
    checkOut: '2026-09-11',
    nights: 3,
    guests: 1,
    ratePlanId: 'flexible',
    ratePlanName: 'Flexible Rate',
    source: 'Expedia / GDS',
    status: 'Confirmed',
    balance: 1140,
    totalPaid: 0,
    totalCost: 1140,
    addOns: [],
    bookedOn: '2026-09-02',
    estimatedArrival: '6:00 PM',
    specialRequests: 'Late arrival after symposium.',
    notes: 'Hold keys at reception.'
  },
  {
    reference: 'TNG-92384',
    guestName: 'Chloe Dupont',
    email: 'chloe.d@studio-paris.fr',
    phone: '+33 6 12 34 56 78',
    unitId: 'villa-5',
    unitName: 'Citrus Villa 5',
    checkIn: '2026-09-09',
    checkOut: '2026-09-14',
    nights: 5,
    guests: 3,
    ratePlanId: 'advance-purchase',
    ratePlanName: 'Advance Purchase',
    source: 'Direct Web',
    status: 'Confirmed',
    balance: 0,
    totalPaid: 3696,
    totalCost: 3696,
    addOns: [
      { name: 'Private Airport Chauffeur (BUR / LAX)', cost: 95, quantity: 1 }
    ],
    bookedOn: '2026-08-10',
    estimatedArrival: '4:00 PM',
    specialRequests: 'International flight arriving LAX; chauffeur requested.',
    notes: 'Driver assigned: Marcus.'
  },
  {
    reference: 'TNG-33410',
    guestName: 'Evelyn Reed',
    email: 'ereed@austintx.org',
    phone: '+1 (512) 555-0982',
    unitId: 'room-accessible-garden-queen',
    unitName: 'Accessible Garden Queen',
    checkIn: '2026-09-08',
    checkOut: '2026-09-09',
    nights: 1,
    guests: 2,
    ratePlanId: 'flexible',
    ratePlanName: 'Flexible Rate',
    source: 'Direct Phone',
    status: 'Checked In',
    balance: 0,
    totalPaid: 285,
    totalCost: 285,
    addOns: [],
    bookedOn: '2026-09-05',
    estimatedArrival: '2:30 PM',
    specialRequests: 'Ground floor zero-step access confirmed.',
    notes: 'Wheelchair user; ensure garden patio threshold is cleared.'
  },
  {
    reference: 'TNG-41002',
    guestName: 'Oliver Ward',
    email: 'oward@manchester.uk',
    phone: '+44 7700 900123',
    unitId: 'villa-6',
    unitName: 'Orchard Villa 6',
    checkIn: '2026-09-15',
    checkOut: '2026-09-20',
    nights: 5,
    guests: 5,
    ratePlanId: 'deposit-plan',
    ratePlanName: 'First Night Deposit',
    source: 'Tablet Hotels',
    status: 'Confirmed',
    balance: 4600,
    totalPaid: 1150,
    totalCost: 5750,
    addOns: [
      { name: 'Organic Citrus Garden Breakfast', cost: 800, quantity: 5 }
    ],
    bookedOn: '2026-08-01',
    estimatedArrival: '1:00 PM',
    specialRequests: 'Family gathering; baby cot requested for 2-year-old.',
    notes: 'Assemble wooden crib in Master bedroom.'
  },
  {
    reference: 'TNG-18920',
    guestName: 'Serena Bennett',
    email: 's.bennett@media-group.com',
    phone: '+1 (212) 555-0671',
    unitId: 'villa-2',
    unitName: 'Garden Villa 2',
    checkIn: '2026-09-02',
    checkOut: '2026-09-05',
    nights: 3,
    guests: 1,
    ratePlanId: 'flexible',
    ratePlanName: 'Flexible Rate',
    source: 'Direct Web',
    status: 'Cancelled',
    balance: 0,
    totalPaid: 0,
    totalCost: 1860,
    addOns: [],
    bookedOn: '2026-08-20',
    estimatedArrival: '3:00 PM',
    specialRequests: 'Cancelled within 48-hr window, full refund processed.',
    notes: 'Cancelled due to flight delay.'
  }
];

export const mockStays = sampleReservations.map((r) => ({
  confirmationCode: r.reference,
  guestName: r.guestName,
  email: r.email,
  phone: r.phone,
  roomName: r.unitName,
  roomSlug: r.unitId,
  checkIn: r.checkIn,
  checkOut: r.checkOut,
  nights: r.nights,
  adults: r.guests,
  children: 0,
  ratePlan: r.ratePlanName,
  status: r.status.toLowerCase(),
  totalPrice: r.totalCost,
  specialRequests: r.specialRequests || ''
}));

