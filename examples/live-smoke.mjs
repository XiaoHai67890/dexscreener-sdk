// Copyright (c) 2026 Xiaohai. MIT License; see ../LICENSE.
// Both API operations go through the unmodified generated SDK.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { writeFile, mkdir } from 'node:fs/promises';

const require = createRequire(import.meta.url);
const { DexscreenerSDK } = require('../ts/dist/DexscreenerSDK.js');
const evidenceDirectory = new URL('../evidence/', import.meta.url);
const evidenceFile = new URL('results.json', evidenceDirectory);
const startedAt = new Date().toISOString();
const requests = [];
const checks = [];
const query = 'WETH/USDC';

// Observe the SDK's transport without replacing its entity operations.
const observedFetch = async (url, init) => {
  const started = Date.now();
  const record = { method: init?.method ?? 'GET', url: String(url) };
  requests.push(record);
  try {
    const response = await globalThis.fetch(url, {
      ...init,
      signal: AbortSignal.timeout(15_000),
    });
    record.status = response.status;
    record.durationMs = Date.now() - started;
    return response;
  } catch (error) {
    record.error = String(error.message).slice(0, 200);
    record.durationMs = Date.now() - started;
    throw error;
  }
};

const sdk = new DexscreenerSDK({ system: { fetch: observedFetch } });
const result = {
  startedAt, runtime: process.version, mode: 'live', query,
  requests, checks,
  scope: 'Search and pair-detail only; other generated endpoints are not live-verified.',
};
const short = value => String(value ?? '').slice(0, 80);

try {
  const entities = await sdk.Search().list({ q: query });
  assert.ok(Array.isArray(entities), 'Search must return an array');
  assert.ok(entities.length > 0, 'Search must return at least one result');
  checks.push({ name: 'search returns a non-empty array', pass: true });
  result.search = {
    count: entities.length,
    firstItemConstructor: entities[0]?.constructor?.name,
    firstItemHasDataMethod: typeof entities[0]?.data === 'function',
  };
  const rows = entities.map(entity => entity.data());

  // Do not assume a ticker identifies a genuine asset. Select only for an
  // address-consistency check, and do not perform transactions.
  const suitable = row => typeof row?.chainId === 'string' &&
    typeof row?.pairAddress === 'string' && row.chainId && row.pairAddress;
  const querySymbols = row => new Set([
    row.baseToken?.symbol, row.quoteToken?.symbol,
  ]);
  const selected = rows.find(row => suitable(row) &&
    querySymbols(row).has('WETH') && querySymbols(row).has('USDC')) ??
    rows.find(row => suitable(row) &&
      String(row.baseToken?.symbol ?? '').length <= 20 &&
      String(row.quoteToken?.symbol ?? '').length <= 20) ??
    rows.find(suitable);
  assert.ok(selected, 'A result must provide chainId and pairAddress');
  result.selected = {
    chainId: short(selected.chainId),
    dexId: short(selected.dexId),
    pairAddress: short(selected.pairAddress),
    baseSymbol: short(selected.baseToken?.symbol),
    quoteSymbol: short(selected.quoteToken?.symbol),
  };

  const loaded = await sdk.Pair().load({
    chain_id: selected.chainId,
    pair_id: selected.pairAddress,
  });
  assert.equal(typeof loaded.data, 'function', 'Pair load returns an entity');
  const detail = loaded.data();
  assert.ok(Array.isArray(detail?.pairs), 'Pair detail must contain a pairs array');
  assert.ok(detail.pairs.some(row => row.chainId === selected.chainId &&
    row.pairAddress === selected.pairAddress),
  'Detail must include the selected chain and pair address');
  checks.push({ name: 'pair detail matches search chain and address', pass: true });
  result.detail = {
    count: detail.pairs.length,
    returnConstructor: loaded.constructor.name,
    bodyKeys: Object.keys(detail).sort(),
  };
  result.ok = true;
} catch (error) {
  result.ok = false;
  result.error = { name: error.name, message: String(error.message).slice(0, 500) };
  process.exitCode = 1;
} finally {
  result.completedAt = new Date().toISOString();
  await mkdir(evidenceDirectory, { recursive: true });
  await writeFile(evidenceFile, JSON.stringify(result, null, 2) + '\n');
  console.log(JSON.stringify(result, null, 2));
}
