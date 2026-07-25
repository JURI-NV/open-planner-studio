# Marktonderzoek: projectplanning-/schedulingsoftware in Brazilië

*Onderzoeksdatum: juli 2026. Regio: Latijns-Amerika. Alle bedragen zoals gepubliceerd door de bron; BRL-bedragen zijn lokale lijstprijzen (koers ±R$ 5,5/USD medio 2026).*

---

## 1. Samenvatting

Brazilië is de grootste bouwmarkt van Zuid-Amerika (**ruim 3,0 miljoen** formele bouwvakkers — 3,075 mln in september 2025, hoogste stand sinds 2014; bouw-PIB groeide in 2025 met 0,5% na **+4,4%** in 2024 — bron: [CBIC](https://cbic.org.br/construcao-civil-cresce-pelo-segundo-ano-consecutivo-mas-juros-altos-limitam-potencial-de-expansao/), [CBIC: constructie passeert 3 mln formele werknemers](https://cbic.org.br/construcao-supera-3-milhoes-de-trabalhadores-formais/)). *(Gecorrigeerd: de eerder genoemde +4,1% was CBIC's **prognose** voor 2024, niet de gerealiseerde uitkomst; het werkgelegenheidscijfer van 2,9 mln was te laag.)* De planningsmarkt kent een duidelijke drieledige structuur:

1. **MS Project + Excel domineren de brede bouw.** MS Project is de facto de standaardtool voor "planejamento de obras" bij aannemers en ingenieursbureaus; er bestaat een enorme cursus- en consultancy-industrie omheen ([Papo Obra](https://www.papoobra.com.br/2026/05/controle-de-obras-com-ms-project.html), [Udemy](https://www.udemy.com/course/ms-project-para-estudantes-de-engenharia-civil/)). Tegelijk werkt ~70% van de construtoras nog op het laagste niveau van digitale volwassenheid — in de praktijk Excel-planningen ([BIM Fórum Brasil via blog AltoQi/DCD](https://www.datacenterdynamics.com/br/not%C3%ADcias/pesquisa-cen%C3%A1rio-construtivo-brasileiro-2023-revela-que-%C3%A9-crescente-o-uso-de-bim/)).
2. **Oracle Primavera P6 is de standaard in zware infra, olie & gas en mijnbouw.** Petrobras, Vale, Concremat, Progen en de grote EPC-aannemers gebruiken P6; in vacatures voor "engenheiro de planejamento" in mijnbouw/infra is P6 een verplichte eis ([Vagas.com](https://www.vagas.com.br/vagas-de-planejamento), [ENGROW](https://engrow.com.br/construtibilidade-executiva-de-obras-com-primavera-p6-o-que-e-para-que-serve-e-como-aplicar/)). Verano Engenharia de Sistemas is de historische Oracle-Primavera-partner/distributeur ([Verano Global](https://veranoglobal.com/br/aplicacoes/oracle/oracle-primavera/)).
3. **Een sterk lokaal SaaS-ecosysteem groeit snel.** Sienge (Softplan) is het dominante bouw-ERP (Sienge claimt zelf **10.000+ klanten** in heel Brazilië; 77–80 van de 100 grootste bouwers gebruiken minstens één Sienge-oplossing — [Sienge-homepage](https://sienge.com.br/) noemt 77, [Sienge/INTEC 2026](https://sienge.com.br/blog/100-maiores-construtoras-do-brasil/) noemt 80). Prevision (onderdeel Sienge-ecosysteem) is dé lokale planningsspecialist (650+ construtoras, 7.500+ geplande projecten — [Sienge](https://sienge.com.br/prevision-obras/)), naast Agilean (lean/Line-of-Balance) en orçamento-tools met planningsmodules (90 Compor, Volare, OrçaFascio, Sisplo).

De markt is uitgesproken prijsgevoelig: er is een levendige grijze markt in "levenslange" P6-licenties voor R$ 890 (~USD 160!) ([Volt Softwares](https://voltsoftwares.com/produto/primavera-p6-professional/)), gratis tools (ProjectLibre, GanttProject) worden actief aanbevolen in de civiele-ingenieursgemeenschap ([E-Civil](https://www.ecivilnet.com/softwares/gantt_project.htm)), en Microsoft-resellers stunten met maandlicenties. De taal is een echte barrière én kans: vrijwel de hele opleidings- en verkoopketen draait in het Portugees.

**Kans voor een nieuwkomer:** het gat tussen "Excel/MS Project" en "duur P6" is groot, de overheid verplicht sinds 2024 BIM (incl. 4D-planning) bij federale werken, en lokale spelers winnen juist door Portugese taal, WhatsApp-integratie en lage instapprijzen.

---

## 2. Marktomvang

| Indicator | Waarde | Jaar | Bron |
|---|---|---|---|
| PM-software Brazilië | **USD 153,04 mln**, CAGR 16,0% (2024–2031) | 2024 | [Cognitive Market Research](https://www.cognitivemarketresearch.com/regional-analysis/south-america-project-management-software-market-report) |
| PM-software Zuid-Amerika | USD 357,56 mln, CAGR 15,4% (2024–2031) — Brazilië ≈ 42,8% daarvan | 2024 | [Cognitive Market Research](https://www.cognitivemarketresearch.com/regional-analysis/south-america-project-management-software-market-report) |
| PM-software wereldwijd (andere vendor, ter kalibratie) | USD 7.532,90 mln, CAGR 13,3% (2024–2032); Latijns-Amerika ~7% van het wereldtotaal ≈ USD 527 mln | 2024 | [Credence Research](https://www.credenceresearch.com/report/project-management-software-market) |
| Construction-management-software Brazilië (groei) | +6,8%/jr (gedreven door infra-documentatie-eisen) | 2025 | [Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/construction-management-software-market) |
| Construction-management-software wereldwijd | USD 10,8 mrd (2025) → USD 22,7 mrd (2034), CAGR 8,7% | 2025 | [Polaris](https://www.polarismarketresearch.com/industry-analysis/construction-management-software-market) |
| Formele werknemers bouw | **3,075 mln** (drempel van 3 mln gepasseerd in mei 2025) | sep 2025 | [CBIC](https://cbic.org.br/construcao-supera-3-milhoes-de-trabalhadores-formais/) |
| Actieve bouwbedrijven (brede sector F) | ~1,97 mln CNPJ's; ~17.700 middelgrote/grote "construção civil"-bedrijven | 2026 | [Econodata](https://www.econodata.com.br/empresas/todo-brasil/construcao-f) |

> **Bronwaarschuwing (toegevoegd bij verificatie):** de eerste twee tabelregels komen allebei uit *dezelfde* vendor (Cognitive Market Research) en zijn dus geen onderlinge bevestiging. De derde regel laat zien hoe ver vendors uiteenlopen: Credence komt uit op ~USD 527 mln voor héél Latijns-Amerika, waar Cognitive alleen Zuid-Amerika al op USD 357,56 mln zet met Brazilië op USD 153,04 mln. Behandel de absolute niveaus als orde-van-grootte, niet als meetwaarden.

**Schatting deelmarkt bouw-scheduling (expliciet gemarkeerd als schatting):** neem de USD 153,04 mln Braziliaanse PM-softwaremarkt (2024); bouw/infra/energie is in Brazilië een bovengemiddeld deel van de projecteconomie. Bij een aandeel van 20–30% komt de *scheduling/planning*-softwaremarkt voor de bouwsector uit op **USD 31–46 mln per jaar** (20% × 153,04 = 30,6; 30% × 153,04 = 45,9), exclusief het veel grotere bouw-ERP-segment (Sienge alleen al claimt 10.000+ klanten). *(Gecorrigeerd: de eerder vermelde bandbreedte "USD 30–50 mln" volgde niet uit de eigen 20–30%-aanname — de bovengrens was ~9% te hoog doorgerekend.)* Aantal professionele planners: de beroepsgroep "engenheiro de planejamento" plus "analista de planejamento de obras" telt naar schatting **enkele tienduizenden actieve professionals** (honderden openstaande vacatures tegelijk op Vagas.com/Glassdoor; 188 vacatures alleen al voor "analista de planejamento e orçamento de obras" — [Glassdoor](https://www.glassdoor.com.br/Vaga/analista-de-planejamento-e-orcamento-de-obras-vagas-SRCH_KO0,45.htm)). — *schatting op basis van bovengenoemde bronnen.*

---

## 3. Gebruikte software: marktpositie en prijzen

### Tier 1 — dominante gereedschappen

**Microsoft Project** — *marktleider brede bouw*
- Gebruikers: aannemers, ingenieursbureaus, incorporadoras, publieke opdrachtgevers; de standaard-onderwijstool in civiele techniek ([UFPE-scriptie](https://repositorio.ufpe.br/bitstream/123456789/45534/1/RAPHAEL%20PONTES%20CLAUS%20-%20GERENCIAMENTO%20DE%20OBRAS%20UTILIZANDO%20O%20MS-PROJECT.pdf), [Papo Obra](https://www.papoobra.com.br/2026/05/controle-de-obras-com-ms-project.html)).
- Prijs (Brazilië, **officiële lijstprijs Microsoft Brasil, juli 2026**): *Planner e Project Plano 3* = **R$ 171,80 per gebruiker per maand, jaarlijks betaald**; *Planner Plano 1* = R$ 57,30 p/g/mnd, jaarlijks betaald ([Microsoft Brasil](https://www.microsoft.com/pt-br/microsoft-365/project/microsoft-project-licensing)). Eeuwigdurend (eenmalig): Project Professional 2024 **R$ 8.759,00**, Project Standard 2024 **R$ 4.449,00** ([Microsoft Brasil](https://www.microsoft.com/pt-br/microsoft-365/project/compare-microsoft-project-management-software)).
- Resellers rekenen een opslag voor maandelijkse opzegbaarheid: MicroSafe vraagt nu **R$ 222,00/mnd** voor de NCE-maandlicentie van Plan 3 ([MicroSafe](https://www.microsafe.com.br/cfq7ttc0hdb00002p1mm_licenca-mensal-cloud-nce-microsoft-project-plan-3.npn.html)). *(Gecorrigeerd: de eerder genoemde "R$ 184/gebruiker/maand" is achterhaald én werd ten onrechte als lijstprijs gepresenteerd — het was een reseller-maandtarief.)* De bundel- en academische tarieven (Vivo R$ 321,60/mnd; academisch R$ 35/mnd) waren bij herverificatie niet te bevestigen — **behandel als indicatief, niet als lijstprijs**.
- Kritiek in de markt: te generiek voor de bouwroutine; lokale SaaS-spelers positioneren zich expliciet tegen MS Project ([Sienge-blog](https://sienge.com.br/blog/ms-project-ou-software-de-planejamento-de-obras/)).

**Oracle Primavera P6 (PPM/EPPM, plus Primavera Cloud)** — *standaard zware infra/energie/mijnbouw*
- Gebruikers: Petrobras (o.a. onderhoudsplanning en S-curves), Vale, Concremat, Progen, grote EPC's/montagebedrijven in mijnbouw ([Saletto-case](https://www.saletto.com.br/case-governanca-de-planejamento-e-integracao-com-oracle-primavera-p6-em-empresa-de-montagem-e-manutencao-para-mineracao/), [ENGROW](https://engrow.com.br/construtibilidade-executiva-de-obras-com-primavera-p6-o-que-e-para-que-serve-e-como-aplicar/)).
- Prijs (**Oracle's eigen prijslijsten**, niet secundaire blogs): *P6 Professional Project Management* = **USD 2.500 eeuwigdurend per Application User + USD 550/jr Software Update License & Support** (22%). De veelgeciteerde **USD 2.750 + USD 605 hoort bij P6 EPPM**, niet bij P6 Professional ([Oracle Construction & Engineering Global Price List](https://www.oracle.com/us/corporate/pricing/primavera-pricelist-tx-3673322.pdf)). Die lijst is gedateerd; recente derde-partijopgaven leggen P6 Professional eeuwigdurend rond **USD 3.500–3.900** per named user, support ~22%.
- Abonnement/cloud prijst Oracle **per gebruiker per maand met een minimum van 25 gebruikers**, niet per jaar per seat: *P6 EPPM Cloud Service* **£220 per hosted named user/maand** (≈ £2.640 p/g/jr; volumekorting 10–25% vanaf 101 gebruikers) in Oracle's eigen G-Cloud 14-prijsdocument van mei 2024; de 2016-wereldprijslijst noemt USD 125 per hosted named user/maand bij minimaal 25 gebruikers. *(Gecorrigeerd: een Oracle-lijstprijs van "USD 2.570/jaar" voor P6 Professional bestaat niet als zodanig; het cijfer kwam uit een secundaire blogpost.)*
- Lokale kanalen: officiële partner Verano; grijze markt verkoopt "licença vitalícia" voor **R$ 890,90** (afgeprijsd van R$ 1.748,90) ([Volt Softwares](https://voltsoftwares.com/produto/primavera-p6-professional/) — legitimiteit twijfelachtig, maar tekenend voor prijsgevoeligheid).
- Ecosysteem: eigen trainingsmarkt (R$ 990–2.500 per cursus, zie §4), gespecialiseerde consultancies (Verano, Saletto, Terranova).

**Excel (planilhas)** — *geen product, wel de grootste "concurrent"*
- ~70% van de construtoras zit op basaal digitaal niveau; gratis planning-templates zijn een eigen mini-industrie ([Planilhas de Obra](https://www.planilhasdeobra.com/), [Kartado](https://kartado.com.br/planilha-gestao-controle-obras/)). Elke commerciële tool in Brazilië verkoopt primair "weg van Excel".

### Tier 2 — lokale spelers (bouwspecifiek)

**Sienge Plataforma (Softplan)** — *dominant bouw-ERP met planningsfunctie*
- Sienge claimt **10.000+ klanten** in heel Brazilië en **77** van de 100 grootste construtoras op zijn homepage ([Sienge](https://sienge.com.br/)); het INTEC-2026-blogartikel noemt **80** van de 100 ([Sienge/INTEC](https://sienge.com.br/blog/100-maiores-construtoras-do-brasil/)) — beide zijn zelfrapportage en spreken elkaar licht tegen. Prijs: op offerte, modulair ([prijspagina](https://sienge.com.br/precos-do-sienge-plataforma-sob-medida-para-sua-construtora/)). *(Gecorrigeerd: eerder stond hier "5.000–6.000+ klanten".)*
- Positie: het gravitatiecentrum van de Braziliaanse bouwsoftware; planning zelf loopt via partnerproduct Prevision.

**Prevision** — *lokale planningsspecialist (Gantt + Line of Balance)*
- 650+ construtoras, 7.500+ geplande obras; native Sienge-integratie; AI-assistent via WhatsApp (voortgang, restricties, metingen in PDF/Excel) ([Sienge/Prevision](https://sienge.com.br/prevision-obras/), [blog](https://sienge.com.br/blog/software-para-cronograma-de-obras-prevision/)). Prijs: offerte, afhankelijk van type/aantal obras ([Sienge Store](https://store.sienge.com.br/products/prevision-planejamento-de-obra)).
- **Voordelen** (uit productdocs/klantcases): LOB ("linha de balanço") naast Gantt — sluit aan op Braziliaanse hoogbouwpraktijk (repetitieve verdiepingen); fysiek-financiële integratie met orçamento; app voor voortgangsregistratie op de bouwplaats; WhatsApp/AI-rapportage verlaagt adoptiedrempel bij uitvoerders. **Nadelen:** geen volwaardige CPM-diepgang à la P6 (geen multi-project resource leveling op EPC-niveau); niet-transparante offerteprijzen; alleen Portugees; ongeschikt voor olie & gas/zware infra waar opdrachtgevers P6-formaten eisen.

**Agilean** — *lean-planning (Last Planner/takt/LOB) uit Brazilië*
- Planning + productiesturing op lean-principes; werkorders en "pulled production" tot op ploegniveau; Sienge-integratie; Starter-instapproduct met gratis proef ([Agilean](https://www.agilean.com.br/planejamento-e-controle), [Starter](https://starter.agilean.com.br/)).
- **Voordelen:** sterk in kortcyclische sturing op de bouwplaats (weekplanning, restricties), real-time indicatoren, mobiel. **Nadelen:** geen klassieke CPM-scheduler — vult MS Project/P6 aan in plaats van ze te vervangen; nichemethodiek (lean) vergt cultuurverandering; kleinere organisatie, beperkte internationale aanwezigheid.

**Orçamento-suites met planningsmodule** — verbinden begroting (SINAPI/TCPO-databases) met cronograma físico-financeiro:
- **90 Compor (Noventa)**: orçamento + planejamento + fysiek-financiële controle; 15 dagen gratis proef ([Noventa](https://www.noventa.com.br/90compor)). *Voordeel:* één keten van begroting → planning → meting, geliefd bij publiekewerken-aannemers; *nadeel:* Gantt-functionaliteit is basaal, geen resource-CPM.
- **Volare (Expert System / ex-PINI)**: enige tool op de TCPO-database; planningsmodule met fysieke/financiële cronogramas en **MS Project-import/-export** ([Expert System](https://expertsystem.com.br/volare/), [MS1](https://www.ms1engenharia.com.br/orcamento-volare)). *Voordeel:* TCPO-normen; *nadeel:* verouderende desktoptechnologie, planning secundair aan orçamento.
- **OrçaFascio**: online, 17 kostendatabases, module planejamento + medição; sterk groeiend bij kleine bureaus ([OrçaFascio](https://www.orcafascio.com/)). *Voordeel:* goedkoop en eenvoudig; *nadeel:* planning is bijproduct van begroting.
- **Sisplo**: orçamento/planejamento met BIM-koppeling en SINAPI ([overzicht Gerência de Obras](https://gerenciadeobras.com.br/20-softwares-para-orcamento-de-obras/)). Zelfde profiel.
- Veld-/kwaliteitstools **Mobuss Construção**, **Stant**, **Construct App** raken planning (voortgang/medição) maar zijn geen schedulers ([Mobuss](https://www.mobussconstrucao.com.br/), [UFU-analyse](https://repositorio.ufu.br/bitstream/123456789/33617/3/An%C3%A1liseInforma%C3%A7%C3%B5esRecursos.pdf)).

### Tier 3 — internationale niche & generieke tools

- **Spider Project** — opvallend sterke niche in Brazilië: partnerschappen met INBEC (postgraduaat), UNIFOR, CREA-RJ; cursussen "Planejamento de Obras do Zero com Spider Project" ([INBEC](https://inbec.com.br/cursos/curso-planejamento-obras-zero-com-ferramenta-spider-project-online), [UNIFOR](https://unifor.br/web/educacao-continuada/planejamento-e-controle-de-obras-com-spider-project), [CREA-RJ](https://www.crea-rj.org.br/abertas-as-inscricoes-para-o-spider-project-gestao-de-projetos-e-obras-na-pratica/)). Wordt gepositioneerd als goedkoper/krachtiger alternatief voor P6 (resource-optimalisatie/RCP-methodiek). *Voordeel:* superieure resource-leveling, agressieve academische funnel; *nadeel:* Russische herkomst (governance-gevoelig), klein ecosysteem, weinig integraties.
- **Bentley Synchro (4D)** — groeiend door BIM-decreet; gebruikt in 4D-planning naast Navisworks; academische adoptie ([UFG-onderzoek](https://files.cercomp.ufg.br/weby/up/140/o/AGUARDAR_2019_1_-_APLICA%C3%87%C3%83O_DO_BIM_4D_PARA_A_OTIMIZA%C3%87%C3%83O_DO_CRONOGRAMA_F%C3%8DSICO_DE_UMA_OBRA.pdf)). Nog een kleine minderheid van bedrijven.
- **ALICE Technologies / nPlan** — vrijwel geen aantoonbare Braziliaanse aanwezigheid (geen lokale cases/resellers gevonden in pt-zoekopdrachten).
- **Asta Powerproject / TILOS / Safran / Deltek Open Plan / Sciforma / Phoenix / RIB Candy** — geen betekenisvolle voetafdruk gevonden in Portugeestalige bronnen; TILOS duikt sporadisch op bij lineaire infra maar zonder lokaal kanaal.
- **Generieke SaaS (Trello, Asana, Monday.com, ClickUp, Wrike, Jira, Smartsheet)** — breed gebruikt voor licht projectmanagement in Braziliaanse bedrijven ([Agroadvance-overzicht](https://agroadvance.com.br/blog-ferramentas-de-gestao-de-projetos/)). Lijstprijzen per gebruiker per maand (juli 2026, jaarlijks / maandelijks gefactureerd): **Trello** Standard USD 5 / 6, Premium USD 10 / 12,50, Enterprise USD 17,50 ([Trello](https://trello.com/pricing)); **Asana** Starter USD 10,99 / 13,49, Advanced USD 24,99 / 30,49 ([Asana](https://asana.com/pricing)). *(Gecorrigeerd: de eerdere formulering "Trello/Asana Premium ≈ USD 10,99, Business ≈ USD 24,99" plakte **Asana**-tarieven op **Trello**-tiernamen; Trello kent geen "Business"-tier en Trello Premium kost USD 10, niet 10,99. Beide bedragen gelden bovendien alleen bij jaarlijkse facturering.)* Voor serieuze bouwplanning (CPM/Gantt met kalenders) spelen ze nauwelijks een rol.
- **Gratis/open source: ProjectLibre, GanttProject, OpenProject** — actief aanbevolen in de civiele gemeenschap als gratis MS Project-vervanger ([E-Civil GanttProject](https://www.ecivilnet.com/softwares/gantt_project.htm), [E-Civil OpenProj](https://www.ecivilnet.com/softwares/openproj.htm)); ProjectLibre claimt **7,8 mln+ downloads in 193 landen** (~19.800 per week) ([SourceForge](https://sourceforge.net/projects/projectlibre/)). *(Gecorrigeerd: SourceForge publiceert géén landenuitsplitsing op die pagina — de toevoeging "met Brazilië als een van de grootste markten" is **niet onderbouwd** en is hier geschrapt; wel vermeldt de pagina Braziliaans-Portugees als ondersteunde taal.)* Belangrijk in onderwijs en bij micro-aannemers — bewijs dat een gratis/goedkope Gantt-CPM-tool in het Portugees vraag heeft.

### Indicatieve rangorde (bouwplanning, naar verspreiding)

1. Excel/planilhas (de feitelijke nummer 1)
2. Microsoft Project
3. Sienge-ecosysteem (ERP-planning + Prevision)
4. Oracle Primavera P6 (waarde-aandeel nr. 1 in infra/energie)
5. Orçamento-tools met planning (90 Compor, Volare, OrçaFascio, Sisplo)
6. Agilean en overige lokale SaaS
7. Gratis tools (ProjectLibre/GanttProject)
8. Spider Project, Synchro 4D
9. Generieke SaaS (voor planning marginaal)

---

## 4. Lokale bijzonderheden

- **Cronograma físico-financeiro is wettelijk verankerd.** Elke publieke aanbesteding (Lei 14.133/21; DNIT-modellen) eist een fysiek-financieel cronogram als bijlage; het format is doorgaans een tabel/Excel-model van de aanbesteder, **geen verplicht P6/XER- of MPP-formaat** bij reguliere overheidswerken ([DNIT-editais](http://www1.dnit.gov.br/anexo/Edital/Edital_edital0411_20-21_0.pdf), [eLicitação](https://elicitacao.com.br/2026/03/11/licitacoes-do-dnit/)). TCU kritiseert juist het ontbreken van gedetailleerde cronogramas en contractbeheer-tooling ([TCU](https://portal.tcu.gov.br/imprensa/noticias/tcu-faz-determinacoes-ao-dnit-quanto-a-licitacoes)) — ruimte voor betere tooling.
- **P6 als contracteis komt uit de private/semi-publieke hoek:** Petrobras, Vale en grote EPC's schrijven P6-governance (WBS-standaarden, S-curves, baselines) voor aan contractanten; P6-kennis is harde functie-eis in infra/mijnbouwvacatures ([Vagas.com](https://www.vagas.com.br/vagas-de-planejamento), [Saletto](https://www.saletto.com.br/case-governanca-de-planejamento-e-integracao-com-oracle-primavera-p6-em-empresa-de-montagem-e-manutencao-para-mineracao/)).
- **BIM-verplichting (Decreto 10.306/2020, Estratégia BIM BR):** sinds 1-1-2024 (fase 2) moet BIM bij federale werken ook voor **orçamentação, planning en uitvoeringscontrole (4D/5D)** worden ingezet ([ABDI](https://www.abdi.com.br/decreto-estabelece-utilizacao-do-bim-em-obras-publicas/), [Tecverde](https://www.tecverde.com.br/2023/09/14/decreto-no-10-306-e-a-obrigatoriedade-do-uso-do-bim-em-obras-publicas/)). BIM-gebruik bij construtoras zou zijn gestegen naar 64% (2023) ([Cenário Construtivo](https://www.datacenterdynamics.com/br/not%C3%ADcias/pesquisa-cen%C3%A1rio-construtivo-brasileiro-2023-revela-que-%C3%A9-crescente-o-uso-de-bim/)) — **onbevestigd:** die bron gaf bij herverificatie HTTP 403 en het cijfer was niet uit een tweede bron te reproduceren; hetzelfde geldt voor de "~70% op het laagste niveau van digitale volwassenheid" in §1. IFC-gebaseerde planning sluit hoe dan ook aan op de 4D/5D-eis van fase 2.
- **Kostendatabases als lock-in:** SINAPI (verplichte referentie bij federale budgetten) en TCPO/PINI zijn de ruggengraat van orçamento→planning-koppelingen; lokale tools winnen omdat ze deze databases native ondersteunen.
- **Sterke opleidingscultuur:** P6- en MS Project-cursussen via CREA's, universiteiten (UNIFOR, UNI7), INBEC en privéacademies; P6-cursussen kosten R$ 990–2.500 ([Academia do Planejamento](https://academiadoplanejamento.com.br/produtos/primavera-p6), [Verum](https://veruminstitute.com.br/curso-primavera-p6/)). Wie de opleidingsketen wint (gratis studentenlicenties!), wint de markt van morgen.
- **Kanalen:** software wordt via resellers/consultancies verkocht (Verano en Saletto voor Oracle; MicroSafe/Vivo voor Microsoft; Sienge Store voor het lokale ecosysteem). Directe online verkoop zonder lokaal kanaal is ongebruikelijk voor de enterprise-laag.
- **Prijsgevoeligheid is extreem:** grijze P6-licenties à R$ 890, gratis-plan-cultuur (Trello), piraterijtraditie bij desktopsoftware. Betaalbereidheid ligt bij R$ tientallen-tot-honderden per gebruiker/maand voor SaaS, niet bij USD-duizenden per seat — behalve waar de opdrachtgever (Petrobras/Vale) het afdwingt.
- **Taal:** Portugees is niet onderhandelbaar voor het mkb-segment (docs, support, cursussen, WhatsApp-support); Engels volstaat alleen in de EPC/olie & gas-top.

---

## 5. Bronnen (selectie)

- https://www.oracle.com/us/corporate/pricing/primavera-pricelist-tx-3673322.pdf (**Oracle's eigen** Construction & Engineering Global Price List: P6 Professional USD 2.500 + 550; P6 EPPM USD 2.750 + 605; P6 EPPM Cloud USD 125 p/g/mnd, min. 25)
- https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/717959/423103118187025-pricing-document-2024-05-03-0915.pdf (Oracle Primavera G-Cloud 14-prijzen, mei 2024: P6 EPPM Cloud £220 p/g/mnd, min. 25)
- ~~https://www.projectmanager.com/pt/o-que-e-o-primavera-p6~~ (secundaire blogbron voor P6-prijzen — **vervangen**, gaf USD 2.570/jr en verwarde P6 Professional met P6 EPPM)
- https://voltsoftwares.com/produto/primavera-p6-professional/ (grijze P6-licentie R$ 890,90)
- https://veranoglobal.com/br/aplicacoes/oracle/oracle-primavera/ (Verano, Oracle-partner)
- https://www.saletto.com.br/case-governanca-de-planejamento-e-integracao-com-oracle-primavera-p6-em-empresa-de-montagem-e-manutencao-para-mineracao/ (P6-governance mijnbouw)
- https://www.microsafe.com.br/cfq7ttc0hdb00002p1mm_licenca-mensal-cloud-nce-microsoft-project-plan-3.npn.html (MS Project Plan 3 R$ 184/mnd)
- https://sienge.com.br/blog/100-maiores-construtoras-do-brasil/ (Sienge: 80 van top-100)
- https://sienge.com.br/prevision-obras/ (Prevision: 650+ construtoras, 7.500+ obras)
- https://www.agilean.com.br/planejamento-e-controle (Agilean)
- https://www.noventa.com.br/90compor | https://expertsystem.com.br/volare/ | https://www.orcafascio.com/ (lokale orçamento+planning-tools)
- https://inbec.com.br/cursos/curso-planejamento-obras-zero-com-ferramenta-spider-project-online | https://www.crea-rj.org.br/abertas-as-inscricoes-para-o-spider-project-gestao-de-projetos-e-obras-na-pratica/ (Spider Project in Brazilië)
- https://www.cognitivemarketresearch.com/regional-analysis/south-america-project-management-software-market-report (**bron van zowel** Brazilië USD 153,04 mln 2024 / CAGR 16,0% **als** Zuid-Amerika USD 357,56 mln 2024 / CAGR 15,4%)
- https://www.credenceresearch.com/report/project-management-software-market (wereldwijd USD 7.532,90 mln 2024, CAGR 13,3%, Latijns-Amerika ~7% — **bevat géén Brazilië-cijfer**; het cijfer van USD 153 mln was hier ten onrechte aan toegeschreven)
- https://cbic.org.br/construcao-civil-cresce-pelo-segundo-ano-consecutivo-mas-juros-altos-limitam-potencial-de-expansao/ (bouw-PIB/werkgelegenheid)
- https://www.abdi.com.br/decreto-estabelece-utilizacao-do-bim-em-obras-publicas/ (Decreto 10.306 / BIM BR)
- https://www.datacenterdynamics.com/br/not%C3%ADcias/pesquisa-cen%C3%A1rio-construtivo-brasileiro-2023-revela-que-%C3%A9-crescente-o-uso-de-bim/ (BIM 64%, digitale volwassenheid)
- https://www1.dnit.gov.br/anexo/Edital/Edital_edital0411_20-21_0.pdf (DNIT cronograma físico-financeiro)
- https://academiadoplanejamento.com.br/produtos/primavera-p6 (cursusprijzen)
- https://www.ecivilnet.com/softwares/gantt_project.htm (gratis tools in de civiele gemeenschap)
- https://www.econodata.com.br/empresas/todo-brasil/construcao-f (aantal bouwbedrijven)
- https://www.glassdoor.com.br/Vaga/analista-de-planejamento-e-orcamento-de-obras-vagas-SRCH_KO0,45.htm (arbeidsmarkt planners)

---

## Verificatie

*Adversariële fact-check, uitgevoerd juli 2026. Methode: elke bewering is actief geprobeerd te weerleggen met bronnen **anders dan** die het rapport noemde — bij voorkeur de prijslijst/wettekst van de leverancier of wetgever zelf in plaats van secundaire blogs. Oordeel per bewering: bevestigd / gecorrigeerd / onzeker.*

### Marktomvang en de redenering erachter

**1. "PM-software Brazilië USD 153,0 mln, CAGR ~16% (2024)" — bron Credence Research → GECORRIGEERD (bronattributie)**
De *waarde* klopt, de *bron* niet. De publieke Credence-pagina bevat geen enkel Brazilië-cijfer: die geeft een wereldmarkt van USD 7.532,90 mln (2024), CAGR 13,3% (2024–2032), en noemt Brazilië alleen als voorbeeldland binnen Latijns-Amerika, dat ~7% van het wereldtotaal beslaat (≈ USD 527 mln). Het cijfer USD 153,04 mln met CAGR 16,0% staat wél letterlijk bij Cognitive Market Research. De attributie is gecorrigeerd en de Credence-cijfers zijn als aparte kalibratieregel toegevoegd.
Bron: https://www.credenceresearch.com/report/project-management-software-market en https://www.cognitivemarketresearch.com/regional-analysis/south-america-project-management-software-market-report

**2. "PM-software Zuid-Amerika USD 300,9 mln, CAGR 14,9% (2025)" → GECORRIGEERD**
De aangehaalde pagina zegt iets anders: "South America Project Management Software market size is USD 357.56 million in 2024 and will expand at a CAGR of 15.4% from 2024 to 2031." Zowel bedrag, groeivoet als jaartal waren fout. Bijkomend gevolg: Brazilië is 153,04 / 357,56 = **42,8%** van Zuid-Amerika, niet ~51% zoals uit de oude cijfers volgde.
Bron: https://www.cognitivemarketresearch.com/regional-analysis/south-america-project-management-software-market-report

**3. "20–30% aandeel ⇒ USD 30–50 mln bouw-schedulingmarkt" → GECORRIGEERD (rekenfout)**
Doorgerekend: 20% × 153,04 = 30,6 en 30% × 153,04 = 45,9. De gepubliceerde bovengrens van 50 volgt niet uit de eigen aanname en overschat met ~9%. Gecorrigeerd naar **USD 31–46 mln**, met de rekensom er expliciet bij. Extra caveat toegevoegd: de twee "onafhankelijke" tabelregels kwamen uit dezelfde vendor en bevestigen elkaar dus niet.

**4. "Construction-management-software wereldwijd USD 10,8 mrd, CAGR 8,7% (2025)" → BEVESTIGD**
Polaris bevestigt letterlijk USD 10,8 mrd in 2025, USD 22,7 mrd in 2034, CAGR 8,7%. Wel opgemerkt: Polaris hanteert forecastperiode 2026–2034 met USD 11,7 mrd als rekenbasis.
Bron: https://www.polarismarketresearch.com/industry-analysis/construction-management-software-market

### Prijzen en licentiemodellen

**5. "MS Project Plan 3 ≈ R$ 184/gebruiker/maand" → GECORRIGEERD (verouderd én verkeerd gelabeld)**
Twee fouten in één. (a) Het was geen lijstprijs maar een reseller-maandtarief; de officiële Microsoft-Brazilië-lijstprijs is **R$ 171,80 per gebruiker/maand bij jaarlijkse betaling** (Planner e Project Plano 3), met Planner Plano 1 op R$ 57,30. (b) Het resellertarief zelf is achterhaald: MicroSafe vraagt inmiddels **R$ 222,00/mnd** voor dezelfde NCE-maandlicentie. Aanvullend gevonden en toegevoegd: eeuwigdurende licenties Project Professional 2024 R$ 8.759,00 en Project Standard 2024 R$ 4.449,00.
Bronnen: https://www.microsoft.com/pt-br/microsoft-365/project/microsoft-project-licensing · https://www.microsoft.com/pt-br/microsoft-365/project/compare-microsoft-project-management-software · https://www.microsafe.com.br/cfq7ttc0hdb00002p1mm_licenca-mensal-cloud-nce-microsoft-project-plan-3.npn.html

**6. "P6 Professional ≈ USD 2.750 perpetual + USD 605/jr onderhoud" → GECORRIGEERD (verkeerd product)**
Oracle's eigen Construction & Engineering Global Price List zet die twee bedragen naast **Primavera P6 Enterprise Project Portfolio Management (EPPM)**, Application User. Voor **P6 Professional Project Management** staat er USD **2.500** + USD **550**/jr support. Het rapport plakte dus het EPPM-tarief op P6 Professional. De prijslijst is bovendien gedateerd (2016); onafhankelijke recente opgaven leggen P6 Professional eeuwigdurend rond USD 3.500–3.900 per named user — als bandbreedte toegevoegd, niet als harde lijstprijs.
Bron: https://www.oracle.com/us/corporate/pricing/primavera-pricelist-tx-3673322.pdf

**7. "P6 Professional ≈ USD 2.570/jaar (abonnement)" → GECORRIGEERD**
Oracle prijst Primavera-cloud niet per seat per jaar maar **per hosted named user per maand met een minimum van 25 gebruikers**. Oracle's eigen G-Cloud 14-prijsdocument (mei 2024) noemt P6 EPPM Cloud Service **£220 per hosted named user/maand** (≈ £2.640 p/g/jr, minimum 25 gebruikers, volumekorting 10–25% vanaf 101 gebruikers); de wereldprijslijst noemt USD 125 p/g/mnd bij hetzelfde minimum van 25. Een lijstprijs van USD 2.570/jaar is nergens terug te vinden en kwam uit een secundaire blogpost. Praktisch gevolg voor het rapport: de instapdrempel voor P6-cloud is niet één seat maar een **25-seat-minimum**, wat de kloof met lokale SaaS groter maakt dan het rapport suggereerde.
Bron: https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/717959/423103118187025-pricing-document-2024-05-03-0915.pdf

**8. "Trello/Asana Premium ≈ USD 10,99, Business ≈ USD 24,99 p/g/mnd" → GECORRIGEERD (producten verwisseld)**
USD 10,99 en USD 24,99 zijn **Asana** Starter en Advanced, beide *bij jaarlijkse facturering* (maandelijks: 13,49 en 30,49). Trello heeft heel andere tarieven en geen "Business"-tier: Standard USD 5/6, Premium USD 10/12,50, Enterprise USD 17,50. Het rapport combineerde Asana-bedragen met Trello-tiernamen en liet weg dat het jaarprijzen zijn.
Bronnen: https://asana.com/pricing · https://trello.com/pricing

**9. "Grijze markt: P6 'licença vitalícia' voor R$ 890,90" → BEVESTIGD**
Volt Softwares adverteert Primavera P6 Professional als "Licença Vitalícia" voor R$ 890,90, afgeprijsd van R$ 1.748,90. De kanttekening van het rapport over twijfelachtige legitimiteit blijft terecht — dit is geen geautoriseerd Oracle-kanaal.
Bron: https://voltsoftwares.com/tag/primavera-p6/

**10. "P6-cursussen kosten R$ 990–2.500" → BEVESTIGD**
Academia do Planejamento vraagt R$ 990,00 (of 12× R$ 82,50) voor de losse P6-training van 16 uur en R$ 2.500,00 (12× R$ 208,33) voor het Academia-pakket van 184 uur. De genoemde bandbreedte is exact juist.
Bron: https://academiadoplanejamento.com.br/produtos/primavera-p6

### Marktleiderschap en dominantie

**11. "Sienge: 5.000–6.000+ klanten; 80 van de 100 grootste construtoras" → GECORRIGEERD (onderschatting + interne tegenspraak)**
Sienge claimt op zijn eigen homepage "**+10 K clientes em todo o Brasil**" — ruim het dubbele van wat het rapport noemde, dat bovendien intern inconsistent was (§1 "5.000+", §2 "6.000+", §3 "5.000–6.000+"). De top-100-claim varieert tussen Sienge's eigen kanalen: de homepage zegt **77** van de 100 (Ranking INTEC), het blogartikel **80** van de 100 (INTEC 2026, over bouwvolume 2025). Beide zijn zelfrapportage zonder onafhankelijke audit; de spreiding is nu in de tekst zichtbaar gemaakt.
Bronnen: https://sienge.com.br/ · https://sienge.com.br/blog/100-maiores-construtoras-do-brasil/

**12. "Prevision: 650+ construtoras, 7.500+ geplande obras" → BEVESTIGD (met caveat)**
De cijfers staan letterlijk zo op de bron. Er bestaat echter geen onafhankelijke verificatie: het is vendor-marketing van een partij binnen het Sienge-ecosysteem, en de prijs blijft bewust op offerte ("O valor depende do tipo de obra, número de projetos e funcionalidades contratadas"). De conclusie "dé lokale planningsspecialist" rust dus volledig op zelfrapportage.
Bron: https://sienge.com.br/prevision-obras/

**13. "ProjectLibre: 7,8 mln downloads, met Brazilië als een van de grootste markten" → GEDEELTELIJK GECORRIGEERD**
Het downloadaantal klopt: SourceForge vermeldt "7.8M+ downloads in 193 countries" en ~19.762 downloads per week. De toevoeging over Brazilië is echter **niet onderbouwd** — die pagina publiceert geen landenuitsplitsing; ze noemt alleen Braziliaans-Portugees als ondersteunde taal. Geschrapt als bewering.
Bron: https://sourceforge.net/projects/projectlibre/

### Aanbestedings- en contracteisen

**14. "Cronograma físico-financeiro is verplicht bij publieke aanbesteding, maar er is géén verplicht P6/XER/MPP-formaat" → BEVESTIGD**
Dit is de belangrijkste claim om te toetsen, en het rapport heeft gelijk — inclusief de weerlegging van de veelgehoorde mythe dat "P6 verplicht is bij overheidswerk". Lei 14.133/2021 eist het cronograma físico-financeiro als onderdeel van het projeto básico/executivo en expliciet bij contratação integrada ("o conjunto de desenhos, especificações, memoriais e cronograma físico-financeiro deverá ser submetido"), maar schrijft **nergens een softwareproduct of bestandsformaat voor**. Geen enkele geraadpleegde bron vond een softwaremandaat. De P6-eis is dus contractueel/privaat (Petrobras, Vale, grote EPC's), niet wettelijk — precies zoals het rapport stelt.
Bronnen: https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm · https://www.conjur.com.br/2021-set-24/licitacoes-contratos-lei-141332021-licitacoes-regulacao-normas-tecnicas/

**15. "BIM verplicht sinds 1-1-2024 (fase 2, Decreto 10.306/2020), inclusief planning/4D-5D" → BEVESTIGD (kernclaim), datum en fasering kloppen**
De tweede fase gaat in op 1 januari 2024 en breidt de BIM-plicht uit van modellering naar de uitvoering en het beheer van werken ("o BIM deverá ser utilizado na execução direta ou indireta de projetos de arquitetura e engenharia e na gestão de obras"). Geen aanwijzing gevonden dat het decreet is ingetrokken, vervangen of dat de termijnen zijn uitgesteld. Kanttekening: de exacte woorden "orçamentação, planejamento e controle da execução" horen bij de *doelen* van BIM-inzet in het decreet; de precieze formulering van fase 2 kon niet verbatim uit planalto.gov.br worden bevestigd (de site gaf herhaald HTTP 503), dus die specifieke woordkeuze blijft licht onzeker terwijl de datum en strekking bevestigd zijn.
Bron: samenvattingen van planalto.gov.br en Câmara dos Deputados via zoekresultaten; primaire tekst https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2020/decreto/D10306.htm (tijdens verificatie onbereikbaar)

### Macrocijfers

**16. "Bouw-PIB +0,5% in 2025 na +4,1% in 2024" → GECORRIGEERD (prognose als uitkomst gepresenteerd)**
De +0,5% voor 2025 klopt. Maar de +4,1% voor 2024 kwam uit een CBIC-artikel met de titel "CBIC **projeta** crescimento de 4,1%" — een *vooruitzicht*, geen realisatie. Het CBIC-artikel dat het rapport zelf als hoofdbron gebruikt, zegt over hetzelfde jaar: "2024 registrou uma expansão de **4,4%** no PIB". Gecorrigeerd naar 4,4%.
Bron: https://cbic.org.br/construcao-civil-cresce-pelo-segundo-ano-consecutivo-mas-juros-altos-limitam-potencial-de-expansao/

**17. "Ca. 2,9 mln formele bouwvakkers eind 2025" → GECORRIGEERD (te laag)**
De Braziliaanse bouw passeerde al in **mei 2025** de grens van 3 miljoen formeel werkenden, en stond in **september 2025 op 3,075 mln** — het hoogste niveau sinds 2014, na 218.200 nieuwe formele banen in de eerste negen maanden van 2025. Het door het rapport gebruikte CBIC-artikel bevat overigens helemaal geen werkgelegenheidscijfer, dus de 2,9 mln was ook verkeerd toegeschreven.
Bronnen: https://cbic.org.br/construcao-supera-3-milhoes-de-trabalhadores-formais/ · https://cbic.org.br/wp-content/uploads/2025/11/final-informativo-economico-caged-setembro-2025.pdf

**18. "BIM-gebruik bij construtoras 64% (2023)" en "~70% op laagste niveau digitale volwassenheid" → ONZEKER**
Niet te verifiëren. De enige bron voor beide cijfers (DataCenterDynamics over de Cenário Construtivo-enquête) gaf HTTP 403 bij herverificatie, en geen tweede bron reproduceerde de cijfers. Beide zijn in de tekst als onbevestigd gemarkeerd in plaats van te blijven staan. Let op dat de twee cijfers elkaar bovendien lijken te bijten: 64% BIM-adoptie is moeilijk te rijmen met 70% op het *laagste* digitale volwassenheidsniveau — mogelijk gaat het om verschillende steekproeven (grote vs. alle construtoras).

**19. "~1,97 mln bouw-CNPJ's; ~17.700 middelgrote/grote construtoras" → ONZEKER**
De Econodata-bron gaf HTTP 403 bij herverificatie en is niet gecontroleerd. Het getal van 1,97 mln telt vrijwel zeker het brede CNAE-hoofdstuk F inclusief MEI's/eenmanszaken en is daarmee geen indicatie van het aantal potentiële klanten voor planningssoftware; de ~17.700 middelgrote/grote bedrijven is de relevantere noemer maar blijft onbevestigd.

### Wat níét weerlegd kon worden

De kwalitatieve kernstelling van het rapport houdt stand: MS Project + Excel domineren de brede bouw, P6 domineert zware infra/olie & gas als **contractuele** (niet wettelijke) eis, en er is een gat tussen beide waar een Portugeestalige, goedkope CPM-tool in past. De IFC-invalshoek wordt versterkt door de bevestigde BIM-fase-2-datum. Wel is de onderbouwing zwakker dan gepresenteerd: de marktomvang rust op één vendor, de belangrijkste dominantiecijfers (Sienge, Prevision) zijn zelfrapportage, en de negatieve claims over ALICE/nPlan/Asta/TILOS ("geen aantoonbare aanwezigheid") zijn principieel niet te falsifiëren met een zoekopdracht en moeten als "niet gevonden" worden gelezen, niet als "bestaat niet".
