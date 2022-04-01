import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Read from LS\
    console.log('HeaderInterceptor', httpRequest);
    if (!httpRequest.url.startsWith('https://tsports.tecnicslabs.com')) {
      return next.handle(httpRequest.clone());
    }

    return next.handle(
      httpRequest.clone({
        setHeaders: { Authorization: this.authenticationService.idToken },
      })
    );
  }
}
