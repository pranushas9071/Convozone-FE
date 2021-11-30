import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private chatService: ChatService
  ) {}

  userDetails = this.fb.group({
    username: ['', Validators.required],
  });

  ngOnInit(): void {}

  onSubmit() {
    sessionStorage.setItem('username', this.userDetails.value.username);
    const data = { username: this.userDetails.value.username };
    // this.chatService.saveContact(data).subscribe((res) => {
    // });
    this.router.navigate(['/contacts']);
  }
}
