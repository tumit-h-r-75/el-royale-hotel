import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ShieldCheck, CheckCircle2, Car, Phone } from 'lucide-react';

export const AccessibilityPage: React.FC = () => {
  return (
    <div className="bg-canvas text-ink min-h-screen flex flex-col">
      <Header isHeroPage={false} />

      <main className="pt-24 pb-20 flex-1">
        <section className="bg-paper border-b border-hairline py-12 px-6 md:px-8">
          <div className="max-w-[1000px] mx-auto space-y-3">
            <span className="text-xs uppercase font-mono tracking-wider text-brass bg-brass/10 px-2.5 py-1 rounded-[2px] inline-block">
              Universal Access
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-ink font-normal">
              Accessibility at El Royale Hotel
            </h1>
            <p className="text-muted text-base">
              We are dedicated to providing a welcoming, accessible sanctuary for all travelers, ensuring comfortable navigation across our citrus gardens, villas, and common pavilions.
            </p>
          </div>
        </section>

        <div className="max-w-[1000px] mx-auto px-6 md:px-8 py-12 space-y-10">
          <div className="bg-paper border border-hairline rounded-[10px] p-8 space-y-6 shadow-xs">
            <h2 className="font-serif text-2xl text-ink">Accessible Accommodations & Features</h2>
            <p className="text-sm text-ink/80 leading-relaxed">
              El Royale Hotel features designated ground-floor courtyard villas equipped with zero-threshold entries, widened doorways (36"+), roll-in showers with grab bars, lowered vanity sinks, and visual/auditory fire safety notifications.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono pt-4 border-t border-hairline">
              {[
                'ADA Compliant Ground-Floor Courtyard Villas',
                'Roll-in Showers & ADA Bath Stools',
                'Accessible Valet Motor Court & Ramped Pathways',
                'Closed Captioning & TTY Telephony Support',
                'Service Animal Welcoming Sanctuary',
                'Accessible Pool Lift at the 75-foot Pool'
              ].map((feat, idx) => (
                <div key={idx} className="flex items-start space-x-2 p-3 bg-canvas rounded-[4px] border border-hairline">
                  <CheckCircle2 className="w-4 h-4 text-water shrink-0 mt-0.5" />
                  <span className="text-ink font-sans">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-hairline rounded-[10px] p-8 space-y-4 shadow-xs">
            <h2 className="font-serif text-2xl text-ink">Assistance & Inquiries</h2>
            <p className="text-sm text-ink/80 leading-relaxed">
              If you have specific accessibility questions or require tailored accommodation configurations prior to your arrival, our concierge team is available around the clock.
            </p>
            <div className="flex items-center space-x-3 pt-2 text-xs font-mono">
              <Phone className="w-4 h-4 text-brass" />
              <span className="text-ink">+1 818 843 1121 (Accessibility Desk)</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
