import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user";
import {environment} from "../../environments/environment";
import {ApiUrls} from "../model/api-urls";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpClient = inject(HttpClient);


  saveNewUser(user: User){
    let url = environment.apiUrl + ApiUrls.CreateNewUser;
    console.log('UserService', 'save new User:', user, 'url:' + url);
    return this.httpClient.put<any>(url,user);
  }
}
