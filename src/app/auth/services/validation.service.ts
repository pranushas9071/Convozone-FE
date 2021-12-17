import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { delay, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor(private authService:AuthService) { }

  passwordValidator(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordcontrol = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordcontrol || !confirmPasswordControl) {
        return null;
      }
      if (confirmPasswordControl.invalid || passwordcontrol.invalid) {
        return null;
      }
      if (passwordcontrol.value != confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMisMatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
      return null;
    };
  }

  usernameValidator() {
    return (control: AbstractControl) => {
      return this.authService
        .validateUsername({ username: control.value })
        .pipe(
          map((res:any) => {
            if (control.value.match(/^[A-Za-z]+$/) == null)
              return { otherCaharactersPresent: true };
            else return res.usernameTaken ? { usernameTaken: true } : null;
          })
        )
        // .pipe(delay(500));
    };
  }
}
