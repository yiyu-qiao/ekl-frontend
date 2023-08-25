import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HTTP_INTERCEPTORS, provideHttpClient} from "@angular/common/http";
import {JwtInterceptor} from "./service/jwt.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true },
    provideRouter(routes),
    provideHttpClient(),
  ]
};
