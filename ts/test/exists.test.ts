
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { DexscreenerSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = DexscreenerSDK.test()
    equal(testsdk instanceof DexscreenerSDK, true,
      'DexscreenerSDK.test() must return a client synchronously')
  })

})
