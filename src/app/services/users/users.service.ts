import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { User } from '../../interfaces/interfaces';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseService {


  updateProfile(formData: FormData): Observable<User> {
    return this.put<User, FormData>(
      this.baseUrl + 'auth/profile',
      formData
    ).pipe(
      catchError((error) => {
        console.error('Error updating profile:', error);
        return throwError(() => error);
      })
    );
  }

  getAllUsers(): Observable<User[]> {
    return this.get<User[]>(this.baseUrl + 'auth/users').pipe(
      catchError((error) => {
        console.error('Error fetching users:', error);
        return throwError(() => error);
      })
    );
  }

  getUser(id: string): Observable<User> {
    return this.get<User>(this.baseUrl + `auth/user/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching user:', error);
        return throwError(() => error);
      })
    );
  }

  getProfile(): Observable<User> {
    return this.get<User>(this.baseUrl + `auth/me`).pipe(
      catchError((error) => {
        console.error('Error fetching profile:', error);
        return throwError(() => error);
      })
    );
  }
  
}
