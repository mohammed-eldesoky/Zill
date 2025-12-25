import { Component } from '@angular/core';
import { LangService } from '../../../services/lang.service';

@Component({
  selector: 'app-language',
  imports: [],
  templateUrl: './language.component.html',
  styleUrl: './language.component.scss',
})
export class LanguageComponent {
  constructor(private langService: LangService) {}

  change(lang: 'en' | 'ar') {
    this.langService.changeLang(lang);
  }


}
