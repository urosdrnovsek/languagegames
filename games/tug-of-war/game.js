// Tug of War: two players share one tablet, sitting opposite each other.
// Both halves show the same picture with the word choices in a different
// order. The first right tap pulls the rope; a wrong tap freezes that
// player for a moment. Pull the knot to your side to win.
(function () {
  const WIN = 4;

  LG.createGame({
    titleKey: 'tug',
    descKey: 'tugDesc',
    pic: 'rope',
    rounds: 1,
    progress: false,
    timed: true,
    round(_, ctx) {
      const pool = LG.words(LG.lang, { min: 3 });
      const unique = pool.filter((w, i) => pool.findIndex((x) => x.word === w.word) === i);
      const queue = LG.deal(unique, 300);
      let q = 0;
      let pos = 0; // > 0 towards blue, < 0 towards red
      let open = false;
      let current = null;

      ctx.stage.classList.add('tug-stage');
      ctx.onCleanup(() => ctx.stage.classList.remove('tug-stage'));
      const half = (color) => {
        const el = LG.el('div', 'tug-half ' + color);
        const pic = el.appendChild(LG.el('div', 'tug-pic'));
        const choices = el.appendChild(LG.el('div', 'tug-choices'));
        return { el: el, pic: pic, choices: choices, locked: false, color: color };
      };
      const red = half('red');
      const blue = half('blue');
      const rope = LG.el('div', 'tug-rope', '<span class="tug-end red"></span><div class="tug-track"><span class="tug-knot"></span></div><span class="tug-end blue"></span>');
      const knot = rope.querySelector('.tug-knot');
      ctx.stage.append(red.el, rope, blue.el);

      function drawRope() {
        knot.style.left = 50 + (pos / WIN) * 46 + '%';
      }

      function ask() {
        current = queue[q++ % queue.length];
        const others = LG.sample(unique.filter((x) => x.word !== current.word), 2);
        [red, blue].forEach((h) => {
          h.pic.innerHTML = LG.picture(current.pic);
          h.choices.innerHTML = '';
          h.locked = false;
          h.el.classList.remove('frozen');
          LG.shuffle([current].concat(others)).forEach((o) => {
            const b = LG.el('button', 'word-btn fit', LG.fmt(o.word));
            b.type = 'button';
            b.addEventListener('pointerdown', (e) => {
              e.preventDefault();
              answer(h, o === current, b);
            });
            h.choices.appendChild(b);
          });
        });
        LG.fit(ctx.stage);
        open = true;
      }

      function answer(h, right, b) {
        if (!open || h.locked) return;
        if (right) {
          open = false;
          pos += h === blue ? 1 : -1;
          b.classList.add('right');
          LG.sfx.good();
          LG.markCorrect(current.pic);
          drawRope();
          if (Math.abs(pos) >= WIN) {
            setTimeout(() => ctx.end({ won: true, stars: 3, title: LG.t(pos > 0 ? 'blueWins' : 'redWins'), text: LG.t('tugText') }), 900);
          } else {
            setTimeout(ask, 900);
          }
        } else {
          h.locked = true;
          b.classList.add('wrong');
          h.el.classList.add('frozen');
          LG.shake(b);
          LG.sfx.bad();
          setTimeout(() => {
            h.locked = false;
            h.el.classList.remove('frozen');
          }, 1200);
        }
      }

      drawRope();
      ask();
    },
  });
})();
