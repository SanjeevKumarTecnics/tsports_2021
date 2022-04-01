import { Injectable } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { UserModel } from '../dataModels.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user = new UserModel();
  private token = '';
  private isLoggedIn = false;

  constructor(private authService: SocialAuthService) {
    this.authService.authState.subscribe((socialUser: SocialUser) => {
      this.token = socialUser.authToken;
      const user = new UserModel();
      user.email = socialUser.email;
      user.firstName = socialUser.firstName;
      this.user = user;
    });
    this.isLoggedIn = true;
  }

  public getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  public getUser(): UserModel {
    return this.user;
  }

  public getToken(): string {
    return this.token;
  }
}
