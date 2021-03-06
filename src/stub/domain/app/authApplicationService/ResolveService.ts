import { IAuthApplicationService } from '@/boundary/authApplicationService/IAuthApplicationService'
import {
  IAuthInfo,
  IRegistrationParams,
} from '@/boundary/authApplicationService/InOutType'
import { userFactory } from '@/stub/domain/factory/IUser'
import { injectable } from 'inversify'

@injectable()
export class AuthApplicationService implements IAuthApplicationService {
  public async registration(params: IRegistrationParams): Promise<IAuthInfo> {
    return {
      isEmailVerified: false,
      userId: userFactory(params).id,
    }
  }

  public async login(): Promise<IAuthInfo> {
    return {
      isEmailVerified: true,
      userId: userFactory().id,
    }
  }

  public async loginWithEmailAndPassword(email: string): Promise<IAuthInfo> {
    return {
      isEmailVerified: true,
      userId: userFactory({
        emailAddress: email,
      }).id,
    }
  }
}
