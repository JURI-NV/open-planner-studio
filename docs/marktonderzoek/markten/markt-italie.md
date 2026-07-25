# Marktonderzoek: projectplanning-/schedulingsoftware in Italië

**Regio:** Zuid-Europa
**Onderzoeksdatum:** 25 juli 2026
**Valutakoersen gehanteerd:** 1 EUR ≈ 1,08 USD; 1 GBP ≈ 1,17 EUR (afgerond, voor omrekeningen in dit rapport)

> **Leeswijzer bij betrouwbaarheid.** Bij elk cijfer staat een bron-URL. Waar ik zelf reken of extrapoleer staat expliciet **[SCHATTING]**. Waar een bron commercieel belang heeft of niet verifieerbaar is, staat **[LAGE BETROUWBAARHEID]**. Prijzen uit Italiaanse overheidsbesluiten (`determine di affidamento`) zijn de hardste bron in dit rapport: die zijn wettelijk verplicht openbaar en bevatten werkelijk betaalde bedragen, geen lijstprijzen.

---

## 1. Samenvatting

Italië is een **grote bouwmarkt met een structureel kleine markt voor échte schedulingsoftware**. Dat is de kernbevinding en die verklaart bijna alles wat volgt.

De reden is juridisch. Het Italiaanse aanbestedingsrecht (D.Lgs. 36/2023) verplicht een **`cronoprogramma`** — een grafisch schema dat de uitvoeringsfasen weergeeft — als onderdeel van het uitvoeringsontwerp, en verplicht de aannemer daarna een **`programma esecutivo dettagliato dei lavori`** in te dienen. Maar de wet schrijft **een document voor, geen bestandsformaat en geen rekenmethode**. Er is in dit onderzoek geen enkel Italiaans bestek gevonden dat CPM-logica, een `.xer`-levering of een specifiek pakket verplicht stelt. Waar het Verenigd Koninkrijk, de Golfstaten en grote delen van Noord-Amerika de aannemer dwingen tot P6-bestanden met logica, float en baselines, accepteert Italië in de praktijk een PDF met balkjes.

Het gevolg is een markt die in twee vrijwel gescheiden werelden uiteenvalt:

**Wereld 1 — de brede markt (tienduizenden gebruikers, zeer lage prijs per gebruiker).** Het `cronoprogramma` is hier een bijproduct van de kostenraming (`computo metrico`). Italiaanse professionals en overheden kopen een calculatiepakket en krijgen de planningsmodule er gratis of vrijwel gratis bij. ACCA's **PriMus** is marktleider; de planningsmodule **PriMus-K** zit inbegrepen in het POWER PACK-onderhoudsabonnement van **€199 per jaar voor de eerste installatie en €100 voor elke volgende** ([ACCA-offerte aan Roma Capitale, okt 2024](https://www.comune.roma.it/web-resources/cms/documents/ACCA.Offerta_Corso_PriMus_Romacapitale.pdf); bevestigd in [determina Comune di Bologna](https://atti9.comune.bologna.it/atti/determine.nsf/0/9C9DEF5B1E2E527DC1258DAF005B692B)). Concurrenten zijn **STR Vision CPM** (nu TeamSystem Construction) en **Blumatica Kronoplan**. Daarnaast is Excel alomtegenwoordig.

**Wereld 2 — de zware markt (enkele duizenden gebruikers, hoge prijs per gebruiker).** Grote infrastructuur, EPC/plant en energie draaien op **Oracle Primavera P6** en **Microsoft Project**. Webuild, Saipem, Maire Tecnimont, Terna, RFI/Italferr en de grote ingenieursbureaus zitten hier. Dit is waar het geld zit maar niet waar de aantallen zitten. Interessant detail voor de marktstructuur: **TeamSystem — de grootste Italiaanse bouwsoftwareleverancier — is tevens de Oracle Primavera-wederverkoper in Italië**, aantoonbaar via een aankoopbesluit van de gemeente Genua ([Comune di Genova, DD 2021-126.0.99](https://www2.comune.genova.it/content/dd-2021-126099-assegnazione-ai-sensi-dell%E2%80%99art-36-comma-2-lettera-del-dlgs-n-5020216-tramite-)). Dezelfde partij bedient dus beide werelden.

**Marktomvang (eigen schatting, zie §2):** de Italiaanse markt voor projectplanning-/schedulingsoftware bedraagt naar schatting **€25–45 miljoen per jaar aan licentie-/abonnementsomzet (2025)**, waarvan **€15–30 miljoen bouw-/infraspecifiek**. Inclusief training, consultancy en implementatie komt het totaal op naar schatting **€45–80 miljoen per jaar**. Groei naar schatting **6–9% per jaar**, gedreven door de BIM-verplichting boven €2 miljoen (vanaf 1 januari 2025) en de nasleep van het PNRR.

**De belangrijkste marktdynamiek nu:** het PNRR loopt af (deadline medio 2026). Italië had per begin 2026 **€153,2 miljard ontvangen en €101,3 miljard uitgegeven, waarvan meer dan de helft naar de bouw**, met circa **16.000 actieve bouwplaatsen** ([Edilportale/ANCE, jan 2026](https://www.edilportale.com/news/2026/01/mercati/ance-investimenti-costruzioni-56-nel-2026_108743_13.html)). Dat heeft een tijdelijke piek in vraag naar planners veroorzaakt. Na 2026 resteert ca. **€120 miljard aan Europese en nationale middelen tot 2033** — de vraag stort dus niet in, maar de urgentie neemt af.

**Wat dit betekent voor een nieuwe speler:** het onderscheidende gat in Italië is niet "nog een Gantt-tool". Het is (a) Italiaanstalige UI, (b) naadloze koppeling met `computo metrico` en regionale `prezzari`, (c) uitvoer die voldoet aan de vormvereisten van D.Lgs. 36/2023, en (d) aanwezigheid op het **MePA/Consip**-inkoopplatform — zonder MePA-vermelding kan geen Italiaanse overheidsinstantie legaal bij je kopen.

---

## 2. Marktomvang

### 2.1 De macrocontext

| Grootheid | Waarde | Jaar | Bron |
|---|---|---|---|
| Bouwinvesteringen Italië, groeiverwachting | +5,6% (na −1,1% in 2025) | 2026 | [Edilportale/ANCE](https://www.edilportale.com/news/2026/01/mercati/ance-investimenti-costruzioni-56-nel-2026_108743_13.html) |
| PNRR ontvangen door Italië | €153,2 mrd (79% van totaal) | begin 2026 | [Edilportale/ANCE](https://www.edilportale.com/news/2026/01/mercati/ance-investimenti-costruzioni-56-nel-2026_108743_13.html) |
| PNRR uitgegeven, >helft naar bouw | €101,3 mrd | begin 2026 | idem |
| Actieve PNRR-bouwplaatsen | ca. 16.000 | begin 2026 | idem |
| Nieuwe banen in de bouw 2020–2025 | 350.000 | 2025 | idem |
| Resterende EU/nationale middelen tot 2033 | ca. €120 mrd | vanaf 2026 | idem |
| Werkgelegenheid bouwketen | 3,3 miljoen (+156.000 in 2024) | 2024 | [Industria Italiana/Federcostruzioni](https://www.industriaitaliana.it/federcostruzioni-2024-156mila-occupati-produzione/) |
| Bouwbedrijven Italië (totaal ondernemingen) | 827.262 (660.652 Italiaans, 166.610 buitenlands) | dec 2024 | [Edilnet](https://blog.edilnet.it/news-sempre-meno-imprese-edili-italiane-nelle-costruzioni-chi-sta-conquistando-il-settore/) |
| PNRR spoorinvestering RFI | €22 mrd | lopend | [Ingenio-web](https://www.ingenio-web.it/articoli/infrastrutture-ferroviarie-i-grandi-interventi-previsti-da-rfi-grazie-ai-22-mld-del-pnrr/) |
| PNRR-investeringen Gruppo FS | ca. €25 mrd | 2024 | [FS Italiane](https://www.fsitaliane.it/content/dam/fsitaliane/Documents/media/comunicati-stampa/2024/dicembre/03_nota_stampa_PNRR.pdf) |
| Ingenieurs ingeschreven bij de orde | >250.000 (ca. 70% ouder dan 45) | 2025 | [ANSA](https://www.ansa.it/sito/notizie/ordini_professionali/2025/02/06/oltre-250.000-ingegneri) |
| Ingenieurs + architecten (Inarcassa) | 172.916 (−0,8% j-o-j) | 2025 | [ANSA](https://www.ansa.it/sito/notizie/economia/real_estate/2026/04/29/inarcassa-172.916-ingegneri-e-architetti-iscritti-nel-2025) |
| Productiewaarde OICE-ingenieursbureaus | €4,63 mrd | 2025 | [OICE via Edilportale/YouBuild](https://www.oice.it/916272/presentata-la-rilevazione-annuale-oice-cer-11-3-produzione-2024) |
| Personeel OICE-bureaus | 27.929 | 2022 | [OICE](https://www.oice.it/234334/-il-mercato) |
| Webuild orderintake | €9,3 mrd (9M) | 2025 | [Milano Finanza](https://milanofinanza.it/news/webuild-ordini-record) |
| Webuild omzetverwachting | >€12,5 mrd | 2025 | [Il Giornale d'Italia](https://ilgiornaleditalia.it/news/economia/749544/webuild-acquisiti-a-9-3-miliardi) |

### 2.2 Digitalisering als leidende indicator

Het **9e OICE-rapport over BIM-aanbestedingen** is de beste beschikbare meting van hoe snel Italiaanse opdrachtgevers digitaliseren, en daarmee een goede proxy voor de vraag naar gestructureerde planning:

| Indicator | 2024 | 2025 | Verandering |
|---|---|---|---|
| Aantal BIM-aanbestedingen | 353 | **638** | **+80,7%** |
| Waarde BIM-aanbestedingen | €596,2 mln | **€1,496 mrd** | **+151,1%** |
| Aandeel met `capitolato informativo` | 25,2% | **34,3%** | +9,1 ppt |
| BIM als deelnemingseis | — | 53,3% (340 tenders) | — |
| BIM-Manager/Coordinator vereist | — | 39,5% | — |
| UNI 11337-certificering vereist | — | 11,8% | — |

Bron: [Edilportale, april 2026](https://www.edilportale.com/news/2026/04/mercati/report-oice-su-appalti-bim-e-ia-nel-2025_109944_13.html); zie ook [Lavoripubblici.it](https://lavoripubblici.it/news/gare-bim-2025-report-oice-crescita-digitalizzazione-ia-37838).

Let op de asymmetrie: **BIM-eisen groeien explosief, maar het `cronoprogramma` blijft ongereguleerd qua formaat.** De 4D-dimensie lift mee op BIM, niet op planningswetgeving.

### 2.3 Externe marktramingen (gebruik met voorbehoud)

| Bron | Definitie | Waarde | Jaar | CAGR |
|---|---|---|---|---|
| [Market Research Future](https://www.marketresearchfuture.com/reports/italy-project-portfolio-management-software-market-61336) | Italië, project portfolio management software | **$157,78 mln** → $370,3 mln (2035) | 2025 | 8,91% |
| idem, deelsegment | Italië, *Construction Project Management*-toepassing | **$25–60 mln** | 2024 | — |
| [Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/project-management-software-systems-market) | Wereldwijd, PM-software | $9,76 mrd | 2025 | → $23,09 mrd (2031) |
| [Research Nester](https://www.researchnester.com/reports/project-management-software-market/4176) | Wereldwijd, PM-software | $7,24 mrd | 2025 | 10,7% |
| [MarketIntelo](https://marketintelo.com/report/construction-scheduling-software-market) | Wereldwijd, *construction scheduling* | $2,1 mrd | 2025 | 9,2% → $4,8 mrd (2034) |

**[LAGE BETROUWBAARHEID]** Het MRF-rapport bevat interne inconsistenties (2024-totaal $144,87 mln, maar het segment "large enterprises" alleen al $220,3 mln) en veel ronde, niet-onderbouwde procentclaims over Italiaanse bedrijven. Behandel de $157,78 mln als een orde-van-grootte-indicatie voor een **veel bredere** PPM-definitie (inclusief IT-portfoliobeheer, SAP, Atlassian, Smartsheet, monday) en niet als een meting van bouwplanning. De sub-segmentschatting van **$25–60 mln voor bouwprojectmanagement** is de meest bruikbare regel eruit, en die is verrassend consistent met mijn eigen bottom-up berekening hieronder.

### 2.4 Eigen bottom-up raming **[SCHATTING]**

Ik reken vanaf het aantal mensen dat dit werk daadwerkelijk doet, omdat dat in Italië de beperkende factor is — niet het aantal projecten.

**Stap 1 — hoeveel professionele planners telt Italië?**

Drie onafhankelijke benaderingen:

*(a) Vacaturestroom.* Op LinkedIn Italië stonden ten tijde van dit onderzoek **73 vacatures met "Primavera P6"** en **91 met "Project Planner Primavera P6"** ([LinkedIn IT](https://it.linkedin.com/jobs/project-planner-primavera-p6-offerte-di-lavoro)); Glassdoor telde er 19–23, Indeed 8. Neem ~80 gelijktijdig openstaande gespecialiseerde planner-posities. Vacatures staan gemiddeld 1–2 maanden open, dus de jaarlijkse instroom is grofweg 480–960 posities. Bij een verloop van 10–15% per jaar impliceert dat een installed base van **3.200–9.600 planners**. Neem het midden: **~5.000**.

*(b) Verhouding tot de sector.* In volwassen bouwmarkten ligt de verhouding toegewijde planners tot bouwwerkgelegenheid rond 1:300 à 1:500. Italië heeft ca. 1,5 miljoen direct in de bouw (deel van de 3,3 miljoen ketenwerkgelegenheid). Dat geeft **3.000–5.000**.

*(c) Via ingenieursbureaus.* OICE-bureaus hebben 27.929 medewerkers; als 3–5% planner/project-control is, zijn dat **840–1.400** — alleen bij de aangesloten bureaus. Tel daar aannemers (Webuild alleen al enkele honderden), EPC (Saipem, Maire Tecnimont, Danieli, Fincantieri), opdrachtgevers (RFI/Italferr, ANAS, Terna, Snam, Autostrade) en het niet-aangesloten deel van de markt bij op, en je komt op dezelfde orde.

**Conclusie: circa 4.000–7.000 professionele planners in Italië die een echt CPM-pakket gebruiken.** Daarnaast tienduizenden professionals (ingenieurs, architetti, geometri, ambtenaren) die één of twee keer per jaar een `cronoprogramma` moeten produceren als projectdocument.

**Stap 2 — wat wordt er per gebruiker betaald?**

| Segment | Aantal seats **[SCHATTING]** | Kosten per seat/jaar | Jaarlijkse omzet **[SCHATTING]** |
|---|---|---|---|
| Oracle Primavera P6 (perpetual + 22% support, en cloud) | 1.200–2.000 | €1.500–3.000 geannualiseerd | **€2–5 mln** |
| Microsoft Project (Plan 3 / perpetual), bouw+infra deel | 6.000–10.000 | €250–350 | **€1,5–3,5 mln** |
| MS Project buiten bouw (industrie, IT, publiek) | 10.000–20.000 | €250–350 | €2,5–7 mln (deels buiten scope) |
| SYNCHRO 4D, TILOS, Powerproject, overige zware tools | 300–700 | €2.000–4.500 | **€0,8–2,5 mln** |
| PriMus-K binnen POWER PACK (ACCA) | 40.000–80.000 POWER PACK-abonnementen | €100–199 (hele pakket, niet alleen planning) | **€1–3 mln** toerekenbaar aan planning |
| STR Vision CPM / TeamSystem Construction | 5.000–15.000 | €240–600 (onderhoud) | **€2–6 mln** |
| Blumatica Kronoplan, Namirial, MyAedes e.a. | 3.000–10.000 | €100–300 | **€0,5–2 mln** |
| Algemene SaaS (monday, Smartsheet, Wrike, Asana, ClickUp) voor AEC-planning | 5.000–15.000 | €150–350 | **€1–4 mln** |

**Totaal licentie-/abonnementsomzet: €25–45 miljoen per jaar (2025).**
**Waarvan bouw-/infraspecifiek: €15–30 miljoen per jaar.**

**Stap 3 — diensten.** In dit vakgebied ligt de verhouding diensten/licenties in Italië hoog, omdat het aanbod sterk via resellers en systeemintegratoren loopt (TeamSystem, Alfa Sistemi, Horsa, EPM Consulting, Comunico, DigiTecno) en omdat overheden training moeten inkopen. Uit het CAL-contract blijkt een consultancytarief van **€95/uur** ([CAL S.p.A., feb 2020](https://www.calspa.it/wp-content/uploads/2020-02-13_det-affidamento_str.pdf)); uit de ACCA-offerte aan Rome **€7.200 voor 3 klassen van 16 uur** plus €2.000 reiskosten. Reken op een dienstencomponent van **1,0–1,5× de licentieomzet**.

**Totaal Italiaanse markt inclusief diensten: €45–80 miljoen per jaar. [SCHATTING]**

**Stap 4 — kruiscontrole.** Market Research Future schat het Italiaanse deelsegment "Construction Project Management" op **$25–60 mln (2024)**, oftewel €23–55 mln. Mijn bouwspecifieke licentieraming (€15–30 mln) plus een deel van de diensten valt daarbinnen. De twee methoden zijn onafhankelijk en komen op dezelfde orde uit — dat geeft redelijk vertrouwen in de orde van grootte, niet in de precisie.

**Groei [SCHATTING]: 6–9% per jaar.** Onderbouwing: BIM-aanbestedingen +80,7% in aantal (2025), BIM-verplichting boven €2 mln vanaf 1 jan 2025, €120 mrd resterende middelen tot 2033 — maar ook een aflopende PNRR-piek, een krimpende beroepsbevolking (ingenieurs/architecten −0,8%, 70% ouder dan 45) en een prijsniveau dat structureel laag blijft doordat planning als bijproduct van calculatie wordt verkocht.

---

## 3. Gebruikte software: marktpositie en prijzen

### 3.1 Rangorde in de Italiaanse praktijk

| # | Pakket | Positie in Italië | Wie gebruikt het |
|---|---|---|---|
| 0 | **Microsoft Excel** | Feitelijk het meest gebruikte "planningsinstrument" | Vrijwel iedereen, vooral MKB-aannemers |
| 1 | **ACCA PriMus / PriMus-K** | Marktleider naar aantal gebruikers in het professionele en publieke segment | Ingenieurs, architetti, geometri, gemeenten, provincies |
| 2 | **Microsoft Project** | Marktleider naar seats in het bedrijfsmatige segment; de standaard-default | Ingenieursbureaus, industrie, opdrachtgevers, PMO's |
| 3 | **Oracle Primavera P6** | De facto standaard voor `grandi opere`; hoogste waarde per seat | Webuild, Saipem, Maire Tecnimont, Terna, RFI/Italferr, EPC |
| 4 | **STR Vision CPM / TeamSystem Construction** | Nr. 2 Italiaans pakket; sterker bij gestructureerde aannemers en PA | Aannemers, technische bureaus, concessiehouders, PA |
| 5 | **Blumatica Kronoplan** | Nr. 3 Italiaans pakket, low-cost niche | Kleinere bureaus en aannemers |
| 6 | **Bentley SYNCHRO 4D** | Nichespeler, groeiend via BIM-mandaat; vlaggenschipreferentie Italferr | Grote infra-opdrachtgevers en -aannemers |
| 7 | **Trimble TILOS** | Niche voor lineaire werken; eigen Italiaanse distributeur | Spoor, wegen, tunnels, pijpleidingen |
| 8 | **Twproject, monday.com, Smartsheet, Wrike, Asana, ClickUp** | Groeiend in studio's/PMO's; niet voor CPM-contractdeliverables | Bureaus, dienstverleners, interne PMO's |
| 9 | **ProjectLibre / GanttProject / OpenProject** | Studenten, ZZP'ers, budgetarme PA | Marginaal maar reëel |
| 10 | **Namirial (Regolo), MyAedes** | Kleine lokale spelers met cronoprogramma-functie | MKB-professionals |
| 11 | **Elecosoft Asta Powerproject** | Vrijwel afwezig — geen Italiaanse reseller gevonden | Zeldzaam, via buitenlandse moederbedrijven |
| 12 | **Deltek, Safran, Sciforma/Planview, InEight, Hexagon EcoSys, RIB iTWO/Candy, Spider Project** | Verwaarloosbare directe Italiaanse voetafdruk | Incidenteel via multinationale EPC |
| 13 | **ALICE Technologies, nPlan, Nodes & Links** | Geen bewijs van Italiaanse toepassing gevonden | — |

---

### 3.2 Oracle Primavera P6 — de standaard voor grote werken

**Positie.** Oracle positioneert P6 in het Italiaans letterlijk als **"Lo standard per la pianificazione e la programmazione"** ([Oracle Italia](https://www.oracle.com/it/construction-engineering/primavera-p6/)). Italiaanse vakbronnen noemen het "il Re indiscusso" van planningssoftware en koppelen het expliciet aan infrastructuur en PNRR. In de praktijk is het de taal waarin grote Italiaanse aannemers en EPC-bedrijven met internationale opdrachtgevers communiceren.

**Wie.** Webuild adverteert expliciet voor een *Bidding Planning Specialist — Primavera P6 Expert* in Milaan voor het tenderteam ([Jooble IT](https://it.jooble.org/jdp/3208170616099403747)) en voor `Planner`-rollen op de bouwplaats ([LinkedIn](https://it.linkedin.com/jobs/view/planner-at-webuild-4438080587)). Saipem werft Project Control Managers met schedule-verantwoordelijkheid ([LinkedIn, mei 2026](https://it.linkedin.com/jobs/view/project-control-manager-progetto-florentia-at-saipem-4384872609)); Terna zoekt Project Planning & Control-specialisten in Rome ([Glassdoor IT](https://www.glassdoor.it/Lavoro/planner-primavera-p6-lavori)); Maire Tecnimont traint intern op P6.

**Marktstructuur Italië.** Het kanaal loopt via:
- **TeamSystem S.p.A.** — tevens de grootste Italiaanse bouwsoftwareleverancier; verkoopt P6 EPPM met installatie, integratie, maatwerk, upgrades, opleiding en detachering van planners/PMO ([TeamSystem Oracle Primavera](https://www.teamsystem.com/construction/oracle-primavera/))
- **Alfa Sistemi** (Udine, Milaan, Rome) — implementatie, integratie en training voor engineering, bouw, infra, energie en grote industriële installaties ([Alfa Sistemi](https://www.alfasistemi.net/it/software/oracle-primavera-p6/))
- **Horsa** — o.a. Primavera Reader ([Horsa](https://www.horsa.com/it/it/sp/primavera-reader))
- **EPM Consulting** — P6 PPM-consultancy ([epmconsulting.org](https://epmconsulting.org))
- **S2plan** (opgericht 2026, Stefano Sala) — ingenieursbureau gespecialiseerd in Project Control, Planning en Cost Control voor civiele, plant- en infrastructuurwerken; werkt uitsluitend met MS Project en Primavera P6 ([s2plan.it](https://www.s2plan.it/))
- **MESLI Consulting** — licentieverkoop met offertes op maat

**Prijzen — internationale lijstprijzen (perpetual, USD):**

| Product | Lijstprijs | Metriek | Bron |
|---|---|---|---|
| Primavera P6 Professional | **$3.880** | Application User, perpetual, support niet inbegrepen | [Akim Engineering](https://www.akimeng.com/oracle-primavera-price-list.html) |
| Primavera P6 Enterprise (EPPM) | **$4.240** | Application User, perpetual | idem |
| Primavera Risk Analysis | **$10.450** | Application User, perpetual | idem |
| P6 Progress Reporter | **$1.460** | Application User, perpetual | idem |

Oracle rekent standaard **22% van de netto licentiewaarde per jaar** voor Software Update License & Support (algemeen Oracle-beleid; niet in bovenstaande bron gespecificeerd — **[SCHATTING]** op basis van Oracle's gangbare supportpercentage).

**Prijzen — cloud, officiële Oracle-lijstprijs.** Het meest betrouwbare openbare document is Oracle's eigen prijslijst voor het Britse G-Cloud 14-raamwerk (mei 2025). Dit zijn echte Oracle-lijstprijzen, geen reseller-schattingen:

| Cloud-dienst | Prijs per hosted named user/maand | Min. gebruikers |
|---|---|---|
| **Primavera P6 EPPM Cloud Service** | **£220** (≈ €257) | 25 |
| Primavera P6 Progress Reporter Cloud | £24 (≈ €28) | — |
| P6 EPPM Web Services Cloud | £36 (≈ €42) | — |
| **Primavera Schedule Cloud Service** (Oracle Primavera Cloud) | **£96** (≈ €112) | 5 |
| Primavera Task Management Cloud | £44 (≈ €51) | 5 |
| Primavera Progress Cloud | £10 (≈ €12) | 5 |
| Primavera Portfolio & Capital Planning Cloud | £176 (≈ €206) | 5 |
| Primavera Unifier Project Controls | £132 (≈ €154) | 25 |
| Oracle Aconex Enterprise | £46 (≈ €54) | 5 |
| Oracle Construction Intelligence Cloud Analytics | £40 (≈ €47) | 10 |
| Primavera Cloud extra non-productieomgeving | £3.954/maand | — |

**Volumekortingen (officieel, alle bovenstaande diensten):** 101–200 gebruikers −10%; 201–500 −15%; 501–1.000 −20%; 1.001+ −25%.
Bron: [Oracle Primavera Pricing, G-Cloud 14, v1.1, mei 2025 (PDF)](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/717959/423103118187025-pricing-document-2025-06-25-1321.pdf).

**Prijzen — werkelijk betaald in Italië.** De gemeente Genua kocht via MePA bij TeamSystem S.p.A.: **3 licenties Primavera P6 EPPM + 3 jaarlijkse assistentiecontracten voor €10.356,00** (affidamento diretto, sept–okt 2021, CIG 88949622DA) ([Comune di Genova DD 2021-126.0.99](https://www2.comune.genova.it/content/dd-2021-126099-assegnazione-ai-sensi-dell%E2%80%99art-36-comma-2-lettera-del-dlgs-n-5020216-tramite-)). Dat is **~€3.452 per seat inclusief eerste jaar support** — ruwweg de internationale lijstprijs, zonder noemenswaardige Italiaanse korting bij deze kleine hoeveelheid.

**Voordelen (Italiaanse context):** het enige pakket dat door alle grote Italiaanse infra-aannemers en internationale opdrachtgevers wordt geaccepteerd; multi-project, resources, kosten en earned value in één model; onmisbaar bij export en bij claims/vertragingsanalyse.
**Nadelen:** hoge kosten voor Italiaanse begrippen; Italiaanse UI-ondersteuning is beperkt en in de praktijk werkt men in het Engels; de leercurve is te steil voor het brede Italiaanse professionele segment; niet gekoppeld aan Italiaanse `prezzari` of `computo metrico`; overkill voor de wettelijke `cronoprogramma`-verplichting.

---

### 3.3 Microsoft Project — de stille standaard

**Positie.** MS Project is in Italië de default-keuze zodra iemand méér wil dan Excel maar minder dan P6. Het is Italiaanstalig beschikbaar, ligt in elke Microsoft-volumelicentie binnen handbereik, en wordt door zowel bureaus als opdrachtgevers geaccepteerd. Geen Italiaanse aanbesteding vraagt erom, maar geen enkele weigert het.

**Prijzen (officiële Microsoft Italië-prijzen, exclusief btw):**

| Plan | Prijs | Voorwaarden | Bron |
|---|---|---|---|
| **Planner Plan 1** | **€8,70 per gebruiker/maand** | jaarlijkse betaling, automatische verlenging, excl. IVA | [Microsoft IT](https://www.microsoft.com/it-it/microsoft-365/planner/microsoft-planner-plans-and-pricing) |
| **Planner and Project Plan 3** | **€26,00 per gebruiker/maand** | jaarlijkse betaling, excl. IVA | idem |
| Planner and Project Plan 5 | niet vermeld op de Italiaanse pagina | — | idem |
| **Project Professional 2024** (eenmalig) | **€1.659,00** | perpetual, één pc | [Microsoft IT](https://www.microsoft.com/it-it/microsoft-365/project/compare-microsoft-project-management-software) |
| **Project Standard 2024** (eenmalig) | **€929,00** | perpetual, één pc | idem |
| Project Server Subscription Edition | prijs op aanvraag via partner | — | idem |

**Voordelen:** volledig Italiaanstalig; lage instapdrempel; iedereen kan het bestand openen; perpetual-optie past bij Italiaanse investeringsgewoonten (liever eenmalig kopen dan abonneren).
**Nadelen:** zwak in multi-project resource-management; geen koppeling met Italiaanse prijslijsten of `computo metrico`; geen SAL-/contabiliteitsuitvoer, dus je hebt er alsnog PriMus of STR naast nodig; het perpetuele Project Professional van €1.659 is voor een Italiaans eenmansbureau een serieus bedrag naast een PriMus-licentie van €252.

---

### 3.4 ACCA PriMus / PriMus-K — de volumemarkt

**Positie.** ACCA software S.p.A. (Bagnoli Irpino, Avellino) is de dominante Italiaanse leverancier voor bouwprofessionals. Omzet **€29.728.713 in 2024** (−4,7% j-o-j) met een winst van **€8.513.830** ([Aziende.it](https://www.aziende.it/acca-software-s-p-a), [FatturatoItalia](https://fatturatoitalia.it/acca-software-spa-01883740647/)). ACCA noemt PriMus zelf *"il software più diffuso per il computo metrico e la contabilità lavori in Italia"* met 30 jaar historie ([ACCA](https://www.acca.it/software-contabilita-lavori)). Een vergelijkende analyse noemt PriMus NEXT de marktleider met "de grootste gebruikersbasis in Italië" ([Supalabs](https://supalabs.co/it/blog/primus-vs-str-vision-vs-edilius-confronto)) — **[LAGE BETROUWBAARHEID]**, want dit is een SEO-blog van een marktpartij.

**Hoe planning erin zit.** **PriMus-K** is de cronoprogramma-module: wizard-gestuurde schema-opbouw, directe import uit PriMus/PriMus-P/PriMus-DCF, grafisch activiteitenbeheer, **kritieke-padanalyse**, financiële planning en SAL-data, vergelijking ontwerpschema vs. uitvoeringsschema, export naar Word/PDF/HTML/Excel/RTF ([ACCA PriMus-K](https://www.acca.it/software-cronoprogramma-lavori)). Het pakket refereert expliciet aan de wettelijke ontwerpfasen (PFTE en `progetto esecutivo`).

**Cruciaal commercieel feit: PriMus-K wordt niet los verkocht.** Het zit inbegrepen in het **PriMus POWER PACK**-onderhoudsabonnement.

**Prijzen — officiële ACCA-lijst (maart 2024):**

| Product | Prijs (excl. IVA) |
|---|---|
| PriMus usBIM (computo + contabilità) | **€699,00** |
| PriMus-P usBIM (computo metrico + stima) | €299,00 |
| PriMus-C (documenten/bestekken) | €149,00 |
| Impresus (bedrijfsbeheer aannemers) | €1.999,00 |
| Edificius (BIM-ontwerp) | €2.499,00 (van €3.490) |
| CerTus usBIM (veiligheid) | €699,00 |
| usBIM (13 online-apps + 10 GB cloud) | €0,00 |
| PriMus SERVER | prijs op aanvraag |

Bron: [ACCA Listino Prezzi maart 2024 (rev.01), via Tecno3D (PDF)](https://tecno3d.it/wp-content/uploads/2024/06/Listino_Prezzi-MAR-24.pdf).

**Prijzen — POWER PACK (waar PriMus-K in zit):**

> *"Il costo dell'abbonamento annuale del power pack è di € 199,00 per la prima installazione – €100,00 per ogni installazione aggiuntiva."*
> — [ACCA-offerte aan Roma Capitale, 17 oktober 2024 (PDF)](https://www.comune.roma.it/web-resources/cms/documents/ACCA.Offerta_Corso_PriMus_Romacapitale.pdf)

Het POWER PACK bevat naast PriMus-K ook PriMus-CAD, PriMus-IFC, PriMus-A (prijsanalyse), PriMus-N, PriMus-I, PriMus-OSA, usBIM.gdl (werfdagboek, 10 GB cloud) en alle updates.

**Prijzen — werkelijk betaald door Italiaanse overheden (hardste bron):**

| Instantie | Wat | Bedrag excl. IVA | Bedrag incl. IVA | Datum |
|---|---|---|---|---|
| **Città Metropolitana di Firenze** | 2 PriMus-licenties (MePA-code ACC_P01_2) | **€504,00** (= €252/licentie) | €614,88 | 12-09-2024 |
| idem | POWER PACK onderhoud, 1e licentie (ACC_A01.a) | **€199,00** | €242,78 | idem |
| idem | POWER PACK onderhoud, 3 extra licenties (ACC_A01.a_2) | **€300,00** (= €100/licentie) | €366,00 | idem |
| idem | **totaal** | **€1.003,00** | €1.223,66 | idem |
| **Comune di Bologna** | 3× PriMus POWER PACK, 3-jarige verlenging, incl. PriMus-K, PriMus-Sosa, usBIM-werfdagboek | **€999,00** | €1.218,78 | ingang 03-03-2026 |
| **ACCA → Roma Capitale (offerte)** | 35 PriMus-installaties | **€8.820,00** (= €252/installatie) | — | 17-10-2024 |

Bronnen: [Città Metropolitana di Firenze, DD 1897 van 12/09/2024 (PDF)](https://www.cittametropolitana.fi.it/wp-content/uploads/DD.-1897-del-12-09-2024.pdf); [Comune di Bologna, determina CIG BA594FF33B](https://atti9.comune.bologna.it/atti/determine.nsf/0/9C9DEF5B1E2E527DC1258DAF005B692B); [ACCA-offerte Roma Capitale (PDF)](https://www.comune.roma.it/web-resources/cms/documents/ACCA.Offerta_Corso_PriMus_Romacapitale.pdf).

**Dit is het belangrijkste prijsgetal van dit hele rapport:** een Italiaanse overheidsinstantie betaalt **€999 excl. btw voor drie jaar, drie werkplekken, inclusief de volledige cronoprogramma-functionaliteit** — oftewel **€111 per werkplek per jaar**. Ter vergelijking: één Primavera P6-seat kost in Italië ~€3.452 en één MS Project Plan 3-seat €312 per jaar. De Italiaanse markt is prijsmatig verankerd op ongeveer een dertigste van het P6-niveau.

**Trainingskosten (ACCA, aan Roma Capitale, jan 2025):**
- Cursus "PriMus advanced" (computo, contabilità, direzione lavori): 16 uur per klas, 3 klassen, tot 17 deelnemers per klas
- **€7.200,00 excl. IVA totaal** + **€2.000,00 excl. IVA reiskosten**
- Neerkomend op ~€2.400 per klas van 17, ofwel **~€141 per deelnemer voor 16 uur**
- Gegeven door een **FAA (Formatore Accreditato ACCA)** — ACCA onderhoudt een eigen geaccrediteerd trainersnetwerk
Bron: [ACCA-offerte Roma Capitale (PDF)](https://www.comune.roma.it/web-resources/cms/documents/ACCA.Offerta_Corso_PriMus_Romacapitale.pdf)

**Kortingen:** ACCA hanteert een "Neo"-actie met 30% korting voor pas afgestudeerden/starters op software boven €499 ([ACCA promoties](https://www.acca.it/offerte-promozioni)); genoemde prijs PriMus daarmee €489,30 excl. IVA ([Area Sosta](https://areasosta.com/faq/quanto-costa-il-programma-primus)). Bij volume zakt de prijs naar €252/installatie (−64% t.o.v. €699 lijstprijs).

**Voordelen (eigen beoordeling op basis van reviews en documentatie):**
- Verreweg de laagste totale kosten voor een compliant `cronoprogramma`
- Directe koppeling met `computo metrico`, prijsanalyse en SAL — de planning valt uit de calculatie, wat exact aansluit bij hoe Italianen werken
- Volledig Italiaanstalig, wetgeving-gedreven (updates volgen het Codice Appalti)
- Op MePA aanwezig, dus overheidsinstanties kunnen direct kopen
- Gratis telefonische support (ma–vr 9–13), forum, online-trainingsplatform, chatbot
- Capterra Italië: **4,3/5**, 80% beveelt aan ([Capterra IT](https://www.capterra.it/software/90588/primus))

**Nadelen (eigen beoordeling op basis van reviews en documentatie):**
- Zwakke echte scheduling: de nadruk ligt op de grafische weergave en de financiële S-curve, niet op logica, float-analyse, resource-levelling of baseline-vergelijking op CPM-niveau. Voor claims/vertragingsanalyse ontoereikend.
- Steile leercurve en niet-intuïtieve interface volgens gebruikers; "lange en moeizame data-invoer", handmatige invoer i.p.v. automatische herkenning uit projectbestanden ([Capterra IT](https://www.capterra.it/software/90588/primus))
- Installatie-/setupproblemen genoemd door gebruikers (opgelost via support)
- Een forumbijdrage op professionearchitetto.it noemt PriMus en TerMus "goede, robuuste producten die lang op de markt zijn" maar wijst op een concrete beperking: PriMus laat niet toe een prijslijst in een computatievenster te laden ([Professione Architetto](https://www.professionearchitetto.it/bacheca/info/440918/SOFTWARE))
- Hardwaresleutel (dongle) vereist bij meerdere installaties (key server) — beheerlast, maar wel een bewuste antipiraterijmaatregel
- Geen mobiele/webtoegang voor de klassieke modules
- Interoperabiliteit met P6/MS Project is geen sterk punt; het is een gesloten Italiaans ecosysteem

---

### 3.5 STR Vision CPM / TeamSystem Construction — de aannemerskant

**Positie.** STR Vision CPM is opgegaan in **TeamSystem Construction**; de merknaam wordt uitgefaseerd maar de functionaliteit en serviceniveaus blijven ([TeamSystem](https://www.teamsystem.com/construction/str-vision-admin/)). TeamSystem Group is de zwaargewicht: **>€1 miljard omzet in 2024, meer dan 2,5 miljoen actieve klanten en meer dan 5.000 medewerkers** ([Data Manager](https://www.datamanager.it/2025/05/teamsystem-risultati-2024-raggiunto-il-miliardo-di-fatturato-con-oltre-25-milioni-di-clienti/), [persbericht TeamSystem 2024 (PDF)](https://www.teamsystem.com/media/files/1571_CS_TeamSystem_Risultati2024.pdf)). De bouwdivisie afficheert zich als "40+ jaar partner" van de sector ([TeamSystem Construction](https://www.teamsystem.com/construction/)). Aparte omzetcijfers voor de bouwdivisie zijn niet openbaar.

**Functionaliteit.** Modules voor Project Management (CPM) — *"Pianificare e monitorare l'avanzamento dei progetti, inclusi tempi, costi e risorse"* — plus kostenbeheersing, resource-planning (personeel, materieel, materialen), `rapportini di cantiere` met mobiele app, documentbeheer, veiligheid/compliance, CDE en BIM 5D-integratie. Doelgroepen: aannemers, installatiebedrijven, technische bureaus, publieke administratie, multi-utilities, vastgoedeigenaren ([TeamSystem Construction](https://www.teamsystem.com/construction/)).

**Prijzen.** TeamSystem publiceert géén lijstprijzen: *"il prezzo della soluzione è definito in base allo specifico profilo di ogni cliente"* — modulair en schaalbaar, offerte op maat ([TeamSystem prijzen](https://www.teamsystem.com/construction/prezzi-teamsystem-construction/)).

**Werkelijk betaald in Italië (hardste bron).** Concessioni Autostradali Lombarde S.p.A. (CAL, Milaan — de concessieverlener voor Lombardische snelwegen) besteedde in februari 2020 via Consip/MePA aan **DigiTecno S.n.c.**:

| Post | Bedrag excl. IVA | Detail |
|---|---|---|
| Updates + onderhoud + technische assistentie STR Vision CPM, **2 licenties, 3 jaar** | **€1.440,00** | **€40/maand voor 2 licenties = €480/jaar = €240 per licentie per jaar** |
| Aanvullende module **QTO** voor 2 licenties (eenmalig) | **€1.150,00** | €575 per licentie |
| Updates/onderhoud module QTO, 2 licenties, 3 jaar | €432,00 | €12/maand voor 2 licenties |
| Consultancy over het gebruik | **€2.280,00** | **uurtarief €95,00**, maximaal 24 uur |
| Subtotaal 3 jaar | €5.302,00 | |
| Optionele verlenging 3 extra jaren | €3.582,00 | |
| **Maximum totaal** | **€9.196,00** | excl. IVA |

Bron: [CAL S.p.A., Determina di affidamento, 13 februari 2020 (PDF)](https://www.calspa.it/wp-content/uploads/2020-02-13_det-affidamento_str.pdf).

**Andere prijsindicaties (zwakker):**
- Instapinvestering "~€2.500 plus jaarlijkse updates en training" ([CantiereHub](https://cantierehub.it/blog/alternativa-str-vision-software-cantieri)) — **[LAGE BETROUWBAARHEID]**, dit is een blog van een concurrerende aanbieder
- Abonnementsbereik €400–600 basis / €700–1.000 professional / €900–1.500 met SAL-module per jaar ([Supalabs](https://supalabs.co/it/blog/primus-vs-str-vision-vs-edilius-confronto)) — **[LAGE BETROUWBAARHEID]**, SEO-blog

**Voordelen (eigen beoordeling):**
- Sterkste Italiaanse pakket voor gestructureerde aannemers: `computo metrico` met diepgaande prijsanalyse, native BIM 5D (budget werkt automatisch bij als het 3D-model wijzigt), officiële SAL/SIL-documentatie voor publieke werken, ingebouwde `congruità della manodopera`-controle tegen de Casse Edili ([CantiereOnline](https://www.cantiereonline.it/software/teamsystem_cpm))
- "Onovertroffen op computi en regionale prezzari"
- Achter de rug van een €1 mrd-groep met 550+ software-partners en directe vestigingen
- Meertalig en multi-valuta voor internationale projecten
- Op MePA aanwezig via resellers (DigiTecno, Aldebra e.a.)

**Nadelen (eigen beoordeling):**
- "Dichte en complexe interface, vereist training"; 2–3 weken oefening tot basiscompetentie ([CantiereHub](https://cantierehub.it/blog/alternativa-str-vision-software-cantieri))
- Desktop-only in de klassieke CPM-modules — geen mobiele/webtoegang voor het aanpassen van calculaties in het veld (dezelfde bron)
- Overgedimensioneerd voor kleine aannemers met minder dan ~50 projecten per jaar
- Geen transparante prijzen: alles via offerte, wat de verkoopcyclus verlengt en kleine klanten afschrikt
- Consultancy is duur en vaak noodzakelijk (€95/uur bij CAL)
- De "CPM" in de naam staat historisch voor het product, niet voor rigoureuze Critical Path Method-analyse op P6-niveau

---

### 3.6 Blumatica Kronoplan

**Positie.** Blumatica (Salerno) is de nr. 3 in het Italiaanse professionele segment. **Kronoplan** komt in twee edities: *Progetto e Direzione Lavori* (voor ontwerpers/DL, van PFTE tot uitvoeringsmonitoring) en *Imprese* (voor aannemers: het `programma di esecuzione dei lavori` opstellen en afwijkingen aan de aanbestedende dienst melden) ([Blumatica Kronoplan](https://www.blumatica.it/page/landingkronoplan/)). Expliciet afgestemd op **D.Lgs. 36 van 31/03/2023**, geldig vanaf 1 juli 2023. Gratis proefversie.

**Prijzen.** Niet openbaar gepubliceerd; Blumatica verwijst naar catalogus/listino op aanvraag. **[SCHATTING]** op basis van Blumatica's algemene prijsniveau en positionering: €100–300 per module per jaar.

**Voordelen:** goedkoop; expliciet gebouwd rond de actuele Italiaanse wetgeving; de tweedeling ontwerper/aannemer sluit precies aan bij het juridische onderscheid tussen `cronoprogramma` en `programma esecutivo`; kan het projectschema uit een ander Kronoplan-bestand overnemen.
**Nadelen:** de documentatie noemt CPM/PERT niet expliciet — het is vooral een Gantt- en voortgangsinstrument; geen prijstransparantie; klein ecosysteem; geen interoperabiliteit met P6/MSP van betekenis; onbekend buiten Italië.

---

### 3.7 Bentley SYNCHRO 4D

**Positie.** De vlaggenschipreferentie in Italië is **Italferr** (de engineeringtak van Gruppo FS) met *"Digital Construction Site 4.0"* — een transportinfrastructuurproject in Sicilië ter waarde van **€650 miljoen**, oplevering juni 2026, gebouwd op SYNCHRO 4D Pro met iTwin Capture en Power BI via Bentley Infrastructure Cloud. Gerapporteerde resultaten: **−22% bouwduur (97 dagen), −18% onvoorziene kosten, −30% ontwerpfouten, −15% herstelwerk, −25% goedkeuringsdoorlooptijd, −50% werfbezoeken, 800 ton CO₂ vermeden** ([Bentley blog](https://blog.bentley.com/software/yii-project-profile-italferr-builds-italys-first-strategic-digital-site-with-synchro/), [Bentley YII](https://yii.bentley.com/project/digital-construction-site-4-0-innovation-and-monitoring-of-work-progress/)). Bentley noemt het "de eerste in zijn soort in Italië" — het is dus een pilot, geen norm.

**Prijzen (internationaal, geen Italiaanse lijstprijzen gevonden):**

| Product | Prijs | Bron |
|---|---|---|
| SYNCHRO 4D, Virtuoso Subscription (12 maanden practitioner-licentie + 2 trainingscredits) | **$4.980 excl. btw** | [ToolsTrunk](https://thetoolstrunk.com/how-much-is-synchro-4d/) |
| SYNCHRO 4D practitioner | **€4.375** | [PricingNow](https://pricingnow.com/question/synchro-pricing/) |
| SYNCHRO Control | €1.313 | idem |
| SYNCHRO Field | €394 | idem |
| SYNCHRO, prijsbereik alle edities | $386 – $4.280 | [TrustRadius](https://www.trustradius.com/products/bentley-systems-synchro/pricing) |

**Voordelen:** de enige serieuze route naar 4D-koppeling van BIM-model en planning; sluit aan op de Italiaanse BIM-verplichting boven €2 mln en op UNI 11337; aantoonbare resultaten bij Italferr; Italiaanstalige productpagina beschikbaar ([it.bentley.com](https://it.bentley.com/software/synchro/)).
**Nadelen:** prijs op P6-niveau of hoger; vereist dat er al een volwassen planning bestaat (het is een 4D-laag, geen scheduler-vervanger); afhankelijk van BIM-volwassenheid die in het Italiaanse MKB nog grotendeels ontbreekt; beperkte Italiaanse installed base buiten de grote infra-spelers.

---

### 3.8 Trimble TILOS

**Positie.** De niche-specialist voor lineaire werken — snelwegen, spoor, tunnels (`gallerie`), pijpleidingen en bruggen. Voor Italië en Italiaanstalig Zwitserland is **Comunico S.r.l.** de nationale distributeur, die ook support, training en projectconsultancy levert. Comunico beschrijft zichzelf als distributeur voor het nationale grondgebied van "Tilos, het leidende instrument voor het plannen en beheren van infrastructuurprojecten", met **volledige CPM-ondersteuning aangevuld met positie- en productiebeperkingen**. Er bestaat een Italiaanstalige Udemy-cursus over tweedimensionale ruimte-tijd-programmering, van basisconcepten tot geavanceerde resource-definitie en S-curve-analyse.

**Prijzen (internationaal, tegenstrijdig; geen Italiaanse prijs gevonden):**
- **$2.095 per gebruiker per jaar** ([Software Connect](https://softwareconnect.com/reviews/trimble-tilos/))
- **$4.290 eenmalig (perpetual)** ([Software Finder](https://softwarefinder.com/project-management-software/tilos))
- PricingNow beschrijft het als eenmalige perpetual licentie ([PricingNow](https://pricingnow.com/question/tilos-pricing/))

**Voordelen:** het tijd-wegdiagram is voor Italiaanse spoor- en tunnelprojecten (TAV, Terzo Valico dei Giovi met 53 km lijn waarvan 37 km in tunnel) inhoudelijk superieur aan een klassiek Gantt; echte lokale distributeur met Italiaanse training en consultancy; echte CPM onder de motorkap.
**Nadelen:** zeer smalle niche — alleen zinvol bij lineaire werken; kleine Italiaanse gebruikersbasis; prijsonduidelijkheid; het is een aanvulling op P6/MSP, geen vervanging; Trimble heeft TILOS beperkt doorontwikkeld.

---

### 3.9 Elecosoft Asta Powerproject

**Positie: vrijwel afwezig in Italië.** Elecosoft bedient klanten buiten het VK via "selected international distribution partners", maar in dit onderzoek is **geen enkele Italiaanse reseller of referentieklant gevonden**. Dat is opmerkelijk gezien de sterke positie van Powerproject in het VK, Duitsland en Scandinavië, en het is voor een nieuwe toetreder een relevant signaal: de Britse "planner-cultuur" waarop Powerproject drijft, bestaat in Italië niet.

**Prijzen (internationaal):** single-user abonnement vanaf **£880 per jaar** ([Software Finder](https://softwarefinder.com/project-management-software/powerproject), [PricingNow](https://pricingnow.com/question/powerproject-pricing/)); ITQlick noemt ~$2.500 single user, ~$20.000 voor 10 gebruikers, ~$180.000 voor 100 gebruikers ([ITQlick](https://www.itqlick.com/asta-powerproject/pricing)).

---

### 3.10 Algemene projectmanagementtools

Deze tools worden in Italië wél serieus gebruikt — maar voor **portfolio- en teamcoördinatie**, niet voor het contractuele `cronoprogramma`.

| Tool | Positie in Italië | Prijs |
|---|---|---|
| **Twproject** (Open Lab, Florence) | Italiaans enterprise-PM-pakket met interactieve Gantt, kosten- en timesheetbeheer; licenties per geactiveerde gebruiker, onbeperkt aantal projecten; cloud- en on-premise-varianten ([twproject.com/it](https://twproject.com/it/)) | prijzen op [twproject.com/it/prezzi](https://twproject.com/it/prezzi/) (niet in dit onderzoek uitgelezen) |
| **monday.com** | Sterk gemarket in Italië; veel gebruikt in studio's en dienstverlening | Basic $9, Standard $12, **Pro $19** per seat/maand (jaarbetaling, 18% korting); Enterprise op aanvraag; min. 10 seats in het getoonde voorbeeld ([monday.com/pricing](https://monday.com/pricing/)) |
| **Smartsheet, Wrike, Asana, ClickUp, Zoho Projects, Bitrix24, GanttPRO, TeamGantt** | Aanwezig via Capterra Italia en een dichte laag Italiaanstalige vergelijkingsartikelen; adoptie vooral buiten de klassieke bouw | Vergelijkbaar met monday.com; alle publiceren USD-prijzen met lokale conversie |
| **Jira + Gantt-plug-ins** | Vrijwel uitsluitend IT/software, niet bouw | — |

**Voordelen:** goedkoop, Italiaanstalig, meteen bruikbaar, sterk in samenwerking en rapportage.
**Nadelen die er in Italië toe doen:** geen echte CPM met float en logica; geen `computo metrico`, geen `prezzari`, geen SAL; de output voldoet niet aan de vormvereisten van een `cronoprogramma` in een publiek dossier; niet op MePA.

### 3.11 Open source

**ProjectLibre** (8,2 miljoen installaties wereldwijd, positioneert zich als "#1 alternatief voor Microsoft Project"), **GanttProject** en **OpenProject** worden in Italië gebruikt door studenten, ZZP'ers en budgetarme instanties. Ze zijn zichtbaar in Italiaanstalige downloadportalen (bijv. [it.ccm.net](https://it.ccm.net/download/scaricare-587-ganttproject)). Marktaandeel in omzet: nul. Marktaandeel in gebruikte zetels: niet verwaarloosbaar, en het is een reële concurrentiedruk op het onderste prijssegment.

### 3.12 Wat er níet is

- **AI-scheduling (ALICE Technologies, nPlan, Nodes & Links):** in dit onderzoek is **geen enkel bewijs** gevonden van toepassing door Italiaanse aannemers, inclusief Webuild. Dit is een leeg segment.
- **Deltek Open Plan / PM Compass, Safran, Sciforma (sinds feb 2025 onderdeel van Planview), InEight, Hexagon EcoSys, RIB iTWO/Candy, Spider Project:** geen aantoonbare Italiaanse partners, kantoren of referentieklanten gevonden. RIB is in Italië hooguit indirect zichtbaar via Schneider Electric Italia ([se.com/it](https://www.se.com/it/it/product-range/48127370-rib-4-0/)). Waar deze tools in Italië voorkomen, is dat vrijwel zeker via buitenlandse moederbedrijven of internationale EPC-contracten, niet via een lokaal kanaal.

---

## 4. Lokale bijzonderheden

### 4.1 De wettelijke basis: een document, geen bestandsformaat

Dit is de belangrijkste structurele eigenschap van de Italiaanse markt.

**Ontwerpfase — `cronoprogramma`.** Artikel 41 van D.Lgs. 36/2023 regelt de ontwerpniveaus en delegeert naar **Allegato I.7** welke documenten vereist zijn, inclusief het cronoprogramma voor beide ontwerpfasen ([Blumatica blog](https://blog.blumatica.it), [Codice Appalti](https://www.codiceappalti.it)). Artikel 22 bepaalt dat het uitvoeringsontwerp een tijdschema moet bevatten dat consistent is met dat van de haalbaarheidsstudie ([Normattiva](https://www.normattiva.it)). Artikel 30 omschrijft het als *"un diagramma che rappresenta graficamente, in forma chiaramente leggibile, tutte le fasi attuative dell'intervento"* — goedkeuring van het ontwerp, gunning, uitvoering, oplevering ([PuntoAppalti](https://www.puntoappalti.it)). Het vorige regime (D.P.R. 207/2010) kende dezelfde systematiek.

**Uitvoeringsfase — `programma esecutivo dettagliato dei lavori`.** Het `capitolato speciale d'appalto` verplicht de uitvoerder vóór aanvang een gedetailleerd uitvoeringsprogramma in te dienen. De voorstellen van de aannemer leiden tot een uitvoeringsprogramma dat **het oorspronkelijke ontwerp-cronoprogramma volledig vervangt** en dat de referentie wordt voor de `direttore dei lavori` ([Blumatica blog](https://blog.blumatica.it)). Artikel 111 legt de DL op te verifiëren dat de uitvoering de termijnen respecteert "indicati nel cronoprogramma allegato al progetto esecutivo e successivamente dettagliati nel programma di esecuzione dei lavori" ([Codice Appalti art. 111](https://www.codiceappalti.it)).

**Wat er níet in staat.** In dit onderzoek — meerdere zoekopdrachten in het Italiaans, inclusief gericht zoeken in `capitolati speciali`, ANAC-gerelateerde bronnen en documenten van RFI/Italferr/ANAS — is **geen Italiaans bestek gevonden dat een specifiek softwareformaat voorschrijft** voor de planning. Een bestek van de gemeente Bologna vereist bijvoorbeeld alleen dat het programma binnen 30 dagen na gunning aan de DL wordt voorgelegd, zonder formaatvereiste. Dit staat in scherp contrast met het VK (NEC/JCT met verplichte gelogde programma's), de Golfstaten en Noord-Amerika, waar `.xer`-levering met logica, float en baselines standaard contractueel is.

> **Waarschuwing bij deze bevinding.** Afwezigheid van bewijs is geen bewijs van afwezigheid. Grote opdrachtgevers als RFI, Italferr, ANAS en Terna kunnen in hun *technische bijlagen bij prekwalificaties* wel degelijk P6-levering eisen zonder dat dit in publiek doorzoekbare documenten opduikt — hun aanbestedingen lopen via afgeschermde portalen zoals [acquistionlinerfi.it](https://www.acquistionlinerfi.it). De sterke aanwezigheid van P6 bij Webuild's *tenderteam* (een "Bidding Planning Specialist — Primavera P6 Expert") suggereert dat P6 de facto verwacht wordt bij grote werken, ook zonder formele verplichting. **Beschouw dit als een hypothese die veldverificatie vereist.**

**Praktische consequentie:** de wettelijke ondergrens is een leesbaar grafisch schema. Daarom kan €111 per werkplek per jaar het overgrote deel van de Italiaanse `cronoprogramma`-behoefte bedienen, en daarom is de markt voor echte CPM-tools smal.

### 4.2 BIM-verplichting: de echte groeimotor

Sinds **1 januari 2025** moeten aanbestedende diensten BIM-methoden en -instrumenten toepassen bij nieuwbouw en ingrepen aan bestaande bouw **boven €2 miljoen** (art. 43 D.Lgs. 36/2023, drempel verhoogd van €1 mln naar €2 mln door correctiedecreet D.Lgs. 209/2024). Voor cultureel erfgoed geldt de Europese drempel van art. 14 ([Edilizia.com](https://www.edilizia.com/bim/normativa-bim-italia-scadenze-obblighi-e-software-da-usare/); zie ook [BibLus/ACCA](https://biblus.acca.it/nuovo-codice-appalti-il-bim-e-obbligatorio/) en [B1P Group](https://www.b1pgroup.com/allegato-i-9-bim/) die nog de oorspronkelijke €1 mln-drempel noemen).

De code eist **"piattaforme interoperabili e di formati aperti non proprietari"** — interoperabele platforms en open, niet-proprietary formaten. Aanbestedende diensten mogen functionele eisen en prestatieniveaus voorschrijven maar **geen merknamen** zonder technische rechtvaardiging.

**Dit is voor een open, IFC-gebaseerde planningstool het sterkste juridische argument in de hele Italiaanse markt.** De wet dwingt richting open formaten; SYNCHRO, P6 en de Italiaanse pakketten zijn allemaal proprietary. Relevante normen: **UNI 11337** (Italiaanse BIM-norm, inclusief competentie-eisen voor BIM-professionals) en **UNI EN ISO 19650**. Het `capitolato informativo` (informatiebestek), de `oGI` (offerta di gestione informativa) en `pGI` (piano di gestione informativa) zijn de contractuele instrumenten ([SPInApp / Servizio Contratti Pubblici](https://www.serviziocontrattipubblici.it/it/documentazione-e-linee-guida/bim/), [D3-Hub](https://www.d3-hub.com/it/bim-appalti-pubblici)).

Merk op dat 4D/tijd **niet expliciet** verplicht is binnen Allegato I.9. De tijddimensie lift mee, maar wordt niet afgedwongen.

### 4.3 Inkoop via Consip/MePA — de poortwachter

Alle Italiaanse overheidsinstanties zijn wettelijk verplicht IT-goederen en -diensten in te kopen **uitsluitend via Consip S.p.A. of aggregerende instanties** (art. 1, comma 512, Legge 208/2015). In de praktijk betekent dit het elektronische marktplein **MePA op [acquistinretepa.it](https://www.acquistinretepa.it)**.

Uit de determina van Città Metropolitana di Firenze blijkt de mechaniek precies: de instantie stelt vast dat er geen Consip-conventie actief is, gaat dan naar MePA, en plaatst een **ODA (ordine diretto di acquisto)** bij de leverancier die op MePA staat met de gevraagde producten en MePA-productcodes (`ACC_P01_2`, `ACC_A01.a`, `ACC_A01.a_2`). Onder de drempel van **€140.000** mag dit als `affidamento diretto` zonder meerdere offertes (art. 50, co. 1 lett. b, D.Lgs. 36/2023).

**Voor een leverancier is de conclusie eenduidig: zonder MePA-registratie is de gehele Italiaanse publieke sector onbereikbaar.** ACCA en TeamSystem zitten er beide op, ACCA rechtstreeks, TeamSystem/STR ook via resellers als DigiTecno en Aldebra.

Een tweede consequentie: **alle betaalde prijzen zijn openbaar.** Dat maakt Italiaanse prijsstelling ongewoon transparant voor wie weet waar te zoeken — en het maakt prijsdifferentiatie tussen overheidsklanten lastig.

### 4.4 Prijsniveau en valuta-effecten

- Italiaanse pakketten worden in **euro** geprijsd en zijn voor het brede segment extreem goedkoop: €252 voor een PriMus-licentie, €100–199 per jaar onderhoud inclusief planningsmodule.
- Internationale pakketten (Oracle, Bentley, Trimble, Elecosoft) hanteren **USD/GBP-lijstprijzen**. Bij een sterkere dollar wordt P6 in Italië duurder zonder dat de leverancier iets doet — een reëel risico voor de al smalle high-end markt. Microsoft prijst wél in euro voor Italië.
- **Btw (IVA) 22%** komt bovenop alle genoemde prijzen; de meeste Italiaanse prijsopgaven zijn "+ IVA".
- **Kortingen zijn substantieel bij volume in het lokale segment:** ACCA gaf Roma Capitale €252/installatie bij 35 stuks, tegen €699 lijstprijs — **−64%**. In het high-end segment zag ik géén Italiaanse korting: Genua betaalde ~€3.452 per P6-seat, ongeveer de internationale lijstprijs. Oracle's officiële volumekortingen beginnen pas bij 101 gebruikers (−10%) en lopen tot −25% boven 1.000 gebruikers — drempels die vrijwel geen Italiaanse organisatie haalt behalve Webuild en de allergrootste EPC's.
- ACCA heeft een gerichte starterskorting: **30% voor pas afgestudeerden/starters** op software boven €499 ([ACCA](https://www.acca.it/offerte-promozioni)). Dat is een bewuste lock-in-strategie richting het begin van de loopbaan.

### 4.5 Training, consultancy en beroepscultuur

**Prijzen voor training en consultancy (harde cijfers):**

| Dienst | Prijs | Bron |
|---|---|---|
| ACCA "PriMus advanced", 3 klassen × 16 u, tot 17 deelnemers/klas, in-house | **€7.200 excl. IVA** + €2.000 reiskosten (≈ €141/deelnemer) | [ACCA → Roma Capitale (PDF)](https://www.comune.roma.it/web-resources/cms/documents/ACCA.Offerta_Corso_PriMus_Romacapitale.pdf) |
| STR Vision CPM gebruiksconsultancy | **€95,00 per uur**, max. 24 uur | [CAL S.p.A. (PDF)](https://www.calspa.it/wp-content/uploads/2020-02-13_det-affidamento_str.pdf) |

**Opleidingsaanbod P6/MSP.** Er is een levendig maar prijsintransparant trainingsaanbod: **Bureau Veritas Italia** (Oracle Primavera P6 Professional voor planners, project controllers en managers), **Alfa Sistemi** (40 uur: 24 u basis + 16 u gevorderd), **Dirextra Alta Formazione** (Corso Planner Primavera P6, 20–40 uur, klassikaal en online), **Eureka Service** (P6-BASE en P6-FULL, 3 dagen, workshopvorm met projectsimulatie, behandelt WBS, netwerktechnieken, CPM, resources, kosten, S-curves, earned value en multi-project), **NovaNext** (Oracle-curriculum D95007GC10). **Geen van deze aanbieders publiceert prijzen** — een terugkerend patroon in Italië.

**Academische en postacademische opleidingen:** Politecnico di Milano (*Master in Project Management delle Opere Strutturali e Infrastrutturali*), SDA Bocconi (*Opere pubbliche e infrastrutture: il Project Manager/RUP*), LUISS Business School, Università Telematica Pegaso.

**Beroepsverenigingen en certificering:**
- **AICE — Associazione Italiana di Ingegneria Economica** ([aice-it.org](https://www.aice-it.org)): de Italiaanse tak van de cost-engineering-/Total Cost Management-discipline, met certificering geaccrediteerd door **ICEC** (International Cost Engineering Council) op twee niveaus, Practitioner en Expert. Dit is de dichtstbijzijnde Italiaanse equivalent van AACE.
- **ISIPM — Istituto Italiano di Project Management** ([isipm.org](https://www.isipm.org)): opgericht 2005, certificering op Base- en Advanced-niveau, uitgelijnd op **ISO 21502**.
- **ANIMP** (industriële plantbouw, [animpacademy.it](https://animpacademy.it/formazione/)): IPMA-certificerende instantie, sterk in de EPC-/plantwereld.
- Certificeringen van PMI, IPMA en ISIPM geven vrijstelling van het schriftelijke examen bij de Italiaanse Project Manager-certificering.

**Culturele observatie.** De Italiaanse planningscultuur is **kostengedreven, niet tijdgedreven**. De dominante beroepsdiscipline is `ingegneria economica`/`computo metrico` — de kostenraming. De planning is daaraan ondergeschikt. Dat verklaart waarom AICE (cost engineering) een sterkere institutionele positie heeft dan enige planningsvereniging, waarom PriMus (een calculatiepakket) de cronoprogramma-markt bezit, en waarom er in Italië geen equivalent bestaat van de Britse "planner" als zelfstandig beroep buiten de grote EPC's.

**Salarissen planners (indicatief):**

| Rol | Gemiddeld | Bereik | Bron |
|---|---|---|---|
| Project Planner | **€41.300/jaar** | €33.925 – €57.400 | [Glassdoor IT](https://www.glassdoor.it/Stipendi/project-planner-stipendio-SRCH_KO0,15.htm) |
| Project Planner | €37.649/jaar | — | [Jooble IT](https://it.jooble.org/salary/project-planner) |
| Planner (algemeen) | €37.000/jaar | tot €51.400 | [Glassdoor IT](https://www.glassdoor.it/Stipendi/planner-stipendio-SRCH_KO0,7.htm) |
| Planner | €35.423/jaar | — | [Indeed IT](https://it.indeed.com/career/planner/salaries) |

Ter kalibratie: een P6-seat van ~€3.452 kost ongeveer **8–9% van een jaarsalaris** van een Italiaanse planner. Dat is hoog naar Italiaanse maatstaven en verklaart de terughoudendheid buiten de grote spelers.

### 4.6 Excel

Excel is in Italië geen randverschijnsel maar het feitelijke basisgereedschap. Het Italiaanstalige web staat vol met gratis `cronoprogramma`-Excel-sjablonen (Gantt, SAL-voortgang, materiaalbeheer, kostenopvolging), en Italiaanse zoekopdrachten naar deze sjablonen leveren honderdduizenden resultaten op.

Eén veelgeciteerde statistiek verdient een uitdrukkelijke waarschuwing:

> **[LAGE BETROUWBAARHEID]** Een blog van SaaS-aanbieder *Edilizia in Cloud* claimt dat uit een ANCE-enquête onder 2.400 Italiaanse MKB-bouwbedrijven (2026) blijkt dat **71% Excel als primair instrument gebruikt voor `gestione delle commesse`**, 58% voor aanwezigheidsregistratie en 64% voor interne boekhouding ([ediliziaincloud.com](https://www.ediliziaincloud.com/blog/software-gestionale-vs-excel/)). **Ik heb deze enquête niet kunnen terugvinden op de ANCE-website of in onafhankelijke bronnen.** Het is een marketingblog van een partij met direct belang bij dit cijfer. Behandel het als niet-geverifieerd. De richting is vrijwel zeker juist — de precieze percentages zijn dat niet.

**Wat wel vaststaat:** met 827.262 bouwondernemingen (dec 2024) waarvan de overgrote meerderheid micro-ondernemingen, en met een wettelijke eis die niet verder gaat dan een leesbaar grafisch schema, is Excel voor het merendeel van de Italiaanse bouwprojecten technisch en juridisch toereikend. Dat is de belangrijkste concurrent van elk planningspakket in dit land.

### 4.7 Piraterij en licentiehygiëne

Italië heeft historisch een van de hoogste percentages ongelicentieerde software in West-Europa:

| Jaar | Percentage ongelicentieerd | Bron |
|---|---|---|
| 2018 | **43%** (−2 ppt t.o.v. 2016; hoger dan alle West-Europese landen behalve Griekenland, Cyprus en IJsland) | [ImpresaCity](https://www.impresacity.it/news/19950/scende-l-uso-di-software-senza-licenza-in-italia-.html), [BitMAT](https://www.bitmat.it/news/global-software-survey-italia-43-dei-software-non-licenza-adeguata/) |
| 2016 | 45% | idem |
| eerdere BSA-studies | 47%, 49% (commerciële waarde >€1,4 mrd) | [Punto Informatico](https://www.punto-informatico.it/fintech/bsa-cala-la-pirateria-sul-software/), [BitCity](https://www.bitcity.it/news/22236/bsa-allarma-il-49-del-software-in-italia-e-piratato.html) |

De BSA Global Software Survey 2018 ondervroeg ~23.000 gebruikers, medewerkers en CIO's in 110+ landen. Volgens die studie noemde 54% van de ondervraagde CIO's beveiligingsrisico's als voornaamste reden om ongelicentieerde software te vermijden, 43% juridische risico's. **BSA heeft na 2018 geen vergelijkbare landenstudie meer gepubliceerd**, dus 43% is het meest recente harde cijfer.

**Hoe leveranciers reageren.** ACCA levert PriMus met een **hardwaresleutel (dongle)**; bij meerdere installaties kan een `key server` op één pc worden gebruikt. Deze keuze — ongebruikelijk in 2026 — is alleen te verklaren vanuit het Italiaanse piraterijniveau. Voor een moderne SaaS- of open-sourcetool betekent dit twee dingen: (a) een deel van de "markt" betaalt structureel niets, wat de betaalbare markt kleiner maakt dan de gebruikersmarkt; (b) een licentiemodel dat niet op hardware leunt heeft in Italië een reëel gebruiksgemakvoordeel, omdat dongles door professionals actief worden gehaat.

### 4.8 Taal

Italiaanstalige UI is voor het brede professionele en publieke segment **geen voorkeur maar een voorwaarde**. Alle succesvolle lokale pakketten (PriMus, STR Vision/TeamSystem, Blumatica, Namirial, MyAedes, Twproject) zijn Italiaanstalig. Microsoft Project is Italiaanstalig. Oracle biedt Italiaanse marketingpagina's maar de P6-praktijk is Engelstalig — precies daarom blijft P6 beperkt tot de internationaal georiënteerde bovenlaag.

Voor documenten geldt hetzelfde: uitvoer moet de Italiaanse terminologie hanteren (`cronoprogramma`, `programma esecutivo`, `SAL`, `WBS`, `computo metrico`, `elenco prezzi`, `direzione lavori`) om in een publiek dossier bruikbaar te zijn.

### 4.9 Lokale spelers en resellers — overzicht

| Partij | Rol |
|---|---|
| **ACCA software S.p.A.** (Bagnoli Irpino, AV) | Eigen producten (PriMus, PriMus-K, Edificius, CerTus, EdiLus, TerMus, Impresus, usBIM); direct op MePA; eigen geaccrediteerd trainersnetwerk (FAA) |
| **TeamSystem S.p.A.** (Pesaro) | Eigenaar TeamSystem Construction (ex STR Vision); **tevens Oracle Primavera-reseller in Italië**; >€1 mrd omzet, 550+ partners |
| **Blumatica** (Salerno) | Kronoplan en aanverwante Italiaanse pakketten |
| **Namirial S.p.A.** (Senigallia, AN) | Edilizia-divisie ([edilizianamirial.it](https://www.edilizianamirial.it)) met REGOLO (computo metrico, contabilità, cronoprogramma); omzet Namirial S.p.A. €74,2 mln, EBITDA €19,2 mln, ~426 medewerkers (2024) ([Aziende.it](https://www.aziende.it/namirial-s-p-a)) |
| **Alfa Sistemi** (Udine/Milaan/Rome) | Oracle Primavera P6-implementatie, integratie en training; ISO 9001 |
| **Horsa** | Oracle-partner, o.a. Primavera Reader |
| **EPM Consulting** | P6 PPM-consultancy |
| **Comunico S.r.l.** | Nationale distributeur Trimble TILOS voor Italië en Italiaans Zwitserland; support, training, consultancy |
| **S2plan** (opgericht 2026) | Project control/planning/cost control ingenieursbureau voor civiele, plant- en infrastructuurwerken; MS Project + P6 |
| **MESLI Consulting** | Primavera P6-licentieverkoop |
| **DigiTecno S.n.c., Aldebra S.p.A.** | MePA-resellers van STR Vision CPM |
| **Bureau Veritas Italia, Dirextra, Eureka Service, NovaNext** | Trainingsaanbieders P6/PM |
| **Open Lab** (Florence) | Twproject — Italiaans enterprise-PM-pakket |

### 4.10 Vraagkant: wie plant er in Italië

| Segment | Wie | Wat ze gebruiken |
|---|---|---|
| **Grote aannemers / general contractors** | Webuild (ex Salini Impregilo), Pizzarotti, Rizzani de Eccher, ICM, Ghella | Primavera P6 (tender + uitvoering), MS Project, incidenteel SYNCHRO/TILOS |
| **EPC / plantbouw** | Saipem, Maire Tecnimont, Danieli, Fincantieri, Ansaldo | Primavera P6, project-control-suites |
| **Infra-opdrachtgevers** | RFI, Italferr, ANAS, Terna, Snam, Autostrade, havenautoriteiten, CAL | P6 (Genua kocht P6 EPPM), SYNCHRO 4D (Italferr), STR Vision CPM (CAL) |
| **Ingenieursbureaus** | OICE-leden (€4,63 mrd productie 2025, 27.929 medewerkers) | MS Project, P6 bij de grotere; PriMus/STR voor computo + cronoprogramma |
| **Publieke administratie** | Gemeenten, provincies, città metropolitane, ministeries | PriMus + POWER PACK (Firenze, Bologna, Roma Capitale), STR Vision, incidenteel P6 (Genua) |
| **MKB-aannemers en professionals** | 827.262 bouwondernemingen; 172.916 ingenieurs+architecten; geometri | Excel, PriMus, Blumatica, Namirial |

---

## 5. Beoordeling per lokaal/nicheproduct — voor- en nadelen samengevat

| Pakket | Sterk | Zwak | Bewijsbasis |
|---|---|---|---|
| **PriMus-K (ACCA)** | Laagste TCO voor een compliant cronoprogramma (€111/werkplek/jaar); geïntegreerd met computo/prezzari/SAL; wetgeving-gedreven updates; op MePA; 4,3/5 op Capterra IT | Geen serieuze CPM (float, levelling, baselines ontbreken op P6-niveau); steile leercurve; moeizame data-invoer; dongle; gesloten ecosysteem; geen mobiel/web | Capterra IT (4 reviews), professionearchitetto.it forum, ACCA-documentatie, 3 overheidsdetermines |
| **STR Vision CPM / TeamSystem Construction** | Sterk voor gestructureerde aannemers; BIM 5D; SAL/SIL; congruità manodopera; achter een €1 mrd-groep; meertalig/multi-valuta | Dichte complexe UI (2–3 weken leercurve); desktop-only; geen prijstransparantie; duur voor kleine bedrijven; consultancy vaak nodig (€95/u) | CAL-determina, CantiereOnline, CantiereHub (concurrentiebron), TeamSystem-documentatie |
| **Blumatica Kronoplan** | Goedkoop; expliciet op D.Lgs. 36/2023; aparte edities voor ontwerper en aannemer | CPM/PERT niet expliciet; geen prijstransparantie; klein ecosysteem; geen interoperabiliteit | Blumatica-landingpagina, Edilportale-productvermelding |
| **Namirial REGOLO** | Onderdeel van een €74 mln-softwarehuis; drag-and-drop; Italiaanse standaarden | Planning is een bijfunctie van computo; weinig zichtbaarheid als planningstool | edilizianamirial.it, Aziende.it |
| **Twproject (Open Lab)** | Italiaans, enterprise-klasse, interactieve Gantt, kosten en timesheets, cloud én on-premise | Geen bouwspecifieke functionaliteit (geen computo, prezzari, SAL); geen contractuele cronoprogramma-uitvoer | twproject.com/it, Capterra IT |
| **Trimble TILOS** | Beste keuze voor lineaire werken; echte CPM plus positie-/productiebeperkingen; echte Italiaanse distributeur met Italiaanse training | Zeer smalle niche; kleine installed base; tegenstrijdige prijsinformatie; aanvulling, geen vervanging | Comunico S.r.l., Trimble-documentatie, Udemy-cursus IT |
| **MyAedes** | Cronoprogramma met export naar Excel/PDF/PNG | Zeer klein; nauwelijks documentatie beschikbaar | Zoekresultaatvermelding; **[LAGE BETROUWBAARHEID]** — niet direct verifieerbaar (site gaf lege respons) |

---

## 6. Implicaties voor een open, IFC-gebaseerde planningstool

Kort, omdat dit rapport primair beschrijvend is — maar de bevindingen wijzen sterk in één richting.

1. **De juridische wind staat gunstig.** Art. 43 D.Lgs. 36/2023 eist "piattaforme interoperabili e di formati aperti non proprietari" en verbiedt merknamen zonder technische rechtvaardiging. Alle huidige marktleiders zijn proprietary. Een IFC 4.3-native tool kan hier expliciet op sturen.
2. **Prijszetting moet zich richten op het Italiaanse anker van ~€100–250 per werkplek per jaar**, niet op het P6-anker van €3.000+. De publieke determines maken dit anker keihard controleerbaar.
3. **Zonder MePA-registratie is de publieke sector onbereikbaar.** Dat is een concrete, afgebakende go-to-market-actie.
4. **Italiaanse UI is een voorwaarde, geen feature.** Inclusief correcte terminologie in de uitvoer.
5. **De grootste inhoudelijke kans ligt tussen PriMus-K en P6 in:** echte CPM (logica, float, kritiek pad, baselines) tegen een Italiaans prijspunt, met uitvoer die aan de vormvereisten van het `cronoprogramma` en `programma esecutivo` voldoet. Dat gat is momenteel leeg.
6. **De grootste risico's:** Excel als gratis en juridisch toereikend alternatief; de gewoonte om planning bij de calculatiesoftware te kopen (kanaalmacht van ACCA en TeamSystem); een piraterijcultuur die de betaalbare markt verkleint; en het feit dat 70% van de Italiaanse ingenieurs ouder dan 45 is, wat de bereidheid tot gereedschapswissel drukt.

---

## 7. Openstaande vragen en beperkingen van dit onderzoek

Eerlijkheidshalve, wat ik **niet** heb kunnen vaststellen:

- **Of RFI, Italferr, ANAS of Terna in hun prekwalificatie- of contractbijlagen daadwerkelijk P6/XER-levering eisen.** Hun aanbestedingen lopen via afgeschermde portalen. Dit is de belangrijkste openstaande vraag en vergt directe navraag of toegang tot een concreet aanbestedingsdossier.
- **Exacte gebruikersaantallen per pakket.** ACCA en TeamSystem publiceren geen installed-base-cijfers voor hun bouwlijnen; mijn seat-schattingen in §2.4 zijn afgeleid, niet gemeten.
- **De omzet van TeamSystem Construction als divisie.** Alleen groepscijfers zijn openbaar.
- **Actuele lijstprijzen van STR Vision CPM en Blumatica Kronoplan.** Beide werken uitsluitend met offertes op maat; mijn cijfers komen uit één overheidscontract (2020) en uit blogs met commercieel belang.
- **Een recenter piraterijcijfer dan BSA 2018 (43%).**
- **De ANCE-Excel-enquête (71%)** — niet terug te vinden bij de vermeende bron.
- **Trainingsprijzen voor P6/MS Project in Italië.** Geen enkele van de zes gevonden aanbieders publiceert tarieven.

Aanvullend onderzoek zou zich het beste richten op: (a) een concreet RFI/Italferr-aanbestedingsdossier, (b) MePA-catalogusgegevens voor de productcodes van TeamSystem Construction, en (c) gesprekken met een handvol Italiaanse planners bij Webuild/Saipem over de feitelijke gereedschapsketen.

---

## 8. Bronnen

**Wetgeving en normen**
- [Normattiva — D.Lgs. 31 marzo 2023, n. 36 (Codice dei contratti pubblici)](https://www.normattiva.it)
- [Codice Appalti — art. 111 en Allegato I.7](https://www.codiceappalti.it)
- [PuntoAppalti — art. 30, cronoprogramma](https://www.puntoappalti.it)
- [Blumatica blog — cronoprogramma vs. programma esecutivo](https://blog.blumatica.it)
- [BibLus/ACCA — BIM verplicht onder het nieuwe Codice Appalti](https://biblus.acca.it/nuovo-codice-appalti-il-bim-e-obbligatorio/)
- [Edilizia.com — BIM-normering, deadlines en drempels](https://www.edilizia.com/bim/normativa-bim-italia-scadenze-obblighi-e-software-da-usare/)
- [B1P Group — Allegato I.9 BIM](https://www.b1pgroup.com/allegato-i-9-bim/)
- [Servizio Contratti Pubblici — BIM-documentatie en richtlijnen](https://www.serviziocontrattipubblici.it/it/documentazione-e-linee-guida/bim/)
- [D3-Hub — BIM in publieke aanbestedingen, UNI 11337 / ISO 19650](https://www.d3-hub.com/it/bim-appalti-pubblici)
- [BIM Idea — UNI 11337](https://www.bimidea.it/uni11337/)

**Overheidsaankopen (primaire prijsbronnen)**
- [Città Metropolitana di Firenze — DD 1897 van 12/09/2024, 2 PriMus-licenties + 4× POWER PACK (PDF)](https://www.cittametropolitana.fi.it/wp-content/uploads/DD.-1897-del-12-09-2024.pdf)
- [Comune di Bologna — determina 3× PriMus POWER PACK 3 jaar, CIG BA594FF33B](https://atti9.comune.bologna.it/atti/determine.nsf/0/9C9DEF5B1E2E527DC1258DAF005B692B)
- [Comune di Bologna — determina 1 PriMus-licentie via MePA](http://atti9.comune.bologna.it/atti/determine.nsf/0/C05B59F6F0E66991C1258A2E00498382)
- [Comune di Genova — DD 2021-126.0.99, 3× Primavera P6 EPPM + assistentie, €10.356](https://www2.comune.genova.it/content/dd-2021-126099-assegnazione-ai-sensi-dell%E2%80%99art-36-comma-2-lettera-del-dlgs-n-5020216-tramite-)
- [Concessioni Autostradali Lombarde S.p.A. — determina STR Vision CPM, 13/02/2020 (PDF)](https://www.calspa.it/wp-content/uploads/2020-02-13_det-affidamento_str.pdf)
- [ACCA software — offerte PriMus + cursus aan Roma Capitale, 17/10/2024 (PDF)](https://www.comune.roma.it/web-resources/cms/documents/ACCA.Offerta_Corso_PriMus_Romacapitale.pdf)
- [Comune di Civitanova Marche — PriMus-licenties 2024](https://www.comune.civitanova.mc.it/amministrazione-trasparente/lotti/sia-acca-software-licenze-primus-2024/)
- [Comune di Savona — verlenging softwareassistentie TeamSystem 2024](https://documentale.comune.savona.it/AttiVisualizzatore/download/determina/5345712?fId=5345729&sbustato=true)
- [Consip / MePA — acquistinretepa.it](https://www.acquistinretepa.it)

**Leveranciers en prijzen**
- [Oracle Italia — Primavera P6](https://www.oracle.com/it/construction-engineering/primavera-p6/)
- [Oracle Primavera Pricing, G-Cloud 14 v1.1, mei 2025 (PDF)](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/717959/423103118187025-pricing-document-2025-06-25-1321.pdf)
- [Akim Engineering — Oracle Primavera prijslijst (perpetual)](https://www.akimeng.com/oracle-primavera-price-list.html)
- [Taradigm — Oracle Primavera Cloud kosten](https://www.taradigm.com/how-much-does-primavera-cloud-cost/)
- [Microsoft Italië — Planner/Project abonnementen en prijzen](https://www.microsoft.com/it-it/microsoft-365/planner/microsoft-planner-plans-and-pricing)
- [Microsoft Italië — Project-versies vergelijken (perpetual)](https://www.microsoft.com/it-it/microsoft-365/project/compare-microsoft-project-management-software)
- [ACCA — PriMus-K, software cronoprogramma lavori](https://www.acca.it/software-cronoprogramma-lavori)
- [ACCA — PriMus computo e contabilità](https://www.acca.it/software-contabilita-lavori)
- [ACCA — aanbiedingen en promoties](https://www.acca.it/offerte-promozioni)
- [ACCA Listino Prezzi maart 2024 rev.01 (PDF via Tecno3D)](https://tecno3d.it/wp-content/uploads/2024/06/Listino_Prezzi-MAR-24.pdf)
- [Area Sosta — "Quanto costa il programma PriMus"](https://areasosta.com/faq/quanto-costa-il-programma-primus)
- [TechneTeam — PriMus Power Pack jaarabonnement](https://www.techneteam.it/software/primus-power-pack-abbonamento-annuale/)
- [TeamSystem Construction — hoofdpagina](https://www.teamsystem.com/construction/)
- [TeamSystem — STR Vision wordt TeamSystem Construction](https://www.teamsystem.com/construction/str-vision-admin/)
- [TeamSystem — prijzen TeamSystem Construction](https://www.teamsystem.com/construction/prezzi-teamsystem-construction/)
- [TeamSystem — Oracle Primavera](https://www.teamsystem.com/construction/oracle-primavera/)
- [STR Vision CPM tutorial (PDF)](https://cpm.teamsystemconstruction.com/Downloads/STRVisionCPM_Tutorial_it.pdf)
- [Blumatica Kronoplan](https://www.blumatica.it/page/landingkronoplan/)
- [Edilportale — Blumatica Kronoplan productfiche](https://www.edilportale.com/prodotti/blumatica/avanzamento-lavori-cronoprogramma/blumatica-kronoplan-progetto-e-direzione-lavori_369773.html)
- [Namirial Edilizia — REGOLO](https://www.edilizianamirial.it/software-computo-metrico-contabilita-lavori-regolo/)
- [Twproject (Open Lab)](https://twproject.com/it/) · [prijzen](https://twproject.com/it/prezzi/)
- [monday.com — prijzen](https://monday.com/pricing/)
- [Bentley Italia — SYNCHRO](https://it.bentley.com/software/synchro/)
- [ToolsTrunk — SYNCHRO 4D prijs](https://thetoolstrunk.com/how-much-is-synchro-4d/) · [PricingNow — SYNCHRO](https://pricingnow.com/question/synchro-pricing/) · [TrustRadius — SYNCHRO prijzen](https://www.trustradius.com/products/bentley-systems-synchro/pricing)
- [Software Connect — Trimble TILOS](https://softwareconnect.com/reviews/trimble-tilos/) · [Software Finder — TILOS](https://softwarefinder.com/project-management-software/tilos) · [PricingNow — TILOS](https://pricingnow.com/question/tilos-pricing/)
- [Software Finder — Asta Powerproject](https://softwarefinder.com/project-management-software/powerproject) · [ITQlick — Asta Powerproject](https://www.itqlick.com/asta-powerproject/pricing) · [PricingNow — Powerproject](https://pricingnow.com/question/powerproject-pricing/)
- [ProjectLibre desktop](https://www.projectlibre.com/projectlibre-desktop/) · [GanttProject via CCM Italia](https://it.ccm.net/download/scaricare-587-ganttproject)
- [Schneider Electric Italia — RIB 4.0](https://www.se.com/it/it/product-range/48127370-rib-4-0/)

**Resellers, consultancy en training**
- [Alfa Sistemi — Oracle Primavera P6](https://www.alfasistemi.net/it/software/oracle-primavera-p6/) · [P6-cursus basis + gevorderd](https://www.alfasistemi.net/it/corso/corso-oracle-primavera-p6-base-e-avanzato/)
- [Horsa — Primavera Reader](https://www.horsa.com/it/it/sp/primavera-reader)
- [EPM Consulting](https://epmconsulting.org)
- [S2plan — project control, planning, cost control](https://www.s2plan.it/)
- [MESLI Consulting — verkoop P6-licenties](https://www.mesli-consulting.com/our-activities/oracle-solutions/sale-of-primavera-p6-licenses/)
- [Eureka Service — cursus P6](https://www.eurekaservice.eu/index.php/formazione/corsi-pm-fondamenti/pl-p6/)
- [Bureau Veritas Italia — Oracle Primavera P6 Professional](https://www.bureauveritas.it)
- [AICE — Associazione Italiana di Ingegneria Economica](https://www.aice-it.org)
- [ISIPM — Istituto Italiano di Project Management](https://www.isipm.org)
- [ANIMP Academy — opleidingen](https://animpacademy.it/formazione/)

**Markt- en sectorcijfers**
- [Edilportale — 9e OICE-rapport over BIM-aanbestedingen 2025](https://www.edilportale.com/news/2026/04/mercati/report-oice-su-appalti-bim-e-ia-nel-2025_109944_13.html)
- [Lavoripubblici.it — Gare BIM 2025](https://lavoripubblici.it/news/gare-bim-2025-report-oice-crescita-digitalizzazione-ia-37838)
- [OICE — de markt voor ingenieurs- en architectendiensten](https://www.oice.it/234334/-il-mercato) · [jaarlijkse OICE/CER-enquête](https://www.oice.it/916272/presentata-la-rilevazione-annuale-oice-cer-11-3-produzione-2024)
- [Edilportale/ANCE — bouwinvesteringen +5,6% in 2026](https://www.edilportale.com/news/2026/01/mercati/ance-investimenti-costruzioni-56-nel-2026_108743_13.html)
- [ANCE — Osservatorio congiunturale 2026](https://ance.it/2026/01/osservatorio-congiunturale-sullindustria-delle-costruzioni-2026/) · [Slides Osservatorio 2025 (PDF)](https://ance.it/wp-content/uploads/allegati/20250128_Slide_Osservatorio_Ance_2025.pdf)
- [Federcostruzioni — Rapporto 2024 (PDF)](https://www.federcostruzioni.it/wp-content/uploads/2025/10/Rapporto-Federcostruzioni-2024.pdf) · [Industria Italiana — 156.000 extra werkenden](https://www.industriaitaliana.it/federcostruzioni-2024-156mila-occupati-produzione/)
- [Edilnet — aantal bouwondernemingen december 2024](https://blog.edilnet.it/news-sempre-meno-imprese-edili-italiane-nelle-costruzioni-chi-sta-conquistando-il-settore/)
- [Ingenio-web — RFI en de €22 mrd PNRR-spoorinvesteringen](https://www.ingenio-web.it/articoli/infrastrutture-ferroviarie-i-grandi-interventi-previsti-da-rfi-grazie-ai-22-mld-del-pnrr/)
- [FS Italiane — PNRR-investeringen (PDF)](https://www.fsitaliane.it/content/dam/fsitaliane/Documents/media/comunicati-stampa/2024/dicembre/03_nota_stampa_PNRR.pdf) · [FS News — balans 2025](https://www.fsnews.it/it/focus-on/infrastrutture/2026/4/7/gruppo-fs-bilancio-2025-cantieri-pnrr-investimenti.html)
- [Confindustria — stand van zaken PNRR per maatregel](https://www.confindustria.it/pubblicazioni/lo-stato-di-avanzamento-del-pnrr-misura-per-misura/) · [OpenPNRR — spoorwegen](https://openpnrr.it/tema/ferrovie/)
- [Bentley — Italferr Digital Construction Site 4.0](https://blog.bentley.com/software/yii-project-profile-italferr-builds-italys-first-strategic-digital-site-with-synchro/) · [Bentley YII projectfiche](https://yii.bentley.com/project/digital-construction-site-4-0-innovation-and-monitoring-of-work-progress/)
- [Webuild — resultaten H1 2025](https://webuildgroup.com/it/media/comunicati-stampa/webuild-risultati-al-30-giugno-2025/) · [9M 2025](https://webuildgroup.com/it/media/comunicati-stampa/informazioni-aggiuntive-relative-ai-primi-9-mesi-del-2025/) · [Milano Finanza — recordorders](https://milanofinanza.it/news/webuild-ordini-record) · [Il Giornale d'Italia](https://ilgiornaleditalia.it/news/economia/749544/webuild-acquisiti-a-9-3-miliardi)
- [ANSA — 172.916 ingenieurs en architecten bij Inarcassa (2025)](https://www.ansa.it/sito/notizie/economia/real_estate/2026/04/29/inarcassa-172.916-ingegneri-e-architetti-iscritti-nel-2025) · [ANSA — >250.000 ingenieurs](https://www.ansa.it/sito/notizie/ordini_professionali/2025/02/06/oltre-250.000-ingegneri)
- [Aziende.it — ACCA software S.p.A.](https://www.aziende.it/acca-software-s-p-a) · [FatturatoItalia — ACCA](https://fatturatoitalia.it/acca-software-spa-01883740647/)
- [Aziende.it — Namirial S.p.A.](https://www.aziende.it/namirial-s-p-a) · [FatturatoItalia — Namirial](https://www.fatturatoitalia.it/namirial-spa-02046570426)
- [Data Manager — TeamSystem bereikt €1 mrd omzet in 2024](https://www.datamanager.it/2025/05/teamsystem-risultati-2024-raggiunto-il-miliardo-di-fatturato-con-oltre-25-milioni-di-clienti/) · [TeamSystem persbericht resultaten 2024 (PDF)](https://www.teamsystem.com/media/files/1571_CS_TeamSystem_Risultati2024.pdf) · [Aziende.it — TeamSystem](https://www.aziende.it/teamsystem-s-p-a)
- [Market Research Future — Italy Project Portfolio Management Software Market](https://www.marketresearchfuture.com/reports/italy-project-portfolio-management-software-market-61336)
- [Grand View Research — Italy project management software outlook](https://www.grandviewresearch.com/horizon/outlook/project-management-software-market/italy)
- [Mordor Intelligence — PM software systems market](https://www.mordorintelligence.com/industry-reports/project-management-software-systems-market) · [Research Nester](https://www.researchnester.com/reports/project-management-software-market/4176) · [MarketIntelo — construction scheduling software market](https://marketintelo.com/report/construction-scheduling-software-market)

**Reviews, fora en gebruikersoordelen**
- [Capterra Italia — PriMus (4,3/5)](https://www.capterra.it/software/90588/primus)
- [Professione Architetto — forumdiscussie over PriMus/TerMus](https://www.professionearchitetto.it/bacheca/info/440918/SOFTWARE)
- [CantiereOnline — review TeamSystem CPM](https://www.cantiereonline.it/software/teamsystem_cpm)
- [CantiereHub — alternatieven voor STR Vision](https://cantierehub.it/blog/alternativa-str-vision-software-cantieri) — *concurrentiebron, lees met voorbehoud*
- [Supalabs — PriMus vs STR Vision vs Edilius](https://supalabs.co/it/blog/primus-vs-str-vision-vs-edilius-confronto) — *SEO-blog, lage betrouwbaarheid*
- [G2 Italia — STR Vision CPM reviews](https://www.g2.com/it/products/str-vision-cpm/reviews)
- [Capterra Italia — Gantt-software directory](https://www.capterra.it/directory/31582/gantt-chart/software)

**Arbeidsmarkt**
- [LinkedIn Italië — vacatures Project Planner Primavera P6](https://it.linkedin.com/jobs/project-planner-primavera-p6-offerte-di-lavoro) · [vacatures Primavera P6](https://it.linkedin.com/jobs/primavera-p6-offerte-di-lavoro)
- [LinkedIn — Planner bij Webuild](https://it.linkedin.com/jobs/view/planner-at-webuild-4438080587) · [Jooble — Webuild Bidding Planning Specialist P6](https://it.jooble.org/jdp/3208170616099403747)
- [LinkedIn — Saipem Project Control Manager](https://it.linkedin.com/jobs/view/project-control-manager-progetto-florentia-at-saipem-4384872609)
- [Glassdoor Italië — salaris Project Planner](https://www.glassdoor.it/Stipendi/project-planner-stipendio-SRCH_KO0,15.htm) · [salaris Planner](https://www.glassdoor.it/Stipendi/planner-stipendio-SRCH_KO0,7.htm) · [Indeed — salaris planner](https://it.indeed.com/career/planner/salaries) · [Jooble — salaris](https://it.jooble.org/salary/project-planner)

**Piraterij**
- [ImpresaCity — BSA 2018, Italië 43%](https://www.impresacity.it/news/19950/scende-l-uso-di-software-senza-licenza-in-italia-.html)
- [BitMAT — Global Software Survey, 43% zonder licentie](https://www.bitmat.it/news/global-software-survey-italia-43-dei-software-non-licenza-adeguata/)
- [TechFromTheNet — BSA-onderzoek 2018](https://techfromthenet.it/2018/06/16/bsa-indaga-ancora-sull-uso-di-software-senza-licenza/)
- [Punto Informatico — dalende piraterij](https://www.punto-informatico.it/fintech/bsa-cala-la-pirateria-sul-software/) · [BitCity — 49%, >€1,4 mrd](https://www.bitcity.it/news/22236/bsa-allarma-il-49-del-software-in-italia-e-piratato.html)

**Niet-geverifieerde bron (expliciet gemarkeerd)**
- [Edilizia in Cloud — "Quante imprese edili usano ancora Excel"](https://www.ediliziaincloud.com/blog/software-gestionale-vs-excel/) — claimt een ANCE-enquête uit 2026 onder 2.400 bedrijven (71% Excel); **niet terug te vinden bij ANCE, marketingbron met belang**
