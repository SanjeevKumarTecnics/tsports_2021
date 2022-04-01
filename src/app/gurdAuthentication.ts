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
    if (!this.authenticationService.isAuthenticated) {
      alert('Session expired, please login again.');
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url },
      });
    }
    return true;
  }
}
