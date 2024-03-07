import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map, tap, catchError } from 'rxjs';
import * as moment from 'moment';
import { LoginCredentials } from 'src/models/LoginCreds';
import { SignupCredentials } from 'src/models/SignupCreds';
// reference: https://blog.angular-university.io/angular-jwt-authentication/

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_URL = 'http://localhost:8080';
  signedin$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  login(loginCredentials: LoginCredentials): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/login`, loginCredentials).pipe(
      map((res: any) => {
        console.log('res in login =', res);
        this.setSession(res);
      }),
      tap(() => this.signedin$.next(true))
    );
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.jwtBearerToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('author_id', authResult.user._id);
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

  signup(signupCredentials: SignupCredentials): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/register`, signupCredentials);
  }
}
