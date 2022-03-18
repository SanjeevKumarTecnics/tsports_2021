import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { ApiService } from '../Services/api.service';
import { AuthenticationService } from '../Services/authentication.service';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss'],
})
export class SignoutComponent implements OnInit {
  userPhoto: any;

  userEamil: any;

  constructor(
    private authService: SocialAuthService,
    private storage: LocalStorageService,
    private router: Router,
    private apiService: ApiService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    // this.userPhoto = (this.storage.retrieve('userPhoto'))?(this.storage.retrieve('userPhoto')):this.apiService.userPhoto;
    // this.userEamil = (this.storage.retrieve('userPhoto'))?(this.storage.retrieve('email')):this.apiService.userEmail;
    this.userPhoto = this.authenticationService.userData.photoUrl;
    this.userEamil = this.authenticationService.userData.email;
  }

  signOut(): void {
    this.apiService.signOut();
  }
}
