import React from 'react';
import { ArrowDown, Move, MapPin, Sparkles } from 'lucide-react';

export default function HeroScene({ onExplore }) {
  return (
    <section id="hero" className="story-scene hero-scene">
      <div className="scene-content">
        <div className="eyebrow-tag">
          <MapPin size={13} className="eyebrow-pin" />
          <span className="eyebrow-text">TRAMWAY LANE, CHALAKUDY, KERALA</span>
        </div>

        <h1 className="hero-title">
          TASTE YOUR<br />
          <em>HAPPINESS</em><span className="sparkle-glyph">✨</span>
        </h1>

        <p className="hero-lead">
          Welcome to <strong>TOKCO</strong>. Home of Chalakudy’s viral chocolate donuts,
          warm molten chocolate breads, and handcrafted drinks. Real craft, generous chocolate,
          and pure dessert joy.
        </p>

        <div className="hero-button-group">
          <button
            type="button"
            onClick={onExplore}
            className="primary-pill-btn"
            aria-label="Explore the Chocolate Experience"
          >
            <span>The Chocolate Experience</span>
            <ArrowDown className="btn-icon" size={18} />
          </button>

          <div className="drag-hint-pill">
            <Move size={15} className="hint-icon" />
            <span>Drag 3D chocolate donut to spin</span>
          </div>
        </div>

        <div className="hero-social-proof">
          <span className="proof-avatar-stack">
            <img src="./photos/tokco-customers.jpg" alt="TOKCO customers in Chalakudy" className="avatar-thumb" />
            <img src="./photos/tokco-storefront-day.jpg" alt="TOKCO storefront" className="avatar-thumb" />
          </span>
          <span className="proof-text">
            Loved by <strong>43K+</strong> dessert fans in Kerala
          </span>
        </div>
      </div>

      <div className="scroll-indicator" aria-hidden="true">
        <span className="scroll-text">SCROLL FOR CHOCOLATE</span>
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
      </div>
    </section>
  );
}
