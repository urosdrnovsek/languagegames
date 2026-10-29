// Follow the Butterfly: a butterfly floats around a meadow along a smooth,
// looping path. Keep a finger (or the mouse) on it: while you do, the
// flower at the top grows. When you lose it, the butterfly slows down and
// waits. Each round it flies a little faster and is a little smaller.
(function () {
  const SPEED = [0.35, 0.45, 0.55, 0.65, 0.75];
  const SIZE = [150, 130, 115, 100, 90];
  const HOLD = 6; // seconds of following needed per round

  LG.createGame({
    titleKey: 'butterfly',
    descKey: 'butterflyDesc',
    pic: 'butterfly',
    rounds: SPEED.length,
    round(i, ctx) {
      const speed = SPEED[i] * (ctx.calm ? 0.75 : 1);
      const size = SIZE[i];
      const meter = LG.el('div', 'follow-meter', '<i></i>');
      const fill = meter.firstChild;
      const meadow = LG.el('div', 'meadow');
      const fly = meadow.appendChild(LG.el('div', 'flutter', LG.picture('butterfly')));
      ctx.stage.append(meter, meadow);
      ctx.stage.classList.add('meadow-stage');
      ctx.onCleanup(() => ctx.stage.classList.remove('meadow-stage'));

      // A looping path: two slow waves at different speeds.
      const a = 0.9 + LG.random() * 0.4;
      const b = 1.4 + LG.random() * 0.5;
      const phase = LG.random() * 6;
      let t = 0;
      let held = 0;
      let pointer = null; // { x, y } inside the meadow while touching
      let pace = 0.3;
      let done = false;

      const rel = (e) => {
        const r = meadow.getBoundingClientRect();
        return { x: e.clientX - r.left, y: e.clientY - r.top };
      };
      meadow.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        try {
          meadow.setPointerCapture(e.pointerId);
        } catch (err) {}
        pointer = rel(e);
      });
      meadow.addEventListener('pointermove', (e) => {
        // A mouse follows without pressing; a finger must touch.
        if (e.pointerType === 'mouse' || pointer) pointer = rel(e);
      });
      const lift = (e) => {
        if (e.pointerType !== 'mouse') pointer = null;
      };
      meadow.addEventListener('pointerup', lift);
      meadow.addEventListener('pointercancel', lift);
      meadow.addEventListener('pointerleave', () => (pointer = null));

      let last = performance.now();
      let frame = requestAnimationFrame(step);
      ctx.onCleanup(() => cancelAnimationFrame(frame));
      function step(now) {
        const dt = document.hidden ? 0 : Math.min(0.05, (now - last) / 1000);
        last = now;
        const W = meadow.clientWidth;
        const H = meadow.clientHeight;
        const s = Math.min(size, W / 3);
        const x = W / 2 + Math.sin(t * a + phase) * (W / 2 - s * 0.7);
        const y = H / 2 + Math.sin(t * b) * (H / 2 - s * 0.7);
        const on = pointer && Math.hypot(pointer.x - x, pointer.y - y) < s * 0.75;
        // Speed up gently while followed; slow down and wait when lost.
        pace += ((on ? 1 : 0.25) - pace) * Math.min(1, dt * 2);
        if (!done) t += dt * speed * pace;
        if (on && !done) held += dt;
        fly.classList.toggle('followed', !!on);
        fly.style.width = fly.style.height = s + 'px';
        const dx = Math.cos(t * a + phase) * a;
        fly.style.transform = 'translate(' + (x - s / 2) + 'px,' + (y - s / 2) + 'px) scaleX(' + (dx < 0 ? -1 : 1) + ')';
        fill.style.width = Math.min(100, (held / HOLD) * 100) + '%';
        if (!done && held >= HOLD) {
          done = true;
          LG.markCorrect('butterfly');
          ctx.complete(LG.speak(LG.praise()));
        }
        frame = requestAnimationFrame(step);
      }

      if (i === 0) LG.speak(LG.t('butterflyPrompt'));
    },
  });
})();
