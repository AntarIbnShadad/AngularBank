import { APP_INITIALIZER, Provider } from '@angular/core';
import { AuthGuardService } from './services/authentication/auth-guard.service';

export const appInitializerProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: (authService: AuthGuardService) => () => authService.initAuth(),
  deps: [AuthGuardService],
  multi: true,
};
