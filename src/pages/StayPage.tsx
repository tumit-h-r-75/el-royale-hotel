import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { AvailabilityBar } from '../components/layout/AvailabilityBar';
import { Footer } from '../components/layout/Footer';
import { accommodations } from '../data/rooms';
import { checkStayAvailability } from '../data/rates';
import { useBooking } from '../context/BookingContext';
import { Filter, X, Users, Bed, Square, Eye, Check, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { Accommodation } from '../types/hotel';

export const StayPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { state, selectUnit } = useBooking();

  // Read filters from query params
  const categoryParam = searchParams.get('category') || 'all';
  const bedroomsParam = searchParams.get('bedrooms') || 'all';
  const viewParam = searchParams.get('view') || 'all';
  const featureParam = searchParams.get('feature') || 'all';
  const maxPriceParam = Number(searchParams.get('maxPrice')) || 1600;

  const [category, setCategory] = useState<string>(categoryParam);
  const [bedrooms, setBedrooms] = useState<string>(bedroomsParam);
  const [view, setView] = useState<string>(viewParam);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
    featureParam !== 'all' ? featureParam.split(',') : []
  );
  const [maxPrice, setMaxPrice] = useState<number>(maxPriceParam);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state to URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (category !== 'all') params.set('category', category);
    if (bedrooms !== 'all') params.set('bedrooms', bedrooms);
    if (view !== 'all') params.set('view', view);
    if (selectedFeatures.length > 0) params.set('feature', selectedFeatures.join(','));
    if (maxPrice < 1600) params.set('maxPrice', maxPrice.toString());
    setSearchParams(params, { replace: true });
  }, [category, bedrooms, view, selectedFeatures, maxPrice, setSearchParams]);

  // Filtering logic
  const filteredAccommodations = useMemo(() => {
    return accommodations.filter((item) => {
      if (category !== 'all' && item.category !== category) return false;
      if (bedrooms !== 'all') {
        if (bedrooms === '3+' && item.bedrooms < 3) return false;
        if (bedrooms !== '3+' && item.bedrooms !== Number(bedrooms)) return false;
      }
      if (view !== 'all' && item.view !== view) return false;
      if (item.basePrice > maxPrice) return false;
      if (selectedFeatures.length > 0) {
        const hasAllFeatures = selectedFeatures.every(
          (f) => item.features?.includes(f) || (f === 'accessible' && item.accessible)
        );
        if (!hasAllFeatures) return false;
      }
      return true;
    });
  }, [category, bedrooms, view, selectedFeatures, maxPrice]);

  const toggleFeature = (f: string) => {
    if (selectedFeatures.includes(f)) {
      setSelectedFeatures(selectedFeatures.filter((item) => item !== f));
    } else {
      setSelectedFeatures([...selectedFeatures, f]);
    }
  };

  const clearAllFilters = () => {
    setCategory('all');
    setBedrooms('all');
    setView('all');
    setSelectedFeatures([]);
    setMaxPrice(1600);
  };

  const hasActiveFilters =
    category !== 'all' || bedrooms !== 'all' || view !== 'all' || selectedFeatures.length > 0 || maxPrice < 1600;

  return (
    <div className="bg-canvas text-ink min-h-screen">
      <Header isHeroPage={false} />

      {/* Hero header */}
      <div className="pt-28 pb-8 max-w-[1240px] mx-auto px-6 md:px-8 border-b border-hairline">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-4xl sm:text-5xl text-ink font-normal tracking-tight">
              Accommodation
            </h1>
            <p className="text-muted text-sm mt-2 max-w-[62ch]">
              Select from six quiet room types or reserve one of eight individual named villas directly on the resort plan.
            </p>
          </div>
          <div className="flex items-center space-x-3 text-xs font-mono text-muted">
            <span className="text-ink font-semibold">{filteredAccommodations.length}</span> of {accommodations.length} accommodations available
          </div>
        </div>
      </div>

      {/* Docked Availability Bar */}
      <div className="py-4 border-b border-hairline bg-paper/60">
        <AvailabilityBar />
      </div>

      {/* Main Container: Left Filter Rail + List */}
      <div className="max-w-[1240px] mx-auto px-6 md:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Mobile filter toggle */}
          <div className="lg:hidden flex items-center justify-between pb-4 border-b border-hairline">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="flex items-center space-x-2 bg-paper border border-hairline px-4 py-2 rounded-[2px] text-xs font-medium"
            >
              <Filter className="w-3.5 h-3.5 text-brass" />
              <span>Filters & Preferences</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-brass ml-1" />
              )}
            </button>
            <span className="text-xs font-mono text-muted">{filteredAccommodations.length} results</span>
          </div>

          {/* LEFT RAIL (Desktop Filter Panel) */}
          <aside className="hidden lg:block lg:col-span-3 bg-paper border border-hairline rounded-[10px] p-6 space-y-6 sticky top-28">
            <div className="flex items-center justify-between border-b border-hairline pb-3">
              <span className="text-xs uppercase tracking-wider font-medium text-ink">Refine Stays</span>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-muted hover:text-ink underline cursor-pointer"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-muted font-medium block">Category</label>
              <div className="flex flex-col space-y-1.5 text-xs">
                {[
                  { label: 'All Stays', value: 'all' },
                  { label: 'Rooms (Sold by type)', value: 'room' },
                  { label: 'Suites', value: 'suite' },
                  { label: 'Named Villas (Exact unit)', value: 'villa' }
                ].map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setCategory(c.value)}
                    className={`text-left py-1.5 px-2.5 rounded-[2px] transition-colors flex items-center justify-between ${
                      category === c.value
                        ? 'bg-brass/15 text-ink font-semibold'
                        : 'text-muted hover:bg-canvas hover:text-ink'
                    }`}
                  >
                    <span>{c.label}</span>
                    {category === c.value && <span className="w-1.5 h-1.5 rounded-full bg-brass" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Bedrooms */}
            <div className="space-y-2 pt-3 border-t border-hairline/60">
              <label className="text-xs uppercase tracking-wider text-muted font-medium block">Bedrooms</label>
              <div className="grid grid-cols-4 gap-1.5">
                {['all', '1', '2', '3+'].map((b) => (
                  <button
                    key={b}
                    onClick={() => setBedrooms(b)}
                    className={`py-1.5 text-xs font-mono rounded-[2px] border transition-colors ${
                      bedrooms === b
                        ? 'border-brass bg-brass text-white font-medium'
                        : 'border-hairline text-muted hover:border-ink hover:text-ink'
                    }`}
                  >
                    {b === 'all' ? 'All' : b}
                  </button>
                ))}
              </div>
            </div>

            {/* View */}
            <div className="space-y-2 pt-3 border-t border-hairline/60">
              <label className="text-xs uppercase tracking-wider text-muted font-medium block">View Orientation</label>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {[
                  { label: 'Any View', value: 'all' },
                  { label: 'Garden', value: 'garden' },
                  { label: 'Pool', value: 'pool' },
                  { label: 'Courtyard', value: 'courtyard' },
                  { label: 'Mountain', value: 'mountain' }
                ].map((v) => (
                  <button
                    key={v.value}
                    onClick={() => setView(v.value)}
                    className={`py-1.5 px-2 rounded-[2px] border text-left truncate transition-colors ${
                      view === v.value
                        ? 'border-brass bg-brass/10 text-ink font-medium'
                        : 'border-hairline text-muted hover:text-ink'
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Features (Checkboxes) */}
            <div className="space-y-2 pt-3 border-t border-hairline/60">
              <label className="text-xs uppercase tracking-wider text-muted font-medium block">Features</label>
              <div className="space-y-1.5 text-xs">
                {[
                  { label: 'Private Plunge Pool', key: 'private plunge pool' },
                  { label: 'Sun Terrace / Balcony', key: 'terrace' },
                  { label: 'Chef Kitchen / Kitchenette', key: 'kitchen' },
                  { label: 'Pet Friendly', key: 'pet friendly' },
                  { label: 'Accessible (ADA)', key: 'accessible' }
                ].map((f) => (
                  <label
                    key={f.key}
                    className="flex items-center space-x-2 text-ink cursor-pointer hover:text-water"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFeatures.includes(f.key)}
                      onChange={() => toggleFeature(f.key)}
                      className="rounded-[2px] border-hairline text-water focus:ring-water cursor-pointer"
                    />
                    <span>{f.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-2 pt-3 border-t border-hairline/60">
              <div className="flex items-center justify-between text-xs">
                <label className="uppercase tracking-wider text-muted font-medium">Nightly Ceiling</label>
                <span className="font-mono text-ink font-semibold">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="250"
                max="1600"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-brass cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-muted">
                <span>$250</span>
                <span>$1,600/nt</span>
              </div>
            </div>

            {/* Interactive map link banner */}
            <div className="pt-2 border-t border-hairline">
              <Link
                to="/resort-map"
                className="block p-3 rounded-[4px] bg-canvas border border-hairline hover:border-brass transition-colors text-xs text-ink group"
              >
                <span className="text-[10px] font-mono uppercase text-brass font-semibold block">Prefer site map?</span>
                <span className="font-serif text-sm block mt-0.5 group-hover:text-water transition-colors">
                  Explore grounds plan & exact villa pins →
                </span>
              </Link>
            </div>
          </aside>

          {/* MAIN RESULTS LIST (Wide horizontal cards) */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Active filters chips row in Brass */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 pb-2">
                <span className="text-xs text-muted">Active filters:</span>
                {category !== 'all' && (
                  <span className="inline-flex items-center space-x-1 text-xs font-medium bg-brass text-white px-2 py-0.5 rounded-[2px]">
                    <span className="capitalize">{category}</span>
                    <button onClick={() => setCategory('all')} aria-label="Remove category filter"><X className="w-3 h-3" /></button>
                  </span>
                )}
                {bedrooms !== 'all' && (
                  <span className="inline-flex items-center space-x-1 text-xs font-medium bg-brass text-white px-2 py-0.5 rounded-[2px]">
                    <span>{bedrooms} Bedroom{bedrooms !== '1' ? 's' : ''}</span>
                    <button onClick={() => setBedrooms('all')} aria-label="Remove bedroom filter"><X className="w-3 h-3" /></button>
                  </span>
                )}
                {view !== 'all' && (
                  <span className="inline-flex items-center space-x-1 text-xs font-medium bg-brass text-white px-2 py-0.5 rounded-[2px]">
                    <span className="capitalize">{view} View</span>
                    <button onClick={() => setView('all')} aria-label="Remove view filter"><X className="w-3 h-3" /></button>
                  </span>
                )}
                {selectedFeatures.map((f) => (
                  <span key={f} className="inline-flex items-center space-x-1 text-xs font-medium bg-brass text-white px-2 py-0.5 rounded-[2px]">
                    <span className="capitalize">{f}</span>
                    <button onClick={() => toggleFeature(f)} aria-label={`Remove ${f} filter`}><X className="w-3 h-3" /></button>
                  </span>
                ))}
                {maxPrice < 1600 && (
                  <span className="inline-flex items-center space-x-1 text-xs font-medium bg-brass text-white px-2 py-0.5 rounded-[2px]">
                    <span>Under ${maxPrice}/nt</span>
                    <button onClick={() => setMaxPrice(1600)} aria-label="Reset price filter"><X className="w-3 h-3" /></button>
                  </span>
                )}
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-muted hover:text-ink underline ml-2 cursor-pointer"
                >
                  Reset all
                </button>
              </div>
            )}

            {/* Accommodation Cards */}
            {filteredAccommodations.length === 0 ? (
              <div className="bg-paper border border-hairline rounded-[10px] p-12 text-center space-y-4">
                <h3 className="font-serif text-2xl text-ink">No accommodations match these exact filters</h3>
                <p className="text-sm text-muted max-w-[48ch] mx-auto">
                  Try relaxing your bedroom count or price ceiling to view our full collection of rooms and private villas.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-water text-white text-xs px-5 py-2.5 rounded-[2px] font-medium"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              filteredAccommodations.map((unit) => {
                // Calculate real total for dates if chosen
                const { available, totalNights, baseTotal, nearestAvailableCheckIn } = checkStayAvailability(
                  unit.id,
                  state.checkIn,
                  state.checkOut
                );

                return (
                  <article
                    key={unit.id}
                    id={`unit-card-${unit.id}`}
                    className={`bg-paper border rounded-[10px] overflow-hidden transition-all duration-200 ${
                      !available
                        ? 'border-hairline opacity-70 bg-paper/70'
                        : 'border-hairline hover:border-water/40 shadow-xs'
                    }`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                      
                      {/* Photograph on Left */}
                      <div className="md:col-span-4 relative h-56 md:h-auto min-h-[220px]">
                        <img
                          src={unit.gallery[0]}
                          alt={unit.name}
                          className="w-full h-full object-cover"
                        />
                        {unit.sellMode === 'byUnit' && (
                          <div className="absolute top-3 left-3 bg-brass text-white text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-[2px] shadow-xs">
                            Specific villa, chosen at booking
                          </div>
                        )}
                        <div className="absolute bottom-3 left-3 bg-shade/80 text-canvas text-[11px] font-mono px-2 py-0.5 rounded-[2px]">
                          {unit.gallery.length} photos
                        </div>
                      </div>

                      {/* Middle: Details & Specs */}
                      <div className="md:col-span-5 p-6 flex flex-col justify-between space-y-3">
                        <div>
                          <div className="flex items-center space-x-2 text-xs font-mono text-muted">
                            <span className="uppercase tracking-wider font-sans font-medium">{unit.floorZone}</span>
                          </div>
                          <h2 className="font-serif text-2xl text-ink mt-1">
                            <Link to={`/stay/${unit.slug}`} className="hover:text-water transition-colors">
                              {unit.name}
                            </Link>
                          </h2>
                          <p className="text-xs text-ink/75 mt-1.5 line-clamp-2 leading-relaxed">
                            {unit.shortDescription}
                          </p>
                        </div>

                        {/* Specs Rail in Mono */}
                        <div className="grid grid-cols-2 gap-y-1 gap-x-2 py-2.5 border-y border-hairline/60 text-xs font-mono text-muted">
                          <span className="flex items-center gap-1 text-ink">
                            <Users className="w-3.5 h-3.5 text-muted shrink-0" />
                            Sleeps {unit.sleeps}
                          </span>
                          <span className="flex items-center gap-1 text-ink">
                            <Bed className="w-3.5 h-3.5 text-muted shrink-0" />
                            {unit.bedConfig}
                          </span>
                          <span className="flex items-center gap-1 text-ink">
                            <Square className="w-3.5 h-3.5 text-muted shrink-0" />
                            {unit.sizeSqft} sq ft
                          </span>
                          <span className="flex items-center gap-1 text-ink capitalize">
                            <Eye className="w-3.5 h-3.5 text-muted shrink-0" />
                            {unit.view} view
                          </span>
                        </div>

                        {/* 3 Key Amenities */}
                        <div className="flex flex-wrap gap-1.5">
                          {unit.amenities.slice(0, 3).map((am, i) => (
                            <span key={i} className="text-[11px] bg-canvas text-ink/90 px-2 py-0.5 rounded-[2px] border border-hairline">
                              {am}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right: Price Block and Action */}
                      <div className="md:col-span-3 p-6 bg-canvas/40 border-t md:border-t-0 md:border-l border-hairline flex flex-col justify-between space-y-4">
                        <div className="text-right md:text-right">
                          {available ? (
                            <>
                              <span className="text-xs text-muted block font-sans">
                                {totalNights} nights total (excl. tax)
                              </span>
                              <div className="font-mono text-2xl font-semibold text-ink mt-0.5">
                                ${baseTotal}
                              </div>
                              <span className="text-[11px] text-muted block font-mono">
                                from ${Math.round(baseTotal / totalNights)} / night
                              </span>
                            </>
                          ) : (
                            <div className="text-left md:text-right">
                              <span className="text-xs text-rose-800 font-medium block">
                                Not available for these dates
                              </span>
                              {nearestAvailableCheckIn && (
                                <span className="text-[11px] text-muted block font-mono mt-1">
                                  Next open: {nearestAvailableCheckIn}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <button
                            onClick={() => {
                              selectUnit(unit.id);
                              navigate(`/book?unit=${unit.id}`);
                            }}
                            disabled={!available}
                            className="w-full bg-water hover:brightness-110 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none text-white py-2.5 rounded-[2px] text-xs font-medium tracking-wide transition-all shadow-xs cursor-pointer"
                          >
                            {available ? 'Check dates' : 'Unavailable'}
                          </button>
                          <Link
                            to={`/stay/${unit.slug}`}
                            className="block text-center text-xs text-muted hover:text-ink underline transition-colors"
                          >
                            Unit details & gallery →
                          </Link>
                        </div>
                      </div>

                    </div>
                  </article>
                );
              })
            )}

          </main>

        </div>
      </div>

      {/* Mobile Filter Sheet Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-shade/60 backdrop-blur-xs flex justify-end md:hidden animate-in fade-in">
          <div className="w-full max-w-[340px] bg-paper h-full p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-hairline pb-3">
              <span className="font-serif text-lg text-ink">Refine Stays</span>
              <button onClick={() => setMobileFilterOpen(false)} aria-label="Close filters">
                <X className="w-5 h-5 text-muted" />
              </button>
            </div>

            {/* Mobile Category */}
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-muted font-medium block">Category</span>
              <div className="flex flex-col space-y-1 text-xs">
                {['all', 'room', 'suite', 'villa'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`text-left py-1.5 px-2 rounded-[2px] capitalize ${
                      category === c ? 'bg-brass text-white font-medium' : 'text-ink'
                    }`}
                  >
                    {c === 'all' ? 'All Stays' : c}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Bedrooms */}
            <div className="space-y-2 pt-2 border-t border-hairline">
              <span className="text-xs uppercase tracking-wider text-muted font-medium block">Bedrooms</span>
              <div className="grid grid-cols-4 gap-1 text-xs font-mono">
                {['all', '1', '2', '3+'].map((b) => (
                  <button
                    key={b}
                    onClick={() => setBedrooms(b)}
                    className={`py-1 rounded-[2px] border ${
                      bedrooms === b ? 'bg-brass text-white border-brass' : 'border-hairline'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Features */}
            <div className="space-y-2 pt-2 border-t border-hairline">
              <span className="text-xs uppercase tracking-wider text-muted font-medium block">Features</span>
              {['private plunge pool', 'terrace', 'kitchen', 'pet friendly', 'accessible'].map((f) => (
                <label key={f} className="flex items-center space-x-2 text-xs capitalize">
                  <input
                    type="checkbox"
                    checked={selectedFeatures.includes(f)}
                    onChange={() => toggleFeature(f)}
                    className="text-water"
                  />
                  <span>{f}</span>
                </label>
              ))}
            </div>

            <div className="pt-4 border-t border-hairline flex space-x-2">
              <button
                onClick={clearAllFilters}
                className="w-1/2 py-2.5 rounded-[2px] border border-hairline text-xs font-medium"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-1/2 py-2.5 rounded-[2px] bg-water text-white text-xs font-medium"
              >
                Apply ({filteredAccommodations.length})
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
