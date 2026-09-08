import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Globe, User, ShieldCheck, DollarSign, Volume2, VolumeX, Sun, Sparkles } from 'lucide-react';
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
      if (window.scrollY > 40) {
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
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isTransparent
          ? 'bg-transparent text-white border-b border-white/15'
          : 'bg-canvas text-ink border-b border-hairline shadow-xs'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 h-20 flex items-center justify-between">
        {/* Left: Wordmark & Live Weather Pill */}
        <div className="flex items-center space-x-4">
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

          {/* Temperature & Weather Pill Toggle */}
          <button
            onClick={toggleTempUnit}
            title={`Click to switch to °${tempUnit === 'F' ? 'C' : 'F'}`}
            className={`hidden xl:flex items-center space-x-1.5 px-2.5 py-1 rounded-[4px] text-[11px] font-mono border transition-all cursor-pointer ${
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
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-7 text-[15px] font-medium" aria-label="Main navigation">
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
            to="/gallery"
            className={`transition-colors py-2 ${
              location.pathname === '/gallery' ? 'text-water font-semibold' : isTransparent ? 'hover:text-white/80' : 'text-ink/80 hover:text-ink'
            }`}
          >
            Gallery
          </Link>
        </nav>

        {/* Right actions: Ambience Audio, Currency, Lang, User, Check availability */}
        <div className="hidden md:flex items-center space-x-3.5 lg:space-x-4">
          
          {/* Ambient Grounds Sound Generator Toggle */}
          <button
            onClick={toggleAmbientAudio}
            className={`p-2 rounded-[4px] border transition-all cursor-pointer flex items-center gap-1 text-xs ${
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
                <span className="text-[11px] font-mono hidden xl:inline">Ambience On</span>
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
              className={`flex items-center space-x-1 text-xs font-mono py-1 px-2 rounded-[2px] border cursor-pointer ${
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
                  className="absolute right-0 mt-2 w-40 bg-paper border border-hairline rounded-[4px] shadow-lg py-1 text-xs text-ink z-60"
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
              className={`flex items-center space-x-1 text-xs uppercase tracking-wider py-1 px-2 rounded-[2px] border cursor-pointer ${
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
                  className="absolute right-0 mt-2 w-32 bg-paper border border-hairline rounded-[4px] shadow-lg py-1 text-xs text-ink z-60"
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
            className={`p-2 rounded-[2px] transition-colors ${
              isTransparent ? 'text-white/80 hover:text-white' : 'text-muted hover:text-ink'
            }`}
            title="Guest Account & Reservations"
            aria-label="Guest Account"
          >
            <User className="w-4 h-4" />
          </Link>

          {/* Primary Action Button with micro-interaction */}
          <button
            id="header-check-availability-btn"
            onClick={() => navigate('/book')}
            className="bg-water hover:brightness-110 active:scale-[0.98] text-white px-5 py-2.5 rounded-[2px] text-[15px] font-medium tracking-wide transition-all duration-150 shadow-xs focus-visible:outline-water cursor-pointer"
          >
            Check availability
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={toggleTempUnit}
            className={`px-2 py-1 rounded-[2px] text-[11px] font-mono border ${
              isTransparent ? 'border-white/20 text-white' : 'border-hairline text-muted'
            }`}
          >
            {convertTemp(78)}
          </button>
          <button
            onClick={() => navigate('/book')}
            className="bg-water text-white px-3.5 py-1.5 rounded-[2px] text-xs font-medium cursor-pointer"
          >
            Check dates
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-[2px] cursor-pointer ${isTransparent ? 'text-white' : 'text-ink'}`}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-paper border-b border-hairline px-6 py-6 space-y-4 shadow-xl z-60 overflow-hidden"
          >
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

            {/* Mobile Toggles: Currency & Ambience */}
            <div className="pt-2 border-t border-hairline flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted font-mono">Currency:</span>
                <div className="flex space-x-1">
                  {(['USD', 'EUR', 'GBP'] as CurrencyCode[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      className={`px-2 py-0.5 text-xs font-mono rounded-[2px] border ${
                        currency === c ? 'bg-water text-white border-water' : 'border-hairline text-muted'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={toggleAmbientAudio}
                className="flex items-center gap-1.5 text-xs text-ink px-2.5 py-1 rounded-[2px] border border-hairline"
              >
                {ambientAudioPlaying ? <Volume2 className="w-3.5 h-3.5 text-water" /> : <VolumeX className="w-3.5 h-3.5 text-muted" />}
                <span className="font-mono text-[11px]">{ambientAudioPlaying ? 'Sound On' : 'Sound Off'}</span>
              </button>
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
                  className="w-1/2 bg-water text-white py-2.5 rounded-[2px] text-sm font-medium text-center cursor-pointer"
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
