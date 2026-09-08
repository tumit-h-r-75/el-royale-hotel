import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EventsPage: React.FC = () => {
  return (
    <div className="bg-canvas text-ink min-h-screen flex flex-col">
      <Header isHeroPage={false} />

      <main className="pt-24 pb-20 flex-1">
        <section className="bg-paper border-b border-hairline py-12 px-6 md:px-8">
          <div className="max-w-[1000px] mx-auto space-y-3">
            <span className="text-xs uppercase font-mono tracking-wider text-brass bg-brass/10 px-2.5 py-1 rounded-[2px] inline-block">
              Private Gatherings
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-ink font-normal">
              Film Shoots & Private Events
            </h1>
            <p className="text-muted text-base">
              With its classic mid-century architecture, lush olive groves, and secluded motor court, El Royale Hotel provides a timeless backdrop for intimate celebrations and professional production shoots.
            </p>
          </div>
        </section>

        <div className="max-w-[1000px] mx-auto px-6 md:px-8 py-12 space-y-8">
          <div className="bg-paper border border-hairline rounded-[10px] p-8 space-y-6 shadow-xs">
            <h2 className="font-serif text-2xl text-ink">Production & Location Filming</h2>
            <p className="text-sm text-ink/80 leading-relaxed">
              Long favored by filmmakers and photographers for its cinematic lighting and private grounds, El Royale accommodates crew staging, equipment parking in our gated motor court, and full buyouts upon request.
            </p>
          </div>

          <div className="bg-paper border border-hairline rounded-[10px] p-8 space-y-6 shadow-xs">
            <h2 className="font-serif text-2xl text-ink">Intimate Gatherings & Dinners</h2>
            <p className="text-sm text-ink/80 leading-relaxed">
              Host your rehearsal dinner, executive retreat, or milestone celebration at The Citrus Terrace, surrounded by fragrant citrus trees and ambient evening lighting.
            </p>
            <div className="pt-2">
              <Link to="/contact" className="inline-flex items-center space-x-2 bg-water text-white px-6 py-3 rounded-[2px] text-sm font-medium">
                <span>Inquire with Events Team</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
