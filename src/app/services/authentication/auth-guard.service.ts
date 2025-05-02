import { inject, Injectable, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  private _isReady = signal(false);
  private _isAuthenticated = signal(false);
  private cookieService = inject(CookieService);

  isReady = this._isReady.asReadonly();
  isAuthenticated = this._isAuthenticated.asReadonly();

  initAuth(): Promise<void> {
    return new Promise((resolve) => {
      const token = this.cookieService.get('token');
      this._isAuthenticated.set(!!token);
      this._isReady.set(true);
      resolve();
    });
  }

  logout() {
    this.cookieService.delete('token');
    this._isAuthenticated.set(false);
  }
}
