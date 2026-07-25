# Marktdynamiek, consolidatie en migratiepatronen in planningssoftware

**Dwarsdoorsnede-thema — wereldwijd marktonderzoek planningssoftware**
Peildatum: **25 juli 2026**. Alle bedragen in de valuta van de bron.

---

## 0. Methodologie en bronkwaliteit — lees dit eerst

### 0.1 Wat ik wel en niet heb kunnen doen

De opdracht vroeg om minimaal 12 `WebSearch`-opdrachten. **Dat is niet gelukt**: het zoekbudget van deze sessie was bij aanvang van mijn taak al volledig verbruikt (200/200 calls, opgemaakt door parallel lopende deelonderzoeken). Beide zoekpogingen die ik deed werden geweigerd.

Ik heb dat gecompenseerd door **circa 75 directe `WebFetch`-opdrachten op primaire bronnen**: SEC EDGAR (filings en de XBRL-API), jaarverslagen als PDF (die ik lokaal met `pypdf` heb uitgelezen omdat de fetch-laag ze niet kon renderen), leverancierprijspagina's, Oracle's contractuele beleidsdocumenten, Microsoft's lifecycle-database, de IFC-schemadocumentatie en de GitHub-API.

Praktisch gevolg: **dit rapport is bronkwalitatief sterker dan een zoek-gedreven variant, maar smaller in dekking.** Wat ontbreekt is precies wat je via zoeken vindt en niet via een bekende URL:

- vakpers en analistencommentaar over klantreacties op prijsverhogingen;
- gebruikersfora (Planning Planet, Reddit, LinkedIn) waar migratieverhalen circuleren;
- aanbestedingsdocumenten (TED en Find a Tender zijn JavaScript-gedreven en gaven via fetch geen resultaten; de TED-API weigerde met HTTP 405);
- Gartner/IDC/Forrester (paywall, en sowieso 403 op deze infrastructuur).

Ik heb daarom de secties over **klantreacties** en **migratiebestemmingen** bewust smaller en explicieter gehypothetiseerd gehouden dan de secties over eigendom, cijfers en prijsmechaniek. Waar ik op geheugen leun in plaats van op een gefetchte bron, staat dat er expliciet bij.

### 0.2 Labels die ik consequent gebruik

| Label | Betekenis |
|---|---|
| **[HARD]** | Jaarverslag, SEC-filing, gepubliceerde prijspagina, contractueel beleidsdocument, normtekst, lifecycle-database. Direct citeerbaar. |
| **[VENDOR]** | Claim van de leverancier zelf op eigen marketingmateriaal. Feitelijk mogelijk juist, maar niet onafhankelijk gecontroleerd en selectief gekozen. |
| **[AFGELEID]** | Mijn eigen rekenwerk op **[HARD]**-cijfers. De invoer is hard, de bewerking is van mij. |
| **[SCHATTING]** | Mijn inschatting. Redenering staat er altijd bij, inclusief betrouwbaarheidsniveau. |
| **[GEHEUGEN]** | Uit mijn trainingskennis, **niet geverifieerd in dit onderzoek**. Behandelen als hypothese. |

Een woord over 403's: `iso.org`, `buildingsmart.org`, `hexagon.com`, `se.com` en `blackstone.com` blokkeerden geautomatiseerde toegang. Waar ik daardoor terugval op secundaire routes of geheugen, staat dat vermeld.

---

## 1. Samenvatting

**De consolidatiegolf is voorbij haar hoogtepunt; de desintegratiegolf is begonnen.** Het dominante verhaal over planningssoftware van 2008–2022 was overname: Oracle kocht Primavera, Trimble kocht Vico en Tilos, Bentley kocht Synchro, Roper kocht Deltek, Schneider kocht RIB, Nemetschek kocht zich een portfolio bij elkaar. In 2025–2026 kantelt dat beeld. Hexagon heeft zijn hele Asset Lifecycle Intelligence-divisie — inclusief EcoSys, het cost/schedule-integratieproduct — **afgesplitst** tot Octave Intelligence plc, beursgenoteerd sinds 28 mei 2026, met $625 miljoen aan Hexagon overgemaakt op weg naar buiten **[HARD]**. Trimble heeft zijn omzet drie jaar op rij zien krimpen door desinvesteringen (van $3.799 mrd in 2023 naar $3.587 mrd in 2025) **[HARD]**. Eleco verkocht zijn visualisatietak aan het management **[HARD]**. Portfolio's worden gesnoeid, niet meer gevuld.

**De SaaS-transitie is bij de Europese spelers feitelijk klaar en dat verwijdert een groeimotor.** Nemetschek's licentie-omzet is ingestort van €234,8 mln (2021) naar €55,9 mln (2025) — min 76% — terwijl de totale omzet met 75% groeide naar €1.191,2 mrd; wederkerende omzet is nu 92,2% van de groep **[HARD]**. Eleco's eeuwigdurende licenties zijn nog **1%** van de omzet (£545k van £38,8 mln) **[HARD]**. Beide bedrijven zeggen het zelf: Nemetschek noemt de transformatie "zum Großteil abgeschlossen" en heeft ARR als stuurgetal laten vallen **[HARD]**. Het optische groei-effect van perpetual-naar-abonnement is opgebruikt. Wie daarna nog wil groeien moet dat doen met prijs, met AI, of met overnames.

**Oracle's Primavera is niet stervende, maar wel ondoorzichtig en contractueel klemvast.** De vaak gehoorde stelling "Oracle dwingt iedereen naar de cloud" klopt niet zoals ze wordt verteld: Oracle's eigen Lifetime Support-document van 2 juli 2026 laat zien dat P6 EPPM en P6 Professional **25.x** in december 2025 zijn uitgebracht met Premier Support tot **december 2030** **[HARD]**. On-premises P6 heeft een looprunway van minstens vier en een half jaar. Wat wél waar is: (a) Oracle publiceert geen enkele prijslijst voor Primavera — de Fusion Cloud-prijslijst van 16 juli 2026 bevat nul vermeldingen van "Primavera", "Aconex", "Unifier" of zelfs "Construction" **[HARD]**; (b) Oracle's supportbeleid maakt gedeeltelijk afscheid nemen economisch zinloos via de clausules *Matching Service Levels* en *Pricing Following Reduction of Licenses* **[HARD]**; (c) de productmarketing duwt onmiskenbaar naar Oracle Primavera Cloud met een vijffasen-migratietraject **[VENDOR]**. De lock-in zit dus in het contract en de prijsopaciteit, niet in een end-of-life-dreiging.

**Microsoft Project Server on-premises is elf dagen geleden uit support gelopen.** Project Server 2019 verloor Extended Support op **14 juli 2026** **[HARD]**. Dat is de scherpste migratiedeadline in dit hele veld en hij is zojuist verstreken. De opvolger is niet "de cloud" maar Project Server **Subscription Edition** (GA 2 november 2021, Modern Lifecycle, nog in support) **[HARD]** — Microsoft biedt dus wél een on-prem pad, maar alleen op abonnement.

**De onderkant van de markt wordt afgesnoept tegen prijzen die anderhalf tot twaalf keer lager liggen.** monday.com levert Gantt- en tijdlijnweergaven vanaf **$12 per seat per maand** en afhankelijkheden vanaf **$19** **[HARD]**. Een volwaardige CPM-planner van InEight kost **$1.800 per gebruiker per jaar** **[HARD]**; Microsoft Project Professional 2024 kost **$1.129,99** eenmalig **[HARD]**. Tegelijk is die work-managementgolf zelf aan het uitrazen: Asana's omzetgroei zakte van +44,6% (FY2023) naar **+9,2%** (boekjaar t/m 31 januari 2026) **[AFGELEID op HARD]**, en Smartsheet is van de beurs gehaald door Blackstone en Vista (delisting-notificatie bij de SEC op 22 januari 2025) **[HARD]**.

**4D/BIM is een laag bovenop de incumbents, geen vervanging ervan.** Bentley SYNCHRO's eigen productpagina zegt dat je "een schema kunt maken, óf integreren met externe planningssoftware (zoals P6, Asta Powerproject)" **[VENDOR]**. Trimble Tilos integreert met P6, MS Project én Asta **[VENDOR]**. De AI-planners voeden zich letterlijk met incumbent-data: nPlan claimt een dataset van meer dan **750.000 historische planningen** uit P6, Powerproject en MS Project **[VENDOR]**. Het CPM-bestandsformaat, niet het CPM-algoritme, is de burcht.

**De grootste gedeelde kwetsbaarheid is dat de moat een bestandsformaat is en dat formaat is al opengebroken.** MPXJ — LGPL-gelicentieerd, één onderhouder — leest en schrijft P6 XER en PMXML, Microsoft MPP en MSPDI, Asta Powerproject, Deltek Open Plan, Synchro, SDEF en meer, en praat bovendien met Project Server, Microsoft Planner, P6 Web Services en Oracle Primavera Cloud **[HARD]**. Wat de incumbents beschermt is niet de wiskunde uit 1959, maar de vertrouwensinfrastructuur eromheen: auditsporen, contractuele claimhardheid, DCMA-conformiteit, support-SLA's en inkoopcompliance.

---

## 2. De eigendomskaart: wie bezit wat, en sinds wanneer

### 2.1 Geverifieerd in dit onderzoek

| Object | Nu eigendom van | Gebeurtenis en datum | Bron / label |
|---|---|---|---|
| **EcoSys** (→ *Octave Sequence*) | Octave Intelligence plc | Afsplitsing van Hexagon **geëffectueerd 22 mei 2026**; belastingvrije pro-rata-uitkering, 1 Octave-aandeel per 10 Hexagon-aandelen; notering Nasdaq (OCTV) + Nasdaq Stockholm **28 mei 2026** | [HARD] — Octave 10-Q per 31-03-2026; investors.octave.com |
| **Deltek** (Acumen Fuse/Risk, Open Plan, Cobra, PM Compass, wInsight) | Roper Technologies | Overname van *Project Diamond Holdings Corp.* **voltooid 27–28 december 2016**; mede gefinancierd met ~$1,19 mrd senior notes uit december 2016 | [HARD] — Roper 8-K/A 15-03-2017 en 10-K FY2016 |
| **Aconex** | Oracle | Oracle-10-K's noemen Aconex vanaf boekjaar **FY2018** (ingediend 22-06-2018) | [HARD] — SEC full-text search op CIK 0001341439 |
| **GoCanvas** | Nemetschek Group | Geconsolideerd vanaf **1 juli 2024**, segment Build; "bislang größte Übernahme der Unternehmensgeschichte"; investeringskasstroom 2024 −€707,1 mln | [HARD] — Nemetschek Geschäftsbericht 2025 |
| **Firmus AI**, **Manufacton** | Nemetschek Group | Overnames in boekjaar **2025**; daarnaast venture-investering in *Handoff* | [HARD] — idem |
| **Pemac** | Eleco plc | Overname **januari 2025** (Ierland, CMMS) | [HARD] — Eleco Annual Report 2025 |
| **Kivue Ltd** | Eleco plc | Overname **februari 2026** (PPM), kasuitstroom £1,8 mln | [HARD] — idem |
| **Veeuze GmbH** | Management (MBO) | **Desinvestering** na jaareinde 2025; non-cash bijzondere waardevermindering | [HARD] — idem |
| **Smartsheet** | Blackstone + Vista Equity Partners | Beursnotering beëindigd; Form 25-NSE bij SEC **22 januari 2025** | [HARD] voor de delisting; dealwaarde niet geverifieerd (zie 2.3) |
| **Trimble transportation-telematics** | Platform Science | Verkocht **8 februari 2025**; Trimble hield ~32,5% belang met reële waarde ~$253,9 mln | [HARD] — Trimble 10-K per 02-01-2026 |
| **Trimble landbouw** | PTx Trimble (JV met AGCO) | Joint venture, genoemd als actieve JV in FY2025-10-K | [HARD] — idem |
| **AVEVA** | Schneider Electric | Bentley's 10-K FY2025 noemt in de concurrentieparagraaf letterlijk "AVEVA (Schneider Electric)" | [HARD] als bevestiging van eigendom |
| **Tilos** | Trimble | Actief product; koppelt met P6, MS Project, Asta Powerproject, Trimble Business Center, Quadri/Novapoint | [VENDOR] — construction.trimble.com |
| **SYNCHRO / SYNCHRO+** | Bentley Systems | Genoemd als 4D-onderdeel van Bentley Infrastructure Cloud in de 10-K FY2025 | [HARD] |

### 2.2 De Octave-afsplitsing is de belangrijkste gebeurtenis van het afgelopen jaar

Dit verdient meer dan een tabelregel, want het is een structuurbreuk in het cost-and-schedule-segment.

Hexagon heeft zijn Asset Lifecycle Intelligence-divisie in haar geheel losgelaten. De nieuwe entiteit heet **Octave Intelligence plc** en heeft EcoSys hernoemd tot **Octave Sequence**, SmartPlant/Smart 3D tot **Octave Forte**, de Construction Suite tot **Octave OnSite**, ETQ tot **Octave Reliance** en Luciad tot **Octave Alto** **[VENDOR]** (octave.com).

De cijfers **[HARD]**, uit de 10-Q per 31 maart 2026 en de IR-site:

| Metriek | Waarde |
|---|---|
| Omzet FY2025 | $1,6 mrd |
| ARR FY2025 | $1,1 mrd |
| Klanten / medewerkers | ~4.500 / ~7.200 |
| Omzet Q1 2026 | **$386,5 mln** (Q1 2025: $382,8 mln) → **+1%** |
| — waarvan abonnementen | $279,2 mln (72%) |
| — waarvan licenties | $35,1 mln (**9%**) |
| — waarvan diensten en overig | $72,2 mln (19%) |
| SaaS binnen abonnementen | $84,7 mln, **+25%** |
| Maintenance-abonnement | $122,1 mln, +5% |
| Subscription licences | $72,4 mln, **−2%** |
| Regio's | Amerika $187,7 mln / EMIA $145,5 mln / APAC $53,2 mln |
| Financiering bij afsplitsing | $500 mln revolver + $500 mln+ termijnlening; **$625 mln overgemaakt aan Hexagon** |

Lees die tabel als een röntgenfoto. De groei is +1% in totaal, met −4% desinvesteringseffect. De enige echt groeiende lijn is SaaS (+25%) en die is met $84,7 mln nog maar 22% van de omzet. Ondertussen krimpt de subscription-licentielijn. En het bedrijf gaat de zelfstandigheid in met een balans die met een half miljard dollar aan termijnschuld is belast omdat er $625 mln naar de moeder is gevloeid.

**[SCHATTING, middelhoog vertrouwen]** Dit is een klassieke afsplitsing van een activum met stabiele kasstroom maar lage groei, gefinancierd door de afgesplitste partij zelf. Octave heeft nu drie tegelijke opgaven: SaaS-transitie afmaken, schuld aflossen, en groeien op een aandelenmarkt die 1% groei niet beloont. Voor EcoSys-klanten — vaak grote eigenaar-organisaties in olie & gas, nucleair en infrastructuur — betekent dat een leverancier met meer prijsdruk en minder ruimte voor R&D-experiment dan onder Hexagon. Voor concurrenten in cost-and-schedule-integratie is dat een openstaande deur.

### 2.3 Uit geheugen, in dit onderzoek **niet** geverifieerd

Ik zet deze apart omdat ze in vrijwel elk marktoverzicht opduiken en ik ze niet met een gefetchte bron kan onderbouwen. **Behandel als hypothese, niet als feit.**

| Bewering | Label |
|---|---|
| Oracle nam Primavera Systems over in 2008 | [GEHEUGEN] |
| Oracle betaalde ~$1,2 mrd voor Aconex (afgerond 2018) | [GEHEUGEN] — het *bestaan* van de overname is wél hard (2.1) |
| Oracle nam Textura over in 2016 (~$663 mln) | [GEHEUGEN] |
| Trimble nam Vico Software over in 2012 | [GEHEUGEN] |
| Trimble nam Linear Project GmbH (TILOS) over in 2018 | [GEHEUGEN] — dat Trimble Tilos *nu* bezit is hard |
| Bentley nam Synchro Ltd over in 2018 | [GEHEUGEN] — Bentley's eigendom nu is hard |
| Nemetschek nam Bluebeam over in 2014 | [GEHEUGEN] — Bluebeam als Nemetschek-merk is hard |
| Schneider Electric nam RIB Software over in 2020 (~€1,4 mrd, €29/aandeel) | [GEHEUGEN] |
| Roper betaalde ~$2,8 mrd voor Deltek | [GEHEUGEN] — datum en de $1,19 mrd notes zijn hard |
| Blackstone/Vista betaalden $8,4 mrd voor Smartsheet | [GEHEUGEN] — de delisting is hard |
| Hexagon nam EcoSys over in 2017 | [GEHEUGEN] — Octave-eigendom nu is hard |

Eén observatie die ik wél kon doen: **RIB Software noemt Schneider Electric nergens op zijn eigen website** — niet op de homepage, en de "about us"-pagina gaf 404 **[HARD, negatieve waarneming]**. Ook zijn de merknamen *iTWO 4.0* en *MTWO* verdwenen ten gunste van **RIB 4.0**; het portfolio is nu RIB 4.0, CostX, Candy, BuildSmart, Presto en BI+, met de claim van "23.000+ bedrijven in 100+ landen" **[VENDOR]**. Een leverancier die zijn concernmoeder niet noemt, positioneert zich als zelfstandig merk. Wat dat betekent — voorbereiding op verkoop, of gewoon merkbeleid — kan ik niet vaststellen.

---

## 3. Hoe groot zijn de spelers werkelijk

Alles hieronder **[HARD]**, uit SEC-filings, de SEC XBRL-API of gepubliceerde jaarverslagen. Let op de verschillende boekjaareindes.

### 3.1 Omzet en groei

| Onderneming | Boekjaar | Omzet | Groei | Relevante deelomzet |
|---|---|---|---|---|
| Oracle | FY t/m 31-05-2026 | **$67,357 mrd** | +17,3% | Primavera niet uitgesplitst |
| Roper Technologies | 2025 | **$7,9025 mrd** | +12,3% | Application Software $4,483 mrd (Deltek zit hierin) |
| Autodesk | FY t/m 31-01-2026 | **$7,206 mrd** | +18% | **AECO $3,583 mrd (+22%)** |
| Trimble | FY t/m 02-01-2026 | **$3,5873 mrd** | −3% gerapporteerd, +6% organisch | **AECO $1,4986 mrd**, operationeel resultaat $512,1 mln (**34,2% marge**) |
| Octave Intelligence | 2025 | **$1,6 mrd** | n.v.t. (eerste jaar zelfstandig) | ARR $1,1 mrd |
| Bentley Systems | 2025 | **$1,5018 mrd** | +11,0% | ARR $1,4945 mrd per 31-03-2026 |
| Procore | 2025 | **$1,3225 mrd** | +14,8% | — |
| Nemetschek | 2025 | **€1,1912 mrd** | +19,7% (vw +22,6%) | Build 40%, Design 45% |
| Asana | FY t/m 31-01-2026 | **$790,8 mln** | +9,2% | — |
| Eleco plc | 2025 | **£38,8 mln** | +20% (organisch +11%) | ARR £34,3 mln |

### 3.2 Wat de omzetreeksen laten zien

**Trimble krimpt op papier en groeit onder de motorkap.** Omzetreeks: $3.798,7 mln (2023) → $3.683,3 mln (2024) → $3.587,3 mln (2025) **[HARD]**. Dat is −5,6% over twee jaar **[AFGELEID]**. Tegelijk: ARR $2,39 mrd eind 2025, +6% gerapporteerd maar **+14% organisch**, en abonnements- en dienstenomzet 68,4% van het totaal **[HARD]**. In Q1 2026 keert de gerapporteerde groei terug: omzet $939,9 mln (+12%), ARR $2,43 mrd (+12%), AECO $391,1 mln tegen $335,4 mln (+16,6%) **[HARD]**. Trimble heeft twee jaar lang bedrijfsonderdelen afgestoten en komt daar nu doorheen. Het personeelsbestand is ruim 11.500 **[HARD]**.

**Autodesk's AECO is met $3,583 mrd de grootste enkele AEC-softwarelijn ter wereld** — ruim twee keer Trimble AECO en 2,4× Bentley's hele omzet **[AFGELEID]**. Maar Autodesk verbouwt tegelijk zijn distributie ingrijpend: TD Synnex, de grootste distributeur, ging van **39% → 33% → 14%** van de netto-omzet over FY2024/25/26 **[HARD]**, en de indirecte kanaalomzet staat op 37%. Het personeelsbestand daalde van ~15.300 naar **~14.300** **[HARD]**, met een Restructuring January 2026 Plan in de filing. Billings groeiden 30% tegen 18% omzetgroei — een gevolg van de overgang naar jaarlijkse facturatie bij meerjarige contracten, waarvan Autodesk zelf zegt dat het effect doorloopt in FY2027 **[HARD]**.

**Procore's groei is aan het normaliseren.** Omzetreeks: $400,3 mln (2020) → $514,8 (2021) → $720,2 (2022) → $950,0 (2023) → $1.151,7 (2024) → $1.322,5 mln (2025) **[HARD]**. Dat is een daling van +28,6% (2022→2023) naar +14,8% (2024→2025) **[AFGELEID]**. Guidance FY2026: $1.499–1.503 mln, +13,6% aan de bovenkant **[HARD]**. Bruto-omzetretentie **95%** **[HARD]** — dat wil zeggen dat er jaarlijks 5% van de omzetbasis wegvalt vóór uitbreiding. En er is een leiderschapswissel: de Q1-2026-persconferentie citeert **CEO Ajei Gopal** en **CFO Rachel Pyles**, met een aandeleninkoop van $100 mln (1,8 mln aandelen) **[HARD]**. Een nieuwe CEO plus buybacks plus "durable and profitable growth" als geciteerde koers is het profiel van een bedrijf dat van groeiverhaal naar rendementsverhaal schuift.

**Bentley's netto-retentie zakt licht.** Q1 2026: omzet $424,2 mln (+14,5%), abonnementen $392,5 mln (+14,7%), ARR $1.494,5 mln tegen $1.319,3 mln, ARR-groei op constante valuta **11,5%**, netto-omzetretentie **109%** tegen 110% een jaar eerder **[HARD]**. Bentley bedient ~42.000 accounts in 189 landen; ongeveer 60% van de ARR draait op de commerciële modellen die in aanmerking komen voor Cloud Services Subscription, en bij E365 wordt "het merendeel van de abonnementsomzet toegerekend aan dagelijkse consumptie", met vloeren en plafonds in het contract **[HARD]**.

Dat consumptiemodel is strategisch relevant en wordt vaak over het hoofd gezien: **Bentley verkoopt niet primair per stoel, maar per verbruikte dag.** Dat is een fundamenteel ander prijsanker dan Oracle (per named user, plus 22% support) of monday.com (per seat per maand). Het maakt vergelijkende prijstabellen tussen deze leveranciers ronduit misleidend als je de eenheid niet meeneemt.

### 3.3 De schatting die ik niet hard kan maken: hoe groot is Oracle Primavera

Oracle rapporteert Construction & Engineering niet apart. In het FY2018-10-K wordt de sector alleen genoemd in een opsomming van branches waarin Oracle branchespecifieke applicaties levert **[HARD]**.

**[SCHATTING, laag vertrouwen]** Mijn bandbreedte: **$0,7–1,5 mrd omzet per jaar** voor Oracle Construction & Engineering (P6, Unifier, Aconex, Textura, Primavera Cloud) in FY2026. Redenering en zwaktes:

1. *Bovengrens.* Trimble AECO en Bentley zitten elk rond $1,5 mrd. Oracle's C&E-portfolio is breder in de eigenaar-/kapitaalprojectenmarkt maar veel smaller in ontwerp en veld. Dat Oracle C&E substantieel groter zou zijn dan Bentley in zijn geheel, terwijl Oracle er geen segmentregel voor opent en er geen prijslijst voor publiceert, acht ik onwaarschijnlijk.
2. *Ondergrens.* De geïnstalleerde basis is enorm — P6 duikt zelfs op in technische NI-43-101-rapporten van mijnbouwbedrijven bij de SEC als het gebruikte planningsinstrument **[HARD, indirect bewijs]** — en supportomzet op eeuwigdurende licenties is uiterst kleverig. Onder $700 mln zou impliceren dat de installed base kleiner is dan de zichtbare marktpenetratie suggereert.
3. *Waarom dit slecht onderbouwd is.* Ik heb geen ARR-cijfer, geen klantaantal en geen prijspunt van Oracle zelf. Er zit een factor twee tussen mijn onder- en bovengrens en die kan ik niet smaller maken zonder analistenrapporten. **Gebruik dit getal niet in een businesscase.**

---

## 4. De SaaS-transitie, gekwantificeerd

Dit is de meest overtuigend te documenteren langetermijntrend in dit rapport, omdat de jaarverslagen er expliciete regels voor bevatten.

### 4.1 Nemetschek: de licentie-instorting in vijf jaar

Uit de vijfjaarstabel in het Geschäftsbericht 2025 (publicatiedatum 19-03-2026), bedragen in mln euro **[HARD]**:

| | 2021 | 2022 | 2023 | 2024 | 2025 |
|---|---|---|---|---|---|
| Omzet totaal | 681,5 | 801,8 | 851,6 | 995,6 | **1.191,2** |
| — Softwarelicenties | 234,8 | 233,1 | 161,1 | 100,7 | **55,9** |
| — Wederkerende omzet | 416,7 | 532,6 | 652,7 | 861,2 | **1.098,1** |
| — Subscriptie + SaaS | 132,0 | 204,2 | 301,8 | 567,8 | **858,7** |
| ARR | 456,5 | 581,7 | 718,6 | 1.019,9 | **1.199,2** |
| EBITDA | 222,0 | 257,0 | 257,7 | 301,0 | **371,1** |
| EBITDA-marge | 32,6% | 32,0% | 30,3% | 30,2% | **31,2%** |

**[AFGELEID]** Licentie-omzet: **−76,2%** in vier jaar. Aandeel van licenties in de omzet: van **34,5%** naar **4,7%**. Subscriptie+SaaS: **+551%**. Totale omzet: **+74,8%**.

En let op de marge: die dook tijdens de transitie (32,6% → 30,2%) en herstelt nu pas (31,2%). Dat is het klassieke SaaS-transitiedal, en Nemetschek is er doorheen.

Nemetschek zegt dit zelf, letterlijk, in de sectie over stuurgetallen **[HARD, eigen vertaling]**: *"Aangezien de beoogde transformatie van het bedrijfsmodel zeer ver gevorderd en grotendeels afgerond is, hebben deze kengetallen aan betekenis verloren."* ARR, ARR-groei en het aandeel wederkerende omzet zijn in FY2025 als stuurgetallen geschrapt — ze staan met een streepje in de tabel waar 2024 nog vinkjes had **[HARD]**.

Overige harde cijfers 2025: wederkerende omzet **92,2%** van het totaal (2024: 86,5%); subscriptie+SaaS **72,1%** van de concernomzet (2024: 57,0%); segmentverdeling Design 45% (v.j. 49%), Build 40% (v.j. 34%), Manage 4%, Media 11%; regio's Amerika 42%, EMEA excl. Duitsland 31%, Duitsland 17%, Azië-Pacific 10%; nettoschuld gedaald van €294,6 mln naar €107,5 mln **[HARD]**. De sterke groei van 2025 werd mede gedreven door de afronding van de abonnementsomschakeling bij **Bluebeam**, wat vooral in H1 2025 tijdelijk extra omzetdynamiek gaf **[HARD]** — dat is expliciet een eenmalig effect.

### 4.2 Eleco: de kleinste onafhankelijke, en het schoonste voorbeeld

Eleco plc (voorheen Elecosoft; eigenaar van **Asta Powerproject**) is de enige zuivere planningssoftware-onderneming in dit veld die als beursgenoteerde eenheid volledig transparant rapporteert. Uit het Annual Report 2025 (uitgebracht 8 mei 2026; voorzittersverklaring gedateerd 27 april 2026) **[HARD]**:

| Metriek | 2025 | 2024 |
|---|---|---|
| Totale omzet | **£38,816 mln** | £32,394 mln |
| — Wederkerende omzet | £31,313 mln (**81%**) | £24,933 mln (77%) |
| — Diensten | £6,958 mln (18%) | £6,448 mln (20%) |
| — **Eeuwigdurende licenties** | **£0,545 mln (1%)** | £1,013 mln (3%) |
| ARR | **£34,281 mln** (+29%) | £26,590 mln |
| Adjusted EBITDA | £10,2 mln (+32%) | £7,7 mln |
| Adjusted PBT | £7,3 mln (+35%) | £5,4 mln |
| Brutomarge | **89,6%** | 89,3% |
| Netto-omzetretentie | **110%** | 109% |
| R&D | £5,8 mln (15% van omzet; 19% van wederkerende omzet) | £5,4 mln (17%) |
| Kas / schuld | £16,3 mln / **schuldenvrij** | £14,0 mln |
| Medewerkers | **316** | — |

Geografisch: VK **47%** van de omzet (£18,4 mln, +16%), Scandinavië 18%, Duitsland 8%, VS het restant. Amerikaanse totale omzet daalde 6% door twee niet-herhaalde dienstenorders, maar Amerikaanse **wederkerende** omzet steeg 18% naar $1,3 mln **[HARD]**. R&D wordt gedragen door **ruim tachtig interne ontwikkelaars**, waarvan £3,5 mln geactiveerd en £2,3 mln direct ten laste van het resultaat **[HARD]**.

Twee dingen springen eruit. Ten eerste: **£545k eeuwigdurende licenties is praktisch nul**. De perpetual-markt voor bouwplanningssoftware in het VK bestaat niet meer als inkomstenbron. Ten tweede: de CFO schrijft expliciet dat deze prestatie *"post our SaaS financial transition"* is **[HARD]** — Eleco is er, net als Nemetschek, doorheen.

Eleco heeft zichzelf in 2026 hernoemd van Elecosoft naar **Eleco** en lanceert **AstaGPT** en **Asta Vision Plus** (API-gedreven toegang tot planningsdata, expliciet bedoeld om klanten voor te bereiden op "predictive, AI-driven planning" en integratie met grote taalmodellen) **[VENDOR/HARD-mix; de productclaims zijn vendor, de vermelding in het jaarverslag is hard]**. Ook nieuw: **Asta Estimate**, dat kosten-, koolstof- en planningsdata in één workflow koppelt via directe links met Asta Powerproject **[VENDOR]**.

Aandelenkoers op 25 juli 2026: **130,50p**, −3,37% op de dag, 52-weeksbereik 106,50–175,40p **[HARD]**. Slotkoers per 31 december 2025: 126p **[HARD]**. **[AFGELEID]** De koers staat ruim een kwart onder de 52-weekstop, ondanks +20% omzetgroei, +29% ARR en +35% aangepaste winst. De markt beloont deze categorie op dit moment niet.

### 4.3 Octave en de anderen: waar de transitie nog loopt

Octave zit er middenin en dat is af te lezen: licenties nog 9% van de omzet, subscription licences −2%, maintenance +5%, alleen SaaS +25% **[HARD]** (zie 2.2). Dat is precies het profiel van een portefeuille die nog een jaar of drie transitiepijn voor de boeg heeft — met het verschil dat Octave die pijn nu draagt mét schuld en zonder concernmoeder.

**[AFGELEID]** De volgorde langs de transitiecurve, van klaar naar nog-te-gaan: **Eleco** (perpetual 1%) ≈ **Nemetschek** (licenties 4,7%, stuurgetal geschrapt) → **Bentley** (abonnementen 93% van Q1-omzet) → **Autodesk** (klaar op abonnementen, maar midden in een distributie- en facturatietransitie) → **Octave** (licenties 9%, subscription licences krimpend) → **Oracle Primavera** (perpetual + 22% support nog steeds het standaardmodel; zie sectie 5).

---

## 5. Prijs, prijsverhoging en de mechaniek van lock-in

### 5.1 Prijstransparantie is een scherpe scheidslijn

Bevindingen uit directe fetches, allemaal **[HARD]** (inclusief de negatieve waarnemingen):

| Leverancier / product | Prijs gepubliceerd? | Wat er staat |
|---|---|---|
| **monday.com** | **Ja** | Free (2 seats) / Basic $9 / Standard $12 / Pro $19 per seat per maand bij jaarbetaling; Enterprise op aanvraag |
| **InEight NOW** | **Ja** | Schedule $199/mnd of **$1.800/jaar**; Estimate $260/mnd of $2.388/jr; Document $73/mnd of $624/jr; Compliance & Completions $55/mnd of $444/jr |
| **Bluebeam** (Nemetschek) | **Ja** | Basics **$260** / Core **$330** / Complete **$440** / Max **$590** per gebruiker per jaar |
| **Microsoft Project** (desktop) | **Ja** | Project Standard 2024 **$679,99** eenmalig; Project Professional 2024 **$1.129,99** eenmalig |
| **Oracle technologie (referentie)** | Ja | Prijslijst 1 juni 2026; support consequent **22%** van de licentieprijs |
| **Oracle Primavera / Construction & Engineering** | **Nee** | Geen enkele publieke prijslijst; zie 5.2 |
| **Autodesk bouwproducten** | **Nee (meer)** | construction.autodesk.com/pricing/ toont bundels *Forma Build / Takeoff / Estimate / Data Management* met "Get a Quote", zonder bedragen |
| **Bentley SYNCHRO** | **Nee** | "Speak with an expert"; ook via de Virtuosity-webshop geen prijs op de vindbare pagina's |
| **ALICE Technologies** | **Nee** | "flexible pricing based on the size and scope of your projects"; meerstaps aanvraagformulier; indicatie: projecten vanaf ~$75 mln bouwsom |
| **Procore** | **Nee** | Geen prijs in het onderzochte materiaal |
| **Asta Powerproject** (Eleco) | **Nee** | Geen prijs op de productpagina |
| **Microsoft Project Server SE** | **Nee** | "requires finding a partner" |

**[AFGELEID]** Het patroon is scherp: **wie de onderkant van de markt bedient publiceert prijzen; wie de bovenkant bedient doet dat niet.** De enige uitzondering die de regel bevestigt is InEight NOW, dat expliciet gepositioneerd is als instapproduct "for individuals or small teams just getting started" en voor pilots — precies het segment waar prijstransparantie een verkoopargument is.

Autodesk is hier de opvallendste beweging: bouwproducten die eerder wél per gebruiker geprijsd waren, staan nu achter een offertemuur. **[SCHATTING, middelhoog vertrouwen]** Dat past bij de bredere Autodesk-verbouwing (directe transactiemodel, kanaalconcentratie van 39% naar 14% bij TD Synnex, overgang naar jaarlijkse facturatie) en verschuift prijsonderhandeling van de lijst naar de accountmanager. Voor de klant betekent dat minder benchmarkbaarheid, wat structureel prijsverhogend werkt.

### 5.2 Oracle: de prijs staat nergens, de lock-in staat wél zwart-op-wit

Ik heb Oracle's publieke prijslijstpagina en twee complete prijslijst-PDF's uitgelezen **[HARD]**:

- **Oracle Fusion Cloud Service Global Price List**, ingangsdatum **16 juli 2026**, 25 pagina's: **0** vermeldingen van "Primavera", "Aconex", "Unifier", "Construction" of "Project Management" (geteld met tekstextractie op de volledige PDF).
- **Oracle E-Business Suite Applications Global Price List**, **6 november 2025**: eveneens geen Primavera-regels.
- De indexpagina `oracle.com/us/corporate/pricing/price-lists/` somt ruim twintig prijslijsten op — Technology, Fusion, PeopleSoft, JD Edwards, Siebel, MySQL, Java SE, Marketing Cloud — en **geen enkele voor Construction & Engineering**.

Ter vergelijking wél publiek: de **Oracle Technology Global Price List** van **1 juni 2026** laat de klassieke verhouding zien, bijvoorbeeld Database Enterprise Edition $950,00 per Named User Plus met $209,00 Software Update License & Support — precies **22,0%** **[HARD/AFGELEID]**.

Wat wél publiek is, is het contract. Uit **Oracle Software Technical Support Policies, ingangsdatum 10 juli 2026** (31 pagina's), letterlijk **[HARD]**:

> **Matching Service Levels** — *"When acquiring technical support, all licenses in any given license set must be supported under the same technical support service level... You may not support a subset of licenses within a license set; the license set must be reduced by terminating any unsupported licenses. You will be required to document license terminations via a termination letter."*

> **Pricing Following Reduction of Licenses or Support Level** — *"In the event that a subset of licenses on a single order is terminated or if the level of support is reduced, support for the remaining licenses on that license order will be priced at Oracle's list price for support in effect at the time of termination or reduction minus the applicable standard discount. Such support price will not exceed the previous support fees paid, plus any applicable country annual adjustments, for both the remaining licenses and the licenses being terminated or unsupported, and will not be reduced below the previous support fees paid for the licenses continuing to be supported."*

> **Reinstatement** — *"if technical support lapsed, then the reinstatement fee is 150% of the last annual technical support fee you paid for the relevant program"*, en: *"Renewal adjustments may be applied to the annual support fee."*

**[AFGELEID]** Dit is de mechanica van lock-in, in gewone taal:

1. Je kunt niet een deel van je P6-licenties op support houden en een deel niet. Alles of niets per licentieset.
2. Wil je afslanken, dan moet je licenties formeel **beëindigen** — met een beëindigingsbrief. Je kunt ze niet "op de plank leggen voor later".
3. En als je afslankt, wordt de resterende support herprijsd op **lijstprijs minus standaardkorting**, met een ondergrens: *niet lager dan wat je voorheen betaalde voor de licenties die je aanhoudt*. Historische kortingen die je ooit op volume bedong, verdampen bij volumeverlaging.
4. Laat je support verlopen en wil je terug, dan kost dat **150%** van je laatste jaarbedrag als herstelboete, bovenop het lopende supportbedrag.

Netto: **een organisatie die 40% van haar P6-stoelen niet meer gebruikt, bespaart doorgaans veel minder dan 40%, en soms bijna niets.** Dat is geen prijsverhoging in de zin van een aangekondigd percentage — het is een structuur waarin krimp niet loont. Dat verklaart waarom migratie weg van P6 in de praktijk vaak een *volledige* migratie moet zijn om financieel iets op te leveren, wat de drempel juist verhoogt.

**Ik heb geen enkele gedocumenteerde, gedateerde Oracle-prijsverhoging voor Primavera kunnen vinden in dit onderzoek.** Alle claims daarover die in de markt circuleren, kan ik noch bevestigen noch weerleggen. Dit is de grootste blinde vlek in dit rapport.

### 5.3 Bluebeam: hoe een gedwongen migratie er in de praktijk uitziet

Nemetschek's Bluebeam is het best gedocumenteerde voorbeeld van een perpetual-naar-abonnement-overgang met harde deadline **[HARD]**, van de eigen prijspagina:

- Vier abonnementen: Basics $260, Core $330, Complete $440, Max $590 per gebruiker per jaar. Max is "introductory pricing" met AI-functies.
- Geen eeuwigdurende optie meer op de prijspagina.
- **Revu 20 bereikt End of Support op 31 juli 2026 en End of Life op 31 december 2026**, met de instructie om over te stappen naar Basics/Core/Complete/Max.

**[AFGELEID]** Voor een gebruiker met een oude Revu-licentie die tot nu toe niets betaalde, wordt de kosten per gebruiker in één klap $260 tot $590 per jaar. Over een team van 50 gebruikers is dat $13.000–29.500 aan nieuwe jaarlijkse kosten. Nemetschek's eigen jaarverslag bevestigt de macro-kant: de afronding van de Bluebeam-abonnementsomschakeling gaf in H1 2025 tijdelijk verhoogde omzetdynamiek **[HARD]**.

Dit is de sjabloon die de hele sector volgt: geen aangekondigde prijsverhoging, maar een end-of-life-datum die de nulprijs onmogelijk maakt.

### 5.4 De prijsafstand tussen de segmenten, op één rij

Alle bedragen omgerekend naar **kosten per gebruiker per jaar**, uitsluitend uit gepubliceerde prijzen **[HARD invoer, AFGELEID rekenwerk]**:

| Product | Per gebruiker per jaar | Wat je krijgt |
|---|---|---|
| monday.com Standard | **$144** | Gantt- en tijdlijnweergave |
| monday.com Pro | **$228** | + afhankelijkheden (via "advanced columns") |
| Bluebeam Basics | **$260** | Markups en documentbeheer (geen planning) |
| Bluebeam Max | **$590** | + AI-functies |
| InEight Document NOW | **$624** | Documentbeheer |
| **InEight Schedule NOW** | **$1.800** | **Volledige CPM, AI-planning, risicoanalyse** |
| InEight Estimate NOW | **$2.388** | Calculatie |
| MS Project Professional 2024 | **$1.129,99 eenmalig** | Volledige desktop-CPM, geen abonnement |
| Oracle Primavera P6 | **onbekend** | — |
| Bentley SYNCHRO | **onbekend** (consumptie) | — |
| Asta Powerproject | **onbekend** | — |
| ALICE | **onbekend**, projecten ≥ ~$75 mln | — |

**[AFGELEID]** De factor tussen "een Gantt met afhankelijkheden" ($228) en "een echte CPM-planner" ($1.800) is ruim **acht**. Dat is de prijsruimte waarin de work-managementtools de onderkant afsnoepen: voor de aannemer die alleen een tijdlijn met afhankelijkheden nodig heeft, is $228 volstrekt voldoende en $1.800 niet te rechtvaardigen.

Maar let op de andere kant: **Microsoft Project Professional 2024 kost $1.129,99 eenmalig.** Over vijf jaar is dat $226 per jaar — vrijwel identiek aan monday.com Pro, maar met volledige CPM, resource-levelling, baselines en kritieke-padanalyse **[HARD, uit Microsoft's eigen productbeschrijving]**. Wie MS Project op de plank heeft liggen, heeft economisch gezien geen enkele reden om te migreren zolang de desktop volstaat. **Dat is de stilste en waarschijnlijk grootste concurrentiefactor in dit hele veld en hij komt in geen enkel marktrapport voor.**

---

## 6. Migratie weg van P6: het beeld klopt niet zoals het verteld wordt

### 6.1 De empirie: Oracle bouwt on-prem P6 gewoon door

Ik heb Oracle's **Lifetime Support Policy: Oracle Applications**, ingangsdatum **2 juli 2026** (98 pagina's), volledig uitgelezen. De Primavera-sectie beslaat drie pagina's. De relevante regels **[HARD]**:

| Release | GA | Premier Support eindigt | Extended Support | Sustaining Support |
|---|---|---|---|---|
| P6 EPPM 19.x | dec 2019 | dec 2024 | **Niet beschikbaar** | Onbepaald |
| P6 EPPM 20.x | dec 2020 | dec 2025 | Niet beschikbaar | Onbepaald |
| P6 EPPM 21.x | dec 2021 | **dec 2026** | Niet beschikbaar | Onbepaald |
| P6 EPPM 22.x | dec 2022 | dec 2027 | Niet beschikbaar | Onbepaald |
| P6 EPPM 23.x | dec 2023 | dec 2028 | Niet beschikbaar | Onbepaald |
| P6 EPPM 24.x | dec 2024 | dec 2029 | Niet beschikbaar | Onbepaald |
| **P6 EPPM 25.x** | **dec 2025** | **dec 2030** | Niet beschikbaar | Onbepaald |

Identieke reeks voor **P6 Professional**. Ook Primavera Analytics loopt door tot 25.x (Premier tot dec 2030). Oracle heeft dus in **december 2025 een nieuwe on-premises release uitgebracht met support tot eind 2030**.

**Dit weerlegt de meest gangbare marktbewering over Primavera.** Er is geen aangekondigde end-of-life voor on-prem P6. Wat er wél is:

1. **Geen Extended Support, ooit, voor Primavera.** Bij Oracle Database krijg je na Premier meestal nog betaalde Extended Support; bij Primavera staat overal "Not Available". Na vijf jaar val je direct terug op **Sustaining Support** — dat is onbeperkt in duur maar bevat geen nieuwe updates, geen nieuwe patches, geen nieuwe certificeringen tegen nieuwe besturingssystemen of databases. **[AFGELEID]** Dat is een zachte dwang: je *mag* op 21.x blijven na december 2026, maar je krijgt geen certificering meer voor de volgende Windows Server of Oracle Database-versie. Je IT-afdeling dwingt de upgrade af, niet Oracle.
2. **Een agressief migratieverhaal op de productpagina.** Oracle's eigen P6-pagina positioneert P6 EPPM als de gevestigde on-prem-oplossing en presenteert een **vijffasen-migratietraject** (Readiness, Preparation, Selection, Migration, Go-live) naar Oracle Primavera Cloud, met de claim dat OPC *"the industry's only solution that combines CPM contract scheduling and task management in a single cloud environment"* is **[VENDOR]**.

**[AFGELEID]** De juiste formulering is dus: *Oracle onderhoudt on-prem P6 volledig, maar investeert de innovatie in de cloud en trekt met marketing en contractmechaniek, niet met deadlines.*

### 6.2 Waarheen migreren organisaties dan wél

Hier moet ik eerlijk zijn: **ik heb dit niet empirisch kunnen vaststellen.** Geen gebruikersfora, geen vakpers, geen aanbestedingsdata. Wat ik wél heb is de vorm van het aanbod, en die verraadt waar de vraag zit.

**[SCHATTING, middelhoog vertrouwen — gebaseerd op productpositionering, niet op klantdata]** Vier bestemmingen, in afnemende volgorde van waarschijnlijkheid:

**a) Oracle Primavera Cloud — het pad van de minste weerstand.** Het contract loopt door, de data komt mee, de leverancier organiseert het traject. Voor organisaties waar P6 in de contractuele eisen van opdrachtgevers staat is dit vaak de enige optie die geen heronderhandeling met klanten vereist. Bewijs: Oracle's vijffasen-traject **[VENDOR]**.

**b) Asta Powerproject — de VK/Ierland/Scandinavië-uitweg.** Eleco's ARR groeide 29% naar £34,3 mln met organische groei van 11% en NRR van 110% **[HARD]**. Asta Powerproject won voor het twaalfde jaar op rij de UK Construction Computing Award voor Project Management Software of the Year **[VENDOR]**. **[AFGELEID]** Een NRR van 110% bij 316 medewerkers en 89,6% brutomarge is niet het profiel van een bedrijf dat klanten verliest; het is een bedrijf dat er langzaam bij wint.

**c) InEight Schedule — de expliciete P6-uitdager in kapitaalprojecten.** InEight positioneert Schedule met "full CPM functionality, AI-driven planning, collaborative markup, and integrated risk analysis" **[VENDOR]** en, uniek in dit segment, met een **gepubliceerde prijs van $1.800 per gebruiker per jaar** **[HARD]**. **[AFGELEID]** Een gepubliceerde prijs tegenover een leverancier die er geen publiceert, is zelf een verkoopargument. Dat is geen toeval.

**d) Terug naar Microsoft Project.** Voor organisaties waar P6 nooit echt nodig was maar wel werd aangeschaft omdat de opdrachtgever erom vroeg. Zie de rekensom in 5.4.

**Wat ik expliciet níét kan onderbouwen:** de volumes, de richting van de netto-stromen, of de vaak gehoorde bewering dat "de prijsverhogingen van Oracle" de directe aanleiding zijn. Dat laatste is plausibel gezien de contractmechaniek in 5.2, maar plausibel is niet hetzelfde als aangetoond.

### 6.3 Wat het bewijs van entrenchment wél laat zien

Twee indirecte, harde indicatoren dat P6 diep verankerd blijft:

1. **P6 duikt op in SEC-filings van bedrijven die geen software verkopen.** Een full-text search op "Primavera P6" in 10-K's sinds 2024 levert Lithium Americas Corp. (ingediend 28-03-2025) en Piedmont Lithium (29-02-2024) op — beide in technische bijlagen bij mijnbouwprojecten, waar P6 het gebruikte planningsinstrument is **[HARD]**. Als een bestandsformaat in wettelijk gedeponeerde technische rapporten staat, is het geen keuze meer maar infrastructuur.
2. **Elke serieuze 4D- en AI-speler integreert met P6.** Bentley SYNCHRO (P6, Asta Powerproject) **[VENDOR]**; Trimble Tilos (P6, MS Project, Asta) **[VENDOR]**; ALICE (P6, MS Project, Oracle Primavera Cloud) **[VENDOR]**; nPlan (P6, Powerproject, MS Project) **[VENDOR]**. **[AFGELEID]** Niemand bouwt een concurrerend planningsformaat. Iedereen bouwt op het bestaande.

---

## 7. Microsoft Project Server naar de cloud: de deadline is zojuist verstreken

Dit is de best gedocumenteerde migratieforcering in het hele veld, en hij is elf dagen oud.

**[HARD]**, uit Microsoft's lifecycle-database:

| Product | Start | Mainstream einde | Extended einde |
|---|---|---|---|
| **Project Server 2019** | 22-10-2018 | 09-01-2024 | **14-07-2026** |
| **Project Server Subscription Edition** | 02-11-2021 | Modern Lifecycle | **In Support** |

Project Server 2019 is per **14 juli 2026** volledig uit support. Er is geen Project Server 2021 of 2024 in de lifecycle-database; de opvolger is de **Subscription Edition**, die de Modern Lifecycle Policy volgt — dat wil zeggen: je moet doorlopend actueel blijven om in support te blijven.

**[AFGELEID]** De keuzeboom voor een organisatie met Project Server 2019 op 25 juli 2026 is dus:

1. **Project Server Subscription Edition** — on-premises blijven, maar op abonnement. Microsoft publiceert hier geen prijs ("requires finding a partner") **[HARD]**.
2. **Naar de Microsoft-cloud** — Planner en Project Plan 3/5. Microsoft's eigen productpagina's noemen "Planner and Project Plan 3" en "Planner and Project Plan 5" maar publiceerden op de door mij bezochte pagina's **geen per-gebruikersprijs** **[HARD, negatieve waarneming]**. Dat is opvallend voor Microsoft, dat wél gedetailleerde prijzen publiceert voor Microsoft 365 Business Basic ($7,00), Standard met Copilot ($23,50) en Premium met Copilot ($32,00) per gebruiker per maand bij jaarbetaling **[HARD]**.
3. **Terug naar de desktop** — Project Professional 2024 voor $1.129,99 eenmalig, dat verbinding kan maken met Project Server Subscription Edition **[HARD]**.
4. **Weg van Microsoft** — naar work management (monday.com, Smartsheet, Asana) of naar een echte CPM-planner.

**[SCHATTING, middelhoog vertrouwen]** Optie 4 richting work management is voor de grote middenmoot van Project Server-installaties de meest waarschijnlijke uitkomst. Redenering: het merendeel van Project Server-implementaties werd gebruikt voor portfolio-overzicht, timesheets en resourcecapaciteit — niet voor contractueel harde CPM-planning. Dat zijn precies de functies die monday.com Enterprise en Smartsheet Advanced Work Management standaard leveren, tegen een fractie van de implementatiekosten van een Project Server-migratie. De organisaties die *wel* echte CPM nodig hebben, zaten meestal toch al op P6 of Asta.

Wat ik hier niet heb: één enkel migratiecijfer. Microsoft publiceert geen Project-gebruikersaantallen.

---

## 8. De onderkant van de markt: work management, en zijn eigen plateau

### 8.1 Wat de goedkope tools nu kunnen

Uit monday.com's eigen prijspagina **[HARD]**:

| Plan | Prijs (per seat/maand, jaarbetaling) | Planningsrelevante functies |
|---|---|---|
| Free | $0 (max 2 seats) | 3 borden |
| Basic | $9 | Onbeperkt items en viewers |
| **Standard** | **$12** | **Tijdlijn- en Gantt-weergave**, kalender, 250 automatiseringen/maand |
| **Pro** | **$19** | **+ afhankelijkheden** (advanced columns), privéborden, tijdregistratie, 25.000 automatiseringen |
| Enterprise | op aanvraag | Portfolio- en resourcemanagement, meerlaagse rechten, 250.000 automatiseringen |

**[AFGELEID]** Voor $228 per gebruiker per jaar krijg je een Gantt met afhankelijkheden, resource- en portfoliobeheer op Enterprise-niveau, en industriële automatisering. Wat je *niet* krijgt is echte CPM: geen kritiek pad met totale speling, geen kalenderrekenen met werkdagen en uitzonderingen, geen baseline-variantieanalyse, geen resource-levelling. Voor de meeste kleine en middelgrote bouwprojecten is dat verschil in de praktijk irrelevant — en dat is precies de reden dat deze tools de onderkant afsnoepen.

### 8.2 Maar de work-managementgolf zelf raakt op adem

Asana, omzet per boekjaar eindigend 31 januari **[HARD]**, groeipercentages **[AFGELEID]**:

| Boekjaar t/m | Omzet | Groei |
|---|---|---|
| 31-01-2022 | $378,4 mln | — |
| 31-01-2023 | $547,2 mln | **+44,6%** |
| 31-01-2024 | $652,5 mln | +19,2% |
| 31-01-2025 | $723,9 mln | +10,9% |
| **31-01-2026** | **$790,8 mln** | **+9,2%** |

Groei van 44,6% naar 9,2% in drie jaar. **[AFGELEID]** Dat is geen zachte landing, dat is een categorie die volloopt.

En Smartsheet is van de beurs: Form 25-NSE bij de SEC op **22 januari 2025** **[HARD]**, overgenomen door Blackstone en Vista Equity Partners **[GEHEUGEN voor de kopers en de $8,4 mrd; de delisting zelf is hard]**. **[AFGELEID]** Een private-equity-take-private van een categorieleider is het klassieke signaal dat de publieke markt de groei niet meer wil financieren en dat de waarde voortaan uit marge moet komen — dat wil zeggen: uit prijs.

**[SCHATTING, middelhoog vertrouwen]** De work-managementtools zullen de komende jaren hun prijzen sneller verhogen dan hun functionaliteit uitbreidt, omdat hun eigenaren (PE, of publieke markten die op winstgevendheid sturen) dat afdwingen. Dat verkleint de prijskloof met echte CPM-tools en verzwakt hun belangrijkste aanvalswapen op de onderkant van de markt.

---

## 9. Langetermijntrends: 4D/BIM en data-gedreven planning

### 9.1 4D is een laag, geen vervanging

Dit is de belangrijkste structurele observatie van deze sectie en ze is met leveranciersteksten te onderbouwen.

Bentley SYNCHRO, van de eigen productpagina **[VENDOR]**: *"Create a schedule, or integrate with third-party scheduling software (such as P6, Asta Powerproject, etc.)"* — plus interoperabiliteit met meer dan 50 CAD-applicaties en IFC-ondersteuning. Twee producten: SYNCHRO 4D (desktop, 4D-modellering en simulatie) en SYNCHRO Perform (web/mobiel, dagelijkse productiviteit en voortgang).

Trimble Tilos **[VENDOR]**: lineaire/tijd-wegplanning voor infrastructuur, met bidirectionele uitwisseling met **P6, MS Project, Asta Powerproject**, Excel, Trimble Business Center/Connect en de civiele BIM-modellen uit Quadri/Novapoint/Quantm.

**[AFGELEID]** De 4D-laag is economisch afhankelijk van de CPM-laag eronder. Dat is een dubbele kwetsbaarheid: 4D-leveranciers kunnen hun prijs niet loskoppelen van de waarde die de CPM-leverancier vangt, én ze zijn afhankelijk van formaten die ze niet beheren. Voor de CPM-incumbent is het omgekeerd een gratis versterking van de moat: elke 4D-integratie maakt het onderliggende formaat onmisbaarder.

### 9.2 De AI-planners voeden zich met incumbent-data

nPlan **[VENDOR]**: een dataset van meer dan **750.000 historische projectplanningen**, *"the largest collection of past programmes in the world"*; **$500 mrd** aan projecten in actief beheer; planningen geanalyseerd die samen meer dan **$2 biljoen** bouwuitgaven vertegenwoordigen. Integreert met **Oracle P6, Powerproject en Microsoft Project**. Genoemde klanten: Laing O'Rourke, Google, ExxonMobil, Skanska, Network Rail, HS2, Sizewell C. Functies: schemageneratie uit documentatie met generatieve AI, onzekerheidsvoorspelling per activiteit, systemische portfoliorisico's.

ALICE Technologies **[VENDOR]**: generatieve planning; **$127 mrd** aan projecten wereldwijd; drie producten (Plan, Optimize, Model); integreert met **P6, Microsoft Project, Oracle Primavera Cloud** en 3D BIM-modellen; typisch ingezet op projecten vanaf ~**$75 mln** bouwsom; geclaimde resultaten 17% kortere doorlooptijd, 14% lagere arbeidskosten, 12% lagere materieelkosten.

**Een kritische kanttekening bij die getallen.** "$500 mrd onder actief beheer" en "$127 mrd aan projecten" zijn *bouwsommen van projecten waar de software op draait*, niet omzet, niet marktaandeel en niet bewezen effect. De percentages van ALICE (17/14/12%) zijn leveranciersclaims zonder gepubliceerde methodologie of controlegroep. Behandel ze als marketing, niet als evidence.

Wat wél structureel betekenisvol is: **de AI-laag is gebouwd op de datastandaarden van de incumbents.** nPlan's 750.000 planningen zijn XER-, PMXML-, MPP- en Asta-bestanden. **[AFGELEID]** Dat betekent (a) dat de incumbents een dataschat bezitten die ze zelf nauwelijks exploiteren, en (b) dat wie die formaten kan lezen automatisch toegang heeft tot dezelfde grondstof.

### 9.3 Agentic AI is in 2026 de nieuwe standaardbelofte

Uit de jaarverslagen zelf **[HARD dat het er staat; VENDOR wat betreft de waarde]**:

- **Nemetschek** noemt de agent-gebaseerde **Nemetschek AI Assistant** en **Bluebeam Max** als AI-uitbreiding van het Build-segment, gedragen door een concernbrede cloudinfrastructuur en een **AI & Data Innovation Hub**; AI wordt gepositioneerd langs drie hefbomen (eigen ontwikkeling, technologiegedreven overnames en venture, partnerschappen). Overnames Firmus AI en Manufacton, venture-investering in Handoff.
- **Eleco** lanceert **AstaGPT** en **Asta Vision Plus** met "API-led capabilities that prepare customers for predictive, AI-driven planning" en expliciete integratie met grote taalmodellen; het jaarverslag stelt dat AI de Groep helpt "protect its installed customer base".
- **Procore** benoemt "agentic AI capabilities" als speerpunt naast het kernplatform.
- **InEight** verkoopt Schedule als "full CPM functionality, **AI-driven planning**".

**[AFGELEID]** Die Eleco-formulering — AI om *de bestaande klantenbasis te beschermen* — is de eerlijkste zin in de hele stapel. AI wordt op dit moment vooral defensief ingezet: als retentie-instrument en als rechtvaardiging voor prijsverhoging, niet als groeimotor met aantoonbare omzetbijdrage. Geen van de onderzochte jaarverslagen rapporteert een AI-omzetlijn.

---

## 10. Expliciete onzekerheden

Ik zet ze op een rij zodat een lezer weet waar dit rapport dun is.

| # | Onzekerheid | Impact | Wat het zou oplossen |
|---|---|---|---|
| 1 | **Geen enkele gedocumenteerde Oracle-prijsverhoging voor Primavera.** De contractmechaniek is hard; de prijsdynamiek niet. | Hoog — dit is een kernvraag van de opdracht | Klantcontracten, resellerprijslijsten, vakpers, gebruikersfora |
| 2 | **Geen empirische migratievolumes.** Richting en drijfveren van migratie weg van P6 en van Project Server zijn beredeneerd, niet gemeten. | Hoog | Aanbestedingsdata, leveranciers-win/loss, ILTA-achtige surveys, forumdata |
| 3 | **Omvang van Oracle Construction & Engineering onbekend.** Mijn schatting heeft een factor twee bandbreedte. | Middel | Analistenrapporten, Oracle-investor-decks |
| 4 | **Elf M&A-feiten uit geheugen, niet geverifieerd** (sectie 2.3), waaronder alle dealwaarden. | Middel | Persberichten uit 2008–2020, SEC-8-K's |
| 5 | **Geen enkel marktomvangcijfer.** Alle marktomvangbronnen waren geblokkeerd (403) en zijn sowieso zelden methodologisch controleerbaar. | Laag — ik beschouw dit als winst, niet verlies | — |
| 6 | **Microsoft Planner/Project-abonnementsprijzen niet gevonden** op de bezochte pagina's; alleen desktop-eenmalig. | Middel | Microsoft 365 admin-prijslijst, partnerkanaal |
| 7 | **ISO 16739-1-editie en publicatiedatum niet direct bevestigd** (iso.org en buildingsmart.org gaven 403). Ik leun op de IFC 4.3-documentatiesite die stelt dat de inhoud "exactly the same as the ISO IFC 4.3" is. | Laag | ISO-catalogus, NEN |
| 8 | **Smartsheet-dealwaarde, RIB-dealwaarde, Deltek-dealwaarde** allemaal onbevestigd. | Laag | Persberichten |
| 9 | **Geen klantstemmen.** Nul interviews, nul reviews, nul forumposts. Alles is leveranciers- en toezichthoudersperspectief. | Hoog voor de "klantreacties"-vraag | G2/Capterra-data, gebruikersgroepen |
| 10 | **monday.com en Smartsheet financials niet verkregen** (IR-pagina's JavaScript-gedreven). Alleen prijzen zijn hard. | Laag | 20-F-filings, IR-persberichten |

---

## 11. De belangrijkste kwetsbaarheden van de gevestigde spelers

Dit is de slotanalyse van het thema. Elke kwetsbaarheid is gekoppeld aan een hard cijfer of een hard document waar dat kan.

### 11.1 Gedeeld, sectorbreed

**K1 — De moat is een bestandsformaat, en dat formaat is al opengebroken.**
CPM is een algoritme uit 1959. De verdediging van de incumbents is niet de wiskunde maar het formaat: XER, PMXML, MPP, Asta. **MPXJ** — één onderhouder, LGPL — leest P6 XER én PMXML, MPP, MSPDI, MPD, P3, SureTrak, Asta Powerproject en Easyplan, Phoenix, GanttProject, Synchro, SDEF, Deltek Open Plan BK3 en meer, en schrijft MPX, MSPDI, PMXML, XER, Planner en SDEF; bovendien praat het rechtstreeks met Microsoft Project Server, Microsoft Planner, Primavera P6 Web Services en **Oracle Primavera Cloud** **[HARD]**. Dat betekent dat de technische uitstapdrempel voor een klant vrijwel nul is. Wat overblijft als bescherming is contractuele en organisatorische lock-in — precies wat Oracle in zijn supportbeleid heeft geformaliseerd (5.2).

**K2 — De SaaS-transitie is op, als groeimotor.**
Nemetschek heeft ARR als stuurgetal geschrapt met de motivering dat de transformatie "grotendeels afgerond" is **[HARD]**. Eleco zit op 1% perpetual **[HARD]**. Wat de omzetgroei de afgelopen vijf jaar optisch opblies — de conversie van een eenmalige licentie naar een terugkerend abonnement — is verbruikt. **[AFGELEID]** Wie in 2027 nog dubbelcijferig wil groeien, moet dat halen uit prijsverhoging, uit AI-meerprijs, of uit overnames. De eerste twee zijn precies wat klanten wegjaagt; de derde vereist kapitaal in een markt die deze categorie momenteel laag waardeert (Eleco staat ruim 25% onder zijn 52-weekstop bij +20% omzetgroei **[AFGELEID]**).

**K3 — Prijsopaciteit is een groeiende, niet krimpende, kwetsbaarheid.**
Oracle publiceert geen Primavera-prijs. Autodesk heeft zijn bouwproductprijzen achter een offertemuur gezet. Bentley SYNCHRO, Procore, ALICE en Asta Powerproject publiceren evenmin **[HARD]**. Ondertussen publiceren monday.com, Bluebeam, InEight en Microsoft-desktop wél. **[AFGELEID]** In een markt waar de goedkope alternatieven transparant zijn en de dure niet, wordt elke inkoopafdeling die op prijs wordt afgerekend een structurele bondgenoot van de uitdager. Prijsopaciteit werkt zolang de koper geen alternatief kan benchmarken; zodra hij dat wel kan, wordt opaciteit een verkoopnadeel.

**K4 — AI wordt defensief ingezet en niemand rapporteert er omzet op.**
Eleco zegt het onbedoeld eerlijk: AI helpt "protect its installed customer base" **[HARD]**. Geen enkel onderzocht jaarverslag opent een AI-omzetregel. **[AFGELEID]** Als AI in 2027 geen aantoonbare omzet oplevert maar wel de R&D-budgetten heeft opgeslokt, ontstaat er een geloofwaardigheidsprobleem bij zowel investeerders als klanten die de meerprijs betaalden.

**K5 — De 4D-laag is structureel afhankelijk van de CPM-laag.**
SYNCHRO, Tilos, ALICE en nPlan draaien allemaal op P6-, MSP- en Asta-data **[VENDOR, consistent over vier leveranciers]**. Voor de 4D-leveranciers is dat een prijsplafond. Voor de CPM-incumbents is het comfortabel — tot het moment dat een van die lagen besluit zelf de CPM-kern te bouwen. **[AFGELEID]** InEight heeft dat al gedaan (volledige CPM plus 4D plus risico in één product, met gepubliceerde prijs).

### 11.2 Per speler

| Speler | Kernkwetsbaarheid | Onderbouwing |
|---|---|---|
| **Oracle Primavera** | De lock-in is contractueel, niet technisch. Zodra een klant de eenmalige migratiekosten accepteert, is er niets dat hem vasthoudt. Geen publieke prijs betekent bovendien geen prijsanker in de hoofden van kopers. Geen Extended Support voor Primavera dwingt om de vijf jaar een upgrade af zonder dat Oracle daar functionele waarde tegenover hoeft te zetten. | Support Policies 10-07-2026; Lifetime Support 02-07-2026; nul Primavera-regels in twee prijslijsten **[HARD]** |
| **Trimble** | Drie jaar omzetkrimp op papier ($3.798,7 → $3.587,3 mln) terwijl de portefeuille wordt uitgekleed. AECO draait 34,2% operationele marge — mooi, maar dat trekt concurrentie aan. Tilos en Vico zijn nicheproducten in een concern dat nichebezit afstoot. | 10-K per 02-01-2026 **[HARD]** |
| **Autodesk** | Gelijktijdige verbouwing van distributie (TD Synnex 39% → 14%), facturatie (jaarlijks bij meerjarig, effect loopt door in FY2027) en organisatie (−1.000 medewerkers, restructuring plan januari 2026). Drie tegelijk uitgevoerde transities in één jaar is operationeel risico. Prijzen verdwenen achter offertemuur. | 10-K per 31-01-2026; Q4-persbericht 26-02-2026 **[HARD]** |
| **Bentley** | NRR 110% → 109%; ARR-groei op constante valuta 11,5%, onder de omzetgroei van 14,5%. Consumptiegebaseerde E365-prijzen ("het merendeel van de abonnementsomzet is dagelijkse consumptie") maken de omzet gevoelig voor een bouwvertraging bij klanten — omzet daalt automatisch mee als er minder wordt gewerkt. | Q1 2026 persbericht 07-05-2026; 10-K FY2025 **[HARD]** |
| **Octave (ex-Hexagon ALI, EcoSys)** | +1% omzetgroei, licenties nog 9%, subscription licences −2%, en dat alles met ~$1 mrd aan verse schuldfaciliteiten na $625 mln uitkering aan Hexagon. De zwakste balans-en-groeicombinatie in dit hele overzicht. | 10-Q per 31-03-2026 **[HARD]** |
| **Nemetschek** | Groeimotor uitgeput (zie K2); de +19,7% van 2025 bevatte een eenmalig GoCanvas-consolidatie-effect én het eenmalige Bluebeam-omschakelingseffect. Beide keren niet terug. | Geschäftsbericht 2025 **[HARD]** |
| **Procore** | Bruto-omzetretentie 95% — jaarlijks valt 5% van de basis weg vóór uitbreiding. Groei van +28,6% naar +14,8% in twee jaar. Nieuwe CEO en CFO, aandeleninkoop, "durable and profitable growth": de omslag van groei- naar rendementsverhaal. | 10-K en Q1-2026-persbericht 05-05-2026 **[HARD]** |
| **Eleco** | Klein (£38,8 mln, 316 mensen) in een markt met concurrenten van $1,5–7 mrd. Sterk VK-geconcentreerd (47%). VS blijft weerbarstig: totale omzet daar −6%. Overnamekandidaat. | Annual Report 2025 **[HARD]** |
| **Roper/Deltek** | Deltek zit weggestopt in een $4,5 mrd Application Software-segment binnen een $7,9 mrd conglomeraat dat in 2025 $2,65 mrd uitgaf aan overnames in zorg- en kerkelijke software. **[AFGELEID]** Bouwplanning is geen strategische prioriteit van de eigenaar. | 10-K FY2025 **[HARD]** |
| **Microsoft** | Heeft met Project Server 2019 (EOL 14-07-2026) zijn eigen installed base in beweging gezet zonder een duidelijk geprijsd cloudalternatief te publiceren. **[AFGELEID]** Elke maand dat die prijs onduidelijk blijft, is een maand waarin monday.com en Smartsheet die accounts kunnen benaderen. | Lifecycle-database; prijspagina's **[HARD]** |

---

## 12. Betekenis voor een open-source, IFC-gebaseerde planner (Open Planner Studio)

Deze sectie vertaalt het bovenstaande naar strategische consequenties voor Open Planner Studio: een LGPL-3.0 Tauri/React-desktopapplicatie plus browserbuild, met **IFC 4.3 als eigen bestandsformaat** en een eigen `CPMSolver`/`CalendarEngine`.

### 12.1 Drie bevindingen die direct in het voordeel van OPS werken

**A) De open-source CPM-ruimte is aantoonbaar leeg — en dat is uitzonderlijk.**

Ik heb de GitHub-API bevraagd op drie manieren **[HARD]**:

| Zoekopdracht | Resultaat aan de top |
|---|---|
| `critical path method scheduling` | Beste treffer: **43 sterren** (alfonsodipace/Critical-Path-Method, MIT, laatste push 2019). Daarna 10, 7, 5, 5, 1, 1, 1… |
| `gantt in:name` | frappe/gantt **6.054** (MIT), DHTMLX/gantt 1.822, **bardsoftware/ganttproject 1.082** (GPL-3.0, push 18-07-2026), gantt-task-react 1.091 |
| `ifc in:name,description` | **IfcOpenShell/IfcOpenShell 2.667** (LGPL-3.0, push 25-07-2026), ThatOpen/engine_web-ifc 996 (MPL-2.0), xeokit-sdk 918 (AGPL-3.0), xBimTeam/XbimEssentials 568 |

**[AFGELEID]** Het beeld is ondubbelzinnig. Er zijn tientallen volwassen open-source **Gantt-renderers** (het tekenwerk). Er is een volwassen open-source **IFC-ecosysteem** (het datamodel). En er is praktisch **geen** open-source **CPM-engine** — de best onderhouden implementatie heeft 43 sterren en is zeven jaar oud. GanttProject (GPL-3.0, 1.082 sterren, actief) is de enige serieuze open-source desktopplanner, maar heeft geen IFC.

De doorsnede *IFC + CPM + desktop* is onbezet. Dat is geen toeval en geen vergissing van de markt: het is domeinwerk dat bouwkundige én softwarekennis vereist, en het is precies waar OPS zit.

**B) IFC heeft al twintig-plus jaar native planningsentiteiten — de weddenschap is standaardconform, niet exotisch.**

Uit de IFC 4.3-schemadocumentatie **[HARD]**: `IfcWorkSchedule` is *"a task schedule of a work plan, which in turn can contain a set of schedules for different purposes"*, met attributen **CreationDate, StartTime, FinishTime, Duration, TotalFloat, Purpose, Creators, PredefinedType**. Het stuurt taken aan via `IfcRelAssignsToControl`, is een subtype van `IfcWorkControl` en kan genest worden in een `IfcWorkPlan` via `IfcRelAggregates`. **Geïntroduceerd in IFC 2.0**; `PredefinedType` en formele validatieregels toegevoegd in IFC4.

De actuele documentatieversie is **IFC 4.3.2.20260630 (IFC4X3_ADD2)**, waarvan de site stelt dat *"the structure and semantic contents of this are exactly the same as the ISO IFC 4.3"* **[HARD]**.

**[AFGELEID]** Let op wat daar staat: `TotalFloat` staat als attribuut in de norm. Dat is CPM-vocabulaire in een ISO-standaard. Een planner die zijn planning in IFC opslaat, doet niet iets creatiefs met een BIM-formaat — hij gebruikt het formaat waarvoor het ontworpen is. Dat is een argument dat je aan een opdrachtgever, een normcommissie en een aanbestedende dienst kunt uitleggen zonder verdediging. Geen enkele commerciële CPM-leverancier kan hetzelfde zeggen: XER en MPP zijn eigendom, IFC is norm.

**C) De migratiebrug bestaat al, in dezelfde licentiefamilie.**

**MPXJ** is **LGPL** en leest P6 XER en PMXML, MPP, MSPDI, MPD, P3, SureTrak, Asta Powerproject en Easyplan, Phoenix, Fasttrack, GanttProject, TurboProject, ConceptDraw, Synchro, Gantt Designer, SDEF, Sage 100 Contractor, Project Commander, Deltek Open Plan BK3 en Edraw; het schrijft MPX, MSPDI, PMXML, XER, Planner en SDEF; en het leest rechtstreeks uit Microsoft Project Server, Microsoft Planner, Primavera P6 Web Services en Oracle Primavera Cloud. Beschikbaar voor Java, .NET (IKVM), Ruby en **Python**. Onderhouden door Jon Iles **[HARD]**.

**[AFGELEID]** LGPL is compatibel met OPS' eigen LGPL-3.0. Er is geen licentieconflict. En de strategische waarde is groot: **de enige technische reden waarom een P6- of Asta-klant niet kan vertrekken, is dat zijn data vastzit — en dat probleem is al opgelost door iemand anders, onder een licentie die OPS mag gebruiken.**

### 12.2 Wat dit strategisch betekent

**1. Positioneer OPS niet als "gratis P6", maar als de brug tussen twee genormeerde werelden.**
Het prijsargument is zwak en gevaarlijk: monday.com Pro kost $228 per jaar en Microsoft Project Professional $1.129,99 eenmalig (≈$226/jaar over vijf jaar). "Gratis" wint het van $228 niet met een factor die een inkoopbesluit verandert; de overstapkosten (training, hercertificering, contractuele acceptatie door opdrachtgevers) domineren de licentieprijs volledig. Het onderscheidende argument van OPS is dat het het **enige** hulpmiddel is waarin de planning en het bouwwerkmodel in hetzelfde genormeerde bestand leven. Dat argument heeft geen concurrent.

**2. Investeer met voorrang in importcapaciteit, niet in exportcapaciteit.**
Het onderzoek laat zien dat migratiedruk op dit moment reëel is: Project Server 2019 is per 14 juli 2026 uit support **[HARD]**, Bluebeam Revu 20 gaat 31 december 2026 EOL **[HARD]**, P6 EPPM 21.x verliest Premier Support in december 2026 **[HARD]**. Er zit dus in de komende twaalf maanden een cohort organisaties dat *gedwongen iets moet kiezen*. Voor die groep is de eerste vraag niet "wat kan het" maar "kan ik mijn bestaande planningen erin krijgen". Een XER- en MPP-import via MPXJ (of een eigen XER-parser, want XER is een gedocumenteerd tekstformaat) verandert OPS van "interessant project" in "kandidaat". **[SCHATTING, hoog vertrouwen]** Dit is de hoogste marginale waarde per regel code die OPS op dit moment kan realiseren.

**3. Correctheid is de enige valuta die telt, en OPS heeft daar al een structureel voordeel.**
De reden dat P6 in NI-43-101-mijnbouwrapporten bij de SEC staat **[HARD]**, is niet dat het prettig werkt maar dat het resultaat verdedigbaar is bij een claim. Een open-source planner wordt op precies dat punt zwaarder beoordeeld dan een commerciële: niemand ontslaat een projectcontroller omdat hij Oracle koos. De bestaande `tests/planning/`-suite (395 data-gedreven CPM- en kalendergevallen over 21 batterijen) is daarom geen hygiënefactor maar het **kernverkoopargument**. **[SCHATTING, hoog vertrouwen]** Publiceer de suite en zijn resultaten prominent, inclusief afwijkingen ten opzichte van P6- en MSP-referentiegedrag waar die bestaan. Een leverancier die zijn eigen randgevallen documenteert, is geloofwaardiger dan een leverancier die er niets over zegt — en geen enkele commerciële leverancier doet dit.

**4. Het browserbuild is een groter strategisch bezit dan het lijkt.**
De web-build van OPS is een echte productiedeployment met eigen bestands-I/O (File System Access API) en auto-save-herstel. **[AFGELEID uit de markt]** Elke commerciële concurrent verkoopt "de cloud" als abonnement met accountverplichting. OPS levert browsertoegang **zonder account, zonder server, zonder abonnement**. Dat is een categorie die niet bestaat in de commerciële markt en die precies de bezwaren wegneemt die on-prem-klanten tegen cloudmigratie hebben (datasoevereiniteit, netwerkafhankelijkheid, doorlopende kosten). Dit verdient expliciete positionering, niet alleen vermelding in de release notes.

**5. Waar OPS realistisch niet kan winnen — en waar dat prima is.**
Op basis van dit onderzoek: enterprise-EPPM met duizenden gelijktijdige gebruikers en rolgebaseerde autorisatie; Monte Carlo-risicoanalyse op portefeuilleniveau (Deltek Acumen, Primavera Risk); geïntegreerde kostenbeheersing en earned value op grootboekniveau (EcoSys/Octave Sequence, Cobra); auditsporen die een contractuele claim overleven; support-SLA's en inkoopcompliance (ISO 27001-certificering — Eleco noemt die expliciet als verkoopvoorwaarde **[HARD]**). Dat is geen falen; het is de reden dat OPS zich moet richten op de planner die *voor* die laag werkt: de werkvoorbereider, de uitvoerder, de adviseur, de docent, de kleine tot middelgrote aannemer. Dat segment is precies waar de $228-tools de CPM-behoefte niet dekken en de $1.800-tools te duur zijn.

**6. Het risico dat OPS moet bewaken.**
**[SCHATTING, middelhoog vertrouwen]** Het reële gevaar is niet dat een incumbent OPS aanvalt — daarvoor is het te klein. Het gevaar is dat een van de goed gefinancierde 4D/AI-spelers (InEight, ALICE, of een Nemetschek-merk) een gratis of goedkope IFC-gebaseerde planningslaag uitbrengt als acquisitie-instrument voor zijn betaalde platform. Bentley, Nemetschek en Trimble hebben alle drie zowel IFC-competentie als CPM-competentie in huis; ze hebben ze alleen nog niet in één gratis product gecombineerd. De verdediging daartegen is niet functionaliteit maar **community en gegevenssoevereiniteit**: een format dat de gebruiker bezit, een engine die hij kan controleren, en een testsuite die hij zelf kan draaien.

---

## Bronnenlijst

Alle URL's opgehaald op **25 juli 2026**.

**Jaarverslagen en toezichthoudersdeponeringen [HARD]**
- Nemetschek Geschäftsbericht 2025 (publ. 19-03-2026) — https://ir.nemetschek.com/geschaeftsbericht-2025 (PDF: `.../Nemetschek-Geschaeftsbericht-2025_de_locked.pdf`)
- Eleco plc Annual Report 2025 (uitgebracht 08-05-2026) — https://ir.eleco.com/wp-content/uploads/2026/05/5770_Eleco-plc-Annual-Report-2025_Hyperlink.pdf
- Eleco investor relations (koersdata 25-07-2026) — https://ir.eleco.com/investor-relations/
- Autodesk 10-K FY t/m 31-01-2026 (ingediend 03-03-2026) — https://www.sec.gov/Archives/edgar/data/769397/000076939726000015/adsk-20260131.htm
- Autodesk Q4 FY2026 persbericht (26-02-2026) — https://www.sec.gov/Archives/edgar/data/769397/000076939726000010/q426pressrelease.htm
- Trimble 10-K FY t/m 02-01-2026 (25-02-2026) — https://www.sec.gov/Archives/edgar/data/864749/000086474926000015/trmb-20260102.htm
- Trimble Q4/FY2025 persbericht (10-02-2026) — https://www.sec.gov/Archives/edgar/data/864749/000086474926000006/a2025q4-8kex991.htm
- Trimble Q1 2026 persbericht (06-05-2026) — https://www.sec.gov/Archives/edgar/data/864749/000086474926000061/a2026q1-8kex991.htm
- Bentley Systems 10-K FY2025 (26-02-2026) — https://www.sec.gov/Archives/edgar/data/1031308/000103130826000007/bsy-20251231.htm
- Bentley Q1 2026 resultaten (07-05-2026) — https://investors.bentley.com/news-releases/news-release-details/bentley-systems-announces-first-quarter-2026-results
- Procore Q1 2026 persbericht (05-05-2026) — https://www.sec.gov/Archives/edgar/data/1611052/000162828026030125/pcor-q126x8xkxexx991.htm
- Roper Technologies 10-K FY2025 (24-02-2026) — https://www.sec.gov/Archives/edgar/data/882835/000088283526000009/rop-20251231.htm
- Roper 8-K/A Deltek pro forma (15-03-2017) — https://www.sec.gov/Archives/edgar/data/882835/000088283517000010/deltek_proforma.htm
- Roper 10-K FY2016 (27-02-2017) — https://www.sec.gov/Archives/edgar/data/882835/000088283517000006/cy2016_10-k.htm
- Octave Intelligence plc 10-Q per 31-03-2026 (04-06-2026) — https://www.sec.gov/Archives/edgar/data/2083632/000162828026040622/octv-20260331.htm
- Octave investor relations — https://investors.octave.com/
- SEC XBRL companyconcept-API (omzetreeksen Autodesk, Procore, Trimble, Bentley, Oracle, Roper, Asana) — https://data.sec.gov/api/xbrl/companyconcept/
- SEC EDGAR full-text search ("Primavera P6" in 10-K's, "Aconex" bij Oracle, "Deltek" bij Roper) — https://efts.sec.gov/LATEST/search-index
- Smartsheet Form 25-NSE (22-01-2025), CIK 0001366561 — https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&company=smartsheet

**Contractuele en normatieve documenten [HARD]**
- Oracle Software Technical Support Policies, ingangsdatum 10-07-2026 — https://www.oracle.com/contracts/docs/057419.pdf
- Oracle Lifetime Support Policy: Oracle Applications, ingangsdatum 02-07-2026 (Primavera-releases pp. 66–69) — https://www.oracle.com/us/support/library/lifetime-support-applications-069216.pdf
- Oracle Technology Global Price List, 01-06-2026 — https://www.oracle.com/us/corporate/pricing/technology-price-list-070617.pdf
- Oracle Fusion Cloud Service Global Price List, 16-07-2026 — https://www.oracle.com/a/ocom/docs/corporate/pricing/oracle-fusion-cloud-global-price-list.pdf
- Oracle E-Business Suite Applications Global Price List, 06-11-2025 — https://www.oracle.com/a/ocom/docs/corporate/pricing/applications-price-list-070574.pdf
- Oracle prijslijstindex — https://www.oracle.com/us/corporate/pricing/price-lists/index.html
- Microsoft Lifecycle — Project Server 2019 — https://learn.microsoft.com/en-us/lifecycle/products/project-server-2019
- Microsoft Lifecycle — Project Server Subscription Edition — https://learn.microsoft.com/en-us/lifecycle/products/project-server-subscription-edition
- IFC 4.3.2 documentatie (IFC4X3_ADD2) — https://ifc43-docs.standards.buildingsmart.org/
- IfcWorkSchedule-entiteit — https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcWorkSchedule.htm

**Prijspagina's [HARD]**
- monday.com — https://monday.com/pricing
- InEight NOW — https://ineight.com/now/
- Bluebeam — https://www.bluebeam.com/pricing/
- Microsoft Project — https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software
- Microsoft 365 Business — https://www.microsoft.com/en-us/microsoft-365/business/compare-all-microsoft-365-business-products
- Smartsheet — https://www.smartsheet.com/pricing (bedragen kwamen in lokale valuta terug; niet gebruikt)
- Autodesk bouwproducten (géén prijzen) — https://construction.autodesk.com/pricing/
- ALICE (géén prijzen) — https://www.alicetechnologies.com/pricing

**Leverancierspagina's [VENDOR]**
- Oracle Primavera P6 — https://www.oracle.com/construction-engineering/primavera-p6/
- Oracle Primavera Cloud — https://www.oracle.com/construction-engineering/primavera-cloud/
- Bentley SYNCHRO — https://www.bentley.com/software/synchro/
- Trimble Tilos — https://construction.trimble.com/en/products/tilos
- InEight producten — https://www.ineight.com/products/
- Deltek producten — https://www.deltek.com/en/products
- RIB Software — https://www.rib-software.com/en
- Octave — https://octave.com/
- Eleco / Asta Powerproject — https://eleco.com/ en https://eleco.com/asta-powerproject/
- nPlan — https://www.nplan.io/
- ALICE Technologies — https://www.alicetechnologies.com/

**Open source [HARD]**
- GitHub Search API (repositories: `ifc`, `gantt in:name`, `critical path method scheduling`) — https://api.github.com/search/repositories
- MPXJ — https://www.mpxj.org/

---

*Rapport opgesteld 25 juli 2026. Bronnen zonder label zijn ongelabeld gebleven omdat ze uitsluitend ter illustratie dienen; elk cijfer in de lopende tekst draagt een expliciet label.*
