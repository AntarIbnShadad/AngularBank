import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  baseUrl = 'https://react-bank-project.eapi.joincoded.com/mini-project/api';

  constructor(private readonly _http: HttpClient) {}

  private ensureJsonContentType(headers?: HttpHeaders): HttpHeaders {
    if (!headers) {
      return new HttpHeaders({ 'Content-Type': 'application/json' });
    }
    if (!headers.has('Content-Type')) {
      return headers.set('Content-Type', 'application/json');
    }
    return headers;
  }

  private getAuthHeaders(headers?: HttpHeaders): HttpHeaders {
    const token = localStorage.getItem('token');
    let finalHeaders = headers ?? new HttpHeaders();

    if (token && !finalHeaders.has('Authorization')) {
      finalHeaders = finalHeaders.set('Authorization', `Bearer ${token}`);
    }

    return finalHeaders;
  }

  private prepareHeaders(body: any, headers?: HttpHeaders): HttpHeaders {
    const isFormData = body instanceof FormData;
    const headersWithContentType = isFormData
      ? headers
      : this.ensureJsonContentType(headers);

    return this.getAuthHeaders(headersWithContentType);
  }

  get<ResponseType>(url: string, params?: any, headers?: HttpHeaders) {
    return this._http.get<ResponseType>(url, {
      headers: this.getAuthHeaders(headers),
      params: params ? new HttpParams({ fromObject: params }) : undefined,
    });
  }

  post<ResponseType, RequestBodyType>(
    url: string,
    body: RequestBodyType,
    headers?: HttpHeaders,
    params?: any
  ) {
    return this._http.post<ResponseType>(url, body, {
      headers: this.prepareHeaders(body, headers),
      params: params ? new HttpParams({ fromObject: params }) : undefined,
    });
  }

  put<ResponseType, RequestBodyType>(
    url: string,
    body: RequestBodyType,
    headers?: HttpHeaders,
    params?: any
  ) {
    return this._http.put<ResponseType>(url, body, {
      headers: this.prepareHeaders(body, headers),
      params: params ? new HttpParams({ fromObject: params }) : undefined,
    });
  }

  delete<ResponseType>(url: string, params?: any, headers?: HttpHeaders) {
    return this._http.delete<ResponseType>(url, {
      headers: this.getAuthHeaders(headers),
      params: params ? new HttpParams({ fromObject: params }) : undefined,
    });
  }
}
