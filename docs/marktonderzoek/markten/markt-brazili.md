# Marktonderzoek: projectplanning-/schedulingsoftware in Brazilië

*Onderzoeksdatum: juli 2026. Regio: Latijns-Amerika. Alle bedragen zoals gepubliceerd door de bron; BRL-bedragen zijn lokale lijstprijzen (koers ±R$ 5,5/USD medio 2026).*

---

## 1. Samenvatting

Brazilië is de grootste bouwmarkt van Zuid-Amerika (ca. 2,9 miljoen formele bouwvakkers eind 2025; bouw-PIB groeide in 2025 met 0,5% na +4,1% in 2024 — bron: [CBIC](https://cbic.org.br/construcao-civil-cresce-pelo-segundo-ano-consecutivo-mas-juros-altos-limitam-potencial-de-expansao/), [CBIC 2024](https://cbic.org.br/cbic-projeta-crescimento-de-41-para-a-construcao-civil-em-2024-mas-desafios-persistem-para-2025/)). De planningsmarkt kent een duidelijke drieledige structuur:

1. **MS Project + Excel domineren de brede bouw.** MS Project is de facto de standaardtool voor "planejamento de obras" bij aannemers en ingenieursbureaus; er bestaat een enorme cursus- en consultancy-industrie omheen ([Papo Obra](https://www.papoobra.com.br/2026/05/controle-de-obras-com-ms-project.html), [Udemy](https://www.udemy.com/course/ms-project-para-estudantes-de-engenharia-civil/)). Tegelijk werkt ~70% van de construtoras nog op het laagste niveau van digitale volwassenheid — in de praktijk Excel-planningen ([BIM Fórum Brasil via blog AltoQi/DCD](https://www.datacenterdynamics.com/br/not%C3%ADcias/pesquisa-cen%C3%A1rio-construtivo-brasileiro-2023-revela-que-%C3%A9-crescente-o-uso-de-bim/)).
2. **Oracle Primavera P6 is de standaard in zware infra, olie & gas en mijnbouw.** Petrobras, Vale, Concremat, Progen en de grote EPC-aannemers gebruiken P6; in vacatures voor "engenheiro de planejamento" in mijnbouw/infra is P6 een verplichte eis ([Vagas.com](https://www.vagas.com.br/vagas-de-planejamento), [ENGROW](https://engrow.com.br/construtibilidade-executiva-de-obras-com-primavera-p6-o-que-e-para-que-serve-e-como-aplicar/)). Verano Engenharia de Sistemas is de historische Oracle-Primavera-partner/distributeur ([Verano Global](https://veranoglobal.com/br/aplicacoes/oracle/oracle-primavera/)).
3. **Een sterk lokaal SaaS-ecosysteem groeit snel.** Sienge (Softplan) is het dominante bouw-ERP (5.000+ construtoras; 80 van de 100 grootste bouwers gebruiken minstens één Sienge-oplossing — [Sienge/INTEC 2026](https://sienge.com.br/blog/100-maiores-construtoras-do-brasil/)). Prevision (onderdeel Sienge-ecosysteem) is dé lokale planningsspecialist (650+ construtoras, 7.500+ geplande projecten — [Sienge](https://sienge.com.br/prevision-obras/)), naast Agilean (lean/Line-of-Balance) en orçamento-tools met planningsmodules (90 Compor, Volare, OrçaFascio, Sisplo).

De markt is uitgesproken prijsgevoelig: er is een levendige grijze markt in "levenslange" P6-licenties voor R$ 890 (~USD 160!) ([Volt Softwares](https://voltsoftwares.com/produto/primavera-p6-professional/)), gratis tools (ProjectLibre, GanttProject) worden actief aanbevolen in de civiele-ingenieursgemeenschap ([E-Civil](https://www.ecivilnet.com/softwares/gantt_project.htm)), en Microsoft-resellers stunten met maandlicenties. De taal is een echte barrière én kans: vrijwel de hele opleidings- en verkoopketen draait in het Portugees.

**Kans voor een nieuwkomer:** het gat tussen "Excel/MS Project" en "duur P6" is groot, de overheid verplicht sinds 2024 BIM (incl. 4D-planning) bij federale werken, en lokale spelers winnen juist door Portugese taal, WhatsApp-integratie en lage instapprijzen.

---

## 2. Marktomvang

| Indicator | Waarde | Jaar | Bron |
|---|---|---|---|
| PM-software Brazilië | **USD 153,0 mln**, CAGR ~16% | 2024 | [Credence Research](https://www.credenceresearch.com/report/project-management-software-market) |
| PM-software Zuid-Amerika | USD 300,9 mln, CAGR 14,9% | 2025 | [Cognitive Market Research](https://www.cognitivemarketresearch.com/regional-analysis/south-america-project-management-software-market-report) |
| Construction-management-software Brazilië (groei) | +6,8%/jr (gedreven door infra-documentatie-eisen) | 2025 | [Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/construction-management-software-market) |
| Construction-management-software wereldwijd | USD 10,8 mrd, CAGR 8,7% | 2025 | [Polaris](https://www.polarismarketresearch.com/industry-analysis/construction-management-software-market) |
| Formele werknemers bouw | 2,9 mln | eind 2025 | [CBIC](https://cbic.org.br/construcao-civil-cresce-pelo-segundo-ano-consecutivo-mas-juros-altos-limitam-potencial-de-expansao/) |
| Actieve bouwbedrijven (brede sector F) | ~1,97 mln CNPJ's; ~17.700 middelgrote/grote "construção civil"-bedrijven | 2026 | [Econodata](https://www.econodata.com.br/empresas/todo-brasil/construcao-f) |

**Schatting deelmarkt bouw-scheduling (expliciet gemarkeerd als schatting):** neem de USD 153 mln Braziliaanse PM-softwaremarkt (2024); bouw/infra/energie is in Brazilië een bovengemiddeld deel van de projecteconomie. Bij een aandeel van 20–30% komt de *scheduling/planning*-softwaremarkt voor de bouwsector uit op grofweg **USD 30–50 mln per jaar (2024–2025)**, exclusief het veel grotere bouw-ERP-segment (Sienge alleen al bedient 6.000+ klanten). Aantal professionele planners: de beroepsgroep "engenheiro de planejamento" plus "analista de planejamento de obras" telt naar schatting **enkele tienduizenden actieve professionals** (honderden openstaande vacatures tegelijk op Vagas.com/Glassdoor; 188 vacatures alleen al voor "analista de planejamento e orçamento de obras" — [Glassdoor](https://www.glassdoor.com.br/Vaga/analista-de-planejamento-e-orcamento-de-obras-vagas-SRCH_KO0,45.htm)). — *schatting op basis van bovengenoemde bronnen.*

---

## 3. Gebruikte software: marktpositie en prijzen

### Tier 1 — dominante gereedschappen

**Microsoft Project** — *marktleider brede bouw*
- Gebruikers: aannemers, ingenieursbureaus, incorporadoras, publieke opdrachtgevers; de standaard-onderwijstool in civiele techniek ([UFPE-scriptie](https://repositorio.ufpe.br/bitstream/123456789/45534/1/RAPHAEL%20PONTES%20CLAUS%20-%20GERENCIAMENTO%20DE%20OBRAS%20UTILIZANDO%20O%20MS-PROJECT.pdf), [Papo Obra](https://www.papoobra.com.br/2026/05/controle-de-obras-com-ms-project.html)).
- Prijs (Brazilië): Project Plan 3 ≈ **R$ 184/gebruiker/maand** via reseller MicroSafe ([bron](https://www.microsafe.com.br/cfq7ttc0hdb00002p1mm_licenca-mensal-cloud-nce-microsoft-project-plan-3.npn.html)); Planner+Project-bundels tot R$ 321,60/mnd via Vivo ([bron](https://www.vivoplataformadigital.com.br/cms/pt/family/project-online)); academische licenties R$ 35/mnd. Officiële prijspagina: [Microsoft Brasil](https://www.microsoft.com/pt-br/microsoft-365/project/microsoft-project-licensing).
- Kritiek in de markt: te generiek voor de bouwroutine; lokale SaaS-spelers positioneren zich expliciet tegen MS Project ([Sienge-blog](https://sienge.com.br/blog/ms-project-ou-software-de-planejamento-de-obras/)).

**Oracle Primavera P6 (PPM/EPPM, plus Primavera Cloud)** — *standaard zware infra/energie/mijnbouw*
- Gebruikers: Petrobras (o.a. onderhoudsplanning en S-curves), Vale, Concremat, Progen, grote EPC's/montagebedrijven in mijnbouw ([Saletto-case](https://www.saletto.com.br/case-governanca-de-planejamento-e-integracao-com-oracle-primavera-p6-em-empresa-de-montagem-e-manutencao-para-mineracao/), [ENGROW](https://engrow.com.br/construtibilidade-executiva-de-obras-com-primavera-p6-o-que-e-para-que-serve-e-como-aplicar/)).
- Prijs: P6 Professional ≈ **USD 2.570/jaar** (abonnement) of ≈ USD 2.750 perpetual + USD 605/jr onderhoud ([ProjectManager.com pt](https://www.projectmanager.com/pt/o-que-e-o-primavera-p6)). Lokale kanalen: officiële partner Verano; grijze markt verkoopt "licença vitalícia" voor **R$ 890,90** ([Volt Softwares](https://voltsoftwares.com/produto/primavera-p6-professional/) — legitimiteit twijfelachtig, maar tekenend voor prijsgevoeligheid).
- Ecosysteem: eigen trainingsmarkt (R$ 990–2.500 per cursus, zie §4), gespecialiseerde consultancies (Verano, Saletto, Terranova).

**Excel (planilhas)** — *geen product, wel de grootste "concurrent"*
- ~70% van de construtoras zit op basaal digitaal niveau; gratis planning-templates zijn een eigen mini-industrie ([Planilhas de Obra](https://www.planilhasdeobra.com/), [Kartado](https://kartado.com.br/planilha-gestao-controle-obras/)). Elke commerciële tool in Brazilië verkoopt primair "weg van Excel".

### Tier 2 — lokale spelers (bouwspecifiek)

**Sienge Plataforma (Softplan)** — *dominant bouw-ERP met planningsfunctie*
- 5.000–6.000+ klanten; 80 van de 100 grootste construtoras gebruiken een Sienge-oplossing ([Sienge/INTEC](https://sienge.com.br/blog/100-maiores-construtoras-do-brasil/)). Prijs: op offerte, modulair ([prijspagina](https://sienge.com.br/precos-do-sienge-plataforma-sob-medida-para-sua-construtora/)).
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
- **Generieke SaaS (Trello, Asana, Monday.com, ClickUp, Wrike, Jira, Smartsheet)** — breed gebruikt voor licht projectmanagement in Braziliaanse bedrijven ([Agroadvance-overzicht](https://agroadvance.com.br/blog-ferramentas-de-gestao-de-projetos/)); Trello/Asana Premium ≈ USD 10,99, Business ≈ USD 24,99 p/g/mnd ([monday.com-blog](https://monday.com/blog/pt/gestao-de-projetos-pt/guia-de-precos-do-trello/)). Voor serieuze bouwplanning (CPM/Gantt met kalenders) spelen ze nauwelijks een rol.
- **Gratis/open source: ProjectLibre, GanttProject, OpenProject** — actief aanbevolen in de civiele gemeenschap als gratis MS Project-vervanger ([E-Civil GanttProject](https://www.ecivilnet.com/softwares/gantt_project.htm), [E-Civil OpenProj](https://www.ecivilnet.com/softwares/openproj.htm)); ProjectLibre claimt 7,8 mln downloads wereldwijd met Brazilië als een van de grootste markten ([SourceForge](https://sourceforge.net/projects/projectlibre/)). Belangrijk in onderwijs en bij micro-aannemers — bewijs dat een gratis/goedkope Gantt-CPM-tool in het Portugees vraag heeft.

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
- **BIM-verplichting (Decreto 10.306/2020, Estratégia BIM BR):** sinds 1-1-2024 (fase 2) moet BIM bij federale werken ook voor **orçamentação, planning en uitvoeringscontrole (4D/5D)** worden ingezet ([ABDI](https://www.abdi.com.br/decreto-estabelece-utilizacao-do-bim-em-obras-publicas/), [Tecverde](https://www.tecverde.com.br/2023/09/14/decreto-no-10-306-e-a-obrigatoriedade-do-uso-do-bim-em-obras-publicas/)). BIM-gebruik bij construtoras steeg naar 64% (2023) ([Cenário Construtivo](https://www.datacenterdynamics.com/br/not%C3%ADcias/pesquisa-cen%C3%A1rio-construtivo-brasileiro-2023-revela-que-%C3%A9-crescente-o-uso-de-bim/)) — IFC-gebaseerde planning sluit hier direct op aan.
- **Kostendatabases als lock-in:** SINAPI (verplichte referentie bij federale budgetten) en TCPO/PINI zijn de ruggengraat van orçamento→planning-koppelingen; lokale tools winnen omdat ze deze databases native ondersteunen.
- **Sterke opleidingscultuur:** P6- en MS Project-cursussen via CREA's, universiteiten (UNIFOR, UNI7), INBEC en privéacademies; P6-cursussen kosten R$ 990–2.500 ([Academia do Planejamento](https://academiadoplanejamento.com.br/produtos/primavera-p6), [Verum](https://veruminstitute.com.br/curso-primavera-p6/)). Wie de opleidingsketen wint (gratis studentenlicenties!), wint de markt van morgen.
- **Kanalen:** software wordt via resellers/consultancies verkocht (Verano en Saletto voor Oracle; MicroSafe/Vivo voor Microsoft; Sienge Store voor het lokale ecosysteem). Directe online verkoop zonder lokaal kanaal is ongebruikelijk voor de enterprise-laag.
- **Prijsgevoeligheid is extreem:** grijze P6-licenties à R$ 890, gratis-plan-cultuur (Trello), piraterijtraditie bij desktopsoftware. Betaalbereidheid ligt bij R$ tientallen-tot-honderden per gebruiker/maand voor SaaS, niet bij USD-duizenden per seat — behalve waar de opdrachtgever (Petrobras/Vale) het afdwingt.
- **Taal:** Portugees is niet onderhandelbaar voor het mkb-segment (docs, support, cursussen, WhatsApp-support); Engels volstaat alleen in de EPC/olie & gas-top.

---

## 5. Bronnen (selectie)

- https://www.projectmanager.com/pt/o-que-e-o-primavera-p6 (P6-prijzen)
- https://voltsoftwares.com/produto/primavera-p6-professional/ (grijze P6-licentie R$ 890,90)
- https://veranoglobal.com/br/aplicacoes/oracle/oracle-primavera/ (Verano, Oracle-partner)
- https://www.saletto.com.br/case-governanca-de-planejamento-e-integracao-com-oracle-primavera-p6-em-empresa-de-montagem-e-manutencao-para-mineracao/ (P6-governance mijnbouw)
- https://www.microsafe.com.br/cfq7ttc0hdb00002p1mm_licenca-mensal-cloud-nce-microsoft-project-plan-3.npn.html (MS Project Plan 3 R$ 184/mnd)
- https://sienge.com.br/blog/100-maiores-construtoras-do-brasil/ (Sienge: 80 van top-100)
- https://sienge.com.br/prevision-obras/ (Prevision: 650+ construtoras, 7.500+ obras)
- https://www.agilean.com.br/planejamento-e-controle (Agilean)
- https://www.noventa.com.br/90compor | https://expertsystem.com.br/volare/ | https://www.orcafascio.com/ (lokale orçamento+planning-tools)
- https://inbec.com.br/cursos/curso-planejamento-obras-zero-com-ferramenta-spider-project-online | https://www.crea-rj.org.br/abertas-as-inscricoes-para-o-spider-project-gestao-de-projetos-e-obras-na-pratica/ (Spider Project in Brazilië)
- https://www.credenceresearch.com/report/project-management-software-market (Brazilië PM-software USD 153,04 mln 2024, CAGR 16%)
- https://www.cognitivemarketresearch.com/regional-analysis/south-america-project-management-software-market-report (Zuid-Amerika USD 300,9 mln 2025)
- https://cbic.org.br/construcao-civil-cresce-pelo-segundo-ano-consecutivo-mas-juros-altos-limitam-potencial-de-expansao/ (bouw-PIB/werkgelegenheid)
- https://www.abdi.com.br/decreto-estabelece-utilizacao-do-bim-em-obras-publicas/ (Decreto 10.306 / BIM BR)
- https://www.datacenterdynamics.com/br/not%C3%ADcias/pesquisa-cen%C3%A1rio-construtivo-brasileiro-2023-revela-que-%C3%A9-crescente-o-uso-de-bim/ (BIM 64%, digitale volwassenheid)
- https://www1.dnit.gov.br/anexo/Edital/Edital_edital0411_20-21_0.pdf (DNIT cronograma físico-financeiro)
- https://academiadoplanejamento.com.br/produtos/primavera-p6 (cursusprijzen)
- https://www.ecivilnet.com/softwares/gantt_project.htm (gratis tools in de civiele gemeenschap)
- https://www.econodata.com.br/empresas/todo-brasil/construcao-f (aantal bouwbedrijven)
- https://www.glassdoor.com.br/Vaga/analista-de-planejamento-e-orcamento-de-obras-vagas-SRCH_KO0,45.htm (arbeidsmarkt planners)
