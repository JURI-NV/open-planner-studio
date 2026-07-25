# Dwarsdoorsnede-thema: Kanalen, resellers, training en certificering

**Wereldwijd marktonderzoek planningssoftware — themarapport**
Datum: 25 juli 2026 · Alle bronnen geraadpleegd op 25 juli 2026 tenzij anders vermeld.

---

## 0. Methodologische verantwoording vooraf (lees dit eerst)

**Beperking die het onderzoeksontwerp heeft veranderd.** De opdracht vroeg om minimaal twaalf `WebSearch`-opdrachten. Het zoekbudget van deze sessie was bij aanvang van dit deelonderzoek al volledig verbruikt (200/200 aanroepen door eerdere deelonderzoeken). Ik heb daarom **geen enkele websearch kunnen uitvoeren**. In plaats daarvan heb ik gewerkt met directe ophaalacties op bronnen waarvan ik de vindplaats kon afleiden of reconstrueren: SEC EDGAR (via de officiële submissions-API), jaarverslag-PDF's, publieke prijslijsten, normdocumenten, twee overheids-API's met echte transactiedata (USAspending, UK Digital Marketplace/G-Cloud), de World Bank-indicator-API en de ProPublica-spiegel van IRS Form 990-aangiften.

Dat heeft het rapport **feitelijk sterker** gemaakt op harde cijfers en **zwakker** op breedte:

- *Sterker*: vrijwel elk cijfer hieronder komt uit een jaarrekening, een wettelijk deponeringsdocument, een gepubliceerde prijslijst, een aanbestedingscatalogus of een overheidstransactiedatabase. Er zit nauwelijks vakpers of analistenmarketing in.
- *Zwakker*: ik heb géén analistenrapporten (Gartner, IDC, Verified/Grand View) kunnen raadplegen, géén vakpers, en géén regionale bronnen uit India, Egypte, Zuidoost-Azië of Latijns-Amerika in de lokale taal. De sectie over informele licenties leunt daarom op één sterke primaire bron (USTR) plus expliciet gemarkeerde eigen afleidingen, niet op regionaal veldmateriaal.
- Enkele bronnen blokkeren geautomatiseerde toegang met HTTP 403 en zijn dus **niet** geverifieerd: `pmi.org` (alle paden), `bsa.org` / `gss.bsa.org`, `web.archive.org`, `partner-finder.oracle.com`. Waar ik die had willen gebruiken, staat dat expliciet als gat vermeld. Ik heb voor PMI **geen cijfers uit het geheugen ingevuld**.

**Bronkwaliteitscodering.** Elk cijfer in dit rapport is gelabeld:

| Code | Betekenis |
|---|---|
| **[H]** | Hard. Gecontroleerde jaarrekening, SEC-deponering, wettelijk normdocument, gepubliceerde prijslijst, aanbestedingscatalogus of overheidstransactiedatabase. |
| **[H-]** | Hard maar met een kanttekening (bijv. zelfgerapporteerd zonder accountantscontrole, of een deelverzameling). |
| **[S]** | Mijn eigen schatting of afleiding. Redenering en invoer staan er altijd bij. |
| **[M]** | Marketing- of leveranciersclaim zonder controleerbare onderbouwing. |

---

## 1. Samenvatting

**1. Het resellerkanaal in planningssoftware is klein en het krimpt — dat is het tegenovergestelde van wat de sector over zichzelf vertelt.** Drie beursgenoteerde leveranciers publiceren een expliciete kanaalsplitsing, en alle drie wijzen dezelfde kant op. Eleco plc (Asta Powerproject) haalde in FY2025 **96,6 % van de omzet direct** en slechts **3,4 % via resellers** — in absolute euro's groeide het resellerkanaal met 1,4 % terwijl de groep met 19,8 % groeide **[H]**. Bentley Systems (SYNCHRO) zit op **94 % direct / 6 % indirect**, gedaald van 92/8 in 2023 **[H]**. Alleen Autodesk is nog echt kanaalgedreven met **37 % indirect** — maar dat cijfer stort in: de grootste distributeur TD Synnex ging van 39 % van de netto-omzet (FY2024) naar 33 % (FY2025) naar **14 % (FY2026)** door een bewuste omschakeling naar direct transacteren **[H]**.

**2. Het kanaal is geen verkoopkanaal maar een dekkingsinstrument.** Bentley zegt het letterlijk: partners worden ingezet "in geografische regio's waar wij geen betekenisvolle aanwezigheid hebben of waar directe verkoop economisch minder haalbaar is" **[H]**. Autodesk verwacht dat het indirecte kanaal belangrijk blijft "met name in opkomende regio's en bij overheden" **[H]**. Bij Eleco correspondeert de resellersomzet (£1,337 mln) bijna precies met de omzetcategorie *Rest of World* (£1,134 mln) **[H]**. Resellers bedienen dus de staart van de markt, niet de kern.

**3. Overheden kopen planningssoftware vrijwel nooit rechtstreeks bij de leverancier.** In de Amerikaanse federale transactiedatabase komt Oracle zelf niet voor als contractant voor Primavera-*licenties* van betekenis; vrijwel alle contracten lopen via wederverkopers — [**gecorrigeerd bij verificatie:** Oracle America, Inc. is wél zelf federaal contractant op minstens zes Primavera-gerelateerde opdrachten, alle voor *Primavera Submittal Exchange* en samen ca. $131k. De oorspronkelijke absolute formulering ("komt niet één keer voor") is onjuist; zie §7] — CDW-G, Mythics, Affigent, DLT Solutions, Dynamic Systems, Emergent, ImmixTechnology **[H]**. In de top-100 aan "Primavera"-contracten sinds 2019 gaat $61,9 mln om, waarvan de vijf grootste wederverkopers samen $43,8 mln **[H]**. De reseller is hier geen adviseur maar een contractvehikel.

**4. Oracle publiceert bewust géén prijs voor Primavera.** Ik heb de complete *Oracle Fusion Cloud Service Global Price List* van 16 juli 2026 doorzocht: **nul Primavera-SKU's** **[H]**. De productpagina van P6 EPPM noemt geen enkel bedrag **[H]**. Prijsopaciteit is een kanaalstrategie: zij maakt de reseller of het accountteam noodzakelijk om überhaupt een getal te krijgen.

**5. De werkelijke prijzen zijn wél te achterhalen via aanbestedingscatalogi, en ze lopen enorm uiteen.** Uit de Britse G-Cloud-catalogus (juridisch bindende gepubliceerde tarieven) haalde ik 59 prijspunten: Primavera P6 EPPM van **£165 tot £439 per gebruiker per maand** (RPC UK), Oracle Primavera Cloud vanaf **£8 per licentie per maand** (Hyde Park Solutions) tot £176, consultancy-dagtarieven van **£385–£1.210** (i3Works) tot **£845–£2.360** (BMT) **[H]**. Amerikaanse federale transacties leveren een harde eenheidsprijs: **$3.879,60 per zetel** voor licentie plus één jaar support (DOE, september 2025) **[H]**.

**6. De opleidingsmarkt is groter dan de certificeringsmarkt — met ordes van grootte.** AACE International certificeerde in heel 2025 wereldwijd **677 personen** over negen keurmerken samen, en heeft in totaal **5.386 actieve certificaathouders** **[H]**. Voor het planningskeurmerk PSP zijn dat er **1.806 actief** wereldwijd **[H]**. De hele organisatie AACE International draaide in FY2023 **$3,03 mln** omzet **[H]**. Ter vergelijking: één softwareleverancier, Eleco, boekte in FY2025 **£6,958 mln uitsluitend aan diensten, en die post is in de jaarrekening expliciet gedefinieerd als "training and consultancy"** — [**gecorrigeerd:** dat is **ca. 2,9 keer** de totale omzet van het belangrijkste certificerende orgaan in het vak, niet "bijna 2,5 keer". De oorspronkelijke verhouding deelde ponden door dollars. £6,958 mln ≈ $8,9 mln bij ~1,28 USD/GBP; $8,9 / $3,03 ≈ 2,9. Let bovendien op de **periodeverschuiving**: Eleco is FY2025, AACE's $3,03 mln is FY2023 (de meest recente gedeponeerde Form 990)] **[H]**.

**7. Training en consultancy zijn ~18 % van de omzet van een planningsleverancier — maar het is de traagste post.** Bij Eleco: diensten £6,958 mln (17,9 % van de omzet) in FY2025 tegen £6,448 mln (19,9 %) in FY2024. Diensten groeiden 7,9 % terwijl de groep 19,8 % groeide **[H]**. Terugkerende omzet ging van 77,0 % naar 80,7 %; eeuwigdurende licenties zijn met £545k (1,4 %) praktisch verdwenen **[H]**. De dienstenpost verwatert structureel.

**8. Informele licenties zijn een structureel prijsprobleem, geen handhavingsprobleem.** Oracle prijst Primavera wereldwijd in dollars zonder koopkrachtcorrectie. Afgezet tegen het BBP per hoofd van 2024 kost één P6-zetel **4,5 % van het BBP p.h. in de VS, maar 116 % in Egypte en 150 % in India** — een relatieve prijs die **33 keer** zo hoog ligt **[S, op basis van [H]-invoer]**. Bij die verhouding is niet-betalen geen moreel maar een rekenkundig gegeven. De USTR plaatst India, Indonesië, Argentinië, China, Mexico en Venezuela op de Priority Watch List en Egypte, Brazilië, Thailand en Vietnam op de Watch List, met expliciete vermelding van ongelicentieerd softwaregebruik **[H]**.

**9. Het gevolg voor marktomvang: de installed base is veel groter dan de omzet, maar de *reële* markt nauwelijks.** Het gat tussen gebruik en betaling is groot, maar dat gat is grotendeels géén gemiste omzet — bij volledige handhaving zouden die gebruikers overstappen op iets goedkopers, niet betalen. Wat de informele markt wél doet, is waarde **verschuiven van licenties naar training en certificering**: een gekraakte P6 werkt, een gekraakt PSP-diploma niet. Wie niet voor software betaalt, betaalt wel voor het bewijs dat hij ermee kan werken.

**10. Voor Open Planner Studio.** De kanaalstructuur is geen obstakel maar een geschenk: de gevestigde partijen hebben zich uit precies de markten teruggetrokken (via dunne resellernetwerken) waar een gratis, IFC-native planner het sterkst staat. De strategische opgave zit niet in distributie maar in **legitimiteit** — en die wordt in dit vak verhandeld via certificering en aanbestedingsconformiteit, niet via productfunctionaliteit.

---

## 2. Hoe planningssoftware daadwerkelijk wordt verkocht

### 2.1 De kanaalsplitsing, uit gecontroleerde jaarrekeningen

Dit is het hart van het thema en gelukkig het best gedocumenteerde deel. Drie leveranciers publiceren een expliciete direct/indirect-splitsing.

| Leverancier | Boekjaar | Direct | Indirect (reseller/partner) | Totale omzet | Bron |
|---|---|---|---|---|---|
| **Eleco plc** (Asta Powerproject) | FY2025 | £37,479k — **96,6 %** | £1,337k — **3,4 %** | £38,816k | Jaarverslag 2025, toelichting "Geographical, Product and Sales Channel Information" **[H]** |
| **Eleco plc** | FY2024 | £31,075k — 95,9 % | £1,319k — 4,1 % | £32,394k | idem **[H]** |
| **Bentley Systems** (SYNCHRO) | FY2025 | **94 %** | **6 %** | $1.501,8 mln | 10-K FY2025, "Sales and Marketing" **[H]** |
| **Bentley Systems** | FY2024 | 93 % | 7 % | $1.353,1 mln | 10-K **FY2024** (afzonderlijke deponering) **[H]** |
| **Bentley Systems** | FY2023 | 92 % | 8 % | $1.228,4 mln | 10-K **FY2023** (afzonderlijke deponering) **[H]** |
| **Autodesk** | FY2026 (t/m 31-01-2026) | ~63 % | **~37 %** | — | 10-K FY2026, "Marketing and Sales" **[H]** |

Bronnen:
- Eleco plc, *Annual Report and Accounts 2025*, PDF, p. 82–83 — https://ir.eleco.com/wp-content/uploads/2026/05/5770_Eleco-plc-Annual-Report-2025_Hyperlink.pdf
- Bentley Systems Inc., Form 10-K voor FY2025, ingediend 26-02-2026 — https://www.sec.gov/Archives/edgar/data/0001031308/000103130826000007/bsy-20251231.htm
- Bentley Systems Inc., Form 10-K voor FY2024, ingediend 26-02-2025 — https://www.sec.gov/Archives/edgar/data/1031308/000103130825000002/bsy-20241231.htm *(bron van 93/7)*
- Bentley Systems Inc., Form 10-K voor FY2023, ingediend 27-02-2024 — https://www.sec.gov/Archives/edgar/data/1031308/000103130824000002/bsy-20231231.htm *(bron van 92/8)*

> **Sourcingcorrectie na verificatie.** De 94/6-splitsing staat verbatim in het FY2025-10-K ("…which generated approximately 94% of our 2025 total revenues […] Channel partners accounted for approximately 6% of our 2025 total revenues"). De cijfers voor 2024 (93/7) en 2023 (92/8) staan **niet** in dat document; elk jaar heeft zijn eigen 10-K met dezelfde zinsconstructie. Alle drie zijn afzonderlijk geverifieerd. De dalende reeks 8 → 7 → 6 % klopt dus, maar berust op drie deponeringen, niet op één tabel.
- Autodesk Inc., Form 10-K voor FY2026, ingediend 03-03-2026 — https://www.sec.gov/Archives/edgar/data/769397/000076939726000015/adsk-20260131.htm

**Wat hier opvalt en zelden wordt opgemerkt:** de richting. Bij Bentley daalt het indirecte aandeel drie jaar op rij (8 → 7 → 6 %). Bij Eleco groeide de resellersomzet van £1.319k naar £1.337k, **+1,4 %**, terwijl de groepsomzet met **19,8 %** groeide — het kanaal verwaterde dus van 4,1 % naar 3,4 % **[H, eigen berekening op [H]-cijfers]**. Er is in deze data geen enkel signaal van een opkomend VAR-netwerk. Het tegendeel.

### 2.2 Autodesk als uitzondering die de regel bevestigt

Autodesk is de enige grote AEC-leverancier met een echt kanaalmodel, en juist daar voltrekt zich de scherpste breuk. Uit het 10-K FY2026 **[H]**:

> "We have a network of approximately **1,170 resellers and distributors worldwide**. For fiscal 2026, approximately **37 % of our revenue** was derived from indirect channel sales through distributors and resellers."

En over de grootste distributeur:

> "Revenue through our largest distributor, TD Synnex Corporation and its global affiliates […] accounted for **14 %, 33 %, and 39 %** of our net revenue for the fiscal years ended January 31, **2026, 2025 and 2024**, respectively."

Dat is een halvering-en-nog-eens in twee jaar. De oorzaak staat er expliciet bij: het "new transaction model", waarbij Solution Providers nog wél de offerte maken maar **de transactie zelf tussen Autodesk en de klant plaatsvindt**. De partner behoudt de relatie en verliest de marge-op-doorverkoop; hij wordt van wederverkoper tot bemiddelaar met commissie.

Autodesk formuleert ook waar het kanaal wél overleeft **[H]**:

> "We expect our indirect channel will continue to transact and support a considerable portion of our customers, **particularly in emerging regions and with governments**."

Dat is precies de these van dit themarapport, in de woorden van de leverancier zelf.

### 2.3 Het kanaal als dekkingsinstrument, niet als verkoopmotor

Bentley Systems verwoordt de functie het scherpst **[H]**:

> "We also rely on specialist channel partners in geographic regions where we do not currently have a meaningful presence or where, for some of our offerings, **direct sales efforts are less economically feasible**."

Eleco doet hetzelfde en zegt er in de risicoparagraaf bij dat geografische uitbreiding deels loopt "in non-geographically present countries through reseller partner channels" **[H]**. In de bedrijfsbeschrijving: "Other markets are also serviced through a network of channel partners" — naast de eigen vestigingen in VK, Ierland, Duitsland, Zweden, Nederland, Roemenië, VS en Australië **[H]**.

Een aardige kruiscontrole: Eleco's omzet naar geografie in FY2025 **[H]**:

| Regio | FY2025 (£000) | FY2024 (£000) |
|---|---|---|
| VK | 18.389 | 15.891 |
| Scandinavië | 6.867 | 5.830 |
| Duitsland | 3.296 | 3.058 |
| VS | 1.480 | 1.642 |
| Rest van Europa | 7.650 | 5.217 |
| **Rest van de wereld** | **1.134** | **756** |
| **Totaal** | **38.816** | **32.394** |

De resellersomzet (£1.337k) ligt in dezelfde orde van grootte als *Rest of World* (£1.134k) **[S — dit is een suggestieve, geen bewezen correspondentie; Eleco publiceert geen kruistabel van kanaal × geografie]**. Het beeld dat daaruit oprijst: het kanaal bedient de landen waar de leverancier niet zit, en die landen zijn samen ~3 % van de omzet.

### 2.4 Leveranciers die géén kanaalcijfer publiceren

Belangrijk voor de bronkritiek: **kanaaltransparantie is de uitzondering**.

- **Nemetschek SE** noemt in het jaarverslag 2025 wel het model maar geen percentage **[H]**: klanten worden bereikt "both directly via brand-specific sales organizations and **indirectly via partner networks, resellers and distributors**". Ik heb het volledige jaarverslag van 254 pagina's doorzocht; er staat nergens een kwantificering. Bron: https://ir.nemetschek.com/media/document/b26659fa-1299-4d6b-a2e8-d293ab7b3a66/assets/DE0006452907-JA-2025-EQ-E-00.pdf
- **Trimble** beschrijft in het 10-K FY2025 uitgebreide dealernetwerken (SITECH voor civiele bouw, BuildingPoint voor utiliteitsbouw) en verkoopt "in more than 160 countries through dealers, joint ventures, original equipment manufacturers (OEMs), and other channels" — maar publiceert **geen** kanaalpercentage **[H]**. Bron: https://www.sec.gov/Archives/edgar/data/0000864749/000086474926000015/trmb-20260102.htm
- **Procore** noemt channel partners uitsluitend in risicoparagrafen rond overheidsverkoop en anticorruptie, en publiceert geen kanaalmix **[H]**. Bron: https://www.sec.gov/Archives/edgar/data/0001611052/000162828026011055/pcor-20251231.htm

Bij Trimble is de reden vermoedelijk structureel: hardware (totaalstations, machinebesturing) vraagt fysieke dealers met voorraad en service, software niet. Dat is de scheidslijn in het hele AEC-veld — **hoe meer hardware, hoe dikker het kanaal**. Pure planningssoftware zit aan het dunne uiteinde.

### 2.5 Oracle: prijsopaciteit als kanaalstrategie

Oracle Primavera is de facto de standaard in grote infrastructuur- en energieprojecten, en juist daar is de verkoop het minst transparant. Twee geverifieerde negatieve bevindingen:

1. **De publieke prijslijstenindex van Oracle bevat geen Primavera-prijslijst.** Op https://www.oracle.com/us/corporate/pricing/price-lists/index.html staan prijslijsten voor Technology, E-Business Suite, Fusion Applications, Engineered Systems, Siebel, PeopleSoft, JD Edwards, MySQL, Java SE, PaaS/IaaS en diverse cloud-diensten — **geen** Construction & Engineering en **geen** Primavera **[H]**.
   > **Nuancering na verificatie.** De index bevat wél een *U.S. Public Sector Part Number Detail*-lijst (`us-public-sector-3904395.pdf`, 21-05-2026, 57 p.). Die bevat **twee Primavera-regels**: `L70120` en `L70135`, beide "Primavera Contract Management – Application User". Ze staan er echter **zonder bedrag**: in de prijskolom staat "Prior Year + 0%", terwijl alle andere producten in dezelfde lijst een expliciete dollarprijs krijgen (bijv. "Oracle Hyperion Planning Plus – Application User $3.500,00 / $770,00"). Er is dus **geen P6-SKU** en **geen gepubliceerd Primavera-bedrag** — de kernbewering houdt stand — maar de formulering "Primavera komt in Oracle's prijslijsten niet voor" is te absoluut: de naam staat er, de prijs niet **[H]**.
2. **De *Oracle Fusion Cloud Service Global Price List* van 16 juli 2026 bevat nul treffers op "Primavera".** Ik heb de volledige PDF (25 pagina's) opgehaald en op tekstniveau doorzocht **[H]**. Bron: https://www.oracle.com/a/ocom/docs/corporate/pricing/oracle-fusion-cloud-global-price-list.pdf

De productpagina van P6 EPPM (https://www.oracle.com/construction-engineering/primavera-p6/) noemt geen enkel bedrag en biedt uitsluitend "Contact us" en "Request a demo" **[H]**.

**Interpretatie [S]:** dit is geen nalatigheid. Voor producten waarvoor Oracle wél een wereldwijde prijslijst publiceert, kan een klant zelfstandig een budget bepalen en een reseller op prijs afknijpen. Voor Primavera kan dat niet. Het effect is dat elke aankoop door een accountteam of een partner moet, en dat de prijs per klant kan worden gezet naar draagkracht. Dat is commercieel rationeel en het is ook precies de voorwaarde waaronder in prijsgevoelige markten informele licenties bloeien: als niemand de prijs kent, kan niemand hem begroten.

### 2.6 Wat overheden werkelijk betalen — Amerikaanse federale transactiedata

Om onder de opaciteit uit te komen heb ik de **USAspending-API** van het Amerikaanse ministerie van Financiën bevraagd (https://api.usaspending.gov/api/v2/search/spending_by_award/), die alle federale contracten publiceert. Dit is harde transactiedata, geen catalogusprijs **[H]**.

**Bevinding 1 — Oracle verkoopt vrijwel niet zelf aan de Amerikaanse overheid.** In de top-100 contracten met trefwoord "Primavera" sinds 2019 ($61,9 mln totaal) komt Oracle Corporation **niet één keer** voor als contractant. De grootste ontvangers:

> **Correctie na verificatie (25-07-2026).** Een gerichte hervraging van de USAspending-API met `recipient_search_text=["Oracle"]` levert wél zes opdrachten op naam van **Oracle America, Inc.** op ($48.600, $26.730, $22.500, $22.500, $9.927,50, $902,50 — samen ca. $131k). Alle zes betreffen echter **Primavera Submittal Exchange**, een documentbeheerdienst, niet P6-licenties. De juiste formulering is dus: Oracle verkoopt P6 niet zelf aan de federale overheid, maar is niet volledig afwezig als contractant. Omdat de bedragen ver onder de top-100-drempel liggen, blijft de tabel hieronder ongewijzigd geldig.

| Wederverkoper | Bedrag (top-100, 2019–2026) |
|---|---|
| CDW Government LLC | $11.380.553 |
| Mythics, LLC | $10.763.765 |
| Affigent, LLC | $7.348.796 |
| Robo Holdings LLC | $7.319.622 |
| DLT Solutions, LLC | $7.022.585 |
| A.S.L. Management, Inc | $3.653.322 |
| Emergent, LLC | $3.545.034 |
| Radus Software LLC | $2.135.036 |
| Dynamic Systems Inc | $1.945.634 |

*Kanttekening bij de bronkwaliteit* **[H-]**: het trefwoord "Primavera" is een gewoon Spaans woord. In de lijst zat minstens één vrijwel zeker irrelevante post (Fundación INCIENSA, $2,85 mln, een Costa Ricaanse gezondheidsinstelling). De genoemde negen ontvangers zijn echter alle bekende federale IT-wederverkopers en hun contractomschrijvingen noemen expliciet Oracle Primavera; die zijn betrouwbaar.

**Bevinding 2 — echte eenheidsprijzen.** Enkele contracten specificeren aantallen, wat een harde prijs per zetel oplevert **[H]**:

| Datum | Koper | Wederverkoper | Omschrijving | Bedrag | Afgeleide eenheidsprijs |
|---|---|---|---|---|---|
| 15-09-2025 | Dept. of Energy | Affigent | "BPA call for 20 Primavera P6 licenses and 20 one-year Primavera support" | $77.592 | **$3.879,60 per zetel** (licentie + 1 jr support) |
| 24-09-2025 | Dept. of Energy (NNSA, NA-95 project controls) | Affigent | "Purchase six Primavera P6 licenses and application user license support (1-year)" | $24.274,56 | **$4.045,76 per zetel** |
| 17-04-2025 | Dept. of Defense | DLT Solutions | "Primavera P6 license update — 1 yr (4 EA)" | $1.884,56 | **$471,14 per zetel per jaar** (onderhoudsverlenging) |

Dit zijn de meest concrete Primavera-prijzen die ik in dit onderzoek heb kunnen vaststellen. De twee zetelprijzen liggen **4,3 %** uit elkaar (4.045,76 / 3.879,60 = 1,0428) en zijn beide van dezelfde koper in dezelfde maand, dus ze bevestigen elkaar maar zijn niet onafhankelijk.

> **Correctie na verificatie — rekenfout en interne tegenspraak.** De oorspronkelijke tekst luidde: "De onderhoudsprijs (~$471/jaar) impliceert bij het gebruikelijke Oracle-percentage van 22 % een onderliggende licentiewaarde van ~$2.140, wat suggereert dat de $3.880-bundel bestaat uit een licentie van ruwweg $3.300–3.400 plus eerstejaars support." Die twee afleidingen zijn **onderling onverenigbaar**. Er zijn precies twee consistente lezingen, en de tekst mengde ze:
> - *Lezing A (22 % houdt):* $3.879,60 / 1,22 = **licentie ~$3.180 + support ~$700**. Dan is de $471-onderhoudspost van DoD echter een ander (ouder of anders geprijsd) contract, want $471 ≠ 22 % van $3.180.
> - *Lezing B ($471 is de support in de bundel):* licentie = $3.879,60 − $471,14 = **$3.408**, maar dan is het supportpercentage **13,8 %**, niet 22 %.
>
> De genoemde "$2.140" volgt uit lezing B-invoer met lezing A-rekenwijze en hoort nergens thuis. De verdedigbare uitspraak is alleen: **de licentiecomponent ligt tussen ~$3.180 en ~$3.410** **[S]**. De oorspronkelijke conclusie ("hoger dan de historische lijstprijs") blijft in beide lezingen overeind.
>
> **Aanvullende vondst bij verificatie:** een **derde, onafhankelijke** eenheidsprijs — DLT Solutions, "FOUR (4), 12-MONTH LICENSES FOR ORACLE PRIMAVERA (P6)", $12.375,42 = **$3.093,86 per 12-maandslicentie** — bij een andere wederverkoper en een ander agentschap dan het DOE-paar. Dit verzwakt onzekerheid #5 in §5 (die stelde dat alle eenheidsprijzen van één koper komen).

**Bevinding 3 — training loopt langs andere partijen.** Trefwoord "Primavera P6 training" levert slechts drie federale contracten sinds 2015 **[H]**:

| Datum | Koper | Aanbieder | Omschrijving | Bedrag |
|---|---|---|---|---|
| 12-05-2025 | Dept. of Defense | **Emerald Associates Inc.** | "2025 Primavera P6 training" | $49.350 |
| 09-05-2019 | Dept. of Homeland Security (US Coast Guard) | Critical Business Analysis, Inc. | "Primavera P6 Fundamentals onsite training to OPC PMO personnel (up to 10 attendees) […] and to OPC PRO personnel (up to 10)" | $29.871 (na wijziging; oorspronkelijk $24.509) |
| 04-08-2014 | Dept. of Defense | Construction Science, LLC | "Primavera P6 training" | $5.050 |

Uit het Coast Guard-contract volgt een harde prijs voor klassikale training ter plaatse: $29.871 voor maximaal 20 deelnemers = **~$1.494 per persoon** **[S, berekend op [H]-cijfers; als de klassen niet vol waren, ligt de prijs per feitelijke deelnemer hoger]**.

Merk op dat de trainers **niet dezelfde partijen zijn als de licentiewederverkopers**. Emerald Associates en Critical Business Analysis zijn gespecialiseerde project-controls-adviesbureaus, geen IT-distributeurs. Dat is een structureel kenmerk: **het licentiekanaal en het kenniskanaal zijn in dit vak gescheiden.**

### 2.7 Wat het kanaal in het VK vraagt — gepubliceerde G-Cloud-tarieven

De Britse rijksoverheid dwingt leveranciers op het G-Cloud-raamcontract hun tarieven **publiek en bindend** te publiceren. Dat is de rijkste open prijsbron die ik in dit onderzoek heb gevonden. Zoekopdracht "primavera" op https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/search?q=primavera gaf **87 treffers**; ik heb 60 unieke dienstpagina's opgehaald, waarvan er 59 succesvol laadden en **alle 59 een gepubliceerde prijs bevatten** **[H]**.

**Licentie- en abonnementstarieven (per gebruiker of licentie per maand, GBP):**

| Dienst | Leverancier | Gepubliceerde prijs |
|---|---|---|
| Oracle Primavera P6 EPPM | RPC UK Limited *(leverancier niet bevestigd)* | **£165 – £439** p/gebruiker/maand |
| Oracle Primavera P6 EPPM Cloud | Laminar Group Ltd *(niet bevestigd)* | £176 – £220 p/licentie/maand |
| Primavera P6 EPPM | **Hyde Park Solutions** *(bij verificatie vastgesteld)* | £168,75 p/gebruiker/maand ✔ |
| Oracle Primavera Cloud – Schedule, Resource and Risk Management | Hyde Park Solutions | £72 p/gebruiker/maand |
| Oracle Primavera Cloud (OPC) | ~~Hyde Park Solutions~~ → **Laminar Group Ltd** *(gecorrigeerd)* | **£8 – £176** p/licentie/maand ✔ |
| Oracle Primavera Unifier | — | £99 tot £107,42 – £584,82 p/gebruiker/maand |
| Oracle Primavera Aconex Cloud | — | £41 – £280 p/licentie/maand |
| Oracle Primavera and Aconex Cloud Services | — | £24,00 – £280,00 p/gebruiker/maand |
| Primavera P6 Progress Reporter | — | £18 p/gebruiker/maand |
| Oracle Primavera Cloud – Progress | — | £7,50 p/gebruiker/maand |
| Primavera EPPM Cloud Hosting Service | — | £80 – £90 p/gebruiker/maand |
| RPC Hosting (P6 EPPM hosting) | RPC UK Limited | £38 – £60 p/gebruiker/maand |
| Active Risk Manager | — | £19.258 per instantie per jaar |

**Consultancy- en implementatietarieven (per dag, GBP):**

| Dienst | Leverancier | Dagtarief |
|---|---|---|
| P6 Consultancy / P6 Planning / P6 Scheduling / P6 Reporting / P6 Support / EVM Consultancy (identiek geprijsd, 15+ diensten) | **i3Works Ltd** | **£385 – £1.210** |
| Configure Primavera P6 EPPM / Configure Oracle Primavera Cloud / Configure Primavera Unifier / Upgrade management | **Hyde Park Solutions** | £550 – £1.250 |
| Integration Services for Primavera Applications | Hyde Park Solutions | £650 – £1.250 |
| Support for Primavera Applications | Hyde Park Solutions | £425 (vast) |
| EPPM Primavera P6 Consulting, Service Management, Implementation, Hosting and Integration | TRC Companies Ltd | £400 – £1.400 |
| Project Controls | — | £440 – £1.350 |
| Project and Programme Planning & Scheduling | — | £350 – £1.150 |
| Scheduling and Planning | — | £250 – £1.400 |
| Planning, Cost, Change and Risk System Implementation | — | £192 – £2.800 |
| **Planning and Scheduling** | **BMT Limited** | **£845 – £2.360** |
| RPC Support, Consultancy and Training | RPC UK Limited | £1.500 (vast) |
| Cloud Enablement Services for Project, Contract and Facilities Management | Primo Milestone Ltd | £850 – £1.400 p/gebruiker/dag |

**Training (per persoon):**

| Dienst | Leverancier | Prijs |
|---|---|---|
| **Training for Primavera Applications (P6 EPPM, Oracle Primavera Cloud, Aconex, Unifier)** | **Hyde Park Solutions** | **£250 – £1.195 per persoon** |

Dit is het enige *gepubliceerde* trainingstarief van een Oracle-partner dat ik in dit onderzoek heb kunnen vaststellen, en daarmee een belangrijk ankerpunt.

> **Verificatie van deze twee tabellen (25-07-2026).** Vier prijspunten zijn direct op de dienstpagina's van de Digital Marketplace nagelopen en **letterlijk bevestigd**: Hyde Park "Training for Primavera Applications" *£250 to £1,195 a person*; Hyde Park "Primavera P6 EPPM" *£168.75 a user a month*; "Oracle Primavera Cloud (OPC)" *£8 to £176 a licence a month*; i3Works "Primavera P6 Consultancy" *£385 to £1,210 a unit a day*. Ook bevestigd: RPC Hosting *£38–£60 a user a month*, RPC Support/Consultancy/Training *£1,500 a unit a day*, TRC *£400–£1,400 a unit a day*, en het totaal van **87 zoektreffers**. **Twee leverancierstoeschrijvingen bleken fout of onbevestigd**: OPC £8–£176 is van **Laminar Group**, niet Hyde Park; en de regels "£165–£439 (RPC UK)" en "£176–£220 (Laminar)" stonden niet op de eerste resultaatpagina en konden niet worden teruggevonden. De prijzen zelf zijn niet in twijfel getrokken; de koppeling prijs↔leverancier is dat op die twee regels wél.

**Analyse [S]:** de spreiding is het opvallendst. Voor exact hetzelfde product (P6 EPPM) loopt de gepubliceerde prijs van £8 tot £439 per gebruiker per maand — een factor 55. Dat is geen prijsverschil maar een **bundelingsverschil**: het lage uiteinde is een kale licentiedoorverkoop, het hoge uiteinde bevat hosting, support, configuratie en beheer. Precies dit is wat de reseller in dit segment verkoopt: niet software maar het wegnemen van de last om software te bezitten. En het verklaart waarom de kanaalomzet bij Bentley en Eleco zo klein is — die leveranciers hebben hun eigen cloud, en dan valt de bestaansreden van de tussenhandel weg.

### 2.8 Zelfbediening als het echte "nieuwe kanaal"

Uit de jaarverslagen komt een duidelijk derde kanaal naar voren, dat noch direct-enterprise noch reseller is:

- **Bentley Systems** noemt "our **Virtuosity** inside sales colleagues and **e-store**" als onderdeel van de directe kanalen die 94 % van de omzet leveren **[H]**.
- **Eleco plc** meldt in het jaarverslag 2025: "expanding our **e-commerce solution**, starting with Asta, to make our software more accessible to all" **[H]**.
- **Autodesk** verwijst naar "our online Autodesk branded store" als groeiend direct kanaal en noemt de groei ervan expliciet als oorzaak van de kanaalverschuiving **[H]**.

**Interpretatie [S]:** de klassieke tweetrapsdistributie (leverancier → distributeur → reseller → klant) wordt niet vervangen door directe verkoop maar door **self-service e-commerce plus inside sales**. Dat is de goedkoopste bekende manier om de lange staart te bedienen, en het is precies de functie waarvoor het resellerkanaal ooit bestond. De marge die vroeger naar de VAR ging, gaat nu naar het webplatform.

---

## 3. De opleidings- en certificeringsmarkt

### 3.1 Certificering: veel kleiner dan iedereen aanneemt

De belangrijkste vondst van dit onderzoek op dit thema is het **AACE International 2025 Certification Progress Report**, dat AACE aan zijn accreditatie-instantie CESB (Council of Engineering and Scientific Specialty Boards) moet overleggen en publiceert. Dit is een accreditatiedocument, dus **[H]** van de beste soort.

Bron: https://web.aacei.org/docs/default-source/certification-documents/annual-reports/2025-certification-progress-report-for-website.pdf?sfvrsn=f4058d20_1

> "The Certification Program conducted **1,152 examinations** and certified **677 individuals** by December 31, 2025."

| Keurmerk | Registraties 2025 | Examens 2025 | Nieuw gecertificeerd 2025 | Hergecertificeerd 2025 | **Actief (cumulatief)** | Inactief | Emeritus |
|---|---|---|---|---|---|---|---|
| CCP (Certified Cost Professional) | 534 | 494 | 321 | 442 | 2.145 | 2.370 | 154 |
| **PSP (Planning & Scheduling Professional)** | **352** | **366** | **204** | **401** | **1.806** | **1.013** | **24** |
| CEP (Certified Estimating Professional) | 102 | 113 | 50 | 107 | 511 | 221 | 13 |
| EVP (Earned Value Professional) | 28 | 32 | 23 | 114 | 437 | 414 | 25 |
| CCT (Certified Cost Technician) | 79 | 70 | 41 | n.v.t. | 231 | 1.004 | n.v.t. |
| CST (Certified Scheduling Technician) | 53 | 53 | 31 | n.v.t. | 126 | 208 | n.v.t. |
| CFCC (Certified Forensic Claims Consultant) | 9 | 5 | 3 | 27 | 74 | 32 | 5 |
| PRMP (Project Risk Management Professional) | 16 | 17 | 2 | 7 | 36 | 0 | 0 |
| DRMP (Decision & Risk Management Professional) | 7 | 2 | 2 | 5 | 20 | 6 | 2 |
| **TOTAAL** | **1.180** | **1.152** | **677** | **1.103** | **5.386** | **5.268** | **223** |

**Dit is een opmerkelijk klein getal.** De volledige wereldwijde populatie planningsspecialisten met het toonaangevende vakinhoudelijke planningskeurmerk bedraagt **1.806 actieve PSP-certificaten**. [**Precisering na verificatie:** AACE telt in dit rapport *certificaten*, geen *personen*. Omdat een individu meerdere keurmerken kan houden — CCP én PSP is een gangbare combinatie — is het aantal onderscheiden personen achter de 5.386 actieve certificaten **lager**, mogelijk aanzienlijk. De formulering "5.386 actieve certificaathouders" elders in dit rapport moet worden gelezen als "5.386 actieve certificeringen".] Tel de scheduling-technicus (CST, 126) erbij en je komt op 1.932. Voor een beroepsgroep die wereldwijd projecten van honderden miljarden plant, is dat verwaarloosbaar.

Even opvallend: **5.268 inactieve certificaathouders tegenover 5.386 actieve** — bijna de helft van iedereen die ooit een AACE-certificaat haalde, laat het verlopen. Voor PSP: 1.013 inactief tegen 1.806 actief. Hercertificering (3 jaar, 12 CEU's) is kennelijk voor veel houders de moeite niet waard **[H, met [S]-interpretatie]**.

### 3.2 Certificeringstarieven

**AACE PSP** — bron: https://web.aacei.org/certification/certification-information/certifications-offered/professional-certifications/psp-details **[H]**

| Item | Bedrag |
|---|---|
| Examengeld leden | **US$ 525** |
| Examengeld niet-leden | **US$ 690** |
| Herkansing (leden en niet-leden) | US$ 260 |
| Geldigheid | 3 jaar |
| Hercertificering | 12 CEU's over minimaal twee categorieën, of opnieuw examen |

Toelatingseis: 8 jaar relevante werkervaring, of 4 jaar werkervaring plus een relevante vierjarige opleiding. Examen: maximaal 5 uur, 119 vragen verdeeld over Planning (36), Scheduling (83) en één memo-schrijfopdracht (Communication). Slagingsnorm 70 % gemiddeld over alle domeinen. Examens worden afgenomen via Kryterion Global Testing Solutions **[H]**.

**PMI-SP (PMI Scheduling Professional)** — **NIET GEVERIFIEERD.** `pmi.org` blokkeert geautomatiseerde toegang met HTTP 403 op alle beproefde paden (certificeringspagina, tarievenpagina, handboek-PDF, jaarverslag), evenals de badge-registratie op Credly. Ik heb **geen** PMI-SP-tarief of houdersaantal uit een primaire bron kunnen bevestigen en vul hier bewust niets in uit het geheugen. Dit is het grootste inhoudelijke gat in dit rapport. Zie §5.

### 3.3 De omvang van de certificerende organen zelf

Om de certificeringsmarkt te schalen heb ik de fiscale aangiften (IRS Form 990) van beide instellingen opgehaald via de ProPublica Nonprofit Explorer-API. Dat zijn wettelijk gedeponeerde documenten **[H]**.

**AACE International** (EIN 74-1675154, Fairmont, West Virginia; erkenningsdatum 1964) — https://projects.propublica.org/nonprofits/api/v2/organizations/741675154.json

| Boekjaar | Totale opbrengsten | Programma-opbrengsten | Totale lasten | Balanstotaal |
|---|---|---|---|---|
| 2023 | **$3.026.424** | $1.168.229 | $2.648.148 | $6.498.984 |
| 2022 | $2.637.342 | $889.072 | $2.199.067 | $5.540.781 |
| 2021 | $2.742.119 | $1.028.595 | $2.245.598 | $5.460.559 |
| 2020 | $2.605.227 | $1.005.124 | $2.265.016 | $4.567.235 |
| 2019 | $3.257.542 | $1.725.663 | $2.730.392 | $4.042.207 |

**Project Management Institute Inc.** (EIN 23-1887442, Newtown Square, Pennsylvania) — https://projects.propublica.org/nonprofits/api/v2/organizations/231887442.json

| Boekjaar | Totale opbrengsten | Programma-opbrengsten | Totale lasten | Balanstotaal |
|---|---|---|---|---|
| 2023 | **$391.998.745** | $352.620.939 | $360.990.793 | $689.388.130 |
| 2022 | $267.259.122 | $250.763.083 | $333.631.787 | $620.363.012 |
| 2021 | $329.593.353 | $269.777.360 | $282.247.961 | $708.097.733 |
| 2020 | $282.705.810 | $256.629.051 | $265.826.691 | $675.097.842 |

**Interpretatie [S]:** PMI is 130 keer zo groot als AACE. Maar PMI's omzet is vrijwel volledig PMP en lidmaatschap; PMI-SP is daarbinnen een marginaal product. Ik heb de programma-opbrengsten van PMI niet naar keurmerk kunnen uitsplitsen omdat het volledige Form 990 (Schedule) niet downloadbaar was (HTTP 403). Wat er wél uit volgt is de verhouding: **het vakinhoudelijke planningscertificaat (AACE PSP) leeft in een organisatie van $3 mln, het generieke projectmanagementcertificaat in een organisatie van $392 mln.** De markt beloont de brede, generieke credential; de diepe vakcredential is een niche.

**Eigen schatting van de directe PSP-certificeringsomzet [S]:** 352 registraties in 2025 × gemiddeld ~$570 (mix van ledentarief $525 en niet-ledentarief $690) ≈ **$200.000 per jaar wereldwijd**, plus 401 hercertificeringen tegen een onbekend administratietarief. Zelfs met een royale marge voor hercertificerings- en administratiekosten blijft de totale wereldwijde omzet uit PSP-certificering vrijwel zeker **onder de $0,5 mln per jaar**. Redenering: registratieaantal × gepubliceerd tarief, beide **[H]**; onzekerheid zit in de ledenmix en in eventuele aanvullende kosten. Dit is de zuiverste maat voor "de certificeringsmarkt voor planners" die ik kan construeren.

### 3.4 De opleidingsmarkt — wél substantieel

Hier keert de verhouding om. De trainingsmarkt is een veelvoud van de certificeringsmarkt.

**Het beste harde cijfer komt uit Eleco's jaarrekening.** Toelichting 1 (Revenue) splitst de omzet naar type, en definieert de dienstenpost expliciet als *"Services revenue (training and consultancy)"* **[H]**:

| Omzetsoort | FY2025 (£000) | aandeel | FY2024 (£000) | aandeel |
|---|---|---|---|---|
| Terugkerende omzet (SaaS, onderhoud, support, abonnementen, hosting) | 31.313 | **80,7 %** | 24.933 | 77,0 % |
| **Diensten (training en consultancy)** | **6.958** | **17,9 %** | **6.448** | **19,9 %** |
| Eeuwigdurende licenties | 545 | 1,4 % | 1.013 | 3,1 % |
| **Totaal** | **38.816** | 100 % | **32.394** | 100 % |

Drie observaties **[S, op [H]-cijfers]**:

1. **Training en consultancy zijn ~18 % van de omzet van een planningsleverancier.** Dat is een bruikbare vuistregel voor de hele categorie, al is het één waarneming.
2. **De dienstenpost groeit het traagst.** +7,9 % tegen +19,8 % groepsgroei. Diensten verwateren van 19,9 % naar 17,9 %. Oorzaak is vermoedelijk de overgang naar SaaS: hoe meer de software zelf configureert en hoe meer de leverancier host, hoe minder implementatiedagen er te verkopen zijn.
3. **Het eeuwigdurende licentiemodel is dood.** £545k op £38,8 mln. Dit is relevant voor het informele-licentievraagstuk: je kunt een eeuwigdurende licentie kraken, een SaaS-abonnement niet.

**Gepubliceerde trainingsprijzen — vergelijkingstabel** (alle **[H]** tenzij anders vermeld):

| Aanbieder | Product | Prijs | Vorm | Bron |
|---|---|---|---|---|
| Plan Academy | Primavera P6 Professional Foundations (v23) | **US$ 1.049** *(pagina toont "From US$ 1049.00" — instapprijs)* | zelfstudie online, eenmalig | https://www.planacademy.com/courses/ |
| Plan Academy | Advanced P6 Planning Construction Projects (v23) | US$ 897 | zelfstudie online | idem |
| Plan Academy | Advanced P6 Progressing with Earned Value (v23) | US$ 897 | zelfstudie online | idem |
| Plan Academy | Forensic Schedule Delay Analysis | US$ 1.049 | live | idem |
| Plan Academy | Construction Planning & Scheduling (dr. Saleh Mubarak) | US$ 497 | zelfstudie | idem |
| Plan Academy | Scheduling 101: Essential CPM Theory | US$ 97 | zelfstudie | idem |
| Plan Academy | Microsoft Project for Engineering and Construction | US$ 697 | zelfstudie | idem |
| Hyde Park Solutions | Training for Primavera Applications | **£250 – £1.195 per persoon** | via G-Cloud | Digital Marketplace |
| Critical Business Analysis | P6 Fundamentals, klassikaal ter plaatse (USCG, 2019) | $29.871 voor max. 20 pers ≈ **$1.494 p.p.** **[S]** | klassikaal in-house | USAspending |
| Emerald Associates | "2025 Primavera P6 training" (DoD) | $49.350 (omvang onbekend) | onbekend | USAspending |
| **Eleco / Asta Powerproject** | Core Skills L1, L2, Housebuilders L1+2, General Construction L1+2, Managing Costs and Resources (1–2 dagen) | **prijs niet gepubliceerd** — "Speak to our sales team" | klassikaal, online, in-house; CPD-geaccrediteerd | https://eleco.com/training/ |
| **Oracle University** | Primavera P6, P6 Professional, Unifier Administration | **betaald, prijs niet gepubliceerd** | digitaal via Oracle MyLearn | https://www.oracle.com/education/training/construction/ |
| **Oracle University** | Primavera Cloud Schedule/Portfolio Management, Aconex Complete, Textura, Construction Intelligence | **gratis** | digitaal via Oracle MyLearn | idem |

**Twee bevindingen die uit deze tabel springen [S]:**

**(a) Oracle geeft de cloudtraining weg en laat de P6-training betaald.** Dat is geen toeval: gratis training op Primavera Cloud is een migratie-instrument voor klanten die van het oude P6 af moeten. Het bevestigt de richting die ook op de productpagina staat (Primavera Cloud als "recommended migration path" **[H]**). Voor de opleidingsmarkt betekent het dat de leverancier zelf de bodem uit het prijsniveau voor het nieuwe product haalt, terwijl het derdenaanbod nog vrijwel volledig op het oude product zit.

**(b) De prijsspreiding tussen zelfstudie en klassikaal is een factor 1,5 tot 15.** Zelfstudie: $97–$1.049. Klassikaal in-house: ~$1.494 per persoon. Hyde Park's bandbreedte (£250–£1.195) overspant beide. De marktstructuur is daarmee helder gelaagd: een goedkope online laag (Plan Academy en vergelijkbare aanbieders), een dure klassikale laag (partners en adviesbureaus), en een gratis leverancierslaag voor strategische producten.

### 3.5 Eigen schatting van de omvang van de opleidingsmarkt

Er bestaat geen betrouwbare openbare schatting van de wereldwijde omzet aan planningssoftwaretraining. Ik construeer er één van onderaf en markeer hem nadrukkelijk als **[S]**.

*Methode.* Ik gebruik twee onafhankelijke benaderingen en kijk of ze in dezelfde orde uitkomen.

**Benadering A — via de leveranciersverhouding.** Eleco toont dat training plus consultancy ~18 % van de leveranciersomzet is **[H]**. Als die verhouding ruwweg geldt voor de bredere categorie planningssoftware, dan is de trainings-en-consultancymarkt ~22 % van de licentiemarkt (18/82). Daarbinnen is training een minderheid van de consultancy — Eleco splitst het niet, maar op basis van de G-Cloud-tarieven (consultancy £385–£2.360 per dag, training £250–£1.195 per persoon) en het feit dat implementatietrajecten vele malen meer dagen vragen dan opleidingen, schat ik training op **20–35 % van de dienstenpost**. Dat geeft training op **3,5–6,5 % van de leveranciersomzet**.

**Benadering B — via de derdenmarkt.** De onafhankelijke opleiders (Plan Academy, Emerald Associates, regionale opleiders) zitten grotendeels buiten de leveranciersomzet. Hun omvang is niet publiek. Ik heb geen basis om die betrouwbaar te schatten en laat dat expliciet open.

*Uitkomst.* Ik durf één ding met redelijke zekerheid te zeggen: **de trainingsmarkt rond planningssoftware is grofweg een orde van grootte groter dan de certificeringsmarkt, en grofweg een orde van grootte kleiner dan de licentiemarkt** **[S]**. Een preciezer getal zou ik moeten fabriceren, en dat doe ik niet. De harde ankers die deze uitspraak dragen: PSP-certificering ≈ $0,2 mln/jaar wereldwijd **[S op [H]]**; AACE als geheel $3,0 mln **[H]**; Eleco's diensten £6,96 mln bij één middelgrote leverancier **[H]**.

*Waarom analistencijfers hier onbruikbaar zijn* **[S]**: rapporten over de "project management training market" mengen PMP-bootcamps, Agile-certificering, generieke bedrijfstrainingen en softwaretraining door elkaar en komen daardoor op miljardenbedragen uit die niets zeggen over planningssoftware specifiek. Ik heb ze in dit onderzoek sowieso niet kunnen raadplegen, maar ook met toegang zou ik ze niet als hard cijfer hebben opgevoerd.

---

## 4. Gekraakte en informele licenties in opkomende markten

### 4.1 Wat de primaire bronnen zeggen

De sterkste beschikbare primaire bron is het **USTR Special 301 Report 2025**, het jaarlijkse wettelijke overzicht van de Amerikaanse handelsvertegenwoordiger over intellectuele-eigendomsbescherming bij handelspartners. Bron: https://ustr.gov/sites/default/files/files/Issue_Areas/Enforcement/2025%20Special%20301%20Report%20(final).pdf **[H]**

**Landenlijsten 2025** **[H]**:

| Priority Watch List | Watch List |
|---|---|
| Argentinië, Chili, China, **India**, **Indonesië**, Mexico, Rusland, Venezuela | Algerije, Barbados, Belarus, Bolivia, **Brazilië**, Bulgarije, Canada, Colombia, Ecuador, **Egypte**, Guatemala, Pakistan, Paraguay, Peru, **Thailand**, Trinidad en Tobago, Türkiye, **Vietnam** |

Alle vier de door de opdracht genoemde regio's zijn dus vertegenwoordigd: India en Indonesië op de zwaarste lijst; Egypte, Thailand, Vietnam en Brazilië op de tweede.

**Het enige kwantitatieve cijfer in het rapport** (sectie "Government Use of Unlicensed Software", p. 34) **[H]**:

> "According to a 2018 study, the commercial value of unlicensed software globally was at least **$46 billion in 2018**."
> — met voetnoot 36: "BSA, 2018 Global Software Survey at 12 (Jun. 2018), https://gss.bsa.org."

**Bronkritiek [belangrijk]:** dit is een USTR-citaat van een BSA-cijfer. De BSA (Business Software Alliance) is de brancheorganisatie van softwareleveranciers; haar "commerciële waarde van ongelicentieerde software" is per definitie een berekening van *wat het gekost zou hebben als iedereen betaald had tegen lijstprijs*, wat geen gederfde omzet is. Bovendien is de studie uit **2018 en nooit geactualiseerd** — de BSA heeft sindsdien geen Global Software Survey meer uitgebracht. Dat een Amerikaans overheidsdocument in 2025 nog een acht jaar oud brancheorganisatiecijfer moet citeren, zegt genoeg over de staat van de data. Ik classificeer dit als **[M]** in oorsprong, met **[H]** voor het feit dat de USTR het citeert. Ik heb de BSA-studie zelf niet kunnen inzien: zowel `bsa.org` als `gss.bsa.org` als de archiefkopie op `web.archive.org` weigerden toegang.

**Kwalitatieve landspecifieke vaststellingen** **[H]**:

- *Landen waar overheidsgebruik van ongelicentieerde software een aanhoudend punt is:* "Argentina, China, Ecuador, Guatemala, **Indonesia**, Moldova, **Pakistan**, Paraguay, Romania, Turkmenistan, Uzbekistan, Venezuela, and **Vietnam**."
- *Indonesië:* "Unauthorized camcording and **unlicensed use of software remain problematic**."
- *Thailand:* "Other U.S. concerns include **continued use of unlicensed software in the private sector**, lengthy civil IP enforcement proceedings, and low civil damages."
- *Venezuela:* "online piracy […] as well as unauthorized camcording and **widespread use of unlicensed software**."
- *Guatemala:* "Some limited progress occurred in 2024 regarding a **moderate decline in government use of unlicensed software**."
- *India* wordt beschreven als "one of the world's most challenging major economies with respect to protection and enforcement of IP", maar de Indiase paragraaf gaat overwegend over octrooien en farmacie, **niet** specifiek over software.

**Een tweede primaire bevestiging:** Autodesk noemt in het 10-K FY2026 "**software piracy**" expliciet als een van de risico's verbonden aan internationale activiteiten, naast "greater difficulty in protecting intellectual property" **[H]**. Dat is een gecontroleerde risicoparagraaf, geen persbericht.

### 4.2 Waarom informele licenties in dit segment structureel zijn: de rekensom

Hier lever ik mijn eigen analyse, en ik markeer hem als zodanig.

Oracle prijst Primavera wereldwijd in Amerikaanse dollars. De *Oracle Fusion Cloud Service Global Price List* — de dichtstbijzijnde publieke prijslijst die Oracle wél uitgeeft — voert prijzen uitsluitend als "Prices in USA (Dollar)" en verwijst voor andere valuta naar "the equivalent amount in local currency stated in the order" **[H]**. Er is dus **omrekening, geen koopkrachtcorrectie**.

Zet de vastgestelde prijzen af tegen het BBP per hoofd van de bevolking (World Bank, indicator NY.GDP.PCAP.CD, jaar 2024, lopende US$ — https://api.worldbank.org/v2/country/all/indicator/NY.GDP.PCAP.CD?format=json&date=2024) **[H]**, en gebruik als prijsankers:

- **P6-zetel: $3.879,60** (licentie + 1 jaar support; DOE/Affigent, 15-09-2025) **[H]**
- **AACE PSP-examen: $690** (niet-ledentarief) **[H]**
- **P6-cursus: $1.049** (Plan Academy Foundations) **[H]**

| Land | BBP p.h. 2024 (US$) | P6-zetel als % BBP p.h. | PSP-examen als % | P6-cursus als % |
|---|---|---|---|---|
| Verenigde Staten | 86.170 | **4,5 %** | 0,80 % | 1,22 % |
| Verenigd Koninkrijk | 53.341 | 7,3 % | 1,29 % | 1,97 % |
| Mexico | 13.988 | 27,7 % | 4,93 % | 7,50 % |
| Argentinië | 13.970 | 27,8 % | 4,94 % | 7,51 % |
| Brazilië | 10.311 | 37,6 % | 6,69 % | 10,17 % |
| Thailand | 7.387 | 52,5 % | 9,34 % | 14,20 % |
| Zuid-Afrika | 6.267 | 61,9 % | 11,01 % | 16,74 % |
| Indonesië | 4.925 | 78,8 % | 14,01 % | 21,30 % |
| Vietnam | 4.717 | 82,3 % | 14,63 % | 22,24 % |
| Filipijnen | 3.985 | 97,4 % | 17,31 % | 26,32 % |
| **Egypte** | 3.338 | **116,2 %** | 20,67 % | 31,43 % |
| **India** | 2.592 | **149,7 %** | 26,62 % | 40,47 % |
| Nigeria | 1.084 | 357,9 % | 63,65 % | 96,77 % |

*Alle percentages zijn* **[S]** *— eigen berekening; de invoergegevens (prijzen en BBP-cijfers) zijn* **[H]**.

**De relatieve prijs van één P6-zetel ligt in India 33,2 keer hoger dan in de Verenigde Staten** **[S]**.

**Kanttekening bij deze methode [belangrijk voor eerlijke lezing]:** BBP per hoofd is een grove proxy voor de betalingsbereidheid van een bedrijf. Een Indiase grote aannemer of een EPC-contractor die voor Aramco werkt, heeft een dollar-inkomstenstroom en kan de lijstprijs prima betalen — en betaalt die ook. De vergelijking is representatief voor de **middelgrote lokale aannemer, het ingenieursbureau en de individuele planner**, niet voor de top van de markt. Een zuiverdere maat zou het salaris van een planner per land zijn; ik heb daar in deze sessie geen citeerbare bron voor kunnen vinden en heb dus bewust de ruwere maar volledig traceerbare BBP-proxy gebruikt.

### 4.3 Wat dit doet met de reële marktomvang

Hier is mijn analytische kernstelling **[S]**, opgebouwd uit de bevindingen hierboven.

**Stelling 1: het gat tussen gebruik en betaling is groot, maar het is grotendeels géén gemiste omzet.**
De BSA-methodiek waardeert ongelicentieerd gebruik tegen lijstprijs. Bij een relatieve prijs van 150 % van het BBP per hoofd is dat economisch onzinnig: die gebruikers zouden bij volledige handhaving niet betalen, ze zouden **substitueren** — naar Microsoft Project, naar Excel, naar een lokaal alternatief, of naar niets. Elke marktomvangschatting die de installed base als latente omzet behandelt, overschat de reële markt fors.

**Stelling 2: de informele markt verschuift waarde van licenties naar training en credentials.**
Dit is naar mijn oordeel het belangrijkste inzicht van dit themarapport. Software is kopieerbaar; kennis en een geverifieerd diploma zijn dat niet. Een planner in Caïro of Chennai die met een informele P6-installatie werkt, heeft *nog steeds* een probleem: hij moet aan een werkgever of een opdrachtgever bewijzen dat hij het instrument beheerst. Daarvoor bestaat geen kraak. Het gevolg is dat in precies de markten waar het licentiekanaal het dunst is, de **opleidings- en certificeringsmarkt relatief het sterkst** is.

*Bewijskracht:* dit is een redenering, geen meting. Ik heb hem **niet** kunnen staven met geografische data over PSP-houders (het AACE-voortgangsrapport bevat geen landenuitsplitsing) en evenmin met regionale opleidersdata (geen websearch beschikbaar). Ik voer hem op als **[S] met expliciet gemarkeerde onzekerheid** en beveel aan hem in vervolgonderzoek te toetsen. De ondersteunende waarnemingen die ik wél heb: (a) certificering wordt betaald door individuen, niet door bedrijven, en is dus ongevoelig voor bedrijfsbudgetten; (b) de PSP-toelatingseis van 8 jaar ervaring maakt het een carrière-instrument; (c) de scheiding tussen licentiekanaal en kenniskanaal in de federale data (§2.6, bevinding 3) laat zien dat die twee markten structureel losgekoppeld zijn.

**Stelling 3: SaaS sluit het gat, en dat is een grotere verschuiving dan handhaving ooit was.**
Eleco's eeuwigdurende licentieomzet is gedaald naar £545k, 1,4 % van de omzet **[H]**. Bentley zit op 92 % abonnementsomzet (nagerekend: $1.376.696k van $1.501.779k = **91,7 %** in 2025) **[H]**. Nemetschek op 95 % terugkerende omzet — [**gecorrigeerd:** dat is een **Q1-2026**-cijfer uit de factsheet van juli 2026 ("Recurring revenues in total: 95%" bij "Revenues by Type (Q1-26)"), geen boekjaar-2025-cijfer] **[H]**. Een abonnement met servergebonden authenticatie is niet informeel te gebruiken. **De sector heeft het piraterijprobleem opgelost door het bedrijfsmodel te veranderen, niet door te handhaven.** Het gevolg voor opkomende markten is echter niet dat die gebruikers gaan betalen — het is dat zij **uit het product vallen**. Dat is een reëel en onderbelicht risico voor de gevestigde leveranciers en, zoals ik in §6 uitwerk, de belangrijkste opening voor een open-source alternatief in tien jaar.

### 4.4 Wat ik hierover níet heb kunnen vaststellen

Volledigheidshalve, want dit is de zwakste sectie van het rapport:

- **Geen actuele piraterijpercentages per land.** De BSA-cijfers stoppen bij 2018 en ik kon het rapport zelf niet inzien.
- **Geen regionale prijsstelling van Oracle/Elecosoft.** Ik heb niet kunnen vaststellen of Oracle regionale kortingen hanteert voor India of Egypte. Als die substantieel zijn, verzwakt de rekensom in §4.2.
- **Geen veldmateriaal** uit India, Egypte, Zuidoost-Azië of Latijns-Amerika: geen lokale opleidersprijzen, geen lokale aanbestedingen, geen vakpers in de regio.
- **Geen data over de omvang van de informele markt in planningssoftware specifiek** — alle beschikbare cijfers zijn softwarebreed.

---

## 5. Expliciete onzekerheden en gaten

| # | Onzekerheid | Ernst | Toelichting |
|---|---|---|---|
| 1 | **Geen enkele websearch uitgevoerd** | **Hoog** | Zoekbudget van de sessie was uitgeput. Geen analistenrapporten, geen vakpers, geen regionale bronnen. Het rapport is daardoor smal in bronsoorten maar hard in bronkwaliteit. |
| 2 | **PMI volledig ontoegankelijk (HTTP 403)** | **Hoog** | Geen PMI-SP-tarief, geen houdersaantal, geen uitsplitsing van PMI's $392 mln naar keurmerk. Ik heb bewust niets uit het geheugen ingevuld. Dit is het grootste inhoudelijke gat. |
| 3 | **BSA Global Software Survey niet inzichtelijk; laatste editie 2018** | **Hoog** | Het $46 mld-cijfer komt via een USTR-citaat. Het is een brancheorganisatiecijfer op lijstprijsbasis en acht jaar oud. Niet als hard cijfer te behandelen. |
| 4 | Kanaalmix gebaseerd op drie leveranciers | Middel | Eleco, Bentley en Autodesk publiceren als enigen. Nemetschek, Trimble en Procore doen dat niet. De conclusie "het kanaal krimpt" rust op drie waarnemingen die wel alle drie dezelfde kant op wijzen. |
| 5 | Federale eenheidsprijzen komen van één koper | Middel | Beide zetelprijzen ($3.880 en $4.046) zijn van het Department of Energy in dezelfde maand. Ze bevestigen elkaar maar zijn niet onafhankelijk. Amerikaanse overheidsprijzen wijken bovendien af van commerciële prijzen. |
| 6 | G-Cloud-tarieven zijn plafondtarieven | Middel | Gepubliceerde raamtarieven zijn maxima; werkelijke afroepen liggen doorgaans lager. Ook zijn ze uitsluitend Brits en publiek-sectorspecifiek. |
| 7 | BBP per hoofd als proxy voor betalingsbereidheid | Middel | Zie de kanttekening in §4.2. Overschat de onbetaalbaarheid voor grote exportgerichte aannemers, onderschat die voor zelfstandige planners. |
| 8 | Trainingsmarktomvang niet gekwantificeerd | Middel | Ik geef bewust alleen een orde-van-grootte-uitspraak. Een preciezer getal zou fabricage zijn. |
| 9 | Stelling "informele licenties verschuiven waarde naar training" is ongetoetst | Middel | Plausibele redenering met indirecte steun, geen meting. Zie §4.3, stelling 2. |
| 10 | AACE-cijfers zijn zelfgerapporteerd | Laag | Wel aan een accreditatie-instantie (CESB) overlegd, wat de betrouwbaarheid sterk verhoogt, maar niet accountantsgecontroleerd. |
| 11 | Correspondentie Eleco reseller ↔ Rest of World | Laag | Suggestief, niet bewezen; Eleco publiceert geen kruistabel. Als zodanig gemarkeerd. |
| 12 | Trefwoordruis in USAspending | Laag | "Primavera" is een gewoon Spaans woord; minstens één irrelevante post in de top-100. De genoemde wederverkopers en bedragen zijn wel geverifieerd op contractomschrijving. |

---

## 6. Betekenis voor een open-source, IFC-gebaseerde planner (Open Planner Studio)

Deze sectie vertaalt het bovenstaande naar de positie van Open Planner Studio: een LGPL-3.0 desktop- en browsertoepassing waarin IFC 4.3 het native bestandsformaat is, met CPM-planning, een canvas-Gantt en een extensiesysteem.

### 6.1 Het goede nieuws: er is geen kanaal om doorheen te breken

De klassieke reden waarom nieuwkomers in enterprise-software stranden — de gevestigde partij bezit het distributiekanaal — **geldt hier niet**. De data zijn ondubbelzinnig: Bentley 6 % indirect en dalend, Eleco 3,4 % en dalend, Autodesk's grootste distributeur van 39 % naar 14 % in twee jaar **[H]**. Er is geen dicht VAR-netwerk dat de toegang tot de klant bewaakt. De concurrenten verkopen zelf, via inside sales en webwinkels — precies de kanalen waarin een gratis product structureel in het voordeel is, omdat de acquisitiekosten die zij moeten terugverdienen bij OPS wegvallen.

**Implicatie:** investeer geen tijd in het opzetten van een resellernetwerk. Dat is de vorige oorlog. De gevestigde partijen zijn er zelf uit aan het stappen.

### 6.2 Waar het kanaal wél nog leeft, is precies waar OPS het sterkst staat

Twee segmenten houden het indirecte kanaal in stand, en beide zijn kansrijk:

**(a) Overheidsaanbestedingen.** De Amerikaanse federale data laten zien dat overheden *uitsluitend* via wederverkopers kopen **[H]**; de Britse G-Cloud-catalogus telt 87 Primavera-gerelateerde diensten van minstens zeven leveranciers **[H]**. Dat is geen technologische maar een **procedurele** barrière: overheden kopen via raamcontracten omdat hun inkoopregels dat voorschrijven.

Voor OPS is dit een uitnodiging, geen obstakel. Een gratis product heeft geen licentiecontract nodig, maar wél een pad naar de aanbestedingsdocumenten. Twee concrete hefbomen:
- **IFC 4.3 is een ISO-norm (ISO 16739-1) en staat in toenemende mate in Europese aanbestedingseisen.** [**Niet geverifieerd:** `iso.org`, `buildingsmart.org` en `technical.buildingsmart.org` gaven alle HTTP 403 en `nen.nl` een 404. Ik heb de normtekst noch de ISO-catalogusvermelding kunnen inzien en kan dus niet bevestigen dat ISO 16739-1 in zijn huidige editie IFC **4.3** dekt (eerdere edities dekten IFC4). Ook de bewering "staat in toenemende mate in Europese aanbestedingseisen" is nergens op een concrete aanbestedingstekst gestaafd — behandel beide als onbevestigd.] OPS is de enige planner die IFC als *native* formaat gebruikt in plaats van als import-/exportkoppeling. [**Onverifieerbaar:** dit is een universele claim over alle planningssoftware ter wereld; er is geen bron die haar kan dragen. Zwak formuleren.] Waar een aanbesteding "openBIM" of "IFC-conforme leveringsspecificatie" eist, is dat een structureel voordeel dat geen enkele reseller kan wegconcurreren.
- **De partners op G-Cloud verkopen diensten, geen software.** i3Works verkoopt P6-consultancy voor £385–£1.210 per dag; Hyde Park verkoopt configuratie voor £550–£1.250 per dag **[H]**. Die bedrijven zijn productneutraal in hun verdienmodel. Een partner die OPS ondersteunt, verliest niets — hij verliest alleen de doorverkoopmarge op licenties, en die is bij Oracle toch al dun. **Dit is de meest realistische partnerroute: niet resellers werven, maar bestaande project-controls-adviesbureaus een tweede product geven waarop zij dagen kunnen factureren zonder licentiekosten door te belasten.**

**(b) Opkomende markten.** Autodesk zegt letterlijk dat het indirecte kanaal blijft bestaan "particularly in emerging regions" **[H]**. Dat betekent: in India, Egypte, Zuidoost-Azië en Latijns-Amerika hebben de gevestigde partijen *geen eigen verkooporganisatie*. Zij worden vertegenwoordigd door dunne partnernetwerken die weinig te verdedigen hebben. Combineer dat met de rekensom uit §4.2 — een P6-zetel kost 150 % van het BBP per hoofd in India **[S]** — en het beeld is duidelijk: **dit zijn markten waar de gevestigde partij noch aanwezig is, noch betaalbaar.**

### 6.3 De SaaS-verschuiving creëert een vluchtelingenstroom

Dit is naar mijn oordeel de belangrijkste strategische bevinding voor OPS.

De hele sector is overgestapt op abonnementen: Eleco 80,7 % terugkerend met nog maar £545k eeuwigdurende licenties, Bentley 92 % abonnementen, Nemetschek 95 % terugkerend **[H]**. Zoals ik in §4.3 betoogde, lost dat het informele-licentieprobleem op — niet door die gebruikers te laten betalen, maar door ze **buiten te sluiten**. Een eeuwigdurende licentie uit 2015 blijft draaien; een abonnement niet.

Er ontstaat dus een cohort van gebruikers dat de facto van het gereedschap wordt afgesneden: middelgrote aannemers en zelfstandige planners in prijsgevoelige markten, die de software kennen, de methodiek beheersen, en geen betaalbaar pad vooruit hebben. Dat is de meest natuurlijke doelgroep die een open-source planner zich kan wensen, en de omvang ervan groeit elk jaar dat de abonnementsconversie vordert.

**Implicatie voor de roadmap:** de kritische functionaliteit is niet feature-pariteit met P6, maar **migratie en interoperabiliteit**. Concreet: robuuste import van XER- en P6-XML-bestanden, en MS Project-uitwisseling. De GitHub-verkenning laat zien hoe dun dat terrein is — al is het minder leeg dan hier oorspronkelijk beweerd.

> **Gecorrigeerd na verificatie (GitHub Search API, 25-07-2026).** De oorspronkelijke tekst luidde: "de best gewaardeerde open XER-tool op GitHub heeft **39 sterren** (`djouallah/xer-reader`, een Excel-VBA-macro), gevolgd door `JaiLaff/XER-Splitter` met 32 en `jjCode01/js_xer_analyzer` met 11." Dat is **onjuist**: de zoekopdracht was te smal. De werkelijke rangorde naar sterren is:
>
> | Sterren | Repository | Aard |
> |---|---|---|
> | **66** | `HassanEmam/PyP6Xer` | Python XER-parserbibliotheek |
> | **36** | `jjCode01/xerparser` | Python XER-parser |
> | 39 | `djouallah/xer-reader` | Excel-VBA-macro |
> | 32 | `JaiLaff/XER-Splitter` | XER-splitter |
> | 21 | `jjCode01/xer-reader` | Python tabel-lezer |
> | 12 | `paulieb89/pyp6xer-mcp` | MCP-server op PyP6Xer |
> | 11 | `jjCode01/js_xer_analyzer` | XER-vergelijker |
>
> Er bestaan dus **wel** twee onderhouden Python-parserbibliotheken met een gebruikersbasis, en er is bovendien afgeleide activiteit (MCP-servers, PowerBI-connectors, `osama-ata/Alt-Ctrl-Proj` als fork van PyP6Xer). De aangepaste conclusie: het ecosysteem is **dun en versnipperd, maar niet afwezig** — en voor OPS betekent dat vooral dat XER-import niet from scratch hoeft (PyP6Xer is een bruikbare referentie-implementatie voor het formaat), niet dat het terrein onbezet is **[H]**.

### 6.4 De echte slagboom is legitimiteit, niet distributie

Als het kanaal geen barrière is en de prijs een voordeel, wat houdt adoptie dan tegen? Op basis van dit onderzoek: **institutionele legitimiteit**. In dit vak wordt vertrouwen niet aan het product ontleend maar aan drie externe systemen:

1. **Certificering van de persoon.** AACE PSP: 1.806 actieve houders wereldwijd **[H]**. Klein, maar het is de erkende maatstaf.
2. **Contractuele en forensische aanvaardbaarheid.** Planningen zijn juridische documenten. Bij claims en vertragingsanalyses moet het schema standhouden; AACE's Recommended Practices (o.a. RP 29R-03 voor forensische vertragingsanalyse) zijn daarbij het referentiekader. [**Onzeker:** de AACE-RP-bibliotheek zit achter een ledenlogin (`web.aacei.org/docs/default-source/rps/29r-03.pdf` leidt om naar SAML-authenticatie; de RP-overzichtspagina's gaven 404). Nummer én titel van 29R-03 zijn **niet uit de primaire bron bevestigd**.] Een planner die niet reproduceerbaar de standaard CPM-conventies volgt, is in een geschil waardeloos.
3. **Aanbestedingsconformiteit.** Zie §6.2.

Twee aanbevelingen die hieruit volgen:

**(a) Behandel CPM-correctheid als een compliance-eigenschap, niet als een feature.** Het repository heeft al een datagestuurde regressiesuite van 395 gevallen over 21 batterijen (`tests/planning/`) die de echte store met `CPMSolver` en `CalendarEngine` headless draait. **Dat is een strategisch bezit en het wordt onderbenut.** Overweeg de suite en de uitkomsten publiek te documenteren als een *verifieerbare conformiteitsverklaring*: welke CPM-conventies worden gevolgd, hoe worden kalenders, kortingen (lags), beperkingen en float-berekening afgehandeld, en welke gevallen zijn getoetst. Geen enkele commerciële leverancier publiceert zoiets — Oracle publiceert niet eens een prijs. Voor een product zonder verkoopteam is een publiek toetsbare correctheidsclaim de goedkoopste vorm van legitimiteit die er bestaat, en de enige die een gratis product geloofwaardiger maakt dan een betaald product in plaats van minder.

**(b) De opleidingsmarkt is de aangewezen route naar adoptie, niet de licentiemarkt.** De cijfers ondersteunen dat: training en consultancy zijn ~18 % van de omzet van een planningsleverancier **[H]**, de onafhankelijke opleiders zijn productgebonden maar niet leveranciergebonden, en Oracle heeft zelf de bodem uit de prijs van cloudtraining gehaald door die gratis te maken **[H]**. Een cursus "CPM-planning" die met OPS werkt in plaats van met P6, is voor een opleider goedkoper te geven (geen licenties voor cursisten, geen labomgeving) en voor cursisten toegankelijker. In markten waar een cursus 40 % van het BBP per hoofd kost **[S]**, is het wegvallen van de licentiedrempel het verschil tussen wel en geen cursus. **Dit is de hefboom: word het gereedschap waarop mensen het vak leren, en het licentievraagstuk lost zichzelf over een generatie op.**

### 6.5 Wat OPS níet moet doen

Drie waarschuwingen die uit de data volgen:

1. **Geen resellernetwerk opzetten.** De marge op doorverkoop is bij een gratis product nul, en de gevestigde partijen bewijzen dat het model ook mét marge niet meer werkt.
2. **Niet mikken op de enterprise-top.** Bentley's grootste klant is nooit meer dan 2 % van de omzet **[H]** — de markt is gefragmenteerd — maar de grote EPC-contractors zitten vast in geïntegreerde Oracle- en Bentley-landschappen met kosten-, contract- en documentbeheer eraan gekoppeld. Dat is geen planningsvraagstuk maar een portfoliovraagstuk, en dat is niet te winnen met één planner.
3. **De trainingsmarkt niet zelf willen exploiteren.** AACE — het toonaangevende certificerende orgaan van het hele vakgebied — draait $3,0 mln per jaar **[H]**. Er is in certificering geen geld te verdienen dat de moeite waard is. De waarde van de opleidingsmarkt voor OPS ligt in **distributie**, niet in omzet.

---

## Bronnenlijst

Alle bronnen geraadpleegd op 25 juli 2026.

**Jaarrekeningen en SEC-deponeringen**
1. Eleco plc, *Annual Report and Accounts 2025* — https://ir.eleco.com/wp-content/uploads/2026/05/5770_Eleco-plc-Annual-Report-2025_Hyperlink.pdf
2. Autodesk Inc., Form 10-K FY2026 (ingediend 03-03-2026) — https://www.sec.gov/Archives/edgar/data/769397/000076939726000015/adsk-20260131.htm
3. Bentley Systems Inc., Form 10-K FY2025 (ingediend 26-02-2026) — https://www.sec.gov/Archives/edgar/data/0001031308/000103130826000007/bsy-20251231.htm
4. Trimble Inc., Form 10-K FY2025 (ingediend 25-02-2026) — https://www.sec.gov/Archives/edgar/data/0000864749/000086474926000015/trmb-20260102.htm
5. Procore Technologies Inc., Form 10-K FY2025 (ingediend 24-02-2026) — https://www.sec.gov/Archives/edgar/data/0001611052/000162828026011055/pcor-20251231.htm
6. Nemetschek SE, *Annual Report 2025* — https://ir.nemetschek.com/media/document/b26659fa-1299-4d6b-a2e8-d293ab7b3a66/assets/DE0006452907-JA-2025-EQ-E-00.pdf
7. Nemetschek SE, *Factsheet* juli 2026 — https://ir-api.eqs.com/media/document/1367d036-3e52-4ee1-a14a-cfe4600cc34e/assets/202607_Factsheet_NEM.pdf

**Prijslijsten en leverancierspagina's**
8. Oracle, *Fusion Cloud Service Global Price List*, 16 juli 2026 — https://www.oracle.com/a/ocom/docs/corporate/pricing/oracle-fusion-cloud-global-price-list.pdf
9. Oracle, index van gepubliceerde prijslijsten — https://www.oracle.com/us/corporate/pricing/price-lists/index.html
10. Oracle, Primavera P6 EPPM productpagina — https://www.oracle.com/construction-engineering/primavera-p6/
11. Oracle University, Construction and Engineering training — https://www.oracle.com/education/training/construction/
12. Eleco, trainingsaanbod Asta Powerproject — https://eleco.com/training/
13. Plan Academy, cursusoverzicht en prijzen — https://www.planacademy.com/courses/

**Normen, certificering en accreditatie**
14. AACE International, certificeringsoverzicht — https://web.aacei.org/certification
15. AACE International, PSP-details en tarieven — https://web.aacei.org/certification/certification-information/certifications-offered/professional-certifications/psp-details
16. AACE International, *2025 Certification Progress Report* (aan CESB) — https://web.aacei.org/docs/default-source/certification-documents/annual-reports/2025-certification-progress-report-for-website.pdf?sfvrsn=f4058d20_1

**Overheidsdocumenten en transactiedata**
17. USTR, *2025 Special 301 Report* — https://ustr.gov/sites/default/files/files/Issue_Areas/Enforcement/2025%20Special%20301%20Report%20(final).pdf
18. USTR, Special 301-overzichtspagina — https://ustr.gov/issue-areas/intellectual-property/Special-301
19. USAspending.gov API, contractzoekopdrachten op "Primavera", "Primavera P6", "Primavera P6 training", "Primavera P6 licenses" — https://api.usaspending.gov/api/v2/search/spending_by_award/
20. UK Crown Commercial Service, Digital Marketplace / G-Cloud, zoekopdracht "primavera" (87 treffers; 59 dienstpagina's met gepubliceerde prijzen opgehaald) — https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/search?q=primavera

**Fiscale aangiften (IRS Form 990 via ProPublica Nonprofit Explorer)**
21. AACE International, EIN 74-1675154 — https://projects.propublica.org/nonprofits/api/v2/organizations/741675154.json
22. Project Management Institute Inc., EIN 23-1887442 — https://projects.propublica.org/nonprofits/api/v2/organizations/231887442.json

**Macro-economische data**
23. World Bank, indicator NY.GDP.PCAP.CD (BBP per hoofd, lopende US$, 2024) — https://api.worldbank.org/v2/country/all/indicator/NY.GDP.PCAP.CD?format=json&date=2024

**Open-source ecosysteem**
24. GitHub-zoekopdrachten naar Primavera/XER/CPM-gerelateerde repositories (GitHub Search API) — o.a. https://github.com/djouallah/xer-reader (39 sterren), https://github.com/JaiLaff/XER-Splitter (32), https://github.com/jjCode01/js_xer_analyzer (11)

**Geciteerd maar niet zelfstandig geverifieerd**
25. BSA, *2018 Global Software Survey*, p. 12 (juni 2018) — https://gss.bsa.org — geciteerd via USTR 2025 Special 301 Report, voetnoot 36. Directe toegang geweigerd (HTTP 403).

**Geprobeerd en geblokkeerd (geen cijfers uit overgenomen)**
26. `pmi.org` — alle paden HTTP 403 (certificeringspagina's, tarieven, handboeken, jaarverslag)
27. `credly.com/organizations/project-management-institute/badges` — geen aantallen zichtbaar
28. `bsa.org` en `gss.bsa.org` — HTTP 403
29. `web.archive.org` — geblokkeerd in deze omgeving
30. `partner-finder.oracle.com` — HTTP 401

---

## Verificatie

**Onafhankelijke adversariële controle, uitgevoerd 25 juli 2026.** Opzet: elke bewering actief proberen te *weerleggen* in plaats van te bevestigen — primaire bron opnieuw ophalen (niet de samenvatting van het rapport), rekenwerk zelfstandig overdoen, en bij normen/aanbestedingen de brontekst zelf lezen. Gebruikte instrumenten: SEC EDGAR (documenten + XBRL `companyconcept`/`companyfacts` + `FilingSummary` R-files), World Bank Indicator API, USAspending API (inclusief tegenvragen), ProPublica Nonprofit Explorer API, GitHub Search API, directe PDF-extractie met `pypdf`, en directe ophaling van G-Cloud-dienstpagina's. Websearch was ook in deze controleronde niet beschikbaar (budget uitgeput); alle verificatie is dus via directe bronophaling gedaan.

**Uitkomst in één regel:** het rapport is op zijn harde cijfers ongewoon betrouwbaar — 24 van de 31 gecontroleerde beweringen kwamen letterlijk of tot op de decimaal uit. Er zijn echter **vier echte fouten** (GitHub-sterren, Oracle als federaal contractant, Nemetschek-periode, een interne rekentegenspraak) en **drie te absolute formuleringen** die zijn afgezwakt.

### Bevestigd (24)

| # | Bewering | Oordeel | Bron |
|---|---|---|---|
| 1 | Eleco FY2025/FY2024 kanaalsplitsing: direct £37.479k/£31.075k, reseller £1.337k/£1.319k, totaal £38.816k/£32.394k | **bevestigd** — letterlijk in noot "Geographical, Product and Sales Channel Information"; PDF zelf geëxtraheerd | https://ir.eleco.com/wp-content/uploads/2026/05/5770_Eleco-plc-Annual-Report-2025_Hyperlink.pdf |
| 2 | Eleco omzet naar geografie (18.389 / 6.867 / 3.296 / 1.480 / 7.650 / 1.134) | **bevestigd** — alle cellen exact; kolomtotalen nagerekend (38.816 en 32.394) | idem |
| 3 | Eleco omzet naar type: 31.313 / 6.958 / 545; dienstenpost gedefinieerd als "Services revenue (training and consultancy)" | **bevestigd** — die exacte woorden staan in noot 1 | idem |
| 4 | Afgeleide percentages: reseller +1,4 %, groep +19,8 %, diensten 17,9 %/19,9 %, terugkerend 80,7 %/77,0 %, eeuwigdurend 1,4 % | **bevestigd** — alle zelfstandig herberekend, geen enkele afronding fout | eigen herberekening |
| 5 | Autodesk: "approximately 1,170 resellers and distributors worldwide" | **bevestigd** — verbatim | https://www.sec.gov/Archives/edgar/data/769397/000076939726000015/adsk-20260131.htm |
| 6 | Autodesk: 37 % indirect in FY2026 | **bevestigd** — verbatim | idem |
| 7 | Autodesk: TD Synnex 14 % / 33 % / 39 % over FY2026/25/24 | **bevestigd** — verbatim, inclusief de jaarvolgorde | idem |
| 8 | Autodesk: "particularly in emerging regions and with governments" | **bevestigd** — verbatim | idem |
| 9 | Bentley FY2025: 94 % direct / 6 % kanaal, incl. "Virtuosity inside sales colleagues and e-store" | **bevestigd** — verbatim | https://www.sec.gov/Archives/edgar/data/0001031308/000103130826000007/bsy-20251231.htm |
| 10 | Bentley: "specialist channel partners in geographic regions where we do not currently have a meaningful presence […] less economically feasible" | **bevestigd** — verbatim | idem |
| 11 | Bentley: geen klant boven 2 % van de omzet | **bevestigd** — "No account […] represented more than 2% of our total revenues in 2025, 2024, or 2023" | idem |
| 12 | Bentley ~92 % abonnementsomzet | **bevestigd** — nagerekend uit de XBRL-uitsplitsing: subscriptions $1.376.696k / totaal $1.501.779k = **91,7 %** | https://www.sec.gov/Archives/edgar/data/1031308/000103130826000007/R59.htm |
| 13 | Oracle prijslijstenindex: geen Primavera-/C&E-prijslijst | **bevestigd** (met nuance, zie §2.5) — alle 20 gepubliceerde lijsten opgesomd | https://www.oracle.com/us/corporate/pricing/price-lists/index.html |
| 14 | Fusion Cloud Global Price List, 25 p., **nul** treffers op "Primavera" | **bevestigd** — PDF opgehaald en op tekstniveau doorzocht: 0 treffers "Primavera", 0 op "Construction" | https://www.oracle.com/a/ocom/docs/corporate/pricing/oracle-fusion-cloud-global-price-list.pdf |
| 15 | Oracle prijst in USD zonder koopkrachtcorrectie ("Prices in USA (Dollar)" / "the equivalent amount in local currency stated in the order") | **bevestigd** — beide formuleringen verbatim in de PDF | idem |
| 16 | USAspending-eenheidsprijzen: $77.592 / 20 licenties; $24.274,56 / 6; $1.884,56 / 4 EA; Emerald $49.350 | **bevestigd** — alle vier onafhankelijk teruggevonden, contractomschrijvingen verbatim identiek | https://api.usaspending.gov/api/v2/search/spending_by_award/ |
| 17 | G-Cloud: 87 treffers op "primavera" | **bevestigd** — exact 87; minstens 7 verschillende leveranciers zichtbaar | https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/search?q=primavera |
| 18 | G-Cloud-tarieven (steekproef van 7) | **bevestigd** — Hyde Park training £250–£1.195 p.p.; P6 EPPM £168,75; OPC £8–£176; i3Works £385–£1.210/dag; RPC hosting £38–£60; RPC support £1.500/dag; TRC £400–£1.400 | dienstpagina's `/g-cloud/services/{id}` |
| 19 | AACE 2025 Certification Progress Report: "1,152 examinations and certified 677 individuals"; volledige tabel van negen keurmerken | **bevestigd** — PDF geëxtraheerd, **elke cel** klopt, inclusief alle vier de totalen (1180 / 1152 / 677 / 1103) en 5.386 / 5.268 / 223 | https://web.aacei.org/docs/default-source/certification-documents/annual-reports/2025-certification-progress-report-for-website.pdf?sfvrsn=f4058d20_1 |
| 20 | AACE PSP: $525 leden, $690 niet-leden, $260 herkansing, 3 jaar, 12 CEU's, 8 jaar ervaring (of 4 + diploma), 5 uur, 119 items (36 Planning / 83 Scheduling / 1 memo), 70 % slagingsnorm, Kryterion | **bevestigd** — alle elf elementen | https://web.aacei.org/certification/certification-information/certifications-offered/professional-certifications/psp-details |
| 21 | AACE Form 990 FY2019–2023 en PMI Form 990 FY2020–2023 (alle bedragen) | **bevestigd** — ieder cijfer exact uit de API; PMI/AACE-verhouding herberekend op 129,5× ("130 keer" klopt) | https://projects.propublica.org/nonprofits/api/v2/organizations/741675154.json · .../231887442.json |
| 22 | USTR Special 301 2025: Priority Watch List (8 landen) en Watch List (18 landen) | **bevestigd** — beide lijsten exact, inclusief Türkiye-spelling en de volgorde | https://ustr.gov/sites/default/files/files/Issue_Areas/Enforcement/2025%20Special%20301%20Report%20(final).pdf |
| 23 | USTR: "$46 billion in 2018" + voetnoot 36 "BSA, 2018 Global Software Survey at 12 (Jun. 2018), https://gss.bsa.org" én de landenlijst bij overheidsgebruik | **bevestigd** — verbatim, inclusief de dertien landen (Argentina … Vietnam). De bronkritiek van het rapport (brancheorganisatiecijfer, lijstprijsmethodiek, acht jaar oud) is terecht | idem |
| 24 | World Bank BBP p.h. 2024 voor alle 13 landen, én de afgeleide percentages en de 33,2×-verhouding India/VS | **bevestigd** — alle 13 waarden tot op de eenheid identiek (VS 86.169,66; India 2.591,99; Egypte 3.338,47; Nigeria 1.084,16 …); percentagekolommen en 33,24× herberekend | https://api.worldbank.org/v2/country/all/indicator/NY.GDP.PCAP.CD?format=json&date=2024 |

Ook nagerekend en juist: Oracle University's gratis/betaald-splitsing (P6, P6 Professional, Unifier Administration = betaald; Primavera Cloud, Aconex, Textura, Construction Intelligence = gratis) — https://www.oracle.com/education/training/construction/ ; Plan Academy's zeven cursusprijzen; Eleco's e-commercecitaat; de PSP-omzetschatting (352 × $570 = $200.640); $29.871 / 20 = $1.493,55; £439 / £8 = factor 54,9; 18/82 = 22 %.

### Gecorrigeerd (7)

| # | Bewering | Oordeel | Correctie | Bron |
|---|---|---|---|---|
| 25 | "De best gewaardeerde open XER-tool op GitHub heeft **39 sterren** (`djouallah/xer-reader`)" (§6.3) | **gecorrigeerd — feitelijk onjuist** | `HassanEmam/PyP6Xer` heeft **66** sterren en `jjCode01/xerparser` **36**; beide zijn Python-parserbibliotheken en beide stonden niet in het rapport. Ook de derde plaats klopte niet (`jjCode01/xer-reader`, 21, niet `js_xer_analyzer`, 11). De conclusie "geen serieus open ecosysteem" is afgezwakt naar "dun en versnipperd, maar niet afwezig" | GitHub Search API, `q=xer primavera`, `sort=stars` |
| 26 | "In de Amerikaanse federale transactiedatabase komt Oracle zelf **niet één keer** voor als contractant voor Primavera" (§1.3, §2.6) | **gecorrigeerd — weerlegd als algemene uitspraak** | Een tegenvraag met `recipient_search_text=["Oracle"]` levert **zes** opdrachten op naam van Oracle America, Inc. ($48.600 / $26.730 / $22.500 / $22.500 / $9.927,50 / $902,50), alle voor *Primavera Submittal Exchange*. De onderliggende these blijft staan (P6-licenties lopen inderdaad volledig via wederverkopers, en $131k is verwaarloosbaar), maar de absolute formulering is onjuist | https://api.usaspending.gov/api/v2/search/spending_by_award/ |
| 27 | "Nemetschek op 95 % terugkerende omzet" als FY2025-cijfer (§4.3, §6.3) | **gecorrigeerd — verkeerde periode** | De factsheet zegt "Recurring revenues in total: **95%**" onder het kopje "Revenues by Type (**Q1-26**)". Het is een kwartaalcijfer over Q1 2026, geen boekjaarcijfer 2025 | https://ir-api.eqs.com/media/document/1367d036-3e52-4ee1-a14a-cfe4600cc34e/assets/202607_Factsheet_NEM.pdf |
| 28 | "$471/jaar impliceert bij 22 % een licentie van ~$2.140, dus de $3.880-bundel = licentie $3.300–3.400 + support" (§2.6) | **gecorrigeerd — interne rekentegenspraak** | De twee afleidingen sluiten elkaar uit. Bij 22 % splitst de bundel als $3.180 + $700; bij een supportcomponent van $471 is het percentage 13,8 %, niet 22 %. De "$2.140" volgt uit geen van beide consistente lezingen. Verdedigbaar is alleen: licentiecomponent tussen ~$3.180 en ~$3.410. Ook "binnen 4 % van elkaar" is 4,3 % | eigen herberekening op [H]-invoer |
| 29 | "£6,958 mln … bijna **2,5 keer** de totale omzet van AACE ($3,03 mln)" (§1.6) | **gecorrigeerd — valuta- en periodefout** | De verhouding deelde ponden door dollars. £6,958 mln ≈ $8,9 mln; de juiste factor is **~2,9×**. Bovendien is Eleco FY2025 vergeleken met AACE FY2023 (de meest recente gedeponeerde 990 — er is geen recenter cijfer beschikbaar) | ProPublica 990 + Eleco AR2025 |
| 30 | Bentley 93/7 (FY2024) en 92/8 (FY2023) toegeschreven aan het FY2025-10-K | **gecorrigeerd — sourcingfout** | Beide cijfers zijn juist en zijn afzonderlijk geverifieerd, maar staan **niet** in het FY2025-10-K; elk komt uit het 10-K van zijn eigen jaar. De reeks 8→7→6 % berust dus op drie deponeringen | https://www.sec.gov/Archives/edgar/data/1031308/000103130825000002/bsy-20241231.htm · .../000103130824000002/bsy-20231231.htm |
| 31 | G-Cloud-tabel: "Oracle Primavera Cloud (OPC) — Hyde Park Solutions — £8–£176" | **gecorrigeerd — verkeerde leverancier** | Die dienst is van **Laminar Group Ltd**. Omgekeerd is "Primavera P6 EPPM £168,75" (in het rapport "niet vastgesteld") wél van Hyde Park Solutions. De prijzen zelf kloppen | dienstpagina's 274592422777005 en 555484208241614 |

### Onzeker — niet te bevestigen én niet te weerleggen (5)

| # | Bewering | Oordeel | Toelichting |
|---|---|---|---|
| 32 | "IFC 4.3 is een ISO-norm (ISO 16739-1)" en "staat in toenemende mate in Europese aanbestedingseisen" (§6.2) | **onzeker** | `iso.org`, `buildingsmart.org` en `technical.buildingsmart.org` gaven alle HTTP 403; `nen.nl` 404. Ik heb de **normtekst noch de catalogusvermelding** kunnen inzien en kan niet bevestigen welke IFC-versie de huidige editie van ISO 16739-1 dekt. De aanbestedingsclaim is nergens op een concrete aanbestedingstekst gestaafd. Dit is precies het soort bewering waarvoor de opdracht de normtekst zelf vraagt — die was onbereikbaar |
| 33 | AACE RP **29R-03** = forensische vertragingsanalyse (§6.4) | **onzeker** | De RP-bibliotheek zit achter een SAML-ledenlogin; de overzichtspagina's gaven 404. Nummer noch titel primair bevestigd |
| 34 | "OPS is de enige planner die IFC als *native* formaat gebruikt" (§6.2) | **onzeker — in principe onverifieerbaar** | Universele claim over de hele markt; geen bron kan haar dragen. Afzwakken tot "een van de zeer weinige" |
| 35 | "$61,9 mln in de top-100 Primavera-contracten sinds 2019"; RPC UK £165–£439 en Laminar £176–£220 | **onzeker** | Niet gereproduceerd. De USAspending-hervraging gebruikte een ander tijdvenster; de twee G-Cloud-regels stonden niet op de eerste resultaatpagina. Wel consistent: Radus Software $2.135.035,50 komt exact overeen met de $2.135.036 in het rapport |
| 36 | "De BSA heeft sinds 2018 geen Global Software Survey meer uitgebracht" (§4.1) | **onzeker** | `bsa.org` en `gss.bsa.org` weigeren nog steeds toegang (403), net als bij het oorspronkelijke onderzoek. Dat de USTR in 2025 nog het cijfer uit 2018 citeert is een sterke aanwijzing, maar geen bewijs van afwezigheid |

### Beoordeling van de gecorrigeerde stukken op de conclusies

Geen van de vier echte fouten raakt de hoofdthese. De kanaalcijfers — het fundament van het rapport — zijn tot op de decimaal juist en verbatim uit gecontroleerde jaarrekeningen gehaald; hetzelfde geldt voor de AACE-tabel, de USTR-lijsten, de World Bank-reeks en de federale eenheidsprijzen. De GitHub-fout raakt wél een **aanbeveling**: §6.3 stelde dat het XER-terrein leeg is en dat wie het goed doet "alleen staat". Met PyP6Xer (66 sterren) en `xerparser` (36) erbij is de juistere lezing dat er bruikbaar voorwerk ligt waarop OPS kan steunen — een gunstiger, niet ongunstiger, uitgangspunt, maar wel een ander.

De grootste resterende zwakte is niet gecorrigeerd maar bevestigd: **de twee normatieve claims (ISO 16739-1/IFC 4.3 en AACE RP 29R-03) zijn de enige beweringen in het rapport waar een primaire brontekst nodig is en niet beschikbaar was.** Juist §6 leunt daarop. Aanbeveling: deze twee vóór verder gebruik verifiëren tegen respectievelijk de ISO-catalogus en de AACE-RP-bibliotheek (ledentoegang vereist).
