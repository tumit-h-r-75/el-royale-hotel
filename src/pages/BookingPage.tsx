import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { useBooking } from '../context/BookingContext';
import { accommodations } from '../data/rooms';
import { ratePlans, checkStayAvailability } from '../data/rates';
import { addOns } from '../data/addons';
import {
  Check,
  Clock,
  Calendar,
  Users,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Printer,
  Download,
  ExternalLink,
  Info,
  Car,
  Wine,
  Sparkles,
  AlertTriangle
} from 'lucide-react';

export const BookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    state,
    setDates,
    setGuests,
    selectUnit,
    selectRatePlan,
    toggleAddOn,
    updateGuestInfo,
    confirmReservation,
    extendHoldTimer,
    resetBooking
  } = useBooking();

  // Active Checkout Step: 1 (Accommodations) | 2 (Rate Plan) | 3 (Add-ons) | 4 (Guest Info) | 5 (Review & Pay) | 6 (Confirmed)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [holdTimeRemaining, setHoldTimeRemaining] = useState<number>(600); // 10 min
  const [holdExpiredModal, setHoldExpiredModal] = useState(false);

  // Initialize from search query if provided
  useEffect(() => {
    const unitParam = searchParams.get('unit');
    const rateParam = searchParams.get('rate');
    const checkInParam = searchParams.get('checkIn');
    const checkOutParam = searchParams.get('checkOut');

    if (checkInParam && checkOutParam) {
      setDates(checkInParam, checkOutParam);
    }
    if (unitParam) {
      selectUnit(unitParam);
      // Auto advance to step 2 if unit is pre-selected
      setCurrentStep((prev) => (prev === 1 ? 2 : prev));
    }
    if (rateParam) {
      selectRatePlan(rateParam);
    }
  }, [searchParams]);

  // Hold Timer countdown
  useEffect(() => {
    if (!state.holdExpiresAt || currentStep === 6) return;

    const interval = setInterval(() => {
      const remainingSec = Math.max(0, Math.floor((state.holdExpiresAt! - Date.now()) / 1000));
      setHoldTimeRemaining(remainingSec);
      if (remainingSec === 0) {
        setHoldExpiredModal(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [state.holdExpiresAt, currentStep]);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Selected Unit
  const selectedUnit = accommodations.find((a) => a.id === state.selectedUnitId) || null;
  const selectedRate = ratePlans.find((r) => r.id === state.selectedRatePlanId) || ratePlans[0];

  // Live Pricing Calculation
  const availability = selectedUnit
    ? checkStayAvailability(selectedUnit.id, state.checkIn, state.checkOut)
    : { available: true, totalNights: 3, baseTotal: 1200 };

  const totalNights = availability.totalNights || 1;
  const basePricePerNight = selectedUnit
    ? Math.round((selectedUnit.basePrice * (selectedRate.discountMultiplier || selectedRate.priceMultiplier || 1)))
    : 380;
  const roomSubtotal = basePricePerNight * totalNights;

  // Add-ons total
  const addOnsSubtotal = state.selectedAddOns.reduce((acc, curr) => {
    const item = addOns.find((a) => a.id === curr.addOnId);
    if (!item) return acc;
    const isPerNight = item.basis === 'per night' || item.isPerNight;
    const itemCost = isPerNight ? item.price * totalNights * curr.quantity : item.price * curr.quantity;
    return acc + itemCost;
  }, 0);

  // Taxes: 12% Transient Occupancy Tax + 2% TBID Assessment
  const taxesAndFees = Math.round((roomSubtotal + addOnsSubtotal) * 0.14);
  const grandTotal = roomSubtotal + addOnsSubtotal + taxesAndFees;

  const handleCompleteBooking = () => {
    confirmReservation();
    setCurrentStep(6); // Step 6: Confirmation screen
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-canvas text-ink min-h-screen">
      <Header isHeroPage={false} />

      <main className="pt-24 pb-16">
        
        {/* Sticky Checkout Header with Step Progress & Hold Timer */}
        {currentStep < 6 && (
          <div className="sticky top-16 z-30 bg-paper/95 backdrop-blur-xs border-b border-hairline py-3 px-6 md:px-8">
            <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
              
              {/* Step Progress indicators */}
              <div className="flex items-center space-x-2 text-xs font-mono">
                {[
                  { num: 1, label: 'Stay' },
                  { num: 2, label: 'Rate' },
                  { num: 3, label: 'Enhancements' },
                  { num: 4, label: 'Guest Details' },
                  { num: 5, label: 'Review & Confirm' }
                ].map((s, idx) => (
                  <React.Fragment key={s.num}>
                    <button
                      onClick={() => {
                        if (s.num < currentStep) setCurrentStep(s.num);
                      }}
                      disabled={s.num > currentStep}
                      className={`flex items-center space-x-1.5 py-1 px-2 rounded-[2px] transition-colors ${
                        currentStep === s.num
                          ? 'bg-ink text-canvas font-semibold'
                          : s.num < currentStep
                          ? 'text-water hover:underline cursor-pointer'
                          : 'text-muted opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <span>{s.num}.</span>
                      <span className="hidden sm:inline font-sans">{s.label}</span>
                    </button>
                    {idx < 4 && <span className="text-muted/40">/</span>}
                  </React.Fragment>
                ))}
              </div>

              {/* 10-Minute Hold Timer in Mono */}
              <div className="flex items-center space-x-2 bg-canvas border border-hairline px-3 py-1 rounded-[2px] text-xs font-mono">
                <Clock className="w-3.5 h-3.5 text-brass animate-pulse" />
                <span className="text-muted">Villa Hold:</span>
                <span className={`font-semibold ${holdTimeRemaining < 120 ? 'text-rose-700' : 'text-ink'}`}>
                  {formatTimer(holdTimeRemaining)}
                </span>
              </div>

            </div>
          </div>
        )}

        {/* Main Step Body */}
        <div className="max-w-[1240px] mx-auto px-6 md:px-8 py-8">
          
          {/* STEP 1: SELECT ACCOMMODATION */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl text-ink">Choose Your Accommodation</h1>
                <p className="text-xs text-muted font-mono mt-1">
                  Dates: {state.checkIn} → {state.checkOut} ({totalNights} nights) · {state.adults} Adults
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accommodations.map((acc) => (
                  <div
                    key={acc.id}
                    onClick={() => {
                      selectUnit(acc.id);
                      setCurrentStep(2);
                    }}
                    className={`bg-paper border rounded-[8px] p-5 cursor-pointer flex flex-col justify-between space-y-4 transition-all hover:border-water ${
                      state.selectedUnitId === acc.id ? 'border-brass ring-1 ring-brass' : 'border-hairline'
                    }`}
                  >
                    <div>
                      <div className="h-44 rounded-[4px] overflow-hidden relative">
                        <img src={acc.gallery[0]} alt={acc.name} className="w-full h-full object-cover" />
                        {acc.sellMode === 'byUnit' && (
                          <span className="absolute top-2 left-2 bg-brass text-white text-[10px] uppercase font-mono px-2 py-0.5 rounded-[2px]">
                            Exact Villa
                          </span>
                        )}
                      </div>
                      <div className="pt-3">
                        <h3 className="font-serif text-xl text-ink font-medium">{acc.name}</h3>
                        <p className="text-xs text-muted font-mono mt-0.5">
                          Sleeps {acc.sleeps} · {acc.bedConfig} · {acc.sizeSqft} sq ft
                        </p>
                        <p className="text-xs text-ink/75 mt-2 line-clamp-2">{acc.shortDescription}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-hairline flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] text-muted uppercase block font-sans">Avg. Nightly</span>
                        <span className="font-mono text-xl font-semibold text-ink">${acc.basePrice}</span>
                      </div>
                      <button className="bg-water text-white text-xs px-4 py-2 rounded-[2px] font-medium">
                        Select
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: CHOOSE RATE PLAN */}
          {currentStep === 2 && selectedUnit && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-8 space-y-6">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-xs text-muted hover:text-ink flex items-center gap-1 underline font-mono"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to accommodations
                </button>

                <div>
                  <h1 className="font-serif text-3xl sm:text-4xl text-ink">Choose Rate & Cancellation Terms</h1>
                  <p className="text-xs text-muted mt-1">
                    Select payment schedule and flexibility for {selectedUnit.name}.
                  </p>
                </div>

                <div className="space-y-4">
                  {ratePlans.map((plan) => {
                    const multiplier = plan.discountMultiplier || plan.priceMultiplier || 1;
                    const planNightly = Math.round(selectedUnit.basePrice * multiplier);
                    const planTotal = planNightly * totalNights;
                    const isSelected = state.selectedRatePlanId === plan.id;

                    return (
                      <div
                        key={plan.id}
                        onClick={() => selectRatePlan(plan.id)}
                        className={`p-6 rounded-[8px] bg-paper border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-brass ring-1 ring-brass shadow-xs'
                            : 'border-hairline hover:border-hairline'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs uppercase font-mono tracking-wider text-brass bg-brass/10 px-2 py-0.5 rounded-[2px]">
                                {plan.code || plan.id.toUpperCase()}
                              </span>
                              <h3 className="font-serif text-2xl text-ink">{plan.name}</h3>
                            </div>
                            <p className="text-xs text-ink/80 leading-relaxed">{plan.description || plan.tagline}</p>
                            
                            {/* Inclusions */}
                            <div className="flex flex-wrap gap-2 pt-1">
                              {plan.inclusions.map((inc, i) => (
                                <span key={i} className="text-[11px] bg-canvas px-2 py-0.5 rounded-[2px] border border-hairline text-ink flex items-center gap-1">
                                  <Check className="w-3 h-3 text-brass" /> {inc}
                                </span>
                              ))}
                            </div>

                            {/* Policies & Terms */}
                            <div className="pt-2 border-t border-hairline text-[11px] font-mono text-muted space-y-0.5">
                              <div><strong>Cancellation:</strong> {plan.cancellationPolicy}</div>
                              <div><strong>Payment / Deposit:</strong> {plan.depositPolicy || plan.paymentPolicy}</div>
                            </div>
                          </div>

                          <div className="text-right shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0">
                            <span className="text-xs text-muted block font-sans">Avg. per night</span>
                            <span className="font-mono text-2xl font-semibold text-ink">${planNightly}</span>
                            <span className="text-xs text-muted block font-mono mt-0.5">${planTotal} stay total</span>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                selectRatePlan(plan.id);
                                setCurrentStep(3);
                              }}
                              className={`mt-4 w-full py-2 px-4 rounded-[2px] text-xs font-medium cursor-pointer transition-colors ${
                                isSelected ? 'bg-water text-white' : 'bg-canvas border border-hairline text-ink hover:border-water'
                              }`}
                            >
                              {isSelected ? 'Continue' : 'Select Plan'}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Summary Column */}
              <div className="lg:col-span-4 sticky top-36">
                <BookingSideSummary
                  unit={selectedUnit}
                  rate={selectedRate}
                  state={state}
                  nights={totalNights}
                  roomTotal={roomSubtotal}
                  taxes={taxesAndFees}
                  grandTotal={grandTotal}
                />
              </div>
            </div>
          )}

          {/* STEP 3: ADD-ONS & STAY ENHANCEMENTS */}
          {currentStep === 3 && selectedUnit && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-8 space-y-6">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="text-xs text-muted hover:text-ink flex items-center gap-1 underline font-mono"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to rate plans
                </button>

                <div>
                  <h1 className="font-serif text-3xl sm:text-4xl text-ink">Stay Enhancements & Add-ons</h1>
                  <p className="text-xs text-muted mt-1">
                    Pre-arrange transfers, morning provisions, and poolside amenities prior to arrival.
                  </p>
                </div>

                <div className="space-y-4">
                  {addOns.map((addon) => {
                    const selectedItem = state.selectedAddOns.find((a) => a.addOnId === addon.id);
                    const isSelected = !!selectedItem;
                    const isNightly = addon.basis === 'per night' || addon.isPerNight;
                    const itemTotal = isNightly
                      ? addon.price * totalNights * (selectedItem?.quantity || 1)
                      : addon.price * (selectedItem?.quantity || 1);

                    return (
                      <div
                        key={addon.id}
                        className={`p-5 rounded-[8px] bg-paper border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          isSelected ? 'border-brass bg-brass/5' : 'border-hairline'
                        }`}
                      >
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] font-mono uppercase text-muted bg-canvas px-2 py-0.5 rounded-[2px]">
                              {addon.category}
                            </span>
                            <h3 className="font-serif text-lg text-ink font-medium">{addon.name}</h3>
                          </div>
                          <p className="text-xs text-ink/75 leading-relaxed">{addon.description}</p>
                          <span className="text-[11px] font-mono text-muted block">
                            ${addon.price} {isNightly ? '/ night' : 'one-time'}
                          </span>
                        </div>

                        <div className="flex items-center space-x-4 shrink-0">
                          <span className="font-mono text-base font-semibold text-ink">
                            ${itemTotal}
                          </span>
                          <button
                            onClick={() => toggleAddOn(addon.id, isSelected ? 0 : 1)}
                            className={`px-4 py-2 rounded-[2px] text-xs font-medium cursor-pointer transition-colors ${
                              isSelected
                                ? 'bg-ink text-canvas'
                                : 'bg-canvas border border-hairline text-ink hover:border-brass'
                            }`}
                          >
                            {isSelected ? 'Remove' : 'Add to Stay'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <span className="text-xs font-mono text-muted">
                    {state.selectedAddOns.length} enhancement{state.selectedAddOns.length !== 1 ? 's' : ''} added
                  </span>
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="bg-water hover:brightness-110 text-white px-8 py-3 rounded-[2px] text-xs font-medium tracking-wide flex items-center space-x-2 cursor-pointer shadow-xs"
                  >
                    <span>Proceed to Guest Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Summary Column */}
              <div className="lg:col-span-4 sticky top-36">
                <BookingSideSummary
                  unit={selectedUnit}
                  rate={selectedRate}
                  state={state}
                  nights={totalNights}
                  roomTotal={roomSubtotal}
                  taxes={taxesAndFees}
                  grandTotal={grandTotal}
                />
              </div>
            </div>
          )}

          {/* STEP 4: GUEST INFORMATION */}
          {currentStep === 4 && selectedUnit && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-8 space-y-6">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="text-xs text-muted hover:text-ink flex items-center gap-1 underline font-mono"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to enhancements
                </button>

                <div>
                  <h1 className="font-serif text-3xl sm:text-4xl text-ink">Primary Guest Information</h1>
                  <p className="text-xs text-muted mt-1">
                    Your reservation details and direct concierge contact will be sent to this email.
                  </p>
                </div>

                <div className="bg-paper border border-hairline rounded-[8px] p-6 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="uppercase tracking-wider text-muted font-medium block">First Name *</label>
                      <input
                        type="text"
                        required
                        value={state.guestInfo.firstName}
                        onChange={(e) => updateGuestInfo({ firstName: e.target.value })}
                        placeholder="Elena"
                        className="w-full bg-canvas border border-hairline rounded-[2px] px-3 py-2 text-ink text-xs focus:ring-1 focus:ring-brass"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="uppercase tracking-wider text-muted font-medium block">Last Name *</label>
                      <input
                        type="text"
                        required
                        value={state.guestInfo.lastName}
                        onChange={(e) => updateGuestInfo({ lastName: e.target.value })}
                        placeholder="Rostova"
                        className="w-full bg-canvas border border-hairline rounded-[2px] px-3 py-2 text-ink text-xs focus:ring-1 focus:ring-brass"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="uppercase tracking-wider text-muted font-medium block">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={state.guestInfo.email}
                        onChange={(e) => updateGuestInfo({ email: e.target.value })}
                        placeholder="elena@example.com"
                        className="w-full bg-canvas border border-hairline rounded-[2px] px-3 py-2 text-ink text-xs focus:ring-1 focus:ring-brass"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="uppercase tracking-wider text-muted font-medium block">Mobile Phone *</label>
                      <input
                        type="tel"
                        required
                        value={state.guestInfo.phone}
                        onChange={(e) => updateGuestInfo({ phone: e.target.value })}
                        placeholder="+1 (555) 234-5678"
                        className="w-full bg-canvas border border-hairline rounded-[2px] px-3 py-2 text-ink text-xs focus:ring-1 focus:ring-brass"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="uppercase tracking-wider text-muted font-medium block">Estimated Arrival Time</label>
                      <select
                        value={state.guestInfo.estimatedArrival}
                        onChange={(e) => updateGuestInfo({ estimatedArrival: e.target.value })}
                        className="w-full bg-canvas border border-hairline rounded-[2px] px-3 py-2 text-ink text-xs focus:ring-1 focus:ring-brass"
                      >
                        <option>3:00 PM – 5:00 PM (Standard Check-in)</option>
                        <option>5:00 PM – 8:00 PM</option>
                        <option>Late Arrival (After 8:00 PM)</option>
                        <option>Early Arrival Request (Prior to 3:00 PM)</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="uppercase tracking-wider text-muted font-medium block">Transportation Mode</label>
                      <select className="w-full bg-canvas border border-hairline rounded-[2px] px-3 py-2 text-ink text-xs focus:ring-1 focus:ring-brass">
                        <option>Personal Vehicle / Valet Parking</option>
                        <option>Rideshare / Taxi (BUR / LAX)</option>
                        <option>Private Chauffeur Service</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <label className="uppercase tracking-wider text-muted font-medium block">Special Requests & Dietary Notes</label>
                    <textarea
                      rows={3}
                      value={state.guestInfo.specialRequests}
                      onChange={(e) => updateGuestInfo({ specialRequests: e.target.value })}
                      placeholder="e.g., quiet courtyard preference, feather-free bedding, citrus allergies..."
                      className="w-full bg-canvas border border-hairline rounded-[2px] p-3 text-ink text-xs focus:ring-1 focus:ring-brass"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      if (!state.guestInfo.firstName || !state.guestInfo.email) {
                        alert('Please enter your first name and email address to proceed.');
                        return;
                      }
                      setCurrentStep(5);
                    }}
                    className="bg-water hover:brightness-110 text-white px-8 py-3 rounded-[2px] text-xs font-medium tracking-wide flex items-center space-x-2 cursor-pointer shadow-xs"
                  >
                    <span>Proceed to Review & Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Summary Column */}
              <div className="lg:col-span-4 sticky top-36">
                <BookingSideSummary
                  unit={selectedUnit}
                  rate={selectedRate}
                  state={state}
                  nights={totalNights}
                  roomTotal={roomSubtotal}
                  taxes={taxesAndFees}
                  grandTotal={grandTotal}
                />
              </div>
            </div>
          )}

          {/* STEP 5: REVIEW & CONFIRM */}
          {currentStep === 5 && selectedUnit && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-8 space-y-6">
                <button
                  onClick={() => setCurrentStep(4)}
                  className="text-xs text-muted hover:text-ink flex items-center gap-1 underline font-mono"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to guest details
                </button>

                <div>
                  <h1 className="font-serif text-3xl sm:text-4xl text-ink">Review & Authorize Reservation</h1>
                  <p className="text-xs text-muted mt-1">
                    Please review your itinerary, rate plan guarantee, and billing totals.
                  </p>
                </div>

                {/* Itinerary Recap */}
                <div className="bg-paper border border-hairline rounded-[8px] p-6 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-hairline pb-4 gap-2">
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-brass block">
                        Reserved Unit
                      </span>
                      <h3 className="font-serif text-2xl text-ink">{selectedUnit.name}</h3>
                      <p className="text-xs text-muted font-mono">{selectedUnit.floorZone}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-muted block font-mono">Rate Plan:</span>
                      <span className="text-xs font-semibold text-ink font-sans">{selectedRate.name}</span>
                    </div>
                  </div>

                  {/* Dates & Guests */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono py-2">
                    <div>
                      <span className="text-muted text-[10px] block">Check-in</span>
                      <span className="text-ink font-semibold">{state.checkIn} (3:00 PM)</span>
                    </div>
                    <div>
                      <span className="text-muted text-[10px] block">Check-out</span>
                      <span className="text-ink font-semibold">{state.checkOut} (11:00 AM)</span>
                    </div>
                    <div>
                      <span className="text-muted text-[10px] block">Duration</span>
                      <span className="text-ink font-semibold">{totalNights} Nights</span>
                    </div>
                    <div>
                      <span className="text-muted text-[10px] block">Occupants</span>
                      <span className="text-ink font-semibold">{state.adults} Adults</span>
                    </div>
                  </div>

                  {/* Add-ons summary */}
                  {state.selectedAddOns.length > 0 && (
                    <div className="pt-4 border-t border-hairline space-y-2">
                      <span className="text-xs uppercase font-mono tracking-wider text-muted block">
                        Selected Enhancements:
                      </span>
                      <div className="space-y-1 text-xs">
                        {state.selectedAddOns.map((sel) => {
                          const addon = addOns.find((a) => a.id === sel.addOnId);
                          const isNightly = addon?.basis === 'per night' || addon?.isPerNight;
                          return (
                            <div key={sel.addOnId} className="flex justify-between font-mono text-muted">
                              <span>{addon?.name} (Qty {sel.quantity})</span>
                              <span className="text-ink">
                                ${addon ? (isNightly ? addon.price * totalNights * sel.quantity : addon.price * sel.quantity) : 0}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Payment Card Input Simulation (Encrypted guarantee) */}
                  <div className="pt-4 border-t border-hairline space-y-3">
                    <span className="text-xs uppercase font-mono tracking-wider text-muted block font-medium">
                      Payment Guarantee Method
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="sm:col-span-2">
                        <label className="text-[10px] text-muted block mb-1 font-mono">Card Number</label>
                        <input
                          type="text"
                          defaultValue="•••• •••• •••• 4242"
                          className="w-full bg-canvas border border-hairline rounded-[2px] px-3 py-2 text-ink font-mono text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-muted block mb-1 font-mono">Exp / CVC</label>
                        <input
                          type="text"
                          defaultValue="12/28 · 123"
                          className="w-full bg-canvas border border-hairline rounded-[2px] px-3 py-2 text-ink font-mono text-xs"
                        />
                      </div>
                    </div>
                    <p className="text-[11px] text-muted">
                      Your card is held for reservation guarantee under the terms of the {selectedRate.name}. {selectedRate.depositPolicy || selectedRate.paymentPolicy}
                    </p>
                  </div>
                </div>

                {/* Cancellation Guarantee Recap */}
                <div className="p-4 rounded-[6px] bg-[#E8EDE6] border border-hairline text-xs space-y-1">
                  <div className="flex items-center space-x-2 text-brass font-medium">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="uppercase font-mono tracking-wider">Cancellation & Policy Terms</span>
                  </div>
                  <p className="text-ink/80 pt-1 leading-relaxed">
                    {selectedRate.cancellationPolicy}
                  </p>
                </div>

                {/* Authorize button */}
                <div className="pt-4">
                  <button
                    id="booking-confirm-btn"
                    onClick={handleCompleteBooking}
                    className="w-full bg-water hover:brightness-110 active:scale-[0.98] text-white py-4 rounded-[2px] font-medium text-sm tracking-wide transition-all shadow-xs cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <span>Authorize Reservation · ${grandTotal}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] text-muted text-center block mt-2">
                    By confirming, you agree to The Tangerine stay policies and house rules.
                  </span>
                </div>
              </div>

              {/* Right Summary Column */}
              <div className="lg:col-span-4 sticky top-36">
                <BookingSideSummary
                  unit={selectedUnit}
                  rate={selectedRate}
                  state={state}
                  nights={totalNights}
                  roomTotal={roomSubtotal}
                  taxes={taxesAndFees}
                  grandTotal={grandTotal}
                />
              </div>
            </div>
          )}

          {/* STEP 6: CONFIRMATION SCREEN (Per Prompt 5) */}
          {currentStep === 6 && selectedUnit && (
            <div className="max-w-[780px] mx-auto py-8 space-y-8 animate-in fade-in">
              
              {/* Top Banner */}
              <div className="p-8 rounded-[10px] bg-paper border border-hairline text-center space-y-4 shadow-sm">
                <div className="w-12 h-12 bg-brass/10 text-brass rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase font-mono tracking-wider text-brass font-semibold">
                    Reservation Confirmed
                  </span>
                  <h1 className="font-serif text-3xl sm:text-4xl text-ink font-normal mt-1">
                    We look forward to welcoming you to The Tangerine.
                  </h1>
                </div>

                <div className="py-4 border-y border-hairline max-w-sm mx-auto space-y-1 font-mono">
                  <span className="text-xs text-muted uppercase tracking-wider block font-sans">Confirmation Number</span>
                  <span className="font-mono text-2xl font-bold text-ink tracking-wider select-all block">
                    {state.reservationId || 'TNG-78429'}
                  </span>
                  <span className="text-[11px] text-muted block">A receipt was dispatched to {state.guestInfo.email}</span>
                </div>

                {/* Actions Toolbar: Print, Add to Calendar, Manage */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-mono">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center space-x-1.5 px-4 py-2 rounded-[2px] bg-canvas border border-hairline hover:border-brass text-ink"
                  >
                    <Printer className="w-3.5 h-3.5 text-muted" />
                    <span>Print Itinerary</span>
                  </button>

                  <a
                    href={`data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ASUMMARY:Stay at The Tangerine Hotel%0ADESCRIPTION:${selectedUnit.name}%0ALOCATION:3901 W Riverside Dr, Burbank CA%0ADTSTART:${state.checkIn.replace(/-/g, '')}%0ADTEND:${state.checkOut.replace(/-/g, '')}%0AEND:VEVENT%0AEND:VCALENDAR`}
                    download="tangerine-stay.ics"
                    className="flex items-center space-x-1.5 px-4 py-2 rounded-[2px] bg-canvas border border-hairline hover:border-brass text-ink"
                  >
                    <Calendar className="w-3.5 h-3.5 text-muted" />
                    <span>Add to Calendar (.ics)</span>
                  </a>

                  <Link
                    to={`/manage-booking?code=${state.reservationId || 'TNG-78429'}&email=${encodeURIComponent(state.guestInfo.email)}`}
                    className="flex items-center space-x-1.5 px-4 py-2 rounded-[2px] bg-water text-white hover:brightness-110 font-medium"
                  >
                    <span>Manage Reservation</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Complete Reservation Details */}
              <div className="bg-paper border border-hairline rounded-[10px] p-8 space-y-6">
                <h3 className="font-serif text-2xl text-ink">Stay Overview</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-mono">
                  <div>
                    <span className="text-muted uppercase text-[10px] block">Accommodating Villa</span>
                    <span className="text-ink font-semibold text-base font-serif block mt-0.5">{selectedUnit.name}</span>
                    <span className="text-muted block mt-0.5">{selectedUnit.floorZone} · {selectedUnit.sizeSqft} sq ft</span>
                  </div>

                  <div>
                    <span className="text-muted uppercase text-[10px] block">Arrival & Departure</span>
                    <span className="text-ink font-semibold block mt-0.5">Check-in: {state.checkIn} (from 3:00 PM)</span>
                    <span className="text-ink font-semibold block">Check-out: {state.checkOut} (by 11:00 AM)</span>
                    <span className="text-muted block mt-0.5">{totalNights} nights stay</span>
                  </div>
                </div>

                {/* Price Breakdown in Geist Mono */}
                <div className="pt-4 border-t border-hairline space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-muted">
                    <span>Accommodations ({totalNights} nights × ${basePricePerNight})</span>
                    <span className="text-ink">${roomSubtotal}</span>
                  </div>
                  {addOnsSubtotal > 0 && (
                    <div className="flex justify-between text-muted">
                      <span>Enhancements & Add-ons</span>
                      <span className="text-ink">${addOnsSubtotal}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted">
                    <span>Taxes & Lodging Assessments (14%)</span>
                    <span className="text-ink">${taxesAndFees}</span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>Resort & Facility Fee</span>
                    <span className="text-brass">$0 (Included)</span>
                  </div>
                  <div className="pt-2 border-t border-hairline flex justify-between text-sm font-semibold text-ink">
                    <span>Total Authorized</span>
                    <span>${grandTotal}</span>
                  </div>
                </div>

                {/* Arrival & Directions */}
                <div className="pt-4 border-t border-hairline space-y-2 text-xs font-mono">
                  <span className="uppercase text-muted font-sans font-medium block">Directions to Property:</span>
                  <p className="text-ink/80 font-sans leading-relaxed">
                    The Tangerine is situated at 3901 W Riverside Dr, Burbank, CA 91505. Please pull into the gated motor court off Riverside Drive where our valet team will assist with luggage and vehicle placement.
                  </p>
                </div>
              </div>

              {/* Navigation Back */}
              <div className="text-center pt-4">
                <Link to="/" className="text-xs text-muted hover:text-ink underline">
                  Return to The Tangerine home page →
                </Link>
              </div>

            </div>
          )}

        </div>

        {/* Hold Expired Modal */}
        {holdExpiredModal && (
          <div className="fixed inset-0 z-50 bg-shade/60 backdrop-blur-xs flex items-center justify-center p-6 animate-in fade-in">
            <div className="bg-paper border border-hairline rounded-[10px] p-6 max-w-md w-full space-y-4 shadow-xl text-center">
              <div className="w-10 h-10 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-2xl text-ink">Your Villa Hold Has Expired</h3>
              <p className="text-xs text-muted leading-relaxed">
                To keep our inventory fair to all travelers, held units are released after 10 minutes. Would you like an extra 10 minutes to finish reserving this accommodation?
              </p>
              <div className="flex space-x-3 pt-2">
                <button
                  onClick={() => {
                    setHoldExpiredModal(false);
                    extendHoldTimer();
                  }}
                  className="flex-1 bg-water text-white py-2.5 rounded-[2px] text-xs font-medium cursor-pointer"
                >
                  Extend Hold for 10 Min
                </button>
                <button
                  onClick={() => {
                    setHoldExpiredModal(false);
                    navigate('/stay');
                  }}
                  className="flex-1 bg-canvas border border-hairline text-ink py-2.5 rounded-[2px] text-xs font-medium cursor-pointer"
                >
                  Return to Stays
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

// Extracted Sticky Side Summary Component
interface BookingSideSummaryProps {
  unit: (typeof accommodations)[0];
  rate: (typeof ratePlans)[0];
  state: any;
  nights: number;
  roomTotal: number;
  taxes: number;
  grandTotal: number;
}

const BookingSideSummary: React.FC<BookingSideSummaryProps> = ({
  unit,
  rate,
  state,
  nights,
  roomTotal,
  taxes,
  grandTotal
}) => {
  return (
    <div className="bg-paper border border-hairline rounded-[10px] p-6 space-y-5 shadow-xs">
      <div className="flex gap-3 items-center border-b border-hairline pb-4">
        <img src={unit.gallery[0]} alt={unit.name} className="w-16 h-16 rounded-[4px] object-cover shrink-0" />
        <div className="min-w-0 flex-1">
          <span className="text-[10px] uppercase font-mono tracking-wider text-brass block">
            {unit.sellMode === 'byUnit' ? 'Exact Villa' : 'Room Category'}
          </span>
          <h4 className="font-serif text-lg text-ink truncate mt-0.5">{unit.name}</h4>
          <span className="text-xs font-mono text-muted block">{unit.floorZone}</span>
        </div>
      </div>

      <div className="space-y-2 text-xs font-mono border-b border-hairline pb-4">
        <div className="flex justify-between text-muted">
          <span>Check-in:</span>
          <span className="text-ink">{state.checkIn}</span>
        </div>
        <div className="flex justify-between text-muted">
          <span>Check-out:</span>
          <span className="text-ink">{state.checkOut}</span>
        </div>
        <div className="flex justify-between text-muted">
          <span>Stay Length:</span>
          <span className="text-ink">{nights} nights</span>
        </div>
        <div className="flex justify-between text-muted">
          <span>Rate Option:</span>
          <span className="text-ink font-medium">{rate.name}</span>
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-2 text-xs font-mono">
        <div className="flex justify-between text-muted">
          <span>Accommodations</span>
          <span className="text-ink">${roomTotal}</span>
        </div>
        <div className="flex justify-between text-muted">
          <span>Taxes & lodging fee (14%)</span>
          <span className="text-ink">${taxes}</span>
        </div>
        <div className="pt-2 border-t border-hairline flex justify-between text-sm font-semibold">
          <span className="font-sans text-ink">Estimated Total</span>
          <span className="text-ink">${grandTotal}</span>
        </div>
      </div>

      <div className="p-3 bg-canvas rounded-[4px] border border-hairline text-[11px] text-muted space-y-1">
        <span className="text-ink font-medium font-sans uppercase text-[10px] tracking-wider block">Flexibility Guarantee:</span>
        <p>{rate.cancellationPolicy}</p>
      </div>
    </div>
  );
};
