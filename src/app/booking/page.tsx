"use client";

import React, { useState } from 'react';
import BookingModal from '@/components/BookingModal';
import { useLanguage } from '@/i18n/LanguageContext';

type RoomType = 'single' | 'double' | 'triple' | 'suite';

interface BookingResult {
  name: string;
  roomType: string;
  nights: number;
  totalPrice: number;
}

export default function BookingPage() {
  const [name, setName] = useState('');
  const [roomType, setRoomType] = useState<RoomType>('double');
  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [adults, setAdults] = useState(2);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingResult, setBookingResult] = useState<BookingResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { t } = useLanguage();

  const resetForm = () => {
    setName('');
    setRoomType('double');
    setArrivalDate('');
    setDepartureDate('');
    setAdults(2);
  };

  const roomPrices: Record<RoomType, Record<string, number>> = {
    single: { early: 40, mid: 45, peak: 55, late: 45, autumn: 40 },
    double: { early: 70, mid: 85, peak: 70, late: 55, autumn: 60 },
    triple: { early: 90, mid: 100, peak: 90, late: 80, autumn: 95 },
    suite: { early: 110, mid: 130, peak: 110, late: 100, autumn: 120 },
  };

  const roomCapacity: Record<RoomType, number> = {
    single: 1,
    double: 2,
    triple: 3,
    suite: 4,
  };

  const getSeasonKey = (date: Date): string => {
    const day = date.getDate();
    const month = date.getMonth() + 1;

    if ((month === 5 && day >= 20) || (month === 6 && day <= 30)) {
      return 'early';
    }
    if (month === 7 && day >= 1 && day <= 15) {
      return 'mid';
    }
    if ((month === 7 && day >= 16) || (month === 8 && day <= 19)) {
      return 'peak';
    }
    if (month === 8 && day >= 20 && day <= 31) {
      return 'late';
    }
    if (month === 9 && day >= 1 && day <= 20) {
      return 'autumn';
    }
    return 'early';
  };

  const getPriceForDate = (date: Date, room: RoomType): number => {
    const seasonKey = getSeasonKey(date);
    return roomPrices[room][seasonKey];
  };

  const computeQuote = () => {
    if (!arrivalDate || !departureDate) {
      return { nights: 0, totalPrice: 0, surchargePerNight: 0 };
    }

    const start = new Date(arrivalDate);
    const end = new Date(departureDate);
    const timeDiff = end.getTime() - start.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (nights <= 0) {
      return { nights: 0, totalPrice: 0, surchargePerNight: 0 };
    }

    const capacity = roomCapacity[roomType];
    const surchargePerNight = adults > capacity ? (adults - capacity) * 20 : 0;
    let totalPrice = 0;

    for (let i = 0; i < nights; i++) {
      const currentNight = new Date(start);
      currentNight.setDate(start.getDate() + i);
      const roomPrice = getPriceForDate(currentNight, roomType);
      totalPrice += roomPrice + surchargePerNight;
    }

    return { nights, totalPrice, surchargePerNight };
  };

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};

    if (!name.trim()) {
      nextErrors.name = t.booking.validation.nameRequired;
    }

    if (!arrivalDate) {
      nextErrors.arrivalDate = t.booking.validation.arrivalRequired;
    }

    if (!departureDate) {
      nextErrors.departureDate = t.booking.validation.departureRequired;
    }

    if (adults < 1) {
      nextErrors.adults = t.booking.validation.adultsMin;
    }

    if (arrivalDate && departureDate) {
      const start = new Date(arrivalDate);
      const end = new Date(departureDate);
      if (end <= start) {
        nextErrors.departureDate = t.booking.validation.departureAfterArrival;
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleCalculate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const { nights, totalPrice } = computeQuote();

    const roomLabel = t.booking.rooms[roomType];
    setBookingResult({ name, roomType: roomLabel, nights, totalPrice });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setBookingResult(null);
    resetForm();
    setErrors({});
  };
  const today = new Date().toISOString().split('T')[0];
  const { nights, totalPrice, surchargePerNight } = computeQuote();
  const roomCapacityValue = roomCapacity[roomType];

  const inputBaseClasses =
    'w-full rounded-xl border bg-white/95 px-4 py-3 text-slate-800 shadow-sm outline-none transition focus:ring-4';
  const inputClasses = (field: string) =>
    `${inputBaseClasses} ${
      errors[field]
        ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
        : 'border-amber-200 focus:border-amber-500 focus:ring-amber-200'
    }`;

  return (
    <>
      <main>
        <div className="containt booking px-4 py-10 md:px-8">
          <div className="mx-auto max-w-6xl">
            <h3 className="mb-3 text-center">{t.booking.title}</h3>
            <p className="mx-auto mb-8 max-w-3xl text-center text-slate-700">{t.booking.note}</p>

            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
              <form
                className="rounded-2xl border border-amber-100 bg-white/80 p-6 shadow-[0_10px_30px_rgba(194,120,3,0.15)] backdrop-blur-sm md:p-8"
                onSubmit={handleCalculate}
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label htmlFor="name" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-700">
                      {t.booking.name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder={t.booking.namePlaceholder}
                      className={inputClasses('name')}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="roomType" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-700">
                      {t.booking.roomType}
                    </label>
                    <select
                      id="roomType"
                      className={inputClasses('roomType')}
                      value={roomType}
                      onChange={(e) => setRoomType(e.target.value as RoomType)}
                    >
                      <option value="single">{t.booking.rooms.single}</option>
                      <option value="double">{t.booking.rooms.double}</option>
                      <option value="triple">{t.booking.rooms.triple}</option>
                      <option value="suite">{t.booking.rooms.suite}</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="arrival" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-700">
                      {t.booking.arrival}
                    </label>
                    <input
                      type="date"
                      id="arrival"
                      min={today}
                      className={inputClasses('arrivalDate')}
                      value={arrivalDate}
                      onChange={(e) => setArrivalDate(e.target.value)}
                    />
                    {errors.arrivalDate && <p className="mt-2 text-sm text-red-600">{errors.arrivalDate}</p>}
                  </div>

                  <div>
                    <label htmlFor="departure" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-700">
                      {t.booking.departure}
                    </label>
                    <input
                      type="date"
                      id="departure"
                      min={arrivalDate || today}
                      className={inputClasses('departureDate')}
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                    />
                    {errors.departureDate && <p className="mt-2 text-sm text-red-600">{errors.departureDate}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="adults" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-700">
                      {t.booking.adults}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="9"
                      id="adults"
                      className={inputClasses('adults')}
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value) || 0)}
                    />
                    {errors.adults && <p className="mt-2 text-sm text-red-600">{errors.adults}</p>}
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 px-5 py-3 font-semibold text-white shadow-lg shadow-orange-400/30 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-400/40"
                  >
                    {t.booking.calculate}
                  </button>
                  <p className="mt-3 text-center text-xs text-slate-600">{t.booking.noPaymentNote}</p>
                </div>
              </form>

              <div className="rounded-2xl border border-amber-100 bg-white/75 p-6 shadow-[0_10px_30px_rgba(194,120,3,0.15)] backdrop-blur-sm md:p-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">{t.booking.liveEstimate}</p>
                <h4 className="mt-2 text-2xl font-semibold text-slate-800">{t.booking.summaryTitle}</h4>
                <div className="mt-6 space-y-3 text-slate-700">
                  <div className="flex items-center justify-between rounded-lg bg-amber-50/70 px-4 py-3">
                    <span>{t.booking.roomType}</span>
                    <span className="font-semibold">{t.booking.rooms[roomType]}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-amber-50/70 px-4 py-3">
                    <span>{t.booking.adults}</span>
                    <span className="font-semibold">{adults}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-amber-50/70 px-4 py-3">
                    <span>{t.booking.capacity}</span>
                    <span className="font-semibold">{roomCapacityValue}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-amber-50/70 px-4 py-3">
                    <span>{t.booking.nights}</span>
                    <span className="font-semibold">{nights}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-amber-50/70 px-4 py-3">
                    <span>{t.booking.extraGuestFeePerNight}</span>
                    <span className="font-semibold">{surchargePerNight.toFixed(2)} lv.</span>
                  </div>
                </div>

                <div className="mt-6 rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 px-5 py-4 text-white">
                  <p className="text-sm uppercase tracking-wide text-slate-300">{t.booking.totalEstimate}</p>
                  <p className="mt-1 text-3xl font-bold">{totalPrice.toFixed(2)} lv.</p>
                </div>

                <p className="mt-4 text-xs text-slate-600">{t.booking.finalPriceNote}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {isModalOpen && <BookingModal result={bookingResult} onClose={closeModal} />}
    </>
  );
}