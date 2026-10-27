// Word Search: pictured words hidden in a letter grid, left to right or top
// to bottom only (easier for young readers). Slide a finger over a word, or
// tap its first and last letter.
(function () {
  const SIZE = innerWidth < 520 ? 7 : 8;
  const COUNT = innerWidth < 520 ? 5 : 6;
  const lower = (s) => s.toLocaleLowerCase(LG.lang);
  const COLORS = ['#ffd43b', '#8ce99a', '#a5d8ff', '#ffc9c9', '#e5dbff', '#ffd8a8'];

  function build(pool) {
    const grid = Array.from({ length: SIZE }, () => Array(SIZE).fill(null));
    const placed = [];
    for (const w of LG.shuffle(pool)) {
      if (placed.length === COUNT) break;
      if (placed.some((p) => p.text === lower(w.word))) continue;
      const text = Array.from(lower(w.word));
      for (let tries = 0; tries < 60; tries++) {
        const down = LG.random() < 0.5;
        const r = Math.floor(LG.random() * (down ? SIZE - text.length + 1 : SIZE));
        const c = Math.floor(LG.random() * (down ? SIZE : SIZE - text.length + 1));
        const cells = text.map((_, k) => [down ? r + k : r, down ? c : c + k]);
        if (cells.every(([y, x], k) => grid[y][x] === null || grid[y][x] === text[k])) {
          cells.forEach(([y, x], k) => (grid[y][x] = text[k]));
          placed.push({ w: w, text: text.join(''), cells: cells });
          break;
        }
      }
    }
    const letters = LG.ALPHABET[LG.lang];
    grid.forEach((row) => row.forEach((v, x) => (row[x] = v || LG.pick(letters))));
    return { grid: grid, placed: placed };
  }

  LG.createGame({
    titleKey: 'wordSearch',
    descKey: 'wordSearchDesc',
    pic: 'glasses',
    rounds: 1,
    progress: false,
    score: { id: 'word-search', better: 'low', format: LG.formatTime },
    round(_, ctx) {
      let pool = LG.words(LG.lang, { maxLength: SIZE }).filter((w) => w.letters.length >= 3);
      if (pool.length < 4) pool = LG.words(LG.lang, { maxLength: SIZE, allTopics: true }).filter((w) => w.letters.length >= 3);
      const { grid, placed } = build(pool);
      let found = 0;

      const head = LG.el('div', 'game-head');
      const timer = LG.timerBar(false);
      head.appendChild(timer.el);
      if (ctx.calm) timer.el.style.visibility = 'hidden';
      const clock = LG.clock({ onTick: (ms) => timer.set(ms) });
      ctx.onCleanup(clock.stop);
      timer.set(0);

      const clues = LG.el('div', 'ws-clues');
      placed.forEach((p) => {
        p.clue = clues.appendChild(LG.el('div', 'ws-clue', '<div class="ws-pic">' + LG.picture(p.w.pic) + '</div><span class="fit">' + LG.fmt(p.w.word) + '</span>'));
      });

      const board = LG.el('div', 'ws-grid');
      board.style.gridTemplateColumns = 'repeat(' + SIZE + ', 1fr)';
      const cellEls = grid.map((row, y) => row.map((ch, x) => {
        const c = LG.el('div', 'ws-cell', LG.fmt(ch));
        c.dataset.y = y;
        c.dataset.x = x;
        board.appendChild(c);
        return c;
      }));

      // Selection: from the start cell along its row or column.
      let start = null;
      let line = [];
      let moved = false;
      const cellAt = (e) => {
        const el = document.elementFromPoint(e.clientX, e.clientY);
        const cell = el && el.closest && el.closest('.ws-cell');
        return cell ? [+cell.dataset.y, +cell.dataset.x] : null;
      };
      function lineTo(end) {
        const [y0, x0] = start;
        const [y1, x1] = end;
        const across = Math.abs(x1 - x0) >= Math.abs(y1 - y0);
        const len = across ? x1 - x0 : y1 - y0;
        if (len < 0) return [start];
        return Array.from({ length: len + 1 }, (_, k) => (across ? [y0, x0 + k] : [y0 + k, x0]));
      }
      function show() {
        cellEls.flat().forEach((c) => c.classList.remove('sel'));
        line.forEach(([y, x]) => cellEls[y][x].classList.add('sel'));
      }
      function check() {
        const text = line.map(([y, x]) => grid[y][x]).join('');
        const hit = placed.find((p) => !p.done && p.text === text && p.cells[0][0] === line[0][0] && p.cells[0][1] === line[0][1]);
        if (!hit) {
          if (line.length > 1) LG.sfx.bad();
          return false;
        }
        hit.done = true;
        const color = COLORS[found % COLORS.length];
        hit.cells.forEach(([y, x]) => {
          cellEls[y][x].classList.add('found');
          cellEls[y][x].style.background = color;
        });
        hit.clue.classList.add('found');
        found++;
        ctx.report(found / placed.length, Math.round(clock.ms));
        LG.sfx.good();
        LG.markCorrect(hit.w.pic);
        LG.speak(hit.w.word);
        if (found === placed.length) {
          clock.stop();
          const secs = clock.ms / 1000;
          const stars = ctx.calm || secs < 60 * placed.length / 5 ? 3 : secs < 120 * placed.length / 5 ? 2 : 1;
          setTimeout(() => ctx.end({ won: true, stars: stars, text: LG.t('wordSearchWon'), score: ctx.calm ? undefined : Math.round(clock.ms) }), 900);
        }
        return true;
      }
      board.addEventListener('pointerdown', (e) => {
        const at = cellAt(e);
        if (!at) return;
        e.preventDefault();
        // Second tap of tap-tap selection.
        if (start && !moved && line.length === 1 && (at[0] === start[0] || at[1] === start[1]) && (at[0] !== start[0] || at[1] !== start[1])) {
          line = lineTo(at);
          show();
          check();
          start = null;
          line = [];
          setTimeout(show, 250);
          return;
        }
        start = at;
        line = [at];
        moved = false;
        board.setPointerCapture(e.pointerId);
        show();
      });
      board.addEventListener('pointermove', (e) => {
        if (!start || !board.hasPointerCapture(e.pointerId)) return;
        const at = cellAt(e);
        if (!at) return;
        if (at[0] !== start[0] || at[1] !== start[1]) moved = true;
        line = lineTo(at);
        show();
      });
      board.addEventListener('pointerup', (e) => {
        if (!start) return;
        if (board.hasPointerCapture(e.pointerId)) board.releasePointerCapture(e.pointerId);
        if (moved) {
          check();
          start = null;
          line = [];
          setTimeout(show, 250);
        }
      });

      ctx.report(0, 0);
      ctx.stage.append(head, clues, board);
    },
  });
})();
