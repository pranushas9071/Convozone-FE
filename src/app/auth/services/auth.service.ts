import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(`${environment.baseUrl}/contacts/register`, data);
  }

  login(data: any) {
    return this.http.post(`${environment.baseUrl}/contacts/login`, data);
  }

  validateUsername(data: any) {
    return this.http.post(`${environment.baseUrl}/contacts/validate`, data);
  }
}
