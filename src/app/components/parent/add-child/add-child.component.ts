import { Component, ElementRef, HostListener, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http'

import { AppConfig } from '../../../config/app.config'
import { AuthService } from '../../../services/auth.service'
//import { FlashMessagesService } from 'angular2-flash-messages';
import { Http } from '@angular/http'
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.css'],
})
export class AddChildComponent implements OnInit {
  registerForm: FormGroup
  form: FormGroup
  user: any
  submitted = false
  countries: any[] = []
  roles: any[] = []
  cities: any[] = []
  currentLanguage: String
  percentDone: any
  uploadedImage: any
  file: any
  localUrl: any
  sizeOfOriginalImage: number
  localCompressedURl: any
  sizeOFCompressedImage: number

  constructor(
    public formBuilder: FormBuilder,
    private httpcl: HttpClient,
    private http: Http,
    private authService: AuthService,
    private router: Router,
    private translateService: TranslateService,
  ) {}

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls
  }

  ngOnInit() {
    /** spinner starts on init */
    //this.spinner.show();
    this.currentLanguage = this.translateService.currentLang

    if (this.authService.loggedIn()) {
      this.authService.getProfile().subscribe(async (profile) => {
        this.user = await profile.user
      })
    }

    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    this.http.get(AppConfig.getALLRolles).subscribe((res) => {
      let tab = res.json()
      console.log(tab)
      tab.forEach((element) => {
        if (String(element.admin) == 'false') {
          this.roles.push(element)
        }
      })
    })

    this.registerForm = this.formBuilder.group(
      {
        username: [null, [Validators.required, Validators.minLength(4)]],
        full_name: ['', Validators.required],
        gender: ['', [Validators.required]],
        birthday: [null, [Validators.required]],
        city: [this.user?.address.city, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        address: [this.user?.address.street, Validators.required],
        ConnectDuration: [
          5,
          [Validators.required, Validators.pattern('^[0-9]*$')],
        ],
        codePostal: [
          this.user?.address.postalCode,
          [Validators.required, Validators.pattern('^[0-9]*$')],
        ],
        idRole: ['6078627b6ba03307fc19b95f', Validators.required],
      },
      {
        validator: [
          this.mustMatch('password', 'confirmPassword'),
          this.emailExist('email'),
          this.usernameExist('username'),
        ],
      },
    )
    
    this.registerForm.setValue({
      username:"",
      full_name:"",
      gender:"",
      birthday:"",
      email:"",
      password:"",
      confirmPassword:"",
      ConnectDuration:5,
      idRole: "6078627b6ba03307fc19b95f",
      city: "",
      address: "",
      codePostal: "",
    })
    //this.spinner.hide();
  }

  usernameExist(controlName) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName]

      if (control.errors) {
        // return if another validator has already found an error on the matchingControl
        return
      }

      this.http
        .get(AppConfig.usernameExist + control.value)
        .subscribe((data) => {
          if (!Boolean(data.json().success)) {
            control.setErrors({ usernameExist: true })
            return
          } else control.setErrors(null)
        })
    }
  }

  emailExist(controlName) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName]

      if (control.errors) {
        // return if another validator has already found an error on the matchingControl
        return
      }

      this.http.get(AppConfig.emailExist + control.value).subscribe((data) => {
        if (!Boolean(data.json().success))
          control.setErrors({ emailExist: true })
        else control.setErrors(null)
      })
    }
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName]
      const matchingControl = formGroup.controls[matchingControlName]

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true })
      } else {
        matchingControl.setErrors(null)
      }
    }
  }

  successRegister(first_name) {
    //this.toastr.success('Welcome ' + first_name, 'succes!')
  }

  async onRegisterSubmit() {
    //this.spinner.show()
    this.submitted = true

    this.registerForm.setValue({
      username:this.registerForm.get('username').value,
      full_name:this.registerForm.get('full_name').value,
      gender:this.registerForm.get('gender').value,
      birthday:this.registerForm.get('birthday').value,
      email:this.registerForm.get('email').value,
      password:this.registerForm.get('password').value,
      confirmPassword:this.registerForm.get('confirmPassword').value,
      ConnectDuration:this.registerForm.get('ConnectDuration').value,
      idRole: "6078627b6ba03307fc19b95f",
      city: this.user?.address.city,
      address: this.user?.address.street,
      codePostal: this.user?.address.postalCode,
    })

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return false
    }

    this.submitted = true

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      //this.toastr.error('Verify your params plz !')
      //this.spinner.hide()
      this.router.navigate(['/register']).then(() => {
        window.location.reload()
      })
      return false
    }

    // display form values on success
    alert(
      'SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4),
    )
    let user = JSON.stringify(this.registerForm.value, null, 4)

    // Register user
    await this.authService.registerUser(user).subscribe((data) => {
      console.log(data)
      if (data.success) {
        this.http
          .post(AppConfig.addChild, {
            id_user: data.user._id,
            ConnectDuration: this.registerForm.get('ConnectDuration').value,
          })
          .subscribe((dataC) => {
            console.log(dataC.json())
            if (Boolean(dataC.json().success))
              this.http
                .put(AppConfig.addChildToParent, {
                  childId: dataC.json().user.id_user,
                  parentId: this.user._id,
                })
                .subscribe((data) => {
                  let result = data.json()
                  if (Boolean(result.success)) {
                    this.router.navigate(['/listchild/' + this.user._id])
                  }
                })
            else console.log('no Student')
          })
        this.successRegister(this.f.full_name.value)
      } else {
        //this.toastr.error('User existed!','Verify your fields')
        this.router.navigate(['/register'])
      }
    })
    //this.spinner.hide()
  }
}
