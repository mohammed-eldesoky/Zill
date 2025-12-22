import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../core/constant/base.url';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

    constructor(private httpClient: HttpClient) {}

  // ________________________________ Update Password (Login Required) ______________________________
  updatePassword(data: {
    oldPassword: string;
    newPassword: string;
  }): Observable<any> {
    return this.httpClient.put(
      `${BASE_URL.base_url}/auth/update-password`,
      data
    );
  }

  // ________________________________ Send OTP ______________________________
  sendOtp(data: {
    email: string;
  }): Observable<any> {
    return this.httpClient.put(
      `${BASE_URL.base_url}/auth/send-otp`,
      data
    );
  }

  // ________________________________ Forget Password (OTP + New Password) ______________________________
  forgetPassword(data: {
    email: string;
    otp: string;
    newPassword: string;
  }): Observable<any> {
    return this.httpClient.post(
      `${BASE_URL.base_url}/auth/forget-password`,
      data
    );
  }
}

