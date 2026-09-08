import { Accommodation } from '../types/hotel';

export const accommodations: Accommodation[] = [
  // 6 Room Types (sold byType)
  {
    id: 'room-classic-king',
    name: 'Classic King',
    slug: 'classic-king',
    sellMode: 'byType',
    category: 'room',
    sleeps: 2,
    bedrooms: 1,
    bedConfig: '1 King Bed',
    sizeSqft: 340,
    view: 'courtyard',
    floorZone: 'Main Building, Floors 1–2',
    amenities: ['Linen bedding', 'Walk-in rain shower', 'Pour-over coffee kit', 'Tivoli Bluetooth audio', 'Custom citrus botanicals', 'High-speed fiber Wi-Fi'],
    features: ['courtyard', 'balcony'],
    gallery: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1600&auto=format&fit=crop'
    ],
    shortDescription: 'Calm courtyard-facing room with polished concrete, Belgian linen, and custom white-oak woodwork.',
    longDescription: 'Designed for deep rest after days in studio lots or canyon trails. The Classic King pairs bespoke white-oak joinery with washed linen, soft natural daylight, and an open bathroom with rainfall shower and hand-blended California citrus bath salts.',
    basePrice: 285,
    accessible: false,
    policies: {
      maxOccupancy: 2,
      extraPersonFee: 50,
      petPolicy: 'Pet friendly with advance notice ($75 stay fee)',
      accessibilityNotes: 'Elevator access; standard bathroom step'
    }
  },
  {
    id: 'room-two-queens',
    name: 'Two Queens Courtyard',
    slug: 'two-queens-courtyard',
    sellMode: 'byType',
    category: 'room',
    sleeps: 4,
    bedrooms: 1,
    bedConfig: '2 Queen Beds',
    sizeSqft: 420,
    view: 'courtyard',
    floorZone: 'Main Building, Floors 1–2',
    amenities: ['Two queen beds', 'Double wash vanity', 'Walk-in rainfall shower', 'Linen robes', 'Pour-over station', 'Fiber Wi-Fi'],
    features: ['courtyard', 'terrace'],
    gallery: [
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1600&auto=format&fit=crop'
    ],
    shortDescription: 'Spacious double accommodation opening onto quiet courtyard greenery with double vanities.',
    longDescription: 'Generously proportioned for companions or small families. Two plush queen mattresses dressed in organic percale linen, a terrazzo-tiled dual basin bathroom, and deep reading armchairs overlooking the central olive trees.',
    basePrice: 345,
    accessible: false,
    policies: {
      maxOccupancy: 4,
      extraPersonFee: 40,
      petPolicy: 'Pet friendly ($75 per stay)',
      accessibilityNotes: 'Elevator accessible'
    }
  },
  {
    id: 'room-deluxe-balcony-king',
    name: 'Deluxe Balcony King',
    slug: 'deluxe-balcony-king',
    sellMode: 'byType',
    category: 'room',
    sleeps: 2,
    bedrooms: 1,
    bedConfig: '1 California King Bed',
    sizeSqft: 390,
    view: 'pool',
    floorZone: 'East Pavilion, Floor 2',
    amenities: ['Private sun balcony', 'California King bed', 'Freestanding soaking tub', 'Bespoke mini bar', 'Pour-over coffee bar', 'Curated vinyl player'],
    features: ['pool', 'balcony'],
    gallery: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600&auto=format&fit=crop'
    ],
    shortDescription: 'Elevated second-floor room featuring a furnished outdoor balcony overlooking the shaded pool deck.',
    longDescription: 'A light-washed sanctuary oriented toward the afternoon sun. Features an expansive covered terrace with bistro seating, deep soaking bathtub with botanical mineral soaks, and a curated selection of West Coast vinyl records.',
    basePrice: 380,
    accessible: false,
    policies: {
      maxOccupancy: 2,
      extraPersonFee: 50,
      petPolicy: 'Dogs up to 40 lbs permitted',
      accessibilityNotes: 'Second floor with elevator service'
    }
  },
  {
    id: 'room-accessible-garden-queen',
    name: 'Accessible Garden Queen',
    slug: 'accessible-garden-queen',
    sellMode: 'byType',
    category: 'room',
    sleeps: 2,
    bedrooms: 1,
    bedConfig: '1 Queen Bed',
    sizeSqft: 380,
    view: 'garden',
    floorZone: 'Ground Floor, Garden Level',
    amenities: ['Roll-in shower with bench', 'Grab bars and lowered counters', 'Visual alarm system', 'Zero-threshold patio entry', 'Organic cotton linens'],
    features: ['garden', 'accessible', 'terrace'],
    gallery: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600&auto=format&fit=crop'
    ],
    shortDescription: 'ADA compliant ground-level haven with zero-barrier garden terrace and accessible roll-in shower.',
    longDescription: 'Thoughtfully designed for effortless universal mobility. Wide clear pathways, zero-threshold French doors into the orange grove garden, low-profile switches, custom transfer bench, and roll-in shower with dual fixtures.',
    basePrice: 285,
    accessible: true,
    policies: {
      maxOccupancy: 2,
      extraPersonFee: 40,
      petPolicy: 'Service animals and pets welcome',
      accessibilityNotes: 'Full ADA compliance, 36-inch doors, auditory & visual strobes'
    }
  },
  {
    id: 'room-studio-suite',
    name: 'Studio Suite with Kitchenette',
    slug: 'studio-suite',
    sellMode: 'byType',
    category: 'suite',
    sleeps: 3,
    bedrooms: 1,
    bedConfig: '1 King Bed + Daybed',
    sizeSqft: 510,
    view: 'garden',
    floorZone: 'West Wing, Floors 1–2',
    amenities: ['Handcrafted kitchenette', 'Induction cooktop & Sub-Zero fridge', 'Dining nook for 4', 'Deep daybed lounge', 'Rainfall shower & soak tub'],
    features: ['garden', 'kitchen', 'terrace'],
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1600&auto=format&fit=crop'
    ],
    shortDescription: 'Open-plan suite tailored for creative retreats and extended stays with complete designer kitchenette.',
    longDescription: 'An airy studio workspace and living area with custom terrazzo counters, ceramic dishware by local artisans, quiet reading nook, and an expansive garden terrace surrounded by fragrant jasmine.',
    basePrice: 460,
    accessible: false,
    policies: {
      maxOccupancy: 3,
      extraPersonFee: 60,
      petPolicy: 'Pet friendly with advance notice',
      accessibilityNotes: 'Ground floor unit available upon request'
    }
  },
  {
    id: 'room-terrace-junior-suite',
    name: 'Terrace Junior Suite',
    slug: 'terrace-junior-suite',
    sellMode: 'byType',
    category: 'suite',
    sleeps: 2,
    bedrooms: 1,
    bedConfig: '1 California King Bed',
    sizeSqft: 480,
    view: 'mountain',
    floorZone: 'North Pavilion, Floor 2',
    amenities: ['Panoramic mountain terrace', 'Outdoor daybed', 'Freestanding limestone tub', 'Smeg retro refrigerator', 'Nespresso Creatista'],
    features: ['mountain', 'balcony'],
    gallery: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1600&auto=format&fit=crop'
    ],
    shortDescription: 'Sunlit top-floor junior suite framing the Verdugo Mountains with outdoor lounging terrace.',
    longDescription: 'High angled ceilings with exposed timber beams and unobstructed vistas toward the North Hollywood hills. Features a 120-sq-ft private terrace, curated spirits cabinet, and oversized bathroom bathed in morning light.',
    basePrice: 440,
    accessible: false,
    policies: {
      maxOccupancy: 2,
      extraPersonFee: 50,
      petPolicy: 'Pets welcome ($75)',
      accessibilityNotes: 'Second floor access via central elevator'
    }
  },

  // 8 Individual Villas/Suites (sold byUnit - specific named units)
  {
    id: 'villa-1',
    name: 'Garden Villa 1',
    slug: 'garden-villa-1',
    sellMode: 'byUnit',
    category: 'villa',
    sleeps: 4,
    bedrooms: 2,
    bedConfig: '1 King, 1 Queen',
    sizeSqft: 920,
    view: 'garden',
    floorZone: 'South Garden Enclave',
    amenities: ['Heated plunge pool', 'Private walled citrus garden', 'Full chef kitchen', 'Outdoor dining table for 6', 'Dyson Supersonic hair dryer', 'Complimentary electric bikes'],
    features: ['private plunge pool', 'terrace', 'kitchen', 'pet friendly', 'garden'],
    gallery: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop'
    ],
    shortDescription: 'Secluded two-bedroom sanctuary surrounded by mature Meyer lemon trees with private mineral plunge pool.',
    longDescription: 'Garden Villa 1 occupies a quiet corner of the southern grounds. A gated courtyard reveals a private 12-foot heated plunge pool, lime-washed masonry walls, full gourmet kitchen with Fisher & Paykel appliances, and two detached king and queen bedrooms with en-suite rain bathrooms.',
    basePrice: 780,
    accessible: false,
    mapX: 22,
    mapY: 68,
    policies: {
      maxOccupancy: 4,
      extraPersonFee: 75,
      petPolicy: 'Fully fenced private garden; pets warmly welcomed',
      accessibilityNotes: 'Single story, low 2-inch stone threshold'
    }
  },
  {
    id: 'villa-2',
    name: 'Garden Villa 2',
    slug: 'garden-villa-2',
    sellMode: 'byUnit',
    category: 'villa',
    sleeps: 2,
    bedrooms: 1,
    bedConfig: '1 California King Bed',
    sizeSqft: 680,
    view: 'garden',
    floorZone: 'South Garden Enclave',
    amenities: ['Outdoor copper soaking tub', 'Private landscaped garden', 'Firepit lounge', 'Kitchenette & wine cooler', 'Bang & Olufsen sound'],
    features: ['terrace', 'pet friendly', 'garden'],
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop'
    ],
    shortDescription: 'Intimate freestanding retreat with outdoor copper bathtub beneath shaded fig trees and evening gas firepit.',
    longDescription: 'An escape crafted for privacy and slow mornings. Featuring handcrafted Douglas fir ceilings, an outdoor copper soaking bath set inside private hedging, gas fire feature for cool evening air, and dual shower heads.',
    basePrice: 620,
    accessible: false,
    mapX: 36,
    mapY: 74,
    policies: {
      maxOccupancy: 2,
      extraPersonFee: 60,
      petPolicy: 'Pet friendly ($75 stay fee)',
      accessibilityNotes: 'Level access from garden path'
    }
  },
  {
    id: 'villa-3',
    name: 'Garden Villa 3',
    slug: 'garden-villa-3',
    sellMode: 'byUnit',
    category: 'villa',
    sleeps: 4,
    bedrooms: 2,
    bedConfig: '2 King Beds',
    sizeSqft: 980,
    view: 'garden',
    floorZone: 'South Garden Enclave',
    amenities: ['Heated plunge pool', 'Sun deck with loungers', 'Designer kitchen', 'Outdoor barbecue and dining', 'Two full bathrooms', 'Peloton in villa'],
    features: ['private plunge pool', 'terrace', 'kitchen', 'pet friendly', 'garden'],
    gallery: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop'
    ],
    shortDescription: 'Our most expansive two-bedroom garden residence with heated plunge pool and indoor-outdoor living salon.',
    longDescription: 'Floor-to-ceiling glass pocket doors open completely to integrate the limestone living salon with the private garden. Two independent king suites provide total seclusion, each featuring limestone baths and walk-in dressing areas.',
    basePrice: 890,
    accessible: false,
    mapX: 48,
    mapY: 78,
    policies: {
      maxOccupancy: 5,
      extraPersonFee: 80,
      petPolicy: 'Pet friendly with enclosed lawn',
      accessibilityNotes: 'Ground floor, wide entries'
    }
  },
  {
    id: 'villa-4',
    name: 'Palm Villa 4',
    slug: 'palm-villa-4',
    sellMode: 'byUnit',
    category: 'villa',
    sleeps: 2,
    bedrooms: 1,
    bedConfig: '1 King Bed',
    sizeSqft: 720,
    view: 'pool',
    floorZone: 'Poolside Promenade',
    amenities: ['Direct private gate to resort pool', 'Covered veranda with daybed', 'Wet bar & ice maker', 'Soaking tub for two', 'In-villa sound system'],
    features: ['pool', 'terrace'],
    gallery: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600&auto=format&fit=crop'
    ],
    shortDescription: 'Effortless poolside living with a private veranda, daybed, and gated garden path leading straight to the water.',
    longDescription: 'Positioned right along the palm-lined corridor of the central swimming pool. Wake up, step through your gated veranda, and glide directly into the 75-foot resort pool. Features a generous open dressing room and marble bathroom.',
    basePrice: 690,
    accessible: false,
    mapX: 68,
    mapY: 52,
    policies: {
      maxOccupancy: 2,
      extraPersonFee: 70,
      petPolicy: 'No pets allowed in pool-adjacent units',
      accessibilityNotes: 'Zero-step entrance, accessible bathroom'
    }
  },
  {
    id: 'villa-5',
    name: 'Citrus Villa 5',
    slug: 'citrus-villa-5',
    sellMode: 'byUnit',
    category: 'villa',
    sleeps: 4,
    bedrooms: 2,
    bedConfig: '1 King, 2 Twins (or King)',
    sizeSqft: 850,
    view: 'garden',
    floorZone: 'North Orchard',
    amenities: ['Private plunge pool', 'Full kitchen', 'Outdoor cedar sauna', 'Private fire table', 'Laundry in unit', 'Bespoke bicycle cruisers'],
    features: ['private plunge pool', 'terrace', 'kitchen', 'pet friendly', 'garden'],
    gallery: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop'
    ],
    shortDescription: 'Wellness-focused two-bedroom villa nestled inside the heirloom citrus orchard with private cedar sauna.',
    longDescription: 'Enclosed within citrus trees that produce sweet Valencia oranges and Persian limes throughout the year. Comes complete with a private Finnish cedar sauna in the rear courtyard, cold plunge tub, and custom herb garden.',
    basePrice: 840,
    accessible: false,
    mapX: 28,
    mapY: 34,
    policies: {
      maxOccupancy: 4,
      extraPersonFee: 75,
      petPolicy: 'Pets welcome in fenced yard',
      accessibilityNotes: 'Single level with wide doorways'
    }
  },
  {
    id: 'villa-6',
    name: 'Orchard Villa 6',
    slug: 'orchard-villa-6',
    sellMode: 'byUnit',
    category: 'villa',
    sleeps: 6,
    bedrooms: 3,
    bedConfig: '2 Kings, 2 Doubles',
    sizeSqft: 1350,
    view: 'mountain',
    floorZone: 'North Orchard Perimeter',
    amenities: ['Full kitchen & breakfast bar', 'Heated plunge pool', 'Rooftop star-gazing deck', 'Three bathrooms', 'Private garage parking', 'Washer & dryer'],
    features: ['private plunge pool', 'terrace', 'kitchen', 'pet friendly', 'mountain', 'accessible'],
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop'
    ],
    shortDescription: 'Three-bedroom estate with private garage, chef kitchen, and private rooftop deck framing mountain sunsets.',
    longDescription: 'The preferred choice for long-term creative productions, family reunions, and executive gatherings. Spans 1,350 sq ft across two levels with an expansive culinary kitchen, private rooftop terrace with fire pit, and direct gated motor court.',
    basePrice: 1150,
    accessible: true,
    mapX: 42,
    mapY: 24,
    policies: {
      maxOccupancy: 6,
      extraPersonFee: 90,
      petPolicy: 'Two pets permitted ($100 per stay)',
      accessibilityNotes: 'Ground floor bedroom and ADA bathroom'
    }
  },
  {
    id: 'villa-7',
    name: 'Olive Villa 7',
    slug: 'olive-villa-7',
    sellMode: 'byUnit',
    category: 'villa',
    sleeps: 2,
    bedrooms: 1,
    bedConfig: '1 California King Bed',
    sizeSqft: 740,
    view: 'courtyard',
    floorZone: 'Historic Olive Grove',
    amenities: ['Plunge pool & outdoor shower', 'Courtyard terrace with hammock', 'Handmade ceramic tile bath', 'Smeg kitchen bar', 'Sonos ambient speakers'],
    features: ['private plunge pool', 'terrace', 'courtyard', 'pet friendly'],
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop'
    ],
    shortDescription: 'Shaded by century-old California olive trees with private plunge pool and tranquil open-air shower.',
    longDescription: 'Built around two preserved heritage olive trees that cast dappled shade across a private limestone terrace. Features a handmade Zellige-tiled shower that opens to the sky, a custom King bed with woven leather headboard, and quiet writing bureau.',
    basePrice: 710,
    accessible: false,
    mapX: 74,
    mapY: 28,
    policies: {
      maxOccupancy: 2,
      extraPersonFee: 65,
      petPolicy: 'Pet friendly ($75)',
      accessibilityNotes: 'Level stone pathway'
    }
  },
  {
    id: 'suite-8-penthouse',
    name: 'Penthouse Suite 8',
    slug: 'penthouse-suite-8',
    sellMode: 'byUnit',
    category: 'suite',
    sleeps: 4,
    bedrooms: 2,
    bedConfig: '2 California King Beds',
    sizeSqft: 1450,
    view: 'mountain',
    floorZone: 'Main Building, Top Floor',
    amenities: ['360-degree wrap terrace', 'Private hot tub with city & mountain views', 'Custom marble wet bar', 'Fireplace salon', 'Dedicated concierge line', 'Private keycard lift'],
    features: ['mountain', 'terrace', 'kitchen', 'balcony'],
    gallery: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop'
    ],
    shortDescription: 'Our flagship top-floor residence with wrap-around sunset terrace, private hot tub, and sweeping Hollywood hill views.',
    longDescription: 'Commanding the entire uppermost floor of the main pavilion. The Penthouse Suite offers 1,450 sq ft of indoor luxury paired with an 800 sq ft wrap terrace. Soak in the rooftop hydrotherapy tub as dusk turns the San Gabriel and Verdugo ranges amber.',
    basePrice: 1420,
    accessible: false,
    mapX: 52,
    mapY: 46,
    policies: {
      maxOccupancy: 4,
      extraPersonFee: 100,
      petPolicy: 'No pets permitted in Penthouse Suite',
      accessibilityNotes: 'Private elevator access directly into suite'
    }
  }
];
