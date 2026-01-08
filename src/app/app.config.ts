import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors} from "@angular/common/http";
import {JwtInterceptor} from "./service/jwt.interceptor";
import {authInterceptor} from "./service/auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true },
    provideRouter(routes),
    provideHttpClient(),provideHttpClient(
      // Hier werden funktionale Interceptoren einfach als Liste übergeben
      withInterceptors([authInterceptor])
    )
  ]
};
