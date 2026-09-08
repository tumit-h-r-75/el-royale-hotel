import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { diningOutlets } from '../data/dining';
import { Clock, MapPin, Wine, Coffee, Utensils, Calendar, Phone, Check } from 'lucide-react';

export const DiningPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(diningOutlets[0].id);

  return (
    <div className="bg-canvas text-ink min-h-screen">
      <Header isHeroPage={false} />

      <main className="pt-24 pb-16">
        {/* Page Hero */}
        <section className="max-w-[1240px] mx-auto px-6 md:px-8 py-8 border-b border-hairline">
          <div className="max-w-[760px] space-y-3">
            <span className="text-xs uppercase font-mono tracking-wider text-brass bg-brass/10 px-2.5 py-1 rounded-[2px] inline-block">
              Culinary & Provisions
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink font-normal leading-tight">
              Honest ingredients, coastal citrus, and al fresco California shade.
            </h1>
            <p className="text-muted text-base md:text-lg leading-relaxed">
              Dining at El Royale Hotel is rooted in the Santa Monica Farmers Market and our own citrus groves. From morning pour-overs beside the pool to evening agave cocktails under the olive trees.
            </p>
          </div>
        </section>

        {/* Outlet Switcher Tabs */}
        <div className="max-w-[1240px] mx-auto px-6 md:px-8 py-6">
          <div className="flex space-x-2 border-b border-hairline overflow-x-auto hide-scrollbar">
            {diningOutlets.map((outlet) => (
              <button
                key={outlet.id}
                onClick={() => setActiveTab(outlet.id)}
                className={`py-3 px-5 text-sm font-medium transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
                  activeTab === outlet.id
                    ? 'border-brass text-ink font-serif text-base'
                    : 'border-transparent text-muted hover:text-ink'
                }`}
              >
                {outlet.name}
              </button>
            ))}
          </div>
        </div>

        {/* Active Outlet Showcase */}
        {diningOutlets
          .filter((o) => o.id === activeTab)
          .map((outlet) => (
            <section key={outlet.id} id={outlet.slug} className="max-w-[1240px] mx-auto px-6 md:px-8 py-6 space-y-12">
              
              {/* Photo & Overview Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 h-[380px] sm:h-[460px] rounded-[10px] overflow-hidden border border-hairline">
                  <img
                    src={outlet.image}
                    alt={outlet.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="lg:col-span-5 space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs uppercase font-mono tracking-wider text-brass font-medium">
                      {outlet.dressCode || 'Resort Casual'}
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-ink">{outlet.name}</h2>
                    <p className="font-serif text-lg text-brass italic">{outlet.tagline}</p>
                    <p className="text-sm text-ink/80 leading-relaxed pt-2">
                      {outlet.description}
                    </p>
                  </div>

                  <div className="p-4 rounded-[6px] bg-paper border border-hairline space-y-2.5 text-xs font-mono">
                    <div className="flex items-center space-x-2 text-ink">
                      <Clock className="w-4 h-4 text-muted shrink-0" />
                      <span>{outlet.hours}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-ink">
                      <Utensils className="w-4 h-4 text-muted shrink-0" />
                      <span>Attire: {outlet.dressCode || 'Casual'} · Walk-ins welcome for hotel guests</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 pt-2">
                    <a
                      href="tel:+18185550190"
                      className="bg-water hover:brightness-110 text-white px-5 py-2.5 rounded-[2px] text-xs font-medium tracking-wide flex items-center space-x-2 transition-all shadow-xs"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Table Reservations: +1 818 555 0190</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Menu Sections */}
              <div className="border-t border-hairline pt-12 space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between">
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl text-ink">Seasonal Offerings</h3>
                    <p className="text-xs text-muted mt-1">Sourced weekly from regenerative farms in Ojai and the Central Coast.</p>
                  </div>
                  <span className="text-xs font-mono text-muted mt-2 md:mt-0">All dietary restrictions accommodated upon request</span>
                </div>

                <div className="space-y-8">
                  {outlet.menu?.map((sec, sIdx) => (
                    <div key={sIdx} className="space-y-4">
                      <h4 className="font-serif text-xl text-ink border-b border-hairline pb-2">{sec.category}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sec.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-5 rounded-[6px] bg-paper border border-hairline flex flex-col justify-between space-y-3"
                          >
                            <div>
                              <div className="flex items-baseline justify-between">
                                <h5 className="font-serif text-lg text-ink font-medium">{item.name}</h5>
                                <span className="font-mono text-sm font-semibold text-ink ml-2">
                                  ${item.price}
                                </span>
                              </div>
                              <p className="text-xs text-ink/75 mt-1.5 leading-relaxed">
                                {item.description}
                              </p>
                            </div>
                            {item.dietary && (
                              <span className="text-[10px] font-mono uppercase text-muted bg-canvas px-2 py-0.5 rounded-[2px] inline-block w-fit">
                                {item.dietary}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </section>
          ))}

      </main>

      <Footer />
    </div>
  );
};
