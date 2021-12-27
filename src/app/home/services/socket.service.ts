import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket!: Socket;
  constructor() {}

  connectSocket() {
    this.socket = io(environment.baseUrl, {
      transports: ['websocket'],
      query: { token: sessionStorage.getItem('token') },
    });
  }

  notifyOnline() {
    this.socket.emit('alert online', { info: 'User is online' });
  }

  getSocket() {
    return this.socket;
  }

  changeMessageState() {
    this.socket.emit('message state changed');
  }

  checkUserState(user: string) {
    this.socket.emit('check user state', {
      info: 'Check user is online',
      user: user,
    });
  }

  disconnectSocket() {
    this.socket.disconnect();
  }
}
