import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map, tap, catchError } from 'rxjs';
import * as moment from 'moment';
import { LoginCredentials } from 'src/models/LoginCreds';
import { SignupCredentials } from 'src/models/SignupCreds';
import { LoginResponse } from 'src/models/LoginResponse';
// reference: https://blog.angular-university.io/angular-jwt-authentication/

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_URL = 'http://localhost:8081';
  signedin$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  email$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private http: HttpClient) {}

  login(loginCredentials: LoginCredentials): Observable<any> {
    let email: string;
    return this.http.post(`${this.API_URL}/auth/login`, loginCredentials).pipe(
      map((res: any) => {
        email = res.email;
        this.setSession(res);
      }),
      tap(() => this.signedin$.next(true)),
      tap(() => this.email$.next(email))
      );
    }
    
    signup(signupCredentials: SignupCredentials): Observable<any> {
      let email: string;
      return this.http
      .post(`${this.API_URL}/auth/register`, signupCredentials)
      .pipe(
        map((res: any) => {
          email = res.email;
          this.setSession(res);
        }),
        tap(() => this.signedin$.next(true)),
        tap(() => this.email$.next(email))
      );
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.jwtBearerToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('author_id', authResult._id);
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('author_id');
    this.signedin$.next(false);
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  getCurrentUser(){
    const userId = localStorage.getItem('author_id')
    return this.http.get<any>(`${this.API_URL}/auth/current_user/${userId}`)
  }
}
