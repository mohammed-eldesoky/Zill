import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../core/constant/base.url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private httpClient:HttpClient) { }


//get all messages
  getAllMessages():Observable<any>{
    return this.httpClient.get(`${BASE_URL.base_url}/message/`);
  }

}
