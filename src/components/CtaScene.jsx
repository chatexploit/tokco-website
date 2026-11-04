import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, Sparkles, Send } from 'lucide-react';
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

export default function CtaScene() {
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
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#FFE600', '#ED1B68', '#FFFFFF', '#00D2FF', '#261520'],
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
    <section id="connect" className="story-scene cta-scene">
      <div className="scene-content">
        <div className="eyebrow-tag">
          <span className="eyebrow-dot"></span>
          <span className="eyebrow-text">04 / STAY IN TOUCH</span>
        </div>

        <h2 className="scene-title">
          DONUT STOP<br />
          THE <em>GOOD VIBES</em>.
        </h2>

        <p className="scene-lead">
          The party continues over on Instagram. Follow <strong>@tokco.in</strong> for
          behind-the-scenes bakery reveals, secret flavor drops, and daily sweetness.
        </p>

        {/* Featured Instagram Callout Box */}
        <div className="instagram-hero-card">
          <div className="card-badge">
            <InstagramIcon size={18} className="badge-icon" />
            <span>OFFICIAL INSTAGRAM</span>
          </div>

          <div className="card-main-action">
            <div className="handle-wrapper">
              <span className="handle-label">Follow us:</span>
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
                <span>Open Profile</span>
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>

          {/* Sweet confetti trigger */}
          <div className="confetti-row">
            <button
              type="button"
              onClick={fireConfetti}
              className="confetti-pill"
              aria-label="Celebrate with sweet sprinkle confetti"
            >
              <Sparkles size={14} />
              <span>Sprinkle Confetti! ✦</span>
            </button>
          </div>
        </div>

        {/* First to Know Newsletter / Drop Alert */}
        <div className="newsletter-card">
          <h3 className="newsletter-title">BE FIRST IN LINE FOR NEW DROPS</h3>
          <p className="newsletter-desc">
            No spam, ever. Only drop announcements and sweet surprises from the TOKCO team.
          </p>

          {subscribed ? (
            <div className="newsletter-success" role="status">
              <Check className="success-icon" size={20} />
              <span>You’re on the VIP drop list! Watch your inbox.</span>
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
              <button type="submit" className="newsletter-submit" aria-label="Subscribe to VIP drop alerts">
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
