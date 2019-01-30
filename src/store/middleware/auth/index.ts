import {
  combineMutation,
  mutation,
  combineAction,
  actionsToMutations,
  action,
  actionCreatorFactory,
} from 'typescript-fsa-vuex'
import {IUser} from '@/boundary/userApplicationService/InOutType'
import AuthApplicationService from '@/serviceLocator/AuthApplicationService'
import {
  userLogin,
  unsubscribeUserData,
} from './action'
import Logger from '@/serviceLocator/Logger'
import {updatedUserProfileEvent} from '@/store/eventHub/eventCreators'
import UserStream from '@/serviceLocator/UserStream'
import {IAuthInfo} from '@/boundary/authApplicationService/InOutType'
import namespace from './namespace'

const actionCreator = actionCreatorFactory(namespace)
const successUserLogin = actionCreator<{authInfo: IAuthInfo, unsubscribe: unsubscribe}>('SUCCESS_USER_LOGIN')
const failureLogin = actionCreator('FAILURE_LOGIN')
const receiveUserFromStream = actionCreator<{user: IUser}>('RECEIVE_USER_FROM_STREAM')

type State = {
  isInitialized: boolean,
  isLoggedIn: boolean,
  isEmailVerified: boolean,
  user?: IUser,
  unsubscribe: unsubscribe[],
}

const initialState = (): State => ({
  isInitialized: false,
  isLoggedIn: false,
  isEmailVerified: false,
  user: undefined,
  unsubscribe: [],
})

const mutations = combineMutation<State>(
  mutation(updatedUserProfileEvent, (state, action) => {
    state.user = action.payload.user
  }),
  mutation(successUserLogin, (state, action) => {
    state.isInitialized = true
    state.isLoggedIn = true
    const {authInfo} = action.payload
    state.isEmailVerified = authInfo.isEmailVerified
    delete authInfo.isEmailVerified
    state.user = authInfo
    state.unsubscribe.push(action.payload.unsubscribe)
  }),
  mutation(failureLogin, (state) => {
    state.isInitialized = true
    state.isLoggedIn = false
    state.user = initialState().user
  }),
  mutation(unsubscribeUserData, (state) => {
    state.unsubscribe.map((unsubscribe) => unsubscribe())
  }),
  mutation(receiveUserFromStream, (state, action) => {
    state.user = action.payload.user
  }),
)

const actions = combineAction<State, never>(
  actionsToMutations(updatedUserProfileEvent),
  action(userLogin, async ({commit}) => {
    try {
      const authInfo = await AuthApplicationService.getInstance().login()
      const unsubscribe = UserStream.getInstance().subscribe({
        payload: { userId: authInfo.id },
        subscriber: (user) => commit(receiveUserFromStream({user})),
      })
      commit(successUserLogin({authInfo, unsubscribe}))
      Logger.getInstance().info('ログイン成功', authInfo)
    } catch (e) {
      Logger.getInstance().info('ログイン失敗', e)
      commit(failureLogin())
    }
  }),
)

export default {
  state: initialState,
  mutations,
  actions,
}
