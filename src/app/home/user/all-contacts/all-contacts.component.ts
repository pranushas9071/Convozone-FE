import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ChatService } from '../../services/chat.service';
import { ThemeService } from '../../services/theme.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.scss'],
})
export class AllContactsComponent implements OnInit {
  constructor(
    private contactService: ChatService,
    private commonService: CommonService,
    private themeService: ThemeService
  ) {}
  
  username: any;
  contacts: any;
  dpBaseUrl: string = environment.dpUrl;
  theme = 'primaryTheme';

  ngOnInit(): void {
    this.username = this.commonService.getUsername();
    this.contactService.getAllContacts().subscribe((data) => {
      this.contacts = data;
    });
    this.themeService.selectedTheme.subscribe((theme) => {
      this.theme = theme;
    });
  }
}
