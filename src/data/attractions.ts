import { Attraction } from '../types/hotel';

// El Royale Hotel Resort Coordinates (Burbank / North Hollywood, CA)
export const PROPERTY_LOCATION = {
  id: 'the-tangerine-hotel',
  name: 'El Royale Hotel & Resort',
  lat: 34.1808,
  lng: -118.3280,
  address: '3901 W Riverside Dr, Burbank, CA 91505',
  neighborhood: 'Toluca Lake / Burbank Media District',
  rating: 4.9,
  reviewsCount: 284,
  ratingLabel: 'Exceptional',
  basePrice: 340,
  phone: '+1 (818) 843-1121',
  image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop',
  description: 'Unhurried mid-century sanctuary with courtyard citrus groves, heated 75-foot pool, and 14 private villas.',
  features: ['Heated Pool', 'Private Plunge Pools', 'Free High-Speed Wi-Fi', 'EV Charging Stations', 'Valet & Self Parking'],
  keyDistances: [
    { name: 'Warner Bros. Studios', time: '3 min', distance: '0.9 mi' },
    { name: 'Universal Studios Hollywood', time: '6 min', distance: '2.4 mi' },
    { name: 'Burbank Bob Hope Airport (BUR)', time: '8 min', distance: '3.2 mi' },
    { name: 'Griffith Park Observatory', time: '12 min', distance: '5.1 mi' },
    { name: 'Hollywood Bowl', time: '10 min', distance: '4.2 mi' }
  ]
};

export const attractions: Attraction[] = [
  {
    id: 'warner-bros-studios',
    name: 'Warner Bros. Studio Tour Hollywood',
    slug: 'warner-bros-studio-tour',
    category: 'studios',
    lat: 34.1502,
    lng: -118.3377,
    distanceMiles: 1.4,
    distanceKm: 2.2,
    driveTimeMin: 5,
    walkTimeMin: 22,
    oneLineDescription: 'Walk through active soundstages, backlot sets from iconic cinema, and the DC & Harry Potter prop archives.',
    longDescription: 'Situated just down Riverside Drive from our gates, Warner Bros. Studio Tour Hollywood offers an authentic glimpse into genuine working production lots. Explore the Central Perk coffee shop set from Friends, the Batmobile vault, and storied Midwest Street facades where legendary television was filmed over eight decades.',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1200&auto=format&fit=crop',
    openingHours: '8:30 AM – 4:30 PM daily',
    practicalInfo: {
      admission: 'From $73; advance online reservations essential',
      bestTime: 'Morning departures (9:00 AM) avoid midday backlot heat',
      parking: 'Covered studio parking on site ($15)'
    },
    ticketUrl: 'https://www.wbstudiotour.com'
  },
  {
    id: 'universal-studios-hollywood',
    name: 'Universal Studios Hollywood',
    slug: 'universal-studios-hollywood',
    category: 'attractions',
    lat: 34.1381,
    lng: -118.3534,
    distanceMiles: 2.8,
    distanceKm: 4.5,
    driveTimeMin: 8,
    oneLineDescription: 'Famed movie theme park with the world-renowned historic backlot tram tour and Super Nintendo World.',
    longDescription: 'Perched overlooking the San Fernando Valley, Universal Studios pairs cutting-edge immersive entertainment with Hollywood film history. Ride the legendary World-Famous Studio Tour through Norman Bates’ Bates Motel and Earthquake soundstages, then explore the interactive Mushroom Kingdom.',
    image: 'https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?q=80&w=1200&auto=format&fit=crop',
    openingHours: '9:00 AM – 9:00 PM daily',
    practicalInfo: {
      admission: 'Tiered tickets from $109; Express Pass recommended',
      bestTime: 'Arrive at opening for shortest queue at Mario Kart',
      parking: 'CityWalk and general garage parking available'
    },
    ticketUrl: 'https://www.universalstudioshollywood.com'
  },
  {
    id: 'noho-arts-district',
    name: 'North Hollywood (NoHo) Arts District',
    slug: 'noho-arts-district',
    category: 'nightlife',
    lat: 34.1685,
    lng: -118.3755,
    distanceMiles: 1.2,
    distanceKm: 1.9,
    driveTimeMin: 4,
    walkTimeMin: 18,
    oneLineDescription: 'Eclectic enclave of contemporary black-box theaters, dance academies, indie coffeehouses, and vintage boutiques.',
    longDescription: 'A walkable cultural nucleus centered around Lankershim and Magnolia Boulevards. Boasts over 20 professional theatrical stages, independent comedy workshops, vintage record emporiums, craft taprooms, and evening street food festivals.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
    openingHours: 'Venues open early; bars and theaters lively until 2:00 AM',
    practicalInfo: {
      admission: 'Free to explore street district; theater tickets vary $15–$35',
      bestTime: 'Thursday through Sunday evenings after 6:00 PM',
      parking: 'Metrolink Park & Ride or street metered spaces'
    }
  },
  {
    id: 'griffith-park-observatory',
    name: 'Griffith Observatory & Trailheads',
    slug: 'griffith-observatory',
    category: 'nature',
    lat: 34.1184,
    lng: -118.3004,
    distanceMiles: 5.2,
    distanceKm: 8.4,
    driveTimeMin: 15,
    oneLineDescription: 'Southern California’s iconic Art Deco planetarium atop Mount Hollywood with commanding views across the LA basin.',
    longDescription: 'Towering above the Los Angeles basin, Griffith Observatory is one of California’s great architectural and scientific treasures. Peer through the historic 12-inch Zeiss telescope, hike the shady Charlie Turner trail toward Mount Hollywood, and watch the Pacific Ocean glimmer at twilight.',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200&auto=format&fit=crop',
    openingHours: 'Tuesday–Friday 12:00 PM–10:00 PM; Weekends 10:00 AM–10:00 PM',
    practicalInfo: {
      admission: 'Building and grounds admission free; planetarium shows $10',
      bestTime: 'Arrive 90 minutes before sunset to secure parking and twilight views',
      parking: 'Paid hilltop lot ($10/hr) or park near Greek Theatre and take DASH shuttle'
    }
  },
  {
    id: 'hollywood-bowl',
    name: 'Hollywood Bowl',
    slug: 'hollywood-bowl',
    category: 'attractions',
    lat: 34.1128,
    lng: -118.3391,
    distanceMiles: 4.5,
    distanceKm: 7.2,
    driveTimeMin: 12,
    oneLineDescription: 'Legendary natural outdoor amphitheater host to the LA Philharmonic, legendary rock acts, and picnic concerts.',
    longDescription: 'Nestled in a natural canyon fold since 1922, the Hollywood Bowl shell is universally celebrated for pristine open-air acoustics and its unique picnic tradition. Guests are invited to pack wine and artisanal fare into the amphitheater boxes before world-class orchestral or contemporary performances.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop',
    openingHours: 'Grounds open as public park daily; showtimes generally 8:00 PM',
    practicalInfo: {
      admission: 'Tickets vary by performance; park access during day is free',
      bestTime: 'Gates open 2 hours before concert curtain for picnic dining',
      parking: 'Stacked parking on site; park & ride shuttles strongly encouraged'
    },
    ticketUrl: 'https://www.hollywoodbowl.com'
  },
  {
    id: 'magnolia-park',
    name: 'Magnolia Park Retro District',
    slug: 'magnolia-park-burbank',
    category: 'shopping',
    lat: 34.1722,
    lng: -118.3364,
    distanceMiles: 0.8,
    distanceKm: 1.3,
    driveTimeMin: 3,
    walkTimeMin: 12,
    oneLineDescription: 'Mid-century boulevard lined with curated vintage apparel, retro furnishings, horror bookshops, and artisan bakeries.',
    longDescription: 'Stretching along Magnolia Boulevard just blocks north of the hotel, this beloved neighbourhood retains the nostalgic soul of 1950s Burbank. Browse vintage clothing stores, find rare vinyl at Atomic Records, sample Porto’s Bakery pastries, or visit during the monthly "Ladies Night Out" food truck stroll.',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1200&auto=format&fit=crop',
    openingHours: 'Boutiques generally open 11:00 AM – 7:00 PM',
    practicalInfo: {
      admission: 'Free neighborhood stroll',
      bestTime: 'Afternoon leisurely walk followed by evening gelato',
      parking: 'Generous free street parking along Magnolia and residential side streets'
    }
  },
  {
    id: 'walt-disney-studios',
    name: 'The Walt Disney Studios',
    slug: 'walt-disney-studios',
    category: 'studios',
    lat: 34.1565,
    lng: -118.3249,
    distanceMiles: 1.6,
    distanceKm: 2.6,
    driveTimeMin: 6,
    oneLineDescription: 'Historic Burbank global headquarters featuring the Seven Dwarfs holding up the Team Disney corporate facade.',
    longDescription: 'Purchased by Walt Disney in 1939 with profits from Snow White, this closed studio lot has birthed animation masterpieces and timeless cinema. While closed to general drop-in tours, special events and D23 official tour days offer historic walking access.',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1200&auto=format&fit=crop',
    openingHours: 'Private studio facility; visible from Alameda and Buena Vista corridors',
    practicalInfo: {
      admission: 'Exclusive to ticketed D23 member tours and official guests',
      bestTime: 'Photograph exterior architecture in crisp morning light'
    }
  },
  {
    id: 'hollywood-burbank-airport',
    name: 'Hollywood Burbank Airport (BUR)',
    slug: 'burbank-airport',
    category: 'airports',
    lat: 34.2007,
    lng: -118.3587,
    distanceMiles: 3.1,
    distanceKm: 5.0,
    driveTimeMin: 8,
    oneLineDescription: 'Southern California’s most relaxed, stress-free passenger airport with open-tarmac airstair boarding.',
    longDescription: 'Consistently voted the premier airport in the United States by Condé Nast Traveler for seamless convenience. Curb to gate in under 15 minutes, retro tarmac boarding stairs, direct service across the nation, and direct 8-minute transit to our front entrance.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop',
    openingHours: 'Flight operations 5:30 AM – 10:30 PM',
    practicalInfo: {
      admission: 'Passenger terminal',
      bestTime: 'Arrive 60 minutes before domestic departure'
    }
  },
  {
    id: 'runyon-canyon',
    name: 'Runyon Canyon Park',
    slug: 'runyon-canyon-park',
    category: 'nature',
    lat: 34.1084,
    lng: -118.3508,
    distanceMiles: 6.1,
    distanceKm: 9.8,
    driveTimeMin: 16,
    oneLineDescription: 'Panoramic ridge-line hiking trails winding through Hollywood chaparral with sweeping 360-degree views of DTLA and the Pacific.',
    longDescription: 'A 160-acre city park spanning steep canyons on the south face of the Hollywood Hills. Popular with runners, hikers, and dog owners, the upper ridges reward with breathless panoramas stretching from downtown skyscrapers to Catalina Island.',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1200&auto=format&fit=crop',
    openingHours: 'Sunrise to sunset daily',
    practicalInfo: {
      admission: 'Free entry',
      bestTime: 'Early morning (6:30–8:00 AM) before temperatures rise',
      parking: 'Street parking along Fuller Avenue or Mulholland Drive'
    }
  },
  {
    id: 'sunset-strip',
    name: 'Sunset Strip, West Hollywood',
    slug: 'sunset-strip',
    category: 'nightlife',
    lat: 34.0906,
    lng: -118.3846,
    distanceMiles: 8.2,
    distanceKm: 13.2,
    driveTimeMin: 22,
    oneLineDescription: 'Storied 1.5-mile strip of Sunset Boulevard renowned for live music rock clubs, rooftop lounges, and fashion boutiques.',
    longDescription: 'The cultural birthplace of modern rock history. Home to iconic performance institutions including The Roxy Theatre, Whisky a Go Go, and the Viper Room, alongside elevated hotel rooftop terraces overlooking the sparkling city basin.',
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?q=80&w=1200&auto=format&fit=crop',
    openingHours: 'Boutiques open daytime; rooftop bars and clubs busy until 2:00 AM',
    practicalInfo: {
      admission: 'Free promenade; concert tickets vary by venue',
      bestTime: 'Sunset cocktails followed by evening shows',
      parking: 'Valet parking at major clubs or city parking structures on Sunset'
    }
  },
  {
    id: 'la-zoo-botanical',
    name: 'Los Angeles Zoo & Botanical Gardens',
    slug: 'los-angeles-zoo',
    category: 'nature',
    lat: 34.1483,
    lng: -118.2838,
    distanceMiles: 3.5,
    distanceKm: 5.6,
    driveTimeMin: 9,
    oneLineDescription: '133-acre wildlife and botanical sanctuary tucked inside Griffith Park housing over 2,100 animals.',
    longDescription: 'A lushly shaded zoo and conservation center featuring chimpanzee habitats, elephant trails, California condor breeding facilities, and over 800 plant species including native California oaks and towering palms.',
    image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?q=80&w=1200&auto=format&fit=crop',
    openingHours: '10:00 AM – 5:00 PM daily',
    practicalInfo: {
      admission: '$22 adults, $17 children',
      bestTime: 'Morning hours when animals are most active during feedings',
      parking: 'Ample free parking adjacent to main gate'
    },
    ticketUrl: 'https://www.lazoo.org'
  },
  {
    id: 'autry-museum',
    name: 'The Autry Museum of the American West',
    slug: 'autry-museum',
    category: 'attractions',
    lat: 34.1489,
    lng: -118.2819,
    distanceMiles: 3.9,
    distanceKm: 6.2,
    driveTimeMin: 10,
    oneLineDescription: 'Dynamic museum exploring the diverse arts, indigenous histories, and mythologies of the American West.',
    longDescription: 'Co-founded by actor Gene Autry, the museum features world-renowned collections of Native American beadwork and textiles, historical firearms, cinema artifacts, and evocative contemporary Western fine art.',
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=1200&auto=format&fit=crop',
    openingHours: 'Tuesday–Friday 10:00 AM–4:00 PM; Weekends 10:00 AM–5:00 PM',
    practicalInfo: {
      admission: '$16 adults, $12 students/seniors',
      bestTime: 'Combine with an afternoon walk in Griffith Park',
      parking: 'Free parking in main lot'
    },
    ticketUrl: 'https://www.theautry.org'
  },
  {
    id: 'lax-airport',
    name: 'Los Angeles International Airport (LAX)',
    slug: 'lax-international-airport',
    category: 'airports',
    lat: 33.9416,
    lng: -118.4085,
    distanceMiles: 22.0,
    distanceKm: 35.4,
    driveTimeMin: 38,
    oneLineDescription: 'Southern California’s primary international gateway connecting Los Angeles to every corner of the globe.',
    longDescription: 'Located southwest across the basin along the Pacific coastline. Offering nonstop intercontinental services worldwide, modern flagship airline lounges, and seamless highway connections via the I-405.',
    image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=1200&auto=format&fit=crop',
    openingHours: '24 hours daily',
    practicalInfo: {
      admission: 'Airport terminal',
      bestTime: 'Allow 2.5 hours prior for domestic, 3.5 hours for international'
    }
  },
  {
    id: 'hollywood-walk-of-fame',
    name: 'Hollywood Walk of Fame & TCL Chinese Theatre',
    slug: 'hollywood-walk-of-fame',
    category: 'attractions',
    lat: 34.1016,
    lng: -118.3410,
    distanceMiles: 4.8,
    distanceKm: 7.7,
    driveTimeMin: 14,
    oneLineDescription: 'Historic 15-block sidewalk monument celebrating icons of the entertainment industry since 1960.',
    longDescription: 'Spanning Hollywood Boulevard and Vine Street, the Walk of Fame honors over 2,700 legends of radio, television, motion pictures, recording, and live performance. Stop at the forecourt of the TCL Chinese Theatre to compare shoe prints with Hollywood icons.',
    image: 'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?q=80&w=1200&auto=format&fit=crop',
    openingHours: 'Public sidewalk accessible 24 hours',
    practicalInfo: {
      admission: 'Free sidewalk access',
      bestTime: 'Morning before midday tour buses arrive',
      parking: 'Ovation Hollywood parking structure off Highland Avenue'
    }
  }
];

export const ATTRACTION_CATEGORIES = [
  { id: 'all', label: 'All Destinations' },
  { id: 'studios', label: 'Film & TV Studios' },
  { id: 'attractions', label: 'Landmarks & Culture' },
  { id: 'nature', label: 'Canyons & Parks' },
  { id: 'dining', label: 'Supper Clubs & Dining' },
  { id: 'shopping', label: 'Vintage & Boutiques' },
  { id: 'airports', label: 'Airports & Terminals' }
];
