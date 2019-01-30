import '@/store/resolveTestConfiguration'
import flushPromises from 'flush-promises'

import {userLogin} from './action'
import getters from './getters'
import store from '@/store/root'

test('ユーザーログインできる', async () => {
  expect(getters.user()).toBeUndefined()
  expect(getters.isInitialized()).toBe(false)
  expect(getters.isLoggedIn()).toBe(false)
  store.dispatch(userLogin())
  await flushPromises()
  expect(getters.user()).not.toBeUndefined()
  expect(getters.isInitialized()).toBe(true)
  expect(getters.isLoggedIn()).toBe(true)
})
