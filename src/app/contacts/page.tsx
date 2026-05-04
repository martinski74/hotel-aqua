"use client";
import Image from 'next/image';
import { useState } from 'react';
import ContactConfirmationModal from '@/components/ContactConfirmationModal';
import { useLanguage } from '@/i18n/LanguageContext';

export default function ContactsPage() {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[\d\s()-]{6,20}$/;

    if (!name.trim()) {
      nextErrors.name = t.contacts.validation.nameRequired;
    }

    if (!email.trim()) {
      nextErrors.email = t.contacts.validation.emailRequired;
    } else if (!emailRegex.test(email.trim())) {
      nextErrors.email = t.contacts.validation.emailInvalid;
    }

    if (!phone.trim()) {
      nextErrors.phone = t.contacts.validation.phoneRequired;
    } else if (!phoneRegex.test(phone.trim())) {
      nextErrors.phone = t.contacts.validation.phoneInvalid;
    }

    if (!message.trim()) {
      nextErrors.message = t.contacts.validation.messageRequired;
    } else if (message.trim().length < 10) {
      nextErrors.message = t.contacts.validation.messageMin;
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setShowConfirmationModal(true);
    setName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');
  };

  const handleCloseModal = () => {
    setShowConfirmationModal(false);
  };

  const inputBaseClasses =
    'w-full rounded-xl border bg-white/95 px-4 py-3 text-slate-800 shadow-sm outline-none transition focus:ring-4';
  const inputClasses = (field: string) =>
    `${inputBaseClasses} ${
      errors[field]
        ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
        : 'border-amber-200 focus:border-amber-500 focus:ring-amber-200'
    }`;

  return (
    <main>
      <div className="containt px-4 py-10 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
            <div className="rounded-2xl border border-amber-100 bg-white/80 p-6 shadow-[0_10px_30px_rgba(194,120,3,0.15)] backdrop-blur-sm md:p-8">
              <h2 className="mb-5 font-['AGKornelia'] text-3xl uppercase text-[#f05200]">{t.contacts.title}</h2>
              <div className="space-y-2 text-slate-700">
                <div><strong>{t.contacts.hotelName}</strong></div>
                <div><strong>{t.contacts.address}:</strong> &quot;Briz&quot; Str.2, 8888, Kiten Bulgaria</div>
                <div><strong>{t.contacts.gps}:</strong> N 42.235887 E 27.777469</div>
                <div><strong>{t.contacts.phoneFax}:</strong> (+359) 123 456</div>
                <div><strong>{t.contacts.email}:</strong> info@aqua.com</div>
              </div>
              <div className="mt-6 overflow-hidden rounded-xl border border-amber-100">
                <Image className="h-auto w-full" src="/images/map.png" alt="map" width={600} height={450} />
              </div>
            </div>

            <div className="rounded-2xl border border-amber-100 bg-white/80 p-6 shadow-[0_10px_30px_rgba(194,120,3,0.15)] backdrop-blur-sm md:p-8">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-amber-700">{t.contacts.formTag}</p>
              <h2 className="mb-3 font-['AGKornelia'] text-3xl uppercase text-[#f05200]">{t.contacts.contactForm}</h2>
              <p className="mb-6 text-sm text-slate-600">{t.contacts.formNote}</p>

              <form className="space-y-5" name="myForm" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="formGroupName" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-700">
                    {t.contacts.name}*
                  </label>
                  <input
                    type="text"
                    className={inputClasses('name')}
                    name="name"
                    id="formGroupName"
                    placeholder={t.contacts.namePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="formGroupEmail" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-700">
                      {t.contacts.email}*
                    </label>
                    <input
                      type="email"
                      className={inputClasses('email')}
                      name="email"
                      id="formGroupEmail"
                      placeholder={t.contacts.emailPlaceholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="formGroupPhone" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-700">
                      {t.contacts.phone}*
                    </label>
                    <input
                      type="text"
                      className={inputClasses('phone')}
                      name="phone"
                      id="formGroupPhone"
                      placeholder={t.contacts.phonePlaceholder}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="formGroupSubject" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-700">
                    {t.contacts.subject}
                  </label>
                  <input
                    type="text"
                    className={inputClasses('subject')}
                    id="formGroupSubject"
                    placeholder={t.contacts.subjectPlaceholder}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-700">
                    {t.contacts.message}*
                  </label>
                  <textarea
                    name="text"
                    id="message"
                    cols={45}
                    rows={4}
                    placeholder={t.contacts.messagePlaceholder}
                    className={inputClasses('message')}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                  {errors.message && <p className="mt-2 text-sm text-red-600">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 px-5 py-3 font-semibold text-white shadow-lg shadow-orange-400/30 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-400/40"
                >
                  {t.contacts.send}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ContactConfirmationModal isVisible={showConfirmationModal} onClose={handleCloseModal} />
    </main>
  );
}