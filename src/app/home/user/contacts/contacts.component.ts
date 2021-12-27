import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ChatService } from '../../services/chat.service';
import { environment } from 'src/environments/environment';
import { SocketService } from '../../services/socket.service';
import { Socket } from 'socket.io-client';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  contacts: any;
  username: any;
  socket!: Socket;
  dpBaseUrl: string = environment.dpUrl;
  constructor(
    private contactService: ChatService,
    private commonService: CommonService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.username = this.commonService.getUsername();
    this.getChatDetails();
    this.socketEvents();
  }

  socketEvents() {
    this.socket = this.socketService.getSocket();
    this.socket.on('messageAlert', (data) => {
      this.getChatDetails();
    });
  }

  getChatDetails() {
    this.contactService.getChatDetails().subscribe((data) => {
      this.contacts = data;
    });
  }
}
