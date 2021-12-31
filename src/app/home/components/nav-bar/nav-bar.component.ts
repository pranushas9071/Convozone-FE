import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { SocketService } from '../../services/socket.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  items: any;
  visibleSidebar!: boolean;
  selectedTheme: any;
  themes: any;
  theme = 'primaryTheme';

  constructor(
    private contactService: ChatService,
    private socketService: SocketService,
    private themeService: ThemeService
  ) {
    this.themes = [
      { name: 'Primary Theme', value: 'primaryTheme' },
      { name: 'Dark Theme', value: 'darkTheme' },
      { name: 'Light Theme', value: 'lightTheme' },
      { name: 'Sceneric Theme', value: 'scenericTheme' },
    ];
  }

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
            .subscribe((res) => {});
          sessionStorage.removeItem('token');
          if (!!this.socketService.getSocket())
            this.socketService.socket.disconnect();
        },
        routerLink: ['/'],
      },
    ];
    this.themeService.selectedTheme.subscribe((theme) => {
      this.theme = theme;
    });
  }

  changeTheme() {
    this.themeService.changeTheme(this.selectedTheme.value);
  }
}
