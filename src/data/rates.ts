import { RatePlan } from '../types/hotel';

export const ratePlans: RatePlan[] = [
  {
    id: 'flexible',
    name: 'Flexible Rate',
    tagline: 'Pay at property upon check-in',
    cancellationPolicy: 'Free cancellation until 4:00 PM local time, 48 hours prior to arrival. No deposit required today.',
    paymentPolicy: 'Credit card guarantee required. Full payment collected at check-in.',
    discountMultiplier: 1.0,
    inclusions: ['Complimentary welcome citrus spritz', 'Free high-speed fiber Wi-Fi', 'Flexible 48-hour cancellation']
  },
  {
    id: 'advance-purchase',
    name: 'Advance Purchase',
    tagline: 'Prepay & save 12%',
    cancellationPolicy: 'Non-refundable. In the event of cancellation or modification, the total stay amount is retained.',
    paymentPolicy: '100% of reservation total charged immediately at booking.',
    discountMultiplier: 0.88,
    inclusions: ['12% savings off standard rate', 'Complimentary morning pour-over', 'High-speed fiber Wi-Fi']
  },
  {
    id: 'deposit-plan',
    name: 'First Night Deposit',
    tagline: 'Pay first night today, remainder on arrival',
    cancellationPolicy: 'Cancel up to 7 days before arrival for a full refund of deposit. Within 7 days, the first night deposit is retained.',
    paymentPolicy: 'First night room & tax charged today. Remaining balance due at check-in.',
    discountMultiplier: 0.95,
    depositPercent: 50,
    inclusions: ['Low upfront commitment', 'Complimentary self-parking', 'Citrus welcome amenity']
  },
  {
    id: 'member-rate',
    name: 'Member Rate',
    tagline: 'Member exclusive: 8% off + late checkout',
    cancellationPolicy: 'Free cancellation until 24 hours prior to arrival.',
    paymentPolicy: 'Pay at property upon check-in. Credit card hold only.',
    discountMultiplier: 0.92,
    requiresMember: true,
    inclusions: ['8% member discount', 'Guaranteed 1:00 PM late check-out', 'Daily morning espresso voucher at Tangerine Pantry']
  }
];

// 90-day seeded availability and pricing generator
// Generates reproducible availability for any date within 90 days from today
export function getSeededNightlyPrice(basePrice: number, dateStr: string): number {
  const d = new Date(dateStr);
  const dayOfWeek = d.getDay(); // 0 Sun, 5 Fri, 6 Sat
  const dayOfMonth = d.getDate();
  
  let multiplier = 1.0;
  // Weekend surcharge
  if (dayOfWeek === 5 || dayOfWeek === 6) {
    multiplier += 0.22; // +22% on Fri/Sat
  } else if (dayOfWeek === 0 || dayOfWeek === 4) {
    multiplier += 0.08; // +8% on Sun/Thu
  }

  // Slight pseudo-random seasonal ripple based on day of month
  const ripple = Math.sin(dayOfMonth * 0.7) * 0.05;
  multiplier += ripple;

  return Math.round(basePrice * multiplier);
}

// Check whether a specific unit is available on a specific date
export function isUnitAvailableOnDate(unitId: string, dateStr: string): boolean {
  // Deterministic seed for availability:
  // Certain units are booked out on specific dates to create a real hotel inventory experience
  const d = new Date(dateStr);
  const day = d.getDate();
  const month = d.getMonth();
  const hash = (unitId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + day * 7 + month * 13) % 20;

  // Roughly 15% of dates are booked
  return hash !== 3 && hash !== 11;
}

export function checkStayAvailability(unitId: string, checkInStr: string, checkOutStr: string): {
  available: boolean;
  totalNights: number;
  nightlyRates: { date: string; rate: number }[];
  baseTotal: number;
  nearestAvailableCheckIn?: string;
} {
  const start = new Date(checkInStr);
  const end = new Date(checkOutStr);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const totalNights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const nightlyRates: { date: string; rate: number }[] = [];
  let available = true;

  const current = new Date(start);
  for (let i = 0; i < totalNights; i++) {
    const isoDate = current.toISOString().split('T')[0];
    const isAvail = isUnitAvailableOnDate(unitId, isoDate);
    if (!isAvail) {
      available = false;
    }
    // Assume base fallback $300 if not found
    nightlyRates.push({
      date: isoDate,
      rate: getSeededNightlyPrice(300, isoDate)
    });
    current.setDate(current.getDate() + 1);
  }

  const baseTotal = nightlyRates.reduce((acc, n) => acc + n.rate, 0);

  // If unavailable, compute nearest available check-in by shifting 2-4 days
  let nearestAvailableCheckIn: string | undefined;
  if (!available) {
    const altDate = new Date(start);
    altDate.setDate(altDate.getDate() + 3);
    nearestAvailableCheckIn = altDate.toISOString().split('T')[0];
  }

  return {
    available,
    totalNights,
    nightlyRates,
    baseTotal,
    nearestAvailableCheckIn
  };
}

export function getLowestRateTonight(): number {
  const today = new Date().toISOString().split('T')[0];
  // Classic King is base 285
  return getSeededNightlyPrice(285, today);
}
