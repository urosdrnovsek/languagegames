// Whack-a-Mole: moles pop up from nine holes, each holding a picture. Read
// the word at the bottom and tap the mole with its picture before it hides.
// 60 seconds; the moles get quicker with every hit. A wrong mole makes the
// hammer dizzy for a moment.
(function () {
  const SECONDS = 60;
  const HOLES = 9;

  LG.createGame({
    titleKey: 'whack',
    descKey: 'whackDesc',
    pic: 'mole',
    rounds: 1,
    progress: false,
    timed: true,
    score: { id: 'whack-a-mole', better: 'high', format: (n) => LG.t('pointsN', { n: n }) },
    round(_, ctx) {
      const pool = LG.words(LG.lang, { min: 6 });
      const unique = pool.filter((w, i) => pool.findIndex((x) => x.word === w.word) === i);
      // The words to find, in the same order on every device in a challenge.
      const queue = LG.deal(unique, 120);
      let points = 0;
      let target = queue.shift();
      let over = false;
      let dizzy = false;
      let gap = 1000; // ms between moles
      let stay = 2300; // ms a mole stays up
      let sinceSpawn = gap;
      let sinceTarget = 0;

      const head = LG.el('div', 'game-head');
      const timer = LG.timerBar(true);
      const box = LG.el('span', 'score-box', LG.ICONS.star + '<b>0</b>');
      head.append(timer.el, box);
      const field = LG.el('div', 'mole-field');
      const wordBar = LG.el('button', 'rain-word fit');
      wordBar.type = 'button';
      wordBar.addEventListener('click', () => LG.speak(target.word));
      ctx.stage.append(head, field, wordBar);
      ctx.stage.classList.add('mole-stage');
      ctx.onCleanup(() => ctx.stage.classList.remove('mole-stage'));

      const holes = Array.from({ length: HOLES }, () => {
        const hole = field.appendChild(LG.el('div', 'hole'));
        const mole = hole.appendChild(LG.el('button', 'mole', '<span class="mole-sign"></span><span class="mole-body">' + LG.picture('mole') + '</span>'));
        mole.type = 'button';
        const h = { hole: hole, mole: mole, w: null, until: 0 };
        mole.addEventListener('pointerdown', (e) => {
          e.preventDefault();
          hit(h);
        });
        return h;
      });

      function showWord() {
        wordBar.innerHTML = LG.fmt(target.word);
        LG.fit(ctx.stage);
      }

      function up(h, w, now) {
        h.w = w;
        h.until = now + stay;
        h.mole.querySelector('.mole-sign').innerHTML = LG.picture(w.pic);
        h.mole.setAttribute('aria-label', w.word);
        h.mole.classList.remove('bonk');
        h.hole.classList.add('up');
      }
      function down(h) {
        h.w = null;
        h.hole.classList.remove('up');
      }

      function spawn(now) {
        const free = holes.filter((h) => !h.w);
        if (!free.length) return;
        const showing = holes.filter((h) => h.w);
        const targetUp = showing.some((h) => h.w.word === target.word);
        let w;
        if (!targetUp && (sinceTarget >= 2 || Math.random() < 0.45)) {
          w = target;
          sinceTarget = 0;
        } else {
          const others = unique.filter((x) => x.word !== target.word && !showing.some((h) => h.w.word === x.word));
          w = others[Math.floor(Math.random() * others.length)] || target;
          sinceTarget++;
        }
        up(free[Math.floor(Math.random() * free.length)], w, now);
      }

      function hit(h) {
        if (over || !h.w || dizzy || h.mole.classList.contains('bonk')) return;
        if (h.w.word === target.word) {
          points++;
          box.querySelector('b').textContent = points;
          ctx.report(null, points);
          LG.sfx.good();
          LG.markCorrect(h.w.pic);
          h.mole.classList.add('bonk');
          h.until = performance.now() + 300;
          gap = Math.max(520, gap - 30);
          stay = Math.max(1200, stay - 60);
          target = queue.shift() || LG.pick(unique);
          sinceTarget = 2;
          showWord();
        } else {
          LG.sfx.bad();
          LG.shake(h.mole.firstChild);
          dizzy = true;
          field.classList.add('dizzy');
          setTimeout(() => {
            dizzy = false;
            field.classList.remove('dizzy');
          }, 600);
        }
      }

      const clock = LG.clock({
        seconds: SECONDS,
        onTick: (ms) => timer.set(ms, ms / (SECONDS * 1000)),
        onEnd: end,
      });
      ctx.onCleanup(() => clock.stop());
      timer.set(SECONDS * 1000, 1);
      showWord();
      ctx.report(null, 0);

      let last = performance.now();
      let frame = requestAnimationFrame(step);
      ctx.onCleanup(() => cancelAnimationFrame(frame));
      function step(now) {
        // After a pause (another tab), carry on where the moles were.
        const lag = Math.max(0, now - last - 100);
        holes.forEach((h) => (h.until += lag));
        sinceSpawn += now - last - lag;
        last = now;
        if (sinceSpawn >= gap && holes.filter((h) => h.w).length < 3) {
          sinceSpawn = 0;
          spawn(now);
        }
        holes.forEach((h) => h.w && now > h.until && down(h));
        if (!over) frame = requestAnimationFrame(step);
      }

      function end() {
        over = true;
        holes.forEach(down);
        const stars = points >= 18 ? 3 : points >= 9 ? 2 : 1;
        ctx.end({ won: true, stars: stars, title: LG.t('timeUp'), text: LG.t('pointsText', { n: points }), score: points });
      }
    },
  });
})();
