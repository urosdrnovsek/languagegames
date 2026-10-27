// Balloon Pop: guess the letters of the pictured word. Right letters fill
// the gaps; each wrong letter pops one of five balloons. If they all pop,
// the word is shown and the game moves on (that round's star stays grey).
(function () {
  const ROUNDS = 8;
  const BALLOONS = 5;
  const COLORS = ['#fa5252', '#4dabf7', '#ffd43b', '#51cf66', '#cc5de8'];
  let words = [];
  for (const max of [6, 8, 10]) {
    words = LG.words(LG.lang, { maxLength: max });
    if (words.length >= 3) break;
  }
  if (words.length < 3) words = LG.words(LG.lang, { maxLength: 6, allTopics: true });
  const alphabet = LG.ALPHABET[LG.lang];
  const lower = (c) => c.toLocaleLowerCase(LG.lang);
  let queue = [];

  LG.createGame({
    titleKey: 'balloon',
    descKey: 'balloonDesc',
    pic: 'balloon',
    rounds: ROUNDS,
    onStart() {
      queue = LG.deal(words, ROUNDS).sort((a, b) => a.letters.length - b.letters.length);
    },
    round(i, ctx) {
      const w = queue[i];
      const need = Array.from(new Set(w.letters.map(lower)));
      const extra = LG.sample(alphabet.filter((l) => !need.includes(l)), Math.max(3, Math.min(10, 12 - need.length)));
      const keys = LG.shuffle(need.concat(extra));
      const found = new Set();
      let left = BALLOONS;

      const balloons = LG.el('div', 'balloons');
      const bs = COLORS.map((c) => balloons.appendChild(LG.el('span', 'balloon',
        '<svg viewBox="0 0 40 60" aria-hidden="true"><path d="M20 46 q-3 6 1 14" fill="none" stroke="#2f2a28" stroke-width="1.5"/><path d="M17 47 h6 l-3 -4 z" fill="' + c + '" stroke="#2f2a28" stroke-width="1.5"/><ellipse cx="20" cy="22" rx="16" ry="21" fill="' + c + '" stroke="#2f2a28" stroke-width="2.5"/><path d="M11 13 q3 -6 8 -7" fill="none" stroke="#fff" stroke-width="2.5" opacity=".7"/></svg>')));

      const slots = LG.el('div', 'slots');
      const cells = w.letters.map((l) => slots.appendChild(LG.el('span', 'slot')));
      const draw = (reveal) => w.letters.forEach((l, k) => {
        const show = found.has(lower(l)) || reveal;
        cells[k].innerHTML = show ? LG.fmt(l) : '';
        cells[k].classList.toggle('filled', show);
        cells[k].classList.toggle('revealed', reveal && !found.has(lower(l)));
      });
      draw(false);

      const board = LG.el('div', 'choices letters');
      keys.forEach((l) => {
        const b = LG.el('button', 'tile small', LG.fmt(l));
        b.type = 'button';
        b.addEventListener('click', () => {
          if (ctx.isLocked() || b.disabled) return;
          b.disabled = true;
          if (need.includes(l)) {
            found.add(l);
            b.classList.add('right');
            LG.sfx.tap();
            LG.speak(LG.letterName(l));
            draw(false);
            if (need.every((n) => found.has(n))) {
              LG.markCorrect(w.pic);
              ctx.complete(LG.speak(LG.praise() + ' ' + w.word + '.'));
            }
          } else {
            b.classList.add('wrong');
            left--;
            bs[left].classList.add('popped');
            LG.sfx.bad();
            if (left === 0) {
              draw(true);
              board.querySelectorAll('button').forEach((x) => (x.disabled = true));
              ctx.complete(LG.speak(w.word), { missed: true });
            }
          }
        });
        board.appendChild(b);
      });

      ctx.stage.append(balloons, LG.pictureCard(w.pic, () => LG.speak(w.word)), slots, board);
    },
  });
})();
