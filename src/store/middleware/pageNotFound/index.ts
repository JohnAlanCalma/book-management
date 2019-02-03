import {
  actionsToMutations,
  combineMutation,
  mutation,
} from 'typescript-fsa-vuex'
import {
  pageNotFound,
} from './action'

export function pageNotFoundModuleCreator() {
  type State = {
    isPageNotFound: boolean,
  }

  const initialState = (): State => ({
    isPageNotFound: false,
  })

  const mutations = combineMutation<State>(
    mutation(pageNotFound, (state) => {
      state.isPageNotFound = true
    }),
  )

  const actions = actionsToMutations(pageNotFound)

  return {
    state: initialState,
    mutations,
    actions,
  }
}
