// Team Battle: the class splits into 2-4 teams that take turns on the
// whiteboard. Right on the first try scores 2 points; if a team gets it
// wrong, the next team gets one chance for 1 point.
(function () {
  const TEAMS = [
    { color: '#fa5252', soft: '#ffe3e3', pic: 'lion' },
    { color: '#4dabf7', soft: '#d0ebff', pic: 'penguin' },
    { color: '#51cf66', soft: '#d3f9d8', pic: 'frog' },
    { color: '#fcc419', soft: '#fff3bf', pic: 'bee' },
  ];

  LG.createGame({
    titleKey: 'teamBattle',
    descKey: 'teamBattleDesc',
    pic: 'crown',
    rounds: 1,
    progress: false,
    round(_, ctx) {
      let teams = 2;
      let each = 5;

      // ---- Setup: number of teams and questions ----
      const setup = LG.el('div', 'team-setup');
      const choice = (label, values, get, set) => {
        const box = LG.el('div', 'team-choice', '<h3></h3><div></div>');
        box.querySelector('h3').textContent = label;
        const row = box.querySelector('div');
        values.forEach((v) => {
          const b = LG.el('button', 'tile small' + (v === get() ? ' right' : ''), String(v));
          b.type = 'button';
          b.addEventListener('click', () => {
            set(v);
            row.querySelectorAll('button').forEach((x) => x.classList.toggle('right', x === b));
          });
          row.appendChild(b);
        });
        return box;
      };
      const go = LG.el('button', 'big-btn', LG.ICONS.play + '<span>' + LG.t('play') + '</span>');
      go.type = 'button';
      go.addEventListener('click', play);
      setup.append(choice(LG.t('howManyTeams'), [2, 3, 4], () => teams, (v) => (teams = v)),
        choice(LG.t('questionsEach'), [3, 5, 8], () => each, (v) => (each = v)), LG.el('p', 'team-rules', LG.t('teamPoints')), go);
      ctx.stage.appendChild(setup);

      function play() {
        const pool = LG.words(LG.lang, { min: 4 });
        const unique = pool.filter((w, i) => pool.findIndex((x) => x.word === w.word) === i);
        const queue = LG.deal(unique, teams * each);
        const score = Array(teams).fill(0);
        let q = 0;
        let turn = 0;
        let steal = false;
        let open = false;

        ctx.stage.innerHTML = '';
        ctx.stage.classList.add('team-stage');
        ctx.onCleanup(() => ctx.stage.classList.remove('team-stage'));
        const bar = LG.el('div', 'team-bar');
        const chips = TEAMS.slice(0, teams).map((t, i) => {
          const c = LG.el('div', 'team-chip', '<span class="team-pic">' + LG.picture(t.pic) + '</span><span class="team-name"></span><b>0</b>');
          c.style.setProperty('--team', t.color);
          c.style.setProperty('--team-soft', t.soft);
          c.querySelector('.team-name').textContent = LG.t('teamN', { n: i + 1 });
          return bar.appendChild(c);
        });
        const prompt = LG.el('div', 'team-prompt');
        const area = LG.el('div', 'team-area');
        const counter = LG.el('div', 'bingo-count');
        ctx.stage.append(bar, prompt, area, counter);

        function drawTurn() {
          chips.forEach((c, i) => {
            c.classList.toggle('active', i === turn);
            c.querySelector('b').textContent = score[i];
          });
          const t = TEAMS[turn];
          prompt.style.setProperty('--team', t.color);
          prompt.innerHTML = '<span class="team-pic">' + LG.picture(t.pic) + '</span><span></span>';
          prompt.querySelector('span:last-child').textContent = LG.t(steal ? 'teamSteal' : 'teamTurn', { n: turn + 1 });
          LG.speak(LG.t(steal ? 'teamSteal' : 'teamTurn', { n: turn + 1 }));
        }

        function ask() {
          if (q >= queue.length) return finish();
          const w = queue[q];
          const options = LG.shuffle([w].concat(LG.sample(unique.filter((x) => x.word !== w.word), 3)));
          turn = q % teams;
          steal = false;
          counter.textContent = q + 1 + ' / ' + queue.length;
          area.innerHTML = '';
          const picFirst = q % 2 === 0;
          let grid;
          if (picFirst) {
            area.appendChild(LG.el('div', 'pic-card small-card', '<div class="pic">' + LG.picture(w.pic) + '</div>'));
            grid = LG.el('div', 'team-words');
            options.forEach((o) => grid.appendChild(answer(LG.el('button', 'word-btn fit', LG.fmt(o.word)), o, w)));
          } else {
            area.appendChild(LG.el('div', 'big-word fit', LG.fmt(w.word)));
            grid = LG.el('div', 'pic-choices team-pics');
            options.forEach((o) => {
              const b = LG.el('button', 'pic-choice', LG.picture(o.pic));
              b.setAttribute('aria-label', o.word);
              grid.appendChild(answer(b, o, w));
            });
          }
          area.appendChild(grid);
          LG.fit(ctx.stage);
          drawTurn();
          open = true;
        }

        function answer(b, o, w) {
          b.type = 'button';
          b.addEventListener('click', () => {
            if (!open || b.disabled) return;
            if (o === w) {
              open = false;
              score[turn] += steal ? 1 : 2;
              b.classList.add('right');
              LG.sfx.good();
              LG.confetti(25);
              LG.markCorrect(w.pic);
              drawTurn();
              LG.speak(LG.praise() + ' ' + w.word + '.');
              q++;
              setTimeout(ask, 1800);
            } else if (!steal && teams > 1) {
              b.classList.add('wrong');
              b.disabled = true;
              LG.shake(b);
              LG.sfx.bad();
              steal = true;
              turn = (turn + 1) % teams;
              drawTurn();
            } else {
              open = false;
              b.classList.add('wrong');
              LG.sfx.bad();
              area.querySelectorAll('button').forEach((x) => {
                x.disabled = true;
                if (x.textContent === w.word || x.getAttribute('aria-label') === w.word) x.classList.add('right');
              });
              q++;
              setTimeout(ask, 2200);
            }
          });
          return b;
        }

        function finish() {
          const best = Math.max(...score);
          const winners = score.map((s, i) => (s === best ? i : -1)).filter((i) => i >= 0);
          const text = TEAMS.slice(0, teams).map((t, i) => LG.t('teamN', { n: i + 1 }) + ': ' + score[i]).join(' · ');
          ctx.end({ won: true, stars: 3, title: winners.length > 1 ? LG.t('teamTie') : LG.t('teamWins', { n: winners[0] + 1 }), text: text });
        }

        ask();
      }
    },
  });
})();
