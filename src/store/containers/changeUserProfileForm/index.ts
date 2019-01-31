import Logger from '@/serviceLocator/Logger'
import UserApp from '@/serviceLocator/UserApplicationService'
import { updatedUserProfileEvent } from '@/store/eventHub/eventCreators'
import {
  action,
  actionCreatorFactory,
  actionsToMutations,
  combineAction,
  combineMutation,
  mutation,
} from 'typescript-fsa-vuex'
import {
  closeDialog,
  openDialog,
  toStandby,
  updateProfile,
} from './action'
import namespace from './namespace'

const actionCreator = actionCreatorFactory(namespace)
const startUpdate = actionCreator('START_UPDATE')
const successUpdate = actionCreator('SUCCESS_UPDATE')
const failureSend = actionCreator('FAILURE_SEND')

export enum ScreenState {
  STANDBY,
  SENDING,
  SEND_FAILED,
  SEND_SUCCESS,
}

type State = {
  isOpen: boolean,
  screenState: ScreenState,
}

const initialState = (): State => ({
  isOpen: false,
  screenState: ScreenState.STANDBY,
})

const mutations = combineMutation<State>(
  mutation(startUpdate, (state) => {
    state.screenState = ScreenState.SENDING
  }),
  mutation(successUpdate, (state) => {
    state.screenState = ScreenState.SEND_SUCCESS
  }),
  mutation(failureSend, (state) => {
    state.screenState = ScreenState.SEND_FAILED
  }),
  mutation(openDialog, (state) => {
    state.isOpen = true
  }),
  mutation(closeDialog, (state) => {
    state.isOpen = false
  }),
  mutation(toStandby, (state) => {
    state.screenState = ScreenState.STANDBY
  }),
)

const actions = combineAction<State, any>(
  action(updateProfile, async ({commit}, action) => {
    commit(startUpdate())

    try {
      const user = await UserApp.getInstance().update(action.payload.user)
      Logger.getInstance().info('ユーザー情報の更新に成功', user)
      commit(successUpdate())
      commit(updatedUserProfileEvent({user}))
    } catch (e) {
      Logger.getInstance().error(e)
      commit(failureSend())
    }
  }),
  actionsToMutations(
    openDialog,
    closeDialog,
    toStandby,
  ),
)

export default {
  state: initialState,
  mutations,
  actions,
}
