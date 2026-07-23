# Bedrijfsbibliotheken

Eén centrale plek per **bedrijf** waar kalenders en resources leven, buiten de projecten om.
Projecten van dat bedrijf putten eruit; wat een project gebruikt wordt een **bewerkbare kopie mét
herkomststempel** in het project zelf. Een gedeeld projectbestand is daardoor altijd compleet en
zelfstandig — "gebeiteld": zelfstandig, niet read-only.

## Bedrijven

Er is altijd één standaardbedrijf ("Mijn bedrijf"). Eenpitters zien het bedrijfsconcept nooit: de
bedrijfsselector verschijnt pas zodra er ≥2 bedrijven zijn. Beheer bedrijven via
**Bestand → Bibliotheek**: aanmaken, hernoemen, verwijderen (het laatste bedrijf blijft altijd
bestaan), en één als standaard aanwijzen.

## De pool

Elk bedrijf heeft een **pool**: de verzameling bibliotheekkalenders en -resources, met een
oplopend versienummer. Promoveer een projectkalender of -resource naar de pool vanuit het project.
Promoveren zet ook een herkomststempel terug op het bron-item in het project: dat item geldt vanaf
dat moment zelf als bibliotheek-kopie (bijwerkbaar vanuit de bibliotheek, en niet nogmaals te
dupliceren als je het later opnieuw "toevoegt").

## Toevoegen aan een project

Via de projectwizard en in een lopend project ("Toevoegen uit bibliotheek"). Toevoegen kopieert het
item met een herkomststempel. Afhankelijkheden reizen mee: een resource met een eigen kalender brengt
die kalender mee. Bestaat er al een kopie met dezelfde herkomst, dan wordt die hergebruikt — nooit
gedupliceerd. Een al aanwezig item nogmaals toevoegen meldt "al in project".

## Bijwerken vanuit bibliotheek

Per item, met zichtbaar verschil (bibliotheekwaarde naast projectwaarde). Er is bewust **geen**
bulk-overschrijfknop. Is het bibliotheekorigineel verwijderd, dan meldt de bijwerkweergave "bestaat
niet meer in bibliotheek" en verandert er niets aan de projectkopie.

## Export, import & back-up

Een pool exporteer je als één IFC 4.3-bestand per bedrijf; dat is tevens je **back-up**. Import
vervangt de **hele** pool van het gekozen bedrijf, ná bevestiging. Bij projectexport kun je met
"Bibliotheekbestand ernaast opslaan" de pool als tweede, los bestand naast het project schrijven.

## Bekende beperkingen (bewust niet opgelost in B1)

Beide komen voort uit dezelfde wortel — **er is geen gedeelde opslag tussen machines** (local-first,
geen server) — en worden opgelost in een apart vervolgproject "gedeelde opslag/sync".

1. **Twee planners, zelfde bedrijf.** Pools kunnen op verschillende machines uiteenlopen. De
   import-demping waarschuwt wanneer je een oudere pool over een nieuwere lokale pool importeert
   ("jouw lokale bibliotheek is nieuwer"), maar kan divergentie niet vóórkomen.

2. **Bezettingsoverzicht ziet alleen deze machine.** Boekingen op de machine van een collega bestaan
   lokaal niet, dus een bezettingsoverzicht (vervolg B1b) is beperkt tot wat op deze machine bekend
   is.

**Aanbeveling.** Deelt jullie organisatie ploegen over werkmaatschappijen heen, kies dan bewust
**één gezamenlijke pool** in plaats van per werkmaatschappij een eigen bedrijf. Dubbelbezetting van
een resource tussen losse organisaties (bijvoorbeeld een onderaannemer die voor twee aannemers werkt)
is bewust geen probleem van dit systeem — dat is het planningsprobleem van die resource zelf.
