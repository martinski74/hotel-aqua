"use client";
import React from "react";
import Slider from "react-slick";
import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../app/css/slider.css';

const SimpleSlider = () => {
  const { t } = useLanguage();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <div
            className="slider-item"
            style={{ backgroundImage: "url(/images/slider_pic.jpg)" }}
          >
            <div className="slider-content">
              <h2>{t.home.slider.slideOneTitle}</h2>
              <p>{t.home.slider.slideOneText}</p>
              <div className="slider-actions">
                <Link href="/booking" className="btn btn-primary">{t.home.slider.bookNow}</Link>
                <Link href="/gallery?category=hotel" className="btn btn-secondary">{t.home.slider.exploreHotel}</Link>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            className="slider-item"
            style={{ backgroundImage: "url(/images/slider_pic1.jpg)" }}
          >
            <div className="slider-content">
              <h2>{t.home.slider.slideTwoTitle}</h2>
              <p>{t.home.slider.slideTwoText}</p>
              <div className="slider-actions">
                <Link href="/booking" className="btn btn-primary">{t.home.slider.bookNow}</Link>
                <Link href="/gallery?category=restaurant" className="btn btn-secondary">{t.home.slider.exploreRestaurant}</Link>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default SimpleSlider;
