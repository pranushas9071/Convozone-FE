import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-30%)' }),
        animate('200ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
    ]),
    trigger('slideOut', [
      transition(':enter', [
        style({ transform: 'translateX(30%)' }),
        animate('200ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
    ]),
  ],
})
export class RegisterComponent implements OnInit {
  ngOnInit(): void {}
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private validatorService: ValidationService,
    private router: Router
  ) {}
  stage = 0;
  userDetails = this.fb.group(
    {
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    {
      validator: this.validatorService.passwordValidator(
        'password',
        'confirmPassword'
      ),
    }
  );

  onSubmit() {
    const data = {
      username: this.userDetails.value.username,
      email: this.userDetails.value.email,
      password: this.userDetails.value.password,
    };
    this.authService.register(data).subscribe((res: any) => {
      sessionStorage.setItem('token', res.result);
      this.router.navigate(['/home/user/contact-list']);
    });
  }

  incrementStage() {
    this.stage = this.stage + 1;
  }

  decrementStage() {
    this.stage = this.stage - 1;
  }

  get username() {
    return this.userDetails.get('username');
  }

  get pass() {
    return this.userDetails.get('password');
  }

  get mail() {
    return this.userDetails.get('email');
  }

  get cPass() {
    return this.userDetails.get('confirmPassword');
  }
}
