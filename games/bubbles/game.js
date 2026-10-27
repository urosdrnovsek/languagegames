// Bubbles: letters float up in bubbles. Pop the letters of the pictured
// word in the right order; each one drops into its place. Bubbles that
// reach the top just float away, and new ones keep coming.
(function () {
  const ROUNDS = 8;
  const MAX_BUBBLES = 7;
  let words = [];
  for (const max of [4, 5, 7, 10]) {
    words = LG.words(LG.lang, { maxLength: max });
    if (words.length >= 3) break;
  }
  if (words.length < 3) words = LG.words(LG.lang, { maxLength: 4, allTopics: true });
  const alphabet = LG.ALPHABET[LG.lang];
  let queue = [];

  LG.createGame({
    titleKey: 'bubbles',
    descKey: 'bubblesDesc',
    pic: 'bubbles',
    rounds: ROUNDS,
    onStart() {
      queue = LG.deal(words, ROUNDS).sort((a, b) => a.letters.length - b.letters.length);
    },
    round(i, ctx) {
      const w = queue[i];
      const target = w.letters;
      const speed = (ctx.calm ? 30 : 42) + i * 3;
      const gap = ctx.calm ? 1300 : 950;
      let next = 0;
      let mistakes = 0;
      let bubbles = [];
      let sinceSpawn = gap;

      const top = LG.el('div', 'bubble-top');
      const card = LG.pictureCard(w.pic, () => LG.speak(w.word));
      card.classList.add('small');
      const slotRow = LG.el('div', 'slots');
      const slots = target.map(() => slotRow.appendChild(LG.el('span', 'slot')));
      top.append(card, slotRow);
      const sea = LG.el('div', 'bubble-sea');
      ctx.stage.append(top, sea);
      ctx.stage.classList.add('bubble-stage');
      ctx.onCleanup(() => ctx.stage.classList.remove('bubble-stage'));

      const size = () => Math.min(92, sea.clientWidth / 4.5);
      const mark = () => slots.forEach((s, k) => s.classList.toggle('next', k === next));

      function spawn() {
        const s = size();
        const needed = target[next];
        const visible = bubbles.some((b) => b.letter === needed && b.y > sea.clientHeight * 0.25);
        let letter;
        if (!visible || Math.random() < 0.3) letter = needed;
        else if (Math.random() < 0.4) letter = target[next + Math.floor(Math.random() * (target.length - next))];
        else letter = alphabet[Math.floor(Math.random() * alphabet.length)];
        const el = LG.el('button', 'bubble', '<span>' + LG.fmt(letter) + '</span>');
        el.type = 'button';
        el.style.width = el.style.height = s + 'px';
        let x = 0;
        for (let tries = 0; tries < 8; tries++) {
          x = Math.random() * (sea.clientWidth - s);
          if (!bubbles.some((b) => b.y > sea.clientHeight - s * 1.6 && Math.abs(b.x - x) < s)) break;
        }
        const b = { el: el, letter: letter, x: x, y: sea.clientHeight, phase: Math.random() * 6, speed: speed * (0.85 + Math.random() * 0.3) };
        el.addEventListener('pointerdown', (e) => {
          e.preventDefault();
          tap(b);
        });
        sea.appendChild(el);
        bubbles.push(b);
      }

      function remove(b) {
        bubbles = bubbles.filter((x) => x !== b);
        b.el.classList.add('popped');
        setTimeout(() => b.el.remove(), 250);
      }

      function tap(b) {
        if (ctx.isLocked() || next >= target.length || b.el.classList.contains('popped')) return;
        // Capitals in German nouns: the first bubble may show either case.
        if (b.letter.toLowerCase() !== target[next].toLowerCase()) {
          mistakes++;
          LG.sfx.bad();
          LG.shake(b.el.firstChild);
          return;
        }
        LG.sfx.tap();
        remove(b);
        slots[next].innerHTML = LG.fmt(target[next]);
        slots[next].classList.add('filled');
        next++;
        mark();
        if (next < target.length) return;
        LG.markCorrect(w.pic);
        bubbles.slice().forEach(remove);
        ctx.complete(LG.speak(LG.praise() + ' ' + w.word + '.'), { missed: mistakes >= 3 });
      }

      let last = performance.now();
      let frame = requestAnimationFrame(step);
      ctx.onCleanup(() => cancelAnimationFrame(frame));
      function step(now) {
        const dt = document.hidden ? 0 : Math.min(0.05, (now - last) / 1000);
        last = now;
        sinceSpawn += dt * 1000;
        if (next < target.length && sinceSpawn >= gap && bubbles.length < MAX_BUBBLES) {
          sinceSpawn = 0;
          spawn();
        }
        const s = size();
        bubbles.slice().forEach((b) => {
          b.y -= b.speed * dt;
          b.phase += dt * 2.2;
          const x = b.x + Math.sin(b.phase) * 10;
          b.el.style.transform = 'translate(' + x + 'px,' + b.y + 'px)';
          if (b.y < -s) {
            bubbles = bubbles.filter((x) => x !== b);
            b.el.remove();
          }
        });
        frame = requestAnimationFrame(step);
      }

      mark();
      LG.speak(LG.t('buildPrompt', { word: w.word }));
    },
  });
})();
