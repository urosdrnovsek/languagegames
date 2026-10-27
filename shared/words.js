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
    hand | hand | dlan | Hand | main | mano
    tooth | tooth | zob | Zahn | dent | diente
    foot | foot | stopalo | Fuß | pied | pie
    mouth | mouth | usta | Mund | bouche | boca
    leg | leg | noga | Bein | jambe | pierna
    flag | flag | zastava | Fahne | drapeau | bandera
    castle | castle | grad | Burg | château | castillo
    red | red | rdeča | rot | rouge | rojo
    blue | blue | modra | blau | bleu | azul
    yellow | yellow | rumena | gelb | jaune | amarillo
    green | green | zelena | grün | vert | verde
    colorOrange | orange | oranžna | orange | orange | naranja
    purple | purple | vijolična | lila | violet | morado
    pink | pink | roza | rosa | rose | rosa
    brown | brown | rjava | braun | marron | marrón
    black | black | črna | schwarz | noir | negro
    white | white | bela | weiß | blanc | blanco
    grey | grey | siva | grau | gris | gris
    one | one | ena | eins | un | uno
    two | two | dva | zwei | deux | dos
    three | three | tri | drei | trois | tres
    four | four | štiri | vier | quatre | cuatro
    five | five | pet | fünf | cinq | cinco
    six | six | šest | sechs | six | seis
    seven | seven | sedem | sieben | sept | siete
    eight | eight | osem | acht | huit | ocho
    nine | nine | devet | neun | neuf | nueve
    ten | ten | deset | zehn | dix | diez
    mother | mother | mama | Mutter | mère | madre
    father | father | oče | Vater | père | padre
    baby | baby | dojenček | Baby | bébé | bebé
    grandma | grandma | babica | Oma | grand-mère | abuela
    grandpa | grandpa | dedek | Opa | grand-père | abuelo
    brother | brother | brat | Bruder | frère | hermano
    sister | sister | sestra | Schwester | sœur | hermana
    boy | boy | deček | Junge | garçon | niño
    girl | girl | deklica | Mädchen | fille | niña
    head | head | glava | Kopf | tête | cabeza
    hair | hair | lasje | Haare | cheveux | pelo
    arm | arm | roka | Arm | bras | brazo
    finger | finger | prst | Finger | doigt | dedo
    knee | knee | koleno | Knie | genou | rodilla
    tummy | tummy | trebuh | Bauch | ventre | barriga
    eyebrow | eyebrow | obrv | Augenbraue | sourcil | ceja
    desk | desk | klop | Pult | bureau | pupitre
    ruler | ruler | ravnilo | Lineal | règle | regla
    eraser | eraser | radirka | Radiergummi | gomme | goma
    crayon | crayon | voščenka | Wachsmalstift | crayon de cire | cera
    glue | glue | lepilo | Kleber | colle | pegamento
    paper | paper | papir | Papier | papier | papel
    board | board | tabla | Tafel | tableau | pizarra
    puzzle | puzzle | sestavljanka | Puzzle | puzzle | puzle
    blocks | blocks | kocke | Bauklötze | cubes | bloques
    yoyo | yo-yo | jojo | Jo-Jo | yoyo | yoyó
    rope | skipping rope | kolebnica | Springseil | corde à sauter | comba
    slide | slide | tobogan | Rutsche | toboggan | tobogán
    swing | swing | gugalnica | Schaukel | balançoire | columpio
    doctor | doctor | zdravnica | Ärztin | médecin | doctora
    nurse | nurse | medicinski brat | Krankenpfleger | infirmier | enfermero
    firefighter | firefighter | gasilka | Feuerwehrfrau | pompière | bombera
    police | police officer | policist | Polizist | policier | policía
    farmer | farmer | kmetica | Bäuerin | fermière | granjera
    cook | cook | kuhar | Koch | cuisinier | cocinero
    builder | builder | zidar | Bauarbeiter | maçon | albañil
    pilot | pilot | pilotka | Pilotin | pilote | piloto
    vet | vet | veterinarka | Tierärztin | vétérinaire | veterinaria
    teacher | teacher | učitelj | Lehrer | maître | maestro
    schoolhouse | school | šola | Schule | école | escuela
    shop | shop | trgovina | Laden | magasin | tienda
    park | park | park | Park | parc | parque
    hospital | hospital | bolnišnica | Krankenhaus | hôpital | hospital
    farmhouse | farm | kmetija | Bauernhof | ferme | granja
    beach | beach | plaža | Strand | plage | playa
    zoo | zoo | živalski vrt | Zoo | zoo | zoo
    playground | playground | igrišče | Spielplatz | aire de jeux | parque infantil
    library | library | knjižnica | Bücherei | bibliothèque | biblioteca
    piano | piano | klavir | Klavier | piano | piano
    violin | violin | violina | Geige | violon | violín
    trumpet | trumpet | trobenta | Trompete | trompette | trompeta
    flute | flute | flavta | Flöte | flûte | flauta
    xylophone | xylophone | ksilofon | Xylofon | xylophone | xilófono
    harp | harp | harfa | Harfe | harpe | arpa
    rain | rain | dež | Regen | pluie | lluvia
    wind | wind | veter | Wind | vent | viento
    storm | storm | nevihta | Gewitter | orage | tormenta
    fog | fog | megla | Nebel | brouillard | niebla
    peas | peas | grah | Erbsen | petits pois | guisantes
    pumpkin | pumpkin | buča | Kürbis | citrouille | calabaza
    lettuce | lettuce | solata | Salat | salade | lechuga
    garlic | garlic | česen | Knoblauch | ail | ajo
    beans | beans | fižol | Bohnen | haricots | judías
    caterpillar | caterpillar | gosenica | Raupe | chenille | oruga
    grasshopper | grasshopper | kobilica | Heuschrecke | sauterelle | saltamontes
    dragonfly | dragonfly | kačji pastir | Libelle | libellule | libélula
    fly | fly | muha | Fliege | mouche | mosca
    beetle | beetle | hrošč | Käfer | scarabée | escarabajo
    donkey | donkey | osel | Esel | âne | burro
    goose | goose | gos | Gans | oie | ganso
    turkey | turkey | puran | Truthahn | dinde | pavo
    hamster | hamster | hrček | Hamster | hamster | hámster
    circle | circle | krog | Kreis | cercle | círculo
    square | square | kvadrat | Quadrat | carré | cuadrado
    triangle | triangle | trikotnik | Dreieck | triangle | triángulo
    rectangle | rectangle | pravokotnik | Rechteck | rectangle | rectángulo
    oval | oval | oval | Oval | ovale | óvalo
    diamond | diamond | romb | Raute | losange | rombo
    football | football | nogomet | Fußball | football | fútbol
    swimming | swimming | plavanje | Schwimmen | natation | natación
    tennis | tennis | tenis | Tennis | tennis | tenis
    skates | skates | drsalke | Schlittschuhe | patins | patines
    skis | skis | smuči | Ski | skis | esquís
    sledge | sledge | sani | Schlitten | luge | trineo
    basketball | basketball | košarka | Basketball | basket | baloncesto
    running | running | tek | Laufen | course | carrera
    happy | happy | vesela | fröhlich | contente | contenta
    sad | sad | žalosten | traurig | triste | triste
    angry | angry | jezna | wütend | fâchée | enfadada
    scared | scared | prestrašen | ängstlich | apeuré | asustado
    tired | tired | utrujena | müde | fatiguée | cansada
    surprised | surprised | presenečen | überrascht | surpris | sorprendido
    spring | spring | pomlad | Frühling | printemps | primavera
    summer | summer | poletje | Sommer | été | verano
    autumn | autumn | jesen | Herbst | automne | otoño
    winter | winter | zima | Winter | hiver | invierno
    day | day | dan | Tag | jour | día
    night | night | noč | Nacht | nuit | noche
    water | water | voda | Wasser | eau | agua
    juice | juice | sok | Saft | jus | zumo
    rice | rice | riž | Reis | riz | arroz
    pasta | pasta | testenine | Nudeln | pâtes | pasta
    sausage | sausage | klobasa | Wurst | saucisse | salchicha
    pancake | pancake | palačinka | Pfannkuchen | crêpe | tortita
    skirt | skirt | krilo | Rock | jupe | falda
    pyjamas | pyjamas | pižama | Schlafanzug | pyjama | pijama
    shorts | shorts | kratke hlače | Shorts | short | pantalón corto
    sweater | sweater | pulover | Pullover | pull | jersey
    sandals | sandals | sandali | Sandalen | sandales | sandalias
    belt | belt | pas | Gürtel | ceinture | cinturón
    rooster | rooster | petelin | Hahn | coq | gallo
    wolf | wolf | volk | Wolf | loup | lobo
    deer | deer | jelen | Hirsch | cerf | ciervo
    kangaroo | kangaroo | kenguru | Känguru | kangourou | canguro
    rhino | rhino | nosorog | Nashorn | rhinocéros | rinoceronte
    swan | swan | labod | Schwan | cygne | cisne
    seahorse | seahorse | morski konjiček | Seepferdchen | hippocampe | caballito de mar
    raspberry | raspberry | malina | Himbeere | framboise | frambuesa
    mango | mango | mango | Mango | mangue | mango
    radish | radish | redkvica | Radieschen | radis | rábano
    cabbage | cabbage | zelje | Kohl | chou | col
    jam | jam | marmelada | Marmelade | confiture | mermelada
    butter | butter | maslo | Butter | beurre | mantequilla
    yoghurt | yoghurt | jogurt | Joghurt | yaourt | yogur
    popcorn | popcorn | pokovka | Popcorn | pop-corn | palomitas
    tea | tea | čaj | Tee | thé | té
    burger | burger | hamburger | Hamburger | hamburger | hamburguesa
    tie | tie | kravata | Krawatte | cravate | corbata
    bag | bag | torbica | Tasche | sac | bolso
    neck | neck | vrat | Hals | cou | cuello
    tongue | tongue | jezik | Zunge | langue | lengua
    elbow | elbow | komolec | Ellbogen | coude | codo
    man | man | moški | Mann | homme | hombre
    woman | woman | ženska | Frau | femme | mujer
    children | children | otroci | Kinder | enfants | niños
    dentist | dentist | zobozdravnica | Zahnärztin | dentiste | dentista
    postman | postman | poštar | Postbote | facteur | cartero
    baker | baker | pek | Bäcker | boulanger | panadero
    painter | painter | slikarka | Malerin | peintre | pintora
    singer | singer | pevka | Sängerin | chanteuse | cantante
    stairs | stairs | stopnice | Treppe | escalier | escaleras
    shower | shower | tuš | Dusche | douche | ducha
    fridge | fridge | hladilnik | Kühlschrank | frigo | nevera
    toilet | toilet | stranišče | Toilette | toilettes | inodoro
    bubbles | bubbles | mehurčki | Seifenblasen | bulles | pompas
    top | spinning top | vrtavka | Kreisel | toupie | peonza
    accordion | accordion | harmonika | Akkordeon | accordéon | acordeón
    microphone | microphone | mikrofon | Mikrofon | micro | micrófono
    headphones | headphones | slušalke | Kopfhörer | casque | auriculares
    notebook | notebook | zvezek | Heft | cahier | cuaderno
    map | map | zemljevid | Karte | carte | mapa
    sharpener | sharpener | šilček | Spitzer | taille-crayon | sacapuntas
    motorbike | motorbike | motor | Motorrad | moto | moto
    taxi | taxi | taksi | Taxi | taxi | taxi
    bridge | bridge | most | Brücke | pont | puente
    tent | tent | šotor | Zelt | tente | tienda de campaña
    garden | garden | vrt | Garten | jardin | jardín
    earth | Earth | Zemlja | Erde | Terre | Tierra
    snow | snow | sneg | Schnee | neige | nieve
    forest | forest | gozd | Wald | forêt | bosque
    river | river | reka | Fluss | rivière | río
    grass | grass | trava | Gras | herbe | hierba
    island | island | otok | Insel | île | isla
    birthday | birthday | rojstni dan | Geburtstag | anniversaire | cumpleaños
    skateboard | skateboard | rolka | Skateboard | skate | monopatín
    dancing | dancing | ples | Tanzen | danse | baile
    volleyball | volleyball | odbojka | Volleyball | volley | voleibol
    hungry | hungry | lačen | hungrig | affamé | hambriento
    sick | sick | bolna | krank | malade | enferma
    shy | shy | sramežljiva | schüchtern | timide | tímida
    proud | proud | ponosna | stolz | fière | orgullosa
    bored | bored | zdolgočasen | gelangweilt | ennuyé | aburrido
    worried | worried | zaskrbljena | besorgt | inquiète | preocupada
    excited | excited | navdušen | aufgeregt | enthousiaste | emocionado
    calm | calm | mirna | ruhig | calme | tranquila
    funny | funny | smešen | lustig | drôle | gracioso
    morning | morning | jutro | Morgen | matin | mañana
    evening | evening | večer | Abend | soir | tarde
    breakfast | breakfast | zajtrk | Frühstück | petit-déjeuner | desayuno
    lunch | lunch | kosilo | Mittagessen | déjeuner | almuerzo
    dinner | dinner | večerja | Abendessen | dîner | cena
    calendar | calendar | koledar | Kalender | calendrier | calendario
    holidays | holidays | počitnice | Ferien | vacances | vacaciones
    hourglass | hourglass | peščena ura | Sanduhr | sablier | reloj de arena
    arrow | arrow | puščica | Pfeil | flèche | flecha
    spiral | spiral | spirala | Spirale | spirale | espiral
    semicircle | semicircle | polkrog | Halbkreis | demi-cercle | semicírculo
    hexagon | hexagon | šestkotnik | Sechseck | hexagone | hexágono
    tabletennis | table tennis | namizni tenis | Tischtennis | ping-pong | ping-pong
    hockey | hockey | hokej | Hockey | hockey | hockey
    golf | golf | golf | Golf | golf | golf
    climbing | climbing | plezanje | Klettern | escalade | escalada
  `;

  LG.VOCAB = TABLE.trim()
    .split('\n')
    .map((line) => {
      const cells = line.split('|').map((c) => c.trim().normalize('NFC'));
      const entry = { pic: cells[0] };
      LG.LANGS.forEach((lang, i) => (entry[lang] = cells[i + 1]));
      return entry;
    });

  // Topics, roughly following the themes of early-years vocabulary
  // curricula. Each picture belongs to one topic; teachers can limit the
  // games to some topics in the settings.
  const TOPIC_WORDS = {
    farm: 'cat dog pig cow sheep duck hen horse goat chick rabbit mouse donkey goose turkey hamster rooster',
    wild: 'bear lion elephant monkey tiger panda giraffe zebra camel hippo crocodile fox koala squirrel hedgehog owl bat bird parrot flamingo penguin snake turtle dinosaur wolf deer kangaroo rhino',
    water: 'fish whale crab octopus shark dolphin starfish jellyfish seal frog swan seahorse',
    bugs: 'bee butterfly ladybug spider snail ant worm caterpillar grasshopper dragonfly fly beetle',
    fruit: 'apple banana pear cherry grapes lemon orange strawberry watermelon pineapple peach plum kiwi coconut raspberry mango',
    vegetables: 'carrot tomato mushroom potato corn cucumber pepper onion broccoli peas pumpkin lettuce garlic beans radish cabbage',
    food: 'cheese bread egg milk cake icecream pizza cookie honey chocolate candy lollipop donut sandwich soup nut water juice rice pasta sausage pancake jam butter yoghurt popcorn tea burger',
    clothes: 'hat sock shoe shirt glasses dress trousers jacket scarf glove boot cap button crown skirt pyjamas shorts sweater sandals belt tie bag',
    body: 'eye ear nose mouth tooth hand foot leg head hair arm finger knee tummy eyebrow neck tongue elbow',
    family: 'mother father baby grandma grandpa brother sister boy girl man woman children',
    home: 'house door window bed chair table lamp sofa bathtub mirror television phone computer clock stairs shower fridge toilet',
    household: 'cup spoon fork plate bottle pot soap towel toothbrush comb broom bucket basket box candle key umbrella ladder hammer',
    toys: 'ball balloon kite teddy doll robot gift puzzle blocks yoyo rope slide swing bubbles top',
    music: 'drum guitar bell piano violin trumpet flute xylophone harp accordion microphone headphones',
    school: 'book pencil scissors backpack brush desk ruler eraser crayon glue paper board notebook map sharpener',
    transport: 'car bus train plane bike boat rocket truck tractor helicopter ambulance firetruck scooter submarine motorbike taxi',
    jobs: 'doctor nurse firefighter police farmer cook builder pilot vet teacher dentist postman baker painter singer',
    places: 'schoolhouse shop park hospital farmhouse beach zoo playground library castle flag bridge tent garden',
    sky: 'sun moon cloud rainbow snowflake snowman lightning planet rain wind storm fog earth snow',
    nature: 'fire mountain tree flower leaf wave rock cactus volcano shell feather nest forest river grass island',
    colours: 'red blue yellow green colorOrange purple pink brown black white grey',
    numbers: 'one two three four five six seven eight nine ten',
    shapes: 'circle square triangle rectangle oval diamond heart star arrow spiral semicircle hexagon',
    sports: 'football swimming tennis skates skis sledge basketball running skateboard dancing volleyball tabletennis hockey golf climbing',
    feelings: 'happy sad angry scared tired surprised hungry sick shy proud bored worried excited calm funny',
    seasons: 'spring summer autumn winter day night birthday morning evening breakfast lunch dinner calendar holidays hourglass',
  };
  // Topic order and the picture that stands for each topic.
  LG.TOPICS = [
    ['farm', 'cow'], ['wild', 'lion'], ['water', 'fish'], ['bugs', 'ladybug'],
    ['fruit', 'apple'], ['vegetables', 'carrot'], ['food', 'pizza'], ['clothes', 'shirt'],
    ['body', 'hand'], ['family', 'mother'], ['jobs', 'doctor'], ['home', 'house'], ['household', 'cup'], ['toys', 'teddy'], ['music', 'guitar'],
    ['school', 'pencil'], ['transport', 'bus'], ['places', 'schoolhouse'], ['sky', 'rainbow'], ['nature', 'tree'], ['seasons', 'autumn'], ['colours', 'blue'], ['numbers', 'three'], ['shapes', 'triangle'],
    ['sports', 'football'], ['feelings', 'happy'],
  ].map(([id, pic]) => ({ id: id, pic: pic }));
  const TOPIC_OF = {};
  Object.keys(TOPIC_WORDS).forEach((t) => TOPIC_WORDS[t].split(' ').forEach((pic) => (TOPIC_OF[pic] = t)));
  LG.VOCAB.forEach((v) => (v.topic = TOPIC_OF[v.pic]));

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
  const SKIP_FIRST_WORDS = { en: ['owl', 'eye', 'ear', 'ice cream', 'TV', 'one', 'eight', 'eyebrow'] };

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

  // Words for one language: [{ pic, word, letters, topic }].
  //   firstLetter: only words that suit the First Letter game
  //   maxLength:   only single words (no spaces or hyphens) up to this length
  //   allTopics:   ignore the topics chosen in the teacher settings
  //   min:         if the chosen topics give fewer words than this, use all topics
  LG.words = function (lang, opts) {
    opts = opts || {};
    const topics = opts.allTopics || !LG.settings ? [] : LG.settings.topics;
    const skipWords = SKIP_FIRST_WORDS[lang] || [];
    const list = LG.VOCAB.filter((v) => v[lang] && LG.PICTURES[v.pic])
      .filter((v) => !topics.length || topics.includes(v.topic))
      .map((v) => ({ pic: v.pic, word: v[lang], letters: Array.from(v[lang]), topic: v.topic }))
      .filter((w) => !opts.firstLetter || !(SKIP_FIRST[lang].test(w.word) || skipWords.includes(w.word)))
      .filter((w) => !opts.maxLength || (w.letters.length <= opts.maxLength && /^\p{L}+$/u.test(w.word)));
    if (opts.min && topics.length && list.length < opts.min) return LG.words(lang, Object.assign({}, opts, { allTopics: true }));
    return list;
  };

  // n items from list in random order, repeating the list if it's too short
  // (never the same item twice in a row).
  LG.deal = function (list, n) {
    let out = [];
    while (out.length < n && list.length) {
      let batch = LG.shuffle(list);
      if (out.length && batch.length > 1 && batch[0] === out[out.length - 1]) batch.push(batch.shift());
      out = out.concat(batch);
    }
    return out.slice(0, n);
  };
})();
