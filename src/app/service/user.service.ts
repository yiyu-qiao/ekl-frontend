import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user";
import {environment} from "../../environments/environment";
import {ApiUrls} from "../model/api-urls";
import {LoginRequest} from "../model/login-request";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpClient = inject(HttpClient);


  saveNewUser(user: User){
    let url = environment.apiUrl + ApiUrls.CreateNewUser;
    console.log('UserService.saveNewUser:', user, 'url:' + url);
    return this.httpClient.put<any>(url,user);
  }

  login(loginRequest: LoginRequest){
    let url = environment.apiUrl + ApiUrls.Login;
    console.debug('UserService.login:',loginRequest, 'url:' + url);
    return this.httpClient.post<User>(url,loginRequest);
  }
}
