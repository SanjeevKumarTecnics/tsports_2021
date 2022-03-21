import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userDataSubject$: BehaviorSubject<any>;
  private userIdSubject$: BehaviorSubject<any>;

  constructor(private router: Router) {
    this.userDataSubject$ = new BehaviorSubject<any>(null);
    this.userIdSubject$ = new BehaviorSubject<any>(null);
  }

  public setUserData(value: any): void {
    console.log(value);
    this.userDataSubject$.next(value);
  }

  public get userData(): any {
    return this.userDataSubject$.value;
  }

  public setUserId(userId: any): void {
    this.userIdSubject$.next(userId);
  }

  public get userId(): any {
    return this.userIdSubject$.value;
  }

  logOut() {
    this.userDataSubject$.next(null);
    this.userIdSubject$.next(null);
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  get isLoggedIn(): boolean {
    if (this.userData.authToken == null) {
      return false;
    } else {
      return true;
    }
  }
}
