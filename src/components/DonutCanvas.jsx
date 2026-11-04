import React, { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import DonutModel from './DonutModel';
import FallbackDonut from './FallbackDonut';

function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
}

export default function DonutCanvas({ scrollProgress = 0, isMobile = false }) {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isWebGLAvailable()) {
      setHasWebGL(false);
    }
  }, []);

  // Performance: pause rendering loop if canvas is offscreen or page hidden
  useEffect(() => {
    const onVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          setIsVisible(entries[0].isIntersecting && !document.hidden);
        }
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      observer.disconnect();
    };
  }, []);

  if (!hasWebGL) {
    return <FallbackDonut scrollProgress={scrollProgress} />;
  }

  return (
    <div
      ref={containerRef}
      className="donut-canvas-container"
      aria-label="Interactive 3D TOKCO pink-frosted donut. Drag to rotate in 3D or scroll to explore."
      role="img"
    >
      <Canvas
        shadows
        dpr={isMobile ? [1, 1.4] : [1, 1.8]}
        camera={{ fov: isMobile ? 50 : 44, position: [0, 0, 5.2] }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false,
        }}
        frameloop={isVisible ? 'always' : 'never'}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
            setHasWebGL(false);
          });
        }}
      >
        {/* Professional Commercial Food Studio Lighting */}
        <ambientLight intensity={0.78} color="#fff6eb" />

        {/* Warm key light */}
        <directionalLight
          position={[4.5, 7.5, 4.5]}
          intensity={2.2}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        />

        {/* Soft cool fill light */}
        <directionalLight
          position={[-5.5, -2.5, 2.0]}
          intensity={0.85}
          color="#fce7f3"
        />

        {/* Crisp rim highlight */}
        <directionalLight
          position={[0, 5.0, -5.5]}
          intensity={2.4}
          color="#ffffff"
        />

        {/* Catchlight */}
        <pointLight position={[1.5, 2.5, 3.2]} intensity={1.1} color="#ffffff" />

        <Suspense fallback={null}>
          <DonutModel scrollProgress={scrollProgress} isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
