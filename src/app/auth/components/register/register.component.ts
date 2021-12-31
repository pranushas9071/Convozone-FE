import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
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
  displayInfo: boolean = false;
  userDetails = this.fb.group(
    {
      username: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(4),
            Validators.pattern(/(\b(?:([A-Za-z0-9])(?!\2{2}))+\b)/),
          ],
          asyncValidators: [this.validatorService.usernameValidator()],
        },
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            /(\b^[a-z]{1}(?:([A-Za-z0-9._])(?!\2{2})){3,}@(?:([a-z])(?!\3{2})){5,}(\.[a-z]{3}|\.[a-z]{2,3}\.[a-z]{2})$\b)/
          ),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/),
        ],
      ],
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

  showInfoDialog() {
    this.displayInfo = true;
  }

  markAsTouched() {
    this.userDetails.get('password')?.markAsTouched();
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
