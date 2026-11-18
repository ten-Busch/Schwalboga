const palettes = {
  Normal: ['#d5d2c8', '#f7f4eb', '#aba69a', '#ffffff', '#c6c0b5', '#8f887d'],
  Fire: ['#ff3b22', '#ff8a2d', '#ffd166', '#b91c1c', '#ff5c38', '#fff0a6'],
  Water: ['#1677ff', '#53d3ff', '#b7f3ff', '#0f4fb3', '#6ba8ff', '#e3fbff'],
  Electric: ['#ffe047', '#fff68a', '#ffb703', '#f59e0b', '#fffbd1', '#facc15'],
  Grass: ['#1fa463', '#6ee787', '#b7f7c1', '#0f6b3f', '#3ddc84', '#eaffd8'],
  Ice: ['#71e8ff', '#d6fbff', '#a7f3ff', '#3bb5d5', '#f0feff', '#8bdff0'],
  Fighting: ['#d23936', '#ff6b5f', '#8a1f1c', '#ffc3b8', '#ef4444', '#7f1d1d'],
  Poison: ['#a855f7', '#d8b4fe', '#7e22ce', '#f0abfc', '#9333ea', '#581c87'],
  Ground: ['#d6a752', '#f3d28b', '#8a5f25', '#fff1bf', '#c08435', '#6b4218'],
  Flying: ['#82a9ff', '#c7d7ff', '#516fc4', '#eef4ff', '#9db8ff', '#384c9c'],
  Psychic: ['#ff4fa3', '#ff9ed2', '#be185d', '#ffd1ea', '#ec4899', '#831843'],
  Bug: ['#9aba23', '#d7ef6b', '#657c13', '#f3ffd0', '#a3c51f', '#4d5f0f'],
  Rock: ['#a98445', '#e3c277', '#6f5528', '#fff0bd', '#b99454', '#4c351c'],
  Ghost: ['#6d5bbf', '#a99af4', '#3f2b83', '#e3dcff', '#7c6de0', '#24134f'],
  Dragon: ['#6c4cff', '#a590ff', '#341ec3', '#ddd6ff', '#7f5fff', '#211080'],
  Dark: ['#5c4b43', '#a08a7e', '#2d2524', '#dccfc8', '#6b5a50', '#171312'],
  Steel: ['#8ea3b8', '#d9e4ef', '#5f748a', '#f6fbff', '#9aadc0', '#34495e'],
  Fairy: ['#ff87c9', '#ffd0ea', '#d946a5', '#fff0f8', '#f9a8d4', '#9d266d'],
};

function createSpriteCheckerCanvas(spriteUrl, colors, options = {}) {
  const canvas = document.createElement('canvas');
  canvas.className = 'sprite-checker-overlay-canvas';
  canvas.setAttribute('aria-hidden', 'true');

  const image = new Image();
  const render = () => {
    const width = image.naturalWidth || options.width || 96;
    const height = image.naturalHeight || options.height || 96;
    canvas.width = width;
    canvas.height = height;
    canvas.dataset.spriteCheckerReady = 'true';

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;

    const squareSize = Math.max(4, Math.round(width / 8));
    const diagonal = Math.ceil(Math.sqrt(width * width + height * height));
    const gridStart = -Math.ceil(diagonal / 2) - squareSize;
    const gridEnd = Math.ceil(diagonal / 2) + squareSize;

    const paint = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.rotate(Math.PI / 4);
      for (let y = gridStart; y < gridEnd; y += squareSize) {
        for (let x = gridStart; x < gridEnd; x += squareSize) {
          ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
          ctx.fillRect(x, y, squareSize, squareSize);
        }
      }
      ctx.restore();
      if (spriteUrl) {
        ctx.globalCompositeOperation = 'destination-in';
        ctx.drawImage(image, 0, 0, width, height);
        ctx.globalCompositeOperation = 'source-over';
      }
    };

    paint();
    const schedulePaint = () => {
      const delay = Math.random() < 0.18
        ? 120 + Math.random() * 180
        : 520 + Math.random() * 980;
      setTimeout(() => {
        if (!canvas.isConnected) return;
        paint();
        schedulePaint();
      }, delay);
    };
    if (options.animate !== false) schedulePaint();
  };
  image.onload = render;
  image.onerror = () => {
    canvas.remove();
  };
  if (spriteUrl) image.src = spriteUrl;
  else render();

  return canvas;
}


window.TeraSpriteEffects = { create: createSpriteCheckerCanvas, palettes };
