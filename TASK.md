# Voxgig SDK assessment: DEX Screener

Candidate: **Xiaohai** · GitHub: [XiaoHai67890](https://github.com/XiaoHai67890)

Review the [experience report](REPORT.md), [live results](evidence/results.json)
and [runnable example](examples/live-smoke.mjs). This is an unofficial,
MIT-licensed generated SDK, not an npm release or a trading application.

## Choice and provenance

- Generator: [`@voxgig/create-sdkgen`](https://voxgig.com/sdk), version **0.30.6**.
- SDK generator resolved by the lockfile: **`@voxgig/sdkgen` 4.34.0**.
- Runtime used: **Node.js 24.19.0**.
- API source: [DEX Screener official reference](https://docs.dexscreener.com/api/reference),
  including its downloadable OpenAPI 3.0.3 definition, retrieved 2 October 2026.
- Original definition: `.sdk/def/dexscreener-openapi-original.yml`, **10 paths**.
- SHA-256: `e40964ed9f7c598680b80abf4d296c23f20d67991735ada30c4a9a5ef5d12992`.

Before execution, 803 public repository names and descriptions in
[`voxgig-sdk`](https://github.com/orgs/voxgig-sdk/repositories) were checked,
with no DEX Screener match. This is a catalogue check, not a claim that every
repository's contents were searched. See `evidence/api-choice.json`.
The current reference lists additional endpoints absent from the downloadable
definition; this submission preserves the definition unchanged.

## Reproduce and run

Use Node.js 24 and run from the repository root:

```sh
cd ts
npm ci
npm test
cd ..
node examples/live-smoke.mjs
```

`npm test` runs the TypeScript build through its `pretest` script, then the
generator's offline test suite. The example makes two public, read-only API
calls through the generated SDK: search for `WETH/USDC`, then load one result
by its chain and pair address. It requires no API key and writes a fresh
`evidence/results.json`. Search results and response times can change.

Actual SDK usage:

```js
const { DexscreenerSDK } = require('./ts/dist/DexscreenerSDK.js');
const sdk = new DexscreenerSDK();
const entities = await sdk.Search().list({ q: 'WETH/USDC' });
const first = entities[0].data();
const detail = await sdk.Pair().load({
  chain_id: first.chainId,
  pair_id: first.pairAddress,
});
console.log(detail.data());
```

Ticker matching is only used to select a demonstration record; it does not
authenticate an asset. The example makes no transactions. Address consistency
is checked by exact comparison, which also preserves case-sensitive addresses.

## Regenerate

The initial scaffold command was:

```sh
npx --yes @voxgig/create-sdkgen@0.30.6 dexscreener \
  -d ./dexscreener-openapi-original.yml -o ./dexscreener-sdk -t ts -f test
```

The input file was copied into `.sdk/def/` by the scaffold. To regenerate an
existing clone:

```sh
cd .sdk
npm ci
npm run generate
cd ../ts
npm ci
npm test
```

Repository, author and package-name choices live in
`.sdk/model/project.aontu`. The generated TypeScript implementation and API
definition were not edited by hand. Both toolchain and target lockfiles are
included; generated `ts/dist` and `ts/dist-test` follow the scaffold's
commit policy. `node_modules`, build bookkeeping and local logs are excluded.

## Verified scope and attribution

The model generates 9 entities covering the 10 input paths. Only **search and
pair detail** were live-verified. Offline tests are not evidence of live
coverage for other endpoints, and GitHub Actions results are separate from
the local verification recorded here.

See `evidence/unit-tests.json` for the local result and `evidence/time-log.json`
for timestamps and AI disclosure. See [AUTHORSHIP.md](AUTHORSHIP.md) for
attribution. No invoice or payment information is part of this submission.
