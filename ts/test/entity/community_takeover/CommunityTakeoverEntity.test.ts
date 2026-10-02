

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


describe('CommunityTakeoverEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DEXSCREENER_TEST_LIVE=TRUE.
  afterEach(liveDelay('DEXSCREENER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DexscreenerSDK.test()
    const ent = testsdk.CommunityTakeover()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DEXSCREENER_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'community_takeover.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"chainId":{"a":true,"h":"Chain Id","n":"chainId","r":false,"t":"`$STRING`","key$":"chainId","index$":0},"claimDate":{"a":true,"fo":"date-time","h":"Claim Date","n":"claimDate","r":false,"t":"`$STRING`","key$":"claimDate","index$":1},"description":{"a":true,"h":"Description","n":"description","r":false,"t":"`$STRING`","key$":"description","index$":2},"header":{"a":true,"fo":"uri","h":"Header","n":"header","r":false,"t":"`$STRING`","key$":"header","index$":3},"icon":{"a":true,"fo":"uri","h":"Icon","n":"icon","r":false,"t":"`$STRING`","key$":"icon","index$":4},"links":{"a":true,"h":"Links","n":"links","r":false,"t":"`$ARRAY`","key$":"links","index$":5},"tokenAddress":{"a":true,"h":"Token Address","n":"tokenAddress","r":false,"t":"`$STRING`","key$":"tokenAddress","index$":6},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":false,"t":"`$STRING`","key$":"url","index$":7}},"name":"community_takeover","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /community-takeovers/latest/v1","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/community-takeovers/latest/v1","q":{},"r":{},"s":[{"lit":"community-takeovers"},{"lit":"latest"},{"lit":"v1"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"community_takeover","name__orig":"community_takeover","Name":"CommunityTakeover","name_":"community_takeover","name-":"community-takeover","NAME":"COMMUNITY_TAKEOVER","index$":2}, {"active":true,"entity":"community_takeover","key$":"BasicCommunityTakeoverFlow","kind":"basic","name":"BasicCommunityTakeoverFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"community_takeover_ref01"}}]}]}, 'CommunityTakeover', {"GET /community-takeovers/latest/v1":{"protocol":"http","parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let community_takeover_ref01_data = Object.values(setup.data.existing.community_takeover)[0] as any

    // LIST
    const community_takeover_ref01_ent = client.CommunityTakeover()
    const community_takeover_ref01_match: any = {}

    const community_takeover_ref01_list = (await community_takeover_ref01_ent.list(community_takeover_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/community_takeover/CommunityTakeoverTestData.json')

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
    ['community_takeover01','community_takeover02','community_takeover03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DEXSCREENER_TEST_COMMUNITY_TAKEOVER_ENTID': idmap,
    'DEXSCREENER_TEST_LIVE': 'FALSE',
    'DEXSCREENER_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['DEXSCREENER_TEST_COMMUNITY_TAKEOVER_ENTID']

  const live = 'TRUE' === env.DEXSCREENER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DEXSCREENER_TEST_COMMUNITY_TAKEOVER_ENTID']
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
  
