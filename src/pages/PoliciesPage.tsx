import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ShieldCheck, Clock, Car, Wine } from 'lucide-react';

export const PoliciesPage: React.FC = () => {
  return (
    <div className="bg-canvas text-ink min-h-screen flex flex-col">
      <Header isHeroPage={false} />

      <main className="pt-24 pb-20 flex-1">
        <section className="bg-paper border-b border-hairline py-12 px-6 md:px-8">
          <div className="max-w-[1000px] mx-auto space-y-3">
            <span className="text-xs uppercase font-mono tracking-wider text-brass bg-brass/10 px-2.5 py-1 rounded-[2px] inline-block">
              Sanctuary Etiquette
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-ink font-normal">
              Hotel Policies & Terms
            </h1>
            <p className="text-muted text-base">
              Guidelines to ensure a peaceful, restorative environment for every resident at El Royale Hotel.
            </p>
          </div>
        </section>

        <div className="max-w-[1000px] mx-auto px-6 md:px-8 py-12 space-y-8">
          <div className="bg-paper border border-hairline rounded-[10px] p-8 space-y-4 shadow-xs">
            <div className="flex items-center space-x-2 text-brass font-semibold text-xs font-mono">
              <Clock className="w-4 h-4" />
              <span>CHECK-IN & CHECK-OUT TIMES</span>
            </div>
            <h3 className="font-serif text-2xl text-ink">Arrival & Departure</h3>
            <p className="text-sm text-ink/80 leading-relaxed">
              Check-in begins at 3:00 PM PST. Check-out is requested by 11:00 AM PST. Late departures may be requested through the guest portal subject to villa availability.
            </p>
          </div>

          <div className="bg-paper border border-hairline rounded-[10px] p-8 space-y-4 shadow-xs">
            <div className="flex items-center space-x-2 text-brass font-semibold text-xs font-mono">
              <ShieldCheck className="w-4 h-4" />
              <span>CANCELLATION & GUARANTEE</span>
            </div>
            <h3 className="font-serif text-2xl text-ink">Flexible Reservation Guarantee</h3>
            <p className="text-sm text-ink/80 leading-relaxed">
              For standard flexible rates, cancellations are accepted without penalty up to 48 hours prior to the 3:00 PM arrival date. Prepaid or promotional rates carry specific deposit terms detailed during checkout.
            </p>
          </div>

          <div className="bg-paper border border-hairline rounded-[10px] p-8 space-y-4 shadow-xs">
            <div className="flex items-center space-x-2 text-brass font-semibold text-xs font-mono">
              <Wine className="w-4 h-4" />
              <span>PETS & SMOKING POLICY</span>
            </div>
            <h3 className="font-serif text-2xl text-ink">Companions & Environment</h3>
            <p className="text-sm text-ink/80 leading-relaxed">
              El Royale Hotel is a 100% smoke-free sanctuary indoors and across courtyard pavilions. Designated garden smoking areas are available. Select courtyard villas welcome canine companions with advance notification.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
