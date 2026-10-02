# DEX Screener API

The DEX Screener API.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 9 entities and 10 HTTP routes. There are 1 SDK targets.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Ads

Results: Ok.

SDK operations: `list`.

### Boost

Results: Ok.

SDK operations: `list`.

### CommunityTakeover

Results: Ok.

SDK operations: `list`.

### Order

Results: Ok.

SDK operations: `list`.

### Pair

Results: Ok.

SDK operations: `load`.

### Search

Results: Ok.

SDK operations: `list`.

### Token

Results: Ok.

SDK operations: `list`.

### TokenProfile

Results: Ok.

SDK operations: `list`.

### TokensPair

Results: Ok.

SDK operations: `list`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Ads | `list` | `GET /ads/latest/v1` | See reference |
| Boost | `list` | `GET /token-boosts/latest/v1` | See reference |
| Boost | `list` | `GET /token-boosts/top/v1` | See reference |
| CommunityTakeover | `list` | `GET /community-takeovers/latest/v1` | See reference |
| Order | `list` | `GET /orders/v1/{chainId}/{tokenAddress}` | See reference |
| Pair | `load` | `GET /latest/dex/pairs/{chainId}/{pairId}` | See reference |
| Search | `list` | `GET /latest/dex/search` | See reference |
| Token | `list` | `GET /tokens/v1/{chainId}/{tokenAddresses}` | See reference |
| TokenProfile | `list` | `GET /token-profiles/latest/v1` | See reference |
| TokensPair | `list` | `GET /token-pairs/v1/{chainId}/{tokenAddress}` | See reference |

## Connect to the API

- API server: `https://api.dexscreener.com`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `test`: In-memory mock transport for testing without a live server

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

