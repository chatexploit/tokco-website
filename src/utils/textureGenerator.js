import * as THREE from 'three';

/**
 * Generates an authentic procedural baked dough diffuse texture with
 * a distinct equatorial "fry-line" proof band and fine crumb pores.
 */
export function createDoughTexture() {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // Realistic baked pastry gradient (golden crust on top/bottom, pale fry line in middle)
  const grad = ctx.createLinearGradient(0, 0, 0, size);
  grad.addColorStop(0.0, '#9e5218'); // deep baked top crust
  grad.addColorStop(0.24, '#c9792e'); // warm golden upper dough
  grad.addColorStop(0.42, '#e6ab67'); // transition to proof line
  grad.addColorStop(0.50, '#f9e4c3'); // pale blonde oil fry-line band (buoyant ring)
  grad.addColorStop(0.58, '#e6ab67'); // transition down
  grad.addColorStop(0.76, '#bf6e23'); // golden underbelly
  grad.addColorStop(1.0, '#8f4611');  // deep bottom bake
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  // Micro crumb pores and baked texture stippling
  const imgData = ctx.getImageData(0, 0, size, size);
  const data = imgData.data;

  let seed = 42;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  for (let y = 0; y < size; y++) {
    const isFryLine = Math.abs(y - size * 0.5) < size * 0.08;
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const grain = (rnd() - 0.5) * (isFryLine ? 10 : 22);
      const pore = rnd() > 0.985 ? -30 : 0;

      data[idx] = Math.min(255, Math.max(0, data[idx] + grain + pore));
      data[idx + 1] = Math.min(255, Math.max(0, data[idx + 1] + grain * 0.8 + pore));
      data[idx + 2] = Math.min(255, Math.max(0, data[idx + 2] + grain * 0.5 + pore));
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
 * Grayscale bump map for baked dough porosity and bread crust grain.
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

  let seed = 12345;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  for (let i = 0; i < data.length; i += 4) {
    const n = (rnd() - 0.5) * 50;
    const pore = rnd() > 0.982 ? -65 : 0;
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
 * Generates subtle fluid ripple streaks for luscious milk chocolate glaze.
 */
export function createChocolateGlazeBumpMap() {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, size, size);

  // Soft flowing chocolate glaze drizzle & fluid settling ripples
  ctx.lineWidth = 22;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'rgba(145, 145, 145, 0.14)';
  for (let i = 0; i < 7; i++) {
    ctx.beginPath();
    ctx.moveTo(i * 40, 0);
    ctx.bezierCurveTo(i * 40 + 45, size * 0.35, i * 40 - 25, size * 0.65, i * 40 + 30, size);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  texture.generateMipmaps = true;
  return texture;
}
