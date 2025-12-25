import { Component } from '@angular/core';
import { AuthService } from '../../auth-service/auth.service';
import { Router, RouterLink } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {TranslatePipe} from "@ngx-translate/core";
@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, RouterLink ,TranslatePipe],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  errMessage = '';

  constructor(private Auth: AuthService, private router: Router) {}

  //______________________________register form__________________________

  forgetPassForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),

    otp: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(6),
    ]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
    ]),
  });

  //______________________________Submit form__________________________
  submit() {
    console.log(this.forgetPassForm.value);
    if (this.forgetPassForm.invalid) {
      this.forgetPassForm.markAllAsTouched();
      return;
    } else {
      if (this.forgetPassForm.valid) {
        this.Auth.forgetPass(this.forgetPassForm.value).subscribe({
          next: (res) => {
            console.log(res);
            if (res.success) {
              this.router.navigate(['/login']);
            }
          },
          error: (err) => {
            console.error('Server error:', err);
            this.errMessage = err.error.message || err.message;
          },
        });
      }
    }
  }
}
