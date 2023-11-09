import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CrudInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    try {
      const accessToken = JSON.parse(localStorage['loggedInUser']).accessToken;
      return next.handle(req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } }));
    } catch (err) {
      return next.handle(req);
    }
  }
}
