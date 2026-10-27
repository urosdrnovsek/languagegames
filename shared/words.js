// Word bank. One row per picture (shared/pictures.js), one column per
// language. German nouns keep their capital letter.
(function () {
  const LG = (window.LG = window.LG || {});

  LG.LANGS = ['en', 'sl', 'de', 'fr', 'es'];

  // picture | en | sl | de | fr | es
  const TABLE = `
    cat | cat | muca | Katze | chat | gato
    dog | dog | pes | Hund | chien | perro
    pig | pig | pujs | Schwein | cochon | cerdo
    bear | bear | medved | Bär | ours | oso
    mouse | mouse | miš | Maus | souris | ratón
    lion | lion | lev | Löwe | lion | león
    cow | cow | krava | Kuh | vache | vaca
    sheep | sheep | ovca | Schaf | mouton | oveja
    owl | owl | sova | Eule | hibou | búho
    duck | duck | raca | Ente | canard | pato
    frog | frog | žaba | Frosch | grenouille | rana
    fish | fish | riba | Fisch | poisson | pez
    bee | bee | čebela | Biene | abeille | abeja
    bird | bird | ptič | Vogel | oiseau | pájaro
    snake | snake | kača | Schlange | serpent | serpiente
    snail | snail | polž | Schnecke | escargot | caracol
    rabbit | rabbit | zajec | Hase | lapin | conejo
    elephant | elephant | slon | Elefant | éléphant | elefante
    monkey | monkey | opica | Affe | singe | mono
    penguin | penguin | pingvin | Pinguin | pingouin | pingüino
    turtle | turtle | želva | Schildkröte | tortue | tortuga
    butterfly | butterfly | metulj | Schmetterling | papillon | mariposa
    ladybug | ladybug | pikapolonica | Marienkäfer | coccinelle | mariquita
    spider | spider | pajek | Spinne | araignée | araña
    whale | whale | kit | Wal | baleine | ballena
    hen | hen | kokoš | Huhn | poule | gallina
    fox | fox | lisica | Fuchs | renard | zorro
    crab | crab | rak | Krabbe | crabe | cangrejo
    octopus | octopus | hobotnica | Krake | pieuvre | pulpo
    apple | apple | jabolko | Apfel | pomme | manzana
    banana | banana | banana | Banane | banane | plátano
    pear | pear | hruška | Birne | poire | pera
    carrot | carrot | korenje | Karotte | carotte | zanahoria
    cheese | cheese | sir | Käse | fromage | queso
    bread | bread | kruh | Brot | pain | pan
    egg | egg | jajce | Ei | œuf | huevo
    milk | milk | mleko | Milch | lait | leche
    cake | cake | torta | Kuchen | gâteau | pastel
    grapes | grapes | grozdje | Trauben | raisin | uvas
    lemon | lemon | limona | Zitrone | citron | limón
    cherry | cherry | češnja | Kirsche | cerise | cereza
    orange | orange | pomaranča | Orange | orange | naranja
    strawberry | strawberry | jagoda | Erdbeere | fraise | fresa
    watermelon | watermelon | lubenica | Melone | pastèque | sandía
    tomato | tomato | paradižnik | Tomate | tomate | tomate
    mushroom | mushroom | goba | Pilz | champignon | seta
    icecream | ice cream | sladoled | Eis | glace | helado
    pizza | pizza | pica | Pizza | pizza | pizza
    cookie | cookie | piškot | Keks | biscuit | galleta
    pineapple | pineapple | ananas | Ananas | ananas | piña
    hat | hat | klobuk | Hut | chapeau | sombrero
    sock | sock | nogavica | Socke | chaussette | calcetín
    shoe | shoe | čevelj | Schuh | chaussure | zapato
    shirt | shirt | majica | T-Shirt | tee-shirt | camiseta
    glasses | glasses | očala | Brille | lunettes | gafas
    cup | cup | lonček | Tasse | tasse | taza
    spoon | spoon | žlica | Löffel | cuillère | cuchara
    fork | fork | vilice | Gabel | fourchette | tenedor
    ball | ball | žoga | Ball | balle | pelota
    balloon | balloon | balon | Luftballon | ballon | globo
    kite | kite | zmaj | Drachen | cerf-volant | cometa
    drum | drum | boben | Trommel | tambour | tambor
    guitar | guitar | kitara | Gitarre | guitare | guitarra
    bell | bell | zvonec | Glocke | cloche | campana
    book | book | knjiga | Buch | livre | libro
    pencil | pencil | svinčnik | Stift | crayon | lápiz
    scissors | scissors | škarje | Schere | ciseaux | tijeras
    key | key | ključ | Schlüssel | clé | llave
    clock | clock | ura | Uhr | réveil | reloj
    umbrella | umbrella | dežnik | Regenschirm | parapluie | paraguas
    crown | crown | krona | Krone | couronne | corona
    gift | gift | darilo | Geschenk | cadeau | regalo
    bed | bed | postelja | Bett | lit | cama
    chair | chair | stol | Stuhl | chaise | silla
    table | table | miza | Tisch | table | mesa
    lamp | lamp | svetilka | Lampe | lampe | lámpara
    door | door | vrata | Tür | porte | puerta
    house | house | hiša | Haus | maison | casa
    car | car | avto | Auto | voiture | coche
    bus | bus | avtobus | Bus | bus | autobús
    train | train | vlak | Zug | train | tren
    plane | plane | letalo | Flugzeug | avion | avión
    bike | bike | kolo | Fahrrad | vélo | bicicleta
    boat | boat | ladja | Boot | bateau | barco
    rocket | rocket | raketa | Rakete | fusée | cohete
    sun | sun | sonce | Sonne | soleil | sol
    moon | moon | luna | Mond | lune | luna
    star | star | zvezda | Stern | étoile | estrella
    cloud | cloud | oblak | Wolke | nuage | nube
    rainbow | rainbow | mavrica | Regenbogen | arc-en-ciel | arcoíris
    snowflake | snowflake | snežinka | Schneeflocke | flocon | copo
    snowman | snowman | snežak | Schneemann | bonhomme de neige | muñeco de nieve
    fire | fire | ogenj | Feuer | feu | fuego
    mountain | mountain | gora | Berg | montagne | montaña
    tree | tree | drevo | Baum | arbre | árbol
    flower | flower | roža | Blume | fleur | flor
    leaf | leaf | list | Blatt | feuille | hoja
    heart | heart | srce | Herz | cœur | corazón
    eye | eye | oko | Auge | œil | ojo
    ear | ear | uho | Ohr | oreille | oreja
    nose | nose | nos | Nase | nez | nariz
    hand | hand | roka | Hand | main | mano
    tooth | tooth | zob | Zahn | dent | diente
  `;

  LG.VOCAB = TABLE.trim()
    .split('\n')
    .map((line) => {
      const cells = line.split('|').map((c) => c.trim().normalize('NFC'));
      const entry = { pic: cells[0] };
      LG.LANGS.forEach((lang, i) => (entry[lang] = cells[i + 1]));
      return entry;
    });

  // The First Letter game skips words whose first letter doesn't match their
  // first sound: digraphs (sh, sch, ch, ll), silent h, soft c/g and so on.
  const SKIP_FIRST = {
    en: /^(ch|sh|th|wh|ph|kn|wr)/i,
    sl: /^$/,
    de: /^(sch|ch|st|sp|ei|eu|au|äu|ie|ph)/i,
    fr: /^(ch|h|ph|qu|ou|au|eau|œ|oi|ai|ei|gn|[cg][eiyéè]|(an|en|in|on|un|am|em|im|om)(?![aeiouyéèêh]))/i,
    es: /^(ch|ll|h|qu|gu[eiéí]|[cg][eiéí])/i,
  };
  // Words the rules above miss.
  const SKIP_FIRST_WORDS = { en: ['owl', 'eye', 'ear', 'ice cream'] };

  LG.ALPHABET = {
    en: 'abcdefghijklmnoprstuvwyz'.split(''),
    sl: 'abcčdefghijklmnoprsštuvzž'.split(''),
    de: 'abcdefghijklmnoprstuvwzäöü'.split(''),
    fr: 'abcdefghijlmnoprstuvz'.split(''),
    es: 'abcdefghijlmnñoprstuvz'.split(''),
  };

  // How the speech voice should say a single letter. Languages without an
  // entry say the capital letter, which voices read as the letter's name.
  LG.LETTER_NAMES = {
    sl: {
      a: 'a', b: 'be', c: 'ce', č: 'če', d: 'de', e: 'e', f: 'ef', g: 'ge', h: 'ha', i: 'i',
      j: 'je', k: 'ka', l: 'el', m: 'em', n: 'en', o: 'o', p: 'pe', r: 'er', s: 'es', š: 'še',
      t: 'te', u: 'u', v: 've', z: 'ze', ž: 'že',
    },
  };

  // Words for one language: [{ pic, word, letters }].
  //   firstLetter: only words that suit the First Letter game
  //   maxLength:   only single words (no spaces or hyphens) up to this length
  LG.words = function (lang, opts) {
    opts = opts || {};
    const skipWords = SKIP_FIRST_WORDS[lang] || [];
    return LG.VOCAB.filter((v) => v[lang] && LG.PICTURES[v.pic])
      .map((v) => ({ pic: v.pic, word: v[lang], letters: Array.from(v[lang]) }))
      .filter((w) => !opts.firstLetter || !(SKIP_FIRST[lang].test(w.word) || skipWords.includes(w.word)))
      .filter((w) => !opts.maxLength || (w.letters.length <= opts.maxLength && /^\p{L}+$/u.test(w.word)));
  };
})();
