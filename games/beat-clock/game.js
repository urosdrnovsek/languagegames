// Beat the Clock: 60 seconds to match as many words and pictures as
// possible. Questions alternate between "picture: pick the word" and
// "word: pick the picture"; three right in a row adds 3 seconds, up to
// 30 extra seconds in all, so even the fastest game ends.
// With ?daily=1 it's the Daily Challenge: today's words for everyone.
(function () {
  const SECONDS = 60;
  const BONUS = 3;
  const MAX_BONUS = 30;

  LG.createGame({
    titleKey: 'beatClock',
    descKey: 'beatClockDesc',
    pic: 'clock',
    rounds: 1,
    progress: false,
    timed: true,
    daily: true,
    score: { id: 'beat-clock', better: 'high', format: (n) => LG.t('pointsN', { n: n }) },
    round(_, ctx) {
      const pool = LG.words(LG.lang, { min: 4 });
      const queue = LG.deal(pool, 300);
      let q = 0;
      let points = 0;
      let streak = 0;
      let bonus = 0;
      let done = false;

      const head = LG.el('div', 'game-head');
      const timer = LG.timerBar(true);
      const box = LG.el('span', 'score-box', LG.ICONS.star + '<b>0</b>');
      head.append(timer.el, box);
      const clock = LG.clock({
        seconds: SECONDS,
        onTick: (ms) => timer.set(ms, Math.min(1, ms / (SECONDS * 1000))),
        onEnd: finish,
      });
      ctx.onCleanup(clock.stop);
      timer.set(SECONDS * 1000, 1);

      const area = LG.el('div', 'beat-area');
      ctx.stage.append(head, area);

      function next() {
        const w = queue[q++ % queue.length];
        const others = LG.sample(pool.filter((x) => x.word !== w.word), 2);
        const options = LG.shuffle([w].concat(others));
        area.innerHTML = '';
        const picFirst = q % 2 === 1;
        if (picFirst) {
          area.appendChild(LG.el('div', 'pic-card small-card', '<div class="pic">' + LG.picture(w.pic) + '</div>'));
          const choices = LG.el('div', 'choices stacked');
          options.forEach((o) => choices.appendChild(answer(LG.el('button', 'word-btn fit', LG.fmt(o.word)), o === w)));
          area.appendChild(choices);
        } else {
          area.appendChild(LG.el('div', 'big-word fit', LG.fmt(w.word)));
          const choices = LG.el('div', 'pic-choices');
          options.forEach((o) => {
            const b = LG.el('button', 'pic-choice', LG.picture(o.pic));
            b.setAttribute('aria-label', o.word);
            choices.appendChild(answer(b, o === w));
          });
          area.appendChild(choices);
        }
        LG.fit(area);

        function answer(b, right) {
          b.type = 'button';
          b.addEventListener('click', () => {
            if (done) return;
            if (right) {
              points++;
              streak++;
              box.querySelector('b').textContent = points;
              ctx.report(Math.min(1, 1 - clock.ms / (SECONDS * 1000)), points);
              LG.sfx.good();
              LG.markCorrect(w.pic);
              if (streak % 3 === 0 && bonus < MAX_BONUS) {
                bonus += BONUS;
                clock.add(BONUS);
                const f = LG.el('span', 'floater', '+' + BONUS + 's');
                head.appendChild(f);
                setTimeout(() => f.remove(), 1000);
              }
              next();
            } else {
              streak = 0;
              b.classList.add('wrong');
              b.disabled = true;
              LG.shake(b);
              LG.sfx.bad();
            }
          });
          return b;
        }
      }

      function finish() {
        done = true;
        const stars = points >= 20 ? 3 : points >= 12 ? 2 : 1;
        ctx.end({ won: true, stars: stars, title: LG.t('timeUp'), text: LG.t('pointsText', { n: points }), score: points });
      }

      ctx.report(0, 0);
      next();
    },
  });
})();
