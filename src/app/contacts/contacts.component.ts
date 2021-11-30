import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  contacts: any;
  username: any;
  constructor(private contactService: ChatService, private router: Router) {}

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.contactService.getAllContacts().subscribe((data) => {
      this.contacts = data;
    });
  }

  beginChat(contactName: string) {
    sessionStorage.setItem('chatWith', contactName);
    this.router.navigate(['/chat']);
  }
}
