import { Component, OnInit } from '@angular/core'
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
  SafeScript,
  SafeStyle,
  SafeUrl,
} from '@angular/platform-browser'
import { Pipe, PipeTransform } from '@angular/core'

import { ActivatedRoute } from '@angular/router'
import { AppConfig } from '../../../config/app.config'
import { AuthService } from '../../../services/auth.service'
import { DatePipe } from '@angular/common'
import { Http } from '@angular/http'
import { Router } from '@angular/router'

@Component({
  selector: 'app-livre-details',
  templateUrl: './livre-details.component.html',
  styleUrls: ['./livre-details.component.css'],
})
export class LivreDetailsComponent implements OnInit, PipeTransform {
  user: any
  livre: any
  participated: Boolean = false
  showPDF = false
  correctAnswers: Array<any> = []
  answers: Array<any> = []
  isSuccess: Boolean = false

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
        this.filterQuizs()
        this.video(this.livre.video)
      })
  }

  putAnswer(index, resp) {
    this.answers[index] = Number(resp)
  }

  getCorrectAnswer(suggestions) {
    return suggestions.correct_answer
  }

  filterQuizs() {
    this.livre.quizs.forEach((quiz) => {
      this.correctAnswers.push(this.getCorrectAnswer(quiz))
    })
  }

  verifyQuiz() {
    let score = 0
    for (let index = 0; index < this.correctAnswers.length; index++) {
      this.correctAnswers[index] == this.answers[index] ? score++ : score--
    }
    if (score < 0) {
      alert('Next time sorry !')
    } else {
      alert('Yes, your are genius !')
      this.http.post(AppConfig.addPoints, { id_user: this.user._id, point_fidelite: 20 }).subscribe((data) => {
        if (data.json().success)
          this.router.navigate(['/listlivre'])
        else console.log('no add')
      })
    }
  }

  video(urlYTB) {
    return this._sanitizer.bypassSecurityTrustUrl(urlYTB)
  }

  showPDFbtn() {
    this.showPDF = !this.showPDF
  }

  constructor(
    private http: Http,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private datepipe: DatePipe,
    private router: Router,
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

  async ngOnInit() {
    if (this.authService.loggedIn()) {
      this.authService.getProfile().subscribe(async (profile) => {
        this.user = await profile.user
      })
    }
    let idBook = this.activatedRoute.snapshot.params.id
    await this.loadLivre(idBook)
  }
}
