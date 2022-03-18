import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from './Services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class HomeGaurd implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}
  canActivate(
    _next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const currentUserData = this.authenticationService.userData;
    if (currentUserData?.authToken == null) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
