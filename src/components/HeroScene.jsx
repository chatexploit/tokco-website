import React from 'react';
import { ArrowDown, Move, Sparkles } from 'lucide-react';

export default function HeroScene({ onExplore }) {
  return (
    <section id="hero" className="story-scene hero-scene">
      <div className="scene-content">
        <div className="eyebrow-tag">
          <span className="eyebrow-dot"></span>
          <span className="eyebrow-text">THE SWEETER SIDE OF LIFE</span>
        </div>

        <h1 className="hero-title">
          DONUT<br />
          <em>WORRY.</em><br />
          BE HAPPY<span className="accent-dot">.</span>
        </h1>

        <p className="hero-lead">
          Meet <strong>TOKCO</strong>. A playful collision of artisanal pastry,
          vivid optimism, and real photorealistic 3D craft. Don’t just scroll — take a bite.
        </p>

        <div className="hero-button-group">
          <button
            type="button"
            onClick={onExplore}
            className="primary-pill-btn"
            aria-label="Explore the Tokco Story"
          >
            <span>Explore the Story</span>
            <ArrowDown className="btn-icon" size={18} />
          </button>

          <div className="drag-hint-pill">
            <Move size={15} className="hint-icon" />
            <span>Drag donut to spin in 3D</span>
          </div>
        </div>
      </div>

      <div className="scroll-indicator" aria-hidden="true">
        <span className="scroll-text">SCROLL TO EXPLORE</span>
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
      </div>
    </section>
  );
}
