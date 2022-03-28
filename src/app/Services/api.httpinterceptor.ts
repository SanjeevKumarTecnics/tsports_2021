import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // Read from LS
    const ID_TOKEN_OBJ: any = localStorage.getItem('idToken');
    const ID_TOKEN = JSON.parse(ID_TOKEN_OBJ)
    const currentDateAndTime = Math.floor((new Date).getTime() / 1000)
    const tokenExpired =  currentDateAndTime >= ID_TOKEN.expire_at;
    console.log("ID_TOKEN", currentDateAndTime,tokenExpired);
    // tokenExpired ? alert("pls login again") : '';
    
    tokenExpired ? localStorage.setItem('tokenExpired', 'true') : localStorage.setItem('tokenExpired', 'false');

    
    return next.handle(httpRequest.clone({ setHeaders: { "Authorization": ID_TOKEN.token } }));
  }
}