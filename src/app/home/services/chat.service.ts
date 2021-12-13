import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}

  saveMessage(data: any) {
    return this.http.post(`http://localhost:3000/chat/message`, data);
  }

  getAllMessages(to: string) {
    return this.http.get(`http://localhost:3000/chat/allMessages?to=${to}`);
  }

  getAllContacts() {
    return this.http.get(
      `http://localhost:3000/contacts/allContacts`
    );
  }

  getUserDetails() {
    return this.http.get(`http://localhost:3000/contacts/self`);
  }

  upload(data: any) {
    return this.http.post(`http://localhost:3000/contacts/upload`, data);
  }

  getChatDetails() {
    return this.http.get(`http://localhost:3000/chat/allChatDetails`);
  }
}
