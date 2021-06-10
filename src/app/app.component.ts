import { Component, OnDestroy, OnInit } from "@angular/core";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { NavigationEnd, Router } from '@angular/router'

import { AppConfig } from './config/app.config'
import { AuthService } from './services/auth.service'
import { HttpParams } from '@angular/common/http'
import { TranslateService } from '@ngx-translate/core';
import { element } from 'protractor'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'playroom'

  constructor(
    public authService: AuthService,
    private router: Router,
    public translate: TranslateService,
  ) {
    translate.addLangs(['ar', 'en', 'fr'])
    translate.setDefaultLang('en')
    const browserLang = translate.getBrowserLang()
    translate.use(browserLang)
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
  }
  ngOnInit(): void {
    //throw new Error("Method not implemented.");
  }
}
