// Sticks & Bellies: a straight stick and a round belly. b, d and p are kept
// apart in the order, since children often mix them up.
(function () {
  const BOWL = 'M95 150 Q80 130 55 130 Q12 130 12 180 Q12 230 55 230 Q80 230 95 210';
  const BELLY = 'M15 160 Q35 130 60 130 Q105 130 105 180 Q105 230 60 230 Q30 230 15 205';
  LG.traceGame({
    titleKey: 'traceBellies',
    descKey: 'traceBelliesDesc',
    pic: 'teddy',
    glyphs: [
      { ch: 'P', w: 130, strokes: ['M10 30 V230', 'M10 30 H65 Q120 30 120 82 Q120 135 65 135 H10'] },
      { ch: 'D', w: 150, strokes: ['M10 30 V230', 'M10 30 H60 Q140 30 140 130 Q140 230 60 230 H10'] },
      { ch: 'B', w: 135, strokes: ['M10 30 V230', 'M10 30 H60 Q110 30 110 79 Q110 128 60 128 H70 Q122 128 122 179 Q122 230 70 230 H10'] },
      { ch: 'R', w: 130, strokes: ['M10 30 V230', 'M10 30 H65 Q120 30 120 82 Q120 135 65 135 H10 L120 230'] },
      { ch: 'r', w: 90, strokes: ['M15 130 V230', 'M15 170 Q25 130 75 135'] },
      { ch: 'n', w: 115, strokes: ['M15 130 V230', 'M15 170 Q20 130 58 130 Q100 130 100 170 V230'] },
      { ch: 'm', w: 170, strokes: ['M15 130 V230', 'M15 165 Q20 130 50 130 Q85 130 85 165 V230', 'M85 165 Q90 130 122 130 Q155 130 155 165 V230'] },
      { ch: 'p', w: 115, strokes: ['M15 130 V320', BELLY] },
      { ch: 'a', w: 110, strokes: [BOWL, 'M95 130 V230'] },
      { ch: 'b', w: 115, strokes: ['M15 30 V230', BELLY] },
      { ch: 'g', w: 110, strokes: [BOWL, 'M95 130 V285 Q95 320 55 320 Q25 320 15 300'] },
      { ch: 'd', w: 110, strokes: [BOWL, 'M95 30 V230'] },
      { ch: 'f', w: 95, strokes: ['M85 45 Q75 30 60 30 Q35 30 35 60 V230', 'M10 130 H80'] },
    ],
  });
})();
