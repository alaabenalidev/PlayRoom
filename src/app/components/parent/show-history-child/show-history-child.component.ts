import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'

import { AppConfig } from '../../../config/app.config'
import { AuthService } from 'src/app/services/auth.service'
import { DatePipe } from '@angular/common'
import { Http } from '@angular/http'

@Component({
  selector: 'app-show-history-child',
  templateUrl: './show-history-child.component.html',
  styleUrls: ['./show-history-child.component.css'],
})
export class ShowHistoryChildComponent implements OnInit {
  list_livre = []
  list_challenges: Array<any> = []
  childId: string

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: Http,
    private datepipe: DatePipe,
  ) {
    this.childId = this.activatedRoute.snapshot.paramMap.get('idChild')
  }

  async loadLivres(childId) {
    await this.http
      .get(AppConfig.getLivreByUserId + childId)
      .subscribe((data) => {
        let res = data.json()
        res.livre.forEach(async (livre) => {
          let createdAt = await this.datepipe.transform(
            livre.createdAt,
            'dd MMMM, yyyy',
          )
          this.list_livre.push({
            id: livre._id,
            title: livre.title,
            auteur: livre.auteur,
            createdAt: createdAt,
            language: livre.language,
          })
        })
      })
  }

  loadChallenge(childId) {
    this.http
      .get(AppConfig.getChallengeParticipationChild + childId)
      .subscribe(async (data) => {
        data.json().challenges.forEach(async (element) => {
          let challenge = element
          challenge.createdAt = await this.datepipe.transform(
            challenge.createdAt,
            'dd MMMM, yyyy',
          )
          challenge.date_fin = await this.datepipe.transform(
            challenge.date_fin,
            'dd MMMM, yyyy',
          )
          let date_commit
          let book
          await challenge.list_livre.forEach(async (element) => {
            if (element._id_user == childId) {
              date_commit = element.date_commit
              book = await this.loadTitleBook(await element._id_livre)
              console.log(book)
            }
          })
          challenge.date_commit = await this.datepipe.transform(
            date_commit,
            'dd MMMM, yyyy',
          )
          //console.log(book)
          challenge.titleBook = book
          this.list_challenges.push(challenge)
        })
      })
  }
  async loadTitleBook(idLivre): Promise<string> {
    let bookTitle
    await this.http
      .get(AppConfig.getLivreById + idLivre)
      .subscribe(async (data) => {
        let res = await data.json()
        bookTitle = res.book.title
      })
      console.log(bookTitle)
    return bookTitle
  }

  async ngOnInit() {
    await this.loadLivres(this.childId)
    await this.loadChallenge(this.childId)
    console.log(this.list_challenges)
  }
}
