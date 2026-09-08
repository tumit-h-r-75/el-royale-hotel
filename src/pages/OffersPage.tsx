import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { offers } from '../data/offers';
import { useBooking } from '../context/BookingContext';
import { Sparkles, Calendar, Check, ArrowRight, ShieldCheck } from 'lucide-react';

export const OffersPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectRatePlan } = useBooking();

  const handleBookOffer = (offer: (typeof offers)[0]) => {
    selectRatePlan(offer.ratePlanId);
    navigate(`/book?offer=${offer.slug}`);
  };

  return (
    <div className="bg-canvas text-ink min-h-screen">
      <Header isHeroPage={false} />

      <main className="pt-24 pb-16">
        {/* Page Hero */}
        <section className="max-w-[1240px] mx-auto px-6 md:px-8 py-8 border-b border-hairline">
          <div className="max-w-[720px] space-y-3">
            <span className="text-xs uppercase font-mono tracking-wider text-brass bg-brass/10 px-2.5 py-1 rounded-[2px] inline-block">
              Seasonal Stays & Packages
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink font-normal leading-tight">
              Curated experiences for longer stays and quiet escapes.
            </h1>
            <p className="text-muted text-base md:text-lg leading-relaxed">
              Every package is paired with complimentary property inclusions, from fresh California breakfasts to private garden transfers.
            </p>
          </div>
        </section>

        {/* Offers Grid */}
        <section className="max-w-[1240px] mx-auto px-6 md:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="bg-paper border border-hairline rounded-[10px] overflow-hidden flex flex-col justify-between group shadow-xs hover:border-water/40 transition-colors"
              >
                <div>
                  <div className="relative h-64 sm:h-72 overflow-hidden">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-shade/85 backdrop-blur-xs text-canvas text-xs font-mono px-3 py-1 rounded-[2px]">
                      Min. {offer.minStay} Night Stay
                    </div>
                    <div className="absolute bottom-4 right-4 bg-brass text-white text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-[2px]">
                      Direct Booking Benefit
                    </div>
                  </div>

                  <div className="p-8 space-y-6">
                    <div>
                      <span className="text-xs font-mono text-muted uppercase tracking-wider block">
                        Valid: {offer.validityWindow}
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl text-ink mt-1">
                        {offer.title}
                      </h2>
                      <p className="text-xs text-brass font-medium italic mt-0.5">
                        {offer.subtitle}
                      </p>
                      <p className="text-sm text-ink/80 mt-3 leading-relaxed">
                        {offer.description}
                      </p>
                    </div>

                    {/* What is Included */}
                    <div className="p-4 rounded-[6px] bg-canvas border border-hairline space-y-2">
                      <span className="text-xs uppercase font-mono tracking-wider text-muted font-medium block">
                        Included with this stay:
                      </span>
                      <div className="space-y-1.5">
                        {offer.inclusions.map((inc, i) => (
                          <div key={i} className="flex items-start space-x-2 text-xs text-ink">
                            <Check className="w-3.5 h-3.5 text-brass shrink-0 mt-0.5" />
                            <span>{inc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Terms */}
                    <div className="text-[11px] text-muted space-y-1 font-mono">
                      <span className="text-ink font-medium font-sans uppercase text-[10px] tracking-wider block">Terms & Guarantee:</span>
                      <p>{offer.terms}</p>
                    </div>
                  </div>
                </div>

                <div className="p-8 pt-0">
                  <button
                    onClick={() => handleBookOffer(offer)}
                    className="w-full bg-water hover:brightness-110 active:scale-[0.98] text-white py-3.5 rounded-[2px] font-medium text-xs tracking-wide transition-all shadow-xs cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <span>Check dates with this package rate</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};
