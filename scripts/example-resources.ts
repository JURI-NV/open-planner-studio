// Resourcesets voor een SELECTIE van de 20 basisvoorbeelden (`example-topologies.json`).
//
// Waarom hier en niet in de topologie-JSON: `example-topologies.json` is pure taak-/fase-topologie
// (namen, duren, types) en kan geen commentaar dragen — terwijl een resourceset juist verantwoording
// nodig heeft (waarom die pool, dat tarief, die ploeggrootte). Deze module staat daarom naast
// `showcases.ts`/`showcase-groot.ts`, in dezelfde vorm en toon, en `gen-core.ts:topologyToSpec()`
// haalt hem op via de slug. De JSON blijft ongemoeid, de generator-logica krijgt er één opzoeking
// bij, en een voorbeeld zonder entry hieronder gedraagt zich exact als voorheen.
//
// Toewijzingen worden op TAAKNAAM gekoppeld (de Engelse namen uit de topologie, zie issue #39);
// `topologyToSpec` faalt hard als een naam nul of meer dan één taak raakt, zodat een hernoemde taak
// niet stilzwijgend zijn ploeg verliest.
//
// KEUZE VAN DE ZES — verscheidenheid in soort werk, niet alle twintig (dan worden ze onderling
// inwisselbaar): binnenstedelijke restauratie (01), infra met zwaar materieel (05), particuliere
// nieuwbouw met kleine ploegen (10), materieel-gedreven offshore (12), MEP-zware utiliteit (15) en
// repetitieve woningbouw (20). Samen dekken ze alle vijf de resourcetypes (LABOR, CREW, EQUIPMENT,
// SUBCONTRACTOR, MATERIAL) en tonen 01 + 20 een ploeg-hiërarchie (`parent`).
//
// GEEN OVERALLOCATIE — harde eis. Dit zijn referentievoorbeelden: wie er één opent hoort geen rode
// balken te zien die niemand bedoeld heeft (de bedoelde, met nivellering oplosbare overallocatie is
// showcase-materiaal, zie `showcases.ts`). Elke pool hieronder is daarom gedimensioneerd op de
// piekvraag die de fase-overlap uit `topologyToSpec` daadwerkelijk oplevert; per resource staat de
// gemeten piek erbij waar die niet triviaal uit één taak volgt. Binnen een fase is de keten strikt
// FS (dus nooit twee taken van dezelfde fase tegelijk); de overlap ontstaat uitsluitend op de
// fasegrenzen (SS+halve fase, SS met %-lag, FS met lead).
//
// Curves blijven bewust rustig: UNIFORM, op één na — de betonstorten krijgen FRONT_LOADED (het gros
// van de kuub gaat er aan het begin van de stort in), net als in `showcases.ts`. Curve-variatie op
// mankracht-pools concentreert de piekvraag en is in de showcases al gedekt.
import type { ResourceSpec, AssignSpec } from './spec';

export interface ExampleResourceSet {
  resources: ResourceSpec[];
  /** Taaknaam (exact zoals in `example-topologies.json`) → toewijzingen. */
  assignments: Record<string, AssignSpec[]>;
}

// ── 01 Grachtenpand Amsterdam — binnenstedelijke restauratie ────────────────────────────────
// Kleine ploegen, beperkte aanvoer: één kraanopstelplaats aan de kade, heiwerk en damwand
// uitbesteed (binnenstedelijk trillingsarm werk), metselwerk in restauratie-tarief.
const GRACHTENPAND: ExampleResourceSet = {
  resources: [
    { name: 'Restoration crew', type: 'CREW', maxUnits: 1,
      description: 'Overarching restoration crew for the shell; small crews because of the narrow canal-side site' },
    { name: 'Restoration bricklayers', type: 'LABOR', maxUnits: 3, costPerHour: 52,
      description: 'Bricklayers in restoration work (historic bond and pointing) — restoration rate', parent: 'Restoration crew' },
    { name: 'Carpenters', type: 'LABOR', maxUnits: 5, costPerHour: 45,
      description: 'Roof structure and joinery; peaks at 5 where the roof works overlap the window frames',
      parent: 'Restoration crew' },
    { name: 'Plasterers', type: 'LABOR', maxUnits: 3, costPerHour: 42 },
    { name: 'Mobile crane', type: 'EQUIPMENT', maxUnits: 1, costPerHour: 95,
      description: 'One crane slot on the quay — the canal street has room for nothing more' },
    { name: 'Piling contractor', type: 'SUBCONTRACTOR', maxUnits: 2, costPerHour: 78,
      description: 'Sheet piling and foundation piles, low-vibration technique for the inner city' },
    { name: 'Concrete C20/25', type: 'MATERIAL', maxUnits: 999, unitOfMeasure: 'm³' },
  ],
  assignments: {
    'Install sheet piling': [{ res: 'Piling contractor', units: 2 }],
    'Drive foundation piles': [{ res: 'Piling contractor', units: 2 }],
    'Pour basement floor': [{ res: 'Concrete C20/25', units: 40, curve: 'FRONT_LOADED' }],
    'Pour basement walls': [{ res: 'Concrete C20/25', units: 30, curve: 'FRONT_LOADED' }],
    'Ground floor masonry': [{ res: 'Restoration bricklayers', units: 3 }],
    'First floor slab': [{ res: 'Mobile crane', units: 1 }],
    'First floor masonry': [{ res: 'Restoration bricklayers', units: 3 }],
    'Second floor slab': [{ res: 'Mobile crane', units: 1 }],
    'Second floor masonry': [{ res: 'Restoration bricklayers', units: 3 }],
    'Third floor slab': [{ res: 'Mobile crane', units: 1 }],
    'Third floor masonry': [{ res: 'Restoration bricklayers', units: 2 }],
    'Timber roof structure': [{ res: 'Carpenters', units: 3 }, { res: 'Mobile crane', units: 1 }],
    'Roofing': [{ res: 'Carpenters', units: 2 }],
    'Install window frames': [{ res: 'Carpenters', units: 2 }],
    'Plastering': [{ res: 'Plasterers', units: 3 }],
  },
};

// ── 05 Brugvervanging N279 — infra, zwaar materieel, korte stremmingsvensters ────────────────
// Zes-daagse werkweek (zie `SIX_DAY` in gen-core). Eén rupskraan op het werk (sloop én liggers),
// de asfaltploeg werkt binnen het afgesproken stremmingsvenster, verkeersmaatregelen en sloop
// zijn onderaannemers.
const BRUG_N279: ExampleResourceSet = {
  resources: [
    { name: 'Crawler crane 250 t', type: 'EQUIPMENT', maxUnits: 1, costPerHour: 185,
      description: 'One crawler crane on site — deck demolition and beam placement share it' },
    { name: 'Piling rig', type: 'EQUIPMENT', maxUnits: 1, costPerHour: 150 },
    { name: 'Traffic management contractor', type: 'SUBCONTRACTOR', maxUnits: 3, costPerHour: 55 },
    { name: 'Demolition contractor', type: 'SUBCONTRACTOR', maxUnits: 4, costPerHour: 62 },
    { name: 'Asphalt contractor', type: 'SUBCONTRACTOR', maxUnits: 6, costPerHour: 70,
      description: 'Paving gang working inside the agreed road-closure window' },
    // Twee ploegen van 4: de oostelijke landhoofd-taak start (SS + 5 dagen, uit de topologie) al
    // terwijl de westelijke nog loopt, dus de piek is gemeten 8 — niet 4.
    { name: 'Concrete crew', type: 'LABOR', maxUnits: 8, costPerHour: 47,
      description: 'Two gangs of four; both abutments run in parallel with a five-day stagger' },
    { name: 'Steel fixers', type: 'LABOR', maxUnits: 8, costPerHour: 44,
      description: 'Two rebar gangs of four — same parallel abutments' },
    { name: 'Concrete C35/45', type: 'MATERIAL', maxUnits: 999, unitOfMeasure: 'm³' },
  ],
  assignments: {
    'Implement traffic management': [{ res: 'Traffic management contractor', units: 3 }],
    'Temporary diversion route': [{ res: 'Traffic management contractor', units: 3 }],
    'Remove asphalt': [{ res: 'Demolition contractor', units: 3 }],
    'Remove bridge railings': [{ res: 'Demolition contractor', units: 2 }],
    'Demolish bridge deck': [{ res: 'Demolition contractor', units: 4 }, { res: 'Crawler crane 250 t', units: 1 }],
    'Demolish abutments': [{ res: 'Demolition contractor', units: 4 }],
    'Remove rubble': [{ res: 'Demolition contractor', units: 2 }],
    'Drive sheet piling': [{ res: 'Piling rig', units: 1 }],
    'Underwater concrete': [{ res: 'Concrete C35/45', units: 60, curve: 'FRONT_LOADED' }],
    'Bore pile foundation': [{ res: 'Piling rig', units: 1 }],
    'West abutment: rebar and pour': [{ res: 'Steel fixers', units: 4 }, { res: 'Concrete crew', units: 4 },
      { res: 'Concrete C35/45', units: 25 }],
    'East abutment: rebar and pour': [{ res: 'Steel fixers', units: 4 }, { res: 'Concrete crew', units: 4 },
      { res: 'Concrete C35/45', units: 25 }],
    'Pour central pier': [{ res: 'Concrete crew', units: 4 }, { res: 'Concrete C35/45', units: 20, curve: 'FRONT_LOADED' }],
    'Place precast beams': [{ res: 'Crawler crane 250 t', units: 1 }, { res: 'Concrete crew', units: 3 }],
    'Bridge deck reinforcement': [{ res: 'Steel fixers', units: 5 }],
    'Pour bridge deck': [{ res: 'Concrete crew', units: 6 }, { res: 'Concrete C35/45', units: 90, curve: 'FRONT_LOADED' }],
    'Install bridge railings': [{ res: 'Concrete crew', units: 2 }],
    'Asphalt bridge deck': [{ res: 'Asphalt contractor', units: 6 }],
    'Asphalt tie-ins': [{ res: 'Asphalt contractor', units: 4 }],
  },
};

// ── 10 Villa Wassenaar — particuliere nieuwbouw, kleine herkenbare ploegen ───────────────────
// Bewust het meest instap-achtige van de zes: uitsluitend LABOR, ploegnamen die iedereen herkent
// (en die één-op-één overeenkomen met de demo-resourcebibliotheek), geen materieel of
// onderaannemers die de aandacht wegtrekken.
const VILLA: ExampleResourceSet = {
  resources: [
    { name: 'Bricklayers', type: 'LABOR', maxUnits: 3, costPerHour: 46 },
    { name: 'Carpenters', type: 'LABOR', maxUnits: 5, costPerHour: 45,
      description: 'Roof structure, frames and joinery; the roof works and the window frames overlap briefly' },
    // 4, niet 2: de loodgieters starten (SS + 2 dagen, uit de topologie) al terwijl de elektriciens
    // nog bezig zijn — twee koppels van twee die zes dagen naast elkaar werken.
    { name: 'MEP fitters', type: 'LABOR', maxUnits: 4, costPerHour: 48,
      description: 'Electrical and plumbing; two pairs, briefly working alongside each other' },
    { name: 'Plasterers', type: 'LABOR', maxUnits: 3, costPerHour: 42 },
    { name: 'Tilers', type: 'LABOR', maxUnits: 2, costPerHour: 43 },
    { name: 'Painters', type: 'LABOR', maxUnits: 3, costPerHour: 38 },
  ],
  assignments: {
    'Ground floor masonry': [{ res: 'Bricklayers', units: 3 }],
    'Upper floor masonry': [{ res: 'Bricklayers', units: 3 }],
    'Build chimneys': [{ res: 'Bricklayers', units: 2 }],
    'Timber roof structure': [{ res: 'Carpenters', units: 3 }],
    'Roof tiles': [{ res: 'Carpenters', units: 2 }],
    'Hardwood window frames': [{ res: 'Carpenters', units: 2 }],
    'Triple glazing HR+++': [{ res: 'Carpenters', units: 2 }],
    'Electrical first fix': [{ res: 'MEP fitters', units: 2 }],
    'Plumbing first fix': [{ res: 'MEP fitters', units: 2 }],
    'Underfloor heating': [{ res: 'MEP fitters', units: 2 }],
    'Home automation system': [{ res: 'MEP fitters', units: 1 }],
    'Pool plant': [{ res: 'MEP fitters', units: 2 }],
    'Heat pump and ground loop': [{ res: 'MEP fitters', units: 2 }],
    'Solar panels': [{ res: 'MEP fitters', units: 1 }],
    'Plastering, walls and ceilings': [{ res: 'Plasterers', units: 3 }],
    'Luxury bathroom tiling': [{ res: 'Tilers', units: 2 }],
    'Natural stone floors': [{ res: 'Tilers', units: 2 }],
    'Oak staircases': [{ res: 'Carpenters', units: 2 }],
    'Bespoke kitchen': [{ res: 'Carpenters', units: 2 }],
    'Painting': [{ res: 'Painters', units: 3 }],
  },
};

// ── 12 Windturbine offshore — uitgesproken materieel-gedreven ────────────────────────────────
// Weinig mankracht, dure eenheden: de schepen bepalen de planning én de kosten. De uurtarieven
// zijn dagtarieven gedeeld door de 8-urige werkdag van de kalender (installatieschip ≈ EUR 120.000
// per dag, kabellegger ≈ EUR 80.000, valpijpschip ≈ EUR 60.000, transportponton ≈ EUR 24.000) —
// zo klopt de kostenberekening van de app met wat er in de omschrijving staat.
const OFFSHORE: ExampleResourceSet = {
  resources: [
    { name: 'Jack-up installation vessel', type: 'EQUIPMENT', maxUnits: 1, costPerHour: 15000,
      description: 'Jack-up installation vessel, chartered by the day (order of EUR 120,000/day over an 8-hour shift)' },
    { name: 'Cable-lay vessel', type: 'EQUIPMENT', maxUnits: 1, costPerHour: 10000,
      description: 'Cable-lay vessel for the export cable pull-in (order of EUR 80,000/day)' },
    { name: 'Fall-pipe vessel', type: 'EQUIPMENT', maxUnits: 1, costPerHour: 7500,
      description: 'Fall-pipe vessel for seabed levelling and scour protection (order of EUR 60,000/day)' },
    { name: 'Transport barge', type: 'EQUIPMENT', maxUnits: 1, costPerHour: 3000,
      description: 'Feeder barge with tugs, bringing the monopile out from the fabrication yard' },
    // 12 is de hele offshore-bezetting: de installatieploeg van 8 op het schip plus de
    // mobilisatieploeg van 4 in de haven, die door de fase-overlap enkele dagen samenvallen.
    { name: 'Offshore installation crew', type: 'LABOR', maxUnits: 12, costPerHour: 95,
      description: 'Offshore crew including offshore allowance; certified for work at sea' },
    { name: 'Survey contractor', type: 'SUBCONTRACTOR', maxUnits: 2, costPerHour: 130,
      description: 'Geophysical survey and as-built inspection' },
    { name: 'Grout', type: 'MATERIAL', maxUnits: 999, unitOfMeasure: 'm³' },
  ],
  assignments: {
    'Monopile fabrication inspection': [{ res: 'Survey contractor', units: 1 }],
    'Mobilise installation vessel': [{ res: 'Offshore installation crew', units: 4 }],
    'Seabed survey': [{ res: 'Survey contractor', units: 2 }],
    'Transport monopile': [{ res: 'Transport barge', units: 1 }],
    'Level seabed': [{ res: 'Fall-pipe vessel', units: 1 }],
    'Scour protection, layer 1': [{ res: 'Fall-pipe vessel', units: 1 }],
    'Upend monopile': [{ res: 'Jack-up installation vessel', units: 1 }, { res: 'Offshore installation crew', units: 8 }],
    'Position monopile': [{ res: 'Jack-up installation vessel', units: 1 }, { res: 'Offshore installation crew', units: 8 }],
    'Drive monopile': [{ res: 'Jack-up installation vessel', units: 1 }, { res: 'Offshore installation crew', units: 8 }],
    'Verticality check': [{ res: 'Survey contractor', units: 1 }],
    'Install transition piece': [{ res: 'Jack-up installation vessel', units: 1 }, { res: 'Offshore installation crew', units: 8 }],
    'Grouting': [{ res: 'Offshore installation crew', units: 6 }, { res: 'Grout', units: 40, curve: 'FRONT_LOADED' }],
    'Scour protection, layer 2': [{ res: 'Fall-pipe vessel', units: 1 }],
    'J-tube installation': [{ res: 'Offshore installation crew', units: 4 }],
    'Platform and railing': [{ res: 'Offshore installation crew', units: 6 }],
    'Cathodic protection': [{ res: 'Offshore installation crew', units: 4 }],
    'Install boat landing': [{ res: 'Offshore installation crew', units: 4 }],
    'Export cable pull-in': [{ res: 'Cable-lay vessel', units: 1 }, { res: 'Offshore installation crew', units: 6 }],
    'Cable termination': [{ res: 'Offshore installation crew', units: 4 }],
    'Inspection and survey': [{ res: 'Survey contractor', units: 2 }],
    'Demobilisation': [{ res: 'Offshore installation crew', units: 6 }],
  },
};

// ── 15 Datacentrum Agriport — utiliteit, MEP-zwaar ───────────────────────────────────────────
// Installateurs en elektromonteurs domineren; het bouwkundige deel is bijzaak en draagt bewust een
// kleine ploeg. Leveranciers van UPS/noodstroom, koeling en blusinstallatie zijn onderaannemers.
const DATACENTRUM: ExampleResourceSet = {
  resources: [
    { name: 'Electricians', type: 'LABOR', maxUnits: 12, costPerHour: 49,
      description: 'Power distribution from the 10 kV connection down to the PDUs — the dominant discipline here' },
    { name: 'Mechanical fitters', type: 'LABOR', maxUnits: 8, costPerHour: 48 },
    { name: 'ICT cabling technicians', type: 'LABOR', maxUnits: 6, costPerHour: 47 },
    { name: 'Commissioning engineer', type: 'LABOR', maxUnits: 2, costPerHour: 85,
      description: 'Integral testing of the failover scenario and the Tier III certification' },
    // Pool 8: de fase-overlap laat de fundering (4) en de prefab-wanden (4) enkele dagen
    // samenlopen. Bewust klein gehouden — bouwkundig is op dit project bijzaak.
    { name: 'Structural crew', type: 'LABOR', maxUnits: 8, costPerHour: 45,
      description: 'Shell and core; secondary on this project' },
    { name: 'Mobile crane', type: 'EQUIPMENT', maxUnits: 1, costPerHour: 95 },
    { name: 'UPS and generator supplier', type: 'SUBCONTRACTOR', maxUnits: 4, costPerHour: 95 },
    { name: 'Cooling contractor', type: 'SUBCONTRACTOR', maxUnits: 6, costPerHour: 72 },
    { name: 'Fire suppression contractor', type: 'SUBCONTRACTOR', maxUnits: 3, costPerHour: 78 },
  ],
  assignments: {
    '10 kV utility connections': [{ res: 'Electricians', units: 4 }],
    'Foundation beams': [{ res: 'Structural crew', units: 4 }],
    'Pour slab on piles': [{ res: 'Structural crew', units: 4 }],
    'Cable trays in floor': [{ res: 'Electricians', units: 4 }],
    'Precast concrete walls': [{ res: 'Mobile crane', units: 1 }, { res: 'Structural crew', units: 4 }],
    'Structural steel, roof': [{ res: 'Mobile crane', units: 1 }, { res: 'Structural crew', units: 4 }],
    'Sandwich roof panels': [{ res: 'Structural crew', units: 4 }],
    'Raised computer floor': [{ res: 'Mechanical fitters', units: 4 }],
    'Facade insulation and cladding': [{ res: 'Structural crew', units: 4 }],
    '10 kV transformers': [{ res: 'Electricians', units: 6 }],
    'UPS systems': [{ res: 'UPS and generator supplier', units: 4 }, { res: 'Electricians', units: 4 }],
    'Emergency generators': [{ res: 'UPS and generator supplier', units: 4 }, { res: 'Mechanical fitters', units: 4 }],
    'Main distribution and PDUs': [{ res: 'Electricians', units: 8 }],
    'Chillers': [{ res: 'Cooling contractor', units: 6 }, { res: 'Mechanical fitters', units: 4 }],
    'CRAH units, data halls': [{ res: 'Cooling contractor', units: 4 }, { res: 'Mechanical fitters', units: 4 }],
    'External cooling towers': [{ res: 'Cooling contractor', units: 4 }],
    'Incoming fibre optics': [{ res: 'ICT cabling technicians', units: 4 }],
    'Patch panels and cabling': [{ res: 'ICT cabling technicians', units: 6 }],
    'Gas fire suppression system': [{ res: 'Fire suppression contractor', units: 3 }],
    'Biometric access control': [{ res: 'ICT cabling technicians', units: 3 }],
    'CCTV system': [{ res: 'ICT cabling technicians', units: 3 }],
    'BMS monitoring': [{ res: 'ICT cabling technicians', units: 2 }, { res: 'Electricians', units: 2 }],
    'Test failover scenario': [{ res: 'Commissioning engineer', units: 2 }, { res: 'Electricians', units: 2 }],
    'Tier III certification': [{ res: 'Commissioning engineer', units: 2 }],
  },
};

// ── 20 Woonwijk Almere — repetitieve woningbouw ──────────────────────────────────────────────
// Ploegen die van blok naar blok schuiven: ruwbouw fase 1 (blok 1-3) staat strak vóór fase 2
// (blok 4-5), dus dezelfde metselploeg draait gewoon door — dat geeft het gelijkmatige histogram
// waar dit voorbeeld om draait. Ploeg-hiërarchie: metselaars en timmerlieden hangen onder één
// ruwbouwploeg.
const WOONWIJK: ExampleResourceSet = {
  resources: [
    { name: 'Structural works crew', type: 'CREW', maxUnits: 1,
      description: 'Overarching structural works crew moving from block to block' },
    { name: 'Bricklayers', type: 'LABOR', maxUnits: 8, costPerHour: 46, parent: 'Structural works crew' },
    { name: 'Carpenters', type: 'LABOR', maxUnits: 8, costPerHour: 45,
      description: 'Roof structures plus window frames; the two overlap across the phase boundary',
      parent: 'Structural works crew' },
    // 10: elektra blok 4-5 start (SS + 5 dagen, uit de topologie) al terwijl blok 1-3 nog loopt.
    { name: 'MEP fitters', type: 'LABOR', maxUnits: 10, costPerHour: 48,
      description: 'Electrical and plumbing gangs moving from block to block, with a staggered start' },
    { name: 'Plasterers', type: 'LABOR', maxUnits: 6, costPerHour: 42 },
    { name: 'Tilers', type: 'LABOR', maxUnits: 4, costPerHour: 43 },
    { name: 'Kitchen fitters', type: 'LABOR', maxUnits: 4, costPerHour: 46 },
    { name: 'Painters', type: 'LABOR', maxUnits: 6, costPerHour: 38 },
    { name: 'Civils contractor', type: 'SUBCONTRACTOR', maxUnits: 6, costPerHour: 58,
      description: 'Sewers, roads, paving and public space' },
    { name: 'Concrete C20/25', type: 'MATERIAL', maxUnits: 999, unitOfMeasure: 'm³' },
  ],
  assignments: {
    'Install main sewer': [{ res: 'Civils contractor', units: 6 }],
    'Utility main': [{ res: 'Civils contractor', units: 4 }],
    'Construct site roads': [{ res: 'Civils contractor', units: 4 }],
    'Foundation beams, blocks 1-3': [{ res: 'Concrete C20/25', units: 45, curve: 'FRONT_LOADED' }],
    'Ground floor slab, blocks 1-3': [{ res: 'Concrete C20/25', units: 60, curve: 'FRONT_LOADED' }],
    'Foundation beams, blocks 4-5': [{ res: 'Concrete C20/25', units: 35, curve: 'FRONT_LOADED' }],
    'Ground floor slab, blocks 4-5': [{ res: 'Concrete C20/25', units: 45, curve: 'FRONT_LOADED' }],
    'Masonry ground floor, blocks 1-3': [{ res: 'Bricklayers', units: 8 }],
    'Masonry upper floor, blocks 1-3': [{ res: 'Bricklayers', units: 8 }],
    'Roof structure, blocks 1-3': [{ res: 'Carpenters', units: 6 }],
    'Roof tiles, blocks 1-3': [{ res: 'Carpenters', units: 4 }],
    'Masonry ground floor, blocks 4-5': [{ res: 'Bricklayers', units: 6 }],
    'Masonry upper floor, blocks 4-5': [{ res: 'Bricklayers', units: 6 }],
    'Roof structure, blocks 4-5': [{ res: 'Carpenters', units: 5 }],
    'Roof tiles, blocks 4-5': [{ res: 'Carpenters', units: 3 }],
    'Window frames, blocks 1-3': [{ res: 'Carpenters', units: 3 }],
    'Window frames, blocks 4-5': [{ res: 'Carpenters', units: 3 }],
    'Electrical, blocks 1-3': [{ res: 'MEP fitters', units: 6 }],
    'Electrical, blocks 4-5': [{ res: 'MEP fitters', units: 4 }],
    'Plumbing, blocks 1-3': [{ res: 'MEP fitters', units: 6 }],
    'Plumbing, blocks 4-5': [{ res: 'MEP fitters', units: 4 }],
    'Heat pumps, all dwellings': [{ res: 'MEP fitters', units: 6 }],
    'Heat recovery ventilation units': [{ res: 'MEP fitters', units: 4 }],
    'Plastering, blocks 1-3': [{ res: 'Plasterers', units: 6 }],
    'Tiling, blocks 1-3': [{ res: 'Tilers', units: 4 }],
    'Kitchens, blocks 1-3': [{ res: 'Kitchen fitters', units: 4 }],
    'Painting, blocks 1-3': [{ res: 'Painters', units: 6 }],
    'Plastering, blocks 4-5': [{ res: 'Plasterers', units: 4 }],
    'Tiling, blocks 4-5': [{ res: 'Tilers', units: 3 }],
    'Kitchens, blocks 4-5': [{ res: 'Kitchen fitters', units: 3 }],
    'Painting, blocks 4-5': [{ res: 'Painters', units: 4 }],
    'Connect permanent sewer': [{ res: 'Civils contractor', units: 4 }],
    'Paving and pavements': [{ res: 'Civils contractor', units: 6 }],
    'Construct parking spaces': [{ res: 'Civils contractor', units: 4 }],
    'Landscaping and trees': [{ res: 'Civils contractor', units: 4 }],
  },
};

/** Slug (bestandsnaam zonder .ifc) → resourceset. Voorbeelden die hier niet in staan blijven
 *  resourceloos, precies zoals voorheen. */
export const EXAMPLE_RESOURCES: Record<string, ExampleResourceSet> = {
  '01-grachtenpand-amsterdam': GRACHTENPAND,
  '05-brugvervanging-n279': BRUG_N279,
  '10-villa-wassenaar': VILLA,
  '12-windturbine-offshore': OFFSHORE,
  '15-datacentrum-agriport': DATACENTRUM,
  '20-woonwijk-almere': WOONWIJK,
};
