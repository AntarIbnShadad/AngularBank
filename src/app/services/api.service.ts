import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ServerResponse } from 'http';
import { Register } from '../data/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl =  "https://react-bank-project.eapi.joincoded.com/mini-project/api/"
  constructor(private _http: HttpClient) { }

  register(reg: Register): Observable<ServerResponse>{
    return this._http.post<ServerResponse>(`${this.baseUrl}auth/register`, reg)
  }
}
