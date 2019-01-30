import '@/store/resolveTestConfiguration'
import flushPromises from 'flush-promises'
import authSelector from '@/store/middleware/auth/selector'

import {loginByEmailAndPassword} from './action'
import selector from './selector'
import {createStore} from '@/store/root'

test('ログインできる', async () => {
  const store = createStore()
  expect(selector.isFailed(store.state)).toBe(false)
  expect(selector.isSending(store.state)).toBe(false)
  store.dispatch(loginByEmailAndPassword({
    email: 'tanaka@gmail.com',
    password: 'tanakatarou',
  }))
  expect(selector.isSending(store.state)).toBe(true)
  expect(authSelector.user(store.state)).toBeUndefined()
  await flushPromises()
  expect(authSelector.user(store.state)).not.toBeUndefined()
  expect(selector.isFailed(store.state)).toBe(false)
})
