import {actionCreatorFactory} from 'typescript-fsa-vuex'

const actionCreator = actionCreatorFactory('containers/navigation')

// boundary action
export const toggleDrawer = actionCreator('TOGGLE_DRAWER')
export const closeDrawer = actionCreator('CLOSE_DRAWER')
