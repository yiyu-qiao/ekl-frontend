import {computed, inject, Injectable, signal} from '@angular/core';
import {catchError, map, Observable, of, tap} from "rxjs";
import {User} from "../model/user";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private userSignal = signal<User | null>(null);

  user = this.userSignal.asReadonly();
  isAuthenticated = computed(() => this.user() !== null);

  constructor() {
    this.initializeAuth();
  }

  private initializeAuth(): void {
    this.checkAuthStatus().subscribe();
  }

  loginWithOAuth2(redirectUrl?: string): void {
    const url = redirectUrl || window.location.pathname;
    window.location.href = `${environment.apiUrl}/oauth2/authorization/authcode?redirectUrl=${encodeURIComponent(url)}`;
  }

  loginWithCredentials(username: string, password: string): Observable<User> {
    return this.http.post<User>('/api/auth/login', { username, password }).pipe(
      tap(user => this.userSignal.set(user)),
      tap(() => this.router.navigate(['/dashboard']))
    );
  }

  loginWithCertificate(): void {
    window.location.href = '/api/auth/certificate';
  }

  private checkAuthStatus(): Observable<boolean> {
    return this.http.get<User>('/api/auth/user').pipe(
      map(user => {
        this.userSignal.set(user);
        return true;
      }),
      catchError(error => {
        if (error.status === 401) {
          this.userSignal.set(null);
        }
        return of(false);
      })
    );
  }

  private handleRedirectUrl(): void {
    const redirectUrl = sessionStorage.getItem('redirectUrl');
    if (redirectUrl) {
      sessionStorage.removeItem('redirectUrl');
      this.router.navigateByUrl(redirectUrl);
    }
  }


  logout(): Observable<void> {
    return this.http.post<void>('/api/auth/logout', {}).pipe(
      tap(() => {
        this.userSignal.set(null);
        this.router.navigate(['/login']);
      }),
      catchError(() => {
        // Auch bei Fehler lokal ausloggen
        this.userSignal.set(null);
        this.router.navigate(['/login']);
        return of(void 0);
      })
    );
  }

  canActivate(): Observable<boolean> {
    if (this.isAuthenticated()) {
      return of(true);
    }

    return this.checkAuthStatus();
  }

  handleUnauthorized(redirectUrl?: string): void {
    this.userSignal.set(null);
    this.redirectToLogin(redirectUrl);
  }

  private redirectToLogin(redirectUrl?: string): void {
    if (redirectUrl) {
      sessionStorage.setItem('redirectUrl', redirectUrl);
    }
    const modal = document.getElementById('loginModal');
    if (modal) {
      const bsModal = new (window as any).bootstrap.Modal(modal);
      bsModal.show();
    }
  }
}
