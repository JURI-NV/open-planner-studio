# Marktonderzoek: projectplanning-/schedulingsoftware in Italië

**Regio:** Zuid-Europa
**Onderzoeksdatum:** 25 juli 2026
**Valutakoersen gehanteerd:** 1 EUR ≈ 1,14 USD; 1 GBP ≈ 1,17 EUR (afgerond, voor omrekeningen in dit rapport)

> **[GECORRIGEERD 25-07-2026]** De eerdere versie hanteerde 1 EUR ≈ 1,08 USD. Dat is achterhaald: de ECB-referentiekoers van 24 juli 2026 is **USD 1,1377** en **GBP 0,85388** (= 1 GBP ≈ €1,1711). De GBP-koers klopte; de dollarkoers zat er ~5% naast, waardoor alle USD→EUR-omrekeningen in dit rapport te hoog uitvielen. Bron: [ECB euro reference exchange rates](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html).

> **Leeswijzer bij betrouwbaarheid.** Bij elk cijfer staat een bron-URL. Waar ik zelf reken of extrapoleer staat expliciet **[SCHATTING]**. Waar een bron commercieel belang heeft of niet verifieerbaar is, staat **[LAGE BETROUWBAARHEID]**. Prijzen uit Italiaanse overheidsbesluiten (`determine di affidamento`) zijn de hardste bron in dit rapport: die zijn wettelijk verplicht openbaar en bevatten werkelijk betaalde bedragen, geen lijstprijzen.

---

## 1. Samenvatting

Italië is een **grote bouwmarkt met een structureel kleine markt voor échte schedulingsoftware**. Dat is de kernbevinding en die verklaart bijna alles wat volgt.

De reden is juridisch. Het Italiaanse aanbestedingsrecht (D.Lgs. 36/2023) verplicht een **`cronoprogramma`** — een grafisch schema dat de uitvoeringsfasen weergeeft — als onderdeel van het uitvoeringsontwerp, en verplicht de aannemer daarna een **`programma esecutivo dettagliato dei lavori`** in te dienen. Maar de wet schrijft **een document voor, geen bestandsformaat en geen rekenmethode**. Er is in dit onderzoek geen enkel Italiaans bestek gevonden dat CPM-logica, een `.xer`-levering of een specifiek pakket verplicht stelt. Waar het Verenigd Koninkrijk, de Golfstaten en grote delen van Noord-Amerika de aannemer dwingen tot P6-bestanden met logica, float en baselines, accepteert Italië in de praktijk een PDF met balkjes.

Het gevolg is een markt die in twee vrijwel gescheiden werelden uiteenvalt:

**Wereld 1 — de brede markt (tienduizenden gebruikers, zeer lage prijs per gebruiker).** Het `cronoprogramma` is hier een bijproduct van de kostenraming (`computo metrico`). Italiaanse professionals en overheden kopen een calculatiepakket en krijgen de planningsmodule er gratis of vrijwel gratis bij. ACCA's **PriMus** is marktleider; de planningsmodule **PriMus-K** zit inbegrepen in het POWER PACK-onderhoudsabonnement van **€199 per jaar voor de eerste installatie en €100 voor elke volgende** ([ACCA-offerte aan Roma Capitale, okt 2024](https://www.comune.roma.it/web-resources/cms/documents/ACCA.Offerta_Corso_PriMus_Romacapitale.pdf); bevestigd in [determina Comune di Bologna](https://atti9.comune.bologna.it/atti/determine.nsf/0/9C9DEF5B1E2E527DC1258DAF005B692B)). Concurrenten zijn **STR Vision CPM** (nu TeamSystem Construction) en **Blumatica Kronoplan**. Daarnaast is Excel alomtegenwoordig.

**Wereld 2 — de zware markt (enkele duizenden gebruikers, hoge prijs per gebruiker).** Grote infrastructuur, EPC/plant en energie draaien op **Oracle Primavera P6** en **Microsoft Project**. Webuild, Saipem, Maire Tecnimont, Terna, RFI/Italferr en de grote ingenieursbureaus zitten hier. Dit is waar het geld zit maar niet waar de aantallen zitten. Interessant detail voor de marktstructuur: **TeamSystem — de grootste Italiaanse bouwsoftwareleverancier — is tevens de Oracle Primavera-wederverkoper in Italië**, aantoonbaar via een aankoopbesluit van de gemeente Genua ([Comune di Genova, DD 2021-126.0.99](https://www2.comune.genova.it/content/dd-2021-126099-assegnazione-ai-sensi-dell%E2%80%99art-36-comma-2-lettera-del-dlgs-n-5020216-tramite-)). Dezelfde partij bedient dus beide werelden.

**Marktomvang (eigen schatting, zie §2):** de Italiaanse markt voor projectplanning-/schedulingsoftware bedraagt naar schatting **€11–33 miljoen per jaar aan licentie-/abonnementsomzet (2025)**, waarvan **€9–26 miljoen bouw-/infraspecifiek**. Inclusief training, consultancy en implementatie komt het totaal op naar schatting **€23–83 miljoen per jaar** — een band die zó breed is dat hij weinig zegt; het zwaartepunt ligt bij €35–55 miljoen. Groei naar schatting **6–9% per jaar**, gedreven door de BIM-verplichting boven €2 miljoen (vanaf 1 januari 2025) en de nasleep van het PNRR.

> **[GECORRIGEERD 25-07-2026]** Hier stond eerder **€25–45 mln** licenties / **€15–30 mln** bouwspecifiek / **€45–80 mln** totaal. Die getallen volgden **niet** uit de eigen seat-tabel in §2.4: de acht regels van die tabel sommeren tot **€11,3–33,0 mln**. De bovengrens van €45 mln lag daarmee 36% boven de som van álle maxima in de eigen berekening — rekenkundig onmogelijk. Zie §2.4 en de verificatienoot onderaan.

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
| Productiewaarde OICE-ingenieursbureaus | **€4,4 mrd (+11,3% t.o.v. 2023)** | **2024** | [OICE — rilevazione annuale OICE/CER](https://www.oice.it/916272/presentata-la-rilevazione-annuale-oice-cer-11-3-produzione-2024) |
| Personeel OICE-bureaus | **34.700 (+12,6% t.o.v. 2023)** | **2024** | idem |
| Webuild orderintake | €9,3 mrd (9M) | 2025 | [Milano Finanza](https://milanofinanza.it/news/webuild-ordini-record) |

> **[GECORRIGEERD 25-07-2026]** De twee OICE-regels stonden er fout in: eerder **€4,63 mrd (2025)** en **27.929 medewerkers (2022)**. De aangehaalde OICE-bron zelf meldt *"Fatturato 2024 OICE a 4,4 mld. (+11,3% sul 2023)"* en *"Addetti a 34.700 unità nel 2024 (+12,6% sul 2023)"*. Het personeelscijfer was dus niet alleen verouderd maar ook **24% te laag**; dat werkt door in benadering (c) van §2.4, die hieronder is herrekend.
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
| [Market Research Future](https://www.marketresearchfuture.com/reports/italy-project-portfolio-management-software-market-61336) | Italië, project portfolio management software | $144,87 mln (2024) → **$157,78 mln** → $370,3 mln (2035) | 2025 | 8,91% |
| idem, deelsegment | Italië, *Construction Project Management*-toepassing | **$25,0 mln → $60,0 mln** (traject, vermoedelijk 2024→2035) | 2024–2035 | — |
| [Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/project-management-software-systems-market) | Wereldwijd, PM-software | $9,76 mrd | 2025 | → $23,09 mrd (2031) |
| [Research Nester](https://www.researchnester.com/reports/project-management-software-market/4176) | Wereldwijd, PM-software | $7,24 mrd | 2025 | 10,7% |
| [MarketIntelo](https://marketintelo.com/report/construction-scheduling-software-market) | Wereldwijd, *construction scheduling* | $2,1 mrd | 2025 | 9,2% → $4,8 mrd (2034) |

**[LAGE BETROUWBAARHEID]** Het MRF-rapport bevat veel ronde, niet-onderbouwde procentclaims over Italiaanse bedrijven. Behandel de $157,78 mln als een orde-van-grootte-indicatie voor een **veel bredere** PPM-definitie (inclusief IT-portfoliobeheer, SAP, Atlassian, Smartsheet, monday) en niet als een meting van bouwplanning.

> **[GECORRIGEERD 25-07-2026] — dit was de belangrijkste leesfout in het rapport.** Hier stond eerder dat MRF een *interne inconsistentie* bevat ("2024-totaal $144,87 mln, maar het segment large enterprises alleen al $220,3 mln") en dat het bouwsegment **$25–60 mln in 2024** zou zijn. Beide zijn bij hercontrole van de bron onjuist gelezen:
> - MRF's FAQ zegt letterlijk *"The Large Enterprises segment is projected to dominate with a valuation of $220.3 Million"* — zonder jaartal, maar het woord **"projected"** en de omvang wijzen op **2035** (totaal 2035 = $370,3 mln; large enterprises = 59% daarvan, volstrekt plausibel). Tegen het 2024-totaal van $144,87 mln afgezet lijkt het een tegenspraak; tegen 2035 is het dat niet. **De "inconsistentie" is vrijwel zeker mijn eigen leesfout, niet die van MRF.**
> - Idem voor het bouwsegment: *"The valuation range for the Construction Project Management application segment is $25.0 Million to $60.0 Million."* Dat is in MRF's standaard-FAQ-sjabloon een **begin- en eindwaarde van de prognoseperiode (2024→2035)**, geen bandbreedte binnen één jaar.
>
> **Gevolg voor de kruiscontrole in §2.4 stap 4:** als het Italiaanse bouwsegment in 2024 circa **$25 mln ≈ €22 mln** is (en niet €23–55 mln), dan bevestigt MRF de eigen bottom-up-raming veel minder ruim dan geclaimd. De gecorrigeerde eigen bouwspecifieke licentieraming (€9–26 mln) overlapt er nog steeds mee — maar de oorspronkelijke €15–30 mln plus diensten zat er bovenop, niet "ruim binnen". De twee methoden bevestigen elkaar dus zwakker dan het rapport eerder suggereerde. **Restonzekerheid:** MRF vermeldt de jaartallen niet expliciet; de toewijzing 2024→2035 is een gefundeerde gevolgtrekking, geen letterlijke bronvermelding.

### 2.4 Eigen bottom-up raming **[SCHATTING]**

Ik reken vanaf het aantal mensen dat dit werk daadwerkelijk doet, omdat dat in Italië de beperkende factor is — niet het aantal projecten.

**Stap 1 — hoeveel professionele planners telt Italië?**

Drie onafhankelijke benaderingen:

*(a) Vacaturestroom.* Op LinkedIn Italië stonden ten tijde van dit onderzoek **73 vacatures met "Primavera P6"** en **91 met "Project Planner Primavera P6"** ([LinkedIn IT](https://it.linkedin.com/jobs/project-planner-primavera-p6-offerte-di-lavoro)); Glassdoor telde er 19–23, Indeed 8. Neem ~80 gelijktijdig openstaande gespecialiseerde planner-posities. Vacatures staan gemiddeld 1–2 maanden open, dus de jaarlijkse instroom is grofweg 480–960 posities. Bij een verloop van 10–15% per jaar impliceert dat een installed base van **3.200–9.600 planners**. Neem het midden: **~5.000**.

*(b) Verhouding tot de sector.* In volwassen bouwmarkten ligt de verhouding toegewijde planners tot bouwwerkgelegenheid rond 1:300 à 1:500. Italië heeft ca. 1,5 miljoen direct in de bouw (deel van de 3,3 miljoen ketenwerkgelegenheid). Dat geeft **3.000–5.000**.

*(c) Via ingenieursbureaus.* OICE-bureaus hebben **34.700 medewerkers (2024)**; als 3–5% planner/project-control is, zijn dat **1.040–1.735** — alleen bij de aangesloten bureaus. Tel daar aannemers (Webuild alleen al enkele honderden), EPC (Saipem, Maire Tecnimont, Danieli, Fincantieri), opdrachtgevers (RFI/Italferr, ANAS, Terna, Snam, Autostrade) en het niet-aangesloten deel van de markt bij op, en je komt op dezelfde orde. *(Herrekend: eerder stond 27.929 medewerkers → 840–1.400; dat cijfer was uit 2022 en 24% te laag.)*

> **Methodologische waarschuwing bij benadering (a).** De vacature-route is de zwakste van de drie en verdient niet het gewicht dat ze in de conclusie krijgt. Drie problemen: (i) LinkedIn-telling per zoekterm is berucht onbetrouwbaar — dezelfde vacature verschijnt via meerdere agencies en aggregators, en de zoekterm "Primavera P6" vangt ook rollen waarin P6 slechts één regel in het functieprofiel is; (ii) de stap van vacatures naar *verloop* veronderstelt een markt in evenwicht, terwijl het PNRR juist een tijdelijke **groei**piek veroorzaakte — een deel van die 480–960 posities is uitbreiding, geen vervanging, wat de installed base **overschat**; (iii) de resulterende bandbreedte (3.200–9.600) is een factor 3 breed en dus nauwelijks informatief. De uitkomst "~5.000" is het midden van een zeer wankele schatting, geen meting. Benaderingen (b) en (c) zijn robuuster en wijzen op **3.000–5.000**.

**Conclusie: circa 4.000–7.000 professionele planners in Italië die een echt CPM-pakket gebruiken.** Daarnaast tienduizenden professionals (ingenieurs, architetti, geometri, ambtenaren) die één of twee keer per jaar een `cronoprogramma` moeten produceren als projectdocument.

**Stap 2 — wat wordt er per gebruiker betaald?**

| Segment | Aantal seats **[SCHATTING]** | Kosten per seat/jaar | Omzet zoals eerder vermeld | **Rekenkundig bereik (seats × prijs)** |
|---|---|---|---|---|
| Oracle Primavera P6 (perpetual + 22% support, en cloud) | 1.200–2.000 | €1.500–3.000 geannualiseerd | €2–5 mln | **€1,8–6,0 mln** |
| Microsoft Project (Plan 3 / perpetual), bouw+infra deel | 6.000–10.000 | €250–350 | €1,5–3,5 mln | **€1,5–3,5 mln** ✓ |
| MS Project buiten bouw (industrie, IT, publiek) | 10.000–20.000 | €250–350 | €2,5–7 mln (deels buiten scope) | **€2,5–7,0 mln** ✓ |
| SYNCHRO 4D, TILOS, Powerproject, overige zware tools | 300–700 | €2.000–4.500 | €0,8–2,5 mln | **€0,6–3,15 mln** |
| PriMus-K binnen POWER PACK (ACCA) | 40.000–80.000 POWER PACK-abonnementen | €100–199 (hele pakket, niet alleen planning) | €1–3 mln toerekenbaar aan planning | *toerekening, geen product* |
| STR Vision CPM / TeamSystem Construction | 5.000–15.000 | €240–600 (onderhoud) | €2–6 mln | **€1,2–9,0 mln** |
| Blumatica Kronoplan, Namirial, MyAedes e.a. | 3.000–10.000 | €100–300 | €0,5–2 mln | **€0,3–3,0 mln** |
| Algemene SaaS (monday, Smartsheet, Wrike, Asana, ClickUp) voor AEC-planning | 5.000–15.000 | €150–350 | €1–4 mln | **€0,75–5,25 mln** |

> **[GECORRIGEERD 25-07-2026] — de hoofdconclusie van dit rapport klopte niet met zijn eigen tabel.**
>
> **(1) De totalen sommeren niet.** Optelling van de acht eerder vermelde omzetregels geeft:
> - ondergrens: 2 + 1,5 + 2,5 + 0,8 + 1 + 2 + 0,5 + 1 = **€11,3 mln**
> - bovengrens: 5 + 3,5 + 7 + 2,5 + 3 + 6 + 2 + 4 = **€33,0 mln**
>
> Het gestelde totaal van **€25–45 mln** was daarmee onhoudbaar: de bovengrens lag 36% bóven de som van álle maxima in de eigen tabel, wat rekenkundig onmogelijk is, en de ondergrens lag ruim twee keer zo hoog als de som van alle minima. Idem voor het bouwspecifieke deel: de bouw-/infraregels (1, 2, 4, 6, 7, plus het AEC-deel van regel 8) sommeren tot **€8,8–26 mln**, niet €15–30 mln.
>
> **(2) Vijf van de acht regels vermeldden een smallere band dan hun eigen invoer toelaat**, zonder dat ergens wordt uitgelegd waarom (zie de rechterkolom). Wie de volledige rekenkundige bereiken optelt komt op **€9,7–39,9 mln** — ook dan wordt €45 mln niet gehaald.
>
> **Gecorrigeerde uitkomst, conservatief (som van de eerder vermelde regels):**

**Totaal licentie-/abonnementsomzet: €11–33 miljoen per jaar (2025).**
**Waarvan bouw-/infraspecifiek: €9–26 miljoen per jaar.**

**Stap 3 — diensten.** In dit vakgebied ligt de verhouding diensten/licenties in Italië hoog, omdat het aanbod sterk via resellers en systeemintegratoren loopt (TeamSystem, Alfa Sistemi, Horsa, EPM Consulting, Comunico, DigiTecno) en omdat overheden training moeten inkopen. Uit het CAL-contract blijkt een consultancytarief van **€95/uur** ([CAL S.p.A., feb 2020](https://www.calspa.it/wp-content/uploads/2020-02-13_det-affidamento_str.pdf)); uit de ACCA-offerte aan Rome **€7.200 voor 3 klassen van 16 uur** plus €2.000 reiskosten. Reken op een dienstencomponent van **1,0–1,5× de licentieomzet**.

**Totaal Italiaanse markt inclusief diensten: €23–83 miljoen per jaar. [SCHATTING]**

> **[GECORRIGEERD 25-07-2026]** Eerder stond **€45–80 mln**. Met de gecorrigeerde licentiebasis (€11–33 mln) en de eigen dienstenfactor van 1,0–1,5× wordt het totaal 2,0–2,5 × licenties = **€23–83 mln**. Merk op hoe nietszeggend die band is: hij spant een factor 3,6. De vermenigvuldiging van twee ruime schattingen (seats × prijs, daarna × dienstenfactor) laat de onzekerheid exploderen. Wie één getal nodig heeft kan het beste **€35–55 mln/jaar** aanhouden als middenscenario, met de uitdrukkelijke kanttekening dat dit een orde-van-grootte is en geen meting. De dienstenfactor van 1,0–1,5× is bovendien zelf ongeverifieerd: hij steunt op twee losse contracten (ACCA-training, CAL-consultancy) en niet op enige branchemeting.

**Stap 4 — kruiscontrole.** Market Research Future noemt voor het Italiaanse deelsegment "Construction Project Management" een traject van **$25,0 → $60,0 mln**, wat bij nadere lezing vrijwel zeker 2024→2035 is en niet een bandbreedte in 2024 (zie de correctienoot in §2.3). Dat betekent circa **$25 mln ≈ €22 mln in 2024**. Mijn gecorrigeerde bouwspecifieke licentieraming (€9–26 mln) overlapt daarmee — de twee methoden komen op dezelfde orde uit, wat redelijk vertrouwen geeft in de orde van grootte en géén in de precisie. **Let op: dit is een zwakkere bevestiging dan de vorige versie van dit rapport claimde**, en MRF is bovendien zelf als lage-betrouwbaarheidsbron gemarkeerd — twee zwakke ramingen die elkaar bevestigen blijven twee zwakke ramingen.

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

**Prijzen — perpetual (USD) — [LAGE BETROUWBAARHEID]:**

> **[GECORRIGEERD 25-07-2026]** Deze vier bedragen stonden hier als "internationale lijstprijzen". Bij hercontrole is de bron geen Oracle-document maar de **eigen, ongedateerde prijslijst van een reseller**: de pagina is getiteld *"Primavera Price List by AKIM Engineering Consulting"*. Er staat geen datum, geen Oracle-referentie en geen versienummer op. De bedragen zijn feitelijk correct weergegeven ($3.880 / $4.240 / $10.450 / $1.460), maar ze mogen niet als officiële Oracle-lijstprijs worden gepresenteerd. Voor harde Oracle-prijzen is uitsluitend de G-Cloud-prijslijst hieronder bruikbaar.

| Product | Lijstprijs | Metriek | Bron |
|---|---|---|---|
| Primavera P6 Professional | **$3.880** | Application User, perpetual, support niet inbegrepen | [Akim Engineering](https://www.akimeng.com/oracle-primavera-price-list.html) |
| Primavera P6 Enterprise (EPPM) | **$4.240** | Application User, perpetual | idem |
| Primavera Risk Analysis | **$10.450** | Application User, perpetual | idem |
| P6 Progress Reporter | **$1.460** | Application User, perpetual | idem |

Oracle rekent standaard **22% van de netto licentiewaarde per jaar** voor Software Update License & Support (algemeen Oracle-beleid; niet in bovenstaande bron gespecificeerd — **[SCHATTING]** op basis van Oracle's gangbare supportpercentage).

**Prijzen — cloud, officiële Oracle-prijslijst.** Het meest betrouwbare openbare document is Oracle's eigen prijslijst voor het Britse G-Cloud 14-raamwerk (PDF-aanmaakdatum 23 juni 2025). Dit zijn echte Oracle-prijzen, geen reseller-schattingen. **Wel met twee kanttekeningen:** het zijn *Britse raamwerkprijzen voor de publieke sector*, niet wereldwijde lijstprijzen en zeker geen Italiaanse prijzen, en het document is door Oracle gemarkeerd als *"PROPRIETARY AND CONFIDENTIAL"* hoewel het openbaar op het G-Cloud-portaal staat. Alle onderstaande bedragen en kortingstrappen zijn woord voor woord tegen de PDF geverifieerd (25-07-2026) en kloppen:

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

**Prijzen — werkelijk betaald in Italië.** De gemeente Genua kocht via MePA bij TeamSystem S.p.A.: **3 licenties "Primavera P6 Enterprise Project Portfolio Management 1 CL" + 3 assistentie-canoni voor €10.356,00** (affidamento diretto, uitvoering 14-09 t/m 13-10-2021, CIG 88949622DA) ([Comune di Genova DD 2021-126.0.99](https://www2.comune.genova.it/content/dd-2021-126099-assegnazione-ai-sensi-dell%E2%80%99art-36-comma-2-lettera-del-dlgs-n-5020216-tramite-)). Dat is **~€3.452 per seat inclusief eerste jaar support**.

> **[GECORRIGEERD 25-07-2026]** Hier stond dat dit "ruwweg de internationale lijstprijs" is, "zonder noemenswaardige Italiaanse korting". Die conclusie houdt geen stand, om twee redenen:
> - **Appels met peren.** De €3.452 omvat licentie **plus** een assistentie-canone; de $4.240 lijstprijs is licentie **zonder** support. Rekent men het gangbare Oracle-supportpercentage van 22% eruit, dan is de impliciete licentieprijs €3.452 / 1,22 ≈ **€2.829**, tegenover $4.240 ≈ €3.727 (bij de correcte koers 1,1377). Dat is een korting van ruwweg **24%**, niet "geen korting".
> - **De bron laat de btw-status open.** Het transparantieblad vermeldt niet of €10.356 in- of exclusief IVA is. Bij inclusief IVA zou de prijs €2.829/seat zijn vóór support, en de impliciete korting nog groter. Italiaanse aanbestedingstransparantie-tabellen (L. 190/2012) noemen doorgaans bedragen exclusief IVA, maar dat is hier niet bevestigd. **[ONZEKER]**

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

Bron: [Listino Prezzi ACCA-software, maart 2024 rev.01, uitgegeven door Tecno 3D S.r.l. (PDF)](https://tecno3d.it/wp-content/uploads/2024/06/Listino_Prezzi-MAR-24.pdf). **Alle acht bovenstaande bedragen zijn op 25-07-2026 woord voor woord tegen deze PDF geverifieerd en kloppen.**

> **[GECORRIGEERD 25-07-2026] — bronattributie.** Dit is geen door ACCA gepubliceerde listino maar de prijslijst van **Tecno 3D S.r.l. (Rende, CS)**, een ACCA-dealer; de voettekst luidt *"Tecno 3D si riserva il diritto di apportare modifiche al presente listino"*. De ACCA-prijzen worden erin overgenomen, maar noem het geen officiële ACCA-lijst.
>
> **Twee zaken uit deze PDF die het rapport eerder miste en die de kortingsanalyse in §4.4 raken:**
> - ACCA publiceert een **multiuser-staffel**: 2 installaties ×1,5; 3 ×1,9; 5 ×2,5; 10 ×4,25 op de eenheidsprijs (10 PriMus-installaties = €699 × 4,25 = €2.970,75, ofwel **€297 per installatie**); boven 10 installaties op aanvraag.
> - Daarnaast geldt: *"Per l'acquisto di installazioni successive ad una prima ... il prezzo di listino è ridotto del 40%"*.
>
> Kortom: het beeld van €699 als effectieve prijs per werkplek is te hoog gegrepen; ACCA publiceert zelf al trappen richting €297.

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

**Dit is het belangrijkste prijsgetal van dit hele rapport:** een Italiaanse overheidsinstantie betaalt **€999 excl. btw voor drie jaar, drie werkplekken, inclusief de volledige cronoprogramma-functionaliteit** — oftewel **€111 per werkplek per jaar**. Ter vergelijking: één MS Project Plan 3-seat kost €312 per jaar (€26 × 12).

> **[GECORRIGEERD 25-07-2026] — de "dertigste van het P6-niveau" was een rekenfout in de vergelijkingsbasis.** Hier stond: *"één Primavera P6-seat kost in Italië ~€3.452 ... ongeveer een dertigste van het P6-niveau."* Dat zet een **eenmalige perpetual-aanschaf** naast een **jaarabonnement**. Correct geannualiseerd: impliciete licentie ≈ €2.829 (zie §3.2), afgeschreven over 5 jaar = €566/jaar, plus 22% support over de licentiewaarde ≈ €622/jaar, samen **≈ €1.190 per seat per jaar**. Tegenover €111 is dat een verhouding van ongeveer **1 : 11**, niet 1 : 30. De richting van de bevinding blijft overeind — het Italiaanse volumesegment ligt een orde van grootte onder het P6-niveau — maar de factor 30 was ongeveer drie keer te dramatisch. *(Afschrijvingstermijn van 5 jaar is een aanname; bij 3 jaar wordt de verhouding 1 : 15, bij 10 jaar 1 : 8.)* **[SCHATTING]**

**Trainingskosten (ACCA, aan Roma Capitale, jan 2025):**
- Cursus "PriMus advanced" (computo, contabilità, direzione lavori): 16 uur per klas, 3 klassen, tot 17 deelnemers per klas
- **€7.200,00 excl. IVA totaal** + **€2.000,00 excl. IVA reiskosten**
- Neerkomend op ~€2.400 per klas van 17, ofwel **~€141 per deelnemer voor 16 uur**
- Gegeven door een **FAA (Formatore Accreditato ACCA)** — ACCA onderhoudt een eigen geaccrediteerd trainersnetwerk
Bron: [ACCA-offerte Roma Capitale (PDF)](https://www.comune.roma.it/web-resources/cms/documents/ACCA.Offerta_Corso_PriMus_Romacapitale.pdf)

**Kortingen:** ACCA hanteert een "Neo"-actie met 30% korting voor pas afgestudeerden/starters op software boven €499 ([ACCA promoties](https://www.acca.it/offerte-promozioni)); genoemde prijs PriMus daarmee €489,30 excl. IVA ([Area Sosta](https://areasosta.com/faq/quanto-costa-il-programma-primus)).

> **[GECORRIGEERD 25-07-2026] — €252 is géén volumekorting.** Hier stond: *"Bij volume zakt de prijs naar €252/installatie."* De twee primaire documenten weerspreken dat rechtstreeks:
> - Roma Capitale: **35** installaties → €8.820 = **€252/stuk**
> - Città Metropolitana di Firenze: **2** licenties → €504 = **€252/stuk**
>
> Dezelfde eenheidsprijs bij 2 als bij 35 stuks. Het is dus een **staande prijs voor publieke afnemers via MePA** (productcode `ACC_P01_2`), niet een volumekorting. Sterker: bij 2 installaties zou ACCA's eigen gepubliceerde multiuser-staffel op €524/stuk uitkomen (€699 × 1,5 / 2), en de −40%-regel voor vervolginstallaties op €559/stuk — beide fors bóven de €252 die Firenze werkelijk betaalde. Het MePA-kanaal is dus goedkoper dan élke gepubliceerde ACCA-staffel. Dat is een scherpere en beter onderbouwde bevinding dan de oorspronkelijke "volumekorting", en relevanter voor een toetreder: de referentieprijs in de Italiaanse publieke sector is €252, ongeacht aantal.

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
| Optionele verlenging 3 extra jaren | €3.582,00 | €1.440 CPM + €432 QTO + €1.710 consultancy (18 u × €95) |
| **Technische verlenging (`proroga tecnica`), max. 6 maanden** | **€312,00** | €240 CPM + €72 QTO |
| **Maximum totaal** | **€9.196,00** | excl. IVA |

Bron: [CAL S.p.A., Determina di affidamento, 13 februari 2020 (PDF)](https://www.calspa.it/wp-content/uploads/2020-02-13_det-affidamento_str.pdf). **Alle bedragen zijn op 25-07-2026 tegen de originele PDF geverifieerd en kloppen exact.**

> **[GECORRIGEERD 25-07-2026]** De tabel telde eerder niet op: €5.302 + €3.582 = €8.884, terwijl het maximum €9.196 is. Het ontbrekende bedrag is de **€312 voor een `proroga tecnica` van maximaal zes maanden**, nu als aparte regel toegevoegd. Twee aanvullende preciseringen uit de bron: de gunning liep onder **D.Lgs. 50/2016 art. 36 co. 2 lett. a)** (niet het huidige D.Lgs. 36/2023, wat logisch is voor 2020), en er werden twee leveranciers uitgenodigd via Trattativa Diretta — **DigiTecno** en **Aldebra** — waarvan alleen DigiTecno een offerte indiende. Belangrijk voor de interpretatie: de €1.440 betreft **updates/onderhoud/assistentie op reeds bezeten licenties**, niet de aanschaf van licenties. De licentieprijs van STR Vision CPM blijft dus onbekend.

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

**Voor een leverancier is de conclusie in de praktijk eenduidig: zonder MePA-registratie is de Italiaanse publieke sector vrijwel onbereikbaar.** ACCA en TeamSystem zitten er beide op, ACCA rechtstreeks, TeamSystem/STR ook via resellers als DigiTecno en Aldebra.

> **[GENUANCEERD 25-07-2026]** De verplichting zelf is bevestigd en geldt voor ICT-aankopen **zonder drempelbedrag** — anders dan voor de meeste andere leveringen ([Codiceappalti.it, jurisprudentie MePA](https://www.codiceappalti.it/giurisprudenza/sentenza/mepa/acquisti-di-beni-e-servizi-informatici-obbligo-di-acquisizione-mediante-consip-e-mepa/33510); [Consip](https://www.consip.it/amministrazioni/mappa-offerta/contratti-spc)). Maar het woord "onbereikbaar" was te absoluut: dezelfde wet kent afwijkingsmogelijkheden wanneer het gevraagde goed niet via Consip/MePA beschikbaar is of niet geschikt is, mits gemotiveerd en gemeld. In de praktijk is dat een zware, zelden bewandelde route — de strategische conclusie (registreer op MePA) verandert niet, maar het is een sterk feitelijke drempel en geen absoluut juridisch verbod.

Een tweede consequentie: **alle betaalde prijzen zijn openbaar.** Dat maakt Italiaanse prijsstelling ongewoon transparant voor wie weet waar te zoeken — en het maakt prijsdifferentiatie tussen overheidsklanten lastig.

### 4.4 Prijsniveau en valuta-effecten

- Italiaanse pakketten worden in **euro** geprijsd en zijn voor het brede segment extreem goedkoop: €252 voor een PriMus-licentie, €100–199 per jaar onderhoud inclusief planningsmodule.
- Internationale pakketten (Oracle, Bentley, Trimble, Elecosoft) hanteren **USD/GBP-lijstprijzen**. Bij een sterkere dollar wordt P6 in Italië duurder zonder dat de leverancier iets doet — een reëel risico voor de al smalle high-end markt. Microsoft prijst wél in euro voor Italië.
- **Btw (IVA) 22%** komt bovenop alle genoemde prijzen; de meeste Italiaanse prijsopgaven zijn "+ IVA".
- **Het lokale segment kent één staande publieke prijs, geen volumestaffel:** ACCA rekende zowel Roma Capitale (35 installaties) als Città Metropolitana di Firenze (2 licenties) **€252 per installatie** via MePA — 64% onder de €699 lijstprijs en onder ACCA's eigen gepubliceerde multiuser-staffel. Dat is dus een kanaalprijs, niet een volumekorting. *(Gecorrigeerd 25-07-2026; eerder stond hier dat de prijs "bij volume" naar €252 zakt.)*
- **In het high-end segment is de Italiaanse korting moeilijker vast te stellen dan eerder gesteld:** Genua betaalde €3.452 per P6-seat *inclusief* een assistentie-canone; na aftrek van het gangbare 22%-supportpercentage impliceert dat ~€2.829 licentie tegen ~€3.727 lijst, oftewel circa 24% korting. Eerder concludeerde dit rapport hier "géén korting" — dat berustte op het vergelijken van een prijs mét support met een lijstprijs zónder. **[ONZEKER]** — de btw-status van het Genua-bedrag is niet bevestigd.
- Oracle's officiële volumekortingen beginnen pas bij 101 gebruikers (−10%) en lopen tot −25% boven 1.000 gebruikers — drempels die vrijwel geen Italiaanse organisatie haalt behalve Webuild en de allergrootste EPC's. *(Geverifieerd tegen de G-Cloud-PDF.)*
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
2. **Prijszetting moet zich richten op het Italiaanse anker van ~€100–250 per werkplek per jaar** (€111 Bologna, €252 Firenze/Roma eenmalig, €199 POWER PACK), niet op het P6-anker van circa **€1.200 per seat per jaar geannualiseerd**. De publieke determines maken dit anker keihard controleerbaar. *(Gecorrigeerd 25-07-2026: hier stond "€3.000+", wat een eenmalige perpetual-prijs is en geen jaarbedrag.)*
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

---

## Verificatie

**Datum:** 25 juli 2026. **Methode:** adversariële hercontrole — per bewering is actief geprobeerd haar te wéérleggen met onafhankelijke bronnen, waar mogelijk in het Italiaans en waar mogelijk door de originele PDF's zelf uit te lezen in plaats van af te gaan op samenvattingen. Alle rekenstappen zijn nagerekend.

**Samenvattend oordeel:** de *primaire prijsdocumentatie* van dit rapport is uitzonderlijk solide — elk bedrag uit de Italiaanse overheidsdetermines, de ACCA-offerte, de Oracle G-Cloud-prijslijst, de Microsoft-prijzen en de ACCA-listino is exact teruggevonden. De *marktomvangredenering* is dat niet: de hoofdconclusie volgde rekenkundig niet uit de eigen tabel, en de externe kruiscontrole berustte op een leesfout.

### Gecorrigeerd

| # | Bewering (oorspronkelijk) | Bevinding | Bron |
|---|---|---|---|
| 1 | Marktomvang **€25–45 mln** licenties, waarvan **€15–30 mln** bouwspecifiek | **Weerlegd met de eigen tabel.** De acht regels van §2.4 sommeren tot €11,3–33,0 mln (bouwdeel €8,8–26 mln). De bovengrens van €45 mln lag 36% boven de som van álle maxima — rekenkundig onmogelijk. Gecorrigeerd naar €11–33 mln / €9–26 mln. Ook telt de tabel een expliciet "deels buiten scope"-regel (MS Project buiten de bouw, €2,5–7 mln) gewoon mee. | interne consistentiecontrole §2.4 |
| 2 | Totaal incl. diensten **€45–80 mln/jaar** | Volgt uit een foute basis; herrekend naar €23–83 mln (2,0–2,5 × licenties). Band is een factor 3,6 breed en daarmee weinig bruikbaar; middenscenario €35–55 mln toegevoegd. Dienstenfactor 1,0–1,5× steunt op twee losse contracten, niet op een branchemeting. | idem |
| 3 | MRF-kruiscontrole: bouwsegment **$25–60 mln in 2024**, en MRF bevat een interne inconsistentie ($220,3 mln large enterprises vs $144,87 mln totaal 2024) | **Beide onjuist gelezen.** MRF's FAQ noemt geen jaartallen; "$25,0M to $60,0M" is in MRF's sjabloon het traject 2024→2035, en "$220.3 Million" staat er als *projected* (consistent met het 2035-totaal van $370,3 mln, niet met 2024). De "inconsistentie" was vermoedelijk de eigen leesfout. Gevolg: de kruiscontrole bevestigt de eigen raming zwakker dan geclaimd. Restonzekerheid: MRF vermeldt de jaren niet expliciet. | [marketresearchfuture.com](https://www.marketresearchfuture.com/reports/italy-project-portfolio-management-software-market-61336) |
| 4 | OICE: **€4,63 mrd productie (2025)**, **27.929 medewerkers (2022)** | **Weerlegd door de eigen bron.** Dezelfde OICE-pagina meldt *"Fatturato 2024 OICE a 4,4 mld. (+11,3% sul 2023)"* en *"Addetti a 34.700 unità nel 2024 (+12,6%)"*. Personeelscijfer was 24% te laag; benadering (c) van de plannertelling herrekend van 840–1.400 naar 1.040–1.735. | [oice.it](https://www.oice.it/916272/presentata-la-rilevazione-annuale-oice-cer-11-3-produzione-2024) |
| 5 | Wisselkoers **1 EUR ≈ 1,08 USD** | Achterhaald; ECB-referentiekoers 24-07-2026 is USD **1,1377**. Alle USD→EUR-conversies vielen ~5% te hoog uit. De GBP-koers (1,17) klopt wél exact (ECB GBP 0,85388 → €1,1711). | [ECB](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html) |
| 6 | €252/installatie is een **volumekorting** (−64% bij 35 stuks) | **Weerlegd.** Firenze betaalde bij **2** licenties dezelfde €252/stuk als Roma bij **35**. Het is een staande MePA-prijs voor publieke afnemers (code `ACC_P01_2`), geen volumestaffel — en ligt onder ACCA's eigen gepubliceerde multiuser-staffel (2 inst. → €524/stuk) én onder de −40%-regel voor vervolginstallaties. | [DD 1897/2024 Firenze](https://www.cittametropolitana.fi.it/wp-content/uploads/DD.-1897-del-12-09-2024.pdf) + [ACCA-offerte Roma](https://www.comune.roma.it/web-resources/cms/documents/ACCA.Offerta_Corso_PriMus_Romacapitale.pdf) |
| 7 | Genua betaalde P6 "ruwweg de internationale lijstprijs, **zonder Italiaanse korting**" | **Weerlegd als appels-met-peren.** €3.452/seat omvat licentie **plus** support; de $4.240 lijstprijs is zonder support. Na aftrek van 22% support impliceert dat ~€2.829 vs ~€3.727 lijst = circa **24% korting**. Btw-status van het bedrag onbevestigd → **[ONZEKER]**. | [DD 2021-126.0.99 Genova](https://www2.comune.genova.it/content/dd-2021-126099-assegnazione-ai-sensi-dell%E2%80%99art-36-comma-2-lettera-del-dlgs-n-5020216-tramite-) |
| 8 | Italiaanse markt is verankerd op **een dertigste** van het P6-niveau (€111 vs €3.452) | **Weerlegd.** Vergelijkt een jaarabonnement met een eenmalige perpetual-aanschaf. Geannualiseerd (5 jaar afschrijving + 22% support) is P6 ≈ €1.190/seat/jaar → verhouding ≈ **1 : 11**, niet 1 : 30. Richting blijft juist, factor was ~3× te dramatisch. | eigen herberekening |
| 9 | Oracle perpetual-prijzen als "**internationale lijstprijzen**" | Bedragen kloppen ($3.880 / $4.240 / $10.450 / $1.460), maar de bron is de **eigen ongedateerde prijslijst van een reseller** ("Primavera Price List by AKIM Engineering Consulting") — geen Oracle-document. Herlabeld als **[LAGE BETROUWBAARHEID]**. | [akimeng.com](https://www.akimeng.com/oracle-primavera-price-list.html) |
| 10 | ACCA-listino maart 2024 als "**officiële ACCA-lijst**" | Het is de listino van dealer **Tecno 3D S.r.l. (Rende, CS)**, met eigen voorbehoudsclausule. Prijzen zelf exact bevestigd. Bovendien miste het rapport twee gepubliceerde kortingsregels (multiuser-staffel tot ×4,25; −40% op vervolginstallaties) die de kortingsanalyse raken. | [Listino Tecno 3D (PDF)](https://tecno3d.it/wp-content/uploads/2024/06/Listino_Prezzi-MAR-24.pdf) |
| 11 | CAL-contracttabel (€5.302 + €3.582 = €9.196) | Telde niet op — €312 ontbrak. Toegevoegd: `proroga tecnica` van max. 6 maanden (€240 CPM + €72 QTO). Alle overige CAL-bedragen exact bevestigd. | [CAL determina (PDF)](https://www.calspa.it/wp-content/uploads/2020-02-13_det-affidamento_str.pdf) |
| 12 | "Zonder MePA kan **geen** Italiaanse instantie legaal bij je kopen" | Te absoluut. De verplichting geldt inderdaad voor ICT **zonder drempelbedrag**, maar de wet kent gemotiveerde afwijkingsmogelijkheden als het goed niet via Consip/MePA beschikbaar of ongeschikt is. Praktische conclusie ongewijzigd; juridische formulering afgezwakt. | [Codiceappalti.it](https://www.codiceappalti.it/giurisprudenza/sentenza/mepa/acquisti-di-beni-e-servizi-informatici-obbligo-di-acquisizione-mediante-consip-e-mepa/33510) |

### Bevestigd

| Bewering | Bevinding | Bron |
|---|---|---|
| Microsoft Italië: Planner Plan 1 **€8,70**, Planner+Project Plan 3 **€26,00** p.g./mnd, jaarbetaling, excl. IVA; Plan 5 niet vermeld | Woordelijk bevestigd op de Italiaanse pagina | [microsoft.com/it-it](https://www.microsoft.com/it-it/microsoft-365/planner/microsoft-planner-plans-and-pricing) |
| Project Professional 2024 **€1.659,00**, Project Standard 2024 **€929,00** perpetual | Bevestigd. *Kleine kanttekening:* deze pagina vermeldt niet expliciet "excl. IVA", terwijl het rapport dat voor de hele tabel claimt | [microsoft.com/it-it](https://www.microsoft.com/it-it/microsoft-365/project/compare-microsoft-project-management-software) |
| Oracle G-Cloud 14: P6 EPPM **£220** (min. 25), Progress Reporter £24, Web Services £36, Schedule Cloud **£96** (min. 5), Task Management £44, Progress £10, Portfolio & Capital Planning £176, Unifier Project Controls £132 (min. 25), Aconex Enterprise £46, CIC Analytics £40 (min. 10), extra non-prod. omgeving £3.954; kortingen 10/15/20/25% | **Alles woord voor woord bevestigd uit de PDF.** De sterkste tabel in het rapport | [Oracle G-Cloud 14 (PDF)](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/717959/423103118187025-pricing-document-2025-06-25-1321.pdf) |
| ACCA-lijstprijzen: PriMus usBIM €699, PriMus-P €299, PriMus-C €149, Impresus €1.999, Edificius €2.499 (van €3.490), CerTus usBIM €699, usBIM €0, PriMus SERVER op aanvraag | Alle acht exact bevestigd | [Listino maart 2024 rev.01 (PDF)](https://tecno3d.it/wp-content/uploads/2024/06/Listino_Prezzi-MAR-24.pdf) |
| POWER PACK **€199 eerste installatie + €100 per extra**; PriMus-K zit erin en wordt niet los verkocht | Letterlijk bevestigd in de ACCA-offerte; de modulelijst noemt "PriMus-K, cronoprogramma lavori" expliciet. ACCA-productpagina bevestigt dat PriMus-K in het POWER PACK zit en noemt "percorsi critici" | [ACCA-offerte Roma (PDF)](https://www.comune.roma.it/web-resources/cms/documents/ACCA.Offerta_Corso_PriMus_Romacapitale.pdf) · [acca.it](https://www.acca.it/software-cronoprogramma-lavori) |
| Roma Capitale: 35 installaties **€8.820** (= €252); training 3 klassen × 16 u, tot 17 deelnemers, **€7.200** + **€2.000** reiskosten; datum 17-10-2024 | Alles exact bevestigd. Aanvulling: bij aankoop zaten 4 maanden POWER PACK gratis | idem |
| Firenze DD 1897: 2 licenties €504, POWER PACK €199 + 3×€100 = €300, totaal **€1.003** excl. / **€1.223,66** incl. IVA, MePA-codes `ACC_P01_2` / `ACC_A01.a` / `ACC_A01.a_2` | Alles exact bevestigd, inclusief de vaststelling dat er geen Consip-conventie actief was | [DD 1897/2024 (PDF)](https://www.cittametropolitana.fi.it/wp-content/uploads/DD.-1897-del-12-09-2024.pdf) |
| CAL/STR Vision: €40/mnd voor 2 licenties (€240/licentie/jaar), QTO €1.150 eenmalig, QTO-onderhoud €12/mnd, consultancy **€95/uur** max. 24 u | Alles woordelijk bevestigd | [CAL determina (PDF)](https://www.calspa.it/wp-content/uploads/2020-02-13_det-affidamento_str.pdf) |
| Genua: 3 licenties P6 EPPM + 3 assistentie-canoni, **€10.356**, TeamSystem S.p.A., CIG 88949622DA | Bevestigd (uitvoering 14-09 t/m 13-10-2021). Zie correctie #7 over de interpretatie | [comune.genova.it](https://www2.comune.genova.it/content/dd-2021-126099-assegnazione-ai-sensi-dell%E2%80%99art-36-comma-2-lettera-del-dlgs-n-5020216-tramite-) |
| PNRR: **€153,2 mrd** ontvangen (79%), **€101,3 mrd** uitgegeven waarvan >helft bouw, **~16.000** bouwplaatsen, **+5,6%** investeringen 2026 na −1,1% in 2025, 350.000 nieuwe banen, **~€120 mrd** tot 2033 | **Alle zeven cijfers woordelijk bevestigd** — de best onderbouwde macroparagraaf van het rapport | [Edilportale/ANCE](https://www.edilportale.com/news/2026/01/mercati/ance-investimenti-costruzioni-56-nel-2026_108743_13.html) |
| OICE BIM-aanbestedingen 2025: **638** stuks (+80,7% vs 353), **€1.496,9 mln** (+151,1% vs €596,2 mln), capitolato informativo 34,3% (was 25,2%), BIM als deelnemingseis 53,3% (340), BIM-Manager 39,5%, UNI 11337 11,8% | **Alle cijfers exact bevestigd** | [Edilportale, april 2026](https://www.edilportale.com/news/2026/04/mercati/report-oice-su-appalti-bim-e-ia-nel-2025_109944_13.html) |
| BIM verplicht boven **€2 mln** vanaf 1-1-2025; drempel verhoogd van €1 mln door correttivo D.Lgs. 209/2024 | Bevestigd door zes onafhankelijke Italiaanse bronnen (AIFERR, MIT-toelichting via Segretari Comunali, Promedia, 01Building, Mutina Engineering, GIS Infrastrutture) | o.a. [aiferr.it](https://www.aiferr.it/bim-sopra-i-2-milioni-il-mit-chiarisce-quando-scatta-lobbligo-in-base-allo-stato-del-progetto/) |
| ACCA software S.p.A.: omzet **€29.728.713**, winst **€8.513.830** (2024, −4,7%) | Bevestigd door drie onafhankelijke bedrijvenregisters (fatturatoitalia, aziende.it, companyreports) | [fatturatoitalia.it](https://fatturatoitalia.it/acca-software-spa-01883740647/) |
| TeamSystem: **€1 mrd** omzet 2024 (+19%), **~2,5 mln** klanten, **>5.000** medewerkers | Bevestigd, o.a. door Il Sole 24 Ore | [ilsole24ore.com](https://www.ilsole24ore.com/art/teamsystem-ricavi-crescita-19percento-AHNzj8w) |
| **827.262** bouwondernemingen (660.652 IT / 166.610 buitenlands), dec 2024 | Cijfer bevestigd; herleid tot Infocamere-data. **Kanttekening:** nog steeds één blogbron, niet de primaire Infocamere-publicatie | [blog.edilnet.it](https://blog.edilnet.it/news-sempre-meno-imprese-edili-italiane-nelle-costruzioni-chi-sta-conquistando-il-settore/) |
| MarketIntelo: construction scheduling wereldwijd **$2,1 mrd** (2025) → $4,8 mrd (2034), CAGR 9,2% | Bevestigd. Aanvulling: Europa = 28,5% van het wereldtotaal; geen Italië-cijfer in het rapport | [marketintelo.com](https://marketintelo.com/report/construction-scheduling-software-market) |
| Capterra IT: PriMus **4,3/5**, 80% beveelt aan | Bevestigd — maar op **slechts 4 reviews**. Het rapport vermeldt dit correct in de bewijsbasistabel; in §3.4 staat het zonder die kwalificatie | [capterra.it](https://www.capterra.it/software/90588/primus) |
| Consip/MePA-verplichting voor ICT geldt **zonder drempelbedrag** | Bevestigd (afwijkend van het algemene aanbestedingsregime) | [Codiceappalti.it](https://www.codiceappalti.it/giurisprudenza/sentenza/mepa/acquisti-di-beni-e-servizi-informatici-obbligo-di-acquisizione-mediante-consip-e-mepa/33510) |
| Elecosoft Asta Powerproject: **geen Italiaanse reseller of referentieklant** | Bevestigd bij herhaald zoeken in het Italiaans: geen Italiaanse distributeur, productpagina of referentieklant gevonden; alleen generieke Udemy-cursussen. Blijft "afwezigheid van bewijs" | eigen zoekwerk 25-07-2026 |

### Onzeker

| Bewering | Waarom onzeker |
|---|---|
| **~4.000–7.000 professionele planners in Italië** | De drie "onafhankelijke" benaderingen zijn dat niet volledig: (b) en (c) putten allebei uit sectorwerkgelegenheid en gebruiken een aangenomen ratio (1:300–1:500 resp. 3–5%) die nergens is onderbouwd. Benadering (a) is methodisch zwak (zie de nieuwe waarschuwing in §2.4): LinkedIn-tellingen zijn opgeblazen door duplicaten, en de vacature→verloop-stap negeert dat het PNRR juist een groeipiek veroorzaakte. Het bereik 3.200–9.600 uit (a) is bovendien zo breed dat het elke uitkomst omvat. |
| **Comune di Bologna €999 voor 3 licenties × 3 jaar POWER PACK** (= €111/werkplek/jaar) | Het onderliggende determina-document is bij deze hercontrole niet opnieuw uitgelezen (atti9.comune.bologna.it niet benaderd). De rekenkunde klopt (999 / 9 = 111); de bron is niet herbevestigd. Dit is wél het getal dat het rapport zijn "belangrijkste prijsgetal" noemt en dat §6 aanstuurt — het verdient één directe hercontrole. |
| **Blumatica Kronoplan €100–300 per module per jaar** | Blijft een pure schatting zonder enige bron; Blumatica publiceert geen prijzen. Niet bevestigd, niet weerlegd. |
| **SYNCHRO 4D-prijzen** ($4.980 Virtuoso, €4.375 practitioner, €1.313 Control, €394 Field, $386–$4.280 TrustRadius) | Niet hercontroleerd. Alle drie de bronnen (ToolsTrunk, PricingNow, TrustRadius) zijn prijsaggregators zonder leveranciersstatus; de onderlinge tegenstrijdigheid ($386–$4.280 vs $4.980) is zelf een signaal. Behandel als indicatief. |
| **TILOS $2.095/jaar vs $4.290 perpetual** | Het rapport noemt de bronnen zelf al tegenstrijdig. Niet opgelost. |
| **"Geen Italiaans bestek eist CPM-logica of .xer"** | Het rapport markeert dit zelf al correct als afwezigheid van bewijs, met de juiste waarschuwing over afgeschermde portalen (acquistionlinerfi.it). Die zelfkritiek is terecht en blijft staan; niets in deze hercontrole bevestigt of weerlegt haar. |
| **Marktleiderschapsrangorde (§3.1)** | De volgorde PriMus > MS Project > P6 > STR Vision is nergens met marktaandeelcijfers onderbouwd en berust op kwalitatieve indicatoren (ACCA's eigen claim "il software più diffuso", een SEO-blog, overheidsdetermines). ACCA's omzet van €29,7 mln over de hele productlijn (van EdiLus tot TerMus) zegt weinig over het planningssegment. Plausibel maar ongemeten — het rapport erkent dit in §7. |
| **Verhouding diensten/licenties 1,0–1,5×** | Geëxtrapoleerd uit n=2, en de twee datapunten steunen de aanname niet. Nagerekend uit dezelfde contracten: bij **CAL** is consultancy €2.280 tegenover €3.022 aan software (licentiemodule €1.150 + onderhoud €1.872) = **0,75×**; bij **ACCA/Roma** is training €9.200 (incl. reiskosten) tegenover €8.820 licenties = **1,04×**. De waargenomen band is dus **0,75–1,04×**, niet 1,0–1,5×. Een lagere dienstenfactor drukt de totale marktraming verder: bij 0,75–1,05× wordt het totaal €20–68 mln in plaats van €23–83 mln. Twee overheidscontracten dragen echter sowieso geen marktbrede factor. |
