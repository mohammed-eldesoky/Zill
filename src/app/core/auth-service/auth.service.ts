import { jwtDecode, JwtPayload } from 'jwt-decode';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { BASE_URL } from '../constant/base.url';
import { Iauth } from '../../shared/interfaces/iauth';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) {}

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

  //______________________________refresh__________________________
  refreshAccessToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return throwError(() => new Error('No refresh token'));

    return this.httpClient.post(
      `${BASE_URL.base_url}/auth/refresh`,
      {},
      { headers: { refreshtoken: refreshToken } }
    );
  }

  //______________________________decode__________________________
  decodeUserData() {
    const token = this.getAccessToken();
    if (!token) return;

    const decoded = jwtDecode<JwtPayload>(token);
    localStorage.setItem('userData', JSON.stringify(decoded));
    // this.userData.set(decoded);
  }

  getUserData() {
    return JSON.parse(localStorage.getItem('userData') || '{}');
  }
  //______________________________islogged__________________________
  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  //______________________________logout__________________________
  logout() {
    this.clearTokens();
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }
}
