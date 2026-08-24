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
