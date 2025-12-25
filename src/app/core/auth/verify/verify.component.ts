import { Component } from '@angular/core';
import { AuthService } from '../../auth-service/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import {TranslatePipe} from "@ngx-translate/core";
@Component({
  selector: 'app-verify',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss'
})
export class VerifyComponent {
  errMessage = '';

  constructor(private Auth: AuthService, private router: Router) {}

  //______________________________register form__________________________

  verifyForm: FormGroup = new FormGroup({
 
    email: new FormControl(null, [Validators.required, Validators.email]),
  
    otp: new FormControl(null, [Validators.required,Validators.minLength(5),Validators.maxLength(6)]),
  });

  //______________________________Submit form__________________________
  submit() {
    console.log(this.verifyForm.value);
    if (this.verifyForm.invalid) {
      this.verifyForm.markAllAsTouched();
      return;
    } else {
      if (this.verifyForm.valid) {
        this.Auth.verify(this.verifyForm.value).subscribe({
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
