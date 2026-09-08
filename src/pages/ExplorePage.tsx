import React, { useState, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { AreaMap } from '../components/explore/AreaMap';
import { attractions, ATTRACTION_CATEGORIES, PROPERTY_LOCATION } from '../data/attractions';
import { Attraction } from '../types/hotel';
import { useBooking } from '../context/BookingContext';
import {
  Car,
  Clock,
  ExternalLink,
  Search,
  SlidersHorizontal,
  Compass,
  ArrowUpDown,
  Navigation,
  Check,
  Star,
  MapPin,
  Sparkles
} from 'lucide-react';

export const ExplorePage: React.FC = () => {
  const navigate = useNavigate();
  const { formatMoney } = useBooking();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'all'
  );
  const [distanceRadius, setDistanceRadius] = useState<string>(
    searchParams.get('distance') || 'all'
  );
  const [sortBy, setSortBy] = useState<'nearest' | 'category'>('nearest');
  const [showTravelConnector, setShowTravelConnector] = useState(true);

  // Selected attraction or hotel on map
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [hoveredAttractionId, setHoveredAttractionId] = useState<string | null>(null);
  const [isHotelSelected, setIsHotelSelected] = useState<boolean>(
    searchParams.get('hotel') === 'true'
  );

  // Mobile segmented view: 'map' | 'list'
  const [mobileTab, setMobileTab] = useState<'map' | 'list'>('map');

  // Filtered & sorted attractions
  const filteredAttractions = useMemo(() => {
    let list = attractions.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      if (distanceRadius !== 'all') {
        const radius = Number(distanceRadius);
        if (item.distanceMiles > radius) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.oneLineDescription.toLowerCase().includes(q);
        const matchCategory = item.category.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchCategory) return false;
      }
      return true;
    });

    if (sortBy === 'nearest') {
      list.sort((a, b) => a.distanceMiles - b.distanceMiles);
    } else {
      list.sort((a, b) => a.category.localeCompare(b.category));
    }

    return list;
  }, [selectedCategory, distanceRadius, searchQuery, sortBy]);

  const hotelMatchesSearch = useMemo(() => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      PROPERTY_LOCATION.name.toLowerCase().includes(q) ||
      'hotel'.includes(q) ||
      'resort'.includes(q) ||
      'tangerine'.includes(q) ||
      'burbank'.includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="bg-canvas text-ink min-h-screen flex flex-col">
      <Header isHeroPage={false} />

      <main className="pt-24 flex-1 flex flex-col">
        {/* Page Title & Search Rail */}
        <div className="bg-paper border-b border-hairline py-6 px-6 md:px-8">
          <div className="max-w-[1400px] mx-auto space-y-4">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
                    Area Explorer & Vicinity Map
                  </h1>
                  <span className="text-xs uppercase font-mono tracking-wider text-brass bg-brass/10 px-2 py-0.5 rounded-[2px]">
                    Curated Guide
                  </span>
                </div>
                <p className="text-xs text-muted font-sans mt-1 max-w-[65ch]">
                  The Tangerine sits at the quiet crossroads of Burbank and North Hollywood. Explore neighborhood soundstages, canyon switchbacks, and local supper clubs.
                </p>
              </div>

              {/* Travel Time Connector Toggle */}
              <div className="flex items-center space-x-3 text-xs font-mono">
                <label className="flex items-center space-x-2 cursor-pointer bg-canvas border border-hairline px-3 py-1.5 rounded-[2px]">
                  <input
                    type="checkbox"
                    checked={showTravelConnector}
                    onChange={(e) => setShowTravelConnector(e.target.checked)}
                    className="rounded-[2px] text-brass"
                  />
                  <span>Show drive time connector from hotel</span>
                </label>
              </div>
            </div>

            {/* Filter Toolbar */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Search input */}
              <div className="relative min-w-[220px] flex-1 max-w-[320px]">
                <Search className="w-3.5 h-3.5 text-muted absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search studios, cafes, or 'The Tangerine'..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-canvas border border-hairline text-xs pl-8 pr-3 py-2 rounded-[2px] focus:ring-1 focus:ring-brass"
                />
              </div>

              {/* Distance Radius */}
              <div className="flex items-center space-x-1 text-xs">
                <span className="text-muted font-mono">Radius:</span>
                {['all', '3', '6', '12'].map((rad) => (
                  <button
                    key={rad}
                    onClick={() => setDistanceRadius(rad)}
                    className={`px-2.5 py-1.5 rounded-[2px] border font-mono ${
                      distanceRadius === rad
                        ? 'bg-paper border-water text-water font-medium'
                        : 'bg-canvas border-hairline text-muted'
                    }`}
                  >
                    {rad === 'all' ? 'All' : `<${rad}mi`}
                  </button>
                ))}
              </div>

              {/* Sort Order */}
              <div className="flex items-center space-x-1 text-xs">
                <button
                  onClick={() => setSortBy('nearest')}
                  className={`px-2.5 py-1.5 rounded-[2px] border font-mono ${
                    sortBy === 'nearest'
                      ? 'bg-paper border-water text-water font-medium'
                      : 'bg-canvas border-hairline text-muted'
                  }`}
                >
                  Nearest First
                </button>
                <button
                  onClick={() => setSortBy('category')}
                  className={`px-2.5 py-1.5 rounded-[2px] border font-mono ${
                    sortBy === 'category'
                      ? 'bg-paper border-water text-water font-medium'
                      : 'bg-canvas border-hairline text-muted'
                  }`}
                >
                  By Category
                </button>
              </div>
            </div>

            {/* Category Filter Chips & Hotel Rating Chip */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 overflow-x-auto hide-scrollbar">
              {/* Hotel Pin Button */}
              <button
                onClick={() => {
                  setIsHotelSelected(true);
                  setSelectedAttraction(null);
                  if (mobileTab === 'list') setMobileTab('map');
                }}
                className={`px-3 py-1 rounded-[2px] text-xs font-medium transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  isHotelSelected
                    ? 'bg-brass text-white shadow-xs font-semibold'
                    : 'bg-paper text-ink hover:bg-brass/10 border border-brass/50'
                }`}
              >
                <Star className="w-3.5 h-3.5 fill-brass text-brass" />
                <span>The Tangerine Hotel (★ 4.9 Rating)</span>
              </button>

              {ATTRACTION_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    if (isHotelSelected) setIsHotelSelected(false);
                  }}
                  className={`px-3 py-1 rounded-[2px] text-xs font-medium transition-colors cursor-pointer shrink-0 ${
                    selectedCategory === cat.id && !isHotelSelected
                      ? 'bg-brass text-white shadow-xs'
                      : 'bg-canvas text-muted hover:text-ink border border-hairline'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Mobile View Switcher (Segmented Control: Map / List) */}
        <div className="lg:hidden bg-canvas border-b border-hairline px-6 py-2.5 flex justify-center">
          <div className="bg-paper border border-hairline rounded-[4px] p-1 flex space-x-1 text-xs font-mono">
            <button
              onClick={() => setMobileTab('map')}
              className={`px-4 py-1 rounded-[2px] ${
                mobileTab === 'map' ? 'bg-water text-white font-medium' : 'text-muted'
              }`}
            >
              Interactive Map
            </button>
            <button
              onClick={() => setMobileTab('list')}
              className={`px-4 py-1 rounded-[2px] ${
                mobileTab === 'list' ? 'bg-water text-white font-medium' : 'text-muted'
              }`}
            >
              Directory List ({filteredAttractions.length + 1})
            </button>
          </div>
        </div>

        {/* Main Stage: Left Map + Right List */}
        <div className="flex-1 max-w-[1400px] w-full mx-auto px-4 md:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Map Column (Desktop 7 cols, visible on mobile when tab === 'map') */}
          <div
            className={`lg:col-span-7 flex flex-col min-h-[520px] lg:min-h-[660px] ${
              mobileTab === 'list' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            <AreaMap
              attractions={filteredAttractions}
              allAttractions={attractions}
              selectedAttractionId={selectedAttraction?.id || null}
              hoveredAttractionId={hoveredAttractionId}
              onSelectAttraction={(attr) => {
                setSelectedAttraction(attr);
                if (attr) setIsHotelSelected(false);
              }}
              onHoverAttraction={setHoveredAttractionId}
              showTravelTimeConnector={showTravelConnector}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              isHotelSelected={isHotelSelected}
              onSelectHotel={setIsHotelSelected}
            />
          </div>

          {/* Directory Column (Desktop 5 cols, visible on mobile when tab === 'list') */}
          <div
            className={`lg:col-span-5 flex flex-col space-y-3 ${
              mobileTab === 'map' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            <div className="flex items-center justify-between pb-1 border-b border-hairline text-xs font-mono text-muted">
              <span>Showing destinations near The Tangerine</span>
              <span>Distances from property</span>
            </div>

            {/* Scrollable List */}
            <div className="flex-1 overflow-y-auto space-y-3 max-h-[660px] pr-1">
              
              {/* PINNED HOTEL LOCATION & RATING CARD IN DIRECTORY */}
              {hotelMatchesSearch && (
                <div
                  onClick={() => {
                    setIsHotelSelected(true);
                    setSelectedAttraction(null);
                    if (mobileTab === 'list') setMobileTab('map');
                  }}
                  className={`p-4 rounded-[6px] border transition-all duration-150 cursor-pointer ${
                    isHotelSelected
                      ? 'bg-paper border-brass ring-2 ring-brass/60 shadow-md'
                      : 'bg-paper border-brass/40 hover:border-brass'
                  }`}
                >
                  <div className="flex gap-4">
                    <img
                      src={PROPERTY_LOCATION.image}
                      alt={PROPERTY_LOCATION.name}
                      className="w-24 h-24 rounded-[4px] object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-amber-500" />
                          <span className="font-mono text-xs font-bold text-ink">4.9</span>
                          <span className="text-[10px] text-muted font-sans font-normal">(284 reviews)</span>
                        </div>
                        <span className="font-mono text-xs text-brass font-semibold">
                          Property Pin
                        </span>
                      </div>
                      
                      <h3 className="font-serif text-lg text-ink font-semibold truncate mt-0.5">
                        {PROPERTY_LOCATION.name}
                      </h3>
                      
                      <p className="text-xs text-ink/75 line-clamp-2 mt-1 leading-relaxed">
                        {PROPERTY_LOCATION.description}
                      </p>

                      <div className="flex items-center space-x-2 text-xs font-mono text-muted mt-2">
                        <MapPin className="w-3 h-3 text-brass shrink-0" />
                        <span className="truncate">{PROPERTY_LOCATION.address}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-hairline flex items-center justify-between text-xs">
                    <span className="text-ink font-mono font-medium">
                      From {formatMoney(PROPERTY_LOCATION.basePrice)} <span className="text-muted font-normal text-[11px]">/ night</span>
                    </span>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsHotelSelected(true);
                          setMobileTab('map');
                        }}
                        className="text-brass hover:underline font-medium cursor-pointer"
                      >
                        Locate on Map
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/book');
                        }}
                        className="bg-water hover:brightness-110 text-white px-2.5 py-1 rounded-[2px] font-medium transition-colors cursor-pointer"
                      >
                        Book Tonight
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Filtered Attraction Cards */}
              {filteredAttractions.map((attr) => {
                const isSelected = selectedAttraction?.id === attr.id && !isHotelSelected;
                const isHovered = hoveredAttractionId === attr.id;

                return (
                  <div
                    key={attr.id}
                    onClick={() => {
                      setSelectedAttraction(attr);
                      setIsHotelSelected(false);
                      if (mobileTab === 'list') setMobileTab('map');
                    }}
                    onMouseEnter={() => setHoveredAttractionId(attr.id)}
                    onMouseLeave={() => setHoveredAttractionId(null)}
                    className={`p-4 rounded-[6px] border transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-paper border-brass ring-1 ring-brass shadow-sm'
                        : isHovered
                        ? 'bg-paper border-water'
                        : 'bg-paper border-hairline hover:border-hairline'
                    }`}
                  >
                    <div className="flex gap-4">
                      <img
                        src={attr.image}
                        alt={attr.name}
                        className="w-24 h-24 rounded-[4px] object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-mono tracking-wider text-muted">
                            {attr.category}
                          </span>
                          <span className="font-mono text-xs text-water font-semibold flex items-center gap-1">
                            <Car className="w-3.5 h-3.5" />
                            {attr.driveTimeMin} min drive
                          </span>
                        </div>
                        <h3 className="font-serif text-lg text-ink font-medium truncate mt-0.5">
                          {attr.name}
                        </h3>
                        <p className="text-xs text-ink/75 line-clamp-2 mt-1 leading-relaxed">
                          {attr.oneLineDescription}
                        </p>
                        <div className="flex items-center space-x-3 text-xs font-mono text-muted mt-2">
                          <span>{attr.distanceMiles} mi from lobby</span>
                          <span>·</span>
                          <span className="truncate">{attr.openingHours}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-hairline flex items-center justify-between text-xs">
                      <span className="text-muted font-mono text-[11px]">
                        {attr.insiderTip
                          ? `${attr.insiderTip.slice(0, 38)}…`
                          : attr.practicalInfo?.bestTime
                          ? `${attr.practicalInfo.bestTime.slice(0, 38)}…`
                          : 'Concierge priority access'}
                      </span>
                      <Link
                        to={`/explore/${attr.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-water font-medium hover:underline flex items-center gap-1"
                      >
                        <span>Full guide</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                );
              })}

              {filteredAttractions.length === 0 && !hotelMatchesSearch && (
                <div className="p-8 text-center bg-paper rounded-[6px] border border-hairline text-muted text-xs">
                  No destinations match your filter criteria. Try resetting search or radius.
                </div>
              )}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};
