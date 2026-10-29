// Left to Right: rows of pictures, like lines of text. Find the picture
// shown at the top in every row, from left to right and row by row, the way
// the eyes move when reading. Only the current row is lit; a picture
// further right waits until the ones before it are found.
(function () {
  const ROWS = [2, 3, 3, 4, 4];
  const COLS = [4, 5, 6, 6, 7];
  const pool = LG.words(LG.lang, { min: 10 });
  const unique = pool.filter((w, i) => pool.findIndex((x) => x.word === w.word) === i);
  let targets = [];

  LG.createGame({
    titleKey: 'scanHunt',
    descKey: 'scanHuntDesc',
    pic: 'eye',
    rounds: ROWS.length,
    onStart() {
      targets = LG.deal(unique, ROWS.length);
    },
    round(i, ctx) {
      const w = targets[i];
      // Later rounds use look-alikes from the same topic when there are some.
      const near = unique.filter((x) => x.word !== w.word && x.topic === w.topic);
      const others = i >= 2 && near.length >= 3 ? near : unique.filter((x) => x.word !== w.word);
      let mistakes = 0;

      const top = LG.el('div', 'scan-top');
      const card = LG.pictureCard(w.pic, () => LG.speak(w.word));
      card.classList.add('small');
      top.appendChild(card);
      const sheet = LG.el('div', 'scan-sheet');
      ctx.stage.append(top, sheet);
      ctx.stage.classList.add('scan-stage');
      ctx.onCleanup(() => ctx.stage.classList.remove('scan-stage'));

      const rows = [];
      for (let r = 0; r < ROWS[i]; r++) {
        const n = COLS[i];
        const count = n >= 6 && LG.random() < 0.5 ? 2 : 1;
        const spots = LG.sample(Array.from({ length: n }, (_, k) => k), count);
        const rowEl = sheet.appendChild(LG.el('div', 'scan-row', '<span class="scan-arrow">' + LG.ICONS.play + '</span>'));
        const cells = [];
        for (let k = 0; k < n; k++) {
          const isTarget = spots.includes(k);
          const item = isTarget ? w : LG.pick(others);
          const b = LG.el('button', 'scan-cell', LG.picture(item.pic));
          b.type = 'button';
          b.setAttribute('aria-label', item.word);
          const cell = { el: b, target: isTarget, found: false };
          b.addEventListener('click', () => tap(r, cell));
          rowEl.appendChild(b);
          cells.push(cell);
        }
        rows.push({ el: rowEl, cells: cells });
      }
      let row = 0;
      const light = () => rows.forEach((x, k) => {
        x.el.classList.toggle('active', k === row);
        x.el.classList.toggle('read', k < row);
      });
      light();

      function tap(r, cell) {
        if (ctx.isLocked() || r !== row || cell.found) return;
        const cur = rows[row];
        const next = cur.cells.find((c) => c.target && !c.found);
        if (cell === next) {
          cell.found = true;
          cell.el.classList.add('found');
          LG.sfx.tap();
          if (cur.cells.some((c) => c.target && !c.found)) return;
          LG.sfx.good();
          row++;
          if (row < rows.length) return light();
          light();
          LG.markCorrect(w.pic);
          ctx.complete(LG.speak(LG.praise() + ' ' + w.word + '.'), { missed: mistakes >= 3 });
        } else if (cell.target) {
          // Right picture, but there is one further left: point back.
          const arrow = cur.el.querySelector('.scan-arrow');
          arrow.classList.remove('nudge');
          void arrow.offsetWidth;
          arrow.classList.add('nudge');
          LG.shake(next.el);
        } else {
          mistakes++;
          LG.sfx.bad();
          LG.shake(cell.el);
        }
      }

      LG.speak(LG.t('scanPrompt', { word: w.word }));
    },
  });
})();
