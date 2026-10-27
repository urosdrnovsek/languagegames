// Memory Pairs: cards lie face down; turn two at a time to match each
// picture with its word. Fewer moves and less time are better.
(function () {
  const PAIRS = innerWidth < 520 ? 6 : 8;

  LG.createGame({
    titleKey: 'memory',
    descKey: 'memoryDesc',
    pic: 'cherry',
    rounds: 1,
    progress: false,
    score: { id: 'memory', better: 'low', format: LG.formatTime },
    round(_, ctx) {
      const pool = LG.words(LG.lang, { min: PAIRS });
      const unique = pool.filter((w, i) => pool.findIndex((x) => x.word === w.word) === i);
      const chosen = LG.sample(unique, PAIRS);
      const cards = LG.shuffle(chosen.flatMap((w) => [{ w: w, kind: 'pic' }, { w: w, kind: 'word' }]));
      let open = [];
      let matched = 0;
      let moves = 0;
      let busy = false;

      const head = LG.el('div', 'game-head');
      const timer = LG.timerBar(false);
      const movesBox = LG.el('span', 'score-box');
      head.append(timer.el, movesBox);
      if (ctx.calm) timer.el.style.visibility = 'hidden';
      const clock = LG.clock({ onTick: (ms) => timer.set(ms) });
      ctx.onCleanup(clock.stop);
      timer.set(0);
      const showMoves = () => (movesBox.textContent = LG.t('moves', { n: moves }));
      showMoves();

      const grid = LG.el('div', 'memory-grid');
      cards.forEach((c) => {
        const b = LG.el('button', 'mem-card');
        b.type = 'button';
        b.setAttribute('aria-label', '?');
        const face = c.kind === 'pic' ? '<div class="mem-pic">' + LG.picture(c.w.pic) + '</div>' : '<span class="mem-word fit">' + LG.fmt(c.w.word) + '</span>';
        b.innerHTML = '<span class="mem-back"></span><span class="mem-face">' + face + '</span>';
        b.addEventListener('click', () => flip(c, b));
        c.el = b;
        grid.appendChild(b);
      });

      function flip(c, b) {
        if (busy || c.done || open.includes(c)) return;
        b.classList.add('flipped');
        b.setAttribute('aria-label', c.w.word);
        LG.sfx.tap();
        open.push(c);
        if (c.kind === 'word') LG.speak(c.w.word);
        LG.fit(b);
        if (open.length < 2) return;
        moves++;
        showMoves();
        const [a, d] = open;
        if (a.w === d.w) {
          a.done = d.done = true;
          a.el.classList.add('matched');
          d.el.classList.add('matched');
          open = [];
          matched++;
          ctx.report(matched / PAIRS, Math.round(clock.ms));
          LG.sfx.good();
          LG.markCorrect(a.w.pic);
          if (matched === PAIRS) {
            clock.stop();
            const stars = moves <= PAIRS + 3 ? 3 : moves <= PAIRS * 2 ? 2 : 1;
            setTimeout(() => ctx.end({ won: true, stars: stars, text: LG.t('memoryWon', { moves: moves }), score: ctx.calm ? undefined : Math.round(clock.ms) }), 700);
          }
        } else {
          busy = true;
          setTimeout(() => {
            [a, d].forEach((x) => {
              x.el.classList.remove('flipped');
              x.el.setAttribute('aria-label', '?');
            });
            open = [];
            busy = false;
          }, 1000);
        }
      }

      ctx.report(0, 0);
      ctx.stage.append(head, grid);
    },
  });
})();
