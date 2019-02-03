import { IBookApplicationService } from '@/boundary/bookApplicationService/IBookApplicationService'
import { Logger } from '@/serviceLocator/Logger'
import { inject, injectable } from 'inversify'
import {
  action,
  actionsToMutations,
  combineAction,
  combineMutation,
  mutation,
} from 'typescript-fsa-vuex'
import {
  actionCreator,
  closeDialog,
  createBook,
  openDialog,
  toStandby,
} from './action'

const startCreate = actionCreator('START_UPDATE')
const successCreate = actionCreator('SUCCESS_UPDATE')
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

@injectable()
export class CreateBookFormModule {
  constructor(
    @inject(IBookApplicationService)
    private readonly bookApp: IBookApplicationService,
  ) {}

  public state() {
    return initialState()
  }

  get mutations() {
    return combineMutation<State>(
      mutation(startCreate, (state) => {
        state.screenState = ScreenState.SENDING
      }),
      mutation(successCreate, (state) => {
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
  }

  get actions() {
    return combineAction<State, any>(
      action(createBook, async ({commit}, action) => {
        commit(startCreate())

        try {
          await this.bookApp.create(action.payload.params)
          Logger.getInstance().info('本の作成に成功')
          commit(successCreate())
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
  }
}
