import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { accommodations } from '../data/rooms';
import { checkStayAvailability } from '../data/rates';
import { useBooking } from '../context/BookingContext';
import {
  Users,
  Bed,
  Square,
  Eye,
  Calendar,
  X,
  MapPin,
  Compass,
  ArrowRight,
  ShieldCheck,
  Check,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const StayDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { state, setDates, setGuests, selectUnit, formatMoney } = useBooking();

  const unit = accommodations.find((a) => a.slug === slug) || accommodations[0];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Dynamic pricing for chosen dates
  const { available, totalNights, baseTotal, nearestAvailableCheckIn } = checkStayAvailability(
    unit.id,
    state.checkIn,
    state.checkOut
  );

  const taxesAndFees = Math.round(baseTotal * 0.14); // 12% TOT + 2% TBID
  const grandTotal = baseTotal + taxesAndFees;

  // 3 Related Units
  const relatedUnits = accommodations.filter((a) => a.id !== unit.id).slice(0, 3);

  // Grouped Amenities (plain grouped list per Prompt 2: bathroom, comfort, technology, outdoor)
  const groupedAmenities = {
    'Rest & Comfort': [
      'Belgian washed linen sheets & duvet',
      'Dual density down-alternative pillows',
      'Bespoke solid white-oak bedside joinery',
      'Custom acoustic sound dampening walls'
    ],
    'Bath & Wellness': [
      'Walk-in rainfall shower with thermostatic controls',
      'Hand-blended citrus & rosemary botanical amenities',
      'Heavyweight 700 GSM Turkish cotton towels',
      'Dyson Supersonic hair care system'
    ],
    'Technology & Focus': [
      'Dedicated high-speed fiber Wi-Fi (300 Mbps symmetrical)',
      'Tivoli Model One Bluetooth sound system',
      'Integrated USB-C & universal charging at bedside',
      'Custom brass ambient lighting controls'
    ],
    'Outdoor & Provisions': [
      'Private furnished terrace or walled courtyard',
      'Handcrafted pour-over coffee bar with local beans',
      'Smeg mini refrigerator with filtered water carafe',
      'Two complimentary vintage cruiser bicycles'
    ]
  };

  const handleReserve = () => {
    selectUnit(unit.id);
    navigate(`/book?unit=${unit.id}&checkIn=${state.checkIn}&checkOut=${state.checkOut}`);
  };

  return (
    <div className="bg-canvas text-ink min-h-screen">
      <Header isHeroPage={false} />

      <main className="pt-24 pb-16">
        {/* Breadcrumb Navigation */}
        <div className="max-w-[1240px] mx-auto px-6 md:px-8 py-3 text-xs text-muted font-mono flex items-center space-x-2">
          <Link to="/stay" className="hover:text-ink underline">Accommodation</Link>
          <span>/</span>
          <span className="text-ink">{unit.name}</span>
        </div>

        {/* 1. FULL-BLEED GALLERY WITH THUMBNAIL STRIP AND LIGHTBOX */}
        <section id="gallery-hero" className="max-w-[1240px] mx-auto px-6 md:px-8 py-4">
          <div className="relative rounded-[10px] overflow-hidden border border-hairline bg-paper">
            {/* Main Stage Image */}
            <div
              className="h-[420px] sm:h-[520px] md:h-[600px] w-full cursor-pointer relative group overflow-hidden"
              onClick={() => setLightboxOpen(true)}
            >
              <img
                src={unit.gallery[activeImageIndex] || unit.gallery[0]}
                alt={`${unit.name} photograph`}
                className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-300"
              />
              <div className="absolute bottom-4 right-4 bg-shade/80 backdrop-blur-xs text-canvas text-xs font-mono px-3 py-1.5 rounded-[2px] pointer-events-none">
                Photo {activeImageIndex + 1} of {unit.gallery.length} · Tap for full view
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex space-x-2 p-3 bg-paper border-t border-hairline overflow-x-auto hide-scrollbar">
              {unit.gallery.map((photo, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-14 shrink-0 rounded-[3px] overflow-hidden border transition-all cursor-pointer ${
                    activeImageIndex === idx ? 'border-brass ring-1 ring-brass' : 'border-hairline opacity-75 hover:opacity-100'
                  }`}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <img src={photo} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-70 bg-black/95 flex flex-col justify-between p-4 md:p-6"
            >
              <div className="flex justify-between items-center text-white text-xs font-mono max-w-7xl mx-auto w-full">
                <span>{unit.name} · Image {activeImageIndex + 1} of {unit.gallery.length}</span>
                <button
                  onClick={() => setLightboxOpen(false)}
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                  aria-label="Close image lightbox"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="relative flex-1 flex items-center justify-center p-2 md:p-4">
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : unit.gallery.length - 1))}
                  className="absolute left-2 md:left-6 z-10 p-3 bg-black/40 hover:bg-black/80 text-white rounded-full backdrop-blur-xs transition-colors cursor-pointer border border-white/10"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <motion.img
                  key={activeImageIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  src={unit.gallery[activeImageIndex]}
                  alt={unit.name}
                  className="max-h-[80vh] max-w-[85vw] object-contain rounded-[4px] shadow-2xl"
                />

                <button
                  onClick={() => setActiveImageIndex((prev) => (prev < unit.gallery.length - 1 ? prev + 1 : 0))}
                  className="absolute right-2 md:right-6 z-10 p-3 bg-black/40 hover:bg-black/80 text-white rounded-full backdrop-blur-xs transition-colors cursor-pointer border border-white/10"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
              <div className="flex justify-center space-x-4 pb-2">
                <span className="text-white/60 text-xs font-mono">
                  Use arrows or tap thumbnail strip below when closed
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Layout: Left Details + Right Sticky Booking Panel */}
        <div className="max-w-[1240px] mx-auto px-6 md:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT 8 COLS: Title block, Specs, Description, Amenities, Locator, Floorplan, Policies */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* 2. TITLE BLOCK */}
              <div className="border-b border-hairline pb-8 space-y-4">
                <div className="flex items-center space-x-3">
                  {unit.sellMode === 'byUnit' ? (
                    <span className="text-xs uppercase font-mono tracking-wider text-brass bg-brass/10 px-2 py-0.5 rounded-[2px]">
                      Specific Named Villa · Exact Unit Booking
                    </span>
                  ) : (
                    <span className="text-xs uppercase font-mono tracking-wider text-muted bg-canvas px-2 py-0.5 rounded-[2px] border border-hairline">
                      Room Category
                    </span>
                  )}
                  <span className="text-xs text-muted font-mono">{unit.floorZone}</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink font-normal leading-tight">
                  {unit.name}
                </h1>
                
                <p className="text-base sm:text-lg text-ink/85 leading-relaxed max-w-[65ch]">
                  {unit.shortDescription}
                </p>

                {/* Facts rail in Geist Mono */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-hairline text-xs font-mono text-muted">
                  <div className="space-y-0.5">
                    <span className="text-[11px] uppercase tracking-wider block font-sans">Capacity</span>
                    <span className="text-ink font-medium text-sm flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-muted shrink-0" />
                      Sleeps {unit.sleeps}
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[11px] uppercase tracking-wider block font-sans">Bedrooms & Beds</span>
                    <span className="text-ink font-medium text-sm flex items-center gap-1.5">
                      <Bed className="w-4 h-4 text-muted shrink-0" />
                      {unit.bedrooms} Bed ({unit.bedConfig})
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[11px] uppercase tracking-wider block font-sans">Interior Space</span>
                    <span className="text-ink font-medium text-sm flex items-center gap-1.5">
                      <Square className="w-4 h-4 text-muted shrink-0" />
                      {unit.sizeSqft} sq ft
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[11px] uppercase tracking-wider block font-sans">Orientation</span>
                    <span className="text-ink font-medium text-sm flex items-center gap-1.5 capitalize">
                      <Eye className="w-4 h-4 text-muted shrink-0" />
                      {unit.view} View
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[11px] uppercase tracking-wider block font-sans">Zone on Grounds</span>
                    <span className="text-ink font-medium text-sm flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-muted shrink-0" />
                      {unit.floorZone.split(',')[0]}
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[11px] uppercase tracking-wider block font-sans">Accessibility</span>
                    <span className="text-ink font-medium text-sm flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-muted shrink-0" />
                      {unit.accessible ? 'Universal ADA' : 'Elevator / Step'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 4. DESCRIPTION IN TWO COLUMNS WITH PULL QUOTE */}
              <div className="space-y-6">
                <h3 className="font-serif text-2xl text-ink">The Space & Layout</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-ink/80 leading-relaxed">
                  <p>{unit.longDescription}</p>
                  <p>
                    Every detail has been selected to minimize visual fatigue. Lime-washed plaster keeps interior temperatures naturally balanced, while heavy soundproof glass ensures total silence even during active studio production days nearby.
                  </p>
                </div>

                {/* Pull Quote */}
                <div className="my-6 p-6 border-y border-hairline bg-paper/60">
                  <blockquote className="font-serif text-xl md:text-2xl text-ink italic leading-snug">
                    “Dappled light falls through the citrus leaves onto the reading chair. It feels less like a hotel and more like a private residence with quiet housekeeping.”
                  </blockquote>
                  <cite className="block mt-2 text-xs uppercase tracking-wider font-sans text-muted not-italic">
                    Guest Reflection · Stayed Autumn 2024
                  </cite>
                </div>
              </div>

              {/* 5. AMENITIES IN A PLAIN GROUPED LIST (No icon grid, no cards) */}
              <div className="border-t border-hairline pt-8 space-y-6">
                <h3 className="font-serif text-2xl text-ink">Thoughtful Inclusions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {Object.entries(groupedAmenities).map(([groupTitle, items]) => (
                    <div key={groupTitle} className="space-y-3">
                      <h4 className="text-xs uppercase tracking-wider text-muted font-sans font-medium">
                        {groupTitle}
                      </h4>
                      <ul className="space-y-2 text-xs text-ink/85 font-sans">
                        {items.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brass shrink-0 mt-1.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6. FOR VILLAS ONLY: SMALL RESORT PLAN LOCATOR */}
              {unit.sellMode === 'byUnit' && unit.mapX !== undefined && unit.mapY !== undefined && (
                <div className="border-t border-hairline pt-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-2xl text-ink">Position on Grounds</h3>
                      <p className="text-xs text-muted">
                        This unit sits at coordinates ({unit.mapX}%, {unit.mapY}%) on the resort site plan.
                      </p>
                    </div>
                    <Link
                      to={`/resort-map?unit=${unit.id}`}
                      className="text-xs font-medium text-water hover:underline flex items-center gap-1"
                    >
                      <span>Open full resort map</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="h-56 rounded-[8px] overflow-hidden border border-hairline relative bg-[#E8EDE6]">
                    <div
                      className="absolute w-6 h-6 rounded-full bg-brass border-2 border-white flex items-center justify-center text-white text-[10px] font-mono shadow-md"
                      style={{ left: `${unit.mapX}%`, top: `${unit.mapY}%`, transform: 'translate(-50%, -50%)' }}
                    >
                      ★
                    </div>
                    <div className="absolute bottom-3 left-3 bg-shade/85 text-canvas text-xs px-3 py-1 rounded-[2px] font-mono">
                      {unit.name} · {unit.floorZone}
                    </div>
                  </div>
                </div>
              )}

              {/* 7. FLOOR PLAN IMAGE WITH CAPTION */}
              <div className="border-t border-hairline pt-8 space-y-3">
                <h3 className="font-serif text-2xl text-ink">Architectural Floor Plan</h3>
                <div className="rounded-[8px] border border-hairline bg-paper p-6 text-center space-y-3">
                  <div className="h-64 sm:h-80 w-full bg-canvas rounded-[4px] border border-dashed border-hairline flex flex-col items-center justify-center p-4 relative overflow-hidden">
                    {/* Stylized Architectural Drawing */}
                    <svg viewBox="0 0 500 300" className="w-full h-full max-w-[440px] text-muted">
                      <rect x="20" y="20" width="460" height="260" fill="#FFFFFF" stroke="#1A211D" strokeWidth="2" />
                      {/* Living & Bedroom Partition */}
                      <line x1="260" y1="20" x2="260" y2="280" stroke="#1A211D" strokeWidth="2" strokeDasharray="6 4" />
                      {/* Terrace area */}
                      <rect x="20" y="20" width="120" height="260" fill="#F2F4F1" stroke="#D9DED8" strokeWidth="1" />
                      <text x="80" y="150" fill="#5C6660" fontSize="10" fontFamily="'Newsreader', serif" textAnchor="middle">Private Terrace</text>
                      {/* Bedroom */}
                      <text x="380" y="100" fill="#1A211D" fontSize="12" fontFamily="'Newsreader', serif" textAnchor="middle">{unit.bedConfig}</text>
                      {/* Bath */}
                      <rect x="360" y="180" width="120" height="100" fill="#F2F4F1" stroke="#1A211D" strokeWidth="1.5" />
                      <text x="420" y="235" fill="#5C6660" fontSize="10" fontFamily="'Instrument Sans', sans-serif" textAnchor="middle">Rain Bath</text>
                    </svg>
                  </div>
                  <p className="text-xs font-mono text-muted text-left">
                    Fig. 1.0 — {unit.name} layout ({unit.sizeSqft} sq ft conditioned living area). Scale 1:50.
                  </p>
                </div>
              </div>

              {/* 8. UNIT SPECIFIC POLICIES */}
              <div className="border-t border-hairline pt-8 space-y-4">
                <h3 className="font-serif text-2xl text-ink">Unit Policies & Terms</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-ink">
                  <div className="p-4 bg-paper rounded-[4px] border border-hairline space-y-1">
                    <span className="font-medium text-muted uppercase tracking-wider block text-[11px]">Maximum Occupancy</span>
                    <p className="font-mono text-ink text-sm">Up to {unit.policies?.maxOccupancy || unit.sleeps} guests</p>
                    <p className="text-muted text-[11px]">Extra guest fee: ${unit.policies?.extraPersonFee || 50}/night</p>
                  </div>
                  <div className="p-4 bg-paper rounded-[4px] border border-hairline space-y-1">
                    <span className="font-medium text-muted uppercase tracking-wider block text-[11px]">Pet Guidelines</span>
                    <p className="text-ink">{unit.policies?.petPolicy || 'Well-mannered dogs welcome ($75)'}</p>
                  </div>
                  <div className="p-4 bg-paper rounded-[4px] border border-hairline space-y-1 sm:col-span-2">
                    <span className="font-medium text-muted uppercase tracking-wider block text-[11px]">Accessibility Notes</span>
                    <p className="text-ink">{unit.policies?.accessibilityNotes || 'Accessible through main elevators; zero barriers to common gardens'}</p>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT 4 COLS: Sticky Booking Panel (Desktop) */}
            <aside className="lg:col-span-4 sticky top-28 space-y-6">
              <div className="bg-paper border border-hairline rounded-[10px] p-6 shadow-sm space-y-5">
                
                <div className="border-b border-hairline pb-4 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-muted block font-sans">Starting from</span>
                    <span className="font-mono text-3xl font-semibold text-ink">{formatMoney(unit.basePrice)}</span>
                    <span className="text-xs text-muted font-mono"> / night</span>
                  </div>
                  {unit.sellMode === 'byUnit' && (
                    <span className="text-[10px] font-mono text-brass bg-brass/10 px-2 py-0.5 rounded-[2px] uppercase">
                      Exact Villa
                    </span>
                  )}
                </div>

                {/* Date & Guest Selectors */}
                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 rounded-[2px] bg-canvas border border-hairline">
                      <label className="text-[10px] uppercase tracking-wider text-muted block mb-0.5">Check-in</label>
                      <input
                        type="date"
                        value={state.checkIn}
                        onChange={(e) => setDates(e.target.value, state.checkOut)}
                        className="w-full bg-transparent font-mono text-xs text-ink border-none p-0 focus:ring-0 cursor-pointer"
                      />
                    </div>
                    <div className="p-2 rounded-[2px] bg-canvas border border-hairline">
                      <label className="text-[10px] uppercase tracking-wider text-muted block mb-0.5">Check-out</label>
                      <input
                        type="date"
                        value={state.checkOut}
                        onChange={(e) => setDates(state.checkIn, e.target.value)}
                        className="w-full bg-transparent font-mono text-xs text-ink border-none p-0 focus:ring-0 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="p-2 rounded-[2px] bg-canvas border border-hairline flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-muted block">Guests</span>
                      <span className="font-mono text-xs font-medium text-ink">
                        {state.adults} Adults{state.children > 0 ? `, ${state.children} Children` : ''}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setGuests(Math.max(1, state.adults - 1), state.children)}
                        className="w-6 h-6 rounded-[2px] border border-hairline flex items-center justify-center font-mono cursor-pointer"
                      >
                        -
                      </button>
                      <button
                        onClick={() => setGuests(Math.min(unit.sleeps, state.adults + 1), state.children)}
                        className="w-6 h-6 rounded-[2px] border border-hairline flex items-center justify-center font-mono cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Live Price Breakdown */}
                {available ? (
                  <div className="pt-4 border-t border-hairline space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-muted">
                      <span>{formatMoney(Math.round(baseTotal / totalNights))} × {totalNights} nights</span>
                      <span className="text-ink">{formatMoney(baseTotal)}</span>
                    </div>
                    <div className="flex justify-between text-muted">
                      <span>Taxes & lodging assessments (14%)</span>
                      <span className="text-ink">{formatMoney(taxesAndFees)}</span>
                    </div>
                    <div className="flex justify-between text-muted">
                      <span>Resort fee</span>
                      <span className="text-brass">$0 (Included)</span>
                    </div>
                    <div className="pt-2 border-t border-hairline flex items-baseline justify-between text-sm">
                      <span className="font-sans font-medium text-ink">Total Due</span>
                      <span className="font-semibold text-lg text-ink">{formatMoney(grandTotal)}</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-amber-50 rounded-[2px] border border-amber-200 text-xs text-amber-900 space-y-1">
                    <span className="font-medium block">Not available for these dates</span>
                    <p>Nearest available arrival: <strong className="font-mono">{nearestAvailableCheckIn}</strong></p>
                  </div>
                )}

                {/* Reserve Action Button */}
                <button
                  id="detail-reserve-action"
                  onClick={handleReserve}
                  disabled={!available}
                  className="w-full bg-water hover:brightness-110 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none text-white py-3.5 rounded-[2px] font-medium text-sm tracking-wide transition-all shadow-xs cursor-pointer flex items-center justify-center space-x-2"
                >
                  <span>{available ? 'Reserve this accommodation' : 'Dates Unavailable'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-muted text-center font-sans">
                  No immediate charge today on Flexible rate. 48-hour free cancellation.
                </p>
              </div>
            </aside>

          </div>

          {/* 9. OTHER ACCOMMODATION YOU MIGHT CONSIDER */}
          <section className="mt-20 pt-12 border-t border-hairline">
            <h3 className="font-serif text-2xl md:text-3xl text-ink mb-6">
              Other Accommodation You Might Consider
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedUnits.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/stay/${rel.slug}`}
                  className="bg-paper border border-hairline rounded-[10px] overflow-hidden p-4 group hover:border-water/40 transition-colors"
                >
                  <div className="h-44 rounded-[4px] overflow-hidden">
                    <img
                      src={rel.gallery[0]}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                  </div>
                  <div className="pt-3 space-y-1">
                    <span className="text-[11px] font-mono text-muted uppercase tracking-wider">{rel.floorZone}</span>
                    <h4 className="font-serif text-lg text-ink font-medium">{rel.name}</h4>
                    <p className="text-xs font-mono text-muted">Sleeps {rel.sleeps} · From {formatMoney(rel.basePrice)}/night</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

        </div>
      </main>

      {/* Mobile Fixed Bottom Booking Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-paper/95 backdrop-blur-md border-t border-hairline p-4 shadow-lg flex items-center justify-between">
        <div>
          <span className="text-[11px] text-muted block">From</span>
          <span className="font-mono text-lg font-semibold text-ink">{formatMoney(unit.basePrice)}</span>
          <span className="text-[11px] text-muted font-mono"> / night</span>
        </div>
        <button
          onClick={handleReserve}
          disabled={!available}
          className="bg-water text-white text-xs px-6 py-3 rounded-[2px] font-medium cursor-pointer"
        >
          {available ? 'Reserve Now' : 'Unavailable'}
        </button>
      </div>

      <Footer />
    </div>
  );
};
