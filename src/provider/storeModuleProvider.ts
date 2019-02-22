import { ContainerModule } from '@/store/containers'
import { BookListModule } from '@/store/containers/bookList'
import { ChangeUserProfileFormModule } from '@/store/containers/changeUserProfileForm'
import { CreateBookFormModule } from '@/store/containers/createBookForm'
import { LoginFormModule } from '@/store/containers/loginForm'
import { NavigationModule } from '@/store/containers/navigation'
import { UserRegistrationFormModule } from '@/store/containers/userRegistrationForm'
import { MiddlewareModule } from '@/store/middleware'
import { AuthModule } from '@/store/middleware/auth'
import { PageNotFoundModule } from '@/store/middleware/pageNotFound'
import { RouterModule } from '@/store/middleware/router'
import { ClassBasedStoreOption } from '@/store/root'
import { Container } from 'inversify'

export function storeModuleProvider(container: Container): void {
  // container
  container.bind(ContainerModule).to(ContainerModule)
  container.bind(UserRegistrationFormModule).to(UserRegistrationFormModule)
  container.bind(NavigationModule).to(NavigationModule)
  container.bind(LoginFormModule).to(LoginFormModule)
  container.bind(CreateBookFormModule).to(CreateBookFormModule)
  container.bind(ChangeUserProfileFormModule).to(ChangeUserProfileFormModule)
  container.bind(BookListModule).to(BookListModule)

  // middleware
  container.bind(MiddlewareModule).to(MiddlewareModule)
  container.bind(PageNotFoundModule).to(PageNotFoundModule)
  container.bind(AuthModule).to(AuthModule)
  container.bind(RouterModule).to(RouterModule)

  // root
  container.bind(ClassBasedStoreOption).to(ClassBasedStoreOption)
}
