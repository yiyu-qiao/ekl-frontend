import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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
    // let url = environment.apiUrl + ApiUrls.CreateNewUser;
    console.log('UserService.saveNewUser:', user, 'url:' + ApiUrls.CreateNewUser);
    return this.httpClient.put<any>(ApiUrls.CreateNewUser,user);
  }

  login(loginRequest: LoginRequest){
    console.debug('UserService.login:',loginRequest, 'url:' + ApiUrls.Login);
    return this.httpClient.post<User>(ApiUrls.Login,loginRequest);
  }

  public usersGet(){
    let token = sessionStorage.getItem('login_user');
    if(token){
      let loginUser = JSON.parse(token);
      if(loginUser && loginUser.token){
        const header:HttpHeaders  = new HttpHeaders({
          Authorization: `Bearer ${loginUser.token}`
        });
      return this.httpClient.get<User[]>(ApiUrls.AllUser,{headers: header });
      }
    }

    // let url = environment.apiUrl + ApiUrls.AllUser;
    return this.httpClient.get<User[]>(ApiUrls.AllUser);
  }

}
