import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, Sparkles, MapPin, Navigation, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

function InstagramIcon({ size = 18, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

export default function FindHappinessScene() {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleCopyHandle = () => {
    navigator.clipboard.writeText('@tokco.in');
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const fireConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.7 },
      colors: ['#FFDD09', '#ED1B68', '#5A2E17', '#FFFFFF', '#38BDF8'],
    });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      fireConfetti();
    }
  };

  return (
    <section id="location" className="story-scene location-scene">
      <div className="scene-content">
        <div className="eyebrow-tag">
          <span className="eyebrow-dot"></span>
          <span className="eyebrow-text">05 / VISIT US IN CHALAKUDY</span>
        </div>

        <h2 className="scene-title">
          FIND YOUR<br />
          <em>HAPPINESS</em><span className="sparkle-glyph">✨</span>
        </h2>

        <p className="scene-lead">
          Fresh chocolate donuts, warm chocolate-filled breads, and ice-cold brews are waiting for you.
          Come say hello on Tramway Lane.
        </p>

        {/* Location & Google Maps Card */}
        <div className="visit-location-card">
          <div className="loc-card-header">
            <div className="loc-title-group">
              <span className="loc-tag">FLAGSHIP STORE</span>
              <h3 className="loc-name">TOKCO Chalakudy</h3>
            </div>
            <span className="loc-open-pill">OPEN TODAY</span>
          </div>

          <div className="loc-address-box">
            <MapPin size={20} className="loc-icon" />
            <div>
              <p className="loc-street">Tramway Lane, Chalakudy</p>
              <p className="loc-city">Thrissur District, Kerala, India</p>
            </div>
          </div>

          <div className="loc-actions">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Tramway+Lane+Chalakudy+Kerala"
              target="_blank"
              rel="noopener noreferrer"
              className="directions-btn"
              aria-label="Get directions to TOKCO on Google Maps"
            >
              <Navigation size={16} />
              <span>Get Directions</span>
              <ArrowUpRight size={16} />
            </a>

            <button
              type="button"
              onClick={fireConfetti}
              className="celebrate-pill-btn"
              aria-label="Celebrate with sprinkle confetti"
            >
              <Sparkles size={15} />
              <span>Celebrate! ✦</span>
            </button>
          </div>
        </div>

        {/* Instagram Profile Card */}
        <div className="instagram-hero-card">
          <div className="card-badge">
            <InstagramIcon size={18} className="badge-icon" />
            <span>CONNECT WITH 43K+ FOLLOWERS</span>
          </div>

          <div className="card-main-action">
            <div className="handle-wrapper">
              <span className="handle-label">Instagram:</span>
              <span className="handle-text">@tokco.in</span>
            </div>

            <div className="handle-actions">
              <button
                type="button"
                onClick={handleCopyHandle}
                className="copy-btn"
                aria-label="Copy Instagram handle @tokco.in"
                title="Copy Handle"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>

              <a
                href="https://www.instagram.com/tokco.in/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={fireConfetti}
                className="visit-ig-btn"
                aria-label="Visit Instagram page @tokco.in (opens in new tab)"
              >
                <span>Follow @tokco.in</span>
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </div>

        {/* VIP Drop Alerts Form */}
        <div className="newsletter-card">
          <h3 className="newsletter-title">BE FIRST IN LINE FOR SPECIAL DROPS</h3>
          <p className="newsletter-desc">
            Get notified for weekend secret chocolate batches and new shop announcements.
          </p>

          {subscribed ? (
            <div className="newsletter-success" role="status">
              <Check className="success-icon" size={20} />
              <span>You're on the TOKCO VIP list! Watch your inbox.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="newsletter-input"
                aria-label="Email address for VIP drop list"
              />
              <button type="submit" className="newsletter-submit" aria-label="Join VIP list">
                <span>Join</span>
                <Send size={15} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
