import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { AuthService } from '../services/auth.service';
import { AppConfig } from '../config/app.config';


@Injectable()
export class IsTeacherGuard implements CanActivate {
  user:any= ''
  constructor(private http: Http,private authService:AuthService, private router:Router){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.loggedIn()) {
      this.authService.getProfile().subscribe(data =>{
        this.user= data.user;
        this.http.get(AppConfig.getALLRolles).subscribe(res => {
          let tab = res.json()
          tab.forEach(element => {
            if (String(element._id) == String(this.user.role)) {
              if(String(element.roleName) == 'teacher')
                return true;
              else{
                this.router.navigate(['/']);
                return false;
              }
            }
          })
        });
      })
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
