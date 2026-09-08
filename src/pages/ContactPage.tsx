import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { MapPin, Phone, Mail, Clock, Car, Plane, CheckCircle2, Send } from 'lucide-react';
import { PROPERTY_LOCATION } from '../data/attractions';

export const ContactPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    arrivalDate: '',
    subject: 'General Concierge Inquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="bg-canvas text-ink min-h-screen">
      <Header isHeroPage={false} />

      <main className="pt-24 pb-16">
        {/* Header */}
        <section className="max-w-[1240px] mx-auto px-6 md:px-8 py-8 border-b border-hairline">
          <div className="max-w-[700px] space-y-3">
            <span className="text-xs uppercase font-mono tracking-wider text-brass bg-brass/10 px-2.5 py-1 rounded-[2px] inline-block">
              Connect & Arrive
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink font-normal leading-tight">
              Direct Contact & Concierge
            </h1>
            <p className="text-muted text-base">
              Speak directly with our team on property in Burbank for bespoke arrival arrangements, film shoot inquiries, or extended stays.
            </p>
          </div>
        </section>

        <section className="max-w-[1240px] mx-auto px-6 md:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left 5 Cols: Contact Direct Lines & Arrival Details */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Direct Lines */}
              <div className="p-6 rounded-[10px] bg-paper border border-hairline space-y-4">
                <h2 className="font-serif text-2xl text-ink">Property Lines</h2>
                <div className="space-y-3 text-xs font-mono">
                  <div className="flex justify-between py-1.5 border-b border-hairline">
                    <span className="text-muted">Front Desk & Concierge:</span>
                    <a href="tel:+18185550190" className="text-water hover:underline font-semibold">+1 818 555 0190</a>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-hairline">
                    <span className="text-muted">Direct Reservations:</span>
                    <a href="tel:+18185550192" className="text-water hover:underline font-semibold">+1 818 555 0192</a>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-hairline">
                    <span className="text-muted">Production & Events:</span>
                    <a href="mailto:events@thetangerine.com" className="text-water hover:underline">events@thetangerine.com</a>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-hairline">
                    <span className="text-muted">Concierge Desk:</span>
                    <a href="mailto:concierge@thetangerine.com" className="text-water hover:underline">concierge@thetangerine.com</a>
                  </div>
                </div>
              </div>

              {/* Physical Location */}
              <div className="p-6 rounded-[10px] bg-paper border border-hairline space-y-3">
                <div className="flex items-center space-x-2 text-brass">
                  <MapPin className="w-4 h-4" />
                  <span className="text-xs uppercase font-mono tracking-wider font-semibold">Address & Valet Court</span>
                </div>
                <p className="font-serif text-lg text-ink">
                  {PROPERTY_LOCATION.address}
                </p>
                <p className="text-xs text-muted leading-relaxed">
                  Located along the quiet residential corridor of West Riverside Drive, with an enclosed motor court entrance and 24-hour valet.
                </p>
              </div>

              {/* Airports & Flight Transit in Geist Mono */}
              <div className="p-6 rounded-[10px] bg-paper border border-hairline space-y-4 text-xs font-mono">
                <span className="text-xs uppercase font-mono tracking-wider text-muted font-medium block">
                  Airport Proximity & Shuttles
                </span>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-[4px] bg-canvas border border-hairline flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-ink block font-sans">Hollywood Burbank Airport (BUR)</span>
                      <span className="text-muted text-[11px]">Commercial & Private Aviation Terminal</span>
                    </div>
                    <div className="text-right">
                      <span className="text-water font-semibold block">3.1 mi</span>
                      <span className="text-[10px] text-muted">~8 min drive</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-[4px] bg-canvas border border-hairline flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-ink block font-sans">Los Angeles International (LAX)</span>
                      <span className="text-muted text-[11px]">International Gateways</span>
                    </div>
                    <div className="text-right">
                      <span className="text-ink font-semibold block">26.4 mi</span>
                      <span className="text-[10px] text-muted">~42 min drive</span>
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-muted font-sans pt-1">
                  Private black-car transfers from both airports can be arranged through the front desk concierge.
                </p>
              </div>

            </div>

            {/* Right 7 Cols: Concierge Inquiry Form */}
            <div className="lg:col-span-7 bg-paper border border-hairline rounded-[10px] p-8 shadow-xs">
              {formSubmitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-3xl text-ink">Inquiry Received</h3>
                  <p className="text-sm text-muted max-w-md mx-auto leading-relaxed">
                    Thank you, {formData.name}. Our head concierge on property has received your message and will reply via email within two hours.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        arrivalDate: '',
                        subject: 'General Concierge Inquiry',
                        message: ''
                      });
                    }}
                    className="bg-canvas border border-hairline px-6 py-2.5 rounded-[2px] text-xs font-medium text-ink hover:border-brass mt-4 cursor-pointer"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl text-ink">Send a Concierge Request</h2>
                    <p className="text-xs text-muted mt-1">
                      Whether you are planning an extended residency, requesting specific dietary arrangements, or organizing studio accommodations.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="uppercase tracking-wider text-muted font-medium block">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-canvas border border-hairline rounded-[2px] px-3 py-2 text-ink focus:ring-1 focus:ring-brass"
                        placeholder="Elena Rostova"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="uppercase tracking-wider text-muted font-medium block">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-canvas border border-hairline rounded-[2px] px-3 py-2 text-ink focus:ring-1 focus:ring-brass"
                        placeholder="elena@example.com"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="uppercase tracking-wider text-muted font-medium block">Contact Telephone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-canvas border border-hairline rounded-[2px] px-3 py-2 text-ink focus:ring-1 focus:ring-brass"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="uppercase tracking-wider text-muted font-medium block">Estimated Arrival Date</label>
                      <input
                        type="date"
                        value={formData.arrivalDate}
                        onChange={(e) => setFormData({ ...formData, arrivalDate: e.target.value })}
                        className="w-full bg-canvas border border-hairline rounded-[2px] px-3 py-2 text-ink focus:ring-1 focus:ring-brass"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <label className="uppercase tracking-wider text-muted font-medium block">Inquiry Nature</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-canvas border border-hairline rounded-[2px] px-3 py-2 text-ink focus:ring-1 focus:ring-brass text-xs"
                    >
                      <option>General Concierge Inquiry</option>
                      <option>Specific Named Villa Booking Assistance</option>
                      <option>Studio Production & Filming Buyout</option>
                      <option>Private Dining & Citrus Terrace Buyout</option>
                      <option>Airport Chauffeur Coordination</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <label className="uppercase tracking-wider text-muted font-medium block">Message & Special Requests *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please share any preferences regarding villa orientation, quiet zones, sound equipment, or arrival times..."
                      className="w-full bg-canvas border border-hairline rounded-[2px] p-3 text-ink focus:ring-1 focus:ring-brass text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-water hover:brightness-110 active:scale-[0.98] text-white py-3.5 rounded-[2px] text-xs font-medium tracking-wide transition-all shadow-xs cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <span>Send Inquiry to Concierge</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};
