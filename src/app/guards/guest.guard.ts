import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const guestGuard: CanActivateFn = () => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  const token = cookieService.get('token');

  if (token) {
    router.navigate(['/users']);
    return false;
  }

  return true;
};
