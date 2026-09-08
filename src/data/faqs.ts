import { FAQItem } from '../types/hotel';

export const faqs: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Reservations',
    question: 'What is the difference between booking a room type and booking a specific villa?',
    answer: 'Standard rooms and studio suites are reserved by category (e.g. Classic King), with specific room placement assigned upon arrival. In contrast, all 8 villas and our Penthouse Suite are sold as exact, individual units (e.g., Garden Villa 3). When reserving a villa, you choose the exact floor plan, plunge pool orientation, and site map position.'
  },
  {
    id: 'faq-2',
    category: 'Reservations',
    question: 'What are the check-in and check-out times?',
    answer: 'Standard check-in begins at 3:00 PM. Check-out is at 11:00 AM. Guaranteed early check-in at 1:00 PM and relaxed late check-out at 2:00 PM are available as add-on selections during booking or complimentary for members.'
  },
  {
    id: 'faq-3',
    category: 'Reservations',
    question: 'What is your cancellation and deposit policy?',
    answer: 'Our Flexible Rate permits free cancellation up to 48 hours prior to arrival (4:00 PM local time). Advance Purchase rates are prepaid and non-refundable. The First Night Deposit plan allows full refund up to 7 days before arrival.'
  },
  {
    id: 'faq-4',
    category: 'Reservations',
    question: 'Are taxes and resort fees included in the displayed rates?',
    answer: 'All mandatory taxes and municipal lodging assessments (Burbank/Los Angeles TOT 12% + CA tourism assessment) are clearly itemized on every step of your booking. We charge no hidden mandatory resort fees.'
  },
  {
    id: 'faq-5',
    category: 'Property & Grounds',
    question: 'How far is the resort from Hollywood Burbank Airport (BUR) and LAX?',
    answer: 'Hollywood Burbank Airport is just 3.1 miles away (approx. 8 minutes by car). Los Angeles International Airport (LAX) is 22 miles away (approx. 35–45 minutes depending on traffic). Private chauffeur transfers can be scheduled in your reservation.'
  },
  {
    id: 'faq-6',
    category: 'Property & Grounds',
    question: 'What are the pool hours and regulations?',
    answer: 'The central 75-foot heated swimming pool is open daily from 7:00 AM to 10:00 PM for registered hotel guests. We maintain a quiet, contemplative atmosphere with no amplified personal music or outside parties.'
  },
  {
    id: 'faq-7',
    category: 'Property & Grounds',
    question: 'Is parking available on site?',
    answer: 'Yes. We offer secure gated valet parking with 24-hour security and unlimited in-and-out privileges for $38 per night. Complimentary Level 2 EV charging (Tesla and universal J1772) is provided for all valet vehicles.'
  },
  {
    id: 'faq-8',
    category: 'Pets & Access',
    question: 'Are dogs and pets welcome at the property?',
    answer: 'Yes, well-behaved dogs are welcome in designated ground-floor rooms and Garden Villas for a one-time cleaning fee of $75 per stay. We provide a custom ceramic water bowl, organic treats, and a plush bed. Pets must remain leashed on common grounds.'
  },
  {
    id: 'faq-9',
    category: 'Pets & Access',
    question: 'Which units feature accessible design (ADA)?',
    answer: 'The Accessible Garden Queen and Orchard Villa 6 are engineered for full universal access with roll-in showers, transfer benches, 36-inch clearance doorways, auditory/visual fire indicators, and zero-threshold exterior doors.'
  },
  {
    id: 'faq-10',
    category: 'Dining & Experiences',
    question: 'Do I need a reservation for The Citrus Terrace?',
    answer: 'Breakfast and lunch are seated on a walk-in basis for hotel guests. For evening dinner service, reservations are recommended through our concierge or website enquiry form, though hotel guests receive priority seating.'
  },
  {
    id: 'faq-11',
    category: 'Dining & Experiences',
    question: 'Can private dinners or small production shoots be arranged in the villas?',
    answer: 'Yes. Our private villas (particularly Orchard Villa 6 and Penthouse Suite 8) can host intimate private chef dinners or curated production meetings. Inquire through our Events concierge for catering and permits.'
  },
  {
    id: 'faq-12',
    category: 'Dining & Experiences',
    question: 'Are bicycles available for exploring the neighborhood?',
    answer: 'Complimentary custom cruiser bicycles with brass bells and front wicker baskets are available for guest use at the front desk, ideal for cruising to Magnolia Park retro boutiques or Warner Bros lots.'
  }
];

export const FAQ_CATEGORIES = [
  { id: 'all', label: 'All Topics' },
  { id: 'Reservations', label: 'Reservations & Rates' },
  { id: 'Property & Grounds', label: 'Property & Facilities' },
  { id: 'Pets & Access', label: 'Pets & ADA Accessibility' },
  { id: 'Dining & Experiences', label: 'Dining & Activities' }
];
