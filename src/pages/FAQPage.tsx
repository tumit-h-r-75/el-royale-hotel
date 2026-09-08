import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { faqs, FAQ_CATEGORIES } from '../data/faqs';
import { ChevronDown, ChevronUp, Search, Phone, Mail } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(faqs[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter((faq) => {
    if (selectedCategory !== 'all' && faq.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
    }
    return true;
  });

  const toggleAccordion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-canvas text-ink min-h-screen">
      <Header isHeroPage={false} />

      <main className="pt-24 pb-16">
        {/* Header */}
        <section className="max-w-[1240px] mx-auto px-6 md:px-8 py-8 border-b border-hairline">
          <div className="max-w-[700px] space-y-3">
            <span className="text-xs uppercase font-mono tracking-wider text-brass bg-brass/10 px-2.5 py-1 rounded-[2px] inline-block">
              Guest Guidelines & Policies
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink font-normal leading-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-muted text-base">
              Everything you need to know about arrival, valet, sound acoustics, pet hospitality, and booking policies.
            </p>
          </div>

          {/* Categories & Search */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-hairline">
            <div className="flex flex-wrap gap-2">
              {FAQ_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-[2px] text-xs font-medium transition-colors cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-brass text-white'
                      : 'bg-paper text-muted hover:text-ink border border-hairline'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="w-full sm:w-64">
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-paper border border-hairline text-xs px-3 py-1.5 rounded-[2px]"
              />
            </div>
          </div>
        </section>

        {/* FAQ Accordion List */}
        <section className="max-w-[840px] mx-auto px-6 md:px-8 py-10 space-y-4">
          {filteredFaqs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-[6px] border border-hairline bg-paper overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between space-x-4 cursor-pointer hover:bg-canvas/50 transition-colors"
                  aria-expanded={isExpanded}
                >
                  <span className="font-serif text-lg text-ink font-normal">{faq.question}</span>
                  <div className="p-1 rounded-full text-muted shrink-0">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 text-sm text-ink/80 leading-relaxed border-t border-hairline/60 bg-canvas/30 animate-in fade-in">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}

          {/* Direct Help Callout */}
          <div className="mt-12 p-6 rounded-[8px] bg-[#E8EDE6] border border-hairline text-center space-y-3">
            <h3 className="font-serif text-xl text-ink">Have an unlisted question?</h3>
            <p className="text-xs text-muted max-w-[48ch] mx-auto">
              Our front desk concierge is on property 24 hours a day to assist with custom arrival arrangements, studio shuttles, and special requests.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
              <a href="tel:+18185550190" className="text-water hover:underline flex items-center gap-1 font-medium">
                <Phone className="w-3.5 h-3.5" />
                <span>+1 818 555 0190</span>
              </a>
              <span className="text-muted">·</span>
              <a href="mailto:concierge@thetangerine.com" className="text-water hover:underline flex items-center gap-1 font-medium">
                <Mail className="w-3.5 h-3.5" />
                <span>concierge@thetangerine.com</span>
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};
