import { IAuthInfo } from '@/boundary/authApplicationService/InOutType'
import { actionCreatorFactory } from 'typescript-fsa-vuex'

export const actionCreator = actionCreatorFactory('middleware/auth')

export const userLogin = actionCreator('USER_LOGIN')
export const deposeUser = actionCreator('DEPOSE_USER')
export const successUserLogin = actionCreator<{authInfo: IAuthInfo}>('SUCCESS_USER_LOGIN')
