import { Component, OnInit } from '@angular/core';
import { Socket } from 'socket.io-client';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';
import { ChatService } from '../../services/chat.service';
import { SocketService } from '../../services/socket.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  contacts: Array<any>=[];
  username: any;
  socket!: Socket;
  dpBaseUrl: string = environment.dpUrl;
  theme = 'primaryTheme';

  constructor(
    private contactService: ChatService,
    private commonService: CommonService,
    private socketService: SocketService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.username = this.commonService.getUsername();
    this.getChatDetails();
    this.socketEvents();
    this.themeService.selectedTheme.subscribe((theme) => {
      this.theme = theme;
    });
  }

  socketEvents() {
    this.socket = this.socketService.getSocket();
    this.socket.on('messageAlert', (data) => {
      this.getChatDetails();
    });
  }

  getChatDetails() {
    this.contactService.getChatDetails().subscribe((data:any) => {
      this.contacts = data;
    });
  }
}
