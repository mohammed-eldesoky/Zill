import {
  HttpInterceptorFn,
  HttpErrorResponse,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../auth-service/auth.service';

let isRefreshing = false;
const refreshSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const accessToken = authService.getAccessToken();

  console.log('[Interceptor] Request URL:', req.url);
  console.log('[Interceptor] Access token:', accessToken);

  const authReq = accessToken
    ? req.clone({ setHeaders: { Authorization: accessToken } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('[Interceptor] Caught error', error.status, error.url);

      if (
        (error.status === 401 || error.status === 500) &&
        !req.url.includes('/auth/login') &&
        !req.url.includes('/auth/refresh')
      ) {
        if (isRefreshing) {
          console.log('[Interceptor] Refresh already in progress, waiting...');
          return refreshSubject.pipe(
            filter((token) => token !== null),
            take(1),
            switchMap((token) => {
              console.log('[Interceptor] Got new token, retrying request');
              return next(req.clone({ setHeaders: { Authorization: token! } }));
            })
          );
        }

        console.log('[Interceptor] Starting token refresh...');
        isRefreshing = true;
        refreshSubject.next(null);

        return authService.refreshAccessToken().pipe(
          switchMap((res: any) => {
            const { accessToken, refreshToken } = res.data;
            console.log(
              '[Interceptor] Refresh successful:',
              accessToken,
              refreshToken
            );

            authService.saveTokens(accessToken, refreshToken);
            isRefreshing = false;
            refreshSubject.next(accessToken);

            console.log(
              '[Interceptor] Retrying original request with new token'
            );
            return next(
              req.clone({ setHeaders: { Authorization: accessToken } })
            );
          }),
          catchError((err) => {
            console.log('[Interceptor] Refresh failed, logging out', err);
            isRefreshing = false;
            authService.logout();
            return throwError(() => err);
          })
        );
      }

      console.log('[Interceptor] Non-token error, passing through', error);
      return throwError(() => error);
    })
  );
};
