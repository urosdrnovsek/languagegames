// Lines & Mountains: letters made only of straight lines, from one stroke
// down (L, T) to zigzag mountains (M, N, Z).
LG.traceGame({
  titleKey: 'traceLines',
  descKey: 'traceLinesDesc',
  pic: 'mountain',
  glyphs: [
    { ch: 'L', w: 110, strokes: ['M10 30 V230', 'M10 230 H100'] },
    { ch: 'T', w: 140, strokes: ['M10 30 H130', 'M70 30 V230'] },
    { ch: 't', w: 95, strokes: ['M45 50 V230', 'M10 130 H85'] },
    { ch: 'H', w: 140, strokes: ['M10 30 V230', 'M130 30 V230', 'M10 130 H130'] },
    { ch: 'F', w: 115, strokes: ['M10 30 V230', 'M10 30 H105', 'M10 130 H90'] },
    { ch: 'E', w: 115, strokes: ['M10 30 V230', 'M10 30 H105', 'M10 130 H90', 'M10 230 H105'] },
    { ch: 'V', w: 160, strokes: ['M10 30 L80 230 L150 30'] },
    { ch: 'v', w: 120, strokes: ['M10 130 L60 230 L110 130'] },
    { ch: 'A', w: 160, strokes: ['M80 30 L10 230', 'M80 30 L150 230', 'M38 150 H122'] },
    { ch: 'N', w: 150, strokes: ['M10 230 V30 L140 230 V30'] },
    { ch: 'M', w: 170, strokes: ['M10 230 V30 L85 160 L160 30 V230'] },
    { ch: 'K', w: 140, strokes: ['M10 30 V230', 'M125 30 L15 135 L130 230'] },
    { ch: 'k', w: 110, strokes: ['M10 30 V230', 'M100 130 L15 190 L100 230'] },
    { ch: 'Z', w: 140, strokes: ['M10 30 H130 L10 230 H130'] },
    { ch: 'z', w: 110, strokes: ['M10 130 H100 L10 230 H100'] },
  ],
});
