import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { UserModel } from '../dataModels.model';
import { ApiService } from '../Services/api.service';
import { AuthenticationService } from '../Services/authentication.service';

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
    const userEmail = sessionStorage.getItem('email');
    if (userEmail != null) {
      this.user1.authToken = sessionStorage.getItem('authToken');
      this.user1.email = sessionStorage.getItem('email');
      this.user1.name = sessionStorage.getItem('name');
      this.user1.photoUrl = sessionStorage.getItem('photoUrl');
      this.authenticationService.setUserData(this.user1);
      // console.log(this.user1)
    }
    if (this.authenticationService.userData?.email) {
      this.fetchUserEmail(this.authenticationService.userData?.email);
    }
  }

  logIn(): void {
    try {
      this.authService.authState.subscribe((user: any) => {
        this.user = user;
        if (user != null) {
          this.user1.authToken = user.authToken;
          this.user1.email = user.email;
          this.user1.firstName = user.firstName;
          this.user1.id = user.id;
          this.user1.idToken = user.idToken;
          this.user1.name = user.name;
          this.user1.photoUrl = user.photoUrl;
          this.authenticationService.setUserData(this.user1);
          sessionStorage.setItem('authToken', user.authToken);
          sessionStorage.setItem('email', user.email);
          sessionStorage.setItem('name', user.name);
          sessionStorage.setItem('photoUrl', user.photoUrl);
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
        // console.log(userId);
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
