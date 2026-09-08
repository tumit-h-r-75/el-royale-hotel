import { Review } from '../types/hotel';

export const reviews: Review[] = [
  {
    id: 'rev-1',
    quote: 'An extraordinarily unhurried presence in the middle of Burbank. The citrus trees and deep shaded corridors filter out the city completely.',
    author: 'Elena Rostova',
    stayDate: 'October 2024',
    source: 'Architectural Digest',
    rating: 5,
    category: 'grounds'
  },
  {
    id: 'rev-2',
    quote: 'Choosing Garden Villa 3 by exact unit number changed our entire perception of resort booking. We knew precisely where our plunge pool was situated before touching down at BUR.',
    author: 'Marcus & Claire Vance',
    stayDate: 'November 2024',
    source: 'Verified Guest Stay',
    rating: 5,
    category: 'villa'
  },
  {
    id: 'rev-3',
    quote: 'The absence of background music and forced hotel hype allows you to actually read, sleep, and think. The linen bedding is exceptional.',
    author: 'Julian K.',
    stayDate: 'January 2025',
    source: 'Condé Nast Traveler Readers Choice',
    rating: 5,
    category: 'service'
  },
  {
    id: 'rev-4',
    quote: 'We stayed four nights during a studio project at Warner Bros. Five minutes from soundstage to private pool terrace is unmatched in Los Angeles.',
    author: 'Sarah Chen, Film Producer',
    stayDate: 'December 2024',
    source: 'Verified Guest Stay',
    rating: 5,
    category: 'villa'
  },
  {
    id: 'rev-5',
    quote: 'The wood-grilled halibut and citrus salads at The Citrus Terrace stand on their own against any top dining room on the Westside.',
    author: 'David R. Miller',
    stayDate: 'February 2025',
    source: 'Eater LA Guide',
    rating: 5,
    category: 'dining'
  },
  {
    id: 'rev-6',
    quote: 'Quiet, cool, restrained architecture with honest materials. The brass fixtures and deep green foliage create a sanctuary you never want to leave.',
    author: 'Ingrid Holm',
    stayDate: 'January 2025',
    source: 'Wallpaper* City Guide',
    rating: 5,
    category: 'grounds'
  },
  {
    id: 'rev-7',
    quote: 'Checking in directly from Burbank Airport took nine minutes door to door. You step out of the car and into orange blossoms.',
    author: 'Anthony Briggs',
    stayDate: 'November 2024',
    source: 'Verified Guest Stay',
    rating: 5,
    category: 'service'
  },
  {
    id: 'rev-8',
    quote: 'The Penthouse Suite wrap terrace at sunset looking back toward the Verdugo Mountains is one of Southern California’s quietest luxuries.',
    author: 'Liam & Natalie S.',
    stayDate: 'December 2024',
    source: 'Verified Guest Stay',
    rating: 5,
    category: 'villa'
  },
  {
    id: 'rev-9',
    quote: 'Our dog was greeted with a custom ceramic bowl and fresh treats. Truly pet friendly without compromising cleanliness or refinement.',
    author: 'Beatrice Morales',
    stayDate: 'January 2025',
    source: 'Verified Guest Stay',
    rating: 5,
    category: 'service'
  },
  {
    id: 'rev-10',
    quote: 'The 75-foot pool surrounded by olive trees is peaceful throughout the afternoon. No loud cabana club music, just water and breeze.',
    author: 'Thomas G.',
    stayDate: 'February 2025',
    source: 'Verified Guest Stay',
    rating: 5,
    category: 'grounds'
  }
];

export const reviewSummary = {
  averageRating: 4.94,
  totalReviews: 482,
  source: 'Independent Guest Verified Reviews & Media Mentions',
  categories: [
    { label: 'Cleanliness & Bedding', score: '4.98' },
    { label: 'Architectural Design & Grounds', score: '4.96' },
    { label: 'Staff Attentiveness & Privacy', score: '4.95' },
    { label: 'Dining & Kitchen Provisions', score: '4.89' }
  ]
};
