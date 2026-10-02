

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


describe('AdsEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DEXSCREENER_TEST_LIVE=TRUE.
  afterEach(liveDelay('DEXSCREENER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DexscreenerSDK.test()
    const ent = testsdk.Ads()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DEXSCREENER_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'ads.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"chainId":{"a":true,"h":"Chain Id","n":"chainId","r":false,"t":"`$STRING`","key$":"chainId","index$":0},"date":{"a":true,"fo":"date-time","h":"Date","n":"date","r":false,"t":"`$STRING`","key$":"date","index$":1},"durationHours":{"a":true,"h":"Duration Hours","n":"durationHours","r":false,"t":"`$NUMBER`","key$":"durationHours","index$":2},"impressions":{"a":true,"h":"Impressions","n":"impressions","r":false,"t":"`$NUMBER`","key$":"impressions","index$":3},"tokenAddress":{"a":true,"h":"Token Address","n":"tokenAddress","r":false,"t":"`$STRING`","key$":"tokenAddress","index$":4},"type":{"a":true,"h":"Type","n":"type","r":false,"t":"`$STRING`","key$":"type","index$":5},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":false,"t":"`$STRING`","key$":"url","index$":6}},"name":"ads","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /ads/latest/v1","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/ads/latest/v1","q":{},"r":{},"s":[{"lit":"ads"},{"lit":"latest"},{"lit":"v1"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"ads","name__orig":"ads","Name":"Ads","name_":"ads","name-":"ads","NAME":"ADS","index$":0}, {"active":true,"entity":"ads","key$":"BasicAdsFlow","kind":"basic","name":"BasicAdsFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"ads_ref01"}}]}]}, 'Ads', {"GET /ads/latest/v1":{"protocol":"http","parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let ads_ref01_data = Object.values(setup.data.existing.ads)[0] as any

    // LIST
    const ads_ref01_ent = client.Ads()
    const ads_ref01_match: any = {}

    const ads_ref01_list = (await ads_ref01_ent.list(ads_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/ads/AdsTestData.json')

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
    ['ads01','ads02','ads03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DEXSCREENER_TEST_ADS_ENTID': idmap,
    'DEXSCREENER_TEST_LIVE': 'FALSE',
    'DEXSCREENER_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['DEXSCREENER_TEST_ADS_ENTID']

  const live = 'TRUE' === env.DEXSCREENER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DEXSCREENER_TEST_ADS_ENTID']
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
  
