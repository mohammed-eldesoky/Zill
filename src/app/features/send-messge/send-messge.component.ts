import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MessagesService } from '../services/messages.service';
import { AuthService } from '../../core/auth-service/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-send-message',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './send-messge.component.html',
  styleUrl: './send-messge.component.scss',
})
export class SendMessageComponent implements OnInit {
  nickName: string | null = null;
  isLoading = false;
  successMessage = '';
  errMessage = '';
  shareLink = '';
  showShareLink = false;
  constructor(
    private messagesService: MessagesService,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.nickName = params.get('nickName');
      console.log('Nickname from URL:', this.nickName);

      if (this.nickName) {
        this.shareLink = `${window.location.origin}/app/send/${this.nickName}`;

        const currentUser = this.auth.getUserData();

        this.showShareLink =
          !!currentUser && currentUser.nickName === this.nickName;
      }
    });
  }
  copyLink() {
    if (!this.shareLink) return;

    navigator.clipboard.writeText(this.shareLink).then(() => {
      this.successMessage = 'Link copied successfully!';
      setTimeout(() => (this.successMessage = ''), 2000);
    });
  }
  //______________________________send form__________________________
  send: FormGroup = new FormGroup({
    content: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  // ______________________________Submit form__________________________
  submit() {
    if (this.send.invalid) {
      this.send.markAllAsTouched();
      return;
    }
    if (!this.nickName) {
      this.errMessage = 'Nickname is not available';
      return;
    }
    this.isLoading = true;
    this.successMessage = '';
    this.errMessage = '';

    const content = this.send.value.content;

    // Send the message
    this.messagesService.sendMessage(this.nickName, content).subscribe({
      next: (res) => {
        console.log('Message sent successfully', res);
        this.isLoading = false;
        this.successMessage = 'Message sent successfully!';
        this.send.reset(); // Reset the form
      },
      error: (err) => {
        this.isLoading = false;
        this.errMessage = err.error?.message || 'Something went wrong';
        console.error('Error sending message', err);
      },
    });
  }
}
