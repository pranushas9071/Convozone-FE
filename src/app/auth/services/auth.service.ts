import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(`http://localhost:3000/contacts/register`, data);
  }

  login(data: any) {
    return this.http.post(`http://localhost:3000/contacts/login`, data);
  }
}
