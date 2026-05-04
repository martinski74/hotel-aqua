"use client";

import React from 'react';
import { useLanguage } from '@/i18n/LanguageContext';

interface ContactConfirmationModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const ContactConfirmationModal = ({ isVisible, onClose }: ContactConfirmationModalProps) => {
  const { t } = useLanguage();

  if (!isVisible) {
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
    maxWidth: '460px',
    width: '100%',
    boxShadow: '0 25px 60px rgba(15, 23, 42, 0.35)',
    border: '1px solid rgba(251, 191, 36, 0.35)',
  };

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-700">{t.contacts.modal.tag}</p>
        <h2 className="mb-3 text-2xl font-bold text-slate-900">{t.contacts.modal.title}</h2>
        <p className="text-slate-700">{t.contacts.modal.description}</p>
        <button
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 px-4 py-3 font-semibold text-white transition hover:-translate-y-0.5"
        >
          {t.contacts.modal.close}
        </button>
      </div>
    </div>
  );
};

export default ContactConfirmationModal;
