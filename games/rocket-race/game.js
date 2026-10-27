// Rocket Race: read three words and tap the one for the picture. Every
// right answer flies the rocket higher; ten take it to the Moon. A wrong
// answer adds 2 seconds. A ghost rocket flies at the pace of your best time.
(function () {
  const GOAL = 10;
  const PENALTY = 2;
  const words = LG.words(LG.lang, { min: 3 });

  // From the fifth word on, prefer words with the same first letter.
  function distractors(target, hard) {
    const others = words.filter((w) => w.word !== target.word);
    const similar = others.filter((w) => w.letters[0] === target.letters[0]);
    const picked = hard ? LG.sample(similar, 2) : [];
    const rest = others.filter((w) => !picked.includes(w));
    return picked.concat(LG.sample(rest, 2 - picked.length));
  }

  LG.createGame({
    titleKey: 'rocketRace',
    descKey: 'rocketRaceDesc',
    pic: 'rocket',
    rounds: 1,
    progress: false,
    timed: true,
    score: { id: 'rocket-race', better: 'low', format: LG.formatTime },
    round(_, ctx) {
      const queue = LG.deal(words, GOAL);
      const best = ctx.calm ? null : LG.bestScore('rocket-race', 'low');
      let done = 0;
      let over = false;

      const head = LG.el('div', 'game-head');
      const timer = LG.timerBar(false);
      const count = LG.el('span', 'score-box', LG.ICONS.star + '<b>0 / ' + GOAL + '</b>');
      head.append(timer.el, count);

      const play = LG.el('div', 'rocket-play');
      const space = LG.el('div', 'space');
      space.innerHTML = '<div class="space-moon">' + LG.picture('moon') + '</div><i class="star s1"></i><i class="star s2"></i><i class="star s3"></i><i class="star s4"></i>';
      const ghost = best ? space.appendChild(LG.el('div', 'space-rocket ghost', LG.picture('rocket'))) : null;
      const rocket = space.appendChild(LG.el('div', 'space-rocket', LG.picture('rocket')));
      const ask = LG.el('div', 'rocket-ask');
      play.append(space, ask);
      ctx.stage.append(head, play);
      ctx.stage.classList.add('rocket-stage');
      ctx.onCleanup(() => ctx.stage.classList.remove('rocket-stage'));

      const fly = (el, p) => el.style.setProperty('--p', Math.min(1, p));
      fly(rocket, 0);
      if (ghost) fly(ghost, 0);

      const clock = LG.clock({
        onTick(ms) {
          timer.set(ms);
          if (ghost) fly(ghost, ms / best);
        },
      });
      ctx.onCleanup(() => clock.stop());
      ctx.report(0, 0);

      function question() {
        const w = queue[done];
        const options = LG.shuffle([w].concat(distractors(w, done >= 4)));
        ask.innerHTML = '';
        const card = LG.pictureCard(w.pic, () => LG.speak(w.word));
        const choices = LG.el('div', 'choices stacked');
        options.forEach((opt) => {
          const b = LG.el('button', 'word-btn fit', LG.fmt(opt.word));
          b.type = 'button';
          b.addEventListener('click', () => {
            if (over || b.disabled) return;
            if (opt === w) right(b, w);
            else wrong(b);
          });
          choices.appendChild(b);
        });
        ask.append(card, choices);
        LG.fit(ask);
      }

      function right(b, w) {
        b.classList.add('right');
        ask.querySelectorAll('.word-btn').forEach((x) => (x.disabled = true));
        LG.sfx.good();
        LG.markCorrect(w.pic);
        done++;
        count.querySelector('b').textContent = done + ' / ' + GOAL;
        fly(rocket, done / GOAL);
        rocket.classList.remove('boost');
        void rocket.offsetWidth;
        rocket.classList.add('boost');
        ctx.report(done / GOAL, Math.round(clock.ms));
        if (done >= GOAL) return land();
        setTimeout(question, 450);
      }

      function wrong(b) {
        b.classList.add('wrong');
        b.disabled = true;
        LG.shake(b);
        LG.shake(rocket);
        LG.sfx.bad();
        clock.add(PENALTY);
        const plus = LG.el('span', 'penalty', '+' + PENALTY + ' s');
        head.appendChild(plus);
        setTimeout(() => plus.remove(), 1000);
      }

      function land() {
        over = true;
        clock.stop();
        const ms = Math.round(clock.ms);
        const secs = ms / 1000;
        const stars = secs <= 50 ? 3 : secs <= 90 ? 2 : 1;
        rocket.classList.add('landed');
        setTimeout(() => ctx.end({ won: true, stars: stars, title: LG.t('rocketWon'), text: LG.praise(), score: ctx.calm ? undefined : ms }), 900);
      }

      question();
    },
  });
})();
