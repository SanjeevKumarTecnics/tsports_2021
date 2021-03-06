import { Component, OnInit } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { AuthenticationService } from './Services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  constructor(
    private storage: LocalStorageService,
    private router: Router,
    private authService: SocialAuthService,
    private authenticationSrvice: AuthenticationService
  ) {}

  //loggedIn: any = this.authenticationSrvice.userData?.authToken;

  ngOnInit(): void {
    // if (this.loggedIn == null) {
    //   this.router.navigate(['/login']);
    // }
  }
}
