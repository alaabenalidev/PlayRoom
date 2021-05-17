import { Component, OnInit } from '@angular/core'
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
  SafeScript,
  SafeStyle,
  SafeUrl,
} from '@angular/platform-browser'
import { Pipe, PipeTransform } from '@angular/core';

import { ActivatedRoute } from '@angular/router'
import { AppConfig } from '../../../config/app.config'
import { AuthService } from '../../../services/auth.service'
import { DatePipe } from '@angular/common'
import { Http } from '@angular/http'

@Component({
  selector: 'app-livre-details',
  templateUrl: './livre-details.component.html',
  styleUrls: ['./livre-details.component.css'],
})
export class LivreDetailsComponent implements OnInit,PipeTransform {
  user: any
  list_livre: Array<any> = []
  book: String = ''
  livre: any
  participated: Boolean = false

  async loadLivre(idLivre) {
    await this.http
      .get(AppConfig.getLivreById + idLivre)
      .subscribe(async (data) => {
        let res = data.json()
        this.livre = res.book
        let createdAt = await this.datepipe.transform(
          this.livre.createdAt,
          'dd MMMM, yyyy',
        )
        this.livre.createdAt = await createdAt
        this.video(this.livre.video)
      })
  }

  video(urlYTB) {
    return this._sanitizer.bypassSecurityTrustUrl(urlYTB)
  }
  constructor(
    private http: Http,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private datepipe: DatePipe,
    protected _sanitizer: DomSanitizer,
  ) {}

  transform(
    value: string,
    type: string,
  ): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
      case 'html':
        return this._sanitizer.bypassSecurityTrustHtml(value)
      case 'style':
        return this._sanitizer.bypassSecurityTrustStyle(value)
      case 'script':
        return this._sanitizer.bypassSecurityTrustScript(value)
      case 'url':
        return this._sanitizer.bypassSecurityTrustUrl(value)
      case 'resourceUrl':
        return this._sanitizer.bypassSecurityTrustResourceUrl(value)
      default:
        return this._sanitizer.bypassSecurityTrustHtml(value)
    }
  }

  ngOnInit(): void {
    let idBook = this.activatedRoute.snapshot.params.id
    this.loadLivre(idBook)
  }
}
