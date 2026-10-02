# Dexscreener TypeScript SDK



The TypeScript SDK for the Dexscreener API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Ads()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Releases](https://github.com/XiaoHai67890/dexscreener-sdk/releases)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/XiaoHai67890/dexscreener-sdk
npm install ./dexscreener-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { DexscreenerSDK } from '@xiaohai67890/dexscreener-sdk'

const client = new DexscreenerSDK()
```

### 2. List ads records

`list()` resolves to an array of Ads ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const adss = await client.Ads().list()

for (const ads of adss) {
  console.log(ads)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const adss = await client.Ads().list()
  console.log(adss)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = DexscreenerSDK.test()

const ads = await client.Ads().list()
// ads is the entity, populated with mock response data
// — call ads.data() for the record itself
console.log(ads)
```

You can also use the instance method:

```ts
const client = new DexscreenerSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Ads()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new DexscreenerSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
DEXSCREENER_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### DexscreenerSDK

#### Constructor

```ts
new DexscreenerSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Ads(data?)` | `AdsEntity` | Create an Ads entity instance. |
| `Boost(data?)` | `BoostEntity` | Create a Boost entity instance. |
| `CommunityTakeover(data?)` | `CommunityTakeoverEntity` | Create a CommunityTakeover entity instance. |
| `Order(data?)` | `OrderEntity` | Create an Order entity instance. |
| `Pair(data?)` | `PairEntity` | Create a Pair entity instance. |
| `Search(data?)` | `SearchEntity` | Create a Search entity instance. |
| `Token(data?)` | `TokenEntity` | Create a Token entity instance. |
| `TokenProfile(data?)` | `TokenProfileEntity` | Create a TokenProfile entity instance. |
| `TokensPair(data?)` | `TokensPairEntity` | Create a TokensPair entity instance. |
| `tester(testopts?, sdkopts?)` | `DexscreenerSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `DexscreenerSDK.test(testopts?, sdkopts?)` | `DexscreenerSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): DexscreenerSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Ads

| Field | Description |
| --- | --- |
| `chainId` |  |
| `date` |  |
| `durationHours` |  |
| `impressions` |  |
| `tokenAddress` |  |
| `type` |  |
| `url` |  |

Operations: list.

API path: `/ads/latest/v1`

#### Boost

| Field | Description |
| --- | --- |
| `label` |  |
| `type` |  |
| `url` |  |

Operations: list.

API path: `/token-boosts/latest/v1`

#### CommunityTakeover

| Field | Description |
| --- | --- |
| `chainId` |  |
| `claimDate` |  |
| `description` |  |
| `header` |  |
| `icon` |  |
| `links` |  |
| `tokenAddress` |  |
| `url` |  |

Operations: list.

API path: `/community-takeovers/latest/v1`

#### Order

| Field | Description |
| --- | --- |
| `paymentTimestamp` |  |
| `status` |  |
| `type` |  |

Operations: list.

API path: `/orders/v1/{chainId}/{tokenAddress}`

#### Pair

| Field | Description |
| --- | --- |
| `id` |  |
| `pairs` |  |
| `schemaVersion` |  |

Operations: load.

API path: `/latest/dex/pairs/{chainId}/{pairId}`

#### Search

| Field | Description |
| --- | --- |
| `baseToken` |  |
| `boosts` |  |
| `chainId` |  |
| `dexId` |  |
| `fdv` |  |
| `info` |  |
| `labels` |  |
| `liquidity` |  |
| `marketCap` |  |
| `pairAddress` |  |
| `pairCreatedAt` |  |
| `priceChange` |  |
| `priceNative` |  |
| `priceUsd` |  |
| `quoteToken` |  |
| `txns` |  |
| `url` |  |
| `volume` |  |

Operations: list.

API path: `/latest/dex/search`

#### Token

| Field | Description |
| --- | --- |
| `baseToken` |  |
| `boosts` |  |
| `chainId` |  |
| `dexId` |  |
| `fdv` |  |
| `info` |  |
| `labels` |  |
| `liquidity` |  |
| `marketCap` |  |
| `pairAddress` |  |
| `pairCreatedAt` |  |
| `priceChange` |  |
| `priceNative` |  |
| `priceUsd` |  |
| `quoteToken` |  |
| `txns` |  |
| `url` |  |
| `volume` |  |

Operations: list.

API path: `/tokens/v1/{chainId}/{tokenAddresses}`

#### TokenProfile

| Field | Description |
| --- | --- |
| `label` |  |
| `type` |  |
| `url` |  |

Operations: list.

API path: `/token-profiles/latest/v1`

#### TokensPair

| Field | Description |
| --- | --- |
| `baseToken` |  |
| `boosts` |  |
| `chainId` |  |
| `dexId` |  |
| `fdv` |  |
| `info` |  |
| `labels` |  |
| `liquidity` |  |
| `marketCap` |  |
| `pairAddress` |  |
| `pairCreatedAt` |  |
| `priceChange` |  |
| `priceNative` |  |
| `priceUsd` |  |
| `quoteToken` |  |
| `txns` |  |
| `url` |  |
| `volume` |  |

Operations: list.

API path: `/token-pairs/v1/{chainId}/{tokenAddress}`



## Entities


### Ads

Create an instance: `const ads = client.Ads()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `chainId` | `string` |  |
| `date` | `string` |  |
| `durationHours` | `number` |  |
| `impressions` | `number` |  |
| `tokenAddress` | `string` |  |
| `type` | `string` |  |
| `url` | `string` |  |

#### Example: List

```ts
const adss = await client.Ads().list()
```


### Boost

Create an instance: `const boost = client.Boost()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `label` | `string` |  |
| `type` | `string` |  |
| `url` | `string` |  |

#### Example: List

```ts
const boosts = await client.Boost().list()
```


### CommunityTakeover

Create an instance: `const community_takeover = client.CommunityTakeover()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `chainId` | `string` |  |
| `claimDate` | `string` |  |
| `description` | `string` |  |
| `header` | `string` |  |
| `icon` | `string` |  |
| `links` | `any[]` |  |
| `tokenAddress` | `string` |  |
| `url` | `string` |  |

#### Example: List

```ts
const community_takeovers = await client.CommunityTakeover().list()
```


### Order

Create an instance: `const order = client.Order()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `paymentTimestamp` | `number` |  |
| `status` | `string` |  |
| `type` | `string` |  |

#### Example: List

```ts
const orders = await client.Order().list({ chain_id: "example", token_address: "example" })
```


### Pair

Create an instance: `const pair = client.Pair()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `pairs` | `any[]` |  |
| `schemaVersion` | `string` |  |

#### Example: Load

```ts
const pair = await client.Pair().load({ chain_id: 'chain_id', pair_id: 'pair_id' })
```


### Search

Create an instance: `const search = client.Search()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `baseToken` | `Record<string, any>` |  |
| `boosts` | `Record<string, any>` |  |
| `chainId` | `string` |  |
| `dexId` | `string` |  |
| `fdv` | `number` |  |
| `info` | `Record<string, any>` |  |
| `labels` | `any[]` |  |
| `liquidity` | `Record<string, any>` |  |
| `marketCap` | `number` |  |
| `pairAddress` | `string` |  |
| `pairCreatedAt` | `number` |  |
| `priceChange` | `Record<string, any>` |  |
| `priceNative` | `string` |  |
| `priceUsd` | `string` |  |
| `quoteToken` | `Record<string, any>` |  |
| `txns` | `Record<string, any>` |  |
| `url` | `string` |  |
| `volume` | `Record<string, any>` |  |

#### Example: List

```ts
const searchs = await client.Search().list({ q: "example" })
```


### Token

Create an instance: `const token = client.Token()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `baseToken` | `Record<string, any>` |  |
| `boosts` | `Record<string, any>` |  |
| `chainId` | `string` |  |
| `dexId` | `string` |  |
| `fdv` | `number` |  |
| `info` | `Record<string, any>` |  |
| `labels` | `any[]` |  |
| `liquidity` | `Record<string, any>` |  |
| `marketCap` | `number` |  |
| `pairAddress` | `string` |  |
| `pairCreatedAt` | `number` |  |
| `priceChange` | `Record<string, any>` |  |
| `priceNative` | `string` |  |
| `priceUsd` | `string` |  |
| `quoteToken` | `Record<string, any>` |  |
| `txns` | `Record<string, any>` |  |
| `url` | `string` |  |
| `volume` | `Record<string, any>` |  |

#### Example: List

```ts
const tokens = await client.Token().list({ chain_id: "example", token_address: "example" })
```


### TokenProfile

Create an instance: `const token_profile = client.TokenProfile()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `label` | `string` |  |
| `type` | `string` |  |
| `url` | `string` |  |

#### Example: List

```ts
const token_profiles = await client.TokenProfile().list()
```


### TokensPair

Create an instance: `const tokens_pair = client.TokensPair()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `baseToken` | `Record<string, any>` |  |
| `boosts` | `Record<string, any>` |  |
| `chainId` | `string` |  |
| `dexId` | `string` |  |
| `fdv` | `number` |  |
| `info` | `Record<string, any>` |  |
| `labels` | `any[]` |  |
| `liquidity` | `Record<string, any>` |  |
| `marketCap` | `number` |  |
| `pairAddress` | `string` |  |
| `pairCreatedAt` | `number` |  |
| `priceChange` | `Record<string, any>` |  |
| `priceNative` | `string` |  |
| `priceUsd` | `string` |  |
| `quoteToken` | `Record<string, any>` |  |
| `txns` | `Record<string, any>` |  |
| `url` | `string` |  |
| `volume` | `Record<string, any>` |  |

#### Example: List

```ts
const tokens_pairs = await client.TokensPair().list({ chain_id: "example", token_address: "example" })
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | Test transport |

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
dexscreener/
├── src/
│   ├── DexscreenerSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { DexscreenerSDK } from '@xiaohai67890/dexscreener-sdk'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const ads = client.Ads()
await ads.list()

// ads.data() now returns the ads data from the last `list`
// ads.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
