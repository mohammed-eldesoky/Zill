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

  //______________________________register__________________________
  register(data: Iauth): Observable<any> {
    return this.httpClient.post(`${BASE_URL.base_url}/auth/register`, data);
  }

  //______________________________verify__________________________
verify(data: Iauth): Observable<any>{
return this.httpClient.post(`${BASE_URL.base_url}/auth/verify-account`,data)
}

  //______________________________login__________________________
  login(data: Iauth): Observable<any> {
    return this.httpClient.post(`${BASE_URL.base_url}/auth/login`, data);
  }

  //______________________________decode__________________________

  decodeUserData() {
    const token = localStorage.getItem('token') || '';
    const decoded = jwtDecode(token);
    this.userData.next(decoded);
    console.log(this.userData);
  }
  //______________________________islogged__________________________

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token !== null && this.userData.getValue() !== null;
  }
  //______________________________logout__________________________

  logout() {
    localStorage.removeItem('token');
    this.userData.next(null);
    this.router.navigate(['/signin']);
  }
}
