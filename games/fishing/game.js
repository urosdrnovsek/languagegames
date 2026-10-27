// Fishing: fish swim slowly across the pond, each with a picture. Read the
// word and tap the fish with its picture to catch it. No timer and nothing
// to lose, so it suits calm mode too. Eight fish fill the bucket.
(function () {
  const CATCH = 8;
  const FISH = 5;
  const COLORS = ['#ffa94d', '#74c0fc', '#ff8787', '#b197fc', '#63e6be'];
  const INK = '#2f2a28';
  const fishSvg = (color) =>
    '<svg class="fish-body" viewBox="0 0 140 100" aria-hidden="true"><g stroke="' + INK + '" stroke-width="3" stroke-linejoin="round">' +
    '<path d="M112 50 L138 24 L132 50 L138 76 Z" fill="' + color + '"/>' +
    '<path d="M58 12 Q76 0 90 12 Z" fill="' + color + '"/>' +
    '<ellipse cx="70" cy="52" rx="52" ry="44" fill="' + color + '"/>' +
    '<circle cx="72" cy="52" r="36" fill="#fff"/>' +
    '<circle cx="27" cy="40" r="5" fill="' + INK + '" stroke="none"/></g></svg>';

  LG.createGame({
    titleKey: 'fishing',
    descKey: 'fishingDesc',
    pic: 'fish',
    rounds: 1,
    progress: false,
    round(_, ctx) {
      const pool = LG.words(LG.lang, { min: FISH + 1 });
      const unique = pool.filter((w, i) => pool.findIndex((x) => x.word === w.word) === i);
      const speed = ctx.calm ? 22 : 34;
      let caught = 0;
      let mistakes = 0;
      let target = null;
      let over = false;

      const head = LG.el('div', 'game-head');
      const wordBar = LG.el('button', 'rain-word fit');
      wordBar.type = 'button';
      wordBar.addEventListener('click', () => target && LG.speak(target.w.word));
      const bucket = LG.el('span', 'score-box bucket', LG.picture('bucket') + '<b>0 / ' + CATCH + '</b>');
      head.append(wordBar, bucket);
      const pond = LG.el('div', 'fish-pond');
      ctx.stage.append(head, pond);
      ctx.stage.classList.add('fish-stage');
      ctx.onCleanup(() => ctx.stage.classList.remove('fish-stage'));

      const size = () => Math.min(170, pond.clientWidth * 0.4, (pond.clientHeight / FISH) * 1.25);
      const freeWord = () => {
        const free = unique.filter((w) => !fish.some((f) => f.w && f.w.word === w.word));
        return LG.pick(free.length ? free : unique);
      };

      function dress(f) {
        f.w = freeWord();
        f.el.querySelector('.fish-pic').innerHTML = LG.picture(f.w.pic);
        f.el.setAttribute('aria-label', f.w.word);
      }

      const fish = [];
      for (let i = 0; i < FISH; i++) {
        const el = LG.el('button', 'fishy', fishSvg(COLORS[i % COLORS.length]) + '<span class="fish-pic"></span>');
        el.type = 'button';
        const f = { el: el, lane: i, dir: i % 2 ? 1 : -1, x: 0, phase: Math.random() * 6, rush: 0, speed: speed * (0.8 + Math.random() * 0.4) };
        el.addEventListener('pointerdown', (e) => {
          e.preventDefault();
          tap(f);
        });
        pond.appendChild(el);
        fish.push(f);
      }
      // Spread the fish across the pond before they start swimming.
      fish.forEach((f, i) => {
        dress(f);
        f.x = ((i * 0.37 + 0.1) % 1) * Math.max(1, pond.clientWidth - size());
      });

      function chooseTarget() {
        const s = size();
        const inside = fish.filter((f) => !f.caught && f.x > 0 && f.x < pond.clientWidth - s);
        target = LG.pick(inside.length ? inside : fish.filter((f) => !f.caught));
        wordBar.innerHTML = LG.fmt(target.w.word);
        LG.fit(ctx.stage);
      }

      function tap(f) {
        if (over || f.caught) return;
        if (f !== target) {
          mistakes++;
          LG.sfx.bad();
          LG.shake(f.el.firstChild);
          f.rush = 0.7;
          return;
        }
        f.caught = true;
        caught++;
        bucket.querySelector('b').textContent = caught + ' / ' + CATCH;
        LG.shake(bucket);
        LG.sfx.good();
        LG.markCorrect(f.w.pic);
        LG.speak(f.w.word);
        // A line comes down and pulls the fish out of the water.
        const s = size();
        const line = LG.el('i', 'fish-line');
        line.style.left = f.x + s / 2 + 'px';
        line.style.height = f.y + s * 0.2 + 'px';
        pond.appendChild(line);
        f.el.classList.add('hooked');
        setTimeout(() => {
          line.style.height = '0px';
          f.y0 = -s;
        }, 350);
        setTimeout(() => {
          line.remove();
          if (caught >= CATCH) return finish();
          f.caught = false;
          f.y0 = null;
          f.el.classList.remove('hooked');
          f.x = f.dir > 0 ? -s : pond.clientWidth;
          dress(f);
        }, 1100);
        if (caught < CATCH) chooseTarget();
        else target = null;
      }

      function finish() {
        over = true;
        const stars = mistakes <= 2 ? 3 : mistakes <= 5 ? 2 : 1;
        ctx.end({ won: true, stars: stars, text: LG.t('fishText', { n: caught }) });
      }

      let last = performance.now();
      let frame = requestAnimationFrame(step);
      ctx.onCleanup(() => cancelAnimationFrame(frame));
      function step(now) {
        const dt = document.hidden ? 0 : Math.min(0.05, (now - last) / 1000);
        last = now;
        const s = size();
        const W = pond.clientWidth;
        const laneH = pond.clientHeight / FISH;
        fish.forEach((f) => {
          f.phase += dt * 2;
          if (!f.caught) {
            f.x += f.speed * (f.rush > 0 ? 3 : 1) * dt * f.dir;
            f.rush = Math.max(0, f.rush - dt);
            // Swam out: come back from the other side, with a new picture
            // unless it's the one to catch.
            if (f.x > W + 4 || f.x < -s - 4) {
              f.x = f.dir > 0 ? -s : W;
              if (f !== target) dress(f);
            }
          }
          const y = f.y0 !== null && f.y0 !== undefined ? f.y0 : f.lane * laneH + (laneH - s * 0.7) / 2 + Math.sin(f.phase) * 5;
          f.y = y;
          f.el.style.width = s + 'px';
          f.el.style.height = s * 0.72 + 'px';
          f.el.style.transform = 'translate(' + f.x + 'px,' + y + 'px)';
          f.el.classList.toggle('right-way', f.dir > 0);
        });
        if (!target && !over) chooseTarget();
        frame = requestAnimationFrame(step);
      }
    },
  });
})();
