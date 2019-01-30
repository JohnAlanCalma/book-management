import '@/store/resolveTestConfiguration'
import {
  toggleDrawer,
  closeDrawer,
} from './action'
import selector from './selector'
import {createStore} from '@/store/root'

test('ナビゲーションバーの開閉操作に成功', async () => {
  const store = createStore()
  expect(selector.isOpen(store.state)).toBe(false)
  store.dispatch(closeDrawer())
  expect(selector.isOpen(store.state)).toBe(false)
  store.dispatch(toggleDrawer())
  expect(selector.isOpen(store.state)).toBe(true)
  store.dispatch(toggleDrawer())
  expect(selector.isOpen(store.state)).toBe(false)
  store.dispatch(toggleDrawer())
  expect(selector.isOpen(store.state)).toBe(true)
  store.dispatch(closeDrawer())
  expect(selector.isOpen(store.state)).toBe(false)
})
