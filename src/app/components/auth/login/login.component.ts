import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailOrUsername: String;
  password: String;
  user: any;

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {

  }

  onLoginSubmit() {
    console.log(this.emailOrUsername+" "+this.password);
    /** spinner starts on init */
    this.user = {
      logUser: this.emailOrUsername,
      password: this.password
    }

    this.authService.authenticateUser(this.user).subscribe(data => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        //this.flashMessage.show('You are now logged in', {cssClass: 'alert-success', timeout: 5000});
        this.router.navigateByUrl('/home').then(() => {
          window.location.reload();
        });
      } else {
        //this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
        alert('Plz verify your identity!')
        this.router.navigate(['login']);
      }
    }
    )
  }

}
