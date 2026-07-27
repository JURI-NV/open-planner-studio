# Resourcebibliotheken

Sinds B1.1 is het model **bibliotheekcentrisch**: een resourcebibliotheek bevat kalenders + resources
(een gedeelde pool), en een project is altijd — impliciet of expliciet — aan precies één
resourcebibliotheek gekoppeld. Een resourcebibliotheek vertegenwoordigt doorgaans één bedrijf of
organisatie — vandaar dat de code en het IFC-formaat er nog steeds `companyId`/`companyName` voor
gebruiken; de gebruikersterm is voortaan "resourcebibliotheek" (of kortweg "bibliotheek"). Toewijzen
vanuit de bibliotheek aan een project **is** materialiseren: er bestaat geen los "toevoegen",
"kopiëren", "bijwerken-uit" of "promoveren" meer als aparte gebruikershandeling — één gedeeld mechanisme
dekt alles. Wat een project gebruikt, is een bewerkbare kopie **met herkomststempel** in het project
zelf: een gedeeld projectbestand blijft daardoor altijd compleet en zelfstandig ("gebeiteld":
zelfstandig, niet read-only).

## Resourcebibliotheken en koppeling

Er is altijd één standaardbibliotheek (vaste standaardnaam: "Mijn resourcebibliotheek" — bestaande
installaties die de oudere naam "Mijn bedrijf" al hadden staan, houden die naam; hij is gewoon
hernoembaar). Beheer resourcebibliotheken via **Bestand → Bibliotheek** (aanmaken, hernoemen,
verwijderen — de laatste resourcebibliotheek blijft altijd bestaan — en één als standaard aanwijzen).

De koppeling tussen een project en zijn resourcebibliotheek (`project.companyId`) is **altijd zichtbaar
en bewerkbaar**, ook met maar één resourcebibliotheek — niet iets dat impliciet ontstaat bij de eerste
bibliotheekactie:

- **Projectwizard** ("Nieuw project"): een bibliotheekselector, voorgeselecteerd op de standaardbibliotheek.
- **Projectinfo** (bestaand project): dezelfde selector; wijzigen bindt/herbindt/ontkoppelt direct.

De ≥2-bibliotheken-regel geldt uitsluitend voor **secundaire** selectors elders — bijvoorbeeld het
importdoel in de pool-importdialoog (Backstage → Bibliotheek → Importeren): met precies één
resourcebibliotheek importeert die dialoog stilzwijgend in die ene bibliotheek en toont geen keuze.

Wisselen naar een andere resourcebibliotheek (**omkoppelen**) strip de herkomststempels van de vórige
bibliotheek op alle projectitems (ze worden "vreemd" — de herkenningsstap moet ze opnieuw koppelen aan
de nieuwe bibliotheek); wisselen naar dezelfde bibliotheek of de allereerste koppeling doet dat niet.
Ontkoppelen (naar "geen bibliotheek") strip alle stempels net zo.

## De pool

Elke resourcebibliotheek heeft een **pool**: de verzameling bibliotheekkalenders en -resources, met een
oplopend versienummer (`poolVersion`) en een tijdstempel (`modifiedAt`). De `id` van elke
kalender/resource **in** de pool is diens stabiele identiteit — herkomststempels
(`libraryOrigin.libraryItemId`) wijzen daarnaar.

## Resources-tab: Bibliotheekweergave en Projectweergave

De Resources-tab heeft, zodra het project aan een resourcebibliotheek gekoppeld is, twee weergaven naast
elkaar (een schuifknop rechtsboven in het paneel):

- **Bibliotheekweergave** — toont de pool van de gekoppelde resourcebibliotheek. Hier voeg je direct
  nieuwe resources aan de bibliotheek toe, bewerk of verwijder je poolitems, en **wijs je een
  poolresource toe aan het project** ("Toewijzen aan project" — dit ís het materialisatiemoment:
  kopieer met stempel, dedup op herkomst zodat een al aanwezige kopie hergebruikt wordt in plaats van
  gedupliceerd). Default-weergave zodra de pool inhoud heeft; een lege pool of een los (ongekoppeld)
  project toont in plaats daarvan de Projectweergave.
- **Projectweergave** — de gewone projecttabel, met markeringen per rij voor items die niet meer
  overeenkomen met de resourcebibliotheek (zie hieronder).

Materialiseren gebeurt uitsluitend op een project dat al aan díé resourcebibliotheek gekoppeld is — er
is geen "stille eerste koppeling" meer via een toewijs-actie op een nog ongebonden project (die
kortsluiting bestond in B1, is in B1.1 gestript).

Kalenderpromotie (projectkalender → poolkalender) leeft, als **bewuste fase-1-interim**, nog in
Backstage → Bibliotheek in plaats van in de Resources-tab; resourcepromotie/-CRUD is al volledig naar
de Resources-tab verhuisd.

## Het afwijkingenscherm (koppel-/synchronisatiescherm)

Eén gedeeld scherm — geen aparte add/update-dialogen meer — met twee secties:

1. **Herkennen** — niet-gestempelde projectitems met hun unieke naam-match uit de pool (per stuk of
   "alle voorstellen koppelen"). De matcher draait **alleen op koppelmomenten** (niet doorlopend):
   exacte match na Unicode-NFC, onzichtbare formatting-tekens (zero-width spaties/joiners, BOM,
   soft-hyphen) strippen, trim, samengevouwen witruimte en hoofdletterongevoeligheid — expliciet geen
   fuzzy matching. Geen of meerdere kandidaten met dezelfde naam ⇒ geen voorstel, handmatige keuze.
   De naam-matching is bewust locale-onafhankelijk (`toLowerCase`, niet `toLocaleLowerCase`): de
   Turkse dotless-İ-nuance wordt niet toegepast, zodat de matcher hetzelfde resultaat geeft ongeacht
   de machine-locale.
2. **Afwijkingen** — gestempelde items die van hun bibliotheekorigineel zijn afgeweken (`deviated`) of
   waarvan het origineel uit de pool is verwijderd (`removed`/"niet meer in de bibliotheek"). Per
   `deviated`-item zijn er **drie uitkomsten**: **bibliotheekwaarden gebruiken** (ververs het
   projectitem naar de pool), **overnemen in de bibliotheek** (schrijf de bestandswaarden terug in de
   pool — bumpt de pool, dus geldt voor alle projecten die eruit putten — en ververs de siblings in
   andere open documenten), of het scherm sluiten zonder te kiezen ("later beslissen": de markering
   blijft staan, heropbaar via de Projectweergave-badge of een volgende koppelmoment).

Een `removed`-item (niet meer in de bibliotheek) los je **niet** in dit scherm op — het item blijft
gewoon bruikbaar in het project; opruimen (verwijderen/opnieuw koppelen) doe je zelf via de
Projectweergave.

Elke uitgang (backdrop-klik, Escape, X-knop, "Later beslissen") loopt door hetzelfde sluitpad; het
scherm leest live uit de store (geen momentopname), dus een documentwissel terwijl het openstaat laat
geen verouderde inhoud achter.

## Waarom `syncedHash` bestaat: behind vs. deviated

Elke projectkopie draagt naast de gewone herkomststempel een `syncedHash`: een hash van de gevolgde
velden op het moment van materialiseren/laatste verversing, met **exact dezelfde normalisatie** als de
diff-vergelijking (dezelfde veldenlijst, dezelfde array-als-multiset-sortering, dezelfde NFC/witruimte-
behandeling). Dat maakt het verschil tussen twee heel verschillende situaties:

- **`behind`** — het bestand is sinds de laatste synchronisatie **niet** lokaal bewerkt (huidige hash
  == `syncedHash`), maar de pool is intussen bijgewerkt. Dit wordt **stil** ververst — geen vraag.
- **`deviated`** — het bestand ís lokaal bewerkt (huidige hash ≠ `syncedHash`) sinds de laatste sync.
  Dit wordt **gevraagd** in het afwijkingenscherm — nooit stilzwijgend overschreven.

Een projectitem zonder `syncedHash` (een bestand van vóór B1.1, dus vóór dit veld bestond) valt aan de
veilige kant: het telt altijd als mogelijk lokaal bewerkt, dus als `deviated` — nooit als `behind`.

## De vier verversingsgrenzen

De resourcebibliotheek ververst nooit doorlopend of "live" — alleen op vier vaste momenten:

1. **Openen** (bestand openen, of hernieuwde koppeling in de wizard) — ná volledige hydratatie van
   het document: `behind`-items ververst stil, `≥1 deviated`-item opent het afwijkingenscherm.
2. **Documentwissel** (tabblad wisselen, sluiten naar een buurdocument) — stil, `behind`-only; er komt
   nooit een dialoog bij een documentwissel, alleen bij openen/crash-herstel.
3. **Pool-bewerking** (iets in de Bibliotheekweergave of Backstage wijzigt de pool) — ververst
   `behind`-items in zowel het actieve document als élke slapende (niet-actieve) documentpayload, in
   één keer; slapende documenten herrekenen hun planning pas zodra ze weer geactiveerd worden.
4. **Crash-herstel** (auto-save-herstel bij opstarten) — draait dezelfde openings-check als grens 1.

Op elke grens blijven `deviated`-items ongemoeid — die wachten op een expliciete keuze in het
afwijkingenscherm.

## Ctrl+Z/verversing-eigenaardigheid

Een verversing (elke van de vier grenzen, en "bibliotheekwaarden gebruiken" in het afwijkingenscherm)
is **niet ongedaan te maken**: het is geen aparte undo-stap, en het **wist de redo-stapel**. Dat betekent
concreet: als je vlak vóór een verversing iets ongedaan had gemaakt (Ctrl+Z) en er stond nog een
redo-stap klaar, verdwijnt die redo-mogelijkheid stil op het moment dat de verversing draait — "opnieuw"
zou anders oude, inmiddels-achterhaalde poolwaarden kunnen terugzetten. Omgekeerd: undo van een gewone
bewerking van vóór de verversing kan tijdelijk oude waarden laten terugkeren, totdat de eerstvolgende
grens ze weer bijwerkt. Het discrete signaal **"N onderdelen bijgewerkt vanuit de bibliotheek"**
(zelf-opruimend na 4 seconden) is het enige zichtbare antwoord op een stille verversing — er is geen
aparte log of geschiedenis van wát er ververst is.

Dit geldt ook voor de twee keuzes in het afwijkingenscherm zelf, maar met een belangrijk onderscheid:
**"bibliotheekwaarden gebruiken" én "overnemen in de bibliotheek" zijn allebei niet met Ctrl+Z terug te
draaien** — de eerste is een niet-undoable verversing van het projectitem, de tweede wijzigt de
resourcebibliotheek zelf, die überhaupt buiten de projecthistorie valt (pools zijn app-globaal, niet
projectdata). **Koppelen en ontkoppelen (de herkenningsstap, bind/rebind/unbind) kunnen wél** ongedaan
gemaakt worden — dat zijn wél gewone undo-snapshotted projectacties.

Een aanverwante eigenaardigheid: **undo van omkoppelen** (bibliotheek A → B) herstelt de
herkomststempels van bibliotheek A wel, maar herstelt niet automatisch de binding als een "volwaardige"
A-koppeling terug — de herstelde A-stempels gedragen zich tot je écht weer terugkoppelt naar A net als
een los/onbekende bibliotheek zou (`project.companyId` valt zelf buiten de undo-snapshot-scope van deze
mutatie in dat pad). Dit is bewust gedrag, geen bug.

## Identiteit rust op id, niet op naam

Herkomst wordt uitsluitend gevolgd via het stabiele poolitem-`id`, nooit via de naam. Verwijder je een
poolitem en maak je vervolgens een nieuw poolitem met **exact dezelfde naam**, dan herlinkt een
projectkopie die ooit naar het oude item wees **niet automatisch** naar het nieuwe — voor het systeem
zijn het twee volledig ongerelateerde items (het oude item is domweg "niet meer in de bibliotheek",
`removed`). De handmatige uitweg is de herkenningsstap: het item toont als niet-gestempeld (of als
`removed`) en je koppelt het zelf opnieuw, expliciet, aan het nieuwe poolitem.

## Ontvangen bestanden (los)

Een bestand dat via een **volledig-vervangende** load binnenkomt — plakken/laden in het IFC-paneel,
een menu-actie die het hele document vervangt, of een extensie-import — komt binnen als **los
document**: `companyId`/`companyName` en alle herkomststempels worden gestript, ook als het bestand
oorspronkelijk aan een resourcebibliotheek gekoppeld was. Reden: zonder deze reset zou een bestand van
een collega (met stempels die naar resourcebibliotheken op ZIJN machine wijzen, niet noodzakelijk
dezelfde pools als op de jouwe) valse "niet meer in de bibliotheek"-markeringen tonen tegen een pool
die er niets mee te maken heeft. **Openen** via de normale bestand-openen-actie (of "recent bestand")
is dat niet — dat behoudt de koppeling en herkomststempels, en draait gewoon grens 1 (openen);
crash-herstel behoudt ze net zo en draait dezelfde check.

## Pool-import: oudere pool importeren zet in-sync documenten stil terug

Bij pool-import (Backstage → Bibliotheek → Importeren) vervangt de gekozen IFC-pool de **hele** pool
van de doelbibliotheek, ná bevestiging. Is de lokale pool nieuwer dan de te importeren pool (hogere
`poolVersion` óf recentere `modifiedAt`), dan waarschuwt de dialoog daarvoor vooraf — maar die
waarschuwing is de **enige** poort. Ná bevestiging draait de import als een externe wijziging: grens 1
(niet de stille grens 3) voor het actieve document. Die classificatie kent geen begrip "vooruit" versus
"achteruit" — hij vergelijkt alleen of het bestand ongewijzigd is (`behind`) of lokaal bewerkt
(`deviated`). Een projectitem dat in-sync stond met de (nu overschreven) nieuwere pool en zelf niet
lokaal bewerkt is, wordt dus **stil teruggezet** naar de oudere, zojuist geïmporteerde waarden — de
vraag in het afwijkingenscherm guardt alleen bestanden die zelf extern/lokaal bewerkt zijn, niet het
feit dat de pool zojuist ouder is geworden. De demping-waarschuwing vooraf is dus de bewuste, enige
poort tegen dit scenario.

De afwijkingsvraag bij pool-import geldt uitsluitend het **actieve** document (`replacePool` draait
bewust geen grens-3-verversing over slapende documenten). Slapende gekoppelde documenten tonen hun
afwijkingen als markering (de `deviated`/`removed`-badges in de Projectweergave) zodra je ernaartoe
wisselt — dat is live classificatie tegen de nu-geïmporteerde pool, geen aparte verversingsstap — maar
de vraag zelf (het afwijkingenscherm) verschijnt pas weer bij hun eerstvolgende **opening** (grens 1),
niet bij het wisselen zelf (grens 2 is en blijft stil, zie hierboven).

## Resourcebibliotheek verwijderen ontkoppelt open documenten, opgeslagen bestanden niet

Een resourcebibliotheek verwijderen (spec §5) ontkoppelt expliciet elk **geopend** document (actief én
slapend) dat eraan gekoppeld was: `companyId`/`companyName` gewist, alle herkomststempels van die
bibliotheek gestript. De verwijder-bevestiging meldt hoeveel geopende documenten dit raakt. Bestanden
die op dat moment niet open staan, blijven ongewijzigd op schijf staan mét hun oude stempels — die
gedragen zich bij een latere open-actie gewoon als een normaal gekoppeld bestand tegen een
resourcebibliotheek die dan niet meer bestaat: de scope-check (`§2-scope`, een lokaal bestaande
resourcebibliotheek) valt terug op los-gedrag (geen markering, geen mechaniek) omdat de
resourcebibliotheek lokaal onbekend is.

## Omkoppelen ruimt oude pool-promoties niet op

Wissel je een project naar een andere resourcebibliotheek (of ontkoppel je het), dan verdwijnen alleen
de herkomststempels op het project — niet de poolkopieën die je zelf ooit per ongeluk (of bewust) naar
de **vorige** bibliotheek promoveerde. Die blijven daar gewoon staan; opruimen is een handmatige stap
via de Bibliotheekweergave (of Backstage) van de oude bibliotheek.

## Export, import & back-up

Een pool exporteer je als één IFC 4.3-bestand per resourcebibliotheek; dat is tevens je **back-up**. Bij
projectexport kun je met "Bibliotheekbestand ernaast opslaan" de gekoppelde pool als tweede, los
bestand naast het project schrijven (geen embed; no-op als het project niet gekoppeld is).

## Bekende beperkingen (bewust niet opgelost in B1.1)

Alle drie komen voort uit dezelfde wortel — **er is geen gedeelde opslag tussen machines**
(local-first, geen server) — en worden opgelost in een apart vervolgproject "gedeelde opslag/sync"
(zie ook `docs/TODO.md`).

1. **Twee planners, zelfde resourcebibliotheek.** Pools kunnen op verschillende machines uiteenlopen.
   De import-demping waarschuwt wanneer je een oudere pool over een nieuwere lokale pool importeert
   ("jouw lokale bibliotheek is nieuwer"), maar kan divergentie niet vóórkomen — zie hierboven ook de
   stille-terugzet-eigenaardigheid als je toch doorzet.

2. **Bezettingsoverzicht ziet alleen deze machine.** Boekingen op de machine van een collega bestaan
   lokaal niet, dus een bibliotheekbreed bezettingsoverzicht (vervolg B1b) is beperkt tot wat op deze
   machine bekend is.

3. **Twee tabbladen, zelfde machine.** De bibliotheek leeft app-breed in-memory en wordt bij elke
   wijziging weggeschreven; twee open tabbladen (of twee vensters) op dezelfde machine overschrijven
   elkaars laatste schrijfactie stilzwijgend — zelfde wortel als punt 1 hierboven, alleen dan zonder de
   expliciete import-stap en dus zonder demping-waarschuwing.

## Bekende kleine punten

- **CRLF wordt genormaliseerd.** Tekstvelden (namen, omschrijvingen) met Windows-regeleinden (CRLF)
  komen na een schrijf/lees-cyclus terug met LF.
- **Onbekende extra velden gaan verloren.** Een geïmporteerd poolbestand met velden die dit systeem
  niet kent, verliest die velden bij normalisatie (de opgeslagen pool bevat alleen de bekende vorm:
  `companyId`/`companyName`/`poolVersion`/`modifiedAt`/`calendars`/`resources`).
- **Pool-exports zijn niet byte-identiek tussen exports.** Twee exports van dezelfde pool verschillen
  op tijdstempel-regels in het IFC-bestand; de inhoud (kalenders/resources/versienummer) is gelijk.
- **Undo van een promote laat de poolkopie staan.** Ongedaan maken van "promoveer kalender naar
  bibliotheek" (Backstage-interim) verwijdert de herkomststempel op het bron-projectitem, maar de
  zojuist toegevoegde kopie in de pool blijft staan (pools zijn app-globaal en niet undo-beschermd).
  Het item opnieuw promoveren voegt dus een nieuwe pool-kopie toe; de dedup bij materialiseren herstelt
  de oude koppeling niet.

**Aanbeveling.** Deelt jullie organisatie ploegen over werkmaatschappijen heen, kies dan bewust
**één gezamenlijke pool** in plaats van per werkmaatschappij een eigen resourcebibliotheek.
Dubbelbezetting van een resource tussen losse organisaties (bijvoorbeeld een onderaannemer die voor
twee aannemers werkt) is bewust geen probleem van dit systeem — dat is het planningsprobleem van die
resource zelf.
