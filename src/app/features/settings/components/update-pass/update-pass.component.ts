import { Component } from '@angular/core';
import { AuthService } from '../../../../core/auth-service/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordService } from '../../../services/password.service';

@Component({
  selector: 'app-update-pass',
  imports: [ReactiveFormsModule],
  templateUrl: './update-pass.component.html',
  styleUrl: './update-pass.component.scss'
})
export class UpdatePassComponent {
 errMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(private passwordService: PasswordService) {}

  // ______________________________ Form ______________________________
  updatePass: FormGroup = new FormGroup({
    oldPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
    ]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
    ]),
  });

  // ______________________________ Submit ______________________________
  submit() {
    if (this.updatePass.invalid) {
      this.updatePass.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errMessage = '';
    this.successMessage = '';

    this.passwordService.updatePassword(this.updatePass.value).subscribe({
      next: (res) => {
        if (res.success) {
          this.successMessage = res.message; // "Password updated successfully"
          this.updatePass.reset();
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errMessage = err.error?.message || 'Something went wrong';
        this.isLoading = false;
      },
    });
  }
}


