import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor() {}
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
        routerLink: ['/'],
      },
    ];
  }
}
