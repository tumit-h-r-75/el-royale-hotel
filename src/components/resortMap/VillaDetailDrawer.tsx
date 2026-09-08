import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Users, Bed, Square, Eye, Sparkles, Check, ArrowRight } from 'lucide-react';
import { Accommodation } from '../../types/hotel';
import { useBooking } from '../../context/BookingContext';
import { checkStayAvailability } from '../../data/rates';

interface VillaDetailDrawerProps {
  villa: Accommodation | null;
  onClose: () => void;
}

export const VillaDetailDrawer: React.FC<VillaDetailDrawerProps> = ({ villa, onClose }) => {
  const { state, selectUnit } = useBooking();
  const navigate = useNavigate();

  if (!villa) return null;

  const { available, totalNights, baseTotal, nearestAvailableCheckIn } = checkStayAvailability(
    villa.id,
    state.checkIn,
    state.checkOut
  );

  const handleReserve = () => {
    selectUnit(villa.id);
    navigate(`/book?unit=${villa.id}&checkIn=${state.checkIn}&checkOut=${state.checkOut}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-shade/40 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-[480px] bg-paper h-full shadow-2xl overflow-y-auto flex flex-col border-l border-hairline animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="sticky top-0 bg-paper/95 backdrop-blur-xs z-10 px-6 py-4 border-b border-hairline flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs uppercase font-mono tracking-wider text-brass bg-brass/10 px-2 py-0.5 rounded-[2px]">
              Exact Unit Selection
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-[2px] text-muted hover:text-ink hover:bg-canvas transition-colors"
            aria-label="Close villa detail"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 flex-1">
          
          {/* 3-Image Gallery */}
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-3 h-52 rounded-[6px] overflow-hidden">
              <img
                src={villa.gallery[0] || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200&auto=format&fit=crop'}
                alt={villa.name}
                className="w-full h-full object-cover"
              />
            </div>
            {villa.gallery.slice(1, 3).map((img, idx) => (
              <div key={idx} className="col-span-1.5 h-24 rounded-[4px] overflow-hidden">
                <img
                  src={img}
                  alt={`${villa.name} detail ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          {/* Title & Short Description */}
          <div>
            <h2 className="font-serif text-3xl text-ink leading-tight">{villa.name}</h2>
            <p className="text-xs text-muted font-sans font-medium uppercase tracking-wider mt-1">
              {villa.floorZone}
            </p>
            <p className="text-sm text-ink/80 mt-3 leading-relaxed">
              {villa.shortDescription}
            </p>
          </div>

          {/* Key Facts Rail in Mono */}
          <div className="grid grid-cols-2 gap-3 py-4 border-y border-hairline text-xs font-mono">
            <div className="flex items-center space-x-2 text-ink">
              <Users className="w-4 h-4 text-muted shrink-0" />
              <span>Sleeps {villa.sleeps} Guests</span>
            </div>
            <div className="flex items-center space-x-2 text-ink">
              <Bed className="w-4 h-4 text-muted shrink-0" />
              <span>{villa.bedrooms} Bedroom ({villa.bedConfig})</span>
            </div>
            <div className="flex items-center space-x-2 text-ink">
              <Square className="w-4 h-4 text-muted shrink-0" />
              <span>{villa.sizeSqft} sq ft interior</span>
            </div>
            <div className="flex items-center space-x-2 text-ink capitalize">
              <Eye className="w-4 h-4 text-muted shrink-0" />
              <span>{villa.view} View</span>
            </div>
          </div>

          {/* Key Features (Top 3) */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-muted font-sans font-medium mb-3">
              Distinct Villa Features
            </h4>
            <div className="space-y-2">
              {villa.amenities.slice(0, 4).map((am, i) => (
                <div key={i} className="flex items-start space-x-2 text-xs text-ink">
                  <Check className="w-3.5 h-3.5 text-brass shrink-0 mt-0.5" />
                  <span>{am}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price Calculation for Selected Dates */}
          <div className="p-4 rounded-[6px] bg-canvas border border-hairline space-y-2">
            <div className="flex items-center justify-between text-xs text-muted">
              <span>Selected Stay Dates</span>
              <span className="font-mono text-ink font-medium">{state.checkIn} → {state.checkOut} ({totalNights} nights)</span>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <span className="text-sm font-medium text-ink">Total Rate (Excl. taxes)</span>
              <div className="text-right">
                <span className="font-mono text-2xl font-semibold text-ink">${baseTotal}</span>
                <span className="text-[11px] text-muted block font-mono">avg. ${Math.round(baseTotal / totalNights)}/night</span>
              </div>
            </div>

            {!available && (
              <div className="mt-2 p-2.5 bg-paper rounded-[2px] border border-amber-300 text-xs text-amber-900">
                <span>Not available for these exact dates. Nearest available arrival: </span>
                <strong className="font-mono">{nearestAvailableCheckIn}</strong>
              </div>
            )}
          </div>

        </div>

        {/* Sticky Actions Footer */}
        <div className="sticky bottom-0 bg-paper p-6 border-t border-hairline space-y-3">
          <button
            id="drawer-reserve-villa-btn"
            onClick={handleReserve}
            disabled={!available}
            className="w-full bg-water hover:brightness-110 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none text-white py-3.5 rounded-[2px] font-medium text-sm tracking-wide transition-all shadow-xs flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>{available ? `Reserve ${villa.name}` : 'Unavailable for Selected Dates'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <div className="text-center">
            <Link
              to={`/stay/${villa.slug}`}
              className="text-xs text-muted hover:text-ink underline transition-colors"
            >
              View full photography, floor plan & policies →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
