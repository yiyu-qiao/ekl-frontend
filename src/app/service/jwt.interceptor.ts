import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {
    console.log("JwtInterceptor.constructor");
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = sessionStorage.getItem('login_user');
    if(token) {
      let loginUser = JSON.parse(token);
      if (loginUser && loginUser.token) {
        request = request.clone({
          setHeaders: {"Authorization": `Bearer ${loginUser.token}`}
        });
      }
    }
    return next.handle(request);
  }
}
