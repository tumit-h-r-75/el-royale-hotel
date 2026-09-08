import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { useBooking } from '../context/BookingContext';
import { mockStays } from '../data/mockStays';
import { ShieldCheck, Calendar, Users, CheckCircle2, Search, DollarSign } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { state, formatMoney } = useBooking();
  const [searchTerm, setSearchTerm] = useState('');

  const allReservations = [
    ...state.confirmedStays.map((s) => ({
      code: s.reservationId,
      guest: `${s.guest.firstName} ${s.guest.lastName}`,
      email: s.guest.email,
      unit: s.unitName,
      checkIn: s.checkIn,
      checkOut: s.checkOut,
      total: s.grandTotal,
      status: 'Confirmed'
    })),
    ...mockStays.map((m) => ({
      code: m.confirmationCode,
      guest: m.guestName,
      email: m.email,
      unit: m.roomName,
      checkIn: m.checkIn,
      checkOut: m.checkOut,
      total: m.totalPrice,
      status: m.status
    }))
  ];

  const filtered = allReservations.filter(
    (r) =>
      r.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.guest.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.unit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-canvas text-ink min-h-screen flex flex-col">
      <Header isHeroPage={false} />

      <main className="pt-24 pb-20 flex-1">
        <section className="bg-paper border-b border-hairline py-12 px-6 md:px-8">
          <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 bg-brass/10 text-brass px-2.5 py-1 rounded-[2px] text-xs font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>El Royale Staff Portal</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
                Front Desk & Reservations Dashboard
              </h1>
              <p className="text-muted text-sm max-w-[60ch]">
                Monitor arriving guests, manage villa housekeeping status, and review active resort bookings.
              </p>
            </div>

            <div className="bg-paper border border-hairline rounded-[8px] p-4 flex gap-4 text-xs font-mono">
              <div>
                <span className="text-muted block uppercase text-[10px]">Total Reservations</span>
                <span className="font-semibold text-ink text-lg">{allReservations.length}</span>
              </div>
              <div className="border-l border-hairline pl-4">
                <span className="text-muted block uppercase text-[10px]">Occupancy Rate</span>
                <span className="font-semibold text-emerald-700 text-lg">88%</span>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-[1440px] mx-auto px-6 md:px-8 py-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="font-serif text-2xl text-ink">Active Guest Manifest</h2>
            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 text-muted absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search by confirmation code, guest or villa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-paper border border-hairline rounded-[2px] pl-9 pr-3 py-2 text-xs font-mono text-ink"
              />
            </div>
          </div>

          <div className="bg-paper border border-hairline rounded-[10px] overflow-x-auto shadow-xs">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-canvas border-b border-hairline text-muted uppercase tracking-wider">
                <tr>
                  <th className="p-4">Confirmation</th>
                  <th className="p-4">Guest Name</th>
                  <th className="p-4">Villa / Room</th>
                  <th className="p-4">Check-in</th>
                  <th className="p-4">Check-out</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {filtered.map((res, idx) => (
                  <tr key={idx} className="hover:bg-canvas/50">
                    <td className="p-4 font-semibold text-water">{res.code}</td>
                    <td className="p-4 text-ink font-sans font-medium">{res.guest}</td>
                    <td className="p-4 text-ink">{res.unit}</td>
                    <td className="p-4 text-muted">{res.checkIn}</td>
                    <td className="p-4 text-muted">{res.checkOut}</td>
                    <td className="p-4 text-ink font-semibold">
                      {typeof res.total === 'number' ? formatMoney(res.total) : res.total}
                    </td>
                    <td className="p-4">
                      <span className="bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-[2px] text-[10px] uppercase font-semibold">
                        {res.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
