import type {
  ExtensionCategory,
  ExtensionManifest,
  ExtensionPermission,
  ParseResult,
} from './types';

export type ManifestParseMode = 'fresh' | 'stored-legacy';

export const EXTENSION_LIMITS = {
  id: 128,
  name: 160,
  version: 64,
  author: 160,
  description: 4_000,
  main: 512,
  tags: 32,
  tag: 64,
  iconBytes: 128 * 1024,
} as const;

const EXTENSION_CATEGORIES: readonly ExtensionCategory[] = [
  'Import/Export',
  'Planning',
  'Reporting',
  'Utility',
  'Fonts',
  'Other',
];

const EXTENSION_PERMISSIONS: readonly ExtensionPermission[] = [
  'ribbon',
  'backstage',
  'events',
  'filesystem',
  'network',
  'pdf-fonts',
];

const VERSION_PATTERN = /^[0-9]+(?:\.[0-9]+){0,3}$/;
const EXTENSION_ID_PATTERN = /^[a-z0-9](?:[a-z0-9._-]{0,127})$/;
const RESERVED_IDS = new Set(['__proto__', 'prototype', 'constructor']);

function fail<T>(error: string): ParseResult<T> {
  return { ok: false, error };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseString(
  value: unknown,
  field: string,
  maxLength: number,
): ParseResult<string> {
  if (typeof value !== 'string') return fail(`${field} moet een string zijn`);
  if (value.length === 0) return fail(`${field} mag niet leeg zijn`);
  if (value.length > maxLength) {
    return fail(`${field} mag maximaal ${maxLength} tekens bevatten`);
  }
  return { ok: true, value, warnings: [] };
}

function parseVersion(value: unknown, field: string): ParseResult<string> {
  const parsed = parseString(value, field, EXTENSION_LIMITS.version);
  if (!parsed.ok) return parsed;
  if (!VERSION_PATTERN.test(parsed.value)) {
    return fail(`${field} moet uit één tot vier numerieke delen bestaan`);
  }
  return parsed;
}

function parseExtensionId(value: unknown): ParseResult<string> {
  const parsed = parseString(value, 'id', EXTENSION_LIMITS.id);
  if (!parsed.ok) return parsed;
  if (!EXTENSION_ID_PATTERN.test(parsed.value) || RESERVED_IDS.has(parsed.value)) {
    return fail('id heeft geen geldige extensie-identiteit');
  }
  return parsed;
}

function parseMainPath(value: unknown): ParseResult<string> {
  const parsed = parseString(value, 'main', EXTENSION_LIMITS.main);
  if (!parsed.ok) return parsed;
  if (parsed.value.includes('\\') || parsed.value.includes('\0')) {
    return fail('main moet een veilig relatief pad met /-scheiding zijn');
  }
  const segments = parsed.value.split('/');
  if (segments.some((segment) => segment === '' || segment === '.' || segment === '..')) {
    return fail('main moet een veilig relatief pad zonder lege, .- of ..-segmenten zijn');
  }
  return parsed;
}

function isExtensionCategory(value: string): value is ExtensionCategory {
  return EXTENSION_CATEGORIES.some((category) => category === value);
}

function isExtensionPermission(value: unknown): value is ExtensionPermission {
  return typeof value === 'string'
    && EXTENSION_PERMISSIONS.some((permission) => permission === value);
}

function parseCategory(value: unknown): ParseResult<ExtensionCategory> {
  if (typeof value !== 'string' || !isExtensionCategory(value)) {
    return fail('category is geen bekende extensiecategorie');
  }
  return { ok: true, value, warnings: [] };
}

function parsePermissions(
  value: unknown,
  mode: ManifestParseMode,
): ParseResult<ExtensionPermission[]> {
  if (!Array.isArray(value)) return fail('permissions moet een array zijn');

  const permissions: ExtensionPermission[] = [];
  let removed = 0;
  for (const candidate of value) {
    if (!isExtensionPermission(candidate)) {
      if (mode === 'fresh') return fail('permissions bevat een onbekende permission');
      removed++;
      continue;
    }
    if (!permissions.includes(candidate)) permissions.push(candidate);
  }

  return {
    ok: true,
    value: permissions,
    warnings: removed > 0
      ? [`${removed} onbekende legacypermission(s) verwijderd`]
      : [],
  };
}

function parseTags(value: unknown): ParseResult<string[]> {
  if (!Array.isArray(value)) return fail('tags moet een array zijn');
  if (value.length > EXTENSION_LIMITS.tags) {
    return fail(`tags mag maximaal ${EXTENSION_LIMITS.tags} waarden bevatten`);
  }

  const tags: string[] = [];
  for (const candidate of value) {
    const parsed = parseString(candidate, 'tag', EXTENSION_LIMITS.tag);
    if (!parsed.ok) return parsed;
    if (!tags.includes(parsed.value)) tags.push(parsed.value);
  }
  return { ok: true, value: tags, warnings: [] };
}

function parseRepository(value: unknown): ParseResult<string> {
  if (typeof value !== 'string' || value.length === 0) {
    return fail('repository moet een niet-lege http(s)-URL zijn');
  }
  try {
    const url = new URL(value);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return fail('repository moet een http(s)-URL zijn');
    }
  } catch {
    return fail('repository moet een geldige http(s)-URL zijn');
  }
  return { ok: true, value, warnings: [] };
}

function parseIcon(value: unknown): ParseResult<string> {
  if (typeof value !== 'string' || value.length === 0) {
    return fail('icon moet een niet-lege string zijn');
  }
  if (new TextEncoder().encode(value).byteLength > EXTENSION_LIMITS.iconBytes) {
    return fail(`icon mag maximaal ${EXTENSION_LIMITS.iconBytes} UTF-8-bytes bevatten`);
  }
  return { ok: true, value, warnings: [] };
}

/**
 * Reconstrueer een manifest uit een niet-vertrouwde waarde.
 *
 * `fresh` is strikt voor nieuwe JS-/ZIP-/catalogusinvoer. `stored-legacy` accepteert uitsluitend de
 * expliciete, veilige compatibiliteitsdefaults voor oudere IndexedDB-records en meldt iedere
 * normalisatie. De uitkomst deelt geen arrays of objectvelden met de bron.
 */
export function parseExtensionManifest(
  input: unknown,
  mode: ManifestParseMode,
): ParseResult<ExtensionManifest> {
  if (!isRecord(input)) return fail('manifest moet een object zijn');

  const id = parseExtensionId(input.id);
  if (!id.ok) return id;
  const name = parseString(input.name, 'name', EXTENSION_LIMITS.name);
  if (!name.ok) return name;
  const version = parseVersion(input.version, 'version');
  if (!version.ok) return version;
  const author = parseString(input.author, 'author', EXTENSION_LIMITS.author);
  if (!author.ok) return author;
  const description = parseString(input.description, 'description', EXTENSION_LIMITS.description);
  if (!description.ok) return description;
  const category = parseCategory(input.category);
  if (!category.ok) return category;
  const main = parseMainPath(input.main);
  if (!main.ok) return main;

  const warnings: string[] = [];

  let minAppVersion: string;
  if (input.minAppVersion === undefined && mode === 'stored-legacy') {
    minAppVersion = '0.0.0';
    warnings.push('minAppVersion ontbreekt; legacydefault 0.0.0 toegepast');
  } else {
    const parsed = parseVersion(input.minAppVersion, 'minAppVersion');
    if (!parsed.ok) return parsed;
    minAppVersion = parsed.value;
  }

  let permissions: ExtensionPermission[];
  if (input.permissions === undefined && mode === 'stored-legacy') {
    permissions = [];
    warnings.push('permissions ontbreken; legacydefault [] toegepast');
  } else {
    const parsed = parsePermissions(input.permissions, mode);
    if (!parsed.ok) return parsed;
    permissions = parsed.value;
    warnings.push(...parsed.warnings);
  }

  let apiVersion: string | undefined;
  if (input.apiVersion !== undefined) {
    const parsed = parseVersion(input.apiVersion, 'apiVersion');
    if (!parsed.ok) return parsed;
    apiVersion = parsed.value;
  }

  let tags: string[] | undefined;
  if (input.tags !== undefined) {
    const parsed = parseTags(input.tags);
    if (!parsed.ok) return parsed;
    tags = parsed.value;
  }

  let repository: string | undefined;
  if (input.repository !== undefined) {
    const parsed = parseRepository(input.repository);
    if (!parsed.ok) return parsed;
    repository = parsed.value;
  }

  let icon: string | undefined;
  if (input.icon !== undefined) {
    const parsed = parseIcon(input.icon);
    if (!parsed.ok) return parsed;
    icon = parsed.value;
  }

  const value: ExtensionManifest = {
    id: id.value,
    name: name.value,
    version: version.value,
    minAppVersion,
    author: author.value,
    description: description.value,
    category: category.value,
    main: main.value,
    permissions,
  };
  if (apiVersion !== undefined) value.apiVersion = apiVersion;
  if (repository !== undefined) value.repository = repository;
  if (tags !== undefined) value.tags = tags;
  if (icon !== undefined) value.icon = icon;

  return { ok: true, value, warnings };
}
