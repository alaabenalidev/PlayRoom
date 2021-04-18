import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppConfig } from '../config/app.config';
import { Http } from '@angular/http';

@Injectable()
export class ValidateService {

  constructor(private http:Http) { }

  usernameExist(controlName) {
    return (formGroup: FormGroup) => {
      const control= formGroup.controls[controlName];
      let user ={
        email: control.value
      }

      if (control.errors) {
        // return if another validator has already found an error on the matchingControl
        return;
      }


      this.http.get(AppConfig.emailExist+control.value).subscribe(data =>{
        if(!Boolean(data.json().success))
          control.setErrors({usernameExist: true})
        else
          control.setErrors(null)
      });
     }
  }

  emailExist(controlName) {
    return (formGroup: FormGroup) => {
      const control= formGroup.controls[controlName];
      let user ={
        email: control.value
      }

      if (control.errors) {
        // return if another validator has already found an error on the matchingControl
        return;
      }


      this.http.get(AppConfig.emailExist+control.value).subscribe(data =>{
        if(!Boolean(data.json().success))
          control.setErrors({emailExist: true})
        else
          control.setErrors(null)
      });
     }
  }

  phoneNumberExist(controlName) {
    return (formGroup: FormGroup) => {
      const control= formGroup.controls[controlName];
      let user ={
        phoneNumber: control.value
      }

      if (control.errors) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.get(AppConfig.phoneNumberExist+control.value).subscribe(data =>{
        if(!Boolean(data.json().success))
          control.setErrors({emailExist: true})
        else
          control.setErrors(null)
      });
     }
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }

}
