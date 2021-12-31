import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'socket.io-client';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';
import { ChatService } from '../../services/chat.service';
import { SocketService } from '../../services/socket.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
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
export class ChatBoxComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  socket!: Socket;
  messages: any;
  typing: boolean = false;
  state: boolean = true;
  username!: string;
  chatWith!: string;
  profile!: string;
  userAvailable: boolean = false;
  lastActive!: string;
  today = new Date().toISOString();
  dp: any;
  file?: File;
  theme = 'primaryTheme';

  constructor(
    private fb: FormBuilder,
    private chatService: ChatService,
    private commonService: CommonService,
    private router: ActivatedRoute,
    private socketService: SocketService,
    private themeService: ThemeService
  ) {}

  chats = this.fb.group({
    message: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.router.queryParams.subscribe((params) => {
      this.chatWith = params['username'];
      this.dp = params['profile'];
      this.profile = `${environment.dpUrl}/${params['profile']}`;
      this.lastActive = params['lastActive'];
    });

    this.themeService.selectedTheme.subscribe((theme) => {
      this.theme = theme;
    });

    this.chats.get('message')?.valueChanges.subscribe((msg) => {
      if (!msg) {
        this.notifyTypingStopped();
      } else {
        this.notifyTyping();
      }
    });

    //Update state of message in db to "seen"...
    this.chatService
      .updateMessageStateAsSeen('seen', this.chatWith)
      .subscribe();
    this.username = this.commonService.getUsername();
    this.socketConnection();
    this.getAllMessages();
  }

  socketConnection() {
    this.socket = this.socketService.getSocket();

    //Emits "check user state" event to check user is online or offline
    this.socketService.checkUserState(this.chatWith);
    this.socketService.changeMessageState();

    //--------------------Emitted by "check user state" event-----------------------------
    this.socket.on('online', (data) => {
      if (data === this.chatWith) this.userAvailable = true;
    });
    this.socket.on('offline', (data) => {
      if (data === this.chatWith) this.userAvailable = false;
    });
    //------------------------------------------------------------------------------------

    //When a new message arrives...
    this.socket.on('messageAlert', (data) => {
      if (data === this.chatWith) {
        this.getAllMessages();

        //update new message's state as "seen" in db...
        this.chatService
          .updateMessageStateAsSeen('seen', this.chatWith)
          .subscribe((res) => {
            //Emits 'change in message state' event to display recent changes in message state to sender..
            this.socket.emit('message seen', {
              info: 'Message has been viewed',
              user: this.chatWith,
            });
          });
      }
    });

    //Emitted when state of message is changed...
    this.socket.on('change in message state', (data) => {
      if (data === this.chatWith) this.getAllMessages();
    });

    this.socket.on('start typing', (data) => {
      if (data === this.chatWith) this.typing = true;
    });

    this.socket.on('stop typing', (data) => {
      if (data === this.chatWith) this.typing = false;
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

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    this.myScrollContainer.nativeElement.scrollTop =
      this.myScrollContainer.nativeElement.scrollHeight;
  }

  goBack() {
    this.chatWith = '';
    window.history.back();
  }

  openDialog(input: any) {
    input.click();
  }
}
