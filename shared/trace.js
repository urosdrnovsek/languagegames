// Tracing games: follow letter-like shapes with a watercolour brush. Each
// shape is a list of strokes (SVG paths) on writing lines. The current
// stroke shows a numbered green start dot and an arrow; the brush only
// paints while the finger stays on the dashed line, so the eyes lead and the
// hand follows. When every stroke is traced, the voice names the letter.
//
//   LG.traceGame({ titleKey, descKey, pic, glyphs: [{ ch, w, strokes }] })
//
// Glyph coordinates: x from 0 to w; writing lines at y = 30 (top), 130
// (middle), 230 (base line) and 320 (below the line, for g, j and p).
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  const H = 360;
  const PAD = 40;
  const STEP = 3;
  const TOL = 36; // how far from the line the finger may be, in board units
  const BRUSHES = ['#4dabf7', '#f06595', '#94d82d', '#fcc419', '#9775fa'];

  LG.traceGame = function (opts) {
    let brush = BRUSHES[0];
    LG.createGame({
      titleKey: opts.titleKey,
      descKey: opts.descKey,
      pic: opts.pic,
      rounds: opts.glyphs.length,
      round(i, ctx) {
        const glyph = opts.glyphs[i];
        const W = glyph.w + PAD * 2;
        const board = document.createElementNS(NS, 'svg');
        board.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
        board.setAttribute('class', 'trace-board');
        board.innerHTML =
          '<defs><filter id="wet" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="2.2"/></filter></defs>' +
          '<path class="tr-rule" d="M0 30 H' + W + '"/><path class="tr-rule mid" d="M0 130 H' + W + '"/>' +
          '<path class="tr-rule base" d="M0 230 H' + W + '"/><path class="tr-rule low" d="M0 320 H' + W + '"/>' +
          '<g class="tr-glyph" transform="translate(' + PAD + ',0)"></g>';
        const g = board.querySelector('.tr-glyph');
        const strokes = glyph.strokes.map((d) => {
          const guide = document.createElementNS(NS, 'path');
          guide.setAttribute('d', d);
          guide.setAttribute('class', 'tr-guide');
          g.appendChild(guide);
          return { d: d, guide: guide };
        });
        // Ink above the guides, the start marker on top.
        strokes.forEach((s) => {
          s.wash = document.createElementNS(NS, 'path');
          s.wash.setAttribute('d', s.d);
          s.wash.setAttribute('class', 'tr-wash');
          s.ink = document.createElementNS(NS, 'path');
          s.ink.setAttribute('d', s.d);
          s.ink.setAttribute('class', 'tr-ink');
          g.append(s.wash, s.ink);
          const len = s.guide.getTotalLength();
          s.len = len;
          s.samples = [];
          for (let t = 0; t <= len; t += STEP) {
            const p = s.guide.getPointAtLength(t);
            s.samples.push([p.x, p.y]);
          }
          const end = s.guide.getPointAtLength(len);
          s.samples.push([end.x, end.y]);
          s.dot = len < 20;
        });
        const marker = document.createElementNS(NS, 'g');
        marker.setAttribute('class', 'tr-start');
        marker.innerHTML = '<path class="tr-arrow" d="M-9 -8 L9 0 L-9 8 Z"/><circle r="17"/><text y="7"></text>';
        g.appendChild(marker);

        const swatches = LG.el('div', 'tr-swatches');
        swatches.setAttribute('aria-label', LG.t('brush'));
        BRUSHES.forEach((c) => {
          const b = LG.el('button', 'tr-swatch' + (c === brush ? ' active' : ''));
          b.type = 'button';
          b.style.background = c;
          b.setAttribute('aria-label', LG.t('brush') + ' ' + (BRUSHES.indexOf(c) + 1));
          b.addEventListener('click', () => {
            brush = c;
            swatches.querySelectorAll('.tr-swatch').forEach((x) => x.classList.toggle('active', x === b));
            paint();
          });
          swatches.appendChild(b);
        });
        ctx.stage.append(board, swatches);
        ctx.stage.classList.add('trace-stage');
        ctx.onCleanup(() => ctx.stage.classList.remove('trace-stage'));

        let cur = 0; // stroke being traced
        let at = 0; // sample reached on it
        let dragging = false;
        let finished = false;

        function paint() {
          strokes.forEach((s, k) => {
            const shown = k < cur ? s.len + 10 : k === cur ? at * STEP : 0;
            [s.wash, s.ink].forEach((p) => {
              p.style.stroke = brush;
              p.style.strokeDasharray = shown + ' ' + (s.len + 20);
            });
            s.guide.classList.toggle('now', k === cur && !finished);
            s.guide.classList.toggle('later', k > cur);
          });
          if (finished) {
            marker.style.display = 'none';
            return;
          }
          const s = strokes[cur];
          const [x, y] = s.samples[0];
          const [x2, y2] = s.samples[Math.min(s.samples.length - 1, 6)];
          const angle = (Math.atan2(y2 - y, x2 - x) * 180) / Math.PI;
          marker.setAttribute('transform', 'translate(' + x + ',' + y + ')');
          marker.querySelector('.tr-arrow').setAttribute('transform', 'rotate(' + angle + ') translate(30,0)');
          marker.querySelector('.tr-arrow').style.display = s.dot ? 'none' : '';
          marker.querySelector('text').textContent = strokes.length > 1 ? cur + 1 : '';
          marker.classList.toggle('moved', at > 0);
        }
        paint();

        function toGlyph(e) {
          const pt = board.createSVGPoint();
          pt.x = e.clientX;
          pt.y = e.clientY;
          return pt.matrixTransform(g.getScreenCTM().inverse());
        }
        const dist = (p, q) => Math.hypot(p.x - q[0], p.y - q[1]);

        function nextStroke() {
          LG.sfx.tap();
          cur++;
          at = 0;
          dragging = false;
          if (cur < strokes.length) return paint();
          finished = true;
          paint();
          board.classList.add('traced');
          const ch = glyph.ch;
          const big = ch !== ch.toLowerCase();
          LG.sfx.good();
          ctx.complete(LG.speak(LG.t(big ? 'traceBig' : 'traceSmall', { letter: LG.letterName(ch) })));
        }

        board.addEventListener('pointerdown', (e) => {
          if (finished || ctx.isLocked()) return;
          const s = strokes[cur];
          const p = toGlyph(e);
          if (dist(p, s.samples[at]) > TOL + 14) {
            marker.classList.remove('hint');
            void marker.getBBox();
            marker.classList.add('hint');
            return;
          }
          e.preventDefault();
          if (s.dot) return nextStroke();
          try {
            board.setPointerCapture(e.pointerId);
          } catch (err) {}
          dragging = true;
        });
        board.addEventListener('pointermove', (e) => {
          if (!dragging || finished) return;
          const s = strokes[cur];
          const p = toGlyph(e);
          // Only a little way ahead or back, so a loop can't be skipped.
          let best = -1;
          let bestD = Infinity;
          for (let k = Math.max(0, at - 8); k < Math.min(s.samples.length, at + 20); k++) {
            const dd = dist(p, s.samples[k]);
            if (dd < bestD) {
              bestD = dd;
              best = k;
            }
          }
          const off = bestD > TOL;
          board.classList.toggle('off', off);
          if (off) return;
          if (best > at) {
            at = best;
            paint();
          }
          if (at >= s.samples.length - 2) nextStroke();
        });
        const stop = () => {
          dragging = false;
          board.classList.remove('off');
        };
        board.addEventListener('pointerup', stop);
        board.addEventListener('pointercancel', stop);

        if (i === 0) LG.speak(LG.t('tracePrompt'));
      },
    });
  };
})();
