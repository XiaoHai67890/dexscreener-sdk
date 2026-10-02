

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


describe('TokenProfileEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DEXSCREENER_TEST_LIVE=TRUE.
  afterEach(liveDelay('DEXSCREENER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DexscreenerSDK.test()
    const ent = testsdk.TokenProfile()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DEXSCREENER_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'token_profile.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"label":{"a":true,"h":"Label","n":"label","r":false,"t":"`$STRING`","key$":"label","index$":0},"type":{"a":true,"h":"Type","n":"type","r":false,"t":"`$STRING`","key$":"type","index$":1},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":false,"t":"`$STRING`","key$":"url","index$":2}},"name":"token_profile","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /token-profiles/latest/v1","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/token-profiles/latest/v1","q":{},"r":{},"s":[{"lit":"token-profiles"},{"lit":"latest"},{"lit":"v1"}],"t":{"req":"`reqdata`","res":"`body.links`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"token_profile","name__orig":"token_profile","Name":"TokenProfile","name_":"token_profile","name-":"token-profile","NAME":"TOKEN_PROFILE","index$":7}, {"active":true,"entity":"token_profile","key$":"BasicTokenProfileFlow","kind":"basic","name":"BasicTokenProfileFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"token_profile_ref01"}}]}]}, 'TokenProfile', {"GET /token-profiles/latest/v1":{"protocol":"http","parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let token_profile_ref01_data = Object.values(setup.data.existing.token_profile)[0] as any

    // LIST
    const token_profile_ref01_ent = client.TokenProfile()
    const token_profile_ref01_match: any = {}

    const token_profile_ref01_list = (await token_profile_ref01_ent.list(token_profile_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/token_profile/TokenProfileTestData.json')

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
    ['token_profile01','token_profile02','token_profile03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DEXSCREENER_TEST_TOKEN_PROFILE_ENTID': idmap,
    'DEXSCREENER_TEST_LIVE': 'FALSE',
    'DEXSCREENER_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['DEXSCREENER_TEST_TOKEN_PROFILE_ENTID']

  const live = 'TRUE' === env.DEXSCREENER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DEXSCREENER_TEST_TOKEN_PROFILE_ENTID']
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
  
