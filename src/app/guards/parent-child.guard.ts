import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { AuthService } from '../services/auth.service';
import { AppConfig } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class ParentChildGuard implements CanActivate {
  user:any= ''
  constructor(private http: Http,private authService:AuthService, private router:Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authService.loggedIn()) {
        this.authService.getProfile().subscribe(async data =>{
          this.user= await data.user;
          this.http.get(AppConfig.getALLRolles).subscribe(res => {
            let tab = res.json()
            tab.forEach(element => {
              if (String(element._id) == String(this.user.role)) {
                if(String(element.roleName) == 'parent'){
                  this.http.get(AppConfig.getChildrensParent+this.user._id).subscribe( async res =>{
                    let result = await res.json()
                    console.log(result)
                    if(result.parent[0].children_list.length>0)
                      return true
                    else{
                      this.router.navigate(['profile/'+this.user._id+'/addchild'])
                      return false
                    }
                  })
                }
              }
            })
          });
        })
      } else {
        this.router.navigate(['/login']);
        return false;
      }
      return true
  }

}
