import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X, MapPin } from 'lucide-react';

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
          <span>
            ✦ TASTE YOUR HAPPINESS ✨ • TRAMWAY LANE, CHALAKUDY • FRESH CHOCOLATE DONUTS & BUNS DAILY • FOLLOW @TOKCO.IN ✦
          </span>
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
              alt="TOKCO Logo - Taste Your Happiness"
              width="142"
              height="52"
              className="brand-logo"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            <button type="button" onClick={() => scrollTo('hero')} className="nav-item">
              Home
            </button>
            <button type="button" onClick={() => scrollTo('chocolate')} className="nav-item">
              Chocolate Craft
            </button>
            <button type="button" onClick={() => scrollTo('menu')} className="nav-item">
              Menu
            </button>
            <button type="button" onClick={() => scrollTo('realtokco')} className="nav-item">
              The Real TOKCO
            </button>
            <button type="button" onClick={() => scrollTo('location')} className="nav-item">
              Visit Chalakudy
            </button>
          </nav>

          {/* Right Header Actions */}
          <div className="header-actions">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Tramway+Lane+Chalakudy+Kerala"
              target="_blank"
              rel="noopener noreferrer"
              className="location-pill-badge"
              title="Visit our shop at Tramway Lane, Chalakudy"
            >
              <MapPin size={12} className="loc-pin" />
              <span>Chalakudy, Kerala</span>
            </a>

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
                01. Home — Taste Your Happiness
              </button>
              <button
                type="button"
                onClick={() => scrollTo('chocolate')}
                className="mobile-nav-item"
              >
                02. Chocolate Experience
              </button>
              <button
                type="button"
                onClick={() => scrollTo('menu')}
                className="mobile-nav-item"
              >
                03. The TOKCO Menu
              </button>
              <button
                type="button"
                onClick={() => scrollTo('realtokco')}
                className="mobile-nav-item"
              >
                04. The Real TOKCO Store
              </button>
              <button
                type="button"
                onClick={() => scrollTo('location')}
                className="mobile-nav-item"
              >
                05. Find Us in Chalakudy
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
