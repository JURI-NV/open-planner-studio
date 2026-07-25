# Marktonderzoek: projectplanning-/schedulingsoftware in de Benelux

*Onderzoeksdatum: 25 juli 2026. Regio: Nederland, België, Luxemburg (West-Europa). Focus: software voor projectplanning/scheduling met Gantt/CPM, met nadruk op de bouwsector.*

> **Methodologische noot.** Dit rapport is samengesteld op basis van webonderzoek (leverancierssites, resellersites, vergelijkingsartikelen, marktrapport-samenvattingen) aangevuld met sectorkennis. Het zoekbudget van de onderzoekssessie raakte deels uitgeput; waar een claim niet online kon worden geverifieerd is dit expliciet gemarkeerd als **[schatting]** of **[niet online geverifieerd — sectorkennis]**. Elk hard cijfer heeft een bron-URL.
>
> **Verificatienoot (25 juli 2026).** Dit rapport is daarna onderworpen aan een adversariële fact-check; zie **[§9 Verificatie](#9-verificatie)**. Daarbij zijn een rekenfout in de marktomvangschatting, twee bronvermeldingen die de bijbehorende claim niet dekken, en drie onjuiste basiscijfers gevonden en gecorrigeerd. Correcties zijn in de tekst zelf verwerkt en per bewering onderbouwd in §9.

---

## 1. Samenvatting

- De Benelux is een **volwassen, dichte en professionele markt** voor bouwplanning. Nederland had in 2023 een bouw-**productiewaarde van €108,9 mrd** en een **netto-omzet van €152,2 mrd** (NACE F), bij een toegevoegde waarde van €46,5 mrd — dat is **4,4% van het bbp**, niet ~10% ([Eurostat `sbs_ovw_act`](https://ec.europa.eu/eurostat/databrowser/view/sbs_ovw_act) + [`nama_10_gdp`](https://ec.europa.eu/eurostat/databrowser/view/nama_10_gdp)). *[gecorrigeerd — zie §9.1: de eerdere "€100 mrd ≈ 10% bbp" vergeleek productiewaarde met een toegevoegde-waardemaatstaf.]* **België is niet 60–70% van NL maar praktisch even groot**: productiewaarde €110,6 mrd, netto-omzet €111,2 mrd (2023) *[gecorrigeerd, zie §9.2]*.
- De markt is **gelaagd in vier segmenten**: (1) zware CPM-tools voor infra en grote projecten — **Oracle Primavera P6** (de facto standaard bij ProRail-/RWS-achtige infraprojecten, geleverd/ondersteund via **Primaned**), **Microsoft Project** (breedste installed base), **Asta Powerproject** (bouwspecifieke uitdager), **TILOS** (tijd-weg voor lineaire infra, kennispartner **Aram Group**); (2) **4D/BIM-planning** (Bentley Synchro, Navisworks TimeLiner) — relevant vanwege de wereldwijd leidende openBIM-adoptie in Nederland; (3) **lokale bouw-SaaS** — vooral het Nederlandse **KYP Project** (lean-/ketenplanning, zeer sterk in woningbouw) en het Belgische **LetsBuild** (Aproplan/GenieBelt), plus Belgische mkb-suites (Vertuoza, Robaws, Bouwsoft) en Nederlandse bouw-ERP's met planningsmodules (4PS Construct, Metacom, Syntess, IBIS/Brink); (4) **generieke tools** (Monday, Smartsheet, Asana, Wrike, OpenProject, gratis ProjectLibre/GanttProject) die vooral buiten de uitvoerende bouw voor planning worden gebruikt.
- **Prijsanker**: Microsoft **Planner Abonnement 1 €8,70** en **Planner en Project Abonnement 3 €26,00** per gebruiker per maand, jaarverplichting, excl. btw ([Microsoft NL](https://www.microsoft.com/nl-nl/microsoft-365/planner/microsoft-planner-plans-and-pricing), gecontroleerd juli 2026 — let op de sinds 2024 gewijzigde productnamen); Primavera P6 Professional: **Oracle publiceert géén lijstprijs en de eerder geciteerde bron bevat geen enkel bedrag — het cijfer "$3.500 perpetual + 22%" is niet te staven en staat hier als onbevestigde marktindicatie** *[gecorrigeerd naar onzeker, zie §9.8]*; Powerproject op offertebasis (geen publieke prijs); KYP Project: **geen publieke prijs — de eerder geciteerde bron voor "±€3 per dag" noemt KYP niet eens** *[claim ingetrokken, zie §9.10]*.
- **Marktomvang Benelux voor planning-/schedulingsoftware (sec)**: **€15–40 mln/jaar** aan licenties/subscripties (brede band: de top-down- en bottom-upmethoden overlappen niet, zie §2.2), groeiend met ~8–10%/jaar; inclusief consultancy/training/hosting rond planning (Primaned c.s.) grofweg een factor 2–3 daarboven **[expliciete schatting met erkende onzekerheid; de eerdere puntschatting €30–50 mln berustte mede op een rekenfout, zie §9.6]**.
- **Lokale bijzonderheden die de markt vormen**: UAV-GC- en BVP-contracten leggen planningsverantwoordelijkheid bij de opdrachtnemer; grote publieke opdrachtgevers werken de facto met Primavera P6 en probabilistische planningen; Nederland loopt wereldwijd voorop in openBIM/IFC (BIM Basis ILS, RVB BIM-norm) — een **IFC-native planner sluit nergens beter aan dan hier**. Voertaal in het veld is Nederlands (NL/Vlaanderen) resp. Frans (Wallonië); een nl-canoniek product is een pluspunt dat vrijwel geen internationale concurrent biedt.

---

## 2. Marktomvang en groei

### 2.1 Wereldwijde referentiecijfers

Marktrapporten over "construction scheduling software" lopen sterk uiteen (verschillende afbakeningen):

| Bron | Omvang | CAGR |
|---|---|---|
| MarketIntelo | $2,1 mrd (2025) → $4,8 mrd (2034) | 9,2% |
| Verified Market Reports | $1,5 mrd (2025) → $3,0 mrd (2034) | 8,5% |
| Yahoo Finance (aggregatie) | $1,31 mrd (2024) → $1,44 mrd (2025) | ~9% |
| Verified Market Research | $2,1 mrd (2024) → $5,8 mrd (2032) | 13,5% |
| Wise Guy Reports | $4,07 mrd (2024) → $8,0 mrd (2035) | 6,3% |

*(gevonden via zoekaggregatie, juli 2026; de bredere "project portfolio management"-markt is een veelvoud hiervan)*. Consensus-ordegrootte: **$1,5–2 mrd wereldwijd voor bouw-scheduling sec, groei 8–10%/jaar**. **Waarschuwing bij deze tabel**: de vijf bronnen zijn commerciële syndicated-rapporten die elkaar met een factor 3 tegenspreken (2024-basis: $1,31 mrd vs. $4,07 mrd) en waarvan de methodologie niet publiek is; geen van de cijfers is bij de uitgever geverifieerd. Behandel $1,5–2 mrd als een **werkaanname met een onzekerheid van minstens ±100%**, niet als een gemeten marktomvang.

### 2.2 Benelux-afleiding [expliciete schatting — herrekend]

> **Correctienoot (§9).** De oorspronkelijke versie van deze paragraaf bevatte drie fouten die elkaar deels maskeerden: een te lage Benelux-bouwproductie, een te hoge wereldbouwmarkt, en een rekenfout in de bottom-up. Hieronder de herrekening.

Redenering (bottom-up + top-down):

1. **Top-down**: Benelux-bouwproductiewaarde (NACE F, 2023) = NL €108,9 mrd + BE €110,6 mrd + LU €7,9 mrd ≈ **€227 mrd** ([Eurostat `sbs_ovw_act`](https://ec.europa.eu/eurostat/databrowser/view/sbs_ovw_act)) — niet €170 mrd. De wereldbouwmarkt is niet $13–15 biljoen maar ca. **$10–11 biljoen**: Oxford Economics meet $9,7 biljoen "construction work done" in 2022 en verwacht $13,9 biljoen pas in **2037** ([Oxford Economics, Global Construction Futures](https://www.oxfordeconomics.com/resource/global-construction-futures/)). Benelux-aandeel = €227 mrd (≈$246 mrd) / ~$10,4 biljoen ≈ **2,3%**. Toegepast op $1,5–2 mrd: **$35–47 mln ≈ €32–43 mln**. *(De twee fouten hieven elkaar grotendeels op: 1,3–1,5% van een te grote noemer gaf toevallig een vergelijkbare uitkomst.)*
2. **Bottom-up [bevatte een rekenfout]**: NL telt naar schatting 2.500–4.000 fulltime planners/projectcontrollers in bouw & infra, België 1.500–2.500 **[schatting]** — samen 4.000–6.500, wat de eerder gehanteerde "±8.000 zware seats" **niet** draagt; die post is intern inconsistent. Correct doorgerekend met de oorspronkelijke aannames: ±8.000 zware seats × €500–1.500/jr = **€4–12 mln** (er stond €12–30 mln — fout) + ±40.000 lichte seats × €100–300/jr = **€4–12 mln**, totaal **≈ €8–24 mln** (er stond €16–42 mln — fout). Met de realistischer 4.000–6.500 zware seats zakt de zware laag naar €2–10 mln en het totaal naar **€6–22 mln**.
3. **Diensteneconomie eromheen**: de Benelux kent een uitzonderlijk grote consultancy-/detacherings-/opleidingslaag rond planning (Primaned + Primaned Academy, Aram Group, Threon, zelfstandige planners). Inclusief die laag ligt de "planning-economie" een factor 2–3 boven de softwaremarkt **[schatting, niet geverifieerd — geen omzetcijfers van deze partijen gecontroleerd]**.

**Conclusie: softwaremarkt (licenties/SaaS) Benelux ≈ €15–40 mln/jaar (2025/2026), groei ~8–10%/jaar.** De band is bewust breed: top-down komt op €32–43 mln, bottom-up op €6–24 mln, en die methoden **overlappen nauwelijks**. Zolang die spanning niet is opgelost, is elke puntschatting binnen deze band ongefundeerd. **[schatting, expliciet onzeker — zie §9.6/§9.7]**

### 2.3 Ordegrootte gebruikers

- **Primavera P6**: enkele duizenden seats in de Benelux, geconcentreerd bij infra-aannemers (BAM Infra, VolkerWessels-bedrijven, Heijmans Infra, Dura Vermeer, Besix, Jan De Nul, DEME, Boskalis, Van Oord), grote opdrachtgevers (ProRail, RWS-omgeving, TenneT, havens, Belgische Infrabel/De Werkvennootschap) en ingenieursbureaus (Arcadis, RHDHV, Sweco, TUC RAIL). **[schatting; kwalitatief bevestigd door het bestaan van een gespecialiseerde Oracle-partner Primaned met eigen academy en hosting — [primaned.com](https://www.primaned.com/nl/)]**
- **MS Project**: veruit de grootste installed base (tienduizenden), maar verwaterend richting Planner/Project for the Web. ([Microsoft NL-prijzen](https://www.microsoft.com/nl-nl/microsoft-365/planner/microsoft-planner-plans-and-pricing))
- **Asta Powerproject**: wereldwijd ">100.000 professionals" ([eleco.com](https://eleco.com/products/asta-powerproject/)); in NL sterk bij middelgrote/grote B&U-bouwers. Een zoekresultaat claimde "ongeveer 90% van Nederlandse bouwbedrijven" — dit is vrijwel zeker een verbastering van de Britse claim ("~90/95% van UK-topaannemers") en moet **niet** als Benelux-cijfer worden gebruikt **[lage betrouwbaarheid, gemarkeerd]**.
- **KYP Project**: "duizenden" gebruikers, honderden bouwbedrijven vooral in NL-woningbouw ([kyp.now](https://kyp.now/nl/)).

---

## 3. Gebruikte software: marktpositie en prijzen

### 3.1 Segment A — Zware CPM/scheduling (bouw & infra)

| # | Pakket | Leverancier (+ lokaal kanaal) | Marktpositie Benelux | Prijs |
|---|---|---|---|---|
| 1 | **Microsoft Planner / Project** | Microsoft | Breedste installed base; standaard bij mkb-bouw, ingenieursbureaus, overheden; verliest terrein aan specialisten in infra en aan SaaS in uitvoering | **Planner Abonnement 1 €8,70**, **Planner en Project Abonnement 3 €26,00**, beide **per gebruiker per maand bij jaarverplichting, excl. btw** ([microsoft.com/nl-nl](https://www.microsoft.com/nl-nl/microsoft-365/planner/microsoft-planner-plans-and-pricing), geverifieerd juli 2026). **Plan 5 staat niet meer op de NL-pagina** — het eerder genoemde ±€52 is niet verifieerbaar en is ingetrokken **[onzeker, §9.7]** |
| 2 | **Oracle Primavera P6 (PPM/EPPM) + Primavera Cloud** | Oracle; in NL/BE via **Primaned** (Capelle a/d IJssel; ook Belgische tak) | De facto standaard grote infra (rail, wegen, waterbouw, energie, industrie); vaak contractueel verwacht bij grote publieke projecten | **Geen verifieerbare prijs.** Oracle publiceert geen lijstprijs (bevestigd op [oracle.com/industries/construction-engineering/primavera-p6](https://www.oracle.com/industries/construction-engineering/primavera-p6/)) en de eerder geciteerde resellerbron ([prmyazilim.com](https://www.prmyazilim.com)) blijkt **helemaal geen prijzen te noemen**. De rondzingende indicatie "±$3.500 perpetual + ±22% onderhoud/jr" is hier **niet onderbouwd** **[onzeker, §9.8]**. Oracle stuurt actief naar Primavera Cloud (abonnement); [primaned.com](https://www.primaned.com/nl/) levert implementatie/hosting/training |
| 3 | **Asta Powerproject (Elecosoft/Eleco)** | Eleco plc, eigen Benelux-verkoop ([eleco.com](https://eleco.com/products/asta-powerproject/)) | Sterke #2/#3 in uitvoerende B&U-bouw; bouwspecifiek (4D BIM-koppeling, site progress); **"more than 100,000 professionals worldwide"** — letterlijk geverifieerd op [eleco.com](https://eleco.com/products/asta-powerproject/) | Geen publieke lijstprijs (offerte/reseller); de eerder genoemde €1.500–2.500 perpetual / €60–100 p/m is **niet verifieerbaar** — Eleco's eigen webshop was niet bereikbaar (HTTP 429) **[onzeker, §9.9]** |
| 4 | **TILOS (Trimble)** | Trimble; Benelux-kennispartner **Aram Group** (levering + training) ([zoekresultaten Trimble/Aram](https://www.aramgroup.nl)) | Nichestandaard voor lineaire infra: spoor, wegen, dijkversterking (HWBP), kabels/leidingen; vaak naast P6 gebruikt | Geen publieke lijstprijs; indicatief €4.000–7.000 perpetual per seat **[schatting, resellerindicaties]** |
| 5 | **Bentley Synchro 4D** | Bentley Systems | 4D-planning op grote infra- en utiliteitsprojecten; gebruikt door grote aannemers naast P6/Navisworks | Subscriptie via Bentley (Virtuosity), indicatief €2.500–4.500/jr per seat **[schatting]** |
| 6 | **RIB Candy / iTWO** | RIB Software (Schneider Electric) | Marginaal in Benelux-thuismarkt; vooral bekend via internationale tak van grote bouwers (BAM International-erfenis) | Offerte **[niet online geverifieerd]** |
| 7 | **Safran, Deltek Open Plan, Spider Project, Sciforma, Phoenix PM** | div. | Marginaal; Safran incidenteel in olie & gas/industrie, rest nauwelijks zichtbaar in Benelux-bouw | Offerte |

**Rangorde segment A (bouw/infra, kwalitatief)**: 1. MS Project (volume) — 2. Primavera P6 (waarde/infra) — 3. Asta Powerproject (B&U-specialist) — 4. TILOS (lineaire infra-niche) — 5. Synchro (4D-niche). **[kwalitatieve inschatting op basis van kanaalaanwezigheid, vacature-eisen en vergelijkingsartikelen]**

### 3.2 Segment B — AI-/data-gedreven planning (opkomend)

- **nPlan** (UK): **BAM is bevestigd klant** — nplan.io toont een testimonial van **David Bunn, Portfolio Director bij BAM**, over portfoliobrede risicobeheersing. Het model is getraind op **"750,000 historical schedules representing over $2Tn of construction spend"** (letterlijk citaat, [nplan.io](https://www.nplan.io/)) — bevestigd. De specifieke claims "**launch partner** van nPlan Portfolio", "**juli 2023**" en "**50 projecten**" zijn **niet terug te vinden** in BAM's eigen persberichtenarchief en blijven onbevestigd **[onzeker, §9.14]**. Dit is niettemin de best gedocumenteerde AI-planning-adoptie in de Benelux.
- **ALICE Technologies** (VS): generatieve scheduling; pilots bij Europese topaannemers, Benelux-adoptie niet publiek gedocumenteerd **[niet online geverifieerd]**.
- **Nodes & Links** (UK): schedule-analytics bovenop P6; gebruikt in tenderteams van grote infra-aannemers **[niet online geverifieerd — sectorkennis]**.
- Prijzen: alle drie enterprise-offertes, typisch tienduizenden euro's per jaar per portfolio/project **[schatting]**.

### 3.3 Segment C — Lokale/regionale bouw-SaaS en ERP-planning (het échte Benelux-verhaal)

| Pakket | Land | Wat | Positie | Prijs |
|---|---|---|---|---|
| **KYP Project (KYP.now)** | NL | Lean-/ketenplanning ("digitale post-its", locatiegebaseerd, realtime met alle ketenpartners); suite Plan/Project/People/Predict/Process | Wordt door [edcontrols.nl](https://edcontrols.nl/nieuws-inzichten/welke-bouwsoftware-gebruiken-nederlandse-aannemers-het-meest) als "populairste planningstool" genoemd, maar **dat artikel is redactionele content van een softwareleverancier zonder enquête, steekproef of percentages** — geen bewijs van marktleiderschap. De formulering "populairste in NL-woningbouw" is daarom afgezwakt **[onzeker, §9.11]** | **Geen publieke prijs.** kyp.now noemt nergens tarieven (alleen "Maak snel een account aan. Kost niks!"). De eerder geciteerde bron voor "±€3/dag per project" ([planningpme.nl top-10](https://www.planningpme.nl/top-10-planningssoftware-voor-de-bouw-in-nederland-2026/)) **noemt KYP niet en bevat geen enkel bedrag** — claim ingetrokken **[§9.10]** |
| **LetsBuild (Aproplan + GenieBelt)** | BE/DK | Site-planning, voortgang, QHSE; Gantt-light voor uitvoering | Sterk in Vlaanderen/EU-uitvoeringsfase; geen CPM-engine | Per gebruiker/maand, jaarlijks gefactureerd, offerte ([letsbuild.com](https://www.letsbuild.com); [aproplan.com/nl/prijzen](https://www.aproplan.com/nl/prijzen)) |
| **Vertuoza** | BE (Waalse oorsprong; NL-site vermeldt vestiging **Aartselaar**, Vlaanderen) | Cloud-suite mkb-aannemers: offerte→planning→facturatie | Snelgroeiend bij Belgische kmo's; opereert blijkens de eigen site in **BE, FR, CH, LU én NL** — niet louter Waals ([vertuoza.com/nl-nl](https://www.vertuoza.com/nl-nl)) | Abonnement, uitsluitend op offerte — **geverifieerd: geen prijzen publiek**, alleen een demo-CTA ([vertuoza.com/nl-nl](https://www.vertuoza.com/nl-nl)) |
| **Robaws** | BE (Gent) | ERP voor aannemers/installateurs incl. planning | Vlaams mkb | Abonnement per gebruiker ([robaws.com](https://robaws.com/nl-BE/blog/de-5-beste-bouwsoftware-voor-aannemers-en-installateurs)) |
| **Bouwsoft** | BE (West-Vlaanderen) | Bouwadministratie + planning voor kmo | Vlaams mkb, grote lokale naam | Abonnement, offerte ([robaws-vergelijking](https://robaws.com/nl-BE/blog/de-5-beste-bouwsoftware-voor-aannemers-en-installateurs)) |
| **4PS Construct** | NL (Ede) | Bouw-ERP op Microsoft Dynamics 365 incl. (resource)planning | Top-3 bouw-ERP NL; planning als module | Per gebruiker Dynamics-model, offerte ([edcontrols.nl-overzicht](https://edcontrols.nl/nieuws-inzichten/welke-bouwsoftware-gebruiken-nederlandse-aannemers-het-meest)) |
| **Metacom (Van Meijel)** | NL | Bouw-ERP incl. projectplanning/capaciteit | Grote GWW- en bouwbedrijven NL | Offerte **[niet online geverifieerd]** |
| **Syntess Atrium** | NL | ERP installatie/bouw incl. planning | Installatiesector NL | Offerte **[niet online geverifieerd]** |
| **IBIS-TRAD / Brink-software** | NL | Calculatie (planning via koppelingen) | Calculatie-standaard NL; geen echte scheduler | Offerte ([edcontrols.nl](https://edcontrols.nl/nieuws-inzichten/welke-bouwsoftware-gebruiken-nederlandse-aannemers-het-meest)) |
| **Ed Controls, Snagstream** | NL | Kwaliteitsborging/opleveren — géén Gantt/CPM, wel alomtegenwoordig naast planners | — | — |
| **PlanningPME, vPlan** | FR/NL | Resource-/personeelsplanning (geen CPM) | mkb-personeelsplanning | PlanningPME/vPlan abonnementen ±€10–40 p/g/m **[indicatie van eigen sites]** |

### 3.4 Segment D — Generieke projecttools (voor zover serieus voor planning gebruikt)

| Pakket | Positie in Benelux | Prijs |
|---|---|---|
| **Monday.com** | Populair bij ontwikkelaars, marketing-/PMO-teams; incidenteel bouwkantoren | Work Management: Basic $9 / Standard $12 / Pro $19 per seat/maand **bij jaarfacturatie** — geverifieerd juli 2026. **Belangrijke nuance die eerder ontbrak: minimaal 10 seats**, dus de feitelijke instap is ±$90–190/maand, niet $9 ([monday.com/pricing](https://monday.com/pricing)) |
| **Smartsheet** | PMO's, corporates; Gantt-achtig, geen echte CPM-diepgang | **Gecorrigeerd**: $12 (Pro) en $24 (Business) zijn de tarieven **bij maandfacturatie**; bij jaarfacturatie ±**$9** resp. ±**$19** per member/maand. Business vereist min. 3 members; Pro max. 10 ([smartsheet.com/pricing](https://www.smartsheet.com/pricing)) **[bedragen afgeleid uit een deels corrupt renderende prijstabel — behandel als indicatief, §9.13]** |
| **Asana / Wrike** | Kantoor-PM, niet in de uitvoering | Asana Starter ±€10,99, Advanced ±€24,99; Wrike Team ±$10, Business ±$25 p/g/m **[lijstprijzen leveranciers — in deze verificatieronde NIET gecontroleerd; behandel als onzeker]** |
| **OpenProject** | Open source (Duits), gebruikt door overheden/onderwijs met open-source-beleid | Community gratis; Enterprise €5,95 (Basic) / €10,95 (Professional) / €15,95 (Premium) p/g/m, BIM-add-on +€1,00 p/g/m — geverifieerd juli 2026. **Nuance die eerder ontbrak: minimumafname 25 gebruikers (Basic/Professional) resp. 100 (Premium)**; maandfacturatie alleen bij Basic-cloud ([openproject.org/pricing](https://www.openproject.org/pricing/)) |
| **ProjectLibre / GanttProject** | Gratis MS-Project-klonen; zzp/klein mkb, onderwijs | Gratis (ProjectLibre Cloud betaald) |

---

## 4. Wie gebruikt wat (vraagzijde)

- **Grote infra-aannemers** (BAM Infra, VolkerWessels-infra, Heijmans, Dura Vermeer, Mobilis/TBI, Besix, Jan De Nul, DEME, Willemen, Boskalis, Van Oord): **Primavera P6** als ruggengraat, **TILOS** voor lineair werk, **Synchro/Navisworks** voor 4D, opkomend **nPlan/Nodes & Links** in tender- en risicoanalyse. **[kwalitatief; nPlan×BAM gedocumenteerd, zie §3.2]**
- **B&U-aannemers middelgroot/groot**: **Asta Powerproject** en/of **MS Project** voor de overall-planning; **KYP Project** voor de uitvoerings-/ketenplanning (NL), **LetsBuild** (BE).
- **Mkb-aannemers en installateurs**: planningsmodule van hun ERP (4PS, Metacom, Syntess, Admicom, Robaws, Bouwsoft, Vertuoza), Excel, of gratis tools (GanttProject/ProjectLibre).
- **Ingenieurs-/adviesbureaus** (Arcadis, RHDHV, Sweco, Witteveen+Bos, Tractebel, Arcadis Belgium/TUC RAIL): MS Project breed; P6 voor infra-opdrachten; planningsconsultancy als dienst.
- **Publieke opdrachtgevers** (ProRail, Rijkswaterstaat, TenneT, Schiphol, havenbedrijven, De Werkvennootschap, Infrabel, gemeenten): eigen regie-planners op P6/MS Project; eisen planningen van opdrachtnemers ter toetsing (SCB bij RWS — [rws-zoekresultaat](https://www.rijkswaterstaat.nl)).
- **Industrie/energie (shutdowns, offshore wind)**: P6 dominant, Safran incidenteel. **[sectorkennis]**

---

## 5. Lokale bijzonderheden

1. **Contractvormen sturen de planningspraktijk.** UAV-GC (geïntegreerde contracten) en BVP/Best Value leggen ontwerp- én planningsverantwoordelijkheid bij de opdrachtnemer; de planning is toetsinstrument binnen Systeemgerichte Contractbeheersing (SCB) bij Rijkswaterstaat ([rijkswaterstaat.nl](https://www.rijkswaterstaat.nl)). Gevolg: professionele planningsafdelingen bij aannemers en een levendige markt voor planningsconsultancy.
2. **De facto P6-verwachting bij grote infra.** Een expliciete, gepubliceerde "XER-verplichting" kon in dit onderzoek **niet** online worden aangetoond; wel is het bestaan van een gespecialiseerd Oracle-Primavera-ecosysteem (Primaned incl. academy, hosting en detachering — [primaned.com](https://www.primaned.com/nl/)) sterke indirecte evidentie dat grote opdrachtgevers/projecten de facto P6-planningen (XER-uitwisseling) verwachten. **[deels sectorkennis; markeer als praktijknorm, niet als formele eis]** **Verificatie bevestigt deze terughoudendheid**: er is in deze ronde geen enkel aanbestedingsdocument, RWS-/ProRail-vraagspecificatie of contractvoorwaarde gevonden die Primavera P6 of XER voorschrijft. De aanwezigheid van een Oracle-partnerecosysteem is *indirecte* evidentie en bewijst geen contracteis. **Gebruik "P6 is verplicht bij overheidswerk" nergens als feit** — het is hooguit een de-facto praktijknorm bij een deel van de grote infraprojecten *[§9.16]*. Probabilistisch plannen (Monte-Carlo op de planning, o.a. Primavera Risk Analysis/Safran Risk — beide in Primaneds portfolio) is bij grote NL-infraprojecten gangbaar.
3. **openBIM-koploper.** Nederland behoort wereldwijd tot de koplopers in openBIM/IFC: BIM Basis ILS breed gedragen, RVB BIM-norm bij het Rijksvastgoedbedrijf, digiGO/DSGO als sectorale digitaliseringsagenda. De claim dat de Europese BIM-adoptie onder architecten steeg van ~10% naar ~53% van projecten (USP Marketing Consultancy, European Architectural Barometer) **kon niet worden geverifieerd**: usp-mc.nl gaf herhaald HTTP 503, en de claim noemt geen jaartallen, geen landenafbakening en geen steekproef — **behandel als onzeker [§9.15]**. Ook de verwijzing naar de Nationale digiMonitor 2023 ([digigo.nu](https://www.digigo.nu)) is niet nagelopen. **Voor een IFC-native planner (IFC 4.3 mét scheduling-entiteiten) is dit wereldwijd de meest ontvankelijke markt.**
4. **Taal.** Nederlands is de werktaal op de bouwplaats in NL en Vlaanderen; Frans in Wallonië; Luxemburg FR/DE. Grote internationale pakketten (P6!) zijn niet of matig gelokaliseerd — een nl-canoniek product met ook fr-vertaling dekt de hele Benelux af en onderscheidt zich direct.
5. **Opleidingscultuur.** Sterke, geïnstitutionaliseerde planningsopleidingscultuur: Primaned Academy (P6-trainingen), Aram Academy (TILOS), cursussen via Springest/PAO, en beroepsverenigingen als DACE (cost & planning engineers) en IPMA-NL. Planner is in NL een erkend, schaars beroep (krappe arbeidsmarkt).
6. **Resellers/kanaal.** Primaned (Oracle Primavera, NL + BE), Elecosoft/Eleco Benelux (Powerproject, [eleco.com/nl](https://eleco.com/products/asta-powerproject/)), Aram Group (TILOS/Trimble), Microsoft-CSP's (overal), Bentley direct/Virtuosity. Consultancies: Primaned, Threon (BE), diverse zzp-planningbureaus.
7. **Lean plannen als NL-eigenaardigheid.** De Nederlandse woningbouw plant in ketens ("lean sessies", post-its) — vandaar het succes van KYP Project; dit segment overlapt nauwelijks met CPM-tools en vervangt ze niet bij complexe projecten.

---

## 6. Voor- en nadelen van lokale/niche-pakketten

### KYP Project (NL) — [kyp.now](https://kyp.now/nl/)
**Voordelen** (uit vergelijkingen, m.n. [edcontrols.nl](https://edcontrols.nl/nieuws-inzichten/welke-bouwsoftware-gebruiken-nederlandse-aannemers-het-meest); de eerder geciteerde [planningpme.nl](https://www.planningpme.nl/top-10-planningssoftware-voor-de-bouw-in-nederland-2026/) **noemt KYP niet en is als bron verwijderd**):
- Zeer laagdrempelig ("digitale post-its"), realtime gedeeld met alle ketenpartners incl. onderaannemers; automatische notificaties bij wijzigingen.
- Gratis instapaccount (kyp.now: "Maak snel een account aan. Kost niks!"). **Het eerder genoemde "±€3/dag per project" is ingetrokken — geen enkele bron staaft het en KYP publiceert geen tarieven** *[§9.10]*.
- Sterk ingeburgerd in NL-woningbouw **[kwalitatief; geen enquêtedata gevonden]**; NL-support, NL-taal, lean-methodiek ingebakken; suite groeit (People/Predict).

**Nadelen**:
- Geen echte CPM-engine: geen kritieke-padberekening, floats, kalendercomplexiteit of resource-leveling op het niveau van P6/Powerproject — ongeschikt als contractuele detailplanning bij infra/UAV-GC.
- Per-projectmodel wordt duur bij veel gelijktijdige kleine projecten; data zit in een gesloten SaaS (beperkte export, geen IFC/XER).
- Buiten NL (D/UK-expansie) beperkte tractie; ecosysteem is NL-centrisch.

### LetsBuild / Aproplan (BE) — [letsbuild.com](https://www.letsbuild.com)
**Voordelen**: sterke uitvoerings- en QHSE-workflows (snagging, opleveringen) gekoppeld aan een eenvoudige planning; Vlaamse roots en NL/FR-talig; schaalbaar per gebruiker ("klein beginnen").
**Nadelen**: planningsdeel is Gantt-light zonder CPM-diepgang; prijzen niet transparant (offerte, jaarfacturatie); na fusie GenieBelt/Aproplan koersvastheid product wisselend (reviews noemen migratiepijn) **[reviews, kwalitatief]**.

### Vertuoza (BE-Wallonië) — [vertuoza.com](https://www.vertuoza.com)
**Voordelen**: alles-in-één voor kmo (offerte→planning→facturatie), Franstalige support — zeldzaam; agressieve groei/marketing in BE.
**Nadelen**: planning is bijzaak naast administratie; geen CPM; jonge speler, prijzen niet publiek; lock-in.

### Robaws / Bouwsoft (BE-Vlaanderen)
**Voordelen**: diep geworteld in Vlaamse kmo-administratie (facturatie, ATA, sociale wetgeving), planning geïntegreerd met personeel/materieel.
**Nadelen**: planning = resourcekalender, geen projectnetwerk/CPM; verouderende UI (Bouwsoft) **[reviews, kwalitatief]**; alleen relevant binnen België.

### 4PS / Metacom / Syntess (NL bouw-ERP's)
**Voordelen**: planning gekoppeld aan calculatie, inkoop en uren — één bron; grote NL-installed base; Dynamics-ecosysteem (4PS).
**Nadelen**: projectplanning is capaciteits-/resourcegericht, geen volwaardige CPM-scheduler; grote implementatietrajecten; planners exporteren alsnog naar MS Project/Powerproject voor het echte netwerk.

### Primaned (als kanaal, NL/BE) — [primaned.com](https://www.primaned.com/nl/)
Geen software-eigenaar maar dé P6-poortwachter: consultancy, implementatie, hosting, academy en detachering ("PROCON Professionals"). Wie in NL/BE-infra iets met planning wil, komt Primaned tegen — relevant als potentiële partner óf concurrent-kanaal voor een nieuwe planner.

---

## 7. Implicaties voor een IFC-native, nl-canonieke planner (Open Planner Studio)

1. **Gat in de markt**: tussen KYP (lean, geen CPM) en P6/Powerproject (zwaar, duur, Engels, gesloten formaten) zit ruimte voor een betaalbare, Nederlandstalige CPM-planner met open bestandsformaat. IFC 4.3 als native formaat resoneert met BIM Basis ILS/RVB-norm en het openBIM-sentiment (anti-lock-in) van NL-opdrachtgevers.
2. **Interop is toegangskaart**: XER-/MS Project-import/-export is in dit land geen nice-to-have maar een harde eis om in infra-ketens mee te draaien (de facto P6-norm, §5.2).
3. **Prijsanker**: onder de €26 p/g/m van Microsofts Planner en Project Abonnement 3 (geverifieerd, §9.12) en ver onder P6-TCO; gratis/open instap verslaat ProjectLibre op kwaliteit en KYP op planningsdiepgang. *Let op: P6-TCO is in dit rapport niet gekwantificeerd — de eerder gebruikte $3.500-indicatie is ingetrokken (§9.8), dus "ver onder P6" is een kwalitatieve aanname.*
4. **Kanaal**: opleiders/consultancies (Primaned-achtigen, DACE-netwerk) en de digiGO/BIM-gemeenschap zijn de kortste route naar geloofwaardigheid.

---

## 8. Bronnen

- Microsoft NL — Planner/Project-prijzen: https://www.microsoft.com/nl-nl/microsoft-365/planner/microsoft-planner-plans-and-pricing
- Eleco/Elecosoft — Asta Powerproject (product, >100.000 gebruikers): https://eleco.com/products/asta-powerproject/
- Primaned (Oracle Primavera-partner NL/BE, diensten/academy/hosting): https://www.primaned.com/nl/
- ~~Primavera P6-prijsindicaties (perpetual ±$3.500 + 22% onderhoud): https://www.prmyazilim.com~~ — **INGETROKKEN**: deze site bevat geen prijzen (§9.8)
- Oracle — Primavera P6 productpagina (bevestigt: geen gepubliceerde lijstprijs): https://www.oracle.com/industries/construction-engineering/primavera-p6/
- KYP / KYP Project: https://kyp.now/nl/ (geen publieke tarieven). ~~prijsindicatie ±€3/dag: https://www.planningpme.nl/top-10-planningssoftware-voor-de-bouw-in-nederland-2026/~~ — **INGETROKKEN**: dat artikel noemt KYP niet en bevat geen bedragen (§9.10)
- Eurostat — Structural business statistics, `sbs_ovw_act` (NACE F, netto-omzet / productiewaarde / toegevoegde waarde NL-BE-LU 2023): https://ec.europa.eu/eurostat/databrowser/view/sbs_ovw_act
- Eurostat — `nama_10_gdp` (bbp NL/BE/LU 2023–2024): https://ec.europa.eu/eurostat/databrowser/view/nama_10_gdp
- Oxford Economics — Global Construction Futures ($9,7 bln 2022 → $13,9 bln 2037): https://www.oxfordeconomics.com/resource/global-construction-futures/
- nPlan (750.000 planningen, >$2 bln bouwuitgaven; BAM-testimonial David Bunn): https://www.nplan.io/
- Vertuoza (geen publieke prijzen; BE/FR/CH/LU/NL): https://www.vertuoza.com/nl-nl
- Ed Controls — "Welke bouwsoftware gebruiken Nederlandse aannemers het meest?": https://edcontrols.nl/nieuws-inzichten/welke-bouwsoftware-gebruiken-nederlandse-aannemers-het-meest
- Bouwend Nederland — overzicht bouwsoftware: https://www.bouwendnederland.nl/kennis/digitalisering/overzicht-bouwsoftware
- CBS — omzet bouwsector 2024 (+2,6%): https://www.cbs.nl
- LetsBuild/Aproplan: https://www.letsbuild.com ; https://www.aproplan.com/nl/prijzen
- Vertuoza — top-10 planningssoftware bouw: https://www.vertuoza.com/nl-nl/blog/beste-planningssoftware-in-de-bouw
- Robaws — vergelijking Belgische bouwsoftware: https://robaws.com/nl-BE/blog/de-5-beste-bouwsoftware-voor-aannemers-en-installateurs
- OpenProject-prijzen: https://www.openproject.org/pricing/
- Monday.com-prijzen: https://monday.com/pricing
- Smartsheet-prijzen: https://www.smartsheet.com/pricing
- nPlan × BAM (launch partner nPlan Portfolio, 50 projecten): https://www.nplan.io (persbericht, via zoekaggregatie)
- TILOS/Trimble + Aram Group (Benelux-kennispartner): https://www.aramgroup.nl ; https://construction.trimble.com
- USP Marketing Consultancy — European Architectural Barometer (BIM-adoptie ~10%→53%): https://www.usp-mc.nl
- digiGO — Nationale digiMonitor 2023: https://www.digigo.nu
- Marktomvang scheduling-software (MarketIntelo, Verified Market Reports, Wise Guy Reports e.a., via zoekaggregatie juli 2026): zie §2.1
- Rijkswaterstaat — Systeemgerichte Contractbeheersing: https://www.rijkswaterstaat.nl

*Alle bedragen exclusief btw. Alle als [schatting] gemarkeerde cijfers zijn eigen afleidingen met de vermelde redenering; alle als [niet online geverifieerd] gemarkeerde uitspraken zijn sectorkennis die in dit onderzoek niet met een URL kon worden gestaafd.*

---

## 9. Verificatie

*Adversariële fact-check, uitgevoerd 25 juli 2026. Opzet: elke bewering actief proberen te **weerleggen** met bronnen die het rapport zelf niet noemt (Eurostat-API, Oxford Economics, leverancierspagina's rechtstreeks), plus narekenen van alle doorgerekende schattingen. Beperking: het WebSearch-budget van de sessie was uitgeput, dus verificatie verliep via directe WebFetch/API-calls; enkele bronnen waren onbereikbaar (usp-mc.nl 503, shop.eleco.com 429) en zijn daarom als onzeker gemarkeerd in plaats van als bevestigd.*

| # | Bewering | Oordeel |
|---|---|---|
| 9.1 | NL bouwproductie ≈ €100 mrd, "~10% bbp" | **Gecorrigeerd** |
| 9.2 | BE ≈ €65 mrd (60–70% van NL) | **Gecorrigeerd** |
| 9.3 | LU ≈ €7 mrd | **Bevestigd** |
| 9.4 | Benelux-bouwproductie ≈ €170 mrd | **Gecorrigeerd** |
| 9.5 | Wereldbouwmarkt $13–15 biljoen | **Gecorrigeerd** |
| 9.6 | Bottom-up: €16–42 mln | **Gecorrigeerd (rekenfout)** |
| 9.7 | Marktomvang Benelux €30–50 mln/jaar | **Gecorrigeerd → onzeker** |
| 9.8 | P6 ±$3.500 perpetual + 22% | **Onzeker (bron weerlegd)** |
| 9.9 | Powerproject €1.500–2.500 / €60–100 p/m | **Onzeker** |
| 9.10 | KYP ±€3/dag per project | **Weerlegd (bron noemt KYP niet)** |
| 9.11 | KYP is populairste planningstool NL | **Onzeker** |
| 9.12 | MS Project €8,70 / €26 p/g/m | **Bevestigd** |
| 9.13 | Smartsheet Pro $12 / Business $24 "jaarlijks" | **Gecorrigeerd** |
| 9.14 | nPlan: 750.000 planningen; BAM launch partner, 50 projecten | **Deels bevestigd, deels onzeker** |
| 9.15 | BIM-adoptie ~10% → ~53% (USP) | **Onzeker (bron onbereikbaar)** |
| 9.16 | P6/XER de facto vereist bij grote publieke infra | **Bevestigd als hedge — géén formele eis** |
| 9.17 | Asta >100.000 professionals wereldwijd | **Bevestigd** |
| 9.18 | Monday $9/$12/$19 | **Bevestigd, met ontbrekende voorwaarde** |
| 9.19 | OpenProject €5,95–€15,95 + BIM €1 | **Bevestigd, met ontbrekende voorwaarde** |
| 9.20 | LetsBuild/Aproplan: offerte, jaarfacturatie | **Bevestigd** |
| 9.21 | Vertuoza: prijzen niet publiek; "Wallonië" | **Bevestigd resp. genuanceerd** |
| 9.22 | Wereldmarktcijfers scheduling-software ($1,5–2 mrd) | **Onzeker** |

### Onderbouwing per bewering

**9.1 — NL bouwproductie ≈ €100 mrd, "~10% bbp" → GECORRIGEERD.**
Eurostat SBS (NACE F, 2023): netto-omzet **€152.224,6 mln**, productiewaarde **€108.909,1 mln**, toegevoegde waarde **€46.531,0 mln**, 561.951 werkzame personen, 273.508 ondernemingen. Het cijfer "€100 mrd" is dus verdedigbaar als *productiewaarde*, maar veel te laag als *omzet*. De toevoeging "~10% bbp" is een categoriefout: 10,4% is de verhouding productiewaarde/bbp, terwijl het bbp een toegevoegde-waardemaatstaf is. Het correcte bbp-aandeel van de bouw is **4,4%** (€46,5 mrd / €1.050,1 mrd, Eurostat `nama_10_gdp` 2023). Ook is de oorspronkelijke bronvermelding zwak: er werd naar cbs.nl en bouwendnederland.nl in het algemeen verwezen zonder vindbare pagina (beide URL's gaven 404 bij controle).
Bronnen: https://ec.europa.eu/eurostat/databrowser/view/sbs_ovw_act · https://ec.europa.eu/eurostat/databrowser/view/nama_10_gdp

**9.2 — "België is grofweg 60–70% van NL" (≈ €65 mrd) → GECORRIGEERD.**
Eurostat SBS (NACE F, 2023) voor België: netto-omzet **€111.239,2 mln**, productiewaarde **€110.569,3 mln**, toegevoegde waarde €31.963,0 mln, 361.402 werkzame personen. Op productiewaarde is België **102% van Nederland**, niet 60–70%; op netto-omzet 73%. De schatting €65 mrd is een onderschatting van ±40% en de verhoudingsclaim is onjuist. Dit is de grootste feitelijke fout in het rapport, omdat hij doorwerkt in de top-downberekening in §2.2.
Bron: https://ec.europa.eu/eurostat/databrowser/view/sbs_ovw_act

**9.3 — LU ≈ €7 mrd → BEVESTIGD.**
Eurostat SBS (NACE F, 2023) Luxemburg: productiewaarde **€7.933,3 mln**, netto-omzet €10.701,6 mln, toegevoegde waarde €3.737,2 mln. "Ca. €7 mrd" komt goed overeen met de productiewaarde.
Bron: https://ec.europa.eu/eurostat/databrowser/view/sbs_ovw_act

**9.4 — Benelux-bouwproductie ≈ €170 mrd → GECORRIGEERD naar €227 mrd.**
Optelsom van 9.1–9.3 op productiewaarde: 108,9 + 110,6 + 7,9 = **€227,4 mrd** (2023). Op netto-omzet: €274,2 mrd. De oorspronkelijke €170 mrd is ±25% te laag, vrijwel volledig door de Belgische onderschatting.
Bron: https://ec.europa.eu/eurostat/databrowser/view/sbs_ovw_act

**9.5 — Wereldbouwmarkt $13–15 biljoen → GECORRIGEERD naar ~$10–11 biljoen.**
Oxford Economics (Global Construction Futures, de standaardreferentie voor deze grootheid) meet **"Construction work done up from US$9.7 trillion in 2022 to US$13.9 trillion in 2037"**. Het rapport gebruikt dus een niveau dat pas rond 2035–2037 wordt bereikt als *huidige* wereldmarkt. Bij de impliciete groei van 2,43%/jaar komt 2025 uit op ca. **$10,4 biljoen** en 2026 op ca. $10,7 biljoen. Effect: de noemer in de top-downberekening was ~30% te groot, waardoor het Benelux-aandeel werd onderschat.
Bron: https://www.oxfordeconomics.com/resource/global-construction-futures/

**9.6 — Bottom-up "≈ €12–30 mln zware laag + €4–12 mln lichte laag ≈ €16–42 mln" → GECORRIGEERD (rekenfout).**
Nagerekend met de aannames van het rapport zelf: 8.000 × €500 = €4 mln en 8.000 × €1.500 = €12 mln, dus de zware laag is **€4–12 mln**, niet €12–30 mln. De lichte laag klopt wel (40.000 × €100–300 = €4–12 mln). Het totaal is daarmee **€8–24 mln**, niet €16–42 mln — de oorspronkelijke uitkomst was ongeveer een factor 1,8 te hoog. Daarnaast is de post intern inconsistent: het rapport telt in dezelfde alinea 2.500–4.000 (NL) + 1.500–2.500 (BE) = 4.000–6.500 planners, maar rekent vervolgens met 8.000 zware seats. Met de eigen planneraantallen zakt de zware laag naar €2–10 mln en het totaal naar €6–22 mln.
Onderbouwing: eigen herberekening van de in §2.2 vermelde getallen; geen externe bron nodig.

**9.7 — "Softwaremarkt Benelux ≈ €30–50 mln/jaar" → GECORRIGEERD naar €15–40 mln, expliciet onzeker.**
Herrekende top-down met 9.4 en 9.5: €227,4 mrd ≈ $246 mrd bij EUR/USD 1,08; gedeeld door ~$10,4 biljoen geeft **2,3%** Benelux-aandeel (het rapport hanteerde 1,3–1,5%). Toegepast op $1,5–2 mrd: **$35–47 mln ≈ €32–43 mln**. De twee fouten hieven elkaar dus grotendeels op — de oorspronkelijke uitkomst was toevallig ongeveer goed, maar de gepresenteerde redenering was het niet. Bottom-up komt echter uit op €6–24 mln (9.6). Twee methoden die met een factor 2–5 uiteenlopen rechtvaardigen geen band van €30–50 mln; de conclusie is verbreed naar **€15–40 mln** en als onzeker gemarkeerd. Ook de afgeleide "€80–120 mln planning-economie inclusief diensten" is niet onderbouwd (geen omzetcijfers van Primaned, Aram of Threon gecontroleerd) en is vervangen door een expliciete factor-2–3-vuistregel.
Bronnen: zie 9.4, 9.5; eigen herberekening.

**9.8 — Primavera P6 "±$3.500 perpetual + ±22% onderhoud/jaar" → ONZEKER; de geciteerde bron is weerlegd.**
De enige bron die het rapport voor dit bedrag noemt, prmyazilim.com, is opgehaald en gecontroleerd: het is een Turkstalige Oracle-Primavera-partner (PRM Yazılım Danışmanlık, Ataşehir/Istanbul) die **uitsluitend trainingen, consultancy en support aanbiedt en nergens een prijs, bedrag of valuta vermeldt**. De bronvermelding steunt de claim dus niet. Oracle's eigen Primavera P6-pagina bevat eveneens **geen enkele prijs** en stuurt naar Primavera Cloud (abonnementsmodel); Oracle's publieke prijslijst-PDF's voor Construction & Engineering waren niet vindbaar (404). Onafhankelijke bevestiging was met het resterende toolbudget niet mogelijk (Capterra leverde een verkeerde productpagina). Het bedrag is daarom niet als feit bruikbaar. Bijkomend risico: zelfs als $3.500 ooit klopte, is het een *perpetual* bedrag en dus niet vergelijkbaar met de p/gebruiker/maand-prijzen elders in het rapport.
Bronnen: https://www.prmyazilim.com · https://www.oracle.com/industries/construction-engineering/primavera-p6/

**9.9 — Asta Powerproject "€1.500–2.500 perpetual of ±€60–100 p/m" → ONZEKER.**
Eleco's productpagina noemt geen prijs en verwijst naar een externe webshop; die webshop (shop.eleco.com) gaf HTTP 429 en kon niet worden gecontroleerd. De schatting blijft dus onbevestigd. Merk op dat het rapport hier twee onvergelijkbare modellen naast elkaar zet (perpetual vs. per maand) zonder de omrekening te tonen.
Bron: https://eleco.com/products/asta-powerproject/

**9.10 — KYP Project "vanaf ca. €3 per dag per project" → WEERLEGD.**
Het rapport citeert hiervoor het PlanningPME-artikel "Top 10 planningssoftware voor de bouw in Nederland 2026". Dat artikel is opgehaald en gecontroleerd: het behandelt PlanningPME, Exact Online Bouw, Asta Powerproject, Microsoft Project, Primavera P6, 4PS Construct, Syntess Atrium, AFAS, Procore en Bluebeam. **De tekenreeks "KYP" komt er niet in voor en er staat nergens een bedrag in euro's in.** De bron kan de claim dus onmogelijk staven. KYP's eigen site publiceert geen tarieven (alleen een gratis account: "Maak snel een account aan. Kost niks!"); de pagina's /nl/prijzen en /nl/tarieven bestaan niet (404). De prijsclaim is verwijderd uit §1, §3.3 en §6. Let ook op: PlanningPME is zelf een concurrerende leverancier, wat het sowieso een ongeschikte bron voor marktrangordes maakt.
Bronnen: https://www.planningpme.nl/top-10-planningssoftware-voor-de-bouw-in-nederland-2026/ · https://kyp.now/nl/

**9.11 — "Populairste planningstool in NL-woningbouw / meest gebruikte bij NL-aannemers" → ONZEKER.**
De bron (edcontrols.nl) zegt inderdaad dat KYP Project de populairste planningstool is ("Populaire tools zijn: 1. KYP Project 2. Autodesk Build 3. Relatics"), maar bevat **geen percentages, geen enquête, geen steekproefomvang en geen methodologie** — het is redactionele content van Ed Controls, zelf een bouwsoftwareleverancier. Een geordend lijstje in een leveranciersblog is geen bewijs van marktleiderschap. De formulering in §3.3 is afgezwakt. Ter contrast: het onafhankelijker ogende PlanningPME-overzicht (9.10) noemt KYP helemaal niet — twee "top-lijstjes" die elkaar tegenspreken zijn samen geen bewijs.
Bron: https://edcontrols.nl/nieuws-inzichten/welke-bouwsoftware-gebruiken-nederlandse-aannemers-het-meest

**9.12 — Microsoft-prijzen €8,70 / €26 → BEVESTIGD, met naamscorrectie.**
Microsoft NL toont **Planner Abonnement 1: €8,70 per gebruiker/maand** en **Planner en Project Abonnement 3: €26,00 per gebruiker/maand**, beide met jaarabonnement dat jaarlijks automatisch verlengt, **prijzen exclusief btw**. Basis en eenheid kloppen dus exact. Twee kanttekeningen: (a) de producten heten sinds de Planner-hernoeming niet meer "Project Plan 1/3" — het rapport gebruikte verouderde namen; (b) **Plan 5 staat niet op deze pagina** en ook niet op de NL-vergelijkingspagina voor Microsoft 365 Business; de geschatte "±€52" kon niet worden geverifieerd en is ingetrokken.
Bronnen: https://www.microsoft.com/nl-nl/microsoft-365/planner/microsoft-planner-plans-and-pricing · https://www.microsoft.com/nl-nl/microsoft-365/business/compare-all-microsoft-365-business-products

**9.13 — Smartsheet "Pro ±$12, Business ±$24 p/g/m (jaarlijks)" → GECORRIGEERD.**
De prijstabel toont per plan twee tarieven naast elkaar (maandfacturatie / jaarfacturatie). De $12 en $24 uit het rapport zijn de **maandfacturatietarieven**; bij jaarfacturatie liggen ze lager, op ca. **$9 (Pro)** en **$19 (Business)** per member per maand. Het label "(jaarlijks)" in het rapport was dus onjuist — precies de per-maand-vs-per-jaar-verwisseling waar dit soort vergelijkingen op stukloopt. Aanvullend ontbraken de gebruikersgrenzen: Pro is beperkt tot 1–10 members en alleen beschikbaar voor nieuwe klanten; Business vereist minimaal 3 members. *Betrouwbaarheid: middel* — de pagina rendert de valutawissel onbetrouwbaar bij ophalen (opeenvolgende fetches gaven "$129" en "$2419", wat consistent is met samengeplakte "$12"+"$9" en "$24"+"$19"). De richting van de correctie staat vast, de exacte jaarbedragen zijn indicatief.
Bron: https://www.smartsheet.com/pricing

**9.14 — nPlan × BAM → DEELS BEVESTIGD, DEELS ONZEKER.**
Bevestigd, letterlijk op nplan.io: **"Trained on a dataset of 750,000 historical schedules representing over $2Tn of construction spend"**. Ook bevestigd: BAM is klant — de site voert een testimonial van **David Bunn, Portfolio Director bij BAM**. Níet bevestigd: de specifieke claims "launch partner van nPlan Portfolio", de datering "juli 2023" en "uitrol over een portfolio van 50 projecten". BAM's eigen persberichtenoverzicht bevat geen enkel bericht over nPlan of AI-planningsanalyse. Deze drie details zijn als onzeker gemarkeerd; de kern (BAM gebruikt nPlan) staat.
Bronnen: https://www.nplan.io/ · https://www.bam.com/en/press/press-releases

**9.15 — BIM-adoptie "~10% → ~53% van projecten" (USP) → ONZEKER.**
usp-mc.nl gaf bij herhaalde pogingen HTTP 503 (drie verschillende paden). De claim kon dus niet worden gecontroleerd. Los daarvan is hij als geformuleerd niet toetsbaar: er staan geen jaartallen bij het begin- en eindpunt, geen landenselectie en geen steekproefomvang, en het is onduidelijk of "53%" slaat op architecten of op projecten (het rapport schrijft "onder architecten … van projecten", wat twee verschillende noemers door elkaar haalt). Niet gebruiken zonder primaire bron.
Bron (onbereikbaar): https://www.usp-mc.nl/en/european-architectural-barometer/

**9.16 — "P6 is de facto vereist / contractueel verwacht bij grote publieke infra" → BEVESTIGD ALS HEDGE.**
Dit is de bewering waar dit soort rapporten normaal ontsporen ("P6 is verplicht bij overheidswerk"). Het rapport doet dat **niet**: §5.2 stelt expliciet dat een gepubliceerde XER-verplichting niet kon worden aangetoond en markeert het als praktijknorm. Die terughoudendheid is correct en is in deze ronde niet weerlegd: er is geen aanbestedingsdocument, vraagspecificatie of contractvoorwaarde van Rijkswaterstaat, ProRail of Infrabel gevonden die P6 of XER voorschrijft. De onderbouwing die het rapport wél geeft — het bestaan van Oracle-partner Primaned — is *indirecte* evidentie over het aanbod, niet over contracteisen, en bewijst de stelling niet. Ik heb de waarschuwing aangescherpt in plaats van de claim te laten verzachten. *Let op: "niet weerlegd" is hier niet hetzelfde als "bevestigd" — de onderliggende praktijknorm blijft ongetoetst.*

**9.17 — Asta Powerproject ">100.000 professionals wereldwijd" → BEVESTIGD.**
Letterlijk op de leverancierspagina: **"Asta Powerproject supports more than 100,000 professionals worldwide in delivering successful projects"**. Het is een zelfrapportage van de leverancier zonder onafhankelijke telling, maar het rapport presenteert het ook als zodanig. Terecht is ook de eigen waarschuwing in §2.3 dat de rondzingende "~90% van Nederlandse bouwbedrijven" een verbastering is van een Britse claim — die staat inderdaad **niet** op de productpagina en moet niet als Benelux-cijfer worden gebruikt.
Bron: https://eleco.com/products/asta-powerproject/

**9.18 — Monday.com $9 / $12 / $19 → BEVESTIGD, met ontbrekende voorwaarde.**
Work Management: Basic $9, Standard $12, Pro $19 per seat per maand bij jaarfacturatie (maandfacturatie ligt ~18% hoger). Ontbrak in het rapport: **minimaal 10 seats** voor deze plannen, waardoor de feitelijke instapkosten ±$90–190 per maand zijn. Toegevoegd.
Bron: https://monday.com/pricing

**9.19 — OpenProject €5,95–€15,95 + BIM-add-on €1 → BEVESTIGD, met ontbrekende voorwaarde.**
Basic €5,95, Professional €10,95, Premium €15,95 per gebruiker per maand; BIM-add-on €1,00 per gebruiker (IFC-viewer, BCF-beheer). Ontbrak: **minimumafname van 25 gebruikers (Basic/Professional) en 100 gebruikers (Premium)**, gebruikers in stappen van 5, named users; maandfacturatie alleen voor Basic-cloud. Toegevoegd.
Bron: https://www.openproject.org/pricing/

**9.20 — LetsBuild/Aproplan: prijs op offerte, jaarlijkse facturatie → BEVESTIGD.**
Aproplan publiceert geen tarieven: *"De prijs van het abonnement hangt af van het aantal gebruikers, projecten en modules"*, met *"Onze standaard abonnementsperiode is 12 maanden"*. Aanvullend gevonden: uitgenodigde onderaannemers/gastgebruikers zijn gratis en er is een verplichte betaalde onboarding — beide relevant voor TCO-vergelijking en niet in het rapport genoemd.
Bron: https://www.aproplan.com/nl/prijzen

**9.21 — Vertuoza "BE (Wallonië)", prijzen niet publiek → BEVESTIGD resp. GENUANCEERD.**
Prijzen inderdaad niet publiek (alleen demo-CTA) — bevestigd. De typering "Wallonië" is echter te eng: de Nederlandstalige site vermeldt als vestigingsadres **Aartselaar (provincie Antwerpen)** en geeft als werkgebied **België, Frankrijk, Zwitserland, Luxemburg en Nederland**. De oorsprong is Waals, maar "snelgroeiend bij Waalse/Vlaamse kmo's" onderschat het bereik; ook de gepresenteerde troef "Franstalige support — zeldzaam" is minder onderscheidend dan gesuggereerd nu het bedrijf ook NL-talig opereert. Genuanceerd in §3.3.
Bron: https://www.vertuoza.com/nl-nl

**9.22 — Wereldmarkt bouw-schedulingsoftware "$1,5–2 mrd" → ONZEKER.**
De vijf rapporten in de tabel van §2.1 spreken elkaar tegen met een factor 3 op dezelfde basisjaren ($1,31 mrd vs. $4,07 mrd voor 2024) en zijn commerciële syndicated-rapporten zonder publieke methodologie; geen ervan is bij de uitgever geverifieerd (het rapport zegt zelf "via zoekaggregatie"). De afgeleide "consensus" van $1,5–2 mrd is in feite een keuze uit een spreiding, geen consensus. Omdat dit cijfer de hele top-downberekening in §2.2 draagt, is er een expliciete waarschuwing toegevoegd: de onzekerheid op de Benelux-uitkomst is minstens zo groot als de spreiding in deze tabel, dus ±100%.
Onderbouwing: interne inconsistentie van de tabel in §2.1; geen externe bron beschikbaar binnen het toolbudget.

### Wat níet is gecontroleerd

Voor de volledigheid, zodat deze sectie niet als bredere goedkeuring wordt gelezen — de volgende beweringen zijn **ongetoetst** gebleven: alle gebruikersaantallen in §2.3 (P6-seats, MS Project installed base, KYP "duizenden"); alle kwalitatieve marktposities en de rangorde in §3.1; TILOS- en Synchro-prijzen; alle claims over ERP-pakketten (4PS, Metacom, Syntess); Asana- en Wrike-prijzen; de digiGO/digiMonitor-verwijzing; en de uitspraken over opleidingscultuur, contractvormen (UAV-GC/BVP/SCB) en kanaalstructuur in §5. Alle conclusies in §7 steunen op de hierboven gecorrigeerde cijfers en moeten met de nieuwe bandbreedtes opnieuw worden gewogen.
