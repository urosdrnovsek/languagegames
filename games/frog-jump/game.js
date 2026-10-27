// Frog Jump: lily pads with words float along the river. Hop on the pad
// with the word for the picture; five hops cross the river. A wrong pad
// sinks with a splash and the frog swims back one pad (not in calm mode).
// Three crossings, each a little faster.
(function () {
  const LANES = 5;
  const PADS = 3;
  const SPEEDS = [34, 46, 58]; // pixels per second, per crossing
  const words = LG.words(LG.lang, { min: 3 });
  const unique = words.filter((w, i) => words.findIndex((x) => x.word === w.word) === i);
  let queue = [];
  let totalMistakes = 0;

  LG.createGame({
    titleKey: 'frogJump',
    descKey: 'frogJumpDesc',
    pic: 'frog',
    rounds: 3,
    onStart() {
      queue = LG.deal(unique, 60);
      totalMistakes = 0;
    },
    round(crossing, ctx) {
      const speed = ctx.calm ? 26 : SPEEDS[crossing];
      let frogLane = -1; // -1: the near bank; LANES: the far bank
      let mistakes = 0;
      let busy = false;
      const lanes = Array.from({ length: LANES }, () => ({ pads: [], offset: 0, active: false, landed: null }));

      const target = LG.el('div', 'frog-target');
      const pond = LG.el('div', 'pond');
      pond.innerHTML = '<div class="bank far"></div><div class="bank near"></div>';
      const frog = pond.appendChild(LG.el('div', 'frog', LG.picture('frog')));
      ctx.stage.append(target, pond);
      ctx.stage.classList.add('frog-stage');
      ctx.onCleanup(() => ctx.stage.classList.remove('frog-stage'));

      // Sizes follow the pond, so the game fits any screen.
      const geo = () => {
        const W = pond.clientWidth;
        const H = pond.clientHeight;
        const bank = Math.max(44, H * 0.11);
        const laneH = (H - 2 * bank) / LANES;
        const padW = Math.min(200, Math.max(W * 0.36, 110));
        const padH = Math.min(laneH * 0.84, 78);
        return { W: W, H: H, bank: bank, laneH: laneH, padW: padW, padH: padH, loop: Math.max(W + padW, PADS * (padW + 24)) };
      };
      // Lane 0 is next to the near bank (bottom).
      const laneTop = (g, k) => g.H - g.bank - (k + 1) * g.laneH;

      function showTarget(w) {
        target.innerHTML = '';
        const card = LG.pictureCard(w.pic, () => LG.speak(w.word));
        card.classList.add('small');
        target.appendChild(card);
      }

      function distractors(w) {
        const others = unique.filter((x) => x.word !== w.word);
        const similar = crossing > 0 ? LG.sample(others.filter((x) => x.letters[0] === w.letters[0]), 1) : [];
        return similar.concat(LG.sample(others.filter((x) => !similar.includes(x)), PADS - 1 - similar.length));
      }

      function activate(k) {
        const lane = lanes[k];
        const w = queue.shift() || LG.pick(unique);
        lane.word = w;
        lane.active = true;
        lane.offset = LG.random() * 200;
        lane.pads = LG.shuffle([w].concat(distractors(w))).map((opt) => {
          const el = LG.el('button', 'pad', '<span>' + LG.fmt(opt.word) + '</span>');
          el.type = 'button';
          const pad = { w: opt, el: el, x: -999 };
          el.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            tap(k, pad);
          });
          pond.appendChild(el);
          return pad;
        });
        showTarget(w);
        place();
      }

      function clearLane(k) {
        const lane = lanes[k];
        lane.pads.forEach((p) => p.el.remove());
        lane.pads = [];
        lane.active = false;
        lane.landed = null;
      }

      function tap(k, pad) {
        const lane = lanes[k];
        if (busy || ctx.isLocked() || !lane.active || pad.gone) return;
        if (pad.w.word === lane.word.word) {
          lane.active = false;
          lane.landed = pad;
          lane.pads.filter((p) => p !== pad).forEach((p) => {
            p.gone = true;
            p.el.classList.add('fade');
            setTimeout(() => p.el.remove(), 400);
          });
          lane.pads = [pad];
          pad.el.classList.add('landed');
          LG.sfx.good();
          LG.markCorrect(lane.word.pic);
          LG.speak(lane.word.word);
          hop(k);
          if (k === LANES - 1) {
            busy = true;
            setTimeout(() => {
              hop(LANES);
              totalMistakes += mistakes;
              if (crossing < ctx.rounds - 1) return ctx.complete(LG.speak(LG.praise()), { missed: mistakes >= 3 });
              LG.sfx.good();
              const stars = totalMistakes <= 2 ? 3 : totalMistakes <= 6 ? 2 : 1;
              setTimeout(() => ctx.end({ won: true, stars: stars, text: LG.t('frogWon') }), 700);
            }, 650);
          } else {
            busy = true;
            setTimeout(() => {
              busy = false;
              activate(k + 1);
            }, 450);
          }
          return;
        }
        // Wrong pad: it sinks.
        mistakes++;
        pad.gone = true;
        pad.el.classList.add('sink');
        pad.el.disabled = true;
        LG.sfx.bad();
        LG.speak(LG.t('tryAgain'));
        if (ctx.calm) return;
        busy = true;
        frog.classList.add('splash');
        setTimeout(() => {
          frog.classList.remove('splash');
          queue.push(lane.word);
          clearLane(k);
          // Swim back one pad; that lane gets a new word.
          if (frogLane >= 0) {
            clearLane(frogLane);
            hop(frogLane - 1);
          }
          busy = false;
          activate(Math.max(0, frogLane + 1));
        }, 700);
      }

      function hop(k) {
        frogLane = k;
        frog.classList.remove('jump');
        void frog.offsetWidth;
        frog.classList.add('jump');
        place();
      }

      // Puts the pads and the frog where they belong.
      function place() {
        const g = geo();
        lanes.forEach((lane, k) => {
          const top = laneTop(g, k) + (g.laneH - g.padH) / 2;
          lane.pads.forEach((p, i) => {
            if (lane.active) p.x = ((lane.offset + (i * g.loop) / PADS) % g.loop + g.loop) % g.loop - g.padW;
            p.el.style.width = g.padW + 'px';
            p.el.style.height = g.padH + 'px';
            // Long words, wide fonts and spacing get smaller letters so the
            // word fits on the pad.
            if (p.fitW !== g.padW) {
              p.fitW = g.padW;
              let size = Math.min(g.padH * 0.36, 30);
              p.el.style.fontSize = size + 'px';
              const label = p.el.firstChild;
              while (label.scrollWidth > g.padW - 14 && size > 12) p.el.style.fontSize = --size + 'px';
            }
            p.el.style.transform = 'translate(' + p.x + 'px,' + top + 'px)';
          });
        });
        const size = Math.min(g.laneH * 0.95, 74);
        let x = g.W / 2;
        let y = g.H - g.bank / 2;
        if (frogLane === LANES) y = g.bank / 2;
        else if (frogLane >= 0 && lanes[frogLane].landed) {
          x = lanes[frogLane].landed.x + g.padW / 2;
          y = laneTop(g, frogLane) + g.laneH / 2 - size * 0.15;
        }
        frog.style.width = frog.style.height = size + 'px';
        frog.style.left = x - size / 2 + 'px';
        frog.style.top = y - size / 2 + 'px';
      }

      let last = performance.now();
      let frame = requestAnimationFrame(step);
      ctx.onCleanup(() => cancelAnimationFrame(frame));
      function step(now) {
        const dt = document.hidden ? 0 : Math.min(0.05, (now - last) / 1000);
        last = now;
        lanes.forEach((lane, k) => {
          if (lane.active) lane.offset += speed * dt * (k % 2 ? -1 : 1);
        });
        place();
        frame = requestAnimationFrame(step);
      }

      activate(0);
      if (crossing === 0) LG.speak(LG.t('frogPrompt'));
    },
  });
})();
