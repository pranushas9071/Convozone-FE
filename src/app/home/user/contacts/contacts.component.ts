import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  contacts: any;
  username: any;
  constructor(
    private contactService: ChatService,
    private router: Router,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.username = this.commonService.getUsername();
    this.contactService.getAllContacts().subscribe((data) => {
      this.contacts = data;
    });
  }
}
