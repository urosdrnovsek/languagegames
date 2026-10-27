// Word Rain: pictures drift down. Read the word at the bottom and tap its
// picture before it lands. Letting the right picture land costs a heart;
// the rain speeds up with every catch.
(function () {
  const HEARTS = 3;

  LG.createGame({
    titleKey: 'wordRain',
    descKey: 'wordRainDesc',
    pic: 'cloud',
    rounds: 1,
    progress: false,
    timed: true,
    score: { id: 'word-rain', better: 'high', format: (n) => LG.t('pointsN', { n: n }) },
    round(_, ctx) {
      const pool = LG.words(LG.lang, { min: 6 });
      const unique = pool.filter((w, i) => pool.findIndex((x) => x.word === w.word) === i);
      let hearts = HEARTS;
      let caught = 0;
      let target = null;
      let items = [];
      let over = false;
      let speed = 34; // pixels per second
      let gap = 1800; // ms between new pictures
      let sinceSpawn = gap;

      const head = LG.el('div', 'game-head');
      const heartBox = LG.el('span', 'hearts');
      const box = LG.el('span', 'score-box', LG.ICONS.star + '<b>0</b>');
      head.append(heartBox, box);
      const drawHearts = () => (heartBox.innerHTML = Array.from({ length: HEARTS }, (_, i) => LG.ICONS.heart.replace('<svg', '<svg class="' + (i < hearts ? '' : 'lost') + '"')).join(''));
      drawHearts();

      const sky = LG.el('div', 'rain-sky');
      const wordBar = LG.el('button', 'rain-word fit');
      wordBar.type = 'button';
      wordBar.addEventListener('click', () => target && LG.speak(target.w.word));
      ctx.stage.append(head, sky, wordBar);
      ctx.stage.classList.add('rain-stage');
      ctx.onCleanup(() => ctx.stage.classList.remove('rain-stage'));

      function spawn(w) {
        const size = Math.min(90, sky.clientWidth / 4.2);
        const el = LG.el('button', 'rain-item', LG.picture(w.pic));
        el.type = 'button';
        el.style.width = el.style.height = size + 'px';
        // Keep new pictures clear of ones still near the top.
        let x = 0;
        for (let tries = 0; tries < 8; tries++) {
          x = LG.random() * (sky.clientWidth - size);
          if (!items.some((it) => it.y < size * 1.2 && Math.abs(it.x - x) < size)) break;
        }
        const item = { w: w, el: el, x: x, y: -size, size: size };
        el.style.left = x + 'px';
        el.addEventListener('pointerdown', (e) => {
          e.preventDefault();
          tap(item);
        });
        sky.appendChild(el);
        items.push(item);
        return item;
      }

      function chooseTarget() {
        // Prefer a picture that's still high up, so there's time to find it.
        const onScreen = items.filter((it) => it.y < sky.clientHeight * 0.5);
        const free = unique.filter((w) => !items.some((it) => it.w.word === w.word));
        target = onScreen.length ? LG.pick(onScreen) : free.length ? spawn(LG.pick(free)) : LG.pick(items);
        wordBar.innerHTML = LG.fmt(target.w.word);
        LG.fit(ctx.stage);
      }

      function remove(item) {
        item.el.remove();
        items = items.filter((it) => it !== item);
      }

      function tap(item) {
        if (over) return;
        if (item === target) {
          caught++;
          box.querySelector('b').textContent = caught;
          LG.sfx.good();
          LG.markCorrect(item.w.pic);
          item.el.classList.add('caught');
          items = items.filter((it) => it !== item);
          setTimeout(() => item.el.remove(), 300);
          speed = Math.min(130, speed + 4);
          gap = Math.max(850, gap - 60);
          chooseTarget();
        } else {
          LG.shake(item.el);
          LG.sfx.bad();
        }
      }

      let last = performance.now();
      let frame = requestAnimationFrame(step);
      ctx.onCleanup(() => cancelAnimationFrame(frame));
      function step(now) {
        const dt = document.hidden ? 0 : Math.min(0.05, (now - last) / 1000);
        last = now;
        sinceSpawn += dt * 1000;
        if (sinceSpawn >= gap && items.length < 6) {
          sinceSpawn = 0;
          const free = unique.filter((w) => !items.some((it) => it.w.word === w.word));
          if (free.length) spawn(LG.pick(free));
        }
        if (!target) chooseTarget();
        const floor = sky.clientHeight;
        items.slice().forEach((it) => {
          it.y += speed * dt;
          it.el.style.transform = 'translateY(' + it.y + 'px)';
          if (it.y + it.size >= floor) {
            remove(it);
            if (it === target) {
              hearts--;
              drawHearts();
              LG.sfx.bad();
              LG.shake(heartBox);
              if (hearts === 0) return end();
              chooseTarget();
            }
          }
        });
        if (!over) frame = requestAnimationFrame(step);
      }

      function end() {
        over = true;
        const stars = caught >= 25 ? 3 : caught >= 12 ? 2 : 1;
        ctx.end({ won: true, stars: stars, title: LG.t('gameOver'), text: LG.t('caught', { n: caught }), score: caught });
      }
    },
  });
})();
