import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X, Sparkles } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="announcement-bar" role="region" aria-label="Announcement">
        <div className="announcement-track">
          <span>✦ A LITTLE ROUND • A LOT OF HAPPY • SWEET VIBES ONLY • TOKCO.IN ✦</span>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className={`site-header ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="header-inner">
          {/* Logo with original proportions preserved */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('hero');
            }}
            className="logo-anchor"
            aria-label="TOKCO Home, scroll to top"
          >
            <img
              src="./tokco-logo.png"
              alt="TOKCO Brand Logo"
              width="140"
              height="51"
              className="brand-logo"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            <button type="button" onClick={() => scrollTo('hero')} className="nav-item">
              Home
            </button>
            <button type="button" onClick={() => scrollTo('reveal')} className="nav-item">
              The Reveal
            </button>
            <button type="button" onClick={() => scrollTo('craft')} className="nav-item">
              Anatomy & Craft
            </button>
            <button type="button" onClick={() => scrollTo('showcase')} className="nav-item">
              Universe
            </button>
            <button type="button" onClick={() => scrollTo('connect')} className="nav-item">
              Connect
            </button>
          </nav>

          {/* Right Header Actions */}
          <div className="header-actions">
            <div className="status-badge" title="Real-time WebGL Donut active">
              <span className="status-dot"></span>
              <span className="status-text">3D LIVE</span>
            </div>

            <a
              href="https://www.instagram.com/tokco.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-btn"
              aria-label="Follow TOKCO on Instagram @tokco.in (opens in new tab)"
            >
              <span>@tokco.in</span>
              <ArrowUpRight className="icon-arrow" size={16} />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="mobile-menu-toggle"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-drawer" role="dialog" aria-modal="true">
            <nav className="mobile-drawer-nav">
              <button
                type="button"
                onClick={() => scrollTo('hero')}
                className="mobile-nav-item"
              >
                01. Home
              </button>
              <button
                type="button"
                onClick={() => scrollTo('reveal')}
                className="mobile-nav-item"
              >
                02. The Reveal
              </button>
              <button
                type="button"
                onClick={() => scrollTo('craft')}
                className="mobile-nav-item"
              >
                03. Anatomy & Craft
              </button>
              <button
                type="button"
                onClick={() => scrollTo('showcase')}
                className="mobile-nav-item"
              >
                04. The Universe
              </button>
              <button
                type="button"
                onClick={() => scrollTo('connect')}
                className="mobile-nav-item"
              >
                05. Connect & Follow
              </button>
            </nav>

            <div className="mobile-drawer-footer">
              <a
                href="https://www.instagram.com/tokco.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-instagram-cta"
              >
                <span>Follow @tokco.in on Instagram</span>
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
