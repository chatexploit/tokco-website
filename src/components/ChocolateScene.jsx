import React from 'react';
import { Sparkles, Heart, Droplets, CheckCircle2 } from 'lucide-react';

export default function ChocolateScene() {
  return (
    <section id="chocolate" className="story-scene chocolate-scene">
      <div className="scene-content">
        <div className="eyebrow-tag">
          <span className="eyebrow-dot"></span>
          <span className="eyebrow-text">02 / THE CHOCOLATE EXPERIENCE</span>
        </div>

        <h2 className="scene-title">
          MADE FOR YOUR<br />
          <em>CHOCOLATE</em><br />
          CRAVINGS.
        </h2>

        <p className="scene-lead">
          Every TOKCO donut begins with patient, slow-fermented yeast dough fried to a tender golden crust,
          then hand-dipped into our signature luscious milk-chocolate glaze with colorful confetti sprinkles.
          Generous, unhurried, and made fresh daily in Chalakudy.
        </p>

        <div className="chocolate-features-grid">
          <div className="choco-card">
            <div className="choco-card-header">
              <span className="choco-badge">01</span>
              <Droplets size={18} className="choco-icon" />
            </div>
            <h3 className="choco-title">Rich Milk-Chocolate Glaze</h3>
            <p className="choco-desc">
              Poured warm and thick, setting into a mirror-glossy chocolate shell with authentic dipping lobes.
            </p>
          </div>

          <div className="choco-card">
            <div className="choco-card-header">
              <span className="choco-badge">02</span>
              <Sparkles size={18} className="choco-icon" />
            </div>
            <h3 className="choco-title">Golden Proof Ring</h3>
            <p className="choco-desc">
              Notice the light blonde equatorial belt — proof of buoyant, authentic yeast-dough frying.
            </p>
          </div>
        </div>

        <div className="real-donut-reference-pill">
          <CheckCircle2 size={15} className="ref-check" />
          <span>Real-time 3D model accurately matched to TOKCO's hand-dipped Chalakudy donuts.</span>
        </div>
      </div>
    </section>
  );
}
