import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Tag, ChevronDown, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useBooking } from '../../context/BookingContext';
import { getLowestRateTonight } from '../../data/rates';

interface AvailabilityBarProps {
  isSticky?: boolean;
}

export const AvailabilityBar: React.FC<AvailabilityBarProps> = ({ isSticky = false }) => {
  const { state, setDates, setGuests, setPromoCode, formatMoney } = useBooking();
  const navigate = useNavigate();

  const [guestPickerOpen, setGuestPickerOpen] = useState(false);
  const [promoOpen, setPromoOpen] = useState(Boolean(state.promoCode));
  const [mobileModalOpen, setMobileModalOpen] = useState(false);

  const lowestTonight = getLowestRateTonight();

  // Child ages state if any children added
  const [childAges, setChildAges] = useState<number[]>([6]);

  const handleDateChange = (type: 'checkIn' | 'checkOut', val: string) => {
    if (type === 'checkIn') {
      // If check-in is after or equal to check-out, shift checkout
      if (val >= state.checkOut) {
        const next = new Date(val);
        next.setDate(next.getDate() + 2);
        setDates(val, next.toISOString().split('T')[0]);
      } else {
        setDates(val, state.checkOut);
      }
    } else {
      if (val <= state.checkIn) {
        const prev = new Date(val);
        prev.setDate(prev.getDate() - 1);
        setDates(prev.toISOString().split('T')[0], val);
      } else {
        setDates(state.checkIn, val);
      }
    }
  };

  const handleGuestChange = (type: 'adults' | 'children', delta: number) => {
    if (type === 'adults') {
      const updated = Math.max(1, Math.min(8, state.adults + delta));
      setGuests(updated, state.children);
    } else {
      const updated = Math.max(0, Math.min(4, state.children + delta));
      setGuests(state.adults, updated);
      if (delta > 0) {
        setChildAges([...childAges, 7]);
      } else if (childAges.length > updated) {
        setChildAges(childAges.slice(0, updated));
      }
    }
  };

  const handleSearch = () => {
    setMobileModalOpen(false);
    navigate('/book');
  };

  return (
    <>
      {/* Desktop & Tablet Bar */}
      <div
        id="availability-bar-container"
        className={`w-full max-w-[1240px] mx-auto px-4 sm:px-6 transition-all duration-200 z-40 ${
          isSticky ? 'sticky top-20 shadow-md my-2' : ''
        }`}
      >
        <div className="bg-paper border border-hairline rounded-[10px] shadow-sm p-3 md:p-3.5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-ink">
          
          {/* Live indicator (desktop only) */}
          <div className="hidden xl:flex items-center space-x-2 border-r border-hairline pr-4 py-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-water opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-water"></span>
            </span>
            <div className="text-[13px] leading-tight">
              <span className="text-muted block text-[11px]">Best Available</span>
              <span className="font-mono font-medium text-ink">From {formatMoney(lowestTonight)} tonight</span>
            </div>
          </div>

          {/* Desktop Fields Grid */}
          <div className="hidden md:grid grid-cols-3 lg:grid-cols-4 gap-2 flex-1 items-center">
            
            {/* Check-in */}
            <div className="flex flex-col px-3 py-1.5 rounded-[2px] hover:bg-canvas transition-colors border border-transparent hover:border-hairline cursor-pointer">
              <label htmlFor="avail-checkin" className="text-[11px] uppercase tracking-wider text-muted font-sans font-medium flex items-center gap-1">
                <Calendar className="w-3 h-3 text-water" /> Check-in
              </label>
              <input
                id="avail-checkin"
                type="date"
                value={state.checkIn}
                onChange={(e) => handleDateChange('checkIn', e.target.value)}
                className="bg-transparent border-none text-[15px] font-mono text-ink p-0 focus:ring-0 cursor-pointer"
              />
            </div>

            {/* Check-out */}
            <div className="flex flex-col px-3 py-1.5 rounded-[2px] hover:bg-canvas transition-colors border border-transparent hover:border-hairline cursor-pointer">
              <label htmlFor="avail-checkout" className="text-[11px] uppercase tracking-wider text-muted font-sans font-medium flex items-center gap-1">
                <Calendar className="w-3 h-3 text-water" /> Check-out
              </label>
              <input
                id="avail-checkout"
                type="date"
                value={state.checkOut}
                onChange={(e) => handleDateChange('checkOut', e.target.value)}
                className="bg-transparent border-none text-[15px] font-mono text-ink p-0 focus:ring-0 cursor-pointer"
              />
            </div>

            {/* Guests with Dropdown Popover */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setGuestPickerOpen(!guestPickerOpen)}
                className="w-full text-left flex flex-col px-3 py-1.5 rounded-[2px] hover:bg-canvas transition-colors border border-transparent hover:border-hairline"
                aria-expanded={guestPickerOpen}
              >
                <span className="text-[11px] uppercase tracking-wider text-muted font-sans font-medium flex items-center justify-between">
                  <span className="flex items-center gap-1"><Users className="w-3 h-3 text-water" /> Guests</span>
                  <ChevronDown className="w-3 h-3 text-muted" />
                </span>
                <span className="text-[15px] font-sans text-ink font-medium mt-0.5 truncate">
                  {state.adults} {state.adults === 1 ? 'Adult' : 'Adults'}
                  {state.children > 0 && `, ${state.children} ${state.children === 1 ? 'Child' : 'Children'}`}
                </span>
              </button>

              {/* Guest Picker Popover */}
              <AnimatePresence>
                {guestPickerOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-72 bg-paper border border-hairline rounded-[10px] shadow-xl p-4 z-60"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-hairline">
                      <span className="text-sm font-medium text-ink">Guests & Rooms</span>
                      <button
                        onClick={() => setGuestPickerOpen(false)}
                        className="text-muted hover:text-ink p-1 cursor-pointer"
                        aria-label="Close guests picker"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                  {/* Adults */}
                  <div className="flex items-center justify-between py-3 border-b border-hairline/60">
                    <div>
                      <span className="text-sm font-medium block text-ink">Adults</span>
                      <span className="text-xs text-muted">Ages 13 and above</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleGuestChange('adults', -1)}
                        disabled={state.adults <= 1}
                        className="w-7 h-7 rounded-[2px] border border-hairline flex items-center justify-center text-sm disabled:opacity-30 hover:bg-canvas"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-mono text-sm">{state.adults}</span>
                      <button
                        onClick={() => handleGuestChange('adults', 1)}
                        disabled={state.adults >= 8}
                        className="w-7 h-7 rounded-[2px] border border-hairline flex items-center justify-center text-sm disabled:opacity-30 hover:bg-canvas"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex items-center justify-between py-3 border-b border-hairline/60">
                    <div>
                      <span className="text-sm font-medium block text-ink">Children</span>
                      <span className="text-xs text-muted">Ages 0 to 12</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleGuestChange('children', -1)}
                        disabled={state.children <= 0}
                        className="w-7 h-7 rounded-[2px] border border-hairline flex items-center justify-center text-sm disabled:opacity-30 hover:bg-canvas"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-mono text-sm">{state.children}</span>
                      <button
                        onClick={() => handleGuestChange('children', 1)}
                        disabled={state.children >= 4}
                        className="w-7 h-7 rounded-[2px] border border-hairline flex items-center justify-center text-sm disabled:opacity-30 hover:bg-canvas"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Child Ages if children > 0 */}
                  {state.children > 0 && (
                    <div className="py-2.5">
                      <span className="text-xs text-muted block mb-1.5">Ages at check-in</span>
                      <div className="flex flex-wrap gap-2">
                        {childAges.map((age, idx) => (
                          <div key={idx} className="flex items-center space-x-1 text-xs">
                            <span className="text-muted">Child {idx + 1}:</span>
                            <select
                              value={age}
                              onChange={(e) => {
                                const newAges = [...childAges];
                                newAges[idx] = Number(e.target.value);
                                setChildAges(newAges);
                              }}
                              className="border border-hairline rounded-[2px] px-1.5 py-0.5 text-xs bg-canvas"
                            >
                              {[...Array(13)].map((_, i) => (
                                <option key={i} value={i}>
                                  {i} yr{i !== 1 ? 's' : ''}
                                </option>
                              ))}
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add Room note */}
                  <div className="pt-2 text-xs text-muted flex items-center justify-between">
                    <span>Need more than one unit?</span>
                    <button
                      onClick={() => {
                        setGuestPickerOpen(false);
                        navigate('/stay');
                      }}
                      className="text-water underline hover:brightness-90"
                    >
                      Browse all units
                    </button>
                  </div>

                  <button
                    onClick={() => setGuestPickerOpen(false)}
                    className="w-full mt-3 bg-canvas border border-hairline py-1.5 text-xs font-medium rounded-[2px] hover:bg-hairline/40 text-ink cursor-pointer"
                  >
                    Apply guests
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

            {/* Promo Code Toggle */}
            <div className="relative flex items-center">
              {!promoOpen && !state.promoCode ? (
                <button
                  type="button"
                  onClick={() => setPromoOpen(true)}
                  className="text-[13px] text-muted hover:text-ink flex items-center gap-1 py-2 px-3 rounded-[2px] hover:bg-canvas"
                >
                  <Tag className="w-3.5 h-3.5 text-brass" />
                  <span>Promo code</span>
                </button>
              ) : (
                <div className="flex items-center space-x-1 w-full px-2 py-1 bg-canvas rounded-[2px] border border-hairline">
                  <input
                    type="text"
                    placeholder="e.g. RESIDENT or STUDIO"
                    value={state.promoCode || ''}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className="w-full bg-transparent text-xs uppercase font-mono tracking-wider text-ink border-none focus:ring-0 p-0"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPromoCode('');
                      setPromoOpen(false);
                    }}
                    className="text-muted hover:text-ink p-1"
                    aria-label="Remove promo code"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Search Button (Desktop) */}
          <div className="hidden md:flex items-center">
            <button
              id="avail-search-submit"
              type="button"
              onClick={handleSearch}
              className="bg-water hover:brightness-110 active:scale-[0.98] text-white px-7 py-3 rounded-[2px] text-[15px] font-medium tracking-wide transition-all duration-150 whitespace-nowrap cursor-pointer shadow-xs focus-visible:outline-water"
            >
              Search dates
            </button>
          </div>

          {/* Mobile Collapsed Tap Target */}
          <div className="md:hidden flex items-center justify-between w-full">
            <button
              type="button"
              onClick={() => setMobileModalOpen(true)}
              className="flex-1 flex items-center justify-between py-1 text-left"
            >
              <div>
                <div className="text-xs text-muted font-sans font-medium flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-water" />
                  <span>Dates & Guests</span>
                </div>
                <div className="text-sm font-mono text-ink font-medium mt-0.5">
                  {state.checkIn} → {state.checkOut} · {state.adults} Guest{state.adults > 1 ? 's' : ''}
                </div>
              </div>
              <span className="text-xs font-mono text-brass font-medium bg-brass/10 px-2 py-1 rounded-[2px]">
                ${lowestTonight}+
              </span>
            </button>
            <button
              onClick={handleSearch}
              className="ml-3 bg-water text-white text-xs px-4 py-2.5 rounded-[2px] font-medium"
            >
              Check
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Full-Screen Date & Guest Picker Modal */}
      <AnimatePresence>
        {mobileModalOpen && (
          <div className="fixed inset-0 z-70 flex flex-col justify-end md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileModalOpen(false)}
              className="fixed inset-0 bg-shade/70 backdrop-blur-xs"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="relative z-10 bg-paper rounded-t-[14px] p-6 max-h-[90vh] overflow-y-auto space-y-5 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-hairline pb-4">
                <div>
                  <h3 className="font-serif text-xl text-ink">Select Stay Dates</h3>
                  <p className="text-xs text-muted font-mono">From {formatMoney(lowestTonight)} tonight</p>
                </div>
                <button
                  onClick={() => setMobileModalOpen(false)}
                  className="p-1 text-muted hover:text-ink rounded-[2px] cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Dates */}
              <div className="space-y-3">
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted block mb-1">Check-in Date</label>
                  <input
                    type="date"
                    value={state.checkIn}
                    onChange={(e) => handleDateChange('checkIn', e.target.value)}
                    className="w-full bg-canvas border border-hairline rounded-[2px] p-2.5 font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted block mb-1">Check-out Date</label>
                  <input
                    type="date"
                    value={state.checkOut}
                    onChange={(e) => handleDateChange('checkOut', e.target.value)}
                    className="w-full bg-canvas border border-hairline rounded-[2px] p-2.5 font-mono text-sm"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="space-y-3 pt-2 border-t border-hairline">
                <span className="text-xs uppercase tracking-wider text-muted block">Guests</span>
                
                <div className="flex items-center justify-between py-1">
                  <div>
                    <span className="text-sm font-medium text-ink block">Adults</span>
                    <span className="text-xs text-muted">Ages 13+</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleGuestChange('adults', -1)}
                      disabled={state.adults <= 1}
                      className="w-8 h-8 rounded-[2px] border border-hairline flex items-center justify-center font-mono disabled:opacity-30 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-mono text-sm w-4 text-center">{state.adults}</span>
                    <button
                      onClick={() => handleGuestChange('adults', 1)}
                      disabled={state.adults >= 8}
                      className="w-8 h-8 rounded-[2px] border border-hairline flex items-center justify-center font-mono disabled:opacity-30 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between py-1">
                  <div>
                    <span className="text-sm font-medium text-ink block">Children</span>
                    <span className="text-xs text-muted">Ages 0 to 12</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleGuestChange('children', -1)}
                      disabled={state.children <= 0}
                      className="w-8 h-8 rounded-[2px] border border-hairline flex items-center justify-center font-mono disabled:opacity-30 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-mono text-sm w-4 text-center">{state.children}</span>
                    <button
                      onClick={() => handleGuestChange('children', 1)}
                      disabled={state.children >= 4}
                      className="w-8 h-8 rounded-[2px] border border-hairline flex items-center justify-center font-mono disabled:opacity-30 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Promo code */}
              <div className="pt-2 border-t border-hairline">
                <label className="text-xs uppercase tracking-wider text-muted block mb-1">Promo or Corporate Code</label>
                <input
                  type="text"
                  placeholder="e.g. RESIDENT or STUDIO"
                  value={state.promoCode || ''}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  className="w-full bg-canvas border border-hairline rounded-[2px] p-2 font-mono text-xs uppercase"
                />
              </div>

              {/* Submit */}
              <button
                onClick={handleSearch}
                className="w-full bg-water text-white py-3.5 rounded-[2px] font-medium text-sm tracking-wide shadow-xs mt-4 cursor-pointer"
              >
                Search available accommodation
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
