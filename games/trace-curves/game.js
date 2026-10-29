// Moons & Snakes: round and curvy letters. Round shapes start at the top
// and go anticlockwise, the way children are taught to write c, o and e.
LG.traceGame({
  titleKey: 'traceCurves',
  descKey: 'traceCurvesDesc',
  pic: 'moon',
  glyphs: [
    { ch: 'c', w: 110, strokes: ['M95 145 A50 50 0 1 0 95 215'] },
    { ch: 'C', w: 160, strokes: ['M138 59 A75 100 0 1 0 138 201'] },
    { ch: 'o', w: 120, strokes: ['M60 130 A50 50 0 0 0 60 230 A50 50 0 0 0 60 130'] },
    { ch: 'O', w: 170, strokes: ['M85 30 A75 100 0 0 0 85 230 A75 100 0 0 0 85 30'] },
    { ch: 'e', w: 115, strokes: ['M15 180 H105 Q105 130 60 130 Q15 130 15 180 Q15 230 60 230 Q90 230 100 212'] },
    { ch: 'U', w: 160, strokes: ['M15 30 V160 Q15 230 80 230 Q145 230 145 160 V30'] },
    { ch: 'u', w: 110, strokes: ['M15 130 V185 Q15 230 55 230 Q95 230 95 185 V130', 'M95 130 V230'] },
    { ch: 'J', w: 110, strokes: ['M95 30 V180 Q95 230 52 230 Q15 230 12 195'] },
    { ch: 'j', w: 80, strokes: ['M60 130 V285 Q60 320 30 320 Q15 320 8 305', 'M60 88 V90'] },
    { ch: 'S', w: 140, strokes: ['M125 60 Q110 30 70 30 Q15 30 15 80 Q15 125 70 130 Q125 135 125 180 Q125 230 70 230 Q30 230 15 200'] },
    { ch: 's', w: 110, strokes: ['M95 145 Q85 130 60 130 Q25 130 25 155 Q25 178 60 180 Q95 182 95 205 Q95 230 60 230 Q35 230 22 215'] },
    { ch: 'G', w: 170, strokes: ['M138 59 A75 100 0 1 0 158 150 H105'] },
  ],
});
