# Spec — B1.1: het bedrijfscentrische model

Datum: 2026-07-23 · Status: ontwerp, ter review · Vervangt de gebruikerservaring van B1; bouwt op het B1-fundament.
Aanleiding: praktijktest van de user na oplevering B1. Kernconclusie: B1 is projectcentrisch gebouwd
("project is de spil, bibliotheek is een kast ernaast — je sjouwt kopieën heen en weer"), maar het
gewenste model is **bedrijfscentrisch**: het bedrijf is de spil, projecten zijn vensters erop.

## 1. Kernprincipe (de omkering)

Een **bedrijf ís een resourcebibliotheek**: dé verzameling resources en kalenders van dat bedrijf.
Alle projecten van dat bedrijf werken vanuit die ene verzameling — één waarheid, gedeeld over
projecten. Een project "gebruikt" een resource door hem **aan een taak toe te wijzen**; dat is de
enige gebruik-handeling. Kopiëren, toevoegen-uit, bijwerken-uit en promoveren bestaan voor de
gebruiker niet meer — die choreografie zakt onder de motorkap.

## 2. Concepten

- **Koppeling project ↔ bedrijf**: zichtbaar en expliciet. Kiesbaar bij het aanmaken (wizard) en
  zichtbaar/wijzigbaar in Projectinfo. Nooit meer een koppeling die stiekem ontstaat bij een klik.
- **Los project** (geen bedrijf): heeft géén bibliotheek; alle resources/kalenders leven alleen in
  het projectbestand. Dit is exact de toestand van een geëxporteerd/ontvangen bestand — er is één
  "los"-toestand, geen apart mechanisme. Los mag, gekoppeld is de norm.
- **Identiteitsstempels blijven bestaan onder de motorkap** (herkomst {companyId, libraryItemId,
  poolVersion}) — voor opslaan, delen en herkennen. De gebruiker ziet of beheert ze nooit.

## 3. Het Resources-tabblad = de werkplek

Voor een **gekoppeld** project toont het Resources-tabblad **de bedrijfspool** — alles is er al,
niets hoeft "toegevoegd" te worden. Twee weergaven, schakelbaar:

- **Bedrijfsweergave** (default): alle resources van het bedrijf. CRUD hier = CRUD op het bedrijf:
  een nieuwe resource aanmaken voegt hem aan het **bedrijf** toe (direct beschikbaar voor alle
  projecten); bewerken (naam/tarief/maxUnits/kalender) wijzigt het bedrijf — met een licht visueel
  signaal "geldt voor alle projecten"; verwijderen verwijdert uit het bedrijf (reeds opgeslagen
  projectbestanden merken daar niets van, zie §6).
- **Projectweergave**: alleen wat dít project daadwerkelijk gebruikt (aan taken toegewezen, of
  meegekomen uit het bestand).

Voor een **los** project toont het tabblad zoals vanouds de projectresources (er is geen pool).

Toewijzen aan taken werkt zoals altijd; toewijzen van een pool-resource maakt hem "gebruikt" en
daarmee onderdeel van wat bij opslaan in het bestand meereist.

## 4. Koppelen & herkennen (de vervanger van alle kopieer-dialogen)

Bij het koppelen van een project aan een bedrijf — bij aanmaak, of achteraf op een bestaand/oud/
vreemd bestand — draait een **herkenningsstap**:

1. Het systeem stelt matches voor tussen bestaande projectresources/-kalenders en poolitems, primair
   op naam (met tarief/type als hint). Voorstellen, nooit stil auto-koppelen.
2. De gebruiker bevestigt per stuk of in bulk → gematchte items worden gelinkt (gestempeld, onder de
   motorkap) en volgen voortaan het bedrijf.
3. Niet-gematchte projectitems kunnen in dezelfde stap (per stuk of in bulk) **het bedrijf in
   getild** worden, of projectgebonden blijven.

Daarmee is het duplicatenprobleem ("Timmerman" uit het bestand naast "Timmerman" uit de pool)
structureel weg. Omkoppelen naar een ander bedrijf doorloopt dezelfde stap opnieuw; ontkoppelen
maakt het project "los" (gebruikte items blijven, als projectgebonden kopieën).

## 5. Wat verdwijnt (relikwieën van het kastje-ernaast-model)

- `AddFromLibraryDialog` ("Toevoegen uit bibliotheek") — overal, incl. de ResourcePanel-knop.
- `UpdateFromLibraryDialog` ("Bijwerken uit bibliotheek") — voor gekoppelde projecten is de pool de
  waarheid; er valt niets bij te werken.
- De "+ Uit project"-promoveerknoppen in de Bibliotheek-sectie. Promoveren als losse handeling
  bestaat alleen nog binnen de herkenningsstap (§4, "het bedrijf in tillen").
- De wizard-checkbox "na aanmaken toevoegen uit bibliotheek" — vervangen door de bedrijfskeuze zelf.
- De bijbehorende ui-flags/i18n-strings worden opgeruimd (niet verweesd achterlaten).

## 6. Waarheid, opslaan en laden

- **Gekoppeld project, resource in de pool**: de poolwaarden gelden — in beeld én in de berekening.
  Wijzig je het tarief in het bedrijf, dan geldt dat overal direct.
- **Opslaan** ("gebeiteld" blijft onverkort): het bestand bevat wat het project gebruikt — de
  gebruikte resources (met hun actuele poolwaarden op het moment van opslaan), hun kalenders, de
  stempels en de bedrijfsbinding. Nooit de hele pool (bestanden blijven slank en zelfstandig;
  golden rule voor los/ongebruikt blijft gelden).
- **Openen van een gekoppeld bestand op een machine die het bedrijf kent**: pool is de waarheid;
  bestandswaarden van gestempelde items worden als verouderde momentopname beschouwd.
- **Gestempeld item waarvan het poolitem niet meer bestaat**: blijft gewoon functioneren op zijn
  bestandswaarden (geen dataverlies), zichtbaar in de projectweergave met een discrete markering
  "niet meer in het bedrijf"; via de herkenningsstap opnieuw te koppelen of het bedrijf in te tillen.
- **Openen op een machine zonder dat bedrijf** (ontvanger): het project gedraagt zich als los —
  volledig werkend op de meegereisde kopieën. Koppeling aan een eigen bedrijf kan via §4.

## 7. Backstage → Bibliotheek krimpt tot bedrijvenbeheer

Alleen wat echt over *bedrijven* gaat: aanmaken/hernoemen/verwijderen, standaardbedrijf kiezen, en
de bestandsoperaties — pool-export (tevens backup) en pool-import met de bestaande
dempingswaarschuwing + sync-uitleg. De resource-werkplek verhuist naar het Resources-tabblad (§3).

## 8. Kalenders: zelfde principe, gefaseerde uitvoering

Bedrijfskalenders volgen hetzelfde model (de bedrijfsverzameling is zichtbaar/beheerbaar op de
plekken waar kalenders al beheerd worden; projectdefault-keuze uit de bedrijfsset). De
resource-kant (§3-§5) gaat voorop; de kalender-UI mag als tweede fase, zolang er geen
tegenstrijdige tussenvorm ontstaat (geen kalender-"toevoegen uit"-dialoog terug laten komen).

## 9. Histogram over projecten heen = B1b, bouwt hierop

Bezetting is een bedrijfsvraag: het histogram toont (minstens als optie) de belasting van
bedrijfsresources over álle projecten van dat bedrijf die deze machine kent. Dit is het bestaande
B1b-vervolg (issue #19 deel 2) en wordt door dit model pas echt mogelijk; de gedocumenteerde
grens blijft: één machine ziet alleen haar eigen projecten (sync-vervolgproject).

## 10. Wat onverkort blijft van B1 (het fundament)

Opslagformaat en round-trip (stempels/bedrijfsbinding in het project-IFC; OPS_Library-pool-IFC),
golden rule (byte-bewezen), pool-opslag (IndexedDB/appDataDir), export/import met demping,
quote-bewuste parser en alle 190+395 checks, i18n-infrastructuur, sync-beperkingen en de
documentatie daarvan. B1.1 is een verbouwing van de gebruikslaag, niet van het fundament.

## 11. Migratie & compatibiliteit

- Bestaande bestanden mét stempels: blijven geldig; bij openen met bekend bedrijf vallen ze direct
  in het nieuwe model (pool = waarheid).
- Bestaande bestanden zónder stempels: openen als los; de herkenningsstap (§4) is hun instap.
- Bestaande pools/bedrijven: ongewijzigd bruikbaar.
- De verwijderde dialogen laten geen dode ui-state of i18n-wezen achter; docs (`docs/library.md`)
  worden herschreven naar het nieuwe model, incl. de bestaande beperkingen-secties.

## 12. Buiten scope

Echte sync tussen machines/tabbladen (vervolgproject), B1b-histogram-implementatie zelf (eigen
vervolg, ontwerpt op dit model), bedrijfsoverstijgende resources, IFCX.
