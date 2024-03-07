import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const id_token = localStorage.getItem('id_token');
    if (id_token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${id_token}`,
        },
      });
      console.log('request =', request);
    }

    return next.handle(request);
  }
}
