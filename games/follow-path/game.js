// Follow the Path: drag the car (or bee, rabbit…) along a winding road to
// its goal. It only moves while the finger stays on the road, so the eyes
// lead and the hand follows. Roads always run left to right, like reading,
// and get narrower and curvier with every round.
(function () {
  const PAIRS = [['car', 'house'], ['bee', 'flower'], ['rabbit', 'carrot'], ['mouse', 'cheese'], ['boat', 'island'], ['bird', 'nest'], ['bike', 'schoolhouse'], ['rocket', 'moon']];
  const WIDTH = [92, 80, 68, 58, 50, 42]; // road width, in board units (1000 wide)
  const BENDS = [2, 3, 3, 4, 4, 5];
  const SWING = [70, 120, 160, 180, 200, 210];
  const STEP = 4; // distance between path samples
  const NS = 'http://www.w3.org/2000/svg';
  let pairs = [];

  // A smooth curve through the points (Catmull-Rom as cubic Béziers).
  function curve(pts) {
    let d = 'M' + pts[0].join(' ');
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ' C' + c1.join(' ') + ' ' + c2.join(' ') + ' ' + p2.join(' ');
    }
    return d;
  }
  const pic = (name, size) => LG.picture(name).replace('<svg ', '<svg x="' + -size / 2 + '" y="' + -size / 2 + '" width="' + size + '" height="' + size + '" ');

  LG.createGame({
    titleKey: 'followPath',
    descKey: 'followPathDesc',
    pic: 'car',
    rounds: WIDTH.length,
    onStart() {
      pairs = LG.shuffle(PAIRS);
    },
    round(i, ctx) {
      const [mover, goal] = pairs[i % pairs.length];
      // Phones get a squarer board with fewer bends, so the road stays big.
      const narrow = ctx.stage.clientWidth < 600;
      const BW = narrow ? 600 : 1000;
      const BH = narrow ? 720 : 600;
      const bends = narrow ? Math.max(2, BENDS[i] - 1) : BENDS[i];
      const swing = SWING[i] * (narrow ? 1.25 : 1);
      const w = WIDTH[i] * (narrow ? 1.1 : 1);
      const pts = [];
      for (let k = 0; k <= bends; k++) {
        const x = 90 + ((BW - 180) * k) / bends;
        const y = k === 0 || k === bends ? BH / 2 + (LG.random() - 0.5) * 120 : BH / 2 + (k % 2 ? -1 : 1) * swing * (0.6 + LG.random() * 0.4);
        pts.push([Math.round(x), Math.round(y)]);
      }
      const d = curve(pts);

      const board = document.createElementNS(NS, 'svg');
      board.setAttribute('viewBox', '0 0 ' + BW + ' ' + BH);
      board.setAttribute('class', 'path-board');
      board.innerHTML =
        '<path d="' + d + '" class="road-edge" stroke-width="' + (w + 12) + '"/>' +
        '<path d="' + d + '" class="road" stroke-width="' + w + '"/>' +
        '<path d="' + d + '" class="road-line"/>' +
        '<path d="' + d + '" class="road-done" stroke-width="' + w * 0.5 + '"/>' +
        '<g class="goal" transform="translate(' + pts[pts.length - 1].join(',') + ')">' + pic(goal, 130) + '</g>' +
        '<g class="mover">' + pic(mover, 110) + '</g>';
      ctx.stage.append(board);
      ctx.stage.classList.add('path-stage');
      ctx.onCleanup(() => ctx.stage.classList.remove('path-stage'));

      const road = board.querySelector('.road');
      const done = board.querySelector('.road-done');
      const moverEl = board.querySelector('.mover');
      const total = road.getTotalLength();
      const samples = [];
      for (let s = 0; s <= total; s += STEP) {
        const p = road.getPointAtLength(s);
        samples.push([p.x, p.y]);
      }
      let at = 0;
      let dragging = false;
      let finished = false;

      function place() {
        const [x, y] = samples[at];
        const [x2, y2] = samples[Math.min(samples.length - 1, at + 4)];
        const angle = Math.max(-55, Math.min(55, (Math.atan2(y2 - y, x2 - x) * 180) / Math.PI));
        moverEl.setAttribute('transform', 'translate(' + x + ',' + y + ') rotate(' + (at < samples.length - 4 ? angle : 0) + ')');
        done.style.strokeDasharray = at * STEP + ' ' + (total + 10);
      }
      place();

      function toBoard(e) {
        const pt = board.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        return pt.matrixTransform(board.getScreenCTM().inverse());
      }
      const dist = (p, s) => Math.hypot(p.x - s[0], p.y - s[1]);

      board.addEventListener('pointerdown', (e) => {
        if (finished || ctx.isLocked()) return;
        const p = toBoard(e);
        if (dist(p, samples[at]) > 90) {
          // Show where to start.
          moverEl.classList.remove('hint');
          void moverEl.getBBox();
          moverEl.classList.add('hint');
          return;
        }
        e.preventDefault();
        try {
          board.setPointerCapture(e.pointerId);
        } catch (err) {}
        dragging = true;
        LG.sfx.tap();
      });
      board.addEventListener('pointermove', (e) => {
        if (!dragging || finished) return;
        const p = toBoard(e);
        // Look a little ahead and behind on the road, so the car can't jump
        // across a bend.
        let best = -1;
        let bestD = Infinity;
        for (let k = Math.max(0, at - 10); k < Math.min(samples.length, at + 30); k++) {
          const dd = dist(p, samples[k]);
          if (dd < bestD) {
            bestD = dd;
            best = k;
          }
        }
        const off = bestD > w / 2 + 22;
        board.classList.toggle('off-road', off);
        if (off) return;
        if (best > at) {
          at = best;
          place();
        }
        if (at >= samples.length - 3) win();
      });
      const stop = () => {
        dragging = false;
        board.classList.remove('off-road');
      };
      board.addEventListener('pointerup', stop);
      board.addEventListener('pointercancel', stop);

      function win() {
        finished = true;
        dragging = false;
        at = samples.length - 1;
        place();
        board.classList.remove('off-road');
        board.querySelector('.goal').classList.add('reached');
        LG.markCorrect(goal);
        ctx.complete(LG.speak(LG.praise()));
      }

      if (i === 0) LG.speak(LG.t('pathPrompt'));
    },
  });
})();
