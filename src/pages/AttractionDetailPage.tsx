import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { attractions, PROPERTY_LOCATION } from '../data/attractions';
import { AreaMap } from '../components/explore/AreaMap';
import {
  Car,
  Clock,
  Compass,
  ExternalLink,
  MapPin,
  Sparkles,
  ArrowLeft,
  Calendar,
  DollarSign
} from 'lucide-react';

export const AttractionDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const attraction = attractions.find((a) => a.slug === slug) || attractions[0];
  const relatedAttractions = attractions
    .filter((a) => a.id !== attraction.id && a.category === attraction.category)
    .slice(0, 3);

  return (
    <div className="bg-canvas text-ink min-h-screen">
      <Header isHeroPage={false} />

      <main className="pt-24 pb-16">
        {/* Breadcrumb */}
        <div className="max-w-[1240px] mx-auto px-6 md:px-8 py-3 text-xs text-muted font-mono flex items-center space-x-2">
          <Link to="/explore" className="hover:text-ink underline flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Area Explorer</span>
          </Link>
          <span>/</span>
          <span className="text-ink truncate">{attraction.name}</span>
        </div>

        {/* Hero Banner */}
        <div className="max-w-[1240px] mx-auto px-6 md:px-8 py-4">
          <div className="relative h-[340px] sm:h-[440px] rounded-[10px] overflow-hidden border border-hairline bg-paper">
            <img
              src={attraction.image}
              alt={attraction.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-shade/90 via-shade/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <span className="text-xs uppercase font-mono tracking-wider text-brass bg-shade/70 px-2.5 py-1 rounded-[2px] border border-white/20">
                {attraction.category} · Curated Neighborhood Guide
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight">
                {attraction.name}
              </h1>
              <p className="text-sm md:text-base text-white/85 max-w-[65ch]">
                {attraction.oneLineDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Two-Column Body */}
        <div className="max-w-[1240px] mx-auto px-6 md:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left 8 Cols: Overview, Concierge Insider Tips, Visiting details */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Transit & Proximity Bar in Mono */}
              <div className="p-6 rounded-[8px] bg-paper border border-hairline grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-muted block font-sans">Distance</span>
                  <span className="font-semibold text-ink text-sm">{attraction.distanceMiles} mi ({attraction.distanceKm} km)</span>
                  <span className="text-[11px] text-muted block">from lobby entrance</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-muted block font-sans">Drive Time</span>
                  <span className="font-semibold text-water text-sm flex items-center gap-1">
                    <Car className="w-3.5 h-3.5" />
                    {attraction.driveTimeMin} min
                  </span>
                  <span className="text-[11px] text-muted block">via surface roads</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-muted block font-sans">Admission</span>
                  <span className="font-semibold text-ink text-sm">
                    {attraction.admissionFee || attraction.practicalInfo?.admission || 'Inquire at desk'}
                  </span>
                  <span className="text-[11px] text-muted block">Advance booking suggested</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-muted block font-sans">Typical Hours</span>
                  <span className="font-semibold text-ink text-sm truncate block">{attraction.openingHours}</span>
                  <span className="text-[11px] text-muted block">Subject to filming schedules</span>
                </div>
              </div>

              {/* Long Description */}
              <div className="space-y-4">
                <h2 className="font-serif text-2xl md:text-3xl text-ink font-normal">
                  About the Experience
                </h2>
                <p className="text-sm md:text-base text-ink/80 leading-relaxed max-w-[68ch]">
                  {attraction.fullDescription || attraction.longDescription}
                </p>
              </div>

              {/* El Royale Concierge Insider Tips */}
              <div className="p-6 rounded-[8px] bg-[#E8EDE6] border border-hairline space-y-3">
                <div className="flex items-center space-x-2 text-brass">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs uppercase font-mono tracking-wider font-semibold">
                    Concierge Field Note
                  </span>
                </div>
                <blockquote className="font-serif text-lg text-ink italic leading-snug">
                  “{attraction.insiderTip || attraction.practicalInfo?.bestTime || 'Morning arrivals provide tranquil photo opportunities and easiest parking.'}”
                </blockquote>
                <p className="text-xs text-muted font-sans">
                  Our front desk can assist with securing priority tour slots and complimentary cruiser bicycles.
                </p>
              </div>

              {/* Location & Directions */}
              <div className="space-y-4 border-t border-hairline pt-8">
                <h3 className="font-serif text-2xl text-ink font-normal">Location & Access</h3>
                <div className="flex items-start space-x-3 text-xs text-ink/80 font-mono">
                  <MapPin className="w-4 h-4 text-brass shrink-0 mt-0.5" />
                  <span>{attraction.address || `${attraction.name}, Burbank / Hollywood Area, CA`}</span>
                </div>
                <div className="h-72 rounded-[8px] overflow-hidden border border-hairline">
                  <AreaMap
                    attractions={[attraction]}
                    selectedAttractionId={attraction.id}
                    hoveredAttractionId={null}
                    onSelectAttraction={() => {}}
                    onHoverAttraction={() => {}}
                    showTravelTimeConnector={true}
                  />
                </div>
              </div>

            </div>

            {/* Right 4 Cols: Visiting Card & Concierge Inquiries */}
            <aside className="lg:col-span-4 space-y-6 sticky top-28">
              <div className="bg-paper border border-hairline rounded-[10px] p-6 space-y-5 shadow-sm">
                <h3 className="font-serif text-xl text-ink">Plan Your Visit</h3>
                <div className="space-y-3 text-xs font-mono">
                  <div className="flex justify-between py-1.5 border-b border-hairline">
                    <span className="text-muted">Target Time:</span>
                    <span className="text-ink">{attraction.driveTimeMin} min drive</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-hairline">
                    <span className="text-muted">Admission:</span>
                    <span className="text-ink">
                      {attraction.admissionFee || attraction.practicalInfo?.admission || 'Free entry / Inquire'}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-hairline">
                    <span className="text-muted">Daily Schedule:</span>
                    <span className="text-ink text-right">{attraction.openingHours}</span>
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(attraction.address || attraction.name)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-water hover:brightness-110 text-white py-3 rounded-[2px] text-xs font-medium tracking-wide flex items-center justify-center space-x-2 transition-colors"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="tel:+18185550190"
                    className="w-full bg-canvas border border-hairline hover:border-brass text-ink py-2.5 rounded-[2px] text-xs font-mono flex items-center justify-center space-x-2 transition-colors"
                  >
                    <span>Call Concierge (+1 818 555 0190)</span>
                  </a>
                </div>
              </div>

              {/* Related Attractions */}
              {relatedAttractions.length > 0 && (
                <div className="p-5 bg-paper border border-hairline rounded-[10px] space-y-4">
                  <h4 className="font-serif text-base text-ink">Nearby in this Category</h4>
                  <div className="space-y-3">
                    {relatedAttractions.map((rel) => (
                      <Link
                        key={rel.id}
                        to={`/explore/${rel.slug}`}
                        className="flex gap-3 items-center group hover:bg-canvas p-1.5 rounded-[4px] transition-colors"
                      >
                        <img
                          src={rel.image}
                          alt={rel.name}
                          className="w-12 h-12 rounded-[2px] object-cover shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <h5 className="font-serif text-sm text-ink truncate group-hover:text-water">
                            {rel.name}
                          </h5>
                          <span className="text-[11px] font-mono text-muted block">
                            {rel.distanceMiles} mi · {rel.driveTimeMin}m drive
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
