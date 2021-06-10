import *  as  citiesCountry from '../../../../assets/json/world_cities_json.json';

import { Component, ElementRef, HostListener, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';

import { AppConfig } from '../../../config/app.config';
import { AuthService } from '../../../services/auth.service';
//import { FlashMessagesService } from 'angular2-flash-messages';
import { Http } from '@angular/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private apiUrl = "https://restcountries.eu/rest/v2/all";

  registerForm: FormGroup;
  form: FormGroup;
  submitted = false;
  countries: any[] = [];
  roles: any[] = [];
  cities: any[] = [];
  currentLanguage: String;
  percentDone: any;
  uploadedImage: any;
  file: any;
  localUrl: any;
  sizeOfOriginalImage: number;
  localCompressedURl: any;
  sizeOFCompressedImage: number;

  constructor(
    public formBuilder: FormBuilder,
    private httpcl: HttpClient,
    private http: Http,
    private authService: AuthService,
    private router: Router,
    private translateService: TranslateService) {
  }

  catchCountry(country: string) {
    if (country) {
      return country
    }
    return null
  }

  contains(cities, obj) {
    for (var i = 0; i < cities.length; i++) {
      if (String(cities[i].subcountry) === obj) {
        return true;
      }
    }
    return false;
  }

  addCities(value: string) {
    let country = this.catchCountry(value)
    if (country.length >= 0) {
      this.cities = []
      citiesCountry['default'].forEach(element => {
        if (String(element.country) == country && !this.contains(this.cities, String(element.subcountry))) {
          this.cities.push(element)
        }
      });
      if (!this.f.city)
        this.f.city.setErrors(null)
    }
    else
      console.log('error to add cities')

  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }


  ngOnInit() {
    /** spinner starts on init */
    //this.spinner.show();
    this.currentLanguage = this.translateService.currentLang
    this.http.get(this.apiUrl).subscribe(countries => {

      countries.json().forEach(element => {
        this.countries.push(element)
      });

    });


    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get(AppConfig.getALLRolles)
      .subscribe(res => {
        let tab = res.json()
        tab.forEach(element => {
          if (String(element.admin) == 'false') {
            this.roles.push(element)
          }
        })
      });

    this.registerForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(4)]],
      full_name: ['', Validators.required],
      gender: ['', [Validators.required]],
      birthday: [null, [Validators.required]],
      city: ['', [Validators.required]],
      cin:['',Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      address: ['', Validators.required],
      codePostal: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      phoneNumber: [null, Validators.pattern('^[0-9]*$')],
      idRole: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],

    }, {
      validator: [this.mustMatch('password', 'confirmPassword'),
      this.emailExist('email'),
      this.phoneNumberExist('phoneNumber'),
      this.usernameExist('username')
      ]
    });
    //this.spinner.hide();
  }

  cinExist(controlName) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];

      if (control.errors) {
        // return if another validator has already found an error on the matchingControl
        return;
      }


      this.http.get(AppConfig.cinExist + control.value).subscribe(data => {
        if (!Boolean(data.json().success)) {
          control.setErrors({ cinExist: true })
          return;
        }
        else
          control.setErrors(null)
      });
    }
  }

  usernameExist(controlName) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];

      if (control.errors) {
        // return if another validator has already found an error on the matchingControl
        return;
      }


      this.http.get(AppConfig.usernameExist + control.value).subscribe(data => {
        if (!Boolean(data.json().success)) {
          control.setErrors({ usernameExist: true })
          return;
        }
        else
          control.setErrors(null)
      });
    }
  }

  emailExist(controlName) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];

      if (control.errors) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      this.http.get(AppConfig.emailExist + control.value).subscribe(data => {
        if (!Boolean(data.json().success))
          control.setErrors({ emailExist: true })
        else
          control.setErrors(null)
      });
    }
  }

  phoneNumberExist(controlName) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];

      if (control.errors) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      this.http.get(AppConfig.phoneNumberExist + control.value).subscribe(data => {
        if (!Boolean(data.json().success))
          control.setErrors({ phoneNumberExist: true })
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


  successRegister(first_name) {
    //this.toastr.success('Welcome ' + first_name, 'succes!')
  }

  async onRegisterSubmit() {
    //this.spinner.show()
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return false;
    }


    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      //this.toastr.error('Verify your params plz !')
      //this.spinner.hide()
      this.router.navigate(['/register']).then(() => {
        window.location.reload();
      });
      return false;
    }

    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    let user = JSON.stringify(this.registerForm.value, null, 4);


    // Register user
    await this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.successRegister(this.f.full_name.value);
        this.roles.forEach(element => {
          if (element._id == this.f.idRole.value) {
            if (element.roleName == 'parent') {
              this.http.post(AppConfig.addParent, { idUser: data.user._id,cin: this.registerForm.get('cin').value,phoneNumber:this.registerForm.get('phoneNumber').value }).subscribe(data => {
                if (Boolean(data.json().success))
                  this.router.navigate(['/login']);
                else
                  console.log('no Parent')
              })
            }
            else if (element.roleName == 'child') {
              this.http.post(AppConfig.addStudent, { idUser: data.user._id }).subscribe(data => {
                if (Boolean(data.json().success))
                  this.router.navigate(['/login']);
                else
                  console.log('no Student')
              })
            }
          }

        })

      } else {
        //this.toastr.error('User existed!','Verify your fields')
        this.router.navigate(['/register']);
      }
    })
    //this.spinner.hide()
  }

}
