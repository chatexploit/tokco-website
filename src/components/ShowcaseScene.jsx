import React from 'react';
import { ArrowUpRight, Flame, Smile, Sparkles } from 'lucide-react';

export default function ShowcaseScene() {
  const moods = [
    {
      num: '01',
      title: 'Pink Obsession',
      tagline: 'SWEET WITH ATTITUDE',
      desc: 'The signature raspberry glaze that sets the tone for everything we create. Playful, unapologetic, and undeniably photogenic.',
      bgClass: 'card-pink',
      icon: <Flame size={20} />,
      colorBadge: '#ED1B68',
    },
    {
      num: '02',
      title: 'Good Mood Food',
      tagline: 'SMILES ON THE HOUSE',
      desc: 'Warm baked aromatics, bright morning sunshine, and an instant lift for any cloudy day. Pure sensory dopamine.',
      bgClass: 'card-yellow',
      icon: <Smile size={20} />,
      colorBadge: '#FFDD09',
    },
    {
      num: '03',
      title: 'Extra Everything',
      tagline: 'MORE IS MORE',
      desc: 'Double-glazed finishes, crunchy sprinkle cascades, and uncompromising indulgence for those who never settle for subtle.',
      bgClass: 'card-cream',
      icon: <Sparkles size={20} />,
      colorBadge: '#FFF8E9',
    },
  ];

  return (
    <section id="showcase" className="story-scene showcase-scene">
      <div className="scene-content">
        <div className="eyebrow-tag">
          <span className="eyebrow-dot"></span>
          <span className="eyebrow-text">03 / THE TOKCO UNIVERSE</span>
        </div>

        <h2 className="scene-title">
          MOODS OF<br />
          <em>TOKCO.</em>
        </h2>

        <p className="scene-lead">
          Three vibrant energies, one continuous obsession with joy.
          A sneak peek into our creative flavour laboratory.
        </p>

        {/* Editorial Product Showcase Cards */}
        <div className="showcase-cards-grid">
          {moods.map((m) => (
            <article key={m.num} className={`editorial-card ${m.bgClass}`}>
              <div className="card-top">
                <span className="card-index">{m.num}</span>
                <span className="card-icon-wrap" style={{ color: m.colorBadge }}>
                  {m.icon}
                </span>
              </div>

              {/* Maintainable photo container for future real photography */}
              <div className="card-visual-frame" aria-label={`Preview of ${m.title}`}>
                <div className="visual-graphic-donut">
                  <div className="graphic-inner-circle"></div>
                </div>
              </div>

              <div className="card-bottom">
                <span className="card-tagline">{m.tagline}</span>
                <h3 className="card-headline">{m.title}</h3>
                <p className="card-explanation">{m.desc}</p>

                <a
                  href="https://www.instagram.com/tokco.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-explore-link"
                >
                  <span>Explore drop on IG</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="showcase-disclaimer">
          Illustrative brand showcase. Drop schedules, exclusive seasonal flavors, and bakery
          announcements are confirmed exclusively via our official Instagram{' '}
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
