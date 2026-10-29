// Spot It!: a new drawn scene every round. The game places pictures on one
// of the backgrounds in scenes.js, then makes the differences itself: a
// picture gone, in another colour, turned the other way, swapped for another,
// or one added. So it always knows exactly where they are and how many. When
// a difference is found, the voice says the word for it.
(function () {
  const ROUNDS = 6;
  const OBJECTS = [13, 15, 16, 17, 18, 20];
  const DIFFS = [3, 4, 4, 5, 6, 7];
  const BW = 1000;
  const BH = 900;
  const SLACK = 0.02;
  const GAP = 14;
  let themes = [];
  let uid = 0;

  // A small seeded random generator, so both pictures get the same background.
  function seeded(seed) {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const rnd = (a, b) => a + LG.random() * (b - a);
  const words = {};
  LG.words(LG.lang, { allTopics: true }).forEach((w) => (words[w.pic] = words[w.pic] || w.word));

  // ---- Pictures and their real size ----

  // Full-body animals where there is one, else the picture from the word games.
  const art = (pic) => LG.BODIES[pic] || LG.picture(pic);
  const exists = (pic) => !!(LG.BODIES[pic] || LG.PICTURES[pic]);
  // The part of the 100 x 100 box each picture really fills, measured once in
  // the page, so things stand on the ground and boxes fit what is drawn.
  const boxes = {};
  function bounds(pic) {
    if (boxes[pic]) return boxes[pic];
    let b = { x: 0, y: 0, w: 100, h: 100 };
    try {
      const div = document.body.appendChild(LG.el('div'));
      div.style.cssText = 'position:fixed;left:-500px;top:0;width:100px;height:100px;visibility:hidden';
      div.innerHTML = art(pic);
      const svg = div.firstElementChild;
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      while (svg.firstChild) g.appendChild(svg.firstChild);
      svg.appendChild(g);
      const r = g.getBBox();
      div.remove();
      if (r.width > 1 && r.height > 1) b = { x: r.x - 1.5, y: r.y - 1.5, w: r.width + 3, h: r.height + 3 };
    } catch (e) {
      // keep the whole box
    }
    return (boxes[pic] = b);
  }

  // A picture of height about H, bottom middle at (cx, base). Wide things are
  // held back a little so a whale is not as long as a field.
  function sized(pic, H, cx, base, fit) {
    const b = bounds(pic);
    const k = fit ? Math.min(H / b.h, fit / b.w) : H / Math.max(b.h, b.w * 0.75);
    return { pic: pic, k: k, cx: cx, base: base, w: b.w * k, h: b.h * k };
  }
  const rect = (o) => ({ x: o.cx - o.w / 2, y: o.base - o.h, w: o.w, h: o.h });

  // ---- Building a scene ----

  function overlaps(a, b) {
    const p = Math.min(a.w, b.w, a.h, b.h) * 0.16;
    return a.x + p < b.x + b.w - p && b.x + p < a.x + a.w - p && a.y + p < b.y + b.h - p && b.y + p < a.y + a.h - p;
  }

  // Finds a free place for pic in a zone, or null.
  function place(zone, pic, taken) {
    const H = LG.SCENE_SIZE[pic] || 70;
    const clear = (o) => !taken.some((q) => overlaps(rect(o), rect(q)));
    if (zone.type === 'slots') {
      const free = LG.shuffle(zone.slots.filter((sl) => !taken.some((o) => o.slot === sl)));
      for (const sl of free) {
        const gap = zone.slots.length > 1 ? Math.min(...zone.slots.filter((t) => t !== sl && t[1] === sl[1]).map((t) => Math.abs(t[0] - sl[0])), 999) : 999;
        const o = sized(pic, zone.h, sl[0], sl[1], Math.min(zone.h * 1.3, gap - 8));
        o.zone = zone;
        o.slot = sl;
        if (clear(o)) return o;
      }
      return null;
    }
    for (let tries = 0; tries < 150; tries++) {
      let o;
      if (zone.type === 'float') {
        o = sized(pic, H, 0, 0);
        const cy = rnd(zone.y0, zone.y1);
        o.base = cy + o.h / 2;
      } else {
        const y = rnd(zone.y0, zone.y1);
        const t = zone.y1 > zone.y0 ? (y - zone.y0) / (zone.y1 - zone.y0) : 0.5;
        o = sized(pic, H * (zone.depth[0] + (zone.depth[1] - zone.depth[0]) * t), 0, y);
        o.depth = zone.depth[0] + (zone.depth[1] - zone.depth[0]) * t;
      }
      if (o.w > zone.x1 - zone.x0) continue;
      o.cx = rnd(zone.x0 + o.w / 2, zone.x1 - o.w / 2);
      o.zone = zone;
      if (o.base - o.h < 6 || o.base > BH - 4) continue;
      // Keep out of ponds, tables and the like: the lower part must not touch them.
      const low = { x: o.cx - o.w * 0.4, y: o.base - o.h * 0.4, w: o.w * 0.8, h: o.h * 0.4 };
      if (zone.avoid && zone.avoid.some(([x0, y0, x1, y1]) => low.x < x1 && low.x + low.w > x0 && low.y < y1 && low.y + low.h > y0)) continue;
      if (clear(o)) return o;
    }
    return null;
  }

  function build(themeId, count, diffCount) {
    const theme = LG.SCENES[themeId];
    const objs = [];
    const used = new Set();
    const pickPic = (zone, ok) => {
      const free = zone.items.split(' ').filter((p) => !used.has(p) && exists(p) && (!ok || ok(p)));
      return free.length ? LG.pick(free) : null;
    };
    theme.zones.forEach((zone) => {
      const n = zone.fixed || Math.max(1, Math.round(count * zone.share));
      for (let k = 0, got = 0; got < n && k < n * 3; k++) {
        const pic = pickPic(zone);
        if (!pic) break;
        const o = place(zone, pic, objs);
        if (!o) continue;
        used.add(pic);
        objs.push(o);
        got++;
      }
    });

    // Differences, each on a different picture, with a mix of kinds.
    const diffs = [];
    const order = LG.shuffle(objs.slice());
    const kinds = LG.shuffle(['gone', 'color', 'flip', 'swap', 'add', 'color', 'gone', 'swap', 'flip', 'add']);
    for (let k = 0; diffs.length < diffCount && k < 60; k++) {
      const kind = kinds[k % kinds.length];
      if (kind === 'add') {
        const zone = LG.pick(theme.zones.filter((z) => !z.fixed));
        const pic = pickPic(zone);
        const o = pic && place(zone, pic, objs.concat(diffs.map((d) => d.add || d.alt).filter(Boolean)));
        if (!o) continue;
        used.add(pic);
        diffs.push({ kind: 'add', add: o, word: pic });
        continue;
      }
      const o = order.find((x) => !diffs.some((d) => d.obj === x) && (kind !== 'color' || LG.SCENE_HUE.has(x.pic)) && (kind !== 'flip' || LG.SCENE_FLIP.has(x.pic)));
      if (!o) continue;
      const d = { kind: kind, obj: o, word: o.pic };
      if (kind === 'swap') {
        // Something else of about the same size, in the same place.
        const size = (p) => LG.SCENE_SIZE[p] || 70;
        const pic = pickPic(o.zone, (p) => o.slot || o.zone.type === 'float' || (size(p) / size(o.pic) < 1.6 && size(o.pic) / size(p) < 1.6));
        if (!pic) continue;
        const alt = o.slot ? sized(pic, o.zone.h, o.cx, o.base, o.w * 1.15) : sized(pic, size(pic) * (o.depth || 1), o.cx, o.base);
        if (o.zone.type === 'float') alt.base = o.base - o.h / 2 + alt.h / 2;
        alt.zone = o.zone;
        used.add(pic);
        d.swap = pic;
        d.alt = alt;
      }
      diffs.push(d);
    }
    return { theme: themeId, seed: Math.floor(LG.random() * 1e9), objs: objs, diffs: diffs };
  }

  // ---- Drawing ----

  function picture(o, extra) {
    const b = bounds(o.pic);
    const x = o.cx - (b.x + b.w / 2) * o.k;
    const y = o.base - (b.y + b.h) * o.k;
    let g = art(o.pic).replace('<svg ', '<svg x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + (100 * o.k).toFixed(1) + '" height="' + (100 * o.k).toFixed(1) + '" ');
    if (extra && extra.flip) g = '<g transform="matrix(-1 0 0 1 ' + (2 * o.cx).toFixed(1) + ' 0)">' + g + '</g>';
    if (extra && extra.hue) g = '<g filter="url(#' + extra.hue + ')">' + g + '</g>';
    const z = o.zone;
    const shadow = z.type !== 'float' && z.shadow && !z.noShadow ? '<ellipse cx="' + o.cx.toFixed(1) + '" cy="' + (o.base - 1).toFixed(1) + '" rx="' + (o.w * 0.44).toFixed(1) + '" ry="' + Math.max(3, o.w * 0.06).toFixed(1) + '" fill="' + z.shadow + '"/>' : '';
    return { y: z.type === 'float' ? -1 : o.base, svg: shadow + g };
  }

  function draw(scene, right) {
    const hue = 'hue' + ++uid;
    const parts = [];
    scene.objs.forEach((o) => {
      const d = scene.diffs.find((x) => x.obj === o);
      if (!right || !d) return parts.push(picture(o));
      if (d.kind === 'color') return parts.push(picture(o, { hue: hue }));
      if (d.kind === 'flip') return parts.push(picture(o, { flip: true }));
      if (d.kind === 'swap') return parts.push(picture(d.alt));
    });
    if (right) scene.diffs.filter((d) => d.kind === 'add').forEach((d) => parts.push(picture(d.add)));
    parts.sort((a, b) => a.y - b.y);
    return '<svg viewBox="0 0 ' + BW + ' ' + BH + '" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<defs><filter id="' + hue + '"><feColorMatrix type="hueRotate" values="150"/></filter></defs>' +
      LG.SCENES[scene.theme].bg(seeded(scene.seed)) + parts.map((p) => p.svg).join('') + '</svg>';
  }

  // Where each difference is, as fractions of the picture. Small things get a
  // box big enough for a finger.
  function spotsOf(scene) {
    return scene.diffs.map((d) => {
      let b = rect(d.add || d.obj);
      if (d.alt) {
        const c = rect(d.alt);
        const x0 = Math.min(b.x, c.x), y0 = Math.min(b.y, c.y);
        b = { x: x0, y: y0, w: Math.max(b.x + b.w, c.x + c.w) - x0, h: Math.max(b.y + b.h, c.y + c.h) - y0 };
      }
      const w = Math.max(56, b.w), h = Math.max(56, b.h);
      const x = Math.min(BW - w, Math.max(0, b.x - (w - b.w) / 2)), y = Math.min(BH - h, Math.max(0, b.y - (h - b.h) / 2));
      return { word: d.word, r: [x / BW, y / BH, w / BW, h / BH] };
    });
  }

  // ---- The game ----

  LG.createGame({
    titleKey: 'spotScenes',
    descKey: 'spotScenesDesc',
    pic: 'butterfly',
    rounds: ROUNDS,
    onStart() {
      themes = LG.shuffle(Object.keys(LG.SCENES)).slice(0, ROUNDS);
    },
    round(i, ctx) {
      const scene = build(themes[i], OBJECTS[i], DIFFS[i]);
      const spots = spotsOf(scene);
      const found = new Set();
      let hints = 0;

      const head = LG.el('div', 'game-head');
      const count = LG.el('span', 'score-box', LG.ICONS.star + '<b></b>');
      const lens = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6.5" fill="none" stroke="currentColor" stroke-width="2.6"/><path d="m15 15 6 6" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>';
      const hint = LG.el('button', 'big-btn secondary spot-hint', lens + '<span>' + LG.t('hint') + '</span>');
      hint.type = 'button';
      head.append(count, hint);
      const pair = LG.el('div', 'spot-pair');
      pair.dataset.spots = JSON.stringify(spots.map((x) => x.r)); // for automated checks
      const pics = [false, true].map((right) => {
        const p = pair.appendChild(LG.el('div', 'spot-pic', draw(scene, right)));
        p.appendChild(LG.el('div', 'spot-marks'));
        p.addEventListener('pointerdown', (e) => tap(e, p));
        return p;
      });
      ctx.stage.append(head, pair);
      ctx.stage.classList.add('spot-stage');
      ctx.onCleanup(() => ctx.stage.classList.remove('spot-stage'));
      const show = () => (count.querySelector('b').textContent = found.size + ' / ' + spots.length);
      show();

      // Side by side or one above the other, whichever gives bigger pictures.
      function layout() {
        const W = ctx.stage.clientWidth - 32;
        const H = Math.max(240, window.innerHeight - pair.getBoundingClientRect().top - 20);
        const r = BW / BH;
        const side = Math.min((W - GAP) / 2, H * r);
        const stack = Math.min(W, ((H - GAP) / 2) * r);
        const w = Math.floor(Math.max(side, stack));
        pair.classList.toggle('stacked', stack > side);
        pics.forEach((p) => {
          p.style.width = w + 'px';
          p.style.height = Math.floor((w - 8) / r + 8) + 'px';
        });
      }
      requestAnimationFrame(layout);
      addEventListener('resize', layout);
      ctx.onCleanup(() => removeEventListener('resize', layout));

      function mark(k, cls) {
        const [x, y, w, h] = spots[k].r;
        return pics.map((p) => {
          const m = LG.el('span', 'spot-ring ' + cls);
          m.style.left = 'calc(' + x * 100 + '% - 8px)';
          m.style.top = 'calc(' + y * 100 + '% - 8px)';
          m.style.width = 'calc(' + w * 100 + '% + 16px)';
          m.style.height = 'calc(' + h * 100 + '% + 16px)';
          p.querySelector('.spot-marks').appendChild(m);
          return m;
        });
      }

      function tap(e, p) {
        if (ctx.isLocked()) return;
        e.preventDefault();
        const r = p.getBoundingClientRect();
        const fx = (e.clientX - r.left - 4) / (r.width - 8);
        const fy = (e.clientY - r.top - 4) / (r.height - 8);
        const k = spots.findIndex((s, n) => !found.has(n) && fx >= s.r[0] - SLACK && fx <= s.r[0] + s.r[2] + SLACK && fy >= s.r[1] - SLACK && fy <= s.r[1] + s.r[3] + SLACK);
        if (k < 0) {
          const dot = LG.el('span', 'spot-miss');
          dot.style.left = fx * 100 + '%';
          dot.style.top = fy * 100 + '%';
          p.querySelector('.spot-marks').appendChild(dot);
          setTimeout(() => dot.remove(), 600);
          return;
        }
        found.add(k);
        pair.querySelectorAll('.spot-ring.hint').forEach((x) => x.remove());
        mark(k, 'found');
        LG.sfx.good();
        if (words[spots[k].word]) LG.speak(words[spots[k].word]);
        LG.markCorrect(spots[k].word);
        show();
        if (found.size === spots.length) {
          LG.confetti(40);
          ctx.complete(new Promise((res) => setTimeout(res, 900)).then(() => LG.speak(LG.praise())), { missed: hints >= 3 });
        }
      }

      hint.addEventListener('click', () => {
        const left = spots.map((_, n) => n).filter((n) => !found.has(n));
        if (!left.length || ctx.isLocked()) return;
        hints++;
        pair.querySelectorAll('.spot-ring.hint').forEach((x) => x.remove());
        const rings = mark(LG.pick(left), 'hint');
        setTimeout(() => rings.forEach((x) => x.remove()), 2400);
      });

      if (i === 0) LG.speak(LG.t('spotPrompt'));
    },
  });

  // For checking the scenes: LG.spotScene('beach', 14, 5) gives both pictures.
  LG.spotScene = function (theme, n, d) {
    const s = build(theme, n, d);
    return { left: draw(s, false), right: draw(s, true), spots: spotsOf(s), diffs: s.diffs.map((x) => x.kind + ':' + (x.swap ? x.word + '>' + x.swap : x.word)) };
  };
})();
