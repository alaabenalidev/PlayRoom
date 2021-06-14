import { Component, ElementRef, HostListener, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http'

import { AppConfig } from '../../../config/app.config'
import { AuthService } from '../../../services/auth.service'
//import { FlashMessagesService } from 'angular2-flash-messages';
import { Http } from '@angular/http'
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'

var Quiz: Array<{
  question: String
  suggestion: Array<String>
  correct_answer: Number
}>

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  registerForm: FormGroup
  question_quiz: String
  res__quiz1: String
  res__quiz2: String
  res__quiz3: String
  correct_quiz: Number = 0

  imageError: string
  isImageSaved: boolean
  cardImageBase64: string

  form: FormGroup
  user: any
  submitted = false
  currentLanguage: String
  listQuiz = Quiz

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
    this.listQuiz = []
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

    this.registerForm = this.formBuilder.group(
      {
        child_id:[null,[Validators.required]],
        title: [null, [Validators.required, Validators.minLength(4)]],
        description: ['', Validators.required, Validators.minLength(4)],
        auteur: ['', [Validators.required, Validators.minLength(4)]],
        language: [null, [Validators.required, Validators.minLength(4)]],
        file_pdf: ['', [Validators.required]],
        video: [null],
        quizs: [null],
      },
      {
        validator: [this.validateYouTubeUrl('video')],
      },
    )
    //this.spinner.hide();
  }

  validateYouTubeUrl(controlName) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName]

      if (control.errors) {
        // return if another validator has already found an error on the matchingControl
        return
      }

      if (control != undefined || String(control) != '') {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/
        var match = String(control).match(regExp)
        if (match && match[2].length == 11) {
          control.setErrors(null)
        } else {
          control.setErrors({ validateYouTubeUrl: true })
          return
        }
      }
      this.http
        .get(AppConfig.usernameExist + control.value)
        .subscribe((data) => {
          if (!Boolean(data.json().success)) {
          } else control.setErrors(null)
        })
    }
  }

  async onRegisterSubmit() {
    //this.spinner.show()
    this.submitted = true

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return false
    }

    await this.registerForm.controls.quizs.setValue(this.listQuiz)
    this.registerForm.controls.child_id.setValue(this.user._id)
    console.log(this.registerForm.value)

    this.submitted = true

    // display form values on success
    // alert(
    //   'SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4),
    // )
    // let livre = JSON.stringify(this.registerForm.value, null, 4)

    this.http.post(AppConfig.addLivre, this.registerForm.value).subscribe((data) => {
      if (data.json().success)
        this.router.navigate(['/listlivre'])
      else console.log('no add')
    })
  }
  clearQuizField() {
    this.question_quiz = ''
    this.res__quiz1 = ''
    this.res__quiz1 = ''
    this.res__quiz2 = ''
    this.res__quiz3 = ''
    this.correct_quiz = 0
  }

  addQuiz() {
    if (
      this.question_quiz === '' ||
      this.res__quiz1 === '' ||
      this.res__quiz1 === '' ||
      this.res__quiz2 === '' ||
      this.res__quiz3 === '' ||
      this.correct_quiz == 0
    ) {
      alert(
        'Please verify your quiz question,suggestions, and the correct answer',
      )
    } else {
      let quiza = {
        question: this.question_quiz,
        suggestion: [this.res__quiz1, this.res__quiz2, this.res__quiz3],
        correct_answer: Number(this.correct_quiz),
      }
      this.listQuiz.push(quiza)
      this.clearQuizField()
    }
  }

  removeQuiz(i) {
    this.listQuiz.splice(i, 1)
  }

  fileChangeEvent(fileInput: any) {
    this.imageError = null
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520
      const allowed_types = ['application/pdf']

      if (fileInput.target.files[0].size > max_size) {
        this.imageError = 'Maximum size allowed is ' + max_size / 1000 + 'Mb'

        return false
      }
      const reader = new FileReader()
      reader.onload = (e: any) => {
        const image = new Image()
        console.log(e.target.result)
        image.src = e.target.result
        this.cardImageBase64 = e.target.result
        this.registerForm.controls.file_pdf.setValue(e.target.result)
        this.isImageSaved = true
      }

      reader.readAsDataURL(fileInput.target.files[0])
    }
  }
}
