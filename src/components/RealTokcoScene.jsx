import React from 'react';
import { MapPin, Users, Heart, Sparkles, ArrowUpRight } from 'lucide-react';

export default function RealTokcoScene() {
  const photos = [
    {
      src: './photos/tokco-storefront-day.jpg',
      alt: 'TOKCO yellow storefront in Chalakudy with crowd and pink sign',
      caption: 'The Sunshine Cube Storefront',
      tag: 'Tramway Lane',
    },
    {
      src: './photos/tokco-sign-night.jpg',
      alt: 'Glowing pink 3D TOKCO neon signboard at night',
      caption: 'Illuminated 3D Tokco Sign',
      tag: 'Night Vibes',
    },
    {
      src: './photos/tokco-customers.jpg',
      alt: 'Happy customers enjoying TOKCO chocolate donuts on yellow plates',
      caption: 'Fresh Treats on Yellow Plates',
      tag: 'Chalakudy Community',
    },
    {
      src: './photos/tokco-counter.jpg',
      alt: 'TOKCO staff packing orders inside the yellow shop counter',
      caption: 'Behind the Counter',
      tag: 'Handcrafted Daily',
    },
  ];

  return (
    <section id="realtokco" className="story-scene realtokco-scene">
      <div className="scene-content">
        <div className="eyebrow-tag">
          <MapPin size={13} className="eyebrow-pin" />
          <span className="eyebrow-text">04 / THE REAL TOKCO</span>
        </div>

        <h2 className="scene-title">
          BORN ON<br />
          TRAMWAY <em>LANE</em>.
        </h2>

        <p className="scene-lead">
          TOKCO isn’t a concept — it’s a living, breathing dessert landmark in Chalakudy, Kerala.
          From our eye-catching sunshine-yellow facade to the neon-pink dripping sign, every detail
          was built to bring pure happiness to our community.
        </p>

        {/* Real Store & Community Highlights */}
        <div className="real-stats-row">
          <div className="stat-pill">
            <span className="stat-number">43K+</span>
            <span className="stat-label">Instagram Community</span>
          </div>
          <div className="stat-pill">
            <span className="stat-number">92K+</span>
            <span className="stat-label">Viral Reel Likes</span>
          </div>
          <div className="stat-pill">
            <span className="stat-number">100%</span>
            <span className="stat-label">Fresh & Handcrafted</span>
          </div>
        </div>

        {/* Authentic Store Photography Grid */}
        <div className="store-gallery-grid">
          {photos.map((item, index) => (
            <div key={index} className="gallery-photo-card">
              <div className="photo-frame">
                <img src={item.src} alt={item.alt} className="gallery-img" />
                <span className="photo-tag-pill">{item.tag}</span>
              </div>
              <div className="photo-caption-bar">
                <span className="photo-caption-text">{item.caption}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="store-visit-prompt">
          <p>
            Drop by Tramway Lane and experience the warmth in person. The chocolate is always warm,
            and smiles are always on the house.
          </p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Tramway+Lane+Chalakudy+Kerala"
            target="_blank"
            rel="noopener noreferrer"
            className="maps-quick-btn"
          >
            <span>Open in Google Maps</span>
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
