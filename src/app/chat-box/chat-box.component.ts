import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { io } from 'socket.io-client';
import { ChatService } from '../services/chat.service';

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
  socket: any;
  message?: string;
  typing: boolean = false;
  state: boolean = true;
  username: any;
  chatWith: any;
  // typingSubject = new BehaviorSubject<boolean>(false);
  // typingOb = this.typingSubject.asObservable();

  constructor(private fb: FormBuilder, private chatService: ChatService) {}

  chats = this.fb.group({
    message: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.socketConnection();
    this.chats.get('message')?.valueChanges.subscribe((msg) => {
      console.log(msg, !msg);
      if (!msg) {
        this.notifyTypingStopped();
      } else {
        this.notifyTyping();
      }
    });
    this.username = sessionStorage.getItem('username');

    this.chatWith = sessionStorage.getItem('chatWith');

    this.getMessage();

    // this.typingOb.subscribe((val) => {
    //   console.log('in ob ', val);
    // });
  }

  socketConnection() {
    this.socket = io('http://localhost:3000', {
      transports: ['websocket'],
    });

    this.socket.on('sendToAllClients', (data: string) => {
      if (data) {
        this.getMessage();
      }
    });

    this.socket.on('start typing', () => {
      this.typing = true;
      // this.typingSubject.next(true);
    });

    this.socket.on('stop typing', () => {
      this.typing = false;
      // this.typingSubject.next(false);
      console.log('typing stopped');
    });

    console.log('Connecting...');
  }

  notifyTyping() {
    this.socket.emit('start typing');
  }

  notifyTypingStopped() {
    this.socket.emit('stop typing');
  }

  sendMessage() {
    if (this.chats.value.message) {
      const data = {
        message: this.chats.value.message,
        username: sessionStorage.getItem('username'),
        timeStamp: new Date(),
        to: this.chatWith,
      };
      this.chatService.saveMessage(data).subscribe((res) => {
        this.socket.emit('chat message', 'A message alert');
        // this.showChat(this.chats.value.message, 'right');
        this.getMessage();
        this.chats.setValue({ message: '' });
      });
    }
  }

  onEnd() {
    this.state = !this.state;
  }

  showChat(message: string, time: string, alignment: string) {
    const li = document.createElement('li');
    const li1 = document.createElement('li');
    const ul = document.getElementById('messageList');
    li.innerText = message;
    li.style.padding = '5px 10px 0px 10px';
    li.style.width = '40%';
    li.style.borderRadius = '5px 5px 0px 0px';

    li1.innerText = time;
    li1.style.width = '40%';
    li1.style.fontSize = '10px';
    li1.style.color = 'grey';
    li1.style.marginBottom = '10px';
    li1.style.textAlign = 'right';
    li1.style.padding = '0px 7px 5px';
    li1.style.borderRadius = '0px 0px 5px 5px';

    if (alignment == 'left') {
      li.style.backgroundColor = '#fbf3e9';
      li.style.float = 'left';
      li.style.marginRight = '60%';

      li1.style.backgroundColor = '#fbf3e9';
      li1.style.float = 'left';
      li1.style.marginRight = '60%';
    } else {
      li.style.backgroundColor = '#c6fbc6';
      li.style.float = 'right';
      li.style.marginLeft = '58%';
      li.style.marginRight = '2%';

      li1.style.backgroundColor = '#c6fbc6';
      li1.style.float = 'right';
      li1.style.marginLeft = '58%';
      li1.style.marginRight = '2%';
    }
    ul?.appendChild(li);
    ul?.appendChild(li1);
  }

  getMessage() {
    this.chatService
      .getAllMessages(this.username, this.chatWith)
      .subscribe((res: any) => {
        for (let data of res) {
          const completeTime = new Date(data.timeStamp)
            .toLocaleTimeString()
            .split(':');
          const shortTime =
            completeTime[0] +
            ':' +
            completeTime[1] +
            ' ' +
            completeTime[2].split(' ')[1];
          if (data.username === this.username)
            this.showChat(`${data.message}`, shortTime, 'right');
          else this.showChat(`${data.message}`, shortTime, 'left');
        }
      });
  }
}
