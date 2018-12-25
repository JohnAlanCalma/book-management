import IAuthApplicationService from '@/boundary/authApplicationService/IAuthApplicationService'
import {serviceContainer} from '@/inversify/config'

export default class AuthApplicationService {
  public static getInstance(): IAuthApplicationService {
    return serviceContainer.get(IAuthApplicationService)
  }
}
