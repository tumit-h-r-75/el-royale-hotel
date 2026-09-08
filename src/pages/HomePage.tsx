import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { AvailabilityBar } from '../components/layout/AvailabilityBar';
import { Footer } from '../components/layout/Footer';
import { accommodations } from '../data/rooms';
import { offers } from '../data/offers';
import { diningOutlets } from '../data/dining';
import { attractions, PROPERTY_LOCATION } from '../data/attractions';
import { galleryPhotos } from '../data/gallery';
import { reviews, reviewSummary } from '../data/reviews';
import { getLowestRateTonight } from '../data/rates';
import { ResortPlanSVG } from '../components/resortMap/ResortPlanSVG';
import { Phone, ArrowRight, Compass, Sparkles, MapPin, ChevronRight, Star, Search } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { selectUnit, selectRatePlan } = useBooking();
  const galleryScrollRef = useRef<HTMLDivElement>(null);

  const lowestTonight = getLowestRateTonight();

  // Asymmetric editorial grid selections:
  // Large feature villa: Garden Villa 3
  const featureVilla = accommodations.find((a) => a.id === 'villa-3') || accommodations[6];
  // 4 smaller entries
  const smallerEntries = [
    accommodations.find((a) => a.id === 'room-classic-king')!,
    accommodations.find((a) => a.id === 'room-deluxe-balcony-king')!,
    accommodations.find((a) => a.id === 'villa-1')!,
    accommodations.find((a) => a.id === 'suite-8-penthouse')!
  ].filter(Boolean);

  const villasOnly = accommodations.filter((a) => a.category === 'villa' || a.sellMode === 'byUnit');

  const scrollGallery = (direction: 'left' | 'right') => {
    if (galleryScrollRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      galleryScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-canvas text-ink min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section id="hero" className="relative h-[92vh] min-h-[640px] max-h-[920px] w-full flex flex-col justify-between overflow-hidden">
        {/* Full-bleed photography background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2400&auto=format&fit=crop"
            alt="El Royale Hotel & Resort grounds with shaded palms and architecture"
            className="w-full h-full object-cover brightness-[0.88] motion-safe:animate-in motion-safe:fade-in motion-safe:duration-1000"
          />
          {/* Soft bottom-to-top scrim for typography legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-shade/90 via-shade/40 to-black/20" />
        </div>

        {/* Header over Hero */}
        <Header isHeroPage={true} />

        {/* Hero Copy at Lower Left */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-8 pb-16 sm:pb-20 md:pb-24 w-full mt-auto">
          <div className="max-w-[760px] space-y-3">
            {/* Live Indicator */}
            <div className="inline-flex items-center space-x-2 bg-shade/70 backdrop-blur-xs border border-white/20 px-3 py-1 rounded-[2px] text-xs text-white">
              <span className="w-2 h-2 rounded-full bg-brass animate-pulse" />
              <span className="font-mono">From ${lowestTonight} tonight</span>
              <span className="text-white/60">·</span>
              <span className="text-white/80">Burbank & North Hollywood</span>
            </div>

            {/* Newsreader Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-normal tracking-tight leading-[1.05]">
              Shade, water, and quiet citrus groves in the heart of Los Angeles.
            </h1>

            <p className="text-white/90 text-base md:text-lg font-sans font-normal max-w-[620px] leading-relaxed pt-1">
              Fourteen bespoke rooms and private pool villas, nestled beneath century-old olive trees five minutes from studio soundstages.
            </p>
          </div>
        </div>
      </section>

      {/* Availability Bar Floating on top of Hero and Page Content without overflow clipping */}
      <div className="relative z-40 -mt-7 sm:-mt-9 md:-mt-10 w-full">
        <AvailabilityBar />
      </div>

      {/* Spacer to absorb docked bar */}
      <div className="h-6 sm:h-8 md:h-12" />

      {/* 2. INTRODUCTION SECTION */}
      <section id="introduction" className="py-24 md:py-28 max-w-[1440px] mx-auto px-6 md:px-8 border-b border-hairline">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Statement Left */}
          <div className="lg:col-span-8">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-[42px] leading-[1.15] text-ink font-normal">
              Built as a mid-century California retreat and reimagined as an unhurried sanctuary. We invite guests to slow down between soundstage calls and canyon hikes.
            </h2>
            <p className="mt-6 text-base md:text-lg text-ink/80 leading-relaxed max-w-[68ch]">
              Unlike typical Hollywood hotels that compete for noise, El Royale Hotel is defined by shade and quiet stone. Here, mornings begin with fresh Valencia oranges plucked from your villa courtyard, and afternoons drift alongside the 75-foot pool beneath Canary palms.
            </p>
          </div>

          {/* Three Plain Facts Right (No icons, no cards) */}
          <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-hairline pt-8 lg:pt-0 lg:pl-10 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-wider text-muted font-sans font-medium block">
                Accommodations
              </span>
              <span className="font-mono text-3xl font-medium text-ink block mt-1">14 Total</span>
              <span className="text-xs text-muted block mt-0.5">6 room categories · 8 individual named villas</span>
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider text-muted font-sans font-medium block">
                Proximity to Flight
              </span>
              <span className="font-mono text-3xl font-medium text-ink block mt-1">3.1 Miles</span>
              <span className="text-xs text-muted block mt-0.5">8 minutes to Hollywood Burbank Airport (BUR)</span>
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider text-muted font-sans font-medium block">
                Heritage & Reimagination
              </span>
              <span className="font-mono text-3xl font-medium text-ink block mt-1">1958 / 2024</span>
              <span className="text-xs text-muted block mt-0.5">Preserved mid-century bones, modern ecological craft</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. STAY SECTION - Asymmetric Editorial Grid */}
      <section id="stay" className="py-24 md:py-28 max-w-[1440px] mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-ink font-normal">
              Rooms, Suites & Named Villas
            </h2>
            <p className="text-muted text-sm mt-2 max-w-[50ch]">
              Room categories assigned at arrival, or choose an exact villa on the resort plan.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-6 text-sm">
            <Link to="/stay" className="text-water hover:underline font-medium flex items-center gap-1">
              <span>All accommodation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/resort-map" className="text-brass hover:underline font-medium flex items-center gap-1">
              <span>Explore the resort map</span>
              <Compass className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Large Feature (Villa) spanning 2 columns with tall image */}
          <div className="lg:col-span-7 bg-paper border border-hairline rounded-[10px] overflow-hidden flex flex-col group">
            <div className="relative h-[380px] sm:h-[440px] overflow-hidden">
              <img
                src={featureVilla.gallery[0]}
                alt={featureVilla.name}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-brass text-white text-[11px] uppercase tracking-wider font-mono px-2.5 py-1 rounded-[2px]">
                Specific Villa · Exact Unit Booking
              </div>
              <div className="absolute bottom-4 right-4 bg-shade/85 backdrop-blur-xs text-white text-xs font-mono px-3 py-1.5 rounded-[2px]">
                {featureVilla.sizeSqft} sq ft · {featureVilla.bedrooms} Bedroom
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-serif text-2xl md:text-3xl text-ink">{featureVilla.name}</h3>
                  <div className="text-right">
                    <span className="text-xs text-muted block font-sans">From</span>
                    <span className="font-mono text-xl font-semibold text-ink">${featureVilla.basePrice}</span>
                    <span className="text-xs text-muted font-mono"> / night</span>
                  </div>
                </div>
                <p className="text-xs text-muted uppercase tracking-wider font-medium mt-1">{featureVilla.floorZone}</p>
                <p className="text-sm text-ink/80 mt-3 leading-relaxed max-w-[62ch]">
                  {featureVilla.shortDescription}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {featureVilla.amenities.slice(0, 3).map((am, i) => (
                    <span key={i} className="text-xs bg-canvas text-ink px-2.5 py-1 rounded-[2px] border border-hairline">
                      {am}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-hairline flex items-center justify-between">
                <Link
                  to={`/stay/${featureVilla.slug}`}
                  className="text-xs uppercase tracking-wider font-medium text-ink hover:text-water transition-colors"
                >
                  View full specifications & floor plan →
                </Link>
                <button
                  onClick={() => {
                    selectUnit(featureVilla.id);
                    navigate(`/book?unit=${featureVilla.id}`);
                  }}
                  className="bg-water text-white text-xs px-5 py-2.5 rounded-[2px] font-medium hover:brightness-110 cursor-pointer"
                >
                  Reserve this villa
                </button>
              </div>
            </div>
          </div>

          {/* 4 Smaller Entries Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {smallerEntries.map((item) => (
              <div
                key={item.id}
                className="bg-paper border border-hairline rounded-[10px] p-5 flex flex-col justify-between space-y-3 hover:border-water/40 transition-colors"
              >
                <div className="flex gap-4 items-start">
                  <img
                    src={item.gallery[0]}
                    alt={item.name}
                    className="w-24 h-24 rounded-[4px] object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      {item.sellMode === 'byUnit' && (
                        <span className="text-[10px] font-mono uppercase text-brass bg-brass/10 px-1.5 py-0.5 rounded-[2px]">
                          Specific Villa
                        </span>
                      )}
                    </div>
                    <h4 className="font-serif text-lg text-ink truncate mt-0.5">{item.name}</h4>
                    <p className="text-xs text-muted font-mono mt-0.5">
                      Sleeps {item.sleeps} · {item.bedConfig} · {item.sizeSqft} sq ft
                    </p>
                    <div className="mt-2 text-xs font-mono">
                      <span className="text-muted">From </span>
                      <span className="font-semibold text-ink">${item.basePrice}</span>
                      <span className="text-muted"> / night</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-hairline text-xs">
                  <Link to={`/stay/${item.slug}`} className="text-muted hover:text-ink underline">
                    Details
                  </Link>
                  <button
                    onClick={() => {
                      selectUnit(item.id);
                      navigate(`/book?unit=${item.id}`);
                    }}
                    className="text-water font-medium hover:underline cursor-pointer"
                  >
                    Check dates →
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. FULL-BLEED SHADE SECTION - Single Pull Quote Only */}
      <section id="guest-reflection" className="bg-shade text-canvas py-28 md:py-36">
        <div className="max-w-[960px] mx-auto px-6 md:px-8 text-center">
          <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl text-canvas font-normal leading-[1.3] tracking-tight">
            “An extraordinarily unhurried presence in the middle of Burbank. The citrus trees and deep shaded corridors filter out the city completely.”
          </blockquote>
          <cite className="block mt-8 text-xs sm:text-sm uppercase tracking-[0.2em] text-canvas/70 font-sans not-italic">
            Elena Rostova · Architectural Digest
          </cite>
        </div>
      </section>

      {/* 5. OFFERS SECTION */}
      <section id="offers" className="py-24 md:py-28 max-w-[1440px] mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-ink font-normal">Special Stay Inclusions</h2>
            <p className="text-muted text-sm mt-2 max-w-[50ch]">
              Curated packages for creative residencies, California neighbors, and advance planners.
            </p>
          </div>
          <Link to="/offers" className="text-water text-sm hover:underline mt-4 md:mt-0 font-medium flex items-center gap-1">
            <span>View all offers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.slice(0, 3).map((offer) => (
            <div
              key={offer.id}
              className="bg-paper border border-hairline rounded-[10px] overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-shade/85 text-canvas text-[11px] font-mono px-2 py-1 rounded-[2px]">
                    Min. {offer.minStay} Nights
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <span className="text-[11px] font-mono text-muted uppercase tracking-wider block">
                    {offer.validityWindow}
                  </span>
                  <h3 className="font-serif text-xl text-ink leading-snug">{offer.title}</h3>
                  <p className="text-xs text-ink/75 leading-relaxed">{offer.subtitle}</p>

                  <div className="pt-2 space-y-1.5 border-t border-hairline text-xs text-muted">
                    <span className="font-medium text-ink block text-[11px] uppercase tracking-wider">Inclusions:</span>
                    {offer.inclusions.slice(0, 2).map((inc, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-ink/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-brass shrink-0" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => {
                    selectRatePlan(offer.ratePlanId);
                    navigate(`/book?offer=${offer.slug}`);
                  }}
                  className="w-full bg-canvas border border-hairline hover:border-water text-ink py-2.5 rounded-[2px] text-xs font-medium tracking-wide transition-colors cursor-pointer"
                >
                  Check dates with this rate →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. THE RESORT SITE MAP TEASER */}
      <section id="resort-teaser" className="py-20 md:py-24 bg-[#E8EDE6] border-y border-hairline">
        <div className="max-w-[1440px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs uppercase font-mono tracking-wider text-brass bg-brass/10 px-2.5 py-1 rounded-[2px] inline-block">
                Signature Interactive Feature
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal leading-tight">
                Select your exact villa on the grounds.
              </h2>
              <p className="text-sm text-ink/80 leading-relaxed">
                Rather than reserving a generic category, explore our interactive grounds map to pick your specific named unit. Examine plunge pool orientation, proximity to the citrus orchard or the 75-foot pool, and verify sunlight angles.
              </p>
              
              <div className="space-y-2 pt-2 text-xs font-mono text-ink">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-water" />
                  <span>Available villas highlighted in water</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-brass" />
                  <span>Real-time unit confirmation at reservation</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/resort-map"
                  id="home-find-villa-btn"
                  className="inline-flex items-center space-x-2 bg-water hover:brightness-110 active:scale-[0.98] text-white px-6 py-3 rounded-[2px] text-sm font-medium transition-all shadow-xs"
                >
                  <span>Find your villa on the plan</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Cropped Interactive Map Teaser */}
            <div className="lg:col-span-7 h-[360px] md:h-[420px] rounded-[10px] overflow-hidden border border-hairline shadow-sm relative group">
              <iframe
                title="Google Maps Satellite Teaser - El Royale Hotel Burbank"
                src="https://maps.google.com/maps?q=3901+W+Riverside+Dr,+Burbank,+CA+91505&t=k&z=17&output=embed"
                className="w-full h-full border-0 filter contrast-[1.05]"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <Link
                to="/resort-map"
                className="absolute inset-0 bg-shade/0 group-hover:bg-shade/10 transition-colors flex items-end justify-end p-4"
              >
                <span className="bg-paper/90 backdrop-blur-xs text-ink text-xs font-medium px-3 py-1.5 rounded-[2px] border border-hairline flex items-center gap-1 shadow-xs">
                  <span>Open Full Interactive Map</span>
                  <ChevronRight className="w-3.5 h-3.5 text-brass" />
                </span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 7. DINING SECTION */}
      <section id="dining" className="py-24 md:py-28 max-w-[1440px] mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-ink font-normal">Dining & Provisions</h2>
            <p className="text-muted text-sm mt-2 max-w-[50ch]">
              Coastal California cuisine, poolside agave spritzes, and fresh morning espresso.
            </p>
          </div>
          <Link to="/dining" className="text-water text-sm hover:underline mt-4 md:mt-0 font-medium flex items-center gap-1">
            <span>View all menus</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {diningOutlets.map((outlet) => (
            <div key={outlet.id} className="bg-paper border border-hairline rounded-[10px] overflow-hidden flex flex-col justify-between">
              <div>
                <div className="h-52 overflow-hidden">
                  <img
                    src={outlet.image}
                    alt={outlet.name}
                    className="w-full h-full object-cover hover:scale-103 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-[11px] font-mono text-muted uppercase tracking-wider block">
                    {outlet.hours}
                  </span>
                  <h3 className="font-serif text-2xl text-ink">{outlet.name}</h3>
                  <p className="text-xs text-brass font-medium italic">{outlet.tagline}</p>
                  <p className="text-xs text-ink/75 leading-relaxed pt-2">
                    {outlet.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-hairline/60">
                <Link
                  to={`/dining#${outlet.slug}`}
                  className="text-xs font-medium text-water hover:underline flex items-center justify-between pt-3"
                >
                  <span>Explore dishes & drinks</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. EXPLORE SECTION - Teaser for Area Map & Hotel Location */}
      <section id="explore-teaser" className="py-24 md:py-28 bg-[#EBF0EA] border-t border-hairline">
        <div className="max-w-[1440px] mx-auto px-6 md:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-serif text-3xl md:text-4xl text-ink font-normal">What’s Nearby & Vicinity Map</h2>
                <span className="hidden sm:inline-flex items-center gap-1 bg-brass/15 text-brass px-2 py-0.5 rounded-[2px] text-xs font-mono font-semibold">
                  <Star className="w-3 h-3 fill-brass" /> 4.9 Rating
                </span>
              </div>
              <p className="text-muted text-sm mt-2 max-w-[58ch]">
                Quietly secluded on Riverside Drive, just minutes from Warner Bros soundstages, Universal Studios, and Burbank Airport (BUR).
              </p>
            </div>
            <Link to="/explore" className="text-water text-sm hover:underline font-medium flex items-center gap-1 shrink-0">
              <span>Open interactive area map</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick Map Search & Category Shortcuts */}
          <div className="bg-paper border border-hairline rounded-[8px] p-3 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex-1 flex items-center gap-2">
              <Search className="w-4 h-4 text-water shrink-0 ml-1" />
              <input
                type="text"
                placeholder="Search places on map (e.g. Warner Bros, Universal, or El Royale Hotel)..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    navigate(`/explore?q=${encodeURIComponent((e.target as HTMLInputElement).value)}`);
                  }
                }}
                className="w-full bg-transparent border-none text-xs text-ink placeholder:text-muted focus:ring-0 p-1"
              />
            </div>

            {/* Quick Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar shrink-0 text-xs">
              <Link
                to="/explore?hotel=true"
                className="bg-brass text-white px-2.5 py-1 rounded-[3px] font-medium flex items-center gap-1 shrink-0"
              >
                <Star className="w-3 h-3 fill-current" />
                <span>El Royale Hotel (⭐ 4.9)</span>
              </Link>
              <Link
                to="/explore?q=Warner"
                className="bg-canvas hover:bg-hairline/30 text-ink border border-hairline px-2.5 py-1 rounded-[3px] font-mono text-[11px] shrink-0"
              >
                Warner Bros (3m)
              </Link>
              <Link
                to="/explore?q=Universal"
                className="bg-canvas hover:bg-hairline/30 text-ink border border-hairline px-2.5 py-1 rounded-[3px] font-mono text-[11px] shrink-0"
              >
                Universal (6m)
              </Link>
              <Link
                to="/explore?q=Airport"
                className="bg-canvas hover:bg-hairline/30 text-ink border border-hairline px-2.5 py-1 rounded-[3px] font-mono text-[11px] shrink-0"
              >
                BUR Airport (8m)
              </Link>
            </div>
          </div>

          {/* Destination Cards Grid with Flagship Hotel Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. Flagship Hotel Location & Rating Card */}
            <div className="bg-paper border border-brass rounded-[10px] overflow-hidden p-4 flex flex-col justify-between space-y-3 ring-1 ring-brass/40 shadow-sm">
              <div className="h-36 rounded-[4px] overflow-hidden relative">
                <img src={PROPERTY_LOCATION.image} alt={PROPERTY_LOCATION.name} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 bg-shade/85 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded-[2px] flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>4.9 / 5.0 (284 Reviews)</span>
                </span>
              </div>
              <div>
                <div className="flex items-center space-x-2 text-[11px] font-mono text-brass font-semibold">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span className="truncate">{PROPERTY_LOCATION.neighborhood}</span>
                </div>
                <h4 className="font-serif text-base text-ink font-semibold mt-1 truncate">{PROPERTY_LOCATION.name}</h4>
                <p className="text-xs text-ink/75 line-clamp-2 mt-1">{PROPERTY_LOCATION.description}</p>
              </div>
              <div className="pt-2 border-t border-hairline flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-ink font-semibold">From ${PROPERTY_LOCATION.basePrice} / nt</span>
                <Link
                  to="/explore?hotel=true"
                  className="text-xs text-brass hover:underline font-medium flex items-center gap-1"
                >
                  <span>Pin on map</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* 2, 3, 4. Nearby Attractions */}
            {attractions.slice(0, 3).map((attr) => (
              <div
                key={attr.id}
                className="bg-paper border border-hairline rounded-[10px] overflow-hidden p-4 flex flex-col justify-between space-y-3 hover:border-water/40 transition-colors"
              >
                <div className="h-36 rounded-[4px] overflow-hidden">
                  <img src={attr.image} alt={attr.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center space-x-2 text-[11px] font-mono text-muted">
                    <span>{attr.distanceMiles} mi</span>
                    <span>·</span>
                    <span className="text-water font-medium">{attr.driveTimeMin}m drive</span>
                  </div>
                  <h4 className="font-serif text-base text-ink font-medium mt-1 truncate">{attr.name}</h4>
                  <p className="text-xs text-ink/75 line-clamp-2 mt-1">{attr.oneLineDescription}</p>
                </div>
                <Link
                  to={`/explore/${attr.slug}`}
                  className="text-xs text-water hover:underline font-medium pt-2 border-t border-hairline flex items-center justify-between"
                >
                  <span>Attraction guide</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. GALLERY STRIP - Horizontally scrolling row */}
      <section id="gallery-strip" className="py-20 md:py-24 border-t border-hairline overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-8 mb-6 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-ink font-normal">Atmosphere & Details</h2>
            <p className="text-xs text-muted mt-1 font-sans">Belgian linen, polished limestone, citrus fruit, and afternoon shadow.</p>
          </div>
          <div className="flex items-center space-x-3">
            <Link to="/gallery" className="text-xs text-water hover:underline font-medium">
              View full gallery ({galleryPhotos.length}) →
            </Link>
          </div>
        </div>

        {/* Scrollable track */}
        <div
          ref={galleryScrollRef}
          className="flex space-x-4 overflow-x-auto px-6 md:px-8 pb-4 hide-scrollbar cursor-grab active:cursor-grabbing"
        >
          {galleryPhotos.map((photo) => (
            <div
              key={photo.id}
              className="w-[280px] sm:w-[340px] md:w-[380px] h-[240px] sm:h-[260px] shrink-0 rounded-[6px] overflow-hidden border border-hairline group relative"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex items-end">
                <span className="text-white text-xs font-serif">{photo.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. REVIEWS SECTION - Rating summary + 3-column wall */}
      <section id="reviews" className="py-24 md:py-28 max-w-[1440px] mx-auto px-6 md:px-8 border-t border-hairline">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between border-b border-hairline pb-8">
          <div>
            <span className="text-xs uppercase tracking-wider text-muted font-sans font-medium block">Guest Reflections</span>
            <div className="flex items-baseline space-x-3 mt-1">
              <span className="font-mono text-4xl font-semibold text-ink">{reviewSummary.averageRating}</span>
              <div className="flex items-center text-brass">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brass text-brass" />
                ))}
              </div>
              <span className="text-xs text-muted font-mono">({reviewSummary.totalReviews} verified stays)</span>
            </div>
            <p className="text-xs text-muted mt-1">{reviewSummary.source}</p>
          </div>
          <Link to="/reviews" className="text-water text-xs hover:underline mt-4 md:mt-0 font-medium">
            Read complete review archive →
          </Link>
        </div>

        {/* 3-Column Wall */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="bg-paper border border-hairline rounded-[10px] p-6 flex flex-col justify-between space-y-4"
            >
              <blockquote className="font-serif text-lg text-ink leading-relaxed">
                “{rev.quote}”
              </blockquote>
              <div className="pt-4 border-t border-hairline text-xs">
                <span className="font-sans font-medium text-ink block">{rev.author}</span>
                <span className="text-muted font-mono text-[11px] block mt-0.5">{rev.source} · {rev.stayDate}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. CLOSING CONVERSION BAND ON SHADE */}
      <section id="closing-conversion" className="bg-shade text-canvas py-20 md:py-24 border-t border-shade">
        <div className="max-w-[1440px] mx-auto px-6 md:px-8 text-center space-y-6">
          <div className="max-w-[720px] mx-auto space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-canvas font-normal">
              Reserve your quiet in the valley.
            </h2>
            <p className="text-canvas/80 text-sm md:text-base leading-relaxed">
              Book directly with us for best rates, complimentary welcome citrus cordials, and priority villa placement.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/book')}
              className="bg-water hover:brightness-110 active:scale-[0.98] text-white px-8 py-3.5 rounded-[2px] text-sm font-medium tracking-wide transition-all shadow-xs cursor-pointer"
            >
              Check availability online
            </button>
            <a
              href="tel:+18185550190"
              className="inline-flex items-center space-x-2 text-canvas/90 hover:text-white px-6 py-3.5 rounded-[2px] border border-canvas/20 hover:border-canvas/40 text-xs font-mono transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brass" />
              <span>Direct Concierge: +1 818 555 0190</span>
            </a>
          </div>
        </div>
      </section>

      {/* 12. FOOTER ON SHADE */}
      <Footer />

    </div>
  );
};
