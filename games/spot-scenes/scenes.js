// Drawn scenes for Spot It!: eight backgrounds and the places in each where
// pictures belong. The board is 1000 x 900. LG.SCENES[id].bg(rand) returns the
// background as SVG; the same rand sequence gives the same background, so
// both pictures match exactly.
//
// Zones say where things go:
//   ground: things standing on the ground between y0 (far) and y1 (near),
//           smaller further back (depth), with a shadow
//   float:  things in the air or under water, placed by their middle
//   slots:  fixed places, e.g. a shelf or a table: [x, y] is the bottom middle
// items: the pictures that belong there. Sizes come from SIZE below.
(function () {
  const rnd = (rand, a, b) => a + rand() * (b - a);
  const f = (n) => Math.round(n * 10) / 10;
  const grad = (id, stops) => '<linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1">' + stops.map(([o, c]) => '<stop offset="' + o + '" stop-color="' + c + '"/>').join('') + '</linearGradient>';

  // ---- Little drawings used by the backgrounds ----

  function farTree(x, y, s, c1, c2) {
    return '<g transform="translate(' + f(x) + ',' + f(y) + ') scale(' + f(s) + ')">' +
      '<rect x="-5" y="-12" width="10" height="26" rx="3" fill="#8d5a34"/>' +
      '<circle cx="0" cy="-30" r="24" fill="' + c1 + '"/><circle cx="-14" cy="-20" r="15" fill="' + c1 + '"/><circle cx="14" cy="-20" r="15" fill="' + c1 + '"/>' +
      '<circle cx="-6" cy="-38" r="9" fill="' + c2 + '" opacity=".7"/></g>';
  }
  function bigTree(x, y, s) {
    return '<g transform="translate(' + f(x) + ',' + f(y) + ') scale(' + f(s) + ')" stroke="#2f2a28" stroke-width="3" stroke-linejoin="round">' +
      '<path d="M-12 0 L-8 -80 L8 -80 L12 0 Z" fill="#8d5a34"/><path d="M-6 -60 Q-22 -78 -36 -82" fill="none" stroke="#8d5a34" stroke-width="7"/>' +
      '<circle cx="0" cy="-130" r="52" fill="#4fae55"/><circle cx="-44" cy="-104" r="32" fill="#4fae55"/><circle cx="44" cy="-104" r="34" fill="#4fae55"/>' +
      '<circle cx="-14" cy="-150" r="16" fill="#8fd97a" stroke="none" opacity=".8"/><circle cx="22" cy="-112" r="10" fill="#8fd97a" stroke="none" opacity=".8"/></g>';
  }
  function pine(x, y, s) {
    let g = '<g transform="translate(' + f(x) + ',' + f(y) + ') scale(' + f(s) + ')"><rect x="-6" y="-8" width="12" height="20" fill="#7a4b2a"/>';
    [[0, 46], [-26, 38], [-50, 30]].forEach(([dy, w]) => {
      g += '<path d="M0 ' + (dy - 46) + ' L' + w + ' ' + dy + ' H-' + w + ' Z" fill="#2f8a57" stroke="#1f6b41" stroke-width="2" stroke-linejoin="round"/>';
      g += '<path d="M0 ' + (dy - 46) + ' L' + w * 0.45 + ' ' + (dy - 26) + ' Q0 ' + (dy - 20) + ' -' + w * 0.45 + ' ' + (dy - 26) + ' Z" fill="#fff"/>';
    });
    return g + '</g>';
  }
  function acacia(x, y, s) {
    return '<g transform="translate(' + f(x) + ',' + f(y) + ') scale(' + f(s) + ')" stroke-linejoin="round">' +
      '<path d="M0 0 Q-2 -40 -24 -72 M0 0 Q4 -40 26 -68 M0 0 V-50" fill="none" stroke="#6b3f1f" stroke-width="8" stroke-linecap="round"/>' +
      '<ellipse cx="0" cy="-80" rx="80" ry="18" fill="#6aa84f" stroke="#2f2a28" stroke-width="3"/><ellipse cx="-30" cy="-90" rx="40" ry="12" fill="#7fbf5f" stroke="#2f2a28" stroke-width="3"/><ellipse cx="30" cy="-88" rx="40" ry="12" fill="#7fbf5f" stroke="#2f2a28" stroke-width="3"/></g>';
  }
  function cloud(x, y, s, o) {
    return '<g transform="translate(' + f(x) + ',' + f(y) + ') scale(' + f(s) + ')" opacity="' + (o || 1) + '"><ellipse cx="0" cy="0" rx="46" ry="16" fill="#fff"/><circle cx="-16" cy="-8" r="18" fill="#fff"/><circle cx="12" cy="-12" r="22" fill="#fff"/></g>';
  }
  function sun(x, y, r) {
    let rays = '';
    for (let k = 0; k < 12; k++) {
      const a = (k / 12) * Math.PI * 2;
      rays += '<path d="M' + f(x + Math.cos(a) * (r + 10)) + ' ' + f(y + Math.sin(a) * (r + 10)) + ' L' + f(x + Math.cos(a) * (r + 26)) + ' ' + f(y + Math.sin(a) * (r + 26)) + '" stroke="#fab005" stroke-width="7" stroke-linecap="round"/>';
    }
    return '<circle cx="' + x + '" cy="' + y + '" r="' + (r + 34) + '" fill="#fff3bf" opacity=".45"/>' + rays + '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="#ffd43b" stroke="#fab005" stroke-width="5"/>';
  }
  function tufts(rand, n, y0, y1, color) {
    let s = '';
    for (let k = 0; k < n; k++) {
      const x = rnd(rand, 10, 990), y = rnd(rand, y0, y1), h = rnd(rand, 8, 16) * (0.5 + (y - y0) / (y1 - y0));
      s += '<path d="M' + f(x - 5) + ' ' + f(y) + ' l5 ' + f(-h) + ' l5 ' + f(h) + ' M' + f(x + 3) + ' ' + f(y) + ' l6 ' + f(-h * 0.7) + '" stroke="' + color + '" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
    }
    return s;
  }
  function dots(rand, n, x0, x1, y0, y1, colors, r0, r1, op) {
    let s = '';
    for (let k = 0; k < n; k++) s += '<circle cx="' + f(rnd(rand, x0, x1)) + '" cy="' + f(rnd(rand, y0, y1)) + '" r="' + f(rnd(rand, r0, r1)) + '" fill="' + colors[k % colors.length] + '" opacity="' + (op || 1) + '"/>';
    return s;
  }
  function fence(y, x0, x1, h) {
    let s = '<rect x="' + x0 + '" y="' + (y - h * 0.75) + '" width="' + (x1 - x0) + '" height="8" fill="#e8d5b5" stroke="#8d5a34" stroke-width="2.5"/><rect x="' + x0 + '" y="' + (y - h * 0.4) + '" width="' + (x1 - x0) + '" height="8" fill="#e8d5b5" stroke="#8d5a34" stroke-width="2.5"/>';
    for (let x = x0 + 10; x < x1; x += 42) s += '<path d="M' + (x - 6) + ' ' + y + ' V' + (y - h + 6) + ' L' + x + ' ' + (y - h) + ' L' + (x + 6) + ' ' + (y - h + 6) + ' V' + y + ' Z" fill="#f3e3c6" stroke="#8d5a34" stroke-width="2.5" stroke-linejoin="round"/>';
    return s;
  }
  const hills = (pts, fill) => '<path d="' + pts + '" fill="' + fill + '"/>';

  // ---- The scenes ----

  const SCENES = {
    meadow: {
      bg(rand) {
        let s = '<defs>' + grad('msky', [[0, '#6ec3f5'], [1, '#d4f0ff']]) + grad('mgrass', [[0, '#8fd97a'], [1, '#56b35a']]) + grad('mpath', [[0, '#f5ddb0'], [1, '#ebc584']]) + grad('mpond', [[0, '#74c0fc'], [1, '#339af0']]) + '</defs>' +
          '<rect width="1000" height="900" fill="url(#msky)"/>' + cloud(rnd(rand, 140, 300), rnd(rand, 110, 170), 1.2, 0.55) + cloud(rnd(rand, 640, 860), rnd(rand, 80, 150), 0.9, 0.55) +
          hills('M0 420 L120 330 L210 390 L330 300 L470 410 L600 330 L720 400 L860 320 L1000 390 V520 H0 Z', '#c4e0f2') +
          '<path d="M330 300 L370 330 L350 335 L330 322 L305 332 Z M860 320 L895 345 L872 350 L858 338 L835 346 Z" fill="#fff" opacity=".9"/>' +
          hills('M0 450 Q160 385 330 440 T680 430 T1000 420 V620 H0 Z', '#b2e59a') + hills('M0 500 Q240 445 500 495 T1000 480 V650 H0 Z', '#9edc86');
        for (let k = 0; k < 7; k++) s += farTree(rnd(rand, 20, 980), rnd(rand, 475, 505), rnd(rand, 0.55, 0.85), '#5db85c', '#9be08c');
        s += '<path d="M0 525 Q250 500 500 530 T1000 515 V900 H0 Z" fill="url(#mgrass)"/>' + bigTree(rnd(rand, 80, 120), 612, 1.05) +
          '<ellipse cx="800" cy="640" rx="150" ry="42" fill="#5a9e4f" opacity=".5"/><ellipse cx="800" cy="636" rx="140" ry="36" fill="url(#mpond)" stroke="#2f2a28" stroke-width="3"/>' +
          '<path d="M720 630 q14 -4 28 0 M820 646 q14 -4 28 0 M770 620 q10 -3 20 0" stroke="#fff" stroke-width="3" fill="none" opacity=".8"/>' +
          '<path d="M660 640 l-4 -26 M666 642 l2 -30 M672 640 l6 -22 M932 636 l-2 -28 M938 638 l6 -24" stroke="#3f9a45" stroke-width="4" stroke-linecap="round"/>' +
          '<path d="M372 900 C420 790 525 730 482 650 C458 604 515 568 548 540 L578 540 C560 574 520 612 556 660 C606 740 568 806 660 900 Z" fill="url(#mpath)" stroke="#d6ad6a" stroke-width="4"/>' +
          tufts(rand, 46, 560, 890, '#3f9a45') + dots(rand, 34, 10, 990, 560, 890, ['#fff', '#ffd43b', '#ff8fab', '#b197fc'], 3, 6);
        return s;
      },
      zones: [
        { type: 'ground', y0: 600, y1: 885, x0: 30, x1: 970, avoid: [[650, 595, 955, 680], [20, 400, 200, 625]], depth: [0.62, 1.05], shadow: 'rgba(30,80,20,.2)', share: 0.72,
          items: 'dog cat rabbit squirrel hedgehog snail frog ladybug turtle fox deer mouse flower mushroom ball bike swing slide tent basket apple teddy' },
        { type: 'ground', y0: 630, y1: 650, x0: 700, x1: 900, depth: [0.8, 0.8], fixed: 1, noShadow: true, items: 'duck swan goose' },
        { type: 'float', y0: 70, y1: 320, x0: 40, x1: 960, share: 0.2, items: 'sun cloud rainbow bird kite plane balloon helicopter butterfly bee parrot' },
      ],
    },

    farm: {
      bg(rand) {
        let s = '<defs>' + grad('fsky', [[0, '#7cc8f7'], [1, '#e0f4ff']]) + grad('fyard', [[0, '#9bd36f'], [1, '#6fb94a']]) + grad('fbarn', [[0, '#e03131'], [1, '#c92a2a']]) + '</defs>' +
          '<rect width="1000" height="900" fill="url(#fsky)"/>' + sun(870, 110, 46) + cloud(rnd(rand, 160, 420), rnd(rand, 90, 150), 1, 0.7) +
          hills('M0 440 Q200 380 420 430 T1000 410 V560 H0 Z', '#b9e39a');
        for (let k = 0; k < 6; k++) s += '<path d="M' + (560 + k * 70) + ' 520 L' + (640 + k * 70) + ' 440" stroke="#7fb956" stroke-width="10" stroke-linecap="round"/>';
        s += '<g stroke="#2f2a28" stroke-width="3" stroke-linejoin="round">' +
          '<rect x="300" y="300" width="64" height="232" rx="30" fill="#ced4da"/><path d="M300 330 Q332 280 364 330" fill="#adb5bd"/>' +
          '<path d="M40 532 V380 L90 300 H230 L280 380 V532 Z" fill="url(#fbarn)"/><path d="M28 384 L90 296 H230 L292 384" fill="none" stroke="#fff" stroke-width="10"/>' +
          '<rect x="110" y="420" width="100" height="112" fill="#fff"/><path d="M110 420 L210 532 M210 420 L110 532" stroke="#e03131" stroke-width="8"/>' +
          '<rect x="140" y="330" width="40" height="36" fill="#ffe8a3"/></g>' + fence(565, 0, 1000, 56) +
          '<path d="M0 556 Q300 534 600 560 T1000 552 V900 H0 Z" fill="url(#fyard)"/>' +
          '<path d="M520 900 Q560 740 640 640 Q690 580 760 556 L800 556 Q720 600 690 660 Q640 760 700 900 Z" fill="#e3c08a" stroke="#c49a5c" stroke-width="3"/>' +
          '<g stroke="#2f2a28" stroke-width="3"><rect x="880" y="590" width="90" height="56" rx="8" fill="#f4d35e"/><path d="M890 606 h70 M890 622 h70" stroke="#c9a227" stroke-width="3"/></g>' +
          tufts(rand, 40, 580, 890, '#4e9a35') + dots(rand, 20, 10, 990, 590, 890, ['#fff', '#ffd43b'], 2.5, 5);
        return s;
      },
      zones: [
        { type: 'ground', y0: 615, y1: 885, x0: 30, x1: 970, avoid: [[870, 580, 990, 655]], depth: [0.62, 1.05], shadow: 'rgba(40,80,20,.22)', share: 0.82,
          items: 'cow pig sheep horse goat donkey hen rooster chick goose turkey duck cat dog mouse tractor pumpkin carrot basket bucket rabbit' },
        { type: 'float', y0: 70, y1: 280, x0: 40, x1: 760, share: 0.18, items: 'cloud bird plane balloon helicopter kite butterfly bee' },
      ],
    },

    savanna: {
      bg(rand) {
        let s = '<defs>' + grad('vsky', [[0, '#ffd8a8'], [0.6, '#fff0d4'], [1, '#fff8e6']]) + grad('vgrass', [[0, '#e9c46a'], [1, '#d4a24c']]) + '</defs>' +
          '<rect width="1000" height="900" fill="url(#vsky)"/>' +
          '<circle cx="' + f(rnd(rand, 600, 780)) + '" cy="250" r="110" fill="#ffa94d" opacity=".55"/>' +
          hills('M0 470 L140 390 L260 440 L420 360 L560 450 L700 380 L860 440 L1000 400 V560 H0 Z', '#d0a8c9') +
          hills('M0 500 Q260 460 520 500 T1000 490 V600 H0 Z', '#e7c47f') +
          acacia(rnd(rand, 140, 260), 524, 0.85) + acacia(rnd(rand, 760, 900), 518, 1.05) + acacia(rnd(rand, 470, 560), 503, 0.55) +
          '<path d="M0 520 Q300 495 600 525 T1000 512 V900 H0 Z" fill="url(#vgrass)"/>' +
          '<ellipse cx="' + f(rnd(rand, 380, 620)) + '" cy="612" rx="150" ry="24" fill="#74c0fc" stroke="#2f2a28" stroke-width="3"/>' +
          tufts(rand, 60, 560, 890, '#b5832f') + dots(rand, 26, 10, 990, 580, 890, ['#c98d3a', '#a9742b'], 2, 4, 0.7);
        return s;
      },
      zones: [
        { type: 'ground', y0: 650, y1: 885, x0: 30, x1: 970, depth: [0.6, 1.0], shadow: 'rgba(110,70,20,.22)', share: 0.85,
          items: 'lion zebra giraffe elephant rhino monkey camel kangaroo turtle snake tiger' },
        { type: 'float', y0: 70, y1: 280, x0: 40, x1: 960, share: 0.15, items: 'bird parrot balloon plane helicopter butterfly' },
      ],
    },

    beach: {
      bg(rand) {
        let s = '<defs>' + grad('bsky', [[0, '#7dd0ff'], [1, '#e6f7ff']]) + grad('bsea', [[0, '#2f8fd3'], [1, '#4cc0ec']]) + grad('bsand', [[0, '#fbe7ad'], [1, '#f0cb7a']]) + '</defs>' +
          '<rect width="1000" height="900" fill="url(#bsky)"/>' + sun(880, 110, 48) + cloud(rnd(rand, 120, 320), rnd(rand, 90, 150), 1.1, 0.6) + cloud(rnd(rand, 520, 700), rnd(rand, 120, 170), 0.8, 0.6) +
          '<rect y="380" width="1000" height="260" fill="url(#bsea)"/>' +
          '<path d="M760 384 Q800 360 850 384 Z" fill="#e9c97f"/><path d="M806 372 Q808 340 800 326" stroke="#8d5a34" stroke-width="4" fill="none"/>' +
          '<path d="M800 326 q-18 -6 -30 6 M800 326 q16 -10 30 0 M800 326 q-6 -16 -22 -16 M800 326 q8 -16 24 -12" stroke="#3f9a45" stroke-width="5" fill="none" stroke-linecap="round"/>';
        for (let k = 0; k < 16; k++) {
          const x = rnd(rand, 0, 960), y = rnd(rand, 400, 590), w = rnd(rand, 26, 50);
          s += '<path d="M' + f(x) + ' ' + f(y) + ' q' + f(w / 4) + ' -8 ' + f(w / 2) + ' 0 t' + f(w / 2) + ' 0" stroke="#fff" stroke-opacity=".75" stroke-width="3.5" fill="none" stroke-linecap="round"/>';
        }
        s += '<path d="M0 600 Q120 585 250 602 T500 598 T750 604 T1000 596 V900 H0 Z" fill="#e8c27a"/><path d="M0 612 Q120 597 250 614 T500 610 T750 616 T1000 608 V900 H0 Z" fill="url(#bsand)"/>' +
          '<path d="M0 598 Q120 583 250 600 T500 596 T750 602 T1000 594" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".9"/>' +
          dots(rand, 70, 5, 995, 630, 895, ['#d9ad5c'], 1.5, 3.2, 0.7);
        return s;
      },
      zones: [
        { type: 'ground', y0: 670, y1: 885, x0: 30, x1: 970, depth: [0.72, 1.05], shadow: 'rgba(150,100,30,.22)', share: 0.62,
          items: 'crab starfish shell bucket ball umbrella turtle seal sandals hat glasses watermelon coconut towel icecream dog' },
        { type: 'ground', y0: 440, y1: 565, x0: 30, x1: 970, depth: [0.7, 0.9], share: 0.2, noShadow: true, items: 'boat swan duck' },
        { type: 'float', y0: 80, y1: 300, x0: 40, x1: 760, share: 0.18, items: 'cloud bird kite plane balloon helicopter parrot' },
      ],
    },

    sea: {
      bg(rand) {
        let s = '<defs>' + grad('wsea', [[0, '#74d0f5'], [0.5, '#2f9bd6'], [1, '#1c6fb0']]) + grad('wsand', [[0, '#f5d894'], [1, '#e4bb6a']]) + '</defs>' +
          '<rect width="1000" height="900" fill="url(#wsea)"/>';
        for (let k = 0; k < 6; k++) {
          const x = rnd(rand, 40, 960);
          s += '<path d="M' + f(x) + ' 0 L' + f(x + 60) + ' 0 L' + f(x + 160) + ' 760 L' + f(x + 40) + ' 760 Z" fill="#fff" opacity=".07"/>';
        }
        s += '<path d="M0 30 Q50 18 100 30 T200 30 T300 30 T400 30 T500 30 T600 30 T700 30 T800 30 T900 30 T1000 30 V0 H0 Z" fill="#b8ecff" opacity=".6"/>' +
          '<path d="M0 770 Q200 740 420 772 T1000 760 V900 H0 Z" fill="url(#wsand)"/>' + dots(rand, 40, 5, 995, 790, 895, ['#d1a14f'], 1.5, 3, 0.6);
        for (let k = 0; k < 7; k++) {
          const x = rnd(rand, 20, 980), h = rnd(rand, 90, 180), y = rnd(rand, 775, 800);
          const d = 'M' + f(x) + ' ' + f(y) + ' q-18 -' + f(h * 0.25) + ' 0 -' + f(h * 0.5) + ' t0 -' + f(h * 0.5);
          s += '<path d="' + d + '" stroke="#2b8a3e" stroke-width="10" fill="none" stroke-linecap="round"/><path d="' + d + '" stroke="#51cf66" stroke-width="5" fill="none" stroke-linecap="round"/>';
        }
        ['#ff8787', '#ffa94d', '#da77f2'].forEach((c) => {
          const x = rnd(rand, 60, 940), y = rnd(rand, 790, 830);
          const d = 'M' + f(x) + ' ' + f(y) + ' v-40 M' + f(x) + ' ' + f(y - 22) + ' l-18 -18 v-14 M' + f(x) + ' ' + f(y - 28) + ' l16 -12 v-12';
          s += '<path d="' + d + '" stroke="#2f2a28" stroke-width="15" fill="none" stroke-linecap="round"/><path d="' + d + '" stroke="' + c + '" stroke-width="9" fill="none" stroke-linecap="round"/>';
        });
        s += '<path d="M820 800 q30 -40 70 -10 q20 20 -10 30 Z" fill="#868e96" stroke="#2f2a28" stroke-width="3"/>';
        for (let k = 0; k < 24; k++) s += '<circle cx="' + f(rnd(rand, 10, 990)) + '" cy="' + f(rnd(rand, 60, 740)) + '" r="' + f(rnd(rand, 3, 9)) + '" fill="#fff" fill-opacity=".25" stroke="#fff" stroke-opacity=".7" stroke-width="2"/>';
        return s;
      },
      zones: [
        { type: 'ground', y0: 805, y1: 885, x0: 30, x1: 970, depth: [0.85, 1], shadow: 'rgba(120,80,20,.2)', share: 0.3, items: 'crab starfish shell octopus turtle' },
        { type: 'float', y0: 90, y1: 720, x0: 30, x1: 970, share: 0.7, items: 'fish dolphin whale shark jellyfish seahorse submarine octopus turtle seal' },
      ],
    },

    snow: {
      bg(rand) {
        let s = '<defs>' + grad('ssky', [[0, '#9fd2f3'], [1, '#eef8ff']]) + grad('ssnow', [[0, '#ffffff'], [1, '#dcecf9']]) + '</defs>' +
          '<rect width="1000" height="900" fill="url(#ssky)"/>' +
          hills('M0 450 L150 300 L240 380 L380 250 L520 400 L640 290 L780 380 L900 280 L1000 360 V560 H0 Z', '#d6e9f7') +
          '<path d="M150 300 L190 340 L150 330 L120 335 Z M380 250 L430 300 L385 290 L350 300 Z M640 290 L690 335 L645 325 L610 335 Z M900 280 L940 315 L902 310 L870 318 Z" fill="#fff"/>' +
          hills('M0 480 Q220 420 470 470 T1000 455 V620 H0 Z', '#eaf4fc');
        s += '<g transform="translate(' + f(rnd(rand, 640, 760)) + ',452)"><rect x="0" y="0" width="120" height="70" fill="#a0673a" stroke="#6b3f1f" stroke-width="4"/>' +
          '<path d="M-14 4 L60 -46 L134 4 Z" fill="#fff" stroke="#c7dcec" stroke-width="4" stroke-linejoin="round"/><rect x="20" y="22" width="26" height="22" fill="#ffd43b" stroke="#6b3f1f" stroke-width="3"/>' +
          '<rect x="72" y="26" width="26" height="44" fill="#6b3f1f"/><rect x="88" y="-52" width="16" height="30" fill="#8d5a34"/></g>';
        for (let k = 0; k < 6; k++) s += pine(k < 3 ? rnd(rand, 20, 320) : rnd(rand, 880, 990), rnd(rand, 500, 540), rnd(rand, 0.9, 1.25));
        s += '<path d="M0 540 Q260 500 520 545 T1000 530 V900 H0 Z" fill="url(#ssnow)"/>' +
          '<path d="M0 700 Q300 650 600 700 T1000 690" stroke="#cfe2f3" stroke-width="8" fill="none" opacity=".8"/>' + dots(rand, 70, 5, 995, 5, 520, ['#fff'], 2, 5, 0.85);
        return s;
      },
      zones: [
        { type: 'ground', y0: 610, y1: 885, x0: 30, x1: 970, depth: [0.62, 1.05], shadow: 'rgba(60,100,150,.18)', share: 0.82,
          items: 'snowman penguin sledge skis skates fox deer rabbit bear wolf owl seal squirrel hat scarf glove boot' },
        { type: 'float', y0: 80, y1: 300, x0: 40, x1: 960, share: 0.18, items: 'cloud bird snowflake plane helicopter balloon' },
      ],
    },

    room: {
      bg(rand) {
        let s = '<defs>' + grad('rwall', [[0, '#fff1d9'], [1, '#fbe2bf']]) + grad('rfloor', [[0, '#d9a873'], [1, '#c48d55']]) + grad('rwin', [[0, '#73c7f7'], [1, '#c8ecff']]) + '</defs>' +
          '<rect width="1000" height="640" fill="url(#rwall)"/>';
        for (let x = 30; x < 1000; x += 70) s += '<rect x="' + x + '" width="26" height="620" fill="#fbdcb4" opacity=".45"/>';
        s += '<path d="M0 22 Q250 70 500 26 T1000 24" stroke="#b5835a" stroke-width="3" fill="none"/>';
        const flags = ['#ff6b6b', '#ffd43b', '#51cf66', '#4dabf7', '#cc5de8'];
        for (let k = 0; k < 16; k++) {
          const x = 20 + k * 62, y = 22 + Math.sin((x / 1000) * Math.PI * 2) * 22 + 20;
          s += '<path d="M' + (x - 18) + ' ' + f(y - 14) + ' L' + (x + 18) + ' ' + f(y - 14) + ' L' + x + ' ' + f(y + 20) + ' Z" fill="' + flags[k % 5] + '" stroke="#2f2a28" stroke-width="2" stroke-linejoin="round"/>';
        }
        s += '<rect x="90" y="100" width="300" height="240" rx="8" fill="url(#rwin)" stroke="#fff" stroke-width="14"/>' +
          '<path d="M90 300 Q170 250 250 290 T390 280 V340 H90 Z" fill="#8fd97a"/>' + cloud(180, 170, 0.7) + cloud(310, 205, 0.5) +
          '<path d="M240 100 V340 M90 220 H390" stroke="#fff" stroke-width="10"/><rect x="70" y="338" width="340" height="18" rx="6" fill="#fff" stroke="#e5c9a0" stroke-width="3"/>' +
          '<path d="M60 84 H420" stroke="#b5835a" stroke-width="10" stroke-linecap="round"/>' +
          '<path d="M66 86 Q50 210 76 360 H130 Q110 220 132 86 Z" fill="#f06595" stroke="#c2255c" stroke-width="3"/><path d="M90 94 Q80 220 100 355" stroke="#c2255c" stroke-width="2" fill="none" opacity=".6"/>' +
          '<path d="M414 86 Q430 210 404 360 H350 Q370 220 348 86 Z" fill="#f06595" stroke="#c2255c" stroke-width="3"/><path d="M390 94 Q400 220 380 355" stroke="#c2255c" stroke-width="2" fill="none" opacity=".6"/>' +
          '<path d="M540 0 V70" stroke="#8d5a34" stroke-width="4"/><path d="M500 110 Q540 50 580 110 Z" fill="#ffd43b" stroke="#2f2a28" stroke-width="3"/><ellipse cx="540" cy="112" rx="40" ry="7" fill="#fff3bf" stroke="#2f2a28" stroke-width="3"/>' +
          '<rect x="455" y="160" width="110" height="110" rx="6" fill="#fff" stroke="#b5835a" stroke-width="10"/><rect x="470" y="300" width="80" height="80" rx="6" fill="#fff" stroke="#4dabf7" stroke-width="8"/>' +
          '<rect x="630" y="150" width="320" height="15" rx="4" fill="#b5835a" stroke="#8d5a34" stroke-width="3"/><rect x="630" y="270" width="320" height="15" rx="4" fill="#b5835a" stroke="#8d5a34" stroke-width="3"/><rect x="630" y="390" width="320" height="15" rx="4" fill="#b5835a" stroke="#8d5a34" stroke-width="3"/>' +
          '<path d="M655 165 v16 h14 M925 165 v16 h-14 M655 285 v16 h14 M925 285 v16 h-14 M655 405 v16 h14 M925 405 v16 h-14" stroke="#8d5a34" stroke-width="5" fill="none"/>' +
          '<rect y="620" width="1000" height="280" fill="url(#rfloor)"/>';
        for (let k = 0; k < 7; k++) s += '<path d="M0 ' + (655 + k * 38) + ' H1000" stroke="#b47d47" stroke-width="2" opacity=".6"/>';
        for (let k = 0; k < 14; k++) s += '<path d="M' + f(rnd(rand, 20, 980)) + ' ' + (655 + Math.floor(rand() * 7) * 38) + ' v38" stroke="#b47d47" stroke-width="2" opacity=".6"/>';
        s += '<rect y="610" width="1000" height="22" fill="#fff" stroke="#e5c9a0" stroke-width="3"/>' +
          '<ellipse cx="500" cy="790" rx="390" ry="92" fill="#74a9e0" stroke="#4d84c2" stroke-width="6"/><ellipse cx="500" cy="790" rx="330" ry="70" fill="none" stroke="#a9cdf2" stroke-width="10" stroke-dasharray="26 14"/>';
        return s;
      },
      zones: [
        { type: 'ground', y0: 705, y1: 885, x0: 30, x1: 970, depth: [0.85, 1.05], shadow: 'rgba(60,30,10,.22)', share: 0.55,
          items: 'ball blocks teddy doll robot car train drum guitar puzzle yoyo backpack bus truck dinosaur cat dog shoe sock gift top xylophone boot' },
        { type: 'ground', y0: 645, y1: 655, x0: 20, x1: 980, depth: [1, 1], shadow: 'rgba(60,30,10,.2)', fixed: 2, items: 'bed sofa chair table lamp television piano' },
        { type: 'slots', slots: [[680, 150], [758, 150], [836, 150], [914, 150], [680, 270], [758, 270], [836, 270], [914, 270], [680, 390], [758, 390], [836, 390], [914, 390]], h: 62, share: 0.32,
          items: 'book clock lamp robot teddy car cup bottle candle gift crown top bell apple ball yoyo duck' },
        { type: 'slots', slots: [[510, 256]], h: 80, fixed: 1, items: 'sun moon star rocket flower house tree rainbow heart fish' },
        { type: 'slots', slots: [[510, 368]], h: 52, fixed: 1, items: 'apple heart star sun cat fish flower' },
      ],
    },

    kitchen: {
      bg(rand) {
        let s = '<defs>' + grad('kwall', [[0, '#e7f5ff'], [1, '#d0ebff']]) + grad('kfloor', [[0, '#f1f3f5'], [1, '#dee2e6']]) + grad('kwood', [[0, '#e8b27a'], [1, '#c98b4f']]) + '</defs>' +
          '<rect width="1000" height="900" fill="url(#kwall)"/>';
        for (let x = 0; x < 1000; x += 50) for (let y = 330; y < 470; y += 50) s += '<rect x="' + x + '" y="' + y + '" width="50" height="50" fill="' + ((x + y) % 100 ? '#fff' : '#a5d8ff') + '" stroke="#d0ebff" stroke-width="2"/>';
        s += '<g stroke="#2f2a28" stroke-width="3"><rect x="20" y="40" width="300" height="190" rx="8" fill="#ffd8a8"/><path d="M170 40 V230"/><circle cx="156" cy="140" r="5" fill="#2f2a28"/><circle cx="184" cy="140" r="5" fill="#2f2a28"/>' +
          '<rect x="680" y="40" width="300" height="190" rx="8" fill="#ffd8a8"/><path d="M830 40 V230"/><circle cx="816" cy="140" r="5" fill="#2f2a28"/><circle cx="844" cy="140" r="5" fill="#2f2a28"/>' +
          '<rect x="380" y="50" width="240" height="200" rx="6" fill="#a5e1ff"/></g>' + cloud(450, 110, 0.5) +
          '<path d="M380 230 Q440 200 500 226 T620 222 V250 H380 Z" fill="#8fd97a"/><path d="M500 50 V250 M380 150 H620" stroke="#fff" stroke-width="10"/><rect x="380" y="50" width="240" height="200" rx="6" fill="none" stroke="#2f2a28" stroke-width="3"/>' +
          '<rect x="0" y="470" width="1000" height="22" fill="url(#kwood)" stroke="#2f2a28" stroke-width="3"/>' +
          '<g stroke="#2f2a28" stroke-width="3"><rect x="0" y="492" width="1000" height="140" fill="#fff4e6"/>';
        for (let x = 0; x < 1000; x += 125) s += '<rect x="' + (x + 8) + '" y="502" width="109" height="120" rx="6" fill="#ffe8cc"/><path d="M' + (x + 50) + ' 560 h25" stroke-width="5"/>';
        s += '</g><rect y="632" width="1000" height="268" fill="url(#kfloor)"/>';
        for (let x = -100; x < 1100; x += 90) s += '<path d="M' + x + ' 900 L' + (x + 60) + ' 632" stroke="#ced4da" stroke-width="2"/>';
        for (let y = 680; y < 900; y += 55) s += '<path d="M0 ' + y + ' H1000" stroke="#ced4da" stroke-width="2"/>';
        s += '<g stroke="#2f2a28" stroke-width="3"><path d="M240 726 V860 M760 726 V860" stroke="#8d5a34" stroke-width="16"/>' +
          '<path d="M180 690 H820 L800 726 H200 Z" fill="url(#kwood)"/><path d="M200 700 H800" stroke="#fff" stroke-width="5" stroke-opacity=".5"/></g>';
        return s;
      },
      zones: [
        { type: 'slots', slots: [[260, 692], [345, 692], [430, 692], [515, 692], [600, 692], [685, 692], [765, 692]], h: 70, share: 0.36,
          items: 'apple banana pear cherry grapes lemon orange strawberry watermelon tomato bread cheese cake pizza cookie cup plate bottle juice milk donut sandwich honey jam pineapple' },
        { type: 'slots', slots: [[60, 472], [170, 472], [280, 472], [390, 472], [500, 472], [610, 472], [720, 472], [830, 472], [940, 472]], h: 74, share: 0.36,
          items: 'pot bottle cup bread milk honey jam butter egg candle basket carrot potato onion pumpkin' },
        { type: 'ground', y0: 795, y1: 885, x0: 30, x1: 970, avoid: [[190, 700, 810, 870]], depth: [0.95, 1.05], shadow: 'rgba(40,40,40,.2)', share: 0.28, items: 'cat dog mouse ball broom bucket basket' },
        { type: 'slots', slots: [[905, 312]], h: 64, fixed: 1, items: 'clock calendar' },
      ],
    },
  };

  // Height of each thing in the scene (board units, before depth). Things
  // not listed are 70.
  const SIZE = {
    giraffe: 330, elephant: 230, horse: 180, zebra: 175, camel: 190, cow: 155, donkey: 150, deer: 160, bear: 150, rhino: 140, lion: 135, tiger: 125, kangaroo: 150,
    sheep: 105, goat: 115, pig: 95, wolf: 100, dog: 88, fox: 80, monkey: 92, panda: 120, cat: 72, rabbit: 70, turkey: 92, goose: 82, rooster: 82, hen: 72, duck: 58, swan: 80,
    chick: 34, mouse: 36, squirrel: 62, hedgehog: 42, snail: 34, frog: 42, turtle: 46, ladybug: 26, owl: 76, penguin: 92, seal: 82, snake: 46, crab: 46, starfish: 38, shell: 34,
    tree: 280, tent: 150, swing: 190, slide: 175, bike: 95, tractor: 170, snowman: 150, umbrella: 220, boat: 120, sledge: 52, skis: 110, skates: 50,
    ball: 46, kite: 70, bucket: 46, basket: 50, apple: 34, carrot: 44, pumpkin: 62, flower: 56, mushroom: 40, teddy: 62, doll: 70, robot: 76, car: 52, train: 60, bus: 64, truck: 60,
    drum: 56, guitar: 100, puzzle: 46, yoyo: 34, backpack: 70, dinosaur: 74, shoe: 32, sock: 40, boot: 52, gift: 50, top: 40, xylophone: 44, blocks: 50,
    bed: 170, sofa: 150, chair: 140, table: 120, lamp: 150, television: 130, piano: 160, broom: 140,
    hat: 40, scarf: 54, glove: 40, sandals: 36, glasses: 32, watermelon: 46, coconut: 40, towel: 30, icecream: 56,
    sun: 120, cloud: 80, rainbow: 120, bird: 44, plane: 80, balloon: 80, helicopter: 90, butterfly: 46, bee: 34, parrot: 64, snowflake: 50,
    fish: 60, dolphin: 110, whale: 180, shark: 140, jellyfish: 70, seahorse: 66, submarine: 120, octopus: 80,
  };

  // Pictures that look clearly different when mirrored, or when recoloured
  // (measured by rendering each one). Full-body animals all face one way.
  const FLIP = 'bee bike bird blocks boat boot cup dinosaur dolphin duck fish glove goose hedgehog helicopter hen jellyfish juice kite lollipop moon octopus parrot plane puzzle rooster scarf seahorse seal shark sheep skates skis sledge slide snail sock squirrel submarine swan tractor train truck turkey turtle whale xylophone';
  const HUE = 'apple backpack ball balloon basket bat bear bee bell bird blocks boat boot bottle bucket bus butterfly cap car carrot cat chick clock coconut crab crown cup deer dinosaur dog doll dolphin drum duck fish flower fox frog gift glove guitar hat hedgehog helicopter horse house icecream jellyfish juice kite ladybug lamp lollipop moon mushroom octopus owl parrot pig pumpkin puzzle rainbow rocket rooster sandals scarf seahorse shark shell shoe shorts skis sledge slide snail snowflake sock squirrel star starfish submarine sun swing teddy tent top towel tractor train tree truck turkey turtle umbrella watermelon whale xylophone yoyo';

  LG.SCENES = SCENES;
  LG.SCENE_SIZE = SIZE;
  LG.SCENE_FLIP = new Set(FLIP.split(' ').concat(Object.keys(LG.BODIES || {})));
  LG.SCENE_HUE = new Set(HUE.split(' '));
})();
