// Spot the Difference: two pictures, almost the same. Tap anything that is
// different, on either picture, and it is circled on both. Every real
// difference counts, so the number to find is the true one for each scene.
// A tap on a place that isn't different only shows a small ripple: no sound
// and no penalty. The hint button flashes one difference not found yet.
(function () {
  // Each difference: [x, y, width, height] as fractions of the picture.
  const SCENES = [
    { id: 'bedroom', w: 900, h: 882, spots: [[0.0419, 0.2463, 0.1176, 0.0939], [0.0317, 0.3716, 0.0818, 0.12], [0.7648, 0.3841, 0.0675, 0.0772], [0.001, 0.5125, 0.3119, 0.2244], [0.5941, 0.6169, 0.1636, 0.2401]] },
    { id: 'snow', w: 900, h: 1021, spots: [[0.5813, 0.1344, 0.1016, 0.0851], [0.8516, 0.1434, 0.1474, 0.1523], [0.6321, 0.5421, 0.1728, 0.1254], [0.0508, 0.8378, 0.31, 0.1299], [0.4593, 0.8065, 0.1575, 0.1254], [0.5671, 0.3925, 0.127, 0.0896], [0.6911, 0.0538, 0.1524, 0.1165]] },
    { id: 'jungle', w: 900, h: 1020, spots: [[0.1198, 0.5, 0.1746, 0.1237], [0.7391, 0.2491, 0.1371, 0.0941], [0.2873, 0.7509, 0.1909, 0.1685], [0.7746, 0.7912, 0.2203, 0.1765], [0.8305, 0.0609, 0.1695, 0.1989], [0, 0, 0.3858, 0.2348], [0.4853, 0.5224, 0.1401, 0.1093]] },
    { id: 'farm', w: 900, h: 899, spots: [[0.1884, 0.0074, 0.0995, 0.0826], [0.781, 0.0021, 0.163, 0.1568], [0.3471, 0.0233, 0.163, 0.1165], [0.0317, 0.3994, 0.2455, 0.2034], [0.5164, 0.3252, 0.146, 0.1081], [0.3048, 0.6536, 0.0995, 0.0784], [0.1354, 0.7648, 0.0995, 0.0784], [0.728, 0.786, 0.1418, 0.1314], [0.9026, 0.3199, 0.0677, 0.053]] },
    { id: 'beach', w: 900, h: 909, spots: [[0.6018, 0.3464, 0.1419, 0.1569], [0.3157, 0.4227, 0.0704, 0.0643], [0.4917, 0.4281, 0.1034, 0.0752], [0, 0.4717, 0.2761, 0.1569], [0.2772, 0.4989, 0.0869, 0.0969], [0.5743, 0.5207, 0.0814, 0.0697], [0.4532, 0.7495, 0.0814, 0.0806], [0.5523, 0.8366, 0.1254, 0.1133], [0.0297, 0.8529, 0.1144, 0.1024], [0.1562, 0.8638, 0.0979, 0.0806], [0.2662, 0.8529, 0.0979, 0.0915], [0.7173, 0.0283, 0.1034, 0.0632]] },
  ];
  const SLACK = 0.025; // taps this close to a difference still count
  const GAP = 14;
  const src = (scene, side) => 'img/' + scene.id + '-' + side + '.jpg';
  // Load the next scene while this one is played.
  const preload = (scene) => scene && ['a', 'b'].forEach((s) => (new Image().src = src(scene, s)));

  LG.createGame({
    titleKey: 'spotDiff',
    descKey: 'spotDiffDesc',
    pic: 'monkey',
    rounds: SCENES.length,
    onStart() {
      preload(SCENES[0]);
    },
    round(i, ctx) {
      const scene = SCENES[i];
      preload(SCENES[i + 1]);
      const found = new Set();
      let hints = 0;

      const head = LG.el('div', 'game-head');
      const count = LG.el('span', 'score-box', LG.ICONS.star + '<b></b>');
      const lens = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6.5" fill="none" stroke="currentColor" stroke-width="2.6"/><path d="m15 15 6 6" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>';
      const hint = LG.el('button', 'big-btn secondary spot-hint', lens + '<span>' + LG.t('hint') + '</span>');
      hint.type = 'button';
      head.append(count, hint);
      const pair = LG.el('div', 'spot-pair');
      const pics = ['a', 'b'].map((side) => {
        const box = pair.appendChild(LG.el('div', 'spot-pic'));
        const img = box.appendChild(LG.el('img'));
        img.src = src(scene, side);
        img.alt = '';
        img.draggable = false;
        box.appendChild(LG.el('div', 'spot-marks'));
        box.addEventListener('pointerdown', (e) => tap(e, box));
        return box;
      });
      ctx.stage.append(head, pair);
      ctx.stage.classList.add('spot-stage');
      ctx.onCleanup(() => ctx.stage.classList.remove('spot-stage'));
      const show = () => (count.querySelector('b').textContent = found.size + ' / ' + scene.spots.length);
      show();

      // Side by side or one above the other, whichever gives bigger pictures.
      function layout() {
        const W = ctx.stage.clientWidth - 32;
        const top = pair.getBoundingClientRect().top;
        const H = Math.max(240, window.innerHeight - top - 20);
        const r = scene.w / scene.h;
        const side = Math.min((W - GAP) / 2, H * r);
        const stack = Math.min(W, ((H - GAP) / 2) * r);
        const w = Math.floor(Math.max(side, stack));
        pair.classList.toggle('stacked', stack > side);
        pics.forEach((p) => {
          p.style.width = w + 'px';
          p.style.height = Math.floor((w - 8) / r + 8) + 'px'; // 4px border each side
        });
      }
      requestAnimationFrame(layout);
      addEventListener('resize', layout);
      ctx.onCleanup(() => removeEventListener('resize', layout));

      function mark(k, cls) {
        const [x, y, w, h] = scene.spots[k];
        return pics.map((p) => {
          const m = LG.el('span', 'spot-ring ' + cls);
          // A ring a little bigger than the difference itself.
          m.style.left = 'calc(' + x * 100 + '% - 8px)';
          m.style.top = 'calc(' + y * 100 + '% - 8px)';
          m.style.width = 'calc(' + w * 100 + '% + 16px)';
          m.style.height = 'calc(' + h * 100 + '% + 16px)';
          p.querySelector('.spot-marks').appendChild(m);
          return m;
        });
      }

      function tap(e, box) {
        if (ctx.isLocked()) return;
        e.preventDefault();
        const r = box.getBoundingClientRect();
        const fx = (e.clientX - r.left) / r.width;
        const fy = (e.clientY - r.top) / r.height;
        const k = scene.spots.findIndex(([x, y, w, h], n) => !found.has(n) && fx >= x - SLACK && fx <= x + w + SLACK && fy >= y - SLACK && fy <= y + h + SLACK);
        if (k < 0) {
          // Not a difference: a small ripple, nothing more.
          const dot = LG.el('span', 'spot-miss');
          dot.style.left = fx * 100 + '%';
          dot.style.top = fy * 100 + '%';
          box.querySelector('.spot-marks').appendChild(dot);
          setTimeout(() => dot.remove(), 600);
          return;
        }
        found.add(k);
        box.parentNode.querySelectorAll('.spot-ring.hint').forEach((x) => x.remove());
        mark(k, 'found');
        LG.sfx.good();
        show();
        if (found.size === scene.spots.length) {
          LG.confetti(40);
          ctx.complete(LG.speak(LG.praise()), { missed: hints >= 3 });
        }
      }

      hint.addEventListener('click', () => {
        const left = scene.spots.map((_, n) => n).filter((n) => !found.has(n));
        if (!left.length || ctx.isLocked()) return;
        hints++;
        pair.querySelectorAll('.spot-ring.hint').forEach((x) => x.remove());
        const rings = mark(LG.pick(left), 'hint');
        setTimeout(() => rings.forEach((x) => x.remove()), 2400);
      });

      if (i === 0) LG.speak(LG.t('spotPrompt'));
    },
  });
})();
