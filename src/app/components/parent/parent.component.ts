import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AppConfig } from '../../config/app.config';
import { AuthService } from 'src/app/services/auth.service';
import { DatePipe } from '@angular/common'
import { Http } from '@angular/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  async loadChildrens() {
    await this.http.get(AppConfig.getParent + this.user._id).subscribe(data => {
      let res = data.json()
      res.parent.children_list.forEach(async user => {
        let birthday = await this.datepipe.transform(user.child.birthday, 'dd MMMM, yyyy');
        var timeDiff = Math.abs(Date.now() - new Date(user.child.birthday).getTime());
        let age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
        this.list_children.push({ childId: user.child._id, username: user.child.username, gender: user.child.gender, full_name: user.child.full_name, birthday: birthday, age: age})
      });
    })
  }

  user:any
  list_children: Array<any> = []
  selectedChild: any

  constructor(private authService: AuthService, private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: Http,
    private spinner: NgxSpinnerService,
    private datepipe: DatePipe) { }

  ngOnInit(): void {

    if (this.authService.loggedIn()) {
      this.authService.getProfile().subscribe(async (profile) => {
        this.user = await profile.user
        this.loadChildrens()
      })
    }

    
  }

}

