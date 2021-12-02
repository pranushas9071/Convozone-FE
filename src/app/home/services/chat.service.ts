import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}

  saveMessage(data: any) {
    return this.http.post(`http://localhost:3000/user/saveMessage`, data);
  }

  getAllMessages(to:string) {
    return this.http.get(`http://localhost:3000/user/allMessages?to=${to}`);
  }

  getAllContacts() {
    return this.http.get(`http://localhost:3000/contacts/allContacts`);
  }

  saveContact(data: any) {
    return this.http.post(`http://localhost:3000/contacts/saveContact`, data);
  }
}
