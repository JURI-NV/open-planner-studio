# MS Project (.mpp) openen

Naast MS Project XML (MSPDI) kan Open Planner Studio ook het native `.mpp`-bestand van Microsoft
Project rechtstreeks openen — zonder dat je eerst iets hoeft te exporteren. De lezer is een eigen,
in TypeScript geschreven implementatie van het MPP14-containerformaat (Project 2010 t/m 2021).
Deze gids legt uit wat er meekomt, wat de grenzen zijn, en wat er gebeurt als je zo'n bestand
opslaat.

## Wat je hier leert

- Hoe je een `.mpp`-bestand opent, en via welke wegen dat werkt.
- Wat er precies meekomt: taken, relaties, kalenders, resources en toewijzingen.
- Hoe nauwkeurig de ingelezen start- en einddatums zijn, en welke taken daar bewust van afwijken.
- Wat er met voortgang gebeurt: MS Project se eigen hervattingsconventie voor lopende taken.
- Eén bekende beperking bij kalenders: werkweken (een tijdelijk afwijkend weekpatroon).
- Wat er bewust niet meekomt, en wat je krijgt bij een niet-ondersteund bestand.
- Wat er gebeurt als je een geopend `.mpp`-bestand opslaat of terugexporteert.

## Wat er meekomt

Bij het openen van een `.mpp`-bestand leest Open Planner Studio:

- **Taken**, inclusief de hiërarchie (samenvattende taken/subtaken) en de WBS-codering.
- **Relaties** in alle vier de soorten (eind-start, start-start, eind-eind, start-eind), met lag —
  zowel in werkdagen als in doorlooptijd-dagen ("elapsed"), en ook procent-lag.
- **Kalenders**: werkdagen, werktijden per dag en de concrete uitzonderingsdatums (vrije dagen).
- **Resources**, van het type Werk of Materiaal. Het type Kosten bestaat in MS Project ook, maar
  wordt — net als bij de bestaande MSPDI-import — behandeld als Werk.
- **Toewijzingen** van resources aan taken, inclusief voortgang (percentage voltooid, werkelijke
  start/einde waar aanwezig).

Dit is dezelfde veldenset als de bestaande MS Project XML-import (MSPDI), op de uitzonderingen na
die hieronder staan.

Voor **urenprojecten** (taken die MS Project op uur- of minuutniveau plant, of een kalender met
bijvoorbeeld een lunchpauze) komen duren en werktijden op die precisie mee: een taak van 2 uur komt
niet meer op 0 dagen uit, en start-/eindtijden behouden hun echte tijdstip in plaats van alleen de
datum. Open Planner Studio herkent dit automatisch, per kalender — je hoeft niets aan te zetten. Zie
[Kalenders & uren-planning](docs://gids-kalenders-uren) voor hoe uren-modus in de rest van de app
werkt.

## Openen

Een `.mpp`-bestand open je op precies dezelfde manieren als elk ander projectbestand:

- **Bestand → Openen** (of **Ctrl+O**), gewoon een `.mpp`-bestand kiezen.
- Via **recente bestanden** zodra je er eerder één hebt geopend.
- Via de AI-assistent, met de tool `planner_import_schedule` (zie de gids
  [AI-assistent koppelen (MCP)](docs://gids-ai-mcp)).

Het bestand komt — net als bij elke import — in een **nieuw document** terecht, tenzij het actieve
tabblad nog leeg en ongewijzigd is.

## Datumgetrouwheid: wat tot op de minuut overkomt, en wat niet

Open Planner Studio rekent een geopend `.mpp`-bestand door met dezelfde kalenderlogica als MS
Project zelf (werkdagen, werktijden per dag, vrije dagen, en — bij een urenproject — de precieze
kloktijd). Voor **vrijwel elke taak** levert dat dezelfde start- en einddatum op als in MS Project,
tot op de minuut bij een urenproject. Er zijn twee categorieën uitzonderingen, allebei bewust:

- Taken met een **onderbroken**, **genivelleerde** of anderszins **resource-gestuurde** planning —
  hierover verschijnt een melding bij het openen, zie hieronder.
- Een klein aantal losse, zeldzame randgevallen in specifieke combinaties van kalendertype,
  relatiesoort of taakvoortgang, die (nog) niet automatisch gemeld worden. Die zijn intern
  onderzocht en gedocumenteerd, maar raken in de praktijk zelden een gewoon project — je merkt ze
  hoogstens als één taak in een ongebruikelijke situatie een dag of wat afwijkt van MS Project
  terwijl de rest van de planning wel klopt.

De eerste categorie in detail: een taak met een **onderbroken**, **genivelleerde**
of anderszins **resource-gestuurde** planning (handmatige nivellering, een "leveling delay", of
resource-contouring/uitgesmeerd werk over de looptijd van de taak). MS Project kan zo'n taak over
een langere periode uitsmeren dan de duur op zichzelf zou vragen — bijvoorbeeld een taak van 3 dagen
die, met een pauze ertussen, over 5 kalenderdagen loopt. Open Planner Studio kent dit onderscheid
nog niet en rekent zo'n taak **aaneengesloten** door: de duur klopt, maar het venster (en dus
mogelijk de einddatum) kan afwijken van wat je in MS Project ziet.

Je merkt dit meestal bij het openen: bevat het bestand zulke taken, dan verschijnt er één keer een
melding met het aantal. Twee van de drie oorzaken — nivellering met een leveling delay, en een
onderbroken of over meerdere dagen uitgesmeerde taak — worden betrouwbaar herkend. **Zuivere
resource-contouring** (het werk binnen een taak krijgt een oplopende/aflopende curve, zonder dat de
start-einddatum zelf verandert) is een bekende, niet-gedichte uitzondering op die melding: de
bronbestand-eigen contour-indicator bleek bij onderzoek niet betrouwbaar leesbaar, dus zo'n taak
kan stil aaneengesloten worden doorgerekend zonder melding. Wil je precies weten welke taken het
betreft en hoe ze in MS Project zijn opgebouwd (de onderbrekingen, de nivelleringsvertraging, een
contour), open het bestand dan in MS Project zelf — die informatie gaat bij het lezen niet
stilzwijgend verloren uit het bronbestand, Open Planner Studio negeert 'm alleen bij het
doorrekenen. Taak-splitsen en resource-nivellering als bewerkbare functie staan niet in deze
etappe; zie de melding en deze gids als de plek waar je dat kunt navragen.

## Voortgang: MS Project se eigen hervattingsconventie

Voor een taak die al **gedeeltelijk is uitgevoerd** wanneer je het `.mpp`-bestand opent, bepaalt
Open Planner Studio het hervattingspunt van het resterende werk op dezelfde manier als MS Project
zelf: op basis van de werkelijke starttijd plus de reeds verstreken tijd, in plaats van (zoals bij
een project uit Primavera P6 of een ander formaat) op basis van de statusdatum of de druk van
voorgaande taken. Je merkt dit meestal niet — de twee benaderingen komen op de meeste taken op
hetzelfde uit — maar het is de reden waarom een `.mpp`-geïmporteerde taak soms een net iets ander
hervattingspunt toont dan een verder identieke taak die uit P6 of MS Project XML afkomstig is. Deze
instelling is een permanente eigenschap van het project: ze blijft ook na **Opslaan** (als IFC) en
een volgende **Openen** intact, zonder dat er ergens een schakelaar voor te vinden is.

## Kalenderuitzonderingen en werkweken

Concrete, eenmalige uitzonderingsdatums in een kalender (een specifieke vrije dag op een vaste
datum) komen mee, en dat geldt ook voor **jaarlijks terugkerende** uitzonderingen mét een
herhaalregel — bijvoorbeeld een feestdag als Kerst die in MS Project is ingesteld om elk jaar
automatisch terug te komen. Open Planner Studio expandeert zo'n herhaalregel zelf naar de concrete
datums binnen de projectperiode; je hoeft hier zelf niets voor te doen. Dit geldt zowel voor gewone
vrije dagen als voor **werkende uitzonderingen** (een dag die normaal vrij is, maar in de kalender
expliciet als werkend is aangemerkt — bijvoorbeeld een ingeroosterde zaterdag).

Wat wél een bekende beperking blijft, zijn **werkweken** — in MS Project een manier om voor een
bepaald datumbereik een afwijkend weekpatroon aan een kalender toe te kennen (bijvoorbeeld "vanaf
1 juli werkt dit team ook op zaterdag"). Alleen het standaard weekpatroon en de losse
uitzonderingsdagen komen mee; een tijdelijk afwijkend weekpatroon niet. Dit raakt in de praktijk
weinig bestanden — de meeste MS Project-kalenders gebruiken geen werkweken — maar controleer een
kalender met een bekend afwijkend patroon voor de zekerheid na het openen, bij **Planning →
Kalender** — zie de gids [Kalenders & uren-planning](docs://gids-kalenders-uren).

## Wat niet meekomt

De `.mpp`-import is **alleen-lezen**: er bestaat geen `.mpp`-exportformaat, ook niet bij het
brondocument (MPXJ) waarop de lezer is gebaseerd. Daarnaast:

- **Geen baselines**, custom fields, outline codes, subprojecten of kostenvelden. De veldenset is
  exact wat de MSPDI-import ook levert, min baselines.
- **Oudere `.mpp`-formaten** (MPP8/9/12 — Project 98 t/m 2007) worden herkend maar niet gelezen:
  je krijgt een duidelijke foutmelding met de suggestie om het bestand in MS Project als XML te
  exporteren (**Bestand → Opslaan als → XML**) en dát bestand te openen.
- **Wachtwoord-versleutelde bestanden** geven dezelfde foutmelding met dezelfde suggestie — de
  inhoud wordt niet ontsleuteld.

## Opslaan en exporteren

Zoals overal in Open Planner Studio schrijft **Opslaan** altijd IFC — er is geen apart
`.mpp`-projectformaat om in terug te schrijven. Omdat een geopend `.mpp`-bestand (net als een
geopende `.csv` of MS Project XML) daardoor geen eigen opslagdoel krijgt, is **Ctrl+S** op zo'n
document altijd **opslaan-als**: je bronbestand wordt nooit stilzwijgend overschreven met
IFC-inhoud. Wil je de planning weer terug naar MS Project brengen, gebruik dan
**Backstage → Exporteren → MS Project XML** — zie de gids [Im-/export](docs://gids-import-export)
voor wat daarbij wel en niet meegaat.

## Herkomst

De `.mpp`-lezer is afgeleid van de broncode en structuurkennis van MPXJ (`github.com/joniles/mpxj`,
Jon Iles e.a.), een Java-bibliotheek onder LGPL-2.1 — net als Open Planner Studio zelf open source
onder LGPL-3.0.

## Verder lezen

- Wat elk export- en importformaat wél en niet meeneemt: [Im-/export](docs://gids-import-export).
- Werkdagen, werktijden en feestdagen na het openen controleren:
  [Kalenders & uren-planning](docs://gids-kalenders-uren).
