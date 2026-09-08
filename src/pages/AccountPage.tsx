import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { useBooking } from '../context/BookingContext';
import { mockStays } from '../data/mockStays';
import {
  User,
  Calendar,
  ShieldCheck,
  Award,
  Settings,
  ArrowRight,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Heart
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, formatMoney } = useBooking();

  const [activeTab, setActiveTab] = useState<'stays' | 'profile' | 'preferences'>('stays');
  const [lookupCode, setLookupCode] = useState('');

  // Combine session confirmed stays + mock stays
  const allStays = [
    ...state.confirmedStays.map((s) => ({
      confirmationCode: s.reservationId,
      guestName: `${s.guest.firstName} ${s.guest.lastName}`,
      email: s.guest.email,
      phone: s.guest.phone,
      roomName: s.unitName,
      checkIn: s.checkIn,
      checkOut: s.checkOut,
      nights: s.nights,
      status: 'confirmed' as const,
      totalPrice: s.grandTotal
    })),
    ...mockStays
  ];

  const [profile, setProfile] = useState({
    firstName: 'Elena',
    lastName: 'Rostova',
    email: 'elena.rostova@architecturaldigest.com',
    phone: '+1 (310) 555-0198',
    membershipTier: 'El Royale Insider · Gold'
  });

  const [preferences, setPreferences] = useState({
    pillowType: 'Firm Belgian Linen & Down Alternative',
    roomTemperature: '68°F / 20°C',
    morningBeverage: 'Double Valencia Orange Espresso',
    quietFloorPreference: 'Upper Courtyard Shade Zone (Olive Grove View)'
  });

  const [savedMessage, setSavedMessage] = useState(false);

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="bg-canvas text-ink min-h-screen flex flex-col">
      <Header isHeroPage={false} />

      <main className="pt-24 pb-20 flex-1">
        {/* Top Banner Header */}
        <section className="bg-paper border-b border-hairline py-12 px-6 md:px-8">
          <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 bg-brass/10 text-brass px-2.5 py-1 rounded-[2px] text-xs font-mono">
                <Award className="w-3.5 h-3.5" />
                <span>{profile.membershipTier}</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink font-normal">
                Welcome back, {profile.firstName}.
              </h1>
              <p className="text-muted text-sm font-sans max-w-[60ch]">
                Manage your active villa reservations, customize your in-room sanctuary preferences, and review your stay history.
              </p>
            </div>

            {/* Quick Lookup Bar */}
            <div className="bg-canvas border border-hairline rounded-[8px] p-4 max-w-sm w-full space-y-3 shadow-xs">
              <span className="text-xs uppercase font-mono tracking-wider text-muted block font-medium">
                Lookup Reservation Code
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. TNG-78429"
                  value={lookupCode}
                  onChange={(e) => setLookupCode(e.target.value)}
                  className="bg-paper border border-hairline rounded-[2px] px-3 py-2 text-xs font-mono text-ink flex-1"
                />
                <button
                  onClick={() => {
                    if (lookupCode.trim()) {
                      navigate(`/manage-booking?code=${lookupCode.trim()}`);
                    }
                  }}
                  className="bg-water text-white px-4 py-2 rounded-[2px] text-xs font-medium cursor-pointer hover:brightness-110"
                >
                  Lookup
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-8 py-10">
          
          {/* Tabs */}
          <div className="flex border-b border-hairline mb-8 space-x-8 text-sm font-medium">
            <button
              onClick={() => setActiveTab('stays')}
              className={`pb-3 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'stays' ? 'border-ink text-ink font-semibold' : 'border-transparent text-muted hover:text-ink'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Your Stays ({allStays.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`pb-3 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'profile' ? 'border-ink text-ink font-semibold' : 'border-transparent text-muted hover:text-ink'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Guest Profile</span>
            </button>
            <button
              onClick={() => setActiveTab('preferences')}
              className={`pb-3 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'preferences' ? 'border-ink text-ink font-semibold' : 'border-transparent text-muted hover:text-ink'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Sanctuary Preferences</span>
            </button>
          </div>

          {/* TAB 1: STAYS */}
          {activeTab === 'stays' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl text-ink">Active & Historical Stays</h2>
                <Link
                  to="/book"
                  className="text-xs text-water hover:underline font-medium flex items-center gap-1 font-mono"
                >
                  <span>Reserve new stay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allStays.map((stay, idx) => (
                  <div
                    key={stay.confirmationCode || idx}
                    className="bg-paper border border-hairline rounded-[10px] p-6 flex flex-col justify-between space-y-5 shadow-xs"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="bg-brass/10 text-brass px-2 py-0.5 rounded-[2px] uppercase font-semibold">
                          {stay.confirmationCode}
                        </span>
                        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-[2px] capitalize">
                          {stay.status}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl text-ink font-medium">{stay.roomName}</h3>

                      <div className="space-y-1 text-xs font-mono text-muted">
                        <div>Check-in: <span className="text-ink">{stay.checkIn}</span></div>
                        <div>Check-out: <span className="text-ink">{stay.checkOut}</span></div>
                        <div>Guest: <span className="text-ink">{stay.guestName}</span></div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-hairline flex items-center justify-between text-xs">
                      <span className="font-mono font-semibold text-ink">
                        {typeof stay.totalPrice === 'number' ? formatMoney(stay.totalPrice) : stay.totalPrice}
                      </span>
                      <Link
                        to={`/manage-booking?code=${stay.confirmationCode}&email=${encodeURIComponent(stay.email)}`}
                        className="text-water hover:underline font-medium flex items-center gap-1"
                      >
                        <span>Manage stay</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: PROFILE */}
          {activeTab === 'profile' && (
            <div className="max-w-2xl bg-paper border border-hairline rounded-[10px] p-8 space-y-6 shadow-xs">
              <div>
                <h2 className="font-serif text-2xl text-ink">Guest Profile Details</h2>
                <p className="text-xs text-muted mt-1">
                  Your credentials are securely maintained under El Royale Hotel privacy standards.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-mono">
                <div>
                  <label className="text-muted block uppercase text-[10px] mb-1">First Name</label>
                  <input
                    type="text"
                    value={profile.firstName}
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                    className="w-full bg-canvas border border-hairline rounded-[2px] px-3 py-2 text-ink text-xs"
                  />
                </div>
                <div>
                  <label className="text-muted block uppercase text-[10px] mb-1">Last Name</label>
                  <input
                    type="text"
                    value={profile.lastName}
                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                    className="w-full bg-canvas border border-hairline rounded-[2px] px-3 py-2 text-ink text-xs"
                  />
                </div>
                <div>
                  <label className="text-muted block uppercase text-[10px] mb-1">Email Address</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full bg-canvas border border-hairline rounded-[2px] px-3 py-2 text-ink text-xs"
                  />
                </div>
                <div>
                  <label className="text-muted block uppercase text-[10px] mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full bg-canvas border border-hairline rounded-[2px] px-3 py-2 text-ink text-xs"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-hairline flex items-center justify-between">
                <span className="text-xs text-brass font-mono">Tier: {profile.membershipTier}</span>
                <button
                  onClick={() => alert('Profile updated successfully.')}
                  className="bg-water text-white px-5 py-2.5 rounded-[2px] text-xs font-medium cursor-pointer hover:brightness-110"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: PREFERENCES */}
          {activeTab === 'preferences' && (
            <form onSubmit={handleSavePreferences} className="max-w-2xl bg-paper border border-hairline rounded-[10px] p-8 space-y-6 shadow-xs">
              <div>
                <h2 className="font-serif text-2xl text-ink">In-Room Sanctuary Preferences</h2>
                <p className="text-xs text-muted mt-1">
                  We prepare your villa prior to arrival according to your personal comfort specifications.
                </p>
              </div>

              {savedMessage && (
                <div className="p-3 rounded-[4px] bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Your sanctuary preferences have been successfully updated for all upcoming stays.</span>
                </div>
              )}

              <div className="space-y-4 text-xs font-mono">
                <div>
                  <label className="text-muted block uppercase text-[10px] mb-1">Pillow & Linen Preference</label>
                  <select
                    value={preferences.pillowType}
                    onChange={(e) => setPreferences({ ...preferences, pillowType: e.target.value })}
                    className="w-full bg-canvas border border-hairline rounded-[2px] px-3 py-2 text-ink text-xs font-sans"
                  >
                    <option>Firm Belgian Linen & Down Alternative</option>
                    <option>Plush Organic Cotton & Feather</option>
                    <option>Hypoallergenic Bamboo Contour</option>
                  </select>
                </div>

                <div>
                  <label className="text-muted block uppercase text-[10px] mb-1">Preferred Room Temperature</label>
                  <select
                    value={preferences.roomTemperature}
                    onChange={(e) => setPreferences({ ...preferences, roomTemperature: e.target.value })}
                    className="w-full bg-canvas border border-hairline rounded-[2px] px-3 py-2 text-ink text-xs font-sans"
                  >
                    <option>66°F / 19°C (Cool & Crisp)</option>
                    <option>68°F / 20°C (Standard Sanctuary)</option>
                    <option>72°F / 22°C (Warm Citrus Breeze)</option>
                  </select>
                </div>

                <div>
                  <label className="text-muted block uppercase text-[10px] mb-1">Morning Espresso & Citrus Option</label>
                  <input
                    type="text"
                    value={preferences.morningBeverage}
                    onChange={(e) => setPreferences({ ...preferences, morningBeverage: e.target.value })}
                    className="w-full bg-canvas border border-hairline rounded-[2px] px-3 py-2 text-ink text-xs"
                  />
                </div>

                <div>
                  <label className="text-muted block uppercase text-[10px] mb-1">Location & View Preference</label>
                  <input
                    type="text"
                    value={preferences.quietFloorPreference}
                    onChange={(e) => setPreferences({ ...preferences, quietFloorPreference: e.target.value })}
                    className="w-full bg-canvas border border-hairline rounded-[2px] px-3 py-2 text-ink text-xs"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-hairline flex justify-end">
                <button
                  type="submit"
                  className="bg-water text-white px-6 py-2.5 rounded-[2px] text-xs font-medium cursor-pointer hover:brightness-110"
                >
                  Save Sanctuary Preferences
                </button>
              </div>
            </form>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};
