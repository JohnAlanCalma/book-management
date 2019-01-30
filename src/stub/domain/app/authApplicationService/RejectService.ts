import {injectable} from 'inversify'
import IAuthApplicationService from '@/boundary/authApplicationService/IAuthApplicationService'
import {
  IAuthInfo,
} from '@/boundary/authApplicationService/InOutType'

@injectable()
export default class RejectService implements IAuthApplicationService {
  public async registration(): Promise<IAuthInfo> {
    const code = 'auth/email-already-in-use'
    throw { code }
  }

  public async login(): Promise<IAuthInfo> {
    throw Error()
  }

  public async loginWithEmailAndPassword(): Promise<IAuthInfo> {
    throw Error()
  }
}
