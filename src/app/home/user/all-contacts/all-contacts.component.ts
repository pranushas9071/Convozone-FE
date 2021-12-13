import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.css']
})
export class AllContactsComponent implements OnInit {

  constructor(
    private contactService: ChatService,
    private commonService: CommonService
  ) { }
  username:any;
  contacts:any;

  ngOnInit(): void {
    this.username = this.commonService.getUsername();
    this.contactService.getAllContacts().subscribe((data) => {
      this.contacts = data;
    });
  }

}
