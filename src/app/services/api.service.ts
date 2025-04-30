import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerResponse } from 'http';
import { Observable } from 'rxjs';
import { Register } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'https://react-bank-project.eapi.joincoded.com/mini-project/api/';
  constructor(private _http: HttpClient) {}

  register(reg: Register): Observable<ServerResponse> {
    return this._http.post<ServerResponse>(`${this.baseUrl}auth/register`, reg);
  }
}
