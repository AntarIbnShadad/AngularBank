import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptor } from './interceptors/authentication.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([AuthInterceptor, ErrorInterceptor])),
    provideRouter(routes),
    CookieService,
  ],
};
