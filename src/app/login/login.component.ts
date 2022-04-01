import { Component, OnInit } from '@angular/core';
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';
import { UserModel } from '../dataModels.model';
import { ApiService } from '../Services/api.service';
import { AuthenticationService } from '../Services/authentication.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: any;
  user1: UserModel = new UserModel();
  constructor(
    private authService: SocialAuthService,
    private router: Router,
    private apiService: ApiService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.authenticationService
      .getAuthenticatedState()
      .subscribe((socialUser: UserModel) => {
        this.moveToTeams();
      });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  moveToTeams(): void {
    this.router.navigate(['/fantacy-team']);
  }
}
