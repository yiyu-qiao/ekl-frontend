import {computed, inject, Injectable, signal} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, tap} from "rxjs";
import {User} from "../model/user";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

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

  loginWithOAuth2(): void {
    window.location.href = '/oauth2/authorization/authcode';
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
      catchError(() => {
        this.userSignal.set(null);
        return of(false);
      })
    );
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

    return this.checkAuthStatus().pipe(
      tap(isAuth => !isAuth && this.redirectToLogin())
    );
  }

  handleUnauthorized(): void {
    this.userSignal.set(null);
    this.redirectToLogin();
  }

  private redirectToLogin(): void {
    this.router.navigate(['/login']);
  }
}
