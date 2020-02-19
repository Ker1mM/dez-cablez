import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ASTWithSource } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (route.data.isLoggedIn === undefined) {
      if (!this.auth.isLoggedIn()) {
        this.router.navigate(['login'], { queryParams: { return: state.url } })
        return false;
      }
      return true;
    } else {
      if (this.auth.isLoggedIn() === route.data.isLoggedIn) {
        return true;
      }

      this.router.navigate(['']);
      return false;
    }
  }
}
