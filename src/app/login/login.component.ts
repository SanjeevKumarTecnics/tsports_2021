import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../Services/api.service';
import { AuthenticationService } from '../Services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: any;
  loggedIn: boolean = false;

  constructor(
    private authService: SocialAuthService,
    private storage: LocalStorageService,
    private router: Router,
    private apiService: ApiService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    if (this.authenticationService.userData?.email) {
      this.fetchUserEmail(this.authenticationService.userData?.email);
    }
  }

  logIn() {
    try {
      this.authService.authState.subscribe((user: any) => {
        this.user = user;
        if (user != null) {
          this.authenticationService.setUserData(user);
          if (user.authToken != null && user.email != null) {
            this.fetchUserEmail(user.email);
            return;
          } else {
            alert('User Id Not Found');
            return;
          }
        }
      });
    } catch {
      alert('Faild to Authenticate with Google');
    }
  }

  fetchUserEmail(emailId: string) {
    this.apiService.getUserIdByMail(emailId).then((res) => {
      var userId = res.id;
      this.authenticationService.setUserId(userId);
      if (userId) {
        console.log(userId);
        this.router.navigate(['/fantacy-team']);
      } else {
        alert('your not autorised person,please contact admin');
        this.apiService.signOut();
      }
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.logIn();
  }
}
