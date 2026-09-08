import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { mockStays } from '../data/mockStays';
import { useBooking } from '../context/BookingContext';
import { addOns } from '../data/addons';
import {
  Search,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Clock,
  Car,
  Printer,
  ShieldCheck,
  XCircle,
  Sparkles,
  Plus
} from 'lucide-react';

export const ManageBookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { state } = useBooking();

  const codeParam = searchParams.get('code') || '';
  const emailParam = searchParams.get('email') || '';

  const [confCode, setConfCode] = useState(codeParam);
  const [guestEmail, setGuestEmail] = useState(emailParam);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeStay, setActiveStay] = useState<any>(null);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [addedAddons, setAddedAddons] = useState<string[]>([]);

  // Auto-search if query params are present
  useEffect(() => {
    if (codeParam) {
      handleLookup(codeParam, emailParam);
    }
  }, [codeParam, emailParam]);

  const handleLookup = (code: string, email: string) => {
    setHasSearched(true);
    const cleanCode = code.trim().toUpperCase();
    const cleanEmail = email.trim().toLowerCase();

    // Check newly confirmed stay in session first
    const sessionMatch = state.confirmedStays.find(
      (s) => s.reservationId.toUpperCase() === cleanCode
    );

    if (sessionMatch) {
      setActiveStay({
        confirmationCode: sessionMatch.reservationId,
        guestName: `${sessionMatch.guest.firstName} ${sessionMatch.guest.lastName}`,
        email: sessionMatch.guest.email,
        phone: sessionMatch.guest.phone,
        roomName: sessionMatch.unitName,
        roomSlug: 'garden-villa-3',
        checkIn: sessionMatch.checkIn,
        checkOut: sessionMatch.checkOut,
        nights: sessionMatch.nights,
        adults: sessionMatch.adults,
        children: 0,
        ratePlan: 'Best Available Flexible Rate',
        status: 'confirmed',
        totalPrice: sessionMatch.grandTotal,
        specialRequests: sessionMatch.guest.specialRequests || 'None noted'
      });
      return;
    }

    // Check mockStays repository
    const mockMatch = mockStays.find(
      (m) =>
        m.confirmationCode.toUpperCase() === cleanCode ||
        (cleanEmail && m.email.toLowerCase() === cleanEmail)
    );

    if (mockMatch) {
      setActiveStay(mockMatch);
    } else {
      setActiveStay(null);
    }
  };

  const handleCancelReservation = () => {
    setIsCancelled(true);
    setCancelModalOpen(false);
  };

  const handleAddAddon = (name: string) => {
    setAddedAddons((prev) => [...prev, name]);
  };

  return (
    <div className="bg-canvas text-ink min-h-screen">
      <Header isHeroPage={false} />

      <main className="pt-24 pb-16">
        {/* Header */}
        <section className="max-w-[1240px] mx-auto px-6 md:px-8 py-8 border-b border-hairline">
          <div className="max-w-[700px] space-y-3">
            <span className="text-xs uppercase font-mono tracking-wider text-brass bg-brass/10 px-2.5 py-1 rounded-[2px] inline-block">
              Guest Portal
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink font-normal leading-tight">
              Manage Your Reservation
            </h1>
            <p className="text-muted text-base">
              Retrieve your stay details, schedule arrival enhancements, request late check-out, or modify your itinerary.
            </p>
          </div>

          {/* Lookup Form */}
          <div className="mt-8 p-6 bg-paper border border-hairline rounded-[10px] max-w-2xl shadow-xs">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLookup(confCode, guestEmail);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="uppercase tracking-wider text-muted font-medium block">
                    Confirmation Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. TNG-10492 or TNG-20984"
                    value={confCode}
                    onChange={(e) => setConfCode(e.target.value)}
                    className="w-full bg-canvas border border-hairline rounded-[2px] px-3 py-2 text-ink font-mono text-xs focus:ring-1 focus:ring-brass"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="uppercase tracking-wider text-muted font-medium block">
                    Guest Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="elena@example.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full bg-canvas border border-hairline rounded-[2px] px-3 py-2 text-ink text-xs focus:ring-1 focus:ring-brass"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] font-mono text-muted">
                  Tip: try pre-loaded demo code <strong className="text-ink">TNG-10492</strong> or <strong className="text-ink">TNG-20984</strong>
                </span>
                <button
                  type="submit"
                  className="bg-water hover:brightness-110 text-white px-6 py-2.5 rounded-[2px] text-xs font-medium tracking-wide flex items-center space-x-1.5 cursor-pointer shadow-xs"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Find Itinerary</span>
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Results Body */}
        <section className="max-w-[1240px] mx-auto px-6 md:px-8 py-10">
          {hasSearched && !activeStay && (
            <div className="p-8 rounded-[10px] bg-paper border border-hairline text-center space-y-3 max-w-lg mx-auto">
              <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
              <h3 className="font-serif text-2xl text-ink">No Reservation Found</h3>
              <p className="text-xs text-muted leading-relaxed">
                We couldn’t find a booking matching confirmation code <strong>{confCode}</strong>. Please verify the spelling or contact our concierge directly at +1 818 555 0190.
              </p>
            </div>
          )}

          {activeStay && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left 8 Cols: Stay Specs & Actions */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Status Card */}
                <div className="bg-paper border border-hairline rounded-[10px] p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-hairline pb-4 gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono text-muted uppercase">Confirmation:</span>
                        <span className="font-mono text-lg font-bold text-ink">{activeStay.confirmationCode}</span>
                      </div>
                      <span className="text-xs font-mono text-muted">Booked for {activeStay.guestName}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {isCancelled ? (
                        <span className="inline-flex items-center space-x-1 text-xs font-mono bg-rose-100 text-rose-800 px-2.5 py-1 rounded-[2px]">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Reservation Cancelled</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 text-xs font-mono bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-[2px]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Confirmed Stay</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Accommodation Specs */}
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-brass block">
                      Accommodation
                    </span>
                    <h2 className="font-serif text-3xl text-ink">{activeStay.roomName}</h2>
                    <p className="text-xs text-muted font-mono">
                      Rate Plan: {activeStay.ratePlan}
                    </p>
                  </div>

                  {/* Key Itinerary Dates in Geist Mono */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-hairline text-xs font-mono">
                    <div>
                      <span className="text-muted text-[10px] block">Check-in</span>
                      <span className="font-semibold text-ink">{activeStay.checkIn}</span>
                      <span className="text-muted block text-[11px]">from 3:00 PM</span>
                    </div>
                    <div>
                      <span className="text-muted text-[10px] block">Check-out</span>
                      <span className="font-semibold text-ink">{activeStay.checkOut}</span>
                      <span className="text-muted block text-[11px]">by 11:00 AM</span>
                    </div>
                    <div>
                      <span className="text-muted text-[10px] block">Length of Stay</span>
                      <span className="font-semibold text-ink">{activeStay.nights} Nights</span>
                    </div>
                    <div>
                      <span className="text-muted text-[10px] block">Party Size</span>
                      <span className="font-semibold text-ink">{activeStay.adults} Adults</span>
                    </div>
                  </div>
                </div>

                {/* Enhance Stay Section (Add-ons) */}
                {!isCancelled && (
                  <div className="bg-paper border border-hairline rounded-[10px] p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-hairline pb-3">
                      <div>
                        <h3 className="font-serif text-xl text-ink">Add Enhancements to this Stay</h3>
                        <p className="text-xs text-muted">Selected items will be charged to your room folio upon arrival.</p>
                      </div>
                      <Sparkles className="w-4 h-4 text-brass" />
                    </div>

                    <div className="space-y-3">
                      {addOns.slice(0, 3).map((addon) => {
                        const isAdded = addedAddons.includes(addon.name);
                        return (
                          <div
                            key={addon.id}
                            className="p-3.5 rounded-[4px] bg-canvas border border-hairline flex items-center justify-between text-xs"
                          >
                            <div className="space-y-0.5">
                              <span className="font-medium text-ink block">{addon.name}</span>
                              <span className="font-mono text-muted text-[11px]">${addon.price} {addon.basis === 'per night' ? '/ night' : 'flat'}</span>
                            </div>
                            <button
                              onClick={() => handleAddAddon(addon.name)}
                              disabled={isAdded}
                              className={`px-3 py-1.5 rounded-[2px] font-mono transition-colors ${
                                isAdded
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-paper border border-hairline text-ink hover:border-brass cursor-pointer'
                              }`}
                            >
                              {isAdded ? 'Added to Folio' : '+ Add'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Cancel or Modify policies */}
                {!isCancelled && (
                  <div className="p-5 rounded-[8px] bg-paper border border-hairline flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1 text-xs">
                      <span className="font-medium text-ink block">Need to cancel or adjust dates?</span>
                      <p className="text-muted leading-relaxed">
                        Free cancellation is permitted up to 48 hours prior to 3:00 PM check-in.
                      </p>
                    </div>
                    <button
                      onClick={() => setCancelModalOpen(true)}
                      className="px-4 py-2 rounded-[2px] border border-rose-200 text-rose-800 hover:bg-rose-50 text-xs font-mono transition-colors cursor-pointer shrink-0"
                    >
                      Cancel Reservation
                    </button>
                  </div>
                )}

              </div>

              {/* Right 4 Cols: Folio Summary & Directions */}
              <div className="lg:col-span-4 space-y-6">
                
                <div className="bg-paper border border-hairline rounded-[10px] p-6 space-y-4 shadow-xs">
                  <h3 className="font-serif text-xl text-ink">Folio Breakdown</h3>
                  
                  <div className="space-y-2 text-xs font-mono border-b border-hairline pb-4">
                    <div className="flex justify-between text-muted">
                      <span>Room Subtotal ({activeStay.nights} nights)</span>
                      <span className="text-ink">${Math.round(activeStay.totalPrice * 0.86)}</span>
                    </div>
                    {addedAddons.map((ad, idx) => (
                      <div key={idx} className="flex justify-between text-muted">
                        <span>{ad}</span>
                        <span className="text-ink">Billed at arrival</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-muted">
                      <span>Taxes & lodging fee (14%)</span>
                      <span className="text-ink">${Math.round(activeStay.totalPrice * 0.14)}</span>
                    </div>
                    <div className="pt-2 border-t border-hairline flex justify-between text-sm font-semibold">
                      <span className="font-sans text-ink">Total Rate</span>
                      <span className="text-ink">${activeStay.totalPrice}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => window.print()}
                      className="w-full bg-canvas border border-hairline hover:border-brass text-ink py-2.5 rounded-[2px] text-xs font-mono flex items-center justify-center space-x-2"
                    >
                      <Printer className="w-3.5 h-3.5 text-muted" />
                      <span>Print Folio Receipt</span>
                    </button>
                    <a
                      href="tel:+18185550190"
                      className="w-full block text-center bg-water hover:brightness-110 text-white py-2.5 rounded-[2px] text-xs font-medium"
                    >
                      Call Front Desk Concierge
                    </a>
                  </div>
                </div>

                {/* Property Access */}
                <div className="p-5 rounded-[8px] bg-[#E8EDE6] border border-hairline text-xs font-mono space-y-2">
                  <span className="font-sans font-medium text-ink uppercase text-[10px] tracking-wider block">
                    Property Address
                  </span>
                  <p className="text-ink font-serif text-sm">3901 W Riverside Dr, Burbank, CA 91505</p>
                  <p className="text-muted text-[11px] font-sans">
                    Complimentary valet parking is available in the front motor court upon arrival.
                  </p>
                </div>

              </div>

            </div>
          )}
        </section>

        {/* Cancellation Confirmation Modal */}
        {cancelModalOpen && (
          <div className="fixed inset-0 z-50 bg-shade/60 backdrop-blur-xs flex items-center justify-center p-6 animate-in fade-in">
            <div className="bg-paper border border-hairline rounded-[10px] p-6 max-w-md w-full space-y-4 shadow-xl text-center">
              <div className="w-10 h-10 bg-rose-100 text-rose-800 rounded-full flex items-center justify-center mx-auto">
                <XCircle className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-2xl text-ink">Cancel this Reservation?</h3>
              <p className="text-xs text-muted leading-relaxed">
                Are you sure you want to cancel reservation <strong>{activeStay.confirmationCode}</strong> for {activeStay.roomName}? This action will release your dates back to our inventory.
              </p>
              <div className="flex space-x-3 pt-2">
                <button
                  onClick={handleCancelReservation}
                  className="flex-1 bg-rose-800 text-white py-2.5 rounded-[2px] text-xs font-medium cursor-pointer hover:bg-rose-900"
                >
                  Yes, Cancel Reservation
                </button>
                <button
                  onClick={() => setCancelModalOpen(false)}
                  className="flex-1 bg-canvas border border-hairline text-ink py-2.5 rounded-[2px] text-xs font-medium cursor-pointer"
                >
                  Keep Reservation
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};
