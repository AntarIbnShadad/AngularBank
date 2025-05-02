import { inject } from '@angular/core';
import { CanActivateFn, CanLoadFn, Router } from '@angular/router';
import { AuthGuardService } from '../services/authentication/auth-guard.service';

export function authGuard(
  allowedForLoggedIn: boolean = true
): CanActivateFn | CanLoadFn {
  return () => {
    const authService = inject(AuthGuardService);
    const router = inject(Router);

    if (!authService.isReady()) {
      return false;
    }

    const isLoggedIn = authService.isAuthenticated();

    if (allowedForLoggedIn) {
      if (!isLoggedIn) {
        router.navigate(['/login']);
        return false;
      }
    } else {
      if (isLoggedIn) {
        router.navigate(['/users']);
        return false;
      }
    }

    return true;
  };
}
