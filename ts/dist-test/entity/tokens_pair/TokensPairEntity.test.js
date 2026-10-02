"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('TokensPairEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DEXSCREENER_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DEXSCREENER_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DexscreenerSDK.test();
        const ent = testsdk.TokensPair();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DEXSCREENER_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'tokens_pair.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "baseToken": { "a": true, "h": "Base Token", "n": "baseToken", "r": false, "t": "`$OBJECT`", "key$": "baseToken", "index$": 0 }, "boosts": { "a": true, "h": "Boosts", "n": "boosts", "r": false, "t": "`$OBJECT`", "key$": "boosts", "index$": 1 }, "chainId": { "a": true, "h": "Chain Id", "n": "chainId", "r": false, "t": "`$STRING`", "key$": "chainId", "index$": 2 }, "dexId": { "a": true, "h": "Dex Id", "n": "dexId", "r": false, "t": "`$STRING`", "key$": "dexId", "index$": 3 }, "fdv": { "a": true, "h": "Fdv", "n": "fdv", "r": false, "t": "`$NUMBER`", "key$": "fdv", "index$": 4 }, "info": { "a": true, "h": "Info", "n": "info", "r": false, "t": "`$OBJECT`", "key$": "info", "index$": 5 }, "labels": { "a": true, "h": "Labels", "n": "labels", "r": false, "t": "`$ARRAY`", "key$": "labels", "index$": 6 }, "liquidity": { "a": true, "h": "Liquidity", "n": "liquidity", "r": false, "t": "`$OBJECT`", "key$": "liquidity", "index$": 7 }, "marketCap": { "a": true, "h": "Market Cap", "n": "marketCap", "r": false, "t": "`$NUMBER`", "key$": "marketCap", "index$": 8 }, "pairAddress": { "a": true, "h": "Pair Address", "n": "pairAddress", "r": false, "t": "`$STRING`", "key$": "pairAddress", "index$": 9 }, "pairCreatedAt": { "a": true, "h": "Pair Created At", "n": "pairCreatedAt", "r": false, "t": "`$INTEGER`", "key$": "pairCreatedAt", "index$": 10 }, "priceChange": { "a": true, "h": "Price Change", "n": "priceChange", "r": false, "t": "`$OBJECT`", "key$": "priceChange", "index$": 11 }, "priceNative": { "a": true, "h": "Price Native", "n": "priceNative", "r": false, "t": "`$STRING`", "key$": "priceNative", "index$": 12 }, "priceUsd": { "a": true, "h": "Price Usd", "n": "priceUsd", "r": false, "t": "`$STRING`", "key$": "priceUsd", "index$": 13 }, "quoteToken": { "a": true, "h": "Quote Token", "n": "quoteToken", "r": false, "t": "`$OBJECT`", "key$": "quoteToken", "index$": 14 }, "txns": { "a": true, "h": "Txns", "n": "txns", "r": false, "t": "`$OBJECT`", "key$": "txns", "index$": 15 }, "url": { "a": true, "fo": "uri", "h": "Url", "n": "url", "r": false, "t": "`$STRING`", "key$": "url", "index$": 16 }, "volume": { "a": true, "h": "Volume", "n": "volume", "r": false, "t": "`$OBJECT`", "key$": "volume", "index$": 17 } }, "name": "tokens_pair", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /token-pairs/v1/{chainId}/{tokenAddress}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "solana", "k": "param", "n": "chain_id", "or": "chainId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN", "k": "param", "n": "token_address", "or": "tokenAddress", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/token-pairs/v1/{chainId}/{tokenAddress}", "q": { "exist": ["chain_id", "token_address"] }, "r": { "param": { "chainId": "chain_id", "tokenAddress": "token_address" } }, "s": [{ "lit": "token-pairs" }, { "lit": "v1" }, { "var": "chain_id" }, { "var": "token_address" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "tokens_pair", "name__orig": "tokens_pair", "Name": "TokensPair", "name_": "tokens_pair", "name-": "tokens-pair", "NAME": "TOKENS_PAIR", "index$": 8 }, { "active": true, "entity": "tokens_pair", "key$": "BasicTokensPairFlow", "kind": "basic", "name": "BasicTokensPairFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "chain_id": "chain01", "token_address": "token_address01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "tokens_pair_ref01" } }] }] }, 'TokensPair', { "GET /token-pairs/v1/{chainId}/{tokenAddress}": { "protocol": "http", "parameters": [{ "name": "chainId", "in": "path", "required": true, "schema": { "type": "string", "example": "solana" }, "index$": 0 }, { "name": "tokenAddress", "in": "path", "required": true, "schema": { "type": "string", "description": "A token addresses", "example": "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN" }, "index$": 1 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let tokens_pair_ref01_data = Object.values(setup.data.existing.tokens_pair)[0];
        // LIST
        const tokens_pair_ref01_ent = client.TokensPair();
        const tokens_pair_ref01_match = {};
        tokens_pair_ref01_match['chain_id'] = setup.idmap['chain01'];
        tokens_pair_ref01_match['token_address'] = setup.idmap['token_address01'];
        const tokens_pair_ref01_list = (await tokens_pair_ref01_ent.list(tokens_pair_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/tokens_pair/TokensPairTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DexscreenerSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['tokens_pair01', 'tokens_pair02', 'tokens_pair03', 'chain01', 'token_address01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DEXSCREENER_TEST_TOKENS_PAIR_ENTID': idmap,
        'DEXSCREENER_TEST_LIVE': 'FALSE',
        'DEXSCREENER_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['DEXSCREENER_TEST_TOKENS_PAIR_ENTID'];
    const live = 'TRUE' === env.DEXSCREENER_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DEXSCREENER_TEST_TOKENS_PAIR_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.DexscreenerSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.DEXSCREENER_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=TokensPairEntity.test.js.map