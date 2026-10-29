// Same or Different? Two pictures side by side: either the same, or the
// right one is mirrored or flipped. Seeing that a turned shape is "different"
// is the step before telling b from d, and p from q. The first rounds use
// pictures; later rounds use letter-like shapes and every kind of flip.
(function () {
  const ROUNDS = 10;
  const PICS = ['car', 'duck', 'boot', 'flag', 'key', 'hammer', 'dog', 'elephant', 'bus', 'horse', 'snail', 'guitar', 'bird', 'shoe'];
  const INK = '#2f2a28';
  // Letter-like shapes: none of them looks the same mirrored or flipped.
  const SHAPES = [
    '<path d="M32 12 V88" stroke-width="12"/><circle cx="54" cy="66" r="20" stroke-width="12" fill="none"/>',
    '<path d="M30 14 V86 H74" stroke-width="12" fill="none"/><circle cx="74" cy="22" r="9" fill="' + INK + '" stroke="none"/>',
    '<path d="M60 12 V64 Q60 88 38 88 Q22 88 22 72" stroke-width="12" fill="none"/>',
    '<path d="M28 88 V12 L76 30 L28 48" stroke-width="10" fill="#ffd43b"/>',
    '<path d="M22 22 H70 L28 78 H78" stroke-width="12" fill="none"/><circle cx="22" cy="78" r="8" fill="' + INK + '" stroke="none"/>',
    '<path d="M32 30 V88" stroke-width="12"/><path d="M32 54 Q32 30 64 30" stroke-width="12" fill="none"/><circle cx="72" cy="78" r="8" fill="' + INK + '" stroke="none"/>',
  ];
  const shapeSvg = (k) =>
    '<svg viewBox="0 0 100 100" aria-hidden="true"><g stroke="' + INK + '" stroke-linecap="round" stroke-linejoin="round" fill="none" style="color:#4c6ef5">' +
    SHAPES[k].replace(/stroke-width="12"/g, 'stroke-width="12" stroke="#4c6ef5"').replace(/stroke-width="10"/g, 'stroke-width="10" stroke="' + INK + '"') +
    '</g></svg>';
  const FLIPS = { x: 'scaleX(-1)', y: 'scaleY(-1)', r: 'rotate(180deg)' };
  const arrows = (b) =>
    '<svg viewBox="0 0 64 28" class="sd-ico" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M4 14 H24 M16 6 L24 14 L16 22"/>' + (b ? '<path d="M60 14 H40 M48 6 L40 14 L48 22"/>' : '<path d="M38 14 H58 M50 6 L58 14 L50 22"/>') + '</g></svg>';
  let plan = [];

  LG.createGame({
    titleKey: 'sameDiff',
    descKey: 'sameDiffDesc',
    pic: 'mirror',
    rounds: ROUNDS,
    onStart() {
      // Half the rounds the same, half different, mixed up.
      plan = LG.shuffle(Array.from({ length: ROUNDS }, (_, k) => k % 2 === 0));
    },
    round(i, ctx) {
      const same = plan[i];
      const kinds = i < 4 ? ['x'] : i < 7 ? ['x', 'y'] : ['x', 'y', 'r'];
      const flip = same ? '' : FLIPS[LG.pick(kinds)];
      const html = i < 4 ? LG.picture(LG.pick(PICS)) : shapeSvg(Math.floor(LG.random() * SHAPES.length));

      const pair = LG.el('div', 'sd-pair');
      const left = pair.appendChild(LG.el('div', 'sd-card', html));
      const right = pair.appendChild(LG.el('div', 'sd-card', html));
      right.firstChild.style.transform = flip;
      const choices = LG.el('div', 'sd-choices');
      const mk = (isSame) => {
        const b = LG.el('button', 'big-btn secondary sd-btn', arrows(!isSame) + '<span>' + LG.t(isSame ? 'same' : 'different') + '</span>');
        b.type = 'button';
        b.addEventListener('click', () => answer(isSame, b));
        return choices.appendChild(b);
      };
      const sameBtn = mk(true);
      const diffBtn = mk(false);
      ctx.stage.append(pair, choices);
      ctx.stage.classList.add('sd-stage');
      ctx.onCleanup(() => ctx.stage.classList.remove('sd-stage'));
      left.setAttribute('aria-hidden', 'true');

      let answered = false;
      function answer(isSame, b) {
        if (answered || ctx.isLocked()) return;
        answered = true;
        const right = isSame === same;
        b.classList.add(right ? 'right' : 'wrong');
        if (!right) {
          LG.sfx.bad();
          LG.shake(b);
          (same ? sameBtn : diffBtn).classList.add('right');
        }
        // Show the answer: a turned picture turns back to match.
        if (!same) setTimeout(() => pair.lastChild.firstChild.classList.add('unflip'), 450);
        pair.classList.add('shown');
        ctx.complete(LG.speak(right ? LG.praise() : LG.t(same ? 'same' : 'different')), { missed: !right });
      }

      LG.speak(LG.t('samePrompt'));
    },
  });
})();
