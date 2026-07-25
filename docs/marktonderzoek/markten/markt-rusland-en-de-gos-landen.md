# Markt voor projectplanning- en schedulingsoftware in Rusland en de GOS-landen

**Regio:** Rusland, Kazachstan, Wit-Rusland, Oezbekistan
**Peildatum onderzoek:** juli 2026 · **Meest recente harde marktcijfers:** boekjaar 2024, met prognoses tot 2027–2030
**Scope:** software met Gantt/CPM-functionaliteit — bouwspecifiek, algemeen projectmanagement, en lokale/regionale pakketten

---

## Leeswijzer en methodologische verantwoording

Bij elk cijfer staat een bron-URL. Waar ik zelf redeneer of extrapoleer staat expliciet **[SCHATTING]** met de onderliggende redenering erbij. Waar een cijfer alleen via secundaire pers beschikbaar was en ik de primaire bron niet kon openen, staat **[SECUNDAIR]**.

**Wisselkoers.** Roebelbedragen zijn primair; USD-omrekeningen zijn indicatief. Waar een bron zelf omrekent (bijv. Strategy Partners: 6 mld RUB ≈ $81 mln, impliciet ~74 RUB/USD) neem ik hun conversie over en noem ik dat. **[GECORRIGEERD juli 2026]** Strategy Partners publiceert twee náást elkaar lopende reeksen die niet één-op-één koppelbaar zijn: een roebelreeks voor "ERP in de bouw" (4,5 / 5,0 / 5,3 / 5,6 / **6,4** mld RUB voor 2020–2024) en een dollarreeks voor "Construction Management Software" (2020 $60–70 mln ≈ 4–5 mld RUB; 2023 $74 mln ≈ 5,5 mld RUB; 2024 **$80–81 mln ≈ 6 mld RUB**). De veelgeciteerde koppeling "6,4 mld RUB ≈ $81 mln" bestaat in het rapport zélf niet — $81 mln hoort bij ~6 mld RUB. Zie § Verificatie. Waar ik zelf omreken gebruik ik **90 RUB/USD** als werkkoers en markeer ik dat als schatting. De roebel is sinds 2022 extreem volatiel geweest (van ~60 tot ~110 RUB/USD), waardoor USD-uitgedrukte marktomvang jaar-op-jaar sterk kan lijken te fluctueren zonder dat het reële volume verandert. Dat is een structureel meetprobleem in deze regio en de belangrijkste reden om roebels als basiseenheid te nemen.

**Belangrijke waarschuwing over marktcijfers.** Er circuleren twee onverenigbare schattingen van "de Russische markt voor projectmanagementsystemen" over 2024: **17,39 mld RUB** (bron: MojOffice, via TAdviser) en **6,0 mld RUB** (bron: Naumen). Het verschil is een definitiekwestie — zie § 2.1. Ik rapporteer beide en leg het verschil uit in plaats van er één te kiezen.

---

## 1. Samenvatting

**De kern in tien punten:**

1. **De markt is in vier jaar volledig van eigenaar gewisseld.** In 2021 was ~60% van de ERP-markt voor de Russische bouw in handen van buitenlandse leveranciers (SAP, Oracle, Microsoft Dynamics); eind 2024 was het aandeel Russische leveranciers gestegen tot ~70%. ([Strategy Partners, aug. 2025, p. 11](https://strategy.ru/media/uploads/2025/08/SP_Обзор_российского_ПО_по_управлению_строительными_проектами_август.pdf)) Voor projectmanagementsystemen breed steeg het Russische aandeel van 25% (2020) naar 73% (2024). ([Naumen](https://www.naumen.ru/events/news/7454/))

2. **Maar de substitutie is oppervlakkiger dan de cijfers suggereren.** Microsoft Project bleef in 2024 nog steeds marktleider in Rusland, met een aandeel dat halveerde van 80% (2022) naar 43% (2024). ([TAdviser/Korus Consulting](https://korusconsulting.ru/upload/generated_pdf/rossiyskiy-rynok-sistem-upravleniya-proektami.pdf)) 53% van de ondervraagde grote Russische bedrijven was medio 2025 nog niet overgestapt op een Russisch systeem: 28% draait nog op buitenlandse software, 25% **zit in de planningsfase van de migratie** ("находятся на стадии планирования"). ([Naumen](https://www.naumen.ru/events/news/7454/)) **[GECORRIGEERD]** — een eerdere versie van dit document las die 25% als "heeft überhaupt nog geen systeem"; dat staat er niet.

3. **Oracle Primavera P6 is niet vervangen — het is bevroren.** Het segment "branchespecifieke oplossingen" is het minst ontwikkelde deel van de markt (9%, ~600 mln RUB in 2024, **gemeten binnen het Russische softwaresegment**) precies omdat er geen volwaardige Primavera-vervanger bestaat: *"Отраслевые решения среди российского ПО пока занимают только 9% (600 млн рублей) … Это связано с отсутствием полной замены Oracle Primavera."* **[GECORRIGEERD: bron is Naumen, niet IT-World]** ([Naumen-onderzoek via Habr](https://habr.com/ru/news/933450/)) Grote opdrachtgevers draaien door op legacy-licenties in de wetenschap dat er geen updates meer komen.

4. **Sancties zijn sinds 2024 een harde juridische bodem, niet meer alleen vrijwillig vendorbeleid.** EU-Verordening 833/2014 art. 5n(2b) + bijlage XXXIX verbiedt sinds 18 december 2023 (uitloop tot 20 maart 2024) de levering van enterprise-managementsoftware en ontwerp-/fabricagesoftware (ERP, CRM, BI, SCM, BIM, CAD, CAM) aan Rusland. ([DS Avocats](https://www.dsavocats.com/en/the-ban-on-providing-it-services-and-selling-software-to-russia-a-new-tool-to-limit-russias-industrial-capabilities/)) De VS volgde met een OFAC-verbod per 12 september 2024 en BIS-exportcontroles op enterprise-managementsoftware per 16 september 2024, geldend voor zowel Rusland als Wit-Rusland.

5. **Rusland dwingt substitutie ook van binnenuit af.** Presidentieel decreet nr. 166 (30-03-2022) verbiedt buitenlandse software op kritieke informatie-infrastructuur vanaf 1 januari 2025; decreet 250 (01-05-2022) verbiedt per **dezelfde datum, 1 januari 2025** buitenlandse informatiebeveiligingsmiddelen. **[GECORRIGEERD — eerder stond hier 1 januari 2026.]** Aanbestedingsregime PP 1875 (23-12-2024) geeft registersoftware voorrang onder 44-FZ/223-FZ.

6. **Spider Project is de sterkste inheemse CPM-motor, maar het is een niche-kampioen, geen marktleider.** Ontwikkeld sinds 1993 door het team van Vladimir Liberzon, actief in 37 landen, in het Russische softwareregister onder nr. 2861, ingezet op onder meer de Olympische Spelen van Sotsji 2014 en het WK 2018. ([spiderproject.pro](https://www.spiderproject.pro/en/)) Prijzen: 170.000–450.000 RUB per eeuwigdurende licentie afhankelijk van editie. ([iesoft.ru](https://www.iesoft.ru/products/otechestvennoe-po/spider_project/spider-project-professional/))

7. **De echte volumewinnaar is 1C.** Ongeveer 80% van de omzet van Russische bouw-ERP komt uit de 1C-familie. ([Strategy Partners, p. 14](https://strategy.ru/media/uploads/2025/08/SP_Обзор_российского_ПО_по_управлению_строительными_проектами_август.pdf)) 1С:PM Управление проектами ПРОФ is met 550+ implementaties het brede werkpaard; de basislevering kost 69.200 RUB. ([1C](https://solutions.1c.ru/catalog/pm-prof/buy))

8. **De bouwspecifieke softwaremarkt in Rusland is klein: ~6,4 mld RUB in 2024** (Strategy Partners' parallelle dollarreeks komt voor 2024 uit op **$80–81 mln ≈ 6 mld RUB**; koppel 6,4 mld dus níét aan $81 mln — zie leeswijzer), gegroeid vanaf ~4,5 mld RUB in 2020, met een prognose van >8 mld RUB (>$100 mln) in 2027 en 8–10% jaarlijkse groei daarna. ([Strategy Partners, p. 5 en p. 10](https://strategy.ru/media/uploads/2025/08/SP_Обзор_российского_ПО_по_управлению_строительными_проектами_август.pdf)) Het puur op planning/CPM gerichte deel daarvan schat ik op **1,5–3 mld RUB per jaar inclusief diensten [SCHATTING]** — zie § 2.3.

9. **De GOS-landen buiten Rusland zijn een andere markt, geen verlengstuk.** Kazachstan en Oezbekistan vallen niet onder de softwaresancties en kunnen Oracle en Microsoft gewoon kopen; Oezbekneftegaz stapte juist volledig over op Primavera P6 EPPM. Wit-Rusland valt wél onder dezelfde EU- en VS-verboden als Rusland, maar heeft het probleem juridisch "opgelost" met wet nr. 241-З (3 januari 2023), die het gebruik van software uit "onvriendelijke landen" zonder toestemming van de rechthebbende toestaat — **een tijdelijke regeling, inmiddels verlengd tot en met 31 december 2026 (wet 42-З van 02-12-2024).**

10. **Excel en informele licenties zijn de grootste feitelijke concurrent.** 43% van de Russische bedrijven bouwt planningsprocessen nog in Excel, 33% werkt hybride. Het aandeel illegaal gebruikte engineeringsoftware steeg van 65% (2023) naar 70% (2024); 28% van de bedrijven gebruikt ongelicentieerde buitenlandse software omdat er geen Russisch alternatief is. [SECUNDAIR]

---

## 2. Marktomvang

### 2.1 Rusland — twee cijfers, twee definities

| Meting | 2023 | 2024 | 2025 | Bron |
|---|---|---|---|---|
| PM-systemen breed (incl. taakmanagers/trackers) | — | **17,39 mld RUB** | prognose **+17%** (~20,3 mld RUB) | MojOffice-schatting in [TAdviser-review, feb. 2025](https://korusconsulting.ru/upload/generated_pdf/rossiyskiy-rynok-sistem-upravleniya-proektami.pdf); [IT-World](https://www.it-world.ru/it-news/c8cyg8jnfns4kk0sckoc8gwskkcco4o.html) |
| PM-systemen (nauwere definitie) | 5,4 mld RUB | **6,0 mld RUB** | prognose **6,6 mld RUB** | [Naumen](https://www.naumen.ru/events/news/7454/) |
| Bouwspecifieke management-/ERP-software (roebelreeks) | 5,6 mld RUB | **6,4 mld RUB** | — (2027: >8 mld RUB) | [Strategy Partners × Minstroj, aug. 2025](https://strategy.ru/media/uploads/2025/08/SP_Обзор_российского_ПО_по_управлению_строительными_проектами_август.pdf) |
| Idem, dollarreeks van dezelfde bron ("Construction Management Software") | $74 mln (≈5,5 mld RUB) | **$80–81 mln (≈6 mld RUB)** | — (2027: >$100 mln ≈ 8 mld RUB) | idem, p. 8 |

**Waarom het verschil van bijna 3× tussen 17,39 en 6,0 mld RUB?** De MojOffice/TAdviser-definitie telt vrijwel alles mee wat "projecten beheert", inclusief Kaiten, Jira-vervangers, Yandex Tracker, Megaplan, Bitrix24-achtige taakmanagers en samenwerkingsplatforms. De Naumen-definitie is strakker en telt de PPM/PMS-klasse. **Voor een leverancier van Gantt/CPM-planningssoftware is de Naumen-definitie de relevantere**, en zelfs die is nog te breed. [SCHATTING]

**Groei en structuur (Naumen, 2020–2024):**
- CAGR 2020–2024: **46% per jaar** ([Naumen](https://www.naumen.ru/events/news/7454/)) — let op: de laatste jaren liggen ver ónder dat gemiddelde (2023→2024 was **+11%**, 2024→2025 prognose **+10%**). De 46% is dus front-loaded op 2021–2022 en zegt weinig over de huidige groei.
- Aandeel Russische leveranciers: **25% (2020) → 73% (2024)**; prognose 2025 **81%**
- Omzet Russische leveranciers: 3,3 mld (2023) → **4,4 mld RUB (2024)** → prognose **5,4 mld RUB (2025)**. **[GECORRIGEERD]** Naumens zin "российские разработчики смогут заработать … не менее 1 млрд рублей — это на 24% больше" betekent **1 mld RUB extra** (4,4 → 5,4), niet "1 mld totaal", zoals een eerdere versie van dit document las.
- Segmentverdeling 2024: complexe systemen **3,0 mld RUB (50%)**, taak-trackers **2,4 mld RUB (41%)**, branchespecifieke oplossingen **~600 mln RUB (9%)** — dat laatste expliciet toegeschreven aan het ontbreken van een volwaardige Oracle Primavera-vervanger. **[GECORRIGEERD: bron Naumen, niet IT-World]** ([Naumen via Habr](https://habr.com/ru/news/933450/)) *Rekenkanttekening: 600/6.000 = 10%, niet 9%; de 9% is een afronding binnen de segmentatie van Russisch ПО. Gebruik "~0,5–0,6 mld RUB" als bandbreedte, geen puntschatting.*

**Groei en structuur (Strategy Partners, bouwspecifiek):**

| Jaar | Marktomvang bouw-ERP/management (mld RUB) | Aandeel Russische leveranciers |
|---|---|---|
| 2020 | 4,5 | ~30% |
| 2021 | 5,0 | ~40% |
| 2022 | 5,3 | ~50% *(interpolatie — niet in de bron)* |
| 2023 | 5,6 | ~55% |
| 2024 | 6,4 | ~70% |

*De roebelreeks 4,5 / 5,0 / 5,3 / 5,6 / 6,4 is letterlijk uit de grafiek op p. 8 van het rapport geverifieerd. De aandelen 2020 (~30%), 2021 (40% — bron: "60% buitenlands, 1С ~35%, overige RU 5%"), 2023 (~55%) en 2024 (~70%) staan in de tekst; **2022 (~50%) is mijn interpolatie en geen brongegeven**.*

Bron: [Strategy Partners, aug. 2025, p. 10–11](https://strategy.ru/media/uploads/2025/08/SP_Обзор_российского_ПО_по_управлению_строительными_проектами_август.pdf)

**Context die de omvang begrenst:** Russische ontwikkelaars besteden gemiddeld **minder dan 1% van hun omzet aan IT** (doorgaans tot 100 mln RUB per jaar), tegenover ~5% in de retail. ([Strategy Partners, p. 12](https://strategy.ru/media/uploads/2025/08/SP_Обзор_российского_ПО_по_управлению_строительными_проектами_август.pdf)) Dat is de belangrijkste rem op de markt: niet gebrek aan producten, maar gebrek aan IT-budget bij bouwbedrijven.

**Context die de omvang opdrijft:** het regeringsplan voor bouw en nutsvoorzieningen tot 2030 voorziet **150 biljoen RUB aan investeringen** in de bouwsector; de digitaliseringsmarkt voor de bouw (software + hardware) kan tegen 2028 **4× groter** zijn dan nu. ([Strategy Partners, p. 5 en p. 12](https://strategy.ru/media/uploads/2025/08/SP_Обзор_российского_ПО_по_управлению_строительными_проектами_август.pdf))

In het Russische softwareregister staan inmiddels **>900 producten** in het bouwdomein; Strategy Partners analyseerde er 100+ en behandelt 12 sleutel-ERP's uitgebreid. ([Strategy Partners, p. 8](https://strategy.ru/media/uploads/2025/08/SP_Обзор_российского_ПО_по_управлению_строительными_проектами_август.pdf))

### 2.2 GOS-landen buiten Rusland

**Kazachstan.** Geen publiek beschikbare cijfers specifiek voor projectplanningsoftware. Macrocontext: de IT-dienstenmarkt kwam in 2025 op **~2,9 biljoen tenge (~$5,6 mld), circa 1,7× het niveau van 2024 (~1,7 biljoen tenge)**, en de ICT-beroepsbevolking overschreed **200.000 personen**; IT-dienstenexport 391,6 mld tenge in 2025. **[BIJGEWERKT juli 2026 — deels opgewaardeerd]** Deze cijfers zijn wél tot een primaire bron herleidbaar: het Bureau voor Nationale Statistiek van het ASPiR RK, doorgegeven via finprom.kz, nationalbusiness.kz en [Astana Times](https://astanatimes.com/). De aparte claim "**softwaremarkt ~$3,6 mld met ~13,5% groei**" heb ik **niet** kunnen bevestigen en blijft **[SECUNDAIR, lage betrouwbaarheid]**. Let ook op: $5,6 mld bij 2,9 biljoen tenge impliceert ~518 tenge/USD. Wat wel hard is: Kazachstan heeft **geen noemenswaardige inheemse planningssoftware**. Zoekwerk in het Russisch naar Kazachse eigen ontwikkelingen levert vooral implementatiepartners van westerse producten op (o.a. Conteq, dat Microsoft Project Online implementeert bij bouwbedrijven) en trainingsaanbieders voor Primavera P6 in Almaty en Astana (plan-fact.kz, pkplus.kz, CiscoTrain, STEX).

**Oezbekistan.** Geen marktcijfers gevonden. Wel duidelijke signalen van *toenemend* Primavera-gebruik: Oezbekneftegaz maakt een volledige overstap naar Primavera P6 EPPM voor grote winnings- en verwerkingsprojecten; PMEG in Tasjkent draait een project management office met P6, BIM en earned value; KEYSOFT LLC (Tasjkent) is Oracle-partner. Oezbekistan beweegt dus richting het internationale standaardpakket, precies tegengesteld aan Rusland.

**Wit-Rusland.** Kleinste markt van de vier en het minst gedocumenteerd. Het lokale softwarelandschap draait vooral om *smeta*-software (calculatie/begroting: "Помощник инженера-сметчика", Smeta-OnLine, Proekt.by) en 1C-varianten (1C:BIT bouwbeheer); ENECA levert 4D/5D-diensten. Voor grote projecten zoals de kerncentrale (BelAES, 2× VVER-1200) wordt met Russische/internationale KSP-praktijk gewerkt (Primavera, Spider Project, MS Project via consultants). GanttPRO, oorspronkelijk uit Minsk (XB Software-omgeving), is geherlokaliseerd naar Polen als DPM Solutions Sp. z o.o. — een illustratie van de bredere IT-uittocht uit Wit-Rusland. ([ganttpro.com/pricing](https://ganttpro.com/pricing/))

### 2.3 Hoe groot is de *planning/CPM*-niche eigenlijk? [SCHATTING]

Er bestaat geen gepubliceerd cijfer voor "Gantt/CPM-planningssoftware in Rusland". Ik leid het als volgt af:

**Redenering, ondergrens.** Naumen's segment "branchespecifieke oplossingen" = ~600 mln RUB (2024) en wordt expliciet gekoppeld aan het Primavera-gat. Dat is echter alleen licentie-omzet **van Russische leveranciers** in dat segment ("среди российского ПО") — geverifieerd, de afbakening klopt; het telt legacy-buitenlandse licenties, trainingen en implementatieconsultancy niet mee. **Zwakte van deze ondergrens:** "отраслевые решения" is bij Naumen breder dan CPM-planning (het omvat elke branchespecifieke PM-oplossing, ook niet-bouw), dus de ondergrens is eerder een *proxy* dan een deelverzameling.

**Redenering, bovengrens.** Van de bouwspecifieke markt van 6,4 mld RUB is planning/graphics slechts één module naast documentbeheer, bouwtoezicht, MTO/inkoop, begroting en uitvoeringsdocumentatie. Uit de Strategy Partners-productbeschrijvingen blijkt dat planning doorgaans 1 van 6–8 modules is. Bij een gelijkmatige verdeling zou planning ~15–20% van 6,4 mld RUB zijn = 1,0–1,3 mld RUB, plus de niet-bouw sectoren (olie/gas, energie, defensie, mijnbouw, scheepsbouw, IT-infrastructuur) die eveneens KSP doen.

**Conclusie [SCHATTING]:** de markt voor professionele planningssoftware met Gantt/CPM in Rusland — licenties, onderhoud, training en implementatieconsultancy samen — ligt in de orde van **1,5–3 mld RUB per jaar (~$17–33 mln bij 90 RUB/USD)**. Voor de vier onderzochte GOS-landen samen kom ik op **$25–45 mln per jaar**, waarbij Kazachstan het grootste niet-Russische deel vormt omdat daar westerse licenties tegen volle wereldprijs worden gekocht.

### 2.4 Ordegrootte van het aantal planners [SCHATTING]

Er is geen telling. Bouwstenen:

- **PMSOFT** (grootste consultancy in dit domein, 30+ jaar actief) claimt op de homepage **"30+ лет на рынке"**, **"10 000+ пользователей"**, **"10+ разработок"** en **"80 000 слушателей обучено"**. **[GECORRIGEERD]** De eerder genoemde "**450+ projecten**" staat daar **niet**; ik kon die claim niet reproduceren. ([pmsoft.ru](https://www.pmsoft.ru/))
- **Spider Project** meldt werking in **37 landen** en eerste versie **1993**; de claim "duizenden installaties" staat **niet** op de Engelstalige site en blijft **onbevestigd**. ([spiderproject.pro](https://www.spiderproject.pro/en/))
- **Vacaturemarkt [GECORRIGEERD — de oude salarisband was verouderd].** Het aantal expliciete "специалист по календарно-сетевому планированию"-vacatures is klein (DreamJob toonde er 8), maar de **salarissen liggen fors hoger dan eerder genoteerd**: actuele Moskouse advertenties staan op **200.000–230.000 RUB/maand** voor een hoofdspecialist met 3–6 jaar ervaring (hh.ru), met uitschieters tot **~487.000 RUB/maand** in bouwspecifieke rollen. De eerder genoemde band 95.000–120.000 RUB/maand is niet meer representatief. Kanttekening bij de redenering: aggregators met ruimere zoekstring (rabota1000.ru) tonen **duizenden** treffers, dus "de vacaturemarkt is smal" berust op een enge zoekstring en is **geen betrouwbaar anker** voor het populatiecijfer hieronder.

**Redenering.** De 80.000 door PMSOFT opgeleide specialisten is een cumulatief cijfer over drie decennia en overschat de actieve populatie sterk (uitstroom, eenmalige cursisten, generieke PM-trainingen). De 10.000+ actieve PMSOFT-gebruikers is een betere ondergrens voor het Primavera/PM.planner-kamp. Daar komen bij: Spider Project-gebruikers (orde duizenden), MS Project-gebruikers in bouw en energie (de grootste groep, maar veelal deeltijd-planners), en gebruikers van 1C:PM en de nieuwe bouwplatforms.

**Conclusie [SCHATTING]:** in Rusland doen **20.000–40.000 mensen** kalender-netwerkplanning als substantieel deel van hun werk, waarvan **8.000–15.000 voltijds toegewijde planners**. Voor Kazachstan, Wit-Rusland en Oezbekistan samen tel ik daar **25–35%** bij op, gedreven door de olie-, gas- en mijnbouwprojecten in Kazachstan waar internationale EPC-contracten voltijds P6-planners vereisen: **totale regio ~26.000–54.000 planners, waarvan ~10.000–20.000 voltijds.**

**[NAGEREKEND]** De opslag is intern niet consequent: 20.000 × 1,25 = **25.000** (niet 26.000) en 40.000 × 1,35 = 54.000; de ondergrens gebruikt dus stilzwijgend +30%. Lees de bandbreedte als **25.000–54.000**. Belangrijker: het enige harde ankerpunt is PMSOFT's zelfgerapporteerde "10 000+ пользователей" — een leverancierclaim, niet een telling. De vacature-onderbouwing is hierboven ontkracht. **Betrouwbaarheid van dit populatiecijfer: laag; behandel het als orde-van-grootte met minstens een factor 2 onzekerheid naar beide kanten.**

---

## 3. Het sanctielandschap: wat er precies gebeurde en wat het deed

Dit is de belangrijkste structurele variabele in deze regio en verdient een eigen behandeling.

### 3.1 Fase 1 (2022): vrijwillige terugtrekking van leveranciers

**Oracle** staakte in 2022 alle activiteiten in de Russische Federatie én Wit-Rusland, inclusief dienstverlening en support aan Russische entiteiten en partners. De Russische dochteronderneming werd failliet verklaard met schulden van meer dan 1,2 mld RUB. [SECUNDAIR] Gevolg voor Primavera-klanten: geen nieuwe licenties, geen technische ondersteuning, geen updates. Bestaande perpetual licenties bleven technisch functioneren.

**Microsoft** kondigde in maart 2023 aan te stoppen met de verkoop van diensten en producten in Rusland, en stopte per **30 september 2023** met het verlengen van zakelijke licenties: "na 30 september 2023 kunt u bestaande abonnementen niet meer verlengen." Getroffen: Microsoft 365, Office 365, Enterprise Mobility + Security, Teams. Bestaande licenties bleven lopen tot afloop, daarna geen beveiligingsupdates of support meer.

Belangrijke nuance voor planningssoftware: **MS Project Professional als desktop-perpetual licentie bleef daardoor langer bruikbaar dan Project Online / Project for the Web**, die als cloud-abonnement direct raakten afgeknepen. Dat verklaart mede waarom MS Project ondanks alles nog 43% marktaandeel had in 2024.

### 3.2 Fase 2 (dec. 2023 – maart 2024): het EU-verbod wordt juridisch bindend

Het **12e EU-sanctiepakket** voegde aan Verordening (EU) 833/2014 een nieuw **artikel 5n(2b)** toe met bijbehorende **bijlage XXXIX**:

- **Wat verboden is:** het verkopen, overdragen, exporteren of direct/indirect beschikbaar stellen van (a) software voor het beheer van ondernemingen — ERP, CRM, BI, SCM, boekhouding, wagenparkbeheer, logistiek, HR — en (b) ontwerp- en fabricagesoftware — **BIM, CAD, CAM**.
- **Ingangsdatum:** 18 december 2023.
- **Uitloopperiode:** tot **20 maart 2024** voor contracten gesloten vóór 19 december 2023.
- **Uitzondering voor EU-dochters in Rusland:** tot 20 juni 2024, daarna vergunningplichtig.
- **Vorm doet er niet toe:** het verbod geldt zowel voor fysieke levering (USB) als voor levering via de cloud.

Bron: [DS Avocats-analyse](https://www.dsavocats.com/en/the-ban-on-providing-it-services-and-selling-software-to-russia-a-new-tool-to-limit-russias-industrial-capabilities/); Europese Commissie FAQ over software-sancties.

**Relevantie voor planningssoftware.** Bijlage XXXIX is geformuleerd rond "software voor het beheer van ondernemingen". Enterprise-scale PPM-suites zoals Primavera EPPM/Unifier vallen daar naar de letter en de geest onder; standalone desktopplanners zitten in een grijzer gebied, maar de praktijk is dat westerse leveranciers geen enkele Russische entiteit meer bedienen omdat het compliance-risico niet in verhouding staat tot de omzet. **Het commerciële effect is een totaalstop, ongeacht de juridische fijnmazigheid.**

### 3.3 Fase 3 (sept. 2024): de VS sluiten aan

- **12 september 2024** — OFAC-bepaling van kracht: verbod op het direct of indirect verlenen aan Rusland, vanuit de VS of door Amerikaanse personen, van gespecificeerde IT- en softwarediensten.
- **16 september 2024** — BIS-exportcontroles op **enterprise-managementsoftware** van kracht.
- **Reikwijdte:** ERP-software, enterprise-managementsoftware, **SaaS-platforms** en bijbehorende IT-ondersteuning. Uitdrukkelijk van toepassing op **zowel Rusland als Wit-Rusland**. Ook indirecte toegang (via een derde partij) valt eronder.

Aangekondigd op 12 juni 2024 als gecoördineerde G7-actie door Treasury, State en Commerce.

**Waarom dit ertoe doet:** vóór september 2024 was doorlevering via derde landen juridisch nog rommelig; daarna werd het expliciet verboden en handhaafbaar. Dit is het moment waarop het grijze kanaal via Kazachstan en Kirgizië voor bedrijfssoftware echt begon te knellen.

### 3.4 Fase 4: Rusland dwingt substitutie ook zélf af

| Instrument | Datum | Inhoud |
|---|---|---|
| Presidentieel decreet **nr. 166** | 30-03-2022 | Verbod op buitenlandse software op objecten van kritieke informatie-infrastructuur (КИИ) **vanaf 1 januari 2025**; gericht op software uit "onvriendelijke" landen (EU, VS, Japan, VK, Zuid-Korea). Staatsbedrijven moeten over naar registersoftware. |
| Presidentieel decreet **nr. 250** | 01-05-2022 | **[GECORRIGEERD: 1 januari 2025, niet 2026]** "О дополнительных мерах по обеспечению информационной безопасности РФ": *"с 1 января 2025 г. органам (организациям) запрещается использовать средства защиты информации"* afkomstig uit onvriendelijke staten. Beide decreten (166 en 250) hebben dus **dezelfde** ingangsdatum van 1 januari 2025; er is geen aparte 2026-aanscherping. ([kremlin.ru/acts/bank/47796](http://kremlin.ru/acts/bank/47796)) |
| Regeringsbesluit **nr. 1875** | 23-12-2024 | Consolidatie van het "nationale regime" in aanbestedingen onder **44-FZ** en **223-FZ**: verboden, beperkingen en voorkeuren voor registersoftware. Let op: dit is géén absoluut verbod op buitenlandse software, maar een voorkeursregime dat per aanbestedingstype verschilt. ([humresplan.ru](https://humresplan.ru/blog/importozameshchenie-ms-project-primavera/)) |

**Naleving loopt achter.** Najaar 2024 had slechts **7%** van de onderzochte organisaties aan de eisen voldaan; **8%** dacht de deadline van 1 januari 2025 te halen. [SECUNDAIR] ([Kontur](https://kontur.ru/talk/spravka/54411-ukaz_prezidenta_ob_importozameshchenii))

Dit is een terugkerend patroon: de deadlines zijn hard op papier, de handhaving is zacht. Marktexperts noemen expliciet "het ontbreken van druk van toezichthouders" als reden waarom westerse systemen in gebruik blijven. ([Korus/TAdviser](https://korusconsulting.ru/upload/generated_pdf/rossiyskiy-rynok-sistem-upravleniya-proektami.pdf))

### 3.5 Wit-Rusland: het probleem juridisch wegdefiniëren

Wit-Rusland valt onder dezelfde EU- en VS-verboden als Rusland, maar koos een andere route: **wet nr. 241-З**, ondertekend **3 januari 2023** (aangenomen door de Kamer van Vertegenwoordigers 20-12-2022, goedgekeurd door de Raad van de Republiek 21-12-2022), staat het gebruik toe van intellectuele-eigendomsobjecten uit "onvriendelijke landen" **zonder toestemming van de rechthebbende** — computerprogramma's, audiovisuele werken, muziek, omroepuitzendingen — en de invoer van goederen zonder toestemming van de rechthebbende.

**[BELANGRIJKE AANVULLING — de wet is tijdelijk, niet permanent.]** De regeling gold oorspronkelijk **tot en met 31 december 2024**. Bij **wet nr. 42-З van 02-12-2024** is de werking verlengd **tot en met 31 december 2026**: *"До 31 декабря 2026 года включительно продлено действие норм Закона от 3 января 2023 года № 241-З."* ([ilex.by](https://ilex.by/news/v-belarusi-prodlili-parallelnyj-import-do-kontsa-2026-goda/), [bsb.by](https://www.bsb.by/novosti-bsb-banka/zakon-respubliki-belarus-ot-02-12-2024-n-42-z/)) Dat betekent dat het regime **binnen de horizon van dit onderzoek afloopt** en opnieuw verlengd moet worden; een leverancier die op de status quo plant, plant op een aflopende wet. De formulering "in werking tien dagen na publicatie (6 januari 2023)" in een eerdere versie was bovendien intern tegenstrijdig — bedoeld is: gepubliceerd 6 januari 2023, in werking tien dagen ná die publicatie.

Praktisch gevolg: een Wit-Russisch bouwbedrijf dat Primavera P6 of MS Project blijft draaien pleegt naar Wit-Russisch recht **tot eind 2026** geen inbreuk. Dat verlaagt de urgentie om te migreren tot vrijwel nul, en verklaart waarom er in Wit-Rusland nauwelijks een eigen substitutiemarkt is ontstaan. Het maakt het land tegelijk commercieel oninteressant voor elke leverancier die op licentie-inkomsten rekent.

### 3.6 Kazachstan en Oezbekistan: legaal, maar onder secundaire-sanctiedruk

Beide landen vallen **niet** onder de software-sancties. Oracle- en Microsoft-licenties zijn er gewoon te koop, resellers en trainingscentra zijn actief (Almaty, Astana, Tasjkent). Oezbekneftegaz stapt juist ván lokale/ad-hoc praktijk *naar* Primavera P6 EPPM.

De complicatie is de doorvoerroute. Sanctieonderzoek documenteert routes als **Turkije → Kirgizië → Kazachstan → Rusland** voor dual-use goederen, en analoge patronen voor softwarelicenties. Dat heeft twee gevolgen:

1. Westerse leveranciers hanteren sinds 2024 strengere KYC/eindgebruikerscontroles op Centraal-Aziatische klanten, wat de aanschaf voor *legitieme* Kazachse en Oezbeekse klanten trager en duurder maakt.
2. Voor Russische kopers is de Kazachse route voor *bedrijfssoftware* na september 2024 grotendeels dichtgegaan — anders dan voor hardware. Software vereist activering, cloudverbinding en supportcontracten die eenvoudig aan een jurisdictie te koppelen zijn.

Russische juridische bronnen benadrukken dat parallelimport in 2026 "een toegestaan juridisch mechanisme is, maar strikt binnen de vastgestelde regels", en dat namaak niet via parallelimport te legaliseren valt.

### 3.7 Het feitelijke substitutie-effect

| Indicator | Vóór | Na |
|---|---|---|
| Marktaandeel MS Project (Rusland) | 80% (2022) | **43% (2024)** |
| Aandeel Russische PM-leveranciers | 25% (2020) | **73% (2024)** |
| Aandeel Russische ERP in de bouw | ~30% (2020) | **~70% (2024)** |
| Grote bedrijven die nog buitenlandse software gebruiken | — | **28% (medio 2025)** |
| Grote bedrijven in de **planningsfase** van migratie *(niet: zonder systeem)* | — | **25% (medio 2025)** |
| Illegaal gebruikte engineeringsoftware | 65% (2023) | **70% (2024)** (Strategy Partners via Kommersant) |
| Omzet Russische PM-leveranciers | 3,3 mld RUB (2023) | **4,4 mld RUB (2024)** → 5,4 mld prognose 2025 |

Bronnen: [Korus/TAdviser](https://korusconsulting.ru/upload/generated_pdf/rossiyskiy-rynok-sistem-upravleniya-proektami.pdf), [Naumen](https://www.naumen.ru/events/news/7454/), [Strategy Partners](https://strategy.ru/media/uploads/2025/08/SP_Обзор_российского_ПО_по_управлению_строительными_проектами_август.pdf).

**De belangrijkste kwalitatieve bevinding uit het TAdviser-onderzoek:** de vervanging is asymmetrisch. Kleine bedrijven migreerden snel; grote opdrachtgevers zitten vast. Dmitri Zavalisjin (DZ Systems) formuleert het scherp: importsystemen zijn moeilijk te onderhouden en te ontwikkelen, "maar er is al veel in geïnvesteerd — zowel qua datavolume van lopende en afgeronde projecten als qua diepte van de implementatie zelf." Marat Mucharjamov (Project Lad) voegt toe dat klanten importlicenties blijven gebruiken "maar iedereen begrijpt dat er geen ontwikkeling meer komt."

Dat is precies de dynamiek die een IFC-gebaseerde, open planningstool interessant maakt: het probleem is niet primair functionaliteit, maar **datamigratie en lock-in**.

---

## 4. Gebruikte software: marktpositie en prijzen

### 4.1 Rangorde in Rusland (bouw en industriële projecten)

| # | Product | Type | Positie 2024–2026 | Trend |
|---|---|---|---|---|
| 1 | **Microsoft Project** (legacy) | desktop CPM | Nog steeds grootste geïnstalleerde basis: 43% marktaandeel | Sterk dalend, bevroren |
| 2 | **1C-familie** (1С:PM, 1С:ERP УСО, 1С:УНФ/УНСФ) | ERP + PM | ~80% van de omzet van Russische bouw-ERP | Sterk stijgend |
| 3 | **Oracle Primavera P6** (legacy) | enterprise CPM | De facto standaard bij grote EPC/olie&gas/kernenergie; bevroren, geen support | Dalend maar taai |
| 4 | **Spider Project** | desktop/enterprise CPM | Toonaangevend Russisch CPM-pakket; niche maar diep verankerd | Stabiel, profiteert van registerplicht |
| 5 | **ADVANTA** | PPM/portfolio | Sterkste Russische PPM-speler voor bedrijfsbrede portfolio's | Stijgend |
| 6 | **PM.planner** (PMSOFT) | enterprise CPM | Expliciete Primavera P6-vervanger, registernrs. 26896 en 18887 | Stijgend, jong |
| 7 | **Multi-D** (Rosatom/ASE) | in-house enterprise | Concernstandaard van Rosatom, ook geëxporteerd met KKC-projecten | Stabiel |
| 8 | **Bouwplatforms**: Pragmacore, ЦУС, Sarex, Project Point, Adept, Sodis Building CM, Signal, SKRIPTUM, Larix, Neosintez, Gektor | SaaS/on-prem bouwbeheer | Snelst groeiende categorie; planning is één module | Sterk stijgend |
| 9 | **Naumen Project Ruler, Directum Projects, Forsight, Visary Project, Timetta, Kaiten, Shtab, Megaplan, Yandex Tracker** | generiek PM/PPM | Groot in IT/kantoor, zwak in echte CPM | Stijgend in volume |
| 10 | **GanttPRO, Wrike, monday.com, Asana, Smartsheet, ClickUp** | westerse SaaS | Deels vertrokken/afgeknepen; nog gebruikt via omwegen | Dalend in RU, stabiel in KZ/UZ |
| 11 | **ProjectLibre, GanttProject, OpenProject** | open source | Gratis vangnet, veel genoemd, weinig serieus enterprise-gebruik | Stabiel |
| 12 | **Excel** | — | Feitelijk nog de grootste "installed base" | Hardnekkig |

### 4.2 Spider Project — het lokale vlaggenschip, uitgebreid

**Wat het is.** Geïntegreerd projectmanagementsysteem, eerste versie 1993, ontwikkeld door Spider Project Team (Moskou) onder leiding van **Vladimir Liberzon** — oprichter van de Moskouse PMI-chapter en een van de vormgevers van de Russische PM-markt. Actief in **37 landen**, met vertegenwoordigingen in Australië, Brazilië, Colombia, Kazachstan, Roemenië en de VS. In het Russische softwareregister onder **nr. 2861**, klasse "systemen voor het beheer van projecten, onderzoek, ontwikkeling, ontwerp en implementatie".

Bron: [spiderproject.pro](https://www.spiderproject.pro/en/), registervermelding via gosadmin.ru.

**Referenties.** Bouwprojecten voor de **Olympische Winterspelen 2014** (Sotsji) en het **WK voetbal 2018**. Toepassingsgebieden volgens de leverancier: lucht- en ruimtevaart, bankwezen, bouw, defensie, energie, engineering, infrastructuur, maakindustrie, metallurgie, mijnbouw, olie & gas, spoorwegen, retail, scheepsbouw, softwareontwikkeling, telecom, nutsbedrijven.

**Prijzen (roebels, eeuwigdurende lokale licentie, zonder btw)** — [iesoft.ru](https://www.iesoft.ru/products/otechestvennoe-po/spider_project/spider-project-professional/):

| Licentie | Professional | Desktop |
|---|---|---|
| 1e | 450.000 RUB | 170.000 RUB (1e–5e) |
| 2e | 410.000 RUB | — |
| 3e | 370.000 RUB | — |
| 4e–6e | 330.000 RUB | 150.000 RUB (6e–15e) |
| 7e–10e | 300.000 RUB | — |
| 11e–15e | 270.000 RUB | — |
| 16e–25e | 240.000 RUB | 135.000 RUB (16e–40e) |
| 26e+ | 225.000 RUB | 115.000 RUB (41e+) |

**Prijzen (USD, internationale prijslijst)** — [spiderproject.pro/en/price-list](https://www.spiderproject.pro/en/price-list/):

| Editie | Prijsbereik per licentie |
|---|---|
| Professional | $4.500 (1e) → $2.250 (26e+) |
| Desktop Plus | $2.250 (1e–5e) → $1.700 (41e+) |
| Desktop | $1.700 (1e–5e) → $1.150 (41e+) |
| Lite | $800 |

**Opmerkelijk:** de roebel- en dollarprijzen verhouden zich exact 100:1 (450.000 RUB ↔ $4.500). Dat is een vaste interne pariteit, geen marktkoers. Bij een reële koers van ~90 RUB/USD betekent dit dat Russische kopers **ongeveer 10% méér** betalen dan internationale kopers; bij de koersen van eind 2024 (~110 RUB/USD) betaalden ze juist ~10% minder. **De prijslijst is dus niet gehedged en beweegt niet mee met de koers** — een klassiek kenmerk van een leverancier met een dominant thuismarkt-anker.

Technische ondersteuning gedurende het eerste jaar zou in de licentieprijs zijn inbegrepen. **[ONBEVESTIGD]** — noch de internationale prijslijst noch de resellerpagina's van iesoft.ru vermelden dit; ([spiderproject.ru/ru/pricelist](https://www.spiderproject.ru/ru/pricelist/) was tijdens beide onderzoeksrondes onbereikbaar (HTTP 503). Prijsgegevens komen daarom van reseller iesoft.ru en de internationale site; **die zijn wél volledig geverifieerd, tot op de staffel nauwkeurig**, inclusief de exacte 100:1-pariteit RUB:USD in álle vier de edities.)

**Voordelen (op basis van documentatie, vergelijkingen en fora):**

- **Resource-, kosten- en materiaalgeconditioneerde planning.** Het optimaliseert schema's onder gelijktijdige beperkingen van middelen, kosten én materialen — waar MS Project en zelfs P6 resource levelling als aparte, zwakkere stap behandelen.
- **Volumegebaseerde duur ("quantity-based scheduling").** Je voert hoeveelheden en productiviteiten in, niet durations; het systeem rekent de duur uit. Dit sluit direct aan op de Russische normatieve praktijk (ГЭСН/ФЕР-normen, calculatiegrondslagen) en is een echt structureel voordeel bij bouwplanningen.
- **Resource Critical Path.** Kritiek pad inclusief middelenbeperkingen, niet alleen logische afhankelijkheden — methodologisch superieur aan klassieke CPM voor middelenkritische projecten.
- **Monte Carlo-risicoanalyse met "success probability trends".** Trendanalyse van de slaagkans over de tijd, wat verder gaat dan een eenmalige P50/P80-uitkomst.
- **Skill-based resource allocation, conditional scheduling, cash-flowbeheer.**
- **Registerstatus.** Als geregistreerd Russisch product voldoet het aan 44-FZ/223-FZ-voorkeuren en aan decreet 166 — dat is voor staatsopdrachtgevers doorslaggevend.
- **Prijs/prestatie.** Een Professional-licentie van 450.000 RUB is duur naar Russische maatstaven, maar een tienpersoonsteam komt uit op ~3,4 mln RUB eenmalig — tegenover een P6-EPPM-implementatie die veelvouden daarvan kostte.

**Nadelen (op basis van reviews, fora en interoperabiliteitsargumenten):**

- **Interoperabiliteit is de achilleshiel.** Zoals een vergelijking het formuleert: Primavera-schema's zijn "bijna een universele taal" in internationale projecten, terwijl Spider Project-schema's vertaling naar P6-formaat vereisen om te kunnen samenwerken. Voor een aannemer die aan een internationale EPC-opdrachtgever moet leveren is dat een reëel struikelblok.
- **Gedateerde en dichte interface.** Terugkerende kritiek. Het is een pakket voor specialisten; de "intuïtief begrijpelijke interface waarbij training minimaal tijd en geld kost" die Russische klanten volgens Directum expliciet vragen, is Spider Project niet.
- **Steile leercurve.** De kracht (volumegebaseerd plannen, meervoudige beperkingen, RCP) is tegelijk de drempel. Het vereist een opgeleide planner, niet een projectleider die er af en toe in kijkt.
- **Beperkt ecosysteem.** Weinig integrators, weinig externe consultants, kleine talentpool — het tegenovergestelde van de brede markt aan P6-planners.
- **Geen webnative/collaboratieve architectuur.** De productlijn is desktopgeoriënteerd (Lite/Desktop/Desktop Plus/Professional). Terwijl de Russische markt juist naar SaaS beweegt (~40% van de bouwoplossingen is SaaS-only), blijft dit een lokaal geïnstalleerd pakket.
- **Afhankelijkheid van één persoon/team.** Sleutelpersoonrisico rond de oprichter en een klein ontwikkelteam.

### 4.3 Oracle Primavera P6 — de bevroren standaard

**Status.** Niet meer te koop in Rusland en Wit-Rusland (Oracle-terugtrekking 2022 + EU/VS-verboden). Wel gewoon verkrijgbaar in Kazachstan en Oezbekistan.

**Referentieprijzen (buiten Rusland).** P6 Professional als eeuwigdurende licentie: **circa $2.500–3.500 per gebruiker**, met optionele jaarlijkse ondersteuning van **$500–800**. [SECUNDAIR, derdepartijschatting van ITQlick] — Oracle publiceert de Construction & Engineering-prijslijst niet meer openbaar; ik kon geen officiële prijslijst-PDF bereiken. Behandel dit als ordegrootte.

**Wat er in Rusland van over is.** PMSOFT — 30+ jaar actief, voormalig Oracle Platinum-partner voor Rusland, GOS en de Baltische staten — vermeldt Oracle Primavera P6, Primavera Risk Analysis en Primavera Unifier nog steeds in zijn productportfolio, naast **Powerproject** (Elecosoft Asta), **TILOS**, CostOS, EcoSys, ScheduleReader/ScheduleCleaner en CellBIM. ([pmsoft.ru](https://www.pmsoft.ru/)) Dat is geen actieve wederverkoop maar ondersteuning van de bestaande basis plus eigen ontwikkeling.

**Waarom P6 blijft hangen.** Het is dieper dan gewenning:
- Enorme historische datasets in XER/P6-databases van lopende en afgeronde projecten
- Contractuele verplichtingen bij internationale EPC-projecten
- Opgeleide planners met P6-CV's
- Toezichtrapportages die op P6-structuren zijn gebouwd

### 4.4 PM.planner (PMSOFT) — de meest gerichte Primavera-vervanger

Het enige Russische product dat zich expliciet en volledig als P6-vervanger positioneert.

- **Ontwikkelaar:** PMSOFT (ПМСОФТ)
- **Claim:** "PM.planner implementeert alle primaire functies rond planning"; berekeningsresultaten komen overeen met Primavera P6
- **Functionaliteit:** CPM met reserve-/float-analyse, meerlaagse schema-hiërarchie, Gantt met configureerbare weergave, middelenbeheer (arbeid, materiaal, niet-arbeid) met capaciteitsplanning, meerdere methoden voor duurberekening op basis van resource-intensiteit, filtering, rolgebaseerde toegang (CRUD)
- **Schaal:** getest op schema's met **150.000 activiteiten** — dit is het cijfer dat het onderscheidt van generieke Russische PPM-tools, die bij duizenden taken al vastlopen
- **Interoperabiliteit:** de leverancier claimt letterlijk *"Поддержка модели данных Oracle Primavera P6, MS Project"* (ondersteuning van het **datamodel**) en *"PM.planner поддерживает формат \*.xlsx"*. **[GECORRIGEERD]** Een expliciete claim van **XER**-import/export staat **niet** op de productpagina; "datamodel-ondersteuning" is iets anders dan bestandsformaat-uitwisseling. Behandel XER-compatibiliteit als **onbevestigd** tot de leverancier het bevestigt. Open API wel vermeld.
- **Stack:** Linux/Astra Linux-servers, PostgreSQL, browserclient — expliciet gebouwd voor het Russische substitutielandschap
- **Registerstatus:** ingeschreven als Russische software onder **nrs. 26896 en 18887** (stand februari 2025)
- **Prijs:** niet openbaar

Bron: [pmsoft.ru/pmplanner](https://www.pmsoft.ru/pmplanner/)

**Beoordeling.** Dit is het serieuze antwoord op het Primavera-gat. XER-ondersteuning plus 150k-activiteiten-schaal plus Astra Linux plus registerstatus is precies de combinatie die een staatsopdrachtgever nodig heeft. Het risico: het is jong, de referentiebasis is klein, en het product wordt gemaakt door dezelfde partij die decennia haar bestaan aan Oracle ontleende — met bijbehorende afhankelijkheid van consultancy-omzet.

### 4.5 1C — de volumewinnaar

**1С:PM Управление проектами ПРОФ** — aanbevolen adviesprijzen ([1C](https://solutions.1c.ru/catalog/pm-prof/buy)):

| Levering | Prijs (RUB) |
|---|---|
| Hoofdlevering (elektronisch) | 69.200 |
| +1 werkplek | 41.600 |
| +5 werkplekken | 143.300 |
| +10 werkplekken | 277.400 |
| +20 werkplekken | 462.300 |
| +50 werkplekken | 924.500 |
| +100 werkplekken | 1.386.700 |
| +300 werkplekken | 3.466.900 |
| 1С:СЛК hardwaresleutel (USB) | 1.800 |

**Adoptie:** 550+ implementaties, waaronder PAO Severstal; actuele versie 5.0.2.22 (12-02-2026). ([1C](https://solutions.1c.ru/catalog/pm-prof)) Verkoop van de 1С:PM-lijn groeide in 2024 met **16%**, waarbij de vraag vanuit grote bedrijven sneller steeg dan die vanuit het mkb. ([Korus/TAdviser](https://korusconsulting.ru/upload/generated_pdf/rossiyskiy-rynok-sistem-upravleniya-proektami.pdf))

**1С:ERP Управление строительной организацией 2 (УСО 2):** pakketprijs circa **780.000 RUB** (serverlicentie) plus extra werkplekken, plus jaarlijkse ITS-abonnementskosten voor updates en support. Ondersteunt PostgreSQL, MS SQL, Oracle Database en Tantor; getest bij 12.000 actieve sessies. ([Strategy Partners, p. 30](https://strategy.ru/media/uploads/2025/08/SP_Обзор_российского_ПО_по_управлению_строительными_проектами_август.pdf))

**Beoordeling.** 1C wint op distributie, boekhoudkundige lokalisatie en prijs, niet op planningskracht. Strategy Partners noteert expliciet dat de samenwerkingsfuncties van 1С-Рарус УСО beperkt zijn, waardoor klanten het combineren met Project Point of Signal als "front-end" van de bouwplaats. **Voor echte CPM is 1C geen serieuze concurrent — het is de boekhoudkundige ruggengraat waar een planningstool naast moet passen.**

### 4.6 ADVANTA — de sterkste Russische PPM-speler

Prijzen ([advanta-group.ru/price](https://www.advanta-group.ru/price/)):

| Model | Prijs |
|---|---|
| SaaS (cloud) | **vanaf 4.500 RUB per gebruiker per maand**; minimaal 10 licenties; jaarlijkse vooruitbetaling; minimaal 12 maanden; hosting en uitrol inbegrepen |
| Licentiehuur | op aanvraag; minimaal 10 licenties; hosting apart; minimaal 36 maanden |
| Eeuwigdurende licentie | op aanvraag |
| Online cursus | vanaf 7.500 RUB |
| Express-diagnose | 170.000 RUB |

**Rekenvoorbeeld:** 10 gebruikers × 4.500 RUB × 12 = **540.000 RUB per jaar**. Vergelijk: 10 Spider Project Desktop-licenties = **1.600.000 RUB** eenmalig — 5 × 170.000 (staffel 1e–5e) + 5 × 150.000 (staffel 6e–15e) — dus terugverdiend na **~3,0 jaar** t.o.v. ADVANTA-SaaS. **[GECORRIGEERD: eerder stond hier 1.550.000 RUB en ~2,9 jaar; dat was een optelfout van 50.000 RUB.]** Dat is het kernverschil tussen de twee businessmodellen in deze markt.

Sterke punten volgens reviews: doorlopende analytics over alle projecten, baselines, multi-projectanalyse. Zwakke punten: hogere kosten, ontworpen voor portfoliobeheer (dus overkill voor één bouwproject). ([Shtab-vergelijking](https://shtab.app/blog/chiem-zamienit-microsoft-project-v-rossii-ghaid-po-sistiemam-s-diaghrammoi-ganta/))

### 4.7 Rosatom Multi-D — de in-house concernstandaard

Ontwikkeld door de engineeringdivisie van Rosatom (ASE). Omvat kalender-netwerkplanning, week-dagplanning, normering van projectwerk, middelenallocatie, risicoanalyse en beheer van bouw- en montagewerk over meerdere hiërarchische niveaus. Productvarianten: Multi-D IMS, Multi-D Unified Time Schedule, Planner System, Multi-D Project. Contact: multi-d@ase-ec.ru.

**Waarom dit ertoe doet.** Rosatom bouwt kerncentrales in Turkije, Egypte, India, Bangladesh, Hongarije, Wit-Rusland en Oezbekistan. Multi-D reist mee. Dat maakt het de facto de enige Russische planningsmethodiek met echte internationale projectvoetafdruk — al is het geen commercieel verkocht product.

### 4.8 De nieuwe generatie bouwplatforms (planning als module)

Uit het Strategy Partners × Minstroj-onderzoek (aug. 2025), met werkelijke prijsstructuren — zeldzaam in deze markt:

**Pragmacore** (Skolkovo-resident, SaaS-only)
- Model: "product voor het project" — abonnement gekoppeld aan één bouwproject, **onbeperkt aantal gebruikers**
- Prijs: **~100.000 RUB/maand** voor kleine projecten tot **~300.000 RUB/maand en hoger** voor grote (begroting >5 mld RUB)
- Doelgroep: ontwikkelaars en hoofdaannemers met projecten vanaf ~1 mld RUB
- Planning: planning en beheer van het werkschema, koppeling van middelen, uitgifte van dienstopdrachten (СНЗ), digitale voortgangsregistratie, basis- en operationele plannen, scenariobeheer
- Integraties: BIM, **Primavera**, 1C, drones, MTO-beurzen, AI/ML (berekening "open werkfront", einddatumprognose)
- Claim: ~7% lagere bouwkosten
- SWOT-zwakten volgens het rapport: vereist maatwerk voor smalle taken, plaatselijk overladen interface, beperkte support met lange doorlooptijd bij problemen, hoge individuele implementatiekosten

**ЦУС ("Digitaal bouwbeheer")** — corporate licentie, prijs op maat, enterprise-niveau. Ingezet bij **Roskapstroj en Minstroj**. Kan **schema's importeren uit Primavera en Excel**, plan-feitanalyse, achterstandsdetectie. Uniek: apart toegangscircuit voor **Rostechnadzor/GASN** (toezichthouders). Ondersteunt GOST R 70108–2022 voor uitvoeringsdocumentatie.

**SKRIPTUM (OOO Enkisoft)** — de duurste die openbaar prijst:

| Post | Prijs |
|---|---|
| Basislicentie (1 project, tot 300 gebruikers + 1 testproject) | **1.780.000 RUB/maand** excl. btw |
| Module auteurstoezicht/ingangscontrole/geodesie/planning/uitvoeringsdocumentatie | 1.960.000 RUB/maand |
| Module 3D-data (UAV-fotoverwerking, puntenwolken, orthofoto's) | 1.245.000 RUB/maand |
| Uitrol op klantservers | 1.850.000 RUB eenmalig |
| Technische ondersteuning | 1.345.000 RUB/maand |
| Projectadministratie door leverancier | 1.325.000 RUB/maand |

**ALTIUS-achtige gelaagde licentie** (LITE / STANDARD tot 25 gebruikers / PROF met documentbeheer en planningsmodules / PREMIUM voor holdings): **60.000 RUB tot 1.800.000 RUB** afhankelijk van pakket, plus implementatie, training en support.

**Adept** — per werkplek gelicentieerd: calculatoren krijgen "Адепт:Смета", planners "Адепт:Управление строительством". Kosten per module "enkele honderdduizenden roebels" eenmalig, plus betaald onderhoud (normupdates, support) op abonnementsbasis.

**Sodis Building CM** — kalender-netwerkplanningsmodule met **tweerichtingssynchronisatie met MS Project**. Abonnement per gebruiker per maand óf boxed levering met hogere eenmalige kosten.

**Overige spelers uit het onderzoek:** Sarex, Project Point, DACON, Signal, 1С-Рарус, functionaliteit "Digitale bouwcontrole in de woningsector" van DOM.RF. Daarnaast buiten het rapport: **Larix.Nexus** (geïntegreerd projectbeheer-ecosysteem), **Neosintez** (PLM/PDM voor industriële en civiele bouw, met KSG-monitoring gekoppeld aan 3D-modellen) en **Gektor** (meerlaagse geneste werkuitvoeringsschema's).

**Licentiemodellen in de Russische bouwsoftware** ([Strategy Partners, p. ~2117](https://strategy.ru/media/uploads/2025/08/SP_Обзор_российского_ПО_по_управлению_строительными_проектами_август.pdf)):
- **~40%** alleen SaaS-abonnement
- **~40%** hybride (abonnement én eeuwigdurende licentie)
- **~20%** overwegend boxed licenties

**Wat de prijs bepaalt** (aandeel in de prijsformules van de onderzochte producten): aantal gebruikers 29%, modulepakket 23%, plaatsing SaaS/on-premise 15%, aantal projecten 15%, opslagvolume 9%, licentietermijn 9%.

### 4.9 Generieke Russische PM-tools en westerse SaaS

Uit de vergelijking op [shtab.app](https://shtab.app/blog/chiem-zamienit-microsoft-project-v-rossii-ghaid-po-sistiemam-s-diaghrammoi-ganta/):

| Product | Herkomst | Prijs | Sterk | Zwak |
|---|---|---|---|---|
| **Shtab** | RU | vanaf 133 RUB/maand | taken ook als kalender/matrix/lijst | jonge speler |
| **ADVANTA** | RU | vanaf 4.500 RUB/maand | doorlopende multi-projectanalytics, baselines | duur, portfolio-georiënteerd |
| **Naumen Project Ruler** | RU | op aanvraag | duizenden taken, strenge rapportage-eisen, .mpp-import, meerdere baselines, ploegendienstregistratie, scenariomodellering | enterprise-only, geen transparante prijs |
| **GanttPRO** | PL (oorspr. BY) | $7–25/gebr./mnd | intuïtieve interface, .mpp-import | cloud-only |
| **Wrike** | US | vanaf $10/mnd | diepe automatisering | complexe interface |
| **ClickUp** | US | vanaf $7/mnd | vervangt meerdere diensten | **geen .mpp-import** |
| **Asana** | US | vanaf $10,99/mnd | afdelingscoördinatie | niet Gantt-first |
| **monday.com** | IL/US | vanaf $9/mnd | flexibele aanpassing | eigen logica vergt inwerktijd |
| **Smartsheet** | US | vanaf $9/mnd | Excel-achtige aanpak | leercurve voor klassieke PM'ers |
| **ProjectLibre** | US | gratis | bekende MS Project-kloon, .mpp-import | desktop-only, beperkte samenwerking |
| **GanttProject** | int. | gratis | licht en simpel | minimale geavanceerde functies |

**GanttPRO-details** ([ganttpro.com/pricing](https://ganttpro.com/pricing/)): Core $7, Advanced $10, Business $17, Enterprise $25 per gebruiker per maand bij jaarbetaling (Enterprise min. 5 gebruikers). Claim: >1 miljoen projectmanagers. Rechtspersoon: **DPM Solutions Sp. z o.o., Polen**.

**Waarschuwing bij de westerse SaaS-kolom.** Deze prijzen gelden voor Kazachstan en Oezbekistan. Voor Russische en Wit-Russische organisaties zijn deze diensten onder het OFAC-SaaS-verbod (sinds 12-09-2024) formeel niet leverbaar; gebruik verloopt via persoonlijke accounts, buitenlandse rechtspersonen of betaling via derde landen.

**Verder in de Russische markt genoemd** ([IT-World](https://www.it-world.ru/it-news/c8cyg8jnfns4kk0sckoc8gwskkcco4o.html)): Grand-Smeta, Directum Projects, PM Forsight, Visary Project, Timetta, im.timesheet, Aspro.Agile, Comindware, ELMA365 Проекты, Kaiten, Megaplan, plus R7-Office en ProjectLibre als open-source-vangnet.

### 4.10 Mijnbouwplanning

**Deswik** (incl. Deswik.IS voor scheduling en Deswik Spatial voor CAD), **Micromine** (met eigen Kazachse aanwezigheid via micromine.kz), **Datamine** en **Studio NPVS** worden actief ingezet in Rusland en Kazachstan; Russische mijnbouwuniversiteiten nemen Deswik op in hun curriculum. Ik heb **geen bevestiging gevonden** van een gestructureerde sanctie-uittocht of substitutie in dit segment — anders dan bij algemene bedrijfssoftware. De Russische inheemse tegenhanger is **MineFrame**. Voor Kazachstan is dit een normale, ongehinderde westerse markt.

*Kanttekening: mijnbouwplanning is een apart ecosysteem dat via geologische blokmodellen werkt, niet via CPM-netwerken. De Gantt/CPM-laag zit er wel in (Deswik.IS), maar de aanschafbeslissing wordt gedreven door de geologie-/ontwerpmodule.*

---

## 5. Prijzen, licentiemodellen en de kosten eromheen

### 5.1 Samenvattende prijstabel

| Product | Model | Prijs | Bron |
|---|---|---|---|
| Spider Project Lite | eeuwigdurend | $800 | [spiderproject.pro](https://www.spiderproject.pro/en/price-list/) |
| Spider Project Desktop | eeuwigdurend | 115.000–170.000 RUB / $1.150–1.700 | [iesoft.ru](https://www.iesoft.ru/products/spider_project/spider-project-desktop/) |
| Spider Project Desktop Plus | eeuwigdurend | $1.700–2.250 | [spiderproject.pro](https://www.spiderproject.pro/en/price-list/) |
| Spider Project Professional | eeuwigdurend | 225.000–450.000 RUB / $2.250–4.500 | [iesoft.ru](https://www.iesoft.ru/products/otechestvennoe-po/spider_project/spider-project-professional/) |
| Oracle Primavera P6 Professional | eeuwigdurend | ~$2.500–3.500 + $500–800/jr support [SECUNDAIR] | ITQlick-schatting |
| 1С:PM Управление проектами ПРОФ | eeuwigdurend + ITS | 69.200 RUB basis; 41.600 RUB/werkplek | [1C](https://solutions.1c.ru/catalog/pm-prof/buy) |
| 1С:ERP УСО 2 | eeuwigdurend + ITS | ~780.000 RUB (server) + werkplekken | [Strategy Partners, p. 30](https://strategy.ru/media/uploads/2025/08/SP_Обзор_российского_ПО_по_управлению_строительными_проектами_август.pdf) |
| ADVANTA | SaaS | vanaf 4.500 RUB/gebr./mnd, min. 10 | [advanta-group.ru](https://www.advanta-group.ru/price/) |
| Pragmacore | SaaS per project | 100.000–300.000+ RUB/mnd, onbeperkt gebruikers | [Strategy Partners, p. ~14](https://strategy.ru/media/uploads/2025/08/SP_Обзор_российского_ПО_по_управлению_строительными_проектами_август.pdf) |
| SKRIPTUM (Enkisoft) | maandlicentie | 1.780.000 RUB/mnd basis (tot 300 gebr.) | [Strategy Partners, p. 38](https://strategy.ru/media/uploads/2025/08/SP_Обзор_российского_ПО_по_управлению_строительными_проектами_август.pdf) |
| ALTIUS-type gelaagd | eeuwigdurend | 60.000–1.800.000 RUB | [Strategy Partners, p. ~36](https://strategy.ru/media/uploads/2025/08/SP_Обзор_российского_ПО_по_управлению_строительными_проектами_август.pdf) |
| Shtab | SaaS | vanaf 133 RUB/mnd | [shtab.app](https://shtab.app/blog/chiem-zamienit-microsoft-project-v-rossii-ghaid-po-sistiemam-s-diaghrammoi-ganta/) |
| GanttPRO | SaaS | $7–25/gebr./mnd | [ganttpro.com](https://ganttpro.com/pricing/) |
| ProjectLibre / GanttProject / OpenProject | open source | gratis | — |

### 5.2 Training en consultancy

- **MGSU** (Moskouse Staatsuniversiteit voor Bouwkunde): 72-uurs programma kalender-netwerkplanning, gemengd format, **20.500 RUB**
- **Omscholing op afstand met diploma:** vanaf **15.990 RUB** (ObuchenieProsto.ru)
- **ADVANTA online cursus:** vanaf **7.500 RUB**; **express-diagnose 170.000 RUB** ([advanta-group.ru](https://www.advanta-group.ru/price/))
- **PMSOFT** claimt cumulatief **80.000 opgeleide specialisten** ([pmsoft.ru](https://www.pmsoft.ru/))
- Primavera-trainingsaanbieders in Rusland (nog steeds actief ondanks de terugtrekking van Oracle): pmtrain.ru, pm-partner.ru, primaverap6.spb.ru, edu.fors.ru, specialist.ru
- In Kazachstan: plan-fact.kz, pkplus.kz (Almaty), CiscoTrain, STEX (Almaty/Astana), plus internationale aanbieders (Invensis Learning, The Knowledge Academy) met .kz-vestigingen

**Kostenverhouding [SCHATTING].** Op basis van de prijzen hierboven en de implementatiediensten in het Strategy Partners-rapport (uitrol 1.850.000 RUB eenmalig, support 1.345.000 RUB/maand bij SKRIPTUM; ADVANTA-diagnose 170.000 RUB) schat ik dat **implementatie en training bij enterprise-projecten 1–3× de licentiekosten** bedragen, en bij grote platformen meer. Bij een desktoptool als Spider Project ligt die verhouding veel gunstiger (training ~5–15% van de licentiekosten). Dat is een structureel voordeel van desktop-CPM-tools in een markt met krappe IT-budgetten.

**Doorlooptijd van implementatie.** De overgang naar een volledig KSUP (corporate projectmanagementsysteem) duurt **6 maanden tot 1,5 jaar** afhankelijk van bedrijfsomvang. Migratie van een klein bureau (2–4 projecten, 10–15 medewerkers) duurt 2–4 weken; bij 8–10 projecten en 50–100 medewerkers ongeveer een maand. ([humresplan.ru](https://humresplan.ru/blog/importozameshchenie-ms-project-primavera/))

### 5.3 Valuta-effecten en prijsniveau

- Spider Project hanteert een vaste 100:1-pariteit tussen roebel- en dollarprijzen, ongeacht de marktkoers — Russische kopers betalen dus effectief méér bij een sterke roebel en minder bij een zwakke.
- 1C prijst uitsluitend in roebels en heeft geen valuta-exposure — een van de redenen dat het volume wint.
- Westerse SaaS is in roebels dramatisch duurder geworden: monday.com à $9/gebruiker/maand kostte in 2021 (~74 RUB/USD) ~666 RUB, in 2024 (~92 RUB/USD) ~830 RUB en op koerspieken >$9 × 110 = ~990 RUB. Gecombineerd met betalingsproblemen (kaarten van Russische banken werken niet bij westerse SaaS) is dat een prohibitieve barrière, los van de sancties.
- **Betaling in roebels bij een Russische rechtspersoon is inmiddels een expliciet verkoopargument** van Russische leveranciers (zie de positionering van VK Workspace en Naumen).

---

## 6. Lokale bijzonderheden

### 6.1 Aanbestedings- en contracteisen

**Rusland.**
- **Kalender-netwerkschema (КСГ) — genuanceerder dan eerder gesteld. [GECORRIGEERD]** Wat wettelijk vaststaat is dat **art. 34 lid 12 van 44-FZ** een *график исполнения контракта* verplicht stelt voor contracten **boven 100 mln RUB met een looptijd van meer dan 3 jaar** — dus voor een deelverzameling van de opdrachten, niet categorisch voor elk bouwcontract. Voor bouw-/montagewerk komt daar in de praktijk een *график выполнения строительно-монтажных работ* bij als contractbijlage. **Een volwaardig CPM-netwerkschema is nergens als zodanig voorgeschreven**; het gaat om een uitvoeringsgrafiek. Regeringsbesluit **nr. 1315 van 09-08-2021** regelt de wijzigingsprocedures voor bouwcontracten (o.a. prijsaanpassing tot 30% onder voorwaarden) waarbij het werkschema als contractbestanddeel fungeert. Regeringsbesluit **nr. 680 van 16-04-2022** (bijgewerkt 28-12-2024) regelt de wijziging van wezenlijke contractvoorwaarden bij staats- en gemeentelijke bouwopdrachten.
- KSG-planning wordt in de praktijk over **vijf detailniveaus** opgezet, van algemene projecttijdlijn tot operationeel weekschema. Aannemers gebruiken het om werkfasen met begin- en einddatums vast te leggen, geraamde kosten per fase te berekenen en haalbaarheid aan te tonen.
- **Er is géén verplicht bestandsformaat — BEVESTIGD.** Er bestaat zelfs geen goedgekeurd standaardsjabloon: *"Единый образец графика выполнения работ по 44-ФЗ законом не утвержден, документ составляют в свободной форме."* Anders dan bij NEC/FIDIC-projecten in het Westen, waar levering in **XER of .mpp** contractueel wordt afgedwongen, eist de Russische staatsopdrachtgever **een schema, geen XER-bestand**. In de praktijk wordt geleverd in Excel, PDF of het formaat van de gebruikte tool. Dat is de belangrijkste reden waarom de Primavera-lock-in in Rusland *zwakker* is dan in het Golf-gebied of het VK — en waarom substitutie überhaupt mogelijk bleek.
- **GOST R 70108–2022** regelt elektronische uitvoeringsdocumentatie; ЦУС en andere platformen zijn daarop gebouwd.
- **TIM/BIM-mandaat.** Toenemende overheidseisen aan het gebruik van informatiemodellering (ТИМ) in de bouw drijven de ERP-markt volgens Strategy Partners expliciet aan.
- **ST RK ISO 21500 / PMBoK Construction Extension** worden als methodische kaders gebruikt.

**Kazachstan.**
- **FIDIC** is de contractstandaard voor EPC-projecten. Academische en juridische bronnen bespreken uitgebreid waar FIDIC-bepalingen botsen met Kazachs civiel en fiscaal recht, met name rond gebrekenherstel (art. 11) en gemaximeerde vertragingsschade.
- **Standaard ST RK ISO 21500** definieert projectmanagement nationaal; er zijn beroepsstandaarden voor ПСД (projectdocumentatie) en САПР.
- Aanbestedingen lopen via **zakup.gov.kz** (Единая платформа закупок), aangevuld met commerciële platforms (mp.kz, tenderbot.kz, ets-tender.kz, sadi.kz) — >5.000 aanbestedingen per dag op de grootste aggregator.
- Grote operators — **KazMunayGas**, **Tengizchevroil** — werken met Primavera P6 voor contractorbeheer en projectplanning, inclusief de Tengiz-uitbreiding. FIDIC/EPC-contracten met internationale hoofdaannemers brengen de gebruikelijke **verplichte P6-levering** met zich mee. **Dit is het belangrijkste verschil met Rusland: in Kazachstan bestaat de contractuele P6-verplichting wél.**

**Oezbekistan.** Beweegt richting internationale standaardpraktijk. Oezbekneftegaz stapt over op Primavera P6 EPPM; PMEG (Tasjkent) levert PMO-diensten met P6, BIM en EVM; KEYSOFT LLC is Oracle-partner.

**Wit-Rusland.** Documentatiestandaarden zijn gecodificeerd (belforma.net biedt bouwschemasjablonen conform Wit-Russische normen). Calculatie-/smeta-software domineert het lokale landschap.

### 6.2 Opleidingscultuur

De Russische planningscultuur is **methodologisch sterk en institutioneel diep**. Kalender-netwerkplanning (КСП) is een aparte, herkenbare beroepsdiscipline met eigen vacaturetitels, eigen universitaire cursussen (MGSU) en eigen postuniversitaire omscholingsprogramma's — geen bijrol van de projectleider. Het Sovjet-erfgoed van normatieve planning (ГЭСН/ФЕР, productienormen) leeft door in de manier waarop duur uit hoeveelheden en productiviteiten wordt afgeleid, in plaats van uit ervaringsschattingen.

Dat verklaart:
- waarom Spider Project's volumegebaseerde planning lokaal als vanzelfsprekend wordt ervaren en internationaal als exotisch;
- waarom Russische klanten volgens Directum inmiddels **expliciet vragen om een intuïtieve interface zodat training minimaal tijd en geld kost** — een reactie op decennia van zware, specialistengerichte tools;
- waarom er een florerende trainings- en consultancy-industrie omheen bestaat (PMSOFT alleen al 80.000 cursisten).

### 6.3 Resellers en kanaal

- **PMSOFT** — de dominante consultancy/systeemintegrator in dit domein. 30+ jaar, voormalig Oracle Platinum-partner voor Rusland/GOS/Baltische staten, zeven competentiecentra (engineering, consulting, projectmanagement, softwareontwikkeling, projectdiensten, training, technische ondersteuning). Eigen productlijn PM.soft (PM.planner, PM.customer, PM.cost, PM.bi, PM.integrator, PM.fm, PMProgress, PMAgent) plus distributie van derden. ([pmsoft.ru](https://www.pmsoft.ru/))
- **Spider Project Team** — directe verkoop plus regionale vertegenwoordigers in Kazachstan, Roemenië, Brazilië, Australië, Israël, VS en Colombia.
- **iesoft.ru** en vergelijkbare Russische softwarehandelaren — wederverkoop van registersoftware, met elektronische levering in 5–7 dagen, zonder btw.
- **Kazachstan:** implementatiepartners voor westerse producten (Conteq voor MS Project Online, plan-fact.kz voor P6), geen eigen productontwikkeling.
- **Oezbekistan:** KEYSOFT LLC (Oracle Member Partner, Tasjkent), PMEG (PMO-diensten).

### 6.4 De rol van Excel en informele licenties

- **43%** van de Russische bedrijven bouwt planningsprocessen nog in Excel; **33%** past hybride modellen toe (Excel + boekhoudsystemen + BI). [SECUNDAIR — RBC-onderzoek] *Kanttekening: dit cijfer betreft bedrijfsplanning breed, niet specifiek bouwscheduling; behandel het als indicatie van de Excel-cultuur, niet als exact KSP-cijfer.*
- **Illegaal gebruik van engineeringsoftware steeg van 65% (2023) naar 70% (2024)** onder Russische ingenieurs die met westerse tools werken. **[BEVESTIGD]** — de primaire bron is **Strategy Partners**, aangehaald door Nanosoft en overgenomen door [Kommersant](https://www.kommersant.ru/doc/7674514) en finance.mail.ru. De trigger: Autodesk blokkeerde in het voorjaar van 2024 AutoCAD-functionaliteit in Rusland, óók in gekraakte versies.
- **28%** van de bedrijven gebruikt ongelicentieerde buitenlandse software omdat er geen Russisch alternatief is; bijna **22%** ziet geen probleem in ongelicentieerde oplossingen. **[ONBEVESTIGD]** — ik heb deze twee percentages in de tweede onderzoeksronde niet aan een bron kunnen koppelen; niet gebruiken zonder eigen verificatie.
- Rusland heeft, anders dan Wit-Rusland, **geen formele legalisatie** van dit gebruik doorgevoerd — er is discussie geweest over "dwanglicenties" maar de praktijkkloof blijft juridisch ongeregeld.
- De Russische engineeringsoftwaremarkt groeide desondanks met **16–18% in 2024**. [SECUNDAIR]

**Implicatie voor elke nieuwe toetreder.** De concurrent is niet primair Primavera of Spider Project — het is een gratis gekraakte MS Project naast een Excel-blad. Een product moet zowel goedkoper zijn dan het legale alternatief als beter dan het illegale. Open source of een royaal gratis tier is in deze markt geen marketingtruc maar een noodzakelijke toegangsprijs.

### 6.5 Wat klanten in 2024–2025 daadwerkelijk vroegen

Uit het TAdviser-onderzoek ([Korus Consulting PDF](https://korusconsulting.ru/upload/generated_pdf/rossiyskiy-rynok-sistem-upravleniya-proektami.pdf)), letterlijk de selectiecriteria die klanten noemden:

- stabiliteit van het systeem
- kwaliteit van dienstverlening en support van de leverancier
- competentie van de integrator
- benodigde mogelijkheden "in de doos"
- **aanwezigheid van een volwaardige Gantt-diagram**
- eenvoudige configuratie van functies, objecten en processen zónder programmeren
- flexibele rolinstellingen
- **"naadloze" overgang vanaf huidige oplossingen via correcte datamigratie**
- aanwezigheid van een API
- prettige interface en makkelijk te leren
- ontwikkelde expertcommunity rond het product

**"De aanwezigheid van mechanismen om data uit buitenlandse projectmanagementsystemen naar Russische over te zetten wordt een zwaarwegend argument bij de keuze van een oplossing."** Dat is de meest bruikbare zin uit het hele onderzoek voor iedereen die met een open-formaat-planningstool deze markt bekijkt.

---

## 7. Voor- en nadelen van lokale en niche-pakketten

*Op basis van reviews, fora, leveranciersdocumentatie en het Strategy Partners-onderzoek.*

| Pakket | Voordelen | Nadelen |
|---|---|---|
| **Spider Project** | Resource-/kosten-/materiaalgeconditioneerde optimalisatie; volumegebaseerde duur passend bij ГЭСН-normen; Resource Critical Path; Monte Carlo met slaagkanstrends; registernr. 2861; eeuwigdurende licentie; 37 landen; Olympische en WK-referenties | Interoperabiliteit: schema's vergen vertaling naar P6 voor internationale samenwerking; gedateerde, dichte interface; steile leercurve; klein ecosysteem en kleine talentpool; desktop-georiënteerd terwijl de markt naar SaaS gaat; sleutelpersoonrisico |
| **PM.planner (PMSOFT)** | Enige expliciete P6-functievervanger; resultaten komen overeen met P6 (leverancierclaim); getest op 150.000 activiteiten; ondersteuning van het P6-/MS Project-**datamodel** + XLSX (**XER onbevestigd**); Astra Linux + PostgreSQL; registernrs. 26896 (28-02-2025) / 18887 (05-09-2023); open API; achter de grootste consultancy in het domein | Jong product met beperkte referentiebasis; prijs niet openbaar (drempel voor mkb); afhankelijk van consultancy-implementatie; leverancier heeft eigen Oracle-erfenis te managen |
| **1С:PM / 1С:ERP УСО** | Onverslaanbare distributie en partnernetwerk; diepste Russische boekhoudlokalisatie; transparante prijslijst; 550+ implementaties; schaalt tot 12.000 sessies; PostgreSQL/Astra-compatibel | Planningsmotor is zwak vergeleken met echte CPM-tools; samenwerkingsfuncties beperkt (klanten combineren met Project Point/Signal); 1С:Предприятie-platformafhankelijkheid; totale kosten lopen op via client-licenties + ITS |
| **ADVANTA** | Sterkste Russische portfolio-analytics; baselines; transparante SaaS-prijs; volwassen implementatiemethodiek | Duur (min. 10 licenties × 4.500 RUB/mnd = 540.000 RUB/jr); portfoliogericht dus zwaar voor één bouwproject; eeuwigdurende licentie alleen op aanvraag |
| **Naumen Project Ruler** | Verwerkt duizenden taken; .mpp-import; meerdere baselines; ploegendienstregistratie; scenariomodellering; registervermelding; migratiepad vanaf Jira/Trello/Asana/Wrike/MS Project | CPM/kritiek pad niet expliciet gedocumenteerd — het is een PPM-tool met Gantt, geen CPM-motor; enterprise-only; geen transparante prijs |
| **Pragmacore** | Projectgebonden prijs met onbeperkt gebruikers (alle partijen kunnen aanhaken); integratie met BIM, **Primavera** en 1C; AI/ML voor werkfront en einddatumprognose; claim ~7% kostenreductie | Alleen SaaS (geen on-premise voor gesloten circuits); vereist maatwerk voor smalle taken; interface plaatselijk overladen; beperkte support met lange doorlooptijd; hoge individuele implementatiekosten; minimumproject ~1 mld RUB begroting |
| **ЦУС** | Uniek toezichtcircuit voor Rostechnadzor/GASN; on-premise mogelijk (kritiek voor overheidsperimeters); importeert schema's uit **Primavera en Excel**; GOST R 70108–2022; referenties bij Roskapstroj en Minstroj | Enterprise-only, prijs niet openbaar; te complex en te duur voor mkb; vereist dat de organisatie zich aan de systeemlogica aanpast |
| **SKRIPTUM (Enkisoft)** | Moderne architectuur (microservices, GraphQL, NATS, PostgreSQL, S3-compatibel); volledige bouwcontrolescope; 3D/UAV-module | Extreem duur: 1,78 mln RUB/maand basis, modules tot 1,96 mln RUB/maand, support 1,345 mln RUB/maand — alleen voor megaprojecten |
| **Adept** | Modulair per rol (calculator vs. planner); volwassen, sterk genormeerd; normupdates via onderhoud | Per-werkplek licenties lopen snel op; klassieke desktop-clientserverarchitectuur; nauw aan Russische normatieve praktijk gebonden (weinig exportwaarde) |
| **Sodis Building CM** | Tweerichtingssynchronisatie met MS Project (migratievriendelijk); keuze abonnement of boxed | Planning is een module in een monitoringplatform, geen zelfstandige planner |
| **GanttPRO** | Zeer lage instap ($7); intuïtief; .mpp-import; 1 mln+ gebruikers | Cloud-only; geen echte resource-optimalisatie; inmiddels Pools bedrijf, wat het in RU-aanbestedingen diskwalificeert |
| **Shtab / Kaiten / Yandex Tracker / Megaplan** | Goedkoop, snel, registervermeld, roebelbetaling, Russische support | Geen serieuze CPM; Gantt is een weergave, geen planningsmotor; ongeschikt voor bouwschema's met duizenden activiteiten en middelenbeperkingen |
| **ProjectLibre / GanttProject** | Gratis; .mpp-import; MS Project-achtige interface | Desktop-only; beperkte samenwerking; minimale geavanceerde functies; geen support; niet in het Russische register (dus onbruikbaar in aanbestedingen met nationaal regime) |
| **Multi-D (Rosatom)** | Bewezen op de meest complexe projectklasse (kerncentrales); volledige KSP + week-dagplanning + normering + risico's; reist mee naar exportprojecten | Niet commercieel verkrijgbaar; concerneigen; geen ecosysteem buiten Rosatom |

---

## 8. Conclusies met relevantie voor een open, IFC-gebaseerde planningstool

1. **Het gat zit in de CPM-motor, niet in de PPM-schil.** Rusland heeft tientallen nieuwe PPM- en bouwplatformen gekregen, maar het segment "branchespecifieke oplossingen" blijft steken op 9% / ~600 mln RUB **binnen het Russische softwaresegment** juist omdat een volwaardige Primavera-vervanger ontbreekt (Naumen, letterlijk: *"Это связано с отсутствием полной замены Oracle Primavera"*). Alleen PM.planner en Spider Project spelen serieus in die klasse.

2. **Datamigratie is het aankoopcriterium, niet functionaliteit.** Het TAdviser-onderzoek zegt het letterlijk — *"Наличие механизмов или готовность вендора перенести данные из зарубежных СУП в российские становятся весомым аргументом при [выборе решения]"* — geverifieerd in de primaire tekst. XER-, .mpp- en Excel-import zijn geen nice-to-have. **Sterker nog:** omdat zelfs PM.planner, de meest gerichte P6-vervanger, geen expliciete XER-uitwisseling claimt (alleen datamodel-ondersteuning + XLSX — zie § 4.4), is dit gat groter dan het lijkt en is het het meest verdedigbare openingspunt voor een open-formaat-tool.

3. **Er is geen verplicht uitwisselformaat in Russische staatsopdrachten**, anders dan in FIDIC/NEC-markten. Dat verlaagt de drempel voor een nieuw formaat aanzienlijk — maar het betekent ook dat er weinig druk is om weg te bewegen van Excel.

4. **In Kazachstan en Oezbekistan geldt het omgekeerde:** FIDIC/EPC-contracten dwingen P6-levering af. Een tool die daar wil meedoen moet XER kunnen produceren dat een P6-planner accepteert.

5. **Prijsanker:** een eeuwigdurende desktop-CPM-licentie ligt in Rusland tussen 115.000 en 450.000 RUB (Spider Project). SaaS-PPM begint bij 4.500 RUB/gebruiker/maand (ADVANTA). Alles daarboven vereist een enterprise-verkoopproces.

6. **Registerstatus is een harde poort.** Zonder inschrijving in het Russische softwareregister is deelname aan aanbestedingen onder 44-FZ/223-FZ en gebruik op КИИ-objecten uitgesloten. Voor buitenlandse open-sourceprojecten is dat structureel onhaalbaar; de realistische route is een lokale fork of lokale rechtspersoon.

7. **De sanctiemuur werkt beide kanten op.** Een in de EU ontwikkeld product kan sinds maart 2024 niet legaal aan Russische ondernemingen worden geleverd wanneer het als enterprise-managementsoftware of ontwerpsoftware kwalificeert. Kazachstan en Oezbekistan zijn wel gewoon toegankelijk; Wit-Rusland niet.

---

## 9. Bronnen

**Marktonderzoek en analyse**
- Strategy Partners × Minstroj RF, *Обзор российского программного обеспечения по управлению строительными проектами*, augustus 2025 (61 p.) — https://strategy.ru/media/uploads/2025/08/SP_Обзор_российского_ПО_по_управлению_строительными_проектами_август.pdf
- Novemberversie via Minstroj: https://minstroyrf.gov.ru/docs/436779/
- TAdviser, *Российский рынок систем управления проектами*, 21 februari 2025, herpublicatie Korus Consulting — https://korusconsulting.ru/upload/generated_pdf/rossiyskiy-rynok-sistem-upravleniya-proektami.pdf
- TAdviser wiki: https://www.tadviser.ru/index.php/Статья:Системы_управления_проектами_(рынок_России)
- Naumen, marktonderzoek projectmanagementsystemen (enquête april–juni 2025, 50 IT-leiders) — https://www.naumen.ru/events/news/7454/
- IT-World, marktcijfers 2024/2025 en MS Project-marktaandeel — https://www.it-world.ru/it-news/c8cyg8jnfns4kk0sckoc8gwskkcco4o.html

**Leveranciers en prijzen**
- Spider Project internationale prijslijst — https://www.spiderproject.pro/en/price-list/
- Spider Project productoverzicht — https://www.spiderproject.pro/en/
- Spider Project Russische prijzen — https://www.spiderproject.ru/ru/pricelist/ (intermitterend HTTP 503)
- Spider Project Professional bij reseller — https://www.iesoft.ru/products/otechestvennoe-po/spider_project/spider-project-professional/
- Spider Project Desktop bij reseller — https://www.iesoft.ru/products/spider_project/spider-project-desktop/
- PMSOFT — https://www.pmsoft.ru/
- PM.planner — https://www.pmsoft.ru/pmplanner/
- 1С:PM Управление проектами ПРОФ (product) — https://solutions.1c.ru/catalog/pm-prof
- 1С:PM Управление проектами ПРОФ (prijzen) — https://solutions.1c.ru/catalog/pm-prof/buy
- ADVANTA prijzen — https://www.advanta-group.ru/price/
- Naumen Project Ruler — https://www.naumen.ru/products/project_ruler/
- GanttPRO prijzen — https://ganttpro.com/pricing/
- Shtab, vergelijking MS Project-alternatieven in Rusland — https://shtab.app/blog/chiem-zamienit-microsoft-project-v-rossii-ghaid-po-sistiemam-s-diaghrammoi-ganta/
- Platforms.su, Russische alternatieven voor Oracle Primavera P6 — https://platforms.su/analog/oracle-primavera-p6
- Directum Projects, analogen van MS Project — https://projects.directum.ru/blog-post/analogi-ms-projects
- Timetta, MS Project-alternatieven — https://timetta.com/ru/product/ms-project-alternatives

**Sancties en regelgeving**
- DS Avocats, analyse van het EU-verbod op IT-diensten en softwareverkoop aan Rusland (art. 5n(2b), bijlage XXXIX) — https://www.dsavocats.com/en/the-ban-on-providing-it-services-and-selling-software-to-russia-a-new-tool-to-limit-russias-industrial-capabilities/
- Europese Commissie, FAQ sancties Rusland — software (finance.ec.europa.eu; directe PDF-link tijdens onderzoek 404)
- Kontur, presidentieel decreet over importsubstitutie en nalevingscijfers — https://kontur.ru/talk/spravka/54411-ukaz_prezidenta_ob_importozameshchenii
- HumResPlan, importsubstitutie MS Project/Primavera, wettelijk kader 44-FZ/223-FZ/PP 1875 — https://humresplan.ru/blog/importozameshchenie-ms-project-primavera/

**Overig**
- isicad.ru, migratie van MS Project/Primavera — https://isicad.ru/ru/articles.php?article_num=22782
- DigitalDeveloper, importsubstitutie MS Project en Primavera — https://digitaldeveloper.ru/news/tsifrovizatsiya/3u3xyp22e1-importozameschenie-ms-project-i-primaver
- Your-Piter, importsubstitutie Oracle Primavera P6 / PM.planner — https://your-piter.ru/2023/12/14/3831145-importozameshhenie-oracle-primavera-p6-po-slovam-95wk/
- Kazachstan aanbestedingsplatform — https://zakup.gov.kz
- PMEG Oezbekistan — https://www.pmeg.uz/en
- Micromine Kazachstan — https://micromine.kz

**Aanvullend, uit de verificatieronde (juli 2026)**
- Habr, Naumen-marktonderzoek met volledige segmentatie (3,0 / 2,4 / 0,6 mld RUB) — https://habr.com/ru/news/933450/
- Kommersant, piraterij engineeringsoftware 65% → 70% en marktgroei 16–18% (Strategy Partners via Nanosoft) — https://www.kommersant.ru/doc/7674514
- ilex.by, verlenging wet 241-З tot en met 31-12-2026 bij wet 42-З van 02-12-2024 — https://ilex.by/news/v-belarusi-prodlili-parallelnyj-import-do-kontsa-2026-goda/
- BSB Bank, samenvatting wet 42-З van 02-12-2024 — https://www.bsb.by/novosti-bsb-banka/zakon-respubliki-belarus-ot-02-12-2024-n-42-z/
- Kremlin, decreet nr. 250 van 01-05-2022 (verbod per 1-1-2025) — http://kremlin.ru/acts/bank/47796
- OFAC FAQ 1184 / 1192, IT- en softwaredienstenverbod per 12-09-2024 — https://ofac.treasury.gov/faqs/1184
- Astana Times / finprom.kz / nationalbusiness.kz, Kazachse IT-dienstenmarkt 2025 (bron: Bureau voor Nationale Statistiek ASPiR RK) — https://astanatimes.com/

---

## 10. Wat ik niet heb kunnen vaststellen

Voor de volledigheid, de belangrijkste openstaande punten:

- **Geen officiële Oracle-prijslijst.** De Construction & Engineering Global Price List is niet meer publiek toegankelijk; de genoemde P6-prijzen zijn schattingen van derden.
- **Geen gepubliceerde marktomvang voor de KSP/CPM-niche specifiek** — mijn cijfer in § 2.3 is een eigen afleiding.
- **Kazachse en Oezbeekse marktcijfers zijn zwak onderbouwd.** Er bestaat geen equivalent van het Strategy Partners-rapport voor die landen; de macrocijfers komen uit persoverzichten die ik niet tot een primaire statistiekbron heb kunnen herleiden.
- **Geen bevestiging van gestructureerde sanctie-effecten in mijnbouwplanningssoftware** (Deswik, Micromine, Datamine) — dat segment lijkt anders te functioneren dan algemene bedrijfssoftware, maar ik heb daar geen harde bron voor gevonden.
- **Geen bevestigde cijfers over het aantal Primavera- of MS Project-licenties in Rusland.** Niemand publiceert die.
- **Het Excel-cijfer (43%) betreft bedrijfsplanning breed**, niet bouwscheduling specifiek — behandel het als cultuurindicatie.
- **Prijzen van PM.planner, Naumen Project Ruler, ЦУС, Sarex en de meeste enterprise-platformen zijn niet openbaar.** "Prijs op aanvraag" is in deze markt de norm; de prijzen die Strategy Partners wél publiceerde (Pragmacore, SKRIPTUM, ALTIUS-type) zijn de zeldzame uitzondering en daarom bijzonder waardevol.
- **Zoekbudget.** De WebSearch-tool was in deze sessie uitgeput; al het onderzoek is uitgevoerd via WebFetch met DuckDuckGo-HTML als zoekproxy, aangevuld met directe fetches en PDF-tekstextractie. Enkele Russische sites (spiderproject.ru, tadviser.ru) gaven intermitterend HTTP 503; die gegevens komen daarom via resellers en herpublicaties.

---

## Verificatie

**Uitgevoerd:** juli 2026, adversariële tweede ronde — doel was elke kernbewering te **weerleggen**, niet te bevestigen. Methode: primaire bronnen opnieuw en onafhankelijk opgehaald (waar mogelijk in het Russisch), de Strategy Partners-PDF (61 p.) en de Korus/TAdviser-PDF (47 p.) lokaal tekstgeëxtraheerd en doorzocht in plaats van via samenvattingen, en alle sommen nagerekend. Bevindingen zijn hierboven **direct in de tekst verwerkt** en gemarkeerd met [GECORRIGEERD] / [BEVESTIGD] / [ONBEVESTIGD].

**Twee bronnen die eerder alleen als secundair beschikbaar waren, zijn nu primair gelezen:** de volledige Strategy Partners-tekst en de volledige Korus/TAdviser-tekst. Dat verhoogt de betrouwbaarheid van § 2.1, § 4.8 en § 5.1 aanzienlijk en corrigeert tegelijk twee attributiefouten.

### A. Marktomvang en marktcijfers

| # | Bewering | Oordeel | Bevinding | Bron |
|---|---|---|---|---|
| A1 | PM-markt breed 2024 = **17,39 mld RUB**, bron MojOffice, prognose **+17%** in 2025 | **bevestigd** | Letterlijk in de primaire tekst: *"По оценке компании «Мой офис», общий объем рынка систем управления проектами в России в 2024 году составил 17,39 млрд рублей"* en *"рынок продолжит расти … и увеличится на 17% в 2025 году"*. Nagerekend: 17,39 × 1,17 = 20,35 → "~20,3 mld" klopt; /90 = $193 mln → "~$190 mln" klopt. Kanttekening: de +17% is een expertprognose die in de tekst *niet* expliciet aan de 17,39 wordt vastgeknoopt. | [korusconsulting.ru PDF](https://korusconsulting.ru/upload/generated_pdf/rossiyskiy-rynok-sistem-upravleniya-proektami.pdf) · [it-world.ru](https://www.it-world.ru/it-news/c8cyg8jnfns4kk0sckoc8gwskkcco4o.html) |
| A2 | Naumen: **6,0 mld RUB** (2024), **5,4** (2023), **6,6** prognose 2025, **CAGR 46%**, Russisch aandeel **25%→73%** | **bevestigd** | Alle vijf getallen teruggevonden. 5,4 voor 2023 is consistent met de gerapporteerde +11% groei in 2024 (6,0/1,11 = 5,41). Toegevoegd als context: de 46% CAGR staat haaks op +11% (2024) en +10% (2025) — front-loaded, niet actueel. | [naumen.ru](https://www.naumen.ru/events/news/7454/) · [habr.com](https://habr.com/ru/news/933450/) |
| A3 | Bouwmarkt **6,4 mld RUB (2024) ≈ $81 mln**, impliciete koers ~74 RUB/USD | **gecorrigeerd** | De koppeling bestaat in het rapport niet. Strategy Partners voert **twee reeksen**: roebels (4,5/5,0/5,3/5,6/**6,4**) en dollars (*"В 2024 г. его объем оценивался примерно в **81 млн долл.** (около **6 млрд руб.**)"*, 2023 $74 mln ≈ 5,5 mld). "6,4 mld ≈ $81 mln" impliceert 79 RUB/USD en mengt twee reeksen. Roebelreeks zelf: **exact bevestigd**. | [strategy.ru PDF, p. 5/8](https://strategy.ru/media/uploads/2025/08/SP_Обзор_российского_ПО_по_управлению_строительными_проектами_август.pdf) |
| A4 | Bouwmarkt-prognose **>8 mld RUB (>$100 mln) in 2027**, **8–10%** groei 2028–2030, digitalisering **4×** tegen 2028 | **bevestigd** | Letterlijk: *"превысит 100 млн долл. к 2027 г. (≈ 8 млрд руб.) и продолжит рост в 2028–2030 гг. темпами порядка 8–10% в год"* en *"К 2028 году объем рынка цифровизации строительной отрасли может вырасти в 4 раза"*. | [strategy.ru PDF](https://strategy.ru/media/uploads/2025/08/SP_Обзор_российского_ПО_по_управлению_строительными_проектами_август.pdf) |
| A5 | Russisch aandeel **25%→73%** (PM breed) en **~30%→~70%** (bouw-ERP) | **bevestigd** | Bouw: *"Доля российских ERP-систем в строительстве выросла с 30 до ~70% за 4 года"*; 2021 = 40% afleidbaar uit *"около 60% рынка приходилось на иностранные решения, на 1С — ~35%, прочие российские 5%"*; 2023 = ~55% expliciet. **De 2022-waarde (~50%) in mijn tabel is interpolatie, geen brongegeven** — als zodanig gemarkeerd. | idem |
| A6 | Segment branchespecifiek **≤9% / ~600 mln RUB**, toegeschreven aan het Primavera-gat; bron IT-World | **gecorrigeerd (getal juist, attributie fout)** | Het getal is echt en primair — maar het komt van **Naumen**, niet van IT-World: *"Отраслевые решения среди российского ПО пока занимают только 9% (600 млн рублей) … Это связано с отсутствием полной замены Oracle Primavera."* Het IT-World-artikel bevat het niet. Ook belangrijk: het is gemeten **binnen het Russische softwaresegment**, en 600/6.000 = 10%, niet 9% — gebruik een band, geen puntschatting. Volledige segmentatie 2024: 3,0 mld complex (50%) / 2,4 mld trackers (41%) / 0,6 mld branchespecifiek (9%). | [habr.com/ru/news/933450](https://habr.com/ru/news/933450/) |
| A7 | Naumen-prognose: Russische ontwikkelaars "**≥1 mld RUB omzet (+24%)**" | **gecorrigeerd** | Misgelezen. De Russische leveranciers draaiden **4,4 mld RUB in 2024** (van 3,3 mld in 2023) en gaan naar **5,4 mld in 2025**. "Не менее 1 млрд рублей … на 24% больше" betekent **1 mld RUB erbij**, niet 1 mld totaal (4,4 × 1,24 = 5,46 ✓). | [habr.com](https://habr.com/ru/news/933450/) · [naumen.ru](https://www.naumen.ru/events/news/7454/) |
| A8 | **53% niet overgestapt: 28% buitenlands, 25% "heeft geen systeem"** | **gecorrigeerd** | Naumen schrijft *"25% находятся на стадии планирования"* — in de **planningsfase van de migratie**, niet "zonder systeem". Materieel verschil: die 25% is een actieve koopmarkt, geen greenfield. | [naumen.ru](https://www.naumen.ru/events/news/7454/) |
| A9 | Bouwbedrijven besteden **<1% van de omzet aan IT** (tot 100 mln RUB/jaar) vs ~5% retail | **bevestigd** | Letterlijk: *"Девелоперы выделяют на ИТ-внедрения в среднем менее 1% выручки (как правило, до 100 млн руб. в год), тогда как лидеры розничной торговли тратят до 5%"*. Ook bevestigd: 150 biljoen RUB investeringsplan, >900 producten in het register, 12 sleutel-ERP's geanalyseerd. | [strategy.ru PDF, p. 4/12](https://strategy.ru/media/uploads/2025/08/SP_Обзор_российского_ПО_по_управлению_строительными_проектами_август.pdf) |
| A10 | Kazachstan: IT-diensten **~2,9 biljoen tenge (2025)** vanaf ~1,7 biljoen (2024); **>200.000** ICT-werkenden; software ~$3,6 mld | **deels bevestigd (opgewaardeerd), deels onzeker** | De eerste twee zijn wél tot een **primaire** bron te herleiden — het Bureau voor Nationale Statistiek van ASPiR RK (~$5,6 mld, 1,7× t.o.v. 2024; export 391,6 mld tenge). Eerder als "lage betrouwbaarheid" weggezet; dat was te streng. De claim **softwaremarkt $3,6 mld / +13,5% blijft onbevestigd**. | [astanatimes.com](https://astanatimes.com/) · finprom.kz · nationalbusiness.kz |

### B. Eigen schattingen — nagerekend

| # | Bewering | Oordeel | Bevinding |
|---|---|---|---|
| B1 | Planning/CPM-niche RU = **1,5–3 mld RUB (~$17–33 mln)** | **rekenkundig consistent, inhoudelijk onzeker** | Sommen kloppen: 15–20% × 6,4 = 0,96–1,28 → "1,0–1,3 mld" ✓; 1,5–3 mld / 90 = $16,7–33,3 ✓. Maar beide ankers zijn zwakker dan gepresenteerd: de ondergrens (600 mln) is een **breder** segment dan CPM (alle branchespecifieke PM, ook niet-bouw), en de bovengrens (15–20% van 6,4 mld) berust op "planning is 1 van 6–8 modules" — Strategy Partners' eigen modulewegingen geven planning/ГПР ~8% van de functionele modulemix en gebruikersaantal 29% / modulepakket 23% van de prijsformule, wat een lágere planningsaandeel suggereert. **Aanbeveling: behandel de bandbreedte als 1–3 mld RUB en niet als een schatting met twee onafhankelijke ankers.** |
| B2 | GOS-regio samen **$25–45 mln/jaar** | **onzeker** | Rekenkundig impliceert dit $8–12 mln buiten Rusland bovenop $17–33 mln. Er is **geen enkel cijfer** voor Kazachstan/Oezbekistan/Wit-Rusland in dit segment; de claim "Kazachstan het grootste niet-Russische deel" is aannemelijk (FIDIC/EPC + volle wereldprijzen) maar niet onderbouwd. |
| B3 | **20.000–40.000** planners RU, **8.000–15.000** voltijds; regio **26.000–54.000** | **gecorrigeerd (rekenfout) + onzeker (onderbouwing)** | 20.000 × 1,25 = **25.000**, niet 26.000 — de ondergrens gebruikt stilzwijgend +30% terwijl de tekst "25–35%" zegt. Ernstiger: het vacature-argument is **ontkracht** (zie C6) en het enige overgebleven anker is een zelfgerapporteerde leverancierclaim. Betrouwbaarheid nu expliciet als **laag** gemarkeerd, met factor-2-onzekerheid. |
| B4 | Spider 100:1-pariteit ⇒ Russische kopers betalen ~10% méér bij 90 RUB/USD | **bevestigd** | 450.000/90 = $5.000 vs $4.500 = +11,1%; bij 110 RUB/USD −9,1%. De pariteit geldt **exact in alle vier de edities** (170k↔$1.700, 150k↔$1.500, 135k↔$1.350, 115k↔$1.150). |
| B5 | monday.com-omrekening 666 / 830 / 990 RUB | **bevestigd** | $9 × 74 = 666 ✓; × 92 = 828 ✓; × 110 = 990 ✓. |

### C. Prijzen, producten en marktleiderschap

| # | Bewering | Oordeel | Bevinding | Bron |
|---|---|---|---|---|
| C1 | **Spider Project**-prijzen (450.000 → 225.000 RUB Professional; 170.000 → 115.000 Desktop; $4.500–2.250 / $800 Lite) | **bevestigd tot op de staffel** | Elke staffel afzonderlijk gecontroleerd bij reseller én internationale prijslijst; alle acht Professional-treden en alle vier Desktop-treden komen exact overeen. Excl. btw, eeuwigdurende lokale licentie, elektronische levering 5–7 dagen. **"Eerste jaar support inbegrepen" staat op geen van beide bronnen — nu als [ONBEVESTIGD] gemarkeerd.** | [iesoft.ru Professional](https://www.iesoft.ru/products/otechestvennoe-po/spider_project/spider-project-professional/) · [iesoft.ru Desktop](https://www.iesoft.ru/products/spider_project/spider-project-desktop/) · [spiderproject.pro](https://www.spiderproject.pro/en/price-list/) |
| C2 | **10 Spider Desktop-licenties = 1.550.000 RUB**, terugverdiend in ~2,9 jaar | **gecorrigeerd** | Rekenfout. 5 × 170.000 + 5 × 150.000 = **1.600.000 RUB**; terugverdientijd t.o.v. ADVANTA (540.000/jr) = **~3,0 jaar**. (Het Professional-voorbeeld klopt wél: 450+410+370+3×330+4×300 = 3.420.000 ≈ "~3,4 mln".) | eigen berekening op C1 |
| C3 | **1С:PM ПРОФ**-prijslijst (69.200 / 41.600 / 143.300 / 277.400 / 462.300 / 924.500 / 1.386.700 / 3.466.900 + СЛК 1.800) | **bevestigd** | Alle acht regels exact. Aanvulling: er bestaat ook een USB-multidrager à 9.000 RUB. Ook bevestigd: **550+ implementaties**, referentie **PAO Severstal**, versie **5.0.2.22 (12-02-2026)**, en groei van de 1С:PM-lijn met **16% in 2024** met snellere vraag vanuit grote bedrijven. | [solutions.1c.ru/catalog/pm-prof/buy](https://solutions.1c.ru/catalog/pm-prof/buy) · [productpagina](https://solutions.1c.ru/catalog/pm-prof) · Korus-PDF |
| C4 | **ADVANTA**: vanaf 4.500 RUB/gebr./mnd, min. 10 licenties, jaarlijkse vooruitbetaling, min. 12 mnd; huur min. 36 mnd; cursus vanaf 7.500; diagnose 170.000 | **bevestigd** | Alle voorwaarden exact teruggevonden, inclusief dat hosting en uitrol in de SaaS-prijs zitten en dat huur/eeuwigdurend "цена по запросу" zijn. 10 × 4.500 × 12 = 540.000 RUB/jaar ✓. | [advanta-group.ru/price](https://www.advanta-group.ru/price/) |
| C5 | **MS Project marktleider 2024 met 43%**, gehalveerd vanaf 80% (2022) | **bevestigd** | Letterlijk: *"лидером рынка в 2024 году остался Microsoft Project, хотя его доля и сократилась почти в два раза – с 80 до 43%"*. Kanttekening: het is een schatting van **MojOffice** — een belanghebbende concurrent — bevestigd door Directum, Naumen en Netrika, maar geen onafhankelijke meting. | [korusconsulting.ru PDF](https://korusconsulting.ru/upload/generated_pdf/rossiyskiy-rynok-sistem-upravleniya-proektami.pdf) |
| C6 | **PMSOFT**: 10.000+ gebruikers, 80.000 opgeleiden, **450+ projecten**; planner-salarissen **95.000–120.000 RUB/mnd** in Moskou | **gecorrigeerd** | De homepage toont *"30+ лет на рынке / 10 000+ пользователей / 10+ разработок / 80 000 слушателей обучено"* — **"450+ projecten" staat er niet** en is niet reproduceerbaar. De salarisband is bovendien **verouderd**: actuele Moskouse advertenties staan op **200.000–230.000 RUB/mnd** (hh.ru, hoofdspecialist, 3–6 jaar ervaring), tot ~487.000 in bouwspecifieke rollen. | [pmsoft.ru](https://www.pmsoft.ru/) · hh.ru · dreamjob.ru |
| C7 | **PM.planner**: 150.000 activiteiten, XER-import/export, Astra Linux + PostgreSQL, registernrs. 26896/18887, resultaten = P6 | **grotendeels bevestigd, één correctie** | Bevestigd: *"Тестирование … выполняется на графиках с 150 000 работами"*, *"Результат расчета расписания в PM.planner совпадает с Primavera P6"*, Astra Linux + PostgreSQL, registernrs. 26896 (28-02-2025) en 18887 (05-09-2023). **Niet bevestigd: XER.** De site claimt *"Поддержка модели данных Oracle Primavera P6, MS Project"* + *\*.xlsx* — datamodel ≠ bestandsformaat. Dit raakt § 8 punt 2 en 4 direct. | [pmsoft.ru/pmplanner](https://www.pmsoft.ru/pmplanner/) |
| C8 | **1C = ~80% van de omzet van Russische bouw-ERP** | **bevestigd** | *"более 80% сегмента российских ERP приходится на продукты семьи 1С"*. Ook bevestigd: 1С:ERP УСО 2 ≈ **780 тыс. руб.** serverlicentie + werkplekken + jaarlijks ITS, getest bij **12.000 actieve sessies**, en de vaststelling dat de samenwerkingsfuncties beperkt zijn waardoor klanten combineren met Project Point of "Сигнал". | [strategy.ru PDF, p. 14/30](https://strategy.ru/media/uploads/2025/08/SP_Обзор_российского_ПО_по_управлению_строительными_проектами_август.pdf) |
| C9 | **Bouwplatform-prijzen**: Pragmacore 100k–300k+ RUB/mnd; SKRIPTUM 1.780.000 basis / 1.960.000 modules / 1.245.000 3D / 1.850.000 uitrol / 1.345.000 support / 1.325.000 administratie; ALTIUS 60.000–1.800.000; licentiemodellen 40/40/20; prijsformule 29/23/15/15/9/9 | **bevestigd** | Alle bedragen letterlijk teruggevonden in de primaire PDF, inclusief de ALTIUS-tiers ЛАЙТ/СТАНДАРТ (tot 25 gebruikers)/ПРОФ/ПРЕМИУМ en *"Стоимость варьируется от 60 тыс. руб. … до 1,8 млн руб."*. Ook bevestigd: onbeperkt aantal gebruikers bij Pragmacore, minimumproject ~1 mld RUB, ~7% kostenreductie-claim, en één nieuw detail: initiële vulling/gebruikerstraining bij SKRIPTUM kost **1.950.000 RUB** eenmalig. | idem, p. 15–16, 38–41 |
| C10 | **Oracle Primavera P6 ~$2.500–3.500 + $500–800/jr** (ITQlick) | **onzeker — blijft onverifieerbaar** | ITQlick geeft HTTP 403 op geautomatiseerd ophalen; er is nog steeds geen openbare Oracle-prijslijst. De orde van grootte is plausibel maar berust op één derdepartijschatter zonder methodologie. **Niet gebruiken als prijsanker.** | — |

### D. Sancties, regelgeving en contracteisen

| # | Bewering | Oordeel | Bevinding | Bron |
|---|---|---|---|---|
| D1 | **EU art. 5n(2b) + bijlage XXXIX**: verbod per **18-12-2023**, uitloop **20-03-2024**, EU-dochters tot **20-06-2024**; ERP/CRM/BI/SCM + BIM/CAD/CAM; ook cloud | **bevestigd, alle vier de data** | Volledige onafhankelijke bevestiging inclusief de fasering van 5n (§1 juni 2022, §2 oktober 2022, §2b december 2023) en de vaststelling dat zowel "material form" (USB) als "intangible form" (cloud) eronder valt. | [DS Avocats](https://www.dsavocats.com/en/the-ban-on-providing-it-services-and-selling-software-to-russia-a-new-tool-to-limit-russias-industrial-capabilities/) |
| D2 | **OFAC 12-09-2024** en **BIS 16-09-2024**, ook voor Wit-Rusland | **bevestigd (RU); Wit-Rusland onzeker** | OFAC-bepaling van kracht 12:01 EDT op **12 september 2024** (FAQ 1184/1192); BIS-regel van kracht **16 september 2024**, verankerd in 15 CFR 746.8(a)(12)(ii). De BIS-regel heet formeel "…against Russia **and Belarus**", maar ik kon de Belarus-reikwijdte van het software-onderdeel niet primair verifiëren (federalregister.gov en bis.gov blokkeerden geautomatiseerde toegang). | [ofac.treasury.gov/faqs/1184](https://ofac.treasury.gov/faqs/1184) |
| D3 | **Decreet 166** vanaf 1-1-2025; **decreet 250** aanscherping per **1-1-2026** | **gecorrigeerd** | Decreet 166 (30-03-2022): *"с 1 января 2025 года зарубежное программное обеспечение нельзя не только приобретать … но и использовать на значимых объектах КИИ"* ✓. Maar decreet **250** (01-05-2022) hanteert **dezelfde datum**: *"с 1 января 2025 г. органам (организациям) запрещается использовать средства защиты информации"* uit onvriendelijke landen. **Er is geen 2026-aanscherping**; de datum in het document was fout. | [kontur.ru](https://kontur.ru/talk/spravka/54411-ukaz_prezidenta_ob_importozameshchenii) · kremlin.ru/acts/bank/47796 |
| D4 | Naleving: **7%** voldeed najaar 2024, **8%** dacht de deadline te halen | **bevestigd** | Bevestigd én verrijkt: het is een **InfoWatch**-enquête; daarnaast twijfelde 32% maar neigde naar halen, en op een Mincifry-overleg in december rapporteerden **5 van 25** aanwezige bedrijven volledige importsubstitutie. Experts schatten de slaagkans op 15–20%. | [kontur.ru](https://kontur.ru/talk/spravka/54411-ukaz_prezidenta_ob_importozameshchenii) |
| D5 | **Wit-Rusland wet 241-З** legaliseert gebruik zonder toestemming rechthebbende | **bevestigd, maar met een materiële omissie** | De wet bestaat en doet wat beschreven wordt (ondertekend 3-1-2023). **Maar hij is tijdelijk**: oorspronkelijk geldig **tot en met 31-12-2024**, bij **wet 42-З van 02-12-2024** verlengd **tot en met 31-12-2026**. Het document presenteerde het als een permanente toestand; dat verandert de strategische conclusie (het regime loopt binnen de planningshorizon af). | [ilex.by](https://ilex.by/news/v-belarusi-prodlili-parallelnyj-import-do-kontsa-2026-goda/) · [bsb.by](https://www.bsb.by/novosti-bsb-banka/zakon-respubliki-belarus-ot-02-12-2024-n-42-z/) |
| D6 | **Microsoft stopte per 30-09-2023** met verlenging van zakelijke licenties | **bevestigd** | *"After 30 September 2023 you will no longer be able to renew existing subscriptions"* — aangekondigd rond **9 augustus 2023** met 60 dagen opzegtermijn (RBC, Vedomosti, Moscow Times, Habr). Nuance: de aankondiging van de non-verlenging was augustus 2023, niet maart 2023; maart betrof de bredere verkoopstop. | RBC / Vedomosti / The Moscow Times |
| D7 | **КСГ is verplichte bijlage** bij bouwcontracten onder 44-FZ; **geen verplicht bestandsformaat** | **gecorrigeerd (eerste helft) / bevestigd (tweede helft)** | Het formaatpunt is hard bevestigd: *"Единый образец графика выполнения работ по 44-ФЗ законом не утвержден, документ составляют в свободной форме."* De verplichting is echter **enger** dan gesteld: art. 34 lid 12 van 44-FZ eist een uitvoeringsgrafiek voor contracten **>100 mln RUB én looptijd >3 jaar**, en het gaat om een *график исполнения / выполнения СМР*, niet om een CPM-netwerkschema als zodanig. | ppt.ru · consultant.ru · pro-ability.ru |
| D8 | Illegaal engineeringsoftwaregebruik **65% → 70%**; markt engineering-ПО **+16–18%** in 2024 | **bevestigd** | Beide van **Strategy Partners**, aangehaald door Nanosoft: *"в 2024 году рынок инженерного ПО в России вырос на 16-18%"*, piraterij 65% → 70%. De losse claims "28% gebruikt ongelicentieerd bij gebrek aan alternatief" en "22% ziet geen probleem" bleven **onbevestigd** en zijn als zodanig gemarkeerd. | [kommersant.ru/doc/7674514](https://www.kommersant.ru/doc/7674514) |

### E. Wat na twee rondes onverifieerbaar blijft

- **Oracle Primavera P6-prijzen** (C10) — geen openbare prijslijst, ITQlick blokkeert ophalen. Enige echt onbetrouwbare prijs in het hele document.
- **Belarus-reikwijdte van de BIS-softwareregel** (D2) — de titel zegt "Russia and Belarus", maar het software-onderdeel is niet primair te controleren zonder toegang tot de Federal Register-tekst.
- **Spider Project "duizenden installaties"** en **"eerste jaar support inbegrepen"** — beide alleen via secundaire kanalen; spiderproject.ru gaf in beide onderzoeksrondes HTTP 503.
- **Kazachse softwaremarkt $3,6 mld** en alle GOS-marktcijfers voor dit segment (B2).
- **Excel 43% / hybride 33%** — niet opnieuw getest deze ronde; de bestaande kanttekening (bedrijfsplanning breed, niet bouwscheduling) blijft staan.

### F. Samenvattend oordeel

**Bevestigd (18):** A1, A2, A4, A5, A9, B4, B5, C1, C3, C4, C5, C8, C9, D1, D4, D6, D8, plus het formaatdeel van D7.
**Gecorrigeerd (9):** A3 (dollarkoppeling), A6 (attributie), A7 (misgelezen prognose), A8 (25% verkeerd geïnterpreteerd), B3 (rekenfout + zwakke onderbouwing), C2 (optelfout 50.000 RUB), C6 (verzonnen "450+ projecten" + verouderde salarissen), C7 (XER-claim), D3 (decreet 250: 2025 i.p.v. 2026), D5 (tijdelijkheid 241-З), D7-eerste helft.
**Onzeker (4):** A10 (deels), B1, B2, C10, D2 (Belarus-deel).

**De vier bevindingen die materieel doorwerken op besluitvorming:**
1. **PM.planner's XER-claim** (C7) — het hele "datamigratie is het aankoopcriterium"-argument in § 8 leunt erop dat de Russische P6-vervanger XER kan lezen. Dat is niet aangetoond, en het maakt het gat in de markt juist gróter, niet kleiner.
2. **Wet 241-З loopt af eind 2026** (D5) — Wit-Rusland is geen permanent rechtsvrij gebied.
3. **De $81 mln-koppeling** (A3) — wie 6,4 mld met $81 mln vermenigvuldigt om een groeipad in dollars te bouwen, stapelt twee onverenigbare reeksen.
4. **Het planner-aantal** (B3, C6) — de onderbouwing is na deze ronde zwakker dan het cijfer suggereert; de vacaturemarkt-observatie hield geen stand.
