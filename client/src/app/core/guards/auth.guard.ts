import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  token: string | null = localStorage.getItem('token')
  constructor(private userService: UserService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const { authenticationRequired, onlyGuest } = route.data;
    if (authenticationRequired == true && this.userService.user) {
      return true
    } else if (onlyGuest == true && !this.userService.user) {
      return true
    }else {
      return this.router.parseUrl('/asd')
    }

  }

}
