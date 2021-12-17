import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [MessageService],
})
export class ProfileComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private userService: ChatService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.userService.getUserDetails().subscribe((data) => {
      this.userData = data;
      this.location = `${environment.dpUrl}/${this.userData.dp}`;
      this.showSavedUserData();
    });
  }

  userData: any;
  location: any;
  minDate: Date = new Date(1960, 1, 1, 12, 0, 0, 0);
  maxDate: Date = new Date();

  userDetails = this.fb.group({
    profilePicture: [''],
    email: [
      '',
      [
        Validators.email,
        Validators.pattern(
          /(\b^[a-z]{1}(?:([A-Za-z0-9._])(?!\2{2})){3,}@(?:([a-z])(?!\3{2})){5,}(\.[a-z]{3}|\.[a-z]{2,3}\.[a-z]{2})$\b)/
        ),
      ],
    ],
    dob: ['', Validators.required],
    status: [''],
  });
  file?: File;

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  editProfile() {
    const formData = new FormData();
    formData.append('email', this.userDetails.value.email);
    formData.append('dob', this.userDetails.value.dob);
    formData.append('status', this.userDetails.value.status);
    if (this.file) formData.append('file', this.file);
    this.userService.upload(formData).subscribe((result: any) => {});
  }

  showSavedUserData() {
    if (!!this.userData.dob)
      this.userDetails.patchValue({ dob: new Date(this.userData.dob) });
    this.userDetails.patchValue({
      email: this.userData.email,
      status: this.userData.status,
    });
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Successfully Updated',
    });
  }

  get mail() {
    return this.userDetails.get('email');
  }

  get dob() {
    return this.userDetails.get('dob');
  }
}
