// Hand-drawn SVG pictures. Every picture uses a 100x100 viewBox and the
// shared outline style set in svg() below. Add a picture here, then add its
// words to shared/words.js.
(function () {
  const LG = (window.LG = window.LG || {});
  const INK = '#2f2a28';

  function svg(inner) {
    return (
      '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">' +
      '<g stroke="' + INK + '" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">' +
      inner +
      '</g></svg>'
    );
  }

  // A dark eye with a small highlight.
  function eye(cx, cy, r) {
    r = r || 4.5;
    return (
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + INK + '" stroke="none"/>' +
      '<circle cx="' + (cx + r * 0.35) + '" cy="' + (cy - r * 0.35) + '" r="' + r * 0.35 + '" fill="#fff" stroke="none"/>'
    );
  }

  function cheeks(y, dx) {
    return (
      '<circle cx="' + (50 - dx) + '" cy="' + y + '" r="5" fill="#ff8fab" opacity=".45" stroke="none"/>' +
      '<circle cx="' + (50 + dx) + '" cy="' + y + '" r="5" fill="#ff8fab" opacity=".45" stroke="none"/>'
    );
  }

  // Shapes repeated around a center point (sun rays, lion mane, petals...).
  function ring(count, cx, cy, radius, make) {
    let out = '';
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      out += make(cx + Math.cos(a) * radius, cy + Math.sin(a) * radius, a, i);
    }
    return out;
  }

  const P = {};

  // ---------- Animals ----------

  P.cat =
    '<path d="M24 44 L26 12 L47 30 Z" fill="#f59f3a"/><path d="M76 44 L74 12 L53 30 Z" fill="#f59f3a"/>' +
    '<path d="M30 33 L31 21 L40 29 Z" fill="#ffb3c6" stroke="none"/><path d="M70 33 L69 21 L60 29 Z" fill="#ffb3c6" stroke="none"/>' +
    '<circle cx="50" cy="57" r="30" fill="#f59f3a"/>' +
    '<path d="M50 28 v8 M42 30 l2 7 M58 30 l-2 7" fill="none" stroke="#c76b12"/>' +
    eye(39, 52) + eye(61, 52) + cheeks(66, 18) +
    '<path d="M46 61 h8 l-4 5 z" fill="#ff6b8a"/>' +
    '<path d="M50 66 q-4 6 -9 3 M50 66 q4 6 9 3" fill="none"/>' +
    '<path d="M31 62 h-14 M32 67 l-13 4 M69 62 h14 M68 67 l13 4" fill="none" stroke-width="2"/>';

  P.dog =
    '<ellipse cx="50" cy="52" rx="27" ry="28" fill="#d39b62"/>' +
    '<ellipse cx="25" cy="50" rx="10" ry="21" fill="#7a4a26" transform="rotate(18 25 50)"/>' +
    '<ellipse cx="75" cy="50" rx="10" ry="21" fill="#7a4a26" transform="rotate(-18 75 50)"/>' +
    '<ellipse cx="60" cy="42" rx="8" ry="7" fill="#b07a45" stroke="none"/>' +
    eye(40, 45) + eye(60, 45) +
    '<ellipse cx="50" cy="66" rx="16" ry="12" fill="#f3dcb8"/>' +
    '<path d="M54 74 q0 9 -4 9 q-4 0 -4 -9 z" fill="#ff6b8a"/>' +
    '<ellipse cx="50" cy="60" rx="6.5" ry="4.5" fill="' + INK + '"/>' +
    '<path d="M50 64 v5 M42 70 q8 6 16 0" fill="none"/>';

  P.pig =
    '<path d="M26 40 L22 16 L44 28 Z" fill="#ff8fab"/><path d="M74 40 L78 16 L56 28 Z" fill="#ff8fab"/>' +
    '<circle cx="50" cy="55" r="30" fill="#ffc2d1"/>' +
    eye(39, 47) + eye(61, 47) + cheeks(60, 22) +
    '<ellipse cx="50" cy="63" rx="14" ry="10" fill="#ff8fab"/>' +
    '<ellipse cx="45" cy="63" rx="2.5" ry="4" fill="' + INK + '" stroke="none"/><ellipse cx="55" cy="63" rx="2.5" ry="4" fill="' + INK + '" stroke="none"/>' +
    '<path d="M42 77 q8 4 16 0" fill="none"/>';

  P.bear =
    '<circle cx="26" cy="28" r="12" fill="#a0673b"/><circle cx="74" cy="28" r="12" fill="#a0673b"/>' +
    '<circle cx="26" cy="28" r="6" fill="#e3b58a" stroke="none"/><circle cx="74" cy="28" r="6" fill="#e3b58a" stroke="none"/>' +
    '<circle cx="50" cy="55" r="31" fill="#a0673b"/>' +
    eye(38, 48) + eye(62, 48) +
    '<ellipse cx="50" cy="66" rx="15" ry="12" fill="#e3b58a"/>' +
    '<ellipse cx="50" cy="61" rx="6" ry="4.5" fill="' + INK + '"/>' +
    '<path d="M50 65 v5 M44 72 q6 4 12 0" fill="none"/>';

  P.mouse =
    '<circle cx="25" cy="32" r="17" fill="#adb5bd"/><circle cx="75" cy="32" r="17" fill="#adb5bd"/>' +
    '<circle cx="25" cy="32" r="10" fill="#ffc2d1" stroke="none"/><circle cx="75" cy="32" r="10" fill="#ffc2d1" stroke="none"/>' +
    '<ellipse cx="50" cy="58" rx="26" ry="25" fill="#ced4da"/>' +
    eye(41, 53, 4) + eye(59, 53, 4) + cheeks(64, 16) +
    '<circle cx="50" cy="65" r="4" fill="#ff6b8a"/>' +
    '<path d="M46 72 h8 v5 h-8 z" fill="#fff" stroke-width="2"/>' +
    '<path d="M36 64 h-16 M37 68 l-15 4 M64 64 h16 M63 68 l15 4" fill="none" stroke-width="2"/>';

  P.lion =
    ring(12, 50, 52, 30, (x, y) => '<circle cx="' + x + '" cy="' + y + '" r="13" fill="#d9480f"/>') +
    '<circle cx="50" cy="52" r="28" fill="#e8590c" stroke="none"/>' +
    '<circle cx="31" cy="32" r="7" fill="#fcc419"/><circle cx="69" cy="32" r="7" fill="#fcc419"/>' +
    '<circle cx="50" cy="54" r="24" fill="#fcc419"/>' +
    eye(41, 48) + eye(59, 48) +
    '<ellipse cx="50" cy="64" rx="12" ry="9" fill="#ffe8a3"/>' +
    '<path d="M45 58 h10 l-5 5 z" fill="#7a4a26"/>' +
    '<path d="M50 63 v3 M44 68 q6 4 12 0" fill="none"/>';

  P.cow =
    '<path d="M30 30 q-10 -4 -12 -16 q8 4 18 10 z" fill="#f1e3c8"/><path d="M70 30 q10 -4 12 -16 q-8 4 -18 10 z" fill="#f1e3c8"/>' +
    '<ellipse cx="18" cy="42" rx="11" ry="6" fill="#fff" transform="rotate(20 18 42)"/>' +
    '<ellipse cx="82" cy="42" rx="11" ry="6" fill="#fff" transform="rotate(-20 82 42)"/>' +
    '<ellipse cx="50" cy="50" rx="26" ry="26" fill="#fff"/>' +
    '<path d="M30 36 q8 -10 18 -4 q-2 12 -14 14 q-6 -2 -4 -10 z" fill="' + INK + '" stroke="none"/>' +
    '<path d="M64 52 q10 -4 11 6 q-2 6 -10 4 z" fill="' + INK + '" stroke="none"/>' +
    eye(40, 48, 4) + eye(60, 48, 4) +
    '<ellipse cx="50" cy="70" rx="22" ry="14" fill="#ffb3c6"/>' +
    '<ellipse cx="42" cy="70" rx="3" ry="4.5" fill="' + INK + '" stroke="none"/><ellipse cx="58" cy="70" rx="3" ry="4.5" fill="' + INK + '" stroke="none"/>';

  P.sheep =
    ring(11, 50, 52, 27, (x, y) => '<circle cx="' + x + '" cy="' + y + '" r="13" fill="#f8f9fa"/>') +
    '<circle cx="50" cy="52" r="27" fill="#f8f9fa" stroke="none"/>' +
    '<ellipse cx="29" cy="50" rx="9" ry="5" fill="#495057" transform="rotate(25 29 50)"/>' +
    '<ellipse cx="71" cy="50" rx="9" ry="5" fill="#495057" transform="rotate(-25 71 50)"/>' +
    '<ellipse cx="50" cy="58" rx="16" ry="20" fill="#495057"/>' +
    '<circle cx="43" cy="53" r="4" fill="#fff" stroke="none"/><circle cx="57" cy="53" r="4" fill="#fff" stroke="none"/>' +
    '<circle cx="43" cy="53" r="2" fill="' + INK + '" stroke="none"/><circle cx="57" cy="53" r="2" fill="' + INK + '" stroke="none"/>' +
    '<path d="M45 68 q5 4 10 0" fill="none" stroke="#fff" stroke-width="2"/>' +
    ring(5, 50, 32, 8, (x, y) => '<circle cx="' + x + '" cy="' + y + '" r="6" fill="#f8f9fa"/>');

  P.owl =
    '<path d="M24 34 L28 14 L40 28 Z" fill="#8c5a36"/><path d="M76 34 L72 14 L60 28 Z" fill="#8c5a36"/>' +
    '<ellipse cx="50" cy="56" rx="29" ry="33" fill="#a9744f"/>' +
    '<ellipse cx="50" cy="68" rx="17" ry="18" fill="#e9c9a0"/>' +
    '<path d="M42 64 q3 3 6 0 M52 64 q3 3 6 0 M47 72 q3 3 6 0" fill="none" stroke="#a9744f" stroke-width="2"/>' +
    '<circle cx="38" cy="44" r="12" fill="#fff"/><circle cx="62" cy="44" r="12" fill="#fff"/>' +
    eye(38, 44, 6) + eye(62, 44, 6) +
    '<path d="M46 52 h8 l-4 8 z" fill="#fd7e14"/>' +
    '<path d="M40 88 v-4 M44 88 v-4 M56 88 v-4 M60 88 v-4" stroke="#fd7e14" stroke-width="3"/>';

  P.duck =
    '<path d="M8 84 q8 -6 16 0 q8 6 16 0 q8 -6 16 0 q8 6 16 0 q8 -6 16 0" fill="none" stroke="#4dabf7"/>' +
    '<path d="M24 62 q4 -16 28 -14 q24 0 32 -12 q6 20 -6 34 q-14 12 -36 8 q-20 -4 -18 -16 z" fill="#ffd43b"/>' +
    '<path d="M48 62 q12 -2 20 6 q-12 8 -22 2" fill="#fcc419"/>' +
    '<circle cx="34" cy="38" r="15" fill="#ffd43b"/>' +
    '<path d="M21 36 Q6 38 8 44 Q14 47 22 44 Z" fill="#fd7e14"/>' +
    eye(32, 34, 3.5);

  P.frog =
    '<circle cx="33" cy="36" r="12" fill="#69db7c"/><circle cx="67" cy="36" r="12" fill="#69db7c"/>' +
    '<ellipse cx="50" cy="60" rx="34" ry="25" fill="#69db7c"/>' +
    '<circle cx="33" cy="36" r="7.5" fill="#fff" stroke="none"/><circle cx="67" cy="36" r="7.5" fill="#fff" stroke="none"/>' +
    eye(33, 37, 4) + eye(67, 37, 4) + cheeks(62, 22) +
    '<path d="M30 60 q20 16 40 0" fill="none"/>' +
    '<circle cx="45" cy="52" r="1.5" fill="' + INK + '" stroke="none"/><circle cx="55" cy="52" r="1.5" fill="' + INK + '" stroke="none"/>' +
    '<path d="M22 82 q6 -6 12 0 M66 82 q6 -6 12 0" fill="#51cf66"/>';

  P.fish =
    '<path d="M70 50 L92 32 L90 50 L92 68 Z" fill="#ff8c42"/>' +
    '<ellipse cx="45" cy="50" rx="30" ry="21" fill="#ffa94d"/>' +
    '<path d="M40 30 q10 -10 22 -2 z" fill="#ff8c42"/>' +
    '<path d="M50 42 q5 8 0 16 M60 42 q5 8 0 16" fill="none" stroke="#e8590c" stroke-width="2"/>' +
    '<circle cx="30" cy="45" r="6" fill="#fff"/>' + eye(30, 45, 3.5) +
    '<path d="M18 55 q4 3 8 0" fill="none"/>' +
    '<circle cx="14" cy="28" r="3.5" fill="#d0ebff"/><circle cx="20" cy="18" r="2.5" fill="#d0ebff"/>';

  P.bee =
    '<ellipse cx="44" cy="34" rx="11" ry="15" fill="#d0ebff" opacity=".9" transform="rotate(-20 44 34)"/>' +
    '<ellipse cx="60" cy="34" rx="11" ry="15" fill="#d0ebff" opacity=".9" transform="rotate(20 60 34)"/>' +
    '<path d="M76 58 L90 58 L78 64 Z" fill="' + INK + '"/>' +
    '<ellipse cx="52" cy="58" rx="27" ry="19" fill="#ffd43b"/>' +
    '<path d="M48 43 v30 M62 44 v28" stroke="' + INK + '" stroke-width="7"/>' +
    '<circle cx="24" cy="56" r="13" fill="#ffd43b"/>' +
    eye(20, 53, 3) +
    '<path d="M17 61 q4 3 8 0" fill="none" stroke-width="2"/>' +
    '<path d="M22 44 q-4 -10 -10 -12 M28 44 q2 -10 8 -12" fill="none" stroke-width="2"/>';

  P.bird =
    '<path d="M74 50 L92 40 L90 56 Z" fill="#339af0"/>' +
    '<circle cx="50" cy="52" r="27" fill="#4dabf7"/>' +
    '<ellipse cx="46" cy="62" rx="16" ry="13" fill="#d0ebff"/>' +
    '<path d="M54 50 q16 -2 18 12 q-12 6 -20 -2 z" fill="#339af0"/>' +
    eye(40, 44, 4) +
    '<path d="M24 46 L12 50 L24 54 Z" fill="#fd7e14"/>' +
    '<path d="M44 79 v9 M54 79 v9 M41 88 h6 M51 88 h6" stroke="#fd7e14"/>';

  P.snake =
    '<path d="M14 74 C26 92 40 56 52 74 S78 92 82 64" fill="none" stroke="' + INK + '" stroke-width="18"/>' +
    '<path d="M14 74 C26 92 40 56 52 74 S78 92 82 64" fill="none" stroke="#69db7c" stroke-width="12"/>' +
    '<path d="M22 78 l2 3 M38 72 l2 -3 M56 80 l2 3 M72 78 l2 -3" stroke="#2b8a3e" stroke-width="2"/>' +
    '<ellipse cx="80" cy="46" rx="13" ry="16" fill="#69db7c"/>' +
    eye(75, 42, 3) + eye(85, 42, 3) +
    '<path d="M80 62 v6 l-3 4 M80 68 l3 4" fill="none" stroke="#fa5252" stroke-width="2"/>' +
    '<path d="M75 52 q5 4 10 0" fill="none" stroke-width="2"/>';

  P.snail =
    '<path d="M84 46 L78 28 M88 46 L94 30" fill="none"/>' +
    '<circle cx="78" cy="27" r="4" fill="' + INK + '" stroke="none"/><circle cx="94" cy="29" r="4" fill="' + INK + '" stroke="none"/>' +
    '<path d="M8 82 Q8 72 22 72 H70 Q78 72 79 62 L78 50 Q84 40 92 48 L94 70 Q94 82 80 82 Z" fill="#ffd8a8"/>' +
    '<path d="M84 60 q3 3 6 0" fill="none" stroke-width="2"/>' +
    '<circle cx="44" cy="50" r="26" fill="#e8590c"/>' +
    '<path d="M41 50 a3 3 0 0 1 6 0 a6 6 0 0 1 -12 0 a9 9 0 0 1 18 0 a12 12 0 0 1 -24 0 a15 15 0 0 1 30 0" fill="none" stroke="#ffd8a8" stroke-width="3.5"/>';

  // ---------- Food ----------

  P.apple =
    '<path d="M50 30 C30 18 14 34 18 56 C22 78 38 90 50 84 C62 90 78 78 82 56 C86 34 70 18 50 30 Z" fill="#ff4d4f"/>' +
    '<path d="M50 30 Q50 20 54 12" fill="none" stroke="#7a4a26" stroke-width="4"/>' +
    '<path d="M55 22 Q66 10 76 18 Q66 28 55 22 Z" fill="#51cf66"/>' +
    '<path d="M28 46 q2 -8 10 -10" fill="none" stroke="#fff" stroke-width="4" opacity=".7"/>';

  P.banana =
    '<path d="M18 30 C14 60 40 86 80 74 C86 72 86 66 80 66 C50 70 32 52 30 30 C30 24 20 24 18 30 Z" fill="#ffe066"/>' +
    '<path d="M30 36 C34 54 50 66 74 68" fill="none" stroke="#f59f00" stroke-width="2"/>' +
    '<path d="M20 30 l-2 -10 l8 2 z" fill="#7a4a26"/>' +
    '<path d="M80 66 l6 2 l-4 6" fill="#7a4a26"/>';

  P.pear =
    '<path d="M50 24 C40 24 38 38 36 46 C24 56 22 86 50 88 C78 86 76 56 64 46 C62 38 60 24 50 24 Z" fill="#c0eb75"/>' +
    '<path d="M50 24 Q50 16 46 10" fill="none" stroke="#7a4a26" stroke-width="4"/>' +
    '<path d="M52 18 Q62 8 72 14 Q62 24 52 18 Z" fill="#51cf66"/>' +
    '<path d="M36 64 q0 -8 6 -12" fill="none" stroke="#fff" stroke-width="4" opacity=".7"/>';

  P.carrot =
    '<path d="M42 30 q-10 -14 -4 -20 q6 6 8 18 M50 28 q0 -16 6 -20 q4 8 -2 20 M56 30 q8 -12 16 -10 q-4 10 -14 14" fill="#51cf66"/>' +
    '<path d="M36 32 Q50 24 64 32 Q60 60 52 88 Q50 92 48 88 Q40 60 36 32 Z" fill="#ff922b"/>' +
    '<path d="M42 44 h8 M54 54 h6 M44 62 h6 M52 72 h4" stroke="#d9480f" stroke-width="2"/>';

  P.cheese =
    '<path d="M14 50 L60 24 L86 50 Z" fill="#ffe066"/>' +
    '<path d="M14 50 L86 50 L86 80 L14 80 Z" fill="#fcc419"/>' +
    '<circle cx="32" cy="64" r="6" fill="#f59f00" stroke="none"/><circle cx="56" cy="70" r="4" fill="#f59f00" stroke="none"/>' +
    '<circle cx="72" cy="60" r="5" fill="#f59f00" stroke="none"/><circle cx="48" cy="58" r="2.5" fill="#f59f00" stroke="none"/>' +
    '<ellipse cx="58" cy="40" rx="5" ry="2.5" fill="#f59f00" stroke="none"/>';

  P.bread =
    '<path d="M14 52 C10 30 30 24 50 24 C70 24 90 30 86 52 L82 52 L82 82 L18 82 L18 52 Z" fill="#e8a25c"/>' +
    '<path d="M24 52 L24 78 L76 78 L76 52 C80 36 66 32 50 32 C34 32 20 36 24 52 Z" fill="#fff3d6"/>' +
    '<path d="M34 46 q4 -6 8 -6 M48 44 q4 -6 8 -6 M60 48 q4 -6 8 -6" fill="none" stroke="#e8a25c" stroke-width="2"/>';

  P.egg =
    '<path d="M50 16 C70 16 78 50 76 64 C74 80 62 88 50 88 C38 88 26 80 24 64 C22 50 30 16 50 16 Z" fill="#fff7e6"/>' +
    '<path d="M36 40 q4 -10 10 -14" fill="none" stroke="#fff" stroke-width="5"/>' +
    '<path d="M60 74 q8 -4 10 -14" fill="none" stroke="#ead7b5" stroke-width="3"/>';

  P.milk =
    '<path d="M28 34 L50 14 L72 34 Z" fill="#e7f5ff"/>' +
    '<path d="M44 14 h12 v-4 h-12 z" fill="#4dabf7"/>' +
    '<rect x="28" y="34" width="44" height="54" rx="3" fill="#fff"/>' +
    '<rect x="28" y="48" width="44" height="26" fill="#4dabf7"/>' +
    '<path d="M50 52 q-7 9 -7 13 a7 7 0 0 0 14 0 q0 -4 -7 -13 z" fill="#fff" stroke="none"/>';

  P.cake =
    '<path d="M50 10 q-6 8 0 12 q6 -4 0 -12 z" fill="#ffa94d"/>' +
    '<rect x="46" y="22" width="8" height="18" rx="2" fill="#74c0fc"/>' +
    '<rect x="16" y="40" width="68" height="44" rx="6" fill="#ffc2d1"/>' +
    '<path d="M16 50 q6 10 12 0 q6 10 12 0 q6 10 12 0 q6 10 12 0 q6 10 12 0 q4 6 6 0 L84 46 Q84 40 78 40 L22 40 Q16 40 16 46 Z" fill="#fff"/>' +
    '<path d="M16 68 h68" stroke="#ff8fab" stroke-width="4"/>' +
    '<circle cx="28" cy="76" r="2.5" fill="#fa5252" stroke="none"/><circle cx="50" cy="78" r="2.5" fill="#fab005" stroke="none"/><circle cx="72" cy="76" r="2.5" fill="#4dabf7" stroke="none"/>';

  P.grapes =
    '<path d="M50 22 Q52 12 60 8" fill="none" stroke="#7a4a26" stroke-width="4"/>' +
    '<path d="M54 18 Q68 8 78 18 Q66 26 54 18 Z" fill="#51cf66"/>' +
    [[38, 32], [52, 30], [66, 34], [32, 46], [46, 44], [60, 46], [72, 48], [40, 58], [54, 58], [66, 60], [46, 72], [60, 72], [52, 84]]
      .map((p) => '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="8.5" fill="#9775fa"/>')
      .join('') +
    '<circle cx="35" cy="43" r="2" fill="#fff" stroke="none" opacity=".8"/><circle cx="49" cy="41" r="2" fill="#fff" stroke="none" opacity=".8"/>';

  P.lemon =
    '<path d="M12 52 Q14 46 22 44 C30 22 70 22 78 44 Q86 46 88 52 Q86 58 78 60 C70 82 30 82 22 60 Q14 58 12 52 Z" fill="#ffe066"/>' +
    '<path d="M32 40 q8 -8 18 -8" fill="none" stroke="#fff" stroke-width="4" opacity=".8"/>' +
    '<circle cx="40" cy="56" r="1.5" fill="#f59f00" stroke="none"/><circle cx="58" cy="60" r="1.5" fill="#f59f00" stroke="none"/><circle cx="64" cy="48" r="1.5" fill="#f59f00" stroke="none"/>';

  P.cherry =
    '<path d="M34 66 Q40 36 62 16 M66 66 Q62 40 62 16" fill="none" stroke="#2b8a3e" stroke-width="3.5"/>' +
    '<path d="M62 16 Q74 8 84 16 Q74 26 62 16 Z" fill="#51cf66"/>' +
    '<circle cx="32" cy="72" r="16" fill="#e03131"/><circle cx="68" cy="72" r="16" fill="#e03131"/>' +
    '<circle cx="26" cy="66" r="3.5" fill="#fff" stroke="none" opacity=".8"/><circle cx="62" cy="66" r="3.5" fill="#fff" stroke="none" opacity=".8"/>';

  // ---------- Things & toys ----------

  P.hat =
    '<path d="M28 70 L32 32 Q50 24 68 32 L72 70 Z" fill="#6c5ce7"/>' +
    '<path d="M30 56 L70 56 L71 66 L29 66 Z" fill="#ff6b6b"/>' +
    '<ellipse cx="50" cy="72" rx="40" ry="9" fill="#5a4bd1"/>';

  P.sock =
    '<path d="M34 12 H62 V58 Q62 62 66 64 L80 70 Q92 78 84 88 Q78 94 66 88 L38 74 Q30 70 32 60 Z" fill="#ff8787"/>' +
    '<path d="M34 12 H62 V22 H34 Z" fill="#fff"/>' +
    '<path d="M33 32 H62 M33 44 H62" stroke="#fff" stroke-width="6"/>' +
    '<path d="M70 66 Q82 70 86 88" fill="none" stroke="#fff" stroke-width="5"/>';

  P.cup =
    '<path d="M74 44 Q92 46 88 62 Q85 72 71 70" fill="none" stroke="' + INK + '" stroke-width="9"/>' +
    '<path d="M74 44 Q92 46 88 62 Q85 72 71 70" fill="none" stroke="#4dabf7" stroke-width="4"/>' +
    '<path d="M24 34 L76 34 L70 82 Q50 88 30 82 Z" fill="#4dabf7"/>' +
    '<path d="M50 52 q-6 -6 -10 0 q0 6 10 12 q10 -6 10 -12 q-4 -6 -10 0 z" fill="#fff" stroke="none"/>' +
    '<path d="M38 26 q-4 -6 0 -10 q4 -4 0 -10 M52 26 q-4 -6 0 -10 q4 -4 0 -10 M66 26 q-4 -6 0 -10" fill="none" stroke="#adb5bd" stroke-width="2.5"/>';

  P.ball =
    '<circle cx="50" cy="52" r="34" fill="#ff6b6b"/>' +
    '<path d="M50 18 Q30 52 50 86" fill="none" stroke="#ffd43b" stroke-width="8"/>' +
    '<path d="M50 18 Q70 52 50 86" fill="none" stroke="#4dabf7" stroke-width="8"/>' +
    '<circle cx="50" cy="52" r="34" fill="none"/>' +
    '<path d="M28 36 q4 -8 12 -10" fill="none" stroke="#fff" stroke-width="4" opacity=".8"/>';

  P.balloon =
    '<path d="M50 78 q-8 8 2 14 q8 6 -2 8" fill="none" stroke-width="2"/>' +
    '<path d="M46 80 L54 80 L50 72 Z" fill="#e03131"/>' +
    '<ellipse cx="50" cy="42" rx="26" ry="31" fill="#ff6b6b"/>' +
    '<path d="M36 28 q4 -8 12 -10" fill="none" stroke="#fff" stroke-width="4" opacity=".8"/>';

  P.kite =
    '<path d="M50 50 Q44 66 52 76 Q60 86 54 96" fill="none" stroke-width="2"/>' +
    '<path d="M48 70 l-6 -4 l0 8 z M52 70 l6 -4 l0 8 z M50 86 l-6 -4 l0 8 z M54 86 l6 -4 l0 8 z" fill="#ffd43b" stroke-width="2"/>' +
    '<path d="M50 8 L80 34 L50 56 L20 34 Z" fill="#4dabf7"/>' +
    '<path d="M50 8 L80 34 L50 34 Z M50 34 L50 56 L20 34 Z" fill="#ff6b6b"/>' +
    '<path d="M50 8 V56 M20 34 H80" fill="none" stroke-width="2"/>';

  P.drum =
    '<path d="M30 30 L12 8 M70 30 L88 8" stroke="#a0673b" stroke-width="5"/>' +
    '<circle cx="12" cy="8" r="4" fill="#fff"/><circle cx="88" cy="8" r="4" fill="#fff"/>' +
    '<path d="M18 40 V74 Q50 90 82 74 V40 Z" fill="#ff6b6b"/>' +
    '<path d="M18 46 L32 76 L46 50 L58 80 L70 50 L82 72" fill="none" stroke="#ffd43b" stroke-width="3"/>' +
    '<ellipse cx="50" cy="40" rx="32" ry="10" fill="#fff4e6"/>';

  P.bell =
    '<path d="M50 16 a6 6 0 1 1 0.1 0" fill="none" stroke-width="3"/>' +
    '<path d="M50 20 C30 20 28 40 28 56 C28 66 20 70 16 76 H84 C80 70 72 66 72 56 C72 40 70 20 50 20 Z" fill="#fcc419"/>' +
    '<rect x="14" y="74" width="72" height="8" rx="4" fill="#f59f00"/>' +
    '<circle cx="50" cy="88" r="6" fill="#f59f00"/>' +
    '<path d="M38 34 q-4 8 -4 20" fill="none" stroke="#fff" stroke-width="4" opacity=".8"/>';

  P.book =
    '<path d="M50 28 Q32 18 12 22 V80 Q32 76 50 86 Z" fill="#fff"/>' +
    '<path d="M50 28 Q68 18 88 22 V80 Q68 76 50 86 Z" fill="#fff"/>' +
    '<path d="M12 80 Q32 76 50 86 Q68 76 88 80 V86 Q68 82 50 92 Q32 82 12 86 Z" fill="#4dabf7"/>' +
    '<path d="M20 36 q12 -3 22 2 M20 46 q12 -3 22 2 M20 56 q12 -3 22 2 M58 38 q10 -5 22 -2 M58 48 q10 -5 22 -2 M58 58 q10 -5 22 -2" fill="none" stroke="#adb5bd" stroke-width="2"/>';

  P.key =
    '<circle cx="28" cy="50" r="16" fill="none" stroke="' + INK + '" stroke-width="13"/>' +
    '<circle cx="28" cy="50" r="16" fill="none" stroke="#fcc419" stroke-width="7"/>' +
    '<path d="M44 45 H90 V55 H86 V66 H78 V55 H72 V62 H64 V55 H44 Z" fill="#fcc419"/>';

  P.clock =
    '<circle cx="24" cy="20" r="10" fill="#4c6ef5"/><circle cx="76" cy="20" r="10" fill="#4c6ef5"/>' +
    '<path d="M28 80 L20 90 M72 80 L80 90" stroke-width="5"/>' +
    '<circle cx="50" cy="54" r="34" fill="#fff" stroke-width="7" stroke="#4c6ef5"/>' +
    '<circle cx="50" cy="54" r="38" fill="none"/>' +
    ring(12, 50, 54, 26, (x, y) => '<circle cx="' + x + '" cy="' + y + '" r="1.8" fill="' + INK + '" stroke="none"/>') +
    '<path d="M50 54 V36 M50 54 L62 60" stroke-width="4"/>' +
    '<circle cx="50" cy="54" r="3.5" fill="#fa5252" stroke="none"/>';

  P.umbrella =
    '<path d="M50 50 V82 Q50 90 42 90 Q34 90 34 82" fill="none" stroke-width="5"/>' +
    '<path d="M50 12 C24 12 10 32 10 50 Q16 44 23 50 Q30 44 37 50 Q43 44 50 50 Q57 44 63 50 Q70 44 77 50 Q84 44 90 50 C90 32 76 12 50 12 Z" fill="#cc5de8"/>' +
    '<path d="M50 12 Q38 30 37 50 M50 12 Q62 30 63 50" fill="none" stroke-width="2"/>' +
    '<path d="M50 12 V6" stroke-width="4"/>';

  P.bed =
    '<rect x="10" y="30" width="12" height="56" rx="4" fill="#a0673b"/>' +
    '<rect x="78" y="48" width="10" height="38" rx="4" fill="#a0673b"/>' +
    '<rect x="16" y="58" width="68" height="16" rx="3" fill="#c98b52"/>' +
    '<rect x="24" y="44" width="22" height="14" rx="7" fill="#fff"/>' +
    '<path d="M42 48 H80 Q84 48 84 54 V62 H40 Z" fill="#74c0fc"/>' +
    '<path d="M50 54 h4 M62 52 h4 M72 56 h4" stroke="#fff" stroke-width="3"/>';

  P.house =
    '<rect x="62" y="22" width="10" height="20" fill="#a0673b"/>' +
    '<rect x="22" y="46" width="56" height="40" fill="#ffe066"/>' +
    '<path d="M12 50 L50 18 L88 50 Z" fill="#ff6b6b"/>' +
    '<rect x="44" y="62" width="14" height="24" rx="2" fill="#a0673b"/>' +
    '<circle cx="54" cy="75" r="1.5" fill="' + INK + '" stroke="none"/>' +
    '<rect x="28" y="56" width="12" height="12" fill="#74c0fc"/><path d="M34 56 V68 M28 62 H40" stroke-width="2"/>' +
    '<rect x="64" y="56" width="10" height="10" fill="#74c0fc"/>';

  P.car =
    '<path d="M26 52 L36 32 L66 32 L80 52 Z" fill="#ff6b6b"/>' +
    '<path d="M32 50 L39 37 L49 37 L49 50 Z M55 50 L55 37 L64 37 L73 50 Z" fill="#d0ebff"/>' +
    '<rect x="8" y="50" width="84" height="22" rx="8" fill="#ff6b6b"/>' +
    '<rect x="84" y="56" width="8" height="6" rx="2" fill="#ffe066"/>' +
    '<circle cx="28" cy="74" r="10" fill="#495057"/><circle cx="72" cy="74" r="10" fill="#495057"/>' +
    '<circle cx="28" cy="74" r="4" fill="#ced4da"/><circle cx="72" cy="74" r="4" fill="#ced4da"/>';

  P.bus =
    '<rect x="8" y="24" width="84" height="52" rx="8" fill="#ffc83d"/>' +
    '<rect x="16" y="32" width="16" height="16" rx="2" fill="#d0ebff"/><rect x="38" y="32" width="16" height="16" rx="2" fill="#d0ebff"/>' +
    '<rect x="60" y="32" width="12" height="16" rx="2" fill="#d0ebff"/>' +
    '<rect x="76" y="32" width="10" height="30" rx="2" fill="#d0ebff"/>' +
    '<path d="M8 56 H76" stroke="#e8590c" stroke-width="4"/>' +
    '<rect x="86" y="62" width="6" height="6" rx="2" fill="#fff"/>' +
    '<circle cx="28" cy="78" r="9" fill="#495057"/><circle cx="70" cy="78" r="9" fill="#495057"/>' +
    '<circle cx="28" cy="78" r="3.5" fill="#ced4da"/><circle cx="70" cy="78" r="3.5" fill="#ced4da"/>';

  P.boat =
    '<path d="M6 84 q8 -6 16 0 q8 6 16 0 q8 -6 16 0 q8 6 16 0 q8 -6 16 0" fill="none" stroke="#4dabf7" stroke-width="4"/>' +
    '<path d="M50 14 V66" stroke-width="4"/>' +
    '<path d="M54 18 L84 58 H54 Z" fill="#fff"/>' +
    '<path d="M46 26 L22 58 H46 Z" fill="#ff6b6b"/>' +
    '<path d="M12 66 H88 L76 82 H24 Z" fill="#a0673b"/>' +
    '<circle cx="36" cy="73" r="3" fill="#fff"/><circle cx="50" cy="73" r="3" fill="#fff"/><circle cx="64" cy="73" r="3" fill="#fff"/>';

  P.eye =
    '<path d="M10 50 Q50 14 90 50 Q50 86 10 50 Z" fill="#fff"/>' +
    '<circle cx="50" cy="50" r="17" fill="#4dabf7"/>' +
    '<circle cx="50" cy="50" r="8" fill="' + INK + '" stroke="none"/>' +
    '<circle cx="55" cy="45" r="3.5" fill="#fff" stroke="none"/>' +
    '<path d="M24 36 L18 28 M38 28 L35 19 M50 26 V16 M62 28 L65 19 M76 36 L82 28" fill="none"/>';

  // ---------- Nature ----------

  P.sun =
    ring(12, 50, 50, 34, (x, y, a) =>
      '<path d="M' + (50 + Math.cos(a) * 28) + ' ' + (50 + Math.sin(a) * 28) + ' L' + x + ' ' + y + '" stroke="#f59f00" stroke-width="5"/>') +
    '<circle cx="50" cy="50" r="23" fill="#ffd43b"/>' +
    eye(42, 46, 3) + eye(58, 46, 3) + cheeks(54, 13) +
    '<path d="M42 56 q8 7 16 0" fill="none"/>';

  P.moon =
    '<path d="M60 14 A36 36 0 0 0 60 86 A44 44 0 0 1 60 14 Z" fill="#ffe066"/>' +
    '<circle cx="36" cy="46" r="2.5" fill="' + INK + '" stroke="none"/>' +
    '<path d="M34 60 q4 4 8 1" fill="none" stroke-width="2"/>' +
    '<path d="M78 22 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 l6 -2 z" fill="#ffd43b" stroke-width="2"/>' +
    '<path d="M84 60 l1.5 4 l4 1.5 l-4 1.5 l-1.5 4 l-1.5 -4 l-4 -1.5 l4 -1.5 z" fill="#ffd43b" stroke-width="2"/>';

  P.star =
    '<path d="M50 12 L60 38 L87 40 L66 57 L73 84 L50 69 L27 84 L34 57 L13 40 L40 38 Z" fill="#ffd43b"/>' +
    eye(43, 50, 3) + eye(57, 50, 3) +
    '<path d="M45 58 q5 4 10 0" fill="none" stroke-width="2"/>';

  P.cloud =
    '<path d="M26 72 A16 16 0 0 1 24 40 A20 20 0 0 1 60 30 A18 18 0 0 1 84 50 A12 12 0 0 1 78 72 Z" fill="#f1f3f5"/>' +
    eye(42, 54, 3) + eye(60, 54, 3) +
    '<path d="M46 62 q5 4 10 0" fill="none" stroke-width="2"/>' +
    '<path d="M30 84 l-2 6 M50 84 l-2 6 M70 84 l-2 6" stroke="#4dabf7" stroke-width="3"/>';

  P.tree =
    '<path d="M44 88 L46 58 H54 L56 88 Z" fill="#a0673b"/>' +
    '<circle cx="32" cy="50" r="17" fill="#40c057"/><circle cx="68" cy="50" r="17" fill="#40c057"/>' +
    '<circle cx="50" cy="34" r="22" fill="#51cf66"/>' +
    '<circle cx="50" cy="50" r="16" fill="#51cf66" stroke="none"/>' +
    '<circle cx="40" cy="30" r="3.5" fill="#fa5252"/><circle cx="62" cy="40" r="3.5" fill="#fa5252"/><circle cx="30" cy="52" r="3.5" fill="#fa5252"/>';

  P.flower =
    '<path d="M50 56 V92" stroke="#2b8a3e" stroke-width="4"/>' +
    '<path d="M50 80 Q36 66 26 72 Q36 84 50 80 Z M50 72 Q64 60 74 66 Q64 78 50 72 Z" fill="#51cf66"/>' +
    ring(6, 50, 36, 15, (x, y) => '<circle cx="' + x + '" cy="' + y + '" r="11" fill="#ff8fab"/>') +
    '<circle cx="50" cy="36" r="10" fill="#ffd43b"/>';

  P.leaf =
    '<path d="M18 82 C18 40 48 16 84 16 C84 52 60 82 18 82 Z" fill="#51cf66"/>' +
    '<path d="M14 86 L70 30" fill="none" stroke="#2b8a3e"/>' +
    '<path d="M36 64 l-4 -14 M36 64 l14 4 M52 48 l-2 -14 M52 48 l14 2" fill="none" stroke="#2b8a3e" stroke-width="2"/>';

  LG.PICTURES = P;
  LG.picture = function (id) {
    return P[id] ? svg(P[id]) : '';
  };
})();
