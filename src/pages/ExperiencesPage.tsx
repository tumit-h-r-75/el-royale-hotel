import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ExperiencesPage: React.FC = () => {
  return (
    <div className="bg-canvas text-ink min-h-screen flex flex-col">
      <Header isHeroPage={false} />

      <main className="pt-24 pb-20 flex-1">
        <section className="bg-paper border-b border-hairline py-12 px-6 md:px-8">
          <div className="max-w-[1000px] mx-auto space-y-3">
            <span className="text-xs uppercase font-mono tracking-wider text-brass bg-brass/10 px-2.5 py-1 rounded-[2px] inline-block">
              Bespoke Living
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-ink font-normal">
              Curated Experiences at El Royale
            </h1>
            <p className="text-muted text-base">
              Immerse yourself in the cultural rhythm of Burbank and the San Fernando Valley with our hand-crafted guest experiences.
            </p>
          </div>
        </section>

        <div className="max-w-[1000px] mx-auto px-6 md:px-8 py-12 space-y-8">
          {[
            {
              title: 'Citrus Harvest & Morning Spritz Masterclass',
              time: 'Daily at 10:00 AM · Citrus Terrace',
              desc: 'Join our estate groundskeeper for a morning stroll through our organic Valencia orange grove, selecting fresh citrus to craft bespoke aperitifs with our head mixologist.'
            },
            {
              title: 'Private Warner Bros. & Studio Lot Cart Tour',
              time: 'Arranged via Concierge',
              desc: 'Enjoy VIP access and private electric cart escorts across neighboring historic studio stages and backlots, arranged exclusively for El Royale residents.'
            },
            {
              title: 'Poolside Acoustic Sunset Sessions',
              time: 'Every Thursday & Saturday · 5:30 PM',
              desc: 'Unwind by our 75-foot heated mineral pool as local jazz and acoustic artists perform beneath the olive canopies with complimentary citrus spritzes.'
            }
          ].map((exp, idx) => (
            <div key={idx} className="bg-paper border border-hairline rounded-[10px] p-8 space-y-3 shadow-xs">
              <span className="text-xs uppercase font-mono tracking-wider text-brass">{exp.time}</span>
              <h3 className="font-serif text-2xl text-ink">{exp.title}</h3>
              <p className="text-sm text-ink/80 leading-relaxed">{exp.desc}</p>
            </div>
          ))}

          <div className="text-center pt-4">
            <Link to="/book" className="inline-flex items-center space-x-2 bg-water text-white px-6 py-3 rounded-[2px] text-sm font-medium">
              <span>Reserve a Stay & Add Experiences</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
