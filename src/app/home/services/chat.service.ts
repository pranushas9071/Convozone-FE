import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}

  saveMessage(data: any) {
    return this.http.post(`${environment.baseUrl}/chat/message`, data);
  }

  getAllMessages(to: string) {
    return this.http.get(`${environment.baseUrl}/chat/allMessages?to=${to}`);
  }

  getAllContacts() {
    return this.http.get(`${environment.baseUrl}/contacts/allContacts`);
  }

  getUserDetails() {
    return this.http.get(`${environment.baseUrl}/contacts/self`);
  }

  upload(data: any) {
    return this.http.put(`${environment.baseUrl}/contacts/upload`, data);
  }

  getChatDetails() {
    return this.http.get(`${environment.baseUrl}/chat/allChatDetails`);
  }

  updateLastActiveDuration(data: any) {
    return this.http.post(`${environment.baseUrl}/contacts/lastActive`, data);
  }

  updateMessageStateOnLogin(state: string) {
    return this.http.put(`${environment.baseUrl}/chat/messageReceived`, {
      state: state,
    });
  }

  updateMessageStateAsSeen(state: string, user: string) {
    return this.http.put(`${environment.baseUrl}/chat/messageOpened`, {
      state: state,
      user: user,
    });
  }
}
