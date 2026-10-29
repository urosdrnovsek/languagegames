// Find It: one picture hides among others. Each round there are more
// pictures, packed closer together and more alike, which trains picking out
// one target when its neighbours crowd it. No timer.
(function () {
  const COUNT = [6, 8, 10, 12, 15, 18, 21, 24];
  const GAP = [26, 20, 16, 12, 8, 6, 4, 2]; // px between pictures
  const pool = LG.words(LG.lang, { min: 30 });
  const unique = pool.filter((w, i) => pool.findIndex((x) => x.word === w.word) === i);
  let targets = [];

  LG.createGame({
    titleKey: 'crowd',
    descKey: 'crowdDesc',
    pic: 'ladybug',
    rounds: COUNT.length,
    onStart() {
      targets = LG.deal(unique, COUNT.length);
    },
    round(i, ctx) {
      const w = targets[i];
      const n = COUNT[i];
      const near = LG.shuffle(unique.filter((x) => x.word !== w.word && x.topic === w.topic));
      const far = LG.shuffle(unique.filter((x) => x.word !== w.word && x.topic !== w.topic));
      // From round 4, half the others come from the same topic.
      const alike = i >= 3 ? near.slice(0, Math.floor((n - 1) / 2)) : [];
      const items = LG.shuffle([w].concat(alike, far.slice(0, n - 1 - alike.length)));
      let mistakes = 0;

      const card = LG.pictureCard(w.pic, () => LG.speak(w.word));
      card.classList.add('small');
      const cols = Math.ceil(Math.sqrt(n * 1.4));
      const field = LG.el('div', 'crowd-field' + (i >= 4 ? ' tight' : ''));
      field.style.gridTemplateColumns = 'repeat(' + cols + ', 1fr)';
      field.style.gap = GAP[i] + 'px';
      items.forEach((item) => {
        const b = LG.el('button', 'crowd-item', LG.picture(item.pic));
        b.type = 'button';
        b.setAttribute('aria-label', item.word);
        // Later rounds turn the pictures a little, so they don't line up.
        if (i >= 5) b.style.rotate = Math.round((LG.random() - 0.5) * 40) + 'deg';
        b.addEventListener('click', () => {
          if (ctx.isLocked()) return;
          if (item === w) {
            b.classList.add('found');
            LG.markCorrect(w.pic);
            ctx.complete(LG.speak(LG.praise() + ' ' + w.word + '.'), { missed: mistakes >= 2 });
          } else {
            mistakes++;
            LG.sfx.bad();
            LG.shake(b);
          }
        });
        field.appendChild(b);
      });
      ctx.stage.append(card, field);
      ctx.stage.classList.add('crowd-stage');
      ctx.onCleanup(() => ctx.stage.classList.remove('crowd-stage'));
      LG.speak(LG.t('crowdPrompt', { word: w.word }));
    },
  });
})();
