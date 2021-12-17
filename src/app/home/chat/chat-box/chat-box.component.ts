import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { io, Socket } from 'socket.io-client';
import { CommonService } from 'src/app/services/common.service';
import { ChatService } from '../../services/chat.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
  animations: [
    trigger('PulseAtEnds', [
      transition('* => *', [
        animate(
          '5s',
          keyframes([
            style({ opacity: 0.5, offset: 0.1 }),
            style({ opacity: 1, offset: 0.2 }),
            style({ opacity: 0.5, offset: 0.5 }),
            style({ opacity: 1, offset: 0.7 }),
          ])
        ),
      ]),
    ]),

    trigger('PulseAtCenter', [
      transition('* => *', [
        animate(
          '5s',
          keyframes([
            style({ opacity: 1, offset: 0.1 }),
            style({ opacity: 0.5, offset: 0.2 }),
            style({ opacity: 1, offset: 0.5 }),
            style({ opacity: 0.5, offset: 0.7 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class ChatBoxComponent implements OnInit {
  socket!: Socket;
  messages: any;
  typing: boolean = false;
  state: boolean = true;
  username!: string;
  chatWith!: string;
  profile!: string;

  constructor(
    private fb: FormBuilder,
    private chatService: ChatService,
    private commonService: CommonService,
    private router: ActivatedRoute
  ) {}

  chats = this.fb.group({
    message: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.router.queryParams.subscribe((params) => {
      this.chatWith = params['username'];
      this.profile = `${environment.dpUrl}/${params['profile']}`;
    });

    this.chats.get('message')?.valueChanges.subscribe((msg) => {
      if (!msg) {
        this.notifyTypingStopped();
      } else {
        this.notifyTyping();
      }
    });
    this.username = this.commonService.getUsername();
    this.socketConnection();
    this.getAllMessages();
  }

  socketConnection() {
    this.socket = io(environment.baseUrl, {
      transports: ['websocket'],
      query: { token: sessionStorage.getItem('token') },
    });

    this.socket.on('messageAlert', () => {
      this.getAllMessages();
    });

    this.socket.on('start typing', () => {
      this.typing = true;
    });

    this.socket.on('stop typing', () => {
      this.typing = false;
    });
  }

  notifyTyping() {
    this.socket.emit('start typing', {
      info: 'typing started',
      to: this.chatWith,
    });
  }

  notifyTypingStopped() {
    this.socket.emit('stop typing', {
      info: 'typing stopped',
      to: this.chatWith,
    });
  }

  sendMessage() {
    if (this.chats.value.message) {
      const data = {
        message: this.chats.value.message,
        username: this.username,
        timeStamp: new Date(),
        to: this.chatWith,
      };
      this.chatService.saveMessage(data).subscribe((res) => {
        this.socket.emit('chat message', {
          info: 'a message alert',
          to: this.chatWith,
        });
        this.getAllMessages();
        this.chats.setValue({ message: '' });
      });
    }
  }

  onEnd() {
    this.state = !this.state;
  }

  getAllMessages() {
    this.chatService.getAllMessages(this.chatWith).subscribe((res: any) => {
      this.messages = res;
    });
  }

  goBack() {
    this.socket.disconnect();
    window.history.back();
  }
}
