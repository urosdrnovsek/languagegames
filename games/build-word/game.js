// Build the Word: tap letters to spell the pictured word. Words get longer
// as the game goes on, and from round 5 there is one extra letter that
// doesn't belong.
(function () {
  const ROUNDS = 8;
  const EXTRA_FROM = 4;
  // Short words first; a small topic may need longer ones to have enough.
  let words = [];
  for (const max of [5, 7, 10]) {
    words = LG.words(LG.lang, { maxLength: max });
    if (words.length >= 3) break;
  }
  if (words.length < 3) words = LG.words(LG.lang, { maxLength: 5, allTopics: true });
  const alphabet = LG.ALPHABET[LG.lang];
  let queue = [];

  LG.createGame({
    titleKey: 'buildWord',
    descKey: 'buildWordDesc',
    pic: 'sun',
    rounds: ROUNDS,
    onStart() {
      queue = LG.deal(words, ROUNDS).sort((a, b) => a.letters.length - b.letters.length);
    },
    round(i, ctx) {
      const w = queue[i];
      const target = w.letters;
      const extra = i >= EXTRA_FROM ? [LG.pick(alphabet.filter((l) => !target.includes(l)))] : [];
      let letters = LG.shuffle(target.concat(extra));
      for (let tries = 0; tries < 10 && letters.slice(0, target.length).join('') === target.join(''); tries++) {
        letters = LG.shuffle(letters);
      }

      // filled[slot] = index into `letters` of the tile placed there, or null.
      const filled = target.map(() => null);
      let checking = false;
      const prompt = () => LG.speak(LG.t('buildPrompt', { word: w.word }));

      const slotRow = LG.el('div', 'slots');
      const slots = target.map((_, s) => {
        const b = LG.el('button', 'slot');
        b.type = 'button';
        b.addEventListener('click', () => {
          if (ctx.isLocked() || checking || filled[s] === null) return;
          filled[s] = null;
          LG.sfx.tap();
          draw();
        });
        return slotRow.appendChild(b);
      });

      const tileRow = LG.el('div', 'choices letters');
      const tiles = letters.map((letter, t) => {
        const b = LG.el('button', 'tile small', LG.fmt(letter));
        b.type = 'button';
        b.addEventListener('click', () => place(t));
        return tileRow.appendChild(b);
      });

      function draw() {
        slots.forEach((b, s) => {
          const t = filled[s];
          b.innerHTML = t === null ? '' : LG.fmt(letters[t]);
          b.classList.toggle('filled', t !== null);
          b.setAttribute('aria-label', t === null ? String(s + 1) : letters[t]);
        });
        tiles.forEach((b, t) => {
          const used = filled.includes(t);
          b.classList.toggle('used', used);
          b.disabled = used;
        });
      }

      function place(t) {
        if (ctx.isLocked() || checking || filled.includes(t)) return;
        const s = filled.indexOf(null);
        if (s < 0) return;
        filled[s] = t;
        LG.sfx.tap();
        LG.speak(LG.letterName(letters[t]));
        draw();
        if (!filled.includes(null)) check();
      }

      function check() {
        const wrong = filled.map((t, s) => letters[t] !== target[s]);
        if (!wrong.includes(true)) {
          slots.forEach((b) => b.classList.add('right'));
          tiles.forEach((b) => (b.disabled = true));
          ctx.complete(LG.speak(LG.praise() + ' ' + w.word + '.'));
          return;
        }
        // Keep the letters that are already right; send the others back.
        checking = true;
        LG.sfx.bad();
        LG.speak(LG.t('tryAgain'));
        wrong.forEach((bad, s) => {
          if (bad) {
            slots[s].classList.add('wrong');
            LG.shake(slots[s]);
          }
        });
        setTimeout(() => {
          wrong.forEach((bad, s) => {
            if (bad) {
              filled[s] = null;
              slots[s].classList.remove('wrong');
            }
          });
          checking = false;
          draw();
        }, 900);
      }

      draw();
      ctx.stage.append(LG.pictureCard(w.pic, prompt), slotRow, tileRow);
      prompt();
    },
  });
})();
