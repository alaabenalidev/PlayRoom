import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpModule } from '@angular/http';
import { AppConfig } from '../config/app.config';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { from } from 'rxjs';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) {
      //this.isDev = true;  // Change to false before deployment
    }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(AppConfig.signupUrl, user, {headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.user=user;
    return this.http.post(AppConfig.loginUrl, user, {headers: headers})
      .map(res => res.json());
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(AppConfig.profileUrl, {headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  activateAccount(token){
    return this.http.put('http://localhost:3000/users/activate/'+token,'').map(res =>res.json());
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
