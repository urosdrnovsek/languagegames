// Full-body animals for the Spot It! scenes (the word games keep the heads).
// Side view, facing right, standing on y = 94 of a 100 x 100 box, in the same
// outline style as shared/pictures.js. Most are built from one plan: a body,
// four legs, a tail, a neck and a head, each animal with its own ears, snout,
// colours and markings.
(function () {
  const INK = '#2f2a28';
  const B = {};
  const wrap = (inner) =>
    '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><g stroke="' + INK + '" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">' + inner + '</g></svg>';
  const eye = (x, y, r) => '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + INK + '" stroke="none"/><circle cx="' + (x + r * 0.35) + '" cy="' + (y - r * 0.35) + '" r="' + r * 0.35 + '" fill="#fff" stroke="none"/>';
  const cheek = (x, y) => '<circle cx="' + x + '" cy="' + y + '" r="3.2" fill="#ff8fab" opacity=".5" stroke="none"/>';

  // o: c (body colour), d (darker, far legs), belly, size of body (bw, bh),
  // leg length (legH), head radius (hr), head position (hx, hy), neck,
  // ears(o), snout(o), tail(o), marks(o), extra(o) for things on top.
  function quad(o) {
    const c = o.c, d = o.d || c;
    const bx = o.bx || 50, by = o.by || 60, bw = o.bw || 30, bh = o.bh || 15;
    const legH = o.legH || 94 - (by + bh * 0.6);
    const top = by + bh * 0.4;
    const leg = (x, col, w) => '<rect x="' + (x - (w || 4.5)) + '" y="' + top + '" width="' + (w || 4.5) * 2 + '" height="' + (94 - top) + '" rx="4" fill="' + col + '"/>' + (o.hoof ? '<rect x="' + (x - (w || 4.5)) + '" y="89" width="' + (w || 4.5) * 2 + '" height="5" rx="2" fill="' + o.hoof + '"/>' : '');
    const L = o.legs || [bx - bw * 0.62, bx - bw * 0.3, bx + bw * 0.42, bx + bw * 0.72];
    let s = '';
    s += o.tail ? o.tail(o) : '';
    s += leg(L[1], d, o.legW) + leg(L[3], d, o.legW); // far legs
    if (o.neck) s += '<path d="' + o.neck + '" fill="' + c + '"/>';
    s += o.bodyPath ? o.bodyPath(o) : '<ellipse cx="' + bx + '" cy="' + by + '" rx="' + bw + '" ry="' + bh + '" fill="' + c + '"/>';
    if (o.belly) s += '<path d="M' + (bx - bw * 0.6) + ' ' + (by + bh * 0.55) + ' Q' + bx + ' ' + (by + bh * 1.15) + ' ' + (bx + bw * 0.6) + ' ' + (by + bh * 0.55) + '" fill="' + o.belly + '" stroke="none"/>';
    s += o.marks ? o.marks(o) : '';
    s += leg(L[0], c, o.legW) + leg(L[2], c, o.legW); // near legs
    s += o.behindHead ? o.behindHead(o) : '';
    s += o.ears ? o.ears(o) : '';
    s += '<circle cx="' + o.hx + '" cy="' + o.hy + '" r="' + o.hr + '" fill="' + (o.hc || c) + '"/>';
    s += o.face ? o.face(o) : '';
    s += o.snout ? o.snout(o) : '';
    s += eye(o.hx + o.hr * 0.18, o.hy - o.hr * 0.18, o.hr * 0.17) + cheek(o.hx + o.hr * 0.2, o.hy + o.hr * 0.35);
    s += o.extra ? o.extra(o) : '';
    return wrap(s);
  }

  // Ears, snouts and tails used by several animals.
  const triEars = (col, inner) => (o) =>
    '<path d="M' + (o.hx - o.hr * 0.75) + ' ' + (o.hy - o.hr * 0.5) + ' L' + (o.hx - o.hr * 0.55) + ' ' + (o.hy - o.hr * 1.45) + ' L' + (o.hx - o.hr * 0.05) + ' ' + (o.hy - o.hr * 0.85) + ' Z" fill="' + col + '"/>' +
    '<path d="M' + (o.hx + o.hr * 0.05) + ' ' + (o.hy - o.hr * 0.85) + ' L' + (o.hx + o.hr * 0.55) + ' ' + (o.hy - o.hr * 1.5) + ' L' + (o.hx + o.hr * 0.8) + ' ' + (o.hy - o.hr * 0.5) + ' Z" fill="' + col + '"/>' +
    (inner ? '<path d="M' + (o.hx + o.hr * 0.25) + ' ' + (o.hy - o.hr * 0.85) + ' L' + (o.hx + o.hr * 0.52) + ' ' + (o.hy - o.hr * 1.2) + ' L' + (o.hx + o.hr * 0.62) + ' ' + (o.hy - o.hr * 0.7) + ' Z" fill="' + inner + '" stroke="none"/>' : '');
  const roundEars = (col, inner) => (o) =>
    [[-0.62, -0.78], [0.5, -0.85]].map(([dx, dy]) => '<circle cx="' + (o.hx + o.hr * dx) + '" cy="' + (o.hy + o.hr * dy) + '" r="' + o.hr * 0.42 + '" fill="' + col + '"/>' + (inner ? '<circle cx="' + (o.hx + o.hr * dx) + '" cy="' + (o.hy + o.hr * dy) + '" r="' + o.hr * 0.2 + '" fill="' + inner + '" stroke="none"/>' : '')).join('');
  const longEars = (col, inner, len) => (o) =>
    [[-0.45, -0.18], [0.15, 0.12]].map(([dx, rot]) => '<ellipse cx="' + (o.hx + o.hr * dx) + '" cy="' + (o.hy - o.hr * (0.9 + len * 0.5)) + '" rx="' + o.hr * 0.3 + '" ry="' + o.hr * len * 0.62 + '" fill="' + col + '" transform="rotate(' + rot * 57 + ' ' + (o.hx + o.hr * dx) + ' ' + (o.hy - o.hr * 0.6) + ')"/>' +
      (inner ? '<ellipse cx="' + (o.hx + o.hr * dx) + '" cy="' + (o.hy - o.hr * (0.9 + len * 0.5)) + '" rx="' + o.hr * 0.13 + '" ry="' + o.hr * len * 0.45 + '" fill="' + inner + '" stroke="none" transform="rotate(' + rot * 57 + ' ' + (o.hx + o.hr * dx) + ' ' + (o.hy - o.hr * 0.6) + ')"/>' : '')).join('');
  const flopEar = (col) => (o) => '<path d="M' + (o.hx - o.hr * 0.55) + ' ' + (o.hy - o.hr * 0.75) + ' Q' + (o.hx - o.hr * 1.25) + ' ' + (o.hy - o.hr * 0.2) + ' ' + (o.hx - o.hr * 0.85) + ' ' + (o.hy + o.hr * 0.65) + ' Q' + (o.hx - o.hr * 0.45) + ' ' + (o.hy + o.hr * 0.2) + ' ' + (o.hx - o.hr * 0.2) + ' ' + (o.hy - o.hr * 0.85) + ' Z" fill="' + col + '"/>';
  const horns = (col) => (o) => '<path d="M' + (o.hx - o.hr * 0.35) + ' ' + (o.hy - o.hr * 0.8) + ' q-4 -9 -10 -9 M' + (o.hx + o.hr * 0.25) + ' ' + (o.hy - o.hr * 0.85) + ' q3 -9 9 -10" stroke="' + INK + '" stroke-width="7" fill="none"/><path d="M' + (o.hx - o.hr * 0.35) + ' ' + (o.hy - o.hr * 0.8) + ' q-4 -9 -10 -9 M' + (o.hx + o.hr * 0.25) + ' ' + (o.hy - o.hr * 0.85) + ' q3 -9 9 -10" stroke="' + col + '" stroke-width="3.5" fill="none"/>';
  const muzzle = (col, nostrils) => (o) => '<ellipse cx="' + (o.hx + o.hr * 0.78) + '" cy="' + (o.hy + o.hr * 0.35) + '" rx="' + o.hr * 0.52 + '" ry="' + o.hr * 0.42 + '" fill="' + col + '"/>' +
    (nostrils ? '<circle cx="' + (o.hx + o.hr * 0.95) + '" cy="' + (o.hy + o.hr * 0.3) + '" r="1.6" fill="' + INK + '" stroke="none"/>' : '');
  const nose = (o) => '<path d="M' + (o.hx + o.hr * 0.55) + ' ' + (o.hy + o.hr * 0.1) + ' Q' + (o.hx + o.hr * 1.45) + ' ' + (o.hy + o.hr * 0.05) + ' ' + (o.hx + o.hr * 1.3) + ' ' + (o.hy + o.hr * 0.55) + ' Q' + (o.hx + o.hr * 0.9) + ' ' + (o.hy + o.hr * 0.75) + ' ' + (o.hx + o.hr * 0.5) + ' ' + (o.hy + o.hr * 0.6) + ' Z" fill="' + (o.sc || o.hc || o.c) + '"/><circle cx="' + (o.hx + o.hr * 1.32) + '" cy="' + (o.hy + o.hr * 0.18) + '" r="2.6" fill="' + INK + '"/>';
  const tailLine = (col, w, d) => (o) => '<path d="' + d + '" stroke="' + INK + '" stroke-width="' + (w + 3) + '" fill="none"/><path d="' + d + '" stroke="' + col + '" stroke-width="' + w + '" fill="none"/>';

  B.cat = quad({ c: '#ff9f43', d: '#e67e22', belly: '#ffd8a8', hx: 74, hy: 42, hr: 14, by: 62, bw: 26, bh: 13,
    ears: triEars('#ff9f43', '#ffc9c9'), snout: (o) => '<path d="M' + (o.hx + 9) + ' ' + (o.hy + 5) + ' l3 0 l-1.5 2.5 Z" fill="#ff6b6b" stroke="none"/><path d="M' + (o.hx + 6) + ' ' + (o.hy + 8) + ' l12 -2 M' + (o.hx + 6) + ' ' + (o.hy + 10) + ' l12 2" stroke-width="1.5"/>',
    tail: tailLine('#ff9f43', 6, 'M26 58 Q8 52 12 34 Q14 26 20 28'),
    marks: () => '<path d="M44 49 q2 8 0 14 M52 48 q2 8 0 15" stroke="#e67e22" stroke-width="3" fill="none"/>' });

  B.dog = quad({ c: '#c58b52', d: '#a8723e', belly: '#f3d9b9', hx: 75, hy: 41, hr: 14, by: 61, bw: 27, bh: 14,
    snout: nose, sc: '#f3d9b9',
    tail: tailLine('#c58b52', 6, 'M25 56 Q12 44 18 32'),
    // the floppy ear hangs in front of the head, like in the word picture
    extra: (o) => '<path d="M' + (o.hx - 7) + ' ' + (o.hy - 12) + ' Q' + (o.hx - 19) + ' ' + (o.hy - 6) + ' ' + (o.hx - 15) + ' ' + (o.hy + 13) + ' Q' + (o.hx - 9) + ' ' + (o.hy + 17) + ' ' + (o.hx - 5) + ' ' + (o.hy + 9) + ' Q' + (o.hx - 3) + ' ' + (o.hy - 2) + ' ' + (o.hx - 1) + ' ' + (o.hy - 13) + ' Z" fill="#7a4a26"/>' + '<path d="M' + (o.hx - 6) + ' ' + (o.hy + 14) + ' q7 4 14 0" stroke="#e03131" stroke-width="4" fill="none"/>' });

  B.pig = quad({ c: '#ffb3c6', d: '#f48fb1', hx: 76, hy: 50, hr: 14, by: 60, bw: 30, bh: 17, legW: 5,
    ears: triEars('#ff8fab'), snout: (o) => '<ellipse cx="' + (o.hx + o.hr * 0.95) + '" cy="' + (o.hy + 2) + '" rx="5" ry="6.5" fill="#ff8fab"/><circle cx="' + (o.hx + o.hr * 0.95) + '" cy="' + o.hy + '" r="1.3" fill="' + INK + '" stroke="none"/><circle cx="' + (o.hx + o.hr * 0.95) + '" cy="' + (o.hy + 4) + '" r="1.3" fill="' + INK + '" stroke="none"/>',
    tail: tailLine('#ffb3c6', 3, 'M20 56 q-6 -2 -4 -7 q2 -4 5 0 q2 4 -4 5') });

  B.cow = quad({ c: '#ffffff', d: '#e9ecef', hx: 78, hy: 38, hr: 13, by: 56, bw: 32, bh: 16, hoof: INK,
    neck: 'M70 46 L82 44 L76 60 L62 58 Z',
    ears: (o) => horns('#f1e3c6')(o) + '<ellipse cx="' + (o.hx - o.hr) + '" cy="' + (o.hy - 3) + '" rx="6" ry="3.5" fill="#fff"/><ellipse cx="' + (o.hx + o.hr * 0.7) + '" cy="' + (o.hy - o.hr * 0.75) + '" rx="5" ry="3" fill="#e9ecef" transform="rotate(-30 ' + (o.hx + o.hr * 0.7) + ' ' + (o.hy - o.hr * 0.75) + ')"/>',
    snout: muzzle('#ffb3c6', true),
    marks: () => '<path d="M30 48 q10 -6 14 4 q-2 10 -12 8 q-6 -4 -2 -12 Z M54 56 q8 -4 12 4 q-4 8 -12 4 Z" fill="' + INK + '" stroke="none"/>',
    tail: tailLine('#ffffff', 3, 'M19 52 Q12 62 14 74'),
    extra: () => '<path d="M50 70 q4 6 8 0" fill="#ffb3c6"/>' });

  B.horse = quad({ c: '#b5783f', d: '#9a6332', hx: 80, hy: 30, hr: 11, by: 54, bw: 30, bh: 14, hoof: '#4a3b35', legW: 4,
    neck: 'M64 46 L74 26 L86 32 L76 56 Z',
    ears: triEars('#b5783f'), snout: muzzle('#9a6332', true),
    behindHead: () => '<path d="M70 22 Q60 34 62 50 L68 50 Q66 36 76 26 Z" fill="#4a3b35"/>',
    tail: tailLine('#4a3b35', 7, 'M20 50 Q8 60 12 78') });

  B.donkey = quad({ c: '#a9a9b3', d: '#8f8f99', belly: '#e9ecef', hx: 79, hy: 32, hr: 12, by: 56, bw: 28, bh: 14, hoof: '#4a3b35', legW: 4,
    neck: 'M64 48 L74 28 L86 34 L76 58 Z',
    ears: longEars('#a9a9b3', '#ffc9c9', 1.4), snout: muzzle('#dee2e6', true),
    behindHead: () => '<path d="M71 24 Q64 34 64 48" stroke="#4a3b35" stroke-width="5" fill="none"/>',
    tail: tailLine('#a9a9b3', 3, 'M22 52 Q14 60 16 72') });

  B.goat = quad({ c: '#f1f3f5', d: '#dee2e6', hx: 76, hy: 36, hr: 11, by: 58, bw: 25, bh: 13, hoof: '#6c757d', legW: 3.8,
    neck: 'M64 50 L72 34 L82 40 L72 58 Z',
    ears: (o) => horns('#ced4da')(o) + '<ellipse cx="' + (o.hx - o.hr * 0.95) + '" cy="' + (o.hy - 1) + '" rx="6" ry="3" fill="#f1f3f5"/><ellipse cx="' + (o.hx + o.hr * 0.75) + '" cy="' + (o.hy - o.hr * 0.7) + '" rx="5" ry="2.6" fill="#dee2e6" transform="rotate(-30 ' + (o.hx + o.hr * 0.75) + ' ' + (o.hy - o.hr * 0.7) + ')"/>',
    snout: muzzle('#ffd8e3', true),
    extra: (o) => '<path d="M' + (o.hx + 6) + ' ' + (o.hy + 10) + ' l-1 9 l5 -6 Z" fill="#f1f3f5"/>',
    tail: tailLine('#f1f3f5', 4, 'M26 52 l-6 -8') });

  B.sheep = quad({ c: '#ffffff', d: '#495057', hx: 78, hy: 44, hr: 11, hc: '#f3e6d8', by: 58, bw: 28, bh: 17, legW: 3.6,
    legs: [32, 40, 60, 68],
    bodyPath: () => {
      let s = '';
      [[30, 54], [42, 46], [56, 46], [68, 54], [64, 66], [50, 70], [36, 68], [26, 62]].forEach(([x, y]) => (s += '<circle cx="' + x + '" cy="' + y + '" r="11" fill="#fff"/>'));
      return s + '<ellipse cx="48" cy="58" rx="22" ry="12" fill="#fff" stroke="none"/>';
    },
    ears: (o) => '<ellipse cx="' + (o.hx - o.hr * 0.9) + '" cy="' + (o.hy - 2) + '" rx="6" ry="3.5" fill="#f3e6d8"/><ellipse cx="' + (o.hx + o.hr * 0.8) + '" cy="' + (o.hy - o.hr * 0.55) + '" rx="5" ry="3" fill="#e5d3bf" transform="rotate(-30 ' + (o.hx + o.hr * 0.8) + ' ' + (o.hy - o.hr * 0.55) + ')"/>' + '<circle cx="' + (o.hx - 3) + '" cy="' + (o.hy - o.hr * 0.9) + '" r="6" fill="#fff"/><circle cx="' + (o.hx + 4) + '" cy="' + (o.hy - o.hr * 1.05) + '" r="5" fill="#fff"/>',
    snout: (o) => '<ellipse cx="' + (o.hx + o.hr * 0.75) + '" cy="' + (o.hy + o.hr * 0.4) + '" rx="4" ry="3" fill="#ffc9c9"/>',
    face: () => '' });

  B.rabbit = quad({ c: '#f1f3f5', d: '#dee2e6', belly: '#fff', hx: 70, hy: 52, hr: 12, by: 70, bw: 22, bh: 14, legW: 4, legs: [32, 40, 58, 64],
    ears: longEars('#f1f3f5', '#ffc9c9', 1.9),
    snout: (o) => '<circle cx="' + (o.hx + o.hr * 0.95) + '" cy="' + (o.hy + 2) + '" r="2.4" fill="#ff8fab"/>',
    tail: () => '<circle cx="27" cy="64" r="7" fill="#fff"/>' });

  B.mouse = quad({ c: '#adb5bd', d: '#868e96', belly: '#e9ecef', hx: 70, hy: 66, hr: 10, by: 76, bw: 20, bh: 11, legW: 3, legs: [36, 42, 58, 62],
    ears: (o) => '<circle cx="' + (o.hx + 5) + '" cy="' + (o.hy - 12) + '" r="6.5" fill="#868e96"/><circle cx="' + (o.hx - 5) + '" cy="' + (o.hy - 11) + '" r="7.5" fill="#adb5bd"/><circle cx="' + (o.hx - 5) + '" cy="' + (o.hy - 11) + '" r="4" fill="#ffc9c9" stroke="none"/>',
    snout: (o) => '<circle cx="' + (o.hx + 10) + '" cy="' + (o.hy + 1) + '" r="2.4" fill="#ff8fab"/><path d="M' + (o.hx + 6) + ' ' + (o.hy + 4) + ' l12 -1 M' + (o.hx + 6) + ' ' + (o.hy + 6) + ' l12 2" stroke-width="1.2"/>',
    tail: tailLine('#ff8fab', 2, 'M30 74 Q14 72 10 60') });

  B.fox = quad({ c: '#ff7f2a', d: '#e8590c', belly: '#fff4e6', hx: 76, hy: 46, hr: 13, by: 63, bw: 26, bh: 12, legW: 3.6, hoof: INK,
    ears: triEars('#ff7f2a', '#fff4e6'), snout: (o) => nose(Object.assign({}, o, { sc: '#fff4e6' })),
    tail: () => '<path d="M28 60 Q4 62 6 42 Q20 44 30 54 Z" fill="#ff7f2a"/><path d="M6 42 Q10 50 16 48 Q10 44 6 42 Z" fill="#fff"/>' });

  B.wolf = quad({ c: '#868e96', d: '#6c757d', belly: '#e9ecef', hx: 77, hy: 42, hr: 13, by: 61, bw: 28, bh: 13, legW: 4,
    ears: triEars('#868e96', '#dee2e6'), snout: (o) => nose(Object.assign({}, o, { sc: '#dee2e6' })),
    tail: () => '<path d="M24 56 Q6 60 8 74 Q18 70 26 62 Z" fill="#868e96"/>' });

  B.bear = quad({ c: '#8d5a34', d: '#6f4527', hx: 76, hy: 46, hr: 15, by: 60, bw: 30, bh: 18, legW: 6, legs: [30, 40, 60, 70],
    ears: roundEars('#8d5a34', '#c58b52'), snout: muzzle('#c58b52', false),
    extra: (o) => '<ellipse cx="' + (o.hx + o.hr * 1.08) + '" cy="' + (o.hy + o.hr * 0.2) + '" rx="2.6" ry="2" fill="' + INK + '" stroke="none"/>' });

  B.panda = quad({ c: '#ffffff', d: INK, hx: 76, hy: 46, hr: 15, by: 60, bw: 28, bh: 17, legW: 6, legs: [30, 40, 60, 70],
    ears: roundEars(INK), snout: muzzle('#fff', false),
    marks: () => '<path d="M60 46 Q70 52 66 70 Q58 72 54 60 Z" fill="' + INK + '" stroke="none"/>',
    face: (o) => '<ellipse cx="' + (o.hx + o.hr * 0.2) + '" cy="' + (o.hy - o.hr * 0.15) + '" rx="5" ry="6" fill="' + INK + '" stroke="none" transform="rotate(-20 ' + (o.hx + o.hr * 0.2) + ' ' + (o.hy - o.hr * 0.15) + ')"/>',
    extra: (o) => '<ellipse cx="' + (o.hx + o.hr * 1.08) + '" cy="' + (o.hy + o.hr * 0.2) + '" rx="2.6" ry="2" fill="' + INK + '" stroke="none"/>' });

  B.deer = quad({ c: '#c8864c', d: '#a86c39', belly: '#f3d9b9', hx: 78, hy: 30, hr: 11, by: 56, bw: 26, bh: 13, legW: 3.4, hoof: INK,
    neck: 'M64 50 L72 30 L84 34 L74 58 Z',
    ears: (o) => '<path d="M' + (o.hx - 2) + ' ' + (o.hy - 9) + ' q-4 -10 -2 -18 M' + (o.hx - 3) + ' ' + (o.hy - 18) + ' l-7 -4 M' + (o.hx + 3) + ' ' + (o.hy - 9) + ' q4 -10 8 -16 M' + (o.hx + 7) + ' ' + (o.hy - 18) + ' l6 -3" stroke="#7a4a26" stroke-width="3.5" fill="none"/>' +
      '<ellipse cx="' + (o.hx - o.hr) + '" cy="' + (o.hy - 3) + '" rx="6" ry="3.4" fill="#c8864c"/><ellipse cx="' + (o.hx + o.hr * 0.75) + '" cy="' + (o.hy - o.hr * 0.75) + '" rx="5" ry="3" fill="#a86c39" transform="rotate(-35 ' + (o.hx + o.hr * 0.75) + ' ' + (o.hy - o.hr * 0.75) + ')"/>',
    snout: muzzle('#f3d9b9', true),
    marks: () => '<circle cx="40" cy="52" r="2.2" fill="#fff" stroke="none"/><circle cx="48" cy="49" r="2.2" fill="#fff" stroke="none"/><circle cx="34" cy="56" r="2" fill="#fff" stroke="none"/>',
    tail: () => '<path d="M24 52 l-6 -4 l2 8 Z" fill="#fff"/>' });

  B.tiger = quad({ c: '#ff922b', d: '#f76707', belly: '#fff4e6', hx: 77, hy: 44, hr: 14, by: 61, bw: 29, bh: 14, legW: 4.5,
    ears: roundEars('#ff922b', '#fff4e6'), snout: muzzle('#fff4e6', false),
    marks: () => '<path d="M34 48 l3 10 M44 46 l2 12 M54 46 l-1 12 M64 50 l-2 8" stroke="' + INK + '" stroke-width="3.5"/>',
    tail: tailLine('#ff922b', 5, 'M22 58 Q8 56 10 40'),
    extra: (o) => '<ellipse cx="' + (o.hx + o.hr * 1.08) + '" cy="' + (o.hy + o.hr * 0.2) + '" rx="2.6" ry="2" fill="' + INK + '" stroke="none"/><path d="M' + (o.hx - 6) + ' ' + (o.hy - 12) + ' l1 5 M' + (o.hx) + ' ' + (o.hy - 13) + ' v5" stroke-width="2.5"/>' });

  B.lion = quad({ c: '#f4c04a', d: '#e0a82e', belly: '#ffe8a3', hx: 77, hy: 43, hr: 12, by: 61, bw: 28, bh: 14, legW: 4.5,
    behindHead: (o) => {
      let s = '';
      for (let k = 0; k < 10; k++) {
        const a = (k / 10) * Math.PI * 2;
        s += '<circle cx="' + (o.hx - 2 + Math.cos(a) * 14).toFixed(1) + '" cy="' + (o.hy + Math.sin(a) * 14).toFixed(1) + '" r="8" fill="#c86b1f"/>';
      }
      return s + '<circle cx="' + (o.hx - 2) + '" cy="' + o.hy + '" r="15" fill="#c86b1f" stroke="none"/>';
    },
    ears: roundEars('#f4c04a'), snout: muzzle('#ffe8a3', false),
    tail: () => tailLine('#f4c04a', 4, 'M22 58 Q8 60 10 46')() + '<circle cx="10" cy="44" r="5" fill="#c86b1f"/>',
    extra: (o) => '<ellipse cx="' + (o.hx + o.hr * 1.08) + '" cy="' + (o.hy + o.hr * 0.2) + '" rx="2.6" ry="2" fill="' + INK + '" stroke="none"/>' });

  B.zebra = quad({ c: '#ffffff', d: '#e9ecef', hx: 80, hy: 30, hr: 11, by: 54, bw: 29, bh: 14, hoof: INK, legW: 4,
    neck: 'M64 46 L74 26 L86 32 L76 56 Z',
    ears: triEars('#ffffff'), snout: muzzle('#495057', true),
    behindHead: () => '<path d="M70 22 Q60 34 62 50" stroke="' + INK + '" stroke-width="5" fill="none"/>',
    marks: () => '<path d="M30 44 q4 10 0 20 M40 41 q4 12 0 26 M50 40 q4 12 0 28 M60 42 q4 10 0 24 M70 40 l6 -10 M72 48 l8 -10" stroke="' + INK + '" stroke-width="4" fill="none"/>',
    tail: tailLine('#ffffff', 3, 'M20 50 Q12 60 14 72') });

  B.giraffe = quad({ c: '#ffc94d', d: '#f4b400', hx: 82, hy: 14, hr: 8, by: 52, bw: 26, bh: 12, hoof: '#7a4a26', legW: 3.4,
    neck: 'M62 50 L76 14 L86 16 L74 56 Z',
    ears: (o) => '<path d="M' + (o.hx - 3) + ' ' + (o.hy - 7) + ' v-7 M' + (o.hx + 3) + ' ' + (o.hy - 7) + ' v-7" stroke-width="3"/><circle cx="' + (o.hx - 3) + '" cy="' + (o.hy - 15) + '" r="2.6" fill="#7a4a26"/><circle cx="' + (o.hx + 3) + '" cy="' + (o.hy - 15) + '" r="2.6" fill="#7a4a26"/>',
    snout: muzzle('#ffe8a3', true),
    marks: () => '<path d="M34 46 l6 -3 l4 5 l-4 5 l-6 -2 Z M50 44 l6 -2 l3 6 l-5 4 l-5 -3 Z M44 56 l6 -1 l2 5 l-6 2 Z M60 52 l5 -2 l2 5 l-5 2 Z M70 34 l4 -1 l1 5 l-4 1 Z M73 24 l3 -1 l1 4 l-3 1 Z" fill="#c86b1f" stroke="none"/>',
    tail: tailLine('#ffc94d', 3, 'M24 50 Q18 58 20 68') });

  // The elephant: a big round body, thick legs, a big ear and a trunk.
  B.elephant = wrap(
    '<path d="M20 58 q-8 4 -6 14" stroke="#868e96" stroke-width="3" fill="none"/>' +
    '<rect x="30" y="64" width="13" height="30" rx="5" fill="#868e96"/><rect x="58" y="64" width="13" height="30" rx="5" fill="#868e96"/>' +
    '<ellipse cx="46" cy="58" rx="28" ry="22" fill="#adb5bd"/>' +
    '<rect x="22" y="66" width="13" height="28" rx="5" fill="#adb5bd"/><rect x="50" y="68" width="13" height="26" rx="5" fill="#adb5bd"/>' +
    '<circle cx="76" cy="44" r="17" fill="#adb5bd"/>' +
    '<path d="M86 48 Q98 60 95 86 Q94 92 89 90 Q90 70 80 56 Z" fill="#adb5bd"/><path d="M90 70 h5 M89 78 h6" stroke-width="2"/>' +
    '<path d="M70 30 Q50 32 54 52 Q62 64 72 56 Z" fill="#ced4da"/>' +
    eye(80, 40, 2.8) + '<path d="M82 54 q4 4 2 8" stroke="#fff" stroke-width="3" fill="none"/>');

  // The monkey sits, with a curly tail.
  B.monkey = wrap(
    '<path d="M34 80 Q12 80 14 60 Q16 50 24 54" stroke="#8d5a34" stroke-width="5" fill="none"/>' +
    '<ellipse cx="46" cy="72" rx="18" ry="20" fill="#a0673a"/><ellipse cx="48" cy="76" rx="11" ry="13" fill="#f3d2a8" stroke="none"/>' +
    '<path d="M32 88 q4 -8 14 -6 M58 88 q-4 -8 -14 -6" stroke="#a0673a" stroke-width="9" fill="none"/><path d="M32 88 q4 -8 14 -6 M58 88 q-4 -8 -14 -6" fill="none"/>' +
    '<ellipse cx="38" cy="91" rx="8" ry="4" fill="#f3d2a8"/><ellipse cx="58" cy="91" rx="8" ry="4" fill="#f3d2a8"/>' +
    '<path d="M60 62 Q74 60 76 46" stroke="' + INK + '" stroke-width="11" fill="none"/><path d="M60 62 Q74 60 76 46" stroke="#a0673a" stroke-width="7" fill="none"/>' +
    '<circle cx="77" cy="43" r="4.5" fill="#f3d2a8"/>' +
    '<circle cx="30" cy="34" r="8" fill="#f3d2a8"/><circle cx="66" cy="34" r="8" fill="#f3d2a8"/>' +
    '<circle cx="48" cy="36" r="18" fill="#a0673a"/><path d="M36 38 Q36 26 48 30 Q60 26 60 38 Q62 52 48 52 Q34 52 36 38 Z" fill="#f3d2a8"/>' +
    eye(43, 37, 2.8) + eye(54, 37, 2.8) + '<path d="M44 46 q4 3 8 0" fill="none" stroke-width="2.5"/>');

  // The frog sits, legs folded.
  B.frog = wrap(
    '<ellipse cx="50" cy="74" rx="30" ry="18" fill="#69db7c"/>' +
    '<path d="M22 86 q-6 -10 6 -14 q10 2 8 14 Z M78 86 q6 -10 -6 -14 q-10 2 -8 14 Z" fill="#51cf66"/>' +
    '<path d="M14 92 h20 M66 92 h20" stroke-width="5"/>' +
    '<ellipse cx="50" cy="60" rx="26" ry="16" fill="#69db7c"/>' +
    '<circle cx="36" cy="46" r="10" fill="#69db7c"/><circle cx="64" cy="46" r="10" fill="#69db7c"/>' +
    '<circle cx="36" cy="46" r="6" fill="#fff" stroke="none"/><circle cx="64" cy="46" r="6" fill="#fff" stroke="none"/>' + eye(37, 47, 3.5) + eye(65, 47, 3.5) +
    '<path d="M36 64 q14 10 28 0" fill="none"/><ellipse cx="50" cy="80" rx="14" ry="8" fill="#d3f9d8" stroke="none"/>');

  // The owl perches on a branch.
  B.owl = wrap(
    '<path d="M10 90 H90" stroke="#7a4a26" stroke-width="7"/><path d="M10 90 H90" stroke="#a0673a" stroke-width="3"/>' +
    '<ellipse cx="50" cy="62" rx="24" ry="27" fill="#a0673a"/><ellipse cx="50" cy="70" rx="15" ry="17" fill="#f3d2a8" stroke="none"/>' +
    '<path d="M44 66 q3 3 6 0 q3 3 6 0 M44 74 q3 3 6 0 q3 3 6 0" stroke="#c58b52" stroke-width="2" fill="none"/>' +
    '<path d="M28 34 L34 44 M72 34 L66 44" stroke-width="4"/><path d="M28 36 L36 30 L42 40 Z M72 36 L64 30 L58 40 Z" fill="#a0673a"/>' +
    '<circle cx="40" cy="48" r="10" fill="#fff"/><circle cx="60" cy="48" r="10" fill="#fff"/>' + eye(40, 48, 5) + eye(60, 48, 5) +
    '<path d="M47 56 L50 62 L53 56 Z" fill="#fab005"/><path d="M42 89 v-4 M46 89 v-4 M54 89 v-4 M58 89 v-4" stroke="#fab005" stroke-width="3"/>');

  LG.BODIES = B;
})();
