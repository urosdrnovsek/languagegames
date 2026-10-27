// Odd One Out: four pictures, three from one topic and one from a clearly
// different kind of topic (cat, dog, cow... banana). Tap the odd one.
(function () {
  const ROUNDS = 8;
  // Topics in the same group are too close to tell apart (fruit/vegetables),
  // so the odd one always comes from another group.
  const GROUP = {
    farm: 'animals', wild: 'animals', water: 'animals', bugs: 'animals',
    fruit: 'food', vegetables: 'food', food: 'food',
    home: 'home', household: 'home',
    body: 'people', family: 'people', jobs: 'people', feelings: 'people',
    sky: 'outside', nature: 'outside', places: 'outside', seasons: 'outside',
    clothes: 'clothes', toys: 'play', sports: 'play', music: 'music', school: 'school', transport: 'transport',
    colours: 'ideas', numbers: 'ideas', shapes: 'ideas',
  };
  const all = LG.words(LG.lang, { allTopics: true });
  const byTopic = {};
  all.forEach((w) => (byTopic[w.topic] = byTopic[w.topic] || []).push(w));
  const chosen = LG.settings.topics.filter((t) => (byTopic[t] || []).length >= 3);
  const topics = chosen.length ? chosen : Object.keys(byTopic).filter((t) => byTopic[t].length >= 3);

  LG.createGame({
    titleKey: 'oddOne',
    descKey: 'oddOneDesc',
    pic: 'banana',
    rounds: ROUNDS,
    round(i, ctx) {
      const topic = LG.pick(topics);
      const three = LG.sample(byTopic[topic].filter((w, k, l) => l.findIndex((x) => x.word === w.word) === k), 3);
      const odd = LG.pick(all.filter((w) => GROUP[w.topic] !== GROUP[topic] && !three.some((t) => t.word === w.word)));
      const prompt = () => LG.speak(LG.t('oddPrompt'));

      const grid = LG.el('div', 'odd-grid');
      LG.shuffle(three.concat([odd])).forEach((w) => {
        const b = LG.el('button', 'odd-card', '<div class="odd-pic">' + LG.picture(w.pic) + '</div><span class="fit">' + LG.fmt(w.word) + '</span>');
        b.type = 'button';
        b.addEventListener('click', () => {
          if (ctx.isLocked() || b.disabled) return;
          if (w === odd) {
            b.classList.add('right');
            grid.querySelectorAll('button').forEach((x) => {
              x.disabled = true;
              if (x !== b) x.classList.add('same');
            });
            LG.markCorrect(w.pic);
            ctx.complete(LG.speak(LG.praise() + ' ' + w.word + '.'));
          } else {
            b.classList.add('wrong');
            b.disabled = true;
            LG.shake(b);
            LG.sfx.bad();
            LG.speak(LG.t('tryAgain'));
          }
        });
        grid.appendChild(b);
      });

      const ask = LG.el('button', 'ask-btn', LG.ICONS.soundOn + '<span></span>');
      ask.type = 'button';
      ask.querySelector('span').textContent = LG.t('oddPrompt');
      ask.addEventListener('click', prompt);
      ctx.stage.append(ask, grid);
      prompt();
    },
  });
})();
