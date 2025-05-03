import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = () => {
  const platformId = inject(PLATFORM_ID);
  const cookieService = inject(CookieService);
  const router = inject(Router);

  const token = cookieService.get('token');

  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
