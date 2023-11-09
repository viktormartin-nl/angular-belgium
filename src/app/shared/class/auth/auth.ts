import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
@Injectable({ providedIn: 'root' })
export class Auth implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    try {
      JSON.parse(localStorage['loggedInUser']);
      return true;
    } catch (err) {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
