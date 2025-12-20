
import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from '../auth-service/auth.service';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const token = authService.getAccessToken();

  // clone  && Authorization header
  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: { Authorization:token },
    });
  }

  return next(authReq).pipe(
    tap((event) => {
      // refresh endpoint
      if (
        event instanceof HttpResponse &&
        (event.body as any)?.message === 'refresh token successfully'
      ) {
        const { accessToken, refreshToken } = (event.body as any).data;
        authService.saveTokens(accessToken, refreshToken);
      }
    })
  );
};
