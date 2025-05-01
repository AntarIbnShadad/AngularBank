import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthResponse, Login } from '../../interfaces/interfaces';
import { BaseService } from '../base/base.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseService {
  login(data: Login): Observable<AuthResponse> {
    return this.post<AuthResponse, Login>(
      `${this.baseUrl}auth/login`,
      data
    ).pipe(
      catchError((error) => {
        console.error('Login failed:', error);
        return throwError(() => error);
      })
    );
  }

  register(data: FormData): Observable<AuthResponse> {
    return this.post<AuthResponse, FormData>(
      `${this.baseUrl}auth/register`,
      data
    ).pipe(
      catchError((error) => {
        console.error('Registration failed:', error);
        return throwError(() => error);
      })
    );
  }
}
