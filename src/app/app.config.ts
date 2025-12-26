
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { provideTranslateService, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { loadingInterceptor } from './core/interceptors/loading';
import { NgxSpinnerModule } from "ngx-spinner";


export const appConfig: ApplicationConfig = {
  providers: [
   provideHttpClient(withFetch(), withInterceptors([authInterceptor, loadingInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
   provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json'
      }),
      fallbackLang: 'en',
      lang: 'en'
    }),
    importProvidersFrom(NgxSpinnerModule),

  ],
};

