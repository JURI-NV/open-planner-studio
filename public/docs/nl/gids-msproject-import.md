# MS Project (.mpp) openen

Naast MS Project XML (MSPDI) kan Open Planner Studio ook het native `.mpp`-bestand van Microsoft
Project rechtstreeks openen — zonder dat je eerst iets hoeft te exporteren. De lezer is een eigen,
in TypeScript geschreven implementatie van het MPP14-containerformaat (Project 2010 t/m 2021).
Deze gids legt uit wat er meekomt, wat de grenzen zijn, en wat er gebeurt als je zo'n bestand
opslaat.

## Wat je hier leert

- Hoe je een `.mpp`-bestand opent, en via welke wegen dat werkt.
- Wat er precies meekomt: taken, relaties, kalenders, resources en toewijzingen.
- Een bekende beperking bij jaarlijks terugkerende feestdagen.
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

## Kalenderuitzonderingen: een bekende beperking

Concrete, eenmalige uitzonderingsdatums in een kalender (een specifieke vrije dag op een vaste
datum) komen gewoon mee. Wat **niet** meekomt, zijn jaarlijks terugkerende uitzonderingen mét een
herhaalregel — bijvoorbeeld een feestdag als Kerst die in MS Project is ingesteld om elk jaar
automatisch terug te komen. Alleen de afgevlakte, concrete datums worden gelezen; de herhaalregel
zelf gaat verloren. Dit is gebruikerzichtbaar: een kalender die in MS Project met een
jaarlijkse-herhaalregel is opgebouwd, komt er in Open Planner Studio met minder vrije dagen uit dan
je zou verwachten voor toekomstige jaren.

Dit is geen incident van de `.mpp`-lezer: de bestaande MSPDI-import (MS Project XML) kent dezelfde
beperking. Wil je zeker zijn van de volledige kalender, controleer die dan na het openen bij
**Planning → Kalender** en vul ontbrekende toekomstige feestdagen zo nodig handmatig aan — zie de
gids [Kalenders & uren-planning](docs://gids-kalenders-uren).

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
