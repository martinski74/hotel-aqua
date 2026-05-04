"use client";

import { useLanguage } from '@/i18n/LanguageContext';

interface BookingResult {
  name: string;
  roomType: string;
  nights: number;
  totalPrice: number;
}

interface BookingModalProps {
  result: BookingResult | null;
  onClose: () => void;
}

const BookingModal = ({ result, onClose }: BookingModalProps) => {
  const { t } = useLanguage();

  if (!result) {
    return null;
  }

  const modalOverlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '1.5rem',
    backdropFilter: 'blur(4px)',
  };

  const modalContentStyle: React.CSSProperties = {
    background: 'linear-gradient(180deg, #ffffff 0%, #fff7ed 100%)',
    padding: '2rem',
    borderRadius: '16px',
    color: '#111827',
    textAlign: 'left',
    width: '100%',
    maxWidth: '480px',
    boxShadow: '0 25px 60px rgba(15, 23, 42, 0.35)',
    border: '1px solid rgba(251, 191, 36, 0.35)',
  };

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-700">{t.booking.liveEstimate}</p>
        <h2 className="mb-4 text-2xl font-bold text-slate-900">{t.booking.modal.title}</h2>
        <p className="mb-6 text-slate-700">
          {t.booking.modal.greeting} <span className="font-semibold">{result.name}</span>
        </p>

        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg bg-white/80 px-4 py-3">
            <span className="text-slate-600">{t.booking.roomType}</span>
            <span className="font-semibold text-slate-900">{result.roomType}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-white/80 px-4 py-3">
            <span className="text-slate-600">{t.booking.nights}</span>
            <span className="font-semibold text-slate-900">{result.nights}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-slate-900 px-4 py-3">
            <span className="text-slate-200">{t.booking.modal.totalPrice}</span>
            <span className="text-lg font-bold text-white">{result.totalPrice.toFixed(2)} lv.</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 px-4 py-3 font-semibold text-white transition hover:-translate-y-0.5"
        >
          {t.booking.modal.confirmAndClose}
        </button>
      </div>
    </div>
  );
};

export default BookingModal;
