

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { DexscreenerSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('PairEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DEXSCREENER_TEST_LIVE=TRUE.
  afterEach(liveDelay('DEXSCREENER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DexscreenerSDK.test()
    const ent = testsdk.Pair()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DEXSCREENER_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'pair.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0},"pairs":{"a":true,"h":"Pairs","n":"pairs","r":false,"t":"`$ARRAY`","key$":"pairs","index$":1},"schemaVersion":{"a":true,"h":"Schema Version","n":"schemaVersion","r":false,"t":"`$STRING`","key$":"schemaVersion","index$":2}},"id":{"field":"id","name":"id","parts":["chain_id","pair_id"],"sep":"/"},"name":"pair","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /latest/dex/pairs/{chainId}/{pairId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"solana","k":"param","n":"chain_id","or":"chainId","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN","k":"param","n":"pair_id","or":"pairId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/latest/dex/pairs/{chainId}/{pairId}","q":{"exist":["chain_id","pair_id"]},"r":{"param":{"chainId":"chain_id","pairId":"pair_id"}},"s":[{"lit":"latest"},{"lit":"dex"},{"lit":"pairs"},{"var":"chain_id"},{"var":"pair_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"pair","name__orig":"pair","Name":"Pair","name_":"pair","name-":"pair","NAME":"PAIR","index$":4}, {"active":true,"entity":"pair","key$":"BasicPairFlow","kind":"basic","name":"BasicPairFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"pair_ref01","srcdatavar":"pair_ref01_data","suffix":"_dt0"},"m":{"chain_id":"chain01","id":"pair01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-pair_ref01"}}]}]}, 'Pair', {"GET /latest/dex/pairs/{chainId}/{pairId}":{"protocol":"http","parameters":[{"name":"chainId","in":"path","required":true,"schema":{"type":"string"},"example":"solana","index$":0},{"name":"pairId","in":"path","required":true,"schema":{"type":"string"},"example":"JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN","index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let pair_ref01_data = Object.values(setup.data.existing.pair)[0] as any

    // LOAD
    const pair_ref01_ent = client.Pair()
    const pair_ref01_match_dt0: any = {}
    pair_ref01_match_dt0.id = pair_ref01_data.id
    const pair_ref01_data_dt0 = (await pair_ref01_ent.load(pair_ref01_match_dt0)).data()
    assert(pair_ref01_data_dt0.id === pair_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/pair/PairTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = DexscreenerSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['pair01','pair02','pair03','chain01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DEXSCREENER_TEST_PAIR_ENTID': idmap,
    'DEXSCREENER_TEST_LIVE': 'FALSE',
    'DEXSCREENER_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['DEXSCREENER_TEST_PAIR_ENTID']

  const live = 'TRUE' === env.DEXSCREENER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DEXSCREENER_TEST_PAIR_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new DexscreenerSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
