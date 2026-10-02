"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Dexscreener',
        slug: "dexscreener",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
    };
    options = {
        base: "https://api.dexscreener.com",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            ads: {},
            boost: {},
            community_takeover: {},
            order: {},
            pair: {},
            search: {},
            token: {},
            token_profile: {},
            tokens_pair: {},
        }
    };
    entity = {
        "ads": {
            "fields": [
                {
                    "name": "chainId",
                    "title": "Chain Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "date",
                    "title": "Date",
                    "type": "`$STRING`",
                    "format": "date-time"
                },
                {
                    "name": "durationHours",
                    "title": "Duration Hours",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "impressions",
                    "title": "Impressions",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "tokenAddress",
                    "title": "Token Address",
                    "type": "`$STRING`"
                },
                {
                    "name": "type",
                    "title": "Type",
                    "type": "`$STRING`"
                },
                {
                    "name": "url",
                    "title": "Url",
                    "type": "`$STRING`",
                    "format": "uri"
                }
            ],
            "name": "ads",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/ads/latest/v1",
                            "segments": [
                                {
                                    "lit": "ads"
                                },
                                {
                                    "lit": "latest"
                                },
                                {
                                    "lit": "v1"
                                }
                            ],
                            "parts": [
                                "ads",
                                "latest",
                                "v1"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "boost": {
            "fields": [
                {
                    "name": "label",
                    "title": "Label",
                    "type": "`$STRING`"
                },
                {
                    "name": "type",
                    "title": "Type",
                    "type": "`$STRING`"
                },
                {
                    "name": "url",
                    "title": "Url",
                    "type": "`$STRING`",
                    "format": "uri"
                }
            ],
            "name": "boost",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/token-boosts/latest/v1",
                            "segments": [
                                {
                                    "lit": "token-boosts"
                                },
                                {
                                    "lit": "latest"
                                },
                                {
                                    "lit": "v1"
                                }
                            ],
                            "parts": [
                                "token-boosts",
                                "latest",
                                "v1"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.links`"
                            },
                            "args": {},
                            "select": {}
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/token-boosts/top/v1",
                            "segments": [
                                {
                                    "lit": "token-boosts"
                                },
                                {
                                    "lit": "top"
                                },
                                {
                                    "lit": "v1"
                                }
                            ],
                            "parts": [
                                "token-boosts",
                                "top",
                                "v1"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.links`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "community_takeover": {
            "fields": [
                {
                    "name": "chainId",
                    "title": "Chain Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "claimDate",
                    "title": "Claim Date",
                    "type": "`$STRING`",
                    "format": "date-time"
                },
                {
                    "name": "description",
                    "title": "Description",
                    "type": "`$STRING`"
                },
                {
                    "name": "header",
                    "title": "Header",
                    "type": "`$STRING`",
                    "format": "uri"
                },
                {
                    "name": "icon",
                    "title": "Icon",
                    "type": "`$STRING`",
                    "format": "uri"
                },
                {
                    "name": "links",
                    "title": "Links",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "tokenAddress",
                    "title": "Token Address",
                    "type": "`$STRING`"
                },
                {
                    "name": "url",
                    "title": "Url",
                    "type": "`$STRING`",
                    "format": "uri"
                }
            ],
            "name": "community_takeover",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/community-takeovers/latest/v1",
                            "segments": [
                                {
                                    "lit": "community-takeovers"
                                },
                                {
                                    "lit": "latest"
                                },
                                {
                                    "lit": "v1"
                                }
                            ],
                            "parts": [
                                "community-takeovers",
                                "latest",
                                "v1"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "order": {
            "fields": [
                {
                    "name": "paymentTimestamp",
                    "title": "Payment Timestamp",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`"
                },
                {
                    "name": "type",
                    "title": "Type",
                    "type": "`$STRING`"
                }
            ],
            "name": "order",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/orders/v1/{chainId}/{tokenAddress}",
                            "segments": [
                                {
                                    "lit": "orders"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "var": "chain_id"
                                },
                                {
                                    "var": "token_address"
                                }
                            ],
                            "parts": [
                                "orders",
                                "v1",
                                "{chain_id}",
                                "{token_address}"
                            ],
                            "rename": {
                                "param": {
                                    "chainId": "chain_id",
                                    "tokenAddress": "token_address"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "chain_id",
                                        "orig": "chainId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "solana"
                                    },
                                    {
                                        "name": "token_address",
                                        "orig": "tokenAddress",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "A55XjvzRU4KtR3Lrys8PpLZQvPojPqvnv5bJVHMYy3Jv"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "chain_id",
                                    "token_address"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "pair": {
            "fields": [
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "pairs",
                    "title": "Pairs",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "schemaVersion",
                    "title": "Schema Version",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id",
                "parts": [
                    "chain_id",
                    "pair_id"
                ],
                "sep": "/"
            },
            "name": "pair",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/latest/dex/pairs/{chainId}/{pairId}",
                            "segments": [
                                {
                                    "lit": "latest"
                                },
                                {
                                    "lit": "dex"
                                },
                                {
                                    "lit": "pairs"
                                },
                                {
                                    "var": "chain_id"
                                },
                                {
                                    "var": "pair_id"
                                }
                            ],
                            "parts": [
                                "latest",
                                "dex",
                                "pairs",
                                "{chain_id}",
                                "{pair_id}"
                            ],
                            "rename": {
                                "param": {
                                    "chainId": "chain_id",
                                    "pairId": "pair_id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "chain_id",
                                        "orig": "chainId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "solana"
                                    },
                                    {
                                        "name": "pair_id",
                                        "orig": "pairId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "chain_id",
                                    "pair_id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "search": {
            "fields": [
                {
                    "name": "baseToken",
                    "title": "Base Token",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "boosts",
                    "title": "Boosts",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "chainId",
                    "title": "Chain Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "dexId",
                    "title": "Dex Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "fdv",
                    "title": "Fdv",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "info",
                    "title": "Info",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "labels",
                    "title": "Labels",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "liquidity",
                    "title": "Liquidity",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "marketCap",
                    "title": "Market Cap",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "pairAddress",
                    "title": "Pair Address",
                    "type": "`$STRING`"
                },
                {
                    "name": "pairCreatedAt",
                    "title": "Pair Created At",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "priceChange",
                    "title": "Price Change",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "priceNative",
                    "title": "Price Native",
                    "type": "`$STRING`"
                },
                {
                    "name": "priceUsd",
                    "title": "Price Usd",
                    "type": "`$STRING`"
                },
                {
                    "name": "quoteToken",
                    "title": "Quote Token",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "txns",
                    "title": "Txns",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "url",
                    "title": "Url",
                    "type": "`$STRING`",
                    "format": "uri"
                },
                {
                    "name": "volume",
                    "title": "Volume",
                    "type": "`$OBJECT`"
                }
            ],
            "name": "search",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/latest/dex/search",
                            "segments": [
                                {
                                    "lit": "latest"
                                },
                                {
                                    "lit": "dex"
                                },
                                {
                                    "lit": "search"
                                }
                            ],
                            "parts": [
                                "latest",
                                "dex",
                                "search"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.pairs`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "q",
                                        "orig": "q",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "reqd": true,
                                        "example": "SOL/USDC"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "q"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "token": {
            "fields": [
                {
                    "name": "baseToken",
                    "title": "Base Token",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "boosts",
                    "title": "Boosts",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "chainId",
                    "title": "Chain Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "dexId",
                    "title": "Dex Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "fdv",
                    "title": "Fdv",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "info",
                    "title": "Info",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "labels",
                    "title": "Labels",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "liquidity",
                    "title": "Liquidity",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "marketCap",
                    "title": "Market Cap",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "pairAddress",
                    "title": "Pair Address",
                    "type": "`$STRING`"
                },
                {
                    "name": "pairCreatedAt",
                    "title": "Pair Created At",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "priceChange",
                    "title": "Price Change",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "priceNative",
                    "title": "Price Native",
                    "type": "`$STRING`"
                },
                {
                    "name": "priceUsd",
                    "title": "Price Usd",
                    "type": "`$STRING`"
                },
                {
                    "name": "quoteToken",
                    "title": "Quote Token",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "txns",
                    "title": "Txns",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "url",
                    "title": "Url",
                    "type": "`$STRING`",
                    "format": "uri"
                },
                {
                    "name": "volume",
                    "title": "Volume",
                    "type": "`$OBJECT`"
                }
            ],
            "name": "token",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/tokens/v1/{chainId}/{tokenAddresses}",
                            "segments": [
                                {
                                    "lit": "tokens"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "var": "chain_id"
                                },
                                {
                                    "var": "token_address"
                                }
                            ],
                            "parts": [
                                "tokens",
                                "v1",
                                "{chain_id}",
                                "{token_address}"
                            ],
                            "rename": {
                                "param": {
                                    "chainId": "chain_id",
                                    "tokenAddresses": "token_address"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "chain_id",
                                        "orig": "chainId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "solana"
                                    },
                                    {
                                        "name": "token_address",
                                        "orig": "tokenAddresses",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "So11111111111111111111111111111111111111112,EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "chain_id",
                                    "token_address"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "token_profile": {
            "fields": [
                {
                    "name": "label",
                    "title": "Label",
                    "type": "`$STRING`"
                },
                {
                    "name": "type",
                    "title": "Type",
                    "type": "`$STRING`"
                },
                {
                    "name": "url",
                    "title": "Url",
                    "type": "`$STRING`",
                    "format": "uri"
                }
            ],
            "name": "token_profile",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/token-profiles/latest/v1",
                            "segments": [
                                {
                                    "lit": "token-profiles"
                                },
                                {
                                    "lit": "latest"
                                },
                                {
                                    "lit": "v1"
                                }
                            ],
                            "parts": [
                                "token-profiles",
                                "latest",
                                "v1"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.links`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "tokens_pair": {
            "fields": [
                {
                    "name": "baseToken",
                    "title": "Base Token",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "boosts",
                    "title": "Boosts",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "chainId",
                    "title": "Chain Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "dexId",
                    "title": "Dex Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "fdv",
                    "title": "Fdv",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "info",
                    "title": "Info",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "labels",
                    "title": "Labels",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "liquidity",
                    "title": "Liquidity",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "marketCap",
                    "title": "Market Cap",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "pairAddress",
                    "title": "Pair Address",
                    "type": "`$STRING`"
                },
                {
                    "name": "pairCreatedAt",
                    "title": "Pair Created At",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "priceChange",
                    "title": "Price Change",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "priceNative",
                    "title": "Price Native",
                    "type": "`$STRING`"
                },
                {
                    "name": "priceUsd",
                    "title": "Price Usd",
                    "type": "`$STRING`"
                },
                {
                    "name": "quoteToken",
                    "title": "Quote Token",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "txns",
                    "title": "Txns",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "url",
                    "title": "Url",
                    "type": "`$STRING`",
                    "format": "uri"
                },
                {
                    "name": "volume",
                    "title": "Volume",
                    "type": "`$OBJECT`"
                }
            ],
            "name": "tokens_pair",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/token-pairs/v1/{chainId}/{tokenAddress}",
                            "segments": [
                                {
                                    "lit": "token-pairs"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "var": "chain_id"
                                },
                                {
                                    "var": "token_address"
                                }
                            ],
                            "parts": [
                                "token-pairs",
                                "v1",
                                "{chain_id}",
                                "{token_address}"
                            ],
                            "rename": {
                                "param": {
                                    "chainId": "chain_id",
                                    "tokenAddress": "token_address"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "chain_id",
                                        "orig": "chainId",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "solana"
                                    },
                                    {
                                        "name": "token_address",
                                        "orig": "tokenAddress",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "chain_id",
                                    "token_address"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map