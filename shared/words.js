// Word bank. One row per picture (shared/pictures.js), one column per
// language. German nouns keep their capital letter.
(function () {
  const LG = (window.LG = window.LG || {});

  LG.LANGS = ['en', 'sl', 'de', 'fr', 'es', 'hr', 'sk', 'ro'];

  // picture | en | sl | de | fr | es | hr | sk | ro
  const TABLE = `
    cat | cat | muca | Katze | chat | gato | mačka | mačka | pisică
    dog | dog | pes | Hund | chien | perro | pas | pes | câine
    pig | pig | pujs | Schwein | cochon | cerdo | svinja | prasa | porc
    bear | bear | medved | Bär | ours | oso | medvjed | medveď | urs
    mouse | mouse | miš | Maus | souris | ratón | miš | myš | șoarece
    lion | lion | lev | Löwe | lion | león | lav | lev | leu
    cow | cow | krava | Kuh | vache | vaca | krava | krava | vacă
    sheep | sheep | ovca | Schaf | mouton | oveja | ovca | ovca | oaie
    owl | owl | sova | Eule | hibou | búho | sova | sova | bufniță
    duck | duck | raca | Ente | canard | pato | patka | kačica | rață
    frog | frog | žaba | Frosch | grenouille | rana | žaba | žaba | broască
    fish | fish | riba | Fisch | poisson | pez | riba | ryba | pește
    bee | bee | čebela | Biene | abeille | abeja | pčela | včela | albină
    bird | bird | ptič | Vogel | oiseau | pájaro | ptica | vták | pasăre
    snake | snake | kača | Schlange | serpent | serpiente | zmija | had | șarpe
    snail | snail | polž | Schnecke | escargot | caracol | puž | slimák | melc
    rabbit | rabbit | zajec | Hase | lapin | conejo | zec | zajac | iepure
    elephant | elephant | slon | Elefant | éléphant | elefante | slon | slon | elefant
    monkey | monkey | opica | Affe | singe | mono | majmun | opica | maimuță
    penguin | penguin | pingvin | Pinguin | pingouin | pingüino | pingvin | tučniak | pinguin
    turtle | turtle | želva | Schildkröte | tortue | tortuga | kornjača | korytnačka | țestoasă
    butterfly | butterfly | metulj | Schmetterling | papillon | mariposa | leptir | motýľ | fluture
    ladybug | ladybug | pikapolonica | Marienkäfer | coccinelle | mariquita | bubamara | lienka | buburuză
    spider | spider | pajek | Spinne | araignée | araña | pauk | pavúk | păianjen
    whale | whale | kit | Wal | baleine | ballena | kit | veľryba | balenă
    hen | hen | kokoš | Huhn | poule | gallina | kokoš | sliepka | găină
    fox | fox | lisica | Fuchs | renard | zorro | lisica | líška | vulpe
    crab | crab | rak | Krabbe | crabe | cangrejo | rak | krab | crab
    octopus | octopus | hobotnica | Krake | pieuvre | pulpo | hobotnica | chobotnica | caracatiță
    horse | horse | konj | Pferd | cheval | caballo | konj | kôň | cal
    giraffe | giraffe | žirafa | Giraffe | girafe | jirafa | žirafa | žirafa | girafă
    zebra | zebra | zebra | Zebra | zèbre | cebra | zebra | zebra | zebră
    tiger | tiger | tiger | Tiger | tigre | tigre | tigar | tiger | tigru
    panda | panda | panda | Panda | panda | panda | panda | panda | panda
    camel | camel | kamela | Kamel | chameau | camello | deva | ťava | cămilă
    hippo | hippo | povodni konj | Nilpferd | hippopotame | hipopótamo | nilski konj | hroch | hipopotam
    crocodile | crocodile | krokodil | Krokodil | crocodile | cocodrilo | krokodil | krokodíl | crocodil
    shark | shark | morski pes | Hai | requin | tiburón | morski pas | žralok | rechin
    dolphin | dolphin | delfin | Delfin | dauphin | delfín | dupin | delfín | delfin
    starfish | starfish | morska zvezda | Seestern | étoile de mer | estrella de mar | morska zvijezda | hviezdica | stea de mare
    jellyfish | jellyfish | meduza | Qualle | méduse | medusa | meduza | medúza | meduză
    squirrel | squirrel | veverica | Eichhörnchen | écureuil | ardilla | vjeverica | veverička | veveriță
    hedgehog | hedgehog | jež | Igel | hérisson | erizo | jež | jež | arici
    mole | mole | krt | Maulwurf | taupe | topo | krtica | krtko | cârtiță
    goat | goat | koza | Ziege | chèvre | cabra | koza | koza | capră
    chick | chick | piščanec | Küken | poussin | pollito | pile | kuriatko | puișor
    parrot | parrot | papiga | Papagei | perroquet | loro | papiga | papagáj | papagal
    bat | bat | netopir | Fledermaus | chauve-souris | murciélago | šišmiš | netopier | liliac
    worm | worm | črv | Wurm | ver | gusano | crv | červík | vierme
    ant | ant | mravlja | Ameise | fourmi | hormiga | mrav | mravec | furnică
    dinosaur | dinosaur | dinozaver | Dinosaurier | dinosaure | dinosaurio | dinosaur | dinosaurus | dinozaur
    flamingo | flamingo | flamingo | Flamingo | flamant | flamenco | flamingo | plameniak | flamingo
    seal | seal | tjulenj | Robbe | phoque | foca | tuljan | tuleň | focă
    koala | koala | koala | Koala | koala | koala | koala | koala | koala
    apple | apple | jabolko | Apfel | pomme | manzana | jabuka | jablko | măr
    banana | banana | banana | Banane | banane | plátano | banana | banán | banană
    pear | pear | hruška | Birne | poire | pera | kruška | hruška | pară
    carrot | carrot | korenje | Karotte | carotte | zanahoria | mrkva | mrkva | morcov
    cheese | cheese | sir | Käse | fromage | queso | sir | syr | brânză
    bread | bread | kruh | Brot | pain | pan | kruh | chlieb | pâine
    egg | egg | jajce | Ei | œuf | huevo | jaje | vajce | ou
    milk | milk | mleko | Milch | lait | leche | mlijeko | mlieko | lapte
    cake | cake | torta | Kuchen | gâteau | pastel | torta | torta | tort
    grapes | grapes | grozdje | Trauben | raisin | uvas | grožđe | hrozno | struguri
    lemon | lemon | limona | Zitrone | citron | limón | limun | citrón | lămâie
    cherry | cherry | češnja | Kirsche | cerise | cereza | trešnja | čerešňa | cireașă
    orange | orange | pomaranča | Orange | orange | naranja | naranča | pomaranč | portocală
    strawberry | strawberry | jagoda | Erdbeere | fraise | fresa | jagoda | jahoda | căpșună
    watermelon | watermelon | lubenica | Melone | pastèque | sandía | lubenica | melón | pepene
    tomato | tomato | paradižnik | Tomate | tomate | tomate | rajčica | paradajka | roșie
    mushroom | mushroom | goba | Pilz | champignon | seta | gljiva | huba | ciupercă
    icecream | ice cream | sladoled | Eis | glace | helado | sladoled | zmrzlina | înghețată
    pizza | pizza | pica | Pizza | pizza | pizza | pizza | pizza | pizza
    cookie | cookie | piškot | Keks | biscuit | galleta | keks | sušienka | biscuit
    pineapple | pineapple | ananas | Ananas | ananas | piña | ananas | ananás | ananas
    potato | potato | krompir | Kartoffel | pomme de terre | patata | krumpir | zemiak | cartof
    corn | corn | koruza | Mais | maïs | maíz | kukuruz | kukurica | porumb
    cucumber | cucumber | kumara | Gurke | concombre | pepino | krastavac | uhorka | castravete
    pepper | pepper | paprika | Paprika | poivron | pimiento | paprika | paprika | ardei
    onion | onion | čebula | Zwiebel | oignon | cebolla | luk | cibuľa | ceapă
    broccoli | broccoli | brokoli | Brokkoli | brocoli | brócoli | brokula | brokolica | broccoli
    peach | peach | breskev | Pfirsich | pêche | melocotón | breskva | broskyňa | piersică
    plum | plum | sliva | Pflaume | prune | ciruela | šljiva | slivka | prună
    kiwi | kiwi | kivi | Kiwi | kiwi | kiwi | kivi | kivi | kiwi
    coconut | coconut | kokos | Kokosnuss | noix de coco | coco | kokos | kokos | cocos
    nut | nut | oreh | Nuss | noix | nuez | orah | orech | nucă
    honey | honey | med | Honig | miel | miel | med | med | miere
    chocolate | chocolate | čokolada | Schokolade | chocolat | chocolate | čokolada | čokoláda | ciocolată
    candy | candy | bonbon | Bonbon | bonbon | caramelo | bombon | cukrík | bomboană
    lollipop | lollipop | lizika | Lutscher | sucette | piruleta | lizalica | lízanka | acadea
    donut | donut | krof | Donut | beignet | dónut | krafna | šiška | gogoașă
    sandwich | sandwich | sendvič | Sandwich | sandwich | sándwich | sendvič | sendvič | sandviș
    soup | soup | juha | Suppe | soupe | sopa | juha | polievka | supă
    hat | hat | klobuk | Hut | chapeau | sombrero | šešir | klobúk | pălărie
    sock | sock | nogavica | Socke | chaussette | calcetín | čarapa | ponožka | șosetă
    shoe | shoe | čevelj | Schuh | chaussure | zapato | cipela | topánka | pantof
    shirt | shirt | majica | T-Shirt | tee-shirt | camiseta | majica | tričko | tricou
    glasses | glasses | očala | Brille | lunettes | gafas | naočale | okuliare | ochelari
    dress | dress | obleka | Kleid | robe | vestido | haljina | šaty | rochie
    trousers | trousers | hlače | Hose | pantalon | pantalón | hlače | nohavice | pantaloni
    jacket | jacket | jakna | Jacke | veste | chaqueta | jakna | bunda | geacă
    scarf | scarf | šal | Schal | écharpe | bufanda | šal | šál | fular
    glove | glove | rokavica | Handschuh | gant | guante | rukavica | rukavica | mănușă
    boot | boot | škorenj | Stiefel | botte | bota | čizma | čižma | cizmă
    cap | cap | kapa | Kappe | casquette | gorra | kapa | šiltovka | șapcă
    button | button | gumb | Knopf | bouton | botón | gumb | gombík | nasture
    cup | cup | lonček | Tasse | tasse | taza | šalica | hrnček | cană
    spoon | spoon | žlica | Löffel | cuillère | cuchara | žlica | lyžica | lingură
    fork | fork | vilice | Gabel | fourchette | tenedor | vilica | vidlička | furculiță
    ball | ball | žoga | Ball | balle | pelota | lopta | lopta | minge
    balloon | balloon | balon | Luftballon | ballon | globo | balon | balón | balon
    kite | kite | zmaj | Drachen | cerf-volant | cometa | zmaj | šarkan | zmeu
    drum | drum | boben | Trommel | tambour | tambor | bubanj | bubon | tobă
    guitar | guitar | kitara | Gitarre | guitare | guitarra | gitara | gitara | chitară
    bell | bell | zvonec | Glocke | cloche | campana | zvono | zvonček | clopoțel
    book | book | knjiga | Buch | livre | libro | knjiga | kniha | carte
    pencil | pencil | svinčnik | Stift | crayon | lápiz | olovka | ceruzka | creion
    scissors | scissors | škarje | Schere | ciseaux | tijeras | škare | nožnice | foarfecă
    key | key | ključ | Schlüssel | clé | llave | ključ | kľúč | cheie
    clock | clock | ura | Uhr | réveil | reloj | sat | hodiny | ceas
    umbrella | umbrella | dežnik | Regenschirm | parapluie | paraguas | kišobran | dáždnik | umbrelă
    crown | crown | krona | Krone | couronne | corona | kruna | koruna | coroană
    gift | gift | darilo | Geschenk | cadeau | regalo | poklon | darček | cadou
    bed | bed | postelja | Bett | lit | cama | krevet | posteľ | pat
    chair | chair | stol | Stuhl | chaise | silla | stolica | stolička | scaun
    table | table | miza | Tisch | table | mesa | stol | stôl | masă
    lamp | lamp | svetilka | Lampe | lampe | lámpara | svjetiljka | lampa | lampă
    door | door | vrata | Tür | porte | puerta | vrata | dvere | ușă
    bathtub | bathtub | kad | Badewanne | baignoire | bañera | kada | vaňa | cadă
    soap | soap | milo | Seife | savon | jabón | sapun | mydlo | săpun
    towel | towel | brisača | Handtuch | serviette | toalla | ručnik | uterák | prosop
    toothbrush | toothbrush | zobna ščetka | Zahnbürste | brosse à dents | cepillo de dientes | četkica za zube | zubná kefka | periuță de dinți
    comb | comb | glavnik | Kamm | peigne | peine | češalj | hrebeň | pieptene
    mirror | mirror | ogledalo | Spiegel | miroir | espejo | ogledalo | zrkadlo | oglindă
    window | window | okno | Fenster | fenêtre | ventana | prozor | okno | fereastră
    sofa | sofa | kavč | Sofa | canapé | sofá | kauč | gauč | canapea
    television | TV | televizor | Fernseher | télévision | televisión | televizor | televízor | televizor
    phone | phone | telefon | Telefon | téléphone | teléfono | telefon | telefón | telefon
    computer | computer | računalnik | Computer | ordinateur | ordenador | računalo | počítač | calculator
    backpack | backpack | nahrbtnik | Rucksack | sac à dos | mochila | ruksak | ruksak | rucsac
    basket | basket | košara | Korb | panier | cesta | košara | košík | coș
    box | box | škatla | Kiste | boîte | caja | kutija | škatuľa | cutie
    bucket | bucket | vedro | Eimer | seau | cubo | kanta | vedro | găleată
    broom | broom | metla | Besen | balai | escoba | metla | metla | mătură
    candle | candle | sveča | Kerze | bougie | vela | svijeća | sviečka | lumânare
    plate | plate | krožnik | Teller | assiette | plato | tanjur | tanier | farfurie
    bottle | bottle | steklenica | Flasche | bouteille | botella | boca | fľaša | sticlă
    pot | pot | lonec | Topf | casserole | olla | lonac | hrniec | oală
    teddy | teddy | medvedek | Teddy | nounours | osito | medvjedić | macko | ursuleț
    doll | doll | punčka | Puppe | poupée | muñeca | lutka | bábika | păpușă
    robot | robot | robot | Roboter | robot | robot | robot | robot | robot
    brush | brush | čopič | Pinsel | pinceau | pincel | kist | štetec | pensulă
    ladder | ladder | lestev | Leiter | échelle | escalera | ljestve | rebrík | scară
    hammer | hammer | kladivo | Hammer | marteau | martillo | čekić | kladivo | ciocan
    house | house | hiša | Haus | maison | casa | kuća | dom | casă
    car | car | avto | Auto | voiture | coche | auto | auto | mașină
    bus | bus | avtobus | Bus | bus | autobús | autobus | autobus | autobuz
    train | train | vlak | Zug | train | tren | vlak | vlak | tren
    plane | plane | letalo | Flugzeug | avion | avión | avion | lietadlo | avion
    bike | bike | kolo | Fahrrad | vélo | bicicleta | bicikl | bicykel | bicicletă
    boat | boat | ladja | Boot | bateau | barco | brod | loď | barcă
    rocket | rocket | raketa | Rakete | fusée | cohete | raketa | raketa | rachetă
    truck | truck | tovornjak | Lastwagen | camion | camión | kamion | kamión | camion
    tractor | tractor | traktor | Traktor | tracteur | tractor | traktor | traktor | tractor
    helicopter | helicopter | helikopter | Hubschrauber | hélicoptère | helicóptero | helikopter | vrtuľník | elicopter
    ambulance | ambulance | rešilec | Krankenwagen | ambulance | ambulancia | hitna pomoć | sanitka | ambulanță
    firetruck | fire truck | gasilsko vozilo | Feuerwehrauto | camion de pompiers | camión de bomberos | vatrogasno vozilo | hasičské auto | mașină de pompieri
    scooter | scooter | skiro | Roller | trottinette | patinete | romobil | kolobežka | trotinetă
    submarine | submarine | podmornica | U-Boot | sous-marin | submarino | podmornica | ponorka | submarin
    sun | sun | sonce | Sonne | soleil | sol | sunce | slnko | soare
    moon | moon | luna | Mond | lune | luna | mjesec | mesiac | lună
    star | star | zvezda | Stern | étoile | estrella | zvijezda | hviezda | stea
    cloud | cloud | oblak | Wolke | nuage | nube | oblak | oblak | nor
    rainbow | rainbow | mavrica | Regenbogen | arc-en-ciel | arcoíris | duga | dúha | curcubeu
    snowflake | snowflake | snežinka | Schneeflocke | flocon | copo | pahulja | vločka | fulg
    snowman | snowman | snežak | Schneemann | bonhomme de neige | muñeco de nieve | snjegović | snehuliak | om de zăpadă
    fire | fire | ogenj | Feuer | feu | fuego | vatra | oheň | foc
    mountain | mountain | gora | Berg | montagne | montaña | planina | hora | munte
    tree | tree | drevo | Baum | arbre | árbol | drvo | strom | copac
    flower | flower | roža | Blume | fleur | flor | cvijet | kvet | floare
    leaf | leaf | list | Blatt | feuille | hoja | list | list | frunză
    wave | wave | val | Welle | vague | ola | val | vlna | val
    rock | rock | kamen | Stein | caillou | piedra | kamen | kameň | piatră
    cactus | cactus | kaktus | Kaktus | cactus | cactus | kaktus | kaktus | cactus
    volcano | volcano | vulkan | Vulkan | volcan | volcán | vulkan | sopka | vulcan
    planet | planet | planet | Planet | planète | planeta | planet | planéta | planetă
    shell | shell | školjka | Muschel | coquillage | concha | školjka | mušľa | scoică
    feather | feather | pero | Feder | plume | pluma | pero | pierko | pană
    nest | nest | gnezdo | Nest | nid | nido | gnijezdo | hniezdo | cuib
    lightning | lightning | strela | Blitz | éclair | rayo | munja | blesk | fulger
    heart | heart | srce | Herz | cœur | corazón | srce | srdce | inimă
    eye | eye | oko | Auge | œil | ojo | oko | oko | ochi
    ear | ear | uho | Ohr | oreille | oreja | uho | ucho | ureche
    nose | nose | nos | Nase | nez | nariz | nos | nos | nas
    hand | hand | dlan | Hand | main | mano | dlan | dlaň | mână
    tooth | tooth | zob | Zahn | dent | diente | zub | zub | dinte
    foot | foot | stopalo | Fuß | pied | pie | stopalo | chodidlo | talpă
    mouth | mouth | usta | Mund | bouche | boca | usta | ústa | gură
    leg | leg | noga | Bein | jambe | pierna | noga | noha | picior
    flag | flag | zastava | Fahne | drapeau | bandera | zastava | vlajka | steag
    castle | castle | grad | Burg | château | castillo | dvorac | hrad | castel
    red | red | rdeča | rot | rouge | rojo | crvena | červená | roșu
    blue | blue | modra | blau | bleu | azul | plava | modrá | albastru
    yellow | yellow | rumena | gelb | jaune | amarillo | žuta | žltá | galben
    green | green | zelena | grün | vert | verde | zelena | zelená | verde
    colorOrange | orange | oranžna | orange | orange | naranja | narančasta | oranžová | portocaliu
    purple | purple | vijolična | lila | violet | morado | ljubičasta | fialová | mov
    pink | pink | roza | rosa | rose | rosa | ružičasta | ružová | roz
    brown | brown | rjava | braun | marron | marrón | smeđa | hnedá | maro
    black | black | črna | schwarz | noir | negro | crna | čierna | negru
    white | white | bela | weiß | blanc | blanco | bijela | biela | alb
    grey | grey | siva | grau | gris | gris | siva | sivá | gri
    one | one | ena | eins | un | uno | jedan | jeden | unu
    two | two | dva | zwei | deux | dos | dva | dva | doi
    three | three | tri | drei | trois | tres | tri | tri | trei
    four | four | štiri | vier | quatre | cuatro | četiri | štyri | patru
    five | five | pet | fünf | cinq | cinco | pet | päť | cinci
    six | six | šest | sechs | six | seis | šest | šesť | șase
    seven | seven | sedem | sieben | sept | siete | sedam | sedem | șapte
    eight | eight | osem | acht | huit | ocho | osam | osem | opt
    nine | nine | devet | neun | neuf | nueve | devet | deväť | nouă
    ten | ten | deset | zehn | dix | diez | deset | desať | zece
    mother | mother | mama | Mutter | mère | madre | mama | mama | mamă
    father | father | oče | Vater | père | padre | tata | otec | tată
    baby | baby | dojenček | Baby | bébé | bebé | beba | bábätko | bebeluș
    grandma | grandma | babica | Oma | grand-mère | abuela | baka | babka | bunică
    grandpa | grandpa | dedek | Opa | grand-père | abuelo | djed | dedko | bunic
    brother | brother | brat | Bruder | frère | hermano | brat | brat | frate
    sister | sister | sestra | Schwester | sœur | hermana | sestra | sestra | soră
    boy | boy | deček | Junge | garçon | niño | dječak | chlapec | băiat
    girl | girl | deklica | Mädchen | fille | niña | djevojčica | dievča | fată
    head | head | glava | Kopf | tête | cabeza | glava | hlava | cap
    hair | hair | lasje | Haare | cheveux | pelo | kosa | vlasy | păr
    arm | arm | roka | Arm | bras | brazo | ruka | ruka | braț
    finger | finger | prst | Finger | doigt | dedo | prst | prst | deget
    knee | knee | koleno | Knie | genou | rodilla | koljeno | koleno | genunchi
    tummy | tummy | trebuh | Bauch | ventre | barriga | trbuh | brucho | burtă
    eyebrow | eyebrow | obrv | Augenbraue | sourcil | ceja | obrva | obočie | sprânceană
    desk | desk | klop | Pult | bureau | pupitre | klupa | lavica | bancă
    ruler | ruler | ravnilo | Lineal | règle | regla | ravnalo | pravítko | riglă
    eraser | eraser | radirka | Radiergummi | gomme | goma | gumica | guma | radieră
    crayon | crayon | voščenka | Wachsmalstift | crayon de cire | cera | voštana bojica | voskovka | creion cerat
    glue | glue | lepilo | Kleber | colle | pegamento | ljepilo | lepidlo | lipici
    paper | paper | papir | Papier | papier | papel | papir | papier | hârtie
    board | board | tabla | Tafel | tableau | pizarra | ploča | tabuľa | tablă
    puzzle | puzzle | sestavljanka | Puzzle | puzzle | puzle | slagalica | skladačka | puzzle
    blocks | blocks | kocke | Bauklötze | cubes | bloques | kocke | kocky | cuburi
    yoyo | yo-yo | jojo | Jo-Jo | yoyo | yoyó | jo-jo | jojo | yo-yo
    rope | skipping rope | kolebnica | Springseil | corde à sauter | comba | vijača | švihadlo | coardă
    slide | slide | tobogan | Rutsche | toboggan | tobogán | tobogan | šmykľavka | tobogan
    swing | swing | gugalnica | Schaukel | balançoire | columpio | ljuljačka | hojdačka | leagăn
    doctor | doctor | zdravnica | Ärztin | médecin | doctora | liječnica | lekárka | doctoriță
    nurse | nurse | medicinski brat | Krankenpfleger | infirmier | enfermero | medicinski tehničar | zdravotník | asistent medical
    firefighter | firefighter | gasilka | Feuerwehrfrau | pompière | bombera | vatrogaskinja | hasička | pompieră
    police | police officer | policist | Polizist | policier | policía | policajac | policajt | polițist
    farmer | farmer | kmetica | Bäuerin | fermière | granjera | seljakinja | farmárka | fermieră
    cook | cook | kuhar | Koch | cuisinier | cocinero | kuhar | kuchár | bucătar
    builder | builder | zidar | Bauarbeiter | maçon | albañil | zidar | murár | constructor
    pilot | pilot | pilotka | Pilotin | pilote | piloto | pilotkinja | pilotka | pilotă
    vet | vet | veterinarka | Tierärztin | vétérinaire | veterinaria | veterinarka | veterinárka | veterinară
    teacher | teacher | učitelj | Lehrer | maître | maestro | učitelj | učiteľ | învățător
    schoolhouse | school | šola | Schule | école | escuela | škola | škola | școală
    shop | shop | trgovina | Laden | magasin | tienda | trgovina | obchod | magazin
    park | park | park | Park | parc | parque | park | park | parc
    hospital | hospital | bolnišnica | Krankenhaus | hôpital | hospital | bolnica | nemocnica | spital
    farmhouse | farm | kmetija | Bauernhof | ferme | granja | farma | farma | fermă
    beach | beach | plaža | Strand | plage | playa | plaža | pláž | plajă
    zoo | zoo | živalski vrt | Zoo | zoo | zoo | zoološki vrt | zoo | grădină zoologică
    playground | playground | igrišče | Spielplatz | aire de jeux | parque infantil | igralište | ihrisko | loc de joacă
    library | library | knjižnica | Bücherei | bibliothèque | biblioteca | knjižnica | knižnica | bibliotecă
    piano | piano | klavir | Klavier | piano | piano | klavir | klavír | pian
    violin | violin | violina | Geige | violon | violín | violina | husle | vioară
    trumpet | trumpet | trobenta | Trompete | trompette | trompeta | truba | trúbka | trompetă
    flute | flute | flavta | Flöte | flûte | flauta | flauta | flauta | flaut
    xylophone | xylophone | ksilofon | Xylofon | xylophone | xilófono | ksilofon | xylofón | xilofon
    harp | harp | harfa | Harfe | harpe | arpa | harfa | harfa | harpă
    rain | rain | dež | Regen | pluie | lluvia | kiša | dážď | ploaie
    wind | wind | veter | Wind | vent | viento | vjetar | vietor | vânt
    storm | storm | nevihta | Gewitter | orage | tormenta | oluja | búrka | furtună
    fog | fog | megla | Nebel | brouillard | niebla | magla | hmla | ceață
    peas | peas | grah | Erbsen | petits pois | guisantes | grašak | hrášok | mazăre
    pumpkin | pumpkin | buča | Kürbis | citrouille | calabaza | bundeva | tekvica | dovleac
    lettuce | lettuce | solata | Salat | salade | lechuga | salata | šalát | salată
    garlic | garlic | česen | Knoblauch | ail | ajo | češnjak | cesnak | usturoi
    beans | beans | fižol | Bohnen | haricots | judías | grah | fazuľa | fasole
    caterpillar | caterpillar | gosenica | Raupe | chenille | oruga | gusjenica | húsenica | omidă
    grasshopper | grasshopper | kobilica | Heuschrecke | sauterelle | saltamontes | skakavac | kobylka | lăcustă
    dragonfly | dragonfly | kačji pastir | Libelle | libellule | libélula | vilin konjic | vážka | libelulă
    fly | fly | muha | Fliege | mouche | mosca | muha | mucha | muscă
    beetle | beetle | hrošč | Käfer | scarabée | escarabajo | kornjaš | chrobák | gândac
    donkey | donkey | osel | Esel | âne | burro | magarac | somár | măgar
    goose | goose | gos | Gans | oie | ganso | guska | hus | gâscă
    turkey | turkey | puran | Truthahn | dinde | pavo | puran | moriak | curcan
    hamster | hamster | hrček | Hamster | hamster | hámster | hrčak | škrečok | hamster
    circle | circle | krog | Kreis | cercle | círculo | krug | kruh | cerc
    square | square | kvadrat | Quadrat | carré | cuadrado | kvadrat | štvorec | pătrat
    triangle | triangle | trikotnik | Dreieck | triangle | triángulo | trokut | trojuholník | triunghi
    rectangle | rectangle | pravokotnik | Rechteck | rectangle | rectángulo | pravokutnik | obdĺžnik | dreptunghi
    oval | oval | oval | Oval | ovale | óvalo | oval | ovál | oval
    diamond | diamond | romb | Raute | losange | rombo | romb | kosoštvorec | romb
    football | football | nogomet | Fußball | football | fútbol | nogomet | futbal | fotbal
    swimming | swimming | plavanje | Schwimmen | natation | natación | plivanje | plávanie | înot
    tennis | tennis | tenis | Tennis | tennis | tenis | tenis | tenis | tenis
    skates | skates | drsalke | Schlittschuhe | patins | patines | klizaljke | korčule | patine
    skis | skis | smuči | Ski | skis | esquís | skije | lyže | schiuri
    sledge | sledge | sani | Schlitten | luge | trineo | sanjke | sane | sanie
    basketball | basketball | košarka | Basketball | basket | baloncesto | košarka | basketbal | baschet
    running | running | tek | Laufen | course | carrera | trčanje | beh | alergare
    happy | happy | vesela | fröhlich | contente | contenta | sretna | veselá | veselă
    sad | sad | žalosten | traurig | triste | triste | tužan | smutný | trist
    angry | angry | jezna | wütend | fâchée | enfadada | ljuta | nahnevaná | supărată
    scared | scared | prestrašen | ängstlich | apeuré | asustado | uplašen | vystrašený | speriat
    tired | tired | utrujena | müde | fatiguée | cansada | umorna | unavená | obosită
    surprised | surprised | presenečen | überrascht | surpris | sorprendido | iznenađen | prekvapený | surprins
    spring | spring | pomlad | Frühling | printemps | primavera | proljeće | jar | primăvară
    summer | summer | poletje | Sommer | été | verano | ljeto | leto | vară
    autumn | autumn | jesen | Herbst | automne | otoño | jesen | jeseň | toamnă
    winter | winter | zima | Winter | hiver | invierno | zima | zima | iarnă
    day | day | dan | Tag | jour | día | dan | deň | zi
    night | night | noč | Nacht | nuit | noche | noć | noc | noapte
    water | water | voda | Wasser | eau | agua | voda | voda | apă
    juice | juice | sok | Saft | jus | zumo | sok | džús | suc
    rice | rice | riž | Reis | riz | arroz | riža | ryža | orez
    pasta | pasta | testenine | Nudeln | pâtes | pasta | tjestenina | cestoviny | paste
    sausage | sausage | klobasa | Wurst | saucisse | salchicha | kobasica | klobása | cârnat
    pancake | pancake | palačinka | Pfannkuchen | crêpe | tortita | palačinka | palacinka | clătită
    skirt | skirt | krilo | Rock | jupe | falda | suknja | sukňa | fustă
    pyjamas | pyjamas | pižama | Schlafanzug | pyjama | pijama | pidžama | pyžamo | pijama
    shorts | shorts | kratke hlače | Shorts | short | pantalón corto | kratke hlače | kraťasy | pantaloni scurți
    sweater | sweater | pulover | Pullover | pull | jersey | džemper | sveter | pulover
    sandals | sandals | sandali | Sandalen | sandales | sandalias | sandale | sandále | sandale
    belt | belt | pas | Gürtel | ceinture | cinturón | remen | opasok | curea
    rooster | rooster | petelin | Hahn | coq | gallo | pijetao | kohút | cocoș
    wolf | wolf | volk | Wolf | loup | lobo | vuk | vlk | lup
    deer | deer | jelen | Hirsch | cerf | ciervo | jelen | jeleň | cerb
    kangaroo | kangaroo | kenguru | Känguru | kangourou | canguro | klokan | klokan | cangur
    rhino | rhino | nosorog | Nashorn | rhinocéros | rinoceronte | nosorog | nosorožec | rinocer
    swan | swan | labod | Schwan | cygne | cisne | labud | labuť | lebădă
    seahorse | seahorse | morski konjiček | Seepferdchen | hippocampe | caballito de mar | morski konjic | morský koník | căluț de mare
    raspberry | raspberry | malina | Himbeere | framboise | frambuesa | malina | malina | zmeură
    mango | mango | mango | Mango | mangue | mango | mango | mango | mango
    radish | radish | redkvica | Radieschen | radis | rábano | rotkvica | reďkovka | ridiche
    cabbage | cabbage | zelje | Kohl | chou | col | kupus | kapusta | varză
    jam | jam | marmelada | Marmelade | confiture | mermelada | pekmez | džem | gem
    butter | butter | maslo | Butter | beurre | mantequilla | maslac | maslo | unt
    yoghurt | yoghurt | jogurt | Joghurt | yaourt | yogur | jogurt | jogurt | iaurt
    popcorn | popcorn | pokovka | Popcorn | pop-corn | palomitas | kokice | pukance | popcorn
    tea | tea | čaj | Tee | thé | té | čaj | čaj | ceai
    burger | burger | hamburger | Hamburger | hamburger | hamburguesa | hamburger | hamburger | hamburger
    tie | tie | kravata | Krawatte | cravate | corbata | kravata | kravata | cravată
    bag | bag | torbica | Tasche | sac | bolso | torbica | kabelka | geantă
    neck | neck | vrat | Hals | cou | cuello | vrat | krk | gât
    tongue | tongue | jezik | Zunge | langue | lengua | jezik | jazyk | limbă
    elbow | elbow | komolec | Ellbogen | coude | codo | lakat | lakeť | cot
    man | man | moški | Mann | homme | hombre | muškarac | muž | bărbat
    woman | woman | ženska | Frau | femme | mujer | žena | žena | femeie
    children | children | otroci | Kinder | enfants | niños | djeca | deti | copii
    dentist | dentist | zobozdravnica | Zahnärztin | dentiste | dentista | zubarica | zubárka | dentistă
    postman | postman | poštar | Postbote | facteur | cartero | poštar | poštár | poștaș
    baker | baker | pek | Bäcker | boulanger | panadero | pekar | pekár | brutar
    painter | painter | slikarka | Malerin | peintre | pintora | slikarica | maliarka | pictoriță
    singer | singer | pevka | Sängerin | chanteuse | cantante | pjevačica | speváčka | cântăreață
    stairs | stairs | stopnice | Treppe | escalier | escaleras | stepenice | schody | scări
    shower | shower | tuš | Dusche | douche | ducha | tuš | sprcha | duș
    fridge | fridge | hladilnik | Kühlschrank | frigo | nevera | hladnjak | chladnička | frigider
    toilet | toilet | stranišče | Toilette | toilettes | inodoro | zahod | záchod | toaletă
    bubbles | bubbles | mehurčki | Seifenblasen | bulles | pompas | mjehurići | bubliny | baloane de săpun
    top | spinning top | vrtavka | Kreisel | toupie | peonza | zvrk | káča | titirez
    accordion | accordion | harmonika | Akkordeon | accordéon | acordeón | harmonika | harmonika | acordeon
    microphone | microphone | mikrofon | Mikrofon | micro | micrófono | mikrofon | mikrofón | microfon
    headphones | headphones | slušalke | Kopfhörer | casque | auriculares | slušalice | slúchadlá | căști
    notebook | notebook | zvezek | Heft | cahier | cuaderno | bilježnica | zošit | caiet
    map | map | zemljevid | Karte | carte | mapa | karta | mapa | hartă
    sharpener | sharpener | šilček | Spitzer | taille-crayon | sacapuntas | šiljilo | strúhadlo | ascuțitoare
    motorbike | motorbike | motor | Motorrad | moto | moto | motor | motorka | motocicletă
    taxi | taxi | taksi | Taxi | taxi | taxi | taksi | taxík | taxi
    bridge | bridge | most | Brücke | pont | puente | most | most | pod
    tent | tent | šotor | Zelt | tente | tienda de campaña | šator | stan | cort
    garden | garden | vrt | Garten | jardin | jardín | vrt | záhrada | grădină
    earth | Earth | Zemlja | Erde | Terre | Tierra | Zemlja | Zem | Pământ
    snow | snow | sneg | Schnee | neige | nieve | snijeg | sneh | zăpadă
    forest | forest | gozd | Wald | forêt | bosque | šuma | les | pădure
    river | river | reka | Fluss | rivière | río | rijeka | rieka | râu
    grass | grass | trava | Gras | herbe | hierba | trava | tráva | iarbă
    island | island | otok | Insel | île | isla | otok | ostrov | insulă
    birthday | birthday | rojstni dan | Geburtstag | anniversaire | cumpleaños | rođendan | narodeniny | zi de naștere
    skateboard | skateboard | rolka | Skateboard | skate | monopatín | skejtbord | skateboard | skateboard
    dancing | dancing | ples | Tanzen | danse | baile | ples | tanec | dans
    volleyball | volleyball | odbojka | Volleyball | volley | voleibol | odbojka | volejbal | volei
    hungry | hungry | lačen | hungrig | affamé | hambriento | gladan | hladný | flămând
    sick | sick | bolna | krank | malade | enferma | bolesna | chorá | bolnavă
    shy | shy | sramežljiva | schüchtern | timide | tímida | sramežljiva | hanblivá | rușinoasă
    proud | proud | ponosna | stolz | fière | orgullosa | ponosna | hrdá | mândră
    bored | bored | zdolgočasen | gelangweilt | ennuyé | aburrido | znuđen | znudený | plictisit
    worried | worried | zaskrbljena | besorgt | inquiète | preocupada | zabrinuta | ustarostená | îngrijorată
    excited | excited | navdušen | aufgeregt | enthousiaste | emocionado | uzbuđen | nadšený | entuziasmat
    calm | calm | mirna | ruhig | calme | tranquila | mirna | pokojná | liniștită
    funny | funny | smešen | lustig | drôle | gracioso | smiješan | smiešny | amuzant
    morning | morning | jutro | Morgen | matin | mañana | jutro | ráno | dimineață
    evening | evening | večer | Abend | soir | tarde | večer | večer | seară
    breakfast | breakfast | zajtrk | Frühstück | petit-déjeuner | desayuno | doručak | raňajky | mic dejun
    lunch | lunch | kosilo | Mittagessen | déjeuner | almuerzo | ručak | obed | prânz
    dinner | dinner | večerja | Abendessen | dîner | cena | večera | večera | cină
    calendar | calendar | koledar | Kalender | calendrier | calendario | kalendar | kalendár | calendar
    holidays | holidays | počitnice | Ferien | vacances | vacaciones | praznici | prázdniny | vacanță
    hourglass | hourglass | peščena ura | Sanduhr | sablier | reloj de arena | pješčani sat | presýpacie hodiny | clepsidră
    arrow | arrow | puščica | Pfeil | flèche | flecha | strelica | šípka | săgeată
    spiral | spiral | spirala | Spirale | spirale | espiral | spirala | špirála | spirală
    semicircle | semicircle | polkrog | Halbkreis | demi-cercle | semicírculo | polukrug | polkruh | semicerc
    hexagon | hexagon | šestkotnik | Sechseck | hexagone | hexágono | šesterokut | šesťuholník | hexagon
    tabletennis | table tennis | namizni tenis | Tischtennis | ping-pong | ping-pong | stolni tenis | stolný tenis | tenis de masă
    hockey | hockey | hokej | Hockey | hockey | hockey | hokej | hokej | hochei
    golf | golf | golf | Golf | golf | golf | golf | golf | golf
    climbing | climbing | plezanje | Klettern | escalade | escalada | penjanje | lezenie | cățărare
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
    wild: 'bear lion elephant monkey tiger panda giraffe zebra camel hippo crocodile fox koala squirrel hedgehog mole owl bat bird parrot flamingo penguin snake turtle dinosaur wolf deer kangaroo rhino',
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
    // Croatian and Slovak: two-letter letters of their own alphabets.
    hr: /^(dž|lj|nj)/i,
    sk: /^(ch|dz|dž)/i,
    // Romanian: c and g before e/i, and ch/gh, don't sound like c and g.
    ro: /^(ch|gh|[cg][eiî])/i,
  };
  // Words the rules above miss.
  const SKIP_FIRST_WORDS = { en: ['owl', 'eye', 'ear', 'ice cream', 'TV', 'one', 'eight', 'eyebrow'] };

  LG.ALPHABET = {
    en: 'abcdefghijklmnoprstuvwyz'.split(''),
    sl: 'abcčdefghijklmnoprsštuvzž'.split(''),
    de: 'abcdefghijklmnoprstuvwzäöü'.split(''),
    fr: 'abcdefghijlmnoprstuvz'.split(''),
    es: 'abcdefghijlmnñoprstuvz'.split(''),
    hr: 'abcčćdđefghijklmnoprsštuvzž'.split(''),
    sk: 'aáäbcčdďeéfghiíjklľmnňoóôprsštťuúvyýzž'.split(''),
    ro: 'aăâbcdefghiîjklmnoprsștțuvxz'.split(''),
  };

  // How the speech voice should say a single letter. Languages without an
  // entry say the capital letter, which voices read as the letter's name.
  LG.LETTER_NAMES = {
    sl: {
      a: 'a', b: 'be', c: 'ce', č: 'če', d: 'de', e: 'e', f: 'ef', g: 'ge', h: 'ha', i: 'i',
      j: 'je', k: 'ka', l: 'el', m: 'em', n: 'en', o: 'o', p: 'pe', r: 'er', s: 'es', š: 'še',
      t: 'te', u: 'u', v: 've', z: 'ze', ž: 'že',
    },
    hr: {
      a: 'a', b: 'be', c: 'ce', č: 'če', ć: 'će', d: 'de', đ: 'đe', e: 'e', f: 'ef', g: 'ge', h: 'ha',
      i: 'i', j: 'je', k: 'ka', l: 'el', m: 'em', n: 'en', o: 'o', p: 'pe', r: 'er', s: 'es', š: 'eš',
      t: 'te', u: 'u', v: 've', z: 'ze', ž: 'ež',
    },
    sk: {
      a: 'a', á: 'dlhé á', ä: 'široké e', b: 'bé', c: 'cé', č: 'čé', d: 'dé', ď: 'ďé', e: 'e', é: 'dlhé é',
      f: 'ef', g: 'gé', h: 'há', i: 'i', í: 'dlhé í', j: 'jé', k: 'ká', l: 'el', ľ: 'eľ', m: 'em', n: 'en',
      ň: 'eň', o: 'o', ó: 'dlhé ó', ô: 'uo', p: 'pé', r: 'er', s: 'es', š: 'eš', t: 'té', ť: 'ťé', u: 'u',
      ú: 'dlhé ú', v: 'vé', y: 'ypsilon', ý: 'dlhý ypsilon', z: 'zet', ž: 'žet',
    },
    ro: {
      a: 'a', ă: 'ă', â: 'â', b: 'be', c: 'ce', d: 'de', e: 'e', f: 'ef', g: 'ge', h: 'haș', i: 'i', î: 'î',
      j: 'je', k: 'ca', l: 'el', m: 'em', n: 'en', o: 'o', p: 'pe', r: 'er', s: 'es', ș: 'șe', t: 'te',
      ț: 'țe', u: 'u', v: 've', x: 'ics', z: 'zet',
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
