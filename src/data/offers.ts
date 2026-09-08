import { Offer } from '../types/hotel';

export const offers: Offer[] = [
  {
    id: 'studio-extended-stay',
    title: 'Studio Creative Residency & Extended Stay',
    slug: 'studio-extended-stay',
    subtitle: 'Stay 4+ nights in North Hollywood and save 20% with daily artisan breakfast included.',
    validityWindow: 'Available year-round, Sunday through Thursday arrivals',
    minStay: 4,
    inclusions: [
      '20% off published nightly rates',
      'Daily complimentary breakfast at The Citrus Terrace',
      'Complimentary high-speed fiber dedicated bandwidth',
      'Weekly complimentary laundry service allowance'
    ],
    ratePlanId: 'advance-purchase',
    applicableUnits: ['room-studio-suite', 'villa-1', 'villa-3', 'villa-6'],
    description: 'Conceived specifically for visiting film, television, and animation creators working at nearby Warner Bros, Disney, and Universal studios. Unwind in spacious suite and villa layouts featuring workstations, private verandas, and quiet evenings.',
    terms: 'Valid on bookings of 4 consecutive nights or more. Deposit of 50% required at time of booking. Subject to availability.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'california-sun-seeker',
    title: 'Sun Seeker Advance Booking',
    slug: 'california-sun-seeker',
    subtitle: 'Plan ahead by 30 days and unlock 15% savings across all rooms, suites, and private villas.',
    validityWindow: 'Valid for stays booked at least 30 days in advance',
    minStay: 2,
    inclusions: [
      '15% discount across all categories',
      'Complimentary signature tangerine spritz at Shade Lounge',
      'Flexible 7-day cancellation window'
    ],
    ratePlanId: 'advance-purchase',
    applicableUnits: ['all'],
    description: 'Lock in your tranquil Los Angeles escape early. Whether basking beside the 75-foot pool or wandering the NoHo Arts District, advance planning secures our finest units at the year’s best value.',
    terms: 'Full payment processed at booking. Change of dates allowed up to 14 days prior to arrival.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'romantic-courtyard-escape',
    title: 'Romantic Courtyard & Citrus Escape',
    slug: 'romantic-courtyard-escape',
    subtitle: 'Two nights of quiet solitude with chilled sparkling wine, outdoor soaking tub, and late checkout.',
    validityWindow: 'Thursday through Sunday stays',
    minStay: 2,
    inclusions: [
      'Chilled bottle of California sparkling wine upon arrival',
      'Guaranteed relaxed 2:00 PM late departure',
      '$100 wellness credit toward poolside botanical massage',
      'Nightly fireside cordials on the garden terrace'
    ],
    ratePlanId: 'flexible',
    applicableUnits: ['room-deluxe-balcony-king', 'villa-2', 'villa-7', 'suite-8-penthouse'],
    description: 'Designed for couples seeking quiet sophistication in the San Fernando Valley. Savor candlelit evenings in private walled gardens and sun-drenched slow mornings under old olive trees.',
    terms: 'Requires minimum two-night stay over a weekend night (Friday or Saturday). Cancelable up to 48 hours prior.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'california-resident-rate',
    title: 'Golden State Resident Staycation',
    slug: 'california-resident-rate',
    subtitle: 'California neighbors receive 12% off plus complimentary valet parking throughout your stay.',
    validityWindow: 'Available all days of week, ongoing',
    minStay: 1,
    inclusions: [
      '12% off best flexible rate',
      'Complimentary overnight valet & EV charging ($38/night value)',
      '15% discount on dining at The Citrus Terrace'
    ],
    ratePlanId: 'flexible',
    applicableUnits: ['all'],
    description: 'A brief drive over the Cahuenga Pass brings you into an unhurried sanctuary. Escape the city bustle with secluded greenery, crisp poolside shade, and seamless parking.',
    terms: 'California resident government ID required upon check-in to validate promotion. Standard 48-hour cancellation.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'citrus-solitude-wellness',
    title: 'Citrus Solitude & Plunge Pool Retreat',
    slug: 'citrus-solitude-wellness',
    subtitle: 'Three restorative nights in a private villa with personal plunge pool aromatherapy and daily breakfast.',
    validityWindow: 'Valid September through May',
    minStay: 3,
    inclusions: [
      'Accommodation in Garden Villa 1, 3, 5, or Olive Villa 7',
      'Private plunge pool botanical herbal salt infusions',
      'Two 60-minute outdoor garden cabana massages',
      'Daily organic breakfast basket delivered to your veranda'
    ],
    ratePlanId: 'flexible',
    applicableUnits: ['villa-1', 'villa-3', 'villa-5', 'villa-7'],
    description: 'Immerse your senses in healing botanicals. Enjoy morning yoga in your private citrus courtyard, plunge into fresh mineral waters, and let our spa practitioners melt away stress.',
    terms: 'Valid for selected villa units only. Requires 72-hour cancellation notice. Spa reservations booked upon reservation confirmation.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop'
  }
];
