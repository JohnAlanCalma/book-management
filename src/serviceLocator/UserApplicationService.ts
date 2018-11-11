import IUserApplicationService from '@/boundary/userApplicationService/IUserApplicationService'
import {diContainer} from '@/inversify/config'

export default class UserApplicationService {
  public static getInstance(): IUserApplicationService {
    return diContainer.get(IUserApplicationService)
  }
}
