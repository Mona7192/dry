// components/HeroSlider.tsx

'use client';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Image from 'next/image';

const images = [
  '/images/hero1.png',
  '/images/hero2.png',
  '/images/hero3.jpg',
  '/images/hero4.png',
  '/images/hero5.png', // می‌تونی تعداد بیشتری اضافه کنی
];

export default function HeroSlider() {
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 2,
      spacing: 16,
    },
    breakpoints: {
      '(min-width: 768px)': {
        slides: { perView: 3, spacing: 24 },
      },
      '(min-width: 1024px)': {
        slides: { perView: 5, spacing: 32 },
      },
    },
  });

  return (
    <div ref={sliderRef} className="keen-slider w-full ">
      {images.map((src, index) => (
        <div
          key={index}
          className="keen-slider__slide relative h-48 md:h-100 rounded-xl overflow-hidden shadow-md"
        >
          <Image
            src={src}
            alt={`Slide ${index + 1}`}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
