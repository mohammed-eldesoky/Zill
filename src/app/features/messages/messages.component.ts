import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../services/messages.service';
import { IMessage } from '../../shared/interfaces/imessages';

@Component({
  selector: 'app-messages',
  imports: [],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent implements OnInit {
  messages: IMessage[] = [];
  errMessage = '';
  constructor(private messageService: MessagesService) {}

  ngOnInit(): void {
    this.getAllMessages();
  }

  //____________________________get all messages__________________________
  getAllMessages() {
    return this.messageService.getAllMessages().subscribe({
      next: (res) => {
        console.log(res);
        if (res.success) {
          this.messages = res.data.messages;
        }
      },
      error: (err) => {
        console.log(err);
        this.errMessage = err.error?.message || 'Failed to load messages';
      },
    });
  }
}
