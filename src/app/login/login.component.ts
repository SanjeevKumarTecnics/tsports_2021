import { Component, OnInit,NgModule  } from '@angular/core';
// import { SocialAuthService } from "angularx-social-login";
// import { SocialUser } from "angularx-social-login";
// import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {ApiService} from '../Services/api.service';
// import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user:any;
  loggedIn:boolean = false;
  
  constructor(
    // private authService: SocialAuthService, 
    private storage:LocalStorageService,
    private router:Router,
    private apiService:ApiService) { }

  ngOnInit(): void {
    // for local storage
    if(this.storage.retrieve('isLogedIn') == true){
      this.router.navigate(['/fantacy-team']);  
    }
    
    // else{
    //   this.authService.authState.subscribe((user:any) => {
    //     this.user = user;
    //     this.loggedIn = (user != null);
    //      // sotring locally
    //     this.storage.store('isLogedIn', true);

    //     // for instant movement
    //     if(this.loggedIn == true){
    //       this.router.navigate(['/fantacy-team']);
    //       this.storage.store('userPhoto',user.photoUrl);
    //       this.storage.store('email',user.email);
    //       this.apiService.userPhoto = user.photoUrl;
    //       this.apiService.userEmail = user.photoUrl;
    //       this.apiService.getUserIdByMail(user.email).then(res => {
    //         var userId = res.id;
    //         this.storage.store('userId',userId);
    //         this.apiService.userId = userId;
    //         if(!userId){
    //           alert("your not autorised person,please contact admin");
    //           this.apiService.signOut();
    //         }
    //       });
    //     }else{
    //       this.router.navigate(['/login']);
    //     } 
    //   });
    // }

  }
  signInWithGoogle(emailid:string): void {
    // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    if(emailid.trim() != ''){

      this.apiService.getUserIdByMail(emailid).then(res => {
        var userId = res.id;
        this.storage.store('userId',userId);
        this.apiService.userId = userId;
        if(!userId){
          alert("your not autorised person,please contact admin");
          this.apiService.signOut();
        }else{
          this.storage.store('isLogedIn', true);
          this.storage.store('email',emailid);
          this.router.navigate(['/fantacy-team']);
        }
      });
    }
  }
}
