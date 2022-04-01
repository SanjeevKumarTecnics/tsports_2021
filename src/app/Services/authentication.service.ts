import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, windowWhen } from 'rxjs/operators';
import { UserModel } from '../dataModels.model';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userDataSubject$: BehaviorSubject<any>;
  private userIdSubject$: BehaviorSubject<UserModel>;
  private authenticated$: BehaviorSubject<boolean>;
  private idToken$: BehaviorSubject<string>;

  constructor(private router: Router, private authService: SocialAuthService) {
    this.userDataSubject$ = new BehaviorSubject<any>(null);
    this.userIdSubject$ = new BehaviorSubject<any>(null);
    this.authenticated$ = new BehaviorSubject<boolean>(false);
    this.idToken$ = new BehaviorSubject<string>('');
    this.getTokenFromStorage();
    this.authService.authState.subscribe((socialUser: SocialUser) => {
      this.processIDPResponse(socialUser);
    });
  }

  public getAuthenticatedState(): BehaviorSubject<UserModel> {
    return this.userIdSubject$;
  }

  private getTokenFromStorage(): void {
    const authUserJSON = window.localStorage.getItem('tsports-auth-user');
    const idToken = window.localStorage.getItem('tsports-auth-idtoken');
    if (authUserJSON != null) {
      this.userIdSubject$.next(JSON.parse(authUserJSON));
      this.userDataSubject$.next(JSON.parse(authUserJSON));

      this.authenticated$.next(true);
    }
    if (idToken != null) {
      this.idToken$.next(idToken);
    }
  }

  private processIDPResponse(socialUser: SocialUser): void {
    this.idToken$.next(socialUser.idToken);
    const user = new UserModel();
    user.email = socialUser.email;
    user.firstName = socialUser.firstName;
    this.userIdSubject$.next(user);
    this.userDataSubject$.next(user);
    this.authenticated$.next(true);
    window.localStorage.setItem('tsports-auth-user', JSON.stringify(user));
    window.localStorage.setItem('tsports-auth-idtoken', socialUser.idToken);
  }

  public setUserData(value: any): void {
    this.userDataSubject$.next(value);
  }

  public(value: any): void {
    this.userDataSubject$.next(value);
  }

  public get userData(): any {
    return this.userDataSubject$.value;
  }

  public get isAuthenticated(): boolean {
    return this.authenticated$.value;
  }

  public get idToken(): string {
    return this.idToken$.value;
  }

  public setUserId(userId: any): void {
    this.userIdSubject$.next(userId);
  }

  public get userId(): any {
    return this.userIdSubject$.value;
  }

  public isTokenExpired(): boolean {
    if (this.authenticated$.value !== true) {
      return true;
    }
    const decodedToken: any = jwt_decode(this.idToken$.value);
    const currentDate = new Date();
    const tokenExpDate = new Date(0);
    tokenExpDate.setUTCSeconds(decodedToken.exp);
    if (tokenExpDate < currentDate) {
      return true;
    }
    return false;
  }

  logOut(): void {
    window.localStorage.clear();
    this.authenticated$.next(false);
    this.router.navigate(['/']);
  }

  login(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  // fetchUserEmail(emailId: string): void {
  //   this.apiService.getUserIdByMail(emailId).then((res) => {
  //     var userId = res.id;
  //     this.authenticationService.setUserId(userId);
  //     if (userId) {
  //       // console.log(userId);
  //       this.router.navigate(['/fantacy-team']);
  //     } else {
  //       alert('your not autorised person,please contact admin');
  //       this.apiService.signOut();
  //     }
  //   });
  // }

  get isLoggedIn(): boolean {
    if (this.userData.authToken == null) {
      return false;
    } else {
      return true;
    }
  }
}
