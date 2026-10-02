# Dexscreener TypeScript SDK Reference

Complete API reference for the Dexscreener TypeScript SDK.


## DexscreenerSDK

### Constructor

```ts
new DexscreenerSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `DexscreenerSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = DexscreenerSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `DexscreenerSDK` instance in test mode.


### Instance Methods

#### `Ads(data?: object)`

Create a new `Ads` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AdsEntity` instance.

#### `Boost(data?: object)`

Create a new `Boost` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BoostEntity` instance.

#### `CommunityTakeover(data?: object)`

Create a new `CommunityTakeover` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CommunityTakeoverEntity` instance.

#### `Order(data?: object)`

Create a new `Order` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OrderEntity` instance.

#### `Pair(data?: object)`

Create a new `Pair` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PairEntity` instance.

#### `Search(data?: object)`

Create a new `Search` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SearchEntity` instance.

#### `Token(data?: object)`

Create a new `Token` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TokenEntity` instance.

#### `TokenProfile(data?: object)`

Create a new `TokenProfile` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TokenProfileEntity` instance.

#### `TokensPair(data?: object)`

Create a new `TokensPair` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TokensPairEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `DexscreenerSDK.test()`.

**Returns:** `DexscreenerSDK` instance in test mode.


---

## AdsEntity

```ts
const ads = client.Ads()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `chainId` | `string` | No |  |
| `date` | `string` | No |  |
| `durationHours` | `number` | No |  |
| `impressions` | `number` | No |  |
| `tokenAddress` | `string` | No |  |
| `type` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Ads().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AdsEntity` instance with the same client and
options.

#### `client()`

Return the parent `DexscreenerSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BoostEntity

```ts
const boost = client.Boost()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `label` | `string` | No |  |
| `type` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Boost().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BoostEntity` instance with the same client and
options.

#### `client()`

Return the parent `DexscreenerSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CommunityTakeoverEntity

```ts
const community_takeover = client.CommunityTakeover()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `chainId` | `string` | No |  |
| `claimDate` | `string` | No |  |
| `description` | `string` | No |  |
| `header` | `string` | No |  |
| `icon` | `string` | No |  |
| `links` | `any[]` | No |  |
| `tokenAddress` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.CommunityTakeover().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CommunityTakeoverEntity` instance with the same client and
options.

#### `client()`

Return the parent `DexscreenerSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OrderEntity

```ts
const order = client.Order()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `paymentTimestamp` | `number` | No |  |
| `status` | `string` | No |  |
| `type` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Order().list({ chain_id: "example", token_address: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OrderEntity` instance with the same client and
options.

#### `client()`

Return the parent `DexscreenerSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PairEntity

```ts
const pair = client.Pair()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `pairs` | `any[]` | No |  |
| `schemaVersion` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Pair().load({ chain_id: 'chain_id', pair_id: 'pair_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PairEntity` instance with the same client and
options.

#### `client()`

Return the parent `DexscreenerSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SearchEntity

```ts
const search = client.Search()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `baseToken` | `Record<string, any>` | No |  |
| `boosts` | `Record<string, any>` | No |  |
| `chainId` | `string` | No |  |
| `dexId` | `string` | No |  |
| `fdv` | `number` | No |  |
| `info` | `Record<string, any>` | No |  |
| `labels` | `any[]` | No |  |
| `liquidity` | `Record<string, any>` | No |  |
| `marketCap` | `number` | No |  |
| `pairAddress` | `string` | No |  |
| `pairCreatedAt` | `number` | No |  |
| `priceChange` | `Record<string, any>` | No |  |
| `priceNative` | `string` | No |  |
| `priceUsd` | `string` | No |  |
| `quoteToken` | `Record<string, any>` | No |  |
| `txns` | `Record<string, any>` | No |  |
| `url` | `string` | No |  |
| `volume` | `Record<string, any>` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Search().list({ q: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SearchEntity` instance with the same client and
options.

#### `client()`

Return the parent `DexscreenerSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TokenEntity

```ts
const token = client.Token()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `baseToken` | `Record<string, any>` | No |  |
| `boosts` | `Record<string, any>` | No |  |
| `chainId` | `string` | No |  |
| `dexId` | `string` | No |  |
| `fdv` | `number` | No |  |
| `info` | `Record<string, any>` | No |  |
| `labels` | `any[]` | No |  |
| `liquidity` | `Record<string, any>` | No |  |
| `marketCap` | `number` | No |  |
| `pairAddress` | `string` | No |  |
| `pairCreatedAt` | `number` | No |  |
| `priceChange` | `Record<string, any>` | No |  |
| `priceNative` | `string` | No |  |
| `priceUsd` | `string` | No |  |
| `quoteToken` | `Record<string, any>` | No |  |
| `txns` | `Record<string, any>` | No |  |
| `url` | `string` | No |  |
| `volume` | `Record<string, any>` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Token().list({ chain_id: "example", token_address: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TokenEntity` instance with the same client and
options.

#### `client()`

Return the parent `DexscreenerSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TokenProfileEntity

```ts
const token_profile = client.TokenProfile()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `label` | `string` | No |  |
| `type` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.TokenProfile().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TokenProfileEntity` instance with the same client and
options.

#### `client()`

Return the parent `DexscreenerSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TokensPairEntity

```ts
const tokens_pair = client.TokensPair()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `baseToken` | `Record<string, any>` | No |  |
| `boosts` | `Record<string, any>` | No |  |
| `chainId` | `string` | No |  |
| `dexId` | `string` | No |  |
| `fdv` | `number` | No |  |
| `info` | `Record<string, any>` | No |  |
| `labels` | `any[]` | No |  |
| `liquidity` | `Record<string, any>` | No |  |
| `marketCap` | `number` | No |  |
| `pairAddress` | `string` | No |  |
| `pairCreatedAt` | `number` | No |  |
| `priceChange` | `Record<string, any>` | No |  |
| `priceNative` | `string` | No |  |
| `priceUsd` | `string` | No |  |
| `quoteToken` | `Record<string, any>` | No |  |
| `txns` | `Record<string, any>` | No |  |
| `url` | `string` | No |  |
| `volume` | `Record<string, any>` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.TokensPair().list({ chain_id: "example", token_address: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TokensPairEntity` instance with the same client and
options.

#### `client()`

Return the parent `DexscreenerSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```ts
const client = new DexscreenerSDK({
  feature: {
    test: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

