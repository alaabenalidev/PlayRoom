import { Injectable } from '@angular/core'
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from '../services/auth.service'
import { Location } from '@angular/common'

@Injectable({
  providedIn: 'root',
})
export class AuthLoginRegisterGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private _location: Location,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.loggedIn()) {
      this.router.navigate(['home'])
      return false
    } else {
      return true
    }
  }
}
