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
    horse | horse | konj | Pferd | cheval | caballo
    giraffe | giraffe | žirafa | Giraffe | girafe | jirafa
    zebra | zebra | zebra | Zebra | zèbre | cebra
    tiger | tiger | tiger | Tiger | tigre | tigre
    panda | panda | panda | Panda | panda | panda
    camel | camel | kamela | Kamel | chameau | camello
    hippo | hippo | povodni konj | Nilpferd | hippopotame | hipopótamo
    crocodile | crocodile | krokodil | Krokodil | crocodile | cocodrilo
    shark | shark | morski pes | Hai | requin | tiburón
    dolphin | dolphin | delfin | Delfin | dauphin | delfín
    starfish | starfish | morska zvezda | Seestern | étoile de mer | estrella de mar
    jellyfish | jellyfish | meduza | Qualle | méduse | medusa
    squirrel | squirrel | veverica | Eichhörnchen | écureuil | ardilla
    hedgehog | hedgehog | jež | Igel | hérisson | erizo
    goat | goat | koza | Ziege | chèvre | cabra
    chick | chick | piščanec | Küken | poussin | pollito
    parrot | parrot | papiga | Papagei | perroquet | loro
    bat | bat | netopir | Fledermaus | chauve-souris | murciélago
    worm | worm | črv | Wurm | ver | gusano
    ant | ant | mravlja | Ameise | fourmi | hormiga
    dinosaur | dinosaur | dinozaver | Dinosaurier | dinosaure | dinosaurio
    flamingo | flamingo | flamingo | Flamingo | flamant | flamenco
    seal | seal | tjulenj | Robbe | phoque | foca
    koala | koala | koala | Koala | koala | koala
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
    potato | potato | krompir | Kartoffel | pomme de terre | patata
    corn | corn | koruza | Mais | maïs | maíz
    cucumber | cucumber | kumara | Gurke | concombre | pepino
    pepper | pepper | paprika | Paprika | poivron | pimiento
    onion | onion | čebula | Zwiebel | oignon | cebolla
    broccoli | broccoli | brokoli | Brokkoli | brocoli | brócoli
    peach | peach | breskev | Pfirsich | pêche | melocotón
    plum | plum | sliva | Pflaume | prune | ciruela
    kiwi | kiwi | kivi | Kiwi | kiwi | kiwi
    coconut | coconut | kokos | Kokosnuss | noix de coco | coco
    nut | nut | oreh | Nuss | noix | nuez
    honey | honey | med | Honig | miel | miel
    chocolate | chocolate | čokolada | Schokolade | chocolat | chocolate
    candy | candy | bonbon | Bonbon | bonbon | caramelo
    lollipop | lollipop | lizika | Lutscher | sucette | piruleta
    donut | donut | krof | Donut | beignet | dónut
    sandwich | sandwich | sendvič | Sandwich | sandwich | sándwich
    soup | soup | juha | Suppe | soupe | sopa
    hat | hat | klobuk | Hut | chapeau | sombrero
    sock | sock | nogavica | Socke | chaussette | calcetín
    shoe | shoe | čevelj | Schuh | chaussure | zapato
    shirt | shirt | majica | T-Shirt | tee-shirt | camiseta
    glasses | glasses | očala | Brille | lunettes | gafas
    dress | dress | obleka | Kleid | robe | vestido
    trousers | trousers | hlače | Hose | pantalon | pantalón
    jacket | jacket | jakna | Jacke | veste | chaqueta
    scarf | scarf | šal | Schal | écharpe | bufanda
    glove | glove | rokavica | Handschuh | gant | guante
    boot | boot | škorenj | Stiefel | botte | bota
    cap | cap | kapa | Kappe | casquette | gorra
    button | button | gumb | Knopf | bouton | botón
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
    bathtub | bathtub | kad | Badewanne | baignoire | bañera
    soap | soap | milo | Seife | savon | jabón
    towel | towel | brisača | Handtuch | serviette | toalla
    toothbrush | toothbrush | zobna ščetka | Zahnbürste | brosse à dents | cepillo de dientes
    comb | comb | glavnik | Kamm | peigne | peine
    mirror | mirror | ogledalo | Spiegel | miroir | espejo
    window | window | okno | Fenster | fenêtre | ventana
    sofa | sofa | kavč | Sofa | canapé | sofá
    television | TV | televizor | Fernseher | télévision | televisión
    phone | phone | telefon | Telefon | téléphone | teléfono
    computer | computer | računalnik | Computer | ordinateur | ordenador
    backpack | backpack | nahrbtnik | Rucksack | sac à dos | mochila
    basket | basket | košara | Korb | panier | cesta
    box | box | škatla | Kiste | boîte | caja
    bucket | bucket | vedro | Eimer | seau | cubo
    broom | broom | metla | Besen | balai | escoba
    candle | candle | sveča | Kerze | bougie | vela
    plate | plate | krožnik | Teller | assiette | plato
    bottle | bottle | steklenica | Flasche | bouteille | botella
    pot | pot | lonec | Topf | casserole | olla
    teddy | teddy | medvedek | Teddy | nounours | osito
    doll | doll | punčka | Puppe | poupée | muñeca
    robot | robot | robot | Roboter | robot | robot
    brush | brush | čopič | Pinsel | pinceau | pincel
    ladder | ladder | lestev | Leiter | échelle | escalera
    hammer | hammer | kladivo | Hammer | marteau | martillo
    house | house | hiša | Haus | maison | casa
    car | car | avto | Auto | voiture | coche
    bus | bus | avtobus | Bus | bus | autobús
    train | train | vlak | Zug | train | tren
    plane | plane | letalo | Flugzeug | avion | avión
    bike | bike | kolo | Fahrrad | vélo | bicicleta
    boat | boat | ladja | Boot | bateau | barco
    rocket | rocket | raketa | Rakete | fusée | cohete
    truck | truck | tovornjak | Lastwagen | camion | camión
    tractor | tractor | traktor | Traktor | tracteur | tractor
    helicopter | helicopter | helikopter | Hubschrauber | hélicoptère | helicóptero
    ambulance | ambulance | rešilec | Krankenwagen | ambulance | ambulancia
    firetruck | fire truck | gasilsko vozilo | Feuerwehrauto | camion de pompiers | camión de bomberos
    scooter | scooter | skiro | Roller | trottinette | patinete
    submarine | submarine | podmornica | U-Boot | sous-marin | submarino
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
    wave | wave | val | Welle | vague | ola
    rock | rock | kamen | Stein | caillou | piedra
    cactus | cactus | kaktus | Kaktus | cactus | cactus
    volcano | volcano | vulkan | Vulkan | volcan | volcán
    planet | planet | planet | Planet | planète | planeta
    shell | shell | školjka | Muschel | coquillage | concha
    feather | feather | pero | Feder | plume | pluma
    nest | nest | gnezdo | Nest | nid | nido
    lightning | lightning | strela | Blitz | éclair | rayo
    heart | heart | srce | Herz | cœur | corazón
    eye | eye | oko | Auge | œil | ojo
    ear | ear | uho | Ohr | oreille | oreja
    nose | nose | nos | Nase | nez | nariz
    hand | hand | roka | Hand | main | mano
    tooth | tooth | zob | Zahn | dent | diente
    foot | foot | stopalo | Fuß | pied | pie
    mouth | mouth | usta | Mund | bouche | boca
    leg | leg | noga | Bein | jambe | pierna
    flag | flag | zastava | Fahne | drapeau | bandera
    castle | castle | grad | Burg | château | castillo
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
  const SKIP_FIRST_WORDS = { en: ['owl', 'eye', 'ear', 'ice cream', 'TV'] };

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
