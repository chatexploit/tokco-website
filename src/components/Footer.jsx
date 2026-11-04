import React from 'react';
import { ArrowUp, ArrowUpRight, Heart } from 'lucide-react';

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
            A celebration of vibrant colors, artisanal pastry craft, and the little round moments
            that make life taste sweeter.
          </p>
        </div>

        <div className="footer-links-grid">
          <div className="footer-col">
            <h4 className="footer-col-title">NAVIGATION</h4>
            <ul className="footer-nav-list">
              <li><a href="#hero">Home</a></li>
              <li><a href="#reveal">The Reveal</a></li>
              <li><a href="#craft">Anatomy & Craft</a></li>
              <li><a href="#showcase">Universe</a></li>
              <li><a href="#connect">Connect</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">CONNECT</h4>
            <ul className="footer-nav-list">
              <li>
                <a
                  href="https://www.instagram.com/tokco.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-external-link"
                >
                  <span>Instagram</span>
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
          <span>Made with <Heart size={12} className="heart-icon" /> & sprinkles</span>
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
