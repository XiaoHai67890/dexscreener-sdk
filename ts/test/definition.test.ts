import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "ads",
    "accessor": "Ads",
    "op": "list",
    "method": "GET",
    "path": "/ads/latest/v1",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "url": "x",
        "chainId": "x",
        "tokenAddress": "x",
        "date": "2026-01-01T00:00:00Z",
        "type": "x",
        "durationHours": 1,
        "impressions": 1
      }
    ],
    "idField": "id"
  },
  {
    "entity": "community_takeover",
    "accessor": "CommunityTakeover",
    "op": "list",
    "method": "GET",
    "path": "/community-takeovers/latest/v1",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "url": "x",
        "chainId": "x",
        "tokenAddress": "x",
        "icon": "x",
        "header": "x",
        "description": "x",
        "links": [
          {
            "type": "x",
            "label": "x",
            "url": "x"
          }
        ],
        "claimDate": "2026-01-01T00:00:00Z"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "order",
    "accessor": "Order",
    "op": "list",
    "method": "GET",
    "path": "/orders/v1/{chainId}/{tokenAddress}",
    "args": [
      {
        "name": "chain_id",
        "wire": "chainId",
        "value": "solana"
      },
      {
        "name": "token_address",
        "wire": "tokenAddress",
        "value": "A55XjvzRU4KtR3Lrys8PpLZQvPojPqvnv5bJVHMYy3Jv"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "type": "tokenProfile",
        "status": "processing",
        "paymentTimestamp": 1
      }
    ],
    "idField": "id"
  },
  {
    "entity": "pair",
    "accessor": "Pair",
    "op": "load",
    "method": "GET",
    "path": "/latest/dex/pairs/{chainId}/{pairId}",
    "args": [
      {
        "name": "chain_id",
        "wire": "chainId",
        "value": "solana"
      },
      {
        "name": "pair_id",
        "wire": "pairId",
        "value": "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "schemaVersion": "x",
      "pairs": [
        {
          "chainId": "x",
          "dexId": "x",
          "url": "x",
          "pairAddress": "x",
          "labels": [
            "x"
          ],
          "baseToken": {
            "address": "x",
            "name": "x",
            "symbol": "x"
          },
          "quoteToken": {
            "address": "x",
            "name": "x",
            "symbol": "x"
          },
          "priceNative": "x",
          "priceUsd": "x",
          "txns": {},
          "volume": {},
          "priceChange": {},
          "liquidity": {
            "base": 1,
            "quote": 1,
            "usd": 1
          },
          "fdv": 1,
          "marketCap": 1,
          "pairCreatedAt": 1,
          "info": {
            "imageUrl": "x",
            "socials": [
              {
                "handle": "x",
                "platform": "x"
              }
            ],
            "websites": [
              {
                "url": "x"
              }
            ]
          },
          "boosts": {
            "active": 1
          }
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "search",
    "accessor": "Search",
    "op": "list",
    "method": "GET",
    "path": "/latest/dex/search",
    "args": [],
    "select": {
      "q": "SOL/USDC"
    },
    "headers": [],
    "query": [
      "q"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "schemaVersion": "x",
      "pairs": [
        {
          "baseToken": {
            "address": "x",
            "name": "x",
            "symbol": "x"
          },
          "boosts": {
            "active": 1
          },
          "chainId": "x",
          "dexId": "x",
          "fdv": 1,
          "info": {
            "imageUrl": "x",
            "socials": [
              {
                "handle": "x",
                "platform": "x"
              }
            ],
            "websites": [
              {
                "url": "x"
              }
            ]
          },
          "labels": [
            "x"
          ],
          "liquidity": {
            "base": 1,
            "quote": 1,
            "usd": 1
          },
          "marketCap": 1,
          "pairAddress": "x",
          "pairCreatedAt": 1,
          "priceChange": {},
          "priceNative": "x",
          "priceUsd": "x",
          "quoteToken": {
            "address": "x",
            "name": "x",
            "symbol": "x"
          },
          "txns": {},
          "url": "x",
          "volume": {}
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "token",
    "accessor": "Token",
    "op": "list",
    "method": "GET",
    "path": "/tokens/v1/{chainId}/{tokenAddresses}",
    "args": [
      {
        "name": "chain_id",
        "wire": "chainId",
        "value": "solana"
      },
      {
        "name": "token_address",
        "wire": "tokenAddresses",
        "value": "So11111111111111111111111111111111111111112,EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "chainId": "x",
        "dexId": "x",
        "url": "x",
        "pairAddress": "x",
        "labels": [
          "x"
        ],
        "baseToken": {
          "address": "x",
          "name": "x",
          "symbol": "x"
        },
        "quoteToken": {
          "address": "x",
          "name": "x",
          "symbol": "x"
        },
        "priceNative": "x",
        "priceUsd": "x",
        "txns": {},
        "volume": {},
        "priceChange": {},
        "liquidity": {
          "base": 1,
          "quote": 1,
          "usd": 1
        },
        "fdv": 1,
        "marketCap": 1,
        "pairCreatedAt": 1,
        "info": {
          "imageUrl": "x",
          "socials": [
            {
              "handle": "x",
              "platform": "x"
            }
          ],
          "websites": [
            {
              "url": "x"
            }
          ]
        },
        "boosts": {
          "active": 1
        }
      }
    ],
    "idField": "id"
  },
  {
    "entity": "token_profile",
    "accessor": "TokenProfile",
    "op": "list",
    "method": "GET",
    "path": "/token-profiles/latest/v1",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "url": "x",
      "chainId": "x",
      "tokenAddress": "x",
      "icon": "x",
      "header": "x",
      "description": "x",
      "links": [
        {
          "label": "x",
          "type": "x",
          "url": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "tokens_pair",
    "accessor": "TokensPair",
    "op": "list",
    "method": "GET",
    "path": "/token-pairs/v1/{chainId}/{tokenAddress}",
    "args": [
      {
        "name": "chain_id",
        "wire": "chainId",
        "value": "solana"
      },
      {
        "name": "token_address",
        "wire": "tokenAddress",
        "value": "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "chainId": "x",
        "dexId": "x",
        "url": "x",
        "pairAddress": "x",
        "labels": [
          "x"
        ],
        "baseToken": {
          "address": "x",
          "name": "x",
          "symbol": "x"
        },
        "quoteToken": {
          "address": "x",
          "name": "x",
          "symbol": "x"
        },
        "priceNative": "x",
        "priceUsd": "x",
        "txns": {},
        "volume": {},
        "priceChange": {},
        "liquidity": {
          "base": 1,
          "quote": 1,
          "usd": 1
        },
        "fdv": 1,
        "marketCap": 1,
        "pairCreatedAt": 1,
        "info": {
          "imageUrl": "x",
          "socials": [
            {
              "handle": "x",
              "platform": "x"
            }
          ],
          "websites": [
            {
              "url": "x"
            }
          ]
        },
        "boosts": {
          "active": 1
        }
      }
    ],
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
