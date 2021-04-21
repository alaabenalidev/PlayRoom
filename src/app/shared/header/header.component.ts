import { Component, OnDestroy, OnInit } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'

import { AppConfig } from '../../config/app.config'
import { AuthService } from '../../services/auth.service'
import { Http } from '@angular/http'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: any
  isParent: boolean = false
  isChild: boolean = false

  constructor(
    private http: Http,
    public authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (this.authService.loggedIn()) {
      this.authService.getProfile().subscribe(async (profile) => {
        this.user = await profile.user
        console.log(this.user)
        this.http.get(AppConfig.getALLRolles).subscribe((res) => {
          let tab = res.json()
          tab.forEach((element) => {
            if (String(element._id) == String(this.user.role)) {
              if (String(element.roleName) == 'child') {
                this.isChild = true
              } else {
                this.isParent = true
              }
            }
          })
        })
      })
    }
  }

  logout() {
    this.authService.logout()
    this.isParent=false;
    this.isChild=false;
    this.router.navigate(['/home']);
  }
}
