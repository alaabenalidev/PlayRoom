import { Component, OnInit } from '@angular/core'

import { ActivatedRoute } from '@angular/router'
import { AppConfig } from '../../../config/app.config'
import { AuthService } from '../../../services/auth.service'
import { DatePipe } from '@angular/common'
import { Http } from '@angular/http'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  challenge: any
  participated:Boolean=false
  isParent: Boolean = false
  
  async loadLivres(idUser) {
    await this.http
      .get(AppConfig.getLivreByUserId + idUser)
      .subscribe((data) => {
        let res = data.json()
        res.livre.forEach(async (livre) => {
          let createdAt = await this.datepipe.transform(
            livre.createdAt,
            'dd MMMM, yyyy',
          )
          this.list_livre.push({
            _id: livre._id,
            title: livre.title,
            auteur: livre.auteur,
            createdAt: createdAt,
            language: livre.language,
          })
        })
        // res.parent.children_list.forEach(async user => {
        //   let birthday = await this.datepipe.transform(user.child.birthday, 'dd MMMM, yyyy');
        //   var timeDiff = Math.abs(Date.now() - new Date(user.child.birthday).getTime());
        //   let age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
        //   this.list_children.push({ childId: user.child._id, username: user.child.username, gender: user.child.gender, full_name: user.child.full_name, birthday: birthday, age: age})
        // });
      })
  }

  user: any
  list_livre: Array<any> = []
  book: String = ''

  constructor(
    private http: Http,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private datepipe: DatePipe,
  ) {}

  participate() {
    this.http
      .post(AppConfig.participate, { idUser: this.user._id, idBook: this.book, challengeId: this.challenge._id})
      .subscribe((data) => {
        if (Boolean(data.json().success)){
          alert('You are participated and adding the book successfully! ')
          this.loadChallenge()
          this.Participated()
        }
        else 
          alert('THERE\'s a problem! ')
      })
  }

  loadChallenge(){
    let param = this.activatedRoute.snapshot.params.id
    let challengeId = ''
    for (let i = 0; i < 24; i++) challengeId += param[i]
    this.http
      .get(AppConfig.getChallengeUrl + challengeId)
      .subscribe(async (data) => {
        this.challenge = data.json().challenge[0]
        this.challenge.createdAt = await this.datepipe.transform(
          this.challenge.createdAt,
          'dd MMMM, yyyy',
        )
        this.challenge.date_fin = await this.datepipe.transform(
          this.challenge.date_fin,
          'dd MMMM, yyyy',
        )
      })
  }

  Participated(){
    this.challenge.list_livre.array.forEach(element => {
      if(element._id_user === this.user._id)
        this.participated=true
    });
  }

  isparent(){
    if (this.authService.loggedIn()) {
      this.authService.getProfile().subscribe(async (profile) => {
        let user = await profile.user
        this.http.get(AppConfig.getALLRolles).subscribe((res) => {
          let tab = res.json()
          tab.forEach((element) => {
            if (String(element._id) == String(user.role)) {
              if (String(element.roleName) == "parent") {
                this.isParent = true
              }
            }
          })
        })
      })
    }
  }

  ngOnInit(): void {
    this.loadChallenge()
    if (this.authService.loggedIn()) {
      this.authService.getProfile().subscribe(async (profile) => {
        this.user = await profile.user
        this.loadLivres(this.user._id)
      })
    }
    this.isparent();
  }
}
