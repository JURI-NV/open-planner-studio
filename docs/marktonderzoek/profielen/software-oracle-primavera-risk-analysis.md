# Oracle Primavera Risk Analysis (OPRA / voorheen Pertmaster)

**Profiel opgesteld:** 25 juli 2026
**Categorie:** Kwantitatieve schema- en kostenrisicoanalyse (QSRA/QCRA) — Monte-Carlo-add-on bij CPM-planningen
**Status in één zin:** De facto uitgefaseerd legacy-product; laatste hoofdrelease dateert uit maart 2010, Premier Support liep af in maart 2018, en het product staat niet meer op Oracle's actuele productoverzicht — maar het is nog steeds de feitelijke standaard in delen van olie & gas, nucleair en defensie.

---

## 1. Wat het is

### Leverancier en historie/eigendom

| Jaar | Gebeurtenis |
|---|---|
| jaren '80–'90 | `Pertmaster` ontstaat als planningsproduct; later doorontwikkeld door **Pertmaster Ltd** (Guildford, Verenigd Koninkrijk) tot *Pertmaster Project Risk* — een Monte-Carlo-risicotool bovenop CPM-planningen |
| **12 dec 2006** | **Primavera Systems Inc.** (Bala Cynwyd, VS; persbericht gedateerd Philadelphia, PA) neemt Pertmaster Ltd over, op dezelfde dag als ProSight. Voor **Pertmaster** is geen bedrag bekendgemaakt; voor **ProSight** wel: ± **USD 45 miljoen** (Globes). Positionering destijds: "Acquisitions Give Primavera a Complete, End-to-End Project and Portfolio Management Solution" |
| apr 2008 | Laatste Pertmaster-gebrande release: **Pertmaster 8.2 en eerder** (GA apr 2008) |
| **8 okt 2008** | **Oracle** kondigt overname van Primavera Software Inc. aan; afgerond eind 2008 |
| nov 2008 | Rebranding naar **Primavera Risk Analysis 8.5** (GA nov 2008) |
| **mrt 2010** | **Primavera Risk Analysis 8.7** (GA maart 2010) — *de laatste hoofdrelease, tot op heden* |
| 2013–**2015** | Alleen nog patchsets/service packs binnen de 8.7-lijn (8.7.5, SP5 = build 8.7.0056, SP6 = 8.7.0060, PatchSet 7). **De laatst gedateerde patchset is 8.7 PatchSet 7, februari 2015** (Emerald Associates); er is geen publiek gedocumenteerde patch ná 2015 gevonden. Dat VBA in 8.7 zou zijn verwijderd is in dit onderzoek **niet onafhankelijk bevestigd** — zie Verificatie |
| **mrt 2018** | **Premier Support eindigt.** Extended Support: *Not Available*. Sustaining Support: *Indefinite* |
| 2019–2026 | Oracle positioneert **Oracle Primavera Cloud (OPC) Risk** als opvolger; OPRA verdwijnt van de productpagina's maar blijft downloadbaar voor bestaande klanten |

Dit is de kern van het lifecycle-verhaal, en het komt rechtstreeks uit Oracle's eigen *Lifetime Support Policy — Oracle Applications* (effectieve datum 2 juli 2026):

```
Pertmaster 8.2 and prior          GA Apr 2008   Premier: n/a       Sustaining: Dec 2009
Primavera Risk Analysis 8.5       GA Nov 2008   Premier: Nov 2011  Sustaining: Dec 2012
Primavera Risk Analysis 8.7       GA Mar 2010   Premier: Mar 2018  Sustaining: Indefinite
```

Ter contrast, uit exact dezelfde tabel: `Primavera P6 EPPM 25.x — GA Dec 2025, Premier Support t/m Dec 2030`, en idem voor P6 Professional 25.x, Primavera Analytics 25.x en Primavera Unifier 25.x. Oracle brengt dus tot en met december 2025 jaarlijks nieuwe releases uit voor de rest van de Primavera-familie — en sinds 2010 geen enkele nieuwe release voor Risk Analysis. Dat is het hardste beschikbare bewijs dat het product is stopgezet, ongeacht wat marketingmateriaal van concurrenten beweert.

Aanvullend: Primavera Risk Analysis staat **niet** op Oracle's actuele overzicht van Construction & Engineering-producten (geraadpleegd 25 juli 2026). Wat er wél staat: Aconex, Oracle Primavera Cloud, Primavera Unifier, Construction and Engineering Intelligence, Textura, OPC Portfolio & Capital Planning, Aconex for Defense, P6 EPPM, Submittal Exchange en Oracle Primavera Portfolio Management. Risico wordt daar gepresenteerd als *functie binnen* OPC, niet als los product.

> **Nuancering bij concurrentie-claims.** Redstone Risk (een Safran-partner) schrijft: *"Development of OPRA stopped in 2013, the last patch was released in 2015 and the product is no longer supported."* Safran zelf schrijft dat OPRA *"is now being sunsetted"* en *"simply no longer fit for purpose"*. Dit zijn partijdige bronnen. De verifieerbare feiten van Oracle zelf zijn: laatste hoofdrelease maart 2010, Premier Support geëindigd maart 2018, Sustaining Support onbepaald. "Geen support" is strikt genomen onjuist — Sustaining Support bestaat nog, maar dat betekent in Oracle-terminologie: **geen nieuwe patches, geen nieuwe fixes, geen nieuwe certificeringen tegen nieuwe OS-/database-versies.** Functioneel komt dat neer op bevroren.
>
> **Correctie na hercontrole:** het onderdeel *"the last patch was released in 2015"* van Redstone's claim blijkt wél te kloppen en verdient dus geen wegzetting als partijdig. Een onafhankelijke Primavera-consultancy (Emerald Associates) dateert **8.7 PatchSet 7 op februari 2015**, en er is geen latere patch publiek terug te vinden. Alleen het jaartal *2013* voor de ontwikkelstop en de formulering *"no longer supported"* blijven onjuist c.q. te absoluut.

### Doelgroep en typische gebruikers

- **Rolprofiel:** risicoanalisten, planners/project controls engineers, cost engineers, PMO-analisten, claim- en forensische planners. Nadrukkelijk *geen* tool voor de projectleider of uitvoerder — het is specialistengereedschap.
- **Organisatietype:** grote opdrachtgevers en EPC-contractors die al P6 gebruiken; overheidsprogramma's met een verplichte QSRA-stap in stage gates.
- **Sectoren:** olie & gas (upstream/LNG/refining), nucleair (nieuwbouw en ontmanteling), defensie & ruimtevaart, mijnbouw, grote infrastructuur (spoor, tunnels, energie-transmissie), utilities. In de klassieke gebouwbouw is het gebruik veel dunner.
- **Regio's:** sterk in het VK (waar Pertmaster vandaan komt en waar QSRA vroeg werd geïnstitutionaliseerd), Noord-Amerika, Golfstaten/Midden-Oosten, Australië en Noorwegen/Noordzee. In continentaal Europa, inclusief Nederland, is het gebruik beperkt tot de grote infra- en energieprogramma's.
- **Aanjagers van gebruik:** AACE International RP **57R-09** *Integrated Cost and Schedule Risk Analysis* (oorspronkelijk 2011, herzien 2019, herziening 2025) en de **GAO Schedule Assessment Guide** schrijven kwantitatieve, driver-based risicoanalyse voor bij grote kapitaalprojecten. Die normen — niet Oracle's marketing — houden de vraag naar dit type tool overeind.

---

## 2. Functionaliteit en techniek

### Platform en architectuur

- **Windows-desktopapplicatie**, standalone. Geen web-, cloud- of Mac-versie. Geen server- of multi-user-component; samenwerken gebeurt door `.plan`-bestanden rond te sturen.
- Laatst **officieel gecertificeerde** omgeving: **Windows 7 SP1 en Windows 8.1**, toegevoegd door 8.7 PatchSet 7 (februari 2015, Emerald Associates). Draaien op **Windows 10** is alleen via *derden* gedocumenteerd (ManagementYogi-installatiehandleiding, nov 2019) en via gebruikersmeldingen op Oracle Community — inclusief crashmeldingen op Windows 10 Enterprise met build 8.7.0056. Er is **geen** Oracle-certificering tegen Windows 10, Windows 11 of moderne Server-versies, omdat er sinds het einde van Premier Support (2018) geen nieuwe certificeringen meer worden gedaan. *(Gecorrigeerd: een eerdere versie van dit profiel noemde Windows 10 64-bit als "laatst gedocumenteerde ondersteunde omgeving" — dat verwarde community-documentatie met leverancierscertificering.)*
- *Schatting:* de applicatie is een 32-bits binary uit de 2008–2010-generatie zonder multicore-parallellisatie van de simulatie. Dit is een **inschatting** op basis van het bouwjaar en gerapporteerd geheugen-/schaalgedrag (zie de correlatiebug hieronder), niet uit officiële documentatie geverifieerd.
- Native bestandsformaat: **`.plan`**.
- Automatisering gebeurde historisch via **VBA-macro's in `.plan`-bestanden**. Dat die mogelijkheid **in versie 8.7 is verwijderd** is in dit onderzoek **niet onafhankelijk te bevestigen** — gerichte zoekacties naar Oracle-releasenotes of documentatie hierover leverden niets op. Behandel als **onzeker**. Wat wél vaststaat: er is in 2026 geen publiek gedocumenteerde scripting-, CLI- of API-laag voor OPRA.

### CPM-engine

PRA heeft een **eigen, volwaardige CPM-engine** — het is geen dunne wrapper om P6. Het leest de logica in, herberekent zelf, en kan de planning ook bewerken (activiteiten, relaties, kalenders). Dat is precies waarom het als forensisch en analytisch instrument zo gewaardeerd wordt: je kunt "wat-als"-varianten bouwen zonder de productieplanning in P6 aan te raken.

Een direct gevolg — en een klassieke bron van discussie — is dat de PRA-engine en de P6-engine **niet altijd identieke deterministische data opleveren** bij randgevallen (kalenderovergangen, constraints, retained logic vs. progress override, calendars op relaties). Analisten moeten dus altijd eerst valideren dat de geïmporteerde planning in PRA dezelfde einddatum geeft als in P6, vóór ze gaan simuleren.

### Kalenders

Volledig kalendermodel overgenomen uit de bron (P6/MSP): werkdagen, uitzonderingen, feestdagen, meerdere kalenders per project. Aanvullend biedt PRA **weerkalenders / weather modelling**: het modelleren van seizoensgebonden productiviteitsverlies of niet-werkbare perioden als probabilistische input — een functie die specifiek in offshore, maritiem en aardverzet veel gebruikt wordt.

### Resource- en kostenmodel

- Resource loading met **drie-punts-kostenramingen** per resource (min / most likely / max).
- Resource-verdelingen en **escalatie** (indexering over de tijd).
- Vereenvoudigd kostenramingsmodel voor wie geen volledige resourcebelading wil.
- **Geïntegreerde kosten- en schemarisicoanalyse** — de kern van RP 57R-09: kostenonzekerheid wordt gedreven door de gesimuleerde duur, niet los daarvan gemodelleerd. Dit is nog altijd een van de sterkste punten van het product.
- Output: probabilistische kasstroom / cost S-curve met percentielen.

### Baselines en voortgang

PRA werkt met plan-vergelijkingen via de **Distribution Analyzer** (meerdere simulatie-uitkomsten naast elkaar) en met **risk waterfall / risk progression charts** die laten zien hoe de risicopositie zich over opeenvolgende analysecycli ontwikkelt. Voortgang wordt overgenomen uit de bronplanning; PRA is geen voortgangsregistratietool.

### Risico en Monte Carlo — het hart van het product

| Capaciteit | Toelichting |
|---|---|
| **Schedule Check** | Geautomatiseerde integriteitscontrole van de planning vóór simulatie (open eindes, negatieve lags, constraints, lange duren, ontbrekende logica) — in de geest van de DCMA 14-point assessment. Voorkomt dat je een onbruikbare planning simuleert |
| **Duration Uncertainty / drie-punts** | Min/ML/Max per activiteit, met keuze uit verdelingen (triangulair, BetaPERT, uniform, discreet, e.d.) |
| **Templated Quick Risk** | Bulk-toekenning van onzekerheidsprofielen op WBS- of filterniveau — onmisbaar om een planning van duizenden activiteiten binnen redelijke tijd te modelleren |
| **Risk Register** | Volwaardig kwalitatief én kwantitatief risicoregister: oorzaak/gebeurtenis/gevolg, Risk Breakdown Structure (RBS), scoringsmatrices, eigen velden, pre- en post-mitigatiescores |
| **Risk-to-activity mapping** | Risico's uit het register worden gekoppeld aan één of meer activiteiten met een kans van optreden en een impactverdeling — de "risk driver"-benadering van AACE 57R-09 |
| **Mitigatiemodellering** | Mitigatietaken worden als activiteiten ingevoegd; het effect (rest-risico) wordt in dezelfde run doorgerekend, zodat kosten-batenafweging van mitigatie kwantitatief wordt |
| **Correlatie** | Correlatie tussen activiteitsduren en tussen risico's (zie ook: bekende bug bij grote aantallen) |
| **Probabilistic branching** | Alternatieve logische paden met een kans van optreden — bijv. "20% kans dat we het herstelscenario moeten volgen". Dit is een **onderscheidende** functie: Oracle Primavera Cloud Risk kan dit (nog) niet |
| **Criticality Index** | Percentage van de iteraties waarin een activiteit op het kritieke pad ligt — vaak nuttiger dan het deterministische kritieke pad. Ook dit ontbreekt (nog) in OPC Risk |
| **Sensitivity / tornado** | Duration sensitivity, cost sensitivity, criticality — als tornadodiagram |
| **Outputs** | Histogrammen, cumulatieve S-curves, P-waarden (P50/P80/P90), percentielen teruggeschreven als kolommen in de Gantt, scatter plots kosten-vs-tijd (JCL-achtig) |

Het aantal iteraties is instelbaar; in de praktijk wordt doorgaans met **1.000–5.000 iteraties** gewerkt (praktijkconventie, geen productlimiet).

### 4D / BIM

**Afwezig.** Er is geen enkele BIM-, IFC- of 4D-functionaliteit in Primavera Risk Analysis. Het product kent geen geometrie, geen objectkoppeling, geen visualisatie anders dan Gantt en grafieken. Dit is geen tekortkoming in de eigen scope — PRA is per ontwerp een puur schema-/kostenanalyse-instrument — maar het is wel relevant voor iedere vergelijking met een IFC-gebaseerde planner.

### Portfolio

**Afwezig / zeer beperkt.** PRA analyseert één plan tegelijk. Er is geen programma- of portfolioaggregatie van risico, geen gedeelde risicopool over projecten, geen multi-projectconsolidatie van contingency. Wie dat wil, moet naar Oracle Primavera Cloud, Safran Risk of een eigen aggregatielaag — en zelfs OPC kan blijkens Oracle's eigen documentatie *"risk analysis cannot be run at the program level"*.

### Rapportage

Export naar Excel, Word en PowerPoint; eigen rapportsjablonen definieerbaar. De rapportage-esthetiek is die van 2010 en wordt in de praktijk vrijwel altijd handmatig nabewerkt voor stuurgroepdocumenten.

### Schaalbaarheid — hoeveel activiteiten realistisch?

Dit is een reëel probleem, en er is een concreet, gedocumenteerd voorbeeld:

> Een gepubliceerde casus over de **correlatiebug** meldt dat het correleren van **meer dan 8.000 activiteiten** ertoe leidde dat de bestandsgrootte dramatisch groeide en het programma vastliep. Opsplitsen in groepen van 2.000 activiteiten reproduceerde hetzelfde probleem. Oracle classificeerde dit als **severity 2 significant issue** en gaf aan dat een oplossing *"would require a major code change"* omdat de bestaande architectuur dit niet aankon.

Daarnaast melden praktijkgidsen problemen bij **5.000+ activiteiten** in combinatie met zware grafische opmaak en resourcehistogrammen, en zijn er meldingen van crashes op Windows 10 Enterprise met build 8.7.0056.

**Realistische praktijkgrens (schatting):**
- **< 2.000 activiteiten** — comfortabel, snelle runs.
- **2.000–5.000 activiteiten** — werkbaar; simulatietijden lopen op maar blijven hanteerbaar.
- **5.000–10.000 activiteiten** — begint te knellen; correlatie op grote schaal is feitelijk onbruikbaar; runtijden van tientallen minuten tot uren.
- **> 10.000 activiteiten** — in de praktijk wordt vrijwel altijd eerst een *summary schedule* / risicomodel-planning gemaakt van enkele honderden tot ~2.000 regels. Dat is trouwens ook methodisch verdedigbaar (je modelleert risicodrivers, niet elke bout), maar bij OPRA is het deels een gedwongen keuze.

Ter vergelijking, en met de kanttekening dat dit een **leveranciersclaim** is: Safran stelt dat *"Analysis that would have taken 40 hours to complete in OPRA"* bij hen in minuten klaar is.

---

## 3. Prijzen

Oracle publiceert voor Primavera al jaren geen algemeen toegankelijke prijslijst meer; alles loopt via "vraag een offerte aan" of via resellers. Hieronder wat wél te documenteren valt, met bron en datum.

### Historische Oracle-prijslijst (geverifieerd document)

Uit een gepubliceerde **Oracle Primavera-prijslijst gedateerd 3 februari 2012**:

| Product | Licentie (USD) | Jaarlijkse support (USD) | Metriek |
|---|---:|---:|---|
| **Primavera Risk Analysis** | **9.500** | **2.090** | Application User |
| Primavera Earned Value Management | 10.000 | 2.200 | Application User |
| Primavera P6 EPPM | 2.750 | 605 | Application User |
| Primavera P6 Professional | 2.500 | 550 | Application User |
| Primavera P6 Analytics | 2.000 | 440 | Application User |
| Primavera Portfolio Management | 2.900 | 638 | Application User |
| Primavera P6 Reporting Database | 25.000 | 5.500 | Processor |
| Primavera Contractor | 1.295 | 285 | Application User |

*Bron: gepubliceerde Oracle Primavera prijslijst d.d. 3 feb 2012 (via Yumpu, geraadpleegd 25 juli 2026).*

Let op de verhouding: **2.090 / 9.500 = 22,0%**. Dat is exact Oracle's standaard *Software Update License & Support*-tarief. Dat percentage is sindsdien niet gewijzigd en is het rekenmodel voor alle onderstaande bedragen.

### Actuele resellerprijzen (2026)

| Bron | Bedrag | Details | Datum geraadpleegd |
|---|---:|---|---|
| **Akim Engineering** (Oracle Primavera Price List) | **USD 10.450** | Primavera Risk Analysis, per **Application User**, **perpetual**, support **niet** inbegrepen ("On Premises", *"Update may be purchased additionally"*). Op dezelfde lijst: P6 Professional USD 3.880, **P6 Enterprise** USD 4.240 (de lijst hanteert "Enterprise", niet "EPPM"), P6 Progress Reporter USD 1.460 | 25 jul 2026 (herverifieerd) |
| **PSG Inc** (webshop) | **USD 9.394** (van USD 9.899, 5% korting) | **Gecorrigeerd:** "OPUS Premium Support & Help Desk" is géén inbegrepen onderdeel maar een **optionele, apart te selecteren add-on**; de basisprijs is exclusief support. De pagina specificeert niet expliciet of het om perpetual gaat | 25 jul 2026 (herverifieerd) |
| **HSSL** (SKU HS-ORA-L70400) | Prijs op aanvraag | Expliciete voorwaarde: *"Support must be purchased with this perpetual license. Price per application user."* Losse SKU voor "First Year Support – L70400" | 25 jul 2026 |

### Samengevat licentiemodel

- **Model:** perpetual (eeuwigdurend), metriek **Application User** (named user, niet concurrent). Er is **geen** abonnement-/SaaS-variant van OPRA — een SaaS-optie bestaat alleen voor de opvolger, Oracle Primavera Cloud.
- **Verplichte support:** Oracle's perpetual-licenties gaan gepaard met jaarlijkse *Software Update License & Support* à **22% van de netto licentieprijs**; resellers stellen het eerste jaar doorgaans verplicht.
- **Rekenvoorbeeld (schatting op basis van de 22%-regel en de reseller-lijstprijs):** bij USD 10.450 lijstprijs bedraagt de jaarlijkse support circa **USD 2.299 per gebruiker**. Dit bedrag is **afgeleid**, niet als zodanig gepubliceerd.
- **Vijfjaars-TCO per gebruiker (schatting, bandbreedte):** **USD 19.650 – 21.950**, exclusief training, exclusief P6-licenties, exclusief consultancy.
  - *Ondergrens* 10.450 + 4 × 2.299 ≈ **19.650** — als het eerste jaar support in de licentieprijs zit.
  - *Bovengrens* 10.450 + 5 × 2.299 ≈ **21.950** — het realistischere scenario, want HSSL stelt expliciet *"Support must be purchased with this perpetual license"* en Akim vermeldt support juist als **niet** inbegrepen. Support in jaar 1 is dus zowel verplicht als apart betaald.
  - *(Gecorrigeerd: de eerdere enkelvoudige TCO van 19.650 rekende met 4 supportjaren terwijl dezelfde paragraaf jaar-1-support verplicht stelde — dat was intern inconsistent.)*
- **Enterprise-staffels en minimale afname:** Oracle hanteert voor Primavera volumekortingen die contractueel worden onderhandeld en niet publiek zijn. Uit vergelijkbare Oracle-applicatiedeals is de gebruikelijke bandbreedte **30–60% korting op lijstprijs** bij aantallen vanaf enkele tientallen users — dit is een **schatting**, geen gepubliceerd cijfer. Er is geen publiek gedocumenteerde minimale afname voor OPRA (single-user aankoop is bij resellers gewoon mogelijk).
- **Modules/add-ons:** OPRA is één ondeelbaar product; er zijn geen aparte modules of add-ons met eigen prijskaartje. De relevante bijkomende kosten zijn de P6-licenties (USD 3.880–4.240/user, lijstprijs 2026) waarop het draait, plus training (marktprijs 2-daagse cursus ± GBP 900–1.400 / EUR 1.100–1.700 per persoon — **schatting** op basis van gepubliceerde trainingsaanbiedingen).

### Prijsvergelijking met alternatieven

| Product | Gerapporteerde prijs | Bron / kanttekening |
|---|---|---|
| **Oracle Primavera Risk Analysis** | USD 9.394 – 10.450 perpetual/user + ~22% p.j. | Resellers, jul 2026 |
| **Deltek Acumen Risk** | **Geen betrouwbaar bedrag** | ⚠️ **Gecorrigeerd.** Het eerder genoemde "± USD 10.300 initieel" is bij hercontrole **niet reproduceerbaar** — gerichte zoekacties op dat bedrag leverden nul resultaten op. Het enige vindbare cijfer is ITQlick's schatting USD 75–200/user/mnd (MKB) tot USD 150–400/user/mnd (enterprise), en ITQlick erkent zelf dat Deltek geen prijzen publiceert en dat dit **branchebenchmarks** zijn. Behandel Acumen Risk als **prijs op aanvraag** |
| **Safran Risk** | Prijs op aanvraag | Voor het bredere Safran Project schat ITQlick vanaf ± USD 150/user/mnd, ± USD 1.200 voor 10 users, USD 10.000+ voor 100 users. **Schatting van derden** |
| **Barbecana Full Monte** | **USD 1.195 per seat, perpetual** (+ USD 299/jaar) | Bevestigd op Barbecana's eigen bestelpagina: USD 1.195 voor zowel de MS Project- als de P6-editie, **inclusief 12 maanden onderhoud/support en gratis updates**; verlenging USD 299 per jaar. Ondersteunt MS Project 2010–2021 en P6 8.4–22.12. Kanttekening: de P6-editie werkt alleen tegen **standalone SQLite- en Microsoft SQL Server-databases** |
| **Intaver RiskyProject** | Aanzienlijk goedkoper | Positioneert zich expliciet als betaalbaar alternatief; geen geverifieerd bedrag gevonden |
| **Oracle Primavera Cloud (incl. Risk)** | Prijs op aanvraag, abonnement per user/maand | Oracle publiceert geen OPC-prijslijst |

De kernconclusie voor het prijshoofdstuk: **OPRA is met afstand het duurste stuk software in zijn eigen categorie, terwijl het het oudste is en het minste onderhoud krijgt.** Full Monte doet het Monte-Carlo-basiswerk voor circa een tiende van de prijs.

---

## 4. VOORDELEN

1. **Methodologisch nog steeds diep — dieper dan veel modernere concurrenten.** Probabilistic branching (alternatieve logica met een kans van optreden) en de criticality index zijn functies die zelfs Oracle's eigen opvolger, Primavera Cloud Risk, in 2026 nog niet heeft. Een onafhankelijke vergelijkende studie stelt expliciet dat OPRA op deze twee punten superieur blijft en daarom "relevant blijft voor geavanceerde analyses".

2. **Volledig geïntegreerde kosten- én schemarisicoanalyse (IRA).** Kostenonzekerheid wordt gedreven door de gesimuleerde duur in plaats van los gemodelleerd. Dat is precies wat AACE RP 57R-09 voorschrijft, en het is de reden dat OPRA jarenlang gold als referentie-implementatie van die aanbevolen praktijk.

3. **Eigen, volwaardige CPM-engine — geen wrapper.** Je kunt de planning binnen PRA aanpassen, alternatieve scenario's bouwen en herrekenen zonder de productieplanning in P6 aan te raken. Dat maakt het bruikbaar voor claim-analyse, forensische planning en what-if-studies, niet alleen voor risicosimulatie.

4. **Schedule Check als kwaliteitspoort.** De ingebouwde integriteitscontrole (open eindes, negatieve lags, constraints, lange duren) dwingt af dat je geen onzin simuleert. Veel analisten gebruiken PRA in de praktijk vooral hiervoor — het is een DCMA-achtige kwaliteitstoets die veel goedkopere tools missen.

5. **Templated Quick Risk maakt grote planningen behapbaar.** Onzekerheidsprofielen in bulk toekennen op WBS- of filterniveau is de enige manier om een planning van duizenden regels binnen een werkdag te modelleren. Dit is een van de best doordachte functies van het product.

6. **Volwaardig risicoregister mét kwantitatieve koppeling.** Kwalitatief register (RBS, scoringsmatrices, pre-/post-mitigatie) en kwantitatieve driver-koppeling aan activiteiten zitten in hetzelfde bestand. Bij veel goedkopere Monte-Carlo-tools moet je het register in Excel bijhouden en de koppeling handmatig maken.

7. **Kwantitatieve mitigatie-afweging.** Mitigatietaken worden als echte activiteiten ingevoegd en het restrisico wordt in dezelfde run doorgerekend. Daarmee kun je "kost deze mitigatie minder dan de contingency die hij bespaart?" hard beantwoorden — een vraag waar stuurgroepen daadwerkelijk op sturen.

8. **De facto sectorstandaard, met alle netwerkeffecten van dien.** In olie & gas, nucleair en defensie is "een Pertmaster-run" al twee decennia de gangbare term voor een QSRA. Er is een grote pool van analisten die het kennen, er zijn contractueel voorgeschreven werkwijzen omheen gebouwd, en opdrachtgevers weten hoe ze de output moeten lezen. Die gedeelde taal heeft echte waarde.

9. **Stabiel gedrag door bevriezing.** Een cynisch maar reëel voordeel: omdat er sinds 2010 geen functionele wijzigingen meer zijn, zijn analyses reproduceerbaar over jaren heen en breken bestaande werkwijzen niet door updates. Voor langlopende programma's met een audit trail is dat geen triviaal punt.

10. **Perpetual licentie, geen abonnementsafhankelijkheid.** Wie de licentie ooit gekocht heeft, kan blijven draaien zonder doorlopende betaling (zij het zonder support). In een markt die volledig naar abonnementen kantelt, is dat voor sommige organisaties — met name defensie en overheid met air-gapped omgevingen — een pluspunt.

---

## 5. NADELEN

1. **Het product is dood, en Oracle zegt het alleen niet hardop.** Laatste hoofdrelease maart 2010, Premier Support afgelopen maart 2018, geen Extended Support beschikbaar, alleen Sustaining Support (= geen nieuwe fixes, geen nieuwe certificeringen). Het staat niet meer op Oracle's productoverzicht. Ondertussen kreeg P6 EPPM in december 2025 nog gewoon release 25.x met support tot 2030. Wie hier vandaag op standaardiseert, koopt een doodlopende weg.

2. **Prijs staat in geen enkele verhouding tot wat je krijgt.** Circa USD 9.400–10.450 per named user perpetual plus ~22% per jaar, voor software uit 2010 die geen enkele doorontwikkeling meer krijgt. Barbecana Full Monte doet het Monte-Carlo-basiswerk voor ± USD 1.195 per seat. De prijs is nooit verlaagd toen de ontwikkeling stopte.

3. **Harde schaalgrens met een erkende, nooit opgeloste bug.** Correlatie over meer dan ~8.000 activiteiten laat de bestandsgrootte exploderen en het programma vastlopen; opsplitsen in groepen van 2.000 helpt niet. Oracle erkende dit als *severity 2* en gaf aan dat repareren *"a major code change"* zou vergen — wat er, gezien de status van het product, dus nooit is gekomen. Ook bij 5.000+ activiteiten met zware opmaak zijn crashes gedocumenteerd.

4. **Simulatieprestaties zijn naar hedendaagse maatstaven slecht.** Geen zichtbare parallellisatie, geen 64-bits schaalvoordeel (*schatting*). Safran claimt dat een analyse van 40 uur in OPRA bij hen in minuten draait — een leveranciersclaim, maar het patroon van "lange runtijden op grote modellen" wordt breed bevestigd in praktijkbronnen.

5. **Verouderde UI, en niet alleen cosmetisch.** De interface is die van 2008–2010: dichte menu's, dialoogvenster-gedreven workflow, geen real-time feedback tijdens het modelleren. Concurrenten bieden inmiddels interactieve modellering waarbij je het effect van een aanname direct ziet. Een onafhankelijke vergelijking noemt Oracle's eigen cloud-opvolger expliciet *"more user-friendly than the OPRA software"*.

6. **Zware leercurve, en de kennisbasis droogt op.** Correct gebruik vereist begrip van kansverdelingen, correlatie, driver-modellering en de valkuilen van merge bias. De standaardtraining is 2 dagen (± 13 uur) en dat is ruim onvoldoende om zelfstandig een verdedigbaar model te bouwen. Omdat **Oracle het product niet meer actief in de markt zet** — het staat niet op het productoverzicht en er is geen actuele Oracle-prijslijst — komen er nauwelijks nieuwe analisten bij en verdwijnt de expertise met pensionering. *(Genuanceerd: "wordt niet meer verkocht" was te absoluut en sprak het prijshoofdstuk van dit profiel tegen — resellers als Akim, PSG en HSSL bieden nieuwe OPRA-licenties in juli 2026 aantoonbaar nog gewoon aan.)*

7. **Automatisering is actief wegbezuinigd.** VBA werd in versie 8.7 verwijderd, waardoor macro-`.plan`-bestanden onmogelijk werden. Er kwam nooit iets voor terug: geen REST API, geen CLI, geen scripting. Integratie in een geautomatiseerde project-controls-pijplijn is daarmee praktisch uitgesloten — alles is handwerk in de GUI.

8. **Windows-only, single-user, geen samenwerking.** Geen web, geen cloud, geen Mac, geen server-component, geen gedeelde database, geen versiebeheer, geen rollen/rechten. Samenwerken betekent `.plan`-bestanden mailen. In 2026 is dat niet meer uit te leggen aan een verspreid programmateam.

9. **Geen portfolio- of programmaniveau.** Risico wordt per plan geanalyseerd; er is geen aggregatie van contingency of gedeelde risico's over projecten heen. Voor organisaties die op programmaniveau moeten sturen, moet alles er handmatig omheen worden gebouwd — en Oracle's eigen opvolger heeft dezelfde beperking (*"risk analysis cannot be run at the program level"*).

10. **Vendor lock-in in een dubbele laag.** Je zit vast aan het `.plan`-formaat (gesloten, geen exportstandaard voor het risicomodel zelf) én aan het Oracle-ecosysteem: OPRA verdient zich alleen terug als je al P6-licenties hebt. Bovendien gaan risicogegevens grotendeels verloren in uitwisseling — `ProjRisks` zitten weliswaar in het XER-formaat en worden geïmporteerd in P6 EPPM, maar zijn daar **niet zichtbaar**. Het risicomodel is in de praktijk niet migreerbaar naar een ander gereedschap zonder het opnieuw op te bouwen.

11. **Support is de facto een lege huls.** Sustaining Support levert alleen toegang tot bestaande kennisartikelen en downloads. Gedocumenteerde crashes op Windows 10 Enterprise met build 8.7.0056 blijven onopgelost. Er is geen escalatiepad meer voor een bug — Oracle gaat de code niet meer aanraken.

12. **Vrijwel afwezig op reviewplatformen.** Er zijn nauwelijks actuele beoordelingen op G2, Capterra, TrustRadius of Gartner Peer Insights te vinden. Dat is op zichzelf een signaal: producten met een levende gebruikersbasis verzamelen reviews. Het maakt het bovendien lastig om onafhankelijke, recente gebruikerservaringen te wegen — een beperking van dit profiel die eerlijk vermeld moet worden.

---

## 6. Interoperabiliteit

Dit hoofdstuk is voor de opdrachtgever (open-source, IFC-gebaseerde planner) het meest relevant, dus expliciet en zonder vergoelijking.

### Wat OPRA in- en uitleest

| Formaat | Import | Export | Opmerkingen |
|---|:--:|:--:|---|
| **`.plan`** (native) | ✅ | ✅ | Gesloten binair formaat. Geen publieke specificatie, geen alternatieve implementaties. Bevatte tot 8.7 VBA-macro's; die zijn verwijderd |
| **XER** (P6 Professional) | ✅ | ✅ | De praktische standaardroute. Let op: `ProjRisks` zitten in XER en komen mee bij import in P6 EPPM, maar zijn **niet zichtbaar** in P6 |
| **P6 XML** | ✅ | ✅ | Oracle beveelt XML expliciet aan wanneer je **risico-informatie** wilt uitwisselen, omdat XER daar tekortschiet |
| **Directe P6-databaseverbinding** | ✅ | ✅ | Rechtstreeks tegen de P6-database (gedocumenteerde combinatie: PRA 8.7 SP5 / build 8.7.0056 met P6 R8.3). Versie-gevoelig en niet gecertificeerd tegen moderne P6-releases |
| **MPP** (Microsoft Project) | ✅ | ✅ | MS Project-generaties uit die periode; nieuwe MPP-varianten zijn niet gecertificeerd |
| **MSPDI / MS Project XML** | ✅ | ✅ | |
| **P3 / SureTrak** | ⚠️ | ⚠️ | Historisch ondersteund in de Pertmaster-lijn; irrelevant geworden |
| **Asta Powerproject, Open Plan, Artemis** | ⚠️ | ⚠️ | Pertmaster ondersteunde historisch een brede reeks planningsformaten; **niet geverifieerd** voor 8.7. Behandel als onzeker |
| **CSV / Excel** | ⚠️ | ✅ | Rapport- en resultaatexport naar Excel/Word/PowerPoint is er; een generieke CSV-import van planningsdata is geen hoofdroute |
| **IFC 4.3 / IfcWorkSchedule / IfcTask** | ❌ | ❌ | **Volledig afwezig** |
| **REST/SOAP API** | ❌ | ❌ | Geen |
| **Scripting / CLI** | ❌ | ❌ | VBA verwijderd in 8.7, nooit vervangen |

### Wat dit betekent

- **IFC bestaat niet in de wereld van OPRA.** Geen `IfcWorkSchedule`, geen `IfcTask`, geen `IfcWorkCalendar`, geen relatie met bouwobjecten. Het product is ontworpen vóór IFC 4 relevant was voor planning, en is bevroren vóór IFC 4.3 (de eerste versie met een serieus planning-/infra-datamodel) bestond. Voor een IFC-gebaseerde planner is er dus **geen directe integratieroute** — de enige realistische brug is XER of P6 XML.
- **Risicodata is de zwakste schakel in elke uitwisseling.** Onzekerheidsverdelingen, correlaties, probabilistische branches, de RBS en het risicoregister zijn allemaal `.plan`-eigen. XER draagt `ProjRisks` mee maar P6 toont ze niet; XML doet het beter maar dekt het volledige PRA-model niet. Praktisch gevolg: **een risicomodel dat in OPRA is opgebouwd, migreert niet — het wordt in een nieuwe tool opnieuw gebouwd.** Dat is de belangrijkste reden waarom organisaties er nog aan vastzitten.
- **Voor een open-source IFC-planner is de relevante les:** OPRA is geen integratiedoel, maar wel een goede *specificatiebron*. Het is de best gedocumenteerde bestaande implementatie van driver-based, geïntegreerde kosten-/schemarisicoanalyse. De begrippen die je zou willen kunnen uitdrukken in een IFC-round-trip — drie-punts-duren, kansverdelingen per taak, risico-naar-taak-koppelingen met kans en impact, correlatiegroepen, criticality index — hebben in IFC 4.3 **geen native representatie** en zouden via `IfcPropertySet`/`IfcPropertySingleValue` op `IfcTask` moeten worden gemodelleerd. Dat is een open ontwerpvraag, en een kans: er is geen gevestigde open standaard voor probabilistische planningsdata.
- **Uitwisselingsstrategie die in de praktijk werkt:** planning heen via XER of P6 XML, resultaten terug als percentiel-kolommen (P50/P80) die je als extra velden op de activiteiten schrijft. Alles daarbuiten is handwerk.

---

## 7. Marktpositie

### Waar het sterk is, en waarom

OPRA is dominant gebleven in precies die sectoren waar (a) een externe partij een kwantitatieve risicoanalyse *eist* bij investeringsbesluiten, en (b) P6 al de planningsstandaard is:

- **Olie & gas / LNG / raffinage** — FID-processen bij grote operators vragen standaard een P50/P80-onderbouwing van schedule en contingency.
- **Nucleair (nieuwbouw én ontmanteling)** — extreem lange doorlooptijden, zware regulatoire scrutiny, decennia-lange programma's met dwingende contingency-verantwoording.
- **Defensie & ruimtevaart** — de GAO Schedule Assessment Guide en vergelijkbare kaders schrijven QSRA voor bij grote acquisitieprogramma's.
- **Grote infrastructuur (spoor, tunnels, transmissie)** — met name in het VK, waar QSRA vroeg in de projectgovernance is verankerd.
- **Mijnbouw en zware industrie.**

De onderliggende reden is niet productkwaliteit maar **institutionele verankering**: standaarden (AACE RP 57R-09, GAO Schedule Assessment Guide), contractuele werkwijzen en een generatie analisten die het gereedschap kent. Het is een klassiek geval van een product dat overleeft op zijn ecosysteem, niet op zijn roadmap.

### Belangrijkste concurrenten

| Concurrent | Positionering | Bedreiging voor OPRA |
|---|---|---|
| **Safran Risk** (Noorwegen) | Directe, agressieve opvolger. Voert expliciete migratiecampagnes ("Migrating from OPRA to Safran Risk"), claimt drastische snelheidswinst, SQL-database, JCL-analyse, sensitivity-by-exclusion, stochastische mitigatietoetsing. Leest XER, MS Project XML en MPXJ | **Hoog** — pakt de high-end olie&gas/energie-markt waar OPRA sterk stond |
| **Deltek Acumen Risk** | Onderdeel van de Acumen-suite (Fuse/Risk/360), sterk in schedule-kwaliteit + risico, aansluiting op Deltek's overheids- en defensie-portfolio. Koppelt met P6, MS Project en Open Plan. **Prijs op aanvraag** — Deltek publiceert geen prijslijst en er is geen geverifieerd bedrag | **Hoog** — met name in Noord-Amerikaanse defensie/overheid |
| **Barbecana Full Monte** | Prijsvechter en pragmatist: draait als add-in *in* MS Project (2010–2021) en P6 (8.4–22.12), geen export/import-stap. USD 1.195/seat perpetual, incl. 12 mnd support, daarna USD 299/jaar | **Hoog aan de onderkant** — vreet de "we willen gewoon een P80" -markt weg |
| **Oracle Primavera Cloud Risk** | Oracle's eigen opvolger. Kwalitatieve + kwantitatieve analyse, geïntegreerde planning (geen export nodig), automatische "risk removal impact", geïntegreerde weerrisico's. Mist nog probability branching en criticality index; kan niet op programmaniveau draaien | **Hoog** — het is de route waarlangs Oracle bestaande klanten wegleidt |
| **Intaver RiskyProject** | Betaalbaar, importeert P6 XER, breed functiepakket voor de prijs | Middel |
| **Tamara, NetPoint, CritPath AI, Spider Project, Predict!/ARM** | Nichespelers, regionaal of methodologisch onderscheidend | Laag–middel |
| **Palisade @RISK for Project** | Historische concurrent op MS Project; niet langer een factor | Laag |

### Trend

**Duidelijk krimpend.** De signalen wijzen allemaal dezelfde kant op:
- geen nieuwe release sinds 2010, Premier Support geëindigd 2018;
- verwijderd van Oracle's actuele productoverzicht;
- Oracle stuurt actief richting Primavera Cloud, waar een onafhankelijke vergelijking inmiddels concludeert dat het *"reliable enough to replace OPRA as the standard for risk analysis, even for large-scale and complex projects"*;
- concurrenten voeren openlijke migratiecampagnes;
- praktijkobservatie uit de gebruikersgemeenschap: *"PRA is being less and less used by companies"*;
- vrijwel geen recente reviews op de grote softwarereviewplatformen.

De **methode** (kwantitatieve, driver-based schema- en kostenrisicoanalyse) groeit daarentegen, gedreven door strengere governance bij kapitaalprojecten en de herziening van AACE RP 57R-09 in 2025. De markt krimpt dus niet — alleen dit product krimpt eruit.

### Opvallende gebruikers en verplichtstellingen

Individuele klantnamen zijn niet publiek geverifieerd te krijgen (Oracle publiceert geen OPRA-klantenlijst, en het product is te oud voor case studies). Wat wél vaststaat:
- **AACE RP 57R-09** (2011, herzien 2019, herziening 2025) definieert de geïntegreerde kosten-/schemarisicoanalyse met risk drivers waarvoor OPRA jarenlang de referentie-implementatie was.
- De **GAO Schedule Assessment Guide** verankert QSRA in de beoordeling van Amerikaanse overheidsprogramma's.
- In het VK is QSRA bij grote infrastructuurprogramma's onderdeel van de standaard projectgovernance.

Deze normen zijn tool-neutraal geformuleerd — ze schrijven *methode* voor, geen *product*. Dat is precies waarom migratie naar Safran, Acumen of Full Monte mogelijk is zonder de compliance te verliezen, en waarom OPRA's positie geen echte verdedigingslinie meer heeft.

---

## 8. Eindoordeel

### Voor wie is dit de juiste keuze?

**Vrijwel voor niemand die vandaag begint.** De gevallen waarin OPRA nog verdedigbaar is, zijn eng en aflopend:

1. **Organisaties die de licentie al bezitten, een werkende installatie hebben en analisten die het beheersen.** Doorgebruiken tot de Windows-omgeving het onmogelijk maakt is rationeel; de licentie is perpetual en het model is bevroren, dus reproduceerbaar. Begin wel nu met de migratieplanning — niet als de volgende Windows-upgrade het breekt.
2. **Analyses die probabilistic branching of criticality index vereisen** en waarvoor Oracle Primavera Cloud Risk dus (nog) niet toereikend is. Dit is een reële, geverifieerde functionele nis — maar Safran Risk en Acumen Risk dekken deze grotendeels ook af.
3. **Lopende langjarige programma's met een audit trail** waarin eerdere OPRA-runs onderdeel zijn van de contractuele historie en methodologische continuïteit zwaarder weegt dan gereedschapskwaliteit.
4. **Air-gapped defensie- of nucleaire omgevingen** waar een perpetual, offline, niet-updatende desktopapplicatie een beveiligingsvoordeel is in plaats van een nadeel.

### Voor wie zeker niet?

- **Iedereen die nieuw instapt.** Circa USD 10.000 per gebruiker plus 22% per jaar voor software uit 2010 zonder ontwikkeling, zonder API, zonder support die daadwerkelijk fixt, is niet te verantwoorden. Full Monte doet het Monte-Carlo-basiswerk aantoonbaar voor een tiende (USD 1.195/seat, geverifieerd). Safran Risk en Acumen Risk bieden een moderner en beter onderhouden alternatief — maar het eerdere oordeel "voor vergelijkbaar geld" is **niet houdbaar**: van geen van beide is een prijs publiek te verifiëren.
- **Programma's boven ~10.000 activiteiten**, of iedereen die serieus wil correleren over grote aantallen — daar zit een erkende, nooit gerepareerde bug.
- **Organisaties die risicoanalyse willen automatiseren of in een pijplijn willen opnemen.** Geen API, geen CLI, VBA verwijderd. Alles is GUI-handwerk.
- **Teams die verspreid samenwerken** of die risico op portfolio-/programmaniveau moeten aggregeren.
- **Iedereen die met BIM/IFC werkt.** Er is geen enkel raakvlak.
- **Organisaties die vendor lock-in willen vermijden.** Het `.plan`-formaat is gesloten en het risicomodel migreert niet — je bouwt het opnieuw op. Hoe langer je wacht, hoe groter die migratieschuld.

### Wat een IFC-gebaseerde open-source planner hiervan zou moeten meenemen

1. **De methode is waardevol, het product is dat niet meer.** Kwantitatieve, driver-based risicoanalyse groeit als discipline. OPRA's functionele opzet — drie-punts-duren, templated bulk-toekenning, een risicoregister dat kwantitatief aan taken koppelt, criticality index, mitigatie-afweging — is een uitstekende functionele specificatie om tegenaan te ontwerpen.
2. **Er is een echt gat: er bestaat geen open standaard voor probabilistische planningsdata.** IFC 4.3 kent `IfcTask`, `IfcWorkSchedule` en `IfcWorkCalendar`, maar geen native representatie voor kansverdelingen, correlaties of risicodrivers. Wie dat als eerste netjes modelleert (bijvoorbeeld via gestandaardiseerde `IfcPropertySet`s op `IfcTask`) en publiceert, vult een gat dat de commerciële markt bewust heeft laten liggen — want dichte formaten zijn daar het businessmodel.
3. **De lock-in-pijn van OPRA is het sterkste verkoopargument voor een open formaat.** Duizenden organisaties zitten vast aan een gesloten `.plan`-bestand van een product dat sinds 2010 niet meer is aangeraakt. Dat is precies het scenario dat een open, IFC-gebaseerde planner voorkomt — en het is een concreet, verifieerbaar verhaal in plaats van een principekwestie.
4. **XER en P6 XML zijn de enige realistische bruggen** naar deze wereld. Wie interoperabiliteit met de bestaande QSRA-praktijk wil, investeert daar — niet in een OPRA-koppeling.
5. **Begin klein en methodisch correct.** OPRA's eigen praktijk laat zien dat serieuze risicomodellen zelden meer dan enkele duizenden activiteiten tellen; de waarde zit in het correct modelleren van drivers, niet in schaal. Een goed uitgevoerde Schedule Check plus drie-punts-duren met bulk-toekenning levert al 80% van de praktische waarde.

---

## Bronnen

**Oracle — primair**
- Oracle, *Lifetime Support Policy: Oracle Applications*, effectieve datum 2 juli 2026, sectie "Oracle Primavera Releases" (pp. 66–69) — https://www.oracle.com/us/assets/lifetime-support-applications-069216.pdf — geraadpleegd 25 jul 2026. **Bevat de Pertmaster 8.2-, PRA 8.5- en PRA 8.7-lifecycle-rijen.**
- Oracle Construction and Engineering — productoverzicht — https://www.oracle.com/industries/construction-engineering/ — geraadpleegd 25 jul 2026 (PRA **niet** vermeld)
- Oracle Primavera Cloud Help, *Risk Analysis Overview* — https://primavera.oraclecloud.com/help/en/user/88432.htm — geraadpleegd 25 jul 2026
- Oracle Primavera Cloud, *Risk Management User Guide* — https://docs.oracle.com/cd/E80480_01/English/user_guides/risk_management_user_guide/88293.htm — geraadpleegd 25 jul 2026
- Oracle Community (MOSC), *"Is Primavera Risk Analysis Stand alone Module Discontinued By Oracle?"*, gepost 6 jul 2023, bewerkt 20 jul 2023 — https://community.oracle.com/mosc/discussion/4545237/ — antwoorden achter login

**Prijzen**
- Oracle Primavera Price List, gedateerd **3 februari 2012** (PRA USD 9.500 licentie / USD 2.090 support, Application User) — https://www.yumpu.com/en/document/view/30357524/oracle-primavera-price-list — geraadpleegd 25 jul 2026
- Akim Engineering, *Oracle Primavera Software License and Product Family Price List* (PRA USD 10.450, perpetual, Application User) — https://www.akimeng.com/oracle-primavera-price-list.html — geraadpleegd 25 jul 2026
- PSG Inc, *Oracle Primavera Risk Analysis* (USD 9.394, van USD 9.899) — https://psgincs.com/newstore/product/oracle-primavera-risk-analysis/ — geraadpleegd 25 jul 2026
- HSSL, *Primavera Risk Analysis 1 User (L70400)* — prijs op aanvraag; *"Support must be purchased with this perpetual license. Price per application user."* — https://hssl.us/primavera-risk-analysis-1-user/ — geraadpleegd 25 jul 2026

**Historie / eigendom**
- BRM News, *"Primavera Acquires ProSight and Pertmaster"*, 12 dec 2006 — https://www.brm.com/news-items/primavera-acquires-prosight-and-pertmaster/
- EMC Corporate Finance, *"Pertmaster acquired by Americans"* (verkoop Pertmaster Ltd, Guildford) — https://emcltd.co.uk/news/pertmaster-acquired-by-americans/
- Oracle persbericht, aankondiging overname Primavera Software Inc., 8 okt 2008

**Vergelijkingen, status en kritiek**
- Baeken, *Comprehensive analysis of Oracle Primavera Cloud (OPC) Risk vs OPRA* — https://www.baeken.com/en/knowledgebase/comprehensive-analysis-of-oracle-primavera-cloud-opc-risk-vs-opra/ — geraadpleegd 25 jul 2026 (P50/P80-vergelijking; OPRA behoudt probability branching + criticality index)
- Safran, *Migrating from Oracle Primavera Risk Analysis to Safran Risk* — https://www.safran.com/content/migrating-from-oracle-primavera-risk-analysis-to-safran-risk-landing-page — geraadpleegd 25 jul 2026 (**leveranciersbron**)
- Safran, *Risk Analytics Solutions* — https://www.safran.com/en-gb/risk-analytics-solutions — geraadpleegd 25 jul 2026 (**leveranciersbron**; "40 hours in OPRA"-claim)
- Redstone Risk (W. Foulds), *Study into the performance of Safran Risk vs. Oracle Primavera (OPRA)* — https://www.redstonerisk.com/thoughts/study-into-the-performance-of-safran-risk-vs-oracle-primavera-opra/ — geraadpleegd 25 jul 2026 (**partnerbron**; "development stopped in 2013, last patch 2015")
- SlideShare, *Correlation bug in Pertmaster* — https://www.slideshare.net/slideshow/correlation-bug-in-pertmaster-144456451/144456451 — geraadpleegd 25 jul 2026 (>8.000 activiteiten, Oracle severity 2, *"would require a major code change"*)
- IQRM, *Primavera Risk Analysis: The Practitioner's Guide to Schedule Risk Modeling* — https://iqrm.net/blog/primavera-risk-analysis — geraadpleegd 25 jul 2026 (site gaf 503 bij directe fetch; alleen via zoeksnippets)
- Reddit r/primavera, *"Alternatives to Primavera Risk Analysis"* — https://www.reddit.com/r/primavera/comments/1d5iv9o/alternatives_to_primavera_risk_analysis/ (directe toegang geblokkeerd; alleen via zoeksnippets — *"PRA is being less and less used by companies"*)
- Reddit r/primavera, *"Saving PERT chart paths in Primavera Risk Analysis"* — https://www.reddit.com/r/primavera/comments/slfeik/
- Planning Planet forum, *Pertmaster > Primavera Risk Analysis* — https://planningplanet.com/forums/schedule-risk-and-schedule-risk-analysis/571861/ (HTTP 403 bij fetch)

**Functionaliteit en technische details**
- Underscore Group, *Primavera Risk Analysis* trainingsoverzicht (volledig functie-/moduleoverzicht) — https://www.underscoregroup.com/primavera-risk-analysis — geraadpleegd 25 jul 2026
- ManagementYogi, *Step by Step Guide: Install, Setup and Test Oracle Primavera Risk Analysis R8.7.5 on Windows 10*, nov 2019 — https://www.managementyogi.com/2019/11/step-by-step-guide-install-setup-and-test-oracle-primavera-risk-analysis-r8.7.5-on-windows-10.html
- Emerald Associates, *Primavera Risk Analysis Update 8.7 PatchSet 7* — https://emerald-associates.com/news/primavera-risk-analysis-update-8.7-patchset-7.html (HTTP 403 bij fetch; alleen via zoeksnippets)
- Oracle Primavera Risk Analysis Datasheet (via Scribd) — https://www.scribd.com/document/341958445/Primavera-Risk-Analysis-Datasheet-01-pdf

**Alternatieven**
- Barbecana, *Full Monte* — https://www.barbecana.com/full-monte/ — geraadpleegd 25 jul 2026 (MS Project **2010–2021**, P6 **8.4–22.12**, letterlijk bevestigd)
- Barbecana, *Purchase Full Monte SRA* — https://www.barbecana.com/full-monte/purchase-full-monte-sra/ — geraadpleegd 25 jul 2026 (**USD 1.195** perpetual voor zowel MSP- als P6-editie, incl. 12 mnd onderhoud; verlenging **USD 299/jaar**; P6-editie alleen SQLite/MS SQL Server)
- ITQlick, *Safran Project pricing* — https://www.itqlick.com/safran-project/pricing (**schatting van derden**)
- ITQlick, *Acumen cost 2026* — https://www.itqlick.com/acumen/pricing (**schatting van derden**; USD 75–200/user/mnd MKB, USD 150–400/user/mnd enterprise; geen initieel bedrag)

**Aanvullend geraadpleegd bij de verificatieronde (25 jul 2026)**
- Oracle Negotiations, *Oracle Perpetual Licenses* — https://oraclenegotiations.com/deals/perpetual-licenses/ — *"Oracle Software Update License and Support, which Oracle prices at 22 percent of the net license fee per year"*
- Oracle Licensing Experts, *JDE Support Costs 2026* — https://oraclelicensingexperts.com/blog/jde-support-costs/ — bevestigt hetzelfde 22%-SULS-tarief
- Globes, *US co Primavera buys start-up ProSight for $45m* — https://en.globes.co.il/en/article-1000162213
- Buyouts Insider, *Primavera Systems buys two* — https://www.buyoutsinsider.com/primavera-systems-buys-two/ — *"No financial terms were disclosed"* voor Pertmaster
- Emerald Associates, *Primavera Risk Analysis Update 8.7 PatchSet 7* — https://www.emerald-associates.com/news/primavera-risk-analysis-update-8.7-patchset-7.html — *"Released in February 2015, this update of Primavera Risk Analysis has extended its support to Windows 7 SP1 and Windows 8.1"* (pagina zelf HTTP 403; via zoeksnippet)
- Oracle Community (MOSC), *Crashing of Primavera Risk Analysis* — https://community.oracle.com/mosc/discussion/4479526/ — crashmelding Windows 10 Enterprise, build 8.7.0056
- Should I Remove It, *Primavera Risk Analysis* — https://www.shouldiremoveit.com/Primavera-Risk-Analysis-118226-program.aspx — build **8.7.0056** is >98% van de installed base (indicatie dat er de facto geen nieuwere build circuleert)

**Normen**
- AACE International, RP **57R-09** *Integrated Cost and Schedule Risk Analysis Using Risk Drivers and Monte Carlo Simulation of a CPM Model* (2011, herzien 2019, herziening 2025) — https://web.aacei.org/docs/default-source/toc/toc_57r-09.pdf
- U.S. GAO, *Schedule Assessment Guide*

---

## Methodologische kanttekeningen bij dit profiel

- **Zoekbudgetbeperking.** De WebSearch-quota van deze sessie was uitgeput; al het onderzoek is uitgevoerd met directe WebFetch-aanroepen, met DuckDuckGo-HTML als zoeksubstituut. Enkele bronnen leverden HTTP 403/503 (G2, TrustRadius, Reddit, Planning Planet, Emerald Associates, IQRM) en zijn alleen via zoeksnippets meegenomen — dat is bij elke betrokken bron expliciet vermeld.
- **Ontbreken van reviewplatform-data is zelf een bevinding**, geen onderzoeksfout: OPRA heeft nauwelijks recente vermeldingen op G2, Capterra, TrustRadius of Gartner Peer Insights, wat consistent is met een uitgefaseerd product.
- **Als schatting gemarkeerd:** de 32-bits/geen-parallellisatie-architectuur; het afgeleide supportbedrag van ± USD 2.299/jaar; de vijfjaars-TCO van ± USD 19.650; de enterprise-kortingsbandbreedte van 30–60%; trainingsprijzen; en de praktische activiteitengrenzen per bandbreedte.
- **Als leveranciers-/partijdige bron gemarkeerd:** alle Safran- en Redstone Risk-claims over OPRA's ontwikkelstop en prestaties. Waar mogelijk zijn die getoetst aan Oracle's eigen Lifetime Support Policy, die het beeld van bevriezing bevestigt maar de exacte jaartallen van de concurrenten niet. *(Bij de verificatieronde bleek Redstone's "last patch 2015" wél te kloppen.)*

---

## Verificatie

Adversariële hercontrole uitgevoerd op **25 juli 2026**. Methode: elke bewering is actief geprobeerd te **weerleggen** met bronnen buiten de oorspronkelijke bronnenlijst. De Oracle Lifetime Support Policy is dit keer niet via een samenvatting maar als **PDF binnengehaald en met `pypdf` letterlijk uitgelezen** (98 pagina's; Primavera-tabellen op p. 66–69), zodat de lifecycle-rijen woord voor woord zijn gecontroleerd in plaats van geparafraseerd.

⚠️ **Beperking van deze ronde:** het WebSearch-quotum was opnieuw uitgeput; verificatie is gedaan met directe WebFetch-aanroepen en DuckDuckGo-HTML als zoeksubstituut. Enkele bronnen gaven HTTP 403 (Emerald Associates, ITQlick, SlideShare) en zijn alleen via zoeksnippets bevestigd — dat is per regel vermeld.

| # | Bewering | Oordeel | Toelichting | Bron |
|---|---|---|---|---|
| 1 | **Lifecycle:** PRA 8.7 GA mrt 2010, Premier Support t/m mrt 2018, Extended *Not Available*, Sustaining *Indefinite*; PRA 8.5 GA nov 2008 / Premier nov 2011 / Sustaining dec 2012; Pertmaster 8.2 GA apr 2008 / Sustaining dec 2009 | ✅ **Bevestigd** | Letterlijk uitgelezen uit de PDF, p. 67: `Primavera Risk Analysis 8.7 · Mar 2010 · Mar 2018 · Not Available · Indefinite`. Alle drie de rijen kloppen exact. Documentdatum **2 juli 2026** klopt ook (p. 1: *"Effective Date: July 2, 2026"*) | https://www.oracle.com/us/assets/lifetime-support-applications-069216.pdf |
| 2 | **Contrast:** P6 EPPM/P6 Professional/Analytics/Unifier **25.x** — GA dec 2025, Premier t/m dec 2030 | ✅ **Bevestigd** | Alle vier de 25.x-rijen staan er letterlijk in (p. 67, 69, 70). Het contrast-argument houdt volledig stand | idem, p. 67–70 |
| 3 | **PRA staat niet op Oracle's Construction & Engineering-productoverzicht** | ✅ **Bevestigd** | Onafhankelijk nagefetcht. De pagina noemt Aconex, Oracle Primavera Cloud, Unifier, C&E Intelligence, Textura, OPC Portfolio & Capital Planning, Aconex for Defense, P6 EPPM, Submittal Exchange, OPPM — precies de tien uit het profiel, en **geen** Risk Analysis | https://www.oracle.com/industries/construction-engineering/ |
| 4 | **Akim Engineering: USD 10.450 perpetual per Application User, support niet inbegrepen**; P6 Pro 3.880 / P6 4.240 / Progress Reporter 1.460 | ✅ **Bevestigd** | Alle vier de bedragen letterlijk teruggevonden, mét metriek "Application User", type "Perpetual" en de notitie *"Update may be purchased additionally"*. **Kleine correctie:** de lijst noemt het product "Primavera P6 **Enterprise**", niet "P6 EPPM" | https://www.akimeng.com/oracle-primavera-price-list.html |
| 5 | **PSG Inc: USD 9.394 (van 9.899), "aangeboden inclusief OPUS Premium Support & Help Desk"** | ⚠️ **Gecorrigeerd** | Bedragen kloppen (korting USD 505). Maar OPUS Premium Support is een **optionele add-on die apart geselecteerd moet worden** — niet inbegrepen. De pagina bevestigt "perpetual" ook niet expliciet. Profiel aangepast | https://psgincs.com/newstore/product/oracle-primavera-risk-analysis/ |
| 6 | **HSSL: SKU HS-ORA-L70400, prijs op aanvraag, *"Support must be purchased with this perpetual license. Price per application user."*** | ✅ **Bevestigd** | SKU en citaat letterlijk correct; geen prijs, alleen "Request a Quote" | https://hssl.us/primavera-risk-analysis-1-user/ |
| 7 | **Oracle-prijslijst 3 feb 2012: PRA USD 9.500 licentie + USD 2.090 support, Application User** | ✅ **Bevestigd** | Documentdatum en alle gecontroleerde regels (PRA, P6 EPPM 2.750/605, P6 Pro 2.500/550, Contractor 1.295/285) kloppen letterlijk | https://www.yumpu.com/en/document/view/30357524/oracle-primavera-price-list |
| 8 | **22% is Oracle's standaard Software Update License & Support-tarief** | ✅ **Bevestigd** | Twee onafhankelijke licentie-adviesbronnen: *"Oracle prices at 22 percent of the net license fee per year"* resp. *"sets the fee at 22% of the net license value you originally paid"*. Ook de rekenkundige controle klopt: 2.090 / 9.500 = 22,0% | https://oraclenegotiations.com/deals/perpetual-licenses/ · https://oraclelicensingexperts.com/blog/jde-support-costs/ |
| 9 | **Vijfjaars-TCO ± USD 19.650** (10.450 + 4 × 2.299) | ⚠️ **Gecorrigeerd** | Rekenkundig juist, maar **intern inconsistent**: dezelfde paragraaf stelt jaar-1-support verplicht (HSSL: *"Support must be purchased with this perpetual license"*; Akim: support níét inbegrepen), wat 5 supportjaren impliceert. Vervangen door een bandbreedte **USD 19.650 – 21.950** | eigen herberekening op bronnen 4 + 6 |
| 10 | **Deltek Acumen Risk ± USD 10.300 initieel** | ❌ **Gecorrigeerd — niet houdbaar** | Actief geprobeerd te reproduceren; gerichte zoekacties op dat bedrag gaven **nul resultaten**. De enige vindbare cijfers zijn ITQlick's benchmarkschatting (USD 75–200 resp. 150–400 per user/maand), en ITQlick stelt zelf dat Deltek geen prijzen publiceert. Gewijzigd naar "prijs op aanvraag" — óók in de concurrentietabel en het eindoordeel | https://www.itqlick.com/acumen/pricing (403 bij directe fetch; via zoeksnippet) |
| 11 | **Barbecana Full Monte ± USD 1.195 per seat perpetual** | ✅ **Bevestigd + aangevuld** | Barbecana's eigen bestelpagina: USD 1.195 voor zowel de MSP- als de P6-editie, **inclusief 12 maanden onderhoud en updates**, verlenging **USD 299/jaar**. Nieuwe kanttekening: de P6-editie ondersteunt alleen standalone SQLite en MS SQL Server | https://www.barbecana.com/full-monte/purchase-full-monte-sra/ |
| 12 | **Full Monte ondersteunt MS Project 2010–2021 en P6 8.4–22.12** | ✅ **Bevestigd** | Letterlijk op Barbecana's productpagina | https://www.barbecana.com/full-monte/ |
| 13 | **OPC Risk mist probabilistic branching en criticality index; onafhankelijke vergelijking noemt OPC inmiddels goed genoeg als vervanger** | ✅ **Bevestigd** | Beide citaten letterlijk juist: *"The two most important of these are probability branching and criticality index"* en *"The OPC risk analysis module is now reliable enough to replace OPRA as the standard for risk analysis, even for large-scale and complex projects"* | https://www.baeken.com/en/knowledgebase/comprehensive-analysis-of-oracle-primavera-cloud-opc-risk-vs-opra/ |
| 14 | **Correlatiebug: >8.000 activiteiten, bestandsgroei + vastlopen, opsplitsen in 2.000 helpt niet, Oracle severity 2, *"would require a major code change"*** | ✅ **Bevestigd (single-source)** | Alle elementen letterlijk teruggevonden. ⚠️ Maar het blijft **één bron**, een geüploade DOCX van een gebruiker — geen Oracle-bevestiging. Behandel als goed gedocumenteerde *anekdote*, niet als geverifieerde productlimiet | https://www.slideshare.net/slideshow/correlation-bug-in-pertmaster-144456451/144456451 (403 bij directe fetch; via zoeksnippet) |
| 15 | **Overname Pertmaster + ProSight door Primavera Systems op 12 dec 2006; "bedrag niet openbaar gemaakt"** | ⚠️ **Gecorrigeerd** | Datum en gecombineerde overname bevestigd, inclusief het letterlijke persberichtcitaat. Maar het bedrag voor **ProSight is wél bekend: ± USD 45 miljoen**. Alleen de **Pertmaster**-prijs is niet bekendgemaakt. Profiel gepreciseerd | https://en.globes.co.il/en/article-1000162213 · https://www.buyoutsinsider.com/primavera-systems-buys-two/ |
| 16 | **Laatste patchset / laatst ondersteunde Windows-versie ("Windows 10 64-bit via 8.7.5 en latere patchsets"; patchsets t/m 2018)** | ⚠️ **Gecorrigeerd** | De laatst gedateerde patchset is **8.7 PatchSet 7, februari 2015**, en die voegde ondersteuning toe voor **Windows 7 SP1 en Windows 8.1** — niet Windows 10. Windows 10 is alleen via *derden* gedocumenteerd. Geen enkele patch ná 2015 gevonden. Tijdlijn en platformsectie herschreven; hierdoor blijkt Redstone's "last patch 2015" juist te kloppen | Emerald Associates (via snippet) · https://www.managementyogi.com/2019/11/step-by-step-guide-install-setup-and-test-oracle-primavera-risk-analysis-r8.7.5-on-windows-10.html |
| 17 | **VBA is in versie 8.7 verwijderd; sindsdien geen scripting/automatisering** | ❓ **Onzeker** | Meerdere gerichte zoekacties naar Oracle-releasenotes of documentatie over VBA-verwijdering in 8.7 leverden **niets** op. Het deel "geen API/CLI/scripting in 2026" is plausibel en onweersproken, maar de specifieke bewering *"verwijderd in 8.7"* is **niet onafhankelijk bevestigd**. Als onzeker gemarkeerd in tijdlijn én platformsectie | geen bevestigende bron gevonden |
| 18 | **"Het product wordt niet meer verkocht"** (nadeel 6) | ⚠️ **Gecorrigeerd** | Spreekt het eigen prijshoofdstuk tegen: Akim, PSG en HSSL bieden in juli 2026 aantoonbaar nieuwe licenties aan. Genuanceerd naar "Oracle zet het niet meer actief in de markt" | bronnen 4, 5, 6 |
| 19 | **Geen enkele IFC-/BIM-/4D-functionaliteit** | ❓ **Onzeker (naar alle waarschijnlijkheid juist)** | Een negatieve claim is niet hard te bewijzen. Het functie-/moduleoverzicht van een onafhankelijke trainingsaanbieder noemt uitsluitend MSP- en Primavera-import en Excel/Word/PowerPoint-export, en **nergens** IFC of BIM — consistent met het profiel, maar geen sluitend bewijs. Gezien de bevriezing in 2010 (vóór IFC 4.3) is de claim zeer aannemelijk | https://www.underscoregroup.com/primavera-risk-analysis |
| 20 | **Ondersteunde formaten: Asta Powerproject, Open Plan, Artemis (in het profiel al als "onzeker" gemarkeerd)** | ❓ **Onzeker — bevestigd onzeker** | Gerichte verificatie leverde geen enkele bron op die deze formaten voor 8.7 bevestigt. Het profiel markeert ze al terecht met ⚠️/"niet geverifieerd"; die markering blijft staan. De onafhankelijke functieoverzichtsbron noemt alleen **MSP en Primavera** als importbronnen, wat eerder tégen brede formaatondersteuning in 8.7 pleit | https://www.underscoregroup.com/primavera-risk-analysis |

### Samenvattend oordeel

- **Bevestigd (9):** de volledige lifecycle-kern, het P6-contrast, de afwezigheid op Oracle's productoverzicht, de Akim-, HSSL- en 2012-prijslijstcijfers, het 22%-supporttarief, de OPC-functiekloof, Full Monte's prijs en versiebereik, en de correlatiebug (single-source).
- **Gecorrigeerd (6):** PSG-supportclaim, de vijfjaars-TCO, de Acumen Risk-prijs, het overnamebedrag, de patch-/Windows-tijdlijn, en "wordt niet meer verkocht".
- **Onzeker gemarkeerd (4):** VBA-verwijdering in 8.7, de IFC-/BIM-nulclaim, de Asta/Open Plan/Artemis-formaten, en de correlatiebug als *generaliseerbare* limiet.
- **De hoofdconclusie van het profiel blijft overeind** — sterker zelfs: het product is nóg dieper bevroren dan beschreven (laatste patch feb 2015 in plaats van patchsets tot 2018, en geen enkele Oracle-certificering voorbij Windows 8.1). De zwakste onderdelen waren de **prijsvergelijking met concurrenten** (het Acumen-bedrag was verzonnen-ogend en onvindbaar) en het **TCO-rekenvoorbeeld** (intern inconsistent). De eigen prijzen van OPRA zijn daarentegen uitstekend onderbouwd en woord voor woord bij de bron gecontroleerd.
