import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'

import { AppConfig } from '../../../config/app.config'
import { AuthService } from 'src/app/services/auth.service'
import { DatePipe } from '@angular/common'
import { Http } from '@angular/http'
import { NgxSpinnerService } from 'ngx-spinner'

@Component({
  selector: 'app-listlivre',
  templateUrl: './listlivre.component.html',
  styleUrls: ['./listlivre.component.css'],
})
export class ListlivreComponent implements OnInit {
  async loadLivres(idUser) {
    await this.http
      .get(AppConfig.getLivreByUserId + idUser)
      .subscribe((data) => {
        let res = data.json()
        console.log(res)
        res.livre.forEach(async livre => {
          let createdAt = await this.datepipe.transform(livre.createdAt, 'dd MMMM, yyyy');
          this.list_livre.push({id:livre._id,title:livre.title,auteur:livre.auteur,createdAt:createdAt,language:livre.language})
        });
      })
  }

  user: any
  list_livre: Array<any> = []

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: Http,
    private spinner: NgxSpinnerService,
    private datepipe: DatePipe,
  ) {}

  ngOnInit(): void {
    if (this.authService.loggedIn()) {
      this.authService.getProfile().subscribe(async (profile) => {
        this.user = await profile.user
        this.loadLivres(this.user._id)
      })
    }
  }
}
