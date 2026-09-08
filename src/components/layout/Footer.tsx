import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { PROPERTY_LOCATION } from '../../data/attractions';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer id="site-footer" className="bg-shade text-canvas pt-20 pb-12 border-t border-shade">
      <div className="max-w-[1240px] mx-auto px-6 md:px-8">
        
        {/* Main 4-column footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-canvas/15">
          
          {/* Col 1: Property Identity & Address */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl tracking-tight text-canvas">The Tangerine</h3>
            <p className="text-xs uppercase tracking-[0.2em] text-canvas/60 font-sans font-medium">
              Hotel & Villas · Burbank, Los Angeles
            </p>
            <p className="text-sm text-canvas/75 leading-relaxed pt-2 max-w-[280px]">
              A quiet sanctuary shaded by citrus groves and old olive canopies in the heart of the San Fernando Valley.
            </p>
            
            <div className="pt-2 space-y-2 text-xs font-sans text-canvas/80">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-brass shrink-0 mt-0.5" />
                <span>{PROPERTY_LOCATION.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-brass shrink-0" />
                <a href="tel:+18185550190" className="font-mono hover:text-white transition-colors">+1 818 555 0190</a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-brass shrink-0" />
                <a href="mailto:concierge@thetangerine.com" className="hover:text-white transition-colors">concierge@thetangerine.com</a>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-canvas/50 font-sans font-medium">Accommodation & Grounds</h4>
            <ul className="space-y-2 text-sm text-canvas/80">
              <li><Link to="/stay" className="hover:text-white transition-colors">All Accommodation</Link></li>
              <li><Link to="/resort-map" className="hover:text-white transition-colors flex items-center gap-1.5">Interactive Villa Map <span className="text-[10px] font-mono text-brass bg-brass/20 px-1.5 py-0.5 rounded-[2px]">Plan</span></Link></li>
              <li><Link to="/stay/garden-villa-3" className="hover:text-white transition-colors">Garden Villa 3</Link></li>
              <li><Link to="/stay/penthouse-suite-8" className="hover:text-white transition-colors">Penthouse Suite 8</Link></li>
              <li><Link to="/dining" className="hover:text-white transition-colors">The Citrus Terrace & Menus</Link></li>
              <li><Link to="/gallery" className="hover:text-white transition-colors">Photography Gallery</Link></li>
              <li><Link to="/accessibility" className="hover:text-white transition-colors">Universal Accessibility</Link></li>
            </ul>
          </div>

          {/* Col 3: Discovery & Guest Services */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-canvas/50 font-sans font-medium">Guest Services & Area</h4>
            <ul className="space-y-2 text-sm text-canvas/80">
              <li><Link to="/explore" className="hover:text-white transition-colors">Area Explorer & Studios</Link></li>
              <li><Link to="/offers" className="hover:text-white transition-colors">Special Offers & Residencies</Link></li>
              <li><Link to="/experiences" className="hover:text-white transition-colors">Bespoke Experiences</Link></li>
              <li><Link to="/events" className="hover:text-white transition-colors">Private Gatherings & Film Shoots</Link></li>
              <li><Link to="/reviews" className="hover:text-white transition-colors">Guest Reviews & Press</Link></li>
              <li><Link to="/policies" className="hover:text-white transition-colors">Hotel Policies & Cancellation</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Frequently Asked Questions</Link></li>
              <li><Link to="/manage" className="hover:text-white transition-colors">Manage Existing Booking</Link></li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Map Thumbnail */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-wider text-canvas/50 font-sans font-medium">Citrus Dispatch</h4>
            <p className="text-xs text-canvas/70 leading-relaxed">
              Seasonal notes from our orchard, rare studio access invitations, and limited villa releases.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-[2px] bg-white/10 border border-white/20 text-xs text-canvas">
                Thank you. You have been added to our guest dispatch.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-stretch space-y-0">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 px-3 py-2.5 text-xs text-white placeholder:text-canvas/40 rounded-l-[2px] focus:outline-water"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="bg-water hover:brightness-110 px-3 py-2.5 rounded-r-[2px] text-white flex items-center justify-center shrink-0 cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Small Location Thumbnail */}
            <div className="pt-2">
              <Link
                to="/explore"
                className="group block rounded-[2px] overflow-hidden border border-white/15 bg-white/5 p-2 hover:border-white/30 transition-colors"
              >
                <div className="flex items-center justify-between text-[11px] text-canvas/75 mb-1.5">
                  <span className="font-mono">34.1808° N, 118.3280° W</span>
                  <span className="text-brass group-hover:underline">Open Map</span>
                </div>
                <div className="h-16 w-full rounded-[2px] bg-[#1a3329] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#a8842c_1px,transparent_1px)] [background-size:8px_8px]" />
                  <div className="relative flex items-center gap-1 text-[11px] font-mono text-canvas/90">
                    <span className="w-2 h-2 rounded-full bg-brass" />
                    <span>Burbank / North Hollywood</span>
                  </div>
                </div>
              </Link>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Copyright, Socials, Legal, Admin link */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-canvas/50 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <span>© {new Date().getFullYear()} The Tangerine Hotel & Resort LLC. All rights reserved.</span>
            <span className="hidden sm:inline">·</span>
            <Link to="/admin" className="hover:text-brass flex items-center gap-1 text-canvas/40 transition-colors">
              <ShieldCheck className="w-3.5 h-3.5" /> Staff Portal
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/policies" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/policies" className="hover:text-white transition-colors">Terms of Stay</Link>
            <Link to="/accessibility" className="hover:text-white transition-colors">Accessibility Statement</Link>
            <span className="text-canvas/30">|</span>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <a href="https://spotify.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Soundtrack</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
