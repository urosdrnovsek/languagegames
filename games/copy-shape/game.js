// Copy the Shape: look at the shape on the left and join the dots on the
// right to draw the same one. Drag from dot to dot, or tap one dot and then
// another. The shapes follow the order children learn to draw them: lines,
// a cross, a diagonal, a square, an X, a triangle, then a house, an arrow
// and a zigzag on a bigger grid. A line that isn't in the shape fades away.
(function () {
  // Each shape: grid size and its lines as lists of [col, row] points.
  const SHAPES = [
    [3, [[[1, 0], [1, 2]]]],
    [3, [[[0, 1], [2, 1]]]],
    [3, [[[1, 0], [1, 2]], [[0, 1], [2, 1]]]],
    [3, [[[0, 2], [2, 0]]]],
    [3, [[[0, 0], [2, 0], [2, 2], [0, 2], [0, 0]]]],
    [3, [[[0, 0], [2, 2]], [[2, 0], [0, 2]]]],
    [3, [[[1, 0], [2, 2], [0, 2], [1, 0]]]],
    [5, [[[0, 2], [4, 2], [4, 4], [0, 4], [0, 2]], [[0, 2], [2, 0], [4, 2]]]],
    [5, [[[0, 2], [4, 2]], [[2, 0], [4, 2], [2, 4]]]],
    [5, [[[0, 3], [1, 1], [2, 3], [3, 1], [4, 3]]]],
  ];
  const NS = 'http://www.w3.org/2000/svg';
  const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
  // Splits a line into steps from dot to dot, so one long line and two short
  // ones along it count the same.
  function steps(a, b) {
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const g = gcd(Math.abs(dx), Math.abs(dy)) || 1;
    const out = [];
    for (let k = 0; k < g; k++) {
      const p = [a[0] + (dx / g) * k, a[1] + (dy / g) * k];
      const q = [a[0] + (dx / g) * (k + 1), a[1] + (dy / g) * (k + 1)];
      out.push([p, q].map((x) => x.join(',')).sort().join('|'));
    }
    return out;
  }
  const at = (c) => 50 + c * 100;

  function board(n, cls) {
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + n * 100 + ' ' + n * 100);
    svg.setAttribute('class', 'dot-board ' + cls);
    let dots = '';
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) dots += '<circle class="dot" cx="' + at(c) + '" cy="' + at(r) + '" r="' + (n > 3 ? 13 : 16) + '" data-c="' + c + '" data-r="' + r + '"/>';
    svg.innerHTML = '<g class="lines"></g><line class="rubber" x1="0" y1="0" x2="0" y2="0"/>' + dots;
    return svg;
  }
  function line(svg, a, b, cls) {
    const l = document.createElementNS(NS, 'line');
    l.setAttribute('x1', at(a[0]));
    l.setAttribute('y1', at(a[1]));
    l.setAttribute('x2', at(b[0]));
    l.setAttribute('y2', at(b[1]));
    l.setAttribute('class', cls);
    svg.querySelector('.lines').appendChild(l);
    return l;
  }

  LG.createGame({
    titleKey: 'copyShape',
    descKey: 'copyShapeDesc',
    pic: 'pencil',
    rounds: SHAPES.length,
    round(i, ctx) {
      const [n, polys] = SHAPES[i];
      const goal = new Set();
      const model = board(n, 'model');
      polys.forEach((poly) => poly.slice(1).forEach((p, k) => {
        line(model, poly[k], p, 'model-line');
        steps(poly[k], p).forEach((s) => goal.add(s));
      }));
      const pad = board(n, 'drawpad');
      const have = new Set();
      const drawn = []; // [{ line, steps }]
      let mistakes = 0;
      let sel = null;
      let dragging = false;

      const wrap = LG.el('div', 'copy-boards');
      wrap.append(model, pad);
      const undo = LG.el('button', 'big-btn secondary copy-undo', LG.ICONS.again + '<span>' + LG.t('undo') + '</span>');
      undo.type = 'button';
      undo.addEventListener('click', () => {
        const last = drawn.pop();
        if (!last) return;
        last.line.remove();
        have.clear();
        drawn.forEach((d) => d.steps.forEach((s) => have.add(s)));
      });
      ctx.stage.append(wrap, undo);
      ctx.stage.classList.add('copy-stage');
      ctx.onCleanup(() => ctx.stage.classList.remove('copy-stage'));

      const rubber = pad.querySelector('.rubber');
      const toPad = (e) => {
        const pt = pad.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        return pt.matrixTransform(pad.getScreenCTM().inverse());
      };
      // The dot under the finger, with generous room around it.
      function dotAt(e) {
        const p = toPad(e);
        const c = Math.round((p.x - 50) / 100);
        const r = Math.round((p.y - 50) / 100);
        if (c < 0 || r < 0 || c >= n || r >= n) return null;
        return Math.hypot(p.x - at(c), p.y - at(r)) < 42 ? [c, r] : null;
      }
      const same = (a, b) => a && b && a[0] === b[0] && a[1] === b[1];
      function mark() {
        pad.querySelectorAll('.dot').forEach((d) => d.classList.toggle('sel', !!sel && +d.dataset.c === sel[0] && +d.dataset.r === sel[1]));
        rubber.style.display = sel && dragging ? '' : 'none';
      }
      mark();

      function connect(a, b) {
        const s = steps(a, b);
        if (s.some((x) => !goal.has(x))) {
          // Not part of the shape: show it, then let it fade away.
          mistakes++;
          LG.sfx.bad();
          const l = line(pad, a, b, 'wrong-line');
          setTimeout(() => l.remove(), 700);
          return;
        }
        LG.sfx.tap();
        drawn.push({ line: line(pad, a, b, 'drawpad-line'), steps: s });
        s.forEach((x) => have.add(x));
        if ([...goal].every((x) => have.has(x))) {
          pad.classList.add('done');
          ctx.complete(LG.speak(LG.praise()), { missed: mistakes >= 3 });
        }
      }

      pad.addEventListener('pointerdown', (e) => {
        if (ctx.isLocked()) return;
        e.preventDefault();
        const d = dotAt(e);
        if (!d) {
          sel = null;
          return mark();
        }
        // Tap-tap: a second dot finishes the line.
        if (sel && !same(sel, d)) {
          connect(sel, d);
          sel = null;
          return mark();
        }
        sel = d;
        dragging = true;
        try {
          pad.setPointerCapture(e.pointerId);
        } catch (err) {}
        rubber.setAttribute('x1', at(d[0]));
        rubber.setAttribute('y1', at(d[1]));
        rubber.setAttribute('x2', at(d[0]));
        rubber.setAttribute('y2', at(d[1]));
        mark();
      });
      pad.addEventListener('pointermove', (e) => {
        if (!dragging || !sel) return;
        const p = toPad(e);
        rubber.setAttribute('x2', p.x);
        rubber.setAttribute('y2', p.y);
      });
      const up = (e) => {
        if (!dragging) return;
        dragging = false;
        const d = e.type === 'pointerup' ? dotAt(e) : null;
        if (d && sel && !same(sel, d)) {
          connect(sel, d);
          sel = null;
        } else if (!d) sel = null;
        mark();
      };
      pad.addEventListener('pointerup', up);
      pad.addEventListener('pointercancel', up);

      if (i === 0) LG.speak(LG.t('copyPrompt'));
    },
  });
})();
