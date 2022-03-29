import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { UserModel } from '../dataModels.model';
import { ApiService } from '../Services/api.service';
import { AuthenticationService } from '../Services/authentication.service';
import jwt_decode from "jwt-decode";

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
    const userEmail = localStorage.getItem('email');
    if (userEmail != null) {
      this.user1.authToken = localStorage.getItem('authToken');
      this.user1.email = localStorage.getItem('email');
      this.user1.name = localStorage.getItem('name');
      this.user1.photoUrl = localStorage.getItem('photoUrl');
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
          console.log("user", JSON.stringify(user));
          this.user1.authToken = user.authToken;
          this.user1.email = user.email;
          this.user1.firstName = user.firstName;
          this.user1.id = user.id;
          this.user1.idToken = user.idToken;
          this.user1.name = user.name;
          this.user1.photoUrl = user.photoUrl;
          this.authenticationService.setUserData(this.user1);
          const decodedToken: any = jwt_decode(user.idToken);
          const idTokenObj = JSON.stringify({'token': user.idToken, 'expire_at': decodedToken.exp});
          localStorage.setItem('authToken', user.authToken);
          localStorage.setItem('email', user.email);
          localStorage.setItem('name', user.name);
          localStorage.setItem('photoUrl', user.photoUrl);
          localStorage.setItem('idToken',idTokenObj);
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
