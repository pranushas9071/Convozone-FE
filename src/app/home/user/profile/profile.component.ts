import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

  userDetails = this.fb.group({
    profilePicture: [''],
    email: [''],
    dob: [''],
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
    this.userService.upload(formData).subscribe((result: any) => {
      console.log(result);
    });
  }

  showSavedUserData() {
    this.userDetails.patchValue({
      email: this.userData.email,
      dob: this.userData.dob,
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
}
