import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import {
  createDoughTexture,
  createDoughBumpMap,
  createChocolateGlazeBumpMap,
} from '../utils/textureGenerator';

// Authentic pastel sprinkle palette matching the real TOKCO chocolate donut (ref-3)
const REAL_TOKCO_SPRINKLES = [
  '#38BDF8', // Sky Blue
  '#FDE047', // Sunshine Yellow
  '#FFFFFF', // Sugar White
  '#F472B6', // Pastel Pink
  '#A3E635', // Fresh Lime
];

/**
 * Builds realistic parametric dough geometry with organic baked rise variations.
 */
function createBakedDoughGeometry(R = 1.45, r = 0.68, tubularSegments = 96, radialSegments = 48) {
  const geom = new THREE.BufferGeometry();
  const positions = [];
  const normals = [];
  const uvs = [];
  const indices = [];

  const TAU = Math.PI * 2;

  for (let j = 0; j <= radialSegments; j++) {
    const v = (j / radialSegments) * TAU;
    const cosV = Math.cos(v);
    const sinV = Math.sin(v);

    for (let i = 0; i <= tubularSegments; i++) {
      const u = (i / tubularSegments) * TAU;
      const cosU = Math.cos(u);
      const sinU = Math.sin(u);

      // Organic low-frequency dough rise variations (natural proofed pastry lumpiness)
      const organicNoise =
        0.024 * Math.sin(5 * u) * Math.cos(3 * v) +
        0.012 * Math.sin(11 * u + 1.2) +
        0.008 * Math.cos(17 * u - 0.7) * Math.sin(2 * v);

      const currentR = r + organicNoise;

      const x = (R + currentR * cosV) * cosU;
      const y = (R + currentR * cosV) * sinU;
      const z = currentR * sinV;

      positions.push(x, y, z);

      // Normal
      const nx = cosV * cosU;
      const ny = cosV * sinU;
      const nz = sinV;
      normals.push(nx, ny, nz);

      uvs.push(i / tubularSegments, j / radialSegments);
    }
  }

  for (let j = 0; j < radialSegments; j++) {
    for (let i = 0; i < tubularSegments; i++) {
      const a = (tubularSegments + 1) * j + i;
      const b = (tubularSegments + 1) * (j + 1) + i;
      const c = (tubularSegments + 1) * (j + 1) + (i + 1);
      const d = (tubularSegments + 1) * j + (i + 1);

      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geom.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geom.setIndex(indices);
  geom.computeVertexNormals();

  return geom;
}

/**
 * Builds a physical dripping chocolate glaze layer draped over the upper donut.
 */
function createChocolateGlazeGeometry(R = 1.45, r = 0.68, tubularSegments = 120, radialSegments = 32) {
  const geom = new THREE.BufferGeometry();
  const positions = [];
  const normals = [];
  const uvs = [];
  const indices = [];

  const TAU = Math.PI * 2;

  for (let i = 0; i <= tubularSegments; i++) {
    const u = (i / tubularSegments) * TAU;
    const cosU = Math.cos(u);
    const sinU = Math.sin(u);

    // Drip wave contour along the outer skirt (natural dipping lobes)
    const outerDrip =
      0.22 * Math.sin(7 * u + 0.4) +
      0.13 * Math.cos(13 * u - 0.8) +
      0.08 * Math.sin(19 * u + 1.5) +
      0.04 * Math.cos(29 * u);

    // Inner rim wave
    const innerWave = 0.08 * Math.sin(5 * u) + 0.04 * Math.cos(11 * u);

    // Angle coverage: from inner rim (approx -0.18 rad) to outer dripping edge
    const vStart = -0.18 + innerWave;
    const vEnd = Math.PI + 0.18 + outerDrip;

    for (let j = 0; j <= radialSegments; j++) {
      const frac = j / radialSegments;
      const v = vStart + frac * (vEnd - vStart);
      const cosV = Math.cos(v);
      const sinV = Math.sin(v);

      // Viscous chocolate thickness offset: thick crown, rounded bead meniscus along edge
      const edgeFalloff = Math.sin(frac * Math.PI);
      const thickness = 0.016 + 0.046 * Math.pow(edgeFalloff, 0.45);

      const effectiveR = r + thickness;

      const x = (R + effectiveR * cosV) * cosU;
      const y = (R + effectiveR * cosV) * sinU;
      const z = effectiveR * sinV;

      positions.push(x, y, z);

      // Approximate normal pointing outward
      const nx = cosV * cosU;
      const ny = cosV * sinU;
      const nz = sinV;
      normals.push(nx, ny, nz);

      uvs.push(i / tubularSegments, frac);
    }
  }

  for (let i = 0; i < tubularSegments; i++) {
    for (let j = 0; j < radialSegments; j++) {
      const a = i * (radialSegments + 1) + j;
      const b = (i + 1) * (radialSegments + 1) + j;
      const c = (i + 1) * (radialSegments + 1) + (j + 1);
      const d = i * (radialSegments + 1) + (j + 1);

      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geom.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geom.setIndex(indices);
  geom.computeVertexNormals();

  return geom;
}

/**
 * Generates randomly scattered pastel sprinkles adhering to the chocolate glaze.
 */
function createSprinkleData(count = 160, R = 1.45, r = 0.68) {
  const data = [];
  let seed = 84729;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  const TAU = Math.PI * 2;

  for (let k = 0; k < count; k++) {
    const u = rnd() * TAU;
    // Concentrate sprinkles on the upper curved arch of the chocolate glaze
    const v = 0.38 + rnd() * (Math.PI - 0.76);

    // Glaze elevation
    const effectiveR = r + 0.052;

    const cosU = Math.cos(u);
    const sinU = Math.sin(u);
    const cosV = Math.cos(v);
    const sinV = Math.sin(v);

    const x = (R + effectiveR * cosV) * cosU;
    const y = (R + effectiveR * cosV) * sinU;
    const z = effectiveR * sinV;

    // Normal at surface
    const normal = new THREE.Vector3(cosV * cosU, cosV * sinU, sinV).normalize();

    // Tangent vectors for planar orientation
    const tangentU = new THREE.Vector3(-sinU, cosU, 0).normalize();
    const tangentV = new THREE.Vector3().crossVectors(normal, tangentU).normalize();

    // Random sprinkle orientation angle
    const angle = rnd() * Math.PI;
    const dir = new THREE.Vector3()
      .addScaledVector(tangentU, Math.cos(angle))
      .addScaledVector(tangentV, Math.sin(angle))
      .normalize();

    // Quaternion aligning cylinder Y axis to sprinkle direction
    const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);

    const color = REAL_TOKCO_SPRINKLES[k % REAL_TOKCO_SPRINKLES.length];
    const length = 0.08 + rnd() * 0.04;
    const radius = 0.018 + rnd() * 0.005;

    data.push({
      position: [x, y, z],
      quaternion: quat,
      color,
      scale: [radius, length, radius],
    });
  }

  return data;
}

export default function DonutModel({ scrollProgress = 0, isMobile = false }) {
  const groupRef = useRef();
  const innerRef = useRef();
  const { gl } = useThree();

  // Drag interaction state
  const isDragging = useRef(false);
  const prevPointer = useRef({ x: 0, y: 0 });
  const dragVelocity = useRef({ x: 0, y: 0 });
  const dragRotation = useRef({ x: 0, y: 0 });
  const hoverParallax = useRef({ x: 0, y: 0 });

  // Procedural textures
  const doughTexture = useMemo(() => createDoughTexture(), []);
  const doughBump = useMemo(() => createDoughBumpMap(), []);
  const chocolateBump = useMemo(() => createChocolateGlazeBumpMap(), []);

  // Geometries
  const doughGeom = useMemo(() => createBakedDoughGeometry(), []);
  const glazeGeom = useMemo(() => createChocolateGlazeGeometry(), []);
  const sprinkles = useMemo(() => createSprinkleData(isMobile ? 95 : 160), [isMobile]);

  // Sprinkle shared geometry & materials
  const sprinkleGeom = useMemo(() => new THREE.CylinderGeometry(1, 1, 1, 8), []);
  const sprinkleMaterials = useMemo(() => {
    return REAL_TOKCO_SPRINKLES.map(
      (color) =>
        new THREE.MeshStandardMaterial({
          color,
          roughness: 0.22,
          metalness: 0.04,
        })
    );
  }, []);

  // Pointer drag listeners
  useEffect(() => {
    const canvas = gl.domElement;
    if (!canvas) return;

    const onPointerDown = (e) => {
      isDragging.current = true;
      prevPointer.current = { x: e.clientX, y: e.clientY };
      canvas.style.cursor = 'grabbing';
      if (e.pointerId) canvas.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging.current) {
        const dx = e.clientX - prevPointer.current.x;
        const dy = e.clientY - prevPointer.current.y;
        prevPointer.current = { x: e.clientX, y: e.clientY };

        dragVelocity.current.x = dx * 0.007;
        dragVelocity.current.y = dy * 0.007;

        dragRotation.current.y += dragVelocity.current.x;
        dragRotation.current.x += dragVelocity.current.y;
      } else {
        // Subtle hover parallax when idle
        hoverParallax.current.x = nx * 0.15;
        hoverParallax.current.y = ny * 0.15;
      }
    };

    const onPointerUp = (e) => {
      isDragging.current = false;
      canvas.style.cursor = 'grab';
      if (e.pointerId) {
        try {
          canvas.releasePointerCapture(e.pointerId);
        } catch (_) {}
      }
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    return () => {
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };
  }, [gl]);

  // Clean up
  useEffect(() => {
    return () => {
      doughTexture?.dispose();
      doughBump?.dispose();
      chocolateBump?.dispose();
      doughGeom?.dispose();
      glazeGeom?.dispose();
      sprinkleGeom?.dispose();
      sprinkleMaterials.forEach((m) => m.dispose());
    };
  }, [doughTexture, doughBump, chocolateBump, doughGeom, glazeGeom, sprinkleGeom, sprinkleMaterials]);

  // Animation frame loop with smooth lerping across 5 scenes
  useFrame((state) => {
    if (!groupRef.current || !innerRef.current) return;

    // Apply drag inertia with decaying velocity
    if (!isDragging.current) {
      dragRotation.current.y += dragVelocity.current.x;
      dragRotation.current.x += dragVelocity.current.y;
      dragVelocity.current.x *= 0.93;
      dragVelocity.current.y *= 0.93;
    }

    const p = Math.max(0, Math.min(1, scrollProgress));

    let targetX = 0;
    let targetY = 0;
    let targetZ = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let targetRotZ = 0;
    let targetScale = 1.0;

    const t = state.clock.getElapsedTime();
    const floatY = Math.sin(t * 1.4) * 0.05;
    const floatRot = Math.cos(t * 0.9) * 0.03;

    if (isMobile) {
      // Mobile choreography: centers donut in top half so text below remains completely clear
      if (p < 0.25) {
        const u = p / 0.25;
        targetX = 0;
        targetY = 0.55 + floatY;
        targetZ = -0.3;
        targetRotX = 0.45 + u * 0.4;
        targetRotY = -0.3 + u * 1.5;
        targetRotZ = -0.2;
        targetScale = 0.72;
      } else if (p < 0.5) {
        const u = (p - 0.25) / 0.25;
        targetX = 0;
        targetY = 0.5 + floatY;
        targetZ = -0.1;
        targetRotX = 0.85 + u * 0.3;
        targetRotY = 1.2 + u * 1.8;
        targetRotZ = -0.2;
        targetScale = 0.78;
      } else if (p < 0.75) {
        const u = (p - 0.5) / 0.25;
        targetX = 0;
        targetY = 0.45 + floatY;
        targetZ = 0.1;
        targetRotX = 1.15 - u * 0.6;
        targetRotY = 3.0 + u * 1.6;
        targetRotZ = 0;
        targetScale = 0.82;
      } else {
        const u = (p - 0.75) / 0.25;
        targetX = 0;
        targetY = 0.4 + floatY;
        targetZ = 0;
        targetRotX = 0.55 + floatRot;
        targetRotY = 4.6 + u * 1.68;
        targetRotZ = 0;
        targetScale = 0.75;
      }
    } else {
      // Desktop choreography
      if (p < 0.25) {
        // Scene 1: Welcome to TOKCO
        const u = p / 0.25;
        targetX = THREE.MathUtils.lerp(0.85, 0.4, u);
        targetY = THREE.MathUtils.lerp(-0.05, 0.05, u) + floatY;
        targetZ = THREE.MathUtils.lerp(0.2, 0.5, u);
        targetRotX = THREE.MathUtils.lerp(0.38, 0.95, u);
        targetRotY = THREE.MathUtils.lerp(-0.45, 1.35, u);
        targetRotZ = THREE.MathUtils.lerp(-0.15, 0.2, u);
        targetScale = THREE.MathUtils.lerp(1.0, 1.15, u);
      } else if (p < 0.5) {
        // Scene 2: Chocolate Experience (zoom in close!)
        const u = (p - 0.25) / 0.25;
        targetX = THREE.MathUtils.lerp(0.4, -0.65, u);
        targetY = THREE.MathUtils.lerp(0.05, -0.1, u) + floatY;
        targetZ = THREE.MathUtils.lerp(0.5, 0.92, u);
        targetRotX = THREE.MathUtils.lerp(0.95, 1.25, u);
        targetRotY = THREE.MathUtils.lerp(1.35, 2.9, u);
        targetRotZ = THREE.MathUtils.lerp(0.2, -0.1, u);
        targetScale = THREE.MathUtils.lerp(1.15, 1.35, u);
      } else if (p < 0.75) {
        // Scene 3: The TOKCO Menu & Showcase
        const u = (p - 0.5) / 0.25;
        targetX = THREE.MathUtils.lerp(-0.65, 1.15, u);
        targetY = THREE.MathUtils.lerp(-0.1, 0.0, u) + floatY;
        targetZ = THREE.MathUtils.lerp(0.92, 0.1, u);
        targetRotX = THREE.MathUtils.lerp(1.25, 0.45, u);
        targetRotY = THREE.MathUtils.lerp(2.9, 4.7, u);
        targetRotZ = THREE.MathUtils.lerp(-0.1, 0.25, u);
        targetScale = THREE.MathUtils.lerp(1.35, 0.95, u);
      } else {
        // Scene 4 & 5: Real TOKCO & Find Your Happiness
        const u = (p - 0.75) / 0.25;
        targetX = THREE.MathUtils.lerp(1.15, 0.0, u);
        targetY = THREE.MathUtils.lerp(0.0, 0.15, u) + floatY;
        targetZ = THREE.MathUtils.lerp(0.1, 0.35, u);
        targetRotX = THREE.MathUtils.lerp(0.45, 0.52, u) + floatRot;
        targetRotY = THREE.MathUtils.lerp(4.7, 6.28, u);
        targetRotZ = THREE.MathUtils.lerp(0.25, 0.0, u);
        targetScale = THREE.MathUtils.lerp(0.95, 1.1, u);
      }
    }

    const lerpFactor = 0.085;
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * lerpFactor;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * lerpFactor;
    groupRef.current.position.z += (targetZ - groupRef.current.position.z) * lerpFactor;

    groupRef.current.scale.x += (targetScale - groupRef.current.scale.x) * lerpFactor;
    groupRef.current.scale.y += (targetScale - groupRef.current.scale.y) * lerpFactor;
    groupRef.current.scale.z += (targetScale - groupRef.current.scale.z) * lerpFactor;

    const finalRotX = targetRotX + dragRotation.current.x + hoverParallax.current.y;
    const finalRotY = targetRotY + dragRotation.current.y + hoverParallax.current.x;
    const finalRotZ = targetRotZ;

    innerRef.current.rotation.x += (finalRotX - innerRef.current.rotation.x) * lerpFactor;
    innerRef.current.rotation.y += (finalRotY - innerRef.current.rotation.y) * lerpFactor;
    innerRef.current.rotation.z += (finalRotZ - innerRef.current.rotation.z) * lerpFactor;
  });

  return (
    <group ref={groupRef} position={[0.7, 0, 0]}>
      <group ref={innerRef} rotation={[0.35, -0.4, 0.1]}>
        {/* Authentic baked dough with pale fried proof-ring */}
        <mesh geometry={doughGeom} castShadow receiveShadow>
          <meshPhysicalMaterial
            map={doughTexture}
            bumpMap={doughBump}
            bumpScale={0.035}
            roughness={0.78}
            metalness={0.02}
            sheen={0.35}
            sheenColor={new THREE.Color('#d47d2f')}
            clearcoat={0.04}
          />
        </mesh>

        {/* Real TOKCO rich milk-chocolate glaze */}
        <mesh geometry={glazeGeom} castShadow receiveShadow>
          <meshPhysicalMaterial
            color="#562a14" // Rich milk chocolate tone matching ref-3.jpg
            bumpMap={chocolateBump}
            bumpScale={0.014}
            roughness={0.17} // High-gloss chocolate sheen
            metalness={0.02}
            clearcoat={1.0} // Mirror candy clearcoat reflecting studio lights
            clearcoatRoughness={0.07}
            sheen={0.4}
            sheenColor={new THREE.Color('#7c3d1e')}
            transmission={0.02}
            ior={1.46}
            reflectivity={0.96}
          />
        </mesh>

        {/* Authentic pastel sprinkles matching the Chalakudy real donut */}
        <group>
          {sprinkles.map((sp, idx) => (
            <mesh
              key={idx}
              geometry={sprinkleGeom}
              material={sprinkleMaterials[idx % sprinkleMaterials.length]}
              position={sp.position}
              quaternion={sp.quaternion}
              scale={sp.scale}
              castShadow
            />
          ))}
        </group>
      </group>

      {/* Soft ground contact shadow */}
      <mesh position={[0, -1.85, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[7, 7]} />
        <shadowMaterial opacity={0.28} />
      </mesh>
    </group>
  );
}
