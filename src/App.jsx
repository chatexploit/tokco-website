import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import DonutCanvas from './components/DonutCanvas';
import HeroScene from './components/HeroScene';
import RevealScene from './components/RevealScene';
import CraftScene from './components/CraftScene';
import ShowcaseScene from './components/ShowcaseScene';
import CtaScene from './components/CtaScene';
import Footer from './components/Footer';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollWorldRef = useRef(null);

  // Responsive mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Smooth scroll tracking across the storytelling world
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (scrollWorldRef.current) {
            const rect = scrollWorldRef.current.getBoundingClientRect();
            const totalScrollable = rect.height - window.innerHeight;
            if (totalScrollable > 0) {
              const current = -rect.top;
              const progress = Math.max(0, Math.min(1, current / totalScrollable));
              setScrollProgress(progress);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleExplore = () => {
    const el = document.getElementById('reveal');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="site-wrapper">
      <Header />

      <main id="main-content" className="main-content">
        {/* Storytelling 3D Scroll Container */}
        <div ref={scrollWorldRef} className="scroll-world">
          {/* Pinned Sticky 3D Canvas Viewport */}
          <div className="sticky-3d-viewport">
            {/* Subtle decorative concentric guide rings */}
            <div className="stage-rings" aria-hidden="true">
              <span className="ring ring-1"></span>
              <span className="ring ring-2"></span>
              <span className="ring ring-3"></span>
            </div>

            {/* Photorealistic 3D Donut Canvas */}
            <DonutCanvas scrollProgress={scrollProgress} isMobile={isMobile} />

            {/* Bottom Status / Navigation bar */}
            <div className="viewport-status-bar" aria-hidden="true">
              <span className="status-item">TOKCO.IN • 3D STUDIO</span>
              <div className="scroll-progress-pill">
                <div
                  className="progress-fill"
                  style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                ></div>
              </div>
              <span className="status-item">
                {scrollProgress < 0.25
                  ? 'SCENE 01 / 05'
                  : scrollProgress < 0.5
                  ? 'SCENE 02 / 05'
                  : scrollProgress < 0.75
                  ? 'SCENE 03 / 05'
                  : scrollProgress < 0.95
                  ? 'SCENE 04 / 05'
                  : 'SCENE 05 / 05'}
              </span>
            </div>
          </div>

          {/* Sequential Narrative Scenes */}
          <div className="scenes-flow">
            <HeroScene onExplore={handleExplore} />
            <RevealScene />
            <CraftScene />
            <ShowcaseScene />
            <CtaScene />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
