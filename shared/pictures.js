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

  // ---------- More animals ----------

  P.rabbit =
    '<ellipse cx="38" cy="28" rx="9" ry="22" fill="#f1f3f5" transform="rotate(-10 38 28)"/>' +
    '<ellipse cx="62" cy="28" rx="9" ry="22" fill="#f1f3f5" transform="rotate(10 62 28)"/>' +
    '<ellipse cx="38" cy="30" rx="4" ry="14" fill="#ffc2d1" stroke="none" transform="rotate(-10 38 30)"/>' +
    '<ellipse cx="62" cy="30" rx="4" ry="14" fill="#ffc2d1" stroke="none" transform="rotate(10 62 30)"/>' +
    '<circle cx="50" cy="62" r="26" fill="#f1f3f5"/>' +
    eye(40, 56, 4) + eye(60, 56, 4) + cheeks(68, 17) +
    '<ellipse cx="50" cy="66" rx="4" ry="3" fill="#ff6b8a"/>' +
    '<path d="M50 69 v4 M46 73 h8 v5 h-8 z" fill="#fff" stroke-width="2"/>' +
    '<path d="M36 68 h-14 M64 68 h14" fill="none" stroke-width="2"/>';

  P.elephant =
    '<circle cx="22" cy="48" r="20" fill="#adb5bd"/><circle cx="78" cy="48" r="20" fill="#adb5bd"/>' +
    '<circle cx="22" cy="48" r="12" fill="#ffc2d1" stroke="none" opacity=".6"/><circle cx="78" cy="48" r="12" fill="#ffc2d1" stroke="none" opacity=".6"/>' +
    '<path d="M50 60 Q46 80 54 86 Q62 90 64 82" fill="none" stroke="' + INK + '" stroke-width="15"/>' +
    '<path d="M50 60 Q46 80 54 86 Q62 90 64 82" fill="none" stroke="#ced4da" stroke-width="9"/>' +
    '<circle cx="50" cy="46" r="25" fill="#ced4da"/>' +
    '<path d="M50 56 Q46 70 48 76" fill="none" stroke="#ced4da" stroke-width="9"/>' +
    eye(41, 42, 4) + eye(59, 42, 4) + cheeks(54, 17) +
    '<path d="M38 62 q-4 6 -10 6 M62 62 q4 6 10 6" fill="#fff" stroke-width="2.5"/>';

  P.monkey =
    '<circle cx="20" cy="50" r="11" fill="#a0673b"/><circle cx="80" cy="50" r="11" fill="#a0673b"/>' +
    '<circle cx="20" cy="50" r="6" fill="#f3d2a8" stroke="none"/><circle cx="80" cy="50" r="6" fill="#f3d2a8" stroke="none"/>' +
    '<circle cx="50" cy="50" r="30" fill="#a0673b"/>' +
    '<circle cx="40" cy="46" r="12" fill="#f3d2a8" stroke="none"/><circle cx="60" cy="46" r="12" fill="#f3d2a8" stroke="none"/>' +
    '<ellipse cx="50" cy="64" rx="20" ry="14" fill="#f3d2a8" stroke="none"/>' +
    eye(41, 46, 4) + eye(59, 46, 4) +
    '<circle cx="46" cy="60" r="1.8" fill="' + INK + '" stroke="none"/><circle cx="54" cy="60" r="1.8" fill="' + INK + '" stroke="none"/>' +
    '<path d="M40 66 q10 9 20 0" fill="none"/>';

  P.penguin =
    '<ellipse cx="38" cy="88" rx="9" ry="4" fill="#fd7e14"/><ellipse cx="62" cy="88" rx="9" ry="4" fill="#fd7e14"/>' +
    '<path d="M26 46 Q12 60 18 72 Q26 64 28 58 Z M74 46 Q88 60 82 72 Q74 64 72 58 Z" fill="#343a40"/>' +
    '<ellipse cx="50" cy="54" rx="26" ry="34" fill="#343a40"/>' +
    '<path d="M50 32 C36 32 32 44 34 56 C34 74 40 84 50 84 C60 84 66 74 66 56 C68 44 64 32 50 32 Z" fill="#fff" stroke="none"/>' +
    '<circle cx="42" cy="40" r="5" fill="#fff" stroke="none"/><circle cx="58" cy="40" r="5" fill="#fff" stroke="none"/>' +
    eye(42, 40, 3) + eye(58, 40, 3) + cheeks(50, 14) +
    '<path d="M45 47 h10 l-5 6 z" fill="#fd7e14"/>';

  P.turtle =
    '<ellipse cx="28" cy="72" rx="8" ry="7" fill="#8ce99a"/><ellipse cx="66" cy="72" rx="8" ry="7" fill="#8ce99a"/>' +
    '<path d="M12 62 l-6 4 l6 2 z" fill="#8ce99a"/>' +
    '<circle cx="84" cy="54" r="11" fill="#8ce99a"/>' + eye(87, 51, 3) +
    '<path d="M84 60 q4 3 8 0" fill="none" stroke-width="2"/>' +
    '<path d="M12 66 Q14 28 46 28 Q78 28 80 66 Z" fill="#40c057"/>' +
    '<path d="M36 38 L46 32 L56 38 L56 50 L46 56 L36 50 Z M22 56 L30 50 L36 50 M56 50 L64 52 L70 60 M46 56 L46 66 M36 50 L28 66 M56 50 L62 66" fill="#69db7c" stroke-width="2"/>' +
    '<path d="M10 66 H82" stroke-width="4"/>';

  P.butterfly =
    '<ellipse cx="31" cy="38" rx="20" ry="17" fill="#cc5de8" transform="rotate(-15 31 38)"/>' +
    '<ellipse cx="69" cy="38" rx="20" ry="17" fill="#cc5de8" transform="rotate(15 69 38)"/>' +
    '<ellipse cx="36" cy="66" rx="14" ry="12" fill="#ff8fab" transform="rotate(20 36 66)"/>' +
    '<ellipse cx="64" cy="66" rx="14" ry="12" fill="#ff8fab" transform="rotate(-20 64 66)"/>' +
    '<circle cx="28" cy="36" r="6" fill="#ffd43b" stroke="none"/><circle cx="72" cy="36" r="6" fill="#ffd43b" stroke="none"/>' +
    '<circle cx="35" cy="67" r="4" fill="#fff" stroke="none"/><circle cx="65" cy="67" r="4" fill="#fff" stroke="none"/>' +
    '<path d="M48 26 Q42 14 36 12 M52 26 Q58 14 64 12" fill="none" stroke-width="2.5"/>' +
    '<circle cx="36" cy="12" r="3" fill="' + INK + '"/><circle cx="64" cy="12" r="3" fill="' + INK + '"/>' +
    '<ellipse cx="50" cy="52" rx="6" ry="26" fill="#495057"/>';

  P.ladybug =
    '<path d="M24 50 h-10 M22 64 h-10 M26 76 l-8 6 M76 50 h10 M78 64 h10 M74 76 l8 6" stroke-width="3"/>' +
    '<circle cx="50" cy="30" r="14" fill="' + INK + '"/>' +
    '<circle cx="44" cy="26" r="3.5" fill="#fff" stroke="none"/><circle cx="56" cy="26" r="3.5" fill="#fff" stroke="none"/>' +
    '<circle cx="50" cy="58" r="29" fill="#fa5252"/>' +
    '<path d="M50 29 V87" stroke-width="3"/>' +
    '<circle cx="36" cy="48" r="5.5" fill="' + INK + '" stroke="none"/><circle cx="64" cy="48" r="5.5" fill="' + INK + '" stroke="none"/>' +
    '<circle cx="34" cy="68" r="5" fill="' + INK + '" stroke="none"/><circle cx="66" cy="68" r="5" fill="' + INK + '" stroke="none"/>' +
    '<circle cx="44" cy="80" r="3.5" fill="' + INK + '" stroke="none"/><circle cx="56" cy="80" r="3.5" fill="' + INK + '" stroke="none"/>';

  P.spider =
    '<path d="M50 4 V30" stroke-width="2"/>' +
    '<path d="M38 52 Q22 40 12 50 M38 58 Q20 56 10 66 M40 64 Q24 70 18 84 M42 68 Q34 80 32 92 M62 52 Q78 40 88 50 M62 58 Q80 56 90 66 M60 64 Q76 70 82 84 M58 68 Q66 80 68 92" fill="none" stroke-width="4"/>' +
    '<circle cx="50" cy="62" r="17" fill="#495057"/>' +
    '<circle cx="50" cy="40" r="12" fill="#495057"/>' +
    '<circle cx="45" cy="38" r="4.5" fill="#fff" stroke="none"/><circle cx="55" cy="38" r="4.5" fill="#fff" stroke="none"/>' +
    eye(45, 38, 2.5) + eye(55, 38, 2.5) +
    '<path d="M46 45 q4 3 8 0" fill="none" stroke="#fff" stroke-width="2"/>';

  P.whale =
    '<path d="M34 30 q-2 -10 -8 -14 M34 30 q0 -12 0 -18 M34 30 q2 -10 8 -14" fill="none" stroke="#74c0fc" stroke-width="3"/>' +
    '<path d="M10 60 Q12 34 46 34 Q74 34 80 56 Q86 44 94 40 Q92 56 88 62 Q94 70 94 80 Q84 74 80 68 Q66 84 40 84 Q12 84 10 60 Z" fill="#4dabf7"/>' +
    '<path d="M14 66 Q30 80 54 76 Q70 74 78 66 Q66 84 40 84 Q18 82 14 66 Z" fill="#d0ebff"/>' +
    eye(28, 54, 4) +
    '<path d="M18 64 q8 6 16 2" fill="none" stroke-width="2.5"/>' +
    '<path d="M46 60 q6 8 14 6" fill="none" stroke-width="2"/>';

  P.hen =
    '<path d="M46 80 v10 M60 80 v10 M42 90 h8 M56 90 h8" stroke="#fd7e14" stroke-width="3"/>' +
    '<path d="M74 46 Q90 30 92 46 Q94 56 82 62 Z" fill="#fff"/>' +
    '<ellipse cx="54" cy="62" rx="28" ry="21" fill="#fff"/>' +
    '<path d="M50 56 q10 14 24 4" fill="none" stroke-width="2.5"/>' +
    '<circle cx="26" cy="22" r="5" fill="#fa5252"/><circle cx="33" cy="20" r="5" fill="#fa5252"/><circle cx="40" cy="24" r="4.5" fill="#fa5252"/>' +
    '<circle cx="32" cy="38" r="14" fill="#fff"/>' +
    '<circle cx="32" cy="46" r="10" fill="#fff" stroke="none"/>' +
    eye(30, 35, 3.5) +
    '<path d="M19 38 L10 42 L19 45 Z" fill="#fcc419"/>' +
    '<path d="M22 46 q-3 8 2 9 q4 -1 2 -9" fill="#fa5252"/>';

  P.fox =
    '<path d="M20 44 L22 12 L44 30 Z" fill="#ff922b"/><path d="M80 44 L78 12 L56 30 Z" fill="#ff922b"/>' +
    '<path d="M26 34 L27 20 L37 29 Z M74 34 L73 20 L63 29 Z" fill="' + INK + '" stroke="none"/>' +
    '<path d="M14 40 Q50 18 86 40 Q82 66 50 86 Q18 66 14 40 Z" fill="#ff922b"/>' +
    '<path d="M18 52 Q36 54 50 66 Q64 54 82 52 Q74 72 50 86 Q26 72 18 52 Z" fill="#fff"/>' +
    eye(38, 48, 4) + eye(62, 48, 4) +
    '<ellipse cx="50" cy="78" rx="6" ry="4.5" fill="' + INK + '"/>';

  P.crab =
    '<path d="M30 62 L20 46 L18 36 M70 62 L80 46 L82 36" fill="none" stroke="#fa5252" stroke-width="5"/>' +
    '<path d="M16 46 a10 10 0 1 1 10 -12 l-8 4 z" fill="#fa5252"/><path d="M84 46 a10 10 0 1 0 -10 -12 l8 4 z" fill="#fa5252"/>' +
    '<path d="M26 66 l-14 6 M28 72 l-12 10 M74 66 l14 6 M72 72 l12 10" fill="none" stroke-width="4"/>' +
    '<path d="M42 50 V36 M58 50 V36" stroke-width="3"/>' +
    '<circle cx="42" cy="32" r="6" fill="#fff"/><circle cx="58" cy="32" r="6" fill="#fff"/>' +
    eye(42, 32, 3) + eye(58, 32, 3) +
    '<ellipse cx="50" cy="64" rx="28" ry="18" fill="#fa5252"/>' +
    '<path d="M42 66 q8 7 16 0" fill="none"/>' + cheeks(62, 16);

  P.octopus =
    [18, 32, 50, 68, 82].map((x, i) => {
      const d = 'M' + (x + (50 - x) * 0.25) + ' 56 Q' + x + ' 72 ' + (x + (i % 2 ? 8 : -8)) + ' 80 Q' + (x + (i % 2 ? 14 : -14)) + ' 88 ' + (x + (i % 2 ? 6 : -6)) + ' 92';
      return '<path d="' + d + '" fill="none" stroke="' + INK + '" stroke-width="12"/><path d="' + d + '" fill="none" stroke="#9775fa" stroke-width="7"/>';
    }).join('') +
    '<path d="M20 60 Q18 16 50 16 Q82 16 80 60 Q50 68 20 60 Z" fill="#9775fa"/>' +
    eye(40, 42, 4.5) + eye(60, 42, 4.5) + cheeks(52, 18) +
    '<path d="M44 52 q6 5 12 0" fill="none"/>' +
    '<circle cx="64" cy="26" r="3" fill="#b197fc" stroke="none"/><circle cx="34" cy="30" r="2" fill="#b197fc" stroke="none"/>';

  // ---------- More food ----------

  P.orange =
    '<circle cx="50" cy="56" r="32" fill="#ff922b"/>' +
    '<path d="M50 24 Q50 16 54 12" fill="none" stroke="#7a4a26" stroke-width="4"/>' +
    '<path d="M52 22 Q62 10 74 16 Q64 26 52 22 Z" fill="#51cf66"/>' +
    '<path d="M30 44 q4 -8 12 -10" fill="none" stroke="#fff" stroke-width="4" opacity=".7"/>' +
    '<circle cx="60" cy="56" r="1.5" fill="#e8590c" stroke="none"/><circle cx="44" cy="68" r="1.5" fill="#e8590c" stroke="none"/><circle cx="66" cy="72" r="1.5" fill="#e8590c" stroke="none"/>';

  P.strawberry =
    '<path d="M50 90 C22 76 14 46 26 34 Q50 26 74 34 C86 46 78 76 50 90 Z" fill="#fa5252"/>' +
    [[36, 46], [50, 44], [64, 46], [30, 58], [44, 58], [58, 58], [70, 58], [38, 70], [52, 72], [62, 70], [48, 82]]
      .map((p) => '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="1.6" ry="2.6" fill="#ffe066" stroke="none"/>')
      .join('') +
    '<path d="M28 34 L36 22 L44 30 L50 16 L56 30 L64 22 L72 34 Q50 42 28 34 Z" fill="#51cf66"/>';

  P.watermelon =
    '<path d="M8 36 A42 42 0 0 0 92 36 Z" fill="#40c057"/>' +
    '<path d="M14 36 A36 36 0 0 0 86 36 Z" fill="#d8f5a2" stroke="none"/>' +
    '<path d="M18 36 A32 32 0 0 0 82 36 Z" fill="#ff6b6b" stroke="none"/>' +
    '<path d="M8 36 H92" stroke-width="3"/>' +
    [[34, 48], [50, 52], [66, 48], [42, 62], [58, 62], [50, 74]]
      .map((p) => '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="2" ry="3.2" fill="' + INK + '" stroke="none"/>')
      .join('');

  P.tomato =
    '<ellipse cx="50" cy="58" rx="33" ry="29" fill="#fa5252"/>' +
    '<path d="M50 32 L40 26 L44 34 L32 34 L44 38 L50 44 L56 38 L68 34 L56 34 L60 26 Z" fill="#51cf66"/>' +
    '<path d="M50 32 V22" stroke="#2b8a3e" stroke-width="4"/>' +
    '<path d="M28 50 q2 -8 10 -12" fill="none" stroke="#fff" stroke-width="4" opacity=".7"/>';

  P.mushroom =
    '<path d="M36 54 Q32 80 40 86 H60 Q68 80 64 54 Z" fill="#fff4e6"/>' +
    '<path d="M10 56 Q12 16 50 16 Q88 16 90 56 Q50 64 10 56 Z" fill="#fa5252"/>' +
    '<circle cx="34" cy="38" r="6" fill="#fff" stroke="none"/><circle cx="56" cy="28" r="5" fill="#fff" stroke="none"/>' +
    '<circle cx="68" cy="44" r="6" fill="#fff" stroke="none"/><circle cx="48" cy="48" r="4" fill="#fff" stroke="none"/>' +
    eye(44, 70, 3) + eye(56, 70, 3) +
    '<path d="M47 77 q3 3 6 0" fill="none" stroke-width="2"/>';

  P.icecream =
    '<path d="M32 50 L50 92 L68 50 Z" fill="#e8a25c"/>' +
    '<path d="M36 56 H64 M38 62 L56 76 M62 62 L44 76" fill="none" stroke="#b5651d" stroke-width="2"/>' +
    '<circle cx="39" cy="46" r="13" fill="#ff8fab"/><circle cx="61" cy="46" r="13" fill="#8ce99a"/>' +
    '<circle cx="50" cy="30" r="14" fill="#fff3bf"/>' +
    '<path d="M50 16 Q50 10 56 8" fill="none" stroke="#2b8a3e" stroke-width="2.5"/>' +
    '<circle cx="50" cy="16" r="5" fill="#e03131"/>';

  P.pizza =
    '<path d="M50 92 L14 24 Q50 8 86 24 Z" fill="#ffd43b"/>' +
    '<path d="M14 24 Q50 8 86 24 L81 34 Q50 20 19 34 Z" fill="#e8a25c"/>' +
    '<circle cx="40" cy="44" r="7" fill="#e03131"/><circle cx="60" cy="48" r="7" fill="#e03131"/><circle cx="50" cy="68" r="6" fill="#e03131"/>' +
    '<path d="M58 62 q4 -2 6 2 M36 58 q4 -2 6 2" fill="none" stroke="#2b8a3e" stroke-width="3"/>';

  P.cookie =
    '<circle cx="50" cy="50" r="35" fill="#e8a25c"/>' +
    [[36, 34, 5], [58, 30, 4], [68, 50, 5], [40, 56, 4], [56, 66, 5], [30, 70, 3.5], [52, 46, 3]]
      .map((p) => '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + p[2] + '" fill="#7a4a26" stroke="none"/>')
      .join('');

  P.pineapple =
    '<path d="M50 34 L40 8 L50 18 L54 4 L58 20 L70 8 L60 34 Z" fill="#51cf66"/>' +
    '<ellipse cx="50" cy="62" rx="24" ry="29" fill="#fcc419"/>' +
    [[40, 44], [56, 44], [32, 58], [48, 58], [64, 58], [40, 72], [56, 72], [48, 84]]
      .map((p) => '<path d="M' + (p[0] - 4) + ' ' + (p[1] - 3) + ' l4 3 l4 -3" fill="none" stroke="#e67700" stroke-width="2"/>')
      .join('');

  // ---------- More things ----------

  P.shoe =
    '<path d="M10 70 L12 44 Q14 38 22 40 L40 44 Q50 32 62 42 L84 56 Q92 60 90 70 Z" fill="#4dabf7"/>' +
    '<path d="M8 70 H92 V77 Q92 81 88 81 H12 Q8 81 8 77 Z" fill="#fff"/>' +
    '<path d="M42 48 l6 -4 M48 52 l6 -4 M54 56 l6 -4" stroke="#fff" stroke-width="3"/>' +
    '<path d="M70 58 Q80 58 88 66" fill="none" stroke="#fff" stroke-width="3"/>';

  P.shirt =
    '<path d="M34 16 Q50 26 66 16 L88 28 L80 44 L70 40 V86 H30 V40 L20 44 L12 28 Z" fill="#4dabf7"/>' +
    '<path d="M34 16 Q50 30 66 16" fill="none"/>' +
    '<path d="M50 44 L54 54 L64 55 L56 62 L58 72 L50 66 L42 72 L44 62 L36 55 L46 54 Z" fill="#ffd43b" stroke-width="2"/>';

  P.glasses =
    '<path d="M14 46 L6 38 M86 46 L94 38" stroke-width="4"/>' +
    '<path d="M44 50 Q50 44 56 50" fill="none" stroke-width="4"/>' +
    '<circle cx="29" cy="54" r="16" fill="#d0ebff" stroke-width="5"/><circle cx="71" cy="54" r="16" fill="#d0ebff" stroke-width="5"/>' +
    '<path d="M22 48 l6 -4 M64 48 l6 -4" stroke="#fff" stroke-width="3"/>';

  P.scissors =
    '<path d="M46 58 L72 10 Q78 14 54 60 Z" fill="#ced4da"/>' +
    '<path d="M54 58 L28 10 Q22 14 46 60 Z" fill="#ced4da"/>' +
    '<path d="M47 58 L38 66 M53 58 L62 66" stroke="' + INK + '" stroke-width="8"/>' +
    '<circle cx="33" cy="75" r="12" fill="none" stroke="' + INK + '" stroke-width="10"/><circle cx="67" cy="75" r="12" fill="none" stroke="' + INK + '" stroke-width="10"/>' +
    '<circle cx="33" cy="75" r="12" fill="none" stroke="#fa5252" stroke-width="5"/><circle cx="67" cy="75" r="12" fill="none" stroke="#fa5252" stroke-width="5"/>' +
    '<circle cx="50" cy="56" r="3" fill="#fff"/>';

  P.pencil =
    '<g transform="rotate(-40 50 50)">' +
    '<rect x="8" y="42" width="12" height="16" rx="3" fill="#ff8fab"/>' +
    '<rect x="17" y="42" width="6" height="16" fill="#adb5bd"/>' +
    '<rect x="23" y="42" width="48" height="16" fill="#ffd43b"/>' +
    '<path d="M23 47.5 H71 M23 52.5 H71" stroke="#f59f00" stroke-width="1.5"/>' +
    '<path d="M71 42 L90 50 L71 58 Z" fill="#f3d9b1"/>' +
    '<path d="M83 47 L90 50 L83 53 Z" fill="' + INK + '"/>' +
    '</g>';

  P.chair =
    '<rect x="28" y="12" width="44" height="42" rx="5" fill="#c98b52"/>' +
    '<path d="M40 18 V50 M50 18 V50 M60 18 V50" stroke="#a0673b" stroke-width="3"/>' +
    '<rect x="26" y="62" width="6" height="28" rx="2" fill="#a0673b"/><rect x="68" y="62" width="6" height="28" rx="2" fill="#a0673b"/>' +
    '<rect x="20" y="52" width="60" height="12" rx="4" fill="#e8a25c"/>';

  P.table =
    '<rect x="16" y="50" width="8" height="38" rx="2" fill="#a0673b"/><rect x="76" y="50" width="8" height="38" rx="2" fill="#a0673b"/>' +
    '<rect x="8" y="42" width="84" height="12" rx="4" fill="#c98b52"/>' +
    '<path d="M38 42 V30 Q38 24 44 24 H52 Q58 24 58 30 V42" fill="#74c0fc"/>' +
    '<circle cx="44" cy="16" r="6" fill="#ff8fab"/><circle cx="54" cy="16" r="6" fill="#ffd43b"/>' +
    '<path d="M45 22 L46 24 M53 22 L52 24" stroke="#2b8a3e" stroke-width="2"/>';

  P.lamp =
    '<ellipse cx="50" cy="86" rx="20" ry="6" fill="#868e96"/>' +
    '<rect x="46" y="50" width="8" height="34" fill="#adb5bd"/>' +
    '<path d="M30 16 H70 L84 52 H16 Z" fill="#ffd43b"/>' +
    '<path d="M28 36 H72" stroke="#f59f00" stroke-width="3"/>';

  P.door =
    '<rect x="24" y="8" width="52" height="84" rx="4" fill="#c98b52"/>' +
    '<rect x="32" y="16" width="36" height="28" rx="3" fill="#e8a25c"/>' +
    '<rect x="32" y="52" width="36" height="32" rx="3" fill="#e8a25c"/>' +
    '<circle cx="66" cy="50" r="4" fill="#fcc419"/>' +
    '<path d="M14 92 H86" stroke-width="4"/>';

  P.spoon =
    '<g transform="rotate(30 50 50)">' +
    '<rect x="45" y="42" width="10" height="50" rx="5" fill="#ced4da"/>' +
    '<ellipse cx="50" cy="26" rx="15" ry="19" fill="#ced4da"/>' +
    '<path d="M44 16 q-4 8 -2 16" fill="none" stroke="#fff" stroke-width="3"/>' +
    '</g>';

  P.fork =
    '<g transform="rotate(-30 50 50)">' +
    '<path d="M38 8 V32 M46 8 V32 M54 8 V32 M62 8 V32" stroke="' + INK + '" stroke-width="7"/>' +
    '<path d="M38 8 V32 M46 8 V32 M54 8 V32 M62 8 V32" stroke="#ced4da" stroke-width="3"/>' +
    '<path d="M35 30 H65 Q65 46 55 50 H45 Q35 46 35 30 Z" fill="#ced4da"/>' +
    '<rect x="45" y="48" width="10" height="44" rx="5" fill="#ced4da"/>' +
    '</g>';

  P.guitar =
    '<rect x="46" y="10" width="8" height="40" fill="#7a4a26"/>' +
    '<rect x="42" y="4" width="16" height="12" rx="3" fill="#a0673b"/>' +
    '<circle cx="50" cy="72" r="21" fill="#f08c00"/><circle cx="50" cy="48" r="15" fill="#f08c00"/>' +
    '<circle cx="50" cy="72" r="19.5" fill="#f08c00" stroke="none"/><circle cx="50" cy="48" r="13.5" fill="#f08c00" stroke="none"/>' +
    '<circle cx="50" cy="60" r="7" fill="' + INK + '"/>' +
    '<rect x="42" y="78" width="16" height="5" rx="2" fill="#7a4a26"/>' +
    '<path d="M47.5 14 V80 M50 14 V80 M52.5 14 V80" stroke="#fff" stroke-width="0.8"/>' +
    '<path d="M38 30 h4 M38 38 h4 M58 30 h4 M58 38 h4" stroke-width="2"/>';

  P.rocket =
    '<path d="M40 74 Q50 98 60 74 Z" fill="#ffd43b"/><path d="M44 74 Q50 88 56 74 Z" fill="#ff922b" stroke="none"/>' +
    '<path d="M34 50 L20 72 L34 70 Z M66 50 L80 72 L66 70 Z" fill="#fa5252"/>' +
    '<path d="M50 6 Q70 26 66 74 H34 Q30 26 50 6 Z" fill="#f1f3f5"/>' +
    '<path d="M50 6 Q62 16 65 28 H35 Q38 16 50 6 Z" fill="#fa5252"/>' +
    '<circle cx="50" cy="44" r="9" fill="#74c0fc" stroke-width="4"/>' +
    '<path d="M46 40 q2 -2 5 -2" fill="none" stroke="#fff" stroke-width="2"/>';

  P.train =
    '<circle cx="22" cy="18" r="5" fill="#dee2e6"/><circle cx="30" cy="10" r="6" fill="#dee2e6"/>' +
    '<rect x="18" y="26" width="12" height="18" fill="#495057"/>' +
    '<rect x="10" y="44" width="50" height="26" rx="4" fill="#4dabf7"/>' +
    '<rect x="56" y="28" width="32" height="42" rx="3" fill="#fa5252"/>' +
    '<rect x="52" y="22" width="40" height="8" rx="3" fill="#495057"/>' +
    '<rect x="62" y="34" width="20" height="16" rx="2" fill="#d0ebff"/>' +
    '<path d="M10 62 L2 74 H10 Z" fill="#fcc419"/>' +
    '<circle cx="22" cy="74" r="9" fill="#495057"/><circle cx="44" cy="74" r="9" fill="#495057"/><circle cx="72" cy="74" r="11" fill="#495057"/>' +
    '<circle cx="22" cy="74" r="3" fill="#ced4da"/><circle cx="44" cy="74" r="3" fill="#ced4da"/><circle cx="72" cy="74" r="4" fill="#ced4da"/>' +
    '<path d="M6 88 H94" stroke-width="3"/>';

  P.plane =
    '<path d="M18 44 L10 22 H22 L36 44 Z" fill="#fa5252"/>' +
    '<path d="M8 54 Q10 44 28 44 H78 Q92 46 94 54 Q92 62 80 62 H18 Q8 62 8 54 Z" fill="#f1f3f5"/>' +
    '<path d="M80 46 Q88 48 92 52 H80 Z" fill="#74c0fc"/>' +
    '<circle cx="40" cy="52" r="3" fill="#74c0fc"/><circle cx="52" cy="52" r="3" fill="#74c0fc"/><circle cx="64" cy="52" r="3" fill="#74c0fc"/>' +
    '<path d="M42 58 H62 L46 82 H36 Z" fill="#4dabf7"/>' +
    '<path d="M20 58 H30 L22 66 H16 Z" fill="#4dabf7"/>';

  P.bike =
    '<circle cx="24" cy="66" r="17" fill="none" stroke-width="5"/><circle cx="76" cy="66" r="17" fill="none" stroke-width="5"/>' +
    '<path d="M24 66 L40 40 L50 66 Z M40 40 H68 L50 66 M68 40 L76 66" fill="none" stroke="' + INK + '" stroke-width="7"/>' +
    '<path d="M24 66 L40 40 L50 66 Z M40 40 H68 L50 66 M68 40 L76 66" fill="none" stroke="#fa5252" stroke-width="3.5"/>' +
    '<path d="M40 40 L37 30 M32 30 H44" fill="none" stroke-width="4"/>' +
    '<path d="M68 40 L64 26 H74" fill="none" stroke-width="4"/>' +
    '<circle cx="50" cy="66" r="4" fill="#ced4da"/><circle cx="24" cy="66" r="3" fill="#ced4da"/><circle cx="76" cy="66" r="3" fill="#ced4da"/>';

  P.crown =
    '<path d="M16 72 L10 30 L32 50 L50 20 L68 50 L90 30 L84 72 Z" fill="#fcc419"/>' +
    '<circle cx="10" cy="28" r="5" fill="#fcc419"/><circle cx="50" cy="18" r="5" fill="#fcc419"/><circle cx="90" cy="28" r="5" fill="#fcc419"/>' +
    '<rect x="14" y="70" width="72" height="14" rx="3" fill="#f59f00"/>' +
    '<circle cx="32" cy="77" r="4" fill="#fa5252"/><circle cx="50" cy="77" r="4" fill="#4dabf7"/><circle cx="68" cy="77" r="4" fill="#51cf66"/>' +
    '<path d="M50 40 l4 8 l-4 8 l-4 -8 z" fill="#fa5252" stroke-width="2"/>';

  P.gift =
    '<path d="M50 34 Q30 10 26 24 Q24 34 50 34 Z M50 34 Q70 10 74 24 Q76 34 50 34 Z" fill="#ffd43b"/>' +
    '<rect x="18" y="46" width="64" height="42" rx="3" fill="#ff6b6b"/>' +
    '<rect x="13" y="34" width="74" height="14" rx="3" fill="#fa5252"/>' +
    '<rect x="44" y="34" width="12" height="54" fill="#ffd43b"/>';

  // ---------- More nature ----------

  P.rainbow =
    [['#fa5252', 38], ['#ff922b', 32], ['#ffd43b', 26], ['#51cf66', 20], ['#4dabf7', 14]]
      .map((b) => '<path d="M' + (50 - b[1]) + ' 74 A' + b[1] + ' ' + b[1] + ' 0 0 1 ' + (50 + b[1]) + ' 74" fill="none" stroke="' + b[0] + '" stroke-width="6.5" stroke-linecap="butt"/>')
      .join('') +
    '<path d="M9 74 A41 41 0 0 1 91 74 M23 74 A27 27 0 0 1 77 74" fill="none" stroke-width="2.5" stroke-linecap="butt"/>' +
    '<path d="M2 82 q0 -10 10 -10 q4 -8 12 -4 q8 0 8 8 q4 6 -2 8 H4 Z" fill="#fff"/>' +
    '<path d="M68 82 q0 -10 10 -10 q4 -8 12 -4 q8 0 8 8 q4 6 -2 8 H70 Z" fill="#fff"/>';

  P.snowman =
    '<path d="M30 60 L14 48 M70 60 L86 48 M18 51 L12 54 M82 51 L88 54" stroke="#7a4a26" stroke-width="3"/>' +
    '<circle cx="50" cy="70" r="22" fill="#fff"/>' +
    '<circle cx="50" cy="38" r="16" fill="#fff"/>' +
    '<rect x="36" y="8" width="28" height="18" rx="2" fill="#343a40"/><rect x="30" y="24" width="40" height="5" rx="2" fill="#343a40"/>' +
    eye(44, 35, 2.8) + eye(56, 35, 2.8) +
    '<path d="M50 40 L62 43 L50 45 Z" fill="#ff922b" stroke-width="2"/>' +
    '<path d="M36 52 Q50 58 64 52 L64 58 Q50 64 36 58 Z" fill="#fa5252"/>' +
    '<path d="M58 58 L60 70 L66 68 L62 57" fill="#fa5252" stroke-width="2.5"/>' +
    '<circle cx="50" cy="68" r="2.5" fill="' + INK + '" stroke="none"/><circle cx="50" cy="78" r="2.5" fill="' + INK + '" stroke="none"/>';

  P.fire =
    '<rect x="18" y="78" width="64" height="10" rx="5" fill="#a0673b" transform="rotate(-8 50 83)"/>' +
    '<rect x="18" y="78" width="64" height="10" rx="5" fill="#c98b52" transform="rotate(8 50 83)"/>' +
    '<path d="M50 8 C60 28 80 38 76 60 C74 74 62 84 50 84 C38 84 24 74 24 60 C24 46 34 40 36 26 C42 36 44 42 46 44 C48 32 46 20 50 8 Z" fill="#ff922b"/>' +
    '<path d="M50 40 C56 52 66 56 64 68 C62 76 56 80 50 80 C44 80 36 76 36 68 C36 60 42 58 44 50 C46 56 48 58 50 58 C50 52 48 46 50 40 Z" fill="#ffd43b" stroke="none"/>';

  P.mountain =
    '<circle cx="80" cy="20" r="9" fill="#ffd43b"/>' +
    '<path d="M54 86 L72 52 L94 86 Z" fill="#91a7ff"/>' +
    '<path d="M6 86 L40 22 L74 86 Z" fill="#748ffc"/>' +
    '<path d="M29 43 L40 22 L51 43 L45 40 L40 46 L35 40 Z" fill="#fff"/>' +
    '<path d="M4 86 H96" stroke-width="3"/>';

  P.heart =
    '<path d="M50 86 C20 66 8 48 16 30 C24 14 44 16 50 32 C56 16 76 14 84 30 C92 48 80 66 50 86 Z" fill="#fa5252"/>' +
    '<path d="M26 34 q4 -8 12 -8" fill="none" stroke="#fff" stroke-width="5" opacity=".75"/>';

  P.snowflake =
    ring(6, 50, 50, 38, (x, y, a) => {
      const pt = (r, da) => (50 + Math.cos(a + da) * r).toFixed(1) + ' ' + (50 + Math.sin(a + da) * r).toFixed(1);
      const d = 'M50 50 L' + x.toFixed(1) + ' ' + y.toFixed(1) +
        ' M' + pt(24, 0) + ' L' + pt(32, 0.32) + ' M' + pt(24, 0) + ' L' + pt(32, -0.32) +
        ' M' + pt(13, 0) + ' L' + pt(20, 0.45) + ' M' + pt(13, 0) + ' L' + pt(20, -0.45);
      return '<path d="' + d + '" fill="none" stroke="' + INK + '" stroke-width="8"/><path d="' + d + '" fill="none" stroke="#a5d8ff" stroke-width="4"/>';
    }) +
    '<circle cx="50" cy="50" r="6" fill="#a5d8ff"/>';

  // ---------- Body ----------

  P.hand =
    '<rect x="33" y="14" width="10" height="36" rx="5" fill="#ffd8a8"/>' +
    '<rect x="45" y="9" width="10" height="40" rx="5" fill="#ffd8a8"/>' +
    '<rect x="57" y="13" width="10" height="37" rx="5" fill="#ffd8a8"/>' +
    '<rect x="69" y="24" width="9" height="30" rx="4.5" fill="#ffd8a8"/>' +
    '<rect x="14" y="44" width="11" height="30" rx="5.5" fill="#ffd8a8" transform="rotate(-40 20 60)"/>' +
    '<rect x="30" y="40" width="50" height="46" rx="18" fill="#ffd8a8"/>' +
    '<rect x="34.5" y="37" width="42" height="10" fill="#ffd8a8" stroke="none"/>' +
    '<path d="M27 52 L33 56" stroke="#ffd8a8" stroke-width="8"/>' +
    '<path d="M46 66 q8 6 16 0" fill="none" stroke="#e8a25c" stroke-width="2.5"/>';

  P.nose =
    '<circle cx="50" cy="52" r="36" fill="#ffd8a8"/>' +
    '<path d="M24 24 Q50 4 76 24 Q66 18 50 18 Q34 18 24 24 Z" fill="#a0673b"/>' +
    eye(36, 40, 4) + eye(64, 40, 4) + cheeks(60, 24) +
    '<path d="M50 38 C40 52 34 62 42 68 Q50 72 58 68 C66 62 60 52 50 38 Z" fill="#ffa94d" stroke-width="3.5"/>' +
    '<path d="M46 52 q-2 6 0 10" fill="none" stroke="#fff" stroke-width="3" opacity=".8"/>' +
    '<path d="M42 78 q8 5 16 0" fill="none"/>';

  P.ear =
    '<path d="M36 86 C28 76 26 62 26 48 C26 24 42 10 60 12 C80 14 88 36 80 54 C74 66 64 70 62 80 C60 92 44 94 36 86 Z" fill="#ffd8a8"/>' +
    '<path d="M42 46 C42 28 64 24 68 40 C70 50 60 52 58 60 C56 68 50 70 48 64" fill="none" stroke="#e8a25c" stroke-width="5"/>' +
    '<path d="M48 48 q4 -6 10 -2" fill="none" stroke="#e8a25c" stroke-width="3"/>';

  P.tooth =
    '<path d="M24 28 C24 12 40 12 50 18 C60 12 76 12 76 28 C76 42 72 52 70 66 C68 84 60 90 57 78 C55 68 54 62 50 62 C46 62 45 68 43 78 C40 90 32 84 30 66 C28 52 24 42 24 28 Z" fill="#fff"/>' +
    eye(40, 34, 3.5) + eye(60, 34, 3.5) + cheeks(42, 16) +
    '<path d="M44 44 q6 6 12 0" fill="none" stroke-width="2.5"/>' +
    '<path d="M82 14 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2 z" fill="#74c0fc" stroke-width="2"/>';

  // ---------- Animals (third set) ----------

  // A thick limb or neck: an outline stroke with a colored stroke on top.
  function limb(d, color, width) {
    return '<path d="' + d + '" fill="none" stroke="' + INK + '" stroke-width="' + (width + 6) + '"/>' +
      '<path d="' + d + '" fill="none" stroke="' + color + '" stroke-width="' + width + '"/>';
  }

  P.horse =
    '<path d="M34 26 L32 8 L44 20 Z M66 26 L68 8 L56 20 Z" fill="#a0673b"/>' +
    '<path d="M30 30 Q50 12 70 30 L66 70 Q50 90 34 70 Z" fill="#c98b52"/>' +
    '<path d="M40 22 Q50 8 60 22 Q56 30 50 26 Q44 30 40 22 Z" fill="#7a4a26"/>' +
    '<path d="M46 34 Q50 30 54 34 L52 58 H48 Z" fill="#fff" stroke="none"/>' +
    eye(38, 44, 4) + eye(62, 44, 4) +
    '<ellipse cx="50" cy="74" rx="17" ry="13" fill="#e3b58a"/>' +
    '<ellipse cx="43" cy="74" rx="2.5" ry="3.5" fill="' + INK + '" stroke="none"/><ellipse cx="57" cy="74" rx="2.5" ry="3.5" fill="' + INK + '" stroke="none"/>' +
    '<path d="M44 82 q6 3 12 0" fill="none" stroke-width="2"/>';

  P.giraffe =
    '<path d="M38 94 L44 40 H62 L68 94 Z" fill="#ffd43b"/>' +
    '<path d="M44 40 L42 60 M47 30 L40 34" fill="none" stroke="#e8590c" stroke-width="4"/>' +
    [[52, 52, 4], [58, 66, 5], [48, 78, 4], [60, 86, 4], [52, 46, 2.5]]
      .map((p) => '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + p[2] + '" fill="#e8590c" stroke="none"/>')
      .join('') +
    '<path d="M50 18 V8 M62 18 V8" stroke-width="3"/><circle cx="50" cy="7" r="3.5" fill="#a0673b"/><circle cx="62" cy="7" r="3.5" fill="#a0673b"/>' +
    '<ellipse cx="42" cy="22" rx="8" ry="4" fill="#ffd43b" transform="rotate(-25 42 22)"/>' +
    '<ellipse cx="62" cy="30" rx="20" ry="13" fill="#ffd43b"/>' +
    '<ellipse cx="74" cy="34" rx="10" ry="8" fill="#ffe8a3"/>' +
    '<circle cx="76" cy="32" r="1.5" fill="' + INK + '" stroke="none"/>' +
    eye(58, 26, 3.5) +
    '<circle cx="50" cy="62" r="3" fill="#e8590c" stroke="none"/>';

  P.zebra =
    '<path d="M34 26 L32 8 L44 20 Z M66 26 L68 8 L56 20 Z" fill="#fff"/>' +
    '<path d="M30 30 Q50 12 70 30 L66 70 Q50 90 34 70 Z" fill="#fff"/>' +
    '<path d="M31 38 q8 0 12 4 M32 50 q8 -2 12 2 M33 60 q6 -2 10 2 M69 38 q-8 0 -12 4 M68 50 q-8 -2 -12 2 M67 60 q-6 -2 -10 2 M44 24 l4 8 M56 24 l-4 8" fill="none" stroke="' + INK + '" stroke-width="4"/>' +
    '<path d="M40 22 Q50 6 60 22 Q50 18 40 22 Z" fill="' + INK + '"/>' +
    eye(39, 44, 4) + eye(61, 44, 4) +
    '<ellipse cx="50" cy="74" rx="17" ry="13" fill="#495057"/>' +
    '<ellipse cx="43" cy="74" rx="2.5" ry="3.5" fill="#fff" stroke="none"/><ellipse cx="57" cy="74" rx="2.5" ry="3.5" fill="#fff" stroke="none"/>';

  P.tiger =
    '<circle cx="26" cy="28" r="11" fill="#ff922b"/><circle cx="74" cy="28" r="11" fill="#ff922b"/>' +
    '<circle cx="26" cy="28" r="5" fill="#fff" stroke="none"/><circle cx="74" cy="28" r="5" fill="#fff" stroke="none"/>' +
    '<circle cx="50" cy="54" r="32" fill="#ff922b"/>' +
    '<path d="M50 22 v10 M42 24 l2 8 M58 24 l-2 8 M18 48 h10 M19 58 h9 M82 48 h-10 M81 58 h-9" stroke="' + INK + '" stroke-width="4"/>' +
    '<path d="M30 62 Q34 52 50 56 Q66 52 70 62 Q68 82 50 84 Q32 82 30 62 Z" fill="#fff"/>' +
    eye(39, 46, 4.5) + eye(61, 46, 4.5) +
    '<path d="M44 60 h12 l-6 6 z" fill="#ff6b8a"/>' +
    '<path d="M50 66 v4 M43 72 q7 5 14 0" fill="none"/>';

  P.panda =
    '<circle cx="24" cy="28" r="12" fill="' + INK + '"/><circle cx="76" cy="28" r="12" fill="' + INK + '"/>' +
    '<circle cx="50" cy="55" r="32" fill="#fff"/>' +
    '<ellipse cx="37" cy="50" rx="9" ry="12" fill="' + INK + '" transform="rotate(30 37 50)"/>' +
    '<ellipse cx="63" cy="50" rx="9" ry="12" fill="' + INK + '" transform="rotate(-30 63 50)"/>' +
    '<circle cx="38" cy="49" r="3.5" fill="#fff" stroke="none"/><circle cx="62" cy="49" r="3.5" fill="#fff" stroke="none"/>' +
    '<circle cx="38" cy="49" r="1.8" fill="' + INK + '" stroke="none"/><circle cx="62" cy="49" r="1.8" fill="' + INK + '" stroke="none"/>' +
    '<ellipse cx="50" cy="64" rx="6" ry="4" fill="' + INK + '"/>' +
    '<path d="M50 68 v4 M44 74 q6 4 12 0" fill="none"/>' + cheeks(70, 22);

  P.camel =
    '<path d="M28 66 V90 M38 68 V90 M56 68 V90 M66 66 V90" stroke="' + INK + '" stroke-width="9"/>' +
    '<path d="M28 66 V88 M38 68 V88 M56 68 V88 M66 66 V88" stroke="#e3b58a" stroke-width="4"/>' +
    '<path d="M16 58 q-6 6 -4 14" fill="none" stroke-width="3"/>' +
    limb('M68 52 Q78 44 78 28', '#e3b58a', 9) +
    '<path d="M18 62 Q18 46 30 46 Q34 26 46 30 Q52 36 52 44 Q56 34 62 40 Q72 46 72 58 Q72 70 46 70 Q18 70 18 62 Z" fill="#e3b58a"/>' +
    '<ellipse cx="82" cy="26" rx="12" ry="8" fill="#e3b58a"/>' +
    '<path d="M74 18 l-2 -6 l5 3" fill="#e3b58a" stroke-width="2"/>' +
    eye(80, 23, 2.5) +
    '<circle cx="91" cy="27" r="1.3" fill="' + INK + '" stroke="none"/>';

  P.hippo =
    '<circle cx="28" cy="24" r="7" fill="#9c95c9"/><circle cx="72" cy="24" r="7" fill="#9c95c9"/>' +
    '<ellipse cx="50" cy="44" rx="28" ry="24" fill="#9c95c9"/>' +
    eye(38, 36, 4) + eye(62, 36, 4) +
    '<ellipse cx="50" cy="68" rx="36" ry="22" fill="#b4aee0"/>' +
    '<ellipse cx="34" cy="60" rx="4" ry="3" fill="' + INK + '" stroke="none"/><ellipse cx="66" cy="60" rx="4" ry="3" fill="' + INK + '" stroke="none"/>' +
    '<path d="M30 74 q20 12 40 0" fill="none"/>' +
    '<path d="M38 77 v6 h5 v-4 M62 77 v6 h-5 v-4" fill="#fff" stroke-width="2"/>' + cheeks(70, 28);

  P.crocodile =
    '<path d="M26 66 l-4 12 h8 M44 68 l-2 12 h8 M66 68 l-2 12 h8 M80 64 l2 12 h7" fill="#40c057" stroke-width="3"/>' +
    '<path d="M76 50 Q92 48 98 38 Q96 60 80 64 Z" fill="#40c057"/>' +
    '<ellipse cx="56" cy="56" rx="28" ry="13" fill="#40c057"/>' +
    '<path d="M42 44 l4 -6 l4 6 M54 43 l4 -6 l4 6 M66 44 l4 -6 l4 6" fill="#2f9e44" stroke-width="2"/>' +
    '<path d="M38 50 L8 52 Q2 56 6 60 L38 64 Z" fill="#69db7c"/>' +
    '<path d="M10 56 L36 57" stroke-width="2"/>' +
    '<path d="M12 56 l3 -3 l3 3 l3 -3 l3 3 l3 -3 l3 3 l3 -3 l3 3" fill="#fff" stroke-width="1.5"/>' +
    '<circle cx="34" cy="46" r="7" fill="#69db7c"/>' + eye(35, 45, 3);

  P.shark =
    '<path d="M76 44 L92 26 L88 50 L94 70 L76 58 Z" fill="#748ffc"/>' +
    '<path d="M42 38 L52 16 L62 40 Z" fill="#748ffc"/>' +
    '<path d="M6 54 Q26 34 58 38 Q76 40 82 52 Q76 64 56 66 Q26 70 6 54 Z" fill="#91a7ff"/>' +
    '<path d="M10 56 Q30 68 56 66 Q72 64 80 56 Q62 72 36 70 Q18 66 10 56 Z" fill="#fff"/>' +
    '<path d="M44 66 l8 10 l4 -10" fill="#748ffc"/>' +
    eye(22, 48, 3.5) +
    '<path d="M38 48 q-2 6 0 10 M44 48 q-2 6 0 10" fill="none" stroke-width="2"/>' +
    '<path d="M10 56 q8 6 18 2" fill="none" stroke-width="2"/>';

  P.dolphin =
    '<path d="M4 86 q8 -6 16 0 q8 6 16 0 q8 -6 16 0 q8 6 16 0 q8 -6 16 0 q8 6 16 0" fill="none" stroke="#4dabf7" stroke-width="4"/>' +
    '<path d="M70 56 L90 50 L84 62 L92 74 L74 66 Z" fill="#74c0fc"/>' +
    '<path d="M44 30 L52 14 L58 32 Z" fill="#74c0fc"/>' +
    '<path d="M8 48 Q12 40 22 40 Q40 26 60 34 Q76 42 76 60 Q60 52 44 58 Q30 62 22 56 Q12 56 8 48 Z" fill="#74c0fc"/>' +
    '<path d="M14 50 Q30 58 44 54 Q58 50 70 52 Q56 56 44 58 Q28 62 14 50 Z" fill="#e7f5ff"/>' +
    '<path d="M42 58 L40 70 L52 60 Z" fill="#74c0fc"/>' +
    eye(26, 44, 3) +
    '<path d="M10 50 q6 3 12 1" fill="none" stroke-width="2"/>';

  P.starfish =
    '<path d="M50 10 L62 36 L90 38 L68 56 L76 86 L50 70 L24 86 L32 56 L10 38 L38 36 Z" fill="#ff922b" stroke-width="7" stroke="' + INK + '"/>' +
    '<path d="M50 10 L62 36 L90 38 L68 56 L76 86 L50 70 L24 86 L32 56 L10 38 L38 36 Z" fill="#ff922b" stroke="#ff922b" stroke-width="3"/>' +
    [[50, 24], [76, 42], [68, 76], [32, 76], [24, 42]].map((p) => '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="2" fill="#ffd8a8" stroke="none"/>').join('') +
    eye(43, 50, 3) + eye(57, 50, 3) +
    '<path d="M45 58 q5 4 10 0" fill="none" stroke-width="2"/>';

  P.jellyfish =
    [26, 38, 50, 62, 74].map((x) => '<path d="M' + x + ' 54 q-5 8 0 14 q5 8 0 14 q-4 6 0 10" fill="none" stroke="#e599f7" stroke-width="4"/>').join('') +
    '<path d="M14 56 Q14 14 50 14 Q86 14 86 56 Q80 50 74 56 Q68 50 62 56 Q56 50 50 56 Q44 50 38 56 Q32 50 26 56 Q20 50 14 56 Z" fill="#f783ac"/>' +
    eye(40, 38, 4) + eye(60, 38, 4) + cheeks(46, 18) +
    '<path d="M45 46 q5 4 10 0" fill="none" stroke-width="2"/>' +
    '<path d="M28 28 q4 -8 12 -10" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>';

  P.squirrel =
    '<path d="M60 82 Q92 80 88 46 Q86 22 70 18 Q56 16 60 32 Q74 34 74 48 Q74 62 58 66 Z" fill="#e8590c"/>' +
    '<path d="M68 26 q8 4 10 14" fill="none" stroke="#ff922b" stroke-width="3"/>' +
    '<ellipse cx="46" cy="68" rx="17" ry="18" fill="#ff922b"/>' +
    '<ellipse cx="44" cy="72" rx="9" ry="11" fill="#ffd8a8"/>' +
    '<path d="M28 30 L30 18 L38 26 Z" fill="#ff922b"/>' +
    '<circle cx="36" cy="40" r="14" fill="#ff922b"/>' +
    eye(32, 37, 3.5) +
    '<circle cx="23" cy="43" r="2.5" fill="' + INK + '" stroke="none"/>' +
    '<ellipse cx="44" cy="62" rx="6" ry="7" fill="#a0673b"/>' +
    '<path d="M44 55 v-3" stroke-width="2"/>' +
    '<path d="M34 86 h10 M50 86 h10" stroke-width="3"/>';

  P.hedgehog =
    '<path d="M24 72 L18 60 L26 58 L22 44 L32 46 L32 32 L42 38 L46 24 L54 34 L62 24 L66 38 L76 32 L76 46 L86 46 L82 58 L90 62 L82 72 Z" fill="#7a4a26"/>' +
    '<path d="M24 72 Q16 66 10 66 Q6 62 14 56 Q22 50 34 54 Q38 66 34 76 Z" fill="#f3d2a8"/>' +
    '<path d="M24 72 H84 Q84 80 76 80 H30 Q24 80 24 72 Z" fill="#f3d2a8"/>' +
    '<circle cx="8" cy="64" r="3.5" fill="' + INK + '"/>' +
    eye(24, 58, 3) +
    '<path d="M34 80 v6 M44 80 v6 M66 80 v6 M76 80 v6" stroke-width="4"/>';

  P.goat =
    '<path d="M38 26 Q28 12 18 14 Q28 18 32 30 Z M62 26 Q72 12 82 14 Q72 18 68 30 Z" fill="#ced4da"/>' +
    '<ellipse cx="20" cy="40" rx="12" ry="5" fill="#fff" transform="rotate(20 20 40)"/>' +
    '<ellipse cx="80" cy="40" rx="12" ry="5" fill="#fff" transform="rotate(-20 80 40)"/>' +
    '<path d="M44 74 Q50 96 56 74 Z" fill="#fff"/>' +
    '<path d="M30 34 Q50 20 70 34 L64 70 Q50 82 36 70 Z" fill="#fff"/>' +
    eye(40, 44, 4) + eye(60, 44, 4) +
    '<ellipse cx="50" cy="66" rx="10" ry="7" fill="#ffc2d1"/>' +
    '<circle cx="46" cy="66" r="1.8" fill="' + INK + '" stroke="none"/><circle cx="54" cy="66" r="1.8" fill="' + INK + '" stroke="none"/>';

  P.chick =
    '<path d="M42 82 v8 M58 82 v8 M38 90 h8 M54 90 h8" stroke="#fd7e14" stroke-width="3"/>' +
    '<path d="M48 18 q2 -8 6 -6 q-2 4 -2 8" fill="#ffd43b" stroke-width="2"/>' +
    '<circle cx="50" cy="50" r="30" fill="#ffd43b"/>' +
    '<path d="M20 60 Q22 82 50 84 Q78 82 80 60 L72 66 L64 58 L56 66 L48 58 L40 66 L32 58 L26 64 Z" fill="#fff"/>' +
    '<path d="M24 46 q-8 4 -6 12" fill="none" stroke="#f59f00" stroke-width="3"/>' +
    eye(40, 42, 4) + eye(60, 42, 4) + cheeks(50, 18) +
    '<path d="M45 50 h10 l-5 6 z" fill="#fd7e14"/>';

  P.parrot =
    '<path d="M10 88 H72" stroke="#a0673b" stroke-width="6"/>' +
    '<path d="M50 70 L58 96 L66 70 Z" fill="#4dabf7"/>' +
    '<ellipse cx="56" cy="56" rx="18" ry="24" fill="#fa5252"/>' +
    '<path d="M62 40 Q80 50 72 76 Q60 66 58 50 Z" fill="#4dabf7"/>' +
    '<path d="M62 56 Q72 62 70 72" fill="none" stroke="#ffd43b" stroke-width="4"/>' +
    '<circle cx="48" cy="30" r="16" fill="#fa5252"/>' +
    '<circle cx="50" cy="27" r="6" fill="#fff"/>' + eye(50, 27, 3) +
    '<path d="M36 26 Q22 26 24 40 Q28 34 34 36 Z" fill="#ffd43b"/>' +
    '<path d="M50 82 v6 M58 82 v6" stroke-width="3"/>';

  P.bat =
    '<path d="M50 40 Q30 24 6 30 Q14 38 12 46 Q20 42 24 50 Q30 44 36 52 Q42 46 50 54 Q58 46 64 52 Q70 44 76 50 Q80 42 88 46 Q86 38 94 30 Q70 24 50 40 Z" fill="#7950f2"/>' +
    '<path d="M40 30 L38 16 L46 26 Z M60 30 L62 16 L54 26 Z" fill="#5f3dc4"/>' +
    '<ellipse cx="50" cy="42" rx="12" ry="15" fill="#5f3dc4"/>' +
    '<circle cx="45" cy="38" r="3.5" fill="#fff" stroke="none"/><circle cx="55" cy="38" r="3.5" fill="#fff" stroke="none"/>' +
    '<circle cx="45" cy="38" r="1.8" fill="' + INK + '" stroke="none"/><circle cx="55" cy="38" r="1.8" fill="' + INK + '" stroke="none"/>' +
    '<path d="M46 46 l1 3 l1 -3 M52 46 l1 3 l1 -3" fill="#fff" stroke-width="1.5"/>';

  P.worm =
    '<path d="M8 84 Q30 78 50 84 T92 84" fill="none" stroke="#a0673b" stroke-width="4"/>' +
    limb('M14 78 C20 50 40 50 44 66 C48 82 66 82 68 60 C70 44 74 34 80 32', '#ffa8a8', 12) +
    '<path d="M22 66 l6 2 M40 58 l4 4 M56 76 l2 -6 M68 56 l6 1" stroke="#fa5252" stroke-width="2"/>' +
    '<circle cx="80" cy="30" r="11" fill="#ffa8a8"/>' +
    eye(77, 28, 2.5) + eye(85, 28, 2.5) +
    '<path d="M77 35 q4 3 8 0" fill="none" stroke-width="2"/>';

  P.ant =
    '<path d="M38 56 L26 70 L20 82 M50 58 L50 74 L46 86 M62 56 L74 70 L80 82 M38 52 L24 46 L16 52 M62 52 L76 46 L84 52" fill="none" stroke-width="3"/>' +
    '<path d="M24 26 Q18 14 12 14 M34 24 Q34 12 40 8" fill="none" stroke-width="2.5"/>' +
    '<ellipse cx="72" cy="56" rx="17" ry="14" fill="#495057"/>' +
    '<ellipse cx="50" cy="54" rx="10" ry="8" fill="#495057"/>' +
    '<circle cx="30" cy="38" r="14" fill="#495057"/>' +
    '<circle cx="25" cy="35" r="4" fill="#fff" stroke="none"/><circle cx="35" cy="35" r="4" fill="#fff" stroke="none"/>' +
    '<circle cx="25" cy="35" r="2" fill="' + INK + '" stroke="none"/><circle cx="35" cy="35" r="2" fill="' + INK + '" stroke="none"/>' +
    '<path d="M25 44 q5 3 10 0" fill="none" stroke="#fff" stroke-width="2"/>';

  P.dinosaur =
    '<path d="M30 66 V88 M44 70 V88 M60 70 V88 M72 66 V88" stroke="' + INK + '" stroke-width="11"/>' +
    '<path d="M30 66 V86 M44 70 V86 M60 70 V86 M72 66 V86" stroke="#69db7c" stroke-width="6"/>' +
    '<path d="M74 56 Q90 56 98 72 Q86 66 74 68 Z" fill="#69db7c"/>' +
    limb('M34 52 Q22 40 24 18', '#69db7c', 11) +
    '<ellipse cx="54" cy="58" rx="26" ry="16" fill="#69db7c"/>' +
    '<circle cx="48" cy="52" r="4" fill="#40c057" stroke="none"/><circle cx="60" cy="50" r="3" fill="#40c057" stroke="none"/><circle cx="64" cy="60" r="4" fill="#40c057" stroke="none"/>' +
    '<ellipse cx="18" cy="16" rx="12" ry="9" fill="#69db7c"/>' +
    eye(20, 13, 2.8) +
    '<path d="M8 19 q5 3 10 1" fill="none" stroke-width="2"/>';

  P.flamingo =
    '<path d="M54 66 V94 M54 78 L66 72 L60 64" fill="none" stroke="#f06595" stroke-width="3"/>' +
    '<ellipse cx="58" cy="56" rx="22" ry="14" fill="#faa2c1"/>' +
    '<path d="M62 52 Q74 50 80 60 Q70 64 62 60 Z" fill="#f783ac"/>' +
    limb('M40 54 Q26 46 34 34 Q44 22 36 14', '#faa2c1', 7) +
    '<circle cx="34" cy="14" r="8" fill="#faa2c1"/>' +
    eye(34, 12, 2.5) +
    '<path d="M27 13 Q18 16 20 26 Q24 20 28 18 Z" fill="' + INK + '"/>';

  P.seal =
    '<path d="M70 76 L90 68 L86 80 L92 88 L72 84 Z" fill="#868e96"/>' +
    '<path d="M18 84 Q14 60 26 44 Q36 28 50 32 Q60 36 58 50 Q76 64 76 84 Z" fill="#adb5bd"/>' +
    '<path d="M36 72 Q44 82 34 88 Q28 84 30 74 Z" fill="#868e96"/>' +
    eye(38, 42, 3.5) + eye(52, 40, 3) +
    '<ellipse cx="48" cy="48" rx="4" ry="3" fill="' + INK + '"/>' +
    '<path d="M42 50 h-10 M43 53 l-9 3 M54 50 h8 M53 53 l8 2" fill="none" stroke-width="1.5"/>' +
    '<circle cx="46" cy="16" r="10" fill="#ff6b6b"/><path d="M38 12 Q46 18 54 12" fill="none" stroke="#fff" stroke-width="3"/>';

  P.koala =
    '<circle cx="20" cy="36" r="17" fill="#adb5bd"/><circle cx="80" cy="36" r="17" fill="#adb5bd"/>' +
    '<circle cx="20" cy="36" r="10" fill="#f1f3f5" stroke="none"/><circle cx="80" cy="36" r="10" fill="#f1f3f5" stroke="none"/>' +
    '<circle cx="50" cy="56" r="30" fill="#adb5bd"/>' +
    eye(38, 50, 4) + eye(62, 50, 4) + cheeks(66, 20) +
    '<ellipse cx="50" cy="62" rx="9" ry="12" fill="#495057"/>' +
    '<path d="M45 56 q2 -3 5 -3" fill="none" stroke="#fff" stroke-width="2" opacity=".6"/>' +
    '<path d="M44 78 q6 4 12 0" fill="none"/>';

  // ---------- Food (third set) ----------

  P.potato =
    '<path d="M18 54 C14 34 36 24 56 26 C78 28 90 42 86 58 C82 76 60 82 40 78 C26 76 20 66 18 54 Z" fill="#d9a066"/>' +
    [[36, 44], [58, 38], [70, 56], [46, 64], [30, 60]].map((p) => '<path d="M' + p[0] + ' ' + p[1] + ' q2 -2 4 0" fill="none" stroke="#a0673b" stroke-width="2"/>').join('') +
    '<path d="M30 40 q4 -6 12 -8" fill="none" stroke="#fff" stroke-width="3" opacity=".5"/>';

  P.corn =
    '<path d="M50 30 Q26 40 28 92 Q40 74 50 66 Z" fill="#69db7c"/><path d="M50 30 Q74 40 72 92 Q60 74 50 66 Z" fill="#51cf66"/>' +
    '<path d="M50 8 C64 8 66 30 64 54 C62 74 56 84 50 84 C44 84 38 74 36 54 C34 30 36 8 50 8 Z" fill="#ffd43b"/>' +
    [20, 30, 40, 50, 60, 70].map((y) => '<path d="M' + (y < 30 ? 42 : 39) + ' ' + y + ' H' + (y < 30 ? 58 : 61) + '" stroke="#f59f00" stroke-width="2"/>').join('') +
    '<path d="M44 12 V80 M50 8 V84 M56 12 V80" stroke="#f59f00" stroke-width="2"/>' +
    '<path d="M50 66 Q30 70 30 92 Q42 80 50 76 Q58 80 70 92 Q70 70 50 66 Z" fill="#69db7c"/>';

  P.cucumber =
    '<path d="M16 70 C10 60 20 50 34 42 C50 32 70 22 82 24 C92 26 92 36 84 44 C72 56 52 68 36 76 C26 80 20 78 16 70 Z" fill="#51cf66"/>' +
    '<path d="M26 62 C40 52 62 38 80 32" fill="none" stroke="#8ce99a" stroke-width="3"/>' +
    [[32, 66], [48, 56], [64, 46], [40, 70], [58, 60], [74, 40]].map((p) => '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="1.5" fill="#2b8a3e" stroke="none"/>').join('') +
    '<path d="M84 26 l6 -6" stroke="#2b8a3e" stroke-width="3"/>';

  P.pepper =
    '<path d="M50 28 Q52 16 62 12" fill="none" stroke="#2b8a3e" stroke-width="5"/>' +
    '<path d="M50 28 C70 22 84 34 80 56 C76 78 64 88 56 86 Q50 84 50 80 Q50 84 44 86 C36 88 24 78 20 56 C16 34 30 22 50 28 Z" fill="#fa5252"/>' +
    '<path d="M40 30 Q50 26 60 30 Q56 36 50 34 Q44 36 40 30 Z" fill="#51cf66"/>' +
    '<path d="M50 40 Q46 60 50 80" fill="none" stroke="#c92a2a" stroke-width="2"/>' +
    '<path d="M30 44 q0 -8 6 -10" fill="none" stroke="#fff" stroke-width="4" opacity=".7"/>';

  P.onion =
    '<path d="M50 6 Q46 18 50 26 Q54 18 50 6 Z" fill="#51cf66"/>' +
    '<path d="M50 24 C70 30 84 46 82 64 C80 80 66 88 50 88 C34 88 20 80 18 64 C16 46 30 30 50 24 Z" fill="#e599f7"/>' +
    '<path d="M50 28 Q34 50 40 86 M50 28 Q66 50 60 86 M50 28 V88" fill="none" stroke="#be4bdb" stroke-width="2"/>' +
    '<path d="M42 88 l-4 6 M50 88 v6 M58 88 l4 6" stroke="#a0673b" stroke-width="2"/>';

  P.broccoli =
    '<path d="M42 56 L38 90 H62 L58 56 Z" fill="#8ce99a"/>' +
    '<path d="M46 60 L36 50 M54 60 L64 50" stroke="#8ce99a" stroke-width="6"/>' +
    [[30, 44, 14], [50, 30, 17], [70, 44, 14], [40, 52, 12], [60, 52, 12]].map((c) => '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="' + c[2] + '" fill="#40c057"/>').join('') +
    '<circle cx="50" cy="44" r="14" fill="#40c057" stroke="none"/>' +
    [[42, 26], [56, 22], [28, 40], [72, 40], [50, 38], [62, 32]].map((p) => '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="2" fill="#2b8a3e" stroke="none"/>').join('');

  P.peach =
    '<path d="M50 24 C68 18 86 32 84 54 C82 76 66 88 50 86 C34 88 18 76 16 54 C14 32 32 18 50 24 Z" fill="#ffa94d"/>' +
    '<path d="M50 24 Q60 50 52 86" fill="none" stroke="#e8590c" stroke-width="2"/>' +
    '<path d="M28 44 C30 56 36 66 46 72" fill="none" stroke="#ff8787" stroke-width="10" opacity=".45"/>' +
    '<path d="M52 22 Q62 8 76 12 Q68 24 52 22 Z" fill="#51cf66"/>';

  P.plum =
    '<path d="M50 24 Q48 14 54 8" fill="none" stroke="#7a4a26" stroke-width="3"/>' +
    '<ellipse cx="50" cy="56" rx="30" ry="32" fill="#845ef7"/>' +
    '<path d="M50 26 Q58 56 50 88" fill="none" stroke="#5f3dc4" stroke-width="2"/>' +
    '<path d="M30 44 q2 -10 10 -14" fill="none" stroke="#fff" stroke-width="4" opacity=".6"/>';

  P.kiwi =
    '<ellipse cx="34" cy="56" rx="26" ry="28" fill="#a0673b"/>' +
    '<circle cx="64" cy="52" r="28" fill="#a0673b"/>' +
    '<circle cx="64" cy="52" r="23" fill="#8ce99a" stroke="none"/>' +
    '<circle cx="64" cy="52" r="8" fill="#f4fce3" stroke="none"/>' +
    ring(12, 64, 52, 13, (x, y) => '<ellipse cx="' + x + '" cy="' + y + '" rx="1.4" ry="2.2" fill="' + INK + '" stroke="none"/>');

  P.coconut =
    '<circle cx="36" cy="50" r="27" fill="#8c5a36"/>' +
    '<circle cx="28" cy="38" r="3.5" fill="#5c3a1e" stroke="none"/><circle cx="40" cy="34" r="3.5" fill="#5c3a1e" stroke="none"/><circle cx="34" cy="46" r="3.5" fill="#5c3a1e" stroke="none"/>' +
    '<path d="M16 58 l4 2 M48 66 l4 -2 M20 46 l2 3" stroke="#5c3a1e" stroke-width="2"/>' +
    '<path d="M48 62 A24 24 0 0 0 96 62 Z" fill="#8c5a36"/>' +
    '<path d="M54 62 A18 18 0 0 0 90 62 Z" fill="#fff" stroke="none"/>' +
    '<path d="M48 62 H96" stroke-width="3"/>';

  P.nut =
    '<path d="M50 14 C74 14 84 34 82 54 C80 76 66 88 50 88 C34 88 20 76 18 54 C16 34 26 14 50 14 Z" fill="#c98b52"/>' +
    '<path d="M50 14 V88" stroke-width="3"/>' +
    '<path d="M28 34 q6 4 12 0 q-4 8 -12 6 M60 34 q6 4 12 0 q-4 8 -12 6 M26 58 q8 4 14 -2 M60 58 q8 4 14 -2 M34 74 q6 2 10 -4 M58 74 q6 2 10 -4" fill="none" stroke="#7a4a26" stroke-width="2.5"/>';

  P.honey =
    '<path d="M24 34 H76 L80 82 Q80 90 72 90 H28 Q20 90 20 82 Z" fill="#fcc419"/>' +
    '<rect x="22" y="24" width="56" height="12" rx="4" fill="#a0673b"/>' +
    '<path d="M22 36 H78 V40 Q72 48 68 40 Q64 52 58 40 Q52 48 48 40 Q40 54 36 40 Q30 48 22 40 Z" fill="#f59f00"/>' +
    '<rect x="32" y="54" width="36" height="22" rx="4" fill="#fff"/>' +
    '<path d="M44 58 l6 -3 l6 3 v6 l-6 3 l-6 -3 z" fill="#fcc419" stroke-width="2"/>';

  P.chocolate =
    '<path d="M22 14 H78 V62 L22 86 Z" fill="#7a4a26"/>' +
    '<path d="M22 14 H78 V40 H22 Z" fill="#7a4a26"/>' +
    '<path d="M50 14 V52 M22 32 H78 M22 50 H78" stroke="#5c3a1e" stroke-width="3"/>' +
    '<path d="M22 50 L78 62 V86 H22 Z" fill="#4dabf7"/>' +
    '<path d="M22 50 L78 62" stroke-width="3"/>' +
    '<path d="M34 72 h30" stroke="#fff" stroke-width="4"/>';

  P.candy =
    '<path d="M28 50 L8 34 L12 50 L8 66 Z M72 50 L92 34 L88 50 L92 66 Z" fill="#ff8fab"/>' +
    '<ellipse cx="50" cy="50" rx="25" ry="20" fill="#ff6b6b"/>' +
    '<path d="M36 34 Q44 50 36 66 M50 30 Q58 50 50 70 M64 34 Q72 50 64 66" fill="none" stroke="#fff" stroke-width="4"/>' +
    '<ellipse cx="50" cy="50" rx="25" ry="20" fill="none"/>';

  P.lollipop =
    '<path d="M50 62 V96" stroke="' + INK + '" stroke-width="8"/><path d="M50 62 V94" stroke="#fff" stroke-width="4"/>' +
    '<circle cx="50" cy="38" r="28" fill="#ff8fab"/>' +
    '<path d="M50 38 m0 -3 a3 3 0 1 1 -3 3 a7 7 0 1 1 7 7 a11 11 0 1 1 -11 -11 a15 15 0 1 1 15 15 a19 19 0 1 1 -19 -19" fill="none" stroke="#fff" stroke-width="4"/>' +
    '<circle cx="50" cy="38" r="28" fill="none"/>';

  P.donut =
    '<circle cx="50" cy="52" r="36" fill="#e8a25c"/>' +
    '<path d="M50 20 C70 20 84 32 82 48 C80 52 76 50 74 56 C72 62 66 60 62 66 C56 72 50 66 44 70 C36 74 32 66 26 64 C20 62 18 56 18 50 C18 32 32 20 50 20 Z" fill="#ff8fab"/>' +
    '<circle cx="50" cy="50" r="12" fill="#fff"/>' +
    [[34, 36, 20], [64, 32, -30], [72, 46, 60], [30, 52, 80], [46, 30, 0], [60, 60, 40]].map((p, i) => '<rect x="' + (p[0] - 3.5) + '" y="' + (p[1] - 1.2) + '" width="7" height="2.4" rx="1.2" fill="' + ['#ffd43b', '#4dabf7', '#fff', '#51cf66', '#ffd43b', '#4dabf7'][i] + '" stroke="none" transform="rotate(' + p[2] + ' ' + p[0] + ' ' + p[1] + ')"/>').join('');

  P.sandwich =
    '<path d="M10 40 L50 18 L90 40 L50 62 Z" fill="#f3d9b1"/>' +
    '<path d="M10 40 L50 62 L90 40 L90 48 Q84 54 78 50 Q72 58 64 54 Q56 62 50 58 Q42 64 36 56 Q28 58 22 52 Q14 54 10 48 Z" fill="#51cf66"/>' +
    '<path d="M10 52 L50 74 L90 52 V58 L50 80 L10 58 Z" fill="#ff6b6b"/>' +
    '<path d="M10 58 L50 80 L90 58 V66 L50 88 L10 66 Z" fill="#e8a25c"/>' +
    '<path d="M30 36 l6 2 M48 30 l6 2 M62 38 l6 2" stroke="#e8a25c" stroke-width="2"/>';

  P.soup =
    '<path d="M50 30 q-6 -8 0 -14 q6 -6 0 -12 M36 32 q-6 -8 0 -14 M64 32 q-6 -8 0 -14" fill="none" stroke="#adb5bd" stroke-width="2.5"/>' +
    '<path d="M68 40 L90 14" stroke="#adb5bd" stroke-width="6"/>' +
    '<path d="M12 46 H88 Q88 84 50 86 Q12 84 12 46 Z" fill="#4dabf7"/>' +
    '<ellipse cx="50" cy="46" rx="38" ry="8" fill="#ffa94d"/>' +
    '<circle cx="36" cy="46" r="3" fill="#fa5252" stroke="none"/><circle cx="56" cy="44" r="3" fill="#51cf66" stroke="none"/><circle cx="64" cy="48" r="2.5" fill="#fa5252" stroke="none"/>' +
    '<path d="M34 64 h32" stroke="#fff" stroke-width="4" opacity=".6"/>';

  // ---------- Clothes ----------

  P.dress =
    '<path d="M38 10 L42 26 H58 L62 10" fill="none" stroke-width="4"/>' +
    '<path d="M36 26 H64 L62 44 L84 88 H16 L38 44 Z" fill="#f783ac"/>' +
    '<path d="M38 44 H62" stroke-width="4"/>' +
    '<path d="M16 88 q8 -6 17 0 q8 -6 17 0 q8 -6 17 0 q8 -6 17 0" fill="#fff" stroke-width="2.5"/>' +
    [[40, 60], [58, 58], [48, 72], [32, 78], [68, 76]].map((p) => '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="2.5" fill="#fff" stroke="none"/>').join('');

  P.trousers =
    '<path d="M24 12 H76 L84 88 H58 L50 40 L42 88 H16 Z" fill="#4c6ef5"/>' +
    '<rect x="24" y="12" width="52" height="10" fill="#364fc7"/>' +
    '<path d="M50 22 V40 M30 28 q6 6 12 0 M58 28 q6 6 12 0" fill="none" stroke="#91a7ff" stroke-width="2"/>' +
    '<circle cx="50" cy="17" r="2.5" fill="#fcc419" stroke="none"/>';

  P.jacket =
    '<path d="M34 12 L50 22 L66 12 L86 24 L90 76 L76 76 L74 44 L72 88 H28 L26 44 L24 76 L10 76 L14 24 Z" fill="#ff922b"/>' +
    '<path d="M50 22 V88" stroke-width="3"/>' +
    '<path d="M34 12 L44 30 L50 22 M66 12 L56 30 L50 22" fill="#e8590c"/>' +
    '<rect x="32" y="56" width="12" height="10" rx="2" fill="#e8590c"/><rect x="56" y="56" width="12" height="10" rx="2" fill="#e8590c"/>' +
    '<path d="M50 34 v2 M50 46 v2 M50 58 v2 M50 70 v2" stroke="#fff" stroke-width="3"/>';

  P.scarf =
    '<path d="M22 28 Q50 44 78 28 L80 44 Q50 60 20 44 Z" fill="#fa5252"/>' +
    '<path d="M54 46 L70 46 L74 90 L58 90 Z" fill="#fa5252"/>' +
    '<path d="M57 60 H72 M58 72 H73" stroke="#fff" stroke-width="4"/>' +
    '<path d="M58 90 v6 M62 90 v6 M66 90 v6 M70 90 v6" stroke="#fa5252" stroke-width="2.5"/>' +
    '<path d="M30 36 L28 44 M44 40 L42 48 M60 40 L60 48" stroke="#fff" stroke-width="4"/>';

  P.glove =
    '<path d="M30 88 V70 L22 50 Q18 42 26 40 Q32 40 34 48 V20 Q34 12 41 12 Q47 12 47 20 V16 Q47 8 54 8 Q61 8 61 16 V20 Q61 14 67 14 Q74 14 74 22 V30 Q74 24 80 25 Q86 26 86 34 V60 Q86 72 76 78 V88 Z" fill="#cc5de8"/>' +
    '<path d="M47 20 V44 M61 20 V44 M74 30 V46" fill="none" stroke-width="2.5"/>' +
    '<rect x="28" y="78" width="50" height="12" rx="3" fill="#ffd43b"/>';

  P.boot =
    '<path d="M28 10 H58 V54 L84 64 Q92 68 92 78 V82 H24 Q22 82 22 78 L26 56 Z" fill="#a0673b"/>' +
    '<rect x="20" y="82" width="74" height="8" rx="3" fill="#495057"/>' +
    '<rect x="26" y="10" width="34" height="10" rx="3" fill="#7a4a26"/>' +
    '<path d="M42 28 h10 M42 36 h10 M42 44 h10" stroke="#fcc419" stroke-width="3"/>';

  P.cap =
    '<path d="M18 62 C18 30 34 22 50 22 C66 22 80 30 80 60 Z" fill="#fa5252"/>' +
    '<path d="M50 22 C42 34 40 48 42 62 M50 22 C58 34 62 48 62 62" fill="none" stroke="#c92a2a" stroke-width="2"/>' +
    '<circle cx="50" cy="22" r="4" fill="#c92a2a"/>' +
    '<path d="M14 60 H82 Q98 62 96 72 Q80 76 62 70 H14 Z" fill="#c92a2a"/>';

  P.button =
    '<circle cx="50" cy="50" r="36" fill="#4dabf7"/>' +
    '<circle cx="50" cy="50" r="27" fill="none" stroke="#1c7ed6" stroke-width="3"/>' +
    '<circle cx="41" cy="41" r="4.5" fill="#fff"/><circle cx="59" cy="41" r="4.5" fill="#fff"/><circle cx="41" cy="59" r="4.5" fill="#fff"/><circle cx="59" cy="59" r="4.5" fill="#fff"/>' +
    '<path d="M28 32 q4 -6 10 -8" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>';

  // ---------- Home ----------

  P.bathtub =
    '<circle cx="66" cy="20" r="6" fill="#d0ebff"/><circle cx="76" cy="12" r="4" fill="#d0ebff"/><circle cx="56" cy="14" r="3.5" fill="#d0ebff"/>' +
    '<path d="M16 30 V20 Q16 12 24 12 Q30 12 30 18" fill="none" stroke-width="4"/>' +
    '<path d="M22 84 l-4 8 M78 84 l4 8" stroke-width="5"/>' +
    '<circle cx="34" cy="40" r="9" fill="#fff"/><circle cx="48" cy="36" r="10" fill="#fff"/><circle cx="62" cy="40" r="9" fill="#fff"/><circle cx="74" cy="42" r="8" fill="#fff"/>' +
    '<path d="M8 44 H92 V58 Q92 86 64 86 H36 Q8 86 8 58 Z" fill="#fff"/>' +
    '<path d="M8 44 H92" stroke-width="4"/>' +
    '<path d="M18 54 H82" stroke="#74c0fc" stroke-width="3"/>';

  P.soap =
    '<circle cx="74" cy="22" r="9" fill="#e7f5ff"/><circle cx="58" cy="14" r="5" fill="#e7f5ff"/><circle cx="86" cy="40" r="5" fill="#e7f5ff"/>' +
    '<path d="M70 18 q4 -2 6 2" fill="none" stroke="#fff" stroke-width="2"/>' +
    '<rect x="14" y="40" width="64" height="40" rx="16" fill="#ff8fab"/>' +
    '<rect x="22" y="46" width="48" height="18" rx="9" fill="#ffc2d1" stroke="none"/>' +
    '<path d="M28 52 q6 -4 14 -2" fill="none" stroke="#fff" stroke-width="3"/>';

  P.towel =
    '<path d="M10 20 H90" stroke="#adb5bd" stroke-width="6"/>' +
    '<path d="M22 20 H78 V86 Q78 90 74 90 H26 Q22 90 22 86 Z" fill="#4dabf7"/>' +
    '<path d="M22 20 H78 V40 H22 Z" fill="#339af0"/>' +
    '<path d="M22 70 H78 M22 76 H78" stroke="#fff" stroke-width="3"/>';

  P.toothbrush =
    '<g transform="rotate(-35 50 50)">' +
    '<rect x="10" y="48" width="58" height="10" rx="5" fill="#4dabf7"/>' +
    '<rect x="66" y="46" width="26" height="12" rx="4" fill="#4dabf7"/>' +
    [70, 75, 80, 85, 90].map((x) => '<rect x="' + (x - 1.8) + '" y="34" width="3.6" height="12" rx="1.5" fill="#fff" stroke-width="2"/>').join('') +
    '<path d="M68 33 h24" stroke="#8ce99a" stroke-width="5"/>' +
    '</g>';

  P.comb =
    '<path d="M10 34 H90 V46 Q90 50 86 50 H14 Q10 50 10 46 Z" fill="#cc5de8"/>' +
    [16, 24, 32, 40, 48, 56, 64, 72, 80].map((x) => '<rect x="' + (x - 2) + '" y="48" width="5" height="' + (x < 50 ? 26 : 20) + '" rx="2" fill="#cc5de8" stroke-width="2"/>').join('') +
    '<path d="M18 40 h20" stroke="#fff" stroke-width="3" opacity=".7"/>';

  P.mirror =
    '<path d="M50 74 V92 M36 92 H64" stroke-width="5"/>' +
    '<ellipse cx="50" cy="42" rx="30" ry="36" fill="#fcc419"/>' +
    '<ellipse cx="50" cy="42" rx="23" ry="29" fill="#d0ebff"/>' +
    '<path d="M36 30 L50 18 M38 44 L60 24" stroke="#fff" stroke-width="4"/>';

  P.window =
    '<rect x="14" y="12" width="72" height="72" rx="4" fill="#fff"/>' +
    '<rect x="21" y="19" width="58" height="58" fill="#a5d8ff"/>' +
    '<circle cx="64" cy="34" r="7" fill="#ffd43b" stroke="none"/>' +
    '<path d="M28 60 q6 -8 12 0 q6 -6 10 2" fill="#fff" stroke="none"/>' +
    '<path d="M50 19 V77 M21 48 H79" stroke-width="5" stroke="#fff"/><path d="M50 19 V77 M21 48 H79" stroke-width="1.5"/>' +
    '<rect x="21" y="19" width="58" height="58" fill="none"/>' +
    '<rect x="8" y="84" width="84" height="7" rx="3" fill="#c98b52"/>';

  P.sofa =
    '<path d="M18 80 v8 M82 80 v8" stroke-width="6"/>' +
    '<rect x="18" y="28" width="64" height="34" rx="10" fill="#748ffc"/>' +
    '<path d="M50 32 V56" stroke="#5c7cfa" stroke-width="3"/>' +
    '<rect x="20" y="56" width="60" height="16" rx="5" fill="#91a7ff"/>' +
    '<rect x="6" y="44" width="16" height="38" rx="8" fill="#748ffc"/><rect x="78" y="44" width="16" height="38" rx="8" fill="#748ffc"/>' +
    '<rect x="20" y="70" width="60" height="12" rx="3" fill="#748ffc"/>';

  P.television =
    '<path d="M40 6 L50 18 L62 4" fill="none" stroke-width="3"/>' +
    '<rect x="8" y="18" width="84" height="60" rx="8" fill="#495057"/>' +
    '<rect x="15" y="25" width="60" height="46" rx="4" fill="#74c0fc"/>' +
    '<path d="M15 60 Q30 46 44 58 Q56 48 75 62 V71 H15 Z" fill="#51cf66" stroke="none"/>' +
    '<circle cx="34" cy="38" r="5" fill="#ffd43b" stroke="none"/>' +
    '<circle cx="84" cy="34" r="3.5" fill="#fa5252"/><circle cx="84" cy="46" r="3.5" fill="#fcc419"/>' +
    '<path d="M24 78 L18 90 M76 78 L82 90" stroke-width="5"/>';

  P.phone =
    '<rect x="28" y="6" width="44" height="88" rx="10" fill="#343a40"/>' +
    '<rect x="33" y="16" width="34" height="62" rx="3" fill="#74c0fc"/>' +
    [[40, 26, '#ff6b6b'], [50, 26, '#ffd43b'], [60, 26, '#51cf66'], [40, 38, '#cc5de8'], [50, 38, '#ff922b'], [60, 38, '#fff']]
      .map((a) => '<rect x="' + (a[0] - 3.5) + '" y="' + (a[1] - 3.5) + '" width="7" height="7" rx="2" fill="' + a[2] + '" stroke="none"/>')
      .join('') +
    '<circle cx="50" cy="86" r="3.5" fill="#868e96"/>';

  P.computer =
    '<rect x="12" y="12" width="76" height="52" rx="5" fill="#495057"/>' +
    '<rect x="18" y="18" width="64" height="40" rx="2" fill="#d0ebff"/>' +
    '<path d="M24 26 h30 M24 34 h40 M24 42 h22" stroke="#4dabf7" stroke-width="4"/>' +
    '<path d="M44 64 L40 78 H60 L56 64 Z" fill="#868e96"/>' +
    '<rect x="16" y="80" width="68" height="10" rx="3" fill="#ced4da"/>' +
    '<path d="M22 85 h56" stroke="#868e96" stroke-width="2" stroke-dasharray="3 3"/>';

  P.backpack =
    '<path d="M36 22 Q36 8 50 8 Q64 8 64 22" fill="none" stroke-width="5"/>' +
    '<rect x="20" y="20" width="60" height="70" rx="16" fill="#51cf66"/>' +
    '<path d="M20 44 Q50 54 80 44" fill="none"/>' +
    '<rect x="32" y="58" width="36" height="24" rx="6" fill="#40c057"/>' +
    '<path d="M36 64 H64" stroke-width="2"/>' +
    '<rect x="46" y="44" width="8" height="10" rx="2" fill="#ffd43b"/>';

  P.basket =
    '<path d="M24 46 Q24 12 50 12 Q76 12 76 46" fill="none" stroke="' + INK + '" stroke-width="10"/>' +
    '<path d="M24 46 Q24 12 50 12 Q76 12 76 46" fill="none" stroke="#c98b52" stroke-width="5"/>' +
    '<circle cx="40" cy="42" r="10" fill="#fa5252"/><circle cx="58" cy="40" r="10" fill="#ffd43b"/>' +
    '<path d="M12 46 H88 L78 88 H22 Z" fill="#e8a25c"/>' +
    '<path d="M14 58 H86 M17 70 H83 M20 80 H80" stroke="#a0673b" stroke-width="2.5"/>' +
    '<path d="M32 46 L36 88 M50 46 V88 M68 46 L64 88" stroke="#a0673b" stroke-width="2.5"/>';

  P.box =
    '<path d="M10 34 L50 20 L90 34 L50 48 Z" fill="#e8a25c"/>' +
    '<path d="M10 34 L50 48 V90 L10 76 Z" fill="#d9a066"/>' +
    '<path d="M90 34 L50 48 V90 L90 76 Z" fill="#c98b52"/>' +
    '<path d="M10 34 L2 22 L42 10 L50 20 M90 34 L98 22 L58 10 L50 20" fill="#f3d9b1"/>' +
    '<path d="M28 42 V82" stroke="#f3d9b1" stroke-width="6"/>';

  P.bucket =
    '<path d="M22 34 Q50 -4 78 34" fill="none" stroke-width="4"/>' +
    '<path d="M16 34 H84 L76 90 H24 Z" fill="#fa5252"/>' +
    '<ellipse cx="50" cy="34" rx="34" ry="8" fill="#ffc9c9"/>' +
    '<path d="M20 56 H80" stroke="#fff" stroke-width="4"/>';

  P.broom =
    '<path d="M70 6 L48 56" stroke="' + INK + '" stroke-width="9"/><path d="M70 6 L48 56" stroke="#c98b52" stroke-width="4"/>' +
    '<path d="M38 52 L60 62 L56 70 L34 60 Z" fill="#fa5252"/>' +
    '<path d="M34 60 L56 70 L46 94 Q30 92 16 84 Z" fill="#ffd43b"/>' +
    '<path d="M38 66 L26 88 M44 68 L34 92 M50 70 L42 94" stroke="#f59f00" stroke-width="2"/>';

  P.candle =
    '<ellipse cx="50" cy="88" rx="30" ry="6" fill="#fcc419"/>' +
    '<rect x="36" y="38" width="28" height="50" rx="3" fill="#fff"/>' +
    '<path d="M36 46 Q42 52 46 46 V58" fill="none" stroke="#ffc9c9" stroke-width="3"/>' +
    '<path d="M50 38 V30" stroke-width="2.5"/>' +
    '<path d="M50 8 C58 18 58 26 50 30 C42 26 42 18 50 8 Z" fill="#ff922b"/>' +
    '<path d="M50 16 C54 22 54 26 50 28 C46 26 46 22 50 16 Z" fill="#ffd43b" stroke="none"/>';

  P.plate =
    '<path d="M14 30 V50 M10 30 V44 Q10 50 14 50 Q18 50 18 44 V30 M14 50 V86" fill="none" stroke="#adb5bd" stroke-width="3.5"/>' +
    '<path d="M86 30 Q94 44 86 54 V86" fill="none" stroke="#adb5bd" stroke-width="4"/>' +
    '<circle cx="50" cy="56" r="32" fill="#fff"/>' +
    '<circle cx="50" cy="56" r="22" fill="#e7f5ff"/>' +
    '<path d="M38 50 q4 -6 10 -6" fill="none" stroke="#fff" stroke-width="3"/>';

  P.bottle =
    '<rect x="40" y="6" width="20" height="10" rx="3" fill="#4c6ef5"/>' +
    '<path d="M42 16 H58 V26 Q72 32 72 46 V86 Q72 92 66 92 H34 Q28 92 28 86 V46 Q28 32 42 26 Z" fill="#a5d8ff"/>' +
    '<path d="M28 56 Q50 50 72 56 V86 Q72 92 66 92 H34 Q28 92 28 86 Z" fill="#4dabf7"/>' +
    '<path d="M36 46 V80" stroke="#fff" stroke-width="4" opacity=".7"/>';

  P.pot =
    '<path d="M50 20 q-6 -6 0 -12 M38 22 q-6 -6 0 -12 M62 22 q-6 -6 0 -12" fill="none" stroke="#adb5bd" stroke-width="2.5"/>' +
    '<path d="M12 44 H4 M88 44 H96" stroke-width="7"/>' +
    '<rect x="44" y="24" width="12" height="6" rx="3" fill="#495057"/>' +
    '<path d="M10 34 Q50 22 90 34 V38 H10 Z" fill="#868e96"/>' +
    '<path d="M14 38 H86 V76 Q86 88 74 88 H26 Q14 88 14 76 Z" fill="#fa5252"/>' +
    '<path d="M14 50 H86" stroke="#fff" stroke-width="3" opacity=".7"/>';

  P.teddy =
    '<circle cx="28" cy="20" r="10" fill="#c98b52"/><circle cx="72" cy="20" r="10" fill="#c98b52"/>' +
    '<circle cx="28" cy="20" r="5" fill="#f3d2a8" stroke="none"/><circle cx="72" cy="20" r="5" fill="#f3d2a8" stroke="none"/>' +
    '<circle cx="22" cy="62" r="10" fill="#c98b52"/><circle cx="78" cy="62" r="10" fill="#c98b52"/>' +
    '<circle cx="34" cy="86" r="11" fill="#c98b52"/><circle cx="66" cy="86" r="11" fill="#c98b52"/>' +
    '<ellipse cx="50" cy="68" rx="24" ry="22" fill="#c98b52"/>' +
    '<ellipse cx="50" cy="70" rx="14" ry="13" fill="#f3d2a8"/>' +
    '<circle cx="50" cy="34" r="22" fill="#c98b52"/>' +
    eye(42, 30, 3) + eye(58, 30, 3) +
    '<ellipse cx="50" cy="42" rx="9" ry="7" fill="#f3d2a8"/>' +
    '<ellipse cx="50" cy="39" rx="3.5" ry="2.5" fill="' + INK + '" stroke="none"/>' +
    '<path d="M38 54 L50 58 L62 54 L62 62 L50 58 L38 62 Z" fill="#fa5252" stroke-width="2"/>';

  P.doll =
    '<path d="M28 34 Q26 64 34 74 M72 34 Q74 64 66 74" fill="none" stroke="#e8590c" stroke-width="8"/>' +
    '<path d="M36 56 H64 L76 92 H24 Z" fill="#cc5de8"/>' +
    '<path d="M40 64 L60 64" stroke="#fff" stroke-width="3"/>' +
    '<circle cx="50" cy="36" r="20" fill="#ffd8a8"/>' +
    '<path d="M30 34 Q30 14 50 14 Q70 14 70 34 Q60 22 50 26 Q40 22 30 34 Z" fill="#e8590c"/>' +
    eye(43, 38, 3) + eye(57, 38, 3) + cheeks(45, 13) +
    '<path d="M45 46 q5 4 10 0" fill="none" stroke-width="2"/>' +
    '<circle cx="66" cy="18" r="5" fill="#ff8fab"/>';

  P.robot =
    '<path d="M50 14 V6" stroke-width="3"/><circle cx="50" cy="5" r="4" fill="#fa5252"/>' +
    '<rect x="26" y="14" width="48" height="34" rx="8" fill="#adb5bd"/>' +
    '<rect x="20" y="26" width="6" height="12" rx="2" fill="#868e96"/><rect x="74" y="26" width="6" height="12" rx="2" fill="#868e96"/>' +
    '<circle cx="40" cy="30" r="6" fill="#ffd43b"/><circle cx="60" cy="30" r="6" fill="#ffd43b"/>' +
    '<circle cx="40" cy="30" r="2.5" fill="' + INK + '" stroke="none"/><circle cx="60" cy="30" r="2.5" fill="' + INK + '" stroke="none"/>' +
    '<rect x="40" y="40" width="20" height="4" rx="2" fill="#fff" stroke-width="2"/>' +
    '<path d="M30 58 L16 70 M70 58 L84 70" stroke="' + INK + '" stroke-width="9"/><path d="M30 58 L16 70 M70 58 L84 70" stroke="#adb5bd" stroke-width="4"/>' +
    '<rect x="30" y="52" width="40" height="32" rx="5" fill="#74c0fc"/>' +
    '<circle cx="42" cy="64" r="3.5" fill="#fa5252"/><circle cx="58" cy="64" r="3.5" fill="#51cf66"/>' +
    '<path d="M40 74 H60" stroke-width="3"/>' +
    '<rect x="34" y="84" width="10" height="10" rx="2" fill="#868e96"/><rect x="56" y="84" width="10" height="10" rx="2" fill="#868e96"/>';

  P.brush =
    '<path d="M86 70 Q94 82 84 90 Q76 86 80 74 Z" fill="#fa5252"/>' +
    '<g transform="rotate(-45 50 50)">' +
    '<rect x="44" y="4" width="12" height="52" rx="6" fill="#c98b52"/>' +
    '<rect x="42" y="54" width="16" height="12" fill="#ced4da"/>' +
    '<path d="M42 66 H58 Q60 82 50 94 Q40 82 42 66 Z" fill="#fa5252"/>' +
    '</g>';

  P.ladder =
    '<path d="M30 8 V92 M70 8 V92" stroke="' + INK + '" stroke-width="10"/>' +
    '<path d="M30 8 V92 M70 8 V92" stroke="#c98b52" stroke-width="5"/>' +
    [20, 38, 56, 74].map((y) => '<rect x="32" y="' + (y - 3) + '" width="36" height="7" rx="2" fill="#e8a25c"/>').join('');

  P.hammer =
    '<g transform="rotate(-35 50 50)">' +
    '<rect x="45" y="34" width="10" height="60" rx="4" fill="#c98b52"/>' +
    '<path d="M24 16 H66 Q76 16 80 24 L80 30 H66 V38 H24 Q20 38 20 34 V20 Q20 16 24 16 Z" fill="#868e96"/>' +
    '<path d="M26 22 h30" stroke="#fff" stroke-width="3" opacity=".6"/>' +
    '</g>';

  // ---------- Vehicles (second set) ----------

  function wheels(xs, y, r) {
    return xs.map((x) => '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="#495057"/><circle cx="' + x + '" cy="' + y + '" r="' + r * 0.4 + '" fill="#ced4da"/>').join('');
  }

  P.truck =
    '<rect x="6" y="26" width="56" height="44" rx="3" fill="#4dabf7"/>' +
    '<path d="M62 40 H80 L92 54 V70 H62 Z" fill="#ffd43b"/>' +
    '<path d="M67 44 H78 L86 54 H67 Z" fill="#d0ebff"/>' +
    '<path d="M14 36 H54 M14 48 H54" stroke="#fff" stroke-width="3" opacity=".7"/>' +
    '<rect x="88" y="60" width="6" height="5" rx="2" fill="#fff"/>' +
    wheels([22, 46, 78], 74, 9);

  P.tractor =
    '<rect x="46" y="20" width="28" height="30" rx="3" fill="#d0ebff"/>' +
    '<path d="M42 18 H78" stroke-width="5"/>' +
    '<rect x="20" y="22" width="6" height="18" fill="#495057"/>' +
    '<path d="M12 50 H80 V68 H12 Z" fill="#51cf66"/>' +
    '<path d="M12 40 H46 V50 H12 Z" fill="#51cf66"/>' +
    '<circle cx="62" cy="68" r="20" fill="#495057"/><circle cx="62" cy="68" r="9" fill="#ffd43b"/>' +
    '<circle cx="22" cy="76" r="11" fill="#495057"/><circle cx="22" cy="76" r="5" fill="#ffd43b"/>';

  P.helicopter =
    '<path d="M14 14 H86 M50 14 V26" stroke-width="5"/>' +
    '<path d="M64 46 H92 M92 38 V54" stroke-width="5"/>' +
    '<path d="M34 84 H76 M42 74 V84 M66 74 V84" stroke-width="4"/>' +
    '<path d="M24 50 Q24 26 50 26 Q72 26 72 50 Q72 74 50 74 Q24 74 24 50 Z" fill="#fa5252"/>' +
    '<path d="M28 50 Q28 32 46 30 V50 Z" fill="#d0ebff"/>' +
    '<circle cx="92" cy="46" r="3" fill="#fff"/>';

  P.ambulance =
    '<path d="M8 30 H66 L80 46 H92 V72 H8 Z" fill="#fff"/>' +
    '<path d="M66 32 L78 46 H66 Z" fill="#d0ebff"/>' +
    '<path d="M8 58 H92" stroke="#fa5252" stroke-width="5"/>' +
    '<path d="M32 36 h8 v8 h8 v8 h-8 v8 h-8 v-8 h-8 v-8 h8 z" fill="#fa5252" stroke-width="2"/>' +
    '<rect x="40" y="20" width="12" height="10" rx="3" fill="#4dabf7"/>' +
    wheels([26, 74], 74, 9);

  P.firetruck =
    '<path d="M14 22 L74 14 M24 24 L22 21 M34 23 L32 19 M44 21 L42 18 M54 20 L52 17 M64 19 L62 15" stroke="#ced4da" stroke-width="4"/>' +
    '<path d="M6 32 H66 V72 H6 Z" fill="#fa5252"/>' +
    '<path d="M66 36 H80 L92 52 V72 H66 Z" fill="#fa5252"/>' +
    '<path d="M70 40 H79 L86 52 H70 Z" fill="#d0ebff"/>' +
    '<rect x="12" y="40" width="48" height="14" rx="2" fill="#ffd43b"/>' +
    '<path d="M20 40 V54 M30 40 V54 M40 40 V54 M50 40 V54" stroke-width="2"/>' +
    '<rect x="70" y="28" width="10" height="8" rx="2" fill="#4dabf7"/>' +
    wheels([22, 46, 78], 74, 9);

  P.scooter =
    '<path d="M70 70 L62 16 M54 16 H72" fill="none" stroke="' + INK + '" stroke-width="9"/>' +
    '<path d="M70 70 L62 16 M54 16 H72" fill="none" stroke="#cc5de8" stroke-width="4"/>' +
    '<path d="M22 70 H72" stroke="' + INK + '" stroke-width="11"/><path d="M22 70 H72" stroke="#cc5de8" stroke-width="6"/>' +
    '<circle cx="24" cy="78" r="9" fill="#495057"/><circle cx="72" cy="78" r="9" fill="#495057"/>' +
    '<circle cx="24" cy="78" r="3.5" fill="#ced4da"/><circle cx="72" cy="78" r="3.5" fill="#ced4da"/>';

  P.submarine =
    '<path d="M4 84 q8 -6 16 0 q8 6 16 0 q8 -6 16 0 q8 6 16 0 q8 -6 16 0 q8 6 16 0" fill="none" stroke="#4dabf7" stroke-width="3"/>' +
    '<path d="M54 30 V14 H66" fill="none" stroke-width="4"/>' +
    '<rect x="40" y="28" width="22" height="16" rx="4" fill="#fcc419"/>' +
    '<path d="M82 50 L96 38 V72 L82 62 Z" fill="#f59f00"/>' +
    '<rect x="8" y="40" width="80" height="32" rx="16" fill="#fcc419"/>' +
    '<circle cx="30" cy="56" r="6" fill="#d0ebff" stroke-width="3"/><circle cx="50" cy="56" r="6" fill="#d0ebff" stroke-width="3"/><circle cx="70" cy="56" r="6" fill="#d0ebff" stroke-width="3"/>' +
    '<circle cx="80" cy="20" r="3" fill="#d0ebff"/><circle cx="88" cy="12" r="2.5" fill="#d0ebff"/>';

  // ---------- Nature (third set) ----------

  P.wave =
    '<path d="M4 88 V60 C10 32 34 14 58 20 C76 24 82 40 74 50 C68 56 58 52 60 44 C62 38 70 40 68 46 C76 46 92 54 96 70 V88 Z" fill="#4dabf7"/>' +
    '<path d="M8 72 C22 60 34 66 46 60 C58 54 70 62 92 64" fill="none" stroke="#a5d8ff" stroke-width="4"/>' +
    '<path d="M30 30 C40 22 52 22 60 26" fill="none" stroke="#fff" stroke-width="4"/>';

  P.rock =
    '<path d="M12 82 L18 50 L36 30 L62 26 L82 40 L90 66 L84 82 Z" fill="#adb5bd"/>' +
    '<path d="M36 30 L44 52 L18 50 M44 52 L62 26 M44 52 L84 82 M44 52 L82 40 M44 52 L30 82" fill="none" stroke="#868e96" stroke-width="2.5"/>' +
    '<path d="M6 84 H94" stroke-width="3"/>';

  P.cactus =
    '<path d="M30 74 H70 L64 92 H36 Z" fill="#e8590c"/>' +
    '<path d="M28 74 H72" stroke-width="4"/>' +
    limb('M34 52 Q22 52 22 40 V30', '#51cf66', 10) +
    limb('M66 46 Q78 46 78 34 V26', '#51cf66', 10) +
    '<path d="M38 74 V22 Q38 10 50 10 Q62 10 62 22 V74 Z" fill="#51cf66"/>' +
    '<path d="M44 26 v4 M56 36 v4 M46 50 v4 M54 60 v4" stroke="#2b8a3e" stroke-width="2"/>' +
    '<circle cx="50" cy="10" r="5" fill="#ff8fab"/>';

  P.volcano =
    '<path d="M44 26 Q36 14 44 6 Q50 14 56 6 Q64 14 56 26 Z" fill="#adb5bd"/>' +
    '<path d="M6 90 L38 30 H62 L94 90 Z" fill="#a0673b"/>' +
    '<path d="M38 30 H62 L58 40 Q54 50 52 62 Q48 50 46 44 Q44 52 40 54 Z" fill="#ff6b6b"/>' +
    '<path d="M38 30 Q50 22 62 30" fill="#fa5252"/>' +
    '<circle cx="30" cy="18" r="3" fill="#ff922b"/><circle cx="72" cy="14" r="3" fill="#ff922b"/>';

  P.planet =
    '<circle cx="50" cy="50" r="28" fill="#ffa94d"/>' +
    '<path d="M24 44 Q50 50 76 42 M26 58 Q50 64 74 56" fill="none" stroke="#e8590c" stroke-width="3"/>' +
    '<path d="M22 54 C4 62 6 72 22 70 C40 68 64 58 80 46 C96 34 92 26 76 32" fill="none" stroke="' + INK + '" stroke-width="9"/>' +
    '<path d="M22 54 C4 62 6 72 22 70 C40 68 64 58 80 46 C96 34 92 26 76 32" fill="none" stroke="#ffe066" stroke-width="4"/>' +
    '<circle cx="18" cy="20" r="2" fill="#fcc419" stroke="none"/><circle cx="84" cy="80" r="2.5" fill="#fcc419" stroke="none"/>';

  P.shell =
    '<path d="M50 88 L14 46 Q12 18 50 14 Q88 18 86 46 Z" fill="#ffc2d1"/>' +
    '<path d="M50 88 L28 22 M50 88 L42 15 M50 88 L58 15 M50 88 L72 22 M50 88 L18 34 M50 88 L82 34" stroke="#f783ac" stroke-width="2.5"/>' +
    '<path d="M40 82 H60 L56 92 H44 Z" fill="#ffc2d1"/>';

  P.feather =
    '<path d="M24 86 L74 18" stroke="#a0673b" stroke-width="3"/>' +
    '<path d="M30 78 C18 52 44 18 80 10 C88 40 62 76 30 78 Z" fill="#74c0fc"/>' +
    '<path d="M30 78 L76 16" stroke="#1c7ed6" stroke-width="2.5"/>' +
    '<path d="M40 64 L30 54 M50 52 L40 40 M60 38 L52 28 M44 60 L58 62 M54 46 L70 46 M64 34 L78 32" stroke="#1c7ed6" stroke-width="2"/>';

  P.nest =
    '<ellipse cx="38" cy="50" rx="9" ry="12" fill="#a5d8ff"/><ellipse cx="54" cy="48" rx="9" ry="12" fill="#a5d8ff"/><ellipse cx="66" cy="52" rx="8" ry="11" fill="#a5d8ff"/>' +
    '<path d="M10 54 Q12 82 50 84 Q88 82 90 54 Q50 64 10 54 Z" fill="#c98b52"/>' +
    '<path d="M14 62 Q50 72 86 62 M20 72 Q50 80 80 72 M18 58 L32 70 M40 64 L54 76 M62 64 L74 74 M80 58 L70 70" fill="none" stroke="#7a4a26" stroke-width="2"/>';

  P.lightning =
    '<path d="M20 34 Q14 18 32 16 Q38 4 54 8 Q70 2 76 16 Q90 16 86 32 Z" fill="#868e96"/>' +
    '<path d="M54 28 L34 60 H50 L40 94 L70 52 H54 L64 28 Z" fill="#ffd43b"/>';

  // ---------- Body (second set) ----------

  P.foot =
    '<path d="M30 30 C20 50 22 70 26 82 C30 92 52 94 60 86 C68 78 62 66 70 56 C78 44 76 30 62 28 C50 26 40 26 30 30 Z" fill="#ffd8a8"/>' +
    [[34, 18, 7], [48, 14, 6], [60, 16, 5.5], [70, 21, 5], [77, 28, 4.5]].map((t) => '<circle cx="' + t[0] + '" cy="' + t[1] + '" r="' + t[2] + '" fill="#ffd8a8"/>').join('');

  P.mouth =
    '<path d="M10 46 Q30 30 50 38 Q70 30 90 46 Q72 86 50 86 Q28 86 10 46 Z" fill="#fa5252"/>' +
    '<path d="M16 48 Q50 44 84 48 Q74 72 50 74 Q26 72 16 48 Z" fill="#862e2e"/>' +
    '<path d="M18 48 Q50 46 82 48 L80 56 Q50 54 20 56 Z" fill="#fff" stroke-width="2"/>' +
    '<path d="M34 66 Q50 58 66 66 Q60 74 50 74 Q40 74 34 66 Z" fill="#ff8787" stroke="none"/>';

  P.leg =
    '<path d="M38 6 H62 L60 62 Q60 70 64 74 L84 78 Q92 82 88 90 H40 Q34 90 36 82 Z" fill="#ffd8a8"/>' +
    '<path d="M38 6 H62 L61 34 H38 Z" fill="#4dabf7"/>' +
    '<path d="M42 50 q4 4 8 0" fill="none" stroke="#e8a25c" stroke-width="2.5"/>';

  // ---------- Places & things ----------

  P.flag =
    '<path d="M24 10 V92" stroke="' + INK + '" stroke-width="7"/><path d="M24 10 V92" stroke="#a0673b" stroke-width="3"/>' +
    '<circle cx="24" cy="9" r="4" fill="#fcc419"/>' +
    '<path d="M27 16 Q46 8 60 16 Q74 24 90 16 V52 Q74 60 60 52 Q46 44 27 52 Z" fill="#4dabf7"/>' +
    '<path d="M58 22 L61 30 L69 30 L63 35 L65 43 L58 38 L51 43 L53 35 L47 30 L55 30 Z" fill="#ffd43b" stroke-width="2"/>';

  P.castle =
    '<path d="M50 6 V16 L62 10 L50 6" fill="#fa5252" stroke-width="2"/>' +
    '<path d="M8 40 V30 H14 V36 H20 V30 H26 V40 Z M74 40 V30 H80 V36 H86 V30 H92 V40 Z" fill="#ced4da"/>' +
    '<rect x="8" y="40" width="18" height="50" fill="#ced4da"/><rect x="74" y="40" width="18" height="50" fill="#ced4da"/>' +
    '<path d="M30 48 V36 H36 V42 H42 V36 H48 V42 H52 V36 H58 V42 H64 V36 H70 V48 Z" fill="#adb5bd"/>' +
    '<rect x="26" y="48" width="48" height="42" fill="#adb5bd"/>' +
    '<rect x="44" y="16" width="12" height="20" fill="#ced4da"/>' +
    '<path d="M40 90 V74 Q40 64 50 64 Q60 64 60 74 V90 Z" fill="#a0673b"/>' +
    '<path d="M14 54 h6 v8 h-6 z M80 54 h6 v8 h-6 z M34 56 h6 v8 h-6 z M60 56 h6 v8 h-6 z" fill="#495057" stroke="none"/>';

  LG.PICTURES = P;
  LG.picture = function (id) {
    return P[id] ? svg(P[id]) : '';
  };
})();
