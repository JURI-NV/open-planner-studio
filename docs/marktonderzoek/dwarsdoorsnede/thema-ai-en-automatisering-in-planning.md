# Dwarsdoorsnede-thema: AI en automatisering in planning

*Marktonderzoek planningssoftware — themarapport*
*Peildatum onderzoek: 25 juli 2026. Alle bedragen in de valuta van de bron.*

---

## 1. Samenvatting

**De kern in één alinea.** Het publiek aangekondigde durfkapitaal in "AI voor planning" is bescheiden — de vier rondes in dit rapport tellen op tot circa **$115 miljoen** (ALICE $47M cumulatief, Trunk Tools $40M, nPlan $16M, Nodes & Links $12M) — en de bedrijven die het meest genoemd worden zijn opvallend klein: nPlan had in 2024 gemiddeld 34 werknemers en eind 2024 £549.671 aan kas; Nodes & Links had in 2025 gemiddeld 19 werknemers. Dat zijn geen cijfers uit persberichten maar uit gedeponeerde jaarrekeningen bij Companies House. Tegelijk vraagt Microsoft $30 per gebruiker per maand voor de Copilot-laag bovenop een Project Plan 3-licentie die zélf $30 kost — AI verdubbelt daar letterlijk de stoelprijs. De conclusie is dat de betalingsbereidheid voor AI reëel is bij de grote platformen, maar dat de gespecialiseerde AI-planners nog nauwelijks schaal hebben bereikt.

**Wat aantoonbaar werkt.** Eén ding is met publieke, methodologisch beschreven cijfers onderbouwd: **kansverdelingen van activiteitsduren voorspellen op basis van historische planningen**. nPlan publiceert een white paper met kruisvalidatie (70/30-split) en concrete scores — MAE 106,3 werkuren voor hun GNN tegen 1.514,1 voor PERT en 237,3 voor log-normaal ([nPlan, *Model Performance 101*, maart 2023](https://discover.nplan.io/hubfs/nPlan_Performance_Model_1.3.pdf)) — en heeft dat in een AACE-conferentiepaper laten vastleggen ([AACE RISK-4435, 2024](https://discover.nplan.io/hubfs/Research%20papers/AACE%20RISK%204435%20Technical%20Paper%20-%202024.pdf)). Dat is verreweg de best gedocumenteerde claim in deze hele markt.

**Wat marketing is.** ALICE's "17% kortere doorlooptijd, 14% arbeidsbesparing, 12% materieelbesparing" en de McKinsey-ALICE "tot 20% versnelling" zijn leveranciers- en adviesbureau-claims zonder gepubliceerde methodologie, steekproefdefinitie of controlegroep ([alicetechnologies.com](https://www.alicetechnologies.com/), [McKinsey, 14 april 2026](https://www.mckinsey.com/capabilities/operations/our-insights/operations-blog/mckinsey-and-alice-technologies-collaborate-to-transform-capital-project-delivery-with-generative-scheduling)). Oracle's "AI in Primavera" bestaat in april 2026 vooral uit veiligheidsanalyse en processamenvatting in Unifier — planning-AI was in september 2025 volgens een implementatiepartner nog "plans for the next release" ([Project Partners, 18 september 2025](https://www.projectp.com/ppblog/2025/09/18/using-ai-to-unlock-your-project-controls-in-primavera/)). Deltek's Dela raakt planning helemaal niet: de aankondigingen van november 2025 gaan over offertes, risico-rapportage en financiële afsluiting ([Deltek, 12 november 2025](https://www.prnewswire.com/news-releases/deltek-unveils-intelligent-platform-innovations-that-elevate-the-project-lifecycle-302612413.html)).

**Wat dit betekent voor Open Planner Studio.** IFC 4.3 draagt de volledige CPM-payload al (`IfcTaskTime` met `EarlyStart`, `LateStart`, `FreeFloat`, `TotalFloat`, `IsCritical`). De hele AI-markt draait om P6/XER als uitwisselformaat; een IFC-native planner staat daar structureel náást, niet in. De verstandige zet is niet AI-features najagen maar de deterministische kern (CPM, kalender, logica-integriteit) uitstekend maken en AI via het bestaande extensiesysteem optioneel houden. Zie sectie 11.

---

## 2. Verantwoording: hoe deze bronnen zich verhouden

Deze markt is berucht om cijfers zonder herkomst. Ik heb de bronnen daarom expliciet in klassen ingedeeld en gebruik die classificatie door het hele rapport.

| Klasse | Wat het is | Voorbeelden in dit rapport | Betrouwbaarheid |
|---|---|---|---|
| **A — Wettelijk gedeponeerd** | Jaarrekeningen, normteksten | Companies House iXBRL van nPlan Ltd en Nodes & Links Ltd; IFC 4.3-schemadocumentatie | Hoog. Wettelijke aansprakelijkheid bij onjuistheid. |
| **B — Gepubliceerde prijslijst** | Officiële prijs, verifieerbaar | Oracle G-Cloud 14 prijsdocument; Microsoft 365 prijspagina's | Hoog voor lijstprijs, zegt niets over gerealiseerde prijs na korting. |
| **C — Methodologisch onderbouwd** | Meetopzet is beschreven en navolgbaar | nPlan *Model Performance 101*; AACE RISK-4435; arXiv-papers | Middel-hoog. Zelfgerapporteerd, maar toetsbaar. |
| **D — Persbericht / vakpers** | Feitelijk over gebeurtenissen, sturend over waarde | Funding-persberichten, Construction Dive | Middel voor feiten (bedrag, datum), laag voor effectclaims. |
| **E — Leveranciersmarketing** | Claims zonder methode | "17% sneller", "$127 miljard aan projecten" | Laag. Behandeld als bewering, niet als cijfer. |
| **F — Eigen schatting** | Mijn afleiding | Expliciet gemarkeerd als *[Eigen schatting]* met redenering | Variabel, redenering staat erbij. |

**Belangrijke beperking vooraf.** nPlan en Nodes & Links deponeren beide onder het Britse *small companies regime* en dienen **geen winst-en-verliesrekening** in. Hun **omzet is dus niet publiek**. Alles wat ik over hun commerciële tractie zeg, is afgeleid uit balansposten (kas, overlopende passiva, personeelsaantal) en staat als zodanig gemarkeerd. Ik heb geen enkele bron gevonden — publiek of via aanbestedingsdocumenten — die de omzet van ALICE Technologies, nPlan of Nodes & Links hard maakt.

**Wat ik níét heb kunnen inzien:** Gartner- en IDC-rapporten (betaalmuur; de Gartner-pagina gaf HTTP 403), ALICE's Amerikaanse financiële gegevens (Delaware-vennootschap, geen depotplicht), en de individuele contractwaarden van nPlan bij HS2/Network Rail. Waar ik daarover iets zeg, is dat een gemarkeerde schatting.

---

## 3. Taxonomie: "AI in planning" is vijf verschillende dingen

De markt gooit vijf technisch onvergelijkbare zaken op één hoop. Dat onderscheid is essentieel om marketing van substantie te scheiden.

| # | Categorie | Wat het technisch is | Wie | Bewijskracht |
|---|---|---|---|---|
| 1 | **Generatieve planning** | Combinatorische optimalisatie/simulatie over recepten en middelen; genereert miljoenen varianten | ALICE Technologies | Zwak onderbouwd publiek; geen gepubliceerde methode |
| 2 | **Voorspellende risicoanalyse** | Supervised ML (GNN/LLM-achtig) op historische planningen → duurverdelingen | nPlan | **Sterkst onderbouwd** (white paper + AACE-paper) |
| 3 | **Planningsintelligentie / kwaliteitscontrole** | Grotendeels deterministische regels + NLP-laag erop | Nodes & Links, InEight, Oracle CEI | Deterministische kern werkt; "AI"-label deels cosmetisch |
| 4 | **LLM-assistentie** | Chat-interface op taken en documenten | Microsoft Copilot, ALICE Schedule Insights Agent, Oracle CEI, Deltek Dela | Werkt voor taal, raakt CPM niet aan |
| 5 | **Onderzoek: RL voor scheduling** | Deep RL + GNN voor RCPSP/JSSP | Academisch (Wheatley e.a.) | Werkt op benchmarks, niet in productie |

De belangrijkste observatie: **categorie 4 is waar het geld nu wordt verdiend** (Microsoft, Oracle, Deltek), terwijl **categorie 2 het enige is met publiek toetsbaar bewijs** en **categorie 5 nog nergens in een commercieel planningsproduct zit**.

---

## 4. Leverancier voor leverancier

### 4.1 ALICE Technologies — generatieve planning

**Product.** Drie modules: ALICE Model (genereert een basisplanning uit een BIM-model), ALICE Optimize (optimaliseert een bestaande planning) en ALICE Plan (2D-visualisatie over tekeningen). Sinds september 2025 een *Schedule Insights Agent* voor conversationele planningsanalyse ([alicetechnologies.com](https://www.alicetechnologies.com/), geraadpleegd 25 juli 2026; [ALICE nieuwsoverzicht](https://blog.alicetechnologies.com/news)).

**Claims (klasse E).** 17% kortere projectduur, 14% arbeidskostenbesparing, 12% materieelkostenbesparing, ingezet op "meer dan $127 miljard" aan bouwprojecten. Genoemde klanten: Costain, Align JV (HS2), Parsons, Implenia, Zachry, McKinsey, Andrade Gutierrez, Suffolk, SCS JV, Accenture, Kajima, NGE.

*Kritische noot:* geen van deze percentages gaat vergezeld van een steekproefomvang, een definitie van de nulmeting of een controlegroep. "Ingezet op $127 miljard aan projecten" meet de omvang van de projecten waarop de software ooit is aangeraakt, niet het gerealiseerde effect — het is een bereikcijfer dat als prestatiecijfer wordt gepresenteerd.

**De McKinsey-alliantie (april 2026).** Dit is de belangrijkste recente ontwikkeling. McKinsey en ALICE formaliseerden een samenwerking van meer dan vijf jaar. Claims: versnellingen "tot 20 procent" over 35+ klanten, en in één datacenter-case een reductie van circa 40% op de basisplanning ([McKinsey Operations Blog, 14 april 2026](https://www.mckinsey.com/capabilities/operations/our-insights/operations-blog/mckinsey-and-alice-technologies-collaborate-to-transform-capital-project-delivery-with-generative-scheduling)). Construction Dive noemt aanvullend een besparing van 28 dagen op een snelwegproject bij Zachry Construction ([Construction Dive, 15 april 2026](https://www.constructiondive.com/news/mckinsey-alice-technologies-partner-generative-ai-schedule/817580/)).

*Kritische noot:* Construction Dive merkt zelf op dat er **geen onafhankelijke verificatie** van de 20-40%-cijfers bestaat en dat er slechts twee concrete klantvoorbeelden zijn. Dat een strategieadviesbureau mede-distributeur wordt van de software waarvan het ook de effectiviteit rapporteert, is een belangenverstrengeling die expliciet benoemd hoort te worden. De 40%-datacentercase betreft bovendien "vereenvoudiging van planningslogica" — dat suggereert dat een deel van de winst zit in het opruimen van een slechte uitgangsplanning, niet in de AI zelf.

**Prijs.** ALICE publiceert geen prijzen. De prijspagina vermeldt: onbeperkt aantal gebruikers, onbeperkte opslag, inclusief workshops en implementatiebegeleiding; typische gebruikers hebben projecten met een bouwwaarde van **minimaal $75 miljoen** ([alicetechnologies.com/pricing](https://www.alicetechnologies.com/pricing), geraadpleegd 25 juli 2026).

*[Eigen schatting]* De combinatie van "onbeperkte gebruikers", een projectdrempel van $75M en een enterprise-verkoopmodel met inbegrepen consultancy wijst op **projectgebonden licenties in de orde van enkele tienduizenden tot een paar honderdduizend dollar per project per jaar**. Redenering: bij onbeperkte gebruikers kan de prijs niet per stoel zijn; bij een drempel van $75M moet de prijs klein genoeg zijn om als projectkostenpost te verdwijnen (typisch <0,1% van de bouwsom = <$75.000). Ik heb hiervoor **geen bronbevestiging** en presenteer dit uitsluitend als redenering.

**Funding (klasse D, hard).** Series B verlengd tot **$47 miljoen totaal** in april 2023, met een incrementele tranche van $13 miljoen (Swire Properties als aandeleninvesteerder, Bridge Bank als kredietverstrekker). Eerdere Series B-investeerders (juni 2022): Vanedge Capital (lead), Bouygues, Gaingels, GRIDS Capital, JLL Spark, MetaPlanet, Future Ventures, Merus Capital, Rising Tide ([PR Newswire, 11 april 2023](https://www.prnewswire.com/news-releases/alice-technologies-extends-funding-series-b-round-to-access-47m-in-capital-301793474.html)).

*Kritische noot:* de laatste bekende financieringsronde dateert van **april 2023** — ruim drie jaar geleden. Voor een bedrijf dat als categoriekampioen wordt gepresenteerd is dat een lange stilte. Dat de meest recente grote aankondiging een distributiepartnerschap is in plaats van een Series C, is een signaal dat ik zwaar meeweeg.

---

### 4.2 nPlan — ML-voorspelling (de best onderbouwde speler)

**Product.** Voorspelling van activiteit- en projectvertraging op basis van een dataset historische planningen. Modules: Portfolio, Insights Pro/Core/Risk Professional, Schedule Studio (generatieve planningsopbouw), AutoReport en Schedule Integrity Checker ([nplan.io](https://www.nplan.io/), geraadpleegd 25 juli 2026).

**Het bewijs (klasse C — het beste in deze markt).** Het white paper *Model Performance 101* (maart 2023) beschrijft de meetopzet: 70% van de projecten voor training, 30% voor evaluatie, herhaald met verschillende willekeurige splitsingen (kruisvalidatie). Dataset per 22 februari 2023: **358.871.102 activiteiten in 539.569 projectplanningen**.

Prestaties op activiteitniveau (testset: 14.184 projecten):

| Metriek | PERT | Log-normaal | nPlan (GNN) | Perfect |
|---|---|---|---|---|
| CRPS (werkuren) | 703,5 | 105,2 | **64,1** | 0 |
| MAE (werkuren) | 1.514,1 | 237,3 | **106,3** | 0 |
| Likelihood | 0,012 | 0,01 | **0,44** | 1,0 |

Prestaties op projectniveau (vertragingsmultiplicator; 1,0 = perfect):

| Metriek | PERT | Log-normaal | nPlan (GNN) |
|---|---|---|---|
| CRPS | 0,847 | 0,532 | **0,169** |
| P10 / P50 / P90 | 1,53 / 2,04 / 2,77 | 1,28 / 1,63 / 2,35 | **1,02 / 1,14 / 1,41** |
| Gemiddelde | 2,103 | 1,746 | **1,191** |

*Nagerekend:* op MAE is de winst 14,2× ten opzichte van PERT (1.514,1 / 106,3) en 2,2× ten opzichte van log-normaal (237,3 / 106,3). Op CRPS is dat 11,0× respectievelijk **1,6×** (105,2 / 64,1). De elders in dit rapport gebruikte formulering "2-14×" gold dus alleen voor MAE; tegenover een log-normale basislijn op CRPS is de winst kleiner dan een factor 2. Dat is gecorrigeerd in de tabel in sectie 5.

Aanvullend: nPlan identificeert **47,2%** van de activiteiten die meer dan 50% uitliepen (PERT identificeerde daarvan géén enkele), en **47,9%** van de projecten die meer dan 30% uitliepen (1.514 van 13.913 projecten in de testset).
Bron: [nPlan, *Model Performance 101*, maart 2023](https://discover.nplan.io/hubfs/nPlan_Performance_Model_1.3.pdf).

**Vier kritische kanttekeningen bij dit bewijs.** Het is het beste materiaal in de markt, maar het is niet zonder problemen:

1. **De vergelijkingsbasis is zwak.** nPlan vergelijkt met "een vaste verdeling over alle activiteiten" volgens PERT of log-normaal. Dat is niet hoe competente QSRA wordt uitgevoerd: daar worden verdelingen per activiteit gekalibreerd met expertinput en correlaties tussen activiteiten gemodelleerd. Een factor 2-14 verbetering ten opzichte van een naïeve basislijn zegt weinig over de winst ten opzichte van gedegen praktijk. Het white paper erkent dit impliciet door de basislijn "best-in-class monte carlo" te noemen, wat een overdrijving is voor een uniforme verdeling.
2. **"Identificeren" is niet "voorkomen".** Het white paper concludeert dat de gevonden vertragingen "potentieel nog voorkombaar" waren. Dat is een gevolgtrekking, geen meting. Er is geen interventiestudie die aantoont dat teams die de voorspelling kregen, minder vertraging opliepen.
3. **De "Turing-test" is geen kwaliteitsmaat.** Het white paper meldt dat experts in circa 80% van de gevallen een door de AI gegenereerde planning aanzagen voor de echte. Dat meet plausibiliteit, niet correctheid — en zegt evenveel over de kwaliteit van echte planningen als over de AI.
4. **Inconsistente datasetcijfers.** De website noemt "meer dan 750.000 planningen" en "$2 biljoen"; het persbericht van oktober 2025 noemt 750.000 en "$2,5 biljoen"; het AACE-paper uit 2024 noemt "meer dan 740.000 planningen"; het white paper uit 2023 noemt 539.569. Het getal 750.000 lijkt sinds jaren ongewijzigd in de marketing te staan, terwijl het geverifieerde trainingscorpus in 2023 aantoonbaar kleiner was. Verschillende scopes (geïngesteerd versus bruikbaar) zijn een plausibele verklaring, maar de leverancier maakt dat onderscheid nergens.

**Het AACE-paper (klasse C, adoptiebewijs).** Belangrijker dan de modelscores is het implementatiepaper: *Practical Implementation of AI-based risk management processes on construction megaprojects*, AACE International Technical Paper RISK-4435 (2024), auteurs Phillips, Amratia, Ledzema, Bendall-Jones, Hovhannisyan, Mueck. Dit is **de eerlijkste bron over adoptie die ik heb gevonden**, en wel omdat het van de leverancier zelf komt:

> "Given the recency of AI-SRA, only a few mega-projects have introduced it into their risk management procedures."

Concrete adoptiefeiten uit dat paper:
- **5 megaprojecten** (spoor, olie & gas), implementaties gestart in **2022**, projectkosten tussen **£60 miljoen en £10 miljard**, planningen van "een paar duizend tot tienduizenden activiteiten".
- De Britse spoorcasus betrof **18 project controls-professionals** in totaal.
- QSRA en AI-SRA draaiden **een jaar lang parallel** voordat de organisatie overstapte.
- Drie geïdentificeerde barrières: gebrek aan vertrouwen in AI-modellen, de niet-intuïtieve aard van de resultaten, en afwijking van beproefde processen.
- Uiteindelijke toepassing: onderbouwing van een investeringsbesluit voor meer dan $1 miljard aan aanvullende scope, met 12 werkdagen doorlooptijd voor de analyse.

Bron: [AACE RISK-4435, 2024](https://discover.nplan.io/hubfs/Research%20papers/AACE%20RISK%204435%20Technical%20Paper%20-%202024.pdf).

*Dit is de meest waardevolle passage in het hele onderzoek:* een jaar parallel draaien met de oude methode, drie vertrouwensbarrières en 18 betrokken professionals — dat is het werkelijke tempo van AI-adoptie in planning, tegenover de "transformatie"-retoriek van de persberichten.

**Funding (klasse D, hard).** **$16 miljoen Series B op 17 oktober 2025**, geleid door CapHorn, met Chevron Technology Ventures, Suffolk Technologies, GV (Google Ventures), Pentech Ventures en LocalGlobe. Genoemde klanten: HS2, Network Rail, Transpennine Route Upgrade, Anglian Water, Chevron, Shell, MTR (Hongkong), NEOM. Claim: klanten hebben "meer dan $1,2 miljard" bespaard; $500 miljard aan projecten actief in beheer ([nPlan persbericht, 17 oktober 2025](https://www.nplan.io/press-releases/nplan-raises-16m-series-b-to-scale-its-ai-led-transformation-of-capital-project-delivery)).

**De jaarrekening (klasse A — het hardste bewijs in dit rapport).** NPLAN LIMITED, Companies House-nummer 11043916, jaarrekening boekjaar 2024, gedeponeerd 21 mei 2025, **niet-gecontroleerd** (vrijstelling art. 477 Companies Act 2006), gefilterd (geen W&V-rekening).

| Post | 31-12-2024 | 31-12-2023 | Verschil |
|---|---|---|---|
| Kas en banktegoeden | **£549.671** | £5.042.354 | **−£4.492.683** |
| Debiteuren | £414.397 | £1.056.889 | −£642.492 |
| Vooruitontvangen bedragen (deferred income) | **£87.079** | £362.165 | **−76,0%** |
| Materiële vaste activa | £109.139 | £158.354 | −£49.215 |
| Financiële vaste activa | £2.260.733 | — | +£2.260.733 |
| Netto activa | £3.017.849 | £5.798.365 | −£2.780.516 |
| Agioreserve (share premium) | £15.748.983 | £15.747.153 | +£1.830 |
| Overgedragen verlies | **−£12.731.307** | −£9.948.961 | verlies 2024: **£2.782.346** |
| Gemiddeld aantal werknemers | **34** | **57** | **−40,4%** |

Bron: [Companies House, NPLAN LIMITED 11043916, jaarrekening 2024](https://find-and-update.company-information.service.gov.uk/company/11043916/filing-history) (iXBRL, gedeponeerd 21 mei 2025).

**Wat deze cijfers zeggen.** Dit is het meest onthullende materiaal van het hele onderzoek:

- Het personeelsbestand kromp met ruim 40%, van 57 naar 34. Dat is geen groeibedrijf in 2024.
- De vooruitontvangen bedragen — bij een abonnementsmodel de beste publieke indicator voor de gecontracteerde basis — daalden met 76%, van £362k naar £87k.
- Eind 2024 resteerde £549.671 kas tegenover een jaarverlies van £2,78 miljoen. *[Eigen schatting]* Dat is bij ongewijzigde uitgaven ongeveer **twee tot drie maanden liquiditeit**. Redenering: £2,78M jaarverlies ≈ £232k per maand; £550k / £232k ≈ 2,4 maanden. Dit maakt aannemelijk dat de Series B van oktober 2025 een noodzakelijke financiering was, geen opportunistische groeironde. De aankondiging vermeldt dat niet.
  *Verfijning na hercontrole van de jaarrekening:* de kas daalde met £4,49 miljoen terwijl het verlies £2,78 miljoen bedroeg. Het verschil zit grotendeels in de nieuwe post **Investments £2.260.733** ("Investments in shares are included at fair value", volledig als toevoeging in 2024) — een niet-operationele kasuitgang. De zuivere operationele kasverbranding lag dus eerder rond £2,2 miljoen per jaar ≈ £186k per maand, wat op circa **3,0 maanden** uitkomt. De conclusie "twee tot drie maanden" houdt stand; de onderliggende redenering is hiermee preciezer. Dat een vennootschap met £550k kas £2,26 miljoen in aandelen aanhoudt, is op zichzelf opmerkelijk en wordt in de gedeponeerde stukken niet toegelicht.
- Cumulatief opgehaald eigen vermogen tot eind 2024: circa **£15,75 miljoen** (agio + geplaatst kapitaal), waarvan £12,73 miljoen inmiddels verbruikt.

*Belangrijke beperking:* de omzet is niet gedeponeerd. De daling van vooruitontvangen bedragen en debiteuren is **suggestief maar niet bewijzend** voor een omzetdaling; ze kan ook voortkomen uit een wijziging in factureringsritme (bijvoorbeeld van vooruit- naar achterafbetaling). Ik markeer de conclusie "de gecontracteerde basis kromp in 2024" als *[Eigen schatting met redelijke onderbouwing]*, niet als feit.

---

### 4.3 Nodes & Links — planningsintelligentie

**Product.** Platform voor project controls dat planningsdata, projectdocumenten en beheertools samenbrengt. Positionering: "de enige AI gebouwd op expert project-controls-fundamenten" in plaats van een generieke chatbot. Expliciete claims: **hallucinatiebestendig**, antwoorden herleidbaar tot de brondata, "volledig controleerbare modellen compatibel met P6-principes", en continue scanning op verouderde logica en gebroken relaties ([nodeslinks.com](https://nodeslinks.com/), geraadpleegd 25 juli 2026).

Genoemde klanten (30+ logo's): Balfour Beatty, VINCI, Costain, DPR, AECOM, Bechtel, Turner, Intel, Shell, Johnson & Johnson, HS2, Network Rail, CIMIC.

*Kritische noot:* de klantcitaten zijn tijdsbesparingsanekdotes ("die vertragingsanalyse had twee maanden gekost, wij deden het in twee klikken"), geen gemeten uitkomsten. De positionering "hallucinatiebestendig" is technisch verstandig — het impliceert dat de zware analyse deterministisch is en de LLM alleen de presentatielaag vormt. Dat is eerlijker dan de meeste concurrenten, maar het betekent ook dat het "AI"-etiket grotendeels op een klassieke planningsanalyse-engine is geplakt.

**Funding (klasse D, hard).** **$12 miljoen** aangekondigd op 18 februari 2025, geleid door ETF Partners ([Nodes & Links, februari 2025](https://nodeslinks.com/blog/nodes-links-raises-12m-to-transform-12t-construction-industry-with-ai/)).

**De jaarrekening (klasse A).** NODES & LINKS LIMITED, Companies House-nummer 11388602, boekjaren 2023-2025.

| Post | 31-12-2025 | 31-12-2024 | 31-12-2023 |
|---|---|---|---|
| Kas en banktegoeden | **£11.358.384** | £1.724.779 | £3.235.558 |
| Debiteuren (<1 jaar) | £571.266 | £351.411 | £441.576 |
| Crediteuren (<1 jaar) | −£683.360 | −£1.244.486 | −£423.982 |
| Crediteuren (>1 jaar) — *converteerbare leningen* | **−£4.559.760** | — | — |
| Netto activa | £6.740.192 | £848.387 | £3.274.347 |
| Agioreserve | **£18.353.228** | £9.304.299 | £9.304.078 |
| Overgedragen verlies | **−£11.613.356** | −£8.456.108 | −£6.029.923 |
| Jaarverlies (afgeleid) | **£3.157.248** | £2.426.185 | n.v.t. |
| Gemiddeld aantal werknemers | **19** | **22** | **23** |

Bron: [Companies House, NODES & LINKS LIMITED 11388602](https://find-and-update.company-information.service.gov.uk/company/11388602/filing-history?category=accounts), jaarrekeningen gedeponeerd 7 mei 2026 (FY2025) en 8 mei 2025 (FY2024).

**Wat deze cijfers zeggen.**

- De Series B is duidelijk zichtbaar: de agioreserve steeg in 2025 met **£9.048.929** en de kas van £1,7M naar £11,4M. Daarnaast verscheen **£4.559.760 aan langlopende schulden** die er eind 2024 nog niet waren.
- *[Eigen schatting]* £9,05 miljoen agio komt bij een koers van ongeveer 1,24-1,27 USD/GBP overeen met circa **$11,2-11,5 miljoen aan eigen vermogen**. De aangekondigde "$12 miljoen" (een Series B, geleid door ETF Partners) is daarmee vrijwel volledig verklaard door de aandelenuitgifte.
- **Gecorrigeerd na verificatie van de jaarrekening zelf:** de £4.559.760 is géén onbepaalde "venture debt". Toelichting 8 bij de FY2025-rekening zegt expliciet: *"Convertible loan notes … The convertible loan notes are unsecured and bear interest at 8% per annum. Unless triggered sooner, they will automatically convert to equity in June 2028."* Het instrument is dus **converteerbaar vreemd vermogen tegen 8%**, met automatische conversie in juni 2028. Of deze notes onderdeel waren van de aangekondigde $12M-kop blijft onbekend; de aard van het instrument is dat niet meer.
- Het personeelsbestand daalde van 23 (2023) naar 19 (2025) — **ondanks** de kapitaalinjectie. Dat is opmerkelijk: normaal is een Series B het startsein voor aanwerving. Het gemiddelde over 2025 kan dat effect maskeren als de aanwerving pas laat in het jaar begon, maar het duidt niet op explosieve groei.
- Het bedrijf heeft vier dochters: Nodes & Links Labs (Cyprus), Nodes & Links Consulting (VK), Nodes & Links Olympia S.A. (Griekenland) en Nodes & Links Inc. (VS).
- De jaarrekening 2025 vermeldt in de continuïteitsparagraaf dat de verliezen "consistent zijn met het bedrijfsplan"; de 2024-versie noemde daarnaast "gestaag toegenomen omzetstromen" na balansdatum — dat is de enige (kwalitatieve) omzetindicatie die publiek is.

**Schaalvergelijking (klasse A).** Beide Britse AI-planningskampioenen samen: **53 werknemers** (nPlan 34 in 2024, Nodes & Links 19 in 2025) en circa **£24,3 miljoen cumulatief verlies**. Dat is de reële omvang van de gespecialiseerde AI-planningsindustrie in het Verenigd Koninkrijk — het land dat volgens nPlan's eigen CEO "sinds onze oprichting in 2017 voorop heeft gelopen in AI voor de bouw".

---

### 4.4 InEight Schedule — "practical AI"

**Product.** CPM-planning voor kapitaalprojecten, met AI-ondersteunde sjablonen die putten uit "de eigen kennisbibliotheek van realistische, historische planningen" van het bedrijf zelf. Ondersteunt de DCMA 14-punts-toets. Genoemde klant: Pattern Energy, met een project van meer dan 80.000 activiteiten ([InEight Schedule](https://ineight.com/products/ineight-schedule/), [Practical AI Tools](https://ineight.com/products/ineight-schedule/practical-ai-tools/), geraadpleegd 25 juli 2026).

**Positionering — en waarom die verstandig is.** InEight distantieert zich expliciet van de concurrentie:

> "Unlike opaque 'black box' AI systems, our tool leverages your company's own knowledge library."

Dat is strategisch de scherpste positionering in de markt. Waar nPlan's waarde juist ligt in een gedeelde, sectorbrede dataset, zegt InEight: uw eigen historische planningen, uw eigen normen, en het team mag altijd overrulen. Voor aannemers met zorgen over datavertrouwelijkheid en over de vraag of andermans projecten wel representatief zijn, is dat een reëel argument.

*Kritische noot:* er staan **geen** gekwantificeerde prestatieclaims op de pagina en **geen** beschrijving van de gebruikte technieken. Functioneel is dit een intelligente sjabloon- en aanbevelingsmotor, geen generatieve planner. Dat is eerlijk gepositioneerd maar het "AI"-label doet zwaarder werk dan de techniek.

**Prijs.** Niet gepubliceerd. Twee modellen: enterprise-maatwerk (op basis van bedrijfsomvang, contractduur, gebruikersaantal en modules) en per-gebruiker via "InEight NOW", maandelijks of jaarlijks online af te nemen. Op de prijspagina staat **geen enkel bedrag** en **geen vermelding dat AI-functies extra kosten** ([ineight.com/pricing-overview](https://ineight.com/pricing-overview/), geraadpleegd 25 juli 2026).

---

### 4.5 Microsoft — Copilot in Planner/Project (de enige harde prijskaart)

Dit is de enige leverancier in dit onderzoek die publiek en exact zegt wat AI in planning kost. Daarom is dit de belangrijkste bron voor de betalingsbereidheidsvraag.

**Prijzen per gebruiker per maand, jaarlijkse betaling (klasse B):**

| Plan | Prijs (USD) | Prijs (CAD) | AI inbegrepen? |
|---|---|---|---|
| Microsoft Planner (in Microsoft 365) | $0 | CAD 0 | Nee |
| Planner Plan 1 | **$10,00** | CAD 13,60 | Nee |
| Planner and Project Plan 3 | **$30,00** | CAD 40,70 | Nee |
| **Microsoft 365 Copilot (add-on)** | **$30,00** | CAD 40,70 | Ja — Copilot ís de vereiste licentie |

*Correctie na verificatie:* de afhankelijkheid loopt andersom dan eerder in dit rapport stond. Microsoft schrijft letterlijk: *"A Microsoft 365 Copilot license is required to access Planner Agent and its AI capabilities. Users that also have a Planner Plan 1 or Planner and Project Plan 3 license will have access to additional AI capabilities."* De Copilot-licentie is dus de voorwaarde; een betaald Planner-plan voegt daar alleen extra AI-mogelijkheden aan toe. De conclusie "AI verdubbelt de stoelprijs" blijft intact voor de planner die zowel Plan 3 als Copilot nodig heeft.

Bron: [Microsoft Planner plans and pricing (VS)](https://www.microsoft.com/en-us/microsoft-365/planner/microsoft-planner-plans-and-pricing) en [Canadese variant](https://www.microsoft.com/en-ca/microsoft-365/planner/microsoft-planner-plans-and-pricing), geraadpleegd 25 juli 2026.

**Het centrale feit voor dit rapport: AI verdubbelt de stoelprijs.** Een planner met Project Plan 3 betaalt $30. Wil diezelfde planner AI-ondersteuning, dan komt daar $30 bovenop — een **prijspremie van 100%** voor de AI-laag. Geen enkele Planner-tier bevat AI zonder de Copilot-add-on.

**Prijsdiscrepantie die opgemerkt moet worden.** Microsoft's eigen Copilot-pagina voor bedrijven noemt andere bedragen: $18,00 per gebruiker per maand (actietarief bij jaarcontract), $21,00 regulier jaarlijks en $25,20 maandelijks, voor "Microsoft 365 Copilot Business" ([microsoft.com/en-us/microsoft-365/copilot/business](https://www.microsoft.com/en-us/microsoft-365/copilot/business), geraadpleegd 25 juli 2026). De actieperiode is bij verificatie exact vastgesteld: de voetnoot op de pagina luidt *"This discount offer is available between July 1, 2026, and September 30, 2026"* — het is dus een lopende kwartaalactie, geen structureel tarief. De Business-SKU vereist bovendien een Microsoft 365 **Business**-plan; de pagina toont geen enterprise-Copilot en verwijst daarvoor door. Dit betreft vrijwel zeker een aparte MKB-SKU naast de enterprise-Copilot van $30. Ik kan uit de publieke pagina's **niet vaststellen** of de goedkopere Business-SKU de Planner Agent ontsluit. Wie dit cijfer overneemt, moet die onzekerheid meenemen.

**Wat de Planner Agent daadwerkelijk kan — en vooral niet (klasse A, leveranciersdocumentatie).** Dit is het meest ontnuchterende detail in het hele onderzoek. Microsoft's eigen supportdocumentatie somt op:

- **Premium-plannen worden niet ondersteund.** Alleen privétaken, persoonlijke Basic-plannen, recent geopende Meeting Plans en recent geopende gedeelde Basic-plannen.
- De agent kan **niet** bewerken: toewijzingen, checklists, bijlagen, labels, My Day, en bestaande taaknotities.
- **Verwijderen en ongedaan maken worden niet ondersteund.**
- Planselectie is beperkt tot recent geopende plannen.

Bron: [Microsoft Support, Planner agent limitations](https://support.microsoft.com/en-us/planner/planner-agent-limitation), geraadpleegd 25 juli 2026.

**De conclusie die hieruit volgt.** Precies de functies die planning tot planning maken — afhankelijkheden, basislijnen, het kritieke pad, resourcetoewijzing — zitten in de Premium-plannen, en dáár werkt de agent niet. Microsoft's "AI in planning" is op dit moment **taakbeheerassistentie, geen planningsassistentie**. Dat Microsoft er wel $30 per stoel per maand voor vraagt, terwijl het CPM-gedeelte buiten bereik blijft, is de scherpste illustratie van de kloof tussen prijs en geleverde planningsfunctionaliteit die ik in dit onderzoek ben tegengekomen.

---

### 4.6 Oracle — AI in Primavera Cloud

**Prijs (klasse B — de enige harde lijstprijs voor professionele planningssoftware die ik heb gevonden).** Uit het prijsdocument bij het Britse overheidsraamcontract G-Cloud 14, opgesteld door reseller RPC, gedateerd **mei 2024**:

| Product | APN | Lijstprijs per hosted named user per maand | Minimum |
|---|---|---|---|
| Oracle Primavera **Schedule** Cloud Service (incl. Task- en Progress-modules) | B108055 | **£96** | 5 gebruikers |
| Oracle Primavera Task Management Cloud Service | B108057 | £44 | 5 |
| Oracle Primavera Progress Cloud Service | B108058 | £10 | 5 |
| Oracle Primavera Portfolio Planning Cloud Service | B108056 | £176 | 5 |

Volumekortingen: 10% (101-200 gebruikers), 15% (201-500), 20% (501-1.000), 25% (1.001+). Bij 1.001+ gebruikers daalt Schedule naar £72 per gebruiker per maand.
Bron: [G-Cloud 14 prijsdocument, Oracle Primavera Cloud Service, mei 2024](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/701912/892787069272458-pricing-document-2024-05-06-0831.pdf).

**Het belangrijkste aan deze prijslijst is wat er níét in staat: er is geen AI-SKU.** Vier producten, vier prijzen, geen enkele AI-regel. Oracle monetiseert AI in Primavera per mei 2024 dus **niet** apart.

Ter historische vergelijking, uit de Oracle Construction & Engineering Global Price List (Texas DIR-versie, 10 november 2016): Primavera P6 EPPM $2.750 per Application User eeuwigdurende licentie plus $605 jaarlijkse support; P6 Professional $2.500/$550; P6 EPPM Cloud Service $125 per hosted named user per maand bij minimaal 25 gebruikers ([Oracle prijslijst, 10 november 2016](https://www.oracle.com/us/corporate/pricing/primavera-pricelist-tx-3673322.pdf), voor zover leesbaar uit de PDF-extractie).

**Wat Oracle's AI daadwerkelijk is.** Oracle Construction and Engineering Intelligence bestaat uit twee toepassingen: Analytics (dashboards over P6 EPPM, Unifier, Aconex en Primavera Cloud, met natuurlijke-taalvragen en AI-gegenereerde narratieven) en **Advisor for Safety** (wekelijkse risicoprognoses voor veiligheidsincidenten op basis van decennia aan bouwdata) ([oracle.com/construction-engineering/intelligence](https://www.oracle.com/construction-engineering/intelligence/), geraadpleegd 25 juli 2026). Er staan geen gekwantificeerde claims en geen prijzen op.

De meest recente AI-aankondiging (14 april 2026) betreft **Primavera Unifier**, Oracle Integration en de Safety Advisor: AI-gestuurde workflows, samenvattingen van processen, issues en wijzigingsopdrachten. **Planning/CPM komt in de aankondiging niet voor** ([PR Newswire, 14 april 2026](https://www.prnewswire.com/news-releases/oracle-ai-enables-more-connected-compliant-capital-projects-302741064.html)).

De productpagina van Primavera Cloud zegt uitsluitend dat het platform "powered by Oracle's industry-leading cloud services, integration, and AI technology" is, zonder één concrete AI-functie te noemen ([oracle.com/construction-engineering/primavera-cloud](https://www.oracle.com/construction-engineering/primavera-cloud/), geraadpleegd 25 juli 2026).

**De praktijkcheck.** Een Oracle-implementatiepartner schreef in september 2025 dat de huidige AI zich richt op veiligheid en dat planning-AI nog op de rol staat — "plans for the next release" — en waarschuwt dat organisaties eerst hun data moeten standaardiseren ("uniformly formatted and consistently maintained") en dat maatwerkontwikkeling vaak nodig is bovenop de standaardmogelijkheden ([Project Partners, 18 september 2025](https://www.projectp.com/ppblog/2025/09/18/using-ai-to-unlock-your-project-controls-in-primavera/)).

**Oordeel.** Oracle's "AI in Primavera" is per medio 2026 grotendeels **positionering**. De concrete, leverbare AI zit in veiligheid en documentsamenvatting — niet in het genereren of optimaliseren van planningen. Voor de marktvraag "wat vragen ze ervoor" is het antwoord: **niets extra**, want het is geen apart product.

---

### 4.7 Deltek Dela

**Wat het is.** Dela is Deltek's **paraplumerk** voor alle AI-functionaliteit, gepositioneerd als "AI-orkestrator". Vier functies: contentgeneratie/samenvatting, intelligente verkenning (digitale assistent), voorspellende analyse en taakautomatisering. Beschikbaar in Costpoint, Vantagepoint, GovWin IQ en Replicon ([deltek.com/en/dela](https://www.deltek.com/en/dela), geraadpleegd 25 juli 2026).

**Prijsmodel (klasse D/E).** Deltek is hierin ongebruikelijk transparant: veel functies zitten **ingebouwd in de bestaande licentie**, sommige worden apart berekend (bijvoorbeeld Replicon Zero Time). GovWin IQ Smart Summaries en de digitale assistent in Costpoint/Vantagepoint zijn bij de productlicentie inbegrepen.

**De aankondigingen van november 2025.** Drie nieuwe Dela-mogelijkheden: Deltek Proposals (claim: 60-70% minder tijd voor het opstellen van offertes, "op basis van interne benchmarks"), PPM Enterprise Risk, en Agentic Financial Close. Deltek bedient naar eigen zeggen 30.000 organisaties ([PR Newswire, 12 november 2025](https://www.prnewswire.com/news-releases/deltek-unveils-intelligent-platform-innovations-that-elevate-the-project-lifecycle-302612413.html)).

**Oordeel voor dit thema: Dela is voor planning niet relevant.** Geen van de aangekondigde mogelijkheden raakt CPM-planning, netwerklogica of resourceplanning. De "60-70%"-claim betreft offertes en is bovendien gebaseerd op niet-gepubliceerde interne benchmarks (klasse E). Deltek is opgenomen in dit rapport omdat de opdracht erom vroeg; de bevinding is dat het bedrijf zijn AI elders inzet.

---

### 4.8 Start-ups en aangrenzende spelers

De AI-investeringen in de bouw gaan grotendeels **niet** naar planning. Het grootste recente bedrag in het aangrenzende veld:

| Bedrijf | Bedrag | Datum | Lead | Domein |
|---|---|---|---|---|
| Trunk Tools | $40M Series B | juli 2025 | Insight Partners | AI-agents op projectdocumentatie (niet CPM) |
| nPlan | $16M Series B | 17 okt 2025 | CapHorn | Planningsvoorspelling |
| Nodes & Links | $12M | 18 feb 2025 | ETF Partners | Planningsintelligentie |
| ALICE Technologies | $47M Series B (totaal) | apr 2023 | Vanedge (2022) | Generatieve planning |

Bronnen: [Trunk Tools/Insight Partners, juli 2025](https://www.insightpartners.com/ideas/trunk-tools-closes-40m-series-b-construction-ai-transformation/); overige zoals hierboven.

> ⚠️ **Trunk Tools-bron is dood.** De geciteerde Insight-Partners-URL geeft bij hercontrole **HTTP 404** (met en zonder afsluitende slash). Het bedrag van $40M en de rol van Insight Partners als lead konden daardoor **niet onafhankelijk worden bevestigd**; trunktools.com noemt zelf geen financieringsbedrag. Wat wél is bevestigd, is de kwalificatie waar het argument in deze sectie op rust: Trunk Tools is een documentproduct (agents op specs, RFI's, submittals, tekeningen, contracten) en doet **geen CPM-planning** — de productpagina noemt CPM nergens. De vergelijking "$40M tegenover $28M" moet dus met het bedrag zelf als *onbevestigd* worden gelezen.

**Observatie.** Trunk Tools haalde in één ronde meer op ($40M) dan nPlan en Nodes & Links in 2025 samen ($28M) — voor een product dat geen planningen berekent maar documenten doorzoekbaar maakt. *[Eigen schatting]* Dat suggereert dat investeerders de LLM-op-documenten-categorie op dit moment aantrekkelijker vinden dan planningsoptimalisatie. Een plausibele verklaring is dat documentzoeken een breder inzetbaar product is met een kortere verkoopcyclus, terwijl planningsoptimalisatie een klein aantal specialisten per project bedient en tegen diepgewortelde P6-processen moet opboksen.

---

## 5. Wat werkt aantoonbaar, wat is marketing

| Claim | Bron | Klasse | Oordeel |
|---|---|---|---|
| Duurverdelingen voorspellen is 1,6-14× nauwkeuriger dan naïeve PERT/log-normaal | nPlan white paper, maart 2023 | C | **Aantoonbaar**, mits men beseft dat de vergelijkingsbasis zwak is |
| AI-SRA is in productie op megaprojecten | AACE RISK-4435, 2024 | C | **Aantoonbaar, maar zeer klein**: 5 projecten, 18 professionals |
| Planningskwaliteits- en logicacontrole werkt | Nodes & Links, InEight, DCMA-14 | C/E | **Aantoonbaar** — maar dit is deterministisch, geen AI |
| LLM's kunnen planningsdata bevragen in natuurlijke taal | Microsoft, Oracle CEI, ALICE, N&L | B/E | **Werkt**, maar raakt CPM niet aan |
| "17% kortere doorlooptijd" (ALICE) | Leverancierssite | E | **Marketing** — geen methode, steekproef of controlegroep |
| "Tot 20% versnelling over 35+ klanten" | McKinsey, apr 2026 | E | **Marketing** — belanghebbende partij, geen verificatie |
| "$127 miljard aan projecten" (ALICE) | Leverancierssite | E | **Bereikcijfer gepresenteerd als prestatiecijfer** |
| "$1,2 miljard bespaard" (nPlan) | Persbericht okt 2025 | D/E | **Onverifieerbaar** — geen berekeningswijze gepubliceerd |
| "AI in Primavera Cloud" voor planning | Oracle | E | **Nog niet geleverd** per sept 2025-praktijkbron |
| "Deltek Dela voor de projectlevenscyclus" | Deltek | D | **Niet van toepassing op planning** |
| Copilot doet planning in Microsoft Planner | Microsoft support | A | **Weerlegd door Microsoft zelf**: Premium-plannen niet ondersteund |
| RL verslaat klassieke heuristieken voor RCPSP | ICTAI 2025 / arXiv | C | **Aantoonbaar op benchmarks**, nul productie-implementaties |

**De scherpste bevinding.** De twee claims die het vaakst worden herhaald (ALICE's 17% en McKinsey's 20%) zijn het slechtst onderbouwd, terwijl de best onderbouwde claim (nPlan's voorspellingsnauwkeurigheid) bescheidener is en van een bedrijf komt dat in 2024 40% van zijn personeel verloor. Bewijskwaliteit en marktaandacht bewegen in deze markt omgekeerd evenredig.

---

## 6. Prijsstelling en betalingsbereidheid

### 6.1 Wat er daadwerkelijk gevraagd wordt

| Leverancier | Prijstransparantie | Bedrag | AI apart beprijsd? |
|---|---|---|---|
| **Microsoft** | Volledig publiek | Plan 1 $10; Plan 3 $30; Copilot **+$30** | **Ja — 100% premie** |
| **Oracle** | Via aanbestedingsdocument | Schedule £96/gebr./mnd (min. 5) | **Nee — geen AI-SKU** |
| **InEight** | Geen bedragen | "InEight NOW" per gebruiker | Niet vermeld |
| **ALICE** | Geen bedragen | Enterprise; projecten ≥$75M; onbeperkt gebruikers | n.v.t. (AI *is* het product) |
| **nPlan** | Geen bedragen | Onbekend | n.v.t. (AI *is* het product) |
| **Nodes & Links** | Geen bedragen; gratis proefversie | Onbekend | n.v.t. |
| **Deltek** | Geen bedragen | Grotendeels inbegrepen in licentie | Deels |

### 6.2 Het bredere patroon in softwareprijzen

Twee onafhankelijke adviesbureaus hebben dit in 2025 gekwantificeerd:

**BCG (13 augustus 2025)**, met verwijzing naar een ICONIQ Capital-enquête:
- **68% van de leveranciers** brengt AI-verbeteringen apart in rekening of plaatst ze uitsluitend in premium-tiers.
- **40% van de kopers** noemt het terugbrengen van het aantal licenties als hun belangrijkste middel om softwarekosten te verlagen.
- **91% van de IT-kopers** heeft alleen belangstelling voor gedeeltelijk autonome agents, niet voor volledige vervanging.
- Bij outcome-based prijzen: 47% van de kopers worstelt met het definiëren van meetbare uitkomsten, 36% met kostenvoorspelbaarheid, 24% erkent dat uitkomsten van oncontroleerbare factoren afhangen.
Bron: [BCG, *Rethinking B2B Software Pricing in the Era of AI*, 13 augustus 2025](https://www.bcg.com/publications/2025/rethinking-b2b-software-pricing-in-the-era-of-ai).

> ⚠️ **Niet geverifieerd.** Bij de controleronde gaf bcg.com **HTTP 403** op zowel de fetch-tool als een directe `curl` met browser-user-agent. Geen van deze vier percentages kon dus tegen de primaire tekst worden gehouden, en de onderliggende ICONIQ-enquête (steekproefomvang, populatie, vraagstelling) evenmin. Behandel 68%, 40%, 91% en de outcome-based-cijfers als **onbevestigd**. Dat raakt drie plaatsen in dit rapport waar ze dragend zijn: conclusie 2 in sectie 6.3, de interpretatie in sectie 8.2 en het argument in sectie 11.4. Waar het rapport "91% van kopers wil alleen gedeeltelijk autonome agents" gebruikt als onderbouwing, staat er in feite een niet-controleerbaar adviesbureaucijfer.

**Bain (9 oktober 2025)**, op basis van 30+ SaaS-leveranciers die generatieve AI introduceerden:
- **35%** verhoogde de prijs per licentie en bundelde AI in bestaande tiers.
- **65%** koos een hybride model: AI-verbruiksmeting bovenop licentieprijzen.
- **0%** monetiseert AI uitsluitend als losse add-on.
- **0%** is volledig overgestapt op verbruiks- of uitkomstgebaseerde prijzen.
Bron: [Bain, *Per-Seat Software Pricing Isn't Dead*, 9 oktober 2025](https://www.bain.com/insights/per-seat-software-pricing-isnt-dead-but-new-models-are-gaining-steam/).

### 6.3 Wat dit betekent voor planningssoftware

**Drie conclusies.**

1. **De betalingsbereidheid voor AI is reëel maar zit bij de platformen, niet bij de specialisten.** Microsoft kan $30 per stoel vragen bovenop $30 omdat de AI in de hele Microsoft 365-omgeving werkt. Een specialist die alleen planningsrisico voorspelt, moet die premie uit één use-case terugverdienen bij een handvol planners per project. De personeelscijfers van nPlan en Nodes & Links suggereren dat dat moeilijk is.

2. **De 40%-bevinding van BCG is een direct gevaar voor per-licentie-prijzen in planning.** Als kopers hun belangrijkste besparingsmiddel zien in minder licenties, en AI wordt verkocht als iets dat mensen productiever maakt, dan financiert de koper de AI-premie uit het schrappen van stoelen. Bij planningsteams — die per project uit een handvol mensen bestaan — is die rekensom ongunstig voor de leverancier: er valt weinig te schrappen.

3. **Oracle's ontbrekende AI-SKU is strategisch veelzeggend.** *[Eigen schatting]* Oracle prijst AI in Primavera niet apart omdat het (a) nog geen leverbare planning-AI heeft en (b) £96 per gebruiker per maand voor Schedule al een hoog prijspunt is waar weinig ruimte boven zit. Redenering: Oracle's prijs ligt al ruim boven Microsoft's $30 Project Plan 3 en zelfs boven $30+$30 gecombineerd; een AI-premie daarbovenop zou de vergelijking met alternatieven ongunstig maken. Ik heb hiervoor geen bevestigende bron.

**Onbeantwoorde vraag.** Ik heb geen enkele publieke bron gevonden die zegt wat een organisatie daadwerkelijk betaalt voor ALICE, nPlan of Nodes & Links. Zonder die cijfers kan niemand — ook geen analist — een onderbouwde uitspraak doen over de prijselasticiteit in dit segment. Elke gepubliceerde marktomvangschatting voor "AI in bouwplanning" die ik ben tegengekomen, moet dus op ramingen berusten.

---

## 7. Adoptie: wat er echt draait

### 7.1 Het harde bewijs

De enige gedetailleerde, methodisch beschreven adoptiebron is nPlan's eigen AACE-paper (2024), en die is opvallend bescheiden:

- **5 megaprojecten**, spoor en olie & gas, gestart in 2022, projectwaarden £60M-£10B.
- **18 project controls-professionals** in de uitgewerkte Britse spoorcasus.
- **Een jaar parallel draaien** met de traditionele QSRA voordat werd overgestapt.
- Letterlijk: *"only a few mega-projects have introduced it into their risk management procedures."*

Bron: [AACE RISK-4435, 2024](https://discover.nplan.io/hubfs/Research%20papers/AACE%20RISK%204435%20Technical%20Paper%20-%202024.pdf).

Voor ALICE zijn de concreetste publieke adoptiepunten: Skanska Costain STRABAG JV op HS2 (2024), Zachry Construction (januari 2025), NGE (januari 2025), Implenia (2024), en "35+ klanten" via het McKinsey-kanaal (april 2026) ([ALICE nieuws](https://blog.alicetechnologies.com/news); [McKinsey, 14 april 2026](https://www.mckinsey.com/capabilities/operations/our-insights/operations-blog/mckinsey-and-alice-technologies-collaborate-to-transform-capital-project-delivery-with-generative-scheduling)).

### 7.2 De drie adoptiebarrières (uit primair bronmateriaal)

Het AACE-paper identificeert ze expliciet:
1. **Gebrek aan vertrouwen in AI-modellen.** Opgelost door eerst de directie te overtuigen ("Kan het werken? Werkt het?"), daarna de planners via ambassadeurs.
2. **De niet-intuïtieve aard van de resultaten.** Opgelost met specifieke visualisaties (driving paths, mitigatie-impact).
3. **Afwijking van beproefde processen.** Opgelost door een jaar lang parallel te draaien.

Daar komt uit een onafhankelijke praktijkbron een vierde bij: **datakwaliteit**. Organisaties moeten hun data eerst standaardiseren en "uniformly formatted and consistently maintained" houden voordat AI iets oplevert ([Project Partners, 18 september 2025](https://www.projectp.com/ppblog/2025/09/18/using-ai-to-unlock-your-project-controls-in-primavera/)).

### 7.3 De bredere context

- **KPMG Global Construction Survey 2025/2026**: 375 leidinggevenden uit engineering, bouw en vastgoed, verzameld begin 2025. 71% is optimistisch over de richting van de sector (2023: 66%). De publiek toegankelijke samenvatting bevat **geen AI-adoptiecijfers** ([KPMG, maart 2026](https://kpmg.com/cn/en/insights/2026/03/global-construction-survey-2025-2026.html)).
- **McKinsey State of AI (2025)**: 88% van de organisaties gebruikt AI in ten minste één functie (2024: 78%), maar de meeste blijven in de pilotfase steken en slechts een minderheid kan enige impact aantonen ([McKinsey](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-how-organizations-are-rewiring-to-capture-value)).

**Synthese.** *[Eigen schatting]* Het aantal grote bouwprojecten wereldwijd waarop AI-gedreven planning of planningsrisicoanalyse als **productieproces** draait — niet als pilot — ligt vermoedelijk in de **lage honderdtallen**, niet in de duizenden. Redenering: nPlan documenteert 5 megaprojecten in 2024 en claimt "$500 miljard aan projecten in beheer"; ALICE claimt 35+ klanten via McKinsey plus een eigen klantenbestand; Nodes & Links noemt 30+ klantlogo's. Bij enkele tot enkele tientallen projecten per klant komt men op honderden, niet duizenden. De gezamenlijke personeelsomvang van de drie specialisten (circa 53 bij de twee Britse bedrijven waarvan cijfers bekend zijn) maakt het onderhouden van duizenden actieve implementaties bovendien praktisch onmogelijk. **Dit is een schatting; er bestaat geen publieke telling.**

---

## 8. Onderzoeksrichtingen

### 8.1 Reinforcement learning voor scheduling

De academische stand van zaken is degelijk maar ver van productie.

**Recentste representatieve werk.** Infantes, Roussel, Jacquet en Benazera, *Learning to Solve Resource-Constrained Project Scheduling Problems with Uncertain Task Durations*, ingediend 17 november 2025, geaccepteerd voor ICTAI 2025 ([arXiv:2511.13214](https://arxiv.org/abs/2511.13214)). Methode: Graph Neural Networks gecombineerd met deep reinforcement learning om een prioriteitsregel te leren, toegepast via een Serial Schedule Generation Scheme — functioneel dus een geleerde variant van een klassieke prioriteitsregel. Doel: minimaliseren van de verwachte projectduur bij stochastische activiteitsduren.

De auteurs publiceerden het raamwerk **Wheatley** als open source: PPO + GNN voor JSSP en RCPSP, met een bijbehorend CPAIOR 2024-paper. Het project heeft **83 sterren en 21 forks** met 455 commits ([github.com/jolibrain/wheatley](https://github.com/jolibrain/wheatley), geraadpleegd 25 juli 2026).

**Kritische observatie.** De abstract claimt "superioriteit qua prestaties en generalisatievermogen" maar noemt geen concrete getallen ten opzichte van klassieke heuristieken. Dat is typerend voor dit vakgebied: de winst wordt doorgaans gemeten op PSPLIB-achtige benchmarks met enkele tientallen tot 120 activiteiten, terwijl een echt bouwproject 80.000 activiteiten kan tellen (zie InEight/Pattern Energy). **De schaalkloof tussen RL-onderzoek en bouwpraktijk bedraagt twee tot drie ordes van grootte.**

**Het open-source ecosysteem is dun.** Een zoektocht op GitHub naar RCPSP-projecten levert overwegend kleine academische repositories op: MEHH_RCPSP (29 sterren), py-rcpsp (24), RG-RRD (17, GNN+RL), QPSO_RCPSP (16), MPRJ_RCPSP (14, Pyomo). De grootste relevante bibliotheek is ALNS (Adaptive Large Neighbourhood Search, 645 sterren), een generieke metaheuristiek die RCPSP als één van vele toepassingen noemt. **Er bestaat geen productiewaardige open-source generatieve planner.**

### 8.2 LLM-assistentie

**De capaciteitsvraag is empirisch beantwoord, en het antwoord is "nog niet goed genoeg".** De CEQuest-benchmark toetst LLM's op bouwkundige tekeninginterpretatie en calculatie over vijf deelgebieden (algemene bouwkennis, elementherkenning, tekeningorganisatie, ruimtelijk redeneren en kruisverwijzing, hoeveelheden en calculatie):

| Model | Nauwkeurigheid |
|---|---|
| GPT-4.1 | **75,37% ± 1,13%** |
| Llama 3.3 (70B) | 65,37% ± 0,60% |
| Phi4 (14B) | 64,02% ± 0,55% |
| LLaVA (34B) | 62,56% ± 1,06% |
| Gemma 3 (4B) | 61,83% ± 0,30% |

De auteurs concluderen dat er "substantial room for performance improvement" is — alle modellen blijven onder 80% op wat zij zelf "a relatively straightforward multi-choice dataset" noemen — en geven een treffend voorbeeld van domeinonwetendheid: de meeste modellen rondden 5,33 kubieke yard beton af naar 5, terwijl in de calculatiepraktijk naar **boven** wordt afgerond om voldoende materiaal te bestellen.
Bron: [CEQuest, arXiv:2508.16081](https://arxiv.org/html/2508.16081v1).

*Kritische noot bij deze cijfers (toegevoegd na verificatie):* CEQuest bestaat uit **164 meerkeuzevragen**. Bij die omvang is een verschil van enkele procentpunten tussen modellen niet betekenisvol, en het is geen maat voor planningsvermogen — het meet tekeninginterpretatie en calculatie. De getallen zijn exact zoals gepubliceerd, maar dragen minder gewicht dan hun drie decimalen suggereren. Het rapport gebruikte eerder de parafrase "considerable room for improvement"; de gepubliceerde formulering is hierboven overgenomen.

*Interpretatie:* 75% correct is te weinig voor autonome inzet in een contractueel bindende planning, maar ruim voldoende voor een assistent die suggesties doet die een planner controleert. Dat sluit precies aan bij de 91% van IT-kopers die volgens BCG alleen **gedeeltelijk** autonome agents willen.

**Het planningsvermogen zelf.** De overzichtsstudie *PlanGenLLMs: A Modern Survey of LLM Planning Capabilities* (ingediend 16 februari 2025, herzien 23 juni 2025) beoordeelt LLM-planners op zes criteria: volledigheid, uitvoerbaarheid, optimaliteit, representatie, generalisatie en efficiëntie ([arXiv:2502.11221](https://arxiv.org/abs/2502.11221)). De constatering dat veel systemen "tailored to specific problems" zijn, wijst op beperkte generalisatie.

**De architecturale conclusie die de markt al heeft getrokken.** Nodes & Links noemt zijn aanpak expliciet "hallucination-proof" met antwoorden die herleidbaar zijn tot "fully auditable models compatible with P6 principles". Dat is de juiste architectuur: **de LLM raakt de rekenkern niet aan**. Optimaliteit en uitvoerbaarheid komen van een deterministische CPM-/optimalisatiemotor; de LLM doet alleen vertaling tussen mens en model. Elke leverancier die claimt dat een LLM de planning *berekent*, verkoopt iets dat volgens de gepubliceerde benchmarks niet betrouwbaar kan.

---

## 9. Expliciete onzekerheden

Dit hoort in elk marktrapport te staan en wordt zelden opgeschreven. Wat ik **niet** weet:

1. **Omzet van geen enkele specialist.** nPlan en Nodes & Links deponeren geen W&V-rekening; ALICE is een Amerikaanse private vennootschap zonder depotplicht. Alle uitspraken over hun commerciële tractie in dit rapport zijn afgeleid uit balansposten.
2. **Werkelijk betaalde prijzen.** Alleen Microsoft en Oracle (via een aanbestedingsdocument) publiceren bedragen. Oracle's £96 is bovendien een lijstprijs; grote afnemers betalen vrijwel zeker minder dan de gepubliceerde volumekortingen suggereren.
3. **Of de gedaalde vooruitontvangen bedragen bij nPlan omzetdaling betekenen.** Een wijziging in factureringsritme geeft hetzelfde beeld. Ik acht omzetdaling waarschijnlijker gezien de gelijktijdige personeelskrimp van 40%, maar dit blijft interpretatie.
4. **Of ALICE nog kapitaal heeft opgehaald na april 2023.** Ik heb geen latere ronde gevonden, maar afwezigheid van bewijs is hier zwak bewijs: private rondes worden niet altijd aangekondigd.
5. **Wat Microsoft 365 Copilot Business ($18-21) versus M365 Copilot ($30) precies onderscheidt** ten aanzien van de Planner Agent.
6. **Analistenrapporten.** Gartner en IDC zitten achter een betaalmuur (Gartner gaf HTTP 403). De Gartner Magic Quadrant die ik wel geïndexeerd zag — *Adaptive Project Management and Reporting* (2025) — bevat Planview, monday.com, Atlassian, Asana en Planisware, **niet** Oracle Primavera, ALICE of nPlan. *[Eigen schatting]* Dat suggereert dat bouwspecifieke CPM-planning door Gartner niet als onderdeel van deze markt wordt gezien, wat het gebrek aan onafhankelijke analistendekking van dit segment verklaart. Ik kon de marktdefinitie niet inzien en markeer dit als onbevestigd.
7. **Onafhankelijke validatie van welke effectclaim dan ook.** Er bestaat, voor zover ik heb kunnen vaststellen, **geen enkele peer-reviewed, door derden uitgevoerde effectstudie** van generatieve planning of AI-planningsrisicoanalyse op bouwprojecten. Het AACE-paper komt van de leverancier; de McKinsey-cijfers van een commerciële partner.
8. **Zoekdekking.** Door limieten op de zoekinfrastructuur tijdens dit onderzoek kon ik de arXiv-API en enkele zoekmachines niet volledig benutten. De academische sectie steunt daardoor op een kleiner aantal papers dan ik had gewild; er kan recent werk zijn dat ik heb gemist.

---

## 10. Wat een koper hieruit zou moeten concluderen

Kort, omdat het volgt uit het voorgaande:

- **Voor risicoanalyse van grote projecten** is er echt bewijs dat ML-voorspelling beter presteert dan naïeve Monte Carlo. Reken op een jaar parallel draaien en drie vertrouwensbarrières, en op een leverancier die klein is.
- **Voor generatieve planning** is er veel belofte en weinig verifieerbaar bewijs. De projectdrempel van $75M bij ALICE is een eerlijke indicatie: onder die omvang verdient het zich niet terug.
- **Voor LLM-assistentie** geldt: koop het als productiviteitshulp voor tekst en taakbeheer, niet als planningsinstrument. Microsoft's eigen documentatie sluit Premium-plannen uit.
- **De grootste voorspeller van succes is datakwaliteit**, niet de leverancierskeuze. Dat is de enige bevinding waarover leveranciers, implementatiepartners en het AACE-paper het eens zijn.

---

## 11. Betekenis voor een open-source, IFC-gebaseerde planner (Open Planner Studio)

Deze sectie vertaalt het bovenstaande naar de positie van Open Planner Studio: een LGPL-3.0 Tauri 2/React-desktopapplicatie met een browserbuild, waarin IFC 4.3 het native bestandsformaat is en de planning door een eigen `CPMSolver` en `CalendarEngine` wordt berekend.

### 11.1 De belangrijkste structurele bevinding: IFC draagt de volledige planningspayload al

Dit is geen detail maar het fundament van de strategische positie. IFC 4.3 definieert in `IfcTaskTime` normatief onder meer:

- `ScheduleStart`, `ScheduleFinish`, `ScheduleDuration`, `DurationType`
- `EarlyStart`, `EarlyFinish`, `LateStart`, `LateFinish` (expliciet als berekende waarden)
- `FreeFloat` — *"The amount of time during which the start or finish of a task may be varied without any effect on the overall programme of work."*
- `TotalFloat`
- `IsCritical` — *"A flag which identifies whether a scheduled task is a critical item within the programme."* **Let op:** de norm definieert dit als een vlag, niet als een afgeleide van de speling. IFC schrijft nergens voor dat `IsCritical` gelijk is aan "nul of negatieve speling" — die interpretatie is een conventie van de rekenkern, niet van het schema. Een eerdere versie van deze sectie stelde dat wél als normeis; dat is gecorrigeerd.
- `ActualStart`, `ActualFinish`, `ActualDuration`, `RemainingTime`, `StatusTime`, `Completion`

`IfcWorkSchedule` draagt daarnaast `StartTime`, `FinishTime`, `Duration`, `TotalFloat`, `Creators` en `Purpose`, met taakhiërarchie via `IfcRelNests`.
Bronnen: [IfcTaskTime, IFC 4.3.2](https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcTaskTime.htm) en [IfcWorkSchedule, IFC 4.3.2](https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcWorkSchedule.htm), geraadpleegd 25 juli 2026.

**Waarom dit ertoe doet.** De hele AI-planningsmarkt draait om **P6/XER** als uitwisselformaat. ALICE analyseert "BIM-modellen en Oracle P6-planningen"; Nodes & Links noemt "P6-principes"; nPlan traint op P6-planningen. Dat is een de-facto standaard rond een eigendomsformaat van één leverancier. IFC is een ISO-genormeerd, open alternatief dat aantoonbaar dezelfde CPM-semantiek kan dragen — inclusief het kritieke pad en beide soorten speling.

De strategische consequentie: Open Planner Studio hoeft niet te concurreren op AI. Het concurreert op **de vraag wie eigenaar is van het formaat waarin planningsdata leeft**. Dat is een duurzamer differentiatie dan welke modelscore ook, en het is precies de laag waar geen van de onderzochte leveranciers iets aan doet.

### 11.2 Wat níét te bouwen

Het onderzoek geeft drie duidelijke negatieve adviezen:

1. **Geen generatieve planner bouwen.** ALICE heeft $47M opgehaald en werkt sinds 2013 aan dit probleem; het open-source ecosysteem biedt uitsluitend academische RCPSP-repositories van 15-30 sterren. De schaalkloof tussen RL-onderzoek (tientallen activiteiten op PSPLIB) en bouwpraktijk (80.000 activiteiten) is twee tot drie ordes van grootte. Dit is geen haalbaar zijproject.

2. **Geen eigen voorspellingsmodel bouwen.** nPlan's waarde ligt volledig in een corpus van honderdduizenden historische planningen. Dat is een datamonopolie dat een open-source project niet kan repliceren en ook niet zou moeten willen kopiëren.

3. **Geen AI verkopen.** Bain constateert dat 0% van de gevestigde SaaS-leveranciers AI uitsluitend als losse add-on monetiseert en dat 65% hybride meterprijzen hanteert. Een LGPL-project met een gratis browserbuild heeft geen positie in die beweging — en heeft die ook niet nodig.

### 11.3 Waar de reële kans ligt: planningskwaliteit als deterministische functie

**Dit is de belangrijkste aanbeveling van dit rapport.**

Kijk naar wat de leveranciers werkelijk verkopen onder het AI-etiket. Nodes & Links scant continu op "stale logic, broken links, and quality issues" en noemt dat hallucinatiebestendig omdat het herleidbaar is tot de brondata. InEight ondersteunt de DCMA 14-punts-toets. Dat zijn **regelgebaseerde controles op de netwerklogica** — geen machine learning. Ze worden als AI verkocht omdat dat verkoopt.

Open Planner Studio heeft alles wat daarvoor nodig is al in huis: een echte CPM-solver, een kalendermotor, een IFC-model met volledige taakrelaties, en een regressiesuite van 395 cases over 21 batterijen die de correctheid van juist die kern bewaakt. Een pakket planningskwaliteitscontroles — ontbrekende relaties, open einden, negatieve lag, buitensporige lead, taken zonder voorganger of opvolger, onlogische constraints, gemiste voortgangsdata, speling-uitschieters — is:

- **volledig deterministisch** en dus uitlegbaar en testbaar in de bestaande suite;
- **onafhankelijk van een datamonopolie**;
- **precies waar het AACE-paper en de Oracle-implementatiepartner het over eens zijn**: datakwaliteit is de bepalende factor, niet het model;
- **een functie waarvoor de markt vandaag geld vraagt** onder een AI-label.

Bijkomend voordeel: elke kwaliteitscontrole die de gebruiker uitvoert, verbetert het IFC-bestand dat het project verlaat. Dat versterkt de formaatpositie uit 11.1.

### 11.4 LLM-assistentie: wél doen, maar via het extensiesysteem

Voor natuurlijke-taalassistentie geldt het omgekeerde: die is goedkoop toe te voegen, gebruikers verwachten het inmiddels, en de benchmarks laten zien dat het bruikbaar is zolang de mens controleert (GPT-4.1 op 75% in het bouwdomein; 91% van kopers wil alleen gedeeltelijk autonome agents).

De architectuur die het onderzoek voorschrijft is helder en komt overeen met wat Nodes & Links doet: **de LLM raakt de rekenkern nooit aan.** Hij vertaalt tussen mens en model — taken aanmaken uit een beschrijving, een planning samenvatten, uitleggen waarom een taak op het kritieke pad ligt — terwijl `CPMSolver` de enige bron van waarheid blijft voor data, speling en kritiek pad.

Het bestaande extensiesysteem is hiervoor de juiste plek, en wel om redenen die het onderzoek onderstreept:

- De applicatie hoeft **geen model, API-sleutel of netwerkafhankelijkheid** mee te leveren; de gebruiker brengt zijn eigen sleutel mee. Dat past bij een LGPL-project en bij de browserbuild.
- Het permissiemodel (`ribbon`, `events`) dwingt af dat een AI-extensie niet ongemerkt bij projectdata kan.
- De keuze blijft bij de gebruiker — belangrijk in een markt waar 40% van de kopers actief softwarekosten wil terugdringen.
- Extensies zijn app-niveau data en hebben geen IFC-round-trip-impact, dus de kernbelofte "alles wat je toevoegt overleeft opslaan en herladen" blijft intact.

### 11.5 De prijsimplicatie

Het patroon in sectie 6 is voor open source uitgesproken gunstig. De betaalde laag schuift **omhoog**, naar AI: Microsoft rekent $30 voor de Copilot-laag bovenop $30 voor de planningsfunctionaliteit. Daarmee wordt de deterministische CPM-kern impliciet gepositioneerd als de commodity-onderlaag.

Dat is exact de laag waarin Open Planner Studio uitstekend kan zijn. De strategische conclusie is dus niet "wij moeten ook AI hebben", maar: **de markt maakt de CPM-kern gratis; zorg dat de beste gratis CPM-kern de jouwe is, met IFC als formaat en planningskwaliteit als zichtbare meerwaarde.**

### 11.6 Concrete prioriteitsvolgorde

Afgeleid uit het bovenstaande, in volgorde van verwachte waarde per eenheid inspanning:

1. **Planningskwaliteits-/logica-integriteitscontroles** (deterministisch, testbaar in de bestaande suite, verkoopbaar concept, geen datamonopolie nodig). Hoogste prioriteit.
2. **IFC-round-trip-volledigheid voor de CPM-velden** — `EarlyStart`/`LateFinish`/`FreeFloat`/`TotalFloat`/`IsCritical` gegarandeerd behouden. Dit is de basis van de formaatpositie; zonder dit werkt punt 1 alleen binnen de applicatie.
3. **Wat-als-scenario's op de bestaande solver** (kalenderwijziging, duurwijziging, relatiewijziging → herberekening en verschilweergave). Levert een groot deel van de waarde van "optionering" zonder een optimalisatiemotor te bouwen.
4. **LLM-assistentie als extensie**, met eigen sleutel, strikt buiten de rekenkern.
5. **Resource-levelling** — nuttig, maar aanzienlijk zwaarder en pas zinvol als 1-3 solide zijn.

**Wat expliciet niet op de lijst staat:** generatieve planningsoptimalisatie en een eigen voorspellingsmodel. Het onderzoek geeft geen enkele aanwijzing dat een open-source project daar iets kan neerzetten dat concurreert met partijen die daar $47M en tien jaar in hebben gestoken — en het geeft sterke aanwijzingen dat die partijen zelf nog worstelen om er een bedrijf van te maken.

---

## Bronnenlijst

**Klasse A — Gedeponeerde stukken en normteksten**
- [Companies House, NPLAN LIMITED (11043916), jaarrekening 2024](https://find-and-update.company-information.service.gov.uk/company/11043916/filing-history) — gedeponeerd 21 mei 2025
- [Companies House, NODES & LINKS LIMITED (11388602), jaarrekeningen 2023-2025](https://find-and-update.company-information.service.gov.uk/company/11388602/filing-history?category=accounts) — gedeponeerd 2 mei 2024, 8 mei 2025, 7 mei 2026
- [buildingSMART, IfcTaskTime, IFC 4.3.2](https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcTaskTime.htm)
- [buildingSMART, IfcWorkSchedule, IFC 4.3.2](https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcWorkSchedule.htm)
- [Microsoft Support, Planner agent limitations](https://support.microsoft.com/en-us/planner/planner-agent-limitation)

**Klasse B — Prijslijsten**
- [G-Cloud 14, Oracle Primavera Cloud Service prijsdocument, mei 2024](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/701912/892787069272458-pricing-document-2024-05-06-0831.pdf)
- [Oracle Construction & Engineering Global Price List (Texas DIR), 10 november 2016](https://www.oracle.com/us/corporate/pricing/primavera-pricelist-tx-3673322.pdf)
- [Microsoft Planner plans and pricing (VS)](https://www.microsoft.com/en-us/microsoft-365/planner/microsoft-planner-plans-and-pricing)
- [Microsoft Planner plans and pricing (CA)](https://www.microsoft.com/en-ca/microsoft-365/planner/microsoft-planner-plans-and-pricing)
- [Microsoft 365 Copilot Business](https://www.microsoft.com/en-us/microsoft-365/copilot/business)
- [InEight pricing overview](https://ineight.com/pricing-overview/)
- [ALICE pricing](https://www.alicetechnologies.com/pricing)

**Klasse C — Methodologisch onderbouwd**
- [nPlan, *Model Performance 101*, maart 2023](https://discover.nplan.io/hubfs/nPlan_Performance_Model_1.3.pdf)
- [AACE International Technical Paper RISK-4435, *Practical Implementation of AI-based risk management processes on construction megaprojects*, 2024](https://discover.nplan.io/hubfs/Research%20papers/AACE%20RISK%204435%20Technical%20Paper%20-%202024.pdf)
- [Infantes e.a., arXiv:2511.13214, ICTAI 2025](https://arxiv.org/abs/2511.13214)
- [CEQuest, arXiv:2508.16081](https://arxiv.org/html/2508.16081v1)
- [PlanGenLLMs, arXiv:2502.11221](https://arxiv.org/abs/2502.11221)
- [Wheatley (jolibrain), GitHub](https://github.com/jolibrain/wheatley)
- [BCG, *Rethinking B2B Software Pricing in the Era of AI*, 13 augustus 2025](https://www.bcg.com/publications/2025/rethinking-b2b-software-pricing-in-the-era-of-ai)
- [Bain, *Per-Seat Software Pricing Isn't Dead*, 9 oktober 2025](https://www.bain.com/insights/per-seat-software-pricing-isnt-dead-but-new-models-are-gaining-steam/)

**Klasse D — Persberichten en vakpers**
- [nPlan, $16M Series B, 17 oktober 2025](https://www.nplan.io/press-releases/nplan-raises-16m-series-b-to-scale-its-ai-led-transformation-of-capital-project-delivery)
- [ALICE Technologies, Series B naar $47M, 11 april 2023](https://www.prnewswire.com/news-releases/alice-technologies-extends-funding-series-b-round-to-access-47m-in-capital-301793474.html)
- [Nodes & Links, $12M, 18 februari 2025](https://nodeslinks.com/blog/nodes-links-raises-12m-to-transform-12t-construction-industry-with-ai/)
- [Trunk Tools, $40M Series B, juli 2025](https://www.insightpartners.com/ideas/trunk-tools-closes-40m-series-b-construction-ai-transformation/)
- [McKinsey en ALICE Technologies, 14 april 2026](https://www.mckinsey.com/capabilities/operations/our-insights/operations-blog/mckinsey-and-alice-technologies-collaborate-to-transform-capital-project-delivery-with-generative-scheduling)
- [Construction Dive, 15 april 2026](https://www.constructiondive.com/news/mckinsey-alice-technologies-partner-generative-ai-schedule/817580/)
- [Oracle, AI voor kapitaalprojecten, 14 april 2026](https://www.prnewswire.com/news-releases/oracle-ai-enables-more-connected-compliant-capital-projects-302741064.html)
- [Deltek, platforminnovaties, 12 november 2025](https://www.prnewswire.com/news-releases/deltek-unveils-intelligent-platform-innovations-that-elevate-the-project-lifecycle-302612413.html)
- [Project Partners, AI in Primavera, 18 september 2025](https://www.projectp.com/ppblog/2025/09/18/using-ai-to-unlock-your-project-controls-in-primavera/)
- [KPMG Global Construction Survey 2025/2026](https://kpmg.com/cn/en/insights/2026/03/global-construction-survey-2025-2026.html)
- [McKinsey, The State of AI](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-how-organizations-are-rewiring-to-capture-value)

**Klasse E — Leverancierssites (als bewering behandeld)**
- [alicetechnologies.com](https://www.alicetechnologies.com/) · [ALICE nieuws](https://blog.alicetechnologies.com/news)
- [nplan.io](https://www.nplan.io/) · [nPlan white papers](https://www.nplan.io/white-papers)
- [nodeslinks.com](https://nodeslinks.com/)
- [InEight Schedule](https://ineight.com/products/ineight-schedule/) · [InEight Practical AI Tools](https://ineight.com/products/ineight-schedule/practical-ai-tools/)
- [Oracle Primavera Cloud](https://www.oracle.com/construction-engineering/primavera-cloud/) · [Oracle CEI](https://www.oracle.com/construction-engineering/intelligence/)
- [Deltek Dela](https://www.deltek.com/en/dela)

---

## Verificatie

*Adversariële controle uitgevoerd 25 juli 2026. Opzet: de twaalf meest falsifieerbare beweringen uit dit rapport zijn geselecteerd en actief geprobeerd te **weerleggen** met de primaire bron — normtekst in plaats van samenvatting, gedeponeerde iXBRL in plaats van balanssamenvatting, prijsdocument in plaats van citaat. Alle doorgerekende schattingen zijn nagerekend.*

### Overzicht

| # | Bewering | Oordeel | Bron |
|---|---|---|---|
| 1 | IFC 4.3 `IfcTaskTime` draagt de volledige CPM-payload | **gecorrigeerd** (deels) | [buildingSMART IfcTaskTime](https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcTaskTime.htm) |
| 2 | `IfcWorkSchedule` draagt StartTime/FinishTime/Duration/TotalFloat/Creators/Purpose | **bevestigd** | [buildingSMART IfcWorkSchedule](https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcWorkSchedule.htm) |
| 3 | Microsoft: Plan 1 $10, Plan 3 $30, Copilot +$30 — "AI verdubbelt de stoelprijs" | **bevestigd**; licentie-afhankelijkheid **gecorrigeerd** | [MS Planner pricing](https://www.microsoft.com/en-us/microsoft-365/planner/microsoft-planner-plans-and-pricing) · [CA](https://www.microsoft.com/en-ca/microsoft-365/planner/microsoft-planner-plans-and-pricing) |
| 4 | Planner Agent ondersteunt geen Premium-plannen, geen verwijderen/ongedaan maken | **bevestigd** (woordelijk) | [MS Support](https://support.microsoft.com/en-us/planner/planner-agent-limitation) |
| 5 | Oracle G-Cloud 14: Schedule £96/gebr./mnd, min. 5, kortingen 10/15/20/25%, £72 bij 1.001+; **geen AI-SKU** | **bevestigd** (woordelijk) | [G-Cloud 14 prijsdocument, RPC, mei 2024](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/701912/892787069272458-pricing-document-2024-05-06-0831.pdf) |
| 6 | nPlan *Model Performance 101*: dataset, 70/30-split, alle metrieken uit tabel 1 en 2 | **bevestigd** (woordelijk); factorclaim **gecorrigeerd** | [nPlan white paper, maart 2023](https://discover.nplan.io/hubfs/nPlan_Performance_Model_1.3.pdf) |
| 7 | AACE RISK-4435: 5 megaprojecten, £60M-£10B, 18 professionals, jaar parallel, >$1bn scope, 12 werkdagen | **bevestigd** (woordelijk) | [AACE RISK-4435, 2024](https://discover.nplan.io/hubfs/Research%20papers/AACE%20RISK%204435%20Technical%20Paper%20-%202024.pdf) |
| 8 | nPlan jaarrekening 2024: alle balansposten, 34 vs 57 werknemers, deferred income −76% | **bevestigd** (primaire iXBRL); liquiditeitsberekening **verfijnd** | [Companies House 11043916](https://find-and-update.company-information.service.gov.uk/company/11043916/filing-history) |
| 9 | Nodes & Links jaarrekeningen 2023-2025: alle posten, 19/22/23 werknemers, vier dochters | **bevestigd** (primaire iXBRL); aard van de £4,56M **gecorrigeerd** | [Companies House 11388602](https://find-and-update.company-information.service.gov.uk/company/11388602/filing-history?category=accounts) |
| 10 | Financieringsrondes: ALICE $47M/apr-2023, nPlan $16M/17-okt-2025, N&L $12M/18-feb-2025 | **bevestigd**; Trunk Tools $40M **onzeker** | zie hieronder |
| 11 | ALICE 17%/14%/12%/$127B en drempel $75M; McKinsey "tot 20%", 35+ klanten, ~40% datacenter | **bevestigd** als *bewering* (klasse E blijft terecht) | [ALICE](https://www.alicetechnologies.com/) · [ALICE pricing](https://www.alicetechnologies.com/pricing) · [McKinsey, 14 apr 2026](https://www.mckinsey.com/capabilities/operations/our-insights/operations-blog/mckinsey-and-alice-technologies-collaborate-to-transform-capital-project-delivery-with-generative-scheduling) |
| 12 | BCG 68%/40%/91%; Bain 35%/65%/0%/0% | Bain **bevestigd**; BCG **onzeker** (bron ontoegankelijk) | [Bain, 9 okt 2025](https://www.bain.com/insights/per-seat-software-pricing-isnt-dead-but-new-models-are-gaining-steam/) · BCG: HTTP 403 |
| 13 | "Bijna een half miljard dollar durfkapitaal in AI voor planning" | **gecorrigeerd** — circa $115M | eigen optelling van de bronnen in dit rapport |
| 14 | CEQuest: GPT-4.1 75,37% ± 1,13% e.a. | **bevestigd**; steekproefcaveat toegevoegd | [arXiv:2508.16081](https://arxiv.org/html/2508.16081v1) |
| 15 | Wheatley: 83 sterren, 21 forks, 455 commits | sterren/forks **bevestigd**; commits **onzeker** | [github.com/jolibrain/wheatley](https://github.com/jolibrain/wheatley) (GitHub API, 25 juli 2026) |
| 16 | Oracle prijslijst 2016: P6 EPPM $2.750 + $605, P6 Pro $2.500/$550, Cloud $125 min. 25 | **onzeker** — bedragen aanwezig, koppeling niet verifieerbaar | [Oracle prijslijst, 10-NOV-2016](https://www.oracle.com/us/corporate/pricing/primavera-pricelist-tx-3673322.pdf) |

### Toelichting per bevinding

**1 — `IfcTaskTime` (gecorrigeerd).** De attributenlijst klopt volledig: `DurationType`, `ScheduleDuration`, `ScheduleStart`, `ScheduleFinish`, `EarlyStart`, `EarlyFinish`, `LateStart`, `LateFinish`, `FreeFloat`, `TotalFloat`, `IsCritical`, `StatusTime`, `ActualDuration`, `ActualStart`, `ActualFinish`, `RemainingTime`, `Completion`, plus `Name`/`DataOrigin`/`UserDefinedDataOrigin` uit `IfcSchedulingTime`. Eén glosse was fout: het rapport omschreef `IsCritical` als "boolean voor taken met nul of negatieve speling". De normtekst zegt uitsluitend *"A flag which identifies whether a scheduled task is a critical item within the programme."* IFC schrijft geen berekeningsregel voor. Dat is inhoudelijk relevant voor sectie 11.6 punt 2: round-trip-behoud van `IsCritical` bewaart een vlag, geen afgeleide — twee applicaties mogen die vlag verschillend vullen zonder de norm te schenden. Het `FreeFloat`-citaat was bovendien afgekapt; de volledige zin eindigt op "…of work".

**3 — Microsoft (bevestigd, met gecorrigeerde afhankelijkheid).** $10,00 / $30,00 / $30,00 per gebruiker per maand bij jaarbetaling, en CAD 13,60 / 40,70 / 40,70, allemaal woordelijk bevestigd op beide pagina's. De premie van 100% klopt. Wat niet klopte, was de richting van de licentie-eis: het rapport schreef "vereist Planner-licentie", terwijl Microsoft zegt dat een **Copilot**-licentie vereist is voor de Planner Agent en een Planner-plan alleen *extra* AI-mogelijkheden toevoegt. Gecorrigeerd in sectie 4.5.

**5 — Oracle G-Cloud (bevestigd, woordelijk).** Het prijsdocument is opgesteld door reseller RPC, gedateerd mei 2024, en bevat exact: B108055 Schedule £96, B108057 Task £44, B108058 Progress £10, B108056 Portfolio £176, minimum 5 gebruikers, en de kortingstabel 101-200 = 10% (£86,40), 201-500 = 15% (£81,60), 501-1000 = 20% (£76,80), 1001+ = 25% (£72). Nagerekend: 96 × 0,75 = 72 ✓. De kernbevinding — vier producten, vier prijzen, **geen enkele AI-regel** — is bevestigd: het document kent geen AI-SKU.

**6 — nPlan white paper (bevestigd, woordelijk).** Alle cijfers komen exact overeen met de primaire PDF: 358.871.102 activiteiten in 539.569 planningen per 22 februari 2023; testset 14.184 projecten; tabel 1 (PERT 703,5 / 1.514,1 / 0,012 — log-normaal 105,2 / 237,3 / 0,01 — GNN 64,1 / 106,3 / 0,44); tabel 2 (0,847 / 0,532 / 0,169 en de P-waarden); 47,2% van de activiteiten met >50% uitloop; 47,9% van de projecten met >30% uitloop, "1514 of 13913"; de Turing-test op "about 80%". Ook de kritiek in kanttekening 1 is bevestigd: het paper noemt zijn eigen basislijn letterlijk *"the same methodology as the best-in-class monte carlo methods"* terwijl het om een vaste verdeling over alle activiteiten gaat. **Gecorrigeerd:** de samenvattende factorclaim "2-14×" geldt alleen voor MAE; op CRPS is de winst tegenover log-normaal 1,6×.

**7 — AACE RISK-4435 (bevestigd, woordelijk).** Titel, papernummer, jaar en de zes auteurs (Phillips, Amratia, Ledzema, Bendall-Jones, Hovhannisyan, Mueck — allen nPlan) kloppen. Woordelijk bevestigd: *"only a few mega-projects have introduced it into their risk management procedures"*; *"implementations of AI-SRA on 5 megaprojects across the rail industry as well as the oil and gas industry. These implementations started in 2022 … Total project costs of the projects considered ranged from £60M to £10B. The schedules … ranged from a couple of thousand activities to tens of thousands of activities"*; *"a total of 18 project control professionals were involved"*; *"running both methodologies in parallel for a year"*; *"This bid represented more than $1bn of additional scope"* met *"just 12 working days"*. De drie barrières staan er als zodanig. Dit is de best gecontroleerde passage van het rapport en de kwalificatie "de eerlijkste bron over adoptie" houdt stand. Terzijde: het "meer dan 740.000 planningen" uit hetzelfde paper blijkt te slaan op een dataset voor **vertragingsstatistiek**, niet expliciet op het trainingscorpus — dat versterkt kanttekening 4 over inconsistente datasetcijfers eerder dan dat het die weerlegt.

**8 — nPlan jaarrekening (bevestigd uit primaire iXBRL).** Alle posten teruggelezen uit het gedeponeerde iXBRL-document: tangible assets 109.139 / 158.354; investments 2.260.733 / —; debtors 414.397 / 1.056.889; cash 549.671 / 5.042.354; creditors <1 jr 316.091 / 459.232; net assets 3.017.849 / 5.798.365; share capital 173; share premium 15.748.983 / 15.747.153; profit and loss account −12.731.307 / −9.948.961; deferred income 87.079 / 362.165; *"the average number of employees was 34 (2023: 57)"*. Bevestigd is ook de status: audit-vrijstelling onder **artikel 477** Companies Act 2006, small companies regime, FRS 102 Section 1A, en letterlijk *"The profit and loss account has not been delivered to the Registrar of Companies"* — de beperking in sectie 2 klopt dus. Nagerekend: verlies 2024 = 12.731.307 − 9.948.961 = **£2.782.346** ✓; netto-activadaling £2.780.516 ✓; deferred income −75,96% ≈ −76,0% ✓; personeelskrimp (57−34)/57 = 40,4% ✓; consistentiecontrole 15.748.983 − 12.731.307 + 173 = 3.017.849 ✓ (klopt tot op de pond, in beide jaren). De liquiditeitsschatting is verfijnd: zie de toevoeging in sectie 4.2 over de £2,26M aandeleninvestering.

**9 — Nodes & Links jaarrekeningen (bevestigd; één correctie).** Alle posten teruggelezen uit het FY2025-iXBRL, inclusief de vergelijkende 2024-kolom: cash 11.358.384 / 1.724.779; debtors <1 jr 571.266 / 351.411; creditors <1 jr 683.360 / 1.244.486; creditors >1 jr 4.559.760 / —; net assets 6.740.192 / 848.387; share premium 18.353.228 / 9.304.299; P&L −11.613.356 / −8.456.108; *"The average monthly number of employees, including directors, during the year was 19 (2024 - 22)"*. De vier dochters staan er woordelijk: Labs (Cyprus), Consulting (VK), Olympia S.A. (Griekenland), Inc. (VS). De continuïteitsparagraaf zegt inderdaad dat de verliezen *"are consistent with the Company's business plan"*. Nagerekend: agiotoename 18.353.228 − 9.304.299 = **£9.048.929** ✓; verlies 2025 £3.157.248 ✓; verlies 2024 £2.426.185 ✓; consistentiecontrole 18.353.228 − 11.613.356 + 320 = 6.740.192 ✓ (klopt tot op de pond in alle drie de jaren). **Gecorrigeerd:** het rapport liet in het midden of de £4,56M venture debt of converteerbaar was. Toelichting 8 beslist dat: het zijn *convertible loan notes*, ongedekt, 8% rente, automatische conversie naar eigen vermogen in juni 2028.

**10 — Financieringsrondes.** ALICE: $13M incrementele tranche tot **$47M totaal**, 11 april 2023, Swire Properties als aandeleninvesteerder en Bridge Bank als kredietverstrekker, met de juni-2022-investeerderslijst (Vanedge lead, Bouygues, Gaingels, GRIDS, JLL Spark, MetaPlanet, Future Ventures, Merus, Rising Tide) — **woordelijk bevestigd**. nPlan: $16M Series B, 17 oktober 2025, CapHorn lead, met Chevron Technology Ventures, Suffolk Technologies, GV, Pentech en LocalGlobe; ook de claims $1,2 miljard bespaard, $500 miljard onder beheer, 750.000 projecten / $2,5 biljoen en het CEO-citaat over het VK sinds 2017 — **woordelijk bevestigd** (als bewering; de effectclaims blijven klasse D/E). Nodes & Links: $12M, 18 februari 2025, ETF Partners lead — **bevestigd**, met de aanvulling dat de bron dit expliciet een **Series B** noemt, wat het rapport niet vermeldde. Trunk Tools: **onzeker**, de geciteerde bron geeft HTTP 404.

**11 — ALICE- en McKinsey-claims (bevestigd als bewering).** De homepage toont exact 17% / 14% / 12% / $127 miljard en de genoemde logo's (plus Alvarez & Marsal, dat het rapport niet noemde). De prijspagina noemt geen bedragen en zegt letterlijk *"They generally use ALICE on projects with a construction value of at least $75M"*, met onbeperkte gebruikers, onbeperkte data en workshops. Het McKinsey-blog van 14 april 2026 bevat exact "up to 20 percent", "more than 35 clients", "~40 percent reduction in the baseline construction schedule" en "more than five years". Bij hercontrole bevat geen van beide bronnen een methodologie, steekproefomvang of controlegroep — de klasse-E-indeling en de kritische noten in sectie 4.1 houden dus stand. De *[Eigen schatting]* over ALICE-prijzen is niet te bevestigen of te weerleggen; de rekenkundige onderbouwing (<0,1% van $75M = <$75.000) klopt, de premisse is een aanname.

**12 — Adviesbureaucijfers (gesplitst oordeel).** Bain is **woordelijk bevestigd**: "more than 30 SaaS vendors", 35% verhoogde per-licentieprijzen met AI gebundeld, 65% hybride met een AI-meter, en letterlijk *"None of these 30-plus vendors now exclusively monetize AI as a separate add-on, although several did when we performed this analysis a year ago"* plus *"none of these vendors have fully shifted to AI usage- or outcome-based pricing"*. Dat laatste detail — dat er een jaar eerder wél losse AI-add-ons waren — nuanceert de conclusie in sectie 11.2 punt 3: de 0% is een recente verschuiving, geen structurele wetmatigheid. BCG is **onzeker**: bcg.com gaf HTTP 403 op elke poging, zodat 68%, 40%, 91% en de outcome-based-cijfers niet tegen de primaire tekst konden worden gehouden.

**13 — "Bijna een half miljard dollar" (gecorrigeerd).** Dit is de duidelijkste rekenfout in het rapport. De eigen financieringstabel in sectie 4.8 telt op tot **$115 miljoen** ($47M + $40M + $16M + $12M), en zelfs wanneer men alle eerdere rondes van deze vier bedrijven meetelt komt men niet in de buurt van $500 miljoen. De openingszin is vervangen door het onderbouwde bedrag. Dit versterkt overigens de strekking van het rapport in plaats van die te ondergraven: de markt is nóg kleiner dan de samenvatting suggereerde. Andere optellingen in het rapport zijn wél correct: 34 + 19 = 53 werknemers ✓; £12.731.307 + £11.613.356 = £24.344.663 ≈ £24,3M cumulatief verlies ✓; $16M + $12M = $28M voor 2025 ✓.

**15 — Wheatley.** De GitHub-API geeft op 25 juli 2026: **83 sterren, 21 forks**, Python, laatste push 3 juli 2026, beschrijving "Next-generation scheduling problem solver based on GNNs and Reinforcement Learning". Het commit-aantal (455) staat niet in het repository-object en is niet gecontroleerd. De conclusie in sectie 8.1 — een klein, levend academisch project, geen productiewaardige planner — houdt stand.

**16 — Oracle prijslijst 2016 (onzeker).** Het document bestaat, is gedateerd 10-NOV-2016 en heet inderdaad "Oracle Construction & Engineering Global Price List". De bedragen 2.750 / 605,00, 2.500 / 550,00 en "125 Hosted Named User 25" komen erin voor, en de verhouding support/licentie is in alle gevallen 22%, wat consistent is met Oracle's standaardpercentage. Maar de kolomstructuur van de PDF valt bij tekstextractie uiteen, zodat niet met zekerheid is vast te stellen welk bedrag bij welk product hoort. Het rapport hedgede dit al met "voor zover leesbaar uit de PDF-extractie"; dat voorbehoud is terecht en blijft staan.

### Wat níét is gecontroleerd

Buiten de twaalf geselecteerde beweringen vielen: de KPMG-enquête (375 leidinggevenden, 71% optimisme), het McKinsey State of AI-cijfer (88%), de InEight- en Deltek-productbeschrijvingen, de Nodes & Links-productclaims ("hallucinatiebestendig", "compatible with P6 principles"), de Construction Dive-berichtgeving over Zachry, en de arXiv-papers 2511.13214 en 2502.11221. Deze blijven staan met de klasse-indeling die het rapport er zelf aan geeft.

**Netto-oordeel.** Het feitelijke fundament van dit rapport is ongewoon solide: de vier zwaarstwegende bronklassen — normtekst, gedeponeerde jaarrekeningen, gepubliceerd prijsdocument en het methodologische white paper — zijn woordelijk uit de primaire bron bevestigd, tot op de pond en de decimaal. De gevonden fouten zitten niet in de gedeponeerde cijfers maar in de **verbindende interpretaties**: een opgeblazen marktbedrag in de samenvatting, een omgekeerde licentie-afhankelijkheid, een normeis die geen normeis is, een factorclaim die één metriek te breed is getrokken, en een ambiguïteit over converteerbare leningen die de bron zelf al oploste. Twee bronnen (BCG, Trunk Tools) waren niet bereikbaar en zijn als onbevestigd gemarkeerd.
