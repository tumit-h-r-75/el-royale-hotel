import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Globe, User, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  isHeroPage?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isHeroPage = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isTransparent = isHeroPage && !scrolled;

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isTransparent
          ? 'bg-transparent text-white border-b border-white/15'
          : 'bg-canvas text-ink border-b border-hairline shadow-xs'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-8 h-20 flex items-center justify-between">
        {/* Left: Wordmark */}
        <div className="flex items-center space-x-3">
          <Link
            to="/"
            className="flex flex-col group focus-visible:outline-water"
            aria-label="The Tangerine Hotel & Resort Home"
          >
            <span
              className={`font-serif text-2xl tracking-tight leading-none ${
                isTransparent ? 'text-white' : 'text-ink'
              }`}
            >
              The Tangerine
            </span>
            <span
              className={`text-[11px] tracking-[0.2em] uppercase font-sans font-medium mt-1 ${
                isTransparent ? 'text-white/80' : 'text-muted'
              }`}
            >
              Hotel & Villas · Burbank
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-7 text-[15px] font-medium" aria-label="Main navigation">
          <Link
            to="/stay"
            className={`transition-colors py-2 ${
              location.pathname === '/stay' ? 'text-water font-semibold' : isTransparent ? 'hover:text-white/80' : 'text-ink/80 hover:text-ink'
            }`}
          >
            Stay
          </Link>
          <Link
            to="/resort-map"
            className={`transition-colors py-2 flex items-center gap-1.5 ${
              location.pathname === '/resort-map' ? 'text-water font-semibold' : isTransparent ? 'hover:text-white/80' : 'text-ink/80 hover:text-ink'
            }`}
          >
            <span>Villas</span>
            <span className="text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded-[2px] bg-brass/20 text-brass">Site Map</span>
          </Link>
          <Link
            to="/explore"
            className={`transition-colors py-2 ${
              location.pathname.startsWith('/explore') ? 'text-water font-semibold' : isTransparent ? 'hover:text-white/80' : 'text-ink/80 hover:text-ink'
            }`}
          >
            Explore
          </Link>
          <Link
            to="/dining"
            className={`transition-colors py-2 ${
              location.pathname === '/dining' ? 'text-water font-semibold' : isTransparent ? 'hover:text-white/80' : 'text-ink/80 hover:text-ink'
            }`}
          >
            Dining
          </Link>
          <Link
            to="/offers"
            className={`transition-colors py-2 ${
              location.pathname.startsWith('/offers') ? 'text-water font-semibold' : isTransparent ? 'hover:text-white/80' : 'text-ink/80 hover:text-ink'
            }`}
          >
            Offers
          </Link>
          <Link
            to="/about"
            className={`transition-colors py-2 ${
              location.pathname === '/about' ? 'text-water font-semibold' : isTransparent ? 'hover:text-white/80' : 'text-ink/80 hover:text-ink'
            }`}
          >
            About
          </Link>
        </nav>

        {/* Right actions: Phone, Lang, Check availability button */}
        <div className="hidden md:flex items-center space-x-5">
          <a
            href="tel:+18185550190"
            className={`flex items-center space-x-1.5 text-xs transition-colors ${
              isTransparent ? 'text-white/90 hover:text-white' : 'text-muted hover:text-ink'
            }`}
            aria-label="Call front desk"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="font-mono text-[13px]">+1 818 555 0190</span>
          </a>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className={`flex items-center space-x-1 text-xs uppercase tracking-wider py-1 px-2 rounded-[2px] border ${
                isTransparent
                  ? 'border-white/20 text-white hover:bg-white/10'
                  : 'border-hairline text-ink hover:bg-paper'
              }`}
              aria-label="Select language"
              aria-expanded={langDropdownOpen}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{currentLang}</span>
            </button>
            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-paper border border-hairline rounded-[2px] shadow-sm py-1 text-xs text-ink z-50">
                {['EN', 'FR', 'ES', 'DE', 'JA'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setCurrentLang(lang);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-canvas text-[13px] flex items-center justify-between ${
                      currentLang === lang ? 'font-semibold text-water' : ''
                    }`}
                  >
                    <span>{lang}</span>
                    {currentLang === lang && <span className="w-1.5 h-1.5 rounded-full bg-water" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Guest Account Portal */}
          <Link
            to="/account"
            className={`p-2 rounded-[2px] transition-colors ${
              isTransparent ? 'text-white/80 hover:text-white' : 'text-muted hover:text-ink'
            }`}
            title="Guest Account & Reservations"
            aria-label="Guest Account"
          >
            <User className="w-4 h-4" />
          </Link>

          {/* Primary Action Button */}
          <button
            id="header-check-availability-btn"
            onClick={() => navigate('/book')}
            className="bg-water hover:brightness-110 active:scale-[0.98] text-white px-5 py-2.5 rounded-[2px] text-[15px] font-medium tracking-wide transition-all duration-150 shadow-xs focus-visible:outline-water cursor-pointer"
          >
            Check availability
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center space-x-3">
          <button
            onClick={() => navigate('/book')}
            className="bg-water text-white px-3.5 py-1.5 rounded-[2px] text-xs font-medium"
          >
            Check dates
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-[2px] ${isTransparent ? 'text-white' : 'text-ink'}`}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-paper border-b border-hairline px-6 py-6 space-y-4 shadow-lg animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col space-y-3 text-base text-ink font-medium">
            <Link to="/stay" className="py-2 border-b border-hairline/60">
              Stay & Room Types
            </Link>
            <Link to="/resort-map" className="py-2 border-b border-hairline/60 flex items-center justify-between">
              <span>Interactive Villa Site Map</span>
              <span className="text-xs uppercase font-mono px-2 py-0.5 rounded-[2px] bg-brass/20 text-brass">Signature</span>
            </Link>
            <Link to="/explore" className="py-2 border-b border-hairline/60">
              Area Explorer Map
            </Link>
            <Link to="/dining" className="py-2 border-b border-hairline/60">
              Dining & Menus
            </Link>
            <Link to="/offers" className="py-2 border-b border-hairline/60">
              Seasonal Offers
            </Link>
            <Link to="/gallery" className="py-2 border-b border-hairline/60">
              Photo Gallery
            </Link>
            <Link to="/about" className="py-2 border-b border-hairline/60">
              About The Tangerine
            </Link>
            <Link to="/policies" className="py-2 border-b border-hairline/60 text-muted text-sm">
              Hotel Policies & Rates
            </Link>
            <Link to="/accessibility" className="py-2 border-b border-hairline/60 text-muted text-sm">
              Universal Accessibility
            </Link>
            <Link to="/contact" className="py-2 border-b border-hairline/60 text-muted text-sm">
              Contact Concierge
            </Link>
          </div>

          <div className="pt-2 flex flex-col space-y-3">
            <div className="flex items-center justify-between text-xs text-muted font-mono">
              <span>Front Desk: +1 818 555 0190</span>
              <Link to="/account" className="underline text-water flex items-center gap-1">
                <User className="w-3.5 h-3.5" /> Guest Portal
              </Link>
            </div>
            <div className="flex items-center justify-between pt-2">
              <Link to="/admin" className="text-xs text-muted flex items-center gap-1 hover:text-ink">
                <ShieldCheck className="w-3.5 h-3.5 text-brass" /> Staff Dashboard
              </Link>
              <button
                onClick={() => navigate('/book')}
                className="w-1/2 bg-water text-white py-2.5 rounded-[2px] text-sm font-medium text-center"
              >
                Check availability
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
