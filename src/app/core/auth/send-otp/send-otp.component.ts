import { Component } from '@angular/core';
import { AuthService } from '../../auth-service/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import {TranslatePipe} from "@ngx-translate/core";
@Component({
  selector: 'app-send-otp',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './send-otp.component.html',
  styleUrl: './send-otp.component.scss'
})
export class SendOtpComponent {
 errMessage = '';

  constructor(private Auth: AuthService, private router: Router) {}

  //______________________________register form__________________________

  sendOtpForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  //______________________________Submit form__________________________
  submit() {
    if (this.sendOtpForm.invalid) {
      this.sendOtpForm.markAllAsTouched();
      return;
    } else {
      if (this.sendOtpForm.valid) {
        this.Auth.sendOtp(this.sendOtpForm.value).subscribe({
          next: (res) => {
            console.log(res);
            this.router.navigate(['/forget-password']);
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
