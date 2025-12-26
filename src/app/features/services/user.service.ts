import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BASE_URL } from '../../core/constant/base.url';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private profileUrlSubject = new BehaviorSubject<string | null>(null);
  profileUrl$ = this.profileUrlSubject.asObservable();
  constructor(private http: HttpClient) {}

  updateProfileUrl(url: string) {
    this.profileUrlSubject.next(url);
  }

  getProfileUrl(): string | null {
    return this.profileUrlSubject.getValue();
  }
  //_________profile picture______
  getProfilePicture(profilePicture: File): Observable<any> {
    const formData = new FormData();
    formData.append('profilePicture', profilePicture);

    return this.http.post(
      `${BASE_URL.base_url}/user/upload-profile-cloud`,
      formData
    );
  }
}
