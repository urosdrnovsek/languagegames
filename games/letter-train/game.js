// Letter Train: the train has one empty wagon for each letter of the
// pictured word. Letter blocks roll past on the track below; tap the next
// letter of the word to load it. When every wagon is full, the train drives
// off. From round 4 there are letters that don't belong.
(function () {
  const ROUNDS = 8;
  const HINT_ROUNDS = 2; // first rounds show faint letters in the wagons
  let words = [];
  for (const max of [5, 7, 10]) {
    words = LG.words(LG.lang, { maxLength: max });
    if (words.length >= 3) break;
  }
  if (words.length < 3) words = LG.words(LG.lang, { maxLength: 5, allTopics: true });
  const alphabet = LG.ALPHABET[LG.lang];
  const INK = '#2f2a28';
  const engine =
    '<svg viewBox="0 0 120 100" aria-hidden="true"><g stroke="' + INK + '" stroke-width="3" stroke-linejoin="round">' +
    '<circle cx="30" cy="12" r="6" fill="#dee2e6"/><circle cx="20" cy="6" r="4" fill="#dee2e6"/>' +
    '<rect x="24" y="20" width="14" height="22" fill="#495057"/>' +
    '<rect x="8" y="40" width="64" height="34" rx="6" fill="#4dabf7"/>' +
    '<rect x="66" y="16" width="44" height="58" rx="4" fill="#fa5252"/>' +
    '<rect x="74" y="24" width="28" height="20" rx="3" fill="#d0ebff"/>' +
    '<path d="M2 74 L8 62 V74 Z" fill="#ffd43b"/>' +
    '<rect x="4" y="72" width="110" height="8" rx="3" fill="#495057"/>' +
    '<circle cx="26" cy="84" r="11" fill="#ffd43b"/><circle cx="58" cy="84" r="11" fill="#ffd43b"/><circle cx="92" cy="84" r="11" fill="#ffd43b"/>' +
    '<circle cx="26" cy="84" r="3" fill="' + INK + '"/><circle cx="58" cy="84" r="3" fill="' + INK + '"/><circle cx="92" cy="84" r="3" fill="' + INK + '"/>' +
    '</g></svg>';
  let queue = [];

  LG.createGame({
    titleKey: 'train',
    descKey: 'trainDesc',
    pic: 'train',
    rounds: ROUNDS,
    onStart() {
      queue = LG.deal(words, ROUNDS).sort((a, b) => a.letters.length - b.letters.length);
    },
    round(i, ctx) {
      const w = queue[i];
      const target = w.letters;
      const extras = i >= 5 ? 2 : i >= 3 ? 1 : 0;
      const extra = LG.sample(alphabet.filter((l) => !target.map((x) => x.toLowerCase()).includes(l)), extras);
      const speed = ctx.calm ? 30 : 46 + i * 3;
      let next = 0;
      let mistakes = 0;
      let offset = 0;

      const card = LG.pictureCard(w.pic, () => LG.speak(w.word));
      card.classList.add('small');
      const scene = LG.el('div', 'rail');
      const train = scene.appendChild(LG.el('div', 'train-row'));
      train.appendChild(LG.el('div', 'engine', engine));
      const wagons = target.map((l) => train.appendChild(LG.el('div', 'wagon', '<span>' + (i < HINT_ROUNDS ? LG.fmt(l) : '') + '</span>')));
      if (i < HINT_ROUNDS) wagons.forEach((x) => x.classList.add('hint'));
      const track = scene.appendChild(LG.el('div', 'letter-track'));
      ctx.stage.append(card, scene);
      ctx.stage.classList.add('train-stage');
      ctx.onCleanup(() => ctx.stage.classList.remove('train-stage'));

      let blocks = LG.shuffle(target.concat(extra)).map((l, k) => {
        const el = LG.el('button', 'block', '<span>' + LG.fmt(l) + '</span>');
        el.type = 'button';
        const b = { letter: l, el: el, k: k };
        el.addEventListener('pointerdown', (e) => {
          e.preventDefault();
          tap(b);
        });
        track.appendChild(el);
        return b;
      });

      const slots = blocks.length;

      function mark() {
        wagons.forEach((x, k) => x.classList.toggle('next', k === next));
      }

      function tap(b) {
        if (ctx.isLocked() || next >= target.length) return;
        if (b.letter !== target[next]) {
          mistakes++;
          LG.sfx.bad();
          LG.shake(b.el.firstChild);
          return;
        }
        LG.sfx.tap();
        b.el.remove();
        blocks = blocks.filter((x) => x !== b);
        const wagon = wagons[next];
        wagon.classList.remove('hint');
        wagon.classList.add('loaded');
        wagon.querySelector('span').innerHTML = LG.fmt(b.letter);
        next++;
        mark();
        if (next < target.length) return;
        LG.markCorrect(w.pic);
        setTimeout(() => train.classList.add('leave'), 500);
        ctx.complete(LG.speak(LG.praise() + ' ' + w.word + '.'), { missed: mistakes >= 3 });
      }

      let last = performance.now();
      let frame = requestAnimationFrame(step);
      ctx.onCleanup(() => cancelAnimationFrame(frame));
      // The blocks roll from right to left, round and round.
      function step(now) {
        const dt = document.hidden ? 0 : Math.min(0.05, (now - last) / 1000);
        last = now;
        offset += speed * dt;
        const W = track.clientWidth;
        const bw = blocks.length ? blocks[0].el.offsetWidth : 60;
        // Loaded letters leave a gap; the others keep their places.
        const loop = Math.max(W + bw, slots * (bw + 18));
        blocks.forEach((b) => {
          const x = W - ((((offset + (b.k * loop) / slots) % loop) + loop) % loop);
          b.el.style.transform = 'translateX(' + x + 'px)';
        });
        frame = requestAnimationFrame(step);
      }

      mark();
      LG.speak(LG.t('buildPrompt', { word: w.word }));
    },
  });
})();
