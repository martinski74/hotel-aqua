"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';

const images = {
  hotel: [
    '/images/hotel/BIG_hotel.jpg',
    '/images/hotel/BIG_hotel6.jpg',
    '/images/hotel/BIG_hotel7.jpg',
    '/images/hotel/BIG_hotel8.jpg',
    '/images/hotel/BIG_hotel9.jpg',
  ],
  rooms: [
    '/images/rooms/room1.jpg',
    '/images/rooms/room2.jpg',
    '/images/rooms/room3.jpg',
    '/images/rooms/room4.jpg',
    '/images/rooms/room5.jpg',
    '/images/rooms/room6.jpg',
    '/images/rooms/room7.jpg',
    '/images/rooms/room8.jpg',
    '/images/rooms/room9.jpg',
    '/images/rooms/room10.jpg',
  ],
  restaurant: [
    '/images/resataurant/BIG_hotel1.jpg',
    '/images/resataurant/BIG_hotel2.jpg',
    '/images/resataurant/BIG_hotel3.jpg',
    '/images/resataurant/BIG_hotel4.jpg',
    '/images/resataurant/BIG_hotel5.jpg',
  ],
  kiten: [
    '/images/kiten/kiten-beach.jpg',
    '/images/kiten/kiten.jpg',
    '/images/kiten/kiten1.jpg',
    '/images/kiten/kiten2.jpg',
    '/images/kiten/sea.jpg',
    '/images/kiten/sea1.jpg',
  ],
};

function GalleryContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'all';
  const { t } = useLanguage();

  const categories = [
    { key: 'all', label: t.gallery.categories.all },
    { key: 'hotel', label: t.gallery.categories.hotel },
    { key: 'rooms', label: t.gallery.categories.rooms },
    { key: 'restaurant', label: t.gallery.categories.restaurant },
    { key: 'kiten', label: t.gallery.categories.kiten },
  ];

  const titles: Record<string, string> = {
    all: t.gallery.titles.all,
    hotel: t.gallery.titles.hotel,
    rooms: t.gallery.titles.rooms,
    restaurant: t.gallery.titles.restaurant,
    kiten: t.gallery.titles.kiten,
  };

  const filteredImages = category === 'all'
    ? [...images.hotel, ...images.rooms, ...images.restaurant, ...images.kiten]
    : images[category as keyof typeof images] || [];

  return (
    <>
      <h2>{titles[category] || t.gallery.title}</h2>
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        {categories.map((cat) => (
          <Link
            key={cat.key}
            href={`/gallery?category=${cat.key}`}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: category === cat.key ? '#333' : '#ccc',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            {cat.label}
          </Link>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
        {filteredImages.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Gallery image ${index + 1}`}
            width={400}
            height={300}
            className="gallery-img"
          />
        ))}
      </div>
    </>
  );
}

export default function GalleryPage() {
  return (
    <main>
      <div className="containt" style={{ padding: '2rem' }}>
        <Suspense fallback={<div>Loading...</div>}>
          <GalleryContent />
        </Suspense>
      </div>
    </main>
  );
}