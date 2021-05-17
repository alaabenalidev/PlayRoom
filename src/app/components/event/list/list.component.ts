import { Component, OnInit } from '@angular/core'

import { ActivatedRoute } from '@angular/router'
import { AppConfig } from '../../../config/app.config'
import { AuthService } from '../../../services/auth.service'
import { DatePipe } from '@angular/common'
import { Http } from '@angular/http'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  challenges: any =[]
  constructor(private http: Http,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private datepipe: DatePipe) { }

  loadChallenge(){
    this.http
      .get(AppConfig.getChallenges)
      .subscribe(async (data) => {
        console.log(data.json())
        data.json().challenges.forEach( async element => {
          let challenge=element
          challenge.createdAt = await this.datepipe.transform(
            challenge.createdAt,
            'dd MMMM, yyyy',
          )
          challenge.date_fin = await this.datepipe.transform(
            challenge.date_fin,
            'dd MMMM, yyyy',
          )
          this.challenges.push(challenge)
        });
      })
  }

  ngOnInit(): void {
    this.loadChallenge()
  }

}
