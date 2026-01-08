import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Die Logik bleibt gleich
        globalThis.location.href = '/oauth2/authorization/authcode';
      }
      return throwError(() => error);
    })
  );
};
