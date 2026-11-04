import React from 'react';

export default function FallbackDonut({ scrollProgress = 0 }) {
  const rot = -25 + scrollProgress * 180;
  return (
    <div className="fallback-canvas-container" aria-hidden="true">
      <div
        className="fallback-donut-wrapper"
        style={{
          transform: `rotate(${rot}deg)`,
        }}
      >
        <div className="fallback-dough">
          <div className="fallback-glaze">
            <div className="fallback-hole"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
