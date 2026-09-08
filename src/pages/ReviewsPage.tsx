import React, { useState, useMemo } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { reviews, reviewSummary } from '../data/reviews';
import { Star, CheckCircle2, Search, Filter } from 'lucide-react';

export const ReviewsPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      if (selectedFilter !== 'all' && r.category !== selectedFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          r.quote.toLowerCase().includes(q) ||
          r.author.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedFilter, searchQuery]);

  return (
    <div className="bg-canvas text-ink min-h-screen">
      <Header isHeroPage={false} />

      <main className="pt-24 pb-16">
        {/* Header & Rating Summary */}
        <section className="max-w-[1240px] mx-auto px-6 md:px-8 py-8 border-b border-hairline">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-3">
              <span className="text-xs uppercase font-mono tracking-wider text-brass bg-brass/10 px-2.5 py-1 rounded-[2px] inline-block">
                Guest Reflections
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink font-normal leading-tight">
                Reflections on rest, quiet, and service.
              </h1>
              <p className="text-muted text-base max-w-[60ch]">
                Unfiltered impressions from verified travelers, creative residents, and long-term guests who stayed at El Royale Hotel.
              </p>
            </div>

            {/* Scorecard Box */}
            <div className="lg:col-span-5 p-6 rounded-[10px] bg-paper border border-hairline space-y-4 shadow-xs">
              <div className="flex items-baseline justify-between border-b border-hairline pb-4">
                <div>
                  <span className="font-mono text-5xl font-semibold text-ink">{reviewSummary.averageRating}</span>
                  <div className="flex items-center text-brass mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brass text-brass" />
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs text-muted block">{reviewSummary.totalReviews} verified stays</span>
                  <span className="text-[11px] text-muted block mt-0.5">{reviewSummary.source}</span>
                </div>
              </div>

              {/* Subscores */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                {reviewSummary.categories.map((cat, idx) => (
                  <div key={idx} className="flex justify-between py-1 border-b border-hairline/60">
                    <span className="text-muted font-sans truncate mr-2">{cat.label}:</span>
                    <span className="font-semibold text-ink shrink-0">{cat.score} / 5.0</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Filter Chips & Search */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-hairline">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Reviews' },
                { id: 'villas', label: 'Villas & Plunge Pools' },
                { id: 'quiet', label: 'Acoustics & Sleep' },
                { id: 'location', label: 'Burbank & Studios' },
                { id: 'service', label: 'Hospitality & Staff' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-[2px] text-xs font-medium transition-colors cursor-pointer ${
                    selectedFilter === tab.id
                      ? 'bg-brass text-white'
                      : 'bg-paper text-muted hover:text-ink border border-hairline'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="w-full sm:w-64">
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-paper border border-hairline text-xs px-3 py-1.5 rounded-[2px]"
              />
            </div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="max-w-[1240px] mx-auto px-6 md:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-[10px] bg-paper border border-hairline flex flex-col justify-between space-y-4 hover:border-water/40 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-1 text-brass">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-brass text-brass" />
                    ))}
                  </div>
                  <blockquote className="font-serif text-base text-ink leading-relaxed">
                    “{rev.quote}”
                  </blockquote>
                </div>

                <div className="pt-4 border-t border-hairline text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-sans font-medium text-ink">{rev.author}</span>
                    <span className="font-mono text-[11px] text-muted">{rev.stayDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-muted font-mono">
                    <span className="capitalize">{rev.category} Experience</span>
                    <span className="text-emerald-800 flex items-center gap-0.5">
                      <CheckCircle2 className="w-3 h-3" /> {rev.source}
                    </span>
                  </div>
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
