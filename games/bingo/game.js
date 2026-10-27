// Word Bingo for a whole class. The teacher's screen ("caller") makes a
// code from the topics chosen in the teacher settings and calls the words
// one by one; every child enters the code and gets their own 3 x 3 card of
// pictures from the same words. Tap a picture when its word is called;
// a full row, column or diagonal is Bingo. No network needed.
(function () {
  const CARD = 9;
  // Each game uses a deck of this many words, so Bingos come in good time.
  const DECK = 24;
  const LINES = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

  document.title = LG.t('bingo') + ' · ' + LG.t('appTitle');
  const bar = LG.topbar(LG.t('bingo'), '../../index.html');
  const stage = LG.el('main', 'stage');
  document.body.append(bar, stage);

  // The same deck of words on every device with the same code.
  function deckFor(c) {
    LG.settings.topics = c.topics;
    const pool = LG.words(LG.lang, { min: CARD });
    const unique = pool.filter((w, i) => pool.findIndex((x) => x.word === w.word) === i);
    LG.seedRandom(LG.hash('bingo-deck:' + c.code));
    const deck = LG.sample(unique, DECK);
    LG.seedRandom(null);
    return deck;
  }

  function panel(parts) {
    const o = LG.el('div', 'overlay');
    const p = LG.el('div', 'panel');
    p.append(...parts);
    o.appendChild(p);
    document.body.appendChild(o);
    return o;
  }
  function button(cls, html, onClick) {
    const b = LG.el('button', cls, html);
    b.type = 'button';
    b.addEventListener('click', onClick);
    return b;
  }

  function choose() {
    stage.innerHTML = '';
    const o = panel([
      LG.el('div', 'panel-pic', LG.picture('flag')),
      LG.el('h2', '', LG.t('bingo')),
      LG.el('p', '', LG.t('bingoDesc')),
      button('big-btn', '<span>' + LG.t('bingoPlayer') + '</span>', () => {
        o.remove();
        join();
      }),
      LG.el('p', 'mode-help', LG.t('bingoPlayerDesc')),
      button('big-btn secondary', '<span>' + LG.t('bingoCaller') + '</span>', () => {
        o.remove();
        caller();
      }),
      LG.el('p', 'mode-help', LG.t('bingoCallerDesc')),
    ]);
  }

  // ---- Caller (teacher) ----
  function caller() {
    const c = LG.readCode(LG.makeCode(LG.savedSettings().topics, Math.floor(Math.random() * 16384)));
    const deck = deckFor(c);
    LG.seedRandom(LG.hash('bingo:' + c.code));
    const calls = LG.shuffle(deck);
    LG.seedRandom(null);
    let n = 0;

    stage.innerHTML = '';
    const codeBox = LG.el('div', 'bingo-code', '<small>' + LG.t('bingoCodeHelp') + '</small><b>' + c.code + '</b>');
    const word = LG.el('div', 'bingo-call big-word fit');
    const listen = button('icon-btn listen-btn static', LG.ICONS.soundOn, () => n && LG.speak(calls[n - 1].word));
    listen.setAttribute('aria-label', LG.t('listen'));
    const count = LG.el('div', 'bingo-count');
    const history = LG.el('div', 'ws-clues bingo-history');
    const next = button('big-btn', '<span>' + LG.t('startCalling') + '</span>', () => {
      if (n >= calls.length) return;
      const w = calls[n++];
      word.innerHTML = LG.fmt(w.word);
      LG.fit(stage);
      LG.speak(w.word);
      count.textContent = n + ' / ' + calls.length;
      next.querySelector('span').textContent = LG.t('nextWord');
      history.prepend(LG.el('div', 'ws-clue', '<div class="ws-pic">' + LG.picture(w.pic) + '</div><span>' + LG.fmt(w.word) + '</span>'));
      if (n >= calls.length) next.disabled = true;
    });
    const again = button('big-btn secondary', LG.ICONS.again + '<span>' + LG.t('newGame') + '</span>', choose);
    const callRow = LG.el('div', 'bingo-call-row');
    callRow.append(word, listen);
    stage.append(codeBox, callRow, count, next, LG.el('h3', '', LG.t('calledWords')), history, again);
  }

  // ---- Player (child) ----
  function join() {
    const input = LG.el('input', 'name-input code-input');
    input.placeholder = 'XXXX-XXXX';
    input.autocapitalize = 'characters';
    input.autocomplete = 'off';
    input.setAttribute('aria-label', LG.t('enterCode'));
    const error = LG.el('p', 'gate-error');
    const form = LG.el('form', '');
    const go = LG.el('button', 'big-btn', '<span>' + LG.t('join') + '</span>');
    go.type = 'submit';
    form.append(input, error, go);
    const o = panel([LG.el('h2', '', LG.t('enterCode')), form]);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const c = LG.readCode(input.value);
      if (!c) {
        error.textContent = LG.t('wrongCode');
        LG.shake(form);
        return;
      }
      o.remove();
      card(c);
    });
    input.focus();
  }

  function card(c) {
    const words = LG.sample(deckFor(c), CARD);
    const marked = new Set();
    let shouted = false;
    stage.innerHTML = '';
    const grid = LG.el('div', 'bingo-card');
    words.forEach((w, i) => {
      const b = button('bingo-cell', '<div class="bingo-pic">' + LG.picture(w.pic) + '</div>', () => {
        if (marked.has(i)) marked.delete(i);
        else {
          marked.add(i);
          LG.sfx.tap();
        }
        b.classList.toggle('marked', marked.has(i));
        const line = LINES.find((l) => l.every((k) => marked.has(k)));
        grid.querySelectorAll('.bingo-cell').forEach((x, k) => x.classList.toggle('line', !!line && line.includes(k)));
        if (line && !shouted) {
          shouted = true;
          line.forEach((k) => LG.markCorrect(words[k].pic));
          LG.sfx.win();
          LG.confetti(70);
          LG.speak(LG.t('bingoShout'));
          const o = panel([LG.el('div', 'big-stars', LG.ICONS.star + LG.ICONS.star + LG.ICONS.star), LG.el('h2', '', LG.t('bingoShout')), LG.el('p', '', LG.t('bingoShow')),
            button('big-btn', '<span>OK</span>', () => o.remove())]);
        }
        if (!line) shouted = false;
      });
      b.setAttribute('aria-label', w.word);
      grid.appendChild(b);
    });
    stage.append(LG.el('div', 'bingo-code small', '<b>' + c.code + '</b>'), LG.el('p', 'mode-help', LG.t('bingoTap')), grid,
      button('big-btn secondary', LG.ICONS.again + '<span>' + LG.t('newGame') + '</span>', choose));
  }

  choose();
})();
