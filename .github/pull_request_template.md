<!-- Bedankt voor je bijdrage. Zie CONTRIBUTING.md als iets onduidelijk is.
     English is fine. -->

### Wat en waarom

<!-- Wat verandert er, en welk probleem lost het op? Het diff laat zien wát er
     verandert; schrijf hier waaróm. Verwijs naar een issue met "Fixes #123". -->

### Hoe geverifieerd

<!-- `npm run verify` is de poort — die draait CI, de release-gate en de
     deploy-gate ook. Zet hieronder wat je gedraaid hebt en wat eruit kwam.
     Handmatig getest in de app? Zeg wat je geklikt hebt. -->

- [ ] `npm run verify` groen

### Raakt dit

<!-- Aankruisen wat van toepassing is; laat de rest staan. Deze vier gaan het
     vaakst stil mis — zie CONTRIBUTING.md. -->

- [ ] **Projectdata** — round-trippen door de IFC-laag geregeld en getest?
- [ ] **Planningslogica** — casus toegevoegd aan `tests/planning/`?
- [ ] **Zichtbare tekst** — via `t(...)`, en alle veertien locales aangevuld?
- [ ] **`@tauri-apps/*`** — achter `isTauri()` of een dynamische import, zodat
      de browserbuild blijft werken?

### Documentatie

<!-- Verandert er iets aan de architectuur, aan een commando of aan het gedrag
     dat elders beschreven staat? Werk dan CLAUDE.md/AGENTS.md, docs/CHANGELOG.md
     of de in-app docs in deze PR bij. Zo niet: "n.v.t." -->
