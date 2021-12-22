import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(
    private contactService: ChatService,
    private socketService: SocketService
  ) {}
  items: any;
  ngOnInit(): void {
    this.items = [
      {
        label: 'Update',
        icon: 'pi pi-user-edit',
        routerLink: ['/home/user/profile'],
      },
      { separator: true },
      {
        label: 'Logout',
        icon: 'pi pi-arrow-circle-right',
        command: () => {
          this.contactService
            .updateLastActiveDuration({
              lastActive: new Date(),
            })
            .subscribe((res) => {
              console.log(res);
            });
          sessionStorage.removeItem('token');
          if (!!this.socketService.getSocket())
            this.socketService.socket.disconnect();
        },
        routerLink: ['/'],
      },
    ];
  }
}
