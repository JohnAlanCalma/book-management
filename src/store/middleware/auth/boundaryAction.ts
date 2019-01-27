import {actionCreator} from 'vuex-typescript-fsa'
import {
  USER_LOGIN,
  UNSUBSCRIBE_USER,
} from './types'

export const userLogin = actionCreator(USER_LOGIN)
export const unsubscribeUserData = actionCreator(UNSUBSCRIBE_USER)
