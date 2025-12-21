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
export class SendMessageComponent {
  nickname: string | null = null;
  isLoading = false;
  successMessage = '';
  errMessage = '';

  constructor(
    private messagesService: MessagesService,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {}

  
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
    if (!this.nickname) {
      this.errMessage = 'Nickname is not available';
      return;
    }
    this.isLoading = true;
    this.successMessage = '';
    this.errMessage = '';

    const content = this.send.value.content;

    // Send the message
    this.messagesService.sendMessage(this.nickname, content).subscribe({
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
