import { Component, OnDestroy, OnInit } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'

import { AppConfig } from '../../config/app.config'
import { AuthService } from '../../services/auth.service'
import { Globals } from './../../globals'
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
  searchText:String

  constructor(
    private http: Http,
    public translate: TranslateService,
    public authService: AuthService,
    private router: Router,
    private Globals: Globals,
  ) {}

  ngOnInit(): void {
    if (this.authService.loggedIn()) {
      this.authService.getProfile().subscribe(async (profile) => {
        this.user = await profile.user
        this.http.get(AppConfig.getALLRolles).subscribe((res) => {
          let tab = res.json()
          tab.forEach((element) => {
            if (String(element._id) == String(this.user.role)) {
              if (String(element.roleName) == 'hild') {
                this.isChild = true
              } else {
                this.isParent = true
              }
            }
          })
        })
      })
    }
    console.log(this.Globals.getCountDown())
    let futureDate = this.Globals.getFutreDate()
    //this.timer(futureDate)
    // setInterval(function () {
    //   a -= 1
    //   console.log(a)
    // }, 1000)
  }

  /*timer(futureDate) {
    let date_future = new Date(new Date.getFullYear(),0,)
    let date_now = Date.now()
    let seconds = Math.floor((date_future.getTime() - date_now) / 1000)
    let minutes = Math.floor(seconds / 60)
    let hours = Math.floor(minutes / 60)
    let days = Math.floor(hours / 24)

    hours = hours - days * 24
    minutes = minutes - days * 24 * 60 - hours * 60
    seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60
    console.log("Time until new year:\nDays: " + days + " Hours: " + hours + " Minutes: " + minutes + " Seconds: " + seconds)
  }*/

  logout() {
    this.authService.logout()
    this.isParent = false
    this.isChild = false
    this.router.navigate(['/home'])
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      alert('you just pressed the enter key');
      this.search()
    }
  }

  search(){
    this.router.navigate(['search',this.searchText])
  }
}
