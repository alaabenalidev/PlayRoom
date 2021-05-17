import { Component, OnInit } from '@angular/core'

import { ActivatedRoute } from '@angular/router'
import { AppConfig } from '../../config/app.config'
import { AuthService } from 'src/app/services/auth.service'
import { DatePipe } from '@angular/common'
import { Http } from '@angular/http'
import { NgxSpinnerService } from 'ngx-spinner'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchInput: String
  list_livre: Array<any> = []
  list_challenge: Array<any> = []
  selectedSearch=0

  constructor(private activatedRoute: ActivatedRoute, private http: Http,private datepipe: DatePipe) {
    this.searchInput = this.activatedRoute.snapshot.paramMap.get('search')
  }

  async loadLivres() {
    await this.http.get(AppConfig.getLivresSearch + this.searchInput).subscribe(data => {
      let res = data.json()
      if(res.success)
      res.livres.forEach(async livre => {
        let createdAt = await this.datepipe.transform(livre.createdAt, 'dd MMMM, yyyy');
        this.list_livre.push({id:livre._id,title:livre.title,auteur:livre.auteur,createdAt:createdAt,language:livre.language})
      });
    })
  }

  async loadChallenges() {
    await this.http.get(AppConfig.getChallengeSearch + this.searchInput).subscribe(data => {
      let res = data.json()
      if(res.success)
      res.challenges.forEach(async challenge => {
        let createdAt = await this.datepipe.transform(challenge.createdAt, 'dd MMMM, yyyy');
        let dateFin = await this.datepipe.transform(challenge.date_fin, 'dd MMMM, yyyy');
        this.list_challenge.push({id:challenge._id,title:challenge.title,createdAt:createdAt,datefin:dateFin})
      });
    })
  }

  async ngOnInit() {
    await this.loadLivres()
    await this.loadChallenges()
    console.log(this.list_livre)
    console.log(this.list_challenge)
  }
}
