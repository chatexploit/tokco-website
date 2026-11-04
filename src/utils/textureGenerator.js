import * as THREE from 'three';

/**
 * Generates a procedural baked dough diffuse texture with an authentic
 * equatorial "fry-line" proof band and realistic crumb speckles.
 */
export function createDoughTexture() {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (!ctx) return null;

  // Base baked golden-amber gradient
  const grad = ctx.createLinearGradient(0, 0, 0, size);
  grad.addColorStop(0.0, '#b66723'); // deep top bake
  grad.addColorStop(0.25, '#d4883d'); // golden upper
  grad.addColorStop(0.44, '#e9b56f'); // transition to proof line
  grad.addColorStop(0.5, '#f5deaf');  // pale fried equatorial proof band
  grad.addColorStop(0.56, '#e9b56f'); // transition down
  grad.addColorStop(0.75, '#cb792b'); // golden underbelly
  grad.addColorStop(1.0, '#9e5218');  // deep bottom crust
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  // Add baked crust stippling and crumb pores
  const imgData = ctx.getImageData(0, 0, size, size);
  const data = imgData.data;

  // Simple pseudo-random hash for deterministic noise
  let seed = 42;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  for (let y = 0; y < size; y++) {
    const isEquator = Math.abs(y - size * 0.5) < size * 0.08;
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const noise = (rnd() - 0.5) * (isEquator ? 12 : 24);
      // subtle micro-pores
      const pore = rnd() > 0.985 ? -35 : 0;

      data[idx] = Math.min(255, Math.max(0, data[idx] + noise + pore));
      data[idx + 1] = Math.min(255, Math.max(0, data[idx + 1] + noise * 0.8 + pore));
      data[idx + 2] = Math.min(255, Math.max(0, data[idx + 2] + noise * 0.5 + pore));
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

/**
 * Generates a grayscale bump map for baked dough porosity and surface grain.
 */
export function createDoughBumpMap() {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, size, size);

  const imgData = ctx.getImageData(0, 0, size, size);
  const data = imgData.data;

  let seed = 1234;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  for (let i = 0; i < data.length; i += 4) {
    const n = (rnd() - 0.5) * 55;
    const pore = rnd() > 0.98 ? -70 : 0;
    const val = Math.min(255, Math.max(0, 128 + n + pore));
    data[i] = val;
    data[i + 1] = val;
    data[i + 2] = val;
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.generateMipmaps = true;
  return texture;
}

/**
 * Generates a subtle fluid normal/bump map for glossy frosting glaze.
 */
export function createGlazeBumpMap() {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, size, size);

  // Soft flowing glaze streaks
  ctx.lineWidth = 18;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'rgba(150, 150, 150, 0.12)';
  for (let i = 0; i < 8; i++) {
    ctx.beginPath();
    ctx.moveTo(i * 35, 0);
    ctx.bezierCurveTo(i * 35 + 40, size * 0.4, i * 35 - 30, size * 0.7, i * 35 + 20, size);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  texture.generateMipmaps = true;
  return texture;
}
