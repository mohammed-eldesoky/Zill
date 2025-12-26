import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  selectedFile!: File | null;
  previewUrl: string | ArrayBuffer | null = null;

  
  message: string | null = null;
  messageType: 'success' | 'error' = 'success';

  constructor(private userService: UserService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = e => this.previewUrl = reader.result;
      reader.readAsDataURL(file);
    }
  }

 uploadProfile() {
  if (!this.selectedFile) return;

  this.userService.getProfilePicture(this.selectedFile).subscribe({
    next: res => {
      console.log('Upload success', res);
      this.message = 'تم رفع الصورة بنجاح!';
      this.messageType = 'success';

     
      if (res.data && res.data.secure_url) {
          const url = res.data.secure_url;
        this.userService.updateProfileUrl(url);
        localStorage.setItem('profileUrl', url);              
      }
    },
    error: err => {
      console.error('Upload failed', err);
      this.message = 'حدث خطأ أثناء رفع الصورة.';
      this.messageType = 'error';
    }
  });
}

  }
