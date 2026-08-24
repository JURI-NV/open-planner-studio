import { expect, test } from './fixtures/ops';

test('extension storage: scant vier echte IndexedDB-records zonder code uit te voeren', async ({ page, ops: _ops }) => {
  await page.evaluate(async () => {
    Object.defineProperty(window, '__opsExtensionStorageOnLoad', {
      configurable: true,
      writable: true,
      value: 0,
    });

    const db = await new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open('ops-extensions', 1);
      request.onupgradeneeded = () => {
        if (!request.result.objectStoreNames.contains('extensions')) {
          request.result.createObjectStore('extensions', { keyPath: 'id' });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    const modernManifest = (id: string): Record<string, unknown> => ({
      id,
      name: `Extensie ${id}`,
      version: '1.0.0',
      apiVersion: '1.0',
      minAppVersion: '0.0.0',
      author: 'Browserfixture',
      description: '',
      category: 'Utility',
      main: 'main.js',
      permissions: ['events'],
    });
    const legacyManifest = modernManifest('01-legacy');
    delete legacyManifest.permissions;
    delete legacyManifest.minAppVersion;
    const effectCode = 'window.__opsExtensionStorageOnLoad += 1; module.exports = { onLoad() {} };';

    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction('extensions', 'readwrite');
      const store = tx.objectStore('extensions');
      store.clear();
      store.put({ id: '01-legacy', manifest: legacyManifest, mainCode: effectCode, enabled: false });
      store.put({ id: '02-corrupt', manifest: 17, mainCode: 99, enabled: 'ja' });
      store.put({
        id: '03-mismatch',
        manifest: modernManifest('03-andere-manifest-id'),
        mainCode: effectCode,
        enabled: false,
      });
      store.put({
        id: '04-modern',
        manifest: modernManifest('04-modern'),
        mainCode: effectCode,
        enabled: true,
      });
      tx.oncomplete = () => resolve();
      tx.onabort = () => reject(tx.error);
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  });

  const beforeKeys = await page.evaluate(async () => {
    const db = await new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open('ops-extensions', 1);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    const keys = await new Promise<IDBValidKey[]>((resolve, reject) => {
      const tx = db.transaction('extensions', 'readonly');
      const request = tx.objectStore('extensions').getAllKeys();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    db.close();
    return keys;
  });

  const scan = await page.evaluate(() => window.__OPS__!.extensions.scanStored());

  const after = await page.evaluate(async () => {
    const db = await new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open('ops-extensions', 1);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    const keys = await new Promise<IDBValidKey[]>((resolve, reject) => {
      const tx = db.transaction('extensions', 'readonly');
      const request = tx.objectStore('extensions').getAllKeys();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    db.close();
    return {
      keys,
      onLoadEffects: (window as unknown as { __opsExtensionStorageOnLoad: number })
        .__opsExtensionStorageOnLoad,
    };
  });

  expect(beforeKeys).toEqual(['01-legacy', '02-corrupt', '03-mismatch', '04-modern']);
  expect(scan).toHaveLength(4);
  expect(scan.map(record => ({ storageKey: record.storageKey, ok: record.ok }))).toEqual([
    { storageKey: '01-legacy', ok: true },
    { storageKey: '02-corrupt', ok: false },
    { storageKey: '03-mismatch', ok: false },
    { storageKey: '04-modern', ok: true },
  ]);
  expect(scan.filter(record => !record.ok).every(record => Boolean(record.reason))).toBe(true);
  expect(after.keys).toEqual(beforeKeys);
  expect(after.onLoadEffects).toBe(0);
});
