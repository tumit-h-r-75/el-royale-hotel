import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Globe, User, ShieldCheck, DollarSign, Volume2, VolumeX, Sun, Sparkles, MapPin, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useBooking, CurrencyCode } from '../../context/BookingContext';

interface HeaderProps {
  isHeroPage?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isHeroPage = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currDropdownOpen, setCurrDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const location = useLocation();
  const navigate = useNavigate();

  const {
    currency,
    setCurrency,
    tempUnit,
    toggleTempUnit,
    convertTemp,
    ambientAudioPlaying,
    toggleAmbientAudio
  } = useBooking();

  const langRef = useRef<HTMLDivElement>(null);
  const currRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
      if (currRef.current && !currRef.current.contains(e.target as Node)) {
        setCurrDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isTransparent = isHeroPage && !scrolled;

  const currencies: { code: CurrencyCode; label: string; symbol: string }[] = [
    { code: 'USD', label: 'US Dollar', symbol: '$' },
    { code: 'EUR', label: 'Euro', symbol: '€' },
    { code: 'GBP', label: 'British Pound', symbol: '£' },
    { code: 'CAD', label: 'Canadian Dollar', symbol: 'CA$' },
    { code: 'JPY', label: 'Japanese Yen', symbol: '¥' }
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? 'bg-gradient-to-b from-shade/80 via-shade/40 to-transparent text-white border-b border-white/15 backdrop-blur-[2px]'
          : 'bg-canvas/95 backdrop-blur-md text-ink border-b border-hairline/80 shadow-xs'
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 h-20 flex items-center justify-between gap-4">
        
        {/* Left: Wordmark & Live Burbank Weather Pill */}
        <div className="flex items-center space-x-3 sm:space-x-5 shrink-0">
          <Link
            to="/"
            className="flex flex-col group focus-visible:outline-water"
            aria-label="El Royale Hotel & Resort Home"
          >
            <span
              className={`font-serif text-2xl lg:text-[26px] tracking-tight leading-none font-normal transition-colors ${
                isTransparent ? 'text-white' : 'text-ink'
              }`}
            >
              El Royale Hotel
            </span>
            <span
              className={`text-[10px] tracking-[0.22em] uppercase font-sans font-medium mt-1 transition-colors ${
                isTransparent ? 'text-white/80' : 'text-muted'
              }`}
            >
              Hotel & Villas · Burbank
            </span>
          </Link>

          {/* Temperature & Weather Pill Toggle (Desktop & Tablet) */}
          <button
            onClick={toggleTempUnit}
            title={`Click to switch to °${tempUnit === 'F' ? 'C' : 'F'}`}
            className={`hidden 2xl:flex items-center space-x-1.5 px-2.5 py-1 rounded-[4px] text-[11px] font-mono border transition-all cursor-pointer ${
              isTransparent
                ? 'border-white/20 bg-white/10 text-white/90 hover:bg-white/20'
                : 'border-hairline bg-paper/80 text-muted hover:text-ink hover:border-brass/50'
            }`}
          >
            <Sun className="w-3 h-3 text-amber-500 shrink-0" />
            <span>Burbank {convertTemp(78)}</span>
            <span className="opacity-40">·</span>
            <span className="text-[10px] text-water font-medium">Pool {convertTemp(84)}</span>
            <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-brass/10 text-brass ml-0.5">
              °{tempUnit}
            </span>
          </button>
        </div>

        {/* Center: Desktop Navigation */}
        <nav
          className="hidden xl:flex items-center space-x-6 text-[14px] font-medium"
          aria-label="Main navigation"
        >
          <Link
            to="/stay"
            className={`transition-colors py-1 relative ${
              location.pathname === '/stay'
                ? 'text-water font-semibold'
                : isTransparent
                ? 'text-white/90 hover:text-white'
                : 'text-ink/80 hover:text-ink'
            }`}
          >
            <span>Stay</span>
            {location.pathname === '/stay' && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-water rounded-full" />
            )}
          </Link>

          <Link
            to="/resort-map"
            className={`transition-colors py-1 flex items-center gap-1.5 relative ${
              location.pathname === '/resort-map'
                ? 'text-water font-semibold'
                : isTransparent
                ? 'text-white/90 hover:text-white'
                : 'text-ink/80 hover:text-ink'
            }`}
          >
            <span>Villas</span>
            <span className="text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded-[2px] bg-brass/20 text-brass">
              Site Map
            </span>
            {location.pathname === '/resort-map' && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-water rounded-full" />
            )}
          </Link>

          <Link
            to="/explore"
            className={`transition-colors py-1 relative ${
              location.pathname.startsWith('/explore')
                ? 'text-water font-semibold'
                : isTransparent
                ? 'text-white/90 hover:text-white'
                : 'text-ink/80 hover:text-ink'
            }`}
          >
            <span>Explore Map</span>
            {location.pathname.startsWith('/explore') && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-water rounded-full" />
            )}
          </Link>

          <Link
            to="/dining"
            className={`transition-colors py-1 relative ${
              location.pathname === '/dining'
                ? 'text-water font-semibold'
                : isTransparent
                ? 'text-white/90 hover:text-white'
                : 'text-ink/80 hover:text-ink'
            }`}
          >
            <span>Dining</span>
            {location.pathname === '/dining' && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-water rounded-full" />
            )}
          </Link>

          <Link
            to="/offers"
            className={`transition-colors py-1 relative ${
              location.pathname.startsWith('/offers')
                ? 'text-water font-semibold'
                : isTransparent
                ? 'text-white/90 hover:text-white'
                : 'text-ink/80 hover:text-ink'
            }`}
          >
            <span>Offers</span>
            {location.pathname.startsWith('/offers') && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-water rounded-full" />
            )}
          </Link>

          <Link
            to="/gallery"
            className={`transition-colors py-1 relative ${
              location.pathname === '/gallery'
                ? 'text-water font-semibold'
                : isTransparent
                ? 'text-white/90 hover:text-white'
                : 'text-ink/80 hover:text-ink'
            }`}
          >
            <span>Gallery</span>
            {location.pathname === '/gallery' && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-water rounded-full" />
            )}
          </Link>
        </nav>

        {/* Right actions: Ambience Audio, Currency, Lang, User, Check availability */}
        <div className="hidden xl:flex items-center space-x-3 shrink-0">
          
          {/* Ambient Grounds Sound Generator Toggle */}
          <button
            onClick={toggleAmbientAudio}
            className={`p-2 rounded-[4px] border transition-all cursor-pointer flex items-center gap-1.5 text-xs ${
              ambientAudioPlaying
                ? 'bg-water text-white border-water shadow-xs'
                : isTransparent
                ? 'border-white/20 text-white/90 hover:bg-white/10'
                : 'border-hairline text-muted hover:text-ink hover:bg-paper'
            }`}
            title={ambientAudioPlaying ? 'Mute Grounds Ambience (Citrus breeze & fountain)' : 'Play Grounds Ambience (Citrus breeze & fountain)'}
            aria-label="Toggle ambient grounds sound"
          >
            {ambientAudioPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                <span className="text-[11px] font-mono hidden xl:inline">Ambience</span>
              </>
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Currency Selector */}
          <div className="relative" ref={currRef}>
            <button
              onClick={() => {
                setCurrDropdownOpen(!currDropdownOpen);
                setLangDropdownOpen(false);
              }}
              className={`flex items-center space-x-1 text-xs font-mono py-1.5 px-2.5 rounded-[3px] border cursor-pointer transition-colors ${
                isTransparent
                  ? 'border-white/20 text-white hover:bg-white/10'
                  : 'border-hairline text-ink hover:bg-paper'
              }`}
              aria-label="Select currency"
              aria-expanded={currDropdownOpen}
            >
              <span>{currency}</span>
            </button>
            <AnimatePresence>
              {currDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-44 bg-paper border border-hairline rounded-[6px] shadow-xl py-1 text-xs text-ink z-60"
                >
                  <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-muted border-b border-hairline">
                    Display Currency
                  </div>
                  {currencies.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        setCurrency(c.code);
                        setCurrDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-canvas text-[13px] flex items-center justify-between cursor-pointer ${
                        currency === c.code ? 'font-semibold text-water bg-water/5' : ''
                      }`}
                    >
                      <span>{c.symbol} {c.code}</span>
                      <span className="text-[11px] text-muted font-sans">{c.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Language Selector */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => {
                setLangDropdownOpen(!langDropdownOpen);
                setCurrDropdownOpen(false);
              }}
              className={`flex items-center space-x-1 text-xs uppercase tracking-wider py-1.5 px-2.5 rounded-[3px] border cursor-pointer transition-colors ${
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
            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-36 bg-paper border border-hairline rounded-[6px] shadow-xl py-1 text-xs text-ink z-60"
                >
                  {['EN', 'FR', 'ES', 'DE', 'JA'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setCurrentLang(lang);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-canvas text-[13px] flex items-center justify-between cursor-pointer ${
                        currentLang === lang ? 'font-semibold text-water bg-water/5' : ''
                      }`}
                    >
                      <span>{lang}</span>
                      {currentLang === lang && <span className="w-1.5 h-1.5 rounded-full bg-water" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Guest Account Portal */}
          <Link
            to="/account"
            className={`p-2 rounded-[3px] transition-colors border ${
              isTransparent
                ? 'border-white/20 text-white/90 hover:text-white hover:bg-white/10'
                : 'border-hairline text-muted hover:text-ink hover:bg-paper'
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
            className="bg-water hover:brightness-110 active:scale-[0.98] text-white px-4.5 xl:px-5 py-2.5 rounded-[3px] text-xs xl:text-sm font-medium tracking-wide transition-all duration-150 shadow-xs focus-visible:outline-water cursor-pointer whitespace-nowrap"
          >
            Check availability
          </button>
        </div>

        {/* Mobile & Tablet Controls (Visible under xl / 1280px) */}
        <div className="flex xl:hidden items-center space-x-2">
          {/* Temp Pill */}
          <button
            onClick={toggleTempUnit}
            className={`hidden sm:flex px-2 py-1 rounded-[3px] text-[11px] font-mono border ${
              isTransparent ? 'border-white/20 text-white' : 'border-hairline text-muted'
            }`}
          >
            {convertTemp(78)}
          </button>

          {/* Quick Book Button */}
          <button
            onClick={() => navigate('/book')}
            className="bg-water text-white px-3 py-1.5 rounded-[3px] text-xs font-medium cursor-pointer shadow-xs whitespace-nowrap"
          >
            Check dates
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-[3px] cursor-pointer border transition-colors ${
              isTransparent
                ? 'border-white/20 text-white hover:bg-white/10'
                : 'border-hairline text-ink hover:bg-paper'
            }`}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile & Tablet Dropdown Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden bg-paper/98 backdrop-blur-md border-b border-hairline px-6 py-6 space-y-4 shadow-2xl z-60 overflow-hidden"
          >
            <div className="flex flex-col space-y-2.5 text-[15px] text-ink font-medium">
              <Link to="/stay" className="py-2 border-b border-hairline/60 hover:text-water transition-colors">
                Stay & Room Types
              </Link>
              <Link to="/resort-map" className="py-2 border-b border-hairline/60 flex items-center justify-between hover:text-water transition-colors">
                <span>Interactive Villa Site Map</span>
                <span className="text-xs uppercase font-mono px-2 py-0.5 rounded-[2px] bg-brass/20 text-brass font-semibold">Signature</span>
              </Link>
              <Link to="/explore" className="py-2 border-b border-hairline/60 hover:text-water transition-colors flex items-center justify-between">
                <span>Area Explorer & Vicinity Map</span>
                <span className="text-xs text-brass font-mono">⭐ 4.9 Hotel</span>
              </Link>
              <Link to="/dining" className="py-2 border-b border-hairline/60 hover:text-water transition-colors">
                Dining & Menus
              </Link>
              <Link to="/offers" className="py-2 border-b border-hairline/60 hover:text-water transition-colors">
                Seasonal Offers
              </Link>
              <Link to="/gallery" className="py-2 border-b border-hairline/60 hover:text-water transition-colors">
                Photo Gallery
              </Link>
              <Link to="/about" className="py-2 border-b border-hairline/60 hover:text-water transition-colors">
                About El Royale Hotel
              </Link>
              <Link to="/policies" className="py-2 border-b border-hairline/60 text-muted text-sm hover:text-ink">
                Hotel Policies & Rates
              </Link>
              <Link to="/accessibility" className="py-2 border-b border-hairline/60 text-muted text-sm hover:text-ink">
                Universal Accessibility
              </Link>
              <Link to="/contact" className="py-2 border-b border-hairline/60 text-muted text-sm hover:text-ink">
                Contact Concierge
              </Link>
            </div>

            {/* Mobile Toggles: Currency & Ambience */}
            <div className="pt-2 border-t border-hairline flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted font-mono">Currency:</span>
                <div className="flex space-x-1">
                  {(['USD', 'EUR', 'GBP', 'CAD', 'JPY'] as CurrencyCode[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      className={`px-2 py-0.5 text-xs font-mono rounded-[2px] border ${
                        currency === c ? 'bg-water text-white border-water font-semibold' : 'border-hairline text-muted'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={toggleAmbientAudio}
                className="flex items-center gap-1.5 text-xs text-ink px-2.5 py-1 rounded-[3px] border border-hairline"
              >
                {ambientAudioPlaying ? <Volume2 className="w-3.5 h-3.5 text-water" /> : <VolumeX className="w-3.5 h-3.5 text-muted" />}
                <span className="font-mono text-[11px]">{ambientAudioPlaying ? 'Ambience On' : 'Ambience Off'}</span>
              </button>
            </div>

            <div className="pt-2 flex flex-col space-y-3">
              <div className="flex items-center justify-between text-xs text-muted font-mono">
                <span>Front Desk: +1 818 843 1121</span>
                <Link to="/account" className="underline text-water flex items-center gap-1">
                  <User className="w-3.5 h-3.5" /> Guest Portal
                </Link>
              </div>
              <div className="flex items-center justify-between pt-2 gap-3">
                <Link to="/admin" className="text-xs text-muted flex items-center gap-1 hover:text-ink shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 text-brass" /> Staff
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/book');
                  }}
                  className="flex-1 bg-water text-white py-2.5 rounded-[3px] text-sm font-medium text-center cursor-pointer shadow-xs"
                >
                  Check availability
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
