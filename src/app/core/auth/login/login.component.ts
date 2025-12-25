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
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  errMessage = '';

  constructor(private Auth: AuthService, private router: Router) {}

  //______________________________register form__________________________

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
    ]),
  });

  //______________________________Submit form__________________________
  submit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    } else {
      if (this.loginForm.valid) {
        this.Auth.login(this.loginForm.value).subscribe({
          next: (res) => {
            console.log(res);
            this.Auth.saveTokens(res.accessToken, res.refreshToken);

            //access token
            this.Auth.decodeUserData();
            this.router.navigate(['/app']);
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
