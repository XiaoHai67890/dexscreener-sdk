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
(0, node_test_1.describe)('CommunityTakeoverEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DEXSCREENER_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DEXSCREENER_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DexscreenerSDK.test();
        const ent = testsdk.CommunityTakeover();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DEXSCREENER_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'community_takeover.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "chainId": { "a": true, "h": "Chain Id", "n": "chainId", "r": false, "t": "`$STRING`", "key$": "chainId", "index$": 0 }, "claimDate": { "a": true, "fo": "date-time", "h": "Claim Date", "n": "claimDate", "r": false, "t": "`$STRING`", "key$": "claimDate", "index$": 1 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "t": "`$STRING`", "key$": "description", "index$": 2 }, "header": { "a": true, "fo": "uri", "h": "Header", "n": "header", "r": false, "t": "`$STRING`", "key$": "header", "index$": 3 }, "icon": { "a": true, "fo": "uri", "h": "Icon", "n": "icon", "r": false, "t": "`$STRING`", "key$": "icon", "index$": 4 }, "links": { "a": true, "h": "Links", "n": "links", "r": false, "t": "`$ARRAY`", "key$": "links", "index$": 5 }, "tokenAddress": { "a": true, "h": "Token Address", "n": "tokenAddress", "r": false, "t": "`$STRING`", "key$": "tokenAddress", "index$": 6 }, "url": { "a": true, "fo": "uri", "h": "Url", "n": "url", "r": false, "t": "`$STRING`", "key$": "url", "index$": 7 } }, "name": "community_takeover", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /community-takeovers/latest/v1", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/community-takeovers/latest/v1", "q": {}, "r": {}, "s": [{ "lit": "community-takeovers" }, { "lit": "latest" }, { "lit": "v1" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "community_takeover", "name__orig": "community_takeover", "Name": "CommunityTakeover", "name_": "community_takeover", "name-": "community-takeover", "NAME": "COMMUNITY_TAKEOVER", "index$": 2 }, { "active": true, "entity": "community_takeover", "key$": "BasicCommunityTakeoverFlow", "kind": "basic", "name": "BasicCommunityTakeoverFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "community_takeover_ref01" } }] }] }, 'CommunityTakeover', { "GET /community-takeovers/latest/v1": { "protocol": "http", "parameters": [] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let community_takeover_ref01_data = Object.values(setup.data.existing.community_takeover)[0];
        // LIST
        const community_takeover_ref01_ent = client.CommunityTakeover();
        const community_takeover_ref01_match = {};
        const community_takeover_ref01_list = (await community_takeover_ref01_ent.list(community_takeover_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/community_takeover/CommunityTakeoverTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DexscreenerSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['community_takeover01', 'community_takeover02', 'community_takeover03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DEXSCREENER_TEST_COMMUNITY_TAKEOVER_ENTID': idmap,
        'DEXSCREENER_TEST_LIVE': 'FALSE',
        'DEXSCREENER_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['DEXSCREENER_TEST_COMMUNITY_TAKEOVER_ENTID'];
    const live = 'TRUE' === env.DEXSCREENER_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DEXSCREENER_TEST_COMMUNITY_TAKEOVER_ENTID'];
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
//# sourceMappingURL=CommunityTakeoverEntity.test.js.map