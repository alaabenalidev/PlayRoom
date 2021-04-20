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
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.css']
})
export class AddChildComponent implements OnInit {

  registerForm: FormGroup;
  form: FormGroup;
  user:any;
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

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }


  ngOnInit() {
    /** spinner starts on init */
    //this.spinner.show();
    this.currentLanguage = this.translateService.currentLang

    if (this.authService.loggedIn()) {
      this.authService.getProfile().subscribe(async (profile) => {
        this.user = await profile.user
      })
    }


    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get(AppConfig.getALLRolles)
      .subscribe(res => {
        let tab = res.json()
        console.log(tab);
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
      email: [null, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      address: ['', Validators.required],
      ConnectDuration: ['', [Validators.required,Validators.pattern('^[0-9]*$')]],
      codePostal: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      phoneNumber: [null, Validators.pattern('^[0-9]*$')],
      idRole: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],

    }, {
      validator: [this.mustMatch('password', 'confirmPassword'),
      this.emailExist('email'),
      this.phoneNumberExist('phoneNumber'),
      this.usernameExist('username'),
      this.cinExist('cin')
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
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    let user = JSON.stringify(this.registerForm.value, null, 4);

    // Register user
    await this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.http.post(AppConfig.addStudent, { id_user: data.user._id,ConnectDuration:this.registerForm.get('ConnectDuration').value }).subscribe(data => {
          if (Boolean(data.json().success))
            this.router.navigate(['/login']);
          else
            console.log('no Student')
        })
        this.successRegister(this.f.full_name.value);
        this.http.put(AppConfig.addChildToParent,{childId:data.user._id,parentId:this.user._id}).subscribe(data =>{
          let result = data.json()
          if(Boolean(result.success)){
            this.router.navigate(['/listchild']);
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
