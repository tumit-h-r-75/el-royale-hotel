import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Attraction } from '../../types/hotel';
import { PROPERTY_LOCATION, ATTRACTION_CATEGORIES } from '../../data/attractions';
import { useBooking } from '../../context/BookingContext';
import {
  Car,
  ExternalLink,
  Compass,
  Search,
  X,
  Star,
  MapPin,
  Navigation,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  Phone,
  ArrowRight
} from 'lucide-react';

interface AreaMapProps {
  attractions: Attraction[];
  allAttractions?: Attraction[];
  selectedAttractionId: string | null;
  hoveredAttractionId: string | null;
  onSelectAttraction: (attraction: Attraction | null) => void;
  onHoverAttraction: (id: string | null) => void;
  showTravelTimeConnector?: boolean;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  selectedCategory?: string;
  onSelectCategory?: (cat: string) => void;
  isHotelSelected?: boolean;
  onSelectHotel?: (selected: boolean) => void;
}

export const AreaMap: React.FC<AreaMapProps> = ({
  attractions,
  allAttractions,
  selectedAttractionId,
  hoveredAttractionId,
  onSelectAttraction,
  onHoverAttraction,
  showTravelTimeConnector = true,
  searchQuery: externalSearchQuery,
  onSearchChange: externalOnSearchChange,
  selectedCategory: externalSelectedCategory,
  onSelectCategory: externalOnSelectCategory,
  isHotelSelected: externalIsHotelSelected,
  onSelectHotel: externalOnSelectHotel
}) => {
  const navigate = useNavigate();
  const { formatMoney } = useBooking();

  // Internal search state fallback if not controlled from parent
  const [internalSearch, setInternalSearch] = useState('');
  const [internalCategory, setInternalCategory] = useState('all');
  const [internalHotelSelected, setInternalHotelSelected] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [mapMode, setMapMode] = useState<'vector' | 'satellite'>('vector');

  const query = externalSearchQuery !== undefined ? externalSearchQuery : internalSearch;
  const setQuery = externalOnSearchChange || setInternalSearch;
  const activeCategory = externalSelectedCategory !== undefined ? externalSelectedCategory : internalCategory;
  const setActiveCategory = externalOnSelectCategory || setInternalCategory;
  const hotelSelected = externalIsHotelSelected !== undefined ? externalIsHotelSelected : internalHotelSelected;
  const setHotelSelected = (val: boolean) => {
    if (val) {
      onSelectAttraction(null);
    }
    if (externalOnSelectHotel) {
      externalOnSelectHotel(val);
    } else {
      setInternalHotelSelected(val);
    }
  };

  const poolOfAttractions = allAttractions || attractions;

  // Autocomplete search suggestions
  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const matches = poolOfAttractions
      .filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.oneLineDescription.toLowerCase().includes(q)
      )
      .slice(0, 5);

    const matchHotel =
      PROPERTY_LOCATION.name.toLowerCase().includes(q) ||
      'hotel'.includes(q) ||
      'resort'.includes(q) ||
      'tangerine'.includes(q) ||
      'burbank'.includes(q);

    return {
      matchHotel,
      attractions: matches
    };
  }, [query, poolOfAttractions]);

  // Lat/Lng bounding box for Burbank / Hollywood / LA basin:
  const bounds = {
    minLat: 33.91,
    maxLat: 34.24,
    minLng: -118.43,
    maxLng: -118.25
  };

  const project = (lat: number, lng: number) => {
    const width = 800;
    const height = 600;
    const x = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * width;
    const y = ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * height;
    return { x, y };
  };

  const propertyPos = project(PROPERTY_LOCATION.lat, PROPERTY_LOCATION.lng);
  const selectedAttraction = poolOfAttractions.find((a) => a.id === selectedAttractionId);
  const selectedPos = selectedAttraction ? project(selectedAttraction.lat, selectedAttraction.lng) : null;

  // Zoom controls
  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(1.8, Math.max(0.85, Number((prev + delta).toFixed(2)))));
  };

  const resetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setHotelSelected(false);
    onSelectAttraction(null);
  };

  const locateHotel = () => {
    setHotelSelected(true);
    onSelectAttraction(null);
    setZoomLevel(1.2);
  };

  return (
    <div className="relative w-full h-full min-h-[520px] lg:min-h-[640px] bg-[#E8EDE6] rounded-[10px] border border-hairline overflow-hidden select-none flex flex-col">
      
      {/* 1. FLOATING MAP SEARCH RAIL (Directly embedded on the Map) */}
      <div className="absolute top-3 left-3 right-3 sm:right-auto sm:w-[380px] z-30 space-y-2">
        
        {/* Search Input Box */}
        <div className="relative bg-paper/95 backdrop-blur-md border border-hairline rounded-[8px] shadow-lg p-1.5 flex items-center gap-2">
          <div className="pl-2.5 text-muted flex items-center">
            <Search className="w-4 h-4 text-water" />
          </div>
          <input
            type="text"
            placeholder="Search map, studios, or 'El Royale Hotel'..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
            className="w-full bg-transparent border-none text-xs font-sans text-ink placeholder:text-muted/70 focus:ring-0 p-1"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-muted hover:text-ink p-1 cursor-pointer"
              aria-label="Clear search query"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Quick Locate Hotel Star Button */}
          <button
            onClick={locateHotel}
            title="Locate El Royale Hotel & Rating"
            className={`px-2 py-1 rounded-[4px] text-[11px] font-mono font-medium flex items-center gap-1 transition-all shrink-0 cursor-pointer ${
              hotelSelected
                ? 'bg-brass text-white shadow-xs'
                : 'bg-canvas hover:bg-brass/10 border border-hairline text-ink'
            }`}
          >
            <Star className="w-3 h-3 fill-brass text-brass" />
            <span>4.9</span>
          </button>
        </div>

        {/* Real-time Autocomplete Suggestions Popover */}
        <AnimatePresence>
          {searchFocused && query.trim().length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="bg-paper border border-hairline rounded-[8px] shadow-xl overflow-hidden p-1 space-y-0.5 text-xs"
            >
              {/* Hotel Match */}
              {suggestions.matchHotel && (
                <button
                  onMouseDown={() => {
                    locateHotel();
                    setQuery('');
                  }}
                  className="w-full text-left p-2 hover:bg-brass/10 rounded-[4px] flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-brass/20 text-brass flex items-center justify-center shrink-0">
                      <Star className="w-3.5 h-3.5 fill-brass" />
                    </div>
                    <div>
                      <div className="font-medium text-ink flex items-center gap-1.5">
                        <span>El Royale Hotel & Resort</span>
                        <span className="text-[10px] bg-brass text-white px-1 rounded font-mono font-semibold">★ 4.9</span>
                      </div>
                      <div className="text-[11px] text-muted">3901 W Riverside Dr, Burbank (Property)</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-brass font-mono uppercase font-semibold">Hotel Pin</span>
                </button>
              )}

              {/* Attraction Matches */}
              {suggestions.attractions.map((a) => (
                <button
                  key={a.id}
                  onMouseDown={() => {
                    onSelectAttraction(a);
                    setHotelSelected(false);
                    setQuery('');
                  }}
                  className="w-full text-left p-2 hover:bg-canvas rounded-[4px] flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <MapPin className="w-3.5 h-3.5 text-water shrink-0" />
                    <div className="truncate">
                      <div className="font-medium text-ink truncate">{a.name}</div>
                      <div className="text-[11px] text-muted capitalize">{a.category} · {a.driveTimeMin}m drive</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-muted shrink-0">{a.distanceMiles} mi</span>
                </button>
              ))}

              {!suggestions.matchHotel && suggestions.attractions.length === 0 && (
                <div className="p-3 text-center text-xs text-muted">
                  No places matching "{query}". Try "Warner Bros", "Universal", or "El Royale Hotel".
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category Pills directly over map */}
        <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar py-0.5">
          <button
            onClick={() => {
              setHotelSelected(true);
              onSelectAttraction(null);
            }}
            className={`px-2.5 py-1 rounded-[4px] text-[11px] font-medium transition-colors shrink-0 shadow-xs cursor-pointer flex items-center gap-1 ${
              hotelSelected
                ? 'bg-brass text-white'
                : 'bg-paper/90 backdrop-blur-xs text-ink hover:bg-paper border border-hairline'
            }`}
          >
            <Star className="w-3 h-3 fill-current" />
            <span>El Royale Hotel (4.9★)</span>
          </button>

          {ATTRACTION_CATEGORIES.slice(0, 5).map((cat) => {
            const isActive = activeCategory === cat.id && !hotelSelected;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setHotelSelected(false);
                  setActiveCategory(cat.id);
                }}
                className={`px-2.5 py-1 rounded-[4px] text-[11px] font-medium transition-colors shrink-0 shadow-xs cursor-pointer ${
                  isActive
                    ? 'bg-ink text-canvas'
                    : 'bg-paper/90 backdrop-blur-xs text-muted hover:text-ink hover:bg-paper border border-hairline'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

      </div>

      {/* 2. MAP CONTROLS CLUSTER (Google Maps Switcher, Zoom, Reset, Compass at top right) */}
      <div className="absolute top-3 right-3 z-30 flex flex-col gap-2 items-end">
        {/* Map Mode Switcher Button */}
        <button
          onClick={() => setMapMode(mapMode === 'vector' ? 'satellite' : 'vector')}
          className="px-3 py-1.5 rounded-[6px] bg-paper/95 backdrop-blur-md border border-hairline shadow-md text-xs font-mono font-semibold text-ink hover:bg-paper cursor-pointer flex items-center gap-1.5 transition-all"
        >
          <Navigation className="w-3.5 h-3.5 text-water" />
          <span>{mapMode === 'vector' ? 'Google Maps View' : 'Vector Basin Map'}</span>
        </button>

        <div className="flex flex-col gap-1.5 items-end">
          {/* Compass */}
          <div className="w-8 h-8 rounded-[6px] bg-paper/90 backdrop-blur-xs border border-hairline shadow-sm flex items-center justify-center">
            <Compass className="w-4 h-4 text-brass" />
          </div>

          {/* Zoom In/Out & Reset */}
          {mapMode === 'vector' && (
            <div className="bg-paper/90 backdrop-blur-xs border border-hairline rounded-[6px] shadow-sm flex flex-col overflow-hidden text-ink">
              <button
                onClick={() => handleZoom(0.15)}
                title="Zoom In"
                className="p-1.5 hover:bg-canvas border-b border-hairline cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleZoom(-0.15)}
                title="Zoom Out"
                className="p-1.5 hover:bg-canvas border-b border-hairline cursor-pointer"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={resetView}
                title="Reset Map View"
                className="p-1.5 hover:bg-canvas cursor-pointer text-muted hover:text-ink"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Live Count Indicator */}
          <div className="bg-paper/90 backdrop-blur-xs border border-hairline rounded-[4px] px-2 py-0.5 text-[10px] font-mono text-muted shadow-xs">
            {attractions.length} pins
          </div>
        </div>
      </div>

      {/* 3. MAP CANVAS: Vector SVG vs Live Google Maps Iframe */}
      <div className="relative flex-1 w-full h-full overflow-hidden">
        {mapMode === 'satellite' ? (
          <div className="absolute inset-0 w-full h-full bg-paper">
            <iframe
              title="Google Maps Satellite View of El Royale Hotel & Burbank"
              src="https://maps.google.com/maps?q=3901+W+Riverside+Dr,+Burbank,+CA+91505&t=k&z=15&output=embed"
              className="w-full h-full border-0 filter contrast-[1.05]"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-4 left-4 bg-shade/85 backdrop-blur-md text-white px-3 py-1.5 rounded-[4px] text-xs font-mono flex items-center gap-2 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Google Maps Live Satellite · El Royale Hotel (3901 W Riverside Dr)</span>
            </div>
          </div>
        ) : (
          <svg
            viewBox="0 0 800 600"
            className="w-full h-full transition-transform duration-300 ease-out"
            style={{
              transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
              transformOrigin: '50% 50%'
            }}
            aria-label="Map of Los Angeles and Burbank attractions"
          >
          <defs>
            <linearGradient id="hill-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#D9E3D6" />
              <stop offset="100%" stopColor="#C9D6C5" />
            </linearGradient>
            <filter id="hotel-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#A8842C" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Base Basin Ground */}
          <rect x="0" y="0" width="800" height="600" fill="#E8EDE6" />

          {/* Santa Monica & Hollywood Hills Topography Ridge */}
          <path
            d="M 100 320 Q 300 290 480 340 Q 650 360 780 400 L 780 450 Q 550 420 350 390 Q 150 370 0 380 Z"
            fill="url(#hill-grad)"
            opacity="0.85"
          />

          {/* Verdugo & San Gabriel Mountains Ridge */}
          <path
            d="M 450 0 Q 600 60 750 30 L 800 0 L 800 160 Q 650 180 500 130 Z"
            fill="url(#hill-grad)"
            opacity="0.9"
          />

          {/* Griffith Park Green Mass */}
          <circle cx="560" cy="270" r="65" fill="#CAD7C5" opacity="0.9" />

          {/* Major Freeways & Arterials */}
          {/* US-101 Hollywood Freeway */}
          <path
            d="M 120 280 Q 280 280 380 340 Q 480 410 600 480"
            stroke="#D5DCD3"
            strokeWidth="6"
            fill="none"
          />
          {/* I-5 Golden State Freeway */}
          <path
            d="M 320 20 L 520 180 Q 600 240 680 380 L 750 560"
            stroke="#D5DCD3"
            strokeWidth="6"
            fill="none"
          />
          {/* CA-134 Ventura Freeway */}
          <path
            d="M 80 240 L 780 240"
            stroke="#CBD5C8"
            strokeWidth="8"
            fill="none"
          />
          <text x="710" y="234" fill="#88958B" fontSize="9" fontFamily="'Geist Mono', monospace">CA-134</text>

          {/* Riverside Drive & Cahuenga Blvd */}
          <path
            d="M 150 255 L 620 255"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            fill="none"
          />
          <text x="210" y="250" fill="#7A877E" fontSize="8" fontFamily="'Instrument Sans', sans-serif">Riverside Dr</text>

          {/* Los Angeles River Path */}
          <path
            d="M 220 245 Q 400 250 540 220 Q 630 260 670 340"
            stroke="#BDCCD3"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />

          {/* District Typography Labels */}
          <text x="360" y="190" fill="#5C6660" fontSize="11" fontFamily="'Newsreader', serif" letterSpacing="1" opacity="0.6">
            BURBANK
          </text>
          <text x="220" y="210" fill="#5C6660" fontSize="10" fontFamily="'Newsreader', serif" letterSpacing="0.8" opacity="0.5">
            NORTH HOLLYWOOD (NoHo)
          </text>
          <text x="440" y="380" fill="#5C6660" fontSize="11" fontFamily="'Newsreader', serif" letterSpacing="1" opacity="0.6">
            HOLLYWOOD
          </text>
          <text x="560" y="260" fill="#47534B" fontSize="9" fontFamily="'Instrument Sans', sans-serif" opacity="0.7">
            Griffith Park
          </text>

          {/* Travel Time Connector from Hotel to Selected Attraction */}
          {showTravelTimeConnector && selectedPos && (
            <g>
              <line
                x1={propertyPos.x}
                y1={propertyPos.y}
                x2={selectedPos.x}
                y2={selectedPos.y}
                stroke="#A8842C"
                strokeWidth="2.5"
                strokeDasharray="5 4"
                className="animate-pulse"
              />
              {/* Midpoint Distance Badge */}
              {(() => {
                const midX = (propertyPos.x + selectedPos.x) / 2;
                const midY = (propertyPos.y + selectedPos.y) / 2;
                return (
                  <g transform={`translate(${midX}, ${midY})`}>
                    <rect
                      x="-48"
                      y="-12"
                      width="96"
                      height="24"
                      rx="4"
                      fill="#14261F"
                      stroke="#A8842C"
                      strokeWidth="1"
                    />
                    <text
                      x="0"
                      y="4"
                      fill="#F2F4F1"
                      fontSize="10"
                      fontFamily="'Geist Mono', monospace"
                      fontWeight="500"
                      textAnchor="middle"
                    >
                      {selectedAttraction?.driveTimeMin}m drive ({selectedAttraction?.distanceMiles} mi)
                    </text>
                  </g>
                );
              })()}
            </g>
          )}

          {/* Attraction Markers */}
          {attractions.map((attraction) => {
            const pos = project(attraction.lat, attraction.lng);
            const isSelected = selectedAttractionId === attraction.id;
            const isHovered = hoveredAttractionId === attraction.id;

            let pinColor = '#14657E'; // default water
            if (attraction.category === 'studios') pinColor = '#5C6660';
            else if (attraction.category === 'nature') pinColor = '#2F593B';
            else if (attraction.category === 'shopping') pinColor = '#7A6038';
            else if (attraction.category === 'airports') pinColor = '#3D5466';
            else if (attraction.category === 'nightlife') pinColor = '#70435E';

            const scale = isSelected || isHovered ? 1.4 : 1.0;

            return (
              <g
                key={`pin-${attraction.id}`}
                transform={`translate(${pos.x}, ${pos.y}) scale(${scale})`}
                className="cursor-pointer transition-transform duration-150"
                onClick={() => {
                  setHotelSelected(false);
                  onSelectAttraction(attraction);
                }}
                onMouseEnter={() => onHoverAttraction(attraction.id)}
                onMouseLeave={() => onHoverAttraction(null)}
                tabIndex={0}
                role="button"
                aria-label={`${attraction.name}, ${attraction.distanceMiles} miles, ${attraction.driveTimeMin} minutes drive`}
              >
                <circle
                  cx="0"
                  cy="0"
                  r="10"
                  fill={isSelected ? '#A8842C' : pinColor}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
                <circle cx="0" cy="0" r="3" fill="#FFFFFF" />

                {/* Hover / Selected Name Tag */}
                {(isHovered || isSelected) && (
                  <g transform="translate(0, -18)">
                    <rect
                      x="-65"
                      y="-18"
                      width="130"
                      height="20"
                      rx="3"
                      fill="#14261F"
                      stroke="#D9DED8"
                      strokeWidth="0.8"
                    />
                    <text
                      x="0"
                      y="-4"
                      fill="#F2F4F1"
                      fontSize="9"
                      fontFamily="'Instrument Sans', sans-serif"
                      fontWeight="600"
                      textAnchor="middle"
                    >
                      {attraction.name.length > 20 ? `${attraction.name.slice(0, 20)}…` : attraction.name}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* PERMANENT HOTEL MARKER IN BRASS WITH RATING BADGE */}
          <g
            transform={`translate(${propertyPos.x}, ${propertyPos.y})`}
            className="z-30 cursor-pointer"
            onClick={locateHotel}
            filter="url(#hotel-glow)"
          >
            {/* Pulsing Beacon Rings */}
            <circle cx="0" cy="0" r="24" fill="#A8842C" fillOpacity="0.18" className="animate-ping" />
            <circle cx="0" cy="0" r="16" fill="#A8842C" fillOpacity="0.3" />
            <circle cx="0" cy="0" r="12" fill="#A8842C" stroke="#FFFFFF" strokeWidth="2.5" />
            <circle cx="0" cy="0" r="4" fill="#FFFFFF" />

            {/* Persistent Rich Hotel Rating Label */}
            <g transform="translate(18, 5)">
              <rect
                x="0"
                y="-18"
                width="172"
                height="26"
                rx="4"
                fill="#14261F"
                stroke="#A8842C"
                strokeWidth={hotelSelected ? 2 : 1.2}
              />
              {/* Gold Star */}
              <text x="8" y="-1" fill="#E6A838" fontSize="12">★</text>
              <text
                x="22"
                y="-2"
                fill="#F2F4F1"
                fontSize="10.5"
                fontFamily="'Instrument Sans', sans-serif"
                fontWeight="700"
              >
                El Royale Hotel
              </text>
              <text
                x="105"
                y="-2"
                fill="#A8842C"
                fontSize="9.5"
                fontFamily="'Geist Mono', monospace"
                fontWeight="600"
              >
                4.9 (284)
              </text>
            </g>
          </g>

        </svg>
        )}
      </div>

      {/* 4. INTERACTIVE HOTEL LOCATION & RATING CARD OVERLAY */}
      <AnimatePresence>
        {hotelSelected && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-4 left-4 right-4 sm:left-4 sm:right-auto sm:w-[410px] bg-paper border border-brass/60 rounded-[10px] shadow-2xl p-4 z-40 space-y-3"
          >
            {/* Header with Star Rating and Close */}
            <div className="flex items-start justify-between gap-2 border-b border-hairline pb-2.5">
              <div>
                <div className="flex items-center space-x-1.5">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="font-mono text-xs font-bold text-ink">4.9 / 5.0</span>
                  <span className="text-[11px] text-muted font-sans">· Exceptional</span>
                </div>
                <div className="text-[11px] text-muted font-mono mt-0.5">
                  Based on 284 verified guest reviews & editorial features
                </div>
              </div>

              <button
                onClick={() => setHotelSelected(false)}
                className="text-muted hover:text-ink p-1 rounded hover:bg-canvas cursor-pointer"
                aria-label="Close hotel card"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Hotel Media & Info */}
            <div className="flex gap-3 items-center">
              <div className="relative w-20 h-20 rounded-[6px] overflow-hidden shrink-0 border border-hairline">
                <img
                  src={PROPERTY_LOCATION.image}
                  alt={PROPERTY_LOCATION.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 inset-x-0 bg-shade/80 text-[9px] text-white font-mono text-center py-0.5">
                  14 Villas
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-base text-ink font-semibold leading-tight truncate">
                  {PROPERTY_LOCATION.name}
                </h3>
                <div className="text-xs text-muted flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-brass shrink-0" />
                  <span className="truncate">{PROPERTY_LOCATION.address}</span>
                </div>
                <div className="text-[11px] font-mono text-ink/80 mt-1 flex items-baseline gap-1">
                  <span className="text-muted">Starting from</span>
                  <span className="font-bold text-ink text-sm">{formatMoney(PROPERTY_LOCATION.basePrice)}</span>
                  <span className="text-muted text-[10px]">/ night</span>
                </div>
              </div>
            </div>

            {/* Quick Drive Distances */}
            <div className="bg-canvas/80 border border-hairline/60 rounded-[6px] p-2 grid grid-cols-2 gap-1.5 text-[11px] font-mono">
              <div className="flex items-center justify-between text-muted">
                <span>Warner Bros.</span>
                <span className="text-ink font-medium">3m · 0.9mi</span>
              </div>
              <div className="flex items-center justify-between text-muted">
                <span>Universal Studios</span>
                <span className="text-ink font-medium">6m · 2.4mi</span>
              </div>
              <div className="flex items-center justify-between text-muted">
                <span>Burbank Airport</span>
                <span className="text-ink font-medium">8m · 3.2mi</span>
              </div>
              <div className="flex items-center justify-between text-muted">
                <span>Griffith Observatory</span>
                <span className="text-ink font-medium">12m · 5.1mi</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => navigate('/book')}
                className="flex-1 bg-water hover:brightness-110 text-white text-xs py-2 rounded-[3px] font-medium tracking-wide text-center transition-all cursor-pointer shadow-xs"
              >
                Book Your Stay
              </button>
              <button
                onClick={() => navigate('/resort-map')}
                className="flex-1 bg-canvas hover:bg-hairline/40 border border-hairline text-ink text-xs py-2 rounded-[3px] font-medium text-center transition-all cursor-pointer"
              >
                Villa Grounds Map
              </button>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                  PROPERTY_LOCATION.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Open Google Maps Directions"
                className="p-2 border border-hairline rounded-[3px] hover:bg-canvas text-muted hover:text-ink cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 text-brass" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. SELECTED ATTRACTION POPUP OVERLAY */}
      <AnimatePresence>
        {!hotelSelected && selectedAttraction && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-84 bg-paper border border-hairline rounded-[8px] shadow-xl p-3.5 z-40"
          >
            <div className="flex items-start justify-between pb-2 border-b border-hairline/60">
              <span className="text-[10px] uppercase font-mono tracking-wider text-water font-semibold">
                {selectedAttraction.category}
              </span>
              <button
                onClick={() => onSelectAttraction(null)}
                className="text-muted hover:text-ink p-0.5 cursor-pointer"
                aria-label="Close attraction card"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex gap-3 items-center mt-2.5">
              <img
                src={selectedAttraction.image}
                alt={selectedAttraction.name}
                className="w-16 h-16 rounded-[4px] object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-serif text-sm text-ink font-medium truncate">{selectedAttraction.name}</h4>
                <div className="flex items-center space-x-2 text-[11px] font-mono text-muted mt-0.5">
                  <span>{selectedAttraction.distanceMiles} mi from hotel</span>
                  <span>·</span>
                  <span className="text-water font-medium flex items-center gap-0.5">
                    <Car className="w-3 h-3" /> {selectedAttraction.driveTimeMin}m
                  </span>
                </div>
                <p className="text-[11px] text-ink/75 truncate mt-1">
                  {selectedAttraction.oneLineDescription}
                </p>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-hairline flex items-center justify-between text-xs">
              <span className="text-[11px] font-mono text-muted">{selectedAttraction.openingHours}</span>
              <Link
                to={`/explore/${selectedAttraction.slug}`}
                className="text-water hover:underline flex items-center gap-1 font-medium"
              >
                <span>Full Guide</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
