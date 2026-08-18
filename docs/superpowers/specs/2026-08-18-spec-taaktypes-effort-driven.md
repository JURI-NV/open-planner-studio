# Taaktypes en effort-driven plannen — voorstel voor een eigen etappe

*Ontwerpvoorstel, 2026-08-18. Voortgekomen uit het eigenaarsgesprek tijdens de
nul-afwijkingen-etappe (zie het eigenaarsbesluit in
`docs/superpowers/plans/2026-08-17-plan-mpp-nul-afwijkingen.md`). Status: voorstel —
de etappe zelf is nog niet gepland.*

## Waar dit over gaat

Elke serieuze planningsmotor draait om één rekensom: **werk = duur × inzet**. Ken je
er twee, dan ligt de derde vast — en het karakter van een planningspakket wordt
bepaald door de vraag welke van de drie er *beschermd* is wanneer de gebruiker aan
een van de andere twee draait. MS Project beschermt standaard het werk ("effort
driven": een tweede metselaar erbij halveert de duur), Primavera P6 beschermt in de
gangbare bouwconfiguratie de duur (meer mensen betekent meer bestede uren, niet
eerder klaar), en beide pakketten laten de keuze per taak instellen.

Open Planner Studio heeft die keuze vandaag niet. De app beschermt altijd duur en
inzet: dat zijn de opgeslagen velden, en werk wordt er elke keer uit afgeleid —
"werk = duur × load, nooit opgeslagen" staat letterlijk in het datamodel. Dat is
P6's bouwdefault, hardgecodeerd zonder menu. Voor een bouwplanner is dat een
verdedigbare keuze; het wordt pas een beperking wanneer iemand een MS
Project-bestand met fixed-work-taken importeert en er daarna in wil doorwerken, of
wanneer een gebruiker zelf effort-driven wil plannen.

De eigenaar heeft besloten dat die volledige motor er komt, en wil hem opt-in
aanbieden: standaard blijft alles zoals het nu is, en de gebruiker die het nodig
heeft kan de keuze ontsluiten. Dit voorstel beschrijft hoe — en vooral: in welke
vorm en volgorde die opt-in veilig te bouwen is.

## De kern van het voorstel

**Standaard blijft de app precies zoals hij is: de bouwdefault, zonder menu.** Wie
niets doet, merkt niets. De volledige driehoek — taaktypes per taak, effort-driven
gedrag, opgeslagen werk — wordt opt-in ontsloten.

**De belangrijkste ontwerpregel: de opt-in-knop gate uitsluitend de wéérgave, nooit
de berekening.** Taaktypes zijn gewone documentdata die in het projectbestand
round-trippen, en de motor respecteert ze altijd — ook bij een gebruiker die de
knop nooit heeft aangeraakt. De knop bepaalt alleen of de gebruiker de
bijbehorende bedieningselementen ziet en zelf types kan zetten. Daarmee rekent
hetzelfde bestand bij iedereen hetzelfde, wat de harde les van de
nul-afwijkingen-etappe is: rekensemantiek hoort in het document, nooit in een
lokale app-instelling. Een geïmporteerd .mpp met effort-driven-taken werkt dus
gewoon correct, ongeacht de knop; open ontwerpvraag voor de etappe is alleen of
zo'n bestand de weergave automatisch ontsluit (met een melding) of verborgen
correct blijft rekenen.

## Wat er onder de motorkap nodig is

De knop is het kleinste deel van het werk. Eronder ligt, in dwingende volgorde:

1. **Werk wordt een eerste-klas, opgeslagen grootheid** per toewijzing — volgens
   het conventiepatroon van de nul-afwijkingen-etappe: veld aanwezig ⇒ bron van
   waarheid, veld afwezig ⇒ afgeleid zoals nu, byte-identiek gedrag voor elk
   bestaand project. Alles wat nu stilzwijgend op "werk is afgeleid" leunt moet
   daarbij expliciet kiezen: de nivelleerder, de histogram-verdeling
   (`distributeUnits`), de MCP-leestools, de CSV/MSPDI/P6-exporteurs, het
   documentcontract en de IFC-round-trip.
2. **Taaktypes als documentdata** — per taak de keuze welke hoek beschermd is,
   plus de effort-driven-vlag, opgeslagen in het project-IFC.
3. **De contour-engine hoort bij deze etappe.** Zonder herschaling van de
   werkverdeling-per-dag blijft "bewerken zoals MS Project" een halve belofte:
   precies het na-bewerken-gat dat de aanleiding van dit voorstel was, zit in de
   contouren, niet in de taaktypes alleen. De etappe is pas af als een bewerking
   op een gecontourde taak de verdeling meeneemt.
4. **Een bewerken-meetlat.** De bestaande fidelity-suite toetst *openen en
   herberekenen*; voor deze etappe is een tweede soort test nodig: bewerking X op
   bestand Y geeft MS Projects uitkomst Z. Die infrastructuur bestaat nog niet en
   moet vóór de motorbouw ontworpen worden — anders is "het werkt" een mening.

## Neutraal tussen MSP en P6

MS Project en P6 hebben nét verschillende menukaarten: MSP combineert een task
type met een losse effort-driven-vlag; P6 kent duration types met het subtiele
onderscheid tussen units en units/time. Het interne model van de motor moet een
superset zijn die naar beide mapt — anders bouwen we een MSP-vormige motor en
botst de XER-etappe er later op, zoals ook al is vastgelegd bij de
solver-aandachtspunten voor etappe 2. Dit is een harde eis voor de ontwerpronde,
geen nice-to-have.

## De UX-vraag

Effort-driven is al dertig jaar de meest beklaagde functie van MS Project — niet
omdat het idee slecht is, maar omdat MSP verbergt welke hoek vastligt, zodat de
gebruiker het pas merkt als zijn planning onverwacht verschuift. De UX-opgave van
deze etappe is dus niet "het menu kopiëren" maar "de bescherming zichtbaar maken":
in één oogopslag zien welke hoek van de driehoek vastligt, vóórdat je ergens aan
draait. Een taaktype-kolom in de vernieuwde tabelweergaven (zie de
tabel-weergave-revisie in de vault) is daarvoor een natuurlijke plek. Dit
onderzoek hoort ín de ontwerpronde van de etappe, niet ervoor.

## Wat er nu al gebeurt

Vooruitlopend op dit alles worden MSP's task-type- en effort-driven-velden bij
.mpp-import alvast **gelezen en bewaard** (round-trip door het IFC, zonder enig
rekengedrag) — een kleine leestaak in het bestaande stramien, geregistreerd als
nataak van de nul-afwijkingen-etappe. Daarmee gooit de import niets weg en vindt
deze etappe zijn voedingsdata straks kant-en-klaar.

## Wat dit voorstel níét zegt

Het zegt niet *wanneer*. Er is op dit moment geen gebruikersvraag naar taaktypes;
de vragen die er wél liggen (tabellen, consistentie, resource-weergaven) hebben
voorrang. Dit voorstel legt de vorm en de volgorde vast zodat de etappe, wanneer
hij gepland wordt, met een schone start kan beginnen — en zodat tussentijdse
beslissingen in andere etappes er niet mee in tegenspraak raken.
