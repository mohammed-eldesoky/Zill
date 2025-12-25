// import { isPlatformBrowser } from '@angular/common';
// import {
//   inject,
//   Inject,
//   Injectable,
//   PLATFORM_ID,
//   Renderer2,
//   RendererFactory2,
// } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';
// @Injectable({
//   providedIn: 'root',
// })
// export class LangService {
//   private readonly renderer2 = inject(RendererFactory2).createRenderer(
//     null,
//     null
//   );
//   constructor(
//     private translateService: TranslateService,
//     @Inject(PLATFORM_ID) private id: object
//   ) {
//     if (isPlatformBrowser(this.id)) {
//       //1- set the default lang
//       this.translateService.setFallbackLang('en');
//       //2-get the current lang>>>  localStorage
//       const savedLang = localStorage.getItem('lang');
//       //3-use the current lang
//       if (savedLang) {
//         this.translateService.use(savedLang);
//       }
//     }

import { isPlatformBrowser } from "@angular/common";
import { Inject, inject, Injectable, PLATFORM_ID, RendererFactory2 } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

//     this.changeDirction();
//   }

//   //________________dirction____________________

//   changeDirction(): void {
//     if (localStorage.getItem('lang') === 'en') {
//       this.renderer2.setAttribute(document.documentElement, 'dir', 'ltr');
//       this.renderer2.setAttribute(document.documentElement, 'lang', 'en');
//     } else if (localStorage.getItem('lang') === 'ar') {
//       this.renderer2.setAttribute(document.documentElement, 'dir', 'rtl');
//       this.renderer2.setAttribute(document.documentElement, 'lang', 'ar');
//     } //rtl
//   }

//   //change lang
//   changeLang(lang: string): void {
//     //1-save localStorage
//     localStorage.setItem('lang', lang);
//     //2-use the lang
//     this.translateService.use(lang);

//     // 3- change dirction
//     this.changeDirction();
//   }
// }
@Injectable({ providedIn: 'root' })
export class LangService {
  private renderer = inject(RendererFactory2).createRenderer(null, null);

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.translate.setFallbackLang('en');

      const savedLang = localStorage.getItem('lang') || 'en';
      this.translate.use(savedLang);

      this.updateDirection(savedLang);
    }
  }

  changeLang(lang: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    localStorage.setItem('lang', lang);
    this.translate.use(lang);
    this.updateDirection(lang);
  }

  private updateDirection(lang: string): void {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';

    this.renderer.setAttribute(document.documentElement, 'dir', dir);
    this.renderer.setAttribute(document.documentElement, 'lang', lang);
  }
}