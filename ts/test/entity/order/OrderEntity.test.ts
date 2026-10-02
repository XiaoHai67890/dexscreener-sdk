

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


describe('OrderEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DEXSCREENER_TEST_LIVE=TRUE.
  afterEach(liveDelay('DEXSCREENER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DexscreenerSDK.test()
    const ent = testsdk.Order()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DEXSCREENER_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'order.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"paymentTimestamp":{"a":true,"h":"Payment Timestamp","n":"paymentTimestamp","r":false,"t":"`$NUMBER`","key$":"paymentTimestamp","index$":0},"status":{"a":true,"h":"Status","n":"status","r":false,"t":"`$STRING`","key$":"status","index$":1},"type":{"a":true,"h":"Type","n":"type","r":false,"t":"`$STRING`","key$":"type","index$":2}},"name":"order","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /orders/v1/{chainId}/{tokenAddress}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"solana","k":"param","n":"chain_id","or":"chainId","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"A55XjvzRU4KtR3Lrys8PpLZQvPojPqvnv5bJVHMYy3Jv","k":"param","n":"token_address","or":"tokenAddress","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/orders/v1/{chainId}/{tokenAddress}","q":{"exist":["chain_id","token_address"]},"r":{"param":{"chainId":"chain_id","tokenAddress":"token_address"}},"s":[{"lit":"orders"},{"lit":"v1"},{"var":"chain_id"},{"var":"token_address"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"order","name__orig":"order","Name":"Order","name_":"order","name-":"order","NAME":"ORDER","index$":3}, {"active":true,"entity":"order","key$":"BasicOrderFlow","kind":"basic","name":"BasicOrderFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"chain_id":"chain01","token_address":"token_address01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"order_ref01"}}]}]}, 'Order', {"GET /orders/v1/{chainId}/{tokenAddress}":{"protocol":"http","parameters":[{"name":"chainId","in":"path","required":true,"schema":{"type":"string"},"example":"solana","index$":0},{"name":"tokenAddress","in":"path","required":true,"schema":{"type":"string"},"example":"A55XjvzRU4KtR3Lrys8PpLZQvPojPqvnv5bJVHMYy3Jv","index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let order_ref01_data = Object.values(setup.data.existing.order)[0] as any

    // LIST
    const order_ref01_ent = client.Order()
    const order_ref01_match: any = {}
    order_ref01_match['chain_id'] = setup.idmap['chain01']
    order_ref01_match['token_address'] = setup.idmap['token_address01']

    const order_ref01_list = (await order_ref01_ent.list(order_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/order/OrderTestData.json')

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
    ['order01','order02','order03','chain01','token_address01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DEXSCREENER_TEST_ORDER_ENTID': idmap,
    'DEXSCREENER_TEST_LIVE': 'FALSE',
    'DEXSCREENER_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['DEXSCREENER_TEST_ORDER_ENTID']

  const live = 'TRUE' === env.DEXSCREENER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DEXSCREENER_TEST_ORDER_ENTID']
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
  
