import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  userDetails = this.fb.group({
    username: [''],
    email: [''],
    password: [''],
    confirmPassword: [''],
  });

  onSubmit() {
    console.log(this.userDetails.value);

    sessionStorage.setItem('username', this.userDetails.value.username);
    const data = {
      username: this.userDetails.value.username,
      email: this.userDetails.value.email,
      password: this.userDetails.value.password,
    };
    this.authService.saveContact(data).subscribe((res: any) => {
      sessionStorage.setItem('token', res.result);
      this.router.navigate(['/contacts']);
    });
  }

  ngOnInit(): void {}
}
