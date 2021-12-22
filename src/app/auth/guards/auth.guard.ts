import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SocketService } from 'src/app/home/services/socket.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private socketService: SocketService) {}
  canActivate() {
    if (!!sessionStorage.getItem('token')) {
      if (!this.socketService.getSocket()) {
        this.socketService.connectSocket();
        this.socketService.notifyOnline();
      }
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }
}
