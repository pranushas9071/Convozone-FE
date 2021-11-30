import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  saveContact(data: any) {
    return this.http.post(`http://localhost:3000/contacts/saveContact`, data);
  }
}
