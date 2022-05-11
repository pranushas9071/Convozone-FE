import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { ChatService } from '../../services/chat.service';
import { ThemeService } from '../../services/theme.service';

interface user {
  username: string;
  status: string;
  email: string;
  dob: string;
  dp: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService],
})
export class ProfileComponent implements OnInit {
  userData: user = { username: '', status: '', email: '', dob: '', dp: '' };
  location: any;
  minDate: Date = new Date(1960, 1, 1, 12, 0, 0, 0);
  maxDate: Date = new Date();
  theme = 'primaryTheme';
  disabled: boolean = true;
  file?: File;

  constructor(
    private fb: FormBuilder,
    private userService: ChatService,
    private messageService: MessageService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.userService.getUserDetails().subscribe((data: any) => {
      this.userData = data;
      if (data.dp) this.location = `${environment.dpUrl}/${this.userData.dp}`;
      else
        this.location =
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png';
      this.showSavedUserData();
    });
    this.themeService.selectedTheme.subscribe((theme) => {
      this.theme = theme;
    });
  }

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

  onChange(event: any) {
    this.file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      this.location = event.target.result;
    };
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
