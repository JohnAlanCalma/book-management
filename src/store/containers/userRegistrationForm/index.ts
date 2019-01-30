import {
  combineMutation,
  mutation,
  combineAction,
  actionsToMutations,
  action,
  actionCreatorFactory,
} from 'typescript-fsa-vuex'
import AuthApplicationService from '@/serviceLocator/AuthApplicationService'
import {successUserLogin} from '@/store/middleware/auth/action'
import {
  userRegistration,
  toStandby,
} from './action'
import router from '@/router'
import namespace from './namespace'

const actionCreator = actionCreatorFactory(namespace)
const startRegistration = actionCreator('START_REGISTRATION')
// https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createUserWithEmailAndPassword
type ErrorCode =
  'auth/email-already-in-use' | 'auth/invalid-email' |
  'auth/operation-not-allowed' | 'auth/weak-password'

const failureRegistration = actionCreator<{readonly code: ErrorCode}>('FAILURE_REGISTRATION')

export enum ScreenState {
  STANDBY,
  SENDING,
  SEND_FAILED,
}

type State = {
  screenState: ScreenState,
  errorCode: ErrorCode|'',
}

const initialState = (): State => ({
  screenState: ScreenState.STANDBY,
  errorCode: '',
})

const mutations = combineMutation<State>(
  mutation(startRegistration, (state) => {
    state.screenState = ScreenState.SENDING
  }),
  mutation(toStandby, (state) => {
    state.screenState = ScreenState.STANDBY
  }),
  mutation(failureRegistration, (state, action) => {
    state.errorCode = action.payload.code
    state.screenState = ScreenState.SEND_FAILED
  }),
)

const actions = combineAction<State, never>(
  actionsToMutations(toStandby),
  action(userRegistration, async ({commit}, action) => {
    commit(startRegistration())
    try {
      const authInfo = await AuthApplicationService.getInstance().registration(action.payload)
      commit(successUserLogin({authInfo}))
      router.push('/')
    } catch (e) {
      commit(failureRegistration(e))
    }
  }),
)

export default {
  state: initialState,
  mutations,
  actions,
}
