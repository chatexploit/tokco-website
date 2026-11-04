import React from 'react';
import { Sparkles, Heart, Award } from 'lucide-react';

export default function RevealScene() {
  return (
    <section id="reveal" className="story-scene reveal-scene">
      <div className="scene-content">
        <div className="eyebrow-tag">
          <span className="eyebrow-dot"></span>
          <span className="eyebrow-text">01 / THE REVEAL</span>
        </div>

        <h2 className="scene-title">
          ROUND.<br />
          LOUD.<br />
          <em>LOVED.</em>
        </h2>

        <p className="scene-lead">
          Seriously good vibes. Unreasonably delicious aesthetics.
          We believe in bold color, thoughtful pastry craft, and the little everyday rituals
          that make life genuinely taste sweeter.
        </p>

        <div className="feature-grid">
          <div className="feature-card">
            <span className="card-num">01</span>
            <h3 className="card-title">Golden Fried Proof</h3>
            <p className="card-desc">
              Notice the pale white equatorial belt — the unmistakable hallmark of slow, buoyant frying.
            </p>
          </div>

          <div className="feature-card">
            <span className="card-num">02</span>
            <h3 className="card-title">Viscous Berry Glaze</h3>
            <p className="card-desc">
              Thick, organic drips setting into a high-gloss sugar shell that catches studio light.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
