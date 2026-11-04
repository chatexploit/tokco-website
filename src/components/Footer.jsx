import React from 'react';
import { ArrowUp, ArrowUpRight, Heart, MapPin } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-top">
        <div className="footer-brand">
          <a href="#hero" onClick={scrollToTop} className="footer-logo-link" aria-label="TOKCO Home">
            <img
              src="./tokco-logo.png"
              alt="TOKCO Brand Logo"
              width="190"
              height="70"
              className="footer-logo"
            />
          </a>
          <p className="footer-brand-bio">
            <strong>Taste Your Happiness ✨</strong><br />
            Chalakudy’s premier destination for warm chocolate-filled breads, fresh donuts,
            and specialty coffee on Tramway Lane.
          </p>
          <div className="footer-location-line">
            <MapPin size={14} className="pin" />
            <span>Tramway Lane, Chalakudy, Kerala, India</span>
          </div>
        </div>

        <div className="footer-links-grid">
          <div className="footer-col">
            <h4 className="footer-col-title">EXPERIENCE</h4>
            <ul className="footer-nav-list">
              <li><a href="#hero">Welcome</a></li>
              <li><a href="#chocolate">Chocolate Experience</a></li>
              <li><a href="#menu">The Menu</a></li>
              <li><a href="#realtokco">The Real TOKCO</a></li>
              <li><a href="#location">Find Your Happiness</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">VISIT & CONNECT</h4>
            <ul className="footer-nav-list">
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Tramway+Lane+Chalakudy+Kerala"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-external-link"
                >
                  <span>Directions on Google Maps</span>
                  <ArrowUpRight size={13} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/tokco.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-external-link"
                >
                  <span>Instagram @tokco.in</span>
                  <ArrowUpRight size={13} />
                </a>
              </li>
              <li><a href="mailto:hello@tokco.in">hello@tokco.in</a></li>
              <li><span className="domain-pill">tokco.in</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="copyright-text">
          <span>© {new Date().getFullYear()} TOKCO. All rights reserved.</span>
          <span className="footer-divider">•</span>
          <span>Crafted with <Heart size={12} className="heart-icon" /> in Chalakudy, Kerala</span>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className="back-to-top-btn"
          aria-label="Scroll back to top"
        >
          <span>BACK TO TOP</span>
          <ArrowUp size={15} />
        </button>
      </div>
    </footer>
  );
}
