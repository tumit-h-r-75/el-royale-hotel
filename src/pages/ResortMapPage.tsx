import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { accommodations } from '../data/rooms';
import { checkStayAvailability } from '../data/rates';
import { useBooking } from '../context/BookingContext';
import { ResortPlanSVG } from '../components/resortMap/ResortPlanSVG';
import { VillaDetailDrawer } from '../components/resortMap/VillaDetailDrawer';
import { Accommodation } from '../types/hotel';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Filter,
  X,
  Users,
  Bed,
  Square,
  Sparkles,
  ArrowRight,
  Info,
  Check,
  Compass,
  Droplets,
  Layers
} from 'lucide-react';

export const ResortMapPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { state, setDates, setGuests, selectUnit, formatMoney, currency } = useBooking();

  // Filter villas only (sellMode === 'byUnit')
  const villas = useMemo(() => accommodations.filter((a) => a.sellMode === 'byUnit'), []);

  // Selected & Hovered state
  const unitParam = searchParams.get('unit');
  const [selectedVilla, setSelectedVilla] = useState<Accommodation | null>(
    villas.find((v) => v.id === unitParam) || null
  );
  const [hoveredVillaId, setHoveredVillaId] = useState<string | null>(null);

  // Map view and layer toggles
  const [blueprintMode, setBlueprintMode] = useState<boolean>(false);
  const [highlightPlungePools, setHighlightPlungePools] = useState<boolean>(false);

  // Filters
  const [bedrooms, setBedrooms] = useState<string>(searchParams.get('bedrooms') || 'all');
  const [view, setView] = useState<string>(searchParams.get('view') || 'all');
  const [availableOnly, setAvailableOnly] = useState<boolean>(searchParams.get('availableOnly') === 'true');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
    searchParams.get('features') ? searchParams.get('features')!.split(',') : []
  );
  const [maxPrice, setMaxPrice] = useState<number>(Number(searchParams.get('maxPrice')) || 1600);

  // Zoom & Pan state
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Sync with URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedVilla) params.set('unit', selectedVilla.id);
    if (bedrooms !== 'all') params.set('bedrooms', bedrooms);
    if (view !== 'all') params.set('view', view);
    if (availableOnly) params.set('availableOnly', 'true');
    if (selectedFeatures.length > 0) params.set('features', selectedFeatures.join(','));
    if (maxPrice < 1600) params.set('maxPrice', maxPrice.toString());
    setSearchParams(params, { replace: true });
  }, [selectedVilla, bedrooms, view, availableOnly, selectedFeatures, maxPrice, setSearchParams]);

  // Compute availability for all villas
  const unavailableVillaIds = useMemo(() => {
    return villas
      .filter((v) => !checkStayAvailability(v.id, state.checkIn, state.checkOut).available)
      .map((v) => v.id);
  }, [villas, state.checkIn, state.checkOut]);

  // Filtered villas
  const filteredVillas = useMemo(() => {
    return villas.filter((v) => {
      if (bedrooms !== 'all') {
        if (bedrooms === '3+' && v.bedrooms < 3) return false;
        if (bedrooms !== '3+' && v.bedrooms !== Number(bedrooms)) return false;
      }
      if (view !== 'all' && v.view !== view) return false;
      if (v.basePrice > maxPrice) return false;
      if (availableOnly && unavailableVillaIds.includes(v.id)) return false;
      if (selectedFeatures.length > 0) {
        const hasAll = selectedFeatures.every((f) => v.features?.includes(f));
        if (!hasAll) return false;
      }
      return true;
    });
  }, [villas, bedrooms, view, maxPrice, availableOnly, selectedFeatures, unavailableVillaIds]);

  const filteredVillaIds = useMemo(() => filteredVillas.map((v) => v.id), [filteredVillas]);

  // Empty state relaxation suggestion:
  const relaxationSuggestion = useMemo(() => {
    if (filteredVillas.length > 0) return null;
    // Suggest relaxing price or feature
    if (availableOnly) {
      return { relaxedFilter: 'Available Only', count: villas.length };
    }
    if (maxPrice < 1600) {
      return { relaxedFilter: `Price Ceiling ($${maxPrice})`, count: 2 };
    }
    if (selectedFeatures.length > 0) {
      return { relaxedFilter: selectedFeatures[0], count: 3 };
    }
    return { relaxedFilter: 'Bedrooms', count: 2 };
  }, [filteredVillas, availableOnly, maxPrice, selectedFeatures, villas.length]);

  const handleSelectVilla = (villa: Accommodation) => {
    setSelectedVilla(villa);
    // Scroll card into view
    const cardEl = cardRefs.current[villa.id];
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const toggleFeature = (f: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(f) ? prev.filter((item) => item !== f) : [...prev, f]
    );
  };

  const clearAllFilters = () => {
    setBedrooms('all');
    setView('all');
    setAvailableOnly(false);
    setSelectedFeatures([]);
    setMaxPrice(1600);
  };

  return (
    <div className="bg-canvas text-ink min-h-screen flex flex-col">
      <Header isHeroPage={false} />

      <main className="pt-24 flex-1 flex flex-col">
        {/* Top Control Bar with Date & Filter Chips */}
        <div className="bg-paper border-b border-hairline py-4 px-6 md:px-8">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-serif text-2xl md:text-3xl text-ink font-normal">
                  Resort Grounds & Villa Plan
                </h1>
                <span className="text-xs uppercase font-mono tracking-wider text-brass bg-brass/10 px-2 py-0.5 rounded-[2px]">
                  Interactive
                </span>
              </div>
              <p className="text-xs text-muted font-sans mt-0.5">
                Click any numbered marker on the grounds to view terrace orientation, sunlight, and exact reservation rates.
              </p>
            </div>

            {/* Quick Filters Toolbar */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {/* Bedrooms */}
              <div className="flex items-center space-x-1 border border-hairline rounded-[2px] p-1 bg-canvas">
                <span className="text-[10px] text-muted uppercase font-mono px-1">Beds</span>
                {['all', '1', '2', '3+'].map((b) => (
                  <button
                    key={b}
                    onClick={() => setBedrooms(b)}
                    className={`px-2 py-0.5 rounded-[2px] font-mono ${
                      bedrooms === b ? 'bg-brass text-white font-medium' : 'text-muted hover:text-ink'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>

              {/* View */}
              <select
                value={view}
                onChange={(e) => setView(e.target.value)}
                className="bg-canvas border border-hairline text-xs rounded-[2px] px-2 py-1 text-ink focus:ring-brass"
              >
                <option value="all">All Orientations</option>
                <option value="garden">Citrus Garden</option>
                <option value="pool">Resort Pool</option>
                <option value="courtyard">Walled Courtyard</option>
                <option value="mountain">Verdugo Hills</option>
              </select>

              {/* Plunge Pool Quick Filter */}
              <button
                onClick={() => toggleFeature('private plunge pool')}
                className={`px-2.5 py-1 rounded-[2px] border text-xs transition-colors flex items-center gap-1 ${
                  selectedFeatures.includes('private plunge pool')
                    ? 'bg-water text-white border-water font-medium'
                    : 'bg-canvas border-hairline text-muted hover:text-ink'
                }`}
              >
                <span>Plunge Pool</span>
              </button>

              {/* Available Only toggle */}
              <label className="flex items-center space-x-1.5 bg-canvas border border-hairline px-2.5 py-1 rounded-[2px] cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={availableOnly}
                  onChange={(e) => setAvailableOnly(e.target.checked)}
                  className="rounded-[2px] text-water"
                />
                <span>Available Only</span>
              </label>

              {(bedrooms !== 'all' || view !== 'all' || selectedFeatures.length > 0 || availableOnly || maxPrice < 1600) && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-muted hover:text-ink underline ml-1"
                >
                  Reset
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Main Interactive Stage */}
        <div className="flex-1 max-w-[1400px] w-full mx-auto px-4 md:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT 8 COLS: Custom Interactive SVG Site Map (Desktop: 2/3) */}
          <div className="lg:col-span-8 flex flex-col min-h-[480px] lg:min-h-[640px] bg-paper rounded-[10px] border border-hairline overflow-hidden shadow-xs relative">
            
            {/* Map Canvas */}
            <div className="flex-1 relative overflow-hidden">
              <ResortPlanSVG
                villas={villas}
                selectedVillaId={selectedVilla?.id || null}
                hoveredVillaId={hoveredVillaId}
                filteredVillaIds={filteredVillaIds}
                unavailableVillaIds={unavailableVillaIds}
                onSelectVilla={handleSelectVilla}
                onHoverVilla={setHoveredVillaId}
                zoomLevel={zoomLevel}
                panOffset={panOffset}
                blueprintMode={blueprintMode}
                highlightPlungePools={highlightPlungePools}
                currencySymbol={currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency === 'CAD' ? 'CA$' : currency === 'JPY' ? '¥' : '$'}
              />

              {/* Map Layer Toggles & Mode Switchers (Top-Right) */}
              <div className="absolute top-4 right-4 flex items-center space-x-2 z-20">
                {/* Plunge Pool Highlight Toggle */}
                <button
                  onClick={() => setHighlightPlungePools(!highlightPlungePools)}
                  className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-[4px] text-xs font-medium border backdrop-blur-xs shadow-xs transition-all cursor-pointer ${
                    highlightPlungePools
                      ? 'bg-water text-white border-water ring-2 ring-water/20'
                      : 'bg-paper/90 text-ink border-hairline hover:bg-paper'
                  }`}
                  title="Toggle highlight on plunge pool villas"
                >
                  <Droplets className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Highlight Pools</span>
                </button>

                {/* Blueprint View Switcher */}
                <button
                  onClick={() => setBlueprintMode(!blueprintMode)}
                  className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-[4px] text-xs font-medium border backdrop-blur-xs shadow-xs transition-all cursor-pointer ${
                    blueprintMode
                      ? 'bg-[#15232D] text-sky-400 border-sky-500/50 ring-2 ring-sky-500/20'
                      : 'bg-paper/90 text-ink border-hairline hover:bg-paper'
                  }`}
                  title="Switch between garden aerial and architectural blueprint view"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{blueprintMode ? 'Blueprint' : 'Garden Plan'}</span>
                </button>
              </div>

              {/* Zoom & Pan Controls (+/-, reset) in top-left */}
              <div className="absolute top-4 left-4 bg-paper/90 backdrop-blur-xs border border-hairline rounded-[4px] p-1 flex flex-col space-y-1 shadow-xs z-20">
                <button
                  onClick={() => setZoomLevel((z) => Math.min(2.0, z + 0.2))}
                  className="p-1.5 rounded-[2px] text-ink hover:bg-canvas transition-colors"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.2))}
                  className="p-1.5 rounded-[2px] text-ink hover:bg-canvas transition-colors"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setZoomLevel(1);
                    setPanOffset({ x: 0, y: 0 });
                  }}
                  className="p-1.5 rounded-[2px] text-ink hover:bg-canvas transition-colors border-t border-hairline"
                  aria-label="Reset zoom and pan"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Legend Explaining Marker States (Bottom-Left) */}
              <div className="absolute bottom-4 left-4 bg-paper/95 backdrop-blur-xs border border-hairline rounded-[4px] p-3 text-[11px] font-mono text-muted space-y-1.5 shadow-xs z-20">
                <span className="font-sans text-[10px] font-semibold text-ink uppercase tracking-wider block">
                  Grounds Legend
                </span>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-water border border-white" />
                  <span className="text-ink">Available Villa</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-brass border border-white" />
                  <span className="text-ink">Currently Selected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-[#9AA59C] border border-white" />
                  <span>Reserved / Unavailable</span>
                </div>
                <div className="text-[10px] text-muted pt-1 border-t border-hairline">
                  Faded pins do not match active filter
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT 4 COLS: Villa Directory & Live Card List (Desktop: 1/3) */}
          <div className="lg:col-span-4 flex flex-col h-full space-y-4">
            
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl text-ink font-normal">
                Named Villas ({filteredVillas.length})
              </h2>
              <span className="text-xs font-mono text-muted">
                {state.checkIn} → {state.checkOut}
              </span>
            </div>

            {/* Empty State Relaxation Box if 0 results */}
            {filteredVillas.length === 0 && relaxationSuggestion && (
              <div className="p-4 bg-paper border border-hairline rounded-[6px] text-xs space-y-2">
                <div className="flex items-start space-x-2 text-amber-900">
                  <Info className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
                  <div>
                    <span className="font-medium block">No villas meet all active criteria</span>
                    <p className="text-muted mt-1">
                      If we relax <strong className="text-ink font-mono">{relaxationSuggestion.relaxedFilter}</strong>, {relaxationSuggestion.count} nearest match{relaxationSuggestion.count > 1 ? 'es are' : ' is'} available.
                    </p>
                  </div>
                </div>
                <button
                  onClick={clearAllFilters}
                  className="w-full bg-canvas border border-hairline py-1.5 rounded-[2px] text-xs font-medium text-ink hover:border-brass mt-2"
                >
                  View all 8 villas
                </button>
              </div>
            )}

            {/* Scrollable Villa Cards List with 2-way hover */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[640px]">
              {villas.map((villa) => {
                const isSelected = selectedVilla?.id === villa.id;
                const isHovered = hoveredVillaId === villa.id;
                const isFilteredOut = !filteredVillaIds.includes(villa.id);
                const isUnavailable = unavailableVillaIds.includes(villa.id);

                const { totalNights, baseTotal } = checkStayAvailability(
                  villa.id,
                  state.checkIn,
                  state.checkOut
                );

                return (
                  <div
                    key={villa.id}
                    ref={(el) => {
                      cardRefs.current[villa.id] = el;
                    }}
                    onClick={() => handleSelectVilla(villa)}
                    onMouseEnter={() => setHoveredVillaId(villa.id)}
                    onMouseLeave={() => setHoveredVillaId(null)}
                    className={`p-4 rounded-[6px] border transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-paper border-brass ring-1 ring-brass shadow-sm'
                        : isHovered
                        ? 'bg-paper border-water'
                        : isFilteredOut
                        ? 'bg-canvas/60 border-hairline opacity-40'
                        : 'bg-paper border-hairline hover:border-hairline'
                    }`}
                  >
                    <div className="flex gap-3">
                      <img
                        src={villa.gallery[0]}
                        alt={villa.name}
                        className="w-20 h-20 rounded-[3px] object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-serif text-base text-ink font-medium truncate">
                            {villa.name}
                          </h3>
                          <span className="text-xs font-mono font-semibold text-ink">
                            {formatMoney(villa.basePrice)}<span className="text-[10px] text-muted font-normal">/nt</span>
                          </span>
                        </div>
                        <p className="text-[11px] text-muted uppercase font-mono mt-0.5 truncate">
                          {villa.floorZone}
                        </p>
                        <div className="flex items-center space-x-3 text-xs font-mono text-muted mt-2">
                          <span>{villa.bedrooms} Bed</span>
                          <span>·</span>
                          <span>{villa.sizeSqft} sq ft</span>
                          <span>·</span>
                          <span className="capitalize">{villa.view}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-hairline flex items-center justify-between text-xs">
                      {isUnavailable ? (
                        <span className="text-[11px] font-mono text-rose-800">
                          Unavailable for these dates
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono text-muted">
                          {formatMoney(baseTotal)} total ({totalNights} nights)
                        </span>
                      )}
                      <span className="text-water font-medium flex items-center gap-1 group-hover:underline">
                        <span>Select on map</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </main>

      {/* Slide-in Villa Detail Drawer when villa is selected with AnimatePresence */}
      <AnimatePresence>
        {selectedVilla && (
          <VillaDetailDrawer
            villa={selectedVilla}
            onClose={() => setSelectedVilla(null)}
          />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};
