import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../services/messages.service';
import { IMessage } from '../../shared/interfaces/imessages';
import { FormatDatePipe } from '../../shared/pipes/format-date.pipe';

@Component({
  selector: 'app-messages',
  imports: [FormatDatePipe],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent implements OnInit {
  messages: IMessage[] = [];
  errMessage = '';
  currentPage = 1;
  pageSize = 5;
  totalPages = 0;
  paginatedMessages: IMessage[] = [];
  isLoading = true;
  constructor(private messageService: MessagesService) {}

  ngOnInit(): void {
    this.getAllMessages();
  }

updatePagination() {
  const start = (this.currentPage - 1) * this.pageSize;
  const end = start + this.pageSize;
  this.paginatedMessages = this.messages.slice(start, end);
}

goToPage(page: number) {
  if (page < 1 || page > this.totalPages) return;
  this.currentPage = page;
  this.updatePagination();
}

nextPage() {
  this.goToPage(this.currentPage + 1);
}

prevPage() {
  this.goToPage(this.currentPage - 1);
}

  //____________________________get all messages__________________________
  getAllMessages() {
    return this.messageService.getAllMessages().subscribe({
      next: (res) => {
        console.log(res);
        if (res.success) {
          this.messages = res.data.messages.reverse();
            this.totalPages = Math.ceil(this.messages.length / this.pageSize);
  this.updatePagination();
        }
        this.isLoading = false; 
      },
      error: (err) => {
        console.log(err);
        this.errMessage = err.error?.message || 'Failed to load messages';
      },
    });
  }
}
