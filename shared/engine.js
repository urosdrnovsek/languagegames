// Shared game engine: language, UI text, speech, sound effects and the game
// shell (top bar, progress, start and finish screens) used by every game.
(function () {
  const LG = (window.LG = window.LG || {});
  const LANGS = ['en', 'sl'];
  const params = new URLSearchParams(location.search);

  function store(key, value) {
    try {
      if (value === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, value);
    } catch (e) {
      return null;
    }
  }

  // ---------- Language ----------

  LG.lang = (function () {
    const fromUrl = params.get('lang');
    if (LANGS.includes(fromUrl)) return fromUrl;
    const saved = store('lg-lang');
    if (LANGS.includes(saved)) return saved;
    return (navigator.language || '').toLowerCase().startsWith('sl') ? 'sl' : 'en';
  })();
  document.documentElement.lang = LG.lang;

  LG.setLang = function (lang) {
    if (!LANGS.includes(lang) || lang === LG.lang) return;
    store('lg-lang', lang);
    params.set('lang', lang);
    location.search = params.toString();
  };

  // Link to another page, keeping the current language and settings.
  LG.link = function (path) {
    const p = new URLSearchParams(params);
    p.set('lang', LG.lang);
    return path + '?' + p.toString();
  };

  const TEXT = {
    en: {
      appTitle: 'Language Games',
      hubSubtitle: 'Fun games for learning to read',
      play: 'Play',
      playAgain: 'Play again',
      allGames: 'All games',
      sound: 'Sound on or off',
      listen: 'Listen',
      wellDone: 'Well done!',
      finished: 'You finished every round!',
      tryAgain: 'Try again.',
      praise: ['Great job!', 'Yes!', 'Super!', 'Well done!', 'Brilliant!'],
      privacy: 'No ads. No tracking. Just learning.',
      wordsCount: '{n} words to discover',
      letterSounds: 'First Letter',
      letterSoundsDesc: 'Which letter does the word start with?',
      letterPrompt: '{word}. Which letter does {word} start with?',
      letterCorrect: '{word} starts with {letter}.',
      pictureWord: 'Read and Match',
      pictureWordDesc: 'Read the words and find the one for the picture.',
      pictureWordPrompt: 'Which word goes with this picture?',
      buildWord: 'Build the Word',
      buildWordDesc: 'Put the letters in the right order.',
      buildPrompt: 'Spell {word}.',
      voiceMissing: "This device has no English voice, so words won't be read aloud. You can still play!",
      wordBook: 'Word Book',
      wordBookDesc: 'Look at all the pictures. Tap one to hear the word.',
    },
    sl: {
      appTitle: 'Jezikovne igre',
      hubSubtitle: 'Zabavne igre za učenje branja',
      play: 'Igraj',
      playAgain: 'Igraj znova',
      allGames: 'Vse igre',
      sound: 'Vklopi ali izklopi zvok',
      listen: 'Poslušaj',
      wellDone: 'Odlično!',
      finished: 'Vse naloge so rešene!',
      tryAgain: 'Poskusi znova.',
      praise: ['Bravo!', 'Super!', 'Odlično!', 'Tako je!', 'Čudovito!'],
      privacy: 'Brez oglasov. Brez sledenja. Samo učenje.',
      wordsCount: '{n} besed za odkrivanje',
      letterSounds: 'Prva črka',
      letterSoundsDesc: 'S katero črko se začne beseda?',
      letterPrompt: '{word}. S katero črko se začne beseda {word}?',
      letterCorrect: 'Beseda {word} se začne s črko {letter}.',
      pictureWord: 'Preberi in poveži',
      pictureWordDesc: 'Preberi besede in poišči tisto, ki sodi k sliki.',
      pictureWordPrompt: 'Katera beseda sodi k tej sliki?',
      buildWord: 'Sestavi besedo',
      buildWordDesc: 'Postavi črke v pravi vrstni red.',
      buildPrompt: 'Sestavi besedo {word}.',
      voiceMissing: 'Ta naprava nima slovenskega glasu, zato besede ne bodo prebrane na glas. Igraš lahko vseeno!',
      wordBook: 'Slikovni slovar',
      wordBookDesc: 'Oglej si vse slike. Tapni sliko in poslušaj besedo.',
    },
  };

  LG.t = function (key, vars) {
    let s = TEXT[LG.lang][key];
    if (s === undefined) s = TEXT.en[key];
    if (typeof s === 'string' && vars) {
      s = s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] !== undefined ? vars[k] : m));
    }
    return s;
  };

  LG.praise = function () {
    return LG.pick(LG.t('praise'));
  };

  // ---------- Helpers ----------

  LG.shuffle = function (list) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  LG.pick = (list) => list[Math.floor(Math.random() * list.length)];
  LG.sample = (list, n) => LG.shuffle(list).slice(0, n);

  LG.el = function (tag, className, html) {
    const e = document.createElement(tag);
    if (className) e.className = className;
    if (html !== undefined) e.innerHTML = html;
    return e;
  };

  LG.ICONS = {
    home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11 12 3l9 8v10h-6v-6H9v6H3z" fill="currentColor"/></svg>',
    soundOn: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9h4l5-4v14l-5-4H3z" fill="currentColor"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    soundOff: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9h4l5-4v14l-5-4H3z" fill="currentColor"/><path d="m16 9 6 6m0-6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4v16l13-8z" fill="currentColor"/></svg>',
    again: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 3 6.6 7.2.8-5.4 4.9 1.5 7.1L12 17.8 5.7 21.4l1.5-7.1L1.8 9.4 9 8.6z" fill="currentColor"/></svg>',
  };

  // ---------- Sound ----------

  LG.muted = store('lg-muted') === '1';
  LG.setMuted = function (m) {
    LG.muted = m;
    store('lg-muted', m ? '1' : '0');
    if (m && window.speechSynthesis) speechSynthesis.cancel();
  };

  const synth = window.speechSynthesis;
  const SPEECH_LANG = { en: 'en-US', sl: 'sl-SI' };
  let voices = [];
  let voicesSettled = false;
  const voiceListeners = [];
  function loadVoices() {
    voices = synth ? synth.getVoices() : [];
    if (voices.length) voicesSettled = true;
    voiceListeners.forEach((cb) => cb());
  }
  if (synth) {
    loadVoices();
    synth.addEventListener && synth.addEventListener('voiceschanged', loadVoices);
  }
  // Some browsers never fire voiceschanged; after a moment, trust what we have.
  setTimeout(() => {
    voicesSettled = true;
    loadVoices();
  }, 2000);

  function findVoice() {
    const want = SPEECH_LANG[LG.lang].toLowerCase();
    const norm = (v) => v.lang.replace('_', '-').toLowerCase();
    return voices.find((v) => norm(v) === want) || voices.find((v) => norm(v).startsWith(LG.lang + '-') || norm(v) === LG.lang) || null;
  }

  // 'ok', 'missing' (no voice for this language), 'none' (no speech at all)
  // or 'unknown' (still loading).
  LG.voiceStatus = function () {
    if (!synth) return 'none';
    if (findVoice()) return 'ok';
    if (!voicesSettled) return 'unknown';
    return voices.length ? 'missing' : 'none';
  };
  LG.onVoices = (cb) => voiceListeners.push(cb);

  // Keeps utterances referenced until they finish; Chrome can otherwise
  // garbage-collect them mid-sentence and never fire onend.
  const speaking = new Set();

  // Speaks text in the current language. Resolves when finished (or at once
  // if speech is unavailable), so games never wait on audio to continue.
  // Call it straight from a tap handler: iOS and some Chrome versions only
  // allow speech that starts during a user gesture, so it must not be
  // delayed with setTimeout.
  LG.speak = function (text) {
    return new Promise((resolve) => {
      if (LG.muted || !synth || !text) return resolve();
      const voice = findVoice();
      // Voices are loaded but none speaks this language: stay silent rather
      // than read the words with the wrong accent.
      if (LG.voiceStatus() === 'missing') return resolve();
      if (synth.speaking || synth.pending) synth.cancel();
      synth.resume();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = SPEECH_LANG[LG.lang];
      if (voice) u.voice = voice;
      u.rate = 0.85;
      u.pitch = 1.05;
      let done = false;
      const finish = () => {
        speaking.delete(u);
        if (!done) {
          done = true;
          resolve();
        }
      };
      u.onend = finish;
      u.onerror = finish;
      speaking.add(u);
      setTimeout(finish, 1500 + text.length * 120);
      synth.speak(u);
    });
  };

  // A short note shown when this device can't read the current language aloud.
  LG.voiceNotice = function () {
    const note = LG.el('p', 'voice-note');
    note.setAttribute('role', 'status');
    const update = () => {
      const status = LG.voiceStatus();
      note.textContent = status === 'missing' || status === 'none' ? LG.t('voiceMissing') : '';
      note.hidden = !note.textContent;
    };
    update();
    LG.onVoices(update);
    return note;
  };

  LG.letterName = function (letter) {
    return LG.LETTER_NAMES[LG.lang][letter] || letter.toUpperCase();
  };

  let audio = null;
  function tone(freq, start, dur, type, vol) {
    if (LG.muted) return;
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      if (audio.state === 'suspended') audio.resume();
      const t0 = audio.currentTime + start;
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      osc.type = type || 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(vol || 0.18, t0 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      osc.connect(gain).connect(audio.destination);
      osc.start(t0);
      osc.stop(t0 + dur + 0.05);
    } catch (e) {
      /* audio not available */
    }
  }
  LG.sfx = {
    tap: () => tone(520, 0, 0.08, 'triangle', 0.08),
    good: () => {
      tone(660, 0, 0.15);
      tone(880, 0.12, 0.25);
    },
    bad: () => tone(200, 0, 0.25, 'triangle', 0.15),
    win: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.13, 0.3)),
  };

  // ---------- Effects ----------

  const reducedMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const CONFETTI = ['#ff6b6b', '#ffd43b', '#51cf66', '#4dabf7', '#cc5de8', '#ff922b'];

  LG.confetti = function (count) {
    if (reducedMotion) return;
    const box = LG.el('div', 'confetti');
    for (let i = 0; i < (count || 40); i++) {
      const c = LG.el('i');
      c.style.left = Math.random() * 100 + '%';
      c.style.background = LG.pick(CONFETTI);
      c.style.animationDelay = Math.random() * 0.4 + 's';
      c.style.animationDuration = 1.2 + Math.random() * 1.2 + 's';
      c.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
      box.appendChild(c);
    }
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 3000);
  };

  LG.shake = function (node) {
    node.classList.remove('shake');
    void node.offsetWidth;
    node.classList.add('shake');
  };

  // A picture card with a "listen" button.
  LG.pictureCard = function (pic, onListen) {
    const card = LG.el('div', 'pic-card');
    card.appendChild(LG.el('div', 'pic', LG.picture(pic)));
    if (onListen) {
      const b = LG.el('button', 'icon-btn listen-btn', LG.ICONS.soundOn);
      b.type = 'button';
      b.setAttribute('aria-label', LG.t('listen'));
      b.addEventListener('click', onListen);
      card.appendChild(b);
    }
    return card;
  };

  // ---------- Language switch (used by the hub and the games) ----------

  LG.langSwitch = function () {
    const box = LG.el('div', 'lang-switch');
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', 'Language / Jezik');
    [['en', 'EN', 'English'], ['sl', 'SL', 'Slovenščina']].forEach(([code, label, name]) => {
      const b = LG.el('button', code === LG.lang ? 'active' : '', label);
      b.type = 'button';
      b.title = name;
      b.setAttribute('aria-label', name);
      b.setAttribute('aria-pressed', code === LG.lang);
      b.addEventListener('click', () => LG.setLang(code));
      box.appendChild(b);
    });
    return box;
  };

  LG.soundButton = function () {
    const b = LG.el('button', 'icon-btn');
    b.type = 'button';
    b.setAttribute('aria-label', LG.t('sound'));
    const draw = () => {
      b.innerHTML = LG.muted ? LG.ICONS.soundOff : LG.ICONS.soundOn;
      b.setAttribute('aria-pressed', !LG.muted);
    };
    b.addEventListener('click', () => {
      LG.setMuted(!LG.muted);
      draw();
    });
    draw();
    return b;
  };

  // ---------- Game shell ----------
  //
  // LG.createGame({ titleKey, descKey, pic, rounds, round(index, ctx) })
  // round() draws one round into ctx.stage and calls ctx.complete(promise)
  // when the child has solved it. Add ?home=0 to a game's URL to hide the
  // link back to the game list (for sites that embed a single game).

  LG.createGame = function (opts) {
    const rounds = opts.rounds || 8;
    const showHome = params.get('home') !== '0';
    document.title = LG.t(opts.titleKey) + ' · ' + LG.t('appTitle');

    const bar = LG.el('header', 'topbar');
    if (showHome) {
      const home = LG.el('a', 'icon-btn', LG.ICONS.home);
      home.href = LG.link('../../index.html');
      home.setAttribute('aria-label', LG.t('allGames'));
      bar.appendChild(home);
    }
    bar.appendChild(LG.el('h1', 'game-title', LG.t(opts.titleKey)));
    const tools = LG.el('div', 'tools');
    tools.appendChild(LG.langSwitch());
    tools.appendChild(LG.soundButton());
    bar.appendChild(tools);

    const progress = LG.el('div', 'progress');
    progress.setAttribute('role', 'progressbar');
    progress.setAttribute('aria-valuemin', 0);
    progress.setAttribute('aria-valuemax', rounds);
    const dots = [];
    for (let i = 0; i < rounds; i++) dots.push(progress.appendChild(LG.el('span', 'dot', LG.ICONS.star)));

    const stage = LG.el('main', 'stage');
    stage.setAttribute('aria-live', 'polite');

    document.body.append(bar, progress, stage);

    function overlay(inner) {
      const o = LG.el('div', 'overlay');
      const panel = LG.el('div', 'panel');
      panel.append(...inner);
      o.appendChild(panel);
      document.body.appendChild(o);
      const btn = panel.querySelector('button');
      if (btn) btn.focus();
      return o;
    }

    function bigButton(icon, label, onClick) {
      const b = LG.el('button', 'big-btn', icon + '<span>' + label + '</span>');
      b.type = 'button';
      b.addEventListener('click', onClick);
      return b;
    }

    let round = 0;
    let locked = false;

    function setProgress() {
      dots.forEach((d, i) => d.classList.toggle('done', i < round));
      progress.setAttribute('aria-valuenow', round);
    }

    function showRound() {
      locked = false;
      stage.innerHTML = '';
      opts.round(round, ctx);
    }

    const ctx = {
      stage: stage,
      rounds: rounds,
      // Call when the round is solved; waits for `wait` (e.g. speech) before moving on.
      complete(wait) {
        if (locked) return;
        locked = true;
        LG.sfx.good();
        LG.confetti(18);
        dots[round].classList.add('pop');
        round++;
        setProgress();
        const minDelay = new Promise((r) => setTimeout(r, 1300));
        const maxDelay = new Promise((r) => setTimeout(r, 4500));
        Promise.race([Promise.all([minDelay, wait || Promise.resolve()]), maxDelay]).then(() => {
          if (round >= rounds) finish();
          else showRound();
        });
      },
      isLocked: () => locked,
    };

    function start() {
      round = 0;
      setProgress();
      dots.forEach((d) => d.classList.remove('pop'));
      if (opts.onStart) opts.onStart();
      showRound();
    }

    function finish() {
      stage.innerHTML = '';
      LG.sfx.win();
      LG.confetti(70);
      LG.speak(LG.t('wellDone') + ' ' + LG.t('finished'));
      const stars = LG.el('div', 'big-stars', LG.ICONS.star + LG.ICONS.star + LG.ICONS.star);
      const buttons = LG.el('div', 'panel-buttons');
      const o = overlay([stars, LG.el('h2', '', LG.t('wellDone')), LG.el('p', '', LG.t('finished')), buttons]);
      buttons.appendChild(bigButton(LG.ICONS.again, LG.t('playAgain'), () => {
        o.remove();
        start();
      }));
      if (showHome) {
        const a = LG.el('a', 'big-btn secondary', LG.ICONS.home + '<span>' + LG.t('allGames') + '</span>');
        a.href = LG.link('../../index.html');
        buttons.appendChild(a);
      }
      buttons.querySelector('button').focus();
    }

    // Start screen. The Play tap also unlocks speech and sound in browsers
    // that only allow audio after a user gesture.
    const startScreen = overlay([
      LG.el('div', 'panel-pic', LG.picture(opts.pic)),
      LG.el('h2', '', LG.t(opts.titleKey)),
      LG.el('p', '', LG.t(opts.descKey)),
      LG.voiceNotice(),
      bigButton(LG.ICONS.play, LG.t('play'), () => {
        startScreen.remove();
        LG.sfx.tap();
        start();
      }),
    ]);
    setProgress();
  };
})();
