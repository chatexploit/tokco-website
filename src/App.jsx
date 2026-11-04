import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import DonutCanvas from './components/DonutCanvas';
import HeroScene from './components/HeroScene';
import ChocolateScene from './components/ChocolateScene';
import MenuScene from './components/MenuScene';
import RealTokcoScene from './components/RealTokcoScene';
import FindHappinessScene from './components/FindHappinessScene';
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
    const el = document.getElementById('chocolate');
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

            {/* Photorealistic 3D Chocolate Donut Canvas */}
            <DonutCanvas scrollProgress={scrollProgress} isMobile={isMobile} />

            {/* Bottom Status / Navigation bar */}
            <div className="viewport-status-bar" aria-hidden="true">
              <span className="status-item">TOKCO • CHALAKUDY, KERALA</span>
              <div className="scroll-progress-pill">
                <div
                  className="progress-fill"
                  style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                ></div>
              </div>
              <span className="status-item">
                {scrollProgress < 0.25
                  ? '01 / WELCOME'
                  : scrollProgress < 0.5
                  ? '02 / CHOCOLATE'
                  : scrollProgress < 0.75
                  ? '03 / THE MENU'
                  : scrollProgress < 0.95
                  ? '04 / REAL STORE'
                  : '05 / VISIT US'}
              </span>
            </div>
          </div>

          {/* Sequential Narrative Scenes */}
          <div className="scenes-flow">
            <HeroScene onExplore={handleExplore} />
            <ChocolateScene />
            <MenuScene />
            <RealTokcoScene />
            <FindHappinessScene />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
