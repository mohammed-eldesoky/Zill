import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LangService } from './features/services/lang.service';
import { NgxSpinnerComponent } from 'ngx-spinner';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule,NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Zill';
   
  constructor(private langService: LangService) {}
  ngOnInit(): void {
  }
}
