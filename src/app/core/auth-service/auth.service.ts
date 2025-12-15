import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { BASE_URL } from '../constant/base.url';
import { Iauth } from '../../shared/interfaces/iauth';
import { jwtDecode, JwtPayload } from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: BehaviorSubject<null | JwtPayload> =
    new BehaviorSubject<null | JwtPayload>(null);
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) Id: object
  ) {}
  //______________________________Tokens__________________________

  saveTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  clearTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
  //______________________________register__________________________
  register(data: Iauth): Observable<any> {
    return this.httpClient.post(`${BASE_URL.base_url}/auth/register`, data);
  }

  //______________________________verify__________________________
  verify(data: Iauth): Observable<any> {
    return this.httpClient.post(
      `${BASE_URL.base_url}/auth/verify-account`,
      data
    );
  }

  //______________________________login__________________________
  login(data: Iauth): Observable<any> {
    return this.httpClient.post(`${BASE_URL.base_url}/auth/login`, data);
  }

  //______________________________decode__________________________

  decodeUserData() {
    const token = this.getAccessToken();
    if (!token) return;

    const decoded = jwtDecode<JwtPayload>(token);
    this.userData.next(decoded);
  }
  //______________________________islogged__________________________

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }
  //______________________________logout__________________________
  logout() {
    this.clearTokens();
    this.userData.next(null);
    this.router.navigate(['/login']);
  }
}
