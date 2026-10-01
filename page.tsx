'use client';

import React, { useState, useEffect } from 'react';
import { CalendarCheck, Search, Trash2, CheckCircle2, XCircle, MapPin, Clock, Calendar } from 'lucide-react';
import { formatTime12h } from '@/lib/constants';

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/reservations?filter=all');
      const data = await res.json();
      if (data.reservations) setReservations(data.reservations);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleCancel = async (id: string, reservationId: string) => {
    if (!confirm(`Are you sure you want to cancel reservation ${reservationId}?`)) return;
    try {
      const res = await fetch(`/api/reservations/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchReservations();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = reservations.filter((r) => {
    if (filterStatus !== 'ALL' && r.status !== filterStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        r.reservationId.toLowerCase().includes(q) ||
        r.classroom.name.toLowerCase().includes(q) ||
        r.user.name.toLowerCase().includes(q) ||
        r.purpose.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-display text-white">Campus-Wide Reservations</h2>
          <p className="text-xs text-slate-400">Review faculty classroom bookings, inspect booking purposes, and cancel conflicts.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-[#0c101c] border border-white/10 text-xs">
        <div>
          <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Status Filter:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#141b2c] border border-white/10 text-white"
          >
            <option value="ALL">All Reservations</option>
            <option value="CONFIRMED">Confirmed Only</option>
            <option value="CANCELLED">Cancelled Only</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Search Keyword:</label>
          <input
            type="text"
            placeholder="Search by ID, Teacher Name, Room, Purpose..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#141b2c] border border-white/10 text-white placeholder-slate-500"
          />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="py-12 text-center text-xs font-mono text-slate-400">Loading reservations...</div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center text-slate-500 bg-[#0c101c] rounded-2xl border border-white/5 text-xs">
          No reservations found matching criteria.
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-[#0c101c] overflow-hidden shadow-glass">
          <table className="w-full text-left text-xs divide-y divide-white/5">
            <thead className="bg-[#121626] text-slate-400 font-mono text-[11px] uppercase">
              <tr>
                <th className="py-3.5 px-4">Reservation ID</th>
                <th className="py-3.5 px-4">Classroom</th>
                <th className="py-3.5 px-4">Faculty Member</th>
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4">Purpose</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              {filtered.map((r) => {
                const isCancelled = r.status === 'CANCELLED';
                return (
                  <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-cyan-400">{r.reservationId}</td>
                    <td className="py-3 px-4 font-medium text-white">{r.classroom.name}</td>
                    <td className="py-3 px-4">
                      <div className="text-white font-medium">{r.user.name}</div>
                      <div className="text-[11px] text-slate-400">{r.user.department || r.user.email}</div>
                    </td>
                    <td className="py-3 px-4 font-mono">
                      <div className="text-slate-300">{r.date}</div>
                      <div className="text-[11px] text-cyan-400">
                        {formatTime12h(r.startTime)} – {formatTime12h(r.endTime)}
                      </div>
                    </td>
                    <td className="py-3 px-4 max-w-xs truncate text-slate-300" title={r.purpose}>
                      {r.purpose}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                          isCancelled
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {!isCancelled && (
                        <button
                          onClick={() => handleCancel(r.id, r.reservationId)}
                          className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[11px] font-medium transition-colors"
                        >
                          Cancel Booking
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
