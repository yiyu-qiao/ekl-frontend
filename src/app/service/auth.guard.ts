import {CanActivateFn} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from './auth.service';
import {map} from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  return authService.canActivate().pipe(
    map(isAuthenticated => {
      if (!isAuthenticated) {
        authService.handleUnauthorized(state.url);
        return false;
      }
      return true;
    })
  );
};
