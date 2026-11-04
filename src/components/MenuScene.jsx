import React, { useState } from 'react';
import { ArrowUpRight, Coffee, Cookie, Sparkles } from 'lucide-react';

export default function MenuScene() {
  const [activeCategory, setActiveCategory] = useState('donuts');

  const categories = [
    {
      id: 'donuts',
      name: 'Donuts',
      tagline: 'HAND-DIPPED & FRESH',
      icon: <Cookie size={18} />,
      photo: './photos/real-chocolate-donut.jpg',
      alt: 'Real TOKCO chocolate glazed donut on yellow plate in Chalakudy',
      headline: 'Signature Chocolate Donuts',
      description:
        'Our famous golden yeast donuts, dipped in warm rich milk chocolate with delicate pastel sprinkles. Crisp exterior, cloud-soft interior.',
      highlights: ['Freshly glazed daily', 'Light buoyant proofing', 'Signature chocolate coating'],
    },
    {
      id: 'breads',
      name: 'Chocolate Breads',
      tagline: 'MOLTEN CHOCOLATE CENTERS',
      icon: <Sparkles size={18} />,
      photo: './photos/chocolate-buns.jpg',
      alt: 'TOKCO chocolate-filled buns with molten chocolate center',
      headline: 'Warm Chocolate-Filled Buns',
      description:
        'Soft golden brioche buns baked to perfection and generously filled with warm, molten chocolate. The viral sensation of Chalakudy.',
      highlights: ['Warm oozing chocolate', 'Freshly baked buns', 'Chalakudy favourite'],
    },
    {
      id: 'coffee',
      name: 'Coffee & Drinks',
      tagline: 'CHILLED BREWS & SHAKES',
      icon: <Coffee size={18} />,
      photo: './photos/tokco-counter.jpg',
      alt: 'TOKCO shop counter and drink service in Chalakudy',
      headline: 'Cold Coffee & Signature Shakes',
      description:
        'Handcrafted cold brews, creamy chocolate shakes, and specialty beverages crafted to pair perfectly with warm donuts and chocolate breads.',
      highlights: ['Creamy Cold Coffee', 'Rich Chocolate Shakes', 'Refreshing pairs'],
    },
  ];

  const current = categories.find((c) => c.id === activeCategory) || categories[0];

  return (
    <section id="menu" className="story-scene menu-scene">
      <div className="scene-content">
        <div className="eyebrow-tag">
          <span className="eyebrow-dot"></span>
          <span className="eyebrow-text">03 / THE TOKCO MENU</span>
        </div>

        <h2 className="scene-title">
          WHAT WE<br />
          <em>CRAFT</em> BEST.
        </h2>

        <p className="scene-lead">
          Three signature pillars of happiness. Handcrafted at our Tramway Lane shop
          with generous chocolate and genuine love for the craft.
        </p>

        {/* Category Selector Tabs */}
        <div className="menu-tabs-bar" role="tablist" aria-label="TOKCO Menu Categories">
          {categories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`menu-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.icon}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Active Product Feature Card with Real Photography */}
        <div className="active-menu-card">
          <div className="menu-card-image-wrap">
            <img src={current.photo} alt={current.alt} className="menu-card-img" />
            <span className="authentic-badge">AUTHENTIC PHOTO</span>
          </div>

          <div className="menu-card-info">
            <span className="menu-category-tag">{current.tagline}</span>
            <h3 className="menu-item-title">{current.headline}</h3>
            <p className="menu-item-desc">{current.description}</p>

            <ul className="menu-highlights-list">
              {current.highlights.map((h, i) => (
                <li key={i}>
                  <span className="highlight-bullet">✦</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <a
              href="https://www.instagram.com/tokco.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="menu-ig-link"
            >
              <span>See daily batches on Instagram</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <p className="menu-disclaimer-note">
          Real photography from TOKCO, Tramway Lane, Chalakudy. Daily flavours and fresh drop timings are
          announced live on{' '}
          <a
            href="https://www.instagram.com/tokco.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-link"
          >
            @tokco.in
          </a>
          .
        </p>
      </div>
    </section>
  );
}
