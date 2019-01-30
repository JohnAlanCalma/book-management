import {combineMutation, mutation, actionsToMutations} from 'typescript-fsa-vuex'
import {
  toggleDrawer,
  closeDrawer,
} from './action'

type State = {
  isOpen: boolean,
}

const initialState = (): State => ({
  isOpen: false,
})

const mutations = combineMutation<State>(
  mutation(toggleDrawer, (state) => {
    state.isOpen = !state.isOpen
  }),
  mutation(closeDrawer, (state: State) => {
    state.isOpen = false
  }),
)

const actions = actionsToMutations(
  toggleDrawer,
  closeDrawer,
)

export default {
  state: initialState,
  mutations,
  actions,
}
