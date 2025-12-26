import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(NgxSpinnerService);
//req show
  loading.show();

  return next(req).pipe(finalize(() => {
    //req end
    loading.hide();
  }));
};
