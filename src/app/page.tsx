"use client";
import Image from 'next/image';
import Link from 'next/link';
import SimpleSlider from '../components/Slider';
import { useLanguage } from '@/i18n/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      <SimpleSlider />

      <section className="home-info-wrap">
        <div className="home-info-grid">
          <article className="home-card">
            <h2>{t.home.title}</h2>
            <p>{t.home.description}</p>
            <p>{t.home.opened}</p>
            <p>{t.home.staff}</p>
            <div className="home-badges">
              <span>{t.home.badges.nearBeach}</span>
              <span>{t.home.badges.familyFriendly}</span>
              <span>{t.home.badges.freeWifi}</span>
            </div>
          </article>

          <article className="home-card room-info">
            <h2>{t.home.everyRoomHas}</h2>
            <ul>
              <li><i className="fa fa-check-circle" aria-hidden="true"></i>{t.home.amenities.bathroom}</li>
              <li><i className="fa fa-check-circle" aria-hidden="true"></i>{t.home.amenities.cableTv}</li>
              <li><i className="fa fa-check-circle" aria-hidden="true"></i>{t.home.amenities.refrigerator}</li>
              <li><i className="fa fa-check-circle" aria-hidden="true"></i>{t.home.amenities.airConditioner}</li>
              <li><i className="fa fa-check-circle" aria-hidden="true"></i>{t.home.amenities.safe}</li>
              <li><i className="fa fa-check-circle" aria-hidden="true"></i>{t.home.amenities.balconySeaView}</li>
            </ul>
          </article>

          <article className="home-card offers-card">
            <h2>{t.home.topOffers}</h2>
            <p>{t.home.offersDescription}</p>
            <Link href="/booking" className="offers-cta">{t.home.bookNow}</Link>
          </article>
        </div>
      </section>

      <section className="category-content">
        <Link href="/gallery?category=rooms" className="category-card">
          <Image src="/images/rooms/room3.jpg" alt="room" width={400} height={300} />
          <span>{t.home.rooms}</span>
        </Link>
        <Link href="/gallery?category=restaurant" className="category-card">
          <Image src="/images/resataurant/BIG_hotel1.jpg" alt="Restaurant" width={400} height={300} />
          <span>{t.home.restaurant}</span>
        </Link>
        <Link href="/gallery?category=kiten" className="category-card">
          <Image src="/images/kiten/kiten.jpg" alt="sea" width={400} height={300} />
          <span>{t.home.resort}</span>
        </Link>
      </section>
    </>
  );
}
