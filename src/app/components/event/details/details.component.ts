import { Component, OnInit } from '@angular/core'

import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../../config/app.config';
import { Http } from '@angular/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  challenge: any;
  preview:string;

  constructor(private http: Http,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let param = this.activatedRoute.snapshot.params.id;
    let challengeId=""
    for(let i=0;i<24;i++)
      challengeId+=param[i]
    console.log(challengeId)
    console.log(AppConfig.getChallengeUrl + challengeId)
    this.http.get(AppConfig.getChallengeUrl + challengeId).subscribe(data => {
      this.challenge = data.json().challenge[0];
      console.log(this.challenge);
      /*if(this.challenge.avatar.data){
      let buff = Buffer.from(this.challenge.file_pdf.data, 'ascii');
      this.preview = buff.toString('ascii')
      }*/
    })
  }

}
