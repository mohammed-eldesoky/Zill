import { Component } from '@angular/core';
import { AuthService } from '../../auth-service/auth.service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  errMessage = '';

  constructor(private Auth: AuthService, private router: Router) {}

  //______________________________register form__________________________

  registerForm: FormGroup = new FormGroup({
    fullName: new FormControl(null, [
      Validators.minLength(6),
      Validators.maxLength(50),
      Validators.required,
    ]),
    nickName: new FormControl(null, [
      Validators.minLength(3),
      Validators.required,
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
    ]),
    dob: new FormControl(null, [Validators.required]),
  });

  //______________________________Submit form__________________________
  submit() {
    console.log(this.registerForm.value);
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    } else {
      if (this.registerForm.valid) {
        this.Auth.register(this.registerForm.value).subscribe({
          next: (res) => {
            console.log(res);
            if (res.success) {
              this.router.navigate(['/verify']);
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
