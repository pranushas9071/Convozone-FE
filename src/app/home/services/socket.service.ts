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

  disconnectSocket() {
    this.socket.disconnect();
  }
}
