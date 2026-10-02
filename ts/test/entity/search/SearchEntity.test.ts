

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


describe('SearchEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DEXSCREENER_TEST_LIVE=TRUE.
  afterEach(liveDelay('DEXSCREENER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DexscreenerSDK.test()
    const ent = testsdk.Search()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DEXSCREENER_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'search.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"baseToken":{"a":true,"h":"Base Token","n":"baseToken","r":false,"t":"`$OBJECT`","key$":"baseToken","index$":0},"boosts":{"a":true,"h":"Boosts","n":"boosts","r":false,"t":"`$OBJECT`","key$":"boosts","index$":1},"chainId":{"a":true,"h":"Chain Id","n":"chainId","r":false,"t":"`$STRING`","key$":"chainId","index$":2},"dexId":{"a":true,"h":"Dex Id","n":"dexId","r":false,"t":"`$STRING`","key$":"dexId","index$":3},"fdv":{"a":true,"h":"Fdv","n":"fdv","r":false,"t":"`$NUMBER`","key$":"fdv","index$":4},"info":{"a":true,"h":"Info","n":"info","r":false,"t":"`$OBJECT`","key$":"info","index$":5},"labels":{"a":true,"h":"Labels","n":"labels","r":false,"t":"`$ARRAY`","key$":"labels","index$":6},"liquidity":{"a":true,"h":"Liquidity","n":"liquidity","r":false,"t":"`$OBJECT`","key$":"liquidity","index$":7},"marketCap":{"a":true,"h":"Market Cap","n":"marketCap","r":false,"t":"`$NUMBER`","key$":"marketCap","index$":8},"pairAddress":{"a":true,"h":"Pair Address","n":"pairAddress","r":false,"t":"`$STRING`","key$":"pairAddress","index$":9},"pairCreatedAt":{"a":true,"h":"Pair Created At","n":"pairCreatedAt","r":false,"t":"`$INTEGER`","key$":"pairCreatedAt","index$":10},"priceChange":{"a":true,"h":"Price Change","n":"priceChange","r":false,"t":"`$OBJECT`","key$":"priceChange","index$":11},"priceNative":{"a":true,"h":"Price Native","n":"priceNative","r":false,"t":"`$STRING`","key$":"priceNative","index$":12},"priceUsd":{"a":true,"h":"Price Usd","n":"priceUsd","r":false,"t":"`$STRING`","key$":"priceUsd","index$":13},"quoteToken":{"a":true,"h":"Quote Token","n":"quoteToken","r":false,"t":"`$OBJECT`","key$":"quoteToken","index$":14},"txns":{"a":true,"h":"Txns","n":"txns","r":false,"t":"`$OBJECT`","key$":"txns","index$":15},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":false,"t":"`$STRING`","key$":"url","index$":16},"volume":{"a":true,"h":"Volume","n":"volume","r":false,"t":"`$OBJECT`","key$":"volume","index$":17}},"name":"search","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /latest/dex/search","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"SOL/USDC","k":"query","n":"q","or":"q","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/latest/dex/search","q":{"exist":["q"]},"r":{},"s":[{"lit":"latest"},{"lit":"dex"},{"lit":"search"}],"t":{"req":"`reqdata`","res":"`body.pairs`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"search","name__orig":"search","Name":"Search","name_":"search","name-":"search","NAME":"SEARCH","index$":5}, {"active":true,"entity":"search","key$":"BasicSearchFlow","kind":"basic","name":"BasicSearchFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"search_ref01"}}]}]}, 'Search', {"GET /latest/dex/search":{"protocol":"http","parameters":[{"name":"q","in":"query","required":true,"schema":{"type":"string"},"example":"SOL/USDC","index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let search_ref01_data = Object.values(setup.data.existing.search)[0] as any

    // LIST
    const search_ref01_ent = client.Search()
    const search_ref01_match: any = {}

    const search_ref01_list = (await search_ref01_ent.list(search_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/search/SearchTestData.json')

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
    ['search01','search02','search03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DEXSCREENER_TEST_SEARCH_ENTID': idmap,
    'DEXSCREENER_TEST_LIVE': 'FALSE',
    'DEXSCREENER_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['DEXSCREENER_TEST_SEARCH_ENTID']

  const live = 'TRUE' === env.DEXSCREENER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DEXSCREENER_TEST_SEARCH_ENTID']
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
  
