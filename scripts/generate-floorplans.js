const fs = require('fs');

// Brand colors
const FILL = {
  A:  '#0b2f4e', B:  '#1a7ab5', C:  '#5abed6',
  CL: '#ff7f00', corr: '#eef4fa', stairs: '#dce5ef',
  bg: '#f2f6fb', bldg: '#ffffff', wall: '#0b2f4e',
};
const TXT = {
  A: '#fff', B: '#fff', C: '#0b2f4e', CL: '#fff',
};

// Scale & building grid (px) — ~38px per meter
const BW = 540, WALL = 3;
const COL = {
  wO: { x: 0,   w: 112 }, // west outer  (2.95m)
  wI: { x: 116, w: 76  }, // west inner  (2.00m)
  co: { x: 196, w: 148 }, // corridor    (3.89m)
  eI: { x: 348, w: 76  }, // east inner  (2.00m)
  eO: { x: 428, w: 112 }, // east outer  (2.95m)
};
const RH = 53, RG = 4, RP = RH + RG; // row height, gap, pitch

// Helpers
function r(x,y,w,h,fill,stroke,rx=3) {
  const s = stroke ? ` stroke="${stroke}" stroke-width="1"` : '';
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"${s} rx="${rx}"/>`;
}
function t(x,y,str,fill,sz=10,w='600') {
  return `<text x="${x}" y="${y}" fill="${fill}" font-size="${sz}" font-family="'Inter',system-ui,sans-serif" text-anchor="middle" dominant-baseline="central" font-weight="${w}">${str}</text>`;
}

function unit(bx, by, col, row, type, label) {
  const x = bx + col.x, y = by + row * RP;
  const isA = type.startsWith('A'), isB1 = type === 'B-1', isB2 = type === 'B-2';
  const baseType = type.startsWith('C-L') ? 'CL' : type[0];
  const fill = FILL[baseType], txt = TXT[baseType];
  let s = r(x, y, col.w, RH, fill, null, 3);
  s += t(x + col.w/2, y + RH/2, label || type[0], txt, col.w > 90 ? 10 : 8);
  return s;
}

function bigUnit(bx, by, x, y, w, h, type, sizeLabel) {
  const baseType = type.startsWith('C-L') ? 'CL' : type[0];
  const fill = FILL[baseType], txt = TXT[baseType];
  let s = r(bx+x, by+y, w, h, fill, null, 4);
  s += t(bx+x+w/2, by+y+h/2-9, type, txt, 13, '700');
  s += t(bx+x+w/2, by+y+h/2+9, sizeLabel, txt, 10, '400');
  return s;
}

// ────────────────────────────────────────
// PLANTA BAJA
// ────────────────────────────────────────
function plantaBaja() {
  const ROWS = 15;
  const topH = 112, topGap = 6;
  const mainY = topH + topGap;
  const mainH = ROWS * RP;
  const botGap = 6;
  const botY = mainY + mainH + botGap;
  const botH = 170;
  const entH = 70;
  const BH = botY + botH + entH;
  const MX = 60, MY = 55;
  const SW = BW + MX*2, SH = BH + MY*2 + 120;
  const bx = MX, by = MY;

  let svg = '';

  // Background + building
  svg += r(0, 0, SW, SH, FILL.bg, null, 0);
  svg += r(bx, by, BW, BH, FILL.bldg, null, 6);

  // Corridor
  svg += r(bx+COL.co.x, by, COL.co.w, BH - entH, FILL.corr, null, 0);

  // ── Top A units ──
  const sideW = COL.wO.w + 4 + COL.wI.w; // 192
  svg += bigUnit(bx, by, 0, 0, sideW, topH, 'A', '14.5 m²');
  svg += bigUnit(bx, by, COL.eI.x, 0, sideW, topH, 'A', '14.5 m²');

  // ── Main grid (15 rows) ──
  for (let i = 0; i < ROWS; i++) {
    // West outer: B
    svg += unit(bx, by + mainY, COL.wO, i, 'B', 'B');
    // West inner: 9 C-Locker, 5 C, 1 C-1
    if (i < 9)       svg += unit(bx, by + mainY, COL.wI, i, 'C-Locker', 'L');
    else if (i < 14) svg += unit(bx, by + mainY, COL.wI, i, 'C', 'C');
    else              svg += unit(bx, by + mainY, COL.wI, i, 'C-1', 'C1');
    // East inner: 9 C-Locker, 6 C
    if (i < 9)       svg += unit(bx, by + mainY, COL.eI, i, 'C-Locker', 'L');
    else              svg += unit(bx, by + mainY, COL.eI, i, 'C', 'C');
    // East outer: B
    svg += unit(bx, by + mainY, COL.eO, i, 'B', 'B');
  }

  // ── Bottom zone ──
  svg += bigUnit(bx, by, 0, botY, sideW, botH - 6, 'A-1', '22.5 m²');
  svg += bigUnit(bx, by, COL.eI.x, botY, sideW, 80, 'B-1', '8.0 m²');
  // Stairs east bottom
  svg += r(bx + COL.eI.x, by + botY + 86, sideW, botH - 92, FILL.stairs, FILL.wall, 3);
  svg += t(bx + COL.eI.x + sideW/2, by + botY + 86 + (botH-92)/2, 'Escaleras', '#5d6b82', 9, '600');

  // ── Entrance zone ──
  svg += r(bx, by + botY + botH, BW, entH, FILL.stairs, null, 0);
  svg += t(bx + BW/2, by + botY + botH + 22, 'ENTRADA', FILL.wall, 12, '700');
  svg += t(bx + BW/2, by + botY + botH + 40, 'Recepción', '#5d6b82', 9, '400');

  // ── Corridor walls ──
  svg += `<line x1="${bx+COL.co.x}" y1="${by}" x2="${bx+COL.co.x}" y2="${by+BH-entH}" stroke="${FILL.wall}" stroke-width="1.5"/>`;
  svg += `<line x1="${bx+COL.co.x+COL.co.w}" y1="${by}" x2="${bx+COL.co.x+COL.co.w}" y2="${by+BH-entH}" stroke="${FILL.wall}" stroke-width="1.5"/>`;

  // ── Building outline ──
  svg += `<rect x="${bx}" y="${by}" width="${BW}" height="${BH}" fill="none" stroke="${FILL.wall}" stroke-width="2" rx="6"/>`;

  // ── Title ──
  svg += t(bx + BW/2, 22, 'PLANTA BAJA', FILL.wall, 20, '700');
  svg += t(bx + BW/2, 42, 'TBK 84 C · io guardo', '#5d6b82', 11, '400');

  // ── Dimension line ──
  const dy = by + BH + 18;
  svg += `<line x1="${bx}" y1="${dy}" x2="${bx+BW}" y2="${dy}" stroke="${FILL.wall}" stroke-width="0.7"/>`;
  svg += `<line x1="${bx}" y1="${dy-5}" x2="${bx}" y2="${dy+5}" stroke="${FILL.wall}" stroke-width="0.7"/>`;
  svg += `<line x1="${bx+BW}" y1="${dy-5}" x2="${bx+BW}" y2="${dy+5}" stroke="${FILL.wall}" stroke-width="0.7"/>`;
  svg += t(bx + BW/2, dy + 14, '14.2 m', '#5d6b82', 9, '400');

  // ── Legend ──
  const ly = by + BH + 48;
  const items = [
    ['A', 'Tipo A / A-1 — Extra Grande (14.5–22.5 m²)'],
    ['B', 'Tipo B / B-1 — Mediana–Grande (4.5–8 m²)'],
    ['C', 'Tipo C / C-1 — Pequeña (3–4.5 m²)'],
    ['CL','Tipo C-Locker (3 m²)'],
  ];
  items.forEach(([key, label], i) => {
    const lx = bx + (i % 2) * 270;
    const lry = ly + Math.floor(i / 2) * 26;
    svg += r(lx, lry - 7, 14, 14, FILL[key], FILL.wall, 2);
    svg += `<text x="${lx+22}" y="${lry}" fill="${FILL.wall}" font-size="9" font-family="'Inter',system-ui,sans-serif" text-anchor="start" dominant-baseline="central" font-weight="400">${label}</text>`;
  });

  // ── Unit count summary ──
  const sy = ly + 60;
  svg += t(bx + BW/2, sy, 'Total: 62 bodegas · 280 m² rentables', '#5d6b82', 9, '600');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SW} ${SH}" width="${SW}" height="${SH}">\n${svg}\n</svg>`;
}

// ────────────────────────────────────────
// PLANTA ALTA
// ────────────────────────────────────────
function plantaAlta() {
  const ROWS = 14; // slightly fewer main rows (27 B instead of 30)
  const topH = 112, topGap = 6;
  const mainY = topH + topGap;
  const mainH = ROWS * RP;
  const botGap = 6;
  const botY = mainY + mainH + botGap;
  // Bottom: 2x A-2 + B-2 zone + stairs
  const botH = 180;
  const BH = botY + botH;
  const MX = 60, MY = 55;
  const SW = BW + MX*2, SH = BH + MY*2 + 120;
  const bx = MX, by = MY;
  const sideW = COL.wO.w + 4 + COL.wI.w;

  let svg = '';

  svg += r(0, 0, SW, SH, FILL.bg, null, 0);
  svg += r(bx, by, BW, BH, FILL.bldg, null, 6);
  svg += r(bx+COL.co.x, by, COL.co.w, BH, FILL.corr, null, 0);

  // ── Top A units ──
  svg += bigUnit(bx, by, 0, 0, sideW, topH, 'A', '14.5 m²');
  svg += bigUnit(bx, by, COL.eI.x, 0, sideW, topH, 'A', '14.5 m²');

  // ── Main grid (14 rows) ──
  // West outer: 13 B + 1 row for B-2 area later
  // East outer: 14 B
  // Inner: 9 C-Locker + C/C-1
  for (let i = 0; i < ROWS; i++) {
    // West outer: B (13 rows, last row used for B-2 below)
    if (i < 13) svg += unit(bx, by + mainY, COL.wO, i, 'B', 'B');
    else        svg += unit(bx, by + mainY, COL.wO, i, 'B', 'B');
    // West inner
    if (i < 9)       svg += unit(bx, by + mainY, COL.wI, i, 'C-Locker', 'L');
    else if (i < 13) svg += unit(bx, by + mainY, COL.wI, i, 'C', 'C');
    else              svg += unit(bx, by + mainY, COL.wI, i, 'C-1', 'C1');
    // East inner
    if (i < 9)       svg += unit(bx, by + mainY, COL.eI, i, 'C-Locker', 'L');
    else              svg += unit(bx, by + mainY, COL.eI, i, 'C', 'C');
    // East outer
    if (i < 13) svg += unit(bx, by + mainY, COL.eO, i, 'B', 'B');
    else         svg += unit(bx, by + mainY, COL.eO, i, 'B', 'B');
  }

  // ── Bottom zone: A-2 units + B-1 + B-2 + stairs ──
  // West: A-2 (21 m²)
  svg += bigUnit(bx, by, 0, botY, sideW, 130, 'A-2', '21.0 m²');
  // East: A-2 (21 m²)
  svg += bigUnit(bx, by, COL.eI.x, botY, sideW, 130, 'A-2', '21.0 m²');

  // B-1 (8 m²) — below west A-2
  svg += bigUnit(bx, by, 0, botY + 136, sideW/2 - 2, 38, 'B-1', '8 m²');

  // B-2 units (6.75 m², 3 units) — below east A-2
  const b2w = (sideW - 8) / 3;
  for (let i = 0; i < 3; i++) {
    const b2x = COL.eI.x + i * (b2w + 4);
    svg += r(bx + b2x, by + botY + 136, b2w, 38, FILL.B, null, 3);
    svg += t(bx + b2x + b2w/2, by + botY + 136 + 19, 'B2', TXT.B, 8, '600');
  }

  // Stairs
  svg += r(bx + sideW/2 + 2, by + botY + 136, sideW/2 - 2, 38, FILL.stairs, FILL.wall, 3);
  svg += t(bx + sideW*3/4, by + botY + 155, 'Escaleras', '#5d6b82', 8, '600');

  // ── Corridor walls ──
  svg += `<line x1="${bx+COL.co.x}" y1="${by}" x2="${bx+COL.co.x}" y2="${by+BH}" stroke="${FILL.wall}" stroke-width="1.5"/>`;
  svg += `<line x1="${bx+COL.co.x+COL.co.w}" y1="${by}" x2="${bx+COL.co.x+COL.co.w}" y2="${by+BH}" stroke="${FILL.wall}" stroke-width="1.5"/>`;

  // ── Building outline ──
  svg += `<rect x="${bx}" y="${by}" width="${BW}" height="${BH}" fill="none" stroke="${FILL.wall}" stroke-width="2" rx="6"/>`;

  // ── Title ──
  svg += t(bx + BW/2, 22, 'PLANTA ALTA', FILL.wall, 20, '700');
  svg += t(bx + BW/2, 42, 'TBK 84 C · io guardo', '#5d6b82', 11, '400');

  // ── Dimension ──
  const dy = by + BH + 18;
  svg += `<line x1="${bx}" y1="${dy}" x2="${bx+BW}" y2="${dy}" stroke="${FILL.wall}" stroke-width="0.7"/>`;
  svg += `<line x1="${bx}" y1="${dy-5}" x2="${bx}" y2="${dy+5}" stroke="${FILL.wall}" stroke-width="0.7"/>`;
  svg += `<line x1="${bx+BW}" y1="${dy-5}" x2="${bx+BW}" y2="${dy+5}" stroke="${FILL.wall}" stroke-width="0.7"/>`;
  svg += t(bx + BW/2, dy + 14, '14.2 m', '#5d6b82', 9, '400');

  // ── Legend ──
  const ly = by + BH + 48;
  const items = [
    ['A', 'Tipo A / A-2 — Extra Grande (14.5–21 m²)'],
    ['B', 'Tipo B / B-1 / B-2 — Mediana–Grande (4.5–8 m²)'],
    ['C', 'Tipo C / C-1 — Pequeña (3–4.5 m²)'],
    ['CL','Tipo C-Locker (3 m²)'],
  ];
  items.forEach(([key, label], i) => {
    const lx = bx + (i % 2) * 270;
    const lry = ly + Math.floor(i / 2) * 26;
    svg += r(lx, lry - 7, 14, 14, FILL[key], FILL.wall, 2);
    svg += `<text x="${lx+22}" y="${lry}" fill="${FILL.wall}" font-size="9" font-family="'Inter',system-ui,sans-serif" text-anchor="start" dominant-baseline="central" font-weight="400">${label}</text>`;
  });

  const sy = ly + 60;
  svg += t(bx + BW/2, sy, 'Total: 63 bodegas · 306.25 m² rentables', '#5d6b82', 9, '600');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SW} ${SH}" width="${SW}" height="${SH}">\n${svg}\n</svg>`;
}

// Generate files
fs.writeFileSync('public/plano-planta-baja.svg', plantaBaja());
fs.writeFileSync('public/plano-planta-alta.svg', plantaAlta());
console.log('Floor plans generated!');
