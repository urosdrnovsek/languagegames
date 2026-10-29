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

  // ---- Building a scene ----

  function box(o) {
    return { x: o.x, y: o.y - o.s * 0.94, w: o.s, h: o.s };
  }
  function overlaps(a, b, keep) {
    const p = Math.min(a.w, b.w) * (keep || 0.18);
    return a.x + p < b.x + b.w - p && b.x + p < a.x + a.w - p && a.y + p < b.y + b.h - p && b.y + p < a.y + a.h - p;
  }

  // Finds a free place for pic in a zone, or null.
  function place(zone, pic, taken) {
    const size = LG.SCENE_SIZE[pic] || 1;
    if (zone.slots) {
      const free = zone.slots.filter(([x, y]) => !taken.some((o) => o.zone === zone && o.slot === x + ',' + y));
      if (!free.length) return null;
      const [x, y] = LG.pick(free);
      const s = zone.size * Math.min(1, size);
      return { zone: zone, slot: x + ',' + y, x: x + (zone.size - s) / 2, y: y, s: s };
    }
    for (let tries = 0; tries < 120; tries++) {
      const y = rnd(zone.y0, zone.y1);
      const t = (y - zone.y0) / (zone.y1 - zone.y0);
      const s = zone.base * (zone.scale[0] + (zone.scale[1] - zone.scale[0]) * t) * size;
      const x = rnd(zone.x0, zone.x1 - s);
      const o = { zone: zone, x: x, y: y, s: s };
      if (y - s * 0.94 < 8) continue;
      if (!taken.some((q) => overlaps(box(o), box(q)))) return o;
    }
    return null;
  }

  function build(themeId, count, diffCount) {
    const theme = LG.SCENES[themeId];
    const objs = [];
    const used = new Set();
    const pickPic = (zone) => {
      const free = zone.items.split(' ').filter((p) => !used.has(p) && LG.PICTURES[p]);
      return free.length ? LG.pick(free) : null;
    };
    theme.zones.forEach((zone) => {
      const n = zone.fixed || Math.max(1, Math.round(count * zone.share));
      for (let k = 0; k < n; k++) {
        const pic = pickPic(zone);
        if (!pic) break;
        const o = place(zone, pic, objs);
        if (!o) continue;
        o.pic = pic;
        used.add(pic);
        objs.push(o);
      }
    });

    // Differences, each on a different picture, with a mix of kinds.
    const diffs = [];
    const order = LG.shuffle(objs.slice());
    let kinds = LG.shuffle(['gone', 'color', 'flip', 'swap', 'add', 'color', 'gone', 'swap', 'flip', 'add']);
    for (let k = 0; diffs.length < diffCount && k < 40; k++) {
      const kind = kinds[k % kinds.length];
      if (kind === 'add') {
        const zone = LG.pick(theme.zones.filter((z) => !z.fixed));
        const pic = pickPic(zone);
        const o = pic && place(zone, pic, objs.concat(diffs.filter((d) => d.add).map((d) => d.add)));
        if (!o) continue;
        o.pic = pic;
        used.add(pic);
        diffs.push({ kind: 'add', add: o, word: pic });
        continue;
      }
      const o = order.find((x) => !diffs.some((d) => d.obj === x) && (kind !== 'color' || LG.SCENE_HUE.has(x.pic)) && (kind !== 'flip' || LG.SCENE_FLIP.has(x.pic)));
      if (!o) continue;
      const d = { kind: kind, obj: o, word: o.pic };
      if (kind === 'swap') {
        const pic = pickPic(o.zone);
        if (!pic) continue;
        used.add(pic);
        d.swap = pic;
      }
      diffs.push(d);
    }
    return { theme: themeId, seed: Math.floor(LG.random() * 1e9), objs: objs, diffs: diffs };
  }

  // ---- Drawing ----

  function picture(o, extra) {
    const inner = LG.picture(extra && extra.pic ? extra.pic : o.pic).replace('<svg ', '<svg x="' + o.x.toFixed(1) + '" y="' + (o.y - o.s * 0.94).toFixed(1) + '" width="' + o.s.toFixed(1) + '" height="' + o.s.toFixed(1) + '" ');
    let g = inner;
    if (extra && extra.flip) g = '<g transform="matrix(-1 0 0 1 ' + (2 * o.x + o.s).toFixed(1) + ' 0)">' + g + '</g>';
    if (extra && extra.hue) g = '<g filter="url(#' + extra.hue + ')">' + g + '</g>';
    const shadow = o.zone.shadow ? '<ellipse cx="' + (o.x + o.s / 2).toFixed(1) + '" cy="' + (o.y - o.s * 0.04).toFixed(1) + '" rx="' + (o.s * 0.36).toFixed(1) + '" ry="' + (o.s * 0.07).toFixed(1) + '" fill="' + o.zone.shadow + '"/>' : '';
    return { y: o.y, svg: shadow + g };
  }

  function draw(scene, right) {
    const hue = 'hue' + ++uid;
    const parts = [];
    scene.objs.forEach((o) => {
      const d = scene.diffs.find((x) => x.obj === o);
      if (!right || !d) return parts.push(picture(o));
      if (d.kind === 'gone') return;
      if (d.kind === 'color') return parts.push(picture(o, { hue: hue }));
      if (d.kind === 'flip') return parts.push(picture(o, { flip: true }));
      if (d.kind === 'swap') return parts.push(picture(o, { pic: d.swap }));
    });
    if (right) scene.diffs.filter((d) => d.kind === 'add').forEach((d) => parts.push(picture(d.add)));
    parts.sort((a, b) => a.y - b.y);
    return '<svg viewBox="0 0 ' + BW + ' ' + BH + '" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<defs><filter id="' + hue + '"><feColorMatrix type="hueRotate" values="150"/></filter></defs>' +
      LG.SCENES[scene.theme].bg(seeded(scene.seed)) + parts.map((p) => p.svg).join('') + '</svg>';
  }

  // Where each difference is, as fractions of the picture.
  function spotsOf(scene) {
    return scene.diffs.map((d) => {
      const o = d.add || d.obj;
      let b = box(o);
      if (d.kind === 'swap') {
        const s2 = o.s * Math.min(1.6, (LG.SCENE_SIZE[d.swap] || 1) / (LG.SCENE_SIZE[o.pic] || 1));
        if (s2 > o.s) b = { x: o.x - (s2 - o.s) / 2, y: o.y - s2 * 0.94, w: s2, h: s2 };
      }
      const inset = 0.08;
      return { word: d.word, r: [(b.x + b.w * inset) / BW, (b.y + b.h * inset) / BH, (b.w * (1 - 2 * inset)) / BW, (b.h * (1 - 2 * inset)) / BH] };
    });
  }

  // ---- The game ----

  LG.createGame({
    titleKey: 'spotScenes',
    descKey: 'spotScenesDesc',
    pic: 'butterfly',
    rounds: ROUNDS,
    onStart() {
      const ids = Object.keys(LG.SCENES);
      themes = LG.shuffle(ids).concat(LG.shuffle(ids)).slice(0, ROUNDS);
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
