// Drawn scenes for Spot It!: four backgrounds (meadow, beach, bedroom, snow)
// and the zones where pictures may stand. Everything is drawn in a 1000 x 900
// board. LG.SCENES[id].bg(rand) returns the background as SVG; the same rand
// sequence gives the same background, so both pictures match exactly.
(function () {
  const INK = '#2f2a28';
  const rnd = (rand, a, b) => a + rand() * (b - a);
  const f = (n) => Math.round(n * 10) / 10;

  // A round tree for the distance.
  function farTree(x, y, s, c1, c2) {
    return '<g transform="translate(' + f(x) + ',' + f(y) + ') scale(' + f(s) + ')">' +
      '<rect x="-5" y="-12" width="10" height="26" rx="3" fill="#8d5a34"/>' +
      '<circle cx="0" cy="-30" r="24" fill="' + c1 + '"/><circle cx="-14" cy="-20" r="15" fill="' + c1 + '"/><circle cx="14" cy="-20" r="15" fill="' + c1 + '"/>' +
      '<circle cx="-6" cy="-38" r="9" fill="' + c2 + '" opacity=".7"/></g>';
  }
  // A snowy pine tree.
  function pine(x, y, s) {
    let g = '<g transform="translate(' + f(x) + ',' + f(y) + ') scale(' + f(s) + ')"><rect x="-6" y="-8" width="12" height="20" fill="#7a4b2a"/>';
    [[0, 46], [-26, 38], [-50, 30]].forEach(([dy, w]) => {
      g += '<path d="M0 ' + (dy - 46) + ' L' + w + ' ' + dy + ' H-' + w + ' Z" fill="#2f8a57" stroke="#1f6b41" stroke-width="2" stroke-linejoin="round"/>';
      g += '<path d="M0 ' + (dy - 46) + ' L' + w * 0.45 + ' ' + (dy - 26) + ' Q0 ' + (dy - 20) + ' -' + w * 0.45 + ' ' + (dy - 26) + ' Z" fill="#fff"/>';
    });
    return g + '</g>';
  }
  function cloudShape(x, y, s, o) {
    return '<g transform="translate(' + f(x) + ',' + f(y) + ') scale(' + f(s) + ')" opacity="' + (o || 1) + '"><ellipse cx="0" cy="0" rx="46" ry="16" fill="#fff"/><circle cx="-16" cy="-8" r="18" fill="#fff"/><circle cx="12" cy="-12" r="22" fill="#fff"/></g>';
  }

  const SCENES = {
    meadow: {
      bg(rand) {
        let s = '<defs><linearGradient id="msky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6ec3f5"/><stop offset="1" stop-color="#d4f0ff"/></linearGradient>' +
          '<linearGradient id="mgrass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fd97a"/><stop offset="1" stop-color="#56b35a"/></linearGradient>' +
          '<linearGradient id="mpath" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f5ddb0"/><stop offset="1" stop-color="#ebc584"/></linearGradient></defs>' +
          '<rect width="1000" height="900" fill="url(#msky)"/>' +
          cloudShape(rnd(rand, 140, 300), rnd(rand, 110, 170), 1.2, 0.55) + cloudShape(rnd(rand, 650, 850), rnd(rand, 80, 150), 0.9, 0.55) +
          '<path d="M0 420 L120 330 L210 390 L330 300 L470 410 L600 330 L720 400 L860 320 L1000 390 V520 H0 Z" fill="#c4e0f2"/>' +
          '<path d="M330 300 L370 330 L350 335 L330 322 L305 332 Z M860 320 L895 345 L872 350 L858 338 L835 346 Z" fill="#fff" opacity=".9"/>' +
          '<path d="M0 450 Q160 385 330 440 T680 430 T1000 420 V620 H0 Z" fill="#b2e59a"/>' +
          '<path d="M0 500 Q240 445 500 495 T1000 480 V650 H0 Z" fill="#9edc86"/>';
        for (let k = 0; k < 7; k++) s += farTree(rnd(rand, 20, 980), rnd(rand, 470, 505), rnd(rand, 0.55, 0.85), '#5db85c', '#9be08c');
        s += '<path d="M0 525 Q250 500 500 530 T1000 515 V900 H0 Z" fill="url(#mgrass)"/>' +
          '<path d="M372 900 C420 790 525 730 482 650 C458 604 515 568 548 540 L578 540 C560 574 520 612 556 660 C606 740 568 806 660 900 Z" fill="url(#mpath)" stroke="#d6ad6a" stroke-width="4"/>';
        for (let k = 0; k < 46; k++) {
          const x = rnd(rand, 10, 990), y = rnd(rand, 560, 890), h = rnd(rand, 8, 16) * (0.5 + (y - 540) / 360);
          s += '<path d="M' + f(x - 5) + ' ' + f(y) + ' l5 ' + f(-h) + ' l5 ' + f(h) + ' M' + f(x + 3) + ' ' + f(y) + ' l6 ' + f(-h * 0.7) + '" stroke="#3f9a45" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
        }
        const petals = ['#fff', '#ffd43b', '#ff8fab', '#b197fc'];
        for (let k = 0; k < 34; k++) s += '<circle cx="' + f(rnd(rand, 10, 990)) + '" cy="' + f(rnd(rand, 560, 890)) + '" r="' + f(rnd(rand, 3, 6)) + '" fill="' + petals[k % 4] + '"/>';
        return s;
      },
      zones: [
        { y0: 600, y1: 880, x0: 30, x1: 970, base: 150, scale: [0.7, 1.15], shadow: 'rgba(30,80,20,.2)', share: 0.8,
          items: 'cat dog pig cow sheep horse duck hen rooster rabbit fox goat chick donkey goose turkey hedgehog snail frog ball kite bike flower mushroom tree teddy tent swing slide bucket basket apple carrot pumpkin tractor deer squirrel turtle ladybug' },
        { y0: 90, y1: 330, x0: 40, x1: 960, base: 115, scale: [0.85, 1.05], share: 0.2, items: 'sun cloud rainbow bird kite plane balloon helicopter butterfly bee parrot' },
      ],
    },

    beach: {
      bg(rand) {
        let s = '<defs><linearGradient id="bsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7dd0ff"/><stop offset="1" stop-color="#e6f7ff"/></linearGradient>' +
          '<linearGradient id="bsea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2f8fd3"/><stop offset="1" stop-color="#4cc0ec"/></linearGradient>' +
          '<linearGradient id="bsand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbe7ad"/><stop offset="1" stop-color="#f0cb7a"/></linearGradient></defs>' +
          '<rect width="1000" height="900" fill="url(#bsky)"/>' +
          '<circle cx="880" cy="110" r="80" fill="#fff3bf" opacity=".6"/><circle cx="880" cy="110" r="52" fill="#ffd43b" stroke="#fab005" stroke-width="5"/>' +
          cloudShape(rnd(rand, 120, 320), rnd(rand, 90, 150), 1.1, 0.6) + cloudShape(rnd(rand, 640, 880), rnd(rand, 120, 170), 0.8, 0.6) +
          '<rect y="380" width="1000" height="260" fill="url(#bsea)"/>' +
          // a little island far away
          '<path d="M760 384 Q800 360 850 384 Z" fill="#e9c97f"/><path d="M806 372 Q808 340 800 326" stroke="#8d5a34" stroke-width="4" fill="none"/>' +
          '<path d="M800 326 q-18 -6 -30 6 M800 326 q16 -10 30 0 M800 326 q-6 -16 -22 -16 M800 326 q8 -16 24 -12" stroke="#3f9a45" stroke-width="5" fill="none" stroke-linecap="round"/>';
        for (let k = 0; k < 16; k++) {
          const x = rnd(rand, 0, 960), y = rnd(rand, 400, 590), w = rnd(rand, 26, 50);
          s += '<path d="M' + f(x) + ' ' + f(y) + ' q' + f(w / 4) + ' -8 ' + f(w / 2) + ' 0 t' + f(w / 2) + ' 0" stroke="#fff" stroke-opacity=".75" stroke-width="3.5" fill="none" stroke-linecap="round"/>';
        }
        s += '<path d="M0 600 Q120 585 250 602 T500 598 T750 604 T1000 596 V900 H0 Z" fill="#e8c27a"/>' +
          '<path d="M0 612 Q120 597 250 614 T500 610 T750 616 T1000 608 V900 H0 Z" fill="url(#bsand)"/>' +
          '<path d="M0 598 Q120 583 250 600 T500 596 T750 602 T1000 594" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".9"/>';
        for (let k = 0; k < 70; k++) s += '<circle cx="' + f(rnd(rand, 5, 995)) + '" cy="' + f(rnd(rand, 630, 895)) + '" r="' + f(rnd(rand, 1.5, 3.2)) + '" fill="#d9ad5c" opacity=".7"/>';
        return s;
      },
      zones: [
        { y0: 665, y1: 885, x0: 30, x1: 970, base: 145, scale: [0.75, 1.15], shadow: 'rgba(150,100,30,.22)', share: 0.62,
          items: 'crab starfish shell bucket ball umbrella turtle seal icecream sandals hat glasses watermelon coconut juice towel shorts cap lollipop dog' },
        { y0: 455, y1: 585, x0: 30, x1: 970, base: 110, scale: [0.8, 1], share: 0.22, items: 'boat fish dolphin whale shark octopus jellyfish submarine swan seahorse duck' },
        { y0: 90, y1: 310, x0: 40, x1: 780, base: 110, scale: [0.85, 1], share: 0.16, items: 'cloud bird kite plane balloon helicopter parrot' },
      ],
    },

    room: {
      bg(rand) {
        let s = '<defs><linearGradient id="rwall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff1d9"/><stop offset="1" stop-color="#fbe2bf"/></linearGradient>' +
          '<linearGradient id="rfloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9a873"/><stop offset="1" stop-color="#c48d55"/></linearGradient>' +
          '<linearGradient id="rwin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#73c7f7"/><stop offset="1" stop-color="#c8ecff"/></linearGradient></defs>' +
          '<rect width="1000" height="640" fill="url(#rwall)"/>';
        for (let x = 30; x < 1000; x += 70) s += '<rect x="' + x + '" width="26" height="620" fill="#fbdcb4" opacity=".45"/>';
        // bunting across the top
        s += '<path d="M0 22 Q250 70 500 26 T1000 24" stroke="#b5835a" stroke-width="3" fill="none"/>';
        const flags = ['#ff6b6b', '#ffd43b', '#51cf66', '#4dabf7', '#cc5de8'];
        for (let k = 0; k < 16; k++) {
          const x = 20 + k * 62, y = 22 + Math.sin((x / 1000) * Math.PI * 2) * 22 + 20;
          s += '<path d="M' + (x - 18) + ' ' + f(y - 14) + ' L' + (x + 18) + ' ' + f(y - 14) + ' L' + x + ' ' + f(y + 20) + ' Z" fill="' + flags[k % 5] + '" stroke="#2f2a28" stroke-width="2" stroke-linejoin="round"/>';
        }
        // window with a view, curtains and a sill
        s += '<rect x="90" y="100" width="300" height="240" rx="8" fill="url(#rwin)" stroke="#fff" stroke-width="14"/>' +
          '<path d="M90 300 Q170 250 250 290 T390 280 V340 H90 Z" fill="#8fd97a"/>' + cloudShape(180, 170, 0.7) + cloudShape(310, 205, 0.5) +
          '<path d="M240 100 V340 M90 220 H390" stroke="#fff" stroke-width="10"/>' +
          '<rect x="70" y="338" width="340" height="18" rx="6" fill="#fff" stroke="#e5c9a0" stroke-width="3"/>' +
          '<path d="M60 84 H420" stroke="#b5835a" stroke-width="10" stroke-linecap="round"/>' +
          '<path d="M66 86 Q50 210 76 360 H130 Q110 220 132 86 Z" fill="#f06595" stroke="#c2255c" stroke-width="3"/><path d="M90 94 Q80 220 100 355" stroke="#c2255c" stroke-width="2" fill="none" opacity=".6"/>' +
          '<path d="M414 86 Q430 210 404 360 H350 Q370 220 348 86 Z" fill="#f06595" stroke="#c2255c" stroke-width="3"/><path d="M390 94 Q400 220 380 355" stroke="#c2255c" stroke-width="2" fill="none" opacity=".6"/>' +
          // ceiling lamp
          '<path d="M540 0 V70" stroke="#8d5a34" stroke-width="4"/><path d="M500 110 Q540 50 580 110 Z" fill="#ffd43b" stroke="#2f2a28" stroke-width="3"/><ellipse cx="540" cy="112" rx="40" ry="7" fill="#fff3bf" stroke="#2f2a28" stroke-width="3"/>' +
          // two picture frames (their pictures are a zone of their own)
          '<rect x="455" y="160" width="110" height="110" rx="6" fill="#fff" stroke="#b5835a" stroke-width="10"/>' +
          '<rect x="470" y="300" width="80" height="80" rx="6" fill="#fff" stroke="#4dabf7" stroke-width="8"/>' +
          // three shelves
          '<rect x="630" y="150" width="320" height="15" rx="4" fill="#b5835a" stroke="#8d5a34" stroke-width="3"/><rect x="630" y="270" width="320" height="15" rx="4" fill="#b5835a" stroke="#8d5a34" stroke-width="3"/><rect x="630" y="390" width="320" height="15" rx="4" fill="#b5835a" stroke="#8d5a34" stroke-width="3"/>' +
          '<path d="M655 165 v16 h14 M925 165 v16 h-14 M655 285 v16 h14 M925 285 v16 h-14 M655 405 v16 h14 M925 405 v16 h-14" stroke="#8d5a34" stroke-width="5" fill="none"/>' +
          // floor, skirting board, rug
          '<rect y="620" width="1000" height="280" fill="url(#rfloor)"/>';
        for (let k = 0; k < 7; k++) s += '<path d="M0 ' + (655 + k * 38) + ' H1000" stroke="#b47d47" stroke-width="2" opacity=".6"/>';
        for (let k = 0; k < 14; k++) {
          const row = Math.floor(rand() * 7);
          s += '<path d="M' + f(rnd(rand, 20, 980)) + ' ' + (655 + row * 38) + ' v38" stroke="#b47d47" stroke-width="2" opacity=".6"/>';
        }
        s += '<rect y="610" width="1000" height="22" fill="#fff" stroke="#e5c9a0" stroke-width="3"/>' +
          '<ellipse cx="500" cy="790" rx="390" ry="92" fill="#74a9e0" stroke="#4d84c2" stroke-width="6"/><ellipse cx="500" cy="790" rx="330" ry="70" fill="none" stroke="#a9cdf2" stroke-width="10" stroke-dasharray="26 14"/>';
        return s;
      },
      zones: [
        { y0: 700, y1: 885, x0: 30, x1: 970, base: 140, scale: [0.85, 1.15], shadow: 'rgba(60,30,10,.22)', share: 0.5,
          items: 'ball blocks teddy doll robot car train drum guitar puzzle yoyo backpack bus truck dinosaur cat dog shoe sock gift top xylophone kite boot' },
        // furniture against the wall
        { y0: 640, y1: 660, x0: 20, x1: 980, base: 175, scale: [1, 1], shadow: 'rgba(60,30,10,.2)', fixed: 2, items: 'bed sofa chair table lamp television computer piano' },
        { slots: [[640, 150], [718, 150], [796, 150], [874, 150], [640, 270], [718, 270], [796, 270], [874, 270], [640, 390], [718, 390], [796, 390], [874, 390]], size: 74, share: 0.32,
          items: 'book clock lamp robot teddy car cup bottle candle gift crown top bell apple ball yoyo drum bus duck' },
        { slots: [[470, 258]], size: 80, fixed: 1, items: 'sun moon star rocket flower house tree rainbow heart fish' },
        { slots: [[484, 372]], size: 52, fixed: 1, items: 'apple heart star sun cat dog fish flower' },
      ],
    },

    snow: {
      bg(rand) {
        let s = '<defs><linearGradient id="ssky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fd2f3"/><stop offset="1" stop-color="#eef8ff"/></linearGradient>' +
          '<linearGradient id="ssnow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#dcecf9"/></linearGradient></defs>' +
          '<rect width="1000" height="900" fill="url(#ssky)"/>' +
          '<path d="M0 450 L150 300 L240 380 L380 250 L520 400 L640 290 L780 380 L900 280 L1000 360 V560 H0 Z" fill="#d6e9f7"/>' +
          '<path d="M150 300 L190 340 L150 330 L120 335 Z M380 250 L430 300 L385 290 L350 300 Z M640 290 L690 335 L645 325 L610 335 Z M900 280 L940 315 L902 310 L870 318 Z" fill="#fff"/>' +
          '<path d="M0 480 Q220 420 470 470 T1000 455 V620 H0 Z" fill="#eaf4fc"/>';
        // a little cabin with a lit window
        s += '<g transform="translate(' + f(rnd(rand, 640, 760)) + ',452)"><rect x="0" y="0" width="120" height="70" fill="#a0673a" stroke="#6b3f1f" stroke-width="4"/>' +
          '<path d="M-14 4 L60 -46 L134 4 Z" fill="#fff" stroke="#c7dcec" stroke-width="4" stroke-linejoin="round"/><rect x="20" y="22" width="26" height="22" fill="#ffd43b" stroke="#6b3f1f" stroke-width="3"/>' +
          '<rect x="72" y="26" width="26" height="44" fill="#6b3f1f"/><rect x="88" y="-52" width="16" height="30" fill="#8d5a34"/></g>';
        for (let k = 0; k < 6; k++) s += pine(k < 3 ? rnd(rand, 20, 320) : rnd(rand, 880, 990), rnd(rand, 500, 540), rnd(rand, 0.9, 1.25));
        s += '<path d="M0 540 Q260 500 520 545 T1000 530 V900 H0 Z" fill="url(#ssnow)"/>' +
          '<path d="M0 700 Q300 650 600 700 T1000 690" stroke="#cfe2f3" stroke-width="8" fill="none" opacity=".8"/>';
        for (let k = 0; k < 70; k++) s += '<circle cx="' + f(rnd(rand, 5, 995)) + '" cy="' + f(rnd(rand, 5, 520)) + '" r="' + f(rnd(rand, 2, 5)) + '" fill="#fff" opacity=".85"/>';
        return s;
      },
      zones: [
        { y0: 605, y1: 885, x0: 30, x1: 970, base: 150, scale: [0.72, 1.15], shadow: 'rgba(60,100,150,.18)', share: 0.8,
          items: 'snowman penguin sledge skis skates fox deer rabbit hat scarf glove boot owl bear seal wolf squirrel ball' },
        { y0: 90, y1: 300, x0: 40, x1: 960, base: 110, scale: [0.85, 1], share: 0.2, items: 'cloud bird snowflake plane helicopter balloon kite owl' },
      ],
    },
  };

  // Pictures that look clearly different when mirrored, or when recoloured
  // (measured by rendering each one: see the README).
  const FLIP = 'bee bike bird blocks boat boot coconut cup dinosaur dolphin duck fish glove goose hedgehog helicopter hen jellyfish juice kite lollipop moon octopus parrot plane puzzle rooster scarf seahorse seal shark sheep skates skis sledge slide snail sock squirrel submarine swan tractor train truck turtle whale xylophone';
  const HUE = 'apple backpack ball balloon basket bat bear bee bell bird blocks boat boot bottle bucket bus butterfly cap car carrot cat chick clock coconut crab crown cup deer dinosaur dog doll dolphin drum duck fish flower fox frog gift glove guitar hat hedgehog helicopter horse house icecream jellyfish juice kite ladybug lamp lollipop moon mushroom octopus owl parrot pig pumpkin puzzle rainbow rocket rooster sandals scarf seahorse shark shell shoe shorts skis sledge slide snail snowflake sock squirrel star starfish submarine sun swing teddy tent top towel tractor train tree truck turkey turtle umbrella watermelon whale xylophone yoyo';
  // Some things are bigger or smaller than others.
  const SIZE = { umbrella: 1.45, tree: 1.55, house: 1.4, tent: 1.35, snowman: 1.4, tractor: 1.3, cow: 1.25, horse: 1.3, slide: 1.35, swing: 1.35, bear: 1.25, deer: 1.25,
    boat: 1.15, whale: 1.25, bike: 1.1, train: 1.15, bus: 1.2, truck: 1.15, dinosaur: 1.15, guitar: 1.1, sledge: 1.1, rainbow: 1.3,
    ladybug: 0.6, bee: 0.6, snail: 0.65, shell: 0.65, starfish: 0.7, crab: 0.8, sock: 0.7, cup: 0.7, butterfly: 0.65, chick: 0.65, mushroom: 0.75,
    lollipop: 0.75, icecream: 0.8, apple: 0.65, carrot: 0.7, bird: 0.7, glove: 0.7, juice: 0.7, yoyo: 0.7, top: 0.75, fish: 0.75, seahorse: 0.75, jellyfish: 0.8 };

  LG.SCENES = SCENES;
  LG.SCENE_FLIP = new Set(FLIP.split(' '));
  LG.SCENE_HUE = new Set(HUE.split(' '));
  LG.SCENE_SIZE = SIZE;
  LG.SCENE_INK = INK;
})();
