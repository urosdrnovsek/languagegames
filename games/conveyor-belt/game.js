// Conveyor Belt: pictures ride along a factory belt. Pick one up (it says
// its word) and drag it into the box with its first letter, or tap the
// picture and then the box. Pictures that reach the end come round again.
// Four rounds: two boxes, then three.
(function () {
  const ROUNDS = 4;
  const ITEMS = 6;
  const initial = (w) => w.letters[0].toLowerCase();

  // Letters that start at least two words, from the chosen topics if they
  // have enough of them.
  function letterGroups(words) {
    const groups = {};
    words.forEach((w) => {
      if (/^\p{L}$/u.test(w.letters[0]) && !words.some((x) => x !== w && x.word === w.word && x.pic < w.pic)) (groups[initial(w)] = groups[initial(w)] || []).push(w);
    });
    Object.keys(groups).forEach((l) => groups[l].length < 2 && delete groups[l]);
    return groups;
  }
  let groups = letterGroups(LG.words(LG.lang, { firstLetter: true }));
  if (Object.keys(groups).length < 3) groups = letterGroups(LG.words(LG.lang, { firstLetter: true, allTopics: true }));

  LG.createGame({
    titleKey: 'belt',
    descKey: 'beltDesc',
    pic: 'box',
    rounds: ROUNDS,
    round(r, ctx) {
      const letters = LG.sample(Object.keys(groups), r < 2 ? 2 : 3);
      // Every box gets at least one picture.
      let picks = letters.map((l) => LG.pick(groups[l]));
      const rest = LG.shuffle(letters.flatMap((l) => groups[l]).filter((w) => !picks.includes(w)));
      picks = LG.shuffle(picks.concat(rest.slice(0, ITEMS - picks.length)));
      const speed = ctx.calm ? 26 : 38 + r * 6;
      let mistakes = 0;
      let selected = null;
      let left = picks.length;

      const factory = LG.el('div', 'factory');
      const belt = factory.appendChild(LG.el('div', 'belt'));
      const boxRow = factory.appendChild(LG.el('div', 'sort-boxes'));
      ctx.stage.append(factory);
      ctx.stage.classList.add('belt-stage');
      ctx.onCleanup(() => ctx.stage.classList.remove('belt-stage'));

      const boxes = letters.map((l) => {
        const el = LG.el('button', 'sort-box', '<b>' + LG.fmt(l.toUpperCase() + l) + '</b><span class="sorted"></span>');
        el.type = 'button';
        el.setAttribute('aria-label', l);
        const box = { letter: l, el: el };
        el.addEventListener('click', () => {
          if (selected) drop(selected, box);
          else LG.speak(LG.letterName(l));
        });
        boxRow.appendChild(el);
        return box;
      });

      const size = () => Math.min(100, factory.clientWidth * 0.19);
      const beltY = () => belt.offsetTop + belt.offsetHeight * 0.5 - size() * 0.78;
      const waiting = [];
      const items = picks.map((w) => {
        const el = LG.el('button', 'belt-item', LG.picture(w.pic));
        el.type = 'button';
        el.setAttribute('aria-label', w.word);
        const it = { w: w, el: el, x: -9999, y: 0, state: 'waiting' };
        grab(it);
        factory.appendChild(el);
        waiting.push(it);
        return it;
      });

      // Drag to a box, or tap to pick it up and then tap a box.
      function grab(it) {
        let start = null;
        it.el.addEventListener('pointerdown', (e) => {
          if (ctx.isLocked() || it.state === 'done' || it.state === 'flying') return;
          e.preventDefault();
          try {
            it.el.setPointerCapture(e.pointerId);
          } catch (err) {}
          const rect = factory.getBoundingClientRect();
          start = { px: e.clientX, py: e.clientY, x: it.x, y: it.y, dx: e.clientX - rect.left - it.x, dy: e.clientY - rect.top - it.y, moved: false };
          if (selected && selected !== it) release(selected);
          it.state = 'held';
          it.el.classList.add('held');
          LG.speak(it.w.word);
        });
        it.el.addEventListener('pointermove', (e) => {
          if (!start || it.state !== 'held') return;
          if (Math.abs(e.clientX - start.px) + Math.abs(e.clientY - start.py) > 10) start.moved = true;
          if (!start.moved) return;
          const rect = factory.getBoundingClientRect();
          it.x = e.clientX - rect.left - start.dx;
          it.y = e.clientY - rect.top - start.dy;
          draw(it);
          boxes.forEach((b) => b.el.classList.toggle('over', under(b, e)));
        });
        const up = (e) => {
          if (!start) return;
          const s = start;
          start = null;
          boxes.forEach((b) => b.el.classList.remove('over'));
          if (it.state !== 'held') return;
          if (!s.moved) {
            selected = it;
            it.el.classList.add('selected');
            return;
          }
          const box = boxes.find((b) => under(b, e));
          if (box) drop(it, box);
          else release(it);
        };
        it.el.addEventListener('pointerup', up);
        it.el.addEventListener('pointercancel', up);
      }

      function under(box, e) {
        const r = box.el.getBoundingClientRect();
        return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      }

      // Back onto the belt where it is.
      function release(it) {
        if (selected === it) selected = null;
        it.el.classList.remove('held', 'selected');
        it.state = 'belt';
        it.y = beltY();
        it.x = Math.max(-size() / 2, Math.min(factory.clientWidth - size(), it.x));
        draw(it);
      }

      function drop(it, box) {
        if (selected === it) selected = null;
        it.el.classList.remove('held', 'selected');
        if (initial(it.w) !== box.letter) {
          mistakes++;
          LG.sfx.bad();
          LG.shake(box.el);
          LG.speak(it.w.word);
          release(it);
          return;
        }
        // Into the box.
        it.state = 'flying';
        LG.sfx.good();
        LG.markCorrect(it.w.pic);
        const fr = factory.getBoundingClientRect();
        const br = box.el.getBoundingClientRect();
        it.x = br.left - fr.left + br.width / 2 - size() / 2;
        it.y = br.top - fr.top + br.height / 2 - size() / 2;
        it.el.classList.add('into-box');
        draw(it);
        setTimeout(() => {
          it.state = 'done';
          it.el.remove();
          box.el.querySelector('.sorted').insertAdjacentHTML('beforeend', '<i>' + LG.picture(it.w.pic) + '</i>');
          LG.shake(box.el);
          left--;
          if (!left) ctx.complete(LG.speak(LG.praise()), { missed: mistakes >= 3 });
        }, 420);
      }

      function draw(it) {
        const s = size();
        it.el.style.width = it.el.style.height = s + 'px';
        it.el.style.transform = 'translate(' + it.x + 'px,' + it.y + 'px)';
      }

      let last = performance.now();
      let frame = requestAnimationFrame(step);
      ctx.onCleanup(() => cancelAnimationFrame(frame));
      function step(now) {
        const dt = document.hidden ? 0 : Math.min(0.05, (now - last) / 1000);
        last = now;
        const s = size();
        const W = factory.clientWidth;
        const onBelt = items.filter((it) => it.state === 'belt');
        // The next picture comes on when there is room.
        if (waiting.length && !onBelt.some((it) => it.x < s * 0.6)) {
          const it = waiting.shift();
          it.state = 'belt';
          it.x = -s;
          onBelt.push(it);
        }
        onBelt.forEach((it) => {
          it.x += speed * dt;
          it.y = beltY();
          // Off the end: round again.
          if (it.x > W) {
            it.state = 'waiting';
            waiting.push(it);
            it.x = -9999;
          }
          draw(it);
        });
        items.filter((it) => it.state === 'waiting').forEach(draw);
        frame = requestAnimationFrame(step);
      }

      if (r === 0) LG.speak(LG.t('beltPrompt'));
    },
  });
})();
