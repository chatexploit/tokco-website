import React, { useState } from 'react';
import { Eye, Layers, Sparkles, CircleDot } from 'lucide-react';

export default function CraftScene() {
  const [activeTab, setActiveTab] = useState(0);

  const anatomyPoints = [
    {
      id: 'glaze',
      title: 'Raspberry Sugar Glaze',
      subtitle: 'Viscous, high-gloss dip',
      desc: 'Formulated with authentic organic drip lobes that cascade organically across the pastry curve. Features physical clearcoat refraction and realistic specular bounce.',
      badge: 'Specular PBR',
    },
    {
      id: 'crumb',
      title: 'Baked Pastry Dough',
      subtitle: 'Golden baked crumb & fry ring',
      desc: 'Crafted with microscopic surface porosity and warm amber undertones. The pale equatorial band reflects genuine oil buoyancy during artisanal preparation.',
      badge: 'Organic Geometry',
    },
    {
      id: 'sprinkles',
      title: 'Sugar Confetti Sprinkles',
      subtitle: 'Scattered pops of crisp joy',
      desc: 'Individual pill capsules distributed along surface normal vectors with varying planar orientations in Tokco Butter Yellow, Magenta, and Sugar White.',
      badge: 'Dynamic Particles',
    },
  ];

  return (
    <section id="craft" className="story-scene craft-scene">
      <div className="scene-content">
        <div className="eyebrow-tag">
          <span className="eyebrow-dot"></span>
          <span className="eyebrow-text">02 / ANATOMY & DETAILS</span>
        </div>

        <h2 className="scene-title">
          THE ART OF<br />
          THE <em>CLOSE-UP</em>.
        </h2>

        <p className="scene-lead">
          Real craft lives in the micro-details. Rotate the 3D donut to inspect
          the glistening glaze ridges, the baked bread porosity, and the irregular sprinkle distribution.
        </p>

        {/* Interactive Anatomy Selectors */}
        <div className="anatomy-tabs" role="tablist" aria-label="Donut Anatomy Details">
          {anatomyPoints.map((point, index) => (
            <button
              key={point.id}
              role="tab"
              aria-selected={activeTab === index}
              className={`anatomy-tab-btn ${activeTab === index ? 'tab-active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              <div className="tab-header">
                <span className="tab-num">0{index + 1}</span>
                <span className="tab-badge">{point.badge}</span>
              </div>
              <h3 className="tab-title">{point.title}</h3>
              <p className="tab-desc">{point.desc}</p>
            </button>
          ))}
        </div>

        <div className="disclaimer-pill">
          <CircleDot size={13} className="disclaimer-icon" />
          <span>Illustrative 3D visualization. Real-time WebGL materials and physical lighting.</span>
        </div>
      </div>
    </section>
  );
}
