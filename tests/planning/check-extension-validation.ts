// Runtimevalidatie voor niet-vertrouwde extensiemanifesten.
//
// Deze batterij toetst bewust de herbouwde uitkomst en niet alleen foutmeldingen: onbekende velden
// moeten verdwijnen, arrays moeten losstaan van de invoer en legacydefaults mogen uitsluitend de
// expliciet toegestane gaten vullen. Draait via run.sh. Exit 0 = alles groen.
import { EXTENSION_LIMITS, parseExtensionManifest } from '@/extensions/validation';
import type { ExtensionManifest, ParseResult } from '@/extensions/types';

const diffs: string[] = [];
let checks = 0;

const eq = (label: string, got: unknown, want: unknown) => {
  checks++;
  if (JSON.stringify(got) !== JSON.stringify(want)) {
    diffs.push(`${label}: verwacht ${JSON.stringify(want)}, kreeg ${JSON.stringify(got)}`);
  }
};

const expectOk = (
  label: string,
  result: ParseResult<ExtensionManifest>,
): Extract<ParseResult<ExtensionManifest>, { ok: true }> | null => {
  eq(`${label}: parse slaagt`, result.ok, true);
  return result.ok ? result : null;
};

const expectFail = (label: string, input: unknown, mode: 'fresh' | 'stored-legacy' = 'fresh') => {
  const result = parseExtensionManifest(input, mode);
  eq(`${label}: parse faalt`, result.ok, false);
  if (!result.ok) eq(`${label}: fout is concreet`, result.error.length > 0, true);
};

const volledig = (): Record<string, unknown> => ({
  id: 'demo.planning-tools',
  name: 'Planning Tools',
  version: '1.2.3',
  apiVersion: '1.0',
  minAppVersion: '2026.8.1',
  author: 'OpenAEC',
  description: 'Voorbeeldextensie',
  category: 'Utility',
  main: 'src/main.js',
  permissions: ['ribbon', 'events', 'ribbon'],
  repository: 'https://example.invalid/open-aec/planning-tools',
  tags: ['planning', 'tools', 'planning'],
  icon: '<svg viewBox="0 0 24 24"><path d="M0 0"/></svg>',
  onbekend: { genest: { magNietLekken: true } },
});

// ── 1. Topniveau en verplichte identiteit ───────────────────────────────────
expectFail('null is geen manifest', null);
expectFail('een array is geen manifest', []);
expectFail('een string is geen manifest', 'manifest');
expectFail('ontbrekend id', { ...volledig(), id: undefined });
expectFail('id met hoofdletters', { ...volledig(), id: 'Demo.extension' });
expectFail('prototype-id', { ...volledig(), id: '__proto__' });
expectFail('id langer dan de grens', { ...volledig(), id: `a${'b'.repeat(EXTENSION_LIMITS.id)}` });

// ── 2. Gesloten unies en verplichte veldvormen ──────────────────────────────
expectFail('onbekende categorie', { ...volledig(), category: 'Security' });
expectFail('onbekende fresh permission', { ...volledig(), permissions: ['ribbon', 'commands'] });
expectFail('permissions is geen array', { ...volledig(), permissions: 'ribbon' });
expectFail('permission is geen string', { ...volledig(), permissions: ['ribbon', 1] });
for (const veld of ['name', 'version', 'minAppVersion', 'author', 'description', 'category', 'main', 'permissions']) {
  expectFail(`fresh vereist ${veld}`, { ...volledig(), [veld]: undefined });
}

// ── 3. Relatieve hoofdpaden worden niet genormaliseerd ─────────────────────
for (const main of [
  '', '/main.js', '../main.js', 'dir/../main.js', './main.js', 'dir//main.js',
  'dir\\main.js', 'dir/./main.js', 'main\0.js', `${'a'.repeat(EXTENSION_LIMITS.main)}.js`,
]) {
  expectFail(`onveilig main-pad ${JSON.stringify(main)}`, { ...volledig(), main });
}

// ── 4. Versies, tags, repository en icoon ──────────────────────────────────
for (const [veld, waarde] of [
  ['version', 'v1.2.3'], ['version', '1.2.3.4.5'], ['version', '1..2'],
  ['apiVersion', '1.x'], ['apiVersion', ''],
  ['minAppVersion', '2026.08-beta'], ['minAppVersion', '1.2.3.4.5'],
] as const) {
  expectFail(`ongeldige ${veld} ${JSON.stringify(waarde)}`, { ...volledig(), [veld]: waarde });
}
expectFail('tags is geen array', { ...volledig(), tags: 'planning' });
expectFail('te veel tags', {
  ...volledig(),
  tags: Array.from({ length: EXTENSION_LIMITS.tags + 1 }, (_, i) => `tag-${i}`),
});
expectFail('te lange tag', { ...volledig(), tags: ['x'.repeat(EXTENSION_LIMITS.tag + 1)] });
expectFail('niet-http repository', { ...volledig(), repository: 'file:///tmp/plugin' });
expectFail('ongeldige repository', { ...volledig(), repository: 'dit is geen url' });
expectFail('te groot icoon meet UTF-8-bytes', {
  ...volledig(),
  icon: '🙂'.repeat(Math.floor(EXTENSION_LIMITS.iconBytes / 4) + 1),
});

// ── 5. Positieve reconstructie en losstaandheid ─────────────────────────────
{
  const bron = volledig();
  const parsed = expectOk('volledig fresh manifest', parseExtensionManifest(bron, 'fresh'));
  if (parsed) {
    eq('fresh parse waarschuwt niet', parsed.warnings, []);
    eq('uitkomst is een vers object', Object.is(parsed.value, bron), false);
    eq('fresh parse reconstrueert uitsluitend bekende velden',
      Object.fromEntries(Object.entries(parsed.value).sort(([a], [b]) => a.localeCompare(b))),
      Object.fromEntries(Object.entries({
        id: 'demo.planning-tools',
        name: 'Planning Tools',
        version: '1.2.3',
        apiVersion: '1.0',
        minAppVersion: '2026.8.1',
        author: 'OpenAEC',
        description: 'Voorbeeldextensie',
        category: 'Utility',
        main: 'src/main.js',
        permissions: ['ribbon', 'events'],
        repository: 'https://example.invalid/open-aec/planning-tools',
        tags: ['planning', 'tools'],
        icon: '<svg viewBox="0 0 24 24"><path d="M0 0"/></svg>',
      }).sort(([a], [b]) => a.localeCompare(b))));
    eq('permissions zijn stabiel gededupliceerd', parsed.value.permissions, ['ribbon', 'events']);
    eq('tags zijn stabiel gededupliceerd', parsed.value.tags, ['planning', 'tools']);
    eq('onbekend topniveauveld verdwijnt', 'onbekend' in parsed.value, false);

    const permissions = bron.permissions as unknown[];
    const tags = bron.tags as unknown[];
    bron.name = 'NA PARSE GEWIJZIGD';
    permissions.push('network');
    tags[0] = 'gewijzigd';
    (bron.onbekend as { genest: { magNietLekken: boolean } }).genest.magNietLekken = false;
    eq('bronmutatie wijzigt naamuitkomst niet', parsed.value.name, 'Planning Tools');
    eq('bronmutatie wijzigt permissionsuitkomst niet', parsed.value.permissions, ['ribbon', 'events']);
    eq('bronmutatie wijzigt tagsuitkomst niet', parsed.value.tags, ['planning', 'tools']);
  }
}

// ── 6. Legacybeleid is beperkt en zichtbaar ─────────────────────────────────
{
  const legacy = volledig();
  delete legacy.apiVersion;
  delete legacy.minAppVersion;
  delete legacy.permissions;
  delete legacy.tags;
  delete legacy.repository;
  delete legacy.icon;
  const parsed = expectOk('legacy met toegestane ontbrekende velden',
    parseExtensionManifest(legacy, 'stored-legacy'));
  if (parsed) {
    eq('legacy default min-app', parsed.value.minAppVersion, '0.0.0');
    eq('legacy default permissions', parsed.value.permissions, []);
    eq('legacy apiVersion blijft afwezig', parsed.value.apiVersion, undefined);
    eq('legacy tags blijven afwezig', parsed.value.tags, undefined);
    eq('legacy repository blijft afwezig', parsed.value.repository, undefined);
    eq('legacy icon blijft afwezig', parsed.value.icon, undefined);
    eq('legacydefaults geven twee waarschuwingen', parsed.warnings.length, 2);
  }

  const metOnbekend = expectOk('legacy filtert onbekende permissions', parseExtensionManifest({
    ...volledig(),
    permissions: ['network', 'commands', 'ribbon', 'commands'],
  }, 'stored-legacy'));
  if (metOnbekend) {
    eq('legacy behoudt bekende permissions in volgorde', metOnbekend.value.permissions, ['network', 'ribbon']);
    eq('legacy meldt gefilterde permissions', metOnbekend.warnings.length, 1);
  }

  for (const veld of ['id', 'name', 'version', 'author', 'description', 'category', 'main']) {
    expectFail(`legacy vereist ${veld}`, { ...volledig(), [veld]: undefined }, 'stored-legacy');
  }
}

// ── Uitslag ──────────────────────────────────────────────────────────────────
if (diffs.length === 0) {
  console.log(`OK: extensievalidatie — ${checks} checks groen`);
} else {
  console.log(`XX extensievalidatie — ${diffs.length} van ${checks} checks rood:`);
  for (const diff of diffs) console.log(`   XX ${diff}`);
  process.exit(1);
}
