import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  loginResultFailed: boolean = false;
  loginDetails = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onLogin() {
    const data = {
      username: this.loginDetails.value.username,
      password: this.loginDetails.value.password,
    };

    this.authService.login(data).subscribe((message: any) => {
      if (
        message.result == 'No user found' ||
        message.result == 'Incorrect password'
      ) {
        this.loginResultFailed = true;
      } else {
        this.loginResultFailed = false;
        sessionStorage.setItem('token', message.result);
        this.router.navigate(['/home']);
      }
    });
  }

  get username() {
    return this.loginDetails.get('username');
  }

  get pass() {
    return this.loginDetails.get('password');
  }

  changeLoginResult() {
    this.loginResultFailed = false;
  }
  ngOnInit(): void {
    sessionStorage.removeItem('token');
  }
}
