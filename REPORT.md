# Developer experience report

**Xiaohai — Voxgig first SDK assessment — 2 October 2026**

I chose DEX Screener because it provides a public OpenAPI definition and a
small, useful read-only workflow without credentials: search for a pair, then
fetch its details. A preflight check of 803 public Voxgig SDK repository names
and descriptions found no DEX Screener match. That check did not inspect every
repository's contents.

Using Node.js 24.19.0, the pinned `@voxgig/create-sdkgen@0.30.6` scaffold and
`npm run generate` succeeded. The resolved SDK generator was 4.34.0. The
unmodified 10-path definition produced 9 entities. A project model overlay
set my repository, author and package name, then I regenerated rather than
editing the TypeScript output.

The local build and generated offline suite completed with **239 passing
tests, 1 skipped test and 0 failures**. The final live example used
`Search().list({q})` and `Pair().load({chain_id, pair_id})`, not a replacement
HTTP client. Both requests returned **HTTP 200**. Search returned 30 entities;
the selected Solana/Orca WETH–USDC record appeared in the detail response with
the exact same chain and pair address. These are API records, not verified
token identities. The remaining endpoints were not live-tested.

The main friction was the return-value documentation. The root quickstart
and generated types describe entity objects correctly, but the TypeScript
README's general explanation says operations return data directly. My first
example read `chainId` from a search entity and failed its selection assertion
after a successful HTTP response. Calling `.data()` resolved it without a
generator change. I retained that initial observation separately from the
final successful evidence. A single consistent explanation of entities and
`.data()` in the language README would make onboarding faster.

There are also schema limits: `Pair.pairs` is generated as optional `any[]`,
although the input permits null. The live detail body additionally includes
`pair`, absent from the downloaded schema. I treated these as type/schema
observations and kept the input intact; no template fixes are claimed. The
current reference also exposes paths absent from that downloadable file.

The generator's project structure and preserved model overlay made ownership
customization straightforward. A clearer assessment entry point and more
precise nested/null types would improve the experience. The repository
contains the definition, lockfiles, generated SDK, runnable example and
timestamped evidence. The named npm package has **not** been published.

AI assisted with execution, inspection, example development, testing, writing
and independent review. The execution timestamps are in `evidence/time-log.json`;
human effort was not independently measured. This is the first-task deliverable;
the second task and the combined USD 50 invoice remain pending.
