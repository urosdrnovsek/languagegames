// Picture Hunt: read a list of words and find each word's picture among
// twice as many tiles before the timer runs out. Found words are crossed out.
(function () {
  const WORDS = 10;
  const TILES = 20;
  const SECONDS = 180;
  const CLOCK = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="13" r="8.5" fill="#fff" stroke="currentColor" stroke-width="2.5"/><path d="M12 8.5V13l3 2M9.5 2.5h5" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>';

  let stopTimer = () => {};

  LG.createGame({
    titleKey: 'pictureHunt',
    descKey: 'pictureHuntDesc',
    pic: 'glasses',
    rounds: 1,
    progress: false,
    score: { id: 'picture-hunt', better: 'low', format: LG.formatTime },
    onStart() {
      stopTimer();
    },
    round(_, ctx) {
      // Targets come from the chosen topics. Decoys are other words from
      // those topics first, then words from the rest of the bank.
      // Every word on the board is different (the fruit and the colour
      // orange share a word in several languages).
      const unique = (list) => list.filter((w, i) => list.findIndex((x) => x.word === w.word) === i);
      const pool = LG.words(LG.lang, { min: 4 });
      const targets = unique(LG.shuffle(pool)).slice(0, WORDS);
      const others = LG.words(LG.lang, { allTopics: true }).filter((w) => !pool.some((p) => p.pic === w.pic));
      const decoys = unique(targets.concat(LG.shuffle(pool), LG.shuffle(others))).slice(targets.length);
      const picked = targets.concat(decoys.slice(0, TILES - targets.length));
      const found = new Set();
      let over = false;

      // ---- Timer: counts down only while the page is visible. ----
      const timer = LG.el('div', 'timer', CLOCK);
      timer.setAttribute('role', 'timer');
      timer.setAttribute('aria-label', LG.t('timeLeft'));
      const barEl = LG.el('div', 'timer-bar');
      const fill = barEl.appendChild(LG.el('div', 'timer-fill'));
      const text = LG.el('span', 'timer-text');
      timer.append(barEl, text);

      let left = SECONDS * 1000;
      let last = performance.now();
      function tick() {
        const now = performance.now();
        if (!document.hidden) left -= now - last;
        last = now;
        left = Math.max(0, left);
        const secs = Math.ceil(left / 1000);
        text.textContent = Math.floor(secs / 60) + ':' + String(secs % 60).padStart(2, '0');
        fill.style.width = (left / (SECONDS * 1000)) * 100 + '%';
        timer.classList.toggle('low', left < 30000);
        if (left === 0) timeUp();
      }
      // Calm mode: no countdown at all.
      const interval = ctx.calm ? null : setInterval(tick, 250);
      stopTimer = () => clearInterval(interval);
      if (ctx.calm) timer.hidden = true;
      else tick();

      // ---- Word list. Tapping a word reads it aloud as a hint. ----
      const list = LG.el('div', 'word-list');
      const chips = {};
      targets.forEach((w) => {
        const chip = LG.el('button', 'word-chip fit', LG.fmt(w.word));
        chip.type = 'button';
        chip.addEventListener('click', () => LG.speak(w.word));
        chips[w.pic] = list.appendChild(chip);
      });

      // ---- Picture grid: the targets plus the same number of decoys. ----
      const grid = LG.el('div', 'hunt-grid');
      const tiles = {};
      LG.shuffle(picked).forEach((w) => {
        const tile = LG.el('button', 'hunt-tile', LG.picture(w.pic));
        tile.type = 'button';
        tile.setAttribute('aria-label', w.word);
        tile.addEventListener('click', () => choose(w, tile));
        tiles[w.pic] = grid.appendChild(tile);
      });

      function choose(w, tile) {
        if (over || found.has(w.pic)) return;
        if (!chips[w.pic]) {
          LG.shake(tile);
          LG.sfx.bad();
          return;
        }
        found.add(w.pic);
        ctx.report(found.size / targets.length, Math.round(SECONDS * 1000 - left));
        tile.classList.add('found');
        LG.markCorrect(w.pic);
        tile.disabled = true;
        chips[w.pic].classList.add('found');
        LG.sfx.good();
        LG.speak(w.word);
        if (found.size === targets.length) win();
      }

      function win() {
        over = true;
        stopTimer();
        const share = left / (SECONDS * 1000);
        const stars = ctx.calm || share > 0.5 ? 3 : share > 0.25 ? 2 : 1;
        LG.confetti(30);
        const used = SECONDS * 1000 - left;
        setTimeout(() => ctx.end({ won: true, stars: stars, text: LG.t('huntWon'), score: ctx.calm ? undefined : used }), 1200);
      }

      function timeUp() {
        if (over) return;
        over = true;
        stopTimer();
        LG.sfx.bad();
        // Show the pictures that were still to find before the end screen.
        targets.forEach((w) => !found.has(w.pic) && tiles[w.pic].classList.add('missed'));
        setTimeout(() => ctx.end({
          won: false,
          stars: 0,
          title: LG.t('timeUp'),
          text: LG.t('huntFoundSome', { n: found.size, total: targets.length }),
        }), 2400);
      }

      ctx.report(0, 0);
      const box = LG.el('div', 'hunt');
      box.append(timer, list, grid);
      ctx.stage.appendChild(box);
      LG.speak(LG.t('huntPrompt'));
    },
  });
})();
